import { NextRequest, NextResponse } from 'next/server'
import { saveDailyContent, getDailyContent } from '@/lib/cache'

/**
 * MASTER DAILY CONTENT GENERATOR
 * This endpoint generates all daily content in one call:
 * - 15 Trading Signals (increased from 5)
 * - 3 News Articles
 * - 1 Market Analysis
 *
 * This can be called manually or by a cron job
 * Content is cached for 24 hours until next 8AM generation
 */
export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000'

    console.log('🚀 Starting daily content generation...')

    // Generate all content in parallel for speed
    const [signalsRes, newsRes, analysisRes] = await Promise.all([
      fetch(`${baseUrl}/api/generate-signals`, { method: 'POST' }),
      fetch(`${baseUrl}/api/generate-news`, { method: 'POST' }),
      fetch(`${baseUrl}/api/generate-analysis`, { method: 'POST' })
    ])

    const [signalsData, newsData, analysisData] = await Promise.all([
      signalsRes.json(),
      newsRes.json(),
      analysisRes.json()
    ])

    // Check for errors
    const errors = []
    if (!signalsData.success) errors.push(`Signals: ${signalsData.error}`)
    if (!newsData.success) errors.push(`News: ${newsData.error}`)
    if (!analysisData.success) errors.push(`Analysis: ${analysisData.error}`)

    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        errors,
        partial: true,
        data: {
          signals: signalsData.success ? signalsData.signals : [],
          news: newsData.success ? newsData.articles : [],
          analysis: analysisData.success ? analysisData.analysis : null
        }
      }, { status: 500 })
    }

    // Calculate total tokens used
    const totalTokens =
      (signalsData.tokensUsed || 0) +
      (newsData.tokensUsed || 0) +
      (analysisData.tokensUsed || 0)

    // Estimate cost (GPT-5 Nano pricing: ~$0.0001 per 1K tokens)
    const estimatedCost = (totalTokens / 1000) * 0.0001

    console.log('✅ Daily content generated successfully!')
    console.log(`📊 Tokens used: ${totalTokens}`)
    console.log(`💰 Estimated cost: $${estimatedCost.toFixed(4)}`)

    // 💾 Save to cache for 24 hours
    await saveDailyContent({
      signals: signalsData.signals,
      news: newsData.articles || [],
      analysis: analysisData.analysis || null,
      generatedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      generated: new Date().toISOString(),
      content: {
        signals: {
          count: signalsData.count,
          data: signalsData.signals
        },
        news: {
          count: newsData.count,
          data: newsData.articles
        },
        analysis: analysisData.analysis
      },
      usage: {
        totalTokens,
        signalsTokens: signalsData.tokensUsed,
        newsTokens: newsData.tokensUsed,
        analysisTokens: analysisData.tokensUsed,
        estimatedCost: `$${estimatedCost.toFixed(4)}`,
        model: process.env.OPENAI_MODEL || 'gpt-5-nano'
      },
      nextGeneration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error: any) {
    console.error('❌ Daily content generation failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate daily content',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve cached daily content
export async function GET(request: NextRequest) {
  try {
    const cachedContent = await getDailyContent()

    if (cachedContent) {
      return NextResponse.json({
        success: true,
        cached: true,
        content: {
          signals: {
            count: cachedContent.signals.length,
            data: cachedContent.signals
          },
          news: {
            count: cachedContent.news?.length || 0,
            data: cachedContent.news || []
          },
          analysis: cachedContent.analysis
        },
        generatedAt: cachedContent.generatedAt,
        expiresAt: cachedContent.expiresAt,
        freshness: `Generated at ${new Date(cachedContent.generatedAt).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}`
      })
    }

    // No cache available
    return NextResponse.json({
      success: false,
      cached: false,
      message: 'No cached content available. Generate new content by calling POST',
      endpoints: {
        generate: '/api/daily-content (POST)',
        signals: '/api/generate-signals',
        news: '/api/generate-news',
        analysis: '/api/generate-analysis'
      },
      configuration: {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        apiConfigured: !!process.env.OPENAI_API_KEY
      },
      timestamp: new Date().toISOString()
    }, { status: 404 })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
