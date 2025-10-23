-- ================================================================
-- GOOGLE ADS TRACKING SCHEMA FOR EGYPT CAMPAIGN
-- Add GCLID and UTM tracking to exness_clicks table
-- Run this in Supabase SQL Editor
-- ================================================================

-- Step 1: Check current schema of exness_clicks
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'exness_clicks'
ORDER BY ordinal_position;

-- Step 2: Add UNIVERSAL click tracking columns (supports ALL ad platforms)
ALTER TABLE exness_clicks
ADD COLUMN IF NOT EXISTS click_id TEXT,          -- Universal click ID (use this for all platforms)
ADD COLUMN IF NOT EXISTS gclid TEXT,             -- Google Ads Click ID
ADD COLUMN IF NOT EXISTS fbclid TEXT,            -- Facebook Click ID
ADD COLUMN IF NOT EXISTS msclkid TEXT,           -- Microsoft/Bing Ads Click ID
ADD COLUMN IF NOT EXISTS ttclid TEXT,            -- TikTok Click ID
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,      -- Campaign name
ADD COLUMN IF NOT EXISTS utm_term TEXT,          -- Keyword/term
ADD COLUMN IF NOT EXISTS utm_content TEXT,       -- Ad variation
ADD COLUMN IF NOT EXISTS utm_source TEXT,        -- Traffic source (google, facebook, etc.)
ADD COLUMN IF NOT EXISTS utm_medium TEXT,        -- Medium (cpc, social, etc.)
ADD COLUMN IF NOT EXISTS geo TEXT,               -- Geographic target (egypt, uae, etc.)
ADD COLUMN IF NOT EXISTS lang TEXT;              -- Language (ar, en, es)

-- Step 3: Create indexes for FAST lookups across ALL platforms
CREATE INDEX IF NOT EXISTS idx_exness_clicks_click_id
ON exness_clicks(click_id)
WHERE click_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_gclid
ON exness_clicks(gclid)
WHERE gclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_fbclid
ON exness_clicks(fbclid)
WHERE fbclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_msclkid
ON exness_clicks(msclkid)
WHERE msclkid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_ttclid
ON exness_clicks(ttclid)
WHERE ttclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_utm_source
ON exness_clicks(utm_source)
WHERE utm_source IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_utm_campaign
ON exness_clicks(utm_campaign)
WHERE utm_campaign IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_clicks_geo
ON exness_clicks(geo)
WHERE geo IS NOT NULL;

-- Step 4: Add the same UNIVERSAL tracking to exness_conversions
ALTER TABLE exness_conversions
ADD COLUMN IF NOT EXISTS click_id TEXT,          -- Universal click ID
ADD COLUMN IF NOT EXISTS gclid TEXT,             -- Google Ads Click ID
ADD COLUMN IF NOT EXISTS fbclid TEXT,            -- Facebook Click ID
ADD COLUMN IF NOT EXISTS msclkid TEXT,           -- Microsoft/Bing Ads Click ID
ADD COLUMN IF NOT EXISTS ttclid TEXT,            -- TikTok Click ID
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,      -- Campaign name
ADD COLUMN IF NOT EXISTS utm_term TEXT,          -- Keyword/term
ADD COLUMN IF NOT EXISTS utm_content TEXT,       -- Ad variation
ADD COLUMN IF NOT EXISTS utm_source TEXT;        -- Traffic source

CREATE INDEX IF NOT EXISTS idx_exness_conversions_click_id
ON exness_conversions(click_id)
WHERE click_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_conversions_gclid
ON exness_conversions(gclid)
WHERE gclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_conversions_fbclid
ON exness_conversions(fbclid)
WHERE fbclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exness_conversions_utm_source
ON exness_conversions(utm_source)
WHERE utm_source IS NOT NULL;

-- Step 5: Verify ALL tracking columns were added
SELECT
    'exness_clicks' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'exness_clicks'
  AND column_name IN (
    'click_id', 'gclid', 'fbclid', 'msclkid', 'ttclid',
    'utm_campaign', 'utm_term', 'utm_content', 'utm_source', 'utm_medium',
    'geo', 'lang'
  )

UNION ALL

SELECT
    'exness_conversions' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'exness_conversions'
  AND column_name IN (
    'click_id', 'gclid', 'fbclid', 'msclkid', 'ttclid',
    'utm_campaign', 'utm_term', 'utm_content', 'utm_source'
  )
ORDER BY table_name, column_name;

-- ================================================================
-- EXPECTED RESULT:
-- You should see all the new columns listed above
-- If you see them, your database is ready for Google Ads tracking!
-- ================================================================

-- Step 6: Test insert (optional - to verify schema)
-- Uncomment to test:
/*
INSERT INTO exness_clicks (
    user_id,
    click_url,
    partner_id,
    gclid,
    utm_campaign,
    utm_term,
    utm_content,
    utm_source,
    utm_medium,
    geo,
    lang,
    ip_address,
    user_agent
) VALUES (
    '6ed73f2d-6a35-47ca-a0f5-f8610c7ec6e1', -- Use a real user_id from your users table
    'https://one.exnesstrack.net/a/c_8f0nxidtbt',
    'c_8f0nxidtbt',
    'Cj0KCQiA_test_12345',  -- Test GCLID
    'EG_AR_Search_Core_MaxConv',
    'تعلم تداول الفوركس',
    'ad1_12345',
    'google',
    'cpc',
    'egypt',
    'ar',
    '156.160.45.123',
    'Mozilla/5.0 Test'
);

-- Check if insert worked
SELECT * FROM exness_clicks WHERE gclid = 'Cj0KCQiA_test_12345';

-- Clean up test data
-- DELETE FROM exness_clicks WHERE gclid = 'Cj0KCQiA_test_12345';
*/
