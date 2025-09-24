import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleArticles = [
  {
    title: "EUR/USD Weekly Analysis: ECB Rate Decision Impact",
    titleUrdu: "یورو/امریکی ڈالر ہفتہ وار تجزیہ: ECB شرح فیصلے کا اثر",
    excerpt: "The European Central Bank's upcoming rate decision could significantly impact EUR/USD trading patterns. Technical analysis suggests key support at 1.0850 with potential upside targets at 1.0920 and 1.0980.",
    excerptUrdu: "یورپی مرکزی بینک کا آنے والا شرح کا فیصلہ یورو/امریکی ڈالر کے تجارتی پیٹرن پر نمایاں اثر ڈال سکتا ہے۔ تکنیکی تجزیہ 1.0850 پر اہم سپورٹ اور 1.0920 اور 1.0980 پر ممکنہ اپ سائیڈ ٹارگٹس کو ظاہر کرتا ہے۔",
    content: `
      <h2>Market Overview</h2>
      <p>The EUR/USD pair has shown remarkable resilience in recent trading sessions, maintaining its position above the critical 1.0850 support level. This level has acted as a strong foundation, preventing further downside movement and providing traders with confidence in potential bullish scenarios.</p>

      <h3>Technical Analysis</h3>
      <p>From a technical perspective, several key indicators are aligning to support a cautiously optimistic outlook:</p>
      <ul>
        <li><strong>Support Level:</strong> 1.0850 - This level has been tested multiple times and continues to hold</li>
        <li><strong>Primary Resistance:</strong> 1.0920 - Breaking this level could open the door to further gains</li>
        <li><strong>Secondary Resistance:</strong> 1.0980 - A key psychological level that traders are watching</li>
        <li><strong>RSI Indicator:</strong> Currently at 35, indicating oversold conditions that could lead to a bounce</li>
      </ul>

      <h3>Fundamental Factors</h3>
      <p>The upcoming European Central Bank rate decision is expected to provide crucial direction for the pair. Key economic indicators from both the Eurozone and the United States will play a significant role in determining the next major move.</p>

      <h3>Trading Strategy</h3>
      <p>Traders should monitor the 1.0850 support level closely. A break below could signal further weakness, while a bounce from this level could present bullish opportunities targeting the resistance zones mentioned above.</p>
    `,
    contentUrdu: `
      <h2>مارکیٹ کا جائزہ</h2>
      <p>یورو/امریکی ڈالر جوڑے نے حالیہ تجارتی سیشنز میں قابل ذکر مضبوطی کا مظاہرہ کیا ہے، اہم 1.0850 سپورٹ لیول سے اوپر اپنی پوزیشن برقرار رکھی ہے۔ یہ لیول ایک مضبوط بنیاد کا کام کر رہا ہے۔</p>

      <h3>تکنیکی تجزیہ</h3>
      <p>تکنیکی نقطہ نظر سے، کئی اہم اشارے محتاط طور پر مثبت نقطہ نظر کی حمایت میں ہیں:</p>
      <ul>
        <li><strong>سپورٹ لیول:</strong> 1.0850 - اس لیول کو کئی بار ٹیسٹ کیا گیا اور یہ برقرار ہے</li>
        <li><strong>بنیادی مزاحمت:</strong> 1.0920 - اس لیول کو توڑنا مزید فوائد کا دروازہ کھول سکتا ہے</li>
        <li><strong>ثانوی مزاحمت:</strong> 1.0980 - ایک اہم نفسیاتی لیول</li>
      </ul>
    `,
    language: "en"
  },
  {
    title: "Gold Price Analysis: Safe Haven Demand Surges",
    titleUrdu: "سونے کی قیمت کا تجزیہ: محفوظ پناہ گاہ کی مانگ میں اضافہ",
    excerpt: "Gold prices have surged above $2,050 resistance as geopolitical tensions increase global uncertainty. Technical indicators suggest further upside potential toward $2,080-$2,100 zone.",
    excerptUrdu: "جیو پولیٹیکل تناؤ کی وجہ سے عالمی غیر یقینی صورتحال میں اضافے کے باعث سونے کی قیمتوں میں $2,050 مزاحمت سے اوپر اضافہ ہوا ہے۔ تکنیکی اشارے $2,080-$2,100 زون کی طرف مزید اضافے کی صلاحیت کو ظاہر کرتے ہیں۔",
    content: `
      <h2>Gold Market Dynamics</h2>
      <p>Gold has demonstrated exceptional strength in recent trading sessions, successfully breaking through the crucial $2,050 resistance level. This breakthrough signals a potential continuation of the bullish trend that has been building momentum over the past several weeks.</p>

      <h3>Key Technical Levels</h3>
      <ul>
        <li><strong>Current Support:</strong> $2,050 (former resistance, now support)</li>
        <li><strong>Immediate Target:</strong> $2,080 - First major resistance zone</li>
        <li><strong>Extended Target:</strong> $2,100 - Psychological resistance level</li>
        <li><strong>Stop Loss Zone:</strong> Below $2,035 for long positions</li>
      </ul>

      <h3>Fundamental Drivers</h3>
      <p>Several fundamental factors are supporting gold's bullish momentum:</p>
      <ul>
        <li>Increased geopolitical tensions creating safe-haven demand</li>
        <li>Persistent inflation concerns in major economies</li>
        <li>Central bank policy uncertainties</li>
        <li>Currency devaluation fears driving precious metal investments</li>
      </ul>

      <h3>Trading Outlook</h3>
      <p>The technical breakout combined with strong fundamental support suggests gold could continue its upward trajectory. Traders should watch for any pullbacks to the $2,050 level as potential buying opportunities.</p>
    `,
    contentUrdu: `
      <h2>سونے کی مارکیٹ کی حرکیات</h2>
      <p>سونے نے حالیہ تجارتی سیشنز میں غیر معمولی طاقت کا مظاہرہ کیا ہے، کامیابی سے اہم $2,050 مزاحمتی سطح کو توڑا ہے۔ یہ پیش قدمی اس تیزی کے رجحان کی ممکنہ تسلسل کی علامت ہے۔</p>

      <h3>اہم تکنیکی سطحیں</h3>
      <ul>
        <li><strong>موجودہ سپورٹ:</strong> $2,050 (سابق مزاحمت، اب سپورٹ)</li>
        <li><strong>فوری ہدف:</strong> $2,080 - پہلا بڑا مزاحمتی زون</li>
        <li><strong>توسیعی ہدف:</strong> $2,100 - نفسیاتی مزاحمتی سطح</li>
      </ul>
    `,
    language: "en"
  },
  {
    title: "Bitcoin Technical Analysis: Breaking $45,000 Resistance",
    titleUrdu: "بٹ کوائن تکنیکی تجزیہ: $45,000 مزاحمت کو توڑنا",
    excerpt: "Bitcoin has achieved a significant technical breakthrough above $45,000 with strong volume confirmation. This development opens the path toward $48,000 and potentially $50,000 in the near term.",
    excerptUrdu: "بٹ کوائن نے مضبوط والیوم کی تصدیق کے ساتھ $45,000 سے اوپر ایک اہم تکنیکی پیش قدمی حاصل کی ہے۔ یہ ترقی قریبی مدت میں $48,000 اور ممکنہ طور پر $50,000 کی طرف راستہ کھولتی ہے۔",
    content: `
      <h2>Bitcoin's Momentum Surge</h2>
      <p>Bitcoin has achieved a significant milestone by breaking through the $45,000 resistance level, a barrier that has held firm for several weeks. This breakthrough is particularly noteworthy due to the strong volume accompanying the move, indicating genuine institutional and retail buying interest.</p>

      <h3>Technical Indicators</h3>
      <p>Multiple technical indicators are aligning to support Bitcoin's bullish case:</p>
      <ul>
        <li><strong>Volume Confirmation:</strong> Above-average trading volume validates the breakout</li>
        <li><strong>RSI Levels:</strong> Healthy levels around 65, showing momentum without being overbought</li>
        <li><strong>Moving Averages:</strong> Price trading above key MAs (20, 50, 200)</li>
        <li><strong>Support Zone:</strong> $43,500-$44,000 now acts as strong support</li>
      </ul>

      <h3>Price Targets</h3>
      <p>Based on technical analysis and historical price patterns:</p>
      <ul>
        <li><strong>Immediate Target:</strong> $48,000 - Previous significant high</li>
        <li><strong>Extended Target:</strong> $50,000 - Major psychological level</li>
        <li><strong>Long-term Potential:</strong> $55,000+ if bullish momentum continues</li>
      </ul>

      <h3>Risk Management</h3>
      <p>While the technical picture appears positive, traders should maintain proper risk management with stop losses below the $43,500 support level to protect against unexpected reversals.</p>
    `,
    contentUrdu: `
      <h2>بٹ کوائن کی رفتار میں اضافہ</h2>
      <p>بٹ کوائن نے $45,000 مزاحمتی سطح کو توڑ کر ایک اہم سنگ میل حاصل کیا ہے، یہ رکاوٹ کئی ہفتوں سے مضبوط تھی۔ یہ پیش قدمی خاص طور پر قابل ذکر ہے کیونکہ اس کے ساتھ مضبوط والیوم ہے۔</p>

      <h3>تکنیکی اشارے</h3>
      <p>متعدد تکنیکی اشارے بٹ کوائن کے تیزی کے کیس کی حمایت میں ہیں:</p>
      <ul>
        <li><strong>والیوم کی تصدیق:</strong> اوسط سے زیادہ تجارتی والیوم بریک آؤٹ کو منظور کرتا ہے</li>
        <li><strong>RSI لیولز:</strong> 65 کے قریب صحت مند سطح</li>
        <li><strong>سپورٹ زون:</strong> $43,500-$44,000 اب مضبوط سپورٹ کا کام کرتا ہے</li>
      </ul>
    `,
    language: "en"
  }
];

const signals = [
  {
    instrument: "EUR/USD",
    class: "FOREX",
    bias: "BULLISH",
    entry: 1.0865,
    stopLoss: 1.0820,
    takeProfit1: 1.0920,
    takeProfit2: 1.0980,
    timeframe: "4H",
    confidence: 7,
    reasoning: "Bounce from key support with ECB rate decision approaching"
  },
  {
    instrument: "XAU/USD",
    class: "COMMODITIES",
    bias: "BULLISH",
    entry: 2055,
    stopLoss: 2035,
    takeProfit1: 2080,
    takeProfit2: 2100,
    timeframe: "1H",
    confidence: 8,
    reasoning: "Safe-haven demand with geopolitical tensions rising"
  },
  {
    instrument: "BTC/USD",
    class: "CRYPTO",
    bias: "BULLISH",
    entry: 45200,
    stopLoss: 43500,
    takeProfit1: 48000,
    takeProfit2: 50000,
    timeframe: "4H",
    confidence: 7,
    reasoning: "Volume breakout above key resistance with institutional buying"
  },
  {
    instrument: "GBP/USD",
    class: "FOREX",
    bias: "BEARISH",
    entry: 1.2640,
    stopLoss: 1.2680,
    takeProfit1: 1.2580,
    takeProfit2: 1.2520,
    timeframe: "1H",
    confidence: 6,
    reasoning: "Rejection from resistance with weak UK economic data"
  }
];

async function main() {
  console.log('🌱 Creating comprehensive sample articles...')

  // Clear existing data
  await prisma.signal.deleteMany({});
  await prisma.source.deleteMany({});
  await prisma.article.deleteMany({});

  // Create articles for each of the last 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);

    for (let articleIndex = 0; articleIndex < sampleArticles.length; articleIndex++) {
      const template = sampleArticles[articleIndex];

      // Create English article
      const englishArticle = await prisma.article.create({
        data: {
          title: `${template.title} - Day ${day + 1}`,
          titleUrdu: `${template.titleUrdu} - دن ${day + 1}`,
          excerpt: template.excerpt,
          excerptUrdu: template.excerptUrdu,
          content: template.content,
          contentUrdu: template.contentUrdu,
          slug: `${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-day-${day + 1}`,
          language: 'en',
          status: 'PUBLISHED',
          publishedAt: date,
          createdAt: date,
          updatedAt: date,
        }
      });

      // Add signals to the article
      for (const signalTemplate of signals) {
        await prisma.signal.create({
          data: {
            ...signalTemplate,
            entry: signalTemplate.entry + (Math.random() * 0.02 - 0.01) * signalTemplate.entry, // Add variation
            articleId: englishArticle.id,
          }
        });
      }

      // Create Urdu version
      const urduArticle = await prisma.article.create({
        data: {
          title: template.titleUrdu + ` - دن ${day + 1}`,
          titleUrdu: template.titleUrdu + ` - دن ${day + 1}`,
          excerpt: template.excerptUrdu,
          excerptUrdu: template.excerptUrdu,
          content: template.contentUrdu,
          contentUrdu: template.contentUrdu,
          slug: `${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-day-${day + 1}-ur`,
          language: 'ur',
          status: 'PUBLISHED',
          publishedAt: date,
          createdAt: date,
          updatedAt: date,
        }
      });

      // Add signals to Urdu article
      for (const signalTemplate of signals) {
        await prisma.signal.create({
          data: {
            ...signalTemplate,
            entry: signalTemplate.entry + (Math.random() * 0.02 - 0.01) * signalTemplate.entry,
            articleId: urduArticle.id,
          }
        });
      }
    }
  }

  console.log('✅ Sample articles created successfully!')
  console.log(`📊 Created ${7 * 3 * 2} articles with ${7 * 3 * 2 * 4} signals`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })