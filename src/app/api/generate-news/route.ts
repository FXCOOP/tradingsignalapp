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
    // 🚀 Check cache first - return cached news if available
    const cachedContent = await getDailyContent()
    if (cachedContent && cachedContent.news && cachedContent.news.length > 0) {
      console.log('✅ Returning cached news articles')
      return NextResponse.json({
        success: true,
        count: cachedContent.news.length,
        articles: cachedContent.news,
        generated: cachedContent.generatedAt,
        expiresAt: cachedContent.expiresAt,
        model: 'cached',
        tokensUsed: 0,
        cached: true
      })
    }

    console.log('🔄 No cache found, generating fresh news articles...')

    const newsPrompt = `You are a financial journalist covering global financial markets. Create 3 comprehensive news articles for today.

Topics to cover (choose 3):
1. US stock market movements and key stocks (Apple, Microsoft, Tesla, NVIDIA)
2. Global market updates (S&P 500, NASDAQ, European indices, Asian markets)
3. Currency markets (EUR/USD, GBP/USD, USD/JPY, major forex trends)
4. Oil and energy markets (WTI crude, natural gas, renewable energy developments)
5. Technology sector and AI developments (FAANG stocks, semiconductor industry)
6. Federal Reserve and central bank policy decisions
7. Banking sector performance and interest rate impacts

For each article provide:
{
  "title": "string (compelling, SEO-friendly headline)",
  "titleAr": "string (optional - can be empty string)",
  "slug": "string (URL-friendly slug)",
  "excerpt": "string (2-3 sentence summary)",
  "category": "stocks" | "forex" | "commodities" | "economy" | "banking",
  "content": "string (800-1200 words, well-structured with paragraphs)",
  "keyPoints": ["string array of 4-5 bullet points"],
  "marketImpact": "string (2-3 sentences on market implications)",
  "tags": ["string array of 5-7 relevant tags"],
  "authorName": "string (realistic financial journalist name)",
  "readTime": number (estimated minutes to read),
  "publishDate": "string (today's date in ISO format)"
}

Requirements:
- Make content informative, professional, and data-driven
- Include realistic market data and statistics
- Reference current global economic conditions
- Write in journalistic style suitable for financial professionals
- Ensure content is relevant to traders and investors worldwide

Return ONLY a valid JSON array with 3 articles, no markdown formatting`

    // Try GPT-5 Nano first, fallback to GPT-4o-mini if not available
    let completion
    try {
      completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-5-nano',
        messages: [
          {
            role: 'system',
            content: 'You are a professional financial journalist specializing in global financial markets. Write comprehensive, accurate news articles in JSON format only.'
          },
          {
            role: 'user',
            content: newsPrompt
          }
        ],
        // temperature: 0.8, // gpt-5-nano-2025-08-07 only supports temperature=1 (default)
        max_completion_tokens: 4000,
      }, {
        timeout: 45000
      })
    } catch (modelError: any) {
      console.warn('GPT-5 Nano not available, falling back to GPT-4o-mini:', modelError.message)
      // Fallback to GPT-4o-mini if GPT-5 Nano is not available
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional financial journalist specializing in global financial markets. Write comprehensive, accurate news articles in JSON format only.'
          },
          {
            role: 'user',
            content: newsPrompt
          }
        ],
        // temperature: 0.8, // Keep for fallback model, but gpt-5-nano doesn't support this
        max_completion_tokens: 4000,
      }, {
        timeout: 45000
      })
    }

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
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
      response: error.response?.data
    })

    // 🚨 FALLBACK: Return demo news articles if OpenAI fails
    console.log('Returning fallback demo news due to error:', error.message)

    const demoArticles = [
      {
        id: `article-${Date.now()}-0`,
        title: 'TASI Reaches New Heights as Saudi Aramco Surges on Strong Oil Prices',
        titleAr: 'مؤشر تاسي يحقق ارتفاعات جديدة مع ارتفاع أرامكو السعودية بفضل أسعار النفط القوية',
        slug: 'tasi-reaches-new-heights-saudi-aramco-surges',
        excerpt: 'The Saudi stock market closed at record levels today as Saudi Aramco shares jumped 3.2% following a surge in global oil prices. Banking sector also showed strong performance with Al Rajhi Bank leading gains.',
        category: 'stocks',
        content: `The Tadawul All Share Index (TASI) closed at 12,850 points today, marking a 2.4% gain and reaching its highest level in three months. The rally was driven primarily by energy sector stocks, with Saudi Aramco leading the charge.

Saudi Aramco, the world's largest oil company, saw its shares climb 3.2% to SAR 34.80, adding significant momentum to the broader market. The move came after Brent crude prices rose above $85 per barrel, boosted by OPEC+ production discipline and growing demand forecasts from Asia.

The banking sector also contributed to the market's strong performance. Al Rajhi Bank, the kingdom's largest lender by market value, gained 2.1% as investors anticipated stronger Q4 earnings driven by higher interest rates and robust loan growth.

Market analysts attribute the TASI's strength to several factors: continued economic reforms under Vision 2030, strong corporate earnings, and increasing foreign investment flows into Saudi markets. The Tadawul has seen net foreign buying of approximately SAR 2.3 billion over the past week.

"We're seeing sustained momentum in Saudi markets," said Ahmed Al-Mansour, chief investment officer at a leading Riyadh-based asset manager. "The combination of strong oil fundamentals, solid corporate earnings, and ongoing economic diversification efforts makes the TASI attractive for both domestic and international investors."

Trading volumes reached SAR 8.7 billion, above the three-month average, indicating strong institutional participation. Petrochemical giant SABIC also posted gains of 1.8%, while Saudi Telecom Company (STC) advanced 1.5% on digitalization initiatives.`,
        keyPoints: [
          'TASI closed at 12,850 points, up 2.4%, reaching three-month highs',
          'Saudi Aramco surged 3.2% on Brent crude rising above $85/barrel',
          'Al Rajhi Bank gained 2.1% ahead of expected strong Q4 earnings',
          'Foreign investors net buyers with SAR 2.3 billion inflows this week',
          'Trading volumes hit SAR 8.7 billion, above three-month average'
        ],
        marketImpact: 'The strong performance signals continued confidence in Saudi Arabia\'s economic reform program and suggests potential for further gains if oil prices remain stable. Analysts expect the bullish sentiment to continue into next quarter.',
        tags: ['TASI', 'Saudi Aramco', 'Al Rajhi Bank', 'Saudi Stock Market', 'Oil Prices', 'Vision 2030', 'GCC Markets'],
        authorName: 'Fatima Al-Zahrani',
        readTime: 4,
        publishDate: new Date().toISOString(),
        generatedAt: new Date().toISOString(),
        published: true,
        views: 0,
        likes: 0
      },
      {
        id: `article-${Date.now()}-1`,
        title: 'UAE Real Estate Boom: Emaar Properties Reports Record Sales as Dubai Market Soars',
        titleAr: 'طفرة العقارات في الإمارات: إعمار العقارية تسجل مبيعات قياسية مع ارتفاع سوق دبي',
        slug: 'uae-real-estate-boom-emaar-record-sales',
        excerpt: 'Dubai\'s property market continues its remarkable recovery with Emaar Properties announcing AED 12.5 billion in quarterly sales. The ADX index gained 1.8% as real estate and banking stocks led the charge.',
        category: 'stocks',
        content: `The United Arab Emirates real estate sector is experiencing unprecedented growth, with Emaar Properties, Dubai's largest listed developer, reporting record-breaking quarterly sales of AED 12.5 billion, marking a 38% increase year-over-year.

The Abu Dhabi Securities Exchange (ADX) responded positively to the news, closing up 1.8% at 9,420 points, while the Dubai Financial Market (DFM) advanced 1.6% to 4,185 points. Emaar Properties shares jumped 4.2% to AED 7.95, their highest level since 2019.

The surge in real estate activity is being driven by multiple factors, including the UAE's golden visa program, zero income tax policy, and its position as a safe haven for global wealth. Dubai has recorded over AED 380 billion in property transactions year-to-date, surpassing full-year 2022 totals.

First Abu Dhabi Bank (FAB), the UAE's largest lender, also posted gains of 2.3% as mortgage lending volumes increase alongside the property boom. The bank reported a 24% increase in real estate financing compared to the previous quarter.

"Dubai has become the destination of choice for high-net-worth individuals and businesses seeking stability, favorable tax conditions, and world-class infrastructure," explained Khalid Al-Maktoum, real estate analyst at Emirates Investment Bank. "We expect this momentum to continue through 2025."

The hospitality sector is also benefiting, with Emirates NBD estimating that Dubai's hotel occupancy rates are averaging 82%, well above pre-pandemic levels. Retail and commercial property segments are showing similar strength as international brands expand their presence.`,
        keyPoints: [
          'Emaar Properties reports record AED 12.5 billion quarterly sales, up 38% YoY',
          'ADX gains 1.8% and DFM up 1.6% on strong real estate sector performance',
          'Dubai property transactions exceed AED 380 billion year-to-date',
          'First Abu Dhabi Bank mortgage lending up 24% quarter-over-quarter',
          'Hotel occupancy rates averaging 82%, above pre-pandemic levels'
        ],
        marketImpact: 'The real estate boom is creating positive spillover effects across banking, hospitality, and retail sectors. Analysts project continued growth in UAE property markets through 2025, supported by government initiatives and foreign investment.',
        tags: ['Emaar Properties', 'Dubai Real Estate', 'ADX', 'DFM', 'UAE Property Market', 'First Abu Dhabi Bank', 'GCC Economy'],
        authorName: 'Mohammed Al-Suwaidi',
        readTime: 4,
        publishDate: new Date().toISOString(),
        generatedAt: new Date().toISOString(),
        published: true,
        views: 0,
        likes: 0
      },
      {
        id: `article-${Date.now()}-2`,
        title: 'GCC Central Banks Hold Rates Steady as Regional Economies Show Resilience',
        titleAr: 'البنوك المركزية في دول مجلس التعاون الخليجي تبقي على أسعار الفائدة مستقرة مع صمود الاقتصادات الإقليمية',
        slug: 'gcc-central-banks-hold-rates-steady-economic-resilience',
        excerpt: 'Central banks across the GCC region maintained interest rates unchanged this week, reflecting confidence in economic stability. The UAE dirham and Saudi riyal remain firmly pegged to the US dollar despite global currency volatility.',
        category: 'economy',
        content: `Central banks across the Gulf Cooperation Council (GCC) region have unanimously decided to hold interest rates steady, signaling confidence in the region's economic stability and growth trajectory despite global uncertainties.

The Saudi Central Bank (SAMA) kept its repo rate at 5.50% and reverse repo rate at 5.00%, while the UAE Central Bank maintained its base rate at 5.40%. Qatar Central Bank and the Central Bank of Kuwait also opted to hold rates unchanged, continuing their coordinated monetary policy approach.

The decisions come as GCC currencies, particularly the UAE dirham and Saudi riyal, remain firmly pegged to the US dollar at 3.67 and 3.75 respectively. This stability has been maintained despite significant volatility in other emerging market currencies.

"The GCC monetary framework has proven remarkably resilient," noted Dr. Rania Al-Rashid, chief economist at Gulf Economic Research Institute. "Our economies are benefiting from disciplined fiscal policies, robust non-oil sector growth, and strong foreign exchange reserves."

Non-oil sectors across the GCC are showing particularly strong performance. Saudi Arabia's non-oil private sector grew 4.8% in the latest quarter, while the UAE's non-oil economy expanded 6.2%. These figures demonstrate successful economic diversification efforts.

The banking sector remains well-capitalized across the region, with capital adequacy ratios averaging 18.5%, well above Basel III requirements. Regional banks are reporting strong loan growth and improving asset quality, supporting overall financial stability.

Inflation remains moderate across GCC countries, averaging 2.8% year-over-year, allowing central banks flexibility in their policy approaches. Food and housing components show stability, while transportation costs have eased following global oil price adjustments.`,
        keyPoints: [
          'GCC central banks maintain interest rates steady across the region',
          'UAE dirham and Saudi riyal remain firmly pegged to USD at 3.67 and 3.75',
          'Non-oil sector growth averages 5.5% across GCC economies',
          'Regional banking sector capital adequacy at 18.5%, above Basel III minimums',
          'Inflation remains moderate at 2.8% average across GCC countries'
        ],
        marketImpact: 'Stable interest rates and strong economic fundamentals support investor confidence in GCC markets. The robust non-oil sector growth indicates successful diversification, reducing dependence on energy revenues and creating sustainable long-term growth.',
        tags: ['GCC Central Banks', 'Interest Rates', 'UAE Dirham', 'Saudi Riyal', 'Economic Stability', 'Non-Oil Growth', 'Monetary Policy'],
        authorName: 'Dr. Hassan Al-Qassimi',
        readTime: 5,
        publishDate: new Date().toISOString(),
        generatedAt: new Date().toISOString(),
        published: true,
        views: 0,
        likes: 0
      }
    ]

    return NextResponse.json({
      success: true,
      count: demoArticles.length,
      articles: demoArticles,
      generated: new Date().toISOString(),
      model: 'fallback-demo',
      tokensUsed: 0,
      note: 'Demo news articles - OpenAI unavailable. Please configure OPENAI_API_KEY for live AI generation.'
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
    maxTokens: process.env.OPENAI_MAX_TOKENS || '4000',
    temperature: process.env.OPENAI_TEMPERATURE || '0.8',
    timestamp: new Date().toISOString()
  })
}
