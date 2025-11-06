# 📊 Status Tracking Setup Guide

Complete setup for bi-directional sync with Trading CRM (Finoglob)

## ✅ What This Does

- **Fetches** lead statuses from Trading CRM API (not just pushing!)
- **Tracks** status changes over time (New → Contact → FTD)
- **Detects** conversions (FTD = First Time Deposit)
- **Monitors** trading platform accounts and deposits

---

## 🚀 Step 1: Add Database Columns

Run this SQL in Supabase SQL Editor:
👉 [https://supabase.com/dashboard/project/bsupjdeayuylynsdmfdx/sql/new](https://supabase.com/dashboard/project/bsupjdeayuylynsdmfdx/sql/new)

**Copy the entire file:** `add-status-tracking-columns.sql`

This will create:
- ✅ 7 new columns in `signups` table for tracking broker status
- ✅ `lead_status_history` table (tracks every status change)
- ✅ `conversions` table (tracks FTDs and deposits)

---

## 🧪 Step 2: Test Status Fetching

### Option A: Manual API Test (Recommended)

Run this command to sync a single lead:

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{"signupId": "YOUR_LEAD_ID_HERE"}'
```

**Replace `YOUR_LEAD_ID_HERE`** with actual signup ID from your database.

### Option B: Sync All Recent Leads

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{"syncAll": true, "days": 7}'
```

This syncs all leads from the last 7 days.

### Option C: View Sync Statistics

```bash
curl http://localhost:3000/api/trading-crm/sync-status
```

Shows:
- Total leads synced
- Conversion count (FTDs)
- Conversion rate percentage
- Status breakdown (New, Contact, FTD, etc.)

---

## 📊 Step 3: Check Results in Supabase

After running a sync, check your data:

```sql
-- View updated lead statuses
SELECT
    first_name,
    last_name,
    email,
    broker_status,
    broker_status_code,
    ftd_exists,
    tp_account,
    last_status_check
FROM signups
WHERE broker_status IS NOT NULL
ORDER BY last_status_check DESC;

-- View status changes over time
SELECT
    s.email,
    h.previous_status,
    h.new_status,
    h.ftd_exists,
    h.changed_at
FROM lead_status_history h
JOIN signups s ON h.lead_id = s.id
ORDER BY h.changed_at DESC;

-- View conversions (FTDs)
SELECT
    s.email,
    c.conversion_type,
    c.amount,
    c.tp_account,
    c.converted_at
FROM conversions c
JOIN signups s ON c.lead_id = s.id
ORDER BY c.converted_at DESC;
```

---

## 🤖 Step 4: Automate Status Syncing (Optional)

### Option A: Create Cron Job (Production)

I've created a script for you: `sync-status-cron.mjs`

Run it to set up hourly status syncing:

```bash
node sync-status-cron.mjs
```

### Option B: Manual Trigger via Script

I've also created: `test-status-sync.mjs`

```bash
node test-status-sync.mjs
```

This tests the status sync and shows results in your terminal.

---

## 📋 Status Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| 1 | New | Just registered |
| 2 | Attempted | Broker tried to contact |
| 3 | Contact | In conversation |
| 4 | No Answer | Couldn't reach |
| 5 | Callback | Scheduled followup |
| 6 | Not Interested | Lead declined |
| 7 | Invalid Number | Wrong phone |
| 8 | Demo | Demo account opened |
| **9** | **FTD** | **💰 First Deposit - CONVERSION!** |
| 10 | Retention | Ongoing customer |
| 11 | Deposited | Made additional deposit |
| 12 | Withdrawn | Withdrew funds |

---

## 🔧 Troubleshooting

### Error: "Column broker_status does not exist"
**Fix:** Run `add-status-tracking-columns.sql` in Supabase first

### Error: "Lead not found in Trading CRM"
**Fix:** Check that the `signupId` matches the `affiliateTransactionId` you sent to Trading CRM

### Error: "401 Unauthorized"
**Fix:** Check that `TRADING_CRM_API_KEY` environment variable is set correctly

### No data returned
**Fix:** Make sure leads were successfully pushed to Trading CRM first (check `assigned_broker` column)

---

## 🎯 Next Steps

1. ✅ Run the SQL file
2. ✅ Test with a single lead
3. ✅ Sync all recent leads
4. ✅ Set up automated hourly sync (optional)
5. ✅ Monitor conversions in Supabase

---

## 📈 What You'll See

After setup, you'll be able to track:

- **Lead Journey**: New → Contact → Demo → FTD
- **Conversion Rate**: X% of leads convert to FTD
- **Time to Convert**: How long from signup to first deposit
- **Trading Accounts**: Which platform accounts are active
- **Revenue Tracking**: Monitor deposits and withdrawals

All automatically synced from Trading CRM! 🎉
