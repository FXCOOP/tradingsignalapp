# 🚀 QUICK SETUP GUIDE - MVP Authentication System

## ✅ Step 1: Supabase Setup (5 minutes)

### 1.1 Create Project
1. Go to https://supabase.com
2. Sign up / Login
3. Click **"New Project"**
4. Name: `gcc-signal-pro`
5. Password: Create strong password (SAVE IT!)
6. Region: Choose Europe or Middle East
7. Click **"Create new project"**
8. **Wait 2-3 minutes**

### 1.2 Get API Keys
1. In Supabase dashboard, click **Settings** (gear icon, bottom left)
2. Click **API**
3. Copy these three values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhb...` (long string)
   - **service_role key**: `eyJhb...` (another long string - KEEP SECRET!)

### 1.3 Create Database Tables
1. In Supabase dashboard, click **SQL Editor** (left menu)
2. Click **"+ New Query"**
3. Open file: `database-schema.sql` in this project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** (bottom right)
7. You should see: "Success. No rows returned"
8. Click **"Table Editor"** to verify 5 tables exist

---

## ✅ Step 2: Resend Email Setup (3 minutes)

### 2.1 Create Account
1. Go to https://resend.com
2. Sign up with your email
3. Verify your email

### 2.2 Get API Key
1. In Resend dashboard, click **"API Keys"**
2. Click **"Create API Key"**
3. Name it: `GCC Signal Pro`
4. Copy the key (starts with `re_`)

---

## ✅ Step 3: Environment Variables

### 3.1 Create `.env.local` file
Create a new file in project root called `.env.local` with this content:

```bash
# === SUPABASE (from Step 1.2) ===
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG...your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="eyJhbG...your-service-role-key"

# === JWT SECRET (generate random string) ===
JWT_SECRET="generate-random-32-character-string-here-change-this"
JWT_EXPIRES_IN="7d"

# === RESEND (from Step 2.2) ===
RESEND_API_KEY="re_your_key_here"
EMAIL_FROM="GCC Signal Pro <noreply@yourdomain.com>"

# === EXNESS ===
EXNESS_AFFILIATE_ID="your-affiliate-id"
EXNESS_DESKTOP_LINK="https://one.exnessonelink.com/a/your-id"
EXNESS_MOBILE_LINK="https://one.exnessonelink.com/a/your-id?platform=mobile"
EXNESS_WEBHOOK_SECRET="create-secret-key-for-webhook"

# === ACCESS CONTROL ===
FREE_TIER_LIMIT=3
FREE_TIER_RESET_HOURS=24
PREMIUM_MIN_DEPOSIT=10

# === APP SETTINGS ===
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="GCC Signal Pro"

# === OPENAI (Already configured) ===
OPENAI_API_KEY="your-existing-key"
```

### 3.2 Generate JWT Secret
Go to: https://generate-secret.vercel.app/32
Copy the generated string and paste as `JWT_SECRET`

---

## ✅ Step 4: Test Locally

```bash
# Start development server
npm run dev

# Open browser
http://localhost:3000
```

---

## ✅ Step 5: Deploy to Production

### 5.1 Add Environment Variables to Render
1. Go to Render dashboard
2. Click your service
3. Click **"Environment"**
4. Add ALL variables from `.env.local` (except change APP_URL to your production URL)
5. Click **"Save Changes"**

### 5.2 Push to GitHub
```bash
git add .
git commit -m "✨ Add authentication system with Supabase"
git push origin main
```

Render will automatically deploy!

---

## ✅ Step 6: Create Your Admin Account

### 6.1 Register Normally
1. Go to your site
2. Register with YOUR email
3. Verify your email

### 6.2 Make Yourself Admin
1. Go to Supabase dashboard
2. Click **SQL Editor**
3. Run this query (replace with YOUR email):

```sql
INSERT INTO admin_users (id, role)
VALUES (
  (SELECT id FROM users WHERE email = 'your-email@example.com'),
  'super_admin'
);
```

Now you can approve broker verifications!

---

## ✅ Step 7: Set Up Exness Postback (Optional but Recommended)

### 7.1 In Exness Partner Portal
1. Login to Exness Partners
2. Go to **Settings** → **Postback URL**
3. Enter: `https://yourdomain.com/api/broker/webhook`
4. Select event: **Deposit**
5. Save

### 7.2 Test
- User clicks your affiliate link
- Opens account + deposits $10
- Gets auto-upgraded to premium instantly!

---

## 🎉 DONE!

Your authentication system is now live!

**Test the complete flow:**
1. ✅ Register new account
2. ✅ Verify email
3. ✅ View 3 free signals
4. ✅ Hit paywall
5. ✅ Submit Exness account
6. ✅ Admin approves (or auto-approved via postback)
7. ✅ User gets premium access!

---

## 📞 Need Help?

Check the full implementation guide: Open `IMPLEMENTATION-GUIDE.html` in browser

---

## 🔧 Troubleshooting

### Can't connect to Supabase?
- Check environment variables are correct
- Make sure you copied the full keys (they're very long!)
- Check Supabase project is active (green dot in dashboard)

### Emails not sending?
- Verify Resend API key is correct
- Check Resend dashboard for delivery logs
- Make sure EMAIL_FROM is valid

### Users can't login?
- Check password is at least 8 characters
- Verify email first before logging in
- Check browser console for errors

---

**Ready to customize? All code is in `src/` folder!**
