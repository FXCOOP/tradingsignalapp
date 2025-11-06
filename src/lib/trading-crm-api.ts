/**
 * Trading CRM (affiliate365) API Integration
 * Broker: AFF 225X
 *
 * Handles SSO registration for leads from target countries:
 * MY (Malaysia), TR (Turkey), FR (France), IT (Italy),
 * HK (Hong Kong), SG (Singapore), TW (Taiwan), BR (Brazil)
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
  private bearerToken: string | null = null;
  private tokenExpiry: Date | null = null;

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
   * Authenticate and get bearer token
   * Trading CRM uses Basic Auth to get Bearer token
   */
  async authenticate(): Promise<string> {
    // Check if we have a valid cached token
    if (this.bearerToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.bearerToken;
    }

    try {
      // Create Basic Auth header
      const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64');

      // Note: You may need to adjust the auth endpoint based on Trading CRM documentation
      // This is a placeholder - replace with actual token endpoint if different
      const authEndpoint = this.config.apiEndpoint.replace('/accounts/registrationwithsso', '/auth/token');

      const response = await fetch(authEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.bearerToken = data.token || data.access_token;

      // Set token expiry (default 1 hour if not provided)
      const expiryMinutes = data.expires_in ? data.expires_in / 60 : 60;
      this.tokenExpiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

      return this.bearerToken!;
    } catch (error) {
      console.error('Trading CRM authentication error:', error);
      throw new Error('Failed to authenticate with Trading CRM API');
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

      // Get bearer token
      const token = await this.authenticate();

      // Format payload
      const payload = this.formatPayload(lead);

      console.log('Sending lead to Trading CRM:', {
        email: lead.email,
        country: lead.country,
        endpoint: this.config.apiEndpoint,
      });

      // Send request
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Trading CRM API error:', {
          status: response.status,
          data: responseData,
        });

        return {
          success: false,
          error: responseData?.message || `API error: ${response.status}`,
          rawResponse: responseData,
        };
      }

      // Get thank you page URL based on language
      const language = payload.language;
      const redirectUrl = TradingCRMClient.getThankYouUrl(language);

      console.log('Trading CRM lead registered successfully:', {
        leadId: responseData?.id || responseData?.leadId,
        email: lead.email,
        redirectUrl,
      });

      return {
        success: true,
        leadId: responseData?.id || responseData?.leadId || responseData?.accountId,
        redirectUrl,
        rawResponse: responseData,
      };
    } catch (error) {
      console.error('Trading CRM registration error:', error);
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
