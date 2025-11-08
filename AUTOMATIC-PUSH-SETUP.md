# 🤖 Automatic Broker Push Setup

This will make your CRM automatically push leads to brokers when they're saved from ANY landing page.

## 📋 How It Works

```
Landing Page → Supabase → Auto-Trigger → Broker Rules → Push to Broker
```

**Before:** Leads sit as "Not pushed" ❌
**After:** Leads automatically pushed within seconds ✅

---

## 🚀 Installation (5 Minutes)

### Step 1: Open Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **pk-signal-pulse**
3. Click **SQL Editor** in left sidebar
4. Click **New Query**

### Step 2: Run the Setup Script

1. Open the file: `supabase-auto-push-trigger.sql`
2. Copy ALL the SQL code
3. Paste into Supabase SQL Editor
4. Click **RUN** button

You should see:
```
✅ Extension pg_net created
✅ Function auto_push_to_broker created
✅ Trigger created on signups table
```

### Step 3: Test It!

**Option A: Test with SQL**
```sql
-- Run this in SQL Editor to insert a test lead
INSERT INTO signups (
  first_name, last_name, email, country_code, phone_number,
  country, terms_accepted
) VALUES (
  'Auto', 'Test', 'autotest@example.com', '+60', '123456789',
  'Malaysia', true
);

-- Wait 5 seconds, then check if it was pushed:
SELECT
  email,
  assigned_broker,
  pushed_to_crm,
  push_status_code,
  pushed_at
FROM signups
WHERE email = 'autotest@example.com';
```

**Expected Result:**
- `pushed_to_crm`: `true` ✅
- `push_status_code`: `200` ✅
- `assigned_broker`: `Trading CRM` (for Malaysia)
- `pushed_at`: timestamp

**Option B: Test with Landing Page**
1. Go to your landing page
2. Fill in the signup form
3. Submit
4. Check CRM - lead should appear with "Pushed" status automatically!

---

## 🎯 What Happens Now

**Every time a new lead signs up:**

1. **Landing page** saves to Supabase ✅
2. **Database trigger** fires automatically (instant)
3. **Trigger calls** `/api/push-to-broker`
4. **Your rules apply:**
   - Malaysia → Trading CRM
   - Turkey → Trading CRM
   - France → Trading CRM
   - High-value accounts → Trading CRM
   - Experienced traders → Trading CRM
   - Others → Finoglob
5. **Lead pushed** to assigned broker ✅
6. **Database updated** with push status ✅

**All automatic - no manual work needed!**

---

## 🔍 Monitoring

### Check Recent Auto-Pushes
```sql
-- See all auto-pushed leads from today
SELECT
  email,
  country,
  assigned_broker,
  pushed_to_crm,
  push_status_code,
  pushed_at,
  created_at
FROM signups
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

### Check Trigger Logs
```sql
-- View HTTP requests made by the trigger
SELECT *
FROM net._http_response
ORDER BY created DESC
LIMIT 20;
```

### Check for Failed Pushes
```sql
-- Find leads that failed to push
SELECT
  id,
  email,
  country,
  push_status_code,
  push_error,
  push_response
FROM signups
WHERE pushed_to_crm = false
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

---

## 🛠️ Troubleshooting

### Trigger Not Firing?

**Check if trigger exists:**
```sql
SELECT * FROM information_schema.triggers
WHERE event_object_table = 'signups';
```

**Recreate trigger:**
Just run `supabase-auto-push-trigger.sql` again - it will replace the old one.

### Leads Still "Not Pushed"?

**Old leads before trigger was installed:** Normal - only NEW leads will auto-push
**New leads after installation:** Check error in `push_error` column

```sql
SELECT email, push_error, push_response
FROM signups
WHERE pushed_to_crm = false
ORDER BY created_at DESC
LIMIT 5;
```

### Check Trigger Status
```sql
-- Verify trigger is enabled
SELECT
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'trigger_auto_push_to_broker';
```

---

## 🎉 Success Indicators

After setup, you should see:

✅ **In CRM Dashboard:**
- New leads show "✅ 200" under Push Status
- Broker assigned automatically (Trading CRM or Finoglob)
- "Pushed" timestamp appears

✅ **In Supabase:**
- `pushed_to_crm` = `true`
- `push_status_code` = `200`
- `assigned_broker` has broker name
- `pushed_at` has timestamp

✅ **In Broker Platform:**
- Lead appears in Trading CRM or Finoglob
- All details correct
- Ready for follow-up

---

## 📝 Notes

- **Automatic push happens in <5 seconds** after signup
- **Works with ALL landing pages** - as long as they save to Supabase
- **Your rules apply automatically** - no code changes needed
- **Failed pushes are logged** - you can retry manually from CRM
- **No impact on landing page speed** - push happens server-side

---

## 🔄 Disabling Auto-Push (If Needed)

To temporarily disable automatic pushing:

```sql
-- Disable the trigger
ALTER TABLE signups DISABLE TRIGGER trigger_auto_push_to_broker;

-- Re-enable later
ALTER TABLE signups ENABLE TRIGGER trigger_auto_push_to_broker;
```

---

## ✅ You're Done!

Once you run the SQL script, **every new signup will automatically:**
1. Save to Supabase
2. Trigger broker assignment
3. Push to correct broker
4. Update CRM with status

**No more "Not pushed" leads!** 🎉
