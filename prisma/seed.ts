import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleArticles = [
  {
    title: "EUR/USD Weekly Outlook: Key Support Holds",
    titleUrdu: "یورو/امریکی ڈالر ہفتہ وار نقطہ نظر: اہم سہارا برقرار",
    excerpt: "Technical analysis suggests EUR/USD may bounce from 1.0850 support level with potential targets at 1.0920.",
    excerptUrdu: "تکنیکی تجزیہ بتاتا ہے کہ یورو/امریکی ڈالر 1.0850 سہارے کی سطح سے اچھل سکتا ہے۔",
    content: `<h2>Market Overview</h2><p>The EUR/USD pair has shown resilience at the 1.0850 support level, with technical indicators suggesting a potential bounce toward 1.0920. Key economic data from both regions will be crucial for direction.</p><h3>Technical Analysis</h3><ul><li>Support: 1.0850</li><li>Resistance: 1.0920, 1.0980</li><li>RSI: 35 (oversold territory)</li></ul>`,
    contentUrdu: `<h2>مارکیٹ کا جائزہ</h2><p>یورو/امریکی ڈالر جوڑے نے 1.0850 سپورٹ لیول پر مضبوطی دکھائی ہے۔</p>`,
    slug: "eur-usd-weekly-outlook-key-support-holds",
    language: "en"
  },
  {
    title: "Gold Prices Surge on Geopolitical Tensions",
    titleUrdu: "جیو پولیٹیکل تناؤ پر سونے کی قیمتوں میں اضافہ",
    excerpt: "Gold breaks above $2,050 resistance as safe-haven demand increases amid global uncertainties.",
    excerptUrdu: "عالمی غیر یقینی صورتحال کے درمیان محفوظ پناہ گاہ کی مانگ میں اضافے سے سونا 2,050 ڈالر مزاحمت سے اوپر۔",
    content: `<h2>Gold Analysis</h2><p>Gold has broken through the $2,050 resistance level, signaling potential continuation toward $2,080. Geopolitical tensions and inflation concerns support the bullish outlook.</p>`,
    contentUrdu: `<h2>سونے کا تجزیہ</h2><p>سونے نے 2,050 ڈالر مزاحمتی سطح کو توڑ دیا ہے۔</p>`,
    slug: "gold-prices-surge-geopolitical-tensions",
    language: "en"
  },
  {
    title: "Bitcoin Technical Breakout at $45,000",
    titleUrdu: "بٹ کوائن کا 45,000 ڈالر پر تکنیکی بریک آؤٹ",
    excerpt: "BTC breaks key resistance with volume confirmation, targeting $48,000 in the near term.",
    excerptUrdu: "بی ٹی سی نے والیوم کی تصدیق کے ساتھ اہم مزاحمت توڑی، قریبی مدت میں 48,000 ڈالر کا نشانہ۔",
    content: `<h2>Bitcoin Momentum</h2><p>Bitcoin has successfully broken above the $45,000 resistance with strong volume, indicating genuine buying interest. Next target lies at $48,000.</p>`,
    contentUrdu: `<h2>بٹ کوائن کی رفتار</h2><p>بٹ کوائن نے مضبوط والیوم کے ساتھ 45,000 ڈالر مزاحمت سے اوپر کامیابی سے بریک کیا ہے۔</p>`,
    slug: "bitcoin-technical-breakout-45000",
    language: "en"
  }
]

const sampleSignals = [
  {
    instrument: "EUR/USD",
    class: "FOREX" as const,
    bias: "BULLISH" as const,
    entry: 1.0865,
    stopLoss: 1.0820,
    takeProfit1: 1.0920,
    takeProfit2: 1.0980,
    timeframe: "4H",
    confidence: 7,
    reasoning: "Bounce from key support level with RSI oversold"
  },
  {
    instrument: "XAU/USD",
    class: "COMMODITIES" as const,
    bias: "BULLISH" as const,
    entry: 2055,
    stopLoss: 2035,
    takeProfit1: 2080,
    takeProfit2: 2100,
    timeframe: "1H",
    confidence: 8,
    reasoning: "Breakout above resistance with geopolitical support"
  },
  {
    instrument: "BTC/USD",
    class: "CRYPTO" as const,
    bias: "BULLISH" as const,
    entry: 45200,
    stopLoss: 43500,
    takeProfit1: 48000,
    takeProfit2: 50000,
    timeframe: "4H",
    confidence: 7,
    reasoning: "Volume breakout above key resistance level"
  },
  {
    instrument: "GBP/USD",
    class: "FOREX" as const,
    bias: "BEARISH" as const,
    entry: 1.2640,
    stopLoss: 1.2680,
    takeProfit1: 1.2580,
    takeProfit2: 1.2520,
    timeframe: "1H",
    confidence: 6,
    reasoning: "Rejection from resistance, weak fundamentals"
  }
]

async function main() {
  console.log('🌱 Starting seed...')

  // Create 10 days of articles
  for (let i = 0; i < 10; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const dayArticles = sampleArticles.map((template, index) => ({
      ...template,
      title: `${template.title} - Day ${10 - i}`,
      titleUrdu: `${template.titleUrdu} - دن ${10 - i}`,
      slug: `${template.slug}-day-${10 - i}`,
      publishedAt: date,
      createdAt: date,
      updatedAt: date,
      status: 'PUBLISHED' as const,
      language: 'en' as const,
      signals: {
        create: sampleSignals.map(signal => ({
          ...signal,
          entry: signal.entry + (Math.random() * 0.02 - 0.01) * signal.entry, // Add some variation
        }))
      }
    }))

    for (const article of dayArticles) {
      await prisma.article.create({
        data: article
      })
    }

    // Create Urdu versions
    for (const template of sampleArticles) {
      await prisma.article.create({
        data: {
          title: template.titleUrdu,
          titleUrdu: template.titleUrdu,
          excerpt: template.excerptUrdu,
          excerptUrdu: template.excerptUrdu,
          content: template.contentUrdu,
          contentUrdu: template.contentUrdu,
          slug: `${template.slug}-day-${10 - i}-ur`,
          publishedAt: date,
          createdAt: date,
          updatedAt: date,
          status: 'PUBLISHED',
          language: 'ur',
          signals: {
            create: sampleSignals.map(signal => ({
              ...signal,
              entry: signal.entry + (Math.random() * 0.02 - 0.01) * signal.entry,
            }))
          }
        }
      })
    }
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })