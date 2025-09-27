import { prisma } from './db';

// Mock signals for when database is not available
const mockSignals = [
  {
    id: '1',
    date: new Date('2025-09-26T08:00:00Z'),
    instrument: 'XAUUSD',
    direction: 'BUY' as const,
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
    id: '2',
    date: new Date('2025-09-26T09:00:00Z'),
    instrument: 'EURUSD',
    direction: 'SELL' as const,
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
  }
];

export async function getLatestSignals(n=4){
  try {
    return await prisma.signal.findMany({ orderBy: { date: 'desc' }, take: n });
  } catch (error) {
    console.warn('Database not available, using mock signals:', error);
    return mockSignals.slice(0, n);
  }
}

export async function listSignals(page=1, pageSize=20){
  try {
    return await prisma.signal.findMany({ orderBy: { date: 'desc' }, skip: (page-1)*pageSize, take: pageSize });
  } catch (error) {
    console.warn('Database not available, using mock signals:', error);
    return mockSignals.slice((page-1)*pageSize, page*pageSize);
  }
}

export async function listAllSignals(){
  try {
    return await prisma.signal.findMany({ orderBy: { date: 'desc' } });
  } catch (error) {
    console.warn('Database not available, using mock signals:', error);
    return mockSignals;
  }
}

export async function findSignalBySlug(slug: string){
  try {
    return await prisma.signal.findUnique({ where: { slug } });
  } catch (error) {
    console.warn('Database not available, using mock signals:', error);
    return mockSignals.find(s => s.slug === slug) || null;
  }
}