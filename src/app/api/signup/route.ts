import { NextRequest, NextResponse } from 'next/server';
import { createSignup, getAllSignups, getSignupByEmail, type SignupData } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const { firstName, lastName, email, countryCode, phoneNumber, country, termsAccepted } = data;

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

    // Save to Supabase
    const signup = await createSignup(signupData);

    // Here you can add additional logic like:
    // - Send email notification to admin
    // - Send welcome email to user
    // - Add to CRM system
    // - Trigger webhook to trading platform

    // Optional: Send notification email
    // await sendAdminNotification(signup);
    // await sendWelcomeEmail(signup);

    console.log('New signup created:', signup);

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful',
        id: signup.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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