-- ============================================
-- AUTOMATIC BROKER PUSH TRIGGER
-- ============================================
-- This trigger automatically pushes new leads to brokers
-- when they are inserted into the signups table
--
-- Flow: Landing Page → Supabase → Auto-trigger → Broker Assignment → Push to Broker
-- ============================================

-- Step 1: Enable the pg_net extension (for making HTTP requests from database)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Step 2: Create a function that will be called by the trigger
CREATE OR REPLACE FUNCTION auto_push_to_broker()
RETURNS TRIGGER AS $$
DECLARE
  api_url text;
  request_id bigint;
BEGIN
  -- Set your API URL (use your production domain)
  api_url := 'https://tradeflow.blog/api/push-to-broker';

  -- Log the trigger execution
  RAISE NOTICE 'Auto-push trigger fired for signup ID: %', NEW.id;

  -- Make async HTTP POST request to push-to-broker API
  -- This uses pg_net extension to call your API from the database
  SELECT INTO request_id net.http_post(
    url := api_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'signupId', NEW.id
    )::jsonb
  );

  -- Log the request ID
  RAISE NOTICE 'HTTP request sent with ID: %', request_id;

  -- Return NEW to allow the insert to proceed
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create the trigger on the signups table
DROP TRIGGER IF EXISTS trigger_auto_push_to_broker ON signups;

CREATE TRIGGER trigger_auto_push_to_broker
  AFTER INSERT ON signups
  FOR EACH ROW
  EXECUTE FUNCTION auto_push_to_broker();

-- Step 4: Verify the trigger was created
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'signups'
  AND trigger_name = 'trigger_auto_push_to_broker';

-- ============================================
-- HOW IT WORKS:
-- ============================================
-- 1. Landing page saves lead directly to Supabase signups table
-- 2. Trigger fires automatically on INSERT
-- 3. Trigger calls /api/push-to-broker with signup ID
-- 4. API applies your rules and assigns broker
-- 5. Lead gets pushed to correct broker automatically
--
-- No manual action needed!
-- ============================================

-- ============================================
-- TESTING THE TRIGGER:
-- ============================================
-- Insert a test lead to verify trigger works:
--
-- INSERT INTO signups (
--   first_name, last_name, email, country_code, phone_number,
--   country, terms_accepted
-- ) VALUES (
--   'Test', 'User', 'test@example.com', '+60', '123456789',
--   'Malaysia', true
-- );
--
-- Then check the signups table to see if:
-- - pushed_to_crm = true
-- - push_status_code = 200
-- - assigned_broker shows the correct broker
-- ============================================

-- ============================================
-- MONITORING:
-- ============================================
-- View all HTTP requests made by the trigger:
-- SELECT * FROM net._http_response ORDER BY created DESC LIMIT 10;
-- ============================================
