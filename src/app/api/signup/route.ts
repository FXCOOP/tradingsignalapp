import { NextRequest, NextResponse } from 'next/server';
import { createSignup, getAllSignups, getSignupByEmail, createUser, type SignupData } from '@/lib/supabase';
import { createTradingCRMClient, TradingCRMClient } from '@/lib/trading-crm-api';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields (NO PASSWORD REQUIRED!)
    const { firstName, lastName, email, countryCode, phoneNumber, country, termsAccepted, language, tradingExperience, accountSize } = data;

    if (!firstName || !lastName || !email || !countryCode || !phoneNumber || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept the terms and conditions' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSignup = await getSignupByEmail(email);
    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email has already been registered' },
        { status: 409 }
      );
    }

    // Get client IP for tracking
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               null;

    // Get user agent
    const userAgent = request.headers.get('user-agent') || null;

    // Get referrer
    const referrer = request.headers.get('referer') || null;

    // Get UTM parameters if available
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source') || null;
    const utmMedium = url.searchParams.get('utm_medium') || null;
    const utmCampaign = url.searchParams.get('utm_campaign') || null;

    // Get detected country from data (if provided)
    const detectedCountry = data.detectedCountry || null;

    // Create signup record for Supabase
    const signupData: SignupData = {
      first_name: firstName,
      last_name: lastName,
      email,
      country_code: countryCode,
      phone_number: phoneNumber,
      country,
      detected_country: detectedCountry,
      trading_experience: tradingExperience || null,
      account_size: accountSize || null,
      terms_accepted: termsAccepted,
      ip_address: ip,
      user_agent: userAgent,
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    };

    // Save signup to signups table (lead generation)
    const signup = await createSignup(signupData);

    console.log('✅ Signup created in CRM:', signup.id);

    // 🚀 AUTO-PUSH TO BROKER (Trading CRM)
    // Check if country is supported for Trading CRM
    if (TradingCRMClient.isSupportedCountry(country)) {
      console.log('🔄 Auto-pushing lead to Trading CRM...', { email, country });

      // Push to Trading CRM in background (don't block signup)
      pushLeadToBroker(signup, {
        firstName,
        lastName,
        email,
        phone: `${countryCode}${phoneNumber}`,
        country,
        language: language || 'en',
        ip,
        signupId: signup.id
      }).catch(error => {
        console.error('❌ Failed to auto-push to Trading CRM:', error);
        // Don't fail the signup if broker push fails
      });
    } else {
      console.log('ℹ️ Country not supported for Trading CRM:', country);
    }

    // Generate random password for passwordless signup
    // User will use email verification or phone verification to login
    const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
    const passwordHash = await bcrypt.hash(randomPassword, 10);

    // Create user account with premium access
    const user = await createUser({
      email,
      password_hash: passwordHash,
      full_name: `${firstName} ${lastName}`,
      access_level: 'premium', // All signups get FREE premium access
      language: language || 'en' // Save preferred language
    });

    // Note: Not updating last_login - column doesn't exist in users table
    // Last login tracking can be added later if needed

    // Generate JWT token for auto-login
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        access_level: user.access_level,
        isPremium: true // Everyone gets premium for free
      },
      JWT_SECRET,
      { expiresIn: '30d' } // Token valid for 30 days
    );

    console.log('New signup created:', signup);
    console.log('User account created with premium access:', user.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for signing up! You now have full premium access.',
        id: signup.id,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          access_level: user.access_level,
          isPremium: true
        },
        token // Send token for auto-login
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Signup error:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      stack: error?.stack
    });

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || error?.hint || 'Please try again or contact support'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Admin endpoint to view signups
  // TODO: Add authentication middleware in production
  try {
    const signups = await getAllSignups();

    return NextResponse.json(
      {
        signups,
        total: signups.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching signups:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send admin notification (implement as needed)
async function sendAdminNotification(signup: any) {
  // Example: Send email or Slack notification
  // await emailService.send({
  //   to: 'admin@example.com',
  //   subject: 'New Signup',
  //   body: `New signup from ${signup.firstName} ${signup.lastName} (${signup.email})`
  // });
}

// Helper function to send welcome email (implement as needed)
async function sendWelcomeEmail(signup: any) {
  // Example: Send welcome email to user
  // await emailService.send({
  //   to: signup.email,
  //   subject: 'Welcome to GCC Signal Pro',
  //   body: `Hi ${signup.firstName}, welcome aboard!`
  // });
}

/**
 * Push lead to Trading CRM broker automatically
 */
async function pushLeadToBroker(signup: any, data: any) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log('📤 Pushing lead to Trading CRM:', data.email);

    // Create Trading CRM client
    const client = createTradingCRMClient();

    // Send lead to Trading CRM
    const result = await client.registerLead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      language: data.language,
      ip: data.ip,
      affiliateTransactionId: data.signupId,
      utmSource: 'pksignalpulse',
      tag: 'signal_pulse',
    });

    if (result.success) {
      console.log('✅ Lead successfully pushed to Trading CRM:', result.leadId);

      // Update signup record with success
      await supabase
        .from('signups')
        .update({
          assigned_broker: 'Trading CRM - AFF 225X',
          crm_status: 'sent_to_broker',
          pushed_to_crm: true,
          push_status_code: 200,
          push_response: JSON.stringify({
            success: true,
            leadId: result.leadId,
            redirectUrl: result.redirectUrl,
            timestamp: new Date().toISOString(),
            message: 'Lead successfully sent to Trading CRM',
            rawResponse: result.rawResponse
          }),
          push_error: null,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', data.signupId);

      console.log('✅ Database updated with push success');
    } else {
      console.error('❌ Trading CRM push failed:', result.error);

      // Update signup record with failure
      await supabase
        .from('signups')
        .update({
          pushed_to_crm: false,
          push_status_code: 500,
          push_response: JSON.stringify({
            success: false,
            error: result.error,
            timestamp: new Date().toISOString(),
            rawResponse: result.rawResponse
          }),
          push_error: result.error,
          pushed_at: new Date().toISOString(),
        })
        .eq('id', data.signupId);

      console.log('❌ Database updated with push failure');
    }
  } catch (error) {
    console.error('❌ Error in pushLeadToBroker:', error);
    throw error;
  }
}