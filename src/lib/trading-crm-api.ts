/**
 * Trading CRM (affiliate365) API Integration
 * Broker: AFF 225X (Finoglob Brand)
 *
 * Handles SSO registration for leads from target countries:
 * MY (Malaysia), TR (Turkey), FR (France), IT (Italy),
 * HK (Hong Kong), SG (Singapore), TW (Taiwan), BR (Brazil)
 *
 * API Version: 4.0 (Bearer token authentication)
 */

import crypto from 'crypto';

// Country to ISO code mapping for target markets
export const TRADING_CRM_COUNTRIES = {
  'MY': { iso: 'MY', name: 'Malaysia', language: 'ms' },
  'TR': { iso: 'TR', name: 'Turkey', language: 'tr' },
  'FR': { iso: 'FR', name: 'France', language: 'fr' },
  'IT': { iso: 'IT', name: 'Italy', language: 'it' },
  'HK': { iso: 'HK', name: 'Hong Kong', language: 'zh' },
  'SG': { iso: 'SG', name: 'Singapore', language: 'en' },
  'TW': { iso: 'TW', name: 'Taiwan', language: 'zh' },
  'BR': { iso: 'BR', name: 'Brazil', language: 'pt' },
} as const;

// Language to thank you page URL mapping
export const THANK_YOU_PAGES = {
  'en': 'https://worldinsight-update.com/thanks.html',
  'pt': 'https://worldinsight-update.com/obrigado.html',
  'fr': 'https://worldinsight-update.com/merci.html',
  'it': 'https://worldinsight-update.com/grazie.html',
  'zh': 'https://worldinsight-update.com/xiexie.html',
  'ms': 'https://worldinsight-update.com/terima-kasih.html',
  'tr': 'https://worldinsight-update.com/kaydolduğunuz.html',
} as const;

export interface TradingCRMConfig {
  apiEndpoint: string;
  username: string;
  password: string;
  promotionCode: string;
  whitelistedIPs?: string[];
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string; // ISO code (MY, TR, FR, etc.)
  language?: string;
  ip?: string;
  campaignId?: string; // source number
  tag?: string; // funnel name
  tag1?: string;
  registrationUrl?: string;
  additionalInfo1?: string;
  additionalInfo2?: string;
  additionalInfo3?: string;
  utmCampaign?: string;
  utmSource?: string;
  affiliateTransactionId?: string; // unique lead ID from your system
}

export interface TradingCRMResponse {
  success: boolean;
  leadId?: string;
  redirectUrl?: string;
  error?: string;
  rawResponse?: any;
}

export class TradingCRMClient {
  private config: TradingCRMConfig;
  private tokenCache: { token: string; expiresAt: number } | null = null;

  constructor(config: TradingCRMConfig) {
    this.config = config;
  }

  /**
   * Check if a country is supported by Trading CRM integration
   */
  static isSupportedCountry(countryIso: string): boolean {
    return countryIso in TRADING_CRM_COUNTRIES;
  }

  /**
   * Get language code for a country
   */
  static getLanguageForCountry(countryIso: string): string {
    const country = TRADING_CRM_COUNTRIES[countryIso as keyof typeof TRADING_CRM_COUNTRIES];
    return country?.language || 'en';
  }

  /**
   * Get thank you page URL based on language
   */
  static getThankYouUrl(language: string): string {
    return THANK_YOU_PAGES[language as keyof typeof THANK_YOU_PAGES] || THANK_YOU_PAGES.en;
  }

  /**
   * Get Bearer token from Trading CRM API (with caching)
   * Token is valid for 23 hours by default
   */
  async authenticate(): Promise<string> {
    // Check if we have a valid cached token
    if (this.tokenCache && this.tokenCache.expiresAt > Date.now()) {
      console.log('✅ Using cached Bearer token');
      return `Bearer ${this.tokenCache.token}`;
    }

    console.log('🔄 Fetching new Bearer token from Trading CRM...');

    try {
      // Get the base URL from the API endpoint
      const baseUrl = this.config.apiEndpoint.replace(/\/accounts\/.*$/, '');

      const response = await fetch(`${baseUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.config.username,
          password: this.config.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.Token) {
        throw new Error('No token received from Trading CRM API');
      }

      // Cache the token (expires in 23 hours by default, we'll refresh at 22 hours)
      const expiresIn = data.ExpiresIn || 82800; // 23 hours in seconds
      this.tokenCache = {
        token: data.Token,
        expiresAt: Date.now() + (expiresIn - 3600) * 1000, // Refresh 1 hour before expiry
      };

      console.log(`✅ Bearer token obtained successfully (expires in ${Math.floor(expiresIn / 3600)} hours)`);
      return `Bearer ${data.Token}`;
    } catch (error) {
      console.error('❌ Failed to get Bearer token:', error);
      throw error;
    }
  }

  /**
   * Format lead payload for Trading CRM API
   */
  private formatPayload(lead: LeadData): any {
    // Auto-detect language if not provided
    const language = lead.language || TradingCRMClient.getLanguageForCountry(lead.country);

    return {
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      affiliateTransactionId: lead.affiliateTransactionId || `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isoCountry: lead.country.toUpperCase(),
      subAffiliate: '', // Optional: can be used for sub-campaigns
      campaignId: lead.campaignId || '', // source number
      tag: lead.tag || '', // funnel name
      tag1: lead.tag1 || '',
      registrationUrl: lead.registrationUrl || '',
      additionalInfo1: lead.additionalInfo1 || '',
      additionalInfo2: lead.additionalInfo2 || '',
      additionalInfo3: lead.additionalInfo3 || '',
      language: language,
      ip: lead.ip || '',
      isVerified: false, // Set to true if email is pre-verified
      promotionCode: this.config.promotionCode,
      password: '', // Leave empty for auto-generated password
      utmCampaign: lead.utmCampaign || '',
      utmSource: lead.utmSource || '',
    };
  }

  /**
   * Send lead to Trading CRM via SSO registration
   */
  async registerLead(lead: LeadData): Promise<TradingCRMResponse> {
    try {
      // Validate country
      if (!TradingCRMClient.isSupportedCountry(lead.country)) {
        return {
          success: false,
          error: `Country ${lead.country} is not supported by Trading CRM integration`,
        };
      }

      // Get Bearer token
      const authHeader = await this.authenticate();

      // Format payload
      const payload = this.formatPayload(lead);

      // Log exact payload being sent (for debugging)
      console.log('📤 Trading CRM Request:', {
        endpoint: this.config.apiEndpoint,
        email: lead.email,
        country: lead.country,
        language: payload.language,
        auth: 'Bearer Token',
        apiVersion: '4.0',
      });
      console.log('📤 Exact Payload (JSON):', JSON.stringify(payload, null, 2));

      let rawResponse;
      let responseData;
      let contentType;

      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Accept': 'application/json',
          'Authorization': authHeader,
          'api-version': '4.0', // Required for API V4
        },
        body: JSON.stringify(payload),
      });

      // Read response body as text first (can only read once)
      rawResponse = await response.text();
      contentType = response.headers.get('content-type');

      // Log raw response for debugging
      console.log('📥 Trading CRM Raw Response:', rawResponse.substring(0, 500));

      // Try to parse as JSON
      try {
        responseData = JSON.parse(rawResponse);
      } catch (parseError) {
        // If not valid JSON, treat as plain text error
        console.log('⚠️ Trading CRM returned non-JSON response');
        responseData = { error: rawResponse };
      }

      // Log full response
      console.log('📥 Trading CRM Response:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        data: responseData,
      });

      if (!response.ok) {
        console.error('❌ Trading CRM API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: responseData?.message || responseData?.error,
          fullResponse: responseData,
        });

        return {
          success: false,
          error: responseData?.message || responseData?.error || `API error: ${response.status}`,
          rawResponse: responseData,
        };
      }

      // Get thank you page URL based on language
      const language = payload.language;
      const redirectUrl = TradingCRMClient.getThankYouUrl(language);

      console.log('✅ Trading CRM lead registered successfully:', {
        leadId: responseData?.accountId || responseData?.id || responseData?.leadId,
        email: lead.email,
        redirectUrl,
      });

      return {
        success: true,
        leadId: responseData?.accountId || responseData?.id || responseData?.leadId,
        redirectUrl,
        rawResponse: responseData,
      };
    } catch (error) {
      console.error('❌ Trading CRM registration error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch (error) {
      console.error('Trading CRM connection test failed:', error);
      return false;
    }
  }

  /**
   * Validate lead data before sending
   */
  static validateLead(lead: LeadData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!lead.firstName || lead.firstName.trim().length === 0) {
      errors.push('First name is required');
    }

    if (!lead.lastName || lead.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    if (!lead.email || !lead.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Valid email is required');
    }

    if (!lead.phone || lead.phone.length < 8) {
      errors.push('Valid phone number is required');
    }

    if (!lead.country || !TradingCRMClient.isSupportedCountry(lead.country)) {
      errors.push(`Country must be one of: ${Object.keys(TRADING_CRM_COUNTRIES).join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory function to create Trading CRM client with environment config
 */
export function createTradingCRMClient(): TradingCRMClient {
  const config: TradingCRMConfig = {
    apiEndpoint: process.env.TRADING_CRM_API_ENDPOINT || 'https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso',
    username: process.env.TRADING_CRM_USERNAME || '225X',
    password: process.env.TRADING_CRM_PASSWORD || '',
    promotionCode: process.env.TRADING_CRM_PROMOTION_CODE || 'defaultAcademiesGroup',
    whitelistedIPs: process.env.TRADING_CRM_WHITELISTED_IPS?.split(','),
  };

  return new TradingCRMClient(config);
}
