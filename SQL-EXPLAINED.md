# 📊 SQL Schema Explained

## What the SQL Does

The `supabase-schema.sql` file creates a complete database system for storing signup data.

---

## 📋 Database Table Structure

### Main Table: `signups`

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| **id** | UUID | Unique identifier | `550e8400-e29b-41d4-a716-446655440000` |
| **first_name** | VARCHAR(100) | User's first name | `Ahmed` |
| **last_name** | VARCHAR(100) | User's last name | `Al-Maktoum` |
| **email** | VARCHAR(255) | Email address (unique) | `ahmed@example.com` |
| **country_code** | VARCHAR(10) | Phone country code | `+971` |
| **phone_number** | VARCHAR(50) | Phone number without code | `501234567` |
| **full_phone_number** | VARCHAR(100) | Auto-combined phone | `+971501234567` |
| **country** | VARCHAR(10) | Selected country code | `AE` |
| **detected_country** | VARCHAR(10) | IP-detected country | `AE` |
| **terms_accepted** | BOOLEAN | Terms checkbox status | `true` |
| **terms_accepted_at** | TIMESTAMP | When terms accepted | `2025-01-15 10:30:00` |
| **ip_address** | VARCHAR(100) | User's IP address | `192.168.1.1` |
| **user_agent** | TEXT | Browser information | `Mozilla/5.0...` |
| **referrer** | TEXT | Page they came from | `https://google.com` |
| **utm_source** | VARCHAR(100) | Campaign source | `facebook` |
| **utm_medium** | VARCHAR(100) | Campaign medium | `cpc` |
| **utm_campaign** | VARCHAR(100) | Campaign name | `spring2025` |
| **status** | VARCHAR(50) | Follow-up status | `new` / `contacted` |
| **contacted** | BOOLEAN | Has broker contacted? | `false` |
| **contacted_at** | TIMESTAMP | When contacted | `2025-01-16 09:00:00` |
| **assigned_broker** | VARCHAR(255) | Broker name | `John Smith` |
| **created_at** | TIMESTAMP | Signup date/time | `2025-01-15 10:30:00` |
| **updated_at** | TIMESTAMP | Last update time | `2025-01-15 10:30:00` |

---

## 🚀 What Happens When You Run the SQL

### Step 1: Creates the Table
```sql
CREATE TABLE signups (...)
```
Creates the main storage for all signup data.

### Step 2: Adds Performance Indexes
```sql
CREATE INDEX idx_signups_email ON signups(email);
CREATE INDEX idx_signups_country ON signups(country);
CREATE INDEX idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX idx_signups_status ON signups(status);
CREATE INDEX idx_signups_contacted ON signups(contacted);
```
Makes searching and filtering super fast.

### Step 3: Auto-Update Trigger
```sql
CREATE TRIGGER update_signups_updated_at
```
Automatically updates `updated_at` field when you modify a record.

### Step 4: Security Policies
```sql
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
```
- ✅ Anyone can INSERT (public signup)
- ✅ Only authenticated users can READ (admin view)
- ✅ Only authenticated users can UPDATE (broker updates)

### Step 5: Analytics View
```sql
CREATE VIEW signup_analytics AS...
```
Creates a helpful view for daily statistics by country.

### Step 6: Helper Function
```sql
CREATE FUNCTION get_recent_signups(...)
```
Easy way to fetch the most recent signups.

---

## 📊 Example Data

After someone signs up, here's what gets saved:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "Ahmed",
  "last_name": "Al-Maktoum",
  "email": "ahmed@example.com",
  "country_code": "+971",
  "phone_number": "501234567",
  "full_phone_number": "+971501234567",
  "country": "AE",
  "detected_country": "AE",
  "terms_accepted": true,
  "terms_accepted_at": "2025-01-15T10:30:00.000Z",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "referrer": "https://google.com/search?q=trading",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "trading-2025",
  "status": "new",
  "contacted": false,
  "contacted_at": null,
  "assigned_broker": null,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T10:30:00.000Z"
}
```

---

## 🔍 Query Examples

### Get all signups
```sql
SELECT * FROM signups ORDER BY created_at DESC;
```

### Get uncontacted leads
```sql
SELECT * FROM signups WHERE contacted = false;
```

### Get signups from UAE
```sql
SELECT * FROM signups WHERE country = 'AE';
```

### Get today's signups
```sql
SELECT * FROM signups
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

### Get signups by campaign
```sql
SELECT
  utm_campaign,
  COUNT(*) as total_signups
FROM signups
WHERE utm_campaign IS NOT NULL
GROUP BY utm_campaign
ORDER BY total_signups DESC;
```

### Use the analytics view
```sql
SELECT * FROM signup_analytics
WHERE signup_date >= CURRENT_DATE - INTERVAL '7 days';
```

### Use the helper function
```sql
SELECT * FROM get_recent_signups(20); -- Get last 20 signups
```

---

## 🛠️ How to Run the SQL

### Method 1: Supabase Dashboard (Easiest)

1. Login to https://supabase.com
2. Open your project
3. Click **"SQL Editor"** in left sidebar
4. Click **"New Query"**
5. Copy entire contents of `supabase-schema.sql`
6. Paste into editor
7. Click **"Run"** button (or press Ctrl+Enter)
8. ✅ Done! You'll see "Success" message

### Method 2: Copy-Paste Individual Commands

If you prefer to run commands one by one:

1. Copy the `CREATE TABLE` section
2. Run it
3. Copy the `CREATE INDEX` sections
4. Run each one
5. Continue with triggers, policies, views, functions

---

## 🔒 Security Features

### Row Level Security (RLS)
Automatically enabled. Controls who can:
- **INSERT**: Anyone (public signups) ✅
- **SELECT**: Only authenticated users (admins) 🔐
- **UPDATE**: Only authenticated users (brokers) 🔐
- **DELETE**: No one by default 🚫

### Email Uniqueness
```sql
email VARCHAR(255) NOT NULL UNIQUE
```
Prevents duplicate signups with same email.

### Automatic Timestamps
- `created_at`: Set when record created
- `updated_at`: Auto-updates on any change
- `terms_accepted_at`: When user accepts terms

---

## 📈 Built-in Analytics

The SQL creates a `signup_analytics` view that gives you:

```sql
SELECT * FROM signup_analytics;
```

| signup_date | country | total_signups | contacted_count | pending_count |
|-------------|---------|---------------|-----------------|---------------|
| 2025-01-15  | AE      | 25            | 15              | 10            |
| 2025-01-15  | SA      | 18            | 12              | 6             |
| 2025-01-14  | AE      | 22            | 20              | 2             |

Perfect for daily reports!

---

## 🔧 Updating Records (Broker Use)

When broker contacts a lead:

```sql
UPDATE signups
SET
  contacted = true,
  contacted_at = NOW(),
  assigned_broker = 'John Smith',
  status = 'contacted'
WHERE email = 'ahmed@example.com';
```

The `updated_at` field automatically updates!

---

## 📊 Status Workflow

Track lead progression:

1. **new** - Just signed up
2. **contacted** - Broker reached out
3. **qualified** - Interested and qualified
4. **converted** - Became a client
5. **rejected** - Not interested / not qualified

Update status:
```sql
UPDATE signups SET status = 'converted' WHERE id = 'xxx';
```

---

## 🗑️ Data Management

### Backup before production
```sql
-- Export all data
COPY signups TO '/path/to/backup.csv' CSV HEADER;
```

### Delete test data
```sql
-- Delete test signups (be careful!)
DELETE FROM signups WHERE email LIKE '%@test.com';
```

### Drop and recreate (fresh start)
```sql
DROP TABLE IF EXISTS signups CASCADE;
-- Then run the SQL again
```

---

## 💡 Pro Tips

### 1. View Full Phone Numbers
Already calculated for you!
```sql
SELECT first_name, last_name, full_phone_number FROM signups;
```

### 2. Export to CSV (in Supabase)
1. Go to Table Editor
2. Select `signups` table
3. Click **"..."** menu
4. Choose **"Download as CSV"**

### 3. Set Up Email Alerts
Create a PostgreSQL function with email trigger:
```sql
CREATE OR REPLACE FUNCTION notify_new_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Your email notification logic here
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_signup_notification
  AFTER INSERT ON signups
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_signup();
```

### 4. Track Conversion Rate
```sql
SELECT
  COUNT(*) as total_signups,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as conversions,
  ROUND(
    100.0 * COUNT(CASE WHEN status = 'converted' THEN 1 END) / COUNT(*),
    2
  ) as conversion_rate_percent
FROM signups;
```

---

## ✅ Verification Checklist

After running SQL, verify:

- [ ] Table `signups` exists in Table Editor
- [ ] All 23 columns are present
- [ ] Indexes are created (check in Database > Indexes)
- [ ] RLS is enabled (Database > Policies)
- [ ] View `signup_analytics` exists
- [ ] Function `get_recent_signups` exists

---

## 🆘 Common SQL Errors

### "relation already exists"
**Problem**: Table already created
**Solution**: Either use it, or drop it first:
```sql
DROP TABLE signups CASCADE;
```

### "permission denied"
**Problem**: Not enough permissions
**Solution**: Make sure you're using service role in Supabase

### "syntax error"
**Problem**: Copy-paste issue
**Solution**: Copy entire SQL file again, paste fresh

---

## 📚 Learn More

- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Supabase Docs**: https://supabase.com/docs
- **SQL Tutorial**: https://www.postgresqltutorial.com/

---

**Ready to run it?**

1. Open Supabase SQL Editor
2. Copy `supabase-schema.sql`
3. Paste and click Run
4. Check Table Editor to verify
5. Start capturing signups! 🎉