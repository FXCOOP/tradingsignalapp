# CRM Broker Routing Preferences Guide

## Overview

Manage how leads are automatically routed to brokers from your CRM dashboard.

**Access:** [https://your-domain.com/crm](https://your-domain.com/crm) → **Brokers** tab

---

## Current Setup

### Finoglob Broker Configuration

**Countries:**
- 🇲🇾 Malaysia (MY)
- 🇹🇷 Turkey (TR)
- 🇫🇷 France (FR)
- 🇮🇹 Italy (IT)
- 🇭🇰 Hong Kong (HK)
- 🇸🇬 Singapore (SG)
- 🇹🇼 Taiwan (TW)
- 🇧🇷 Brazil (BR)

**Limits:**
- Max Leads/Day: 1000
- Max Leads/Hour: 100
- Working Hours: 24/7 (00:00 - 23:59 UTC)
- Working Days: All days (Mon-Sun)

**Status:** ✅ Active

---

## How Automatic Routing Works

### Flow:
```
1. User submits form from landing page
   ↓
2. Lead created in CRM (signups table)
   ↓
3. System checks lead's country
   ↓
4. Matches country with broker's country_codes
   ↓
5. Checks broker limits & availability
   ↓
6. Sends lead to broker API
   ↓
7. Logs result in lead_assignments table
```

### Routing Logic:

**Step 1: Country Match**
- Lead country must be in broker's `country_codes` array
- Example: User from MY → Matches Finoglob (has MY in countries)

**Step 2: Availability Check**
- Broker status must be `active`
- Current time within `working_hours`
- Current day in `working_days`
- Daily limit not exceeded (`leads_received_today` < `max_leads_per_day`)
- Hourly limit not exceeded

**Step 3: Priority & Selection**
- If multiple brokers match, highest `conversion_rate` wins
- If conversion rates equal, newest broker gets lead
- Manual override possible via CRM dashboard

---

## Managing Broker Preferences

### 1. Edit Broker Settings

**Via CRM Dashboard:**
1. Go to `/crm` → **Brokers** tab
2. Click **"Edit"** button on Finoglob
3. Modify settings:
   - Name
   - Countries (add/remove)
   - Max leads per day/hour
   - Working hours
   - Payout rates
4. Click **"Save"**

### 2. Add More Countries

To add more countries to Finoglob:

**Option A: Via CRM UI**
1. Click "Edit" on Finoglob
2. In "Countries" field, add country codes (comma-separated)
3. Save

**Option B: Via SQL**
```sql
UPDATE brokers
SET country_codes = ARRAY['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR', 'AE', 'SA']
WHERE name = 'Finoglob';
```

### 3. Change Lead Limits

**Increase Daily Limit:**
```sql
UPDATE brokers
SET max_leads_per_day = 2000,
    max_leads_per_hour = 200
WHERE name = 'Finoglob';
```

**Or via CRM UI:**
- Edit broker → Change "Max Leads/Day" → Save

### 4. Set Working Hours

**Example: Only route during business hours (9 AM - 5 PM UTC)**

```sql
UPDATE brokers
SET working_hours_start = '09:00:00',
    working_hours_end = '17:00:00'
WHERE name = 'Finoglob';
```

### 5. Disable/Enable Broker

**Temporarily stop routing to Finoglob:**

```sql
UPDATE brokers
SET status = 'inactive'
WHERE name = 'Finoglob';
```

**Re-enable:**

```sql
UPDATE brokers
SET status = 'active'
WHERE name = 'Finoglob';
```

**Or via CRM UI:**
- Edit broker → Change "Status" to Active/Inactive → Save

---

## Adding More Brokers

### Via SQL:

```sql
INSERT INTO brokers (
  name,
  company_name,
  email,
  country_codes,
  status,
  api_endpoint,
  api_key,
  api_method,
  api_headers,
  max_leads_per_day,
  max_leads_per_hour,
  payout_per_lead,
  payout_per_conversion
) VALUES (
  'Broker Name',
  'Company Name',
  'broker@example.com',
  ARRAY['AE', 'SA', 'QA'], -- Countries they accept
  'active',
  'https://broker-api.com/leads',
  'api_key_here',
  'POST',
  '{"Content-Type": "application/json"}'::jsonb,
  500,
  50,
  10.00,
  100.00
);
```

### Via CRM UI:
1. Go to `/crm` → **Brokers** tab
2. Click **"Add New Broker"** button
3. Fill in details
4. Save

---

## Traffic Distribution (Multiple Brokers)

If you have **multiple brokers for the same country**, leads are distributed by:

### Priority Rules:

1. **Highest Conversion Rate**
   - Broker with best performance gets priority

2. **Load Balancing**
   - If conversion rates are equal, leads alternate

3. **Availability**
   - Only active brokers within working hours

### Example:

**Scenario:** User from Malaysia (MY)

**Brokers:**
- Finoglob: MY, conversion_rate: 15%, max 1000/day
- ExampleBroker: MY, conversion_rate: 12%, max 500/day

**Result:** Lead goes to **Finoglob** (higher conversion rate)

---

## Manual Lead Assignment

### Assign Lead to Specific Broker:

```sql
-- Find the lead
SELECT * FROM signups WHERE email = 'user@example.com';

-- Manually assign to Finoglob
INSERT INTO lead_assignments (
  lead_id,
  broker_id,
  assignment_method,
  delivery_status
) VALUES (
  'lead_uuid_here',
  (SELECT id FROM brokers WHERE name = 'Finoglob'),
  'manual',
  'pending'
);
```

### Or use the API:

```bash
curl -X POST https://your-domain.com/api/crm/assign-lead \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "lead_uuid",
    "brokerId": "broker_uuid",
    "method": "manual"
  }'
```

---

## Monitoring & Analytics

### View Broker Performance:

**SQL Query:**
```sql
SELECT
  b.name,
  COUNT(la.id) as total_leads,
  COUNT(CASE WHEN la.delivery_status = 'sent' THEN 1 END) as successful,
  COUNT(CASE WHEN la.delivery_status = 'failed' THEN 1 END) as failed,
  ROUND(
    COUNT(CASE WHEN la.delivery_status = 'sent' THEN 1 END)::numeric /
    NULLIF(COUNT(la.id), 0) * 100,
    2
  ) as success_rate
FROM brokers b
LEFT JOIN lead_assignments la ON la.broker_id = b.id
WHERE b.name = 'Finoglob'
GROUP BY b.name;
```

### View Today's Leads:

```sql
SELECT
  s.email,
  s.country,
  la.delivery_status,
  la.created_at
FROM signups s
JOIN lead_assignments la ON la.lead_id = s.id
JOIN brokers b ON b.id = la.broker_id
WHERE b.name = 'Finoglob'
  AND la.created_at::date = CURRENT_DATE
ORDER BY la.created_at DESC;
```

---

## Common Scenarios

### Scenario 1: Route ALL Leads to Finoglob

**Solution:** Add all countries to Finoglob's `country_codes`

```sql
UPDATE brokers
SET country_codes = ARRAY['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR', 'AE', 'SA', 'QA', 'OM', 'KW', 'BH']
WHERE name = 'Finoglob';
```

### Scenario 2: Different Brokers for Different Countries

**Setup:**
- Finoglob: MY, TR, FR, IT, HK, SG, TW, BR
- AnotherBroker: AE, SA, QA, OM, KW, BH

**Result:** Leads automatically route to correct broker by country

### Scenario 3: Backup Broker

**Setup:**
- Primary Broker: max 1000/day
- Backup Broker: same countries, unlimited

**Result:** When primary hits limit, backup takes over

```sql
-- Primary broker
UPDATE brokers
SET max_leads_per_day = 1000,
    conversion_rate = 20.0
WHERE name = 'Primary';

-- Backup broker
UPDATE brokers
SET max_leads_per_day = 999999,
    conversion_rate = 15.0 -- Lower priority
WHERE name = 'Backup';
```

### Scenario 4: Time-Based Routing

**Business Hours Broker:**
```sql
UPDATE brokers
SET working_hours_start = '09:00:00',
    working_hours_end = '17:00:00',
    conversion_rate = 25.0
WHERE name = 'BusinessHours';
```

**24/7 Broker:**
```sql
UPDATE brokers
SET working_hours_start = '00:00:00',
    working_hours_end = '23:59:59',
    conversion_rate = 20.0
WHERE name = 'AlwaysOn';
```

**Result:** During business hours, leads go to high-conversion broker. Outside hours, go to 24/7 broker.

---

## API Endpoints for Management

### Get All Brokers
```
GET /api/crm/brokers
```

### Create Broker
```
POST /api/crm/brokers
```

### Update Broker
```
PUT /api/crm/brokers/:id
```

### Assign Lead
```
POST /api/crm/assign-lead
```

### Push Lead to Broker
```
POST /api/crm/brokers/push-lead
```

---

## Best Practices

### 1. Set Realistic Limits
- Don't exceed broker's actual capacity
- Leave 10% buffer for broker's internal processes

### 2. Monitor Daily
- Check success rates
- Review failed deliveries
- Adjust limits as needed

### 3. Test Regularly
- Use `/api/trading-crm/test` to verify integration
- Check broker's CRM to confirm receipt

### 4. Keep Backup Brokers
- Always have 2+ brokers per region
- Prevents lead loss if one broker is down

### 5. Update Conversion Rates
- Track which brokers convert best
- Prioritize high-performers

---

## Troubleshooting

### Leads Not Being Sent to Broker

**Check:**
1. Broker status is `active`
2. Lead's country in broker's `country_codes`
3. Daily/hourly limits not exceeded
4. Current time within `working_hours`
5. `TRADING_CRM_ENABLED="true"` in environment

**SQL Query to Check:**
```sql
SELECT
  b.name,
  b.status,
  b.country_codes,
  b.max_leads_per_day,
  b.leads_received_today,
  b.working_hours_start,
  b.working_hours_end,
  CURRENT_TIME as current_time
FROM brokers b
WHERE b.name = 'Finoglob';
```

### Leads Going to Wrong Broker

**Check:**
1. Multiple brokers have same countries
2. Check `conversion_rate` - highest wins
3. Review `lead_assignments` table for actual routing

```sql
SELECT
  s.email,
  s.country,
  b.name as broker,
  la.assignment_method,
  la.created_at
FROM signups s
JOIN lead_assignments la ON la.lead_id = s.id
JOIN brokers b ON b.id = la.broker_id
ORDER BY la.created_at DESC
LIMIT 10;
```

---

## Summary

✅ **Broker preferences managed in CRM dashboard at `/crm/brokers`**
✅ **Automatic routing based on country, limits, and availability**
✅ **Flexible configuration via UI or SQL**
✅ **Support for multiple brokers with intelligent distribution**
✅ **Real-time monitoring and analytics**

**Your leads flow: Landing Page → CRM → Best Available Broker**
