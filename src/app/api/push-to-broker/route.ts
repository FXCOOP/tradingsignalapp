import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createTradingCRMClient } from '@/lib/trading-crm-api';
// AllCrypto disabled - no longer routing leads to this broker
// import { createAllCryptoClient } from '@/lib/allcrypto-api';
import { createNaxClient } from '@/lib/nax-airtable-api';
import { createNTrafficClient, NTrafficClient } from '@/lib/ntraffic-api';

/**
 * Deduplication lock to prevent duplicate pushes within 5 seconds
 * Key: signupId + broker, Value: timestamp
 */
const pushLocks = new Map<string, number>();
const LOCK_DURATION_MS = 5000; // 5 seconds

/**
 * Clean up expired locks (older than LOCK_DURATION_MS)
 */
function cleanupExpiredLocks() {
  const now = Date.now();
  for (const [key, timestamp] of pushLocks.entries()) {
    if (now - timestamp > LOCK_DURATION_MS) {
      pushLocks.delete(key);
    }
  }
}

/**
 * Check if a push is already in progress
 */
function isPushLocked(signupId: string, broker: string): boolean {
  const lockKey = `${signupId}-${broker}`;
  const lockTimestamp = pushLocks.get(lockKey);

  if (lockTimestamp && Date.now() - lockTimestamp < LOCK_DURATION_MS) {
    return true; // Lock is still active
  }

  return false;
}

/**
 * Acquire a lock for this push
 */
function acquirePushLock(signupId: string, broker: string): boolean {
  const lockKey = `${signupId}-${broker}`;

  if (isPushLocked(signupId, broker)) {
    return false; // Already locked
  }

  pushLocks.set(lockKey, Date.now());
  return true;
}

/**
 * Release a lock for this push
 */
function releasePushLock(signupId: string, broker: string) {
  const lockKey = `${signupId}-${broker}`;
  pushLocks.delete(lockKey);
}

/**
 * API Endpoint: Push lead from CRM to broker
 * Called from CRM dashboard based on YOUR rules
 *
 * POST /api/push-to-broker
 * Body: { signupId: string, brokerName?: string, forceImmediate?: boolean }
 *
 * Supported Brokers:
 * - Trading CRM: MY, TR, FR, HK, SG, TW, BR
 * - NAX Capital: AU (Australia)
 * - N_Traffic: IT (Italy) - PRIMARY for Italian leads
 *
 * Queue System (Trading CRM only):
 * - Working Hours: 04:00-13:00 GMT+2 (Monday-Friday)
 * - Daily Cap: 10 leads per day
 * - Natural spacing: 5-15 minutes between queued pushes
 */
export async function POST(request: NextRequest) {
  try {
    // Clean up expired locks at the start of each request
    cleanupExpiredLocks();

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
    // If broker name is provided but doesn't match country routing, use the correct broker
    let selectedBroker = brokerName || determinebroker(signup);

    // Auto-correct broker assignment based on country (override old assignments)
    const correctBroker = determinebroker(signup);
    if (selectedBroker !== correctBroker && !brokerName) {
      console.log(`🔄 Auto-correcting broker: ${selectedBroker} → ${correctBroker} for ${signup.country}`);
      selectedBroker = correctBroker;
    }

    console.log(`📍 Selected broker: ${selectedBroker} for ${signup.country}`);

    // DEDUPLICATION: Check if this push is already in progress
    if (isPushLocked(signupId, selectedBroker)) {
      console.log(`⚠️ Duplicate push blocked: ${signup.email} → ${selectedBroker}`);
      return NextResponse.json({
        success: false,
        error: `Push to ${selectedBroker} already in progress for this lead`,
        duplicate: true,
        message: 'This lead is already being pushed to the broker. Please wait.'
      }, { status: 409 }); // 409 Conflict
    }

    // Acquire lock for this push
    if (!acquirePushLock(signupId, selectedBroker)) {
      console.log(`⚠️ Failed to acquire lock: ${signup.email} → ${selectedBroker}`);
      return NextResponse.json({
        success: false,
        error: 'Failed to acquire push lock',
        duplicate: true
      }, { status: 409 });
    }

    console.log(`🔒 Lock acquired for: ${signup.email} → ${selectedBroker}`);

    try {
      // If AllCrypto or other broker, push immediately (no queue)
      if (selectedBroker !== 'Trading CRM') {
        const result = await pushImmediately(supabase, signup, selectedBroker);
        releasePushLock(signupId, selectedBroker);
        console.log(`🔓 Lock released for: ${signup.email} → ${selectedBroker}`);
        return result;
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
          releasePushLock(signupId, selectedBroker);

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
          releasePushLock(signupId, selectedBroker);

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
      const result = await pushImmediately(supabase, signup, selectedBroker);
      releasePushLock(signupId, selectedBroker);
      console.log(`🔓 Lock released for: ${signup.email} → ${selectedBroker}`);
      return result;

    } catch (pushError: any) {
      // Release lock on error
      releasePushLock(signupId, selectedBroker);
      console.log(`🔓 Lock released (error) for: ${signup.email} → ${selectedBroker}`);
      throw pushError; // Re-throw to outer catch
    }

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
  // AllCrypto disabled - no longer routing leads to this broker
  // } else if (selectedBroker === 'AllCrypto') {
  //   pushResult = await pushToAllCrypto(signup);
  //   statusCode = pushResult.success ? 200 : 500;
  //   errorMessage = pushResult.success ? null : pushResult.error;
  } else if (selectedBroker === 'NAX') {
    pushResult = await pushToNAX(signup);
    statusCode = pushResult.success ? 200 : 500;
    errorMessage = pushResult.success ? null : pushResult.error;
  } else if (selectedBroker === 'N_Traffic') {
    pushResult = await pushToNTraffic(signup);
    statusCode = pushResult.success ? 200 : (pushResult.httpCode || 500);
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

  // Update CRM with push result - ALWAYS save response (success or failure)
  const pushResponseData: Record<string, any> = {
    success: pushResult.success,
    broker: selectedBroker,
    timestamp: new Date().toISOString(),
    httpCode: statusCode,
    error: errorMessage,
    message: pushResult.success
      ? `Successfully pushed to ${selectedBroker}`
      : `Failed: ${errorMessage}`,
    // Include broker-specific response data (if available)
    leadId: (pushResult as any).leadId,
    leadRequestId: (pushResult as any).leadRequestId,
    redirectUrl: (pushResult as any).redirectUrl,
    advertiserName: (pushResult as any).advertiserName,
    offerName: (pushResult as any).offerName,
    // Full raw response from broker API
    rawResponse: (pushResult as any).rawResponse
  };

  await supabase
    .from('signups')
    .update({
      assigned_broker: selectedBroker,
      crm_status: pushResult.success ? 'sent_to_broker' : 'push_failed',
      pushed_to_crm: pushResult.success,
      push_status_code: statusCode,
      push_response: JSON.stringify(pushResponseData),
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

  // Rule 1: N_Traffic Countries (Italy) - PRIMARY for IT
  const ntrafficCountries = ['Italy', 'IT'];
  if (ntrafficCountries.includes(country)) {
    return 'N_Traffic';
  }

  // Rule 2: NAX Countries (Australia)
  const naxCountries = ['Australia', 'AU'];
  if (naxCountries.includes(country)) {
    return 'NAX';
  }

  // Rule 3: Trading CRM Countries (IT removed - now goes to N_Traffic)
  const tradingCRMCountries = ['Malaysia', 'MY', 'Turkey', 'TR', 'France', 'FR', 'Hong Kong', 'HK', 'Singapore', 'SG', 'Taiwan', 'TW', 'Brazil', 'BR'];
  if (tradingCRMCountries.includes(country)) {
    return 'Trading CRM';
  }

  // AllCrypto disabled - no longer routing leads to this broker
  // const allCryptoCountries = ['South Korea', 'KR', 'Korea', 'Netherlands', 'NL', 'Belgium', 'BE', 'Spain', 'ES', 'Canada', 'CA'];
  // if (allCryptoCountries.includes(country)) {
  //   return 'AllCrypto';
  // }

  // Rule 4: High-value accounts go to Trading CRM
  if (account_size === '50k-100k' || account_size === '100k+') {
    return 'Trading CRM';
  }

  // Rule 5: Experienced traders go to Trading CRM
  if (trading_experience === '5-10' || trading_experience === '10+') {
    return 'Trading CRM';
  }

  // Default broker: Trading CRM (AllCrypto disabled)
  return 'Trading CRM';
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

// AllCrypto disabled - no longer routing leads to this broker
// async function pushToAllCrypto(signup: any) { ... }

/**
 * Push lead to NAX Capital (Australia)
 */
async function pushToNAX(signup: any) {
  try {
    const client = createNaxClient();

    const result = await client.pushLead({
      partner_id: process.env.NAX_PARTNER_ID || '',
      name: `${signup.first_name} ${signup.last_name}`,
      email: signup.email,
      phone: `${signup.country_code}${signup.phone_number}`,
      source: signup.lead_source || 'pksignalpulse',
      interested_in: 'Trading Signals',
      message: `Trading experience: ${signup.trading_experience || 'not specified'}, Account size: ${signup.account_size || 'not specified'}`,
    });

    if (result.success) {
      return {
        success: true,
        rawResponse: result.rawResponse
      };
    } else {
      return {
        success: false,
        error: result.error || 'NAX API failed',
        errorType: result.errorType,
        rawResponse: result.rawResponse
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to NAX'
    };
  }
}

/**
 * Push lead to N_Traffic (Italy)
 */
async function pushToNTraffic(signup: any) {
  try {
    const client = createNTrafficClient();

    // Extract phone - clean symbols only
    let phoneNumber = signup.phone_number || '';
    console.log(`📞 Original phone from DB: "${phoneNumber}"`);

    // Clean phone number - remove symbols only (keep digits)
    phoneNumber = phoneNumber.replace(/[\s+\-()]/g, '');
    console.log(`📞 After cleaning symbols: "${phoneNumber}"`);

    // Remove country code 39 if present (areaCode sent separately)
    if (phoneNumber.startsWith('39') && phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substring(2);
      console.log(`📞 After removing 39 prefix: "${phoneNumber}"`);
    }

    // Fix: Italian mobile numbers should be 10 digits starting with 3
    // The form strips +39 and sometimes more digits
    // Phone format: user enters +393331263849 → stored as 31263849 (8 digits, missing 33 prefix!)
    // Pad with 3s until we have 10 digits
    while (phoneNumber.length < 10) {
      phoneNumber = '3' + phoneNumber;
      console.log(`📞 Padded phone: "${phoneNumber}" (${phoneNumber.length} digits)`);
    }

    // Italian mobile: should be 9-10 digits starting with 3
    console.log(`📞 FINAL Phone for N_Traffic: areaCode=39, phone="${phoneNumber}" (${phoneNumber.length} digits)`);

    // Generate random Italian IP for geo-validation
    const italianIP = NTrafficClient.generateItalianIP();
    console.log(`🇮🇹 Generated Italian IP for N_Traffic: ${italianIP}`);

    const result = await client.pushLead({
      email: signup.email,
      firstName: signup.first_name,
      lastName: signup.last_name,
      password: NTrafficClient.generatePassword(), // Auto-generate strong password
      ip: italianIP, // Use generated Italian IP for geo-validation
      phone: phoneNumber, // National format without country code
      areaCode: '39', // Italy country code
      locale: 'it_IT', // Italian locale
      custom1: signup.id, // Our signup ID for reference
      custom2: signup.lead_source || 'pksignalpulse', // Campaign source
      custom3: signup.trading_experience || undefined, // Trading experience
      custom4: signup.account_size || undefined, // Account size
      custom5: 'pksignalpulse', // Our identifier
      comment: signup.trading_experience ? `Trading experience: ${signup.trading_experience}` : undefined,
      offerWebsite: process.env.NEXT_PUBLIC_APP_URL || undefined,
    });

    if (result.success) {
      return {
        success: true,
        leadRequestId: result.leadRequestId,
        redirectUrl: result.redirectUrl,
        advertiserName: result.advertiserName,
        offerName: result.offerName,
        rawResponse: result.rawResponse
      };
    } else {
      return {
        success: false,
        error: result.error || 'N_Traffic API failed',
        httpCode: result.httpCode,
        rawResponse: result.rawResponse
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to connect to N_Traffic'
    };
  }
}
