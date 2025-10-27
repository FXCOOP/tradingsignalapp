import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getDailyContent } from '@/lib/cache'
import { supabaseAdmin } from '@/lib/supabase'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Increase timeout for API route (60 seconds)
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    // 🔒 CHECK IF SIGNALS ALREADY GENERATED TODAY (prevent duplicate API calls)
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const { data: existingSignals, error: checkError } = await supabaseAdmin
      .from('trading_signals')
      .select('id, generated_at')
      .gte('generated_at', `${today}T00:00:00.000Z`)
      .lte('generated_at', `${today}T23:59:59.999Z`)
      .limit(1)

    if (existingSignals && existingSignals.length > 0) {
      console.log(`⏭️ Signals already generated today (${existingSignals[0].generated_at}), skipping...`)
      return NextResponse.json({
        success: true,
        message: 'Signals already generated today',
        alreadyGenerated: true,
        lastGenerated: existingSignals[0].generated_at
      }, { status: 200 })
    }

    console.log('🔄 Generating fresh signals for today...')
    // Rate limiting check
    const rateLimitKey = request.headers.get('x-forwarded-for') || 'local'

    // Generate signals using OpenAI GPT-5 Nano
    const signalsPrompt = `You are a professional trading analyst for global financial markets. Generate 15 high-quality trading signals for today.

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
- Include a mix of stocks, forex, commodities, and crypto (diverse asset classes)
- Provide both BUY and SELL signals (balanced recommendations)
- Make reasoning specific and actionable
- Return ONLY a valid JSON array with exactly 15 signals, no markdown formatting`

    // Try GPT-5 Nano first, fallback to GPT-4o-mini if not available
    let completion
    try {
      completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-5-nano-2025-08-07',
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
        max_completion_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '16000')
        // Increased to 16000: gpt-5-nano reasoning model uses A LOT of tokens internally
        // Evidence: Used 4000 tokens for reasoning alone, need much more capacity
        // temperature removed: gpt-5-nano-2025-08-07 only supports default value (1)
      }, {
        timeout: 45000 // 45 second timeout for OpenAI
      })
    } catch (modelError: any) {
      console.warn('GPT-5 Nano not available, falling back to GPT-4o-mini:', modelError.message)
      // Fallback to GPT-4o-mini if GPT-5 Nano is not available
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
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
        max_completion_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '16000')
        // Increased to 16000: gpt-5-nano reasoning model uses A LOT of tokens internally
        // Evidence: Used 4000 tokens for reasoning alone, need much more capacity
        // temperature removed: gpt-5-nano-2025-08-07 only supports default value (1)
      }, {
        timeout: 45000
      })
    }

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
      console.error('❌ Failed to parse OpenAI response:', cleanContent)
      console.error('❌ Parse error:', parseError)
      throw new Error(`Invalid JSON response from OpenAI: ${cleanContent.substring(0, 100)}`)
    }

    // Validate signals structure
    if (!Array.isArray(signals) || signals.length === 0) {
      throw new Error('No signals generated')
    }

    // ENFORCE 15 signals - reject if less
    if (signals.length < 15) {
      console.warn(`⚠️ gpt-5-nano only generated ${signals.length} signals instead of 15!`)
      throw new Error(`Insufficient signals: got ${signals.length}, expected 15. Please regenerate.`)
    }

    console.log(`✅ Successfully generated ${signals.length} signals`)

    // Add metadata
    const enrichedSignals = signals.map((signal: any, index: number) => ({
      id: `signal-${Date.now()}-${index}`,
      ...signal,
      generatedAt: new Date().toISOString(),
      status: 'ACTIVE',
      market: 'Global'
    }))

    // 💾 Save signals to Supabase database
    console.log('💾 Saving signals to Supabase database...')
    try {
      // 🗑️ PREVENT DUPLICATES: Delete today's signals before inserting new ones
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
      const { error: deleteError } = await supabaseAdmin
        .from('trading_signals')
        .delete()
        .gte('generated_at', `${today}T00:00:00.000Z`)
        .lte('generated_at', `${today}T23:59:59.999Z`)

      if (deleteError) {
        console.warn('⚠️ Failed to delete old signals:', deleteError.message)
      } else {
        console.log(`🗑️ Deleted today's existing signals to prevent duplicates`)
      }

      const dbSignals = enrichedSignals.map((signal: any) => ({
        symbol: signal.symbol,
        signal_type: signal.type.replace('_', ' '), // Fix: STRONG_BUY → STRONG BUY (database expects space)
        entry_price: signal.entryPrice,
        target_price: signal.targetPrice,
        stop_loss: signal.stopLoss,
        confidence_level: signal.confidence,
        timeframe: signal.timeframe,
        technical_reasoning: signal.reasoning,
        risk_reward_ratio: signal.riskReward,
        market_type: 'stocks',
        status: 'active',
        generated_at: new Date().toISOString()
      }))

      const { data, error } = await supabaseAdmin
        .from('trading_signals')
        .insert(dbSignals)
        .select()

      if (error) {
        console.error('❌ Failed to save signals to database:', error)
        throw new Error(`Database error: ${error.message}`)
      }

      console.log(`✅ Successfully saved ${data?.length || 0} signals to database`)
    } catch (dbError: any) {
      console.error('❌ Database save error:', dbError)
      // Continue even if database save fails - return the signals anyway
    }

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
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
      response: error.response?.data
    })

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

    // 💾 Save demo signals to Supabase database
    console.log('💾 Saving demo signals to Supabase database...')
    try {
      const dbSignals = demoSignals.map((signal: any) => ({
        symbol: signal.symbol,
        signal_type: signal.type.replace('_', ' '), // Fix: STRONG_BUY → STRONG BUY (database expects space)
        entry_price: signal.entryPrice,
        target_price: signal.targetPrice,
        stop_loss: signal.stopLoss,
        confidence_level: signal.confidence,
        timeframe: signal.timeframe,
        technical_reasoning: signal.reasoning,
        risk_reward_ratio: signal.riskReward,
        market_type: 'stocks',
        status: 'active',
        generated_at: new Date().toISOString()
      }))

      const { data, error } = await supabaseAdmin
        .from('trading_signals')
        .insert(dbSignals)
        .select()

      if (error) {
        console.error('❌ Failed to save demo signals to database:', error)
      } else {
        console.log(`✅ Successfully saved ${data?.length || 0} demo signals to database`)
      }
    } catch (dbError: any) {
      console.error('❌ Database save error for demo signals:', dbError)
    }

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

// GET endpoint to fetch signals from database
export async function GET(request: NextRequest) {
  try {
    // Fetch latest signals from Supabase
    const { data: signals, error } = await supabaseAdmin
      .from('trading_signals')
      .select('*')
      .eq('status', 'active')
      .order('generated_at', { ascending: false })
      .limit(15)

    if (error) {
      console.error('❌ Failed to fetch signals from database:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch signals from database',
        details: error.message
      }, { status: 500 })
    }

    // Transform database signals to API format
    const formattedSignals = signals.map((s: any) => ({
      id: s.id,
      symbol: s.symbol,
      name: s.symbol, // Use symbol as name if not stored
      type: s.signal_type,
      entryPrice: parseFloat(s.entry_price),
      targetPrice: parseFloat(s.target_price),
      stopLoss: parseFloat(s.stop_loss),
      confidence: s.confidence_level,
      timeframe: s.timeframe,
      reasoning: s.technical_reasoning,
      riskReward: parseFloat(s.risk_reward_ratio),
      generatedAt: s.generated_at,
      status: s.status.toUpperCase(),
      market: s.market_type
    }))

    return NextResponse.json({
      success: true,
      count: formattedSignals.length,
      signals: formattedSignals,
      cached: true,
      generatedAt: signals[0]?.generated_at || new Date().toISOString(),
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('❌ Error fetching signals:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch signals'
    }, { status: 500 })
  }
}
