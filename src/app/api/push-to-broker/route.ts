import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createTradingCRMClient } from '@/lib/trading-crm-api';
import { createAllCryptoClient } from '@/lib/allcrypto-api';

/**
 * API Endpoint: Push lead from CRM to broker
 * Called from CRM dashboard based on YOUR rules
 *
 * POST /api/push-to-broker
 * Body: { signupId: string, brokerName?: string, forceImmediate?: boolean }
 *
 * Supported Brokers:
 * - Trading CRM: MY, TR, FR, IT, HK, SG, TW, BR
 * - AllCrypto: AU, KR, SG, HK, TR, NL, BE, IT, ES, FR, CA
 *
 * Queue System (Trading CRM only):
 * - Working Hours: 04:00-13:00 GMT+2 (Monday-Friday)
 * - Daily Cap: 10 leads per day
 * - Natural spacing: 5-15 minutes between queued pushes
 */
export async function POST(request: NextRequest) {
  try {
    const { signupId, brokerName, forceImmediate } = await request.json();

    if (!signupId) {
      return NextResponse.json(
        { success: false, error: 'signupId is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the signup from CRM
    const { data: signup, error: fetchError } = await supabase
      .from('signups')
      .select('*')
      .eq('id', signupId)
      .single();

    if (fetchError || !signup) {
      return NextResponse.json(
        { success: false, error: 'Lead not found in CRM' },
        { status: 404 }
      );
    }

    console.log('📤 Pushing lead to broker:', signup.email);

    // Check if already pushed
    if (signup.pushed_to_crm && signup.push_status_code === 200) {
      console.log('⚠️ Lead already pushed successfully');
      return NextResponse.json({
        success: false,
        error: 'Lead already pushed to broker',
        alreadyPushed: true,
        pushDetails: {
          pushedAt: signup.pushed_at,
          statusCode: signup.push_status_code,
          broker: signup.assigned_broker
        }
      });
    }

    // YOUR RULES: Determine which broker to use
    const selectedBroker = brokerName || determinebroker(signup);

    console.log(`📍 Selected broker: ${selectedBroker} for ${signup.country}`);

    // If AllCrypto or other broker, push immediately (no queue)
    if (selectedBroker !== 'Trading CRM') {
      return await pushImmediately(supabase, signup, selectedBroker);
    }

    // For Trading CRM: Check queue rules (unless forceImmediate is true)
    if (!forceImmediate) {
      // Check working hours
      const { data: isWorkingHours } = await supabase.rpc('is_working_hours');

      if (!isWorkingHours) {
        // Outside working hours - queue the lead
        const { data: nextWorkingHours } = await supabase.rpc('next_working_hours_start');

        await supabase
          .from('signups')
          .update({
            assigned_broker: 'Trading CRM',
            push_queue_status: 'waiting_working_hours',
            push_queue_comment: `Waiting for working hours (04:00-13:00 GMT+2, Mon-Fri). Next: ${new Date(nextWorkingHours).toLocaleString('en-US', { timeZone: 'GMT' })}`,
            push_scheduled_at: nextWorkingHours
          })
          .eq('id', signupId);

        // Log queue action
        await supabase
          .from('push_queue_log')
          .insert({
            signup_id: signupId,
            action: 'queued',
            reason: 'Outside working hours',
            working_hours: false
          });

        console.log('⏰ Lead queued - outside working hours');

        return NextResponse.json({
          success: true,
          queued: true,
          broker: 'Trading CRM',
          message: 'Lead queued - outside working hours (04:00-13:00 GMT+2, Mon-Fri)',
          scheduledFor: nextWorkingHours,
          queueStatus: 'waiting_working_hours'
        });
      }

      // Check daily cap
      const { data: todayCount } = await supabase.rpc('get_today_push_count');

      if ((todayCount || 0) >= 10) {
        // Daily cap reached - queue for tomorrow
        const { data: nextWorkingHours } = await supabase.rpc('next_working_hours_start');
        const tomorrow = new Date(nextWorkingHours);
        tomorrow.setDate(tomorrow.getDate() + 1);

        await supabase
          .from('signups')
          .update({
            assigned_broker: 'Trading CRM',
            push_queue_status: 'waiting_daily_cap',
            push_queue_comment: `Waiting for daily cap reset (10 leads/day limit reached). Next: ${tomorrow.toLocaleString('en-US', { timeZone: 'GMT' })}`,
            push_scheduled_at: tomorrow.toISOString()
          })
          .eq('id', signupId);

        // Log queue action
        await supabase
          .from('push_queue_log')
          .insert({
            signup_id: signupId,
            action: 'queued',
            reason: 'Daily cap reached (10/day)',
            push_count_today: todayCount,
            working_hours: true
          });

        console.log('📊 Lead queued - daily cap reached');

        return NextResponse.json({
          success: true,
          queued: true,
          broker: 'Trading CRM',
          message: 'Lead queued - daily cap reached (10 leads per day)',
          scheduledFor: tomorrow.toISOString(),
          queueStatus: 'waiting_daily_cap',
          pushedToday: todayCount
        });
      }
    }

    // Within working hours and under cap - push immediately
    return await pushImmediately(supabase, signup, selectedBroker);

  } catch (error: any) {
    console.error('❌ Error in push-to-broker:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

/**
 * Push lead immediately (skip queue)
 */
async function pushImmediately(supabase: any, signup: any, selectedBroker: string) {
  let pushResult;
  let statusCode;
  let errorMessage = null;

  // Push to the selected broker
  if (selectedBroker === 'Trading CRM') {
    pushResult = await pushToTradingCRM(signup);
    statusCode = pushResult.success ? 200 : 500;
    errorMessage = pushResult.success ? null : pushResult.error;

    // If successful, increment daily count
    if (pushResult.success) {
      await supabase.rpc('increment_daily_push_count');
    }
  } else if (selectedBroker === 'AllCrypto') {
    pushResult = await pushToAllCrypto(signup);
    statusCode = pushResult.success ? 200 : 500;
    errorMessage = pushResult.success ? null : pushResult.error;
  } else if (selectedBroker === 'Finoglob') {
    // Add Finoglob integration here
    pushResult = { success: false, error: 'Finoglob integration coming soon' };
    statusCode = 501;
    errorMessage = 'Finoglob integration not implemented';
  } else {
    return NextResponse.json({
      success: false,
      error: `Unknown broker: ${selectedBroker}`
    }, { status: 400 });
  }

  // Update CRM with push result
  await supabase
    .from('signups')
    .update({
      assigned_broker: selectedBroker,
      crm_status: pushResult.success ? 'sent_to_broker' : 'push_failed',
      pushed_to_crm: pushResult.success,
      push_status_code: statusCode,
      push_response: JSON.stringify({
        broker: selectedBroker,
        timestamp: new Date().toISOString(),
        ...pushResult
      }),
      push_error: errorMessage,
      pushed_at: new Date().toISOString(),
      push_queue_status: pushResult.success ? 'pushed' : 'failed',
      push_queue_comment: pushResult.success
        ? `Successfully pushed to ${selectedBroker} at ${new Date().toLocaleString('en-US', { timeZone: 'GMT' })}`
        : `Push failed: ${errorMessage}`
    })
    .eq('id', signup.id);

  // Log push action
  if (selectedBroker === 'Trading CRM') {
    const { data: todayCount } = await supabase.rpc('get_today_push_count');
    await supabase
      .from('push_queue_log')
      .insert({
        signup_id: signup.id,
        action: pushResult.success ? 'pushed' : 'failed',
        reason: pushResult.success ? 'Immediate push successful' : errorMessage,
        push_count_today: todayCount || 0,
        working_hours: true
      });
  }

  console.log(pushResult.success ? '✅ Push successful' : '❌ Push failed');

  return NextResponse.json({
    success: pushResult.success,
    broker: selectedBroker,
    statusCode,
    message: pushResult.success
      ? `Lead successfully pushed to ${selectedBroker}`
      : `Failed to push to ${selectedBroker}`,
    details: pushResult,
    error: errorMessage
  });
}

/**
 * Convert country name to ISO code for Trading CRM
 */
function countryNameToISO(countryName: string): string {
  const mapping: { [key: string]: string } = {
    'Malaysia': 'MY',
    'Turkey': 'TR',
    'France': 'FR',
    'Italy': 'IT',
    'Hong Kong': 'HK',
    'Singapore': 'SG',
    'Taiwan': 'TW',
    'Brazil': 'BR',
  };
  return mapping[countryName] || countryName;
}

/**
 * YOUR RULES: Determine which broker to use
 * Customize this function based on your requirements
 */
function determinebroker(signup: any): string {
  const { country, trading_experience, account_size } = signup;

  // BROKER ROUTING RULES

  // Rule 1: Trading CRM Countries (Priority)
  const tradingCRMCountries = ['Malaysia', 'MY', 'Turkey', 'TR', 'France', 'FR', 'Italy', 'IT', 'Hong Kong', 'HK', 'Singapore', 'SG', 'Taiwan', 'TW', 'Brazil', 'BR'];
  if (tradingCRMCountries.includes(country)) {
    return 'Trading CRM';
  }

  // Rule 2: AllCrypto Countries
  const allCryptoCountries = ['Australia', 'AU', 'South Korea', 'KR', 'Korea', 'Netherlands', 'NL', 'Belgium', 'BE', 'Spain', 'ES', 'Canada', 'CA'];
  if (allCryptoCountries.includes(country)) {
    return 'AllCrypto';
  }

  // Rule 3: High-value accounts go to Trading CRM
  if (account_size === '50k-100k' || account_size === '100k+') {
    return 'Trading CRM';
  }

  // Rule 4: Experienced traders go to Trading CRM
  if (trading_experience === '5-10' || trading_experience === '10+') {
    return 'Trading CRM';
  }

  // Default broker: Try AllCrypto, fallback to Finoglob
  return 'AllCrypto';
}

/**
 * Push lead to Trading CRM
 */
async function pushToTradingCRM(signup: any) {
  try {
    const client = createTradingCRMClient();

    const result = await client.registerLead({
      firstName: signup.first_name,
      lastName: signup.last_name,
      email: signup.email,
      phone: `${signup.country_code}${signup.phone_number}`,
      country: countryNameToISO(signup.country), // Convert to ISO code (MY, TR, FR, etc.)
      // language: auto-detected from country in trading-crm-api.ts
      // MY→ms, TR→tr, FR→fr, IT→it, HK→zh, SG→en, TW→zh, BR→pt
      ip: signup.ip_address,
      affiliateTransactionId: signup.id,
      utmSource: 'pksignalpulse',
      tag: 'signal_pulse',
    });

    if (result.success) {
      return {
        success: true,
        leadId: result.leadId,
        redirectUrl: result.redirectUrl,
        rawResponse: result.rawResponse
      };
    } else {
      return {
        success: false,
        error: result.error || 'Trading CRM API failed',
        rawResponse: result.rawResponse
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to Trading CRM'
    };
  }
}

/**
 * Push lead to AllCrypto
 */
async function pushToAllCrypto(signup: any) {
  try {
    const client = createAllCryptoClient();

    const result = await client.pushLead({
      ip: signup.ip_address || '1.1.1.1',
      country_code: countryNameToISO(signup.country), // Convert to ISO code (AU, KR, etc.)
      lead_language: signup.language || 'en',
      email: signup.email,
      first_name: signup.first_name,
      last_name: signup.last_name,
      phone: `${signup.country_code}${signup.phone_number}`,
      password: 'Auto' + Math.random().toString(36).substr(2, 9), // Auto-generate password
      aff_sub: signup.lead_source || 'pksignalpulse',
      aff_sub2: signup.utm_source || 'direct',
      aff_sub3: signup.utm_campaign || 'none',
      aff_sub4: signup.trading_experience || 'not_specified',
    }, false); // isTest = false for real leads

    if (result.success) {
      return {
        success: true,
        leadId: result.lead_uuid,
        redirectUrl: result.auto_login_url,
        advertiserName: result.advertiser_name,
        rawResponse: result.rawResponse
      };
    } else {
      return {
        success: false,
        error: result.error || 'AllCrypto API failed',
        errorType: result.errorType,
        rawResponse: result.rawResponse
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to AllCrypto'
    };
  }
}
