-- ================================================================
-- DELETE OLD GCC SIGNALS FROM DATABASE
-- Run this in Supabase SQL Editor to remove outdated signals
-- ================================================================

-- Delete the old GCC bank/stock signals
DELETE FROM trading_signals
WHERE symbol IN (
  'ARAMCO',
  'SABIC',
  'QNB',
  'EMIRATES NBD',
  'AL RAJHI BANK'
);

-- Verify deletion
SELECT COUNT(*) as remaining_signals FROM trading_signals;

-- Show what signals remain (should be empty or show new global signals)
SELECT symbol, name, type, status, created_at
FROM trading_signals
ORDER BY created_at DESC
LIMIT 10;
