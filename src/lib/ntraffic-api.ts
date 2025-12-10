/**
 * N_Traffic Lead Distribution API Integration
 * Broker: N_Traffic
 * API: ntraffic-api.ink
 *
 * Handles lead distribution to N_Traffic broker for Italian leads (IT)
 *
 * API Documentation:
 * - Endpoint: https://ntraffic-api.ink/api/v2/leads
 * - Authentication: Api-Key header
 * - IP whitelisting required
 */

// Supported countries for N_Traffic
export const NTRAFFIC_COUNTRIES = {
  'IT': { iso: 'IT', name: 'Italy', language: 'it', locale: 'it_IT' },
} as const;

export interface NTrafficConfig {
  apiEndpoint: string;
  apiKey: string;
}

export interface NTrafficLeadData {
  // Required fields
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  ip: string;
  phone: string;

  // Optional fields
  areaCode?: string; // numeric - area code of the phone
  custom1?: string;
  custom2?: string;
  custom3?: string;
  custom4?: string;
  custom5?: string;
  comment?: string;
  offerName?: string;
  offerWebsite?: string;
  locale?: string; // e.g., "it_IT" for Italian
}

export interface NTrafficPushResponse {
  success: boolean;
  leadRequestId?: string; // Store this to match registration to lead/conversions
  redirectUrl?: string; // Auto-login URL
  advertiserName?: string;
  advertiserLogo?: string;
  offerName?: string;
  offerHash?: string;
  error?: string;
  errorType?: string;
  rawResponse?: any;
  httpCode?: number;
}

export interface NTrafficLeadResponse {
  details: {
    leadRequest: {
      ID: string; // Case sensitive - unique identifier
    };
    advertiser?: {
      name: string;
      logo: string;
    };
    offer?: {
      ID: string;
      name: string;
      hash: string;
    };
    postbacks?: any[];
    redirect?: {
      url: string;
    };
  };
  message: string | null;
  server: {
    date: string;
    httpCode: number;
    executionTime: number;
  };
}

export interface NTrafficLeadRecord {
  campaignName: string;
  countryName: string;
  custom1: string | null;
  custom2: string | null;
  custom3: string | null;
  custom4: string | null;
  custom5: string | null;
  platform: string;
  browser: string;
  signupDate: string;
  isSmartClick: string;
  customerID: string;
  countryCode: string;
  saleStatus: string | null;
  campaignHash: string;
  leadRequestIDEncoded: string;
  hasFTD: number;
}

export interface NTrafficGetLeadsParams {
  fromDate: string; // YYYY-MM-DD HH:mm:ss format
  toDate: string; // YYYY-MM-DD HH:mm:ss format
  fromTime?: string; // HH:mm:ss
  toTime?: string; // HH:mm:ss
  page?: number;
  itemsPerPage?: number; // Max 1000
  custom1?: string;
  custom2?: string;
  custom3?: string;
  custom4?: string;
  custom5?: string;
}

export interface NTrafficConversion {
  brokerAccountDepositID: number;
  amount: number;
  currency: string;
  depositDate: string;
  traderID: string;
  customerID: string;
  custom1: string | null;
  custom2: string | null;
  custom3: string | null;
  custom4: string | null;
  custom5: string | null;
  leadRequestID: string;
  qualified: number;
  platform: string;
  browser: string;
  campaignName: string;
  countryName: string;
  referer: string | null;
  isSmartClick: string;
  countryCode: string;
  campaignHash: string;
  projectAffiliateCommissionAmount: string;
  leadRequestIDEncoded: string;
}

export class NTrafficClient {
  private config: NTrafficConfig;

  constructor(config: NTrafficConfig) {
    this.config = config;
  }

  /**
   * Check if a country is supported by N_Traffic integration
   */
  static isSupportedCountry(countryIso: string): boolean {
    return countryIso.toUpperCase() in NTRAFFIC_COUNTRIES;
  }

  /**
   * Get language code for a country
   */
  static getLanguageForCountry(countryIso: string): string {
    const country = NTRAFFIC_COUNTRIES[countryIso.toUpperCase() as keyof typeof NTRAFFIC_COUNTRIES];
    return country?.language || 'en';
  }

  /**
   * Get locale for a country
   */
  static getLocaleForCountry(countryIso: string): string {
    const country = NTRAFFIC_COUNTRIES[countryIso.toUpperCase() as keyof typeof NTRAFFIC_COUNTRIES];
    return country?.locale || 'en_US';
  }

  /**
   * Generate a strong password for N_Traffic (required field)
   * Must contain uppercase, lowercase, and numbers
   */
  static generatePassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let password = '';
    // Add 3 uppercase
    for (let i = 0; i < 3; i++) {
      password += upperChars[Math.floor(Math.random() * upperChars.length)];
    }
    // Add 3 lowercase
    for (let i = 0; i < 3; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    // Add 3 numbers
    for (let i = 0; i < 3; i++) {
      password += numbers[Math.floor(Math.random() * numbers.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Generate a random Italian IP address
   * Uses real Italian IP ranges from major ISPs
   */
  static generateItalianIP(): string {
    // Italian IP ranges from major ISPs (Telecom Italia, Vodafone, Wind, Fastweb, etc.)
    const italianIPRanges = [
      // Telecom Italia / TIM
      { start: [2, 32, 0, 0], end: [2, 47, 255, 255] },
      { start: [5, 168, 0, 0], end: [5, 175, 255, 255] },
      { start: [79, 0, 0, 0], end: [79, 63, 255, 255] },
      { start: [80, 16, 0, 0], end: [80, 23, 255, 255] },
      { start: [82, 48, 0, 0], end: [82, 63, 255, 255] },
      { start: [83, 224, 0, 0], end: [83, 231, 255, 255] },
      { start: [85, 32, 0, 0], end: [85, 47, 255, 255] },
      { start: [87, 0, 0, 0], end: [87, 31, 255, 255] },
      { start: [88, 32, 0, 0], end: [88, 63, 255, 255] },
      { start: [93, 32, 0, 0], end: [93, 47, 255, 255] },
      { start: [95, 224, 0, 0], end: [95, 255, 255, 255] },
      // Vodafone Italy
      { start: [2, 192, 0, 0], end: [2, 207, 255, 255] },
      { start: [5, 88, 0, 0], end: [5, 95, 255, 255] },
      { start: [31, 168, 0, 0], end: [31, 175, 255, 255] },
      { start: [37, 160, 0, 0], end: [37, 175, 255, 255] },
      { start: [46, 32, 0, 0], end: [46, 47, 255, 255] },
      { start: [77, 224, 0, 0], end: [77, 255, 255, 255] },
      { start: [78, 0, 0, 0], end: [78, 15, 255, 255] },
      // Wind Tre
      { start: [2, 112, 0, 0], end: [2, 127, 255, 255] },
      { start: [5, 144, 0, 0], end: [5, 159, 255, 255] },
      { start: [37, 128, 0, 0], end: [37, 143, 255, 255] },
      { start: [46, 160, 0, 0], end: [46, 175, 255, 255] },
      { start: [79, 16, 0, 0], end: [79, 31, 255, 255] },
      { start: [80, 180, 0, 0], end: [80, 183, 255, 255] },
      // Fastweb
      { start: [2, 224, 0, 0], end: [2, 239, 255, 255] },
      { start: [5, 96, 0, 0], end: [5, 103, 255, 255] },
      { start: [37, 176, 0, 0], end: [37, 191, 255, 255] },
      { start: [46, 184, 0, 0], end: [46, 191, 255, 255] },
      { start: [79, 32, 0, 0], end: [79, 47, 255, 255] },
      { start: [85, 18, 0, 0], end: [85, 19, 255, 255] },
      // Iliad Italy
      { start: [37, 182, 0, 0], end: [37, 183, 255, 255] },
      { start: [185, 32, 0, 0], end: [185, 47, 255, 255] },
      // Tiscali
      { start: [79, 56, 0, 0], end: [79, 63, 255, 255] },
      { start: [89, 96, 0, 0], end: [89, 111, 255, 255] },
      { start: [213, 205, 0, 0], end: [213, 205, 255, 255] },
    ];

    // Pick a random IP range
    const range = italianIPRanges[Math.floor(Math.random() * italianIPRanges.length)];

    // Generate random IP within the range
    const ip = [];
    for (let i = 0; i < 4; i++) {
      const min = range.start[i];
      const max = range.end[i];
      ip.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return ip.join('.');
  }

  /**
   * Format lead payload for N_Traffic API
   * Uses application/x-www-form-urlencoded format
   */
  private formatPayload(lead: NTrafficLeadData): URLSearchParams {
    const params = new URLSearchParams();

    // Required fields
    params.append('email', lead.email);
    params.append('firstName', lead.firstName);
    params.append('lastName', lead.lastName);
    params.append('password', lead.password);
    params.append('ip', lead.ip);
    params.append('phone', lead.phone);

    // Optional fields
    if (lead.areaCode) params.append('areaCode', lead.areaCode);
    if (lead.custom1) params.append('custom1', lead.custom1);
    if (lead.custom2) params.append('custom2', lead.custom2);
    if (lead.custom3) params.append('custom3', lead.custom3);
    if (lead.custom4) params.append('custom4', lead.custom4);
    if (lead.custom5) params.append('custom5', lead.custom5);
    if (lead.comment) params.append('comment', lead.comment);
    if (lead.offerName) params.append('offerName', lead.offerName);
    if (lead.offerWebsite) params.append('offerWebsite', lead.offerWebsite);
    if (lead.locale) params.append('locale', lead.locale);

    return params;
  }

  /**
   * Push lead to N_Traffic API
   */
  async pushLead(lead: NTrafficLeadData): Promise<NTrafficPushResponse> {
    try {
      // Format payload
      const payload = this.formatPayload(lead);

      // Log exact payload being sent (for debugging)
      console.log('📤 N_Traffic API Request:', {
        endpoint: this.config.apiEndpoint,
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone,
        areaCode: lead.areaCode,
        locale: lead.locale,
      });
      console.log('📤 Exact Payload (URLSearchParams):', payload.toString());

      // Make API request with x-www-form-urlencoded
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Api-Key': this.config.apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      });

      // Log response headers and status
      console.log('📥 N_Traffic API Response Headers:', {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
      });

      // Read response as text first to capture any HTML error pages
      const responseText = await response.text();

      // Log raw response (first 1000 chars)
      console.log('📥 N_Traffic Raw Response Body (first 1000 chars):', responseText.substring(0, 1000));

      // Try to parse as JSON
      let responseData: NTrafficLeadResponse;
      try {
        responseData = JSON.parse(responseText);
        console.log('📥 N_Traffic API Response (Parsed JSON):', {
          status: response.status,
          statusText: response.statusText,
          httpCode: responseData.server?.httpCode,
          leadRequestId: responseData.details?.leadRequest?.ID,
          advertiser: responseData.details?.advertiser?.name,
          redirectUrl: responseData.details?.redirect?.url,
        });
      } catch (parseError) {
        console.error('❌ Failed to parse N_Traffic response as JSON:', {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get('content-type'),
          bodyPreview: responseText.substring(0, 500),
          parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error',
        });

        return {
          success: false,
          error: `Invalid response from N_Traffic API (status ${response.status}): ${responseText.substring(0, 200)}`,
          rawResponse: {
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            body: responseText.substring(0, 1000),
          },
          httpCode: response.status,
        };
      }

      // Handle success (status 200 or 201)
      if (response.ok && responseData.details?.leadRequest?.ID) {
        console.log('✅ N_Traffic lead pushed successfully:', {
          leadRequestId: responseData.details.leadRequest.ID,
          advertiser: responseData.details.advertiser?.name,
          offer: responseData.details.offer?.name,
          redirectUrl: responseData.details.redirect?.url,
          httpCode: responseData.server?.httpCode,
        });

        return {
          success: true,
          leadRequestId: responseData.details.leadRequest.ID,
          redirectUrl: responseData.details.redirect?.url,
          advertiserName: responseData.details.advertiser?.name,
          advertiserLogo: responseData.details.advertiser?.logo,
          offerName: responseData.details.offer?.name,
          offerHash: responseData.details.offer?.hash,
          rawResponse: responseData,
          httpCode: responseData.server?.httpCode || response.status,
        };
      }

      // Handle errors
      console.error('❌ N_Traffic API Error:', {
        status: response.status,
        message: responseData.message,
        httpCode: responseData.server?.httpCode,
      });

      return {
        success: false,
        error: responseData.message || `API error: ${response.status}`,
        rawResponse: responseData,
        httpCode: responseData.server?.httpCode || response.status,
      };

    } catch (error) {
      console.error('❌ N_Traffic push error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get autologin URL for a lead
   */
  async getAutologinUrl(leadRequestId: string): Promise<{
    success: boolean;
    url?: string;
    method?: string;
    parameters?: Record<string, string>;
    error?: string;
  }> {
    try {
      const url = `${this.config.apiEndpoint.replace('/leads', '/brokers/login/details')}?leadRequestID=${leadRequestId}`;

      console.log('📤 N_Traffic Get Autologin Request:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Api-Key': this.config.apiKey,
        },
      });

      const responseText = await response.text();
      let responseData: any;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        return {
          success: false,
          error: `Invalid response: ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && responseData.details?.url) {
        return {
          success: true,
          url: responseData.details.url,
          method: responseData.details.method || 'GET',
          parameters: responseData.details.parameters || {},
        };
      }

      return {
        success: false,
        error: responseData.message || 'Failed to get autologin URL',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get leads from N_Traffic API
   */
  async getLeads(params: NTrafficGetLeadsParams): Promise<{
    success: boolean;
    leads?: NTrafficLeadRecord[];
    total?: number;
    error?: string;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('fromDate', params.fromDate);
      queryParams.append('toDate', params.toDate);

      if (params.fromTime) queryParams.append('fromTime', params.fromTime);
      if (params.toTime) queryParams.append('toTime', params.toTime);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.itemsPerPage) queryParams.append('itemsPerPage', params.itemsPerPage.toString());
      if (params.custom1) queryParams.append('custom1', params.custom1);
      if (params.custom2) queryParams.append('custom2', params.custom2);
      if (params.custom3) queryParams.append('custom3', params.custom3);
      if (params.custom4) queryParams.append('custom4', params.custom4);
      if (params.custom5) queryParams.append('custom5', params.custom5);

      const url = `${this.config.apiEndpoint}?${queryParams.toString()}`;

      console.log('📤 N_Traffic Get Leads Request:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Api-Key': this.config.apiKey,
        },
      });

      const responseText = await response.text();
      let responseData: any;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        return {
          success: false,
          error: `Invalid response: ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && responseData.items) {
        return {
          success: true,
          leads: responseData.items,
          total: responseData.total?.items || responseData.items.length,
        };
      }

      return {
        success: false,
        error: responseData.message || 'Failed to get leads',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get conversions (FTDs) from N_Traffic API
   */
  async getConversions(params: NTrafficGetLeadsParams): Promise<{
    success: boolean;
    conversions?: NTrafficConversion[];
    total?: number;
    error?: string;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('fromDate', params.fromDate);
      queryParams.append('toDate', params.toDate);

      if (params.fromTime) queryParams.append('fromTime', params.fromTime);
      if (params.toTime) queryParams.append('toTime', params.toTime);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.itemsPerPage) queryParams.append('itemsPerPage', params.itemsPerPage.toString());
      if (params.custom1) queryParams.append('custom1', params.custom1);
      if (params.custom2) queryParams.append('custom2', params.custom2);
      if (params.custom3) queryParams.append('custom3', params.custom3);
      if (params.custom4) queryParams.append('custom4', params.custom4);
      if (params.custom5) queryParams.append('custom5', params.custom5);

      const url = `${this.config.apiEndpoint.replace('/leads', '/conversions')}?${queryParams.toString()}`;

      console.log('📤 N_Traffic Get Conversions Request:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Api-Key': this.config.apiKey,
        },
      });

      const responseText = await response.text();
      let responseData: any;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        return {
          success: false,
          error: `Invalid response: ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && responseData.items) {
        return {
          success: true,
          conversions: responseData.items,
          total: parseInt(responseData.total?.items || '0'),
        };
      }

      return {
        success: false,
        error: responseData.message || 'Failed to get conversions',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get countries list from N_Traffic API
   */
  async getCountries(): Promise<{
    success: boolean;
    countries?: Array<{ code: string; name: string; dial_code: number }>;
    error?: string;
  }> {
    try {
      const url = this.config.apiEndpoint.replace('/leads', '/countries');

      console.log('📤 N_Traffic Get Countries Request:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Api-Key': this.config.apiKey,
        },
      });

      const responseText = await response.text();
      let responseData: any;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        return {
          success: false,
          error: `Invalid response: ${responseText.substring(0, 200)}`,
        };
      }

      if (response.ok && responseData.items) {
        return {
          success: true,
          countries: responseData.items,
        };
      }

      return {
        success: false,
        error: responseData.message || 'Failed to get countries',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.getCountries();
      return result.success;
    } catch (error) {
      console.error('N_Traffic connection test failed:', error);
      return false;
    }
  }

  /**
   * Validate lead data before sending
   */
  static validateLead(lead: Partial<NTrafficLeadData>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields
    if (!lead.email || !lead.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Valid email is required');
    }
    if (!lead.firstName || lead.firstName.trim().length === 0) {
      errors.push('First name is required');
    }
    if (!lead.lastName || lead.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }
    if (!lead.password || lead.password.length < 6) {
      errors.push('Password is required (minimum 6 characters)');
    }
    if (!lead.ip || lead.ip.trim().length === 0) {
      errors.push('IP address is required');
    }
    if (!lead.phone || lead.phone.trim().length < 8) {
      errors.push('Phone number is required (minimum 8 digits)');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory function to create N_Traffic client with environment config
 */
export function createNTrafficClient(): NTrafficClient {
  const config: NTrafficConfig = {
    apiEndpoint: process.env.NTRAFFIC_API_ENDPOINT || 'https://ntraffic-api.ink/api/v2/leads',
    apiKey: process.env.NTRAFFIC_API_KEY || '46872130-B70E-F8D1-5B86-F95F42130845',
  };

  return new NTrafficClient(config);
}