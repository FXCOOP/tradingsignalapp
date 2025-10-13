import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
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
      max_completion_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '3000'),
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
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate signals',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
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
