# 🎯 Exness Postback Setup Guide - TradeFlow

## ✅ Your Configuration

### Partner Information
- **Partner ID:** `c_8f0nxidtbt`
- **Click URL:** `https://www.exnesspromo.com/en/efficient-way-to-trade-stocks?partner_id=c_8f0nxidtbt`
- **Your Domain:** `https://tradeflow.blog` (or `https://tradeflow.cloud`)

---

## 📡 Postback URLs for Exness Dashboard

Copy these URLs into your Exness Partner Dashboard:

### Base Postback URL
```
https://tradeflow.blog/api/postback/exness
```

### 1. REGISTRATION Postback
```
https://tradeflow.blog/api/postback/exness
```
**POST Body:**
```json
{
  "partner_id": "c_8f0nxidtbt",
  "event_type": "REGISTRATION",
  "user_id": "{exness_user_id}"
}
```

### 2. QUALIFICATION Postback
```
https://tradeflow.blog/api/postback/exness
```
**POST Body:**
```json
{
  "partner_id": "c_8f0nxidtbt",
  "event_type": "QUALIFICATION",
  "user_id": "{exness_user_id}",
  "qualification_status": "approved"
}
```

### 3. AGGREGATED_DEPOSIT Postback
```
https://tradeflow.blog/api/postback/exness
```
**POST Body:**
```json
{
  "partner_id": "c_8f0nxidtbt",
  "event_type": "AGGREGATED_DEPOSIT",
  "user_id": "{exness_user_id}",
  "deposit_amount": 100.00,
  "ftd_amount": 100.00
}
```

### 4. REWARD_PROCESSING Postback ⭐ (AUTO-APPROVES USER!)
```
https://tradeflow.blog/api/postback/exness
```
**POST Body:**
```json
{
  "partner_id": "c_8f0nxidtbt",
  "event_type": "REWARD_PROCESSING",
  "user_id": "{exness_user_id}",
  "reward_amount": 50.00
}
```
**🎉 This event automatically upgrades the user to Premium access!**

### 5. IS_KYC_PASSED Postback
```
https://tradeflow.blog/api/postback/exness
```
**POST Body:**
```json
{
  "partner_id": "c_8f0nxidtbt",
  "event_type": "IS_KYC_PASSED",
  "user_id": "{exness_user_id}",
  "kyc_status": "passed"
}
```

---

## 🔧 Exness Dashboard Setup Instructions

### Step 1: Login to Exness Partner Portal
1. Go to https://partners.exness.com
2. Log in with your partner account

### Step 2: Navigate to Postbacks
1. Click on **"Tools"** or **"Settings"**
2. Find **"Postbacks"** or **"Webhooks"** section
3. Click **"Create Postback"** or **"Add New"**

### Step 3: Configure Each Postback

For each of the 5 events (REGISTRATION, QUALIFICATION, AGGREGATED_DEPOSIT, REWARD_PROCESSING, IS_KYC_PASSED):

1. **Postback Name:** `TradeFlow - {EVENT_NAME}`
2. **Postback URL:** `https://tradeflow.blog/api/postback/exness`
3. **Method:** `POST`
4. **Event Type:** Select the corresponding event
5. **Parameters:** Add these parameters (Exness usually provides macros):

| Parameter | Value (Exness Macro) |
|-----------|---------------------|
| partner_id | `c_8f0nxidtbt` (static) |
| event_type | The event name (REGISTRATION, etc.) |
| user_id | `{user_id}` or `{client_id}` (Exness macro) |
| deposit_amount | `{deposit_amount}` (for AGGREGATED_DEPOSIT) |
| reward_amount | `{reward_amount}` (for REWARD_PROCESSING) |

6. Click **"Save"** or **"Create"**

### Step 4: Test Postbacks
Exness usually provides a "Test" button. Click it to send a test postback.

---

## 📊 Admin Dashboard Access

### View Your Stats
**Dashboard URL:** `https://tradeflow.blog/admin/dashboard`

### Dashboard Features
✅ **Real-time Statistics**
- Total users (Premium vs Free)
- Conversion rate
- Total rewards earned
- Deposit count
- KYC verification count

✅ **Conversions Tab**
- All postback events received
- User IDs and Exness IDs
- Amounts and rewards
- Approval status

✅ **Activity Tab**
- Real-time activity log
- User actions and events
- Detailed event information

✅ **Users Tab**
- All registered users
- Premium vs Free status
- Broker information
- Registration dates

✅ **Time Range Filters**
- Today
- Last 7 days
- Last 30 days
- All time

✅ **Auto-refresh** every 30 seconds

---

## 🔄 How the Auto-Approval Works

### User Journey:
1. **User clicks Exness link** on your site → Tracked in `exness_clicks` table
2. **User registers with Exness** → REGISTRATION postback → User marked as registered
3. **User completes qualification** → QUALIFICATION postback → User marked as qualified
4. **User makes deposit** → AGGREGATED_DEPOSIT postback → Deposit tracked
5. **Exness processes reward** → **REWARD_PROCESSING postback** → 🎉 **USER AUTO-APPROVED TO PREMIUM!**
6. **User completes KYC** → IS_KYC_PASSED postback → KYC status updated

### What Happens on REWARD_PROCESSING:
```javascript
// User record updated with:
{
  has_broker_account: true,        // ✅ Unlocks premium content
  broker_name: 'Exness',
  broker_verified_at: timestamp,
  exness_reward_processed: true,
  exness_reward_amount: 50.00,
  approved_at: timestamp
}
```

The user now has **unlimited access** to:
- Unlimited trading signals
- All market analysis articles
- Full education platform
- Copy trading features

---

## 🧪 Testing Your Integration

### Test Postback Endpoint
Visit: `https://tradeflow.blog/api/postback/exness`

You should see:
```json
{
  "status": "ready",
  "partner_id": "c_8f0nxidtbt",
  "supported_events": [
    "REGISTRATION",
    "QUALIFICATION",
    "AGGREGATED_DEPOSIT",
    "REWARD_PROCESSING",
    "IS_KYC_PASSED"
  ],
  "postback_url": "https://tradeflow.blog/api/postback/exness"
}
```

### Manual Test (Using curl)
```bash
curl -X POST https://tradeflow.blog/api/postback/exness \
  -H "Content-Type: application/json" \
  -d '{
    "partner_id": "c_8f0nxidtbt",
    "event_type": "REWARD_PROCESSING",
    "user_id": "test_user_123",
    "reward_amount": 50.00
  }'
```

### Check Logs
After deployment, check your Render logs or Vercel logs to see:
```
📡 Received Exness Postback: { event_type: 'REWARD_PROCESSING', ... }
🎉 REWARD PROCESSING - AUTO-APPROVING USER: user_id_here
✅ User auto-approved and upgraded to PREMIUM: user_id_here
```

---

## 🔒 Security Considerations

### IP Whitelisting (Optional)
If Exness provides specific IP addresses for postbacks, you can whitelist them in your code:

```typescript
const EXNESS_IPS = [
  '1.2.3.4',    // Example Exness IP
  '5.6.7.8'     // Example Exness IP
]

// In route handler:
const clientIP = request.headers.get('x-forwarded-for')
if (!EXNESS_IPS.includes(clientIP)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
}
```

### Verify Partner ID
The code already verifies that incoming postbacks match your partner ID:
```typescript
if (partner_id && partner_id !== 'c_8f0nxidtbt') {
  console.warn('⚠️ Partner ID mismatch')
}
```

---

## 📈 Database Schema

### Tables Used:

**1. exness_clicks**
- Tracks when users click the Exness link
- Fields: `user_id`, `partner_id`, `clicked_at`

**2. exness_conversions**
- Stores all postback events
- Fields: `user_id`, `partner_id`, `event_type`, `ftd_amount`, `reward_amount`, `exness_user_id`, `processed`, `user_approved`, `created_at`

**3. users**
- Updated with Exness status
- New fields: `exness_registered`, `exness_qualified`, `exness_deposited`, `exness_reward_processed`, `exness_reward_amount`, `has_broker_account`, `broker_verified_at`

**4. activity_log**
- Tracks all user actions
- Fields: `user_id`, `action`, `details`, `created_at`

---

## ✅ Checklist

Before going live, ensure:

- [ ] Exness Partner ID (`c_8f0nxidtbt`) is correct
- [ ] All 5 postback URLs configured in Exness dashboard
- [ ] Postbacks tested successfully
- [ ] Admin dashboard accessible at `/admin/dashboard`
- [ ] Environment variables set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_APP_URL`
- [ ] SSL certificate active on tradeflow.blog
- [ ] Database tables created (exness_clicks, exness_conversions, activity_log)

---

## 🆘 Troubleshooting

### Postback not received?
1. Check Exness dashboard for delivery status
2. Check your Render/Vercel logs for incoming requests
3. Verify URL is `https://tradeflow.blog/api/postback/exness` (not HTTP)
4. Ensure SSL certificate is active

### User not auto-approved?
1. Check if `event_type` is exactly `"REWARD_PROCESSING"`
2. Verify user clicked the Exness link (entry in `exness_clicks` table)
3. Check admin dashboard → Conversions tab for the event
4. Look for error logs in your deployment platform

### Dashboard not loading?
1. Ensure Supabase credentials are correct
2. Check database tables exist
3. Verify user authentication (dashboard may require login)

---

## 📞 Support

If you need help:
1. Check admin dashboard logs
2. Review Exness partner portal documentation
3. Contact Exness partner support for postback macro names
4. Check your deployment logs (Render/Vercel)

---

**🎉 Your Exness integration is ready! Users will be automatically approved when rewards are processed.**
