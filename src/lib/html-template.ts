import type { Signal } from '@prisma/client';

export function signalToHtml({ signal, language, affiliate }: { signal: Signal; language: 'en'|'ur'; affiliate: string }){
  const rationale = language==='ur' ? signal.rationale_ur : signal.rationale_en;
  const dir = language==='ur' ? 'rtl' : 'ltr';
  const ogTitle = `${signal.instrument} ${signal.direction} — ${new Date(signal.date).toISOString().slice(0,10)}`;
  const aff = `${affiliate}?utm_source=pksignal&utm_medium=site&utm_campaign=signal&subid=${encodeURIComponent(signal.slug)}`;

  const tps = JSON.parse(signal.takeProfits) as number[];
  const news = JSON.parse(signal.newsRefs) as {title:string,url:string,source?:string}[];
  const cal = JSON.parse(signal.calendarRefs) as {event:string,time:string,impact?:string}[];

  return `<!DOCTYPE html>
<html lang="${language}" dir="${dir}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${ogTitle} | PK Signal Pulse</title>
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:type" content="article" />
  <meta name="description" content="Actionable educational signal for ${signal.instrument}." />
  <script type="application/ld+json">${JSON.stringify({
    '@context':'https://schema.org', '@type':'Article', headline: ogTitle, datePublished: signal.createdAt
  })}</script>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Noto Sans",sans-serif;line-height:1.6;margin:0;background:#0f172a;color:#0b1220}
    .wrap{max-width:880px;margin:0 auto;padding:20px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:18px;margin-top:12px;box-shadow:0 10px 25px rgba(2,6,23,0.08)}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}
    a{color:#0a58ca;text-decoration:none}
    a:hover{text-decoration:underline}
    .cta{display:block;background:linear-gradient(90deg,#06b6d4,#22d3ee);color:#001b2b;padding:12px 16px;border-radius:12px;text-align:center;margin-top:12px;font-weight:700}
    .muted{color:#6b7280;font-size:12px}
    h1{font-size:24px;margin:0;color:#e2e8f0}
    h2{font-size:18px;margin:0 0 8px 0}
    header.card{background:linear-gradient(180deg,#0ea5e9 0,#38bdf8 100%);color:white;border:none}
    .pill{display:inline-block;background:#ecfeff;color:#0e7490;border-radius:9999px;padding:4px 10px;font-size:12px}
  </style>
</head>
<body>
  <div class="wrap">
  <article class="card">
    <header class="card" style="margin-top:0">
      <h1>${signal.instrument} — ${signal.direction}</h1>
      <div class="pill">${new Date(signal.date).toLocaleString()}</div>
    </header>
    <section class="card">
      <div class="grid">
        <div><strong>Entry</strong><br/>${signal.entry}</div>
        <div><strong>Stop Loss</strong><br/>${signal.stopLoss}</div>
        <div><strong>TPs</strong><br/>${tps.join(', ')}</div>
        <div><strong>Timeframe</strong><br/>${signal.timeframe}</div>
        <div><strong>Confidence</strong><br/>${signal.confidence}</div>
        <div><strong>Sentiment</strong><br/>${signal.sentiment}</div>
      </div>
    </section>
    <section class="card">
      <h2>${language==='ur'?'کیوں یہ ٹریڈ؟':'Why this trade'}</h2>
      <p>${rationale}</p>
    </section>
    <section class="card">
      <h2>${language==='ur'?'خبریں اور ایونٹس':'Today\'s News & Events'}</h2>
      <ul>
        ${news.map(n=>`<li><a href="${n.url}" rel="nofollow noopener" target="_blank">${n.title}${n.source?` — ${n.source}`:''}</a></li>`).join('')}
      </ul>
      ${cal.length?`<div class="muted" style="margin-top:8px">${cal.map(c=>`${c.event} (${c.time})`).join(' • ')}</div>`:''}
    </section>
    <a class="cta" href="${aff}" target="_blank" rel="nofollow noopener">${language==='ur'?'Exness پر ٹریڈ کریں':'Trade on Exness'} →</a>
    <p class="muted" style="margin-top:8px">Educational content, not financial advice. Trading involves risk of loss.</p>
  </article>
  </div>
</body>
</html>`;
}