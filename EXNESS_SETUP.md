# Exness Postback Setup Guide

## Database Setup

**IMPORTANT**: You need to run the database migration first before the postback endpoints will work.

### Step 1: Run the SQL Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase_migration_exness.sql`
6. Paste it into the SQL editor
7. Click **Run** to execute the migration

This will create:
- `exness_conversions` table (tracks all conversion events)
- `exness_clicks` table (tracks affiliate link clicks)
- Necessary indexes for performance
- Row-level security policies

### Step 2: Test the Postback Endpoint

After running the migration, wait 2-3 minutes for Render to deploy the latest code, then test:

```bash
curl -X POST https://tradeflow.blog/api/postback/exness \
  -H "Content-Type: application/json" \
  -d '{"partner_id":"c_8f0nxidtbt","event_type":"REGISTRATION","user_id":"test_123"}'
```

You should see:
```json
{"success":true,"message":"Postback processed successfully",...}
```

### Step 3: Configure Exness Postbacks

Once the endpoint is working, go to your Exness Partners dashboard and configure these postbacks:

**Partner ID**: `c_8f0nxidtbt`

#### Registration Event
- **URL**: `https://tradeflow.blog/api/postback/exness`
- **Method**: POST
- **Body**:
```json
{"partner_id":"c_8f0nxidtbt","event_type":"REGISTRATION","user_id":"{exness_user_id}"}
```

#### Qualification Event
- **URL**: `https://tradeflow.blog/api/postback/exness`
- **Method**: POST
- **Body**:
```json
{"partner_id":"c_8f0nxidtbt","event_type":"QUALIFICATION","user_id":"{exness_user_id}"}
```

#### Aggregated Deposit Event
- **URL**: `https://tradeflow.blog/api/postback/exness`
- **Method**: POST
- **Body**:
```json
{"partner_id":"c_8f0nxidtbt","event_type":"AGGREGATED_DEPOSIT","user_id":"{exness_user_id}","deposit_amount":{deposit_amount}}
```

#### Reward Processing Event (AUTO-APPROVAL)
- **URL**: `https://tradeflow.blog/api/postback/exness`
- **Method**: POST
- **Body**:
```json
{"partner_id":"c_8f0nxidtbt","event_type":"REWARD_PROCESSING","user_id":"{exness_user_id}","reward_amount":{reward_amount}}
```

**⚠️ IMPORTANT**: This event automatically approves users and grants them premium access!

#### KYC Passed Event
- **URL**: `https://tradeflow.blog/api/postback/exness`
- **Method**: POST
- **Body**:
```json
{"partner_id":"c_8f0nxidtbt","event_type":"IS_KYC_PASSED","user_id":"{exness_user_id}","kyc_status":"passed"}
```

## Admin Dashboard Access

- **URL**: https://tradeflow.blog/admin
- **Username**: `admin`
- **Password**: `TradeFlow2025!`

### Dashboard Features

1. **Overview Tab**: Recent conversions and key metrics
2. **Conversions Tab**: All Exness conversion events
3. **Activity Tab**: System activity log
4. **Users Tab**: All registered users
5. **Emails Tab**: Email signups with conversion tracking
6. **Report Issue**: Button to report any issues

## Troubleshooting

### Postback Tests Failing

If Exness postback tests return errors:

1. **Check deployment status**: Wait 2-3 minutes after pushing code
2. **Test manually**: Use the curl command above
3. **Check logs**: Go to Render dashboard → Your service → Logs
4. **Verify database**: Make sure the SQL migration ran successfully

### Common Errors

**Error**: `Could not find the 'kyc_status' column`
- **Fix**: Run the SQL migration in Supabase

**Error**: `Failed to record conversion`
- **Fix**: Check Supabase logs, ensure tables exist

**Error**: `Postback URL didn't respond successfully`
- **Fix**: Wait for deployment, check Render logs

## How It Works

1. **User clicks Exness link** → Tracked in `exness_clicks` table
2. **User registers** → Exness sends REGISTRATION event
3. **User qualifies** → Exness sends QUALIFICATION event
4. **User deposits** → Exness sends AGGREGATED_DEPOSIT event
5. **Reward approved** → Exness sends REWARD_PROCESSING event
   - ✅ User automatically upgraded to Premium
   - ✅ `has_broker_account` set to true
   - ✅ `broker_verified_at` timestamp added
6. **User completes KYC** → Exness sends IS_KYC_PASSED event

All events are logged in the `exness_conversions` table and visible in the admin dashboard.

## Security

- CORS headers enabled for external webhook access
- Row-level security enabled on database tables
- Admin dashboard protected with username/password
- 24-hour session timeout
- All sensitive data encrypted at rest in Supabase

## Support

If you encounter issues:
1. Use the "Report Issue" button in the admin dashboard
2. Check the Activity log in the dashboard
3. Review Render deployment logs
4. Verify Supabase table structure
