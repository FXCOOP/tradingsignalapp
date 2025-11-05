import { NextRequest, NextResponse } from 'next/server';
import { createSignup, getAllSignups, getSignupByEmail, createUser, type SignupData } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createTradingCRMClient, TradingCRMClient, type LeadData } from '@/lib/trading-crm-api';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields (NO PASSWORD REQUIRED!)
    const { firstName, lastName, email, countryCode, phoneNumber, country, termsAccepted, language } = data;

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

    // Extract country ISO code from country name or use detected country
    let countryIso = extractCountryIso(country, detectedCountry);

    // Auto-send lead to Trading CRM if country is supported
    let tradingCrmResult = null;
    const isTradingCrmEnabled = process.env.TRADING_CRM_ENABLED !== 'false';

    if (isTradingCrmEnabled && countryIso && TradingCRMClient.isSupportedCountry(countryIso)) {
      console.log(`Country ${countryIso} is supported by Trading CRM. Sending lead automatically...`);

      try {
        const client = createTradingCRMClient();
        const leadData: LeadData = {
          firstName,
          lastName,
          email,
          phone: `${countryCode}${phoneNumber}`,
          country: countryIso,
          language: language || TradingCRMClient.getLanguageForCountry(countryIso),
          ip: ip || undefined,
          campaignId: utmCampaign || process.env.TRADING_CRM_DEFAULT_CAMPAIGN_ID,
          tag: utmSource || 'pk_signal_pulse',
          tag1: utmMedium || undefined,
          utmSource: utmSource || undefined,
          utmCampaign: utmCampaign || undefined,
          affiliateTransactionId: signup.id,
          registrationUrl: process.env.NEXT_PUBLIC_APP_URL,
          additionalInfo1: `Signup ID: ${signup.id}`,
          additionalInfo2: `User ID: ${user.id}`,
          additionalInfo3: 'Auto-sent on signup',
        };

        tradingCrmResult = await client.registerLead(leadData);

        if (tradingCrmResult.success) {
          console.log('Lead successfully sent to Trading CRM:', {
            email,
            country: countryIso,
            leadId: tradingCrmResult.leadId,
          });
        } else {
          console.error('Failed to send lead to Trading CRM:', tradingCrmResult.error);
        }
      } catch (tradingCrmError) {
        console.error('Error sending lead to Trading CRM:', tradingCrmError);
        // Continue signup flow even if broker integration fails
      }
    } else if (!isTradingCrmEnabled) {
      console.log('Trading CRM integration is disabled');
    } else {
      console.log(`Country ${countryIso} is not supported by Trading CRM`);
    }

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
        token, // Send token for auto-login
        brokerIntegration: tradingCrmResult ? {
          sent: tradingCrmResult.success,
          leadId: tradingCrmResult.leadId,
          redirectUrl: tradingCrmResult.redirectUrl,
        } : null
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

// Helper function to extract country ISO code from country name
function extractCountryIso(countryName: string, detectedCountry: string | null): string | null {
  // Country name to ISO mapping for Trading CRM target countries
  const countryMapping: Record<string, string> = {
    'malaysia': 'MY',
    'turkey': 'TR',
    'france': 'FR',
    'italy': 'IT',
    'hong kong': 'HK',
    'singapore': 'SG',
    'taiwan': 'TW',
    'brazil': 'BR',
  };

  // Try to match country name (case insensitive)
  const normalized = countryName.toLowerCase().trim();
  if (countryMapping[normalized]) {
    return countryMapping[normalized];
  }

  // If country name is already an ISO code, return it
  if (countryName.length === 2) {
    return countryName.toUpperCase();
  }

  // Try detected country if available
  if (detectedCountry && detectedCountry.length === 2) {
    return detectedCountry.toUpperCase();
  }

  return null;
}