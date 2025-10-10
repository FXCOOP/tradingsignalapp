import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const newsPrompt = `You are a financial journalist covering GCC markets. Create 3 comprehensive news articles for today.

Topics to cover (choose 3):
1. TASI/Saudi market movements and key stocks (Saudi Aramco, Al Rajhi Bank, STC)
2. UAE market updates (ADX/DFM, real estate, banking sector)
3. GCC currency markets (AED/USD peg, Saudi Riyal, Qatari Riyal)
4. Oil market impact on GCC economies (OPEC decisions, Brent crude prices)
5. Economic reforms and Vision 2030 developments
6. Foreign investment in GCC markets
7. Banking sector performance and interest rates

For each article provide:
{
  "title": "string (compelling, SEO-friendly headline)",
  "titleAr": "string (Arabic translation of title)",
  "slug": "string (URL-friendly slug)",
  "excerpt": "string (2-3 sentence summary)",
  "category": "stocks" | "forex" | "commodities" | "economy" | "banking",
  "content": "string (800-1200 words, well-structured with paragraphs)",
  "keyPoints": ["string array of 4-5 bullet points"],
  "marketImpact": "string (2-3 sentences on market implications)",
  "tags": ["string array of 5-7 relevant tags"],
  "authorName": "string (realistic GCC financial journalist name)",
  "readTime": number (estimated minutes to read),
  "publishDate": "string (today's date in ISO format)"
}

Requirements:
- Make content informative, professional, and data-driven
- Include realistic market data and statistics
- Reference current GCC economic conditions
- Write in journalistic style suitable for financial professionals
- Ensure content is relevant to GCC traders and investors

Return ONLY a valid JSON array with 3 articles, no markdown formatting`

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-5-nano',
      messages: [
        {
          role: 'system',
          content: 'You are a professional financial journalist specializing in GCC markets. Write comprehensive, accurate news articles in JSON format only.'
        },
        {
          role: 'user',
          content: newsPrompt
        }
      ],
      temperature: 0.8, // Higher for more creative writing
      max_tokens: 4000,
    })

    const content = completion.choices[0].message.content || '[]'
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    let articles
    try {
      articles = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent)
      throw new Error('Invalid JSON response from OpenAI')
    }

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error('No articles generated')
    }

    // Add metadata
    const enrichedArticles = articles.map((article: any, index: number) => ({
      id: `article-${Date.now()}-${index}`,
      ...article,
      generatedAt: new Date().toISOString(),
      published: true,
      views: 0,
      likes: 0
    }))

    return NextResponse.json({
      success: true,
      count: enrichedArticles.length,
      articles: enrichedArticles,
      generated: new Date().toISOString(),
      model: process.env.OPENAI_MODEL || 'gpt-5-nano',
      tokensUsed: completion.usage?.total_tokens || 0
    })

  } catch (error: any) {
    console.error('News generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate news',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
