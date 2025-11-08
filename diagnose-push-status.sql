-- ==========================================
-- DIAGNOSE PUSH STATUS ISSUE
-- ==========================================
-- Check what's actually stored in the database

SELECT
    id,
    email,
    first_name,
    last_name,
    country,
    assigned_broker,
    pushed_to_crm,
    push_status_code,
    CASE
        WHEN push_response IS NULL THEN '❌ NULL'
        WHEN push_response = '' THEN '❌ EMPTY STRING'
        WHEN LENGTH(push_response) < 10 THEN '❌ TOO SHORT: ' || push_response
        ELSE '✅ Has data (' || LENGTH(push_response) || ' chars)'
    END as push_response_status,
    LEFT(push_response, 100) as push_response_preview,
    pushed_at,
    created_at
FROM signups
ORDER BY created_at DESC
LIMIT 5;

-- Also check if the columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'signups'
AND column_name IN ('pushed_to_crm', 'push_status_code', 'push_response', 'push_error', 'pushed_at')
ORDER BY column_name;
