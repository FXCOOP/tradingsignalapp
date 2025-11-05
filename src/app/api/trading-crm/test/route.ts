/**
 * API Endpoint: POST /api/trading-crm/test
 *
 * Test endpoint for Trading CRM integration
 * Sends a test lead to verify API connection and functionality
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createTradingCRMClient,
  TradingCRMClient,
  TRADING_CRM_COUNTRIES,
  THANK_YOU_PAGES,
  type LeadData,
} from '@/lib/trading-crm-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testCountry, testLanguage } = body;

    // Use provided country or default to Malaysia
    const country = testCountry || 'MY';

    // Validate country
    if (!TradingCRMClient.isSupportedCountry(country)) {
      return NextResponse.json(
        {
          success: false,
          error: `Country ${country} is not supported`,
          supportedCountries: Object.keys(TRADING_CRM_COUNTRIES),
        },
        { status: 400 }
      );
    }

    // Get auto-detected language for country
    const autoLanguage = TradingCRMClient.getLanguageForCountry(country);
    const language = testLanguage || autoLanguage;

    // Create test lead data
    const testLead: LeadData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test.${country.toLowerCase()}.${Date.now()}@example.com`,
      phone: getTestPhoneForCountry(country),
      country: country,
      language: language,
      ip: request.headers.get('x-forwarded-for') || '1.2.3.4',
      campaignId: 'TEST_CAMPAIGN',
      tag: 'test_funnel',
      tag1: 'api_integration_test',
      utmSource: 'test',
      utmCampaign: 'integration_test',
      affiliateTransactionId: `TEST_${Date.now()}`,
      registrationUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://test.example.com',
      additionalInfo1: 'Test lead from API integration',
      additionalInfo2: 'Please do not process',
      additionalInfo3: 'Automated test',
    };

    // Validate lead data
    const validation = TradingCRMClient.validateLead(testLead);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Test lead validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    console.log('Sending test lead to Trading CRM:', {
      country,
      language,
      email: testLead.email,
    });

    // Create client and test connection first
    const client = createTradingCRMClient();
    const connectionOk = await client.testConnection();

    if (!connectionOk) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to Trading CRM API',
          message: 'Please check your API credentials in environment variables',
        },
        { status: 500 }
      );
    }

    // Send test lead
    const result = await client.registerLead(testLead);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: result.rawResponse,
          testLead,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test lead sent successfully to Trading CRM',
      leadId: result.leadId,
      redirectUrl: result.redirectUrl,
      testLead: {
        email: testLead.email,
        country: testLead.country,
        language: testLead.language,
        phone: testLead.phone,
      },
      countryInfo: TRADING_CRM_COUNTRIES[country as keyof typeof TRADING_CRM_COUNTRIES],
      autoDetectedLanguage: autoLanguage,
      thankYouUrl: TradingCRMClient.getThankYouUrl(language),
    });
  } catch (error) {
    console.error('Trading CRM test endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // GET endpoint to show test information and supported countries
  return NextResponse.json({
    endpoint: '/api/trading-crm/test',
    method: 'POST',
    description: 'Test Trading CRM integration by sending a test lead',
    supportedCountries: TRADING_CRM_COUNTRIES,
    thankYouPages: THANK_YOU_PAGES,
    requestBody: {
      testCountry: 'Optional country code (default: MY)',
      testLanguage: 'Optional language code (default: auto-detected)',
    },
    example: {
      testCountry: 'IT',
      testLanguage: 'it',
    },
    note: 'Test leads use fake email addresses and should not be processed by the broker',
  });
}

/**
 * Get a test phone number for a country
 */
function getTestPhoneForCountry(country: string): string {
  const testPhones: Record<string, string> = {
    MY: '+60123456789', // Malaysia
    TR: '+905551234567', // Turkey
    FR: '+33612345678', // France
    IT: '+393331234567', // Italy
    HK: '+85212345678', // Hong Kong
    SG: '+6591234567', // Singapore
    TW: '+886912345678', // Taiwan
    BR: '+5511987654321', // Brazil
  };

  return testPhones[country] || '+60123456789';
}
