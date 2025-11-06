-- ==========================================
-- FIX RLS POLICIES FOR SIGNUPS TABLE
-- ==========================================
-- Run this in Supabase SQL Editor if form submissions are failing
-- https://supabase.com/dashboard/project/bsupjdeayuylynsdmfdx/sql/new

-- 1. Drop existing policies (if any)
DROP POLICY IF EXISTS "Enable insert for anon users" ON signups;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON signups;
DROP POLICY IF EXISTS "Allow anon insert" ON signups;
DROP POLICY IF EXISTS "Allow public insert" ON signups;

-- 2. Enable RLS (if not already enabled)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- 3. Create NEW policy to allow anonymous INSERT
CREATE POLICY "Allow anonymous signups"
ON signups
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create policy to allow authenticated users to SELECT
CREATE POLICY "Allow authenticated read"
ON signups
FOR SELECT
TO authenticated
USING (true);

-- 5. (Optional) Allow service role full access
CREATE POLICY "Allow service role all"
ON signups
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ==========================================
-- VERIFICATION QUERIES
-- ==========================================

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'signups' AND schemaname = 'public';
-- Should show: rowsecurity = true

-- List all policies on signups table
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'signups' AND schemaname = 'public';

-- ==========================================
-- TEST INSERT (Run this AFTER creating policies)
-- ==========================================
-- This should succeed if policies are correct
-- INSERT INTO signups (first_name, last_name, email, phone_number, country)
-- VALUES ('Test', 'User', 'test@example.com', '+60123456789', 'Malaysia');
