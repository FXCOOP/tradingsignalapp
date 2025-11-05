/**
 * Universal Form to CRM Connector
 *
 * This script connects any landing page form to your CRM system
 * Automatically routes leads to brokers based on your preferences
 *
 * USAGE:
 * 1. Include this script in your landing page HTML:
 *    <script src="form-to-crm-connector.js"></script>
 *
 * 2. Add data attributes to your form:
 *    <form id="signupForm" data-crm-endpoint="https://your-domain.com">
 *
 * 3. Initialize:
 *    FormToCRM.init('signupForm');
 */

const FormToCRM = {
    // Configuration
    config: {
        apiEndpoint: null, // Set via data-crm-endpoint or init()
        timeout: 30000, // 30 seconds
        retryAttempts: 2,
    },

    /**
     * Initialize form connector
     * @param {string} formId - Form element ID
     * @param {object} options - Configuration options
     */
    init(formId, options = {}) {
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`Form with ID "${formId}" not found`);
            return;
        }

        // Get API endpoint from data attribute or options
        this.config.apiEndpoint =
            form.dataset.crmEndpoint ||
            options.apiEndpoint ||
            window.location.origin;

        // Set up form submission
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));

        console.log('✅ Form connected to CRM:', {
            formId,
            endpoint: this.config.apiEndpoint
        });
    },

    /**
     * Handle form submission
     */
    async handleSubmit(event, form) {
        event.preventDefault();

        // Get submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.innerHTML;

        try {
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '⏳ Processing...';
            }

            // Extract form data
            const formData = this.extractFormData(form);

            // Validate data
            const validation = this.validateFormData(formData);
            if (!validation.valid) {
                this.showError(validation.errors.join(', '));
                return;
            }

            // Add tracking data
            const leadData = {
                ...formData,
                // UTM parameters
                utm_source: this.getUrlParam('utm_source'),
                utm_medium: this.getUrlParam('utm_medium'),
                utm_campaign: this.getUrlParam('utm_campaign'),
                utm_content: this.getUrlParam('utm_content'),
                utm_term: this.getUrlParam('utm_term'),
                // Tracking
                referrer: document.referrer,
                landing_page: window.location.href,
                user_agent: navigator.userAgent,
                // Timestamps
                submitted_at: new Date().toISOString(),
            };

            console.log('📤 Sending lead to CRM...', leadData);

            // Submit to CRM
            const response = await this.submitToCRM(leadData);

            console.log('✅ CRM Response:', response);

            // Check if broker integration happened
            if (response.brokerIntegration && response.brokerIntegration.sent) {
                console.log('✅ Lead automatically sent to broker:', response.brokerIntegration.leadId);
            }

            // Handle success
            this.handleSuccess(response, form);

        } catch (error) {
            console.error('❌ Form submission error:', error);
            this.showError(error.message || 'There was an error submitting your information. Please try again.');
        } finally {
            // Re-enable submit button
            if (submitBtn && originalText) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    },

    /**
     * Extract data from form
     */
    extractFormData(form) {
        const formData = new FormData(form);
        const data = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Map common field names to CRM format
        return {
            firstName: data.firstName || data.first_name || data.fname || data.name?.split(' ')[0],
            lastName: data.lastName || data.last_name || data.lname || data.name?.split(' ')[1] || '',
            email: data.email,
            countryCode: data.countryCode || data.country_code || data.phone_code || this.extractCountryCode(data.phone),
            phoneNumber: data.phoneNumber || data.phone_number || data.phone || data.mobile,
            country: data.country,
            language: data.language || this.detectLanguage(),
            termsAccepted: data.termsAccepted === 'on' || data.terms === 'on' || data.termsAccepted === true,
            // Optional fields
            trading_experience: data.trading_experience || data.experience,
            account_size: data.account_size || data.accountSize,
            message: data.message || data.notes || data.comments,
        };
    },

    /**
     * Validate form data
     */
    validateFormData(data) {
        const errors = [];

        if (!data.firstName || data.firstName.trim().length === 0) {
            errors.push('First name is required');
        }

        if (!data.lastName || data.lastName.trim().length === 0) {
            errors.push('Last name is required');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Valid email is required');
        }

        if (!data.phoneNumber || data.phoneNumber.length < 8) {
            errors.push('Valid phone number is required');
        }

        if (!data.country) {
            errors.push('Country is required');
        }

        if (!data.termsAccepted) {
            errors.push('You must accept the terms and conditions');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    },

    /**
     * Submit to CRM API
     */
    async submitToCRM(data) {
        const url = `${this.config.apiEndpoint}/api/signup`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || error.message || 'Failed to submit form');
        }

        return await response.json();
    },

    /**
     * Handle successful submission
     */
    handleSuccess(response, form) {
        // Hide form
        form.style.display = 'none';

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'crm-success-message';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #f0fdf4; border: 2px solid #86efac; border-radius: 16px;">
                <div style="font-size: 64px; margin-bottom: 16px;">✅</div>
                <h3 style="font-size: 28px; color: #059669; margin-bottom: 12px; font-weight: 700;">Thank You!</h3>
                <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
                    Your information has been successfully submitted. Our team will contact you shortly.
                </p>
                ${response.brokerIntegration?.redirectUrl ? `
                    <a href="${response.brokerIntegration.redirectUrl}"
                       style="display: inline-block; margin-top: 24px; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; text-decoration: none; border-radius: 10px; font-weight: 700; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);">
                        Continue to Next Step →
                    </a>
                ` : ''}
            </div>
        `;

        form.parentElement.insertBefore(successMessage, form);

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('crmFormSubmitted', {
            detail: response
        }));

        // Auto-redirect if broker provided URL
        if (response.brokerIntegration?.redirectUrl) {
            setTimeout(() => {
                window.location.href = response.brokerIntegration.redirectUrl;
            }, 3000);
        }
    },

    /**
     * Show error message
     */
    showError(message) {
        alert(message);
        // You can customize this to show a nicer error UI
    },

    /**
     * Utility: Validate email
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Utility: Extract country code from phone
     */
    extractCountryCode(phone) {
        if (!phone) return '';
        const match = phone.match(/^\+?(\d{1,4})/);
        return match ? `+${match[1]}` : '';
    },

    /**
     * Utility: Get URL parameter
     */
    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || null;
    },

    /**
     * Utility: Detect language from browser
     */
    detectLanguage() {
        return navigator.language || navigator.userLanguage || 'en';
    }
};

// Auto-initialize if data-crm-auto-init attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-crm-auto-init]');
    forms.forEach(form => {
        FormToCRM.init(form.id);
    });
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormToCRM;
}
