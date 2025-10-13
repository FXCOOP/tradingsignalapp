-- ========================================
-- GCC SIGNAL PRO - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ========================================

-- 1. USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  access_tier VARCHAR(50) DEFAULT 'free',
  free_views_count INT DEFAULT 0,
  free_views_reset_date DATE DEFAULT CURRENT_DATE,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_tier CHECK (access_tier IN ('free', 'premium'))
);

-- 2. EMAIL VERIFICATION TOKENS
CREATE TABLE verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  token_type VARCHAR(50) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_token_type CHECK (token_type IN ('email_verification', 'password_reset'))
);

-- 3. BROKER ACCOUNTS
CREATE TABLE broker_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  broker_name VARCHAR(100) DEFAULT 'Exness',
  account_number VARCHAR(255),
  verification_status VARCHAR(50) DEFAULT 'pending',
  deposit_amount DECIMAL(10,2),
  submitted_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES users(id),
  affiliate_click_id VARCHAR(255),
  notes TEXT,
  CONSTRAINT valid_status CHECK (verification_status IN ('pending', 'verified', 'rejected'))
);

-- 4. USER ACTIVITY LOG
CREATE TABLE user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  content_id VARCHAR(255),
  content_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. ADMIN USERS
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_role CHECK (role IN ('admin', 'super_admin'))
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_access_tier ON users(access_tier);
CREATE INDEX idx_users_email_verified ON users(email_verified);
CREATE INDEX idx_broker_accounts_user_id ON broker_accounts(user_id);
CREATE INDEX idx_broker_accounts_status ON broker_accounts(verification_status);
CREATE INDEX idx_broker_accounts_click_id ON broker_accounts(affiliate_click_id);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at);
CREATE INDEX idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX idx_verification_tokens_user_id ON verification_tokens(user_id);

-- ========================================
-- FUNCTIONS
-- ========================================

-- Function to reset free views daily
CREATE OR REPLACE FUNCTION reset_free_views_if_needed()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET
    free_views_count = 0,
    free_views_reset_date = CURRENT_DATE
  WHERE
    free_views_reset_date < CURRENT_DATE
    AND access_tier = 'free';
END;
$$ LANGUAGE plpgsql;

-- Function to check if user can view content
CREATE OR REPLACE FUNCTION can_view_content(user_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier VARCHAR(50);
  user_views INT;
BEGIN
  SELECT access_tier, free_views_count INTO user_tier, user_views
  FROM users
  WHERE id = user_id_param;

  IF user_tier = 'premium' THEN
    RETURN TRUE;
  ELSIF user_tier = 'free' AND user_views < 3 THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- DONE! 🎉
-- Tables created successfully
-- ========================================
