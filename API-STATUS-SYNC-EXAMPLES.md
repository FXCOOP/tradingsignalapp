# 🔌 Trading CRM Status Sync API - Examples

## Endpoint: `/api/trading-crm/sync-status`

---

## 📥 GET - View Sync Statistics

Get overview of all synced leads and conversion rates.

### Request

```bash
curl -X GET http://localhost:3000/api/trading-crm/sync-status
```

### Response

```json
{
  "success": true,
  "stats": {
    "totalSynced": 45,
    "conversions": 8,
    "conversionRate": "17.78%",
    "lastSync": "2025-11-06T10:30:00.000Z",
    "statusBreakdown": {
      "New": 15,
      "Contact": 12,
      "FTD": 8,
      "Demo": 5,
      "Not Interested": 5
    }
  }
}
```

---

## 🔄 POST - Sync Single Lead

Fetch and update status for one specific lead.

### Request

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{
    "signupId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }'
```

### Response (Success)

```json
{
  "success": true,
  "leadId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "FTD",
  "statusCode": 9,
  "ftdExists": true,
  "tpAccount": "MT4-123456",
  "updated": true
}
```

### Response (Not Found)

```json
{
  "success": false,
  "error": "Lead not found in Trading CRM"
}
```

---

## 📊 POST - Sync All Recent Leads

Fetch and update statuses for all leads from the last N days.

### Request (Last 7 Days)

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{
    "syncAll": true,
    "days": 7
  }'
```

### Request (Last 30 Days)

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{
    "syncAll": true,
    "days": 30
  }'
```

### Response

```json
{
  "success": true,
  "synced": 45,
  "updated": 42,
  "conversions": 8,
  "leads": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "john@example.com",
      "status": "FTD",
      "ftd": true
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "email": "jane@example.com",
      "status": "Contact",
      "ftd": false
    }
  ]
}
```

---

## 🔍 Use Cases

### 1. Manual Status Check (After Broker Updates Lead)

When broker updates a lead in Trading CRM, sync that lead immediately:

```bash
# Get the signup ID from your database
SIGNUP_ID="xyz123..."

# Sync status
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d "{\"signupId\": \"$SIGNUP_ID\"}"
```

---

### 2. Daily Conversion Report

Check new conversions from yesterday:

```bash
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{
    "syncAll": true,
    "days": 1
  }' | jq '.conversions'
```

With [jq](https://stedolan.github.io/jq/), you can extract just the conversion count.

---

### 3. Weekly Performance Check

Every Monday, sync last week's leads:

```bash
# Create a weekly cron job
0 9 * * 1 curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{"syncAll": true, "days": 7}'
```

---

### 4. Real-Time Dashboard Stats

Get current statistics for admin dashboard:

```javascript
// Frontend code
async function getDashboardStats() {
  const response = await fetch('/api/trading-crm/sync-status');
  const data = await response.json();

  if (data.success) {
    document.getElementById('total-leads').innerText = data.stats.totalSynced;
    document.getElementById('conversions').innerText = data.stats.conversions;
    document.getElementById('conversion-rate').innerText = data.stats.conversionRate;
  }
}
```

---

### 5. Automated Hourly Sync (Background Service)

Run continuously to keep statuses updated:

```bash
# Using the provided script
node sync-status-cron.mjs

# Or with PM2 (production)
pm2 start sync-status-cron.mjs --name "status-sync"
```

---

## 📈 Response Field Meanings

### Status Codes
| Code | Status | Description |
|------|--------|-------------|
| 1 | New | Lead just registered |
| 2 | Attempted | Broker tried calling |
| 3 | Contact | In active conversation |
| 4 | No Answer | Couldn't reach lead |
| 5 | Callback | Scheduled follow-up |
| 6 | Not Interested | Lead declined offer |
| 7 | Invalid Number | Phone number wrong |
| 8 | Demo | Demo account opened |
| **9** | **FTD** | **💰 First deposit made!** |
| 10 | Retention | Active customer |
| 11 | Deposited | Additional deposit |
| 12 | Withdrawn | Withdrew funds |

### Key Fields

- **`ftdExists`**: `true` = Lead made a deposit (converted!)
- **`tpAccount`**: Trading platform account number (e.g., "MT4-123456")
- **`updated`**: Whether database was updated with new status
- **`conversions`**: Count of leads with FTD

---

## 🧪 Testing Flow

```bash
# 1. Check current stats
curl http://localhost:3000/api/trading-crm/sync-status

# 2. Sync all recent leads
curl -X POST http://localhost:3000/api/trading-crm/sync-status \
  -H "Content-Type: application/json" \
  -d '{"syncAll": true, "days": 7}'

# 3. Check stats again (should see updates)
curl http://localhost:3000/api/trading-crm/sync-status

# 4. Verify in Supabase
# Open Supabase → Table Editor → signups
# Check broker_status column for updates
```

---

## 🔐 Authentication

This endpoint currently uses **service role key** authentication (backend only).

**Important:** Do NOT expose this endpoint publicly without adding proper authentication!

---

## ⚡ Performance Notes

- **Single lead sync**: ~500ms (1 API call to Trading CRM)
- **Bulk sync (50 leads)**: ~2-3 seconds (1 batched API call)
- **Rate limits**: Trading CRM may have rate limits, use bulk sync when possible

---

## 🆘 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Either signupId or syncAll=true is required"
}
```
**Fix:** Provide either `signupId` or `syncAll` parameter.

### 404 Not Found
```json
{
  "success": false,
  "error": "Lead not found in Trading CRM"
}
```
**Fix:** Lead hasn't been pushed to Trading CRM yet. Push first, then sync.

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Trading CRM API returned 401"
}
```
**Fix:** Check `TRADING_CRM_API_KEY` environment variable.

---

## 📚 Additional Resources

- **Setup Guide:** `STATUS-TRACKING-SETUP.md`
- **Quick Start:** `QUICK-START-CHECKLIST.md`
- **Test Script:** `test-status-sync.mjs`
- **Cron Job:** `sync-status-cron.mjs`
