/**
 * API Endpoint: POST /api/allcrypto/send-lead
 *
 * Sends a lead to AllCrypto (yourleads.org) API
 * Automatically routes leads from target countries:
 * AU, KR, SG, HK, TR, NL, BE, IT, ES, FR, CA
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createAllCryptoClient,
  AllCryptoClient,
  ALLCRYPTO_COUNTRIES,
  type AllCryptoLeadData,
} from '@/lib/allcrypto-api';
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
      signupId,
      firstName,
      lastName,
      email,
      phone,
      country,
      language,
      ip,
      password,
      tag,
      utmSource,
      utmCampaign,
      isTest = false,
      additionalInfo1,
      additionalInfo2,
      additionalInfo3,
    } = body;

    // Validate required fields
    if (!ip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: ip',
        },
        { status: 400 }
      );
    }

    // Check if country is supported (if provided)
    if (country && !AllCryptoClient.isSupportedCountry(country)) {
      return NextResponse.json(
        {
          success: false,
          error: `Country ${country} is not supported. Supported countries: ${Object.keys(ALLCRYPTO_COUNTRIES).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData: AllCryptoLeadData = {
      ip: ip || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || '1.1.1.1',
      country_code: country?.toUpperCase(),
      lead_language: language || (country ? AllCryptoClient.getLanguageForCountry(country) : 'en'),
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      password,
      aff_sub: tag || 'pksignalpulse',
      aff_sub2: utmSource,
      aff_sub3: utmCampaign,
      aff_sub4: additionalInfo1,
      // aff_sub5 is reserved for "test" marker for test leads
    };

    // Validate lead data
    const validation = AllCryptoClient.validateLead(leadData);
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

    // Create AllCrypto client and push lead
    const client = createAllCryptoClient();
    const result = await client.pushLead(leadData, isTest);

    if (!result.success) {
      console.error('AllCrypto lead push failed:', {
        email,
        country,
        error: result.error,
        errorType: result.errorType,
      });

      // Log failure to database
      if (signupId) {
        await supabase
          .from('lead_assignments')
          .insert({
            lead_id: signupId,
            broker_id: null, // AllCrypto broker UUID would go here
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
            push_status_code: 400,
            push_response: JSON.stringify({
              success: false,
              error: result.error,
              errorType: result.errorType,
              errorMessage: result.errorMessage,
              timestamp: new Date().toISOString(),
              rawResponse: result.rawResponse,
            }),
            push_error: result.error,
            pushed_at: new Date().toISOString(),
          })
          .eq('id', signupId);
      }

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errorType: result.errorType,
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
          broker_id: null, // AllCrypto broker UUID would go here
          assignment_method: 'auto',
          delivery_status: 'sent',
          delivery_attempts: 1,
          api_response: result.rawResponse,
          external_lead_id: result.lead_uuid,
          error_message: null,
        });

      // Update signup with push success
      await supabase
        .from('signups')
        .update({
          crm_status: 'sent_to_broker',
          assigned_broker: `AllCrypto - ${result.advertiser_name || 'AllCrypto'}`,
          pushed_to_crm: true,
          push_status_code: 200,
          push_response: JSON.stringify({
            success: true,
            lead_uuid: result.lead_uuid,
            auto_login_url: result.auto_login_url,
            advertiser_name: result.advertiser_name,
            timestamp: new Date().toISOString(),
            message: 'Lead successfully sent to AllCrypto',
            rawResponse: result.rawResponse,
          }),
          push_error: null,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', signupId);
    }

    console.log('AllCrypto lead sent successfully:', {
      email,
      country,
      lead_uuid: result.lead_uuid,
      advertiser: result.advertiser_name,
    });

    return NextResponse.json({
      success: true,
      lead_uuid: result.lead_uuid,
      auto_login_url: result.auto_login_url,
      advertiser_name: result.advertiser_name,
      message: 'Lead successfully sent to AllCrypto',
    });

  } catch (error) {
    console.error('AllCrypto send-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
