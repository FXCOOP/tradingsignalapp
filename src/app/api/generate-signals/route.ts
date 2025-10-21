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
    const signalsPrompt = `You are a professional trading analyst for global financial markets. Generate 6 high-quality trading signals for today.

Markets to cover:
- US Stocks (Apple AAPL, Microsoft MSFT, Tesla TSLA, NVIDIA NVDA, Amazon AMZN)
- European Stocks (LVMH, Shell, HSBC, Volkswagen)
- Forex pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD)
- Commodities (Gold XAU/USD, Silver, Crude Oil WTI, Natural Gas)
- Cryptocurrencies (Bitcoin BTC/USD, Ethereum ETH/USD)

For each signal provide:
{
  "symbol": "string (e.g., 'AAPL' for Apple or 'XAU/USD' for Gold)",
  "name": "string (e.g., 'Apple Inc.' or 'Gold')",
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
- Use realistic current market prices (AAPL ~$175-185, MSFT ~$420-430, Gold ~$2,600-2,700, BTC ~$95k-105k)
- Include a mix of stocks, forex, commodities, and crypto
- Provide both BUY and SELL signals
- Make reasoning specific and actionable
- Return ONLY a valid JSON array with 6 signals, no markdown formatting`

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional trading analyst specializing in global financial markets. Provide accurate, actionable trading signals in JSON format only.'
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
      market: 'Global'
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
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'BUY',
        entryPrice: 178.50,
        targetPrice: 192.00,
        stopLoss: 173.00,
        confidence: 85,
        timeframe: '1D',
        reasoning: 'Strong product cycle with iPhone and services growth. Breaking above key resistance level. Technical indicators showing bullish momentum with increasing volume.',
        riskReward: 2.45,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'Global'
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
        market: 'Global'
      },
      {
        id: `signal-${Date.now()}-2`,
        symbol: 'EUR/USD',
        name: 'Euro vs Dollar',
        type: 'SELL',
        entryPrice: 1.0850,
        targetPrice: 1.0720,
        stopLoss: 1.0920,
        confidence: 78,
        timeframe: '1H',
        reasoning: 'EUR weakening on economic data. USD strengthening on Fed policy. RSI showing overbought conditions on EUR.',
        riskReward: 1.86,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'Global'
      },
      {
        id: `signal-${Date.now()}-3`,
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        type: 'BUY',
        entryPrice: 245.00,
        targetPrice: 268.00,
        stopLoss: 235.00,
        confidence: 81,
        timeframe: '1D',
        reasoning: 'EV market growth accelerating. Delivery numbers exceeding expectations. Breaking out from consolidation pattern with strong volume.',
        riskReward: 2.3,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'Global'
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
        reasoning: 'Crypto market showing strong institutional buying. Breaking major resistance with high volume. Favorable regulatory news and ETF inflows.',
        riskReward: 2.6,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'Global'
      },
      {
        id: `signal-${Date.now()}-5`,
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        type: 'BUY',
        entryPrice: 875.00,
        targetPrice: 940.00,
        stopLoss: 850.00,
        confidence: 83,
        timeframe: '1W',
        reasoning: 'AI chip demand surging across industries. Strong Q4 earnings guidance. Chart forming bullish cup and handle pattern.',
        riskReward: 2.6,
        generatedAt: new Date().toISOString(),
        status: 'ACTIVE',
        market: 'Global'
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
