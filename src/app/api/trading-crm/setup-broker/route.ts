/**
 * API Endpoint: POST /api/trading-crm/setup-broker
 *
 * One-time setup: Adds Trading CRM broker to your CRM database
 * This makes it visible in your CRM dashboard at /crm
 */

import { NextRequest, NextResponse } from 'next/server';
import { createBroker, getAllBrokers } from '@/lib/supabase';
import { TRADING_CRM_COUNTRIES } from '@/lib/trading-crm-api';

export async function POST(request: NextRequest) {
  try {
    // Check if Finoglob broker already exists
    const existingBrokers = await getAllBrokers();
    const finoglobExists = existingBrokers.some(
      broker => broker.name === 'Finoglob' || broker.name === 'Trading CRM' || broker.company_name === 'affiliate365'
    );

    if (finoglobExists) {
      return NextResponse.json({
        success: false,
        message: 'Finoglob broker already exists in your CRM',
        broker: existingBrokers.find(b => b.name === 'Finoglob' || b.name === 'Trading CRM' || b.company_name === 'affiliate365')
      });
    }

    // Get country codes from Trading CRM configuration
    const countryCodes = Object.keys(TRADING_CRM_COUNTRIES);

    // Create Finoglob broker record
    const brokerData = {
      name: 'Finoglob',
      company_name: 'Trading CRM (affiliate365)',
      email: 'support@tradingcrm.com',
      phone: '+1-XXX-XXX-XXXX', // Update with actual broker contact
      country_codes: countryCodes, // ['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR']
      status: 'active' as const,
      api_endpoint: process.env.TRADING_CRM_API_ENDPOINT || 'https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso',
      api_key: process.env.TRADING_CRM_USERNAME || '225X',
      api_method: 'POST' as const,
      api_headers: {
        'Content-Type': 'application/json-patch+json',
        'Accept': 'application/json',
      },
      max_leads_per_day: 1000, // Adjust based on your agreement
      max_leads_per_hour: 100,
      working_hours_start: '00:00:00',
      working_hours_end: '23:59:59',
      working_days: [1, 2, 3, 4, 5, 6, 7], // All days
      payout_per_lead: 5.00, // Update with your actual payout
      payout_per_conversion: 50.00, // Update with your actual payout
    };

    const broker = await createBroker(brokerData);

    return NextResponse.json({
      success: true,
      message: 'Finoglob broker successfully added to your CRM',
      broker,
      note: 'The broker is now visible in your CRM dashboard at /crm'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error setting up Trading CRM broker:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to setup Trading CRM broker',
        details: error.details || error.hint
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Show what will be created
  const countryCodes = Object.keys(TRADING_CRM_COUNTRIES);

  return NextResponse.json({
    endpoint: '/api/trading-crm/setup-broker',
    method: 'POST',
    description: 'Adds Finoglob broker to your CRM database',
    brokerToBeCreated: {
      name: 'Finoglob',
      company_name: 'Trading CRM (affiliate365)',
      email: 'support@tradingcrm.com',
      country_codes: countryCodes,
      status: 'active' as const,
      api_endpoint: process.env.TRADING_CRM_API_ENDPOINT || 'Not configured',
      max_leads_per_day: 1000,
      max_leads_per_hour: 100,
      payout_per_lead: 5.00,
      payout_per_conversion: 50.00,
    },
    note: 'Send a POST request to this endpoint to create the broker record'
  });
}
