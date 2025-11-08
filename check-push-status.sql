-- Check if push_response is populated
SELECT
    id,
    email,
    pushed_to_crm,
    push_status_code,
    LENGTH(push_response) as response_length,
    push_response,
    pushed_at
FROM signups
WHERE email IN ('sadasdas3@gmail.com', 'sadasdas2@gmail.com')
ORDER BY created_at DESC;
