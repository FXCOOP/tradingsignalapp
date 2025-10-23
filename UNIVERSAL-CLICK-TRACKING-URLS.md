# 🌐 Universal Click ID Tracking - All Platforms

## 📊 Supported Platforms

This system tracks clicks from:
- ✅ **Google Ads** (GCLID)
- ✅ **Facebook/Instagram Ads** (FBCLID)
- ✅ **Microsoft/Bing Ads** (MSCLKID)
- ✅ **TikTok Ads** (TTCLID)
- ✅ **Any Custom Platform** (Generic click_id)

---

## 🔗 URL Templates for Each Platform

### 1️⃣ Google Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=google&utm_medium=cpc&utm_campaign=EG_AR_Search_Core&utm_term={keyword}&utm_content={creative}_{adgroupid}&gclid={gclid}&click_id={gclid}&geo=egypt&lang=ar
```

**Parameters Captured:**
- `gclid` = Google Click ID (auto-populated)
- `click_id` = Copy of GCLID (for universal tracking)
- `utm_source` = google
- `utm_medium` = cpc
- `utm_campaign` = Campaign name
- `utm_term` = Keyword that triggered ad
- `utm_content` = Ad creative variation

---

### 2️⃣ Facebook/Instagram Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=facebook&utm_medium=social&utm_campaign=EG_AR_Facebook_Conversion&fbclid={{click_id}}&click_id={{click_id}}&geo=egypt&lang=ar
```

**Parameters Captured:**
- `fbclid` = Facebook Click ID (auto-populated by Facebook)
- `click_id` = Copy of FBCLID
- `utm_source` = facebook
- `utm_medium` = social
- `utm_campaign` = Campaign name

**Note:** Facebook automatically appends `fbclid` to URLs. You can also use `{{click_id}}` macro in Facebook Ads Manager.

---

### 3️⃣ Microsoft/Bing Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=bing&utm_medium=cpc&utm_campaign=EG_AR_Bing_Search&utm_term={QueryString}&msclkid={msclkid}&click_id={msclkid}&geo=egypt&lang=ar
```

**Parameters Captured:**
- `msclkid` = Microsoft Click ID (auto-populated)
- `click_id` = Copy of MSCLKID
- `utm_source` = bing
- `utm_medium` = cpc
- `utm_campaign` = Campaign name
- `utm_term` = Search query

---

### 4️⃣ TikTok Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=tiktok&utm_medium=social&utm_campaign=EG_AR_TikTok_Video&ttclid=__CLICKID__&click_id=__CLICKID__&geo=egypt&lang=ar
```

**Parameters Captured:**
- `ttclid` = TikTok Click ID
- `click_id` = Copy of TTCLID
- `utm_source` = tiktok
- `utm_medium` = social
- `utm_campaign` = Campaign name

**Note:** TikTok uses `__CLICKID__` macro which gets replaced with actual click ID.

---

### 5️⃣ Twitter/X Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=twitter&utm_medium=social&utm_campaign=EG_AR_Twitter_Promoted&click_id={cid}&geo=egypt&lang=ar
```

**Parameters Captured:**
- `click_id` = Twitter Click ID (from `{cid}` macro)
- `utm_source` = twitter
- `utm_medium` = social

---

### 6️⃣ LinkedIn Ads (Egypt Campaign)
```
https://tradeflow.blog/ar/signals?utm_source=linkedin&utm_medium=social&utm_campaign=EG_AR_LinkedIn_Sponsored&click_id={creative.id}_{member.id}&geo=egypt&lang=ar
```

**Parameters Captured:**
- `click_id` = LinkedIn member + creative ID
- `utm_source` = linkedin
- `utm_medium` = social

---

## 📝 Frontend Tracking Script (Universal)

Add this to your landing page to capture **ALL** click IDs:

```javascript
<script>
  // Universal Click ID Tracker - Captures ALL ad platforms
  window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Detect which platform click ID is present
    const trackingData = {
      // Universal
      click_id: urlParams.get('click_id'),

      // Platform-specific
      gclid: urlParams.get('gclid'),      // Google Ads
      fbclid: urlParams.get('fbclid'),    // Facebook/Instagram
      msclkid: urlParams.get('msclkid'),  // Microsoft/Bing
      ttclid: urlParams.get('ttclid'),    // TikTok

      // UTM parameters
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),

      // Geo/Lang
      geo: urlParams.get('geo'),
      lang: urlParams.get('lang')
    };

    // Auto-detect click_id if not provided
    if (!trackingData.click_id) {
      trackingData.click_id =
        trackingData.gclid ||
        trackingData.fbclid ||
        trackingData.msclkid ||
        trackingData.ttclid;
    }

    // Store in localStorage
    if (trackingData.click_id) {
      localStorage.setItem('click_id', trackingData.click_id);
      localStorage.setItem('tracking_data', JSON.stringify(trackingData));

      console.log('✅ Click ID captured:', trackingData.click_id);
      console.log('📊 Platform:', trackingData.utm_source);
    }

    // Send to backend
    if (trackingData.click_id) {
      fetch('/api/track/page-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...trackingData,
          page: window.location.pathname,
          referrer: document.referrer,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Tracking failed:', err));
    }
  });

  // Function to call when user clicks "Open Exness Account"
  async function trackExnessClick() {
    const trackingData = JSON.parse(localStorage.getItem('tracking_data') || '{}');
    const click_id = localStorage.getItem('click_id');
    const token = localStorage.getItem('auth_token');

    try {
      const response = await fetch('/api/track/exness-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          partner_id: 'c_8f0nxidtbt',
          click_url: 'https://one.exnesstrack.net/a/c_8f0nxidtbt',
          click_id: click_id,
          gclid: trackingData.gclid,
          fbclid: trackingData.fbclid,
          msclkid: trackingData.msclkid,
          ttclid: trackingData.ttclid,
          utm_campaign: trackingData.utm_campaign,
          utm_source: trackingData.utm_source,
          utm_medium: trackingData.utm_medium,
          utm_term: trackingData.utm_term,
          utm_content: trackingData.utm_content,
          geo: trackingData.geo,
          lang: trackingData.lang
        })
      });

      console.log('✅ Exness click tracked');

      // Fire conversion tracking based on platform
      if (trackingData.utm_source === 'google' && typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/Exness_Click_Egypt',
          'value': 50.0,
          'currency': 'USD',
          'transaction_id': click_id
        });
      } else if (trackingData.utm_source === 'facebook' && typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          value: 50.0,
          currency: 'USD'
        });
      }

    } catch (error) {
      console.error('Tracking failed:', error);
    }

    // Redirect to Exness
    window.open('https://one.exnesstrack.net/a/c_8f0nxidtbt', '_blank');
  }
</script>
```

---

## 🗄️ Backend API Update

Update `/api/track/exness-click/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyToken } from '@/lib/auth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { user } = await verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const {
      partner_id,
      click_url,
      click_id,        // Universal click ID
      gclid,           // Google
      fbclid,          // Facebook
      msclkid,         // Bing
      ttclid,          // TikTok
      utm_campaign,
      utm_source,
      utm_medium,
      utm_term,
      utm_content,
      geo,
      lang
    } = await request.json()

    // Get IP and User Agent
    const ip_address = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Record click with ALL tracking data
    const { data, error } = await supabaseAdmin
      .from('exness_clicks')
      .insert({
        user_id: user.id,
        click_url,
        partner_id,
        click_id,        // Universal ID (could be any platform)
        gclid,           // Google-specific
        fbclid,          // Facebook-specific
        msclkid,         // Bing-specific
        ttclid,          // TikTok-specific
        utm_campaign,
        utm_source,
        utm_medium,
        utm_term,
        utm_content,
        geo,
        lang,
        ip_address,
        user_agent
      })
      .select()
      .single()

    if (error) {
      console.error('Error recording click:', error)
      return NextResponse.json({ error: 'Failed to record click' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      click_id: data.id,
      platform: utm_source,
      message: `Click tracked from ${utm_source || 'unknown platform'}`
    })

  } catch (error) {
    console.error('Track click error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 🎯 Postback Matching (Enhanced)

Update `/api/postback/exness/route.ts` to match by **ANY** click ID:

```typescript
// Find user by ANY click ID (checks all platforms)
const { data: clickData, error: clickError } = await supabaseAdmin
  .from('exness_clicks')
  .select('user_id, click_id, gclid, fbclid, msclkid, ttclid, utm_campaign, utm_source')
  .eq('partner_id', partner_id)
  .order('clicked_at', { ascending: false })
  .limit(1)
  .single()

if (clickData) {
  // Record conversion with ALL click IDs
  await supabaseAdmin.from('exness_conversions').insert({
    user_id: clickData.user_id,
    partner_id,
    event_type,
    ftd_amount,
    click_id: clickData.click_id,      // Universal
    gclid: clickData.gclid,             // Google
    fbclid: clickData.fbclid,           // Facebook
    msclkid: clickData.msclkid,         // Bing
    ttclid: clickData.ttclid,           // TikTok
    utm_campaign: clickData.utm_campaign,
    utm_source: clickData.utm_source,
    exness_user_id,
    raw_postback_data: postbackData,
    processed: false
  })

  // Auto-upgrade user...
}
```

---

## ✅ Quick Test URLs

Copy/paste these to test each platform:

### Google Ads
```
http://localhost:3000/ar/signals?utm_source=google&utm_medium=cpc&utm_campaign=EG_TEST&gclid=TEST_GCLID_123&click_id=TEST_GCLID_123&geo=egypt&lang=ar
```

### Facebook Ads
```
http://localhost:3000/ar/signals?utm_source=facebook&utm_medium=social&utm_campaign=EG_TEST&fbclid=TEST_FBCLID_456&click_id=TEST_FBCLID_456&geo=egypt&lang=ar
```

### Bing Ads
```
http://localhost:3000/ar/signals?utm_source=bing&utm_medium=cpc&utm_campaign=EG_TEST&msclkid=TEST_MSCLKID_789&click_id=TEST_MSCLKID_789&geo=egypt&lang=ar
```

---

## 📊 Platform Comparison

| Platform | Click ID Param | Auto-Append | Manual Setup | Cost/Click (Egypt) |
|----------|----------------|-------------|--------------|-------------------|
| Google Ads | `gclid` | ✅ Yes | Template only | $0.08-0.25 |
| Facebook | `fbclid` | ✅ Yes | Template only | $0.05-0.20 |
| Bing | `msclkid` | ✅ Yes | Template only | $0.06-0.18 |
| TikTok | `ttclid` | ❌ No | Use `__CLICKID__` | $0.10-0.30 |
| Twitter | Custom | ❌ No | Use `{cid}` | $0.15-0.40 |
| LinkedIn | Custom | ❌ No | Custom macro | $2.00-5.00 |

---

## 🚀 Next Steps

1. **Run the SQL**: Execute `SUPABASE-GOOGLE-ADS-TRACKING-SCHEMA.sql`
2. **Add Tracking Script**: Copy universal script to landing page
3. **Update APIs**: Update `/api/track/exness-click` and `/api/postback/exness`
4. **Test Each Platform**: Use test URLs above
5. **Launch Campaigns**: Start with Google Ads (cheapest in Egypt)

---

**File:** UNIVERSAL-CLICK-TRACKING-URLS.md
**Version:** 1.0
**Supports:** Google, Facebook, Bing, TikTok, Twitter, LinkedIn
