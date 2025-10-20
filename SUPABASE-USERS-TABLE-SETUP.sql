-- ============================================
-- GCC Signal Pro - Supabase Users Table Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor to create the users table
-- This fixes the "Could not find the table 'public.users'" error

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    access_level TEXT NOT NULL DEFAULT 'free' CHECK (access_level IN ('free', 'premium')),
    has_broker_account BOOLEAN NOT NULL DEFAULT FALSE,
    free_signals_count INTEGER NOT NULL DEFAULT 0,
    free_articles_count INTEGER NOT NULL DEFAULT 0,
    broker_verified_at TIMESTAMPTZ,
    email_verification_token TEXT,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Create index on access_level for filtering
CREATE INDEX IF NOT EXISTS idx_users_access_level ON public.users(access_level);

-- Create index on has_broker_account for premium user queries
CREATE INDEX IF NOT EXISTS idx_users_has_broker_account ON public.users(has_broker_account);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only read their own data
CREATE POLICY "Users can view own data"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Create RLS policy: Users can update their own data
CREATE POLICY "Users can update own data"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Create RLS policy: Service role can do everything (for API signup)
CREATE POLICY "Service role has full access"
    ON public.users
    FOR ALL
    USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================
-- Uncomment to create a test user
-- Password: "testpass123" (hashed with bcrypt)
/*
INSERT INTO public.users (email, password_hash, full_name, access_level, has_broker_account)
VALUES (
    'test@gccsignalpro.com',
    '$2a$10$YourHashedPasswordHere',
    'Test User',
    'free',
    FALSE
);
*/

-- ============================================
-- Verification Queries
-- ============================================
-- Run these to verify the table was created successfully

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'users' AND schemaname = 'public';

-- Check RLS policies
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users' AND schemaname = 'public';

-- ============================================
-- Next Steps After Running This SQL
-- ============================================
-- 1. Verify the table was created: SELECT * FROM public.users LIMIT 1;
-- 2. Test signup API: POST /api/auth/signup with test credentials
-- 3. Check Supabase dashboard to see the new user
-- 4. Update environment variables if needed:
--    - SUPABASE_URL
--    - SUPABASE_SERVICE_KEY (service_role key, not anon key)
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
