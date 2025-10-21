# Google Analytics API Integration Setup

This guide will help you connect your Google Analytics data to the TradeFlow admin dashboard.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Name it "TradeFlow Analytics" or similar

## Step 2: Enable Google Analytics Data API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Analytics Data API"
3. Click on it and press **ENABLE**

## Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **CREATE CREDENTIALS** → **Service Account**
3. Fill in details:
   - **Service account name**: `tradeflow-analytics`
   - **Service account ID**: `tradeflow-analytics` (auto-filled)
   - Click **CREATE AND CONTINUE**
4. Grant role: **Viewer** (or **Editor** if you need write access)
5. Click **DONE**

## Step 4: Generate Service Account Key (JSON)

1. Click on the service account you just created
2. Go to **KEYS** tab
3. Click **ADD KEY** → **Create new key**
4. Choose **JSON** format
5. Click **CREATE**
6. A JSON file will download - **SAVE THIS FILE SECURELY**

## Step 5: Grant Analytics Access

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (bottom left gear icon)
3. In the **Property** column, click **Property Access Management**
4. Click the **+** button (Add users)
5. Add the service account email (looks like: `tradeflow-analytics@PROJECT_ID.iam.gserviceaccount.com`)
6. Set role to **Viewer**
7. Click **Add**

## Step 6: Get Your Property ID

1. In Google Analytics, click **Admin**
2. In the **Property** column, click **Property Settings**
3. Copy your **Property ID** (looks like: `12345678`)

## Step 7: Add Environment Variables

Add these to your Render environment variables (or `.env.local` for local development):

```bash
# Google Analytics Configuration
GA_PROPERTY_ID=YOUR_PROPERTY_ID_HERE
GA_SERVICE_ACCOUNT_EMAIL=tradeflow-analytics@PROJECT_ID.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**How to get these values from the JSON file you downloaded:**

Open the JSON file and find:
- `GA_PROPERTY_ID`: Your Google Analytics property ID (from Step 6)
- `GA_SERVICE_ACCOUNT_EMAIL`: Value of `client_email` field
- `GA_PRIVATE_KEY`: Value of `private_key` field (copy entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

**IMPORTANT**: When pasting the private key in Render:
- Keep the quotes around it
- Keep the `\n` characters (they're important)
- Copy the entire key as-is from the JSON file

## Step 8: Test the Integration

Once environment variables are set:

1. Go to your admin dashboard: `https://tradeflow.blog/admin`
2. Click on the **Analytics** tab
3. You should see:
   - Real-time users
   - Page views (last 7 days)
   - Top pages
   - Traffic sources
   - User devices

## Troubleshooting

### "Error: Unable to fetch analytics data"
- Check that environment variables are set correctly
- Verify service account has access to the Analytics property
- Make sure the private key is correctly formatted with `\n` characters

### "Error: 403 Forbidden"
- Service account doesn't have access to the Analytics property
- Go back to Step 5 and grant access

### "Error: Invalid property ID"
- Check the `GA_PROPERTY_ID` environment variable
- Make sure you're using the numeric Property ID, not the Measurement ID (G-XXXXXXX)

## What Data You'll See

The dashboard will show:
- 📊 **Real-time users**: Current active users on your site
- 👥 **Total users**: Last 7 days, 30 days
- 📄 **Page views**: Daily page views
- 🌍 **Traffic sources**: Where users are coming from
- 📱 **Device breakdown**: Desktop, mobile, tablet
- 🔝 **Top pages**: Most visited pages
- ⏱️ **Session duration**: Average time on site
- 📈 **Bounce rate**: Percentage of single-page sessions

All data refreshes every 30 seconds automatically!

## Security Notes

- ✅ Never commit the service account JSON file to git
- ✅ Never share your private key
- ✅ Store keys in environment variables only
- ✅ Service account has read-only access (Viewer role)
- ✅ API requests are authenticated and encrypted
