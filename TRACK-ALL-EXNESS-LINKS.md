# 🔗 Track ALL Exness Links - Complete Implementation

## Found 18+ Exness Links in Your App

I found Exness links in these places:
1. ✅ 30-minute popup (already tracked)
2. ❌ Broker prompt modal (NOT tracked)
3. ❌ Multiple widget banners (NOT tracked)
4. ❌ Footer link (NOT tracked)
5. ❌ Copy trading page (NOT tracked)
6. ❌ Other promotional sections (NOT tracked)

---

## Solution: Create Reusable Tracking Function

### Step 1: Add Tracking Function

**File:** `src/app/page.tsx` (after line 89, after `addNotification` function)

Add this function:

```typescript
  // ✅ Track Exness clicks (reusable for all links)
  const trackExnessClick = async (clickSource: string, clickUrl: string) => {
    try {
      // Track in Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exness_click', {
          event_category: clickSource,
          event_label: clickUrl
        })
      }

      // Track in database with email
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
            click_url: clickUrl,
            user_email: user.email,
            click_source: clickSource // Track where they clicked from
          })
        })

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Exness click tracked:', {
            source: clickSource,
            click_id: data.click_id
          })
        }
      } else {
        console.log('ℹ️ User not logged in - click tracked in GA only')
      }
    } catch (error) {
      console.error('❌ Failed to track Exness click:', error)
    }
  }
```

---

## Step 2: Update All Exness Links

### Location 1: 30-Minute Popup (Line ~14461)

**Already updated!** ✅

---

### Location 2: Broker Prompt Modal (Lines ~6599, 6863, etc.)

These appear in the `BrokerPromptModal` component.

**Find all instances like this:**

```typescript
href={
  isMobile
    ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
    : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
}
```

**Add onClick handler:**

```typescript
href={
  isMobile
    ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
    : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
}
onClick={() => trackExnessClick(
  'broker_prompt_modal',
  isMobile
    ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
    : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
)}
```

---

### Location 3: Footer Link (Line ~14311)

**Current:**
```typescript
<a href="https://one.exnessonelink.com/a/c_8f0nxidtbt" rel="sponsored">
  Exness broker
</a>
```

**Update to:**
```typescript
<a
  href="https://one.exnessonelink.com/a/c_8f0nxidtbt"
  rel="sponsored"
  onClick={() => trackExnessClick('footer_link', 'https://one.exnessonelink.com/a/c_8f0nxidtbt')}
>
  Exness broker
</a>
```

---

### Location 4: Copy Trading Widget (Lines ~12955, 12993)

**Update these:**

```typescript
onClick={() => trackExnessClick(
  'copy_trading_widget',
  isMobile
    ? "https://one.exnessonelink.com/intl/en/a/c_8f0nxidtbt?platform=mobile"
    : "https://one.exnessonelink.com/intl/en/a/c_8f0nxidtbt"
)}
```

---

## Step 3: Find All Links Automatically

Run this script to find ALL Exness links that need tracking:

```bash
# In your project directory
grep -n "exness" src/app/page.tsx -i | grep -B2 -A2 "href="
```

---

## Alternative: Automated Solution with Script

Create this file: `scripts/add-tracking-to-all-exness-links.js`

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to find Exness links without onClick
const exnessLinkPattern = /<a([^>]*href=["']https:\/\/[^"']*exness[^"']*["'][^>]*)>/gi;

let matches = [];
let match;
while ((match = exnessLinkPattern.exec(content)) !== null) {
  const fullTag = match[0];
  const attributes = match[1];

  // Check if already has onClick
  if (!attributes.includes('onClick')) {
    matches.push({
      fullTag,
      position: match.index
    });
  }
}

console.log(`Found ${matches.length} Exness links without tracking`);

matches.forEach((m, i) => {
  console.log(`${i + 1}. Position ${m.position}:`);
  console.log(`   ${m.fullTag}`);
});

if (matches.length > 0) {
  console.log('\n⚠️ These links need tracking added!');
  console.log('Run: npm run add-exness-tracking');
} else {
  console.log('\n✅ All Exness links have tracking!');
}
```

---

## Quick Fix: Update BrokerPromptModal Component

If the Exness links are in `BrokerPromptModal` component:

**File:** `src/components/BrokerPromptModal.tsx`

Find the component and pass the tracking function as a prop:

```typescript
// In page.tsx where you use BrokerPromptModal
<BrokerPromptModal
  isOpen={showBrokerPrompt}
  onClose={() => setShowBrokerPrompt(false)}
  contentType={brokerPromptType}
  remaining={remainingFree}
  onExnessClick={(url) => trackExnessClick('broker_prompt', url)} // ✅ NEW
/>
```

Then in `BrokerPromptModal.tsx`, add onClick to all Exness links:

```typescript
<a
  href={exnessUrl}
  onClick={() => props.onExnessClick?.(exnessUrl)}
>
  Open Exness Account
</a>
```

---

## Complete List of All Exness Link Locations

Based on grep results, here are ALL locations:

| Line | Component/Section | Current Status |
|------|-------------------|----------------|
| 6599-6600 | Broker Prompt Modal #1 | ❌ NOT tracked |
| 6863-6864 | Broker Prompt Modal #2 | ❌ NOT tracked |
| 7692-7693 | Widget Banner #1 | ❌ NOT tracked |
| 8244-8245 | Widget Banner #2 | ❌ NOT tracked |
| 10876-10877 | Widget Banner #3 | ❌ NOT tracked |
| 12794-12795 | Widget Banner #4 | ❌ NOT tracked |
| 12955 | Copy Trading Section #1 | ❌ NOT tracked |
| 12993-12994 | Copy Trading Section #2 | ❌ NOT tracked |
| 13451-13452 | Another Widget | ❌ NOT tracked |
| 14311 | Footer Link | ❌ NOT tracked |
| 14438 | 30-Min Popup | ✅ TRACKED |

**Total:** 11 locations need tracking!

---

## Recommended Approach

### Option 1: Manual (Accurate but Time-Consuming)
- Add `onClick` to each link manually
- Takes 30-60 minutes
- Most accurate

### Option 2: Automated Script (Fast but Needs Testing)
- Create script to add tracking to all links
- Takes 5 minutes
- Needs testing after

### Option 3: Component-Level Tracking (Best for Maintenance)
- Create `<ExnessLink>` wrapper component
- Replace all `<a>` tags with `<ExnessLink>`
- Tracks automatically
- Easiest to maintain

---

## Option 3 Implementation (RECOMMENDED)

### Create ExnessLink Component

**File:** `src/components/ExnessLink.tsx`

```typescript
'use client'
import { useUser } from '@/contexts/UserContext'

interface ExnessLinkProps {
  href: string
  source: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  rel?: string
}

export function ExnessLink({ href, source, children, ...props }: ExnessLinkProps) {
  const { user } = useUser()

  const handleClick = async () => {
    try {
      // Track in GA
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exness_click', {
          event_category: source,
          event_label: href
        })
      }

      // Track in database
      const token = localStorage.getItem('tradeflow_token')
      if (token && user) {
        await fetch('/api/track/exness-click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            partner_id: 'c_8f0nxidtbt',
            click_url: href,
            user_email: user.email,
            click_source: source
          })
        })
      }
    } catch (error) {
      console.error('Failed to track click:', error)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}
```

### Usage

Replace ALL Exness links with:

```typescript
// OLD:
<a href="https://one.exnessonelink.com/a/c_8f0nxidtbt">
  Open Account
</a>

// NEW:
<ExnessLink
  href="https://one.exnessonelink.com/a/c_8f0nxidtbt"
  source="broker_prompt"
>
  Open Account
</ExnessLink>
```

---

## Summary

**You have 11 untracked Exness links!**

**Best solution:**
1. Create `<ExnessLink>` component (5 min)
2. Replace all `<a>` tags with `<ExnessLink>` (15 min)
3. All tracking automatic forever!

**Quick solution:**
1. Add `trackExnessClick` function (2 min)
2. Add `onClick` to each link manually (30 min)

**Want me to implement Option 3 (ExnessLink component) for you?**

It's the cleanest and most maintainable solution!
