-- ==========================================
-- CREATE FINOGLOB BROKER IN DATABASE
-- ==========================================
-- Run this in Supabase SQL Editor to create the Finoglob broker
-- https://supabase.com/dashboard/project/bsupjdeayuylynsdmfdx/sql/new

-- Check if broker already exists
DO $$
BEGIN
    -- Only insert if doesn't exist
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
            api_headers,
            max_leads_per_day,
            max_leads_per_hour,
            working_hours_start,
            working_hours_end,
            working_days,
            payout_per_lead,
            payout_per_conversion
        ) VALUES (
            'Finoglob',
            'Trading CRM (affiliate365)',
            'support@tradingcrm.com',
            ARRAY['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR'],
            'active',
            'https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso',
            '225X',
            'POST',
            '{"Content-Type": "application/json-patch+json", "Accept": "application/json"}',
            1000,
            100,
            '00:00:00',
            '23:59:59',
            ARRAY[1, 2, 3, 4, 5, 6, 7],
            5.00,
            50.00
        );
        RAISE NOTICE 'Finoglob broker created successfully!';
    ELSE
        RAISE NOTICE 'Finoglob broker already exists.';
    END IF;
END $$;

-- Verify it was created
SELECT
    id,
    name,
    company_name,
    country_codes,
    status,
    created_at
FROM brokers
WHERE name = 'Finoglob';
