# 🚀 Quick Start Guide - 3 Easy Steps

## Option 1: Standalone HTML (Instant Demo)

### Just want to test it immediately?

1. **Open the file**: `standalone-signup-popup.html`
2. **Double-click** to open in your browser
3. **Done!** The popup is ready with:
   ✅ All countries
   ✅ IP detection
   ✅ Terms checkbox
   ✅ Beautiful design

**Note**: This saves to browser console only. For production, follow Option 2.

---

## Option 2: Full Production Setup (with Database)

### Step 1: Setup Supabase Database (5 minutes)

1. Go to **https://supabase.com** and login
2. Create a new project (or use existing)
3. Wait for database to finish provisioning
4. Go to **SQL Editor** (left sidebar)
5. Copy **ALL** content from `supabase-schema.sql`
6. Paste into SQL Editor
7. Click **"RUN"** button
8. ✅ Done! Your database table is created

**Verify it worked:**
- Go to **Table Editor** → You should see `signups` table

---

### Step 2: Get Your API Keys (2 minutes)

1. In Supabase, go to **Settings** → **API**
2. Copy these two values:

```bash
Project URL: https://xxxxx.supabase.co
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Add to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: Never commit `.env.local` to Git!

---

### Step 3: Add Popup to Your Site (1 minute)

Edit your `src/app/page.tsx`:

```tsx
import SignupPopup from '@/components/SignupPopup';

export default function Home() {
  return (
    <main>
      {/* Your existing content */}

      {/* Add this line - popup shows after 10 seconds */}
      <SignupPopup variant={1} delay={10000} />
    </main>
  );
}
```

**Test it immediately with 0 delay:**

```tsx
<SignupPopup variant={1} delay={0} />
```

---

## 🎨 Choose Your Design

Change the `variant` prop to use different designs (1-20):

```tsx
<SignupPopup variant={1} delay={10000} />  // Classic Blue
<SignupPopup variant={2} delay={10000} />  // Elegant Dark
<SignupPopup variant={3} delay={10000} />  // Modern Green
<SignupPopup variant={10} delay={10000} /> // Neon Cyber
<SignupPopup variant={20} delay={10000} /> // Red Power
```

**Preview all 20 designs:**
Open `all-20-signup-popups.html` in your browser!

---

## 📊 View Your Signups

### Option 1: Supabase Dashboard
1. Go to Supabase → **Table Editor**
2. Click on `signups` table
3. See all entries with filters

### Option 2: API Endpoint
Visit: `http://localhost:3000/api/signup`

You'll see JSON like:
```json
{
  "signups": [
    {
      "id": "uuid",
      "first_name": "Ahmed",
      "last_name": "Al-Maktoum",
      "email": "ahmed@example.com",
      "country_code": "+971",
      "phone_number": "501234567",
      "full_phone_number": "+971501234567",
      "country": "AE",
      "detected_country": "AE",
      "terms_accepted": true,
      "ip_address": "192.168.1.1",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

---

## ✅ Test Checklist

After setup, test these:

- [ ] Popup appears after delay
- [ ] Country is auto-detected from IP
- [ ] All countries are in dropdown
- [ ] Terms checkbox is pre-checked
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Entry appears in Supabase table
- [ ] API endpoint shows the signup
- [ ] Mobile responsive works

---

## 🔧 Troubleshooting

### Popup not showing?
```javascript
// Clear localStorage in browser console
localStorage.removeItem('gcc_signup_completed');
```

### Country not detecting?
- Check browser console for errors
- IP detection works on production, not localhost
- Falls back to UAE if detection fails

### Database error?
- Verify `.env.local` has correct Supabase keys
- Check table was created in Supabase
- Restart dev server after changing `.env.local`

### Build errors?
```bash
npm install @supabase/supabase-js
```

---

## 📁 Key Files Reference

| File | Purpose |
|------|---------|
| `standalone-signup-popup.html` | Demo version (no backend) |
| `all-20-signup-popups.html` | Preview all designs |
| `supabase-schema.sql` | Database schema |
| `src/components/SignupPopup.tsx` | Main component |
| `src/app/api/signup/route.ts` | API endpoint |
| `src/lib/countries.ts` | 200+ countries list |

---

## 🎯 What Gets Saved to Database?

Every signup captures:
- ✅ First Name, Last Name, Email
- ✅ Country Code + Phone Number
- ✅ Country (user selected)
- ✅ Detected Country (from IP)
- ✅ Terms Accepted (true/false + timestamp)
- ✅ IP Address
- ✅ User Agent (browser info)
- ✅ Referrer URL
- ✅ UTM Parameters (campaign tracking)
- ✅ Status (for broker follow-up)
- ✅ Created/Updated timestamps

---

## 🌍 Country Detection

**How it works:**
1. Popup loads
2. Calls `https://ipapi.co/json/`
3. Gets country code (e.g., "AE")
4. Pre-selects in dropdown
5. Shows "(United Arab Emirates detected)"
6. Auto-fills phone code (+971)

**Fallback:** Defaults to UAE if detection fails

---

## 🎨 Customization

### Change delay:
```tsx
<SignupPopup variant={1} delay={5000} />  // 5 seconds
<SignupPopup variant={1} delay={15000} /> // 15 seconds
<SignupPopup variant={1} delay={0} />     // Instant (testing)
```

### Different design:
```tsx
<SignupPopup variant={10} delay={10000} /> // Neon Cyber style
```

### Customize text:
Edit `src/components/SignupPopup.tsx` lines 133-135

---

## 📚 Full Documentation

- **Complete Setup**: `SIGNUP-SETUP-GUIDE.md`
- **Implementation Details**: `SIGNUP-IMPLEMENTATION-GUIDE.md`
- **SQL Schema**: `supabase-schema.sql`

---

## 🚀 Deploy to Production

Before deploying:

1. ✅ Test all functionality
2. ✅ Set production environment variables
3. ✅ Set delay to 10-15 seconds
4. ✅ Choose your favorite design variant
5. ✅ Test on mobile devices
6. ✅ Add authentication to admin API

Deploy with:
```bash
vercel --prod
# or
npm run build && npm start
```

---

## 💬 Need Help?

1. Check browser console for errors
2. Verify environment variables
3. Test with `delay={0}` for immediate popup
4. Check Supabase logs
5. Review full guides in documentation files

---

**That's it! You're ready to capture leads! 🎉**

Start with `standalone-signup-popup.html` to test immediately,
then follow the 3 steps above for full production setup.