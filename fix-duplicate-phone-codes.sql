-- ==========================================
-- FIX DUPLICATE COUNTRY CODES IN PHONE NUMBERS
-- ==========================================
-- Run this to clean up existing leads with "+60+60" issue

UPDATE signups
SET
    phone_number = REGEXP_REPLACE(phone_number, '^\+(\d+)\+\1', '+\1'),
    country_code = REGEXP_REPLACE(country_code, '^\+(\d+)\+\1', '+\1')
WHERE
    phone_number LIKE '%+%+%'
    OR country_code LIKE '%+%+%';

-- Show fixed records
SELECT
    first_name,
    last_name,
    phone_number,
    country_code,
    country
FROM signups
WHERE country = 'Malaysia'
ORDER BY created_at DESC;

-- Summary
SELECT
    COUNT(*) as total_fixed,
    'Phone numbers cleaned' as status
FROM signups
WHERE country = 'Malaysia';
