-- ==========================================
-- ADVANCED FIX FOR DUPLICATE PHONE CODES
-- ==========================================
-- This handles patterns like "+603+6032336551" and "+601+6012121255"

-- Fix phone_number column
UPDATE signups
SET phone_number = CASE
    -- Pattern: +603+603... -> +603...
    WHEN phone_number ~ '^\+60[0-9]\+60[0-9]' THEN
        REGEXP_REPLACE(phone_number, '^\+60([0-9])\+60\1', '+60\1')
    -- Pattern: +60+60... -> +60...
    WHEN phone_number ~ '^\+60\+60' THEN
        REGEXP_REPLACE(phone_number, '^\+60\+60', '+60')
    -- Pattern: ++60... -> +60...
    WHEN phone_number ~ '^\+\+' THEN
        REGEXP_REPLACE(phone_number, '^\+\+', '+')
    ELSE phone_number
END
WHERE country = 'Malaysia'
AND (
    phone_number LIKE '%+60%+60%'
    OR phone_number LIKE '%++%'
);

-- Fix country_code column
UPDATE signups
SET country_code = '+60'
WHERE country = 'Malaysia'
AND country_code != '+60';

-- Show results
SELECT
    CONCAT(first_name, ' ', last_name) as name,
    phone_number,
    country_code,
    country,
    '✅ Fixed' as status
FROM signups
WHERE country = 'Malaysia'
ORDER BY created_at DESC;

-- Summary
SELECT
    COUNT(*) as total_leads,
    COUNT(CASE WHEN phone_number LIKE '+60%' AND phone_number NOT LIKE '%+60%+60%' THEN 1 END) as clean_numbers,
    'All Malaysia leads' as status
FROM signups
WHERE country = 'Malaysia';
