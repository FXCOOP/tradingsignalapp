/**
 * Trading CRM Status Sync Module
 * Fetches lead statuses from Trading CRM API
 */

import { createTradingCRMClient, TradingCRMClient } from './trading-crm-api';

// Lead Status Codes from Trading CRM
export enum LeadStatusCode {
  New = 1,
  Attempted = 2,
  Contact = 3,
  NoAnswer = 4,
  Callback = 5,
  NotInterested = 6,
  InvalidNumber = 7,
  Demo = 8,
  FTD = 9, // First Time Deposit - CONVERSION!
  Retention = 10,
  Deposited = 11,
  Withdrawn = 12,
}

export interface LeadStatus {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadStatusCode: number;
  leadStatus: string;
  ftdExists: boolean; // First Time Deposit
  tpAccount: string | null; // Trading Platform Account
  currency: string | null;
  createdOn: string;
  modifiedOn: string;
  country: string;
  affiliateTransactionId: string;
  affiliate: string;
  campaignId: string;
  tag: string;
  tag1: string;
  additionalInfo1: string;
  additionalInfo2: string;
  additionalInfo3: string;
}

export interface StatusSyncResult {
  success: boolean;
  leadId: string;
  previousStatus?: string;
  newStatus: string;
  ftdExists: boolean;
  tpAccount: string | null;
  modifiedOn: string;
  error?: string;
}

export class TradingCRMStatusSync {
  private client: TradingCRMClient;

  constructor(client?: TradingCRMClient) {
    this.client = client || createTradingCRMClient();
  }

  /**
   * Fetch status for a single lead by affiliateTransactionId or email
   */
  async fetchLeadStatus(affiliateTransactionId: string, email?: string): Promise<LeadStatus | null> {
    try {
      console.log('🔍 Fetching lead status from Trading CRM...', { affiliateTransactionId, email });

      // Get Bearer token (this will use direct connection if no proxy is set)
      const authHeader = await this.client.authenticate();

      // Remove 'Bearer ' prefix if present to get just the token
      const token = authHeader.replace('Bearer ', '');

      // Try searching by affiliateTransactionId first
      let filterQuery = `?WHERE[affiliateTransactionId]=${encodeURIComponent(affiliateTransactionId)}`;

      console.log('📡 Calling Trading CRM GET /accounts API...', {
        filterQuery,
        hasProxy: !!process.env.TRADING_CRM_PROXY_URL,
      });

      const baseUrl = process.env.TRADING_CRM_API_ENDPOINT!.replace('/accounts/registrationwithsso', '');

      let response = await fetch(
        `${baseUrl}/accounts${filterQuery}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'api-version': '4.0',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Trading CRM API returned ${response.status}`);
      }

      let data = await response.json();

      // If not found by affiliateTransactionId and email is provided, try email
      if ((!Array.isArray(data) || data.length === 0) && email) {
        console.log('⚠️ Not found by affiliateTransactionId, trying email search...', { email });

        filterQuery = `?WHERE[email]=${encodeURIComponent(email)}`;

        response = await fetch(
          `${baseUrl}/accounts${filterQuery}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'api-version': '4.0',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Trading CRM API returned ${response.status}`);
        }

        data = await response.json();
      }

      // API returns array, get first result
      if (Array.isArray(data) && data.length > 0) {
        console.log('✅ Lead found in Trading CRM:', {
          id: data[0].id,
          email: data[0].email,
          leadStatus: data[0].leadStatus,
          leadStatusCode: data[0].leadStatusCode,
          ftdExists: data[0].ftdExists,
        });
        return data[0] as LeadStatus;
      }

      console.log('⚠️ Lead not found in Trading CRM');
      return null;
    } catch (error) {
      console.error('❌ Error fetching lead status:', error);
      return null;
    }
  }

  /**
   * Fetch statuses for multiple leads (batch)
   */
  async fetchMultipleStatuses(affiliateTransactionIds: string[]): Promise<LeadStatus[]> {
    try {
      const token = await this.client.authenticate();

      // Build OR filter: WHERE[affiliateTransactionId][]=id1&WHERE[affiliateTransactionId][]=id2
      const filterParts = affiliateTransactionIds
        .map(id => `WHERE[affiliateTransactionId][]=${encodeURIComponent(id)}`)
        .join('&');

      const response = await fetch(
        `${process.env.TRADING_CRM_API_ENDPOINT!.replace('/accounts/registrationwithsso', '')}/accounts?${filterParts}&LIMIT[Take]=500`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Trading CRM API returned ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching multiple lead statuses:', error);
      return [];
    }
  }

  /**
   * Fetch all recent leads (last 7 days)
   */
  async fetchRecentLeads(days: number = 7): Promise<LeadStatus[]> {
    try {
      const token = await this.client.authenticate();

      // Calculate date filter
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      const dateFilter = startDate.toISOString().split('T')[0]; // yyyy-mm-dd

      const filterQuery = `?WHERE[createdOn][min]=${dateFilter}&LIMIT[Take]=500&ORDER[sortOrder]=DESC`;

      const response = await fetch(
        `${process.env.TRADING_CRM_API_ENDPOINT!.replace('/accounts/registrationwithsso', '')}/accounts${filterQuery}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Trading CRM API returned ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching recent leads:', error);
      return [];
    }
  }

  /**
   * Get human-readable status name
   */
  getStatusName(statusCode: number): string {
    const statusMap: Record<number, string> = {
      1: 'New',
      2: 'Attempted Contact',
      3: 'In Contact',
      4: 'No Answer',
      5: 'Callback Scheduled',
      6: 'Not Interested',
      7: 'Invalid Number',
      8: 'Demo Account',
      9: 'FTD - Converted', // First Time Deposit
      10: 'Retention',
      11: 'Deposited',
      12: 'Withdrawn',
    };

    return statusMap[statusCode] || `Unknown (${statusCode})`;
  }

  /**
   * Check if status represents a conversion
   */
  isConversion(statusCode: number): boolean {
    return [
      LeadStatusCode.FTD,
      LeadStatusCode.Deposited,
    ].includes(statusCode);
  }
}

// Singleton instance
let statusSyncInstance: TradingCRMStatusSync | null = null;

export function createStatusSync(): TradingCRMStatusSync {
  if (!statusSyncInstance) {
    statusSyncInstance = new TradingCRMStatusSync();
  }
  return statusSyncInstance;
}
