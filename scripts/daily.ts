import { prisma } from '@/lib/db';
import { signalToHtml } from '@/lib/html-template';
import { writeSignalHTML, slugify } from '@/lib/fs-html';
import { sendDailyDigest } from '@/lib/email';

export async function runDailyJob(){
  const now = new Date();
  const baseSignals = [
    {
      instrument: 'XAUUSD', direction: 'Buy', entry: 2405.5, stopLoss: 2392.0, tps: [2412.0, 2420.0],
      timeframe: 'Swing(1–3d)', confidence: 68, sentiment: 'Buy',
      rationale_en: 'Gold supported by mild USD softness and risk hedging; RSI rising on 4h, MACD above zero. Watching US data later today.',
      rationale_ur: 'سونے کو قدرے کمزور ڈالر اور رسک ہیجنگ سے سہارا ملا ہے؛ 4 گھنٹے کے چارٹ پر RSI اوپر جا رہا ہے اور MACD مثبت ہے۔ آج کے امریکی ڈیٹا پر نظر۔',
      newsRefs: [{ title: 'Dollar eases after data', url: 'https://example.com/a', source: 'News' }],
      calendarRefs: [{ event: 'US CPI', time: '18:30 PKT', impact: 'High' }],
      indicators: { rsi: '58 rising', macd: '>0', supertrend: 'up', ichimoku: 'above cloud', moving_averages: 'MA20>MA50' }
    },
    {
      instrument: 'EURUSD', direction: 'Buy', entry: 1.091, stopLoss: 1.085, tps: [1.095, 1.099],
      timeframe: 'Scalp(1–4h)', confidence: 62, sentiment: 'Neutral',
      rationale_en: 'Euro holds above 1.09 with 4h bullish crossover; awaiting ECB speakers; light calendar risk in EU session.',
      rationale_ur: 'یورو 1.09 کے اوپر برقرار، 4 گھنٹے میں بُلش کراس اوور؛ ECB مقررین کے بیانات کا انتظار۔ یورپی سیشن میں کم کیلنڈر رسک۔',
      newsRefs: [{ title: 'ECB watch', url: 'https://example.com/b', source: 'Desk' }],
      calendarRefs: [{ event: 'ECB Speakers', time: '15:00 PKT', impact: 'Medium' }],
      indicators: { rsi: '54', macd: 'flat', supertrend: 'up', ichimoku: 'edge of cloud', moving_averages: 'MA20~MA50' }
    },
    {
      instrument: 'US100', direction: 'Sell', entry: 19050, stopLoss: 19160, tps: [18920, 18840],
      timeframe: 'Swing(1–3d)', confidence: 60, sentiment: 'Sell',
      rationale_en: 'Tech index extended; 1h bearish divergence on RSI, profit-taking before key earnings; watch VIX.',
      rationale_ur: 'ٹیک انڈیکس میں اضافہ؛ 1 گھنٹے کے RSI پر بیئرش ڈائیورجنس، اہم آمدنی سے پہلے منافع بکنگ؛ VIX پر نظر۔',
      newsRefs: [{ title: 'Earnings ahead', url: 'https://example.com/c', source: 'Calendar' }],
      calendarRefs: [{ event: 'Big Tech Earnings', time: '23:00 PKT', impact: 'High' }],
      indicators: { rsi: '48 falling', macd: '<0', supertrend: 'down', ichimoku: 'below base', moving_averages: 'MA20<MA50' }
    }
  ];

  const created: string[] = [];
  for (const s of baseSignals){
    const slug = `${now.toISOString().slice(0,10)}-${slugify(`${s.instrument}-${s.direction}`)}`;
    const signal = await prisma.signal.create({ data: {
      date: now,
      instrument: s.instrument,
      direction: s.direction,
      entry: s.entry,
      stopLoss: s.stopLoss,
      takeProfits: JSON.stringify(s.tps),
      timeframe: s.timeframe,
      confidence: s.confidence,
      rationale_en: s.rationale_en,
      rationale_ur: s.rationale_ur,
      newsRefs: JSON.stringify(s.newsRefs),
      calendarRefs: JSON.stringify(s.calendarRefs),
      indicators: JSON.stringify(s.indicators),
      sentiment: s.sentiment,
      slug,
      htmlPath: ''
    }});

    const htmlEn = signalToHtml({ signal, language: 'en', affiliate: process.env.EXNESS_AFFILIATE_URL || '#' });
    const htmlPath = await writeSignalHTML(htmlEn, now, slug);
    await prisma.signal.update({ where: { id: signal.id }, data: { htmlPath } });

    const htmlUr = signalToHtml({ signal: { ...signal, htmlPath }, language: 'ur', affiliate: process.env.EXNESS_AFFILIATE_URL || '#' });
    await writeSignalHTML(htmlUr, now, slug + '-ur');

    created.push(slug);
  }

  const subs = await prisma.subscriber.findMany({ where: { isActive: true }, select: { email: true } });
  const items = await prisma.signal.findMany({ where: { date: { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } }, orderBy: { date: 'desc' } });
  const links = items.map(i=>({ title: `${i.instrument} ${i.direction}`, url: `${process.env.APP_BASE_URL}/${i.htmlPath}` }));
  for (const s of subs) {
    try { await sendDailyDigest(s.email, links); } catch(e){ console.error('mail', s.email, e); }
  }

  return { created };
}

if (import.meta.url === `file://${process.argv[1]}`){
  runDailyJob().then(r=>{ console.log('Created', r.created); process.exit(0); });
}