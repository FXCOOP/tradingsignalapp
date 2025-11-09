import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';

/**
 * IP Monitoring Endpoint
 *
 * This endpoint:
 * 1. Detects Render's OUTBOUND IP (the IP used to call external services)
 * 2. Logs IP to database
 * 3. Detects IP changes
 * 4. Sends email alert if IP changes
 * 5. Returns current IP info
 *
 * Call this endpoint periodically (e.g., every hour) via cron
 */
export async function GET(request: NextRequest) {
  try {
    // Get Render's OUTBOUND IP by calling an external IP echo service
    // This is the IP that Trading CRM sees when we make API calls
    console.log('🌐 Detecting Render outbound IP...');

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const currentIp = ipData.ip;

    console.log('🌐 IP Monitoring Check:', {
      currentIp,
      method: 'outbound (api.ipify.org)',
      timestamp: new Date().toISOString()
    });

    // Get last known IP from database
    const { data: lastIpRecord, error: fetchError } = await supabase
      .from('ip_monitoring')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('❌ Error fetching last IP:', fetchError);
    }

    const lastKnownIp = lastIpRecord?.ip_address;
    const ipChanged = lastKnownIp && lastKnownIp !== currentIp;

    // Extract request headers for logging
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    // Log current IP to database
    const { error: insertError } = await supabase
      .from('ip_monitoring')
      .insert({
        ip_address: currentIp,
        changed: ipChanged,
        previous_ip: ipChanged ? lastKnownIp : null,
        headers: {
          'x-forwarded-for': forwardedFor,
          'x-real-ip': realIp,
          'cf-connecting-ip': cfConnectingIp,
        },
        environment: process.env.NODE_ENV || 'unknown',
      });

    if (insertError) {
      console.error('❌ Error inserting IP log:', insertError);
    }

    // If IP changed, log warning and send email alert
    if (ipChanged) {
      console.warn('⚠️ ⚠️ ⚠️ RENDER IP CHANGED! ⚠️ ⚠️ ⚠️');
      console.warn(`Previous IP: ${lastKnownIp}`);
      console.warn(`New IP: ${currentIp}`);
      console.warn('ACTION REQUIRED: Update Trading CRM IP whitelist!');
      console.warn(`New IP to whitelist: ${currentIp}`);

      // Send email alert
      try {
        await resend.emails.send({
          from: 'TradeFlow Alerts <alerts@tradeflow.blog>',
          to: 'dimahasin2@gmail.com',
          subject: '🚨 URGENT: Render IP Address Changed',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">⚠️ IP Address Changed</h1>
              </div>

              <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                <div style="background: #fff3cd; border-left: 5px solid #ffc107; padding: 20px; margin-bottom: 20px; border-radius: 5px;">
                  <h2 style="color: #856404; margin-top: 0;">🚨 Action Required</h2>
                  <p style="color: #856404; font-size: 16px; margin: 0;">
                    Your Render server's IP address has changed. You need to update the Trading CRM IP whitelist immediately.
                  </p>
                </div>

                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h3 style="color: #667eea; margin-top: 0;">IP Address Change Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold;">Previous IP:</td>
                      <td style="padding: 10px; color: #dc3545;">${lastKnownIp}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 10px; font-weight: bold;">New IP:</td>
                      <td style="padding: 10px; color: #28a745; font-size: 18px;"><strong>${currentIp}</strong></td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; font-weight: bold;">Detected At:</td>
                      <td style="padding: 10px;">${new Date().toISOString()}</td>
                    </tr>
                  </table>
                </div>

                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h3 style="color: #667eea; margin-top: 0;">📋 What You Need to Do</h3>
                  <ol style="line-height: 1.8; padding-left: 20px;">
                    <li>Contact Trading CRM support immediately</li>
                    <li>Request to whitelist the new IP address: <strong>${currentIp}</strong></li>
                    <li>Wait for confirmation from Trading CRM</li>
                    <li>Test lead submission to verify it works</li>
                  </ol>
                </div>

                <div style="background: #d1ecf1; border-left: 5px solid #17a2b8; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                  <h3 style="color: #0c5460; margin-top: 0;">📧 Email Template</h3>
                  <p style="color: #0c5460; margin: 5px 0;">Copy and send this to Trading CRM:</p>
                  <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; font-family: monospace; font-size: 14px;">
                    Subject: IP Whitelist Update Request<br><br>
                    Hello,<br><br>
                    Please whitelist our new server IP address:<br>
                    <strong>${currentIp}</strong><br><br>
                    Previous IP: ${lastKnownIp}<br><br>
                    This is for API access to Trading CRM.<br><br>
                    Thank you.
                  </div>
                </div>

                <div style="background: #f8d7da; border-left: 5px solid #dc3545; padding: 20px; border-radius: 5px;">
                  <h3 style="color: #721c24; margin-top: 0;">⚠️ Important</h3>
                  <p style="color: #721c24; margin: 0;">
                    Until the new IP is whitelisted, all lead submissions to Trading CRM will fail with "IP not allowed" errors.
                  </p>
                </div>
              </div>

              <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
                <p>This is an automated alert from TradeFlow IP Monitoring System</p>
                <p>Server: Render | Timestamp: ${new Date().toISOString()}</p>
              </div>
            </div>
          `,
        });

        console.log('✅ Email alert sent to dimahasin2@gmail.com');
      } catch (emailError) {
        console.error('❌ Failed to send email alert:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      currentIp,
      lastKnownIp,
      ipChanged,
      warning: ipChanged ? 'IP ADDRESS CHANGED! Update Trading CRM whitelist!' : null,
      actionRequired: ipChanged ? `Whitelist new IP: ${currentIp}` : null,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ IP monitoring error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
