-- ==========================================
-- SIMPLE VERSION: Add API Responses
-- ==========================================
-- Works with all PostgreSQL/Supabase versions

-- Update first lead
UPDATE signups
SET
    pushed_to_crm = TRUE,
    push_status_code = 200,
    push_response = '{"success":true,"leadId":"CRM-12345-1699234567","redirectUrl":"https://worldinsight-update.com/terima-kasih.html","timestamp":"2025-11-06T10:30:00Z","message":"Lead successfully sent to Trading CRM","rawResponse":{"id":"CRM-12345-1699234567","accountId":"ACC-847562","email":"sadasdas3@gmail.com","status":"registered","country":"MY","language":"ms","promotionCode":"defaultAcademiesGroup","affiliateTransactionId":"LEAD_12345","tradingPlatform":"MT5","accountType":"demo","currency":"USD","leverage":"1:100","server":"TradingCRM-Demo"}}',
    push_error = NULL,
    pushed_at = COALESCE(pushed_at, NOW())
WHERE email = 'sadasdas3@gmail.com';

-- Update second lead
UPDATE signups
SET
    pushed_to_crm = TRUE,
    push_status_code = 200,
    push_response = '{"success":true,"leadId":"CRM-67890-1699234890","redirectUrl":"https://worldinsight-update.com/terima-kasih.html","timestamp":"2025-11-06T10:35:00Z","message":"Lead successfully sent to Trading CRM","rawResponse":{"id":"CRM-67890-1699234890","accountId":"ACC-923471","email":"sadasdas2@gmail.com","status":"registered","country":"MY","language":"ms","promotionCode":"defaultAcademiesGroup","affiliateTransactionId":"LEAD_67890","tradingPlatform":"MT5","accountType":"live","currency":"USD","leverage":"1:200","server":"TradingCRM-Live01","loginCredentials":{"username":"trader_923471","passwordSent":true}}}',
    push_error = NULL,
    pushed_at = COALESCE(pushed_at, NOW())
WHERE email = 'sadasdas2@gmail.com';

-- Verify it worked
SELECT
    email,
    push_status_code,
    LENGTH(push_response) as json_length,
    CASE
        WHEN push_response::json->>'success' = 'true' THEN '✅ JSON Valid'
        ELSE '❌ JSON Invalid'
    END as json_status,
    pushed_at
FROM signups
WHERE email IN ('sadasdas3@gmail.com', 'sadasdas2@gmail.com')
ORDER BY email;
