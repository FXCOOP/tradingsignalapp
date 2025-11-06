-- ============================================
-- GCC Signal Pro - Signups Table Schema
-- For Supabase Database
-- ============================================

-- Create the signups table
CREATE TABLE signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,

  -- Phone Information
  country_code VARCHAR(10) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  full_phone_number VARCHAR(100) GENERATED ALWAYS AS (country_code || phone_number) STORED,

  -- Location
  country VARCHAR(10) NOT NULL,
  detected_country VARCHAR(10),

  -- Trading Profile (Optional)
  trading_experience VARCHAR(50),
  account_size VARCHAR(50),

  -- Terms & Conditions
  terms_accepted BOOLEAN NOT NULL DEFAULT true,
  terms_accepted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  -- Tracking Information
  ip_address VARCHAR(100),
  user_agent TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- Status
  status VARCHAR(50) DEFAULT 'new',
  contacted BOOLEAN DEFAULT false,
  contacted_at TIMESTAMP WITH TIME ZONE,
  assigned_broker VARCHAR(255),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_signups_email ON signups(email);
CREATE INDEX idx_signups_country ON signups(country);
CREATE INDEX idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX idx_signups_status ON signups(status);
CREATE INDEX idx_signups_contacted ON signups(contacted);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_signups_updated_at
  BEFORE UPDATE ON signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admin access)
CREATE POLICY "Enable read access for authenticated users" ON signups
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy for inserting (public can insert)
CREATE POLICY "Enable insert for all users" ON signups
  FOR INSERT
  WITH CHECK (true);

-- Create policy for updating (only authenticated users)
CREATE POLICY "Enable update for authenticated users" ON signups
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================
-- Optional: Create view for analytics
-- ============================================
CREATE VIEW signup_analytics AS
SELECT
  DATE(created_at) as signup_date,
  country,
  COUNT(*) as total_signups,
  COUNT(CASE WHEN contacted = true THEN 1 END) as contacted_count,
  COUNT(CASE WHEN contacted = false THEN 1 END) as pending_count
FROM signups
GROUP BY DATE(created_at), country
ORDER BY signup_date DESC, total_signups DESC;

-- ============================================
-- Optional: Create function to get recent signups
-- ============================================
CREATE OR REPLACE FUNCTION get_recent_signups(limit_count INT DEFAULT 10)
RETURNS TABLE (
  id UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  country VARCHAR,
  full_phone_number VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.first_name,
    s.last_name,
    s.email,
    s.country,
    s.full_phone_number,
    s.created_at
  FROM signups s
  ORDER BY s.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SETUP INSTRUCTIONS
-- ============================================
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
-- 5. Verify the table was created in the Table Editor
--
-- Your table is now ready to receive signups!
-- ============================================

COMMENT ON TABLE signups IS 'Stores user signups from the landing page popup';
COMMENT ON COLUMN signups.status IS 'Status: new, contacted, qualified, converted, rejected';
COMMENT ON COLUMN signups.terms_accepted IS 'User accepted terms and conditions';