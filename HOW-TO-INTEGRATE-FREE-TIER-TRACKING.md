# How to Integrate Free Tier Tracking

## What Was Created:

### 1. API Endpoints
- **`/api/track/signal`** - Tracks when user views a signal
- **`/api/track/article`** - Tracks when user views an article

### 2. Broker Prompt Modal
- **`BrokerPromptModal.tsx`** - Beautiful modal prompting users to open broker account

### 3. Database Tables (Already created in SUPABASE-COMPLETE-DATABASE-SETUP.sql)
- `user_signal_views` - Records which signals each user viewed
- `user_article_views` - Records which articles each user viewed
- `users.free_signals_count` - Counter for free signals used
- `users.free_articles_count` - Counter for free articles used

---

## Integration Steps:

### Step 1: Import the BrokerPromptModal

In `src/app/page.tsx`, add to the imports:

```typescript
import { BrokerPromptModal } from '@/components/BrokerPromptModal'
```

### Step 2: Add State Variables

Add these state variables near the top of your component:

```typescript
const [showBrokerPrompt, setShowBrokerPrompt] = useState(false)
const [brokerPromptType, setBrokerPromptType] = useState<'signals' | 'articles'>('signals')
const [remainingFree, setRemainingFree] = useState<number>(3)
```

### Step 3: Create Tracking Functions

Add these functions:

```typescript
// Track signal view
const trackSignalView = async (signalId: number) => {
  if (!user) {
    // Not logged in - show signup
    setAuthMode('signup')
    setShowAuthModal(true)
    return false
  }

  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch('/api/track/signal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ signal_id: signalId })
    })

    const data = await response.json()

    if (!data.can_view) {
      // Free limit reached - show broker prompt
      setBrokerPromptType('signals')
      setRemainingFree(data.remaining)
      setShowBrokerPrompt(true)
      return false
    }

    // Update remaining count
    setRemainingFree(data.remaining)

    // Show warning if only 1 left
    if (data.remaining === 1) {
      addNotification(`⚠️ Only ${data.remaining} free signal remaining!`, 'warning')
    }

    return true
  } catch (error) {
    console.error('Error tracking signal:', error)
    return true // Allow view on error
  }
}

// Track article view
const trackArticleView = async (articleId: number) => {
  if (!user) {
    // Not logged in - show signup
    setAuthMode('signup')
    setShowAuthModal(true)
    return false
  }

  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch('/api/track/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ article_id: articleId })
    })

    const data = await response.json()

    if (!data.can_view) {
      // Free limit reached - show broker prompt
      setBrokerPromptType('articles')
      setRemainingFree(data.remaining)
      setShowBrokerPrompt(true)
      return false
    }

    // Update remaining count
    setRemainingFree(data.remaining)

    // Show warning if only 1 left
    if (data.remaining === 1) {
      addNotification(`⚠️ Only ${data.remaining} free article remaining!`, 'warning')
    }

    return true
  } catch (error) {
    console.error('Error tracking article:', error)
    return true // Allow view on error
  }
}
```

### Step 4: Update Signal Click Handler

Find where signals are clicked and update:

```typescript
// OLD CODE:
onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}

// NEW CODE:
onClick={async () => {
  if (selectedSignal !== signal.id) {
    // Expanding signal - check if allowed
    const canView = await trackSignalView(signal.id)
    if (canView) {
      setSelectedSignal(signal.id)
    }
  } else {
    // Collapsing signal
    setSelectedSignal(null)
  }
}}
```

### Step 5: Update Article Click Handler

Similarly for articles:

```typescript
// OLD CODE:
onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}

// NEW CODE:
onClick={async () => {
  if (selectedArticle !== article.id) {
    // Opening article - check if allowed
    const canView = await trackArticleView(article.id)
    if (canView) {
      setSelectedArticle(article.id)
    }
  } else {
    // Closing article
    setSelectedArticle(null)
  }
}}
```

### Step 6: Add Broker Prompt Modal to Render

At the bottom of your component, before the closing `</div>`, add:

```typescript
{/* 🏦 Broker Prompt Modal */}
<BrokerPromptModal
  isOpen={showBrokerPrompt}
  onClose={() => setShowBrokerPrompt(false)}
  contentType={brokerPromptType}
  remaining={remainingFree}
/>
```

---

## How It Works:

### Free Users (no broker account):
1. User clicks signal/article
2. System checks `free_signals_count` or `free_articles_count`
3. If < 3: Increment counter, show content
4. If = 3: Show broker prompt modal
5. Modal displays: "Free limit reached! Open broker account for unlimited access"

### Premium Users (has_broker_account = true):
1. User clicks signal/article
2. System checks `has_broker_account`
3. If true: Show unlimited content, no tracking needed
4. No modals, no limits

### Benefits Display:
- **Free tier**: "🆓 Free (2/3 signals)" in UI
- **Warning**: "⚠️ Only 1 free signal remaining!"
- **Blocked**: Beautiful modal with broker options

---

## Testing:

### Test Free Tier Limits:
1. Sign up new account
2. Click 3 signals - each should open
3. Click 4th signal - broker prompt should appear
4. Close modal, click article instead
5. View 3 articles - each should open
6. Click 4th article - broker prompt should appear

### Test Premium Access:
1. In Supabase, manually set `has_broker_account = true` for test user
2. Log in with that user
3. Click unlimited signals/articles - no prompts should appear

---

## Database Setup Reminder:

Make sure you've run `SUPABASE-COMPLETE-DATABASE-SETUP.sql` in Supabase to create:
- `users` table with `free_signals_count`, `free_articles_count`, `has_broker_account`
- `user_signal_views` table
- `user_article_views` table

---

## Customization:

### Change Broker Links:
Edit `BrokerPromptModal.tsx` and update the `brokers` array with your actual affiliate links:

```typescript
const brokers = [
  {
    name: 'Exness',
    link: 'https://one.exnesstrack.net/a/YOUR-AFFILIATE-ID'
  },
  // ...
]
```

### Change Free Limits:
Currently set to 3 signals + 3 articles. To change, edit:
- `src/app/api/track/signal/route.ts` - Line with `>= 3`
- `src/app/api/track/article/route.ts` - Line with `>= 3`

---

## Next Steps:

1. Integrate tracking calls into signal/article clicks (Steps 4-5 above)
2. Add broker prompt modal to render (Step 6 above)
3. Test with new user account
4. Update broker affiliate links in BrokerPromptModal.tsx
5. Deploy to production

🚀 Your free tier limits are now enforced!
