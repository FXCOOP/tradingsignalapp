# AllCrypto Lead Distribution Integration

## Overview

This document describes the AllCrypto broker integration using the yourleads.org Affiliate API v.2.

**Broker Name**: AllCrypto
**API Domain**: https://yourleads.org
**API Version**: Affiliate API v.2

## Supported Countries

AllCrypto accepts leads from the following countries:

| Country | Code | Language |
|---------|------|----------|
| 🇦🇺 Australia | AU | English |
| 🇰🇷 South Korea | KR | Korean |
| 🇸🇬 Singapore | SG | English |
| 🇭🇰 Hong Kong | HK | Chinese |
| 🇹🇷 Turkey | TR | Turkish |
| 🇳🇱 Netherlands | NL | Dutch |
| 🇧🇪 Belgium | BE | Dutch |
| 🇮🇹 Italy | IT | Italian |
| 🇪🇸 Spain | ES | Spanish |
| 🇫🇷 France | FR | French |
| 🇨🇦 Canada | CA | English |

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```bash
# AllCrypto Lead Distribution Integration
ALLCRYPTO_API_ENDPOINT=https://yourleads.org/api/affiliates/v2/leads
ALLCRYPTO_API_TOKEN=da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn
ALLCRYPTO_GOAL_TYPE_LEAD_PUSHED=b73f6b3e-2ed4-4704-8723-e4646d2de6b2
ALLCRYPTO_GOAL_TYPE_FTD=ce58174a-35a0-4e1c-90b4-c61174ef6b52
ALLCRYPTO_ENABLED=true
```

### API Credentials

- **API Token**: `da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn`
- **Goal Type UUID (Lead Pushed)**: `b73f6b3e-2ed4-4704-8723-e4646d2de6b2`
- **Goal Type UUID (FTD)**: `ce58174a-35a0-4e1c-90b4-c61174ef6b52`

## API Endpoints

### 1. Push Lead to AllCrypto

**Endpoint**: `POST /api/allcrypto/send-lead`

**Request Body**:
```json
{
  "signupId": "123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+61412345678",
  "country": "AU",
  "language": "en",
  "ip": "203.0.113.1",
  "password": "SecurePass123!",
  "tag": "campaign_name",
  "utmSource": "google",
  "utmCampaign": "test_campaign",
  "isTest": false
}
```

**Success Response**:
```json
{
  "success": true,
  "lead_uuid": "0f1b8398-e144-4fa6-93e0-1d7dce7b74db",
  "auto_login_url": "https://autologin-domain.com/...",
  "advertiser_name": "AllCrypto Brand",
  "message": "Lead successfully sent to AllCrypto"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "firstName should not be empty",
  "errorType": "FIXABLE_INPUT",
  "details": {...}
}
```

### 2. Get Lead Status

**Endpoint**: `GET /api/allcrypto/get-status?lead_uuid=<UUID>`

**Success Response**:
```json
{
  "success": true,
  "lead": {
    "uuid": "0f1b8398-e144-4fa6-93e0-1d7dce7b74db",
    "goalType": "Pushed Lead",
    "country": "AU",
    "email": "john.doe@example.com",
    "advertiserName": "AllCrypto Brand",
    "externalId": "12345",
    "isTest": false,
    "createdAt": "2023-08-28T14:10:44.176Z"
  }
}
```

### 3. Get Recent Leads

**Endpoint**: `GET /api/allcrypto/get-status`

**Query Parameters**:
- `created_from` (optional): ISO date string (e.g., "2023-06-22T00:00:00Z")
- `created_to` (optional): ISO date string
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Results per page (default: 20, max: 500)
- `goal_type_uuid` (optional): Filter by goal type
- `is_test` (optional): Filter test leads (true/false)

**Example**:
```
GET /api/allcrypto/get-status?created_from=2023-08-01T00:00:00Z&per_page=50&is_test=true
```

### 4. Get Goal Types

**Endpoint**: `GET /api/allcrypto/goal-types`

**Success Response**:
```json
{
  "success": true,
  "goalTypes": [
    {
      "uuid": "b73f6b3e-2ed4-4704-8723-e4646d2de6b2",
      "name": "Pushed Lead"
    },
    {
      "uuid": "ce58174a-35a0-4e1c-90b4-c61174ef6b52",
      "name": "FTD"
    }
  ]
}
```

## Lead Push Flow

### Automatic Push Logic

The system automatically pushes leads to AllCrypto in the following scenarios:

1. **Primary Route**: If the lead's country is in the AllCrypto supported countries list
2. **Fallback Route**: If Trading CRM push fails for a country that AllCrypto also supports

### Push Priority

```
1. Try Trading CRM first (for MY, TR, FR, IT, HK, SG, TW, BR)
2. If Trading CRM fails AND country is in AllCrypto list → Push to AllCrypto
3. If country is AllCrypto-only (AU, KR, NL, BE, ES, CA) → Push directly to AllCrypto
```

### Example: Malaysia (MY)

```
Lead from MY arrives
  ├─→ Try Trading CRM (supported)
  │   ├─→ Success ✅ → Done
  │   └─→ Failed ❌ → Try AllCrypto (MY not in AllCrypto list)
  └─→ AllCrypto not attempted (MY not supported)
```

### Example: Australia (AU)

```
Lead from AU arrives
  ├─→ Trading CRM not attempted (AU not supported)
  └─→ Push to AllCrypto directly ✅
```

### Example: Singapore (SG)

```
Lead from SG arrives
  ├─→ Try Trading CRM first (supported)
  │   ├─→ Success ✅ → Done
  │   └─→ Failed ❌ → Try AllCrypto (SG IS in AllCrypto list) ✅
  └─→ Fallback to AllCrypto if needed
```

## Testing

### Test Lead Requirements

When sending test leads, you MUST:

1. Set `isTest: true` in the request body
2. This will automatically add `"test"` to the `aff_sub5` field
3. The API will mark the lead with `is_test: true`

**Example Test Lead**:
```json
{
  "signupId": "test-123",
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "phone": "+61412345678",
  "country": "AU",
  "ip": "203.0.113.1",
  "isTest": true  // ← Important!
}
```

### Running Tests

Use the provided test script:

```bash
node test-allcrypto.mjs
```

This will:
1. Push a test lead to AllCrypto
2. Get goal types
3. Retrieve the lead status
4. Get recent test leads

### Manual Testing

You can also test via API calls:

```bash
# 1. Push test lead
curl -X POST http://localhost:3000/api/allcrypto/send-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+61412345678",
    "country": "AU",
    "ip": "203.0.113.1",
    "isTest": true
  }'

# 2. Get goal types
curl http://localhost:3000/api/allcrypto/goal-types

# 3. Get recent test leads
curl "http://localhost:3000/api/allcrypto/get-status?is_test=true&per_page=10"
```

## Error Handling

### Common Error Types

| Error Type | Status Code | Description |
|------------|-------------|-------------|
| `FIXABLE_INPUT` | 400/422 | Validation error (e.g., missing required field) |
| `BLOCKED_BY_TRAFFIC_FILTER` | 400 | Rejected by CRM traffic filter |
| `DUPLICATION_ERROR` | 400 | Lead already exists for advertiser |
| `CRM_DUPLICATION_ERROR` | 400 | Lead rejected by deduplication rules |
| `BLOCK_COUNTRY` | 400 | Country not allowed |
| `ERROR_AUTHORIZATION` | 401 | Invalid API token or IP not whitelisted |
| `NOT_FOUND` | 404 | Route not found (check URL) |
| `NOT_SUPPORTED` | 410 | API version not supported |
| `RateLimitExceeded` | 429 | Too many requests |

### Error Response Format

```json
{
  "success": false,
  "error": "firstName should not be empty",
  "errorType": "FIXABLE_INPUT",
  "errorMessage": "Validation failed",
  "details": {
    "code": 422,
    "type": "FIXABLE_INPUT",
    "data": {
      "errorMessage": "firstName should not be empty"
    }
  }
}
```

## Rate Limits

- **POST requests**: 50 requests per 10 seconds
- **GET requests**: 3 requests per 3 seconds, max 100 per hour
- **Duplicate requests**: Same request body cannot be sent within 2 minutes

## Database Tracking

All lead pushes are tracked in the Supabase database:

### `signups` table updates:
- `pushed_to_crm`: true/false
- `push_status_code`: HTTP status code (200, 400, 500, etc.)
- `push_response`: Full JSON response from AllCrypto API
- `push_error`: Error message if failed
- `pushed_at`: Timestamp
- `assigned_broker`: "AllCrypto - [Advertiser Name]"

### `lead_assignments` table:
- `delivery_status`: 'sent' or 'failed'
- `api_response`: Full API response
- `external_lead_id`: AllCrypto's lead UUID
- `error_message`: Error details if failed

## Monitoring

### Check Push Status

In the CRM dashboard ([/crm](http://localhost:3000/crm)), you can see:

- Push Status column showing HTTP status codes
- Click on status to view full API response
- Green badge = successful push (200)
- Red badge = failed push (400, 500, etc.)
- Hover for full error message

### Logs

Server logs include:
```
[send-lead] Attempting to push to AllCrypto for country: AU
📤 AllCrypto API Request: { endpoint: '...', email: '...', country: 'AU' }
📤 Exact Payload (JSON): {...}
📥 AllCrypto API Response: { status: 200, ... }
✅ AllCrypto lead sent successfully: { lead_uuid: '...', advertiser: '...' }
```

## Support

For AllCrypto API issues:
1. Check server logs for detailed error messages
2. Verify API token is correct
3. Ensure IP is whitelisted (if required)
4. Check rate limits haven't been exceeded
5. Contact AllCrypto support with lead UUID

## API Documentation Reference

Full API documentation: Provided in the original API docs PDF
- Push leads endpoint details
- Get leads endpoint details
- Get goal types endpoint details
- Error types reference
- Rate limits and restrictions
