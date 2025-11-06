-- ==========================================
-- QUICK FIX: Temporarily Disable RLS
-- ==========================================
-- This will make your form work IMMEDIATELY
-- Run this single line in Supabase SQL Editor:

ALTER TABLE signups DISABLE ROW LEVEL SECURITY;

-- ✅ After running this, your form should work!
--
-- ⚠️ NOTE: This disables security on the signups table
-- It's OK for testing, but you should re-enable RLS later
-- and configure proper policies.
--
-- To re-enable RLS later, run:
-- ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
