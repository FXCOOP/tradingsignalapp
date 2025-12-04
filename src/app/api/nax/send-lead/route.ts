/**
 * API Endpoint: POST /api/nax/send-lead
 *
 * Sends a lead to NAX Capital broker via Airtable Webhook
 * Primary market: AU (Australia)
 *
 * NAX Webhook Specification:
 * - Endpoint: Airtable Webhook URL (kept confidential)
 * - Method: POST
 * - Content-Type: application/json
 * - Auth: None required (security via URL secrecy)
 * - Always returns HTTP 200 (invalid leads flagged internally)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createNaxClient,
  NaxClient,
  NAX_COUNTRIES,
  type NaxLeadData,
} from '@/lib/nax-airtable-api';
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
      tag,
      utmSource,
      additionalInfo1,
      message,
      interestedIn,
    } = body;

    // Validate required fields
    if (!firstName || !lastName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: firstName, lastName',
        },
        { status: 400 }
      );
    }

    // At least one of email or phone is required by NAX
    if (!email && !phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one of email or phone is required',
        },
        { status: 400 }
      );
    }

    // Check if country is supported
    if (country && !NaxClient.isSupportedCountry(country)) {
      return NextResponse.json(
        {
          success: false,
          error: `Country ${country} is not supported by NAX. Supported: ${Object.keys(NAX_COUNTRIES).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Get partner ID from environment
    const partnerId = process.env.NAX_PARTNER_ID;
    if (!partnerId) {
      console.error('NAX_PARTNER_ID not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'NAX integration not configured (missing partner_id)',
        },
        { status: 500 }
      );
    }

    // Combine first and last name for NAX "name" field
    const fullName = `${firstName} ${lastName}`.trim();

    // Prepare lead data matching NAX specification
    const leadData: NaxLeadData = {
      partner_id: partnerId,
      name: fullName,
      email: email || undefined,
      phone: phone || undefined,
      source: tag || utmSource || 'pksignalpulse',
      message: message || additionalInfo1 || undefined,
      interested_in: interestedIn || 'Trading Signals',
    };

    // Validate lead data
    const validation = NaxClient.validateLead(leadData);
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

    // Create NAX client and push lead
    const client = createNaxClient();
    const result = await client.pushLead(leadData);

    if (!result.success) {
      console.error('NAX lead push failed:', {
        name: fullName,
        country,
        error: result.error,
      });

      // Log failure to database
      if (signupId) {
        await supabase
          .from('lead_assignments')
          .insert({
            lead_id: signupId,
            broker_id: null,
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
              broker: 'NAX',
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
          broker_id: null,
          assignment_method: 'auto',
          delivery_status: 'sent',
          delivery_attempts: 1,
          api_response: result.rawResponse,
          error_message: null,
        });

      // Update signup with push success
      // Note: NAX webhook always returns 200, so we assume success
      await supabase
        .from('signups')
        .update({
          crm_status: 'sent_to_broker',
          assigned_broker: 'NAX',
          pushed_to_crm: true,
          push_status_code: 200,
          push_response: JSON.stringify({
            success: true,
            broker: 'NAX',
            timestamp: new Date().toISOString(),
            message: 'Lead successfully sent to NAX Capital via webhook',
            note: 'NAX webhook always returns 200. Invalid leads are flagged internally by NAX.',
            rawResponse: result.rawResponse,
          }),
          push_error: null,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', signupId);
    }

    console.log('NAX lead sent successfully:', {
      name: fullName,
      country,
      source: leadData.source,
    });

    return NextResponse.json({
      success: true,
      message: 'Lead successfully sent to NAX Capital',
      note: 'NAX webhook always returns 200. Invalid leads are flagged internally by NAX team.',
    });

  } catch (error) {
    console.error('NAX send-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}