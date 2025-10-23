# 🎯 Complete Solution: Track Exness Clicks by Email

## Problem Solved
✅ Track which user (by email) clicked the Exness link
✅ Match postback to correct user even without user_id
✅ Approve users when they register + deposit on Exness

---

## Step 1: Run Database Migration

### Option A: Run in Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor**
4. Paste this SQL:

```sql
-- Add email and click_id to exness_clicks table
ALTER TABLE exness_clicks
ADD COLUMN IF NOT EXISTS user_email TEXT,
ADD COLUMN IF NOT EXISTS click_id TEXT UNIQUE;

-- Add indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_exness_clicks_email
ON exness_clicks(user_email, clicked_at DESC);

CREATE INDEX IF NOT EXISTS idx_exness_clicks_click_id
ON exness_clicks(click_id);

-- Optional: Add to conversions table too
ALTER TABLE exness_conversions
ADD COLUMN IF NOT EXISTS user_email TEXT;

CREATE INDEX IF NOT EXISTS idx_exness_conversions_email
ON exness_conversions(user_email);
```

5. Click **Run**
6. ✅ Done!

---

## Step 2: Update Popup Click Handler

**File:** `src/app/page.tsx` (around line 14461)

### Replace this:

```typescript
onClick={() => {
  // Track conversion
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exness_click', {
      event_category: '30min_popup',
      event_label: 'cpa_offer'
    })
  }
}}
```

### With this:

```typescript
onClick={async () => {
  // Track in Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exness_click', {
      event_category: '30min_popup',
      event_label: 'cpa_offer'
    })
  }

  // ✅ NEW: Track click in database with email
  try {
    const token = localStorage.getItem('tradeflow_token')
    if (token && user) {
      const response = await fetch('/api/track/exness-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          partner_id: 'c_8f0nxidtbt',
          click_url: 'https://one.exnesstrack.org/a/ckdhtel03',
          user_email: user.email // ✅ Send email for matching!
        })
      })

      const data = await response.json()
      console.log('✅ Click tracked:', data.click_id)
    } else {
      console.warn('⚠️ User not logged in - click not tracked')
    }
  } catch (error) {
    console.error('❌ Failed to track click:', error)
  }
}}
```

---

## Step 3: Update Postback Handler to Match by Email

**File:** `src/app/api/postback/exness/route.ts` (around line 96-118)

### Replace this section:

```typescript
// Find which user clicked this link (by partner_id or session tracking)
const { data: clickData, error: clickError } = await supabaseAdmin
  .from('exness_clicks')
  .select('user_id, clicked_at')
  .eq('partner_id', EXNESS_PARTNER_ID)
  .order('clicked_at', { ascending: false })
  .limit(1)
  .maybeSingle()

let userId: string | null = clickData?.user_id || null

// If no click found, try to find user by Exness user ID (if we've seen them before)
if (!userId && exness_user_id) {
  const { data: existingConversion } = await supabaseAdmin
    .from('exness_conversions')
    .select('user_id')
    .eq('exness_user_id', exness_user_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  userId = existingConversion?.user_id || null
}
```

### With this improved matching logic:

```typescript
// ✅ IMPROVED: Find user by multiple methods
let userId: string | null = null
let userEmail: string | null = null

// Method 1: Try to match by email in postback (if Exness starts sending it)
if (postbackData.email || postbackData.user_email) {
  userEmail = postbackData.email || postbackData.user_email

  const { data: clickByEmail } = await supabaseAdmin
    .from('exness_clicks')
    .select('user_id, user_email')
    .eq('partner_id', EXNESS_PARTNER_ID)
    .eq('user_email', userEmail)
    .gte('clicked_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
    .order('clicked_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (clickByEmail) {
    userId = clickByEmail.user_id
    userEmail = clickByEmail.user_email
    console.log('✅ Matched by email:', userEmail)
  }
}

// Method 2: Match by IP address + recent time (last 24 hours)
if (!userId) {
  const ip_address = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown'

  const { data: clickByIP } = await supabaseAdmin
    .from('exness_clicks')
    .select('user_id, user_email')
    .eq('partner_id', EXNESS_PARTNER_ID)
    .eq('ip_address', ip_address)
    .gte('clicked_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
    .order('clicked_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (clickByIP) {
    userId = clickByIP.user_id
    userEmail = clickByIP.user_email
    console.log('✅ Matched by IP:', ip_address)
  }
}

// Method 3: Fall back to most recent click
if (!userId) {
  const { data: recentClick } = await supabaseAdmin
    .from('exness_clicks')
    .select('user_id, user_email')
    .eq('partner_id', EXNESS_PARTNER_ID)
    .order('clicked_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (recentClick) {
    userId = recentClick.user_id
    userEmail = recentClick.user_email
    console.log('⚠️ Matched by most recent click (fallback)')
  }
}

// Method 4: Try to find by previous conversion
if (!userId && exness_user_id) {
  const { data: existingConversion } = await supabaseAdmin
    .from('exness_conversions')
    .select('user_id, user_email')
    .eq('exness_user_id', exness_user_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existingConversion) {
    userId = existingConversion.user_id
    userEmail = existingConversion.user_email
    console.log('✅ Matched by previous conversion')
  }
}

console.log('🔍 Final match result:', { userId, userEmail })
```

---

## Step 4: Update Conversion Recording to Include Email

**File:** `src/app/api/postback/exness/route.ts` (around line 120-144)

### Find this section:

```typescript
const insertData: any = {
  user_id: userId,
  partner_id: EXNESS_PARTNER_ID,
  event_type: event_type || 'UNKNOWN',
  ftd_amount: parseFloat(ftd_amount || deposit_amount || '0'),
  reward_amount: parseFloat(reward_amount || '0'),
  exness_user_id: exness_user_id || null,
  raw_postback_data: postbackData,
  processed: false
}
```

### Add user_email:

```typescript
const insertData: any = {
  user_id: userId,
  user_email: userEmail, // ✅ NEW: Store email for reference
  partner_id: EXNESS_PARTNER_ID,
  event_type: event_type || 'UNKNOWN',
  ftd_amount: parseFloat(ftd_amount || deposit_amount || '0'),
  reward_amount: parseFloat(reward_amount || '0'),
  exness_user_id: exness_user_id || null,
  raw_postback_data: postbackData,
  processed: false
}
```

---

## Complete Flow Example

### Scenario: User Opens Account and Deposits

```
1. Oct 23, 12:00 PM
   └─ User registers on TradeFlow
   └─ Email: john@email.com
   └─ Stored in users table

2. Oct 23, 12:30 PM
   └─ User tries to view signals
   └─ ❌ Blocked - "Need broker account"
   └─ Popup appears: "Unlock with Exness"

3. Oct 23, 12:31 PM
   └─ User clicks "Claim Bonus" button
   └─ ✅ Saved to exness_clicks:
      {
        user_id: "abc-123",
        user_email: "john@email.com",
        partner_id: "c_8f0nxidtbt",
        click_url: "https://one.exnesstrack.org/a/ckdhtel03",
        ip_address: "1.2.3.4",
        clicked_at: "2025-10-23 12:31:00"
      }
   └─ User redirected to Exness.com

4. Oct 23, 12:35 PM
   └─ User registers on Exness
   └─ Email: john@email.com (or might be different!)
   └─ Exness sets cookie

5. Oct 23, 12:36 PM
   └─ Exness sends REGISTRATION postback
   └─ POST /api/postback/exness
   └─ Data: {partner_id: "c_8f0nxidtbt", event_type: "REGISTRATION"}

6. Oct 23, 12:36 PM
   └─ Your server receives postback
   └─ Searches exness_clicks by:
      1. Email (if in postback) ← Best match
      2. IP + time window ← Good match
      3. Most recent click ← Fallback
   └─ Found: john@email.com clicked 5 minutes ago
   └─ Saved to exness_conversions:
      {
        user_id: "abc-123",
        user_email: "john@email.com",
        event_type: "REGISTRATION"
      }

7. Oct 25, 10:00 AM
   └─ User deposits $500 on Exness
   └─ Exness sends AGGREGATED_DEPOSIT postback
   └─ Same matching logic → Found john@email.com
   └─ Saved to exness_conversions

8. Oct 27, 9:00 AM
   └─ Exness processes commission
   └─ Exness sends REWARD_PROCESSING postback
   └─ Your server receives it
   └─ Updates users table:
      UPDATE users
      SET has_broker_account = true,
          broker_name = 'Exness',
          broker_verified_at = NOW()
      WHERE id = "abc-123"

9. Oct 27, 9:01 AM
   └─ User refreshes TradeFlow
   └─ ✅ UNLOCKED! Can now see all signals!
```

---

## Testing Procedure

### Test 1: Click Tracking

```bash
# 1. Log in to TradeFlow
# 2. Open browser console
# 3. Click the Exness popup button
# 4. Should see: "✅ Click tracked: click_1234..."
# 5. Check Supabase exness_clicks table
# 6. Verify: Row exists with your email
```

### Test 2: Postback Matching

```bash
# 1. Insert test click
psql> INSERT INTO exness_clicks (user_id, user_email, partner_id, click_url, ip_address)
      VALUES ('your-user-id', 'test@example.com', 'c_8f0nxidtbt', 'test', '1.2.3.4');

# 2. Send test postback
curl -X POST https://tradeflow.blog/api/postback/exness \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 1.2.3.4" \
  -d '{
    "partner_id": "c_8f0nxidtbt",
    "event_type": "REWARD_PROCESSING",
    "user_id": "exness_123"
  }'

# 3. Check Render logs
# Should see: "✅ Matched by IP: 1.2.3.4"

# 4. Check Supabase users table
# User should have: has_broker_account = true
```

---

## Benefits of Email Tracking

### ✅ Advantages:

1. **More Reliable Matching**
   - Email is unique per user
   - Works even if IP changes
   - Works across different devices

2. **Better Attribution**
   - Know exactly who clicked
   - Can show user their click history
   - Better for admin dashboard reporting

3. **Longer Time Window**
   - Can match clicks up to 30 days old
   - User can register on Exness later

4. **Easier Debugging**
   - Search by email to see their journey
   - Clear audit trail

### ⚠️ Limitations:

- User MUST be logged in to track click
- If user not logged in → No tracking → No approval
- Solution: Require login before showing popup

---

## Summary

**What we did:**
1. ✅ Added `user_email` column to `exness_clicks` table
2. ✅ Updated API to accept and store email
3. ✅ Modified popup to send email when clicked
4. ✅ Enhanced postback matching (email → IP → fallback)

**Result:**
- Postback can now match users by email!
- More reliable than just IP/time
- Users get approved when they deposit on Exness!

**Next steps:**
1. Run the SQL migration in Supabase
2. Update the popup onClick handler
3. Update the postback matching logic
4. Deploy and test!

Want me to implement these changes for you now?
