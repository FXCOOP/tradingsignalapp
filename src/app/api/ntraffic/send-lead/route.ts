/**
 * API Endpoint: POST /api/ntraffic/send-lead
 *
 * Sends a lead to N_Traffic (ntraffic-api.ink) API
 * Handles Italian (IT) leads
 *
 * N_Traffic API Details:
 * - Endpoint: https://ntraffic-api.ink/api/v2/leads
 * - Auth: Api-Key header
 * - IP whitelisting required
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createNTrafficClient,
  NTrafficClient,
  NTRAFFIC_COUNTRIES,
  type NTrafficLeadData,
} from '@/lib/ntraffic-api';
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
      tag,
      utmSource,
      additionalInfo1,
      additionalInfo2,
      offerName,
      offerWebsite,
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, firstName, lastName, phone',
        },
        { status: 400 }
      );
    }

    // Check if country is supported (optional - N_Traffic may accept any country)
    // For now, we'll allow any country since N_Traffic might accept them
    // if (country && !NTrafficClient.isSupportedCountry(country)) {
    //   console.log(`⚠️ Warning: Country ${country} may not be fully supported by N_Traffic`);
    // }

    // Generate random Italian IP for geo-validation (N_Traffic requires Italian IP)
    // CRITICAL: We MUST use generated Italian IP, NOT the client's real IP
    const italianIP = NTrafficClient.generateItalianIP();
    console.log(`🇮🇹 ITALIAN IP GENERATED: ${italianIP}`);
    console.log(`⚠️ Client IP from request (NOT USED): ${ip || 'not provided'}`);
    console.log(`✅ USING ITALIAN IP FOR N_TRAFFIC: ${italianIP}`);

    // Extract phone - clean symbols only
    let phoneNumber = phone;

    // Clean phone number - remove symbols only (keep digits)
    phoneNumber = phoneNumber.replace(/[\s+\-()]/g, '');

    // Remove country code 39 if present (areaCode sent separately)
    if (phoneNumber.startsWith('39') && phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substring(2);
    }

    // Fix: Italian mobile numbers should be 10 digits starting with 3
    // Pad with 3s until we have 10 digits
    while (phoneNumber.length < 10) {
      phoneNumber = '3' + phoneNumber;
    }

    // Italian mobile: should be 10 digits starting with 3
    console.log(`📞 Phone for N_Traffic: areaCode=39, phone=${phoneNumber} (${phoneNumber.length} digits)`);

    // Prepare lead data for N_Traffic
    const leadData: NTrafficLeadData = {
      email,
      firstName,
      lastName,
      password: NTrafficClient.generatePassword(), // Auto-generate strong password
      ip: italianIP, // Use generated Italian IP for geo-validation
      phone: phoneNumber, // National format without country code
      areaCode: '39', // Italy country code
      locale: country ? NTrafficClient.getLocaleForCountry(country) : 'it_IT',
      custom1: signupId || undefined, // Store our signup ID for reference
      custom2: utmSource || tag || undefined, // Store campaign source
      custom3: additionalInfo1 || undefined, // Trading experience
      custom4: additionalInfo2 || undefined, // Account size
      custom5: 'pksignalpulse', // Our identifier
      comment: additionalInfo1 ? `Trading experience: ${additionalInfo1}` : undefined,
      offerName: offerName || undefined,
      offerWebsite: offerWebsite || process.env.NEXT_PUBLIC_APP_URL || undefined,
    };

    // Validate lead data
    const validation = NTrafficClient.validateLead(leadData);
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

    // Create N_Traffic client and send lead
    const client = createNTrafficClient();
    const result = await client.pushLead(leadData);

    if (!result.success) {
      console.error('N_Traffic lead registration failed:', {
        email,
        country,
        error: result.error,
        httpCode: result.httpCode,
      });

      // Log failure to database
      if (signupId) {
        await supabase
          .from('lead_assignments')
          .insert({
            lead_id: signupId,
            broker_id: null, // N_Traffic broker UUID would go here
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
            push_status_code: result.httpCode || 500,
            push_response: JSON.stringify({
              success: false,
              broker: 'N_Traffic',
              error: result.error,
              timestamp: new Date().toISOString(),
              rawResponse: result.rawResponse
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
          httpCode: result.httpCode,
          details: result.rawResponse,
        },
        { status: result.httpCode || 500 }
      );
    }

    // Log success to database
    if (signupId) {
      await supabase
        .from('lead_assignments')
        .insert({
          lead_id: signupId,
          broker_id: null, // N_Traffic broker UUID would go here
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
          assigned_broker: 'N_Traffic',
          pushed_to_crm: true,
          push_status_code: result.httpCode || 200,
          push_response: JSON.stringify({
            success: true,
            broker: 'N_Traffic',
            leadRequestId: result.leadRequestId,
            redirectUrl: result.redirectUrl,
            advertiserName: result.advertiserName,
            offerName: result.offerName,
            timestamp: new Date().toISOString(),
            message: 'Lead successfully sent to N_Traffic',
            rawResponse: result.rawResponse
          }),
          push_error: null,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', signupId);
    }

    console.log('N_Traffic lead sent successfully:', {
      email,
      country,
      leadRequestId: result.leadRequestId,
      redirectUrl: result.redirectUrl,
      advertiserName: result.advertiserName,
      offerName: result.offerName,
    });

    return NextResponse.json({
      success: true,
      leadRequestId: result.leadRequestId,
      redirectUrl: result.redirectUrl,
      advertiserName: result.advertiserName,
      advertiserLogo: result.advertiserLogo,
      offerName: result.offerName,
      httpCode: result.httpCode,
      message: 'Lead successfully sent to N_Traffic',
    });
  } catch (error) {
    console.error('N_Traffic send-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to test connection and get lead status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const leadRequestId = searchParams.get('leadRequestId');
    const action = searchParams.get('action');

    const client = createNTrafficClient();

    // Test connection
    if (action === 'test') {
      const isConnected = await client.testConnection();
      return NextResponse.json({
        success: isConnected,
        message: isConnected ? 'N_Traffic API connection successful' : 'N_Traffic API connection failed',
      });
    }

    // Get autologin URL
    if (leadRequestId) {
      const result = await client.getAutologinUrl(leadRequestId);
      return NextResponse.json(result);
    }

    // Default: Return API info
    return NextResponse.json({
      success: true,
      broker: 'N_Traffic',
      endpoint: 'https://ntraffic-api.ink/api/v2/leads',
      supportedCountries: Object.keys(NTRAFFIC_COUNTRIES),
      message: 'Use POST to send leads, GET with ?action=test to test connection, or GET with ?leadRequestId=xxx to get autologin URL',
    });
  } catch (error) {
    console.error('N_Traffic GET API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}