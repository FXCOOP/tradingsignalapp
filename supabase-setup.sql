-- =====================================================
-- TRADING MENTOR SIGNUPS TABLE - SUPABASE SETUP
-- =====================================================

-- Drop existing table if you want to start fresh (CAREFUL: This deletes all data!)
-- DROP TABLE IF EXISTS signups CASCADE;

-- Create the signups table
CREATE TABLE IF NOT EXISTS signups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT,
    trading_experience TEXT DEFAULT 'not_specified',
    account_size TEXT DEFAULT 'not_specified',
    lead_source TEXT DEFAULT 'mentorship-website',
    lead_type TEXT DEFAULT 'high-intent-mentorship',
    lead_status TEXT DEFAULT 'new',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    terms_accepted BOOLEAN DEFAULT true,
    detected_country TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    page_language TEXT DEFAULT 'en',
    signup_timestamp TIMESTAMP WITH TIME ZONE
);

-- Add unique constraint on email
ALTER TABLE signups ADD CONSTRAINT signups_email_unique UNIQUE (email);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signups_lead_status ON signups(lead_status);
CREATE INDEX IF NOT EXISTS idx_signups_country ON signups(country);
CREATE INDEX IF NOT EXISTS idx_signups_page_language ON signups(page_language);

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON signups;
DROP POLICY IF EXISTS "Allow authenticated reads" ON signups;

-- Create policy to allow inserts from anyone (for public form submissions)
CREATE POLICY "Allow public inserts"
ON signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read all records
CREATE POLICY "Allow authenticated reads"
ON signups
FOR SELECT
TO authenticated
USING (true);

-- Optional: Create policy for service role to do everything
CREATE POLICY "Allow service role all"
ON signups
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
