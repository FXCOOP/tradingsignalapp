import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = 'force-dynamic';

/**
 * IP Monitoring Endpoint
 *
 * This endpoint:
 * 1. Detects the current server IP
 * 2. Logs IP to database
 * 3. Detects IP changes
 * 4. Returns current IP info
 *
 * Call this endpoint periodically (e.g., every hour) via cron
 * Or it runs automatically on every deployment
 */
export async function GET(request: NextRequest) {
  try {
    // Get current server IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    // Render uses x-forwarded-for
    const currentIp = forwardedFor?.split(',')[0].trim()
                   || realIp
                   || cfConnectingIp
                   || 'unknown';

    console.log('🌐 IP Monitoring Check:', {
      currentIp,
      forwardedFor,
      realIp,
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

    // If IP changed, log warning
    if (ipChanged) {
      console.warn('⚠️ ⚠️ ⚠️ RENDER IP CHANGED! ⚠️ ⚠️ ⚠️');
      console.warn(`Previous IP: ${lastKnownIp}`);
      console.warn(`New IP: ${currentIp}`);
      console.warn('ACTION REQUIRED: Update Trading CRM IP whitelist!');
      console.warn(`New IP to whitelist: ${currentIp}`);

      // TODO: Send email/Slack alert here
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
