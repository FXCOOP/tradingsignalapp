-- Migration: Add email to exness_clicks table
-- This allows matching postbacks to users by email instead of just IP/time

-- Add email column to exness_clicks table
ALTER TABLE exness_clicks
ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Add index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_exness_clicks_email
ON exness_clicks(user_email, clicked_at DESC);

-- Add click_id column (for reference in postback)
ALTER TABLE exness_clicks
ADD COLUMN IF NOT EXISTS click_id TEXT UNIQUE;

-- Update existing rows to have click_id
UPDATE exness_clicks
SET click_id = id::text
WHERE click_id IS NULL;

-- Add index for click_id lookups
CREATE INDEX IF NOT EXISTS idx_exness_clicks_click_id
ON exness_clicks(click_id);

-- Optional: Add email to exness_conversions table too
ALTER TABLE exness_conversions
ADD COLUMN IF NOT EXISTS user_email TEXT;

CREATE INDEX IF NOT EXISTS idx_exness_conversions_email
ON exness_conversions(user_email);

-- Show updated schema
\d exness_clicks;
