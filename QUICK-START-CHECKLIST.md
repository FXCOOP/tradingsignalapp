# ✅ Quick Start Checklist

## 📋 Before You Begin

Make sure you have:
- ✅ Supabase account and project set up
- ✅ Environment variables configured (`.env.local`)
- ✅ Node.js installed (v18 or higher)

---

## 🚀 Setup Steps (In Order!)

### 1️⃣ Fix Phone Number Duplicates (Optional but Recommended)

**If you have existing leads with "+60+60" or similar issues:**

Run in Supabase SQL Editor:
```
fix-duplicate-phone-codes.sql
```

This cleans up phone numbers like "+603+6032336551" → "+6032336551"

**Status:** ⬜ Not Done | ✅ Done

---

### 2️⃣ Create Finoglob Broker + Auto-Assignment

**This is the MAIN setup file:**

Run in Supabase SQL Editor:
```
SIMPLE-SETUP-3-STEPS.sql
```

This will:
- ✅ Add required columns to `signups` table
- ✅ Create Finoglob broker in `brokers` table
- ✅ Assign all existing Malaysia leads to Finoglob
- ✅ Create auto-assignment trigger for new leads

**Status:** ⬜ Not Done | ✅ Done

---

### 3️⃣ Enable Status Tracking (Bi-Directional Sync)

**This enables fetching statuses FROM Trading CRM:**

Run in Supabase SQL Editor:
```
add-status-tracking-columns.sql
```

This will:
- ✅ Add status tracking columns to `signups` table
- ✅ Create `lead_status_history` table
- ✅ Create `conversions` table for FTD tracking

**Status:** ⬜ Not Done | ✅ Done

---

### 4️⃣ Test Status Sync

**Test that status fetching works:**

```bash
node test-status-sync.mjs
```

This will:
- ✅ Check database tables exist
- ✅ Get current sync statistics
- ✅ Sync a single lead (test)
- ✅ Sync all recent leads (last 7 days)

**Status:** ⬜ Not Done | ✅ Done

---

### 5️⃣ Set Up Automated Sync (Optional)

**For continuous status monitoring:**

**Option A: Test Mode (Single Run)**
```bash
node sync-status-cron.mjs --test
```

**Option B: Production Mode (Continuous)**
```bash
node sync-status-cron.mjs
```

This syncs lead statuses every hour automatically.

**Status:** ⬜ Not Done | ✅ Done

---

## 🎯 Verification

After completing all steps, verify everything works:

### Check in Supabase:

```sql
-- 1. Check assigned leads
SELECT
    email,
    country,
    assigned_broker,
    lead_status
FROM signups
WHERE assigned_broker = 'Finoglob';

-- 2. Check status tracking
SELECT
    email,
    broker_status,
    broker_status_code,
    ftd_exists,
    last_status_check
FROM signups
WHERE broker_status IS NOT NULL
ORDER BY last_status_check DESC;

-- 3. Check conversions
SELECT
    s.email,
    c.conversion_type,
    c.converted_at
FROM conversions c
JOIN signups s ON c.lead_id = s.id;
```

---

## 📞 What You Should See

### After Step 2:
- Malaysia leads show `assigned_broker = 'Finoglob'`
- New Malaysia signups auto-assign to Finoglob

### After Step 4:
- `broker_status` column populated (e.g., "New", "Contact", "FTD")
- `ftd_exists` shows `true` for conversions
- `last_status_check` shows recent timestamp

### After Step 5:
- Status automatically updates every hour
- New conversions logged in `conversions` table
- Status changes tracked in `lead_status_history`

---

## 🆘 Troubleshooting

### ❌ "Column does not exist" errors
**Fix:** Make sure you ran the SQL files in order (steps 2, then 3)

### ❌ "Lead not found in Trading CRM"
**Fix:** This lead hasn't been pushed yet. Push leads first using the send-lead endpoint.

### ❌ "Finoglob broker not found"
**Fix:** Run `SIMPLE-SETUP-3-STEPS.sql` again

### ❌ Phone numbers still show "+60+60"
**Fix:** Run `fix-duplicate-phone-codes.sql` or `fix-phone-numbers-advanced.sql`

---

## 📚 Additional Resources

- **Full Setup Guide:** `STATUS-TRACKING-SETUP.md`
- **Status Codes Reference:** See STATUS-TRACKING-SETUP.md
- **API Documentation:** `/api/trading-crm/sync-status`

---

## ✅ Completion Checklist

- [ ] Step 1: Phone duplicates fixed
- [ ] Step 2: Finoglob broker created & auto-assignment enabled
- [ ] Step 3: Status tracking columns added
- [ ] Step 4: Status sync tested successfully
- [ ] Step 5: Automated sync running (optional)
- [ ] Verification: All SQL queries return data
- [ ] Verification: Test lead shows status from Trading CRM

**When all checked:** 🎉 You're all set!
