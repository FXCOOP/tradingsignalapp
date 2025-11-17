/**
 * API Endpoint: POST /api/send-lead
 *
 * Universal lead submission endpoint
 * - Stores lead in Supabase 'signups' table
 * - Supports all landing pages (TB1, LP1, etc.)
 * - Auto-pushes to Trading CRM for supported countries
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Supported countries for Trading CRM auto-push
const TRADING_CRM_COUNTRIES = ['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      first_name,
      last_name,
      email,
      phone_number,
      country,
      trading_experience,
      account_size,
      source = 'tb1',
      language = 'en',
    } = body;

    // Validate required fields
    if (!email || !first_name || !last_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, first_name, last_name',
        },
        { status: 400 }
      );
    }

    // Get client IP
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert lead into Supabase
    const insertData: any = {
      first_name,
      last_name,
      email,
      phone_number: phone_number || null,
      country: country || null,
      source,
      language,
      ip_address: clientIp,
      user_agent: userAgent,
      crm_status: 'new',
      status: 'active',
    };

    // Only add optional fields if they exist
    if (trading_experience) insertData.trading_experience = trading_experience;
    if (account_size) insertData.account_size = account_size;

    console.log('[send-lead] Inserting to Supabase:', { email, source, country });

    const { data: signup, error: insertError } = await supabase
      .from('signups')
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      console.error('[send-lead] Supabase insert error:', {
        error: insertError,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save lead',
          message: insertError.message,
          details: insertError.details || insertError.hint || 'Unknown error',
        },
        { status: 500 }
      );
    }

    console.log('Lead saved to Supabase:', {
      id: signup.id,
      email,
      source,
      country,
    });

    // Auto-push to Trading CRM for supported countries
    if (country && TRADING_CRM_COUNTRIES.includes(country.toUpperCase())) {
      try {
        const pushResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/trading-crm/send-lead`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              signupId: signup.id,
              firstName: first_name,
              lastName: last_name,
              email,
              phone: phone_number,
              country,
              language,
              ip: clientIp,
              tag: source,
              additionalInfo1: trading_experience,
              additionalInfo2: account_size,
            }),
          }
        );

        const pushResult = await pushResponse.json();

        console.log('Trading CRM push result:', {
          success: pushResult.success,
          leadId: pushResult.leadId,
        });
      } catch (pushError) {
        console.error('Trading CRM push failed (non-blocking):', pushError);
        // Don't fail the main request if push fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: signup.id,
    });

  } catch (error) {
    console.error('Send-lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
