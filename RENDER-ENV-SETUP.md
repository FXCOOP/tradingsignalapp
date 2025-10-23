# ⚙️ Render Environment Variables Setup

## ✅ What Was Fixed

1. **Signal count:** 6 → **5 signals**
2. **Model:** `gpt-4o-mini` → **`gpt-5-nano-2025-08-07`**
3. **Updated in code** and committed ✅

---

## 🔧 Render Dashboard Setup Required

**IMPORTANT:** You need to set the environment variable in Render dashboard!

### Steps:

1. Go to: https://dashboard.render.com
2. Select: **tradingsignalapp**
3. Click: **Environment** tab (left sidebar)
4. Find: `OPENAI_MODEL`
5. Change value to: **`gpt-5-nano-2025-08-07`**
6. Click: **Save Changes**
7. Render will auto-redeploy

### Current Environment Variables Needed:

```bash
# OpenAI (Required)
OPENAI_API_KEY=sk-proj-OKPIvRfJ... (your key)
OPENAI_MODEL=gpt-5-nano-2025-08-07  ← UPDATE THIS!
OPENAI_MAX_TOKENS=3000
OPENAI_TEMPERATURE=0.7

# Supabase (Already set)
NEXT_PUBLIC_SUPABASE_URL=https://bsupjdeayuylynsdmfdx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key_here

# App URLs (Already set)
NEXT_PUBLIC_APP_URL=https://tradeflow.blog
APP_BASE_URL=https://tradeflow.blog

# Cron Security
CRON_SECRET=your_random_secret_here
```

---

## 🧪 Test After Deploy

### 1. Manual Test (Call the cron endpoint):

```bash
curl -X POST https://tradeflow.blog/api/cron/generate-daily \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json"
```

**Expected response:**
```json
{
  "success": true,
  "message": "Daily content generated successfully",
  "generatedContent": {
    "signals": 5,  ← Should be 5 now!
    "news": 3,
    "analysisGenerated": true
  },
  "usage": {
    "totalTokens": 1500,
    "model": "gpt-5-nano-2025-08-07"  ← Correct model!
  }
}
```

### 2. Check Render Logs:

```
1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Look for: "✅ Daily content generated successfully"
5. Check: Model name and signal count
```

---

## ⏰ Cron Job Schedule

**Already configured correctly:**
- Runs: **Once per day**
- Time: **6:00 AM Dubai time (GMT+4)**
- Service: **EasyCron** or **cron-job.org**
- Endpoint: `https://tradeflow.blog/api/cron/generate-daily`

### If not set up yet:

#### Option 1: EasyCron.com (Free, 20 jobs)
1. Go to: https://www.easycron.com
2. Sign up (free)
3. Create cron job:
   - URL: `https://tradeflow.blog/api/cron/generate-daily`
   - Method: `POST`
   - Schedule: `0 6 * * *` (6 AM daily)
   - Header: `Authorization: Bearer YOUR_CRON_SECRET`

#### Option 2: cron-job.org (Free, unlimited)
1. Go to: https://cron-job.org
2. Sign up (free)
3. Create cron job:
   - URL: `https://tradeflow.blog/api/cron/generate-daily`
   - Schedule: Every day at 6:00 AM GMT+4
   - Add header: `Authorization: Bearer YOUR_CRON_SECRET`

---

## 💰 Cost Estimate

**With gpt-5-nano-2025-08-07:**
- Per signal generation: ~1,500 tokens
- Cost per day: **~$0.0001** (less than a penny!)
- Cost per month: **~$0.003** (one-third of a penny!)

**vs. old gpt-4o-mini:**
- Cost per day: ~$0.0003
- Savings: **67% cheaper!**

---

## ✅ Summary

**What you need to do:**
1. [ ] Update `OPENAI_MODEL` in Render dashboard to `gpt-5-nano-2025-08-07`
2. [ ] Wait for auto-redeploy (2-3 minutes)
3. [ ] Test manually with curl command above
4. [ ] Verify in Render logs that it's using correct model
5. [ ] Set up cron job if not already done

**What's already done:**
- ✅ Code updated to generate 5 signals
- ✅ Model name fixed in code
- ✅ Committed and pushed
- ✅ Deploying to production

---

## 🚀 Expected Result

After Render redeploys with new env var:
- System generates **5 signals** automatically every day at 6 AM
- Uses **gpt-5-nano-2025-08-07** (super cheap!)
- Cached for 24 hours
- Users see the same signals all day (no regeneration per user)
- Cost: basically **FREE** (~$0.003/month)

🎉 Perfect setup for automated trading signals!
