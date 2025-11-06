-- ==========================================
-- ADD BROKER ASSIGNMENT COLUMNS TO SIGNUPS TABLE
-- ==========================================
-- Run this BEFORE the auto-assign trigger

-- Add columns for broker assignment (if they don't exist)
DO $$
BEGIN
    -- Add assigned_broker_id column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'assigned_broker_id'
    ) THEN
        ALTER TABLE signups
        ADD COLUMN assigned_broker_id UUID REFERENCES brokers(id) ON DELETE SET NULL;

        CREATE INDEX IF NOT EXISTS idx_signups_assigned_broker
        ON signups(assigned_broker_id);

        RAISE NOTICE 'Column assigned_broker_id added';
    END IF;

    -- Add last_activity_at column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'last_activity_at'
    ) THEN
        ALTER TABLE signups
        ADD COLUMN last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

        CREATE INDEX IF NOT EXISTS idx_signups_last_activity
        ON signups(last_activity_at);

        RAISE NOTICE 'Column last_activity_at added';
    END IF;

    -- Add crm_status column (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'crm_status'
    ) THEN
        ALTER TABLE signups
        ADD COLUMN crm_status TEXT DEFAULT 'new';

        CREATE INDEX IF NOT EXISTS idx_signups_crm_status
        ON signups(crm_status);

        RAISE NOTICE 'Column crm_status added';
    END IF;

    -- Add assigned_broker column (text field for broker name)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'assigned_broker'
    ) THEN
        ALTER TABLE signups
        ADD COLUMN assigned_broker TEXT;

        RAISE NOTICE 'Column assigned_broker added';
    END IF;
END $$;

-- Verify columns were added
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'signups'
AND column_name IN (
    'assigned_broker_id',
    'last_activity_at',
    'crm_status',
    'assigned_broker'
)
ORDER BY column_name;
