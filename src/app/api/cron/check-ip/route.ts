import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Cron Job: Check IP Address Changes
 *
 * This endpoint should be called periodically by:
 * - Render Cron Jobs (every hour)
 * - External cron service (cron-job.org, easycron.com)
 * - GitHub Actions
 *
 * Schedule: Every hour
 * URL: https://tradeflow.blog/api/cron/check-ip
 */
export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.log('⚠️ Unauthorized cron request');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('⏰ Cron: Checking IP address...');

    // Call the IP monitoring endpoint
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tradeflow.blog';
    const response = await fetch(`${baseUrl}/api/monitor-ip`, {
      method: 'GET',
      headers: {
        'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
      },
    });

    const data = await response.json();

    console.log('✅ IP check complete:', {
      currentIp: data.currentIp,
      ipChanged: data.ipChanged,
      timestamp: new Date().toISOString(),
    });

    if (data.ipChanged) {
      console.warn('⚠️ ⚠️ ⚠️ IP ADDRESS CHANGED!');
      console.warn(`New IP: ${data.currentIp}`);
      console.warn('ACTION REQUIRED: Update Trading CRM whitelist!');
    }

    return NextResponse.json({
      success: true,
      cronJob: 'check-ip',
      executedAt: new Date().toISOString(),
      result: data,
    });

  } catch (error) {
    console.error('❌ Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
