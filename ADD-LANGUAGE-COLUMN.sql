-- Add language column to users table for signup form
-- Run this in your Supabase SQL Editor

-- Add language column (2-character language code)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_language ON users(language);

-- Add comment
COMMENT ON COLUMN users.language IS 'User preferred language (ISO 639-1 code): en, ar, zh, es, etc.';

-- Update existing users to 'en' if NULL
UPDATE users SET language = 'en' WHERE language IS NULL;

-- Verify the change
SELECT column_name, data_type, character_maximum_length, column_default
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'language';
