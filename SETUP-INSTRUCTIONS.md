# 🚀 SETUP INSTRUCTIONS - Step by Step

## Part 1: GET YOUR API KEYS

### 🔑 Step 1: Get Supabase Keys

**YOU ARE HERE NOW!** I can see you're already in Supabase SQL Editor.

#### How to get your keys:

1. **Look at the LEFT sidebar** in Supabase (where you are now)
2. **Click the ⚙️ "Settings" icon** (bottom left corner)
3. **Click "API"** in the settings submenu
4. You'll see a page with 3 important values:

**COPY THESE:**

```
📍 Project URL:
   https://xxxxxx.supabase.co
   ↑ Copy this entire URL

🔓 anon public key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↑ Long string starting with "eyJ" - this is safe to expose

🔐 service_role key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↑ Another long string - KEEP THIS SECRET!
```

**PASTE THEM in .env.local file:**
- Replace `NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co`
- Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- Replace `SUPABASE_SERVICE_ROLE_KEY=...`

---

### 📧 Step 2: Get Resend API Key

1. **Open new browser tab**
2. **Go to:** https://resend.com/signup (or /login if you have account)
3. **After logging in, go to:** https://resend.com/api-keys
4. **Click "Create API Key"** button (green button, top right)
5. **Fill in:**
   - Name: `GCC Signal Pro`
   - Permission: `Sending access`
6. **Click "Add"**
7. **IMMEDIATELY COPY THE KEY!** (starts with `re_...`)
   - ⚠️ You can only see it once!
   - If you miss it, delete and create a new one

**PASTE IT in .env.local:**
- Replace `RESEND_API_KEY=re_YOUR_RESEND_API_KEY_HERE`

**For email address:**
- Keep `RESEND_FROM_EMAIL=onboarding@resend.dev` for testing
- Later, verify your domain in Resend and change to `noreply@yourdomain.com`

---

### 🔐 Step 3: Generate JWT Secret

This is a random security string. Choose ONE method:

**METHOD A: Use online generator (easiest)**
1. Go to: https://randomkeygen.com/
2. Scroll to "Fort Knox Passwords"
3. Copy one of them (the long random strings)
4. Paste in .env.local as `JWT_SECRET=...`

**METHOD B: Use terminal command**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste in .env.local

---

### 🤝 Step 4: Exness Webhook Secret

**You already have partner ID:** `c_8f0nxidtbt` ✅

**For webhook secret:**
1. Go to: https://www.exnessaffiliates.com
2. Login to partner dashboard
3. Go to: **Settings → Postback** or **Webhooks**
4. Look for "Security Token" or "Webhook Secret"
5. Copy it

**If you can't find it yet:**
- Leave as `temporary_secret_update_later` for now
- We'll update it later when configuring the postback
- The system will work without it for testing

---

## Part 2: CREATE DATABASE TABLES IN SUPABASE

### 📊 You're in the SQL Editor already! Perfect!

I can see your screen shows the SQL Editor. Now follow these steps EXACTLY:

#### Step 2.1: Create Users Table

1. **In the SQL Editor text area** (the big white box), **DELETE everything** that's there
2. **Copy this ENTIRE SQL script:**

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Authentication
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,

  -- Profile
  full_name VARCHAR(255),
  phone VARCHAR(50),

  -- Access Control
  access_level VARCHAR(20) DEFAULT 'free',
  free_signals_count INT DEFAULT 0,
  free_articles_count INT DEFAULT 0,

  -- Broker Integration
  has_broker_account BOOLEAN DEFAULT false,
  broker_verified_at TIMESTAMP,
  broker_trader_id VARCHAR(255),
  broker_name VARCHAR(100) DEFAULT 'exness',
  broker_deposit_amount DECIMAL(10, 2),

  -- Tracking
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  email_verified BOOLEAN DEFAULT false,
  email_verification_token VARCHAR(255),

  -- Metadata
  utm_source VARCHAR(100),
  utm_campaign VARCHAR(100),
  referrer VARCHAR(255)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_broker_trader_id ON users(broker_trader_id);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON users(access_level);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
```

3. **PASTE it** in the SQL Editor
4. **Click the green "RUN" button** (bottom right, says "Run CTRL+↵")
5. **Wait for success message** - you should see "Success" in green

**Expected result:**
```
✅ Success. No rows returned
```

This is CORRECT! It means the table was created.

---

#### Step 2.2: Create User Activity Table

1. **CLEAR the SQL editor** again (select all, delete)
2. **Copy this SQL:**

```sql
-- Create user_activity table
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- What did they access?
  action_type VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(255) NOT NULL,
  resource_title VARCHAR(255),

  -- When and where?
  created_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,

  -- Metadata
  metadata JSONB
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON user_activity(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_action_type ON user_activity(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_resource ON user_activity(resource_type, resource_id);

-- Enable RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Users can read own activity" ON user_activity FOR SELECT USING (auth.uid()::text = user_id::text);
```

3. **PASTE and RUN** (green button)
4. **Wait for success**

---

#### Step 2.3: Create Broker Postbacks Table

1. **CLEAR the SQL editor** again
2. **Copy this SQL:**

```sql
-- Create broker_postbacks table
CREATE TABLE IF NOT EXISTS broker_postbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Broker info
  broker_name VARCHAR(100) NOT NULL,
  event_type VARCHAR(50) NOT NULL,

  -- Raw data
  raw_data JSONB NOT NULL,

  -- Parsed data
  trader_id VARCHAR(255),
  deposit_amount DECIMAL(10, 2),
  currency VARCHAR(10),

  -- Processing status
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP,
  error_message TEXT,

  -- Security
  ip_address VARCHAR(45),
  signature_valid BOOLEAN,

  -- Tracking
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_postbacks_user_id ON broker_postbacks(user_id);
CREATE INDEX IF NOT EXISTS idx_postbacks_processed ON broker_postbacks(processed);
CREATE INDEX IF NOT EXISTS idx_postbacks_created_at ON broker_postbacks(created_at);
CREATE INDEX IF NOT EXISTS idx_postbacks_trader_id ON broker_postbacks(trader_id);
```

3. **PASTE and RUN**
4. **Wait for success**

---

#### Step 2.4: Verify Tables Were Created

1. **Look at the LEFT sidebar** in Supabase
2. **Click "Table Editor"** (looks like a table icon)
3. **You should see 3 new tables:**
   - ✅ `users`
   - ✅ `user_activity`
   - ✅ `broker_postbacks`

**If you see these 3 tables - SUCCESS!** 🎉

---

#### Step 2.5: Create Test Users

1. **Go back to SQL Editor**
2. **Copy this SQL:**

```sql
-- Create test users
INSERT INTO users (email, password_hash, full_name, access_level, has_broker_account)
VALUES
  (
    'testfree@example.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqHZ1GgGBK',
    'Ahmed Test User',
    'free',
    false
  ),
  (
    'testpremium@example.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqHZ1GgGBK',
    'Premium Test User',
    'premium',
    true
  )
ON CONFLICT (email) DO NOTHING;
```

3. **RUN it**

**Test credentials created:**
- Email: `testfree@example.com` | Password: `password123` | Type: Free user
- Email: `testpremium@example.com` | Password: `password123` | Type: Premium user

---

## Part 3: VERIFY EVERYTHING IS SET UP

### Checklist:

#### ✅ .env.local file has:
- [ ] NEXT_PUBLIC_SUPABASE_URL (your real Supabase URL)
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY (your real anon key)
- [ ] SUPABASE_SERVICE_ROLE_KEY (your real service role key)
- [ ] RESEND_API_KEY (your real Resend key starting with `re_`)
- [ ] JWT_SECRET (a random long string)
- [ ] EXNESS_PARTNER_ID (already set: `c_8f0nxidtbt`)
- [ ] EXNESS_WEBHOOK_SECRET (can be temporary for now)

#### ✅ Supabase database has:
- [ ] `users` table created
- [ ] `user_activity` table created
- [ ] `broker_postbacks` table created
- [ ] Test users inserted

---

## 🎯 WHAT'S NEXT?

Once you've:
1. ✅ Got all your API keys
2. ✅ Updated .env.local with real values
3. ✅ Created all 3 database tables
4. ✅ Created test users

**THEN TELL ME:** "All set up!" or "Ready for Phase 2!"

And I'll immediately start creating all the API endpoint files! 🚀

---

## 🆘 TROUBLESHOOTING

**Problem: Can't find Supabase Settings**
- Look for ⚙️ gear icon in LEFT sidebar (bottom)
- Should say "Project Settings"

**Problem: SQL gives error "relation already exists"**
- This means table is already created ✅
- Check Table Editor to see it
- Continue to next step

**Problem: Resend key not working**
- Make sure you copied it immediately after creating
- Try creating a new API key
- Check that permission is "Sending access"

**Problem: Don't have Exness webhook secret**
- Use `temporary_secret_update_later` for now
- System works without it for testing
- We'll configure it when setting up postback

**Problem: Forgot to copy a key**
- Supabase: Can see it again in Settings → API
- Resend: Need to create new key
- JWT: Generate a new random string

---

## 📞 READY FOR HELP?

Just message me with:
- "I got all the keys!"
- "Tables created successfully!"
- "I'm stuck on [specific step]"
- "Ready to continue!"

I'm here to help! 🎯
