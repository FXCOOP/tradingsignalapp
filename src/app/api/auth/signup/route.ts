import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { hashPassword, generateToken, generateVerificationToken } from '@/lib/auth'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, full_name } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const password_hash = await hashPassword(password)

    // Generate verification token
    const email_verification_token = generateVerificationToken()

    // Create user
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password_hash,
        full_name,
        access_level: 'free',
        has_broker_account: false,
        free_signals_count: 0,
        free_articles_count: 0,
        email_verification_token,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating user:', createError)
      return NextResponse.json(
        { success: false, error: 'Failed to create account' },
        { status: 500 }
      )
    }

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.email)

    // Send welcome email with Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
        to: email,
        subject: 'Welcome to GCC Signal Pro! 🎉',
        html: `
          <h1>Welcome to GCC Signal Pro!</h1>
          <p>Hi ${full_name || 'Trader'},</p>
          <p>Your account has been created successfully.</p>

          <h2>What you get for FREE:</h2>
          <ul>
            <li>✅ 3 Free Trading Signals</li>
            <li>✅ 3 Free Market Analysis Articles</li>
            <li>✅ Basic Trading Tips</li>
          </ul>

          <h2>Want UNLIMITED Access?</h2>
          <p>Open a broker account with just $10 minimum deposit and unlock:</p>
          <ul>
            <li>🚀 Unlimited Trading Signals</li>
            <li>📊 Full Market Analysis</li>
            <li>🎓 Complete Education Platform</li>
            <li>💼 Copy Trading Features</li>
          </ul>

          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}"
               style="background: #667eea; color: white; padding: 12px 24px;
                      text-decoration: none; border-radius: 8px; display: inline-block;">
              Start Trading Now
            </a>
          </p>

          <p>Happy Trading!<br>GCC Signal Pro Team</p>
        `
      })
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail signup if email fails
    }

    // Return success with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        access_level: newUser.access_level,
        has_broker_account: newUser.has_broker_account,
        free_signals_count: newUser.free_signals_count,
        free_articles_count: newUser.free_articles_count
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
