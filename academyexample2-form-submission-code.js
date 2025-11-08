/**
 * READY-TO-USE: Form Submission Code for academyexample2.html
 *
 * This code replaces the direct Supabase insertion with an API call
 * that automatically pushes leads to Trading CRM broker.
 *
 * FIND THIS IN YOUR HTML FILE AND REPLACE IT:
 */

// ============================================
// FORM SUBMIT EVENT HANDLER
// ============================================

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
        // Get form data
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const countryCode = document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const country = document.getElementById('country').value;
        const tradingExperience = document.getElementById('tradingExperience')?.value || null;
        const accountSize = document.getElementById('accountSize')?.value || null;

        // Prepare signup data
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
            language: currentLang || 'en', // Current selected language
            detectedCountry: detectedCountry || null // Auto-detected country (if available)
        };

        console.log('📝 Submitting signup via API...');
        console.log('📊 Data:', signupData);

        // ✅ CALL API ENDPOINT (auto-pushes to broker!)
        const response = await fetch('/api/signup', {
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

        console.log('✅ Lead saved and pushed to broker successfully!');
        console.log('💾 Result:', result);
        console.log('🚀 Broker push result:', result.brokerPush);

        // Success! Show success message
        showSuccessMessage();

        // Optional: Store user token for auto-login
        if (result.token) {
            localStorage.setItem('auth_token', result.token);
            localStorage.setItem('user_data', JSON.stringify(result.user));
            console.log('🔐 User authenticated automatically');
        }

        // Optional: Redirect user to dashboard or broker
        // setTimeout(() => {
        //     window.location.href = '/dashboard';
        // }, 2000);

    } catch (error) {
        console.error('❌ Signup error:', error);

        // Show error message to user
        alert('Signup failed: ' + error.message);

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Started';
    }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function showSuccessMessage() {
    // Hide form, show success message
    const formContainer = document.getElementById('signupForm');
    const successContainer = document.getElementById('successMessage');

    if (formContainer) formContainer.style.display = 'none';
    if (successContainer) successContainer.style.display = 'block';
}

/**
 * WHAT THIS CODE DOES:
 *
 * 1. ✅ Collects all form data (first name, last name, email, phone, country, etc.)
 * 2. ✅ Calls /api/signup endpoint (NOT direct Supabase insert)
 * 3. ✅ API automatically:
 *    - Saves to Supabase signups table
 *    - Checks if country is supported (MY, TR, FR, IT, HK, SG, TW, BR)
 *    - Pushes lead to Trading CRM broker
 *    - Stores push status code (200, 400, 500)
 *    - Stores full API response as JSON
 *    - Creates user account with premium access
 *    - Returns JWT token for auto-login
 * 4. ✅ Shows success message to user
 * 5. ✅ Logs detailed information to console
 *
 * CONSOLE OUTPUT YOU'LL SEE:
 *
 * 📝 Submitting signup via API...
 * 📊 Data: { firstName: "John", lastName: "Doe", ... }
 * ✅ Lead saved and pushed to broker successfully!
 * 💾 Result: { success: true, user: {...}, token: "..." }
 * 🚀 Broker push result: { success: true, message: "Lead pushed to Trading CRM" }
 * 🔐 User authenticated automatically
 *
 * IN THE CRM DASHBOARD:
 *
 * - Email column: john.doe@example.com
 * - Push Status column: ✅ 200 (clickable)
 * - Broker Status column: sent_to_broker (clickable)
 * - Click on "✅ 200" to see full API response in modal
 */
