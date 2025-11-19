/**
 * AllCrypto Lead Distribution API Integration
 * Broker: AllCrypto
 * API: yourleads.org (Affiliate API v.2)
 *
 * Handles lead distribution to AllCrypto broker for supported countries:
 * AU (Australia), KR (South Korea), SG (Singapore), HK (Hong Kong),
 * TR (Turkey), NL (Netherlands), BE (Belgium), IT (Italy),
 * ES (Spain), FR (France), CA (Canada)
 */

import { HttpsProxyAgent } from 'https-proxy-agent';

// Country to ISO code mapping for AllCrypto markets
export const ALLCRYPTO_COUNTRIES = {
  'AU': { iso: 'AU', name: 'Australia', language: 'en' },
  'KR': { iso: 'KR', name: 'South Korea', language: 'ko' },
  'SG': { iso: 'SG', name: 'Singapore', language: 'en' },
  'HK': { iso: 'HK', name: 'Hong Kong', language: 'zh' },
  'TR': { iso: 'TR', name: 'Turkey', language: 'tr' },
  'NL': { iso: 'NL', name: 'Netherlands', language: 'nl' },
  'BE': { iso: 'BE', name: 'Belgium', language: 'nl' },
  'IT': { iso: 'IT', name: 'Italy', language: 'it' },
  'ES': { iso: 'ES', name: 'Spain', language: 'es' },
  'FR': { iso: 'FR', name: 'France', language: 'fr' },
  'CA': { iso: 'CA', name: 'Canada', language: 'en' },
} as const;

export interface AllCryptoConfig {
  apiEndpoint: string;
  apiToken: string;
  goalTypeUuidLeadPushed: string; // b73f6b3e-2ed4-4704-8723-e4646d2de6b2
  goalTypeUuidFTD: string; // ce58174a-35a0-4e1c-90b4-c61174ef6b52
  proxyUrl?: string; // Optional HTTP proxy (e.g., http://192.227.249.3:3128)
}

export interface AllCryptoLeadData {
  // Required
  ip: string;

  // Optional
  country_code?: string; // ISO-2 format
  lead_language?: string; // ISO 639-1 format
  is_test?: boolean; // Mark for test leads

  // Lead Profile items
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  phone?: string;

  // Sub tracking fields (aff_sub, aff_sub2, etc.)
  aff_sub?: string;
  aff_sub2?: string;
  aff_sub3?: string;
  aff_sub4?: string;
  aff_sub5?: string; // Use "test" for test leads
}

export interface AllCryptoPushResponse {
  success: boolean;
  lead_uuid?: string; // UUID of newly-created lead in Lead Distribution
  auto_login_url?: string; // URL for lead to log in
  advertiser_uuid?: string; // UUID of advertiser
  advertiser_name?: string; // Advertiser name
  error?: string;
  errorType?: string;
  errorMessage?: string;
  rawResponse?: any;
}

export interface AllCryptoLead {
  uuid: string;
  goalTypeUuid: string;
  goalType: string;
  leadSource: string;
  country: string;
  ip: string;
  countryLanguage: string;
  advertiserUuid: string;
  advertiserName: string;
  externalId: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  isTest: boolean;
  createdAt: string;
  // Additional profile fields
  aff_sub?: string;
  aff_sub2?: string;
  aff_sub3?: string;
  aff_sub4?: string;
  aff_sub5?: string;
}

export interface AllCryptoGetLeadsParams {
  created_from?: string; // Format: "2023-06-22T00:00:00Z"
  created_to?: string; // Format: "2023-06-23T00:00:00Z"
  page?: number; // Default: 1
  per_page?: number; // Default: 20, max: 500
  goal_type_uuid?: string; // UUID of a certain goal type
  is_test?: boolean; // Select test or real leads
}

export class AllCryptoClient {
  private config: AllCryptoConfig;

  constructor(config: AllCryptoConfig) {
    this.config = config;
  }

  /**
   * Get fetch options with proxy support (if configured)
   */
  private getFetchOptions(options: RequestInit = {}): RequestInit {
    // If proxy is configured, create HttpsProxyAgent
    if (this.config.proxyUrl) {
      console.log(`🔄 Using proxy: ${this.config.proxyUrl}`);
      const agent = new HttpsProxyAgent(this.config.proxyUrl);
      return {
        ...options,
        // @ts-ignore - agent is valid for Node.js fetch
        agent,
      };
    }
    return options;
  }

  /**
   * Check if a country is supported by AllCrypto integration
   */
  static isSupportedCountry(countryIso: string): boolean {
    return countryIso.toUpperCase() in ALLCRYPTO_COUNTRIES;
  }

  /**
   * Get language code for a country
   */
  static getLanguageForCountry(countryIso: string): string {
    const country = ALLCRYPTO_COUNTRIES[countryIso.toUpperCase() as keyof typeof ALLCRYPTO_COUNTRIES];
    return country?.language || 'en';
  }

  /**
   * Format lead payload for AllCrypto API
   */
  private formatPayload(lead: AllCryptoLeadData, isTest: boolean = false): any {
    const payload: any = {
      ip: lead.ip,
    };

    // Add optional fields
    if (lead.country_code) payload.country_code = lead.country_code.toUpperCase();
    if (lead.lead_language) payload.lead_language = lead.lead_language;
    if (lead.email) payload.email = lead.email;
    if (lead.first_name) payload.first_name = lead.first_name;
    if (lead.last_name) payload.last_name = lead.last_name;
    if (lead.password) payload.password = lead.password;
    if (lead.phone) payload.phone = lead.phone;

    // Add sub tracking fields
    if (lead.aff_sub) payload.aff_sub = lead.aff_sub;
    if (lead.aff_sub2) payload.aff_sub2 = lead.aff_sub2;
    if (lead.aff_sub3) payload.aff_sub3 = lead.aff_sub3;
    if (lead.aff_sub4) payload.aff_sub4 = lead.aff_sub4;

    // For test leads, add "test" to aff_sub5
    if (isTest) {
      payload.aff_sub5 = 'test';
      payload.is_test = true;
    } else if (lead.aff_sub5) {
      payload.aff_sub5 = lead.aff_sub5;
    }

    return payload;
  }

  /**
   * Push lead to AllCrypto API
   */
  async pushLead(lead: AllCryptoLeadData, isTest: boolean = false): Promise<AllCryptoPushResponse> {
    try {
      // Validate country if provided
      if (lead.country_code && !AllCryptoClient.isSupportedCountry(lead.country_code)) {
        return {
          success: false,
          error: `Country ${lead.country_code} is not supported by AllCrypto integration`,
        };
      }

      // Format payload
      const payload = this.formatPayload(lead, isTest);

      // Log exact payload being sent (for debugging)
      console.log('📤 AllCrypto API Request:', {
        endpoint: this.config.apiEndpoint,
        email: lead.email,
        country: lead.country_code,
        isTest,
      });
      console.log('📤 Exact Payload (JSON):', JSON.stringify(payload, null, 2));

      // Make API request with proxy support
      const response = await fetch(this.config.apiEndpoint, this.getFetchOptions({
        method: 'POST',
        headers: {
          'Authorization': this.config.apiToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }));

      // Log response headers and status
      console.log('📥 AllCrypto API Response Headers:', {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        headers: Object.fromEntries(response.headers.entries()),
      });

      // Read response as text first to capture any HTML error pages
      const responseText = await response.text();

      // Log raw response (first 1000 chars)
      console.log('📥 AllCrypto Raw Response Body (first 1000 chars):', responseText.substring(0, 1000));

      // Try to parse as JSON
      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
        console.log('📥 AllCrypto API Response (Parsed JSON):', {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });
      } catch (parseError) {
        console.error('❌ Failed to parse AllCrypto response as JSON:', {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get('content-type'),
          bodyPreview: responseText.substring(0, 500),
          parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error',
        });

        return {
          success: false,
          error: `Invalid response from AllCrypto API (status ${response.status}): ${responseText.substring(0, 200)}`,
          rawResponse: {
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            body: responseText.substring(0, 1000),
          },
        };
      }

      // Handle success (status 200)
      if (response.ok && responseData.lead_uuid) {
        console.log('✅ AllCrypto lead pushed successfully:', {
          lead_uuid: responseData.lead_uuid,
          advertiser: responseData.advertiser_name,
          auto_login_url: responseData.auto_login_url,
        });

        return {
          success: true,
          lead_uuid: responseData.lead_uuid,
          auto_login_url: responseData.auto_login_url,
          advertiser_uuid: responseData.advertiser_uuid,
          advertiser_name: responseData.advertiser_name,
          rawResponse: responseData,
        };
      }

      // Handle errors (status 400, 401, 422, etc.)
      console.error('❌ AllCrypto API Error:', {
        status: response.status,
        code: responseData.code,
        type: responseData.type,
        message: responseData.message,
        errorType: responseData.data?.errorType,
        errorMessage: responseData.data?.errorMessage,
      });

      return {
        success: false,
        error: responseData.message || responseData.data?.errorMessage || `API error: ${response.status}`,
        errorType: responseData.type || responseData.data?.errorType,
        errorMessage: responseData.data?.errorMessage,
        rawResponse: responseData,
      };

    } catch (error) {
      console.error('❌ AllCrypto push error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get leads from AllCrypto API
   */
  async getLeads(params: AllCryptoGetLeadsParams = {}): Promise<{
    success: boolean;
    leads?: AllCryptoLead[];
    error?: string;
  }> {
    try {
      // Build query string
      const queryParams = new URLSearchParams();

      if (params.created_from) queryParams.append('created_from', params.created_from);
      if (params.created_to) queryParams.append('created_to', params.created_to);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params.goal_type_uuid) queryParams.append('goal_type_uuid', params.goal_type_uuid);
      if (params.is_test !== undefined) queryParams.append('is_test', params.is_test.toString());

      const url = `${this.config.apiEndpoint}?${queryParams.toString()}`;

      console.log('📤 AllCrypto Get Leads Request:', url);

      // Make API request with proxy support
      const response = await fetch(url, this.getFetchOptions({
        method: 'GET',
        headers: {
          'Authorization': this.config.apiToken,
        },
      }));

      // Read response as text first
      const responseText = await response.text();

      // Try to parse as JSON
      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
        console.log('📥 AllCrypto Get Leads Response:', {
          status: response.status,
          count: Array.isArray(responseData) ? responseData.length : 0,
        });
      } catch (parseError) {
        console.error('❌ Failed to parse Get Leads response as JSON:', {
          status: response.status,
          bodyPreview: responseText.substring(0, 500),
        });
        return {
          success: false,
          error: `Invalid response (status ${response.status}): ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && Array.isArray(responseData)) {
        return {
          success: true,
          leads: responseData,
        };
      }

      return {
        success: false,
        error: responseData.message || `API error: ${response.status}`,
      };

    } catch (error) {
      console.error('❌ AllCrypto get leads error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get goal types from AllCrypto API
   */
  async getGoalTypes(): Promise<{
    success: boolean;
    goalTypes?: Array<{ uuid: string; name: string }>;
    error?: string;
  }> {
    try {
      const baseUrl = this.config.apiEndpoint.replace('/leads', '/goal-types');

      console.log('📤 AllCrypto Get Goal Types Request:', baseUrl);

      const response = await fetch(baseUrl, this.getFetchOptions({
        method: 'GET',
        headers: {
          'Authorization': this.config.apiToken,
        },
      }));

      // Read response as text first
      const responseText = await response.text();

      // Try to parse as JSON
      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
        console.log('📥 AllCrypto Get Goal Types Response:', {
          status: response.status,
          data: responseData,
        });
      } catch (parseError) {
        console.error('❌ Failed to parse Goal Types response as JSON:', {
          status: response.status,
          bodyPreview: responseText.substring(0, 500),
        });
        return {
          success: false,
          error: `Invalid response (status ${response.status}): ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && Array.isArray(responseData)) {
        return {
          success: true,
          goalTypes: responseData,
        };
      }

      return {
        success: false,
        error: responseData.message || `API error: ${response.status}`,
      };

    } catch (error) {
      console.error('❌ AllCrypto get goal types error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get lead status by UUID
   */
  async getLeadStatus(leadUuid: string): Promise<{
    success: boolean;
    lead?: AllCryptoLead;
    error?: string;
  }> {
    try {
      console.log('🔍 Searching for AllCrypto lead:', leadUuid);

      // Get leads filtered by created date range around the lead
      const today = new Date();
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Try searching for test leads first (since all our leads are marked as test during integration)
      console.log('📋 Attempting to fetch test leads from last 30 days...');

      // Format dates for AllCrypto API (YYYY-MM-DDTHH:mm:ssZ without milliseconds)
      const formatDate = (date: Date) => {
        return date.toISOString().split('.')[0] + 'Z';
      };

      let result = await this.getLeads({
        created_from: formatDate(monthAgo),
        created_to: formatDate(today),
        per_page: 500, // Max allowed by AllCrypto
        is_test: true, // Search test leads specifically
      });

      console.log('📊 AllCrypto returned', result.leads?.length || 0, 'test leads');

      // If not found in test leads, try all leads
      if (result.success && result.leads) {
        let lead = result.leads.find(l => l.uuid === leadUuid);

        if (lead) {
          console.log('✅ Found lead in test leads:', lead.uuid);
          return { success: true, lead };
        }
      }

      // Fallback: Try all leads (not just test)
      console.log('📋 Lead not found in test leads, searching all leads...');
      result = await this.getLeads({
        created_from: formatDate(monthAgo),
        created_to: formatDate(today),
        per_page: 500, // Max allowed by AllCrypto
        // is_test not specified - get all leads
      });

      console.log('📊 AllCrypto returned', result.leads?.length || 0, 'total leads');

      if (!result.success || !result.leads) {
        return {
          success: false,
          error: result.error || 'Failed to fetch leads from AllCrypto',
        };
      }

      // Find the lead by UUID
      const lead = result.leads.find(l => l.uuid === leadUuid);

      if (!lead) {
        console.error('❌ Lead UUID not found in AllCrypto system. UUIDs available:',
          result.leads.slice(0, 10).map(l => l.uuid));
        return {
          success: false,
          error: `Lead with UUID ${leadUuid} not found in AllCrypto system. This may be because: (1) Test rotation is CLOSED, (2) Lead was rejected, or (3) There's a delay in AllCrypto's indexing.`,
        };
      }

      console.log('✅ Found lead in all leads:', lead.uuid);
      return {
        success: true,
        lead,
      };

    } catch (error) {
      console.error('❌ AllCrypto get lead status error:', error);
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
      const result = await this.getGoalTypes();
      return result.success;
    } catch (error) {
      console.error('AllCrypto connection test failed:', error);
      return false;
    }
  }

  /**
   * Validate lead data before sending
   */
  static validateLead(lead: AllCryptoLeadData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // IP is required
    if (!lead.ip || lead.ip.trim().length === 0) {
      errors.push('IP address is required');
    }

    // Validate email if provided
    if (lead.email && !lead.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Valid email format is required');
    }

    // Validate country if provided
    if (lead.country_code && !AllCryptoClient.isSupportedCountry(lead.country_code)) {
      errors.push(`Country must be one of: ${Object.keys(ALLCRYPTO_COUNTRIES).join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory function to create AllCrypto client with environment config
 */
export function createAllCryptoClient(): AllCryptoClient {
  const config: AllCryptoConfig = {
    apiEndpoint: process.env.ALLCRYPTO_API_ENDPOINT || 'https://yourleads.org/api/affiliates/v2/leads',
    apiToken: process.env.ALLCRYPTO_API_TOKEN || 'da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn',
    goalTypeUuidLeadPushed: process.env.ALLCRYPTO_GOAL_TYPE_LEAD_PUSHED || 'b73f6b3e-2ed4-4704-8723-e4646d2de6b2',
    goalTypeUuidFTD: process.env.ALLCRYPTO_GOAL_TYPE_FTD || 'ce58174a-35a0-4e1c-90b4-c61174ef6b52',
    proxyUrl: process.env.ALLCRYPTO_PROXY_URL, // Optional proxy (e.g., http://192.227.249.3:3128)
  };

  return new AllCryptoClient(config);
}
