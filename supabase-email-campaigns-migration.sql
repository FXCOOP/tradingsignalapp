-- ============================================
-- TradeFlow Automated Email Campaigns Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Add email tracking columns to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS day1_email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS day1_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week1_email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS week1_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_unsubscribed ON public.users(unsubscribed) WHERE unsubscribed = FALSE;

-- Step 2: Create email_queue table
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL, -- 'welcome', 'day1', 'week1'
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for email queue
CREATE INDEX IF NOT EXISTS idx_email_queue_scheduled ON public.email_queue(scheduled_for) WHERE sent = FALSE;
CREATE INDEX IF NOT EXISTS idx_email_queue_user ON public.email_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_type ON public.email_queue(email_type);
CREATE INDEX IF NOT EXISTS idx_email_queue_sent ON public.email_queue(sent);

-- Step 3: Create function to schedule emails
CREATE OR REPLACE FUNCTION schedule_user_emails()
RETURNS TRIGGER AS $$
BEGIN
  -- Only schedule if user is not unsubscribed
  IF NEW.unsubscribed = FALSE OR NEW.unsubscribed IS NULL THEN
    -- Schedule welcome email (immediate)
    INSERT INTO public.email_queue (user_id, email_type, scheduled_for)
    VALUES (NEW.id, 'welcome', NOW());

    -- Schedule day 1 email
    INSERT INTO public.email_queue (user_id, email_type, scheduled_for)
    VALUES (NEW.id, 'day1', NOW() + INTERVAL '1 day');

    -- Schedule week 1 email
    INSERT INTO public.email_queue (user_id, email_type, scheduled_for)
    VALUES (NEW.id, 'week1', NOW() + INTERVAL '7 days');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create trigger on user registration
DROP TRIGGER IF EXISTS trigger_schedule_emails ON public.users;

CREATE TRIGGER trigger_schedule_emails
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION schedule_user_emails();

-- Step 5: Create function to handle unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_user(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.users
  SET unsubscribed = TRUE,
      unsubscribed_at = NOW()
  WHERE email = user_email;

  -- Delete pending emails
  DELETE FROM public.email_queue
  WHERE user_id IN (SELECT id FROM public.users WHERE email = user_email)
    AND sent = FALSE;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create email_logs table for tracking
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'sent', 'failed', 'bounced', 'opened', 'clicked'
  message_id TEXT,
  error TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_logs_user ON public.email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON public.email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created ON public.email_logs(created_at);

-- Step 7: Create view for email stats
CREATE OR REPLACE VIEW email_campaign_stats AS
SELECT
  email_type,
  COUNT(*) as total_sent,
  SUM(CASE WHEN sent = TRUE THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN error IS NOT NULL THEN 1 ELSE 0 END) as failed,
  AVG(CASE WHEN sent = TRUE THEN EXTRACT(EPOCH FROM (sent_at - created_at)) ELSE NULL END) as avg_delay_seconds
FROM email_queue
GROUP BY email_type;

-- Step 8: Grant permissions (if needed for API access)
-- GRANT SELECT, INSERT, UPDATE ON public.email_queue TO authenticated;
-- GRANT SELECT, INSERT ON public.email_logs TO authenticated;
-- GRANT SELECT ON email_campaign_stats TO authenticated;

-- ============================================
-- Verification Queries
-- ============================================

-- Check if columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('welcome_email_sent', 'day1_email_sent', 'week1_email_sent', 'unsubscribed');

-- Check if email_queue table exists
SELECT * FROM information_schema.tables WHERE table_name = 'email_queue';

-- Check if trigger exists
SELECT trigger_name FROM information_schema.triggers WHERE trigger_name = 'trigger_schedule_emails';

-- ============================================
-- Test Data (Optional - for testing only)
-- ============================================

-- Insert test user (this will trigger email scheduling)
-- INSERT INTO public.users (email, full_name, password_hash)
-- VALUES ('test@example.com', 'Test User', '$2a$10$test_hash_placeholder');

-- Check scheduled emails
-- SELECT * FROM public.email_queue WHERE user_id IN (SELECT id FROM users WHERE email = 'test@example.com');

-- ============================================
-- Maintenance Queries
-- ============================================

-- Clean up old sent emails (older than 30 days)
-- DELETE FROM public.email_queue WHERE sent = TRUE AND sent_at < NOW() - INTERVAL '30 days';

-- Retry failed emails (reset them)
-- UPDATE public.email_queue
-- SET sent = FALSE, error = NULL, retry_count = retry_count + 1
-- WHERE sent = FALSE AND error IS NOT NULL AND retry_count < 3;

-- View email campaign performance
-- SELECT * FROM email_campaign_stats;

-- ============================================
-- Success Message
-- ============================================
SELECT '✅ Email campaigns database setup complete!' as status;
