-- ==========================================
-- ADD PUSH STATUS TRACKING TO SIGNUPS TABLE
-- ==========================================
-- Run this to track API push responses (200, 400, 500, etc.)

DO $$
BEGIN
    -- Column: pushed_to_crm (boolean)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'pushed_to_crm'
    ) THEN
        ALTER TABLE signups ADD COLUMN pushed_to_crm BOOLEAN DEFAULT FALSE;
        RAISE NOTICE '✅ Column pushed_to_crm added';
    END IF;

    -- Column: push_status_code (HTTP response: 200, 400, 500, etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'push_status_code'
    ) THEN
        ALTER TABLE signups ADD COLUMN push_status_code INTEGER;
        RAISE NOTICE '✅ Column push_status_code added';
    END IF;

    -- Column: push_response (API response message)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'push_response'
    ) THEN
        ALTER TABLE signups ADD COLUMN push_response TEXT;
        RAISE NOTICE '✅ Column push_response added';
    END IF;

    -- Column: pushed_at (timestamp)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'pushed_at'
    ) THEN
        ALTER TABLE signups ADD COLUMN pushed_at TIMESTAMP WITH TIME ZONE;
        RAISE NOTICE '✅ Column pushed_at added';
    END IF;

    -- Column: push_error (error details if failed)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'signups' AND column_name = 'push_error'
    ) THEN
        ALTER TABLE signups ADD COLUMN push_error TEXT;
        RAISE NOTICE '✅ Column push_error added';
    END IF;
END $$;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_signups_pushed_to_crm ON signups(pushed_to_crm);
CREATE INDEX IF NOT EXISTS idx_signups_push_status_code ON signups(push_status_code);

DO $$
BEGIN
    RAISE NOTICE '✅ Push status tracking columns added successfully!';
    RAISE NOTICE '';
    RAISE NOTICE '📊 Now you can track:';
    RAISE NOTICE '  • pushed_to_crm: TRUE/FALSE';
    RAISE NOTICE '  • push_status_code: 200 (success), 400 (bad request), 500 (error)';
    RAISE NOTICE '  • push_response: API response message';
    RAISE NOTICE '  • pushed_at: When lead was pushed';
    RAISE NOTICE '  • push_error: Error details if failed';
END $$;
