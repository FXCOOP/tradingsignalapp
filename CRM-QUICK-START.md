# 🚀 CRM System - Quick Start Guide

Get your affiliate CRM up and running in 5 minutes!

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Run Database Migration

1. Open Supabase SQL Editor: https://app.supabase.com
2. Copy and paste the entire content from: `supabase-crm-migration.sql`
3. Click **Run**
4. Wait for success message

**What this creates:**
- ✅ 6 new tables (brokers, lead_assignments, sales_status, etc.)
- ✅ 2 analytics views
- ✅ 3 sample brokers (for testing)
- ✅ Automatic triggers for stats updates

---

### Step 2: Verify Environment Variables

Check your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

### Step 3: Install & Run

```bash
npm install
npm run dev
```

---

### Step 4: Access CRM Dashboard

Open: http://localhost:3000/crm

You should see:
- 📊 Dashboard with analytics
- 👥 Leads from your signups
- 🏢 3 sample brokers (Ahmed Trading, GCC Markets, Dubai Forex)

---

### Step 5: Test the System

#### A. Create a Test Lead

1. Go to your signup page
2. Fill out the form
3. Submit
4. Go back to `/crm` → **Leads** tab
5. You should see your new lead!

#### B. Assign Lead to Broker

1. Click "Assign" button on any lead
2. Select a broker from the modal
3. Click "Assign"
4. Lead status changes to "assigned"

#### C. Test Webhook (Optional)

Use Postman or curl:

```bash
curl -X POST http://localhost:3000/api/crm/webhook/status \
  -H "Content-Type: application/json" \
  -d '{
    "broker_api_key": "test_key",
    "lead_id": "YOUR_LEAD_UUID",
    "status": "deposit_made",
    "deposit_amount": 1000,
    "deposit_currency": "USD"
  }'
```

Check the lead - status should update to "deposit_made" ✅

---

## 📂 What Was Created

### Database Tables

1. **brokers** - Broker profiles with API configs
2. **lead_assignments** - Lead routing records
3. **sales_status** - Conversion tracking
4. **assignment_rules** - Smart routing logic
5. **lead_activity_log** - Audit trail
6. **webhook_logs** - API call tracking

### API Endpoints

- `GET /api/crm/leads` - List leads
- `GET /api/crm/leads/[id]` - Lead details
- `PUT /api/crm/leads` - Update lead
- `GET /api/crm/brokers` - List brokers
- `POST /api/crm/brokers` - Create broker
- `GET /api/crm/brokers/[id]` - Broker details
- `PUT /api/crm/brokers/[id]` - Update broker
- `DELETE /api/crm/brokers/[id]` - Delete broker
- `POST /api/crm/assign-lead` - Assign lead to broker
- `POST /api/crm/webhook/status` - Receive status updates
- `GET /api/crm/analytics` - Get analytics data

### Frontend Pages

- `/crm` - Main CRM dashboard with 4 tabs:
  - Dashboard (overview)
  - Leads (management)
  - Brokers (profiles)
  - Analytics (charts)

### Backend Functions

- [src/lib/supabase.ts](src/lib/supabase.ts) - 30+ CRM functions added

---

## 🎯 Common Use Cases

### Use Case 1: Add a Real Broker

```javascript
// Via API
const response = await fetch('/api/crm/brokers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'XYZ Trading',
    email: 'leads@xyztrading.com',
    country_codes: ['AE', 'SA', 'QA'],
    api_endpoint: 'https://api.xyztrading.com/leads',
    api_key: 'your_secret_key',
    max_leads_per_day: 200,
    payout_per_conversion: 300.00
  })
});
```

Or directly in Supabase:

```sql
INSERT INTO brokers (name, email, country_codes, api_endpoint, max_leads_per_day, payout_per_conversion)
VALUES ('XYZ Trading', 'leads@xyz.com', ARRAY['AE','SA'], 'https://api.xyz.com/leads', 200, 300.00);
```

---

### Use Case 2: Auto-Assign Leads

The system can auto-assign based on:
- Country match
- Broker capacity (daily/hourly limits)
- Working hours
- Best conversion rate

**Manual Assignment:**
```javascript
await fetch('/api/crm/assign-lead', {
  method: 'POST',
  body: JSON.stringify({
    leadId: 'lead-uuid',
    brokerId: 'broker-uuid',
    method: 'manual'
  })
});
```

**Auto Assignment:**
```javascript
await fetch('/api/crm/assign-lead', {
  method: 'POST',
  body: JSON.stringify({
    leadId: 'lead-uuid',
    // No brokerId - system finds best broker automatically!
  })
});
```

---

### Use Case 3: Broker Sends Status Update

Broker calls your webhook:

```bash
curl -X POST https://yoursite.com/api/crm/webhook/status \
  -H "Content-Type: application/json" \
  -d '{
    "broker_api_key": "broker_secret_key",
    "lead_id": "lead-uuid",
    "status": "deposit_made",
    "deposit_amount": 1000,
    "deposit_currency": "USD",
    "notes": "Customer deposited via card"
  }'
```

**Statuses:**
- `contacted` - Broker called/emailed
- `interested` - Wants to proceed
- `demo_scheduled` - Meeting set
- `demo_completed` - Demo done
- `kyc_pending` - Docs submitted
- `kyc_approved` - Verified ✅
- `deposit_made` - Money in! 💰
- `active_trader` - Trading actively
- `lost` - No longer interested

---

### Use Case 4: View Analytics

Check performance:

```javascript
const response = await fetch('/api/crm/analytics?days=30');
const data = await response.json();

console.log(data.analytics.overview);
// {
//   total_leads: 500,
//   assigned_leads: 450,
//   converted_leads: 125,
//   conversion_rate: "27.78",
//   growth_rate: "15.2"
// }
```

---

## 📊 CRM Dashboard Features

### Dashboard Tab
- **Overview Cards** - Total leads, conversions, rates
- **Top Brokers Table** - Best performers
- **Country Distribution** - Where leads come from

### Leads Tab
- **Full Lead List** - All signups
- **Filters** - By status, country, broker
- **Actions** - Assign, view details
- **Status Badges** - Visual status indicators

### Brokers Tab
- **Broker Profiles** - Name, email, countries
- **Performance Metrics** - Conversion rates
- **Actions** - Edit, delete, view details

### Analytics Tab
- **Status Breakdown** - Visual progress bars
- **Detailed Charts** - Coming soon!

---

## 🔧 Customization

### Add Custom Lead Status

```sql
-- Update the CHECK constraint
ALTER TABLE sales_status DROP CONSTRAINT IF EXISTS sales_status_status_check;

ALTER TABLE sales_status ADD CONSTRAINT sales_status_status_check
CHECK (status IN (
  'new', 'contacted', 'interested', 'demo_scheduled', 'demo_completed',
  'application_submitted', 'kyc_pending', 'kyc_approved', 'kyc_rejected',
  'deposit_made', 'active_trader', 'inactive', 'lost', 'blocked',
  'your_custom_status'  -- Add here
));
```

### Add Assignment Rule

```sql
INSERT INTO assignment_rules (name, priority, conditions, broker_id, action_type)
VALUES (
  'High Value UAE Leads',
  100,
  '{"country": ["AE"], "min_lead_score": 90, "working_hours": true}',
  'best-broker-uuid',
  'assign'
);
```

### Customize Working Hours

```sql
UPDATE brokers
SET
  working_hours_start = '09:00:00',
  working_hours_end = '18:00:00',
  working_days = ARRAY[1,2,3,4,5]  -- Monday to Friday only
WHERE id = 'broker-uuid';
```

---

## 🐛 Troubleshooting

### "No brokers available"

1. Check broker status: `SELECT * FROM brokers WHERE status = 'active';`
2. Verify country_codes: `UPDATE brokers SET country_codes = ARRAY['AE','SA','QA'] WHERE id = 'uuid';`
3. Check capacity: `UPDATE brokers SET max_leads_per_day = 999 WHERE id = 'uuid';`

### "Webhook not working"

1. Check logs: `SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 10;`
2. Verify broker_api_key
3. Check request format
4. Test with GET `/api/crm/webhook/status` for docs

### "Leads not showing"

1. Verify signups exist: `SELECT COUNT(*) FROM signups;`
2. Check API: http://localhost:3000/api/crm/leads
3. Clear browser cache
4. Check console for errors

---

## 📱 Mobile Access

The CRM is fully responsive! Access from:
- 💻 Desktop
- 📱 Mobile phone
- 📱 Tablet

---

## 🔐 Security Notes

**IMPORTANT:** Before production:

1. Add authentication to `/crm` route
2. Encrypt broker API keys
3. Add rate limiting to webhooks
4. Enable CORS for specific domains
5. Add API key validation

---

## 📞 Need Help?

1. Check the full documentation: [CRM-SYSTEM-README.md](CRM-SYSTEM-README.md)
2. Review database schema in `supabase-crm-migration.sql`
3. Test APIs with tools like Postman
4. Check Supabase logs for errors

---

## ✅ Checklist

- [ ] Database migration completed
- [ ] Environment variables configured
- [ ] CRM dashboard accessible at `/crm`
- [ ] Sample brokers visible
- [ ] Test lead created and assigned
- [ ] Webhook tested successfully
- [ ] Analytics showing data

---

**You're ready to manage your leads like a pro! 🚀**

Visit http://localhost:3000/crm and start managing your traffic!
