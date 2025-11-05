# Form to CRM Integration Guide

## Overview

Connect **any landing page form** to your CRM system. Leads automatically flow:
```
Landing Page Form → Your CRM → Finoglob Broker (for MY, TR, FR, IT, HK, SG, TW, BR)
```

---

## Quick Setup (3 Steps)

### Step 1: Add the connector script to your HTML

```html
<!-- Add before closing </body> tag -->
<script src="https://your-domain.com/form-to-crm-connector.js"></script>
```

### Step 2: Update your form HTML

```html
<form id="signupForm"
      data-crm-endpoint="https://your-api-domain.com"
      data-crm-auto-init>

  <!-- Required Fields -->
  <input type="text" name="firstName" placeholder="First Name" required>
  <input type="text" name="lastName" placeholder="Last Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="tel" name="phoneNumber" placeholder="+60123456789" required>

  <!-- Country Selector -->
  <select name="country" required>
    <option value="">Select Country</option>
    <option value="MY">Malaysia</option>
    <option value="TR">Turkey</option>
    <option value="FR">France</option>
    <option value="IT">Italy</option>
    <option value="HK">Hong Kong</option>
    <option value="SG">Singapore</option>
    <option value="TW">Taiwan</option>
    <option value="BR">Brazil</option>
  </select>

  <!-- Terms Checkbox -->
  <label>
    <input type="checkbox" name="termsAccepted" required>
    I accept the terms and conditions
  </label>

  <!-- Optional Fields -->
  <select name="trading_experience">
    <option value="beginner">Beginner</option>
    <option value="intermediate">Intermediate</option>
    <option value="advanced">Advanced</option>
  </select>

  <button type="submit">Sign Up</button>
</form>
```

### Step 3: That's it!

The form will automatically:
1. ✅ Submit to your CRM's `/api/signup` endpoint
2. ✅ Create a lead in your CRM database
3. ✅ Automatically route to Finoglob for supported countries
4. ✅ Show success message
5. ✅ Redirect to broker's thank you page (if applicable)

---

## Manual Initialization

If you want more control:

```html
<form id="myForm">
  <!-- Your form fields -->
</form>

<script src="form-to-crm-connector.js"></script>
<script>
  // Initialize manually
  FormToCRM.init('myForm', {
    apiEndpoint: 'https://your-api-domain.com'
  });
</script>
```

---

## Form Field Mapping

The connector automatically maps common field names:

| Your Form Field | CRM Field | Required |
|----------------|-----------|----------|
| `firstName`, `first_name`, `fname` | `firstName` | ✅ Yes |
| `lastName`, `last_name`, `lname` | `lastName` | ✅ Yes |
| `email` | `email` | ✅ Yes |
| `phoneNumber`, `phone`, `mobile` | `phoneNumber` | ✅ Yes |
| `country` | `country` | ✅ Yes |
| `countryCode`, `phone_code` | `countryCode` | Auto-detected |
| `language` | `language` | Auto-detected |
| `termsAccepted`, `terms` | `termsAccepted` | ✅ Yes |
| `trading_experience` | `trading_experience` | Optional |
| `account_size` | `account_size` | Optional |
| `message`, `notes` | `message` | Optional |

---

## Automatic UTM Tracking

The connector automatically captures:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer`
- `landing_page`
- `user_agent`

These are sent to your CRM for analytics.

---

## Complete Example HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trading Signup</title>
    <style>
        .form-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 40px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px;
        }

        button {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Start Trading Today</h1>
        <p>Join thousands of successful traders</p>

        <form id="signupForm"
              data-crm-endpoint="https://your-api-domain.com"
              data-crm-auto-init>

            <div class="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" required>
            </div>

            <div class="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" required>
            </div>

            <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" required>
            </div>

            <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phoneNumber" placeholder="+60123456789" required>
            </div>

            <div class="form-group">
                <label>Country *</label>
                <select name="country" required>
                    <option value="">Select Country</option>
                    <option value="MY">🇲🇾 Malaysia</option>
                    <option value="TR">🇹🇷 Turkey</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="IT">🇮🇹 Italy</option>
                    <option value="HK">🇭🇰 Hong Kong</option>
                    <option value="SG">🇸🇬 Singapore</option>
                    <option value="TW">🇹🇼 Taiwan</option>
                    <option value="BR">🇧🇷 Brazil</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label>Trading Experience (Optional)</label>
                <select name="trading_experience">
                    <option value="">Select experience level</option>
                    <option value="0-1 year">0-1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                </select>
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" name="termsAccepted" required>
                    I accept the <a href="/terms" target="_blank">terms and conditions</a>
                </label>
            </div>

            <button type="submit">Start Trading</button>
        </form>
    </div>

    <!-- Load the CRM connector -->
    <script src="https://your-domain.com/form-to-crm-connector.js"></script>

    <!-- Optional: Listen to submission events -->
    <script>
        window.addEventListener('crmFormSubmitted', (event) => {
            console.log('Lead submitted:', event.detail);

            // Track conversion with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'sign_up', {
                    method: 'form',
                    value: event.detail.id
                });
            }

            // Track with Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'CompleteRegistration', {
                    value: event.detail.id,
                    currency: 'USD'
                });
            }
        });
    </script>
</body>
</html>
```

---

## What Happens After Submission?

### 1. Lead is Created in CRM
- Stored in `signups` table
- User account created with premium access
- JWT token generated for auto-login

### 2. Automatic Broker Routing
If the user is from a supported country (MY, TR, FR, IT, HK, SG, TW, BR):
- ✅ Lead is automatically sent to Finoglob
- ✅ Language is auto-detected (Malay, Turkish, French, Italian, Chinese, English, Portuguese)
- ✅ User is redirected to appropriate thank you page
- ✅ Tracking is logged in `lead_assignments` table

### 3. CRM Dashboard Updated
- View in `/crm` dashboard
- See all leads under "Leads" tab
- Track broker assignments
- Monitor conversion rates

---

## Customization

### Custom Success Message

```javascript
FormToCRM.handleSuccess = function(response, form) {
    // Your custom success handling
    alert('Thanks for signing up! Check your email.');
    window.location.href = '/thank-you';
};
```

### Custom Error Handling

```javascript
FormToCRM.showError = function(message) {
    // Your custom error UI
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorBox').style.display = 'block';
};
```

### Additional Data

```javascript
FormToCRM.init('signupForm', {
    apiEndpoint: 'https://your-api-domain.com',
    beforeSubmit: function(data) {
        // Add custom data
        data.source = 'landing_page_v2';
        data.campaign_id = '12345';
        return data;
    }
});
```

---

## Testing

### 1. Test Form Submission
```bash
# Open browser console
# Submit form
# Check console for logs:
✅ Form connected to CRM
📤 Sending lead to CRM...
✅ CRM Response: {...}
✅ Lead automatically sent to broker
```

### 2. Test in CRM
1. Go to `/crm/leads`
2. Check if lead appears
3. Verify country and broker assignment

### 3. Test Broker Integration
1. Submit from Malaysia (MY)
2. Check if lead sent to Finoglob
3. Verify redirect to Malay thank you page

---

## Troubleshooting

### Form not submitting?
**Check:**
1. Script is loaded: `<script src="form-to-crm-connector.js"></script>`
2. Form has correct ID: `<form id="signupForm">`
3. All required fields are present
4. API endpoint is correct in `data-crm-endpoint`

### Lead not in CRM?
**Check:**
1. Browser console for errors
2. Network tab shows POST to `/api/signup`
3. Response status is 200
4. Database connection is working

### Lead not sent to broker?
**Check:**
1. Country is one of: MY, TR, FR, IT, HK, SG, TW, BR
2. Finoglob broker exists in CRM
3. `TRADING_CRM_ENABLED="true"` in environment
4. Check `/api/trading-crm/status` for configuration

---

## Multiple Forms on Same Page

```html
<!-- Form 1 -->
<form id="headerForm" data-crm-endpoint="https://api.com" data-crm-auto-init>
  <!-- fields -->
</form>

<!-- Form 2 -->
<form id="footerForm" data-crm-endpoint="https://api.com" data-crm-auto-init>
  <!-- fields -->
</form>

<!-- Both forms will work automatically! -->
```

---

## Support

- **Documentation:** [TRADING_CRM_INTEGRATION.md](TRADING_CRM_INTEGRATION.md)
- **Quick Setup:** [TRADING_CRM_SETUP.md](TRADING_CRM_SETUP.md)
- **API Status:** `GET /api/trading-crm/status`
- **Test Integration:** `POST /api/trading-crm/test`

---

## Summary

**One script connects all your forms to CRM:**
1. ✅ Add script to HTML
2. ✅ Add `data-crm-auto-init` to form
3. ✅ Leads automatically flow: Form → CRM → Broker

**Your preferences are managed in the CRM dashboard at `/crm/brokers`**
