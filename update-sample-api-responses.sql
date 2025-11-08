-- ==========================================
-- ADD SAMPLE API RESPONSES FOR TESTING
-- ==========================================
-- This adds realistic Trading CRM API responses to existing leads
-- so you can click and view the full response modal

-- Update first lead with SUCCESS response
UPDATE signups
SET
    pushed_to_crm = TRUE,
    push_status_code = 200,
    push_response = jsonb_build_object(
        'success', true,
        'leadId', 'CRM-' || id || '-' || extract(epoch from created_at)::bigint,
        'redirectUrl', 'https://worldinsight-update.com/terima-kasih.html',
        'timestamp', pushed_at,
        'message', 'Lead successfully sent to Trading CRM',
        'rawResponse', jsonb_build_object(
            'id', 'CRM-' || id || '-' || extract(epoch from created_at)::bigint,
            'accountId', 'ACC-' || floor(random() * 1000000)::text,
            'email', email,
            'status', 'registered',
            'country', 'MY',
            'language', 'ms',
            'promotionCode', 'defaultAcademiesGroup',
            'affiliateTransactionId', 'LEAD_' || id,
            'createdAt', pushed_at,
            'tradingPlatform', 'MT5',
            'accountType', 'demo',
            'currency', 'USD',
            'leverage', '1:100',
            'server', 'TradingCRM-Demo'
        )
    )::text,
    push_error = NULL,
    pushed_at = COALESCE(pushed_at, created_at)
WHERE email = 'sadasdas3@gmail.com';

-- Update second lead with SUCCESS response
UPDATE signups
SET
    pushed_to_crm = TRUE,
    push_status_code = 200,
    push_response = jsonb_build_object(
        'success', true,
        'leadId', 'CRM-' || id || '-' || extract(epoch from created_at)::bigint,
        'redirectUrl', 'https://worldinsight-update.com/terima-kasih.html',
        'timestamp', pushed_at,
        'message', 'Lead successfully sent to Trading CRM',
        'rawResponse', jsonb_build_object(
            'id', 'CRM-' || id || '-' || extract(epoch from created_at)::bigint,
            'accountId', 'ACC-' || floor(random() * 1000000)::text,
            'email', email,
            'status', 'registered',
            'country', 'MY',
            'language', 'ms',
            'promotionCode', 'defaultAcademiesGroup',
            'affiliateTransactionId', 'LEAD_' || id,
            'createdAt', pushed_at,
            'tradingPlatform', 'MT5',
            'accountType', 'live',
            'currency', 'USD',
            'leverage', '1:200',
            'server', 'TradingCRM-Live01',
            'loginCredentials', jsonb_build_object(
                'username', 'trader_' || floor(random() * 1000000)::text,
                'passwordSent', true
            )
        )
    )::text,
    push_error = NULL,
    pushed_at = COALESCE(pushed_at, created_at)
WHERE email = 'sadasdas2@gmail.com';

-- Optional: Create a FAILED example (uncomment if you want to test error modal)
/*
INSERT INTO signups (
    first_name, last_name, email, phone_number, country_code, country,
    lead_status, assigned_broker, pushed_to_crm, push_status_code,
    push_response, push_error, pushed_at, created_at
)
VALUES (
    'Failed', 'Test', 'failed.test@example.com', '1234567890', '+60', 'Malaysia',
    'new', 'Trading CRM - AFF 225X', FALSE, 500,
    jsonb_build_object(
        'success', false,
        'error', 'Invalid phone number format',
        'timestamp', NOW(),
        'rawResponse', jsonb_build_object(
            'statusCode', 500,
            'message', 'Phone number must include country code',
            'errorCode', 'INVALID_PHONE',
            'field', 'phone',
            'received', '+601234567890',
            'expected', 'E.164 format: +60123456789'
        )
    )::text,
    'Invalid phone number format',
    NOW(),
    NOW()
);
*/

-- Verification query
SELECT
    first_name,
    last_name,
    email,
    push_status_code,
    LENGTH(push_response) as response_length,
    pushed_at
FROM signups
WHERE email IN ('sadasdas3@gmail.com', 'sadasdas2@gmail.com')
ORDER BY created_at DESC;
