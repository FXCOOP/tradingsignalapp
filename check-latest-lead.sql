-- Check the test lead I just created
SELECT
    email,
    first_name,
    last_name,
    country,
    assigned_broker,
    pushed_to_crm,
    push_status_code,
    push_error,
    LEFT(push_response, 200) as response_preview,
    pushed_at,
    created_at
FROM signups
WHERE email = 'apitest999@example.com'
ORDER BY created_at DESC
LIMIT 1;

-- Also check the most recent 3 leads to see push status
SELECT
    email,
    country,
    pushed_to_crm,
    push_status_code,
    CASE
        WHEN push_status_code = 200 THEN '✅ Success'
        WHEN push_status_code IS NULL THEN '❌ Not pushed'
        ELSE '❌ Failed'
    END as status,
    pushed_at,
    created_at
FROM signups
ORDER BY created_at DESC
LIMIT 5;
