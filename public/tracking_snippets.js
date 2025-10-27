/**
 * TradeFlow Tracking Snippets
 * Captures Google Ads Click IDs (GCLID, GBRAID, WBRAID) and pushes conversion events to GTM dataLayer
 *
 * Features:
 * - Automatic GCLID/GBRAID/WBRAID capture from URL parameters
 * - LocalStorage persistence for attribution across sessions
 * - Cookie fallback for cross-domain tracking
 * - dataLayer event pushing for register_submit and ftd (First Time Deposit)
 * - Enhanced Conversions support with user data hashing
 */

(function() {
  'use strict';

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  /**
   * Get URL parameter by name
   */
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Get or set click ID from URL parameters and storage
   */
  function captureClickId() {
    // Check for click IDs in URL parameters
    const gclid = getUrlParameter('gclid');
    const gbraid = getUrlParameter('gbraid');
    const wbraid = getUrlParameter('wbraid');

    const clickId = gclid || gbraid || wbraid;

    if (clickId) {
      try {
        // Store in localStorage (90 day persistence)
        localStorage.setItem('click_id', clickId);
        localStorage.setItem('click_id_timestamp', Date.now().toString());

        // Also store in cookie for cross-domain tracking (90 days)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 90);
        document.cookie = `click_id=${clickId}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

        console.log('[TradeFlow Tracking] Click ID captured:', clickId);
        return clickId;
      } catch (e) {
        console.error('[TradeFlow Tracking] Error storing click ID:', e);
      }
    }

    // Try to retrieve from localStorage
    try {
      const storedId = localStorage.getItem('click_id');
      const timestamp = localStorage.getItem('click_id_timestamp');

      // Check if stored ID is still valid (within 90 days)
      if (storedId && timestamp) {
        const age = Date.now() - parseInt(timestamp);
        const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;

        if (age < ninetyDaysInMs) {
          return storedId;
        } else {
          // Expired, remove it
          localStorage.removeItem('click_id');
          localStorage.removeItem('click_id_timestamp');
        }
      }
    } catch (e) {
      console.error('[TradeFlow Tracking] Error retrieving click ID from storage:', e);
    }

    // Fallback to cookie
    try {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'click_id') {
          return value;
        }
      }
    } catch (e) {
      console.error('[TradeFlow Tracking] Error retrieving click ID from cookie:', e);
    }

    return null;
  }

  /**
   * Simple SHA-256 hash function for email/phone (for Enhanced Conversions)
   */
  async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Normalize and hash user data for Enhanced Conversions
   */
  async function hashUserData(email, phone) {
    const userData = {};

    if (email) {
      // Normalize email: lowercase, trim whitespace
      const normalizedEmail = email.toLowerCase().trim();
      userData.email = await sha256(normalizedEmail);
    }

    if (phone) {
      // Normalize phone: remove spaces, dashes, parentheses
      const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '');
      userData.phone_number = await sha256(normalizedPhone);
    }

    return userData;
  }

  /**
   * Push register_submit event to dataLayer
   * Call this when user completes registration form
   *
   * @param {Object} userData - User data object
   * @param {string} userData.email - User email (will be hashed automatically)
   * @param {string} userData.phone - User phone (optional, will be hashed)
   * @param {string} userData.firstName - User first name (optional)
   * @param {string} userData.lastName - User last name (optional)
   */
  window.trackRegisterSubmit = async function(userData = {}) {
    const clickId = captureClickId();

    // Hash sensitive user data for Enhanced Conversions
    const hashedData = userData.email || userData.phone
      ? await hashUserData(userData.email, userData.phone)
      : {};

    const eventData = {
      event: 'register_submit',
      click_id: clickId,
      user_data: hashedData,
      timestamp: new Date().toISOString()
    };

    // Add non-sensitive user data
    if (userData.firstName) eventData.first_name = userData.firstName;
    if (userData.lastName) eventData.last_name = userData.lastName;

    window.dataLayer.push(eventData);

    console.log('[TradeFlow Tracking] register_submit event pushed', {
      click_id: clickId,
      has_user_data: Object.keys(hashedData).length > 0
    });

    return eventData;
  };

  /**
   * Push ftd (First Time Deposit) event to dataLayer
   * Call this when user makes their first deposit
   *
   * @param {Object} depositData - Deposit data object
   * @param {number} depositData.value - Deposit amount
   * @param {string} depositData.currency - Currency code (e.g., 'USD', 'EUR')
   * @param {string} depositData.transactionId - Unique transaction ID
   * @param {Object} depositData.userData - User data (optional, for Enhanced Conversions)
   */
  window.trackFTD = async function(depositData = {}) {
    const clickId = captureClickId();

    // Hash sensitive user data if provided
    const hashedData = depositData.userData && (depositData.userData.email || depositData.userData.phone)
      ? await hashUserData(depositData.userData.email, depositData.userData.phone)
      : {};

    const eventData = {
      event: 'ftd',
      click_id: clickId,
      deposit_value: depositData.value || 0,
      currency: depositData.currency || 'USD',
      transaction_id: depositData.transactionId || '',
      user_data: hashedData,
      timestamp: new Date().toISOString()
    };

    window.dataLayer.push(eventData);

    console.log('[TradeFlow Tracking] ftd event pushed', {
      click_id: clickId,
      value: depositData.value,
      currency: depositData.currency,
      has_user_data: Object.keys(hashedData).length > 0
    });

    return eventData;
  };

  /**
   * Generic event tracking function
   * Use for any custom events
   *
   * @param {string} eventName - Name of the event
   * @param {Object} eventParams - Event parameters
   */
  window.trackEvent = function(eventName, eventParams = {}) {
    const clickId = captureClickId();

    const eventData = {
      event: eventName,
      click_id: clickId,
      timestamp: new Date().toISOString(),
      ...eventParams
    };

    window.dataLayer.push(eventData);

    console.log(`[TradeFlow Tracking] ${eventName} event pushed`, eventData);

    return eventData;
  };

  /**
   * Track partner outbound clicks (e.g., Exness affiliate links)
   *
   * @param {string} partner - Partner name (e.g., 'exness')
   * @param {string} url - Destination URL
   */
  window.trackPartnerClick = function(partner, url) {
    return window.trackEvent('partner_click', {
      partner_name: partner,
      destination_url: url
    });
  };

  // Auto-capture click ID on page load
  try {
    const initialClickId = captureClickId();
    if (initialClickId) {
      console.log('[TradeFlow Tracking] Initialized with click ID:', initialClickId);
    }
  } catch (e) {
    console.error('[TradeFlow Tracking] Initialization error:', e);
  }

  // Expose click ID getter for GTM variable
  window.getClickId = captureClickId;

  console.log('[TradeFlow Tracking] Tracking snippets loaded successfully');
})();

/**
 * USAGE EXAMPLES:
 *
 * 1. Track Registration:
 *    await trackRegisterSubmit({
 *      email: 'user@example.com',
 *      phone: '+1234567890',
 *      firstName: 'John',
 *      lastName: 'Doe'
 *    });
 *
 * 2. Track First Time Deposit:
 *    await trackFTD({
 *      value: 100,
 *      currency: 'USD',
 *      transactionId: 'TXN123456',
 *      userData: {
 *        email: 'user@example.com'
 *      }
 *    });
 *
 * 3. Track Partner Click:
 *    trackPartnerClick('exness', 'https://partner-link.com');
 *
 * 4. Track Custom Event:
 *    trackEvent('custom_event_name', { param1: 'value1', param2: 'value2' });
 */
