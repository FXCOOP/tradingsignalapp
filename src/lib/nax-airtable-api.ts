/**
 * NAX Capital Lead Intake Integration
 * Broker: NAX Capital
 * API: Airtable Webhook (https://hooks.airtable.com/workflows/...)
 *
 * Handles lead distribution to NAX Capital broker for supported countries:
 * AU (Australia) - Primary market
 *
 * Based on NAX Capital Lead Intake Integration Guide
 * Contacts:
 * - Matt Glover (CTO) – matt@sparkeleven.com.au
 * - Itay Swisa (CISO) – itay@naxcapital.com.au
 */

// Country to ISO code mapping for NAX markets
export const NAX_COUNTRIES = {
  'AU': { iso: 'AU', name: 'Australia', language: 'en' },
} as const;

export interface NaxConfig {
  webhookUrl: string;    // Airtable Webhook URL (keep confidential!)
  partnerId: string;     // Unique partner ID assigned by NAX
}

/**
 * NAX Lead Data - matches NAX Capital webhook specification
 */
export interface NaxLeadData {
  // Required by NAX
  partner_id: string;    // Unique ID assigned by NAX (required)
  name: string;          // Lead's full name (required)

  // At least one of email or phone is required
  email?: string;        // Must be RFC-5322 valid
  phone?: string;        // At least 8 digits

  // Optional fields
  message?: string;      // Free text from user
  source?: string;       // Campaign or landing page identifier
  interested_in?: string; // Product/service of interest
}

export interface NaxPushResponse {
  success: boolean;
  error?: string;
  errorType?: string;
  rawResponse?: any;
  // Note: NAX webhook always returns HTTP 200
  // Invalid leads are flagged internally by NAX
}

export class NaxClient {
  private config: NaxConfig;

  constructor(config: NaxConfig) {
    this.config = config;
  }

  /**
   * Check if a country is supported by NAX integration
   */
  static isSupportedCountry(countryIso: string): boolean {
    return countryIso.toUpperCase() in NAX_COUNTRIES;
  }

  /**
   * Get language code for a country
   */
  static getLanguageForCountry(countryIso: string): string {
    const country = NAX_COUNTRIES[countryIso.toUpperCase() as keyof typeof NAX_COUNTRIES];
    return country?.language || 'en';
  }

  /**
   * Push lead to NAX Capital via Airtable Webhook
   *
   * Note: NAX webhook always returns HTTP 200
   * Invalid leads are still stored but flagged internally
   */
  async pushLead(lead: NaxLeadData): Promise<NaxPushResponse> {
    try {
      // Build payload matching NAX specification
      const payload: Record<string, any> = {
        partner_id: lead.partner_id,
        name: lead.name,
      };

      // Add email if provided
      if (lead.email) {
        payload.email = lead.email;
      }

      // Add phone if provided
      if (lead.phone) {
        payload.phone = lead.phone;
      }

      // Add optional fields
      if (lead.message) payload.message = lead.message;
      if (lead.source) payload.source = lead.source;
      if (lead.interested_in) payload.interested_in = lead.interested_in;

      console.log('📤 NAX Capital Webhook Request:', {
        partner_id: lead.partner_id,
        name: lead.name,
        email: lead.email ? '***@***' : undefined,
        phone: lead.phone ? '***' : undefined,
        source: lead.source,
      });
      console.log('📤 Exact Payload (JSON):', JSON.stringify(payload, null, 2));

      // Make webhook request
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log response status
      console.log('📥 NAX Capital Webhook Response:', {
        status: response.status,
        statusText: response.statusText,
      });

      // Read response body
      const responseText = await response.text();
      console.log('📥 NAX Raw Response:', responseText.substring(0, 500));

      // NAX webhook always returns HTTP 200
      // We consider the push successful if we get a 200 response
      if (response.ok) {
        console.log('✅ NAX lead pushed successfully');

        let rawResponse: any = responseText;
        try {
          rawResponse = JSON.parse(responseText);
        } catch {
          // Response might not be JSON
        }

        return {
          success: true,
          rawResponse,
        };
      }

      // Unexpected non-200 response
      console.error('❌ NAX Webhook unexpected error:', {
        status: response.status,
        body: responseText.substring(0, 500),
      });

      return {
        success: false,
        error: `Unexpected response: ${response.status} ${response.statusText}`,
        rawResponse: responseText,
      };

    } catch (error) {
      console.error('❌ NAX push error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Test webhook connection
   * Note: This will create a test lead in NAX system
   */
  async testConnection(): Promise<boolean> {
    try {
      const testLead: NaxLeadData = {
        partner_id: this.config.partnerId,
        name: 'Test Lead',
        email: 'test@example.com',
        source: 'connection-test',
        message: 'This is a test lead - please ignore',
      };

      const result = await this.pushLead(testLead);
      return result.success;
    } catch (error) {
      console.error('NAX connection test failed:', error);
      return false;
    }
  }

  /**
   * Validate lead data before sending
   * Based on NAX validation rules:
   * - name is mandatory
   * - At least one of email or phone must be present
   * - Email must be RFC-5322 valid
   * - Phone must have at least 8 digits
   */
  static validateLead(lead: NaxLeadData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // partner_id is required
    if (!lead.partner_id || lead.partner_id.trim().length === 0) {
      errors.push('partner_id is required');
    }

    // name is required
    if (!lead.name || lead.name.trim().length === 0) {
      errors.push('name is required');
    }

    // At least one of email or phone must be present
    const hasEmail = lead.email && lead.email.trim().length > 0;
    const hasPhone = lead.phone && lead.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      errors.push('At least one of email or phone is required');
    }

    // Validate email format if provided
    if (hasEmail && !lead.email!.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Email must be RFC-5322 valid format');
    }

    // Validate phone has at least 8 digits if provided
    if (hasPhone) {
      const digitsOnly = lead.phone!.replace(/\D/g, '');
      if (digitsOnly.length < 8) {
        errors.push('Phone must have at least 8 digits');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory function to create NAX client with environment config
 */
export function createNaxClient(): NaxClient {
  const config: NaxConfig = {
    webhookUrl: process.env.NAX_WEBHOOK_URL || '',
    partnerId: process.env.NAX_PARTNER_ID || '',
  };

  if (!config.webhookUrl) {
    console.warn('⚠️ NAX_WEBHOOK_URL not configured');
  }
  if (!config.partnerId) {
    console.warn('⚠️ NAX_PARTNER_ID not configured');
  }

  return new NaxClient(config);
}