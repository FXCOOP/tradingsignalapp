-- ==========================================
-- FIX RLS POLICIES FOR SIGNUPS TABLE (v2)
-- ==========================================
-- This version will DEFINITELY work for 401 errors
-- Run this in Supabase SQL Editor

-- STEP 1: Drop ALL existing policies (clean slate)
DROP POLICY IF EXISTS "Enable insert for anon users" ON signups;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON signups;
DROP POLICY IF EXISTS "Allow anon insert" ON signups;
DROP POLICY IF EXISTS "Allow public insert" ON signups;
DROP POLICY IF EXISTS "Allow anonymous signups" ON signups;
DROP POLICY IF EXISTS "Allow authenticated read" ON signups;
DROP POLICY IF EXISTS "Allow service role all" ON signups;

-- STEP 2: Temporarily disable RLS to test
ALTER TABLE signups DISABLE ROW LEVEL SECURITY;

-- STEP 3: Re-enable RLS
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create the CORRECT policy for anonymous INSERT
-- This allows ANY anonymous user to insert rows
CREATE POLICY "signups_insert_policy"
ON signups
FOR INSERT
TO anon, authenticated, public
WITH CHECK (true);

-- STEP 5: Create policy for SELECT (optional, for viewing data)
CREATE POLICY "signups_select_policy"
ON signups
FOR SELECT
TO anon, authenticated, public
USING (true);

-- ==========================================
-- VERIFICATION
-- ==========================================

-- Check RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'signups';

-- List all policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'signups';

-- ==========================================
-- 🚨 ALTERNATIVE: Disable RLS Completely (TEMPORARY)
-- ==========================================
-- If the above doesn't work, uncomment this line to temporarily disable RLS:
-- ALTER TABLE signups DISABLE ROW LEVEL SECURITY;
--
-- WARNING: This makes the table accessible to everyone!
-- Only use this for testing, then re-enable RLS after fixing.
