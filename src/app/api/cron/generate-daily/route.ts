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

    // Call the daily content generator
    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/daily-content`, {
      method: 'POST'
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Content generation failed')
    }

    // Optional: Send notification email to admin
    // await sendAdminNotification(data)

    // Optional: Store in database
    // await saveContentToDatabase(data)

    console.log('✅ Cron job completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Daily content generated successfully',
      timestamp: new Date().toISOString(),
      generatedContent: {
        signals: data.content.signals.count,
        news: data.content.news.count,
        analysisGenerated: !!data.content.analysis
      },
      usage: data.usage,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error: any) {
    console.error('❌ Cron job failed:', error)

    // Optional: Send error notification to admin
    // await sendErrorNotification(error)

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
