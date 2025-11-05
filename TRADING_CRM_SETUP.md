# Trading CRM Integration - Quick Setup Guide

This guide will get your Trading CRM integration up and running in 5 minutes.

## Prerequisites

- Node.js 20.x or higher
- Access to your environment variables (`.env` file)
- Broker credentials provided by Trading CRM

---

## Quick Setup (5 Minutes)

### Step 1: Configure Environment Variables (2 minutes)

1. Copy the environment template:
```bash
# If you don't have a .env file yet
cp .env.example .env
```

2. Add these lines to your `.env` file:
```bash
# Trading CRM Integration
TRADING_CRM_API_ENDPOINT="https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso"
TRADING_CRM_USERNAME="225X"
TRADING_CRM_PASSWORD="DHConsulting225x!"
TRADING_CRM_PROMOTION_CODE="defaultAcademiesGroup"
TRADING_CRM_ENABLED="true"

# Optional: Add your campaign ID if you have one
TRADING_CRM_DEFAULT_CAMPAIGN_ID=""
```

3. Save the file

### Step 2: Install Dependencies (1 minute)

```bash
npm install
```

### Step 3: Start Your Application (1 minute)

```bash
npm run dev
```

Wait for the server to start on `http://localhost:3000`

### Step 4: Add Broker to CRM Dashboard (30 seconds)

**Option A: Using PowerShell (Windows)**
```powershell
.\setup-trading-crm-broker.ps1
```

**Option B: Using Bash (Linux/Mac)**
```bash
chmod +x setup-trading-crm-broker.sh
./setup-trading-crm-broker.sh
```

**Option C: Manual Setup with cURL**
```bash
curl -X POST http://localhost:3000/api/trading-crm/setup-broker
```

This adds Trading CRM to your CRM dashboard at `/crm` so you can see it in your broker list!

### Step 5: Test the Integration (1 minute)

**Option A: Using PowerShell (Windows)**
```powershell
.\test-trading-crm.ps1
```

**Option B: Using Bash (Linux/Mac)**
```bash
chmod +x test-trading-crm.sh
./test-trading-crm.sh
```

**Option C: Manual Testing with cURL**
```bash
# Test Malaysia
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"MY"}'
```

### Step 6: Verify Results

You should see:
- ✓ Integration Status: READY
- ✓ 8/8 test leads sent successfully
- Lead IDs for each country
- Redirect URLs for thank you pages

---

## Expected Test Results

If everything is working correctly, you'll see:

```
================================================
Test Results Summary
================================================

Total Tests: 8
Successful: 8
Failed: 0

✓ All tests passed!

Next Steps:
1. Tag your broker contact with these test leads
2. Ask them to verify they received all 8 test leads
3. Once verified, the integration is ready for production
```

---

## How It Works

Once configured, the integration works **automatically**:

1. **User signs up** from a supported country (MY, TR, FR, IT, HK, SG, TW, BR)
2. **System creates account** in your database
3. **Lead is automatically sent** to Trading CRM via their API
4. **User receives** the appropriate thank you page in their language
5. **Broker receives** the lead in their CRM system

**No manual intervention required!**

---

## Supported Countries

| Country | Code | Auto-Sends to Broker |
|---------|------|---------------------|
| Malaysia | MY | ✓ Yes |
| Turkey | TR | ✓ Yes |
| France | FR | ✓ Yes |
| Italy | IT | ✓ Yes |
| Hong Kong | HK | ✓ Yes |
| Singapore | SG | ✓ Yes |
| Taiwan | TW | ✓ Yes |
| Brazil | BR | ✓ Yes |
| Other countries | * | ✗ No (stays in your CRM only) |

---

## Quick Reference Commands

### Check Integration Status
```bash
curl http://localhost:3000/api/trading-crm/status
```

### Send Test Lead (Manual)
```bash
curl -X POST http://localhost:3000/api/trading-crm/test \
  -H "Content-Type: application/json" \
  -d '{"testCountry":"IT","testLanguage":"it"}'
```

### View Statistics
```bash
curl http://localhost:3000/api/trading-crm/status | jq '.statistics'
```

### Disable Integration (without removing config)
```bash
# In .env file:
TRADING_CRM_ENABLED="false"
```

---

## Troubleshooting

### Problem: Connection Failed

**Error:** `status.connection: "failed"`

**Solution:**
1. Check your internet connection
2. Verify API endpoint is accessible:
   ```bash
   curl https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso
   ```
3. Check credentials are correct in `.env`

### Problem: No Leads Being Sent

**Error:** Signups work but no leads reach broker

**Solution:**
1. Check integration is enabled:
   ```bash
   # In .env
   TRADING_CRM_ENABLED="true"
   ```

2. Verify user's country is supported (MY, TR, FR, IT, HK, SG, TW, BR)

3. Check server logs:
   ```bash
   npm run dev
   # Look for "Trading CRM" in the output
   ```

### Problem: Test Script Not Running

**PowerShell Error:** "Execution policy prevents script"

**Solution:**
```powershell
# Run once to allow scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then run the test
.\test-trading-crm.ps1
```

**Bash Error:** "Permission denied"

**Solution:**
```bash
chmod +x test-trading-crm.sh
./test-trading-crm.sh
```

---

## Next Steps After Testing

### 1. Tag Broker Contact (Important!)

Send them this message with your test results:

```
Hi [Broker Contact],

I've completed the Trading CRM API integration and sent 8 test leads.

Please verify you received these test leads in your CRM:

Test Lead Details:
- Countries tested: MY, TR, FR, IT, HK, SG, TW, BR
- Email format: test.[country].[timestamp]@example.com
- Test tag: "api_integration_test"
- Sent at: [Current timestamp]

Example test email: test.my.1234567890@example.com

Please confirm you can see these leads in your system.

Thanks!
```

### 2. Monitor First Real Signups

After broker confirms test leads:

1. Enable production mode (already enabled if `TRADING_CRM_ENABLED="true"`)
2. Monitor first few real signups from supported countries
3. Check logs to verify leads are being sent
4. Verify broker receives real leads

### 3. Track Performance

Check integration statistics regularly:

```bash
curl http://localhost:3000/api/trading-crm/status
```

Monitor:
- Success rate (should be >95%)
- Daily lead volume
- Failed deliveries (investigate if >5%)

---

## Support

### Integration Issues

1. **Check Status:** `GET /api/trading-crm/status`
2. **Review Logs:** Look for "Trading CRM" errors
3. **Test Again:** `POST /api/trading-crm/test`

### Broker Verification

If broker says they're not receiving leads:

1. Send them the lead ID from your test
2. Provide the exact timestamp
3. Share the API response you received
4. Ask them to check their spam/filter rules

### Documentation

- **Full Documentation:** [TRADING_CRM_INTEGRATION.md](TRADING_CRM_INTEGRATION.md)
- **API Reference:** See "API Endpoints" section in full docs
- **Database Schema:** See `supabase-broker-tracking-migration.sql`

---

## Files Created

| File | Purpose |
|------|---------|
| `src/lib/trading-crm-api.ts` | Core API client |
| `src/app/api/trading-crm/send-lead/route.ts` | Manual send endpoint |
| `src/app/api/trading-crm/test/route.ts` | Test endpoint |
| `src/app/api/trading-crm/status/route.ts` | Status monitoring |
| `src/app/api/signup/route.ts` | Auto-integration (updated) |
| `test-trading-crm.ps1` | Windows test script |
| `test-trading-crm.sh` | Linux/Mac test script |
| `TRADING_CRM_INTEGRATION.md` | Full documentation |
| `TRADING_CRM_SETUP.md` | This quick setup guide |

---

## Production Checklist

Before going live:

- [ ] Environment variables configured in `.env`
- [ ] Dependencies installed (`npm install`)
- [ ] Test script shows all 8 countries passing
- [ ] Broker confirms they received test leads
- [ ] First real signup from supported country verified
- [ ] Monitoring/logging set up
- [ ] Team trained on how to check integration status

---

**Setup Time:** 5 minutes
**Test Time:** 1 minute
**Broker Verification:** 5-10 minutes
**Total Time to Production:** ~15 minutes

---

**Need Help?** Check the full documentation: [TRADING_CRM_INTEGRATION.md](TRADING_CRM_INTEGRATION.md)
