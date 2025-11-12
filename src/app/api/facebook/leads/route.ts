import { NextRequest, NextResponse } from 'next/server';
import { createSignup, type SignupData } from '@/lib/supabase';
import crypto from 'crypto';

// ✅ GET: Facebook Webhook Verification
// Facebook will send a GET request to verify your webhook URL
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    // Verify token (set this in your .env as FACEBOOK_VERIFY_TOKEN)
    const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || 'tradeflow_webhook_verify_token_2025';

    console.log('🔍 Facebook webhook verification request:', { mode, token, challenge });

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Facebook webhook verified successfully');
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.error('❌ Facebook webhook verification failed');
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }
  } catch (error) {
    console.error('❌ Error in webhook verification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ POST: Receive Facebook Lead Ads data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📥 Facebook Lead Ads webhook received:', JSON.stringify(body, null, 2));

    // Verify webhook signature (recommended for production)
    const signature = request.headers.get('x-hub-signature-256');
    if (signature && process.env.FACEBOOK_APP_SECRET) {
      const isValid = verifySignature(signature, await request.text(), process.env.FACEBOOK_APP_SECRET);
      if (!isValid) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
      }
    }

    // Process each entry in the webhook payload
    if (body.object === 'page') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'leadgen') {
            const leadgenData = change.value;
            console.log('📋 Processing lead:', leadgenData);

            // Fetch full lead data from Facebook Graph API
            const leadId = leadgenData.leadgen_id;
            const pageId = leadgenData.page_id;
            const formId = leadgenData.form_id;

            try {
              await processLead(leadId, pageId, formId);
            } catch (error) {
              console.error(`❌ Error processing lead ${leadId}:`, error);
              // Continue processing other leads even if one fails
            }
          }
        }
      }
    }

    // Always return 200 to Facebook to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Error in Facebook webhook:', error);
    // Still return 200 to avoid Facebook retrying
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

/**
 * Fetch full lead data from Facebook Graph API and save to CRM
 */
async function processLead(leadId: string, pageId: string, formId: string) {
  console.log(`🔄 Fetching lead data from Facebook Graph API: ${leadId}`);

  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN not configured');
  }

  // Fetch lead data from Facebook Graph API
  const graphUrl = `https://graph.facebook.com/v21.0/${leadId}?access_token=${accessToken}`;
  const response = await fetch(graphUrl);
  const leadData = await response.json();

  if (leadData.error) {
    console.error('❌ Facebook API error:', leadData.error);
    throw new Error(`Facebook API error: ${leadData.error.message}`);
  }

  console.log('📊 Lead data from Facebook:', JSON.stringify(leadData, null, 2));

  // Parse field data from Facebook format
  const fields = leadData.field_data || [];
  const leadInfo: any = {};

  fields.forEach((field: any) => {
    const name = field.name.toLowerCase();
    const values = field.values || [];
    const value = values[0] || '';

    // Map Facebook field names to our format
    if (name.includes('first') || name === 'firstname') {
      leadInfo.firstName = value;
    } else if (name.includes('last') || name === 'lastname') {
      leadInfo.lastName = value;
    } else if (name.includes('email')) {
      leadInfo.email = value;
    } else if (name.includes('phone')) {
      leadInfo.phone = value;
    } else if (name.includes('full_name') || name === 'name') {
      // Split full name if provided instead of separate fields
      const nameParts = value.split(' ');
      leadInfo.firstName = leadInfo.firstName || nameParts[0];
      leadInfo.lastName = leadInfo.lastName || nameParts.slice(1).join(' ');
    }
  });

  console.log('🔄 Parsed lead info:', leadInfo);

  // Validate required fields
  if (!leadInfo.email) {
    console.error('❌ Missing required field: email');
    throw new Error('Email is required');
  }

  // Extract phone number and country code
  let phoneNumber = leadInfo.phone || '';
  let countryCode = '';
  let country = 'Unknown';

  if (phoneNumber) {
    // Try to extract country code from phone number
    const phoneMatch = phoneNumber.match(/^\+?(\d{1,4})/);
    if (phoneMatch) {
      countryCode = phoneMatch[1];
      // Map country code to country name (simplified)
      const countryMap: any = {
        '1': 'US',
        '44': 'UK',
        '34': 'ES',
        '39': 'IT',
        '33': 'FR',
        '49': 'DE',
        '351': 'PT',
        '52': 'MX',
        '55': 'BR',
        '972': 'IL',
      };
      country = countryMap[countryCode] || 'Unknown';
    }
    // Remove country code from phone number
    phoneNumber = phoneNumber.replace(/^\+?\d{1,4}\s*/, '');
  }

  // Create signup data
  const signupData: SignupData = {
    first_name: leadInfo.firstName || 'Unknown',
    last_name: leadInfo.lastName || 'Unknown',
    email: leadInfo.email,
    country_code: countryCode || '1',
    phone_number: phoneNumber || '',
    country: country,
    trading_experience: null,
    account_size: null,
    terms_accepted: true, // Facebook leads already accepted terms
    ip_address: null,
    user_agent: 'Facebook Lead Ads',
    referrer: `facebook_page_${pageId}`,
    utm_source: 'facebook',
    utm_medium: 'lead_ads',
    utm_campaign: `form_${formId}`,
  };

  console.log('💾 Saving lead to CRM:', signupData);

  // Save to database
  const signup = await createSignup(signupData);

  console.log('✅ Lead saved to CRM:', signup.id);

  // Update with lead source using the CRM function
  const { updateSignupCRM } = await import('@/lib/supabase');
  await updateSignupCRM(signup.id, {
    lead_source: 'facebook_lead_ads'
  });

  // 🤖 Auto-assign to broker
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tradeflow.blog';
    const pushResponse = await fetch(`${baseUrl}/api/push-to-broker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signupId: signup.id })
    });

    const pushResult = await pushResponse.json();

    if (pushResult.success) {
      console.log(`✅ Facebook lead auto-assigned to ${pushResult.broker}`);
    } else {
      console.log(`⚠️ Facebook lead saved but broker assignment pending: ${pushResult.error}`);
    }
  } catch (error) {
    console.error('❌ Error in automated broker assignment for Facebook lead:', error);
  }

  return signup;
}

/**
 * Verify webhook signature from Facebook
 */
function verifySignature(signature: string, body: string, appSecret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(body)
      .digest('hex');

    const signatureHash = signature.replace('sha256=', '');
    return crypto.timingSafeEqual(
      Buffer.from(signatureHash, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('❌ Error verifying signature:', error);
    return false;
  }
}
