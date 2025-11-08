# 🤖 AUTOMATED BROKER ASSIGNMENT SYSTEM

## ✅ Complete Flow (Fully Automated)

```
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: Landing Page Signup                   │
│  User fills form → POST /api/signup → Save to CRM (Supabase)   │
└───────────────────┬─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│              STEP 2: Automatic Broker Assignment                 │
│  API automatically calls /api/push-to-broker                     │
│  ├─ Analyzes lead (country, experience, account size)           │
│  ├─ Applies YOUR RULES to determine broker                      │
│  ├─ Pushes to Trading CRM / Finoglob / etc.                     │
│  └─ Updates Supabase with push status                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Points

1. **Landing Page ONLY saves to CRM** - No direct broker push
2. **Separate API handles broker logic** - Based on YOUR rules
3. **Fully automated** - No manual intervention needed
4. **Customizable rules** - Easy to modify in `/api/push-to-broker/route.ts`

---

## 🛠️ Customize Broker Assignment Rules

Edit: `src/app/api/push-to-broker/route.ts`

### Current Rules (Lines 95-120)

```typescript
function determinebroker(signup: any): string {
  const { country, trading_experience, account_size } = signup;

  // RULE 1: Specific countries → Trading CRM
  const tradingCRMCountries = [
    'Malaysia', 'Turkey', 'France', 'Italy',
    'Hong Kong', 'Singapore', 'Taiwan', 'Brazil'
  ];
  if (tradingCRMCountries.includes(country)) {
    return 'Trading CRM';
  }

  // RULE 2: High-value accounts → Trading CRM
  if (account_size === '50k-100k' || account_size === '100k+') {
    return 'Trading CRM';
  }

  // RULE 3: Experienced traders → Trading CRM
  if (trading_experience === '5-10' || trading_experience === '10+') {
    return 'Trading CRM';
  }

  // Default broker
  return 'Finoglob';
}
```

### Example Custom Rules

#### Example 1: Country-Based Assignment
```typescript
function determinebroker(signup: any): string {
  const { country } = signup;

  // Asia → Trading CRM
  if (['Malaysia', 'Singapore', 'Hong Kong', 'Taiwan'].includes(country)) {
    return 'Trading CRM';
  }

  // Europe → Finoglob
  if (['France', 'Italy', 'Germany', 'Spain'].includes(country)) {
    return 'Finoglob';
  }

  // Americas → Another Broker
  if (['Brazil', 'United States', 'Canada'].includes(country)) {
    return 'Broker XYZ';
  }

  return 'Trading CRM'; // Default
}
```

#### Example 2: Account Size Priority
```typescript
function determinebroker(signup: any): string {
  const { account_size, country } = signup;

  // VIP accounts (>$50k) → Premium Broker
  if (account_size === '50k-100k' || account_size === '100k+') {
    return 'Premium Broker';
  }

  // Mid-tier ($10k-$50k) → Trading CRM
  if (account_size === '10k-50k') {
    return 'Trading CRM';
  }

  // Small accounts → Finoglob
  return 'Finoglob';
}
```

#### Example 3: Complex Multi-Factor Rules
```typescript
function determinebroker(signup: any): string {
  const { country, trading_experience, account_size } = signup;

  // Priority 1: High-value + Experienced → VIP Broker
  if ((account_size === '50k-100k' || account_size === '100k+') &&
      (trading_experience === '5-10' || trading_experience === '10+')) {
    return 'VIP Broker';
  }

  // Priority 2: Asian markets → Trading CRM
  const asianCountries = ['Malaysia', 'Singapore', 'Hong Kong', 'Taiwan', 'Japan', 'South Korea'];
  if (asianCountries.includes(country)) {
    return 'Trading CRM';
  }

  // Priority 3: Beginners with small accounts → Finoglob
  if ((trading_experience === '0-1' || trading_experience === '1-3') &&
      (account_size === 'under-1k' || account_size === '1k-5k')) {
    return 'Finoglob';
  }

  // Priority 4: European regulated markets → EU Broker
  const euCountries = ['France', 'Italy', 'Germany', 'Spain', 'Netherlands'];
  if (euCountries.includes(country)) {
    return 'EU Regulated Broker';
  }

  // Default
  return 'Trading CRM';
}
```

---

## 📊 Check Results in CRM

After a lead signs up, check your CRM dashboard to see:

1. **assigned_broker** - Which broker was selected
2. **push_status_code** - HTTP status (200 = success, 500 = failed)
3. **push_response** - Full JSON response from broker API
4. **pushed_at** - Timestamp of when push occurred

### Success Example
```json
{
  "assigned_broker": "Trading CRM",
  "push_status_code": 200,
  "push_response": {
    "success": true,
    "broker": "Trading CRM",
    "leadId": "12345",
    "timestamp": "2025-01-07T10:30:00Z"
  },
  "pushed_at": "2025-01-07T10:30:00Z"
}
```

### Failure Example
```json
{
  "assigned_broker": "Trading CRM",
  "push_status_code": 500,
  "push_response": {
    "success": false,
    "error": "API authentication failed"
  },
  "push_error": "API authentication failed",
  "pushed_at": "2025-01-07T10:30:00Z"
}
```

---

## 🔄 Adding a New Broker

### Step 1: Add Broker Logic in `/api/push-to-broker/route.ts`

```typescript
// Add after line 70
} else if (selectedBroker === 'Your New Broker') {
  pushResult = await pushToYourNewBroker(signup);
  statusCode = pushResult.success ? 200 : 500;
  errorMessage = pushResult.success ? null : pushResult.error;
}
```

### Step 2: Create Push Function

```typescript
// Add at the end of the file
async function pushToYourNewBroker(signup: any) {
  try {
    const response = await fetch('https://your-broker-api.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YOUR_BROKER_API_KEY}`
      },
      body: JSON.stringify({
        first_name: signup.first_name,
        last_name: signup.last_name,
        email: signup.email,
        phone: `${signup.country_code}${signup.phone_number}`,
        country: signup.country,
      })
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        leadId: result.lead_id,
        rawResponse: result
      };
    } else {
      return {
        success: false,
        error: result.error || 'API request failed',
        rawResponse: result
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to broker API'
    };
  }
}
```

### Step 3: Update Rules Function

```typescript
function determinebroker(signup: any): string {
  const { country } = signup;

  // Add your condition
  if (country === 'Germany') {
    return 'Your New Broker';
  }

  // ... existing rules ...
}
```

---

## 🚀 Deploy Changes

```bash
# 1. Save all files
git add .

# 2. Commit changes
git commit -m "✨ Add automated broker assignment with custom rules"

# 3. Push to production
git push

# 4. Wait for Render deployment (usually 2-3 minutes)
```

---

## ✅ Testing

### Test 1: Sign up with different countries
```bash
# Malaysia → Should go to Trading CRM
# United States → Should go to Finoglob (or your default)
# High account size → Should go to premium broker
```

### Test 2: Check logs
```bash
# View Render logs to see:
# ✅ Signup created in CRM: xxx-xxx-xxx
# 🔄 Running automated broker assignment rules...
# ✅ Lead auto-assigned to Trading CRM
```

### Test 3: Check CRM database
```sql
-- View latest signups with broker assignments
SELECT
  email,
  country,
  assigned_broker,
  push_status_code,
  pushed_at
FROM signups
ORDER BY created_at DESC
LIMIT 10;
```

---

## ❓ FAQ

**Q: What if the broker push fails?**
A: The lead is still saved to CRM! You can manually retry from the dashboard.

**Q: Can I push the same lead to multiple brokers?**
A: Yes! Modify the `/api/push-to-broker` to accept an array of brokers.

**Q: How do I retry failed pushes?**
A: Click the "Push Status" badge in CRM, it will show a "Retry" button for failed pushes.

**Q: Can I change the broker after assignment?**
A: Yes! The CRM dashboard will have a "Reassign Broker" button (coming soon).

---

## 📝 Summary

✅ Landing Page → Saves to CRM
✅ Automatic rules check → Assigns broker
✅ Push to broker API → Updates CRM
✅ Fully customizable rules
✅ No manual intervention needed

**Your leads go from signup → CRM → correct broker automatically!**
