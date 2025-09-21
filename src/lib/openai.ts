import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const GPT_MODEL = process.env.OPENAI_MODEL || 'gpt-5-nano'

export interface GeneratedSignal {
  instrument: string
  class: 'FOREX' | 'CRYPTO' | 'COMMODITIES' | 'INDICES' | 'STOCKS'
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  entry: number
  stopLoss: number
  takeProfit1: number
  takeProfit2?: number
  timeframe: string
  confidence: number
  reasoning: string
}

export interface GeneratedArticle {
  title: string
  excerpt: string
  content: string
  signals: GeneratedSignal[]
  sources: Array<{
    title: string
    url: string
  }>
}

const signalGenerationPrompt = `You are a professional trading analyst generating daily trading signals for a Pakistani audience. Create 3-4 high-quality trading signals based on current market conditions and news.

Requirements:
- Focus on popular instruments relevant to Pakistani traders (USD/PKR, EUR/USD, Gold, Oil, Bitcoin, etc.)
- Include proper entry points, stop losses, and take profit levels
- Provide confidence levels (1-10)
- Give brief reasoning for each signal
- Include 2-3 reliable news sources that support your analysis
- Write in a professional but accessible tone

Return your response as a JSON object with this exact structure:
{
  "title": "Daily Trading Signals - [Date]",
  "excerpt": "Professional trading insights with technical and fundamental analysis",
  "content": "Full HTML article content with analysis and market overview",
  "signals": [
    {
      "instrument": "EUR/USD",
      "class": "FOREX",
      "bias": "BULLISH",
      "entry": 1.0850,
      "stopLoss": 1.0800,
      "takeProfit1": 1.0920,
      "takeProfit2": 1.0980,
      "timeframe": "4H",
      "confidence": 7,
      "reasoning": "Brief technical/fundamental reasoning"
    }
  ],
  "sources": [
    {
      "title": "News headline",
      "url": "https://example.com/news"
    }
  ]
}

Generate signals for today's date and current market conditions.`

export async function generateDailySignals(): Promise<GeneratedArticle> {
  try {
    const completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: 'system',
          content: signalGenerationPrompt
        },
        {
          role: 'user',
          content: `Generate trading signals for ${new Date().toISOString().split('T')[0]}. Focus on current market conditions and include Pakistani perspective for forex pairs involving PKR.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const responseContent = completion.choices[0]?.message?.content
    if (!responseContent) {
      throw new Error('No response from OpenAI')
    }

    const parsedResponse = JSON.parse(responseContent)
    return parsedResponse as GeneratedArticle
  } catch (error) {
    console.error('Error generating signals:', error)
    throw new Error('Failed to generate trading signals')
  }
}

export async function translateToUrdu(content: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator specializing in financial content. Translate the given English trading article to Urdu while maintaining technical accuracy and professional tone. Keep HTML formatting intact.'
        },
        {
          role: 'user',
          content: `Translate this trading article to Urdu:\n\n${content}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const translatedContent = completion.choices[0]?.message?.content
    if (!translatedContent) {
      throw new Error('No translation response from OpenAI')
    }

    return translatedContent
  } catch (error) {
    console.error('Error translating content:', error)
    throw new Error('Failed to translate content to Urdu')
  }
}