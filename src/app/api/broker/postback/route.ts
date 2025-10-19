import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// Verify postback signature (if Exness provides one)
function verifyExnessSignature(payload: any, signature: string): boolean {
  const secret = process.env.EXNESS_WEBHOOK_SECRET
  if (!secret || secret === 'temporary_secret_update_later') return true // Skip verification in development

  const calculatedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex')

  return calculatedSignature === signature
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  try {
    const body = await request.json()
    console.log('📡 Received broker postback:', body)

    // Extract data from postback
    const {
      event,
      partner_id,
      client_id, // THIS IS YOUR USER ID!
      trader_id,
      deposit_amount,
      currency = 'USD'
    } = body

    // Verify signature if provided
    const signature = request.headers.get('x-exness-signature')
    const signatureValid = signature ? verifyExnessSignature(body, signature) : null

    // Log postback to database (for debugging and security)
    const { data: postbackLog } = await supabaseAdmin
      .from('broker_postbacks')
      .insert({
        broker_name: 'exness',
        event_type: event || 'unknown',
        raw_data: body,
        trader_id,
        deposit_amount: deposit_amount ? parseFloat(deposit_amount) : null,
        currency,
        processed: false,
        ip_address: ip,
        signature_valid: signatureValid
      })
      .select()
      .single()

    // Validate required fields
    if (!client_id) {
      console.error('❌ No client_id in postback')
      if (postbackLog) {
        await supabaseAdmin
          .from('broker_postbacks')
          .update({
            error_message: 'Missing client_id',
            processed: true
          })
          .eq('id', postbackLog.id)
      }

      // Still return 200 to Exness
      return NextResponse.json({ success: false, error: 'Missing client_id' })
    }

    // Find user by client_id
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', client_id)
      .single()

    if (userError || !user) {
      console.error('❌ User not found:', client_id)
      if (postbackLog) {
        await supabaseAdmin
          .from('broker_postbacks')
          .update({
            error_message: `User not found: ${client_id}`,
            processed: true
          })
          .eq('id', postbackLog.id)
      }

      return NextResponse.json({ success: false, error: 'User not found' })
    }

    // Check if user already has broker account
    if (user.has_broker_account) {
      console.log('ℹ️ User already has broker account')
      if (postbackLog) {
        await supabaseAdmin
          .from('broker_postbacks')
          .update({
            user_id: user.id,
            error_message: 'User already verified',
            processed: true
          })
          .eq('id', postbackLog.id)
      }

      return NextResponse.json({ success: true, message: 'Already verified' })
    }

    // 🎉 UPGRADE USER TO PREMIUM!
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        has_broker_account: true,
        broker_verified_at: new Date().toISOString(),
        broker_trader_id: trader_id,
        broker_name: 'exness',
        broker_deposit_amount: deposit_amount ? parseFloat(deposit_amount) : null,
        access_level: 'premium'
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('❌ Error updating user:', updateError)
      if (postbackLog) {
        await supabaseAdmin
          .from('broker_postbacks')
          .update({
            user_id: user.id,
            error_message: `Update failed: ${updateError.message}`,
            processed: false
          })
          .eq('id', postbackLog.id)
      }

      return NextResponse.json({ success: false, error: 'Update failed' })
    }

    // Mark postback as processed
    if (postbackLog) {
      await supabaseAdmin
        .from('broker_postbacks')
        .update({
          user_id: user.id,
          processed: true,
          processed_at: new Date().toISOString()
        })
        .eq('id', postbackLog.id)
    }

    // Send congratulations email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
        to: user.email,
        subject: '🎉 Premium Access Unlocked - Welcome to GCC Signal Pro!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #10b981;">🎉 Congratulations!</h1>
            <p>Hi ${user.full_name || 'Trader'},</p>

            <p style="font-size: 18px; font-weight: bold; color: #1e3c72;">
              Your broker account has been verified!
            </p>

            <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                        padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h2 style="margin: 0 0 15px 0;">✅ Premium Access Activated</h2>
              <ul style="list-style: none; padding: 0;">
                <li>🚀 <strong>Unlimited</strong> Trading Signals</li>
                <li>📊 <strong>Unlimited</strong> Market Analysis</li>
                <li>🎓 <strong>Full Access</strong> to Education Platform</li>
                <li>💼 <strong>Copy Trading</strong> Features</li>
                <li>📈 <strong>Premium</strong> Tips & Strategies</li>
                <li>🔔 <strong>Real-time</strong> Email Alerts</li>
              </ul>
            </div>

            <p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}"
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white; padding: 15px 30px; text-decoration: none;
                        border-radius: 8px; display: inline-block; font-weight: bold;">
                Access Your Premium Account Now
              </a>
            </p>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              <strong>Broker Details:</strong><br>
              Trader ID: ${trader_id || 'N/A'}<br>
              Verified: ${new Date().toLocaleDateString()}
            </p>

            <p>Happy Trading!<br><strong>GCC Signal Pro Team</strong></p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Error sending congratulations email:', emailError)
      // Don't fail postback if email fails
    }

    console.log('✅ User upgraded to premium:', user.email)

    // Return success to Exness
    return NextResponse.json({
      success: true,
      message: 'Postback processed successfully',
      user_id: user.id
    })

  } catch (error) {
    console.error('❌ Postback processing error:', error)

    // Always return 200 to Exness so they don't retry
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
