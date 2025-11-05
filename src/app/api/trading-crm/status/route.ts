/**
 * API Endpoint: GET /api/trading-crm/status
 *
 * Get status and statistics for Trading CRM integration
 * Shows configuration, supported countries, and delivery statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  TRADING_CRM_COUNTRIES,
  THANK_YOU_PAGES,
  createTradingCRMClient,
} from '@/lib/trading-crm-api';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Get configuration status
    const isEnabled = process.env.TRADING_CRM_ENABLED !== 'false';
    const hasCredentials = !!(
      process.env.TRADING_CRM_API_ENDPOINT &&
      process.env.TRADING_CRM_USERNAME &&
      process.env.TRADING_CRM_PASSWORD
    );

    // Test API connection if credentials are present
    let connectionStatus = 'not_tested';
    if (hasCredentials) {
      try {
        const client = createTradingCRMClient();
        const isConnected = await client.testConnection();
        connectionStatus = isConnected ? 'connected' : 'failed';
      } catch (error) {
        connectionStatus = 'error';
      }
    }

    // Get statistics from database (if available)
    let statistics = null;
    try {
      // Get total leads sent to Trading CRM
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('lead_assignments')
        .select('delivery_status, created_at')
        .eq('assigned_broker', 'Trading CRM - AFF 225X');

      if (!assignmentsError && assignmentsData) {
        const total = assignmentsData.length;
        const sent = assignmentsData.filter(a => a.delivery_status === 'sent').length;
        const failed = assignmentsData.filter(a => a.delivery_status === 'failed').length;
        const pending = assignmentsData.filter(a => a.delivery_status === 'pending').length;

        // Get today's stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLeads = assignmentsData.filter(a => new Date(a.created_at) >= today);

        statistics = {
          total,
          sent,
          failed,
          pending,
          successRate: total > 0 ? ((sent / total) * 100).toFixed(2) + '%' : 'N/A',
          today: {
            total: todayLeads.length,
            sent: todayLeads.filter(a => a.delivery_status === 'sent').length,
            failed: todayLeads.filter(a => a.delivery_status === 'failed').length,
          },
        };
      }
    } catch (error) {
      console.error('Error fetching Trading CRM statistics:', error);
    }

    return NextResponse.json({
      integration: 'Trading CRM - AFF 225X',
      status: {
        enabled: isEnabled,
        configured: hasCredentials,
        connection: connectionStatus,
      },
      configuration: {
        apiEndpoint: process.env.TRADING_CRM_API_ENDPOINT || 'Not configured',
        username: process.env.TRADING_CRM_USERNAME ? 'Configured' : 'Not configured',
        password: process.env.TRADING_CRM_PASSWORD ? 'Configured' : 'Not configured',
        promotionCode: process.env.TRADING_CRM_PROMOTION_CODE || 'defaultAcademiesGroup',
        defaultCampaignId: process.env.TRADING_CRM_DEFAULT_CAMPAIGN_ID || 'Not set',
      },
      supportedCountries: Object.entries(TRADING_CRM_COUNTRIES).map(([code, info]) => ({
        code,
        name: info.name,
        language: info.language,
        thankYouUrl: THANK_YOU_PAGES[info.language as keyof typeof THANK_YOU_PAGES],
      })),
      statistics: statistics || {
        message: 'Statistics not available - database table may not exist or no leads sent yet',
      },
      endpoints: {
        sendLead: '/api/trading-crm/send-lead',
        test: '/api/trading-crm/test',
        status: '/api/trading-crm/status',
      },
    });
  } catch (error) {
    console.error('Trading CRM status endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
