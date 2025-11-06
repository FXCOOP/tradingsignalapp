-- ==========================================
-- AUTO-ASSIGN LEADS TO BROKER (Supabase Trigger)
-- ==========================================
-- This trigger automatically assigns new leads to Finoglob broker
-- when they are inserted into the signups table
--
-- Run this in Supabase SQL Editor to enable auto-assignment

-- Step 1: Create a function that auto-assigns leads to brokers
CREATE OR REPLACE FUNCTION auto_assign_lead_to_broker()
RETURNS TRIGGER AS $$
DECLARE
    broker_id_var UUID;
    country_iso TEXT;
BEGIN
    -- Extract country ISO code (2 letters) from country field
    country_iso := UPPER(SUBSTRING(NEW.country FROM 1 FOR 2));

    -- Check if country is Malaysia (MY), Turkey (TR), France (FR), Italy (IT),
    -- Hong Kong (HK), Singapore (SG), Taiwan (TW), or Brazil (BR)
    IF country_iso IN ('MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR') THEN
        -- Find Finoglob broker
        SELECT id INTO broker_id_var
        FROM brokers
        WHERE name = 'Finoglob'
        AND status = 'active'
        AND country_iso = ANY(country_codes)
        LIMIT 1;

        -- If broker found, update the lead
        IF broker_id_var IS NOT NULL THEN
            -- Update signup with broker assignment
            UPDATE signups
            SET
                assigned_broker_id = broker_id_var,
                lead_status = 'assigned',
                last_activity_at = NOW()
            WHERE id = NEW.id;

            -- Create lead assignment record
            INSERT INTO lead_assignments (
                lead_id,
                broker_id,
                assignment_method,
                delivery_status,
                priority,
                created_at
            ) VALUES (
                NEW.id,
                broker_id_var,
                'auto',
                'pending',
                0,
                NOW()
            );

            -- Log the auto-assignment
            RAISE NOTICE 'Lead % auto-assigned to broker % (Country: %)',
                NEW.email, broker_id_var, country_iso;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
DROP TRIGGER IF EXISTS trigger_auto_assign_lead ON signups;

CREATE TRIGGER trigger_auto_assign_lead
    AFTER INSERT ON signups
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_lead_to_broker();

-- ==========================================
-- VERIFICATION
-- ==========================================

-- Check if trigger exists
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'trigger_auto_assign_lead';

-- Test the trigger by inserting a test lead
-- (Uncomment to test)
/*
INSERT INTO signups (
    first_name,
    last_name,
    email,
    phone_number,
    country,
    country_code,
    lead_status,
    terms_accepted
) VALUES (
    'Test',
    'User',
    'test_trigger_' || FLOOR(RANDOM() * 10000) || '@example.com',
    '+60123456789',
    'Malaysia',
    '+60',
    'new',
    true
);

-- Check if it was auto-assigned
SELECT
    s.email,
    s.country,
    s.lead_status,
    s.assigned_broker_id,
    b.name as broker_name
FROM signups s
LEFT JOIN brokers b ON s.assigned_broker_id = b.id
WHERE s.email LIKE 'test_trigger_%'
ORDER BY s.created_at DESC
LIMIT 1;
*/

-- ==========================================
-- NOTES
-- ==========================================
-- After running this:
-- 1. All new leads from supported countries will be auto-assigned to Finoglob
-- 2. Leads appear in CRM with "Assigned" status
-- 3. To actually SEND to broker API, you need to:
--    a) Use the CRM dashboard "Send to Broker" button, OR
--    b) Create a webhook/edge function to call Trading CRM API
