import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getDailyContent } from '@/lib/cache'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Increase timeout for API route (60 seconds)
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    // 🚀 Check cache first - return cached signals if available
    const cachedContent = await getDailyContent()
    if (cachedContent && cachedContent.signals && cachedContent.signals.length > 0) {
      console.log('✅ Returning cached signals')
      return NextResponse.json({
        success: true,
        count: cachedContent.signals.length,
        signals: cachedContent.signals,
        generated: cachedContent.generatedAt,
        expiresAt: cachedContent.expiresAt,
        model: 'cached',
        tokensUsed: 0,
        cached: true
      })
    }

    console.log('🔄 No cache found, generating fresh signals...')
    // Rate limiting check
    const rateLimitKey = request.headers.get('x-forwarded-for') || 'local'

    // Generate signals using OpenAI GPT-5 Nano
    const signalsPrompt = `You are a professional trading analyst for GCC markets. Generate 6 high-quality trading signals for today.

Markets to cover:
- Saudi TASI (Saudi Aramco 2222, Al Rajhi Bank 1120, STC 7010, SABIC 2010)
- UAE ADX/DFM (Emirates NBD, First Abu Dhabi Bank, Emaar Properties, Etisalat)
- Qatar QE (Qatar National Bank, Industries Qatar)
- Forex pairs (USD/AED, EUR/AED, GBP/AED, JPY/AED)
- Commodities (Gold XAU/USD, Silver, Crude Oil Brent)

For each signal provide:
{
  "symbol": "string (e.g., 'TASI:2222' for Saudi Aramco or 'XAU/USD' for Gold)",
  "name": "string (e.g., 'Saudi Aramco' or 'Gold')",
  "type": "BUY" | "SELL" | "STRONG_BUY" | "STRONG_SELL",
  "entryPrice": number (realistic current market price),
  "targetPrice": number,
  "stopLoss": number,
  "confidence": number (75-95),
  "timeframe": "1H" | "4H" | "1D" | "1W",
  "reasoning": "2-3 sentences with technical analysis",
  "riskReward": number (calculate: (targetPrice - entryPrice) / (entryPrice - stopLoss))
}

IMPORTANT:
- Use realistic current market prices (TASI ~12,000-13,000, Saudi Aramco ~SAR 30-35, Gold ~$2,600-2,700)
- Include a mix of stocks, forex, and commodities
- Provide both BUY and SELL signals
- Make reasoning specific and actionable
- Return ONLY a valid JSON array with 6 signals, no markdown formatting`

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional trading analyst specializing in GCC markets. Provide accurate, actionable trading signals in JSON format only.'
        },
        {
          role: 'user',
          content: signalsPrompt
        }
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      max_completion_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000')
    }, {
      timeout: 45000 // 45 second timeout for OpenAI
    })

    const content = completion.choices[0].message.content || '[]'

    // Remove markdown code blocks if present
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    let signals
    try {
      signals = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate signals structure
    if (!Array.isArray(signals) || signals.length === 0) {
      throw new Error('No signals generated')
    }

    // Add metadata
    const enrichedSignals = signals.map((signal: any, index: number) => ({
      id: `signal-${Date.now()}-${index}`,
      ...signal,
      generatedAt: new Date().toISOString(),
      status: 'ACTIVE',
      market: 'GCC'
    }))

    return NextResponse.json({
      success: true,
      count: enrichedSignals.length,
      signals: enrichedSignals,
      generated: new Date().toISOString(),
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      tokensUsed: completion.usage?.total_tokens || 0
    })

  } catch (error: any) {
    console.error('Signal generation error:', error)

    // 🚨 FALLBACK: Return demo signals if OpenAI fails
    console.log('Returning fallback demo signals due to error:', error.message)

    const demoSignals = [
      {
        id: `signal-${Date.now()}-0`,
        symbol: 'TASI:2222',
        name: 'Saudi Aramco',
        type: 'BUY',
        entryPrice: 32.50,
        targetPrice: 35.20,
        stopLoss: 31.00,
        confidence: 85,
        timeframe: '1D',
        reasoning: 'Strong uptrend with oil prices recovering. Breaking above key resistance level. Technical indicators showing bullish momentum with increasing volume.',
        riskReward: 1.8,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      },
      {
        id: `signal-${Date.now()}-1`,
        symbol: 'XAU/USD',
        name: 'Gold',
        type: 'STRONG_BUY',
        entryPrice: 2650.00,
        targetPrice: 2720.00,
        stopLoss: 2620.00,
        confidence: 92,
        timeframe: '4H',
        reasoning: 'Global uncertainty driving safe-haven demand. Fed policy expectations supporting gold. Chart showing bullish flag pattern breakout.',
        riskReward: 2.3,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      },
      {
        id: `signal-${Date.now()}-2`,
        symbol: 'EUR/AED',
        name: 'Euro vs Dirham',
        type: 'SELL',
        entryPrice: 4.05,
        targetPrice: 3.95,
        stopLoss: 4.10,
        confidence: 78,
        timeframe: '1H',
        reasoning: 'EUR weakening on economic data. AED maintaining strength with oil support. RSI showing overbought conditions on EUR.',
        riskReward: 2.0,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      },
      {
        id: `signal-${Date.now()}-3`,
        symbol: 'ADX:EMAAR',
        name: 'Emaar Properties',
        type: 'BUY',
        entryPrice: 7.80,
        targetPrice: 8.50,
        stopLoss: 7.50,
        confidence: 81,
        timeframe: '1D',
        reasoning: 'Strong Dubai real estate market. Company exceeding quarterly expectations. Breaking out from consolidation pattern.',
        riskReward: 2.3,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      },
      {
        id: `signal-${Date.now()}-4`,
        symbol: 'BTC/USD',
        name: 'Bitcoin',
        type: 'STRONG_BUY',
        entryPrice: 98500,
        targetPrice: 105000,
        stopLoss: 96000,
        confidence: 88,
        timeframe: '4H',
        reasoning: 'Crypto market showing strong institutional buying. Breaking major resistance with high volume. Favorable regulatory news.',
        riskReward: 2.6,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      },
      {
        id: `signal-${Date.now()}-5`,
        symbol: 'TASI:1120',
        name: 'Al Rajhi Bank',
        type: 'BUY',
        entryPrice: 89.50,
        targetPrice: 94.00,
        stopLoss: 87.00,
        confidence: 83,
        timeframe: '1W',
        reasoning: 'Islamic banking sector growth in Saudi Arabia. Strong Q4 earnings expected. Chart forming bullish cup and handle pattern.',
        riskReward: 1.8,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'GCC'
      }
    ]

    return NextResponse.json({
      success: true,
      count: demoSignals.length,
      signals: demoSignals,
      generated: new Date().toISOString(),
      model: 'fallback-demo',
      tokensUsed: 0,
      note: 'Demo signals - OpenAI unavailable. Please configure OPENAI_API_KEY for live AI generation.'
    })
  }
}

// GET endpoint to check API status
export async function GET(request: NextRequest) {
  const hasApiKey = !!process.env.OPENAI_API_KEY
  const apiKeyPreview = hasApiKey
    ? `${process.env.OPENAI_API_KEY?.substring(0, 10)}...`
    : 'NOT SET'

  return NextResponse.json({
    status: 'ready',
    openaiConfigured: hasApiKey,
    apiKeyPreview,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    maxTokens: process.env.OPENAI_MAX_TOKENS || '3000',
    temperature: process.env.OPENAI_TEMPERATURE || '0.7',
    timestamp: new Date().toISOString()
  })
}
