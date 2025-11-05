# Trading CRM Integration Guide
## AFF 225X - Broker API Integration

This document provides comprehensive instructions for the Trading CRM (affiliate365) broker integration that automatically sends leads from target countries to your broker CRM.

---

## Table of Contents

1. [Overview](#overview)
2. [Supported Countries](#supported-countries)
3. [Configuration](#configuration)
4. [API Endpoints](#api-endpoints)
5. [Testing](#testing)
6. [Automatic Lead Flow](#automatic-lead-flow)
7. [Language Mapping](#language-mapping)
8. [Monitoring](#monitoring)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The Trading CRM integration automatically sends user signups from specific countries to your broker's CRM system via their SSO registration API. When users from supported countries sign up on your platform, their information is immediately forwarded to the broker's system.

**Integration Details:**
- **Broker:** Trading CRM (affiliate365.tradingcrm.com)
- **Affiliate ID:** 225X
- **API Endpoint:** `https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso`
- **Authentication:** Basic Auth → Bearer Token
- **Promotion Code:** defaultAcademiesGroup

---

## Supported Countries

The integration automatically routes leads from these 8 countries:

| Country | ISO Code | Language | Thank You Page |
|---------|----------|----------|----------------|
| Malaysia | MY | Malay (ms) | https://worldinsight-update.com/terima-kasih.html |
| Turkey | TR | Turkish (tr) | https://worldinsight-update.com/kaydolduğunuz.html |
| France | FR | French (fr) | https://worldinsight-update.com/merci.html |
| Italy | IT | Italian (it) | https://worldinsight-update.com/grazie.html |
| Hong Kong | HK | Chinese (zh) | https://worldinsight-update.com/xiexie.html |
| Singapore | SG | English (en) | https://worldinsight-update.com/thanks.html |
| Taiwan | TW | Chinese (zh) | https://worldinsight-update.com/xiexie.html |
| Brazil | BR | Portuguese (pt) | https://worldinsight-update.com/obrigado.html |

---

## Configuration

### 1. Environment Variables

Add these variables to your `.env` file:

```bash
# Trading CRM Integration
TRADING_CRM_API_ENDPOINT="https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso"
TRADING_CRM_USERNAME="225X"
TRADING_CRM_PASSWORD="DHConsulting225x!"
TRADING_CRM_PROMOTION_CODE="defaultAcademiesGroup"
TRADING_CRM_ENABLED="true"

# Optional Configuration
TRADING_CRM_DEFAULT_CAMPAIGN_ID="" # Your default campaign/source ID
TRADING_CRM_WHITELISTED_IPS="" # Comma-separated IPs if required
```

### 2. Enable/Disable Integration

To disable the integration without removing credentials:

```bash
TRADING_CRM_ENABLED="false"
```

### 3. Required Dependencies

Ensure these packages are installed:

```bash
npm install @supabase/supabase-js bcryptjs jsonwebtoken
```

---

## API Endpoints

### 1. Send Lead Manually

**Endpoint:** `POST /api/trading-crm/send-lead`

Send a specific lead to Trading CRM.

**Request Body:**
```json
{
  "userId": "uuid",
  "signupId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+60123456789",
  "country": "MY",
  "language": "ms",
  "campaignId": "SOURCE_123",
  "tag": "funnel_name",
  "utmSource": "google",
  "utmCampaign": "trading_signals"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "broker_lead_id",
  "redirectUrl": "https://worldinsight-update.com/terima-kasih.html",
  "message": "Lead successfully sent to Trading CRM"
}
```

### 2. Test Integration

**Endpoint:** `POST /api/trading-crm/test`

Send a test lead to verify the integration is working.

**Request Body:**
```json
{
  "testCountry": "IT",
  "testLanguage": "it"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test lead sent successfully to Trading CRM",
  "leadId": "test_lead_id",
  "redirectUrl": "https://worldinsight-update.com/grazie.html",
  "testLead": {
    "email": "test.it.1234567890@example.com",
    "country": "IT",
    "language": "it",
    "phone": "+393331234567"
  },
  "countryInfo": {
    "iso": "IT",
    "name": "Italy",
    "language": "it"
  },
  "autoDetectedLanguage": "it",
  "thankYouUrl": "https://worldinsight-update.com/grazie.html"
}
```

**Test All Countries:**
```bash
# Test Malaysia
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"MY"}'

# Test Turkey
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"TR"}'

# Test France
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"FR"}'

# Test Italy
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"IT"}'

# Test Hong Kong
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"HK"}'

# Test Singapore
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"SG"}'

# Test Taiwan
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"TW"}'

# Test Brazil
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"BR"}'
```

### 3. Check Integration Status

**Endpoint:** `GET /api/trading-crm/status`

Get current status, configuration, and statistics.

**Response:**
```json
{
  "integration": "Trading CRM - AFF 225X",
  "status": {
    "enabled": true,
    "configured": true,
    "connection": "connected"
  },
  "configuration": {
    "apiEndpoint": "https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso",
    "username": "Configured",
    "password": "Configured",
    "promotionCode": "defaultAcademiesGroup",
    "defaultCampaignId": "Not set"
  },
  "supportedCountries": [...],
  "statistics": {
    "total": 156,
    "sent": 152,
    "failed": 4,
    "pending": 0,
    "successRate": "97.44%",
    "today": {
      "total": 23,
      "sent": 23,
      "failed": 0
    }
  },
  "endpoints": {
    "sendLead": "/api/trading-crm/send-lead",
    "test": "/api/trading-crm/test",
    "status": "/api/trading-crm/status"
  }
}
```

---

## Testing

### Step 1: Verify Configuration

```bash
# Check integration status
curl http://localhost:3000/api/trading-crm/status
```

Verify:
- `status.enabled` is `true`
- `status.configured` is `true`
- `status.connection` is `connected`

### Step 2: Send Test Lead

```bash
# Send a test lead from Malaysia
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"MY","testLanguage":"ms"}'
```

Expected result:
- `success: true`
- Lead ID returned
- Redirect URL for Malaysia (Malay language)

### Step 3: Verify with Broker

After sending the test lead:
1. Tag the broker contact with the test lead details
2. Ask them to confirm they received the lead in their CRM
3. Verify all fields are correctly mapped

---

## Automatic Lead Flow

When a user signs up through your platform, the following happens automatically:

### 1. User Signup
```
User fills form → POST /api/signup
↓
- First Name, Last Name
- Email
- Country Code + Phone Number
- Country (name or ISO code)
- Language preference
- Terms acceptance
```

### 2. Lead Processing
```
Signup API processes:
↓
1. Validate data
2. Create signup record in database
3. Create user account with premium access
4. Generate JWT token
```

### 3. Country Check
```
Extract country ISO code:
↓
- Malaysia, Turkey, France, Italy, Hong Kong, Singapore, Taiwan, Brazil
- If country matches → Send to Trading CRM
- If country doesn't match → Skip broker integration
```

### 4. Broker Integration
```
If country is supported:
↓
1. Format lead data with Trading CRM requirements
2. Authenticate with API (Basic Auth → Bearer Token)
3. Send lead via POST /accounts/registrationwithsso
4. Receive leadId and redirect URL
5. Log result to database
```

### 5. Response to User
```
Return to frontend:
↓
{
  "success": true,
  "user": {...},
  "token": "jwt_token",
  "brokerIntegration": {
    "sent": true,
    "leadId": "broker_lead_id",
    "redirectUrl": "https://worldinsight-update.com/..."
  }
}
```

---

## Language Mapping

The system automatically detects the correct language based on the user's country:

### Auto-Detection Logic

1. **User selects country during signup**
2. **System maps country to language:**
   - MY (Malaysia) → ms (Malay)
   - TR (Turkey) → tr (Turkish)
   - FR (France) → fr (French)
   - IT (Italy) → it (Italian)
   - HK/TW (Hong Kong/Taiwan) → zh (Chinese)
   - SG (Singapore) → en (English)
   - BR (Brazil) → pt (Portuguese)

3. **System selects thank you page:**
   - Malay → https://worldinsight-update.com/terima-kasih.html
   - Turkish → https://worldinsight-update.com/kaydolduğunuz.html
   - French → https://worldinsight-update.com/merci.html
   - Italian → https://worldinsight-update.com/grazie.html
   - Chinese → https://worldinsight-update.com/xiexie.html
   - English → https://worldinsight-update.com/thanks.html
   - Portuguese → https://worldinsight-update.com/obrigado.html

### Override Language

If you want to manually specify a language instead of auto-detection, pass it in the signup request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "country": "SG",
  "language": "zh", // Override: Send Chinese instead of English
  ...
}
```

---

## Monitoring

### Real-Time Logs

All Trading CRM API calls are logged to console:

```bash
# Success logs
✓ Country MY is supported by Trading CRM. Sending lead automatically...
✓ Lead successfully sent to Trading CRM: { email, country, leadId }

# Failure logs
✗ Failed to send lead to Trading CRM: API error message
✗ Country XX is not supported by Trading CRM
```

### Database Tracking

Leads sent to Trading CRM are tracked in the `lead_assignments` table:

```sql
SELECT
  la.id,
  la.lead_id,
  s.email,
  s.country,
  la.delivery_status,
  la.api_response,
  la.created_at
FROM lead_assignments la
JOIN signups s ON s.id = la.lead_id
WHERE la.assigned_broker = 'Trading CRM - AFF 225X'
ORDER BY la.created_at DESC
LIMIT 50;
```

### View Statistics

Get integration statistics via API:

```bash
curl http://localhost:3000/api/trading-crm/status
```

Or build a dashboard showing:
- Total leads sent today
- Success/failure rate
- Leads by country
- Average response time

---

## Troubleshooting

### Issue: Connection Failed

**Symptom:** `status.connection` returns `"failed"` or `"error"`

**Solutions:**
1. Verify credentials in `.env` file
2. Check if API endpoint is accessible
3. Verify whitelisted IPs (if required)

```bash
# Test connection manually
curl -X POST https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso \
  -H "Authorization: Basic $(echo -n '225X:DHConsulting225x!' | base64)" \
  -H "Content-Type: application/json"
```

### Issue: Leads Not Being Sent

**Symptom:** Users sign up but no leads reach Trading CRM

**Solutions:**

1. **Check if integration is enabled:**
```bash
# Verify in .env
TRADING_CRM_ENABLED="true"
```

2. **Check country is supported:**
```bash
# View logs when user signs up
Country XX is not supported by Trading CRM
```

3. **Check API logs:**
```bash
# Look for error messages
npm run dev 2>&1 | grep "Trading CRM"
```

### Issue: Wrong Language/Redirect URL

**Symptom:** Users get wrong thank you page

**Solutions:**

1. **Verify country ISO code mapping** in [src/app/api/signup/route.ts:259-289](src/app/api/signup/route.ts)
2. **Check language detection** in [src/lib/trading-crm-api.ts:34-45](src/lib/trading-crm-api.ts)
3. **Verify thank you page URLs** in [src/lib/trading-crm-api.ts:18-26](src/lib/trading-crm-api.ts)

### Issue: Authentication Errors

**Symptom:** `401 Unauthorized` or `403 Forbidden` errors

**Solutions:**

1. **Verify credentials:**
   - Username: `225X`
   - Password: `DHConsulting225x!`

2. **Check IP whitelisting:**
   - Add your server IPs to broker's whitelist
   - Update `TRADING_CRM_WHITELISTED_IPS` in `.env`

3. **Token expiry:**
   - Bearer tokens expire after 1 hour (configurable)
   - System automatically re-authenticates on expiry

### Issue: Test Leads Showing as Real Leads

**Symptom:** Test leads appear in broker's production CRM

**Solutions:**

1. **Use test endpoint only:**
```bash
POST /api/trading-crm/test # Test leads have special email format
```

2. **Test leads are marked with:**
   - Email: `test.{country}.{timestamp}@example.com`
   - additionalInfo2: "Please do not process"
   - additionalInfo3: "Automated test"
   - tag1: "api_integration_test"

3. **Ask broker to filter test leads:**
   - Filter by email domain: `@example.com`
   - Filter by tag1: `api_integration_test`

---

## API Payload Reference

### Trading CRM Required Payload

```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string, // Format: +60123456789
  affiliateTransactionId: string, // Your unique lead ID
  isoCountry: string, // ISO code: MY, TR, FR, IT, HK, SG, TW, BR
  subAffiliate: string, // Optional
  campaignId: string, // Your campaign/source ID
  tag: string, // Funnel name
  tag1: string, // Optional secondary tag
  registrationUrl: string, // Your website URL
  additionalInfo1: string, // Optional
  additionalInfo2: string, // Optional
  additionalInfo3: string, // Optional
  language: string, // ms, tr, fr, it, zh, en, pt
  ip: string, // User's IP address
  isVerified: boolean, // Email verification status
  promotionCode: string, // 'defaultAcademiesGroup'
  password: string, // Empty for auto-generated
  utmCampaign: string, // Optional
  utmSource: string // Optional
}
```

---

## Files Reference

| File | Purpose |
|------|---------|
| [src/lib/trading-crm-api.ts](src/lib/trading-crm-api.ts) | Core API client and logic |
| [src/app/api/trading-crm/send-lead/route.ts](src/app/api/trading-crm/send-lead/route.ts) | Manual lead sending endpoint |
| [src/app/api/trading-crm/test/route.ts](src/app/api/trading-crm/test/route.ts) | Test endpoint |
| [src/app/api/trading-crm/status/route.ts](src/app/api/trading-crm/status/route.ts) | Status and monitoring |
| [src/app/api/signup/route.ts](src/app/api/signup/route.ts) | Automatic integration trigger |
| [.env.example](.env.example) | Configuration template |

---

## Support

For issues or questions about the Trading CRM integration:

1. **Check Status Endpoint:** `GET /api/trading-crm/status`
2. **Review Logs:** Look for "Trading CRM" in application logs
3. **Test Connection:** `POST /api/trading-crm/test`
4. **Contact Broker:** Tag them with lead details for verification

---

## Next Steps

1. ✅ Copy `.env.example` to `.env` and configure credentials
2. ✅ Test API connection: `GET /api/trading-crm/status`
3. ✅ Send test lead: `POST /api/trading-crm/test`
4. ✅ Tag broker contact with test lead details
5. ✅ Verify broker receives test lead
6. ✅ Enable automatic integration: `TRADING_CRM_ENABLED="true"`
7. ✅ Monitor first real signups
8. ✅ Check statistics regularly: `GET /api/trading-crm/status`

---

**Integration Version:** 1.0
**Last Updated:** 2025-11-05
**Broker:** Trading CRM - AFF 225X
