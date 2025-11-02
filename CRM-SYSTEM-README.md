# 🎯 Affiliate CRM & Back Office System

Complete lead management and broker integration system for managing traffic and conversions.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Back Office UI](#back-office-ui)
7. [Broker Integration](#broker-integration)
8. [Webhook System](#webhook-system)
9. [Lead Assignment Logic](#lead-assignment-logic)
10. [Analytics & Reporting](#analytics--reporting)

---

## 🌟 Overview

This CRM system is designed to:
- Capture leads from your signup forms
- Manage and route leads to different brokers
- Track lead conversions and sales status
- Receive real-time updates from broker systems via webhooks
- Provide comprehensive analytics and reporting

---

## ✨ Features

### Lead Management
- ✅ Automatic lead capture from signup forms
- ✅ Lead filtering by status, country, broker
- ✅ Manual and automatic lead assignment
- ✅ Lead activity tracking and audit trail
- ✅ Lead scoring and prioritization

### Broker Management
- ✅ Broker profiles with API configurations
- ✅ Country-based routing
- ✅ Capacity management (daily/hourly limits)
- ✅ Working hours and days configuration
- ✅ Performance metrics and conversion tracking

### Assignment Logic
- ✅ Smart routing based on country, capacity, working hours
- ✅ Multiple assignment methods (manual, auto, round-robin)
- ✅ Priority-based assignment rules
- ✅ Real-time availability checking

### Webhook Integration
- ✅ Receive sales status updates from brokers
- ✅ Automatic lead status synchronization
- ✅ Webhook logging and debugging
- ✅ Error handling and retry logic

### Analytics & Reporting
- ✅ Real-time dashboard with key metrics
- ✅ Broker performance comparison
- ✅ Conversion rate tracking
- ✅ Country and status distribution
- ✅ Daily/weekly/monthly reports

---

## 🚀 Setup Instructions

### Step 1: Database Setup

1. Go to your Supabase SQL Editor
2. Run the migration file: `supabase-crm-migration.sql`
3. This will create all necessary tables, views, and triggers

```sql
-- The migration creates these tables:
-- ✅ brokers
-- ✅ lead_assignments
-- ✅ sales_status
-- ✅ assignment_rules
-- ✅ lead_activity_log
-- ✅ webhook_logs
```

### Step 2: Environment Variables

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 3: Add Sample Brokers

The migration includes sample brokers, or add your own:

```sql
INSERT INTO brokers (name, email, country_codes, api_endpoint, payout_per_conversion)
VALUES ('Your Broker', 'broker@example.com', ARRAY['AE', 'SA'], 'https://api.broker.com/leads', 250.00);
```

### Step 4: Access the CRM

Navigate to: `http://localhost:3000/crm`

---

## 🗄️ Database Schema

### Main Tables

#### 1. **brokers**
Stores broker profiles and API configurations
```sql
- id (UUID)
- name, company_name, email, phone
- country_codes (array) - Countries they accept
- api_endpoint, api_key, api_method, api_headers
- max_leads_per_day, max_leads_per_hour
- working_hours_start, working_hours_end
- working_days (array) - 1=Monday, 7=Sunday
- total_leads_received, total_leads_converted
- conversion_rate, payout_per_conversion
```

#### 2. **lead_assignments**
Tracks lead-to-broker assignments
```sql
- id (UUID)
- lead_id (references signups)
- broker_id (references brokers)
- delivery_status (pending/sent/failed/rejected)
- api_response (JSONB) - Broker's response
- external_lead_id - Broker's internal ID
```

#### 3. **sales_status**
Tracks lead conversion and sales
```sql
- id (UUID)
- lead_id, broker_id
- status (contacted/deposit_made/active_trader/etc.)
- deposit_amount, deposit_currency, deposit_date
- trading_volume, total_trades
- commission_earned, commission_status
```

#### 4. **assignment_rules**
Defines routing logic
```sql
- id (UUID)
- name, priority
- conditions (JSONB) - Country, hours, etc.
- broker_id
- action_type (assign/round_robin/weighted_random)
```

### Views

- **broker_performance** - Aggregated broker metrics
- **daily_lead_stats** - Daily signup and conversion stats

---

## 🔌 API Endpoints

### Lead Management

#### GET `/api/crm/leads`
Fetch leads with filters

**Query Parameters:**
- `status` - Filter by lead status
- `country` - Filter by country
- `broker_id` - Filter by assigned broker
- `date_from`, `date_to` - Date range
- `limit`, `offset` - Pagination

**Response:**
```json
{
  "success": true,
  "leads": [...],
  "total": 150,
  "filters": {...}
}
```

#### PUT `/api/crm/leads`
Update lead CRM fields

**Body:**
```json
{
  "id": "lead-uuid",
  "lead_status": "contacted",
  "lead_score": 85
}
```

#### GET `/api/crm/leads/[id]`
Get full lead details with assignments, status, and activity

---

### Broker Management

#### GET `/api/crm/brokers`
Fetch all brokers

**Response:**
```json
{
  "success": true,
  "brokers": [...],
  "total": 5
}
```

#### POST `/api/crm/brokers`
Create a new broker

**Body:**
```json
{
  "name": "Broker Name",
  "email": "broker@example.com",
  "country_codes": ["AE", "SA"],
  "api_endpoint": "https://api.broker.com/leads",
  "api_key": "secret_key",
  "max_leads_per_day": 100,
  "payout_per_conversion": 250.00
}
```

#### GET `/api/crm/brokers/[id]`
Get broker details with stats

#### PUT `/api/crm/brokers/[id]`
Update broker

#### DELETE `/api/crm/brokers/[id]`
Delete broker

---

### Lead Assignment

#### POST `/api/crm/assign-lead`
Assign a lead to a broker (manual or auto)

**Body:**
```json
{
  "leadId": "lead-uuid",
  "brokerId": "broker-uuid", // Optional, auto-assigns if not provided
  "method": "manual" // or "auto"
}
```

**Auto-Assignment Logic:**
1. Filters brokers by country codes
2. Checks daily/hourly capacity limits
3. Validates working hours and days
4. Sorts by conversion rate (best first)
5. Assigns to top performer

---

### Webhooks

#### POST `/api/crm/webhook/status`
Receive sales status updates from brokers

**Body:**
```json
{
  "broker_api_key": "your_key",
  "lead_id": "lead-uuid",
  "external_lead_id": "broker_internal_id",
  "status": "deposit_made",
  "deposit_amount": 1000,
  "deposit_currency": "USD",
  "deposit_date": "2025-01-15T10:30:00Z",
  "trading_volume": 50000,
  "total_trades": 25,
  "notes": "Customer is active"
}
```

**Status Values:**
- `new` - New lead
- `contacted` - Broker contacted the lead
- `interested` - Lead showed interest
- `demo_scheduled` - Demo/meeting scheduled
- `demo_completed` - Demo completed
- `application_submitted` - Application submitted
- `kyc_pending` - KYC in progress
- `kyc_approved` - KYC approved
- `kyc_rejected` - KYC rejected
- `deposit_made` - Lead deposited money ✅
- `active_trader` - Actively trading ✅
- `inactive` - No longer trading
- `lost` - Lost the lead
- `blocked` - Lead blocked

#### GET `/api/crm/webhook/status`
Get webhook documentation

---

### Analytics

#### GET `/api/crm/analytics`
Get comprehensive analytics

**Query Parameters:**
- `days` - Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "analytics": {
    "overview": {
      "total_leads": 500,
      "assigned_leads": 450,
      "converted_leads": 125,
      "conversion_rate": "27.78",
      "growth_rate": "15.2"
    },
    "leads_by_country": {...},
    "leads_by_status": {...},
    "broker_performance": [...],
    "top_brokers": [...],
    "daily_stats": [...]
  }
}
```

---

## 🖥️ Back Office UI

Access the CRM dashboard at: `/crm`

### Dashboard Tab
- 📊 Overview metrics (total leads, conversions, rates)
- 🏆 Top performing brokers
- 🌍 Leads by country distribution
- 📈 Growth rate and trends

### Leads Tab
- 📋 Full lead list with filters
- 🔍 Search by status, country, broker
- ✏️ Manual lead assignment
- 👁️ View lead details and activity

### Brokers Tab
- 🏢 Broker management interface
- ➕ Add/edit/delete brokers
- 📊 Performance metrics per broker
- ⚙️ API configuration

### Analytics Tab
- 📈 Detailed charts and graphs
- 📊 Status breakdown
- 🎯 Conversion funnels
- 📅 Date range analysis

---

## 🔗 Broker Integration

### How to Integrate a Broker

1. **Create Broker Profile**
   - Add broker via UI or API
   - Configure API endpoint and credentials
   - Set country codes and capacity limits

2. **Broker Receives Leads**
   - System calls broker's API when lead is assigned
   - Sends lead data (name, email, phone, country)
   - Broker returns their internal lead ID

3. **Broker Sends Updates**
   - Broker calls your webhook: `/api/crm/webhook/status`
   - Updates lead status, deposit info, trading data
   - System automatically syncs status

### Example: Send Lead to Broker

```javascript
// System automatically calls when lead is assigned
const response = await fetch(broker.api_endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${broker.api_key}`,
  },
  body: JSON.stringify({
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: `${lead.country_code}${lead.phone_number}`,
    country: lead.country,
    source: 'your_site'
  })
});
```

### Example: Broker Sends Update

```bash
curl -X POST https://yoursite.com/api/crm/webhook/status \
  -H "Content-Type: application/json" \
  -d '{
    "broker_api_key": "secret_key",
    "lead_id": "uuid",
    "status": "deposit_made",
    "deposit_amount": 1000,
    "deposit_currency": "USD"
  }'
```

---

## 🎯 Lead Assignment Logic

### Automatic Assignment Flow

1. **New Lead Created**
   - Lead saved to `signups` table
   - Status: `new`

2. **Assignment Trigger**
   - Manual: Admin clicks "Assign"
   - Auto: API call without broker_id
   - Scheduled: Cron job assigns pending leads

3. **Find Best Broker**
   ```
   ✅ Filter by country codes
   ✅ Check daily capacity (leads_received_today < max_leads_per_day)
   ✅ Check hourly capacity
   ✅ Validate working hours (UTC)
   ✅ Validate working days
   ✅ Sort by conversion rate (best first)
   ✅ Return top broker
   ```

4. **Create Assignment**
   - Insert into `lead_assignments`
   - Update lead: `lead_status = 'assigned'`
   - Log activity

5. **Send to Broker**
   - Call broker's API
   - Store response
   - Update delivery status

---

## 📊 Analytics & Reporting

### Key Metrics

- **Total Leads** - All signups
- **Assigned Leads** - Leads sent to brokers
- **Converted Leads** - Leads with deposits
- **Conversion Rate** - (Converted / Assigned) × 100
- **Growth Rate** - Week-over-week signup increase

### Broker Performance

Each broker tracked by:
- Leads received
- Leads converted
- Conversion rate
- Total deposits
- Commission earned
- Average response time

### Daily Stats View

```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_signups,
  COUNT(DISTINCT country) as unique_countries,
  COUNT(CASE WHEN assigned_broker_id IS NOT NULL THEN 1 END) as assigned,
  COUNT(CASE WHEN lead_status = 'deposit_made' THEN 1 END) as converted
FROM signups
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🛠️ Advanced Configuration

### Custom Assignment Rules

Create smart routing rules:

```sql
INSERT INTO assignment_rules (name, priority, conditions, broker_id, action_type)
VALUES (
  'UAE Premium Leads',
  100,
  '{"country": ["AE"], "min_lead_score": 80}',
  'broker-uuid',
  'assign'
);
```

### Webhook Security

Add API key validation:

```javascript
// In webhook route
const broker = await supabaseAdmin
  .from('brokers')
  .select('*')
  .eq('api_key', broker_api_key)
  .single();

if (!broker) {
  return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
}
```

### Commission Calculation

Auto-calculate commissions:

```javascript
// When deposit_made status received
const commission = broker.payout_per_conversion;
await updateSalesStatus(statusId, {
  commission_earned: commission,
  commission_status: 'pending'
});
```

---

## 🔐 Security Best Practices

1. **API Key Storage** - Encrypt broker API keys
2. **Webhook Validation** - Verify broker identity
3. **Rate Limiting** - Prevent API abuse
4. **Access Control** - Admin-only CRM access
5. **Audit Logging** - Track all activities
6. **Data Privacy** - GDPR compliance

---

## 🐛 Troubleshooting

### Lead Not Assigning?

1. Check broker is `active`
2. Verify country_codes match
3. Check capacity limits
4. Validate working hours

### Webhook Not Working?

1. Check webhook_logs table
2. Verify broker_api_key
3. Test with GET `/api/crm/webhook/status` for docs
4. Check request body format

### Performance Issues?

1. Add database indexes
2. Use pagination on large queries
3. Cache analytics data
4. Optimize assignment queries

---

## 📞 Support

For issues or questions:
- Check the API documentation
- Review webhook logs: `SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 10;`
- Check lead activity: `SELECT * FROM lead_activity_log WHERE lead_id = 'uuid';`

---

## 🚀 Next Steps

1. ✅ Run database migration
2. ✅ Add your brokers
3. ✅ Configure assignment rules
4. ✅ Test with sample leads
5. ✅ Integrate broker webhooks
6. ✅ Monitor analytics dashboard

---

**Built with ❤️ for efficient lead management and broker integration**