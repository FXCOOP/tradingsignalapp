-- ==========================================
-- SIMPLE 3-STEP SETUP FOR BROKER AUTO-ASSIGNMENT
-- ==========================================
-- Copy and paste this ENTIRE file into Supabase SQL Editor
-- Run it all at once!
-- https://supabase.com/dashboard/project/bsupjdeayuylynsdmfdx/sql/new

-- ==========================================
-- STEP 1: Add Required Columns to signups table
-- ==========================================

DO $$
BEGIN
    -- Add assigned_broker_id column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'assigned_broker_id'
    ) THEN
        ALTER TABLE signups ADD COLUMN assigned_broker_id UUID;
        RAISE NOTICE '✅ Column assigned_broker_id added';
    ELSE
        RAISE NOTICE '⏭️ Column assigned_broker_id already exists';
    END IF;

    -- Add assigned_broker column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'assigned_broker'
    ) THEN
        ALTER TABLE signups ADD COLUMN assigned_broker TEXT;
        RAISE NOTICE '✅ Column assigned_broker added';
    ELSE
        RAISE NOTICE '⏭️ Column assigned_broker already exists';
    END IF;

    -- Add last_activity_at column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'last_activity_at'
    ) THEN
        ALTER TABLE signups ADD COLUMN last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE '✅ Column last_activity_at added';
    ELSE
        RAISE NOTICE '⏭️ Column last_activity_at already exists';
    END IF;

    -- Add crm_status column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'crm_status'
    ) THEN
        ALTER TABLE signups ADD COLUMN crm_status TEXT DEFAULT 'new';
        RAISE NOTICE '✅ Column crm_status added';
    ELSE
        RAISE NOTICE '⏭️ Column crm_status already exists';
    END IF;
END $$;

-- ==========================================
-- STEP 2: Create Finoglob Broker
-- ==========================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM brokers WHERE name = 'Finoglob') THEN
        INSERT INTO brokers (
            name,
            company_name,
            email,
            country_codes,
            status,
            api_endpoint,
            api_key,
            api_method,
            max_leads_per_day,
            max_leads_per_hour,
            working_hours_start,
            working_hours_end,
            working_days,
            payout_per_lead
        ) VALUES (
            'Finoglob',
            'Trading CRM',
            'support@finoglob.com',
            ARRAY['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR'],
            'active',
            'https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso',
            '225X',
            'POST',
            1000,
            100,
            '00:00:00',
            '23:59:59',
            ARRAY[1, 2, 3, 4, 5, 6, 7],
            5.00
        );
        RAISE NOTICE '✅ Finoglob broker created!';
    ELSE
        RAISE NOTICE '⏭️ Finoglob broker already exists';
    END IF;
END $$;

-- ==========================================
-- STEP 3: Assign All Existing Malaysia Leads
-- ==========================================

DO $$
DECLARE
    broker_id_var UUID;
    updated_count INTEGER;
BEGIN
    -- Get Finoglob broker ID
    SELECT id INTO broker_id_var
    FROM brokers
    WHERE name = 'Finoglob'
    LIMIT 1;

    IF broker_id_var IS NULL THEN
        RAISE EXCEPTION '❌ Finoglob broker not found!';
    END IF;

    -- Update all Malaysia leads
    UPDATE signups
    SET
        assigned_broker_id = broker_id_var,
        assigned_broker = 'Finoglob',
        lead_status = 'assigned',
        crm_status = 'assigned',
        last_activity_at = NOW()
    WHERE
        country ILIKE '%malaysia%'
        AND (assigned_broker_id IS NULL);

    GET DIAGNOSTICS updated_count = ROW_COUNT;

    RAISE NOTICE '✅ Assigned % Malaysia leads to Finoglob!', updated_count;
END $$;

-- ==========================================
-- STEP 4: Create Auto-Assignment Trigger
-- ==========================================

-- Create function
CREATE OR REPLACE FUNCTION auto_assign_lead_to_broker()
RETURNS TRIGGER AS $$
DECLARE
    broker_id_var UUID;
BEGIN
    -- Check if country is Malaysia (or other supported countries)
    IF NEW.country ILIKE '%malaysia%' OR NEW.country = 'MY' THEN
        -- Find Finoglob broker
        SELECT id INTO broker_id_var
        FROM brokers
        WHERE name = 'Finoglob'
        AND status = 'active'
        LIMIT 1;

        -- If broker found, update the lead
        IF broker_id_var IS NOT NULL THEN
            NEW.assigned_broker_id := broker_id_var;
            NEW.assigned_broker := 'Finoglob';
            NEW.lead_status := 'assigned';
            NEW.crm_status := 'assigned';
            NEW.last_activity_at := NOW();
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_auto_assign_lead ON signups;

CREATE TRIGGER trigger_auto_assign_lead
    BEFORE INSERT ON signups
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_lead_to_broker();

-- ==========================================
-- VERIFICATION
-- ==========================================

DO $$
BEGIN
    RAISE NOTICE '✅ Auto-assignment trigger created!';
    RAISE NOTICE '✅ SETUP COMPLETE!';
END $$;

-- Show assigned leads
SELECT
    first_name,
    last_name,
    email,
    country,
    assigned_broker,
    lead_status,
    created_at
FROM signups
WHERE assigned_broker = 'Finoglob'
ORDER BY created_at DESC;
