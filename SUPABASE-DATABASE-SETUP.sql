-- ========================================
-- GCC SIGNAL PRO - AUTHENTICATION DATABASE
-- Copy this ENTIRE file and run in Supabase SQL Editor
-- ========================================

-- Drop existing tables if they exist (CAREFUL!)
DROP TABLE IF EXISTS broker_postbacks CASCADE;
DROP TABLE IF EXISTS user_activity CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE (matches API expectations)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),

  -- Access Control
  access_level VARCHAR(20) DEFAULT 'free', -- 'free' or 'premium'
  free_signals_count INT DEFAULT 0,        -- How many signals viewed
  free_articles_count INT DEFAULT 0,       -- How many articles viewed

  -- Broker Integration
  has_broker_account BOOLEAN DEFAULT false,
  broker_verified_at TIMESTAMP,
  broker_trader_id VARCHAR(255),
  broker_name VARCHAR(100) DEFAULT 'exness',

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,

  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_access_level CHECK (access_level IN ('free', 'premium'))
);

-- 2. USER ACTIVITY TABLE (tracks what users view)
CREATE TABLE user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,      -- 'view_signal', 'view_article', etc.
  resource_type VARCHAR(50) NOT NULL,    -- 'signal', 'article', 'course'
  resource_id VARCHAR(255) NOT NULL,     -- The ID of the signal/article
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. BROKER POSTBACKS TABLE (logs Exness webhooks)
CREATE TABLE broker_postbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  broker_name VARCHAR(100) NOT NULL,
  event_type VARCHAR(50) NOT NULL,       -- 'account_verified', 'deposit_made', etc.
  raw_data JSONB NOT NULL,               -- Full webhook payload
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_access_level ON users(access_level);
CREATE INDEX idx_users_broker ON users(has_broker_account);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_resource ON user_activity(resource_type, resource_id);
CREATE INDEX idx_broker_postbacks_user_id ON broker_postbacks(user_id);

-- ========================================
-- ROW LEVEL SECURITY (RLS) - OPTIONAL
-- ========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_postbacks ENABLE ROW LEVEL SECURITY;

-- Allow service role to do anything (our API uses service_role_key)
CREATE POLICY "Allow service role full access to users"
  ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to user_activity"
  ON user_activity
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to broker_postbacks"
  ON broker_postbacks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ========================================
-- TEST DATA (for development)
-- ========================================

-- Create 3 test users
INSERT INTO users (email, password_hash, full_name, access_level, free_signals_count)
VALUES
  ('free@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLhJ8GEu', 'Free User', 'free', 0),     -- password: password123
  ('premium@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLhJ8GEu', 'Premium User', 'premium', 0), -- password: password123
  ('test@test.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzpLhJ8GEu', 'Test User', 'free', 2);      -- password: password123

-- Mark premium user as having broker account
UPDATE users SET has_broker_account = true, broker_verified_at = NOW() WHERE email = 'premium@test.com';

-- ========================================
-- VERIFICATION
-- ========================================

-- Check if tables were created successfully
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('users', 'user_activity', 'broker_postbacks');

-- Show test users
SELECT id, email, access_level, free_signals_count, has_broker_account FROM users;

-- ========================================
-- DONE! 🎉
-- ========================================
-- Next steps:
-- 1. Refresh your browser at localhost:3000
-- 2. Click "Sign Up Free" button
-- 3. Test login with: test@test.com / password123
-- ========================================
