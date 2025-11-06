-- =====================================================
-- ALTER EXISTING SIGNUPS TABLE - ADD MISSING COLUMNS
-- Use this if the table already exists
-- =====================================================

-- Add missing columns if they don't exist
ALTER TABLE signups ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS country_code TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS trading_experience TEXT DEFAULT 'not_specified';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS account_size TEXT DEFAULT 'not_specified';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'mentorship-website';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'high-intent-mentorship';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'new';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT true;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS detected_country TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS page_language TEXT DEFAULT 'en';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS signup_timestamp TIMESTAMP WITH TIME ZONE;

-- Add unique constraint on email (will fail if duplicates exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'signups_email_unique'
    ) THEN
        ALTER TABLE signups ADD CONSTRAINT signups_email_unique UNIQUE (email);
    END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signups_lead_status ON signups(lead_status);
CREATE INDEX IF NOT EXISTS idx_signups_country ON signups(country);
CREATE INDEX IF NOT EXISTS idx_signups_page_language ON signups(page_language);

-- Enable RLS if not already enabled
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Update existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON signups;
DROP POLICY IF EXISTS "Allow authenticated reads" ON signups;

CREATE POLICY "Allow public inserts"
ON signups
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated reads"
ON signups
FOR SELECT
TO authenticated
USING (true);
