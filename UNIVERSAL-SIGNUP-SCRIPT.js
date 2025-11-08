/**
 * ============================================================================
 * UNIVERSAL SIGNUP SCRIPT FOR ALL LANDING PAGES
 * ============================================================================
 *
 * HOW IT WORKS:
 * 1. User fills form on ANY landing page
 * 2. Script calls API at tradeflow.blog/api/signup
 * 3. API saves to Supabase
 * 4. API auto-pushes to Trading CRM (for supported countries: MY, TR, FR, IT, HK, SG, TW, BR)
 * 5. Done! Shows ✅ 200 in CRM
 *
 * COPY THIS ENTIRE SCRIPT INTO YOUR HTML FILE
 * ============================================================================
 */

// ============================================================================
// STEP 1: ADD THIS TO YOUR HTML <head> SECTION
// ============================================================================
/*
<!-- NO SUPABASE NEEDED! API handles everything -->
<script>
    const API_ENDPOINT = 'https://tradeflow.blog/api/signup';
</script>
*/


// ============================================================================
// STEP 2: YOUR FORM HTML STRUCTURE
// ============================================================================
/*
<form id="signupForm" onsubmit="handleSignup(event)">
    <input type="text" id="firstName" name="firstName" required>
    <input type="text" id="lastName" name="lastName" required>
    <input type="email" id="email" name="email" required>
    <select id="countryCode" name="countryCode" required>
        <option value="+60">+60 Malaysia</option>
        <option value="+90">+90 Turkey</option>
        <!-- Add more country codes -->
    </select>
    <input type="tel" id="phoneNumber" name="phoneNumber" required>
    <select id="country" name="country" required>
        <option value="Malaysia">Malaysia</option>
        <option value="Turkey">Turkey</option>
        <!-- Add more countries -->
    </select>
    <select id="tradingExperience" name="tradingExperience">
        <option value="">Select experience</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
    </select>
    <select id="accountSize" name="accountSize">
        <option value="">Select account size</option>
        <option value="0-1000">$0 - $1,000</option>
        <option value="1000-5000">$1,000 - $5,000</option>
        <option value="5000+">$5,000+</option>
    </select>
    <button type="submit" id="submitBtn">Submit</button>
</form>

<div id="successMessage" style="display: none;">
    <h2>✅ Success!</h2>
    <p>Your account has been created and you've been matched with a broker!</p>
</div>
*/


// ============================================================================
// STEP 3: ADD THIS JAVASCRIPT TO YOUR HTML (before </body>)
// ============================================================================

/**
 * Handle form submission and auto-push to broker
 */
async function handleSignup(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('signupForm');

    // Disable submit button
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Processing...';
    }

    try {
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            countryCode: document.getElementById('countryCode').value,
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            country: document.getElementById('country').value,
            tradingExperience: document.getElementById('tradingExperience')?.value || null,
            accountSize: document.getElementById('accountSize')?.value || null,
            termsAccepted: true,
            language: getCurrentLanguage() || 'en', // Your language detection function
            detectedCountry: getDetectedCountry() || null // Your country detection function
        };

        console.log('📝 Submitting signup via API...');
        console.log('📊 Data:', formData);

        // ✅ CALL API - This handles EVERYTHING automatically!
        const response = await fetch('https://tradeflow.blog/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('❌ API error:', result);
            throw new Error(result.error || 'Signup failed');
        }

        // ✅ SUCCESS!
        console.log('✅ Lead saved and pushed to broker successfully!');
        console.log('💾 Result:', result);
        console.log('🚀 Broker push:', result.brokerPush);

        // Show success message
        if (form) form.style.display = 'none';
        const successMsg = document.getElementById('successMessage');
        if (successMsg) successMsg.style.display = 'block';

        // Optional: Save token for auto-login
        if (result.token) {
            localStorage.setItem('auth_token', result.token);
            localStorage.setItem('user_data', JSON.stringify(result.user));
            console.log('🔐 User authenticated');
        }

        // Optional: Redirect after 2 seconds
        // setTimeout(() => {
        //     window.location.href = '/dashboard';
        // }, 2000);

    } catch (error) {
        console.error('❌ Signup error:', error);

        // Show error to user
        alert('There was an error submitting your information. Please try again or contact support at support@finoglob.com');

        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    }
}

/**
 * Get current language (customize based on your implementation)
 */
function getCurrentLanguage() {
    // Option 1: From your language selector
    const langElement = document.querySelector('[data-current-lang]');
    if (langElement) return langElement.dataset.currentLang;

    // Option 2: From localStorage
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang) return savedLang;

    // Option 3: From browser
    return navigator.language.split('-')[0] || 'en';
}

/**
 * Get detected country (customize based on your implementation)
 */
function getDetectedCountry() {
    // Option 1: From your geolocation detection
    const countryElement = document.querySelector('[data-detected-country]');
    if (countryElement) return countryElement.dataset.detectedCountry;

    // Option 2: From localStorage
    return localStorage.getItem('detected_country') || null;
}


// ============================================================================
// THAT'S IT! NO OTHER CODE NEEDED!
// ============================================================================

/**
 * WHAT HAPPENS WHEN FORM IS SUBMITTED:
 *
 * 1. ✅ Form data collected
 * 2. ✅ Sent to API at https://tradeflow.blog/api/signup
 * 3. ✅ API validates the data
 * 4. ✅ API saves to Supabase signups table
 * 5. ✅ API checks if country is supported (MY, TR, FR, IT, HK, SG, TW, BR)
 * 6. ✅ API AUTOMATICALLY pushes to Trading CRM broker
 * 7. ✅ API stores push status code (200, 400, 500)
 * 8. ✅ API stores full JSON response
 * 9. ✅ API creates user account with premium access
 * 10. ✅ API returns JWT token for auto-login
 * 11. ✅ Success message shown to user
 * 12. ✅ Lead appears in CRM with "✅ 200" status
 *
 * ALL AUTOMATIC! NO MANUAL PUSHING NEEDED!
 */


// ============================================================================
// CONSOLE OUTPUT YOU'LL SEE:
// ============================================================================
/*
📝 Submitting signup via API...
📊 Data: { firstName: "John", lastName: "Doe", email: "john@example.com", ... }
✅ Lead saved and pushed to broker successfully!
💾 Result: { success: true, id: "...", user: {...}, token: "...", brokerPush: { success: true, message: "Lead pushed to Trading CRM" } }
🚀 Broker push: { success: true, message: "Lead pushed to Trading CRM" }
🔐 User authenticated
*/


// ============================================================================
// IN YOUR CRM DASHBOARD YOU'LL SEE:
// ============================================================================
/*
Email: john@example.com
Push Status: ✅ 200 (clickable)
Broker Status: sent_to_broker
Broker: Trading CRM - AFF 225X
Created: 11/7/2025

Click on "✅ 200" to see full API response:
{
  "success": true,
  "leadId": "ABC123",
  "redirectUrl": "https://tradingcrm.com/...",
  "timestamp": "2025-11-07T...",
  "message": "Lead successfully sent to Trading CRM"
}
*/


// ============================================================================
// SUPPORTED COUNTRIES (Auto-push enabled):
// ============================================================================
/*
✅ MY - Malaysia
✅ TR - Turkey
✅ FR - France
✅ IT - Italy
✅ HK - Hong Kong
✅ SG - Singapore
✅ TW - Taiwan
✅ BR - Brazil

For other countries, lead is saved to CRM but not auto-pushed to Trading CRM.
You can push manually from CRM by clicking "Assign" button.
*/


// ============================================================================
// TROUBLESHOOTING:
// ============================================================================

/**
 * Problem: Form submits but shows error
 * Solution: Check browser console for error details
 *
 * Problem: Shows "Failed to fetch"
 * Solution: Make sure API URL is correct (https://tradeflow.blog/api/signup)
 *
 * Problem: CORS error
 * Solution: API already has CORS headers for all domains - should work!
 *
 * Problem: Lead appears in CRM but no push status
 * Solution: Check if country is in supported list above
 *
 * Problem: Push status shows "❌ 500"
 * Solution: Click on it to see error details. Usually Trading CRM API issue.
 */
