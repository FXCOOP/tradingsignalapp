# 🕐 Push Queue System Setup Guide

Complete setup for intelligent lead queuing to Trading CRM with working hours, daily caps, and natural spacing.

---

## 📋 Features

✅ **Working Hours**: Only push leads 04:00-13:00 GMT+2 (Monday-Friday)
✅ **Daily Cap**: Maximum 10 leads per day
✅ **Natural Spacing**: 5-15 minute random delays between pushes
✅ **Automatic Queueing**: Leads arriving outside hours automatically queue
✅ **Smart Scheduling**: Calculates next working hours automatically
✅ **Audit Logging**: Complete history of all queue actions
✅ **Dashboard**: View queue status and stats at a glance

---

## 🚀 Setup Steps

### Step 1: Run SQL Schema in Supabase

1. **Open Supabase Dashboard**:
   - Go to https://supabase.com/dashboard
   - Select your project: `bsupjdeayuylynsdmfdx`

2. **Navigate to SQL Editor**:
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Copy & Paste SQL**:
   - Open: `supabase-push-queue-system.sql`
   - Copy entire file contents
   - Paste into Supabase SQL Editor

4. **Run Query**:
   - Click "Run" or press `Ctrl+Enter`
   - Wait for "Success" message

5. **Verify Tables Created**:
   ```sql
   SELECT * FROM push_queue_dashboard;
   ```
   - Should show queue statistics

---

### Step 2: Set Up Cron Job (Render)

The queue processor needs to run every 10 minutes during working hours.

#### Option A: Render Cron Job (Recommended)

1. **Go to Render Dashboard**:
   - https://dashboard.render.com

2. **Create New Cron Job**:
   - Click "New +" → "Cron Job"
   - **Name**: `PK Signal Pulse - Push Queue Processor`
   - **Environment**: Docker
   - **Schedule**: Every 10 minutes during working hours
   - **Command**:
     ```bash
     curl -X POST https://tradeflow.blog/api/process-push-queue
     ```

3. **Schedule Expression**:
   ```
   */10 2-11 * * 1-5
   ```
   - Explanation: Every 10 minutes, 02:00-11:00 UTC (04:00-13:00 GMT+2), Monday-Friday

4. **Environment Variables**:
   - Copy from your main web service:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `TRADING_CRM_API_ENDPOINT`
     - `TRADING_CRM_USERNAME`
     - `TRADING_CRM_PASSWORD`
     - `TRADING_CRM_PROMOTION_CODE`

5. **Save & Deploy**

#### Option B: External Cron Service (Alternative)

Use services like:
- **Cron-job.org** (free, simple): https://cron-job.org
- **EasyCron** (more features): https://www.easycron.com

**Setup**:
1. Sign up for account
2. Create new cron job
3. **URL**: `https://tradeflow.blog/api/process-push-queue`
4. **Method**: GET or POST
5. **Schedule**: Every 10 minutes, 04:00-13:00 GMT+2, Monday-Friday
6. **Schedule Expression**:
   ```
   */10 4-13 * * 1-5
   ```
   (Note: Adjust timezone in service settings to GMT+2)

---

### Step 3: Test the System

#### Test 1: Submit Lead Outside Working Hours

1. **Create test lead** on /brokerv2 (if currently outside 04:00-13:00 GMT+2)
2. **Check CRM** at https://tradeflow.blog/crm
3. **Verify**:
   - Lead appears in CRM
   - Status shows "Waiting for working hours"
   - Comment explains next push time

#### Test 2: Manual Queue Processing

1. **Trigger queue processor manually**:
   ```bash
   curl https://tradeflow.blog/api/process-push-queue
   ```

2. **Expected responses**:
   - **Outside working hours**:
     ```json
     {
       "success": true,
       "message": "Outside working hours (04:00-13:00 GMT+2, Mon-Fri)",
       "workingHours": false,
       "processed": 0
     }
     ```
   - **Within working hours, queue empty**:
     ```json
     {
       "success": true,
       "message": "Queue is empty",
       "workingHours": true,
       "pushedToday": 0,
       "processed": 0
     }
     ```
   - **Processing leads**:
     ```json
     {
       "success": true,
       "message": "Queue processed successfully",
       "workingHours": true,
       "pushedToday": 3,
       "processed": 3,
       "results": {...}
     }
     ```

#### Test 3: Check Queue Dashboard

Run this in Supabase SQL Editor:
```sql
SELECT * FROM push_queue_dashboard;
```

**Example output**:
```
waiting_working_hours: 5
waiting_daily_cap: 2
pending: 0
currently_pushing: 0
successfully_pushed: 45
failed: 1
pushed_today: 8
remaining_today: 2
currently_working_hours: true
next_working_hours: 2025-11-12 04:00:00+02
```

---

## 📊 Monitoring & Queries

### View Queued Leads

```sql
SELECT
    id,
    email,
    country,
    push_queue_status,
    push_queue_comment,
    push_scheduled_at,
    created_at
FROM signups
WHERE push_queue_status IN ('waiting_working_hours', 'waiting_daily_cap', 'pending')
ORDER BY push_scheduled_at ASC;
```

### View Today's Push Activity

```sql
SELECT
    l.*,
    s.email,
    s.country
FROM push_queue_log l
JOIN signups s ON l.signup_id = s.id
WHERE DATE(l.timestamp) = CURRENT_DATE
ORDER BY l.timestamp DESC;
```

### Check Daily Statistics

```sql
SELECT * FROM push_daily_stats
ORDER BY date DESC
LIMIT 7;
```

### View Failed Pushes

```sql
SELECT
    id,
    email,
    country,
    push_queue_status,
    push_queue_comment,
    push_error,
    push_attempts,
    last_push_attempt_at
FROM signups
WHERE push_queue_status = 'failed'
ORDER BY last_push_attempt_at DESC;
```

---

## 🎯 How It Works

### Automatic Flow

1. **Lead Submits Form** (e.g., Malaysia visitor on /brokerv2)

2. **Saved to Supabase** with `push_queue_status = 'pending'`

3. **CRM Auto-Push Attempt** (if enabled):
   - Checks: Is it Trading CRM country?
   - Checks: Are we in working hours (04:00-13:00 GMT+2)?
   - Checks: Have we pushed < 10 leads today?

4. **Decision**:
   - ✅ **YES to all** → Push immediately, increment daily count
   - ❌ **Outside hours** → Queue with status `waiting_working_hours`
   - ❌ **Daily cap reached** → Queue with status `waiting_daily_cap`

5. **Cron Job Processes Queue** (every 10 minutes):
   - Checks working hours
   - Checks daily cap
   - Processes leads oldest-first
   - Adds 5-15 minute spacing between pushes
   - Updates status and comments

### Queue States

| Status | Meaning |
|--------|---------|
| `pending` | New lead, not yet processed |
| `waiting_working_hours` | Waiting for 04:00-13:00 GMT+2 Mon-Fri |
| `waiting_daily_cap` | Waiting for next day (10 leads already pushed today) |
| `pushing` | Currently being pushed to broker |
| `pushed` | Successfully pushed to broker |
| `failed` | Push failed (see push_error for details) |

---

## 🔧 Configuration

### Change Working Hours

Edit SQL function in Supabase:
```sql
CREATE OR REPLACE FUNCTION is_working_hours()
RETURNS BOOLEAN AS $$
DECLARE
    current_time_gmt2 TIMESTAMP WITH TIME ZONE;
    day_of_week INTEGER;
    hour_of_day INTEGER;
BEGIN
    current_time_gmt2 := NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+2';
    day_of_week := EXTRACT(ISODOW FROM current_time_gmt2);
    hour_of_day := EXTRACT(HOUR FROM current_time_gmt2);

    -- Change these values:
    -- day_of_week: 1=Monday, 7=Sunday
    -- hour_of_day: 0-23
    RETURN (day_of_week BETWEEN 1 AND 5) AND (hour_of_day >= 4 AND hour_of_day < 13);
END;
$$ LANGUAGE plpgsql;
```

**Examples**:
- **24/7 operation**: `RETURN true;`
- **9-5 Mon-Fri**: `RETURN (day_of_week BETWEEN 1 AND 5) AND (hour_of_day >= 9 AND hour_of_day < 17);`
- **Include weekends**: `RETURN (hour_of_day >= 4 AND hour_of_day < 13);`

### Change Daily Cap

Update everywhere `10` appears:
- In `process-push-queue/route.ts`: Line 39
- In `push-to-broker/route.ts`: Line 119
- In SQL comments

Or make it configurable with environment variable:
```typescript
const DAILY_CAP = parseInt(process.env.TRADING_CRM_DAILY_CAP || '10');
```

### Change Natural Spacing

Edit `process-push-queue/route.ts`, line ~197:
```typescript
const delayMinutes = Math.floor(Math.random() * 11) + 5; // 5-15 minutes
```

**Examples**:
- **3-10 minutes**: `Math.floor(Math.random() * 8) + 3`
- **10-30 minutes**: `Math.floor(Math.random() * 21) + 10`
- **1-5 minutes**: `Math.floor(Math.random() * 5) + 1`

---

## 🚨 Troubleshooting

### Cron Job Not Running

**Check**:
1. Cron job enabled in Render/cron service
2. Schedule expression correct
3. Logs show execution attempts

**Debug**:
```bash
# Manually trigger
curl -X POST https://tradeflow.blog/api/process-push-queue

# Check response
curl -X POST https://tradeflow.blog/api/process-push-queue -v
```

### Leads Not Being Pushed

**Check**:
1. Are we in working hours?
   ```sql
   SELECT is_working_hours();
   ```

2. Check daily cap:
   ```sql
   SELECT get_today_push_count();
   ```

3. View queue:
   ```sql
   SELECT * FROM push_queue_dashboard;
   ```

### Failed Pushes

**Check error details**:
```sql
SELECT
    email,
    push_error,
    push_response,
    push_attempts
FROM signups
WHERE push_queue_status = 'failed';
```

**Common errors**:
- **"IP not whitelisted"**: Add server IP to Trading CRM
- **"Invalid phone format"**: Check phone number format
- **"Timeout"**: Trading CRM API slow, increase timeout

**Retry failed leads**:
```sql
UPDATE signups
SET
    push_queue_status = 'pending',
    push_queue_comment = 'Retry attempt',
    push_attempts = 0
WHERE push_queue_status = 'failed';
```

---

## 📈 Analytics Queries

### Daily Push Volume (Last 7 Days)

```sql
SELECT
    date,
    push_count,
    last_push_at
FROM push_daily_stats
ORDER BY date DESC
LIMIT 7;
```

### Average Push Response Time

```sql
SELECT
    AVG(EXTRACT(EPOCH FROM (pushed_at - created_at))) / 60 as avg_minutes_to_push
FROM signups
WHERE pushed_to_crm = true
AND DATE(pushed_at) = CURRENT_DATE;
```

### Queue Performance

```sql
SELECT
    push_queue_status,
    COUNT(*) as count,
    AVG(push_attempts) as avg_attempts
FROM signups
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY push_queue_status
ORDER BY count DESC;
```

---

## ✅ Success Indicators

After setup, you should see:

1. **Leads queuing properly** when outside working hours
2. **Status comments** explaining queue reason
3. **Automatic processing** every 10 minutes during working hours
4. **Daily cap enforcement** (max 10 pushes per day)
5. **Natural spacing** (5-15 min gaps between pushes)
6. **Clean audit logs** in `push_queue_log` table

---

## 🔗 Related Files

- **SQL Schema**: `supabase-push-queue-system.sql`
- **Queue Processor**: `src/app/api/process-push-queue/route.ts`
- **Push Logic**: `src/app/api/push-to-broker/route.ts`
- **Trading CRM API**: `src/lib/trading-crm-api.ts`

---

## 📞 Support

**Issues?**
1. Check Render logs: https://dashboard.render.com
2. Check Supabase logs: https://supabase.com/dashboard
3. Run test queries above
4. Review `push_queue_log` table for errors

**Need help?**
- Review setup steps again
- Check configuration values
- Verify cron schedule is correct
- Test manually with curl first

---

**Created**: November 2025
**Version**: 1.0
**Status**: Production-Ready ✅
