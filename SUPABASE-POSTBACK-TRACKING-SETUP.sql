-- ================================================
-- EXNESS POSTBACK TRACKING - DATABASE SETUP
-- ================================================
-- Purpose: Add tables to track Exness affiliate clicks and conversions
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================

-- 1. Add broker tracking fields to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS broker_name TEXT,
  ADD COLUMN IF NOT EXISTS broker_verified_at TIMESTAMPTZ;

-- 2. Create table to track when users click Exness affiliate links
CREATE TABLE IF NOT EXISTS exness_clicks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  click_url TEXT NOT NULL,
  partner_id TEXT NOT NULL,  -- Your Exness partner ID (e.g., c_8f0nxidtbt)
  ip_address TEXT,
  user_agent TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create table to track conversion postbacks from Exness
CREATE TABLE IF NOT EXISTS exness_conversions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  partner_id TEXT NOT NULL,
  event_type TEXT NOT NULL,  -- 'FTD' (First Time Deposit), 'Deposit', etc.
  ftd_amount DECIMAL(10,2),  -- Deposit amount in USD
  exness_user_id TEXT,       -- Exness's internal user ID
  raw_postback_data JSONB,   -- Store full postback JSON for debugging
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  received_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_exness_clicks_user_id ON exness_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_partner_id ON exness_clicks(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_clicked_at ON exness_clicks(clicked_at DESC);

CREATE INDEX IF NOT EXISTS idx_exness_conversions_user_id ON exness_conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_partner_id ON exness_conversions(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_processed ON exness_conversions(processed);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_received_at ON exness_conversions(received_at DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE exness_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE exness_conversions ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Users can view own clicks" ON exness_clicks;
DROP POLICY IF EXISTS "Users can view own conversions" ON exness_conversions;

-- 7. Create RLS policies (users can only see their own data)
CREATE POLICY "Users can view own clicks"
  ON exness_clicks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own conversions"
  ON exness_conversions FOR SELECT
  USING (auth.uid() = user_id);

-- ================================================
-- VERIFICATION QUERIES
-- ================================================
-- Run these to verify tables were created:

-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('exness_clicks', 'exness_conversions')
ORDER BY table_name;

-- Check column structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'exness_clicks'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'exness_conversions'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('exness_clicks', 'exness_conversions')
ORDER BY tablename, indexname;

-- ================================================
-- TEST DATA (Optional - for development/testing)
-- ================================================
-- Uncomment to insert test data:

/*
-- Insert test click (replace user_id with real user ID from your database)
INSERT INTO exness_clicks (user_id, click_url, partner_id, ip_address, user_agent)
VALUES (
  'YOUR-USER-UUID-HERE',  -- Replace with actual user ID
  'https://one.exnesstrack.net/a/c_8f0nxidtbt',
  'c_8f0nxidtbt',
  '192.168.1.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
);

-- Insert test conversion (replace user_id with same user ID)
INSERT INTO exness_conversions (user_id, partner_id, event_type, ftd_amount, exness_user_id, raw_postback_data, processed)
VALUES (
  'YOUR-USER-UUID-HERE',  -- Replace with actual user ID
  'c_8f0nxidtbt',
  'FTD',
  50.00,
  'exness-test-user-123',
  '{"partner_id":"c_8f0nxidtbt","event_type":"FTD","ftd_amount":"50.00"}'::jsonb,
  false
);
*/

-- ================================================
-- CLEANUP (if needed)
-- ================================================
-- Use these ONLY if you need to start fresh:

/*
DROP TABLE IF EXISTS exness_conversions CASCADE;
DROP TABLE IF EXISTS exness_clicks CASCADE;
ALTER TABLE users DROP COLUMN IF EXISTS broker_name;
ALTER TABLE users DROP COLUMN IF EXISTS broker_verified_at;
*/

-- ================================================
-- SUCCESS!
-- ================================================
-- If you see "Success. No rows returned" above, the setup is complete!
-- Next steps:
-- 1. Create API endpoints (see EXNESS-POSTBACK-COMPLETE-GUIDE.html)
-- 2. Update BrokerPromptModal to track clicks
-- 3. Configure postback URL in Exness Partners dashboard
-- ================================================
