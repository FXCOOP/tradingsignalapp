/**
 * API Endpoint: POST /api/trading-crm/send-lead
 *
 * Sends a lead to Trading CRM (affiliate365) API
 * Automatically routes leads from target countries: MY, TR, FR, IT, HK, SG, TW, BR
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createTradingCRMClient,
  TradingCRMClient,
  TRADING_CRM_COUNTRIES,
  type LeadData,
} from '@/lib/trading-crm-api';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      signupId,
      firstName,
      lastName,
      email,
      phone,
      country,
      language,
      ip,
      campaignId,
      tag,
      tag1,
      utmSource,
      utmCampaign,
      registrationUrl,
      additionalInfo1,
      additionalInfo2,
      additionalInfo3,
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !phone || !country) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, firstName, lastName, phone, country',
        },
        { status: 400 }
      );
    }

    // Check if country is supported
    if (!TradingCRMClient.isSupportedCountry(country)) {
      return NextResponse.json(
        {
          success: false,
          error: `Country ${country} is not supported. Supported countries: ${Object.keys(TRADING_CRM_COUNTRIES).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData: LeadData = {
      firstName,
      lastName,
      email,
      phone,
      country,
      language: language || TradingCRMClient.getLanguageForCountry(country),
      ip: ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      campaignId: campaignId || process.env.TRADING_CRM_DEFAULT_CAMPAIGN_ID,
      tag: tag || 'signal_pulse',
      tag1,
      registrationUrl: registrationUrl || process.env.NEXT_PUBLIC_APP_URL,
      additionalInfo1,
      additionalInfo2,
      additionalInfo3,
      utmCampaign,
      utmSource: utmSource || 'pksignalpulse',
      affiliateTransactionId: signupId || userId || `LEAD_${Date.now()}`,
    };

    // Validate lead data
    const validation = TradingCRMClient.validateLead(leadData);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Create Trading CRM client and send lead
    const client = createTradingCRMClient();
    const result = await client.registerLead(leadData);

    if (!result.success) {
      console.error('Trading CRM lead registration failed:', {
        email,
        country,
        error: result.error,
      });

      // Log failure to database
      if (signupId) {
        await supabase
          .from('lead_assignments')
          .insert({
            lead_id: signupId,
            broker_id: null, // Trading CRM broker UUID would go here
            assignment_method: 'auto',
            delivery_status: 'failed',
            delivery_attempts: 1,
            api_response: result.rawResponse,
            error_message: result.error,
          });

        // Update signup with push failure
        await supabase
          .from('signups')
          .update({
            pushed_to_crm: false,
            push_status_code: 500,
            push_response: result.error,
            push_error: result.error,
            pushed_at: new Date().toISOString(),
          })
          .eq('id', signupId);
      }

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: result.rawResponse,
        },
        { status: 500 }
      );
    }

    // Log success to database
    if (signupId) {
      await supabase
        .from('lead_assignments')
        .insert({
          lead_id: signupId,
          broker_id: null, // Trading CRM broker UUID would go here
          assignment_method: 'auto',
          delivery_status: 'sent',
          delivery_attempts: 1,
          api_response: result.rawResponse,
          error_message: null,
        });

      // Update signup with push success
      await supabase
        .from('signups')
        .update({
          crm_status: 'sent_to_broker',
          assigned_broker: 'Trading CRM - AFF 225X',
          pushed_to_crm: true,
          push_status_code: 200,
          push_response: 'Lead successfully sent to Trading CRM',
          push_error: null,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', signupId);
    }

    console.log('Trading CRM lead sent successfully:', {
      email,
      country,
      leadId: result.leadId,
      redirectUrl: result.redirectUrl,
    });

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      redirectUrl: result.redirectUrl,
      message: 'Lead successfully sent to Trading CRM',
    });
  } catch (error) {
    console.error('Trading CRM send-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
