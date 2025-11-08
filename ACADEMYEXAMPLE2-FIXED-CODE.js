/**
 * ============================================================================
 * FIXED CODE FOR ACADEMYEXAMPLE2.HTML
 * ============================================================================
 *
 * FIND the handleSignup function in your HTML (around line 4080-4170)
 * REPLACE THE ENTIRE FUNCTION with this code below
 * ============================================================================
 */

async function handleSignup(event) {
    event.preventDefault();

    const submitBtn = document.querySelector('.submit-btn') || document.getElementById('submitBtn');
    const form = document.getElementById('signupForm');

    // Disable submit button
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Processing...';
    }

    try {
        // Get form values
        const firstName = document.getElementById('firstName')?.value.trim() || '';
        const lastName = document.getElementById('lastName')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const countryCode = document.getElementById('countryCode')?.value || '';
        const phoneNumber = document.getElementById('phoneNumber')?.value.trim() || '';
        const country = document.getElementById('country')?.value || '';
        const tradingExperience = document.getElementById('tradingExperience')?.value || null;
        const accountSize = document.getElementById('accountSize')?.value || null;

        // Get detected country (if you have geolocation)
        let detectedCountry = null;
        try {
            const detectedCountryElement = document.querySelector('[data-detected-country]');
            if (detectedCountryElement) {
                detectedCountry = detectedCountryElement.dataset.detectedCountry;
            }
        } catch (e) {
            // Ignore if not found
        }

        // Get current language (if you have language selector)
        let currentLang = 'en';
        try {
            const langElement = document.querySelector('[data-current-lang]');
            if (langElement) {
                currentLang = langElement.dataset.currentLang;
            } else {
                currentLang = localStorage.getItem('preferred_language') || 'en';
            }
        } catch (e) {
            currentLang = 'en';
        }

        // Prepare data for API
        const signupData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            countryCode: countryCode,
            phoneNumber: phoneNumber,
            country: country,
            tradingExperience: tradingExperience,
            accountSize: accountSize,
            termsAccepted: true,
            language: currentLang,
            detectedCountry: detectedCountry
        };

        console.log('📝 Submitting signup via API...');
        console.log('📊 Data:', signupData);

        // ✅ CALL API - This handles EVERYTHING!
        // - Saves to Supabase
        // - Auto-pushes to Trading CRM (for supported countries)
        // - Creates user account
        // - Returns JWT token
        const response = await fetch('https://tradeflow.blog/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData)
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

        // Save token for auto-login
        if (result.token) {
            localStorage.setItem('auth_token', result.token);
            localStorage.setItem('user_data', JSON.stringify(result.user));
            console.log('🔐 User authenticated');
        }

        // Hide form and show success message
        if (form) form.style.display = 'none';

        const successMsg = document.getElementById('successMessage');
        if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.classList.add('active');
        }

        // Optional: Redirect after 3 seconds
        // setTimeout(() => {
        //     window.location.href = '/dashboard';
        // }, 3000);

    } catch (error) {
        console.error('❌ Error submitting form:', error);
        console.error('Full error details:', error.message);

        // Show error to user
        const errorMessage = error.message || 'There was an error submitting your information.';
        alert(`Signup failed: ${errorMessage}\n\nPlease try again or contact support at support@finoglob.com`);

        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 Get Matched with a Mentor';
        }
    }
}


/**
 * ============================================================================
 * IMPORTANT: REMOVE ALL OLD CODE!
 * ============================================================================
 *
 * DELETE these functions if they exist in your HTML:
 * - Any code that calls supabase.from('signups').insert()
 * - Any sendLeadToBroker() function
 * - Any code that tries to push to broker manually
 *
 * The API handles ALL of this automatically now!
 *
 * ============================================================================
 * WHAT TO SEARCH FOR AND DELETE:
 * ============================================================================
 *
 * 1. Search for: "supabase.from('signups').insert"
 *    DELETE that entire block
 *
 * 2. Search for: "function sendLeadToBroker"
 *    DELETE that entire function
 *
 * 3. Search for: "await sendLeadToBroker"
 *    DELETE that line
 *
 * ============================================================================
 */


/**
 * ============================================================================
 * VERIFICATION CHECKLIST:
 * ============================================================================
 *
 * After making these changes, test by:
 *
 * 1. Open: trading.the-future-of-online-trading.online/academyexample2
 * 2. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
 * 3. Open browser console: F12 → Console tab
 * 4. Fill form with test data (use Malaysia as country)
 * 5. Submit
 *
 * EXPECTED CONSOLE OUTPUT:
 * -------------------------
 * 📝 Submitting signup via API...
 * 📊 Data: { firstName: "test", lastName: "test", email: "test@gmail.com", ... }
 * ✅ Lead saved and pushed to broker successfully!
 * 💾 Result: { success: true, id: "...", user: {...}, token: "...", brokerPush: {...} }
 * 🚀 Broker push: { success: true, message: "Lead pushed to Trading CRM" }
 * 🔐 User authenticated
 *
 * EXPECTED IN CRM DASHBOARD:
 * --------------------------
 * - New lead with your test email
 * - Push Status: ✅ 200
 * - Broker: Trading CRM - AFF 225X
 * - Broker Status: sent_to_broker
 * - Click on "✅ 200" to see full API response
 *
 * ============================================================================
 */
