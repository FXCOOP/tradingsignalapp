import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Check if already seeded
  if (await prisma.signal.count() > 0) {
    console.log('✅ Database already seeded');
    return;
  }

  // Create sample subscriber
  await prisma.subscriber.create({
    data: { email: 'demo@pksignalpulse.com' }
  });

  // Create comprehensive sample trading signals
  const sampleSignals = [
    {
      date: new Date('2025-09-26T08:00:00Z'),
      instrument: 'XAUUSD',
      direction: 'BUY',
      entry: 2640.50,
      stopLoss: 2630.00,
      takeProfits: JSON.stringify([2650.00, 2660.00, 2675.00]),
      timeframe: 'Swing',
      confidence: 85,
      rationale_en: 'Gold showing strong support at 2640 level with bullish momentum. Fed policy dovish outlook supporting precious metals.',
      rationale_ur: 'سونا 2640 کی سطح پر مضبوط سپورٹ دکھا رہا ہے اور تیزی کا رجحان ہے۔ Fed کی نرم پالیسی قیمتی دھاتوں کو سپورٹ کر رہی ہے۔',
      newsRefs: JSON.stringify(['Fed dovish stance', 'Inflation concerns']),
      calendarRefs: JSON.stringify(['FOMC minutes', 'NFP release']),
      indicators: JSON.stringify(['RSI: 65', 'MACD: Bullish crossover', 'EMA 50: Support']),
      sentiment: 'Buy',
      slug: 'xauusd-buy-signal-sep26',
      htmlPath: '/signals/xauusd-buy-signal-sep26.html'
    },
    {
      date: new Date('2025-09-26T09:00:00Z'),
      instrument: 'EURUSD',
      direction: 'SELL',
      entry: 1.1120,
      stopLoss: 1.1150,
      takeProfits: JSON.stringify([1.1090, 1.1060, 1.1030]),
      timeframe: 'Intraday',
      confidence: 78,
      rationale_en: 'EUR weakness against USD as ECB signals potential rate cuts. Technical resistance at 1.1120 holding strong.',
      rationale_ur: 'یورو ڈالر کے مقابلے میں کمزور ہے کیونکہ ECB نے شرح سود میں کمی کے اشارے دیے ہیں۔ 1.1120 پر تکنیکی مزاحمت مضبوط ہے۔',
      newsRefs: JSON.stringify(['ECB dovish signals', 'US dollar strength']),
      calendarRefs: JSON.stringify(['EU GDP data']),
      indicators: JSON.stringify(['RSI: 72', 'Bearish divergence', 'Resistance at 1.1120']),
      sentiment: 'Sell',
      slug: 'eurusd-sell-signal-sep26',
      htmlPath: '/signals/eurusd-sell-signal-sep26.html'
    },
    {
      date: new Date('2025-09-26T10:00:00Z'),
      instrument: 'US100',
      direction: 'BUY',
      entry: 19850.0,
      stopLoss: 19750.0,
      takeProfits: JSON.stringify([19950.0, 20050.0, 20200.0]),
      timeframe: 'Swing',
      confidence: 82,
      rationale_en: 'Tech sector showing resilience with strong quarterly earnings. NASDAQ breaking above key resistance levels.',
      rationale_ur: 'ٹیک سیکٹر مضبوط سہ ماہی آمدنی کے ساتھ مستحکم نظر آ رہا ہے۔ NASDAQ اہم مزاحمتی سطوح سے اوپر نکل رہا ہے۔',
      newsRefs: JSON.stringify(['Tech earnings strong', 'AI sector growth']),
      calendarRefs: JSON.stringify(['NVIDIA earnings', 'Apple results']),
      indicators: JSON.stringify(['RSI: 68', 'Breaking resistance', 'Volume increasing']),
      sentiment: 'Buy',
      slug: 'us100-buy-signal-sep26',
      htmlPath: '/signals/us100-buy-signal-sep26.html'
    },
    {
      date: new Date('2025-09-25T14:00:00Z'),
      instrument: 'GBPUSD',
      direction: 'BUY',
      entry: 1.3350,
      stopLoss: 1.3300,
      takeProfits: JSON.stringify([1.3400, 1.3450, 1.3500]),
      timeframe: 'Intraday',
      confidence: 75,
      rationale_en: 'GBP recovery on BoE hawkish stance. Sterling finding support above 1.3350 with bullish momentum building.',
      rationale_ur: 'BoE کے سخت موقف پر GBP میں بحالی۔ سٹرلنگ 1.3350 سے اوپر سپورٹ تلاش کر رہا ہے اور تیزی کا رجحان بن رہا ہے۔',
      newsRefs: JSON.stringify(['BoE hawkish', 'UK inflation data']),
      calendarRefs: JSON.stringify(['BoE Governor speech', 'UK retail sales']),
      indicators: JSON.stringify(['RSI: 58', 'EMA crossover', 'Support holding']),
      sentiment: 'Buy',
      slug: 'gbpusd-buy-signal-sep25',
      htmlPath: '/signals/gbpusd-buy-signal-sep25.html'
    }
  ];

  // Insert sample signals
  for (const signal of sampleSignals) {
    await prisma.signal.create({ data: signal });
  }

  console.log(`✅ Seeded ${sampleSignals.length} trading signals and 1 subscriber`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });