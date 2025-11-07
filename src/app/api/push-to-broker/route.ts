import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createTradingCRMClient } from '@/lib/trading-crm-api';

/**
 * API Endpoint: Push lead from CRM to broker
 * Called from CRM dashboard based on YOUR rules
 *
 * POST /api/push-to-broker
 * Body: { signupId: string, brokerName?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { signupId, brokerName } = await request.json();

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

    let pushResult;
    let statusCode;
    let errorMessage = null;

    // Push to the selected broker
    if (selectedBroker === 'Trading CRM') {
      pushResult = await pushToTradingCRM(signup);
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
      })
      .eq('id', signupId);

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

  } catch (error: any) {
    console.error('❌ Error in push-to-broker:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
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

  // EXAMPLE RULES - Customize these!

  // Rule 1: Specific countries go to Trading CRM
  const tradingCRMCountries = ['Malaysia', 'Turkey', 'France', 'Italy', 'Hong Kong', 'Singapore', 'Taiwan', 'Brazil'];
  if (tradingCRMCountries.includes(country)) {
    return 'Trading CRM';
  }

  // Rule 2: High-value accounts go to specific broker
  if (account_size === '50k-100k' || account_size === '100k+') {
    return 'Trading CRM'; // Or premium broker
  }

  // Rule 3: Experienced traders
  if (trading_experience === '5-10' || trading_experience === '10+') {
    return 'Trading CRM';
  }

  // Default broker
  return 'Finoglob';
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
      language: 'en',
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
