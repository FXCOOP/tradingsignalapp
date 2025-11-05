import { NextRequest, NextResponse } from 'next/server'

/**
 * AUTOMATED CRON JOB ENDPOINT
 *
 * This endpoint should be called daily by a cron service at 6 AM Dubai time (GMT+4)
 *
 * Setup options:
 * 1. Vercel Cron (vercel.json)
 * 2. EasyCron.com (external service)
 * 3. cron-job.org (free service)
 * 4. GitHub Actions (if repo is public)
 *
 * Security: Uses CRON_SECRET to prevent unauthorized access
 */
export async function GET(request: NextRequest) {
  try {
    // Security check: Verify cron secret
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    if (authHeader !== expectedAuth) {
      console.warn('⚠️ Unauthorized cron attempt:', {
        ip: request.headers.get('x-forwarded-for'),
        timestamp: new Date().toISOString()
      })

      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🕐 Cron job triggered - Generating daily content...')

    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000'

    // ⚡ NON-BLOCKING: Trigger content generation without waiting
    // This prevents EasyCron timeout (5 second limit)
    fetch(`${baseUrl}/api/daily-content`, {
      method: 'POST'
    }).then(async (response) => {
      const data = await response.json()
      if (data.success) {
        console.log('✅ Daily content generated successfully:', {
          signals: data.content.signals.count,
          news: data.content.news.count,
          analysis: !!data.content.analysis,
          tokens: data.usage.totalTokens,
          cost: data.usage.estimatedCost
        })
        // Optional: Send notification email to admin
        // await sendAdminNotification(data)
      } else {
        console.error('❌ Content generation failed:', data.error)
        // Optional: Send error notification to admin
        // await sendErrorNotification(data.error)
      }
    }).catch((error) => {
      console.error('❌ Content generation request failed:', error)
      // Optional: Send error notification to admin
      // await sendErrorNotification(error)
    })

    // Return immediately to prevent EasyCron timeout
    return NextResponse.json({
      success: true,
      message: 'Daily content generation job started',
      status: 'processing',
      timestamp: new Date().toISOString(),
      note: 'Content generation is running in the background. Check logs for completion status.',
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error: any) {
    console.error('❌ Cron job failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// POST method also supported
export async function POST(request: NextRequest) {
  return GET(request)
}
