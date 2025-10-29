import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getDailyContent } from '@/lib/cache'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // 🔒 CHECK IF ANALYSIS ALREADY GENERATED TODAY (prevent duplicate API calls)
    const today = new Date().toISOString().split('T')[0]

    // 🚀 Check cache first - return cached analysis if available
    const cachedContent = await getDailyContent()
    if (cachedContent && cachedContent.analysis) {
      console.log('✅ Returning cached market analysis')
      return NextResponse.json({
        success: true,
        analysis: cachedContent.analysis,
        generated: cachedContent.generatedAt,
        expiresAt: cachedContent.expiresAt,
        model: 'cached',
        tokensUsed: 0,
        cached: true,
        alreadyGenerated: true,
        date: today
      })
    }

    console.log('🔄 No cache found, generating fresh market analysis...')

    const analysisPrompt = `You are a senior market analyst covering GCC financial markets. Create a comprehensive daily market analysis.

Sections to include:

1. EXECUTIVE SUMMARY (3-4 sentences overview of market conditions)

2. MARKET OVERVIEW
   - TASI (Saudi Arabia): Current level, daily change %, key drivers
   - ADX (Abu Dhabi): Performance, sector highlights
   - DFM (Dubai): Trading activity, notable stocks
   - QE (Qatar): Market sentiment, top performers

3. SECTORAL ANALYSIS
   - Banking: Performance, interest rate impact, key stocks
   - Energy: Oil prices, Saudi Aramco, petrochemicals
   - Real Estate: Emaar, Aldar, Vision 2030 impact
   - Telecommunications: STC, Etisalat, 5G expansion

4. CURRENCY MARKETS
   - USD/AED (fixed at 3.6725)
   - Other major pairs affecting GCC trade
   - Impact of US Fed policy

5. COMMODITIES IMPACT
   - Brent Crude oil prices
   - Gold as safe haven
   - Impact on GCC economies

6. TECHNICAL OUTLOOK
   - Key support/resistance levels for TASI
   - Chart patterns observed
   - Volume analysis

7. UPCOMING CATALYSTS
   - Economic data releases this week
   - Earnings announcements
   - Central bank meetings
   - OPEC developments

8. TRADING STRATEGY
   - Recommended sectors to watch
   - Risk management advice
   - Position sizing guidance

Provide response as JSON:
{
  "executiveSummary": "string",
  "marketOverview": {
    "tasi": { "level": number, "change": number, "commentary": "string" },
    "adx": { "level": number, "change": number, "commentary": "string" },
    "dfm": { "level": number, "change": number, "commentary": "string" },
    "qe": { "level": number, "change": number, "commentary": "string" }
  },
  "sectoralAnalysis": {
    "banking": "string (100-150 words)",
    "energy": "string (100-150 words)",
    "realEstate": "string (100-150 words)",
    "telecommunications": "string (100-150 words)"
  },
  "currencyMarkets": "string (150 words)",
  "commoditiesImpact": "string (150 words)",
  "technicalOutlook": {
    "tasiSupport": number,
    "tasiResistance": number,
    "commentary": "string (100 words)"
  },
  "upcomingCatalysts": ["array of 5-7 key events"],
  "tradingStrategy": {
    "bullishSectors": ["array of 2-3 sectors"],
    "bearishSectors": ["array of 1-2 sectors"],
    "recommendations": "string (150 words)"
  },
  "sentiment": "BULLISH" | "NEUTRAL" | "BEARISH",
  "confidence": number (1-10 scale)
}

Use realistic data consistent with current GCC market conditions. Return ONLY valid JSON, no markdown.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano-2025-08-07',
      messages: [
        {
          role: 'system',
          content: 'You are a senior market analyst with 15 years of experience in GCC markets. Provide comprehensive, data-driven analysis in JSON format only.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      max_completion_tokens: 16000 // High limit for comprehensive analysis
      // temperature: removed - gpt-5-nano-2025-08-07 only supports default value (1)
    })

    const content = completion.choices[0].message.content || '{}'
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    let analysis
    try {
      analysis = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Add metadata
    const enrichedAnalysis = {
      id: `analysis-${Date.now()}`,
      ...analysis,
      generatedAt: new Date().toISOString(),
      author: 'GCC Signal Pro Analytics Team',
      market: 'GCC',
      publishDate: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      analysis: enrichedAnalysis,
      generated: new Date().toISOString(),
      model: 'gpt-5-nano-2025-08-07',
      tokensUsed: completion.usage?.total_tokens || 0
    })

  } catch (error: any) {
    console.error('Analysis generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate analysis',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
