-- ==========================================
-- ADD STATUS TRACKING COLUMNS TO SIGNUPS TABLE
-- ==========================================
-- Run this to enable broker status tracking and conversion monitoring

-- Step 1: Add broker status tracking columns to signups table
DO $$
BEGIN
    -- Broker status (text from Trading CRM)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'broker_status'
    ) THEN
        ALTER TABLE signups ADD COLUMN broker_status TEXT;
        RAISE NOTICE '✅ Column broker_status added';
    END IF;

    -- Broker status code (numeric)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'broker_status_code'
    ) THEN
        ALTER TABLE signups ADD COLUMN broker_status_code INTEGER;
        RAISE NOTICE '✅ Column broker_status_code added';
    END IF;

    -- Broker account ID (from Trading CRM)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'broker_account_id'
    ) THEN
        ALTER TABLE signups ADD COLUMN broker_account_id TEXT;
        RAISE NOTICE '✅ Column broker_account_id added';
    END IF;

    -- Trading Platform Account
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'tp_account'
    ) THEN
        ALTER TABLE signups ADD COLUMN tp_account TEXT;
        RAISE NOTICE '✅ Column tp_account added';
    END IF;

    -- FTD (First Time Deposit) flag
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'ftd_exists'
    ) THEN
        ALTER TABLE signups ADD COLUMN ftd_exists BOOLEAN DEFAULT FALSE;
        RAISE NOTICE '✅ Column ftd_exists added';
    END IF;

    -- Last time broker modified the lead
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'broker_modified_at'
    ) THEN
        ALTER TABLE signups ADD COLUMN broker_modified_at TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE '✅ Column broker_modified_at added';
    END IF;

    -- Last time we checked status
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'last_status_check'
    ) THEN
        ALTER TABLE signups ADD COLUMN last_status_check TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE '✅ Column last_status_check added';
    END IF;
END $$;

-- Step 2: Create lead_status_history table (tracks status changes)
CREATE TABLE IF NOT EXISTS lead_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES signups(id) ON DELETE CASCADE,
    previous_status TEXT,
    new_status TEXT,
    status_code INTEGER,
    ftd_exists BOOLEAN,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_status_history_lead_id
    ON lead_status_history(lead_id);

CREATE INDEX IF NOT EXISTS idx_lead_status_history_changed_at
    ON lead_status_history(changed_at);

-- Step 3: Create conversions table (tracks FTDs and deposits)
CREATE TABLE IF NOT EXISTS conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES signups(id) ON DELETE CASCADE,
    broker_name TEXT,
    conversion_type TEXT, -- 'FTD', 'Deposit', etc.
    amount DECIMAL(10,2),
    currency TEXT,
    tp_account TEXT,
    converted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversions_lead_id
    ON conversions(lead_id);

CREATE INDEX IF NOT EXISTS idx_conversions_converted_at
    ON conversions(converted_at);

-- Step 4: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_signups_broker_status
    ON signups(broker_status);

CREATE INDEX IF NOT EXISTS idx_signups_ftd_exists
    ON signups(ftd_exists);

CREATE INDEX IF NOT EXISTS idx_signups_last_status_check
    ON signups(last_status_check);

-- Verification
SELECT
    'signups' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'signups'
AND column_name IN (
    'broker_status',
    'broker_status_code',
    'broker_account_id',
    'tp_account',
    'ftd_exists',
    'broker_modified_at',
    'last_status_check'
)
ORDER BY column_name;

-- Show summary
SELECT '✅ Status tracking columns added successfully!' as message;
