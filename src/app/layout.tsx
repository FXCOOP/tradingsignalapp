export const metadata = {
  title: 'GCC Signal Pro - Premium Gulf Trading Signals | Forex Gold BTC Signals UAE KSA Qatar',
  description: 'GCC #1 Trading Signals Platform | Live Forex, Gold, Bitcoin & Stock signals with 87% accuracy | AI-powered analysis for Gulf traders | Islamic finance compliant | إشارات التداول الاحترافية لدول الخليج',
  keywords: 'trading signals GCC, forex signals UAE, bitcoin signals Saudi Arabia, gold trading Qatar, إشارات التداول الخليج, forex Dubai, cryptocurrency Kuwait, Tadawul signals, economic signals Gulf, AI trading GCC, Saudi riyal forex, UAE dirham, ADX signals, Dubai trading, Abu Dhabi forex, online trading GCC, investment Gulf, halal trading signals, Islamic finance GCC, Shariah compliant trading',
  authors: [{ name: 'GCC Signal Pro' }],
  creator: 'GCC Signal Pro Gulf',
  publisher: 'GCC Signal Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gccsignalpro.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-AE': '/ar-AE',
    },
  },
  openGraph: {
    title: 'GCC Signal Pro - Premium Trading Signals for Gulf Markets',
    description: 'Join 25,000+ Gulf traders using our AI-powered signals. 87% accuracy rate. Live Forex, Gold, Bitcoin signals. Islamic finance compliant.',
    url: 'https://gccsignalpro.com',
    siteName: 'GCC Signal Pro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PK Signal Pulse - Trading Signals Pakistan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PK Signal Pulse - Pakistan Trading Signals',
    description: 'AI-powered trading signals for Pakistani traders. Forex, Gold, Bitcoin signals with 87% accuracy.',
    images: ['/twitter-image.jpg'],
    creator: '@pksignalpulse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="ICBM" content="30.3753, 69.3451" />
        <meta name="DC.title" content="PK Signal Pulse - Pakistan Trading Signals" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="English, Urdu" />
        <meta name="target" content="Pakistan, Middle East, South Asia" />
        <meta name="audience" content="Pakistan traders, forex traders, cryptocurrency investors" />
        <meta name="subject" content="Trading Signals, Financial Markets, Investment" />
        <meta name="copyright" content="PK Signal Pulse 2025" />
        <meta name="abstract" content="Pakistan premier trading signals platform offering AI-powered forex, gold, and cryptocurrency signals" />
        <meta name="topic" content="Trading Signals Pakistan" />
        <meta name="summary" content="Professional trading signals platform for Pakistani traders with 87% accuracy rate" />
        <meta name="Classification" content="Finance, Trading, Investment" />
        <meta name="designer" content="PK Signal Pulse" />
        <meta name="reply-to" content="support@pksignalpulse.com" />
        <meta name="owner" content="PK Signal Pulse" />
        <meta name="url" content="https://pksignalpulse.com" />
        <meta name="identifier-URL" content="https://pksignalpulse.com" />
        <meta name="category" content="Finance, Trading, Forex, Cryptocurrency" />
        <meta name="coverage" content="Pakistan, Global" />

        {/* Urdu Meta Tags */}
        <meta name="description-ur" content="پاکستان کا سب سے بہترین ٹریڈنگ سگنلز پلیٹ فارم | AI کے ذریعے فوری اور درست ٹریڈنگ سگنلز | فاریکس، گولڈ، بٹ کوائن کے لیے 87% درستگی" />
        <meta name="keywords-ur" content="پاکستان ٹریڈنگ سگنلز، فاریکس پاکستان، بٹ کوائن پاکستان، گولڈ ٹریڈنگ، آن لائن ٹریڈنگ پاکستان، انویسٹمنٹ پاکستان" />

        {/* Economic Keywords for Pakistan */}
        <meta name="economic-keywords" content="PKR USD, Pakistan rupee forex, State Bank Pakistan rates, PSX KSE100, Pakistan economic indicators, inflation Pakistan, interest rates Pakistan, GDP Pakistan, Pakistan forex reserves, CPEC trading, China Pakistan trade, UAE Pakistan trade, Saudi Pakistan trade, Pakistan export import, textile exports Pakistan, agriculture Pakistan economy, Pakistan stock market, Pakistan bonds, Pakistan commodities, Karachi cotton, Pakistan wheat prices, Pakistan oil imports, Pakistan gas prices, Pakistan electricity tariff, Pakistan taxation, Pakistan budget, Pakistan economic growth, Pakistan inflation rate, Pakistan unemployment, Pakistan remittances, Pakistan exports, Pakistan imports, Pakistan trade deficit, Pakistan current account, Pakistan fiscal deficit, Pakistan debt to GDP" />

        {/* Local SEO */}
        <meta name="geo.position" content="30.3753;69.3451" />
        <meta name="NUTS" content="PK" />
        <meta name="location" content="Pakistan" />

        {/* Financial Industry Keywords */}
        <meta name="industry-keywords" content="financial services Pakistan, investment advisory Pakistan, wealth management Pakistan, portfolio management Pakistan, asset management Pakistan, mutual funds Pakistan, pension funds Pakistan, insurance Pakistan, banking Pakistan, microfinance Pakistan, Islamic banking Pakistan, takaful Pakistan, sukuk Pakistan, Pakistan capital markets, Pakistan derivatives, Pakistan commodities exchange, Pakistan stock exchange, Pakistan forex market, Pakistan money market, Pakistan bond market, halal trading Pakistan, sharia compliant trading, Islamic finance Pakistan" />

        {/* Trading Related Keywords */}
        <meta name="trading-keywords" content="day trading Pakistan, swing trading Pakistan, scalping Pakistan, position trading Pakistan, technical analysis Pakistan, fundamental analysis Pakistan, chart patterns Pakistan, candlestick patterns Pakistan, support resistance Pakistan, moving averages Pakistan, RSI Pakistan, MACD Pakistan, Bollinger bands Pakistan, Fibonacci Pakistan, Elliott wave Pakistan, trading strategies Pakistan, risk management Pakistan, money management Pakistan, trading psychology Pakistan, trading education Pakistan, trading course Pakistan, trading mentor Pakistan, trading signals telegram Pakistan, trading signals whatsapp Pakistan" />

        {/* Competitor Keywords */}
        <meta name="competitor-keywords" content="best trading signals Pakistan, top forex signals Pakistan, accurate trading signals Pakistan, profitable signals Pakistan, free trading signals Pakistan, premium trading signals Pakistan, VIP trading signals Pakistan, professional trading signals Pakistan, expert trading signals Pakistan, reliable trading signals Pakistan, trusted trading signals Pakistan, verified trading signals Pakistan, live trading signals Pakistan, real time signals Pakistan, instant trading signals Pakistan, automated trading signals Pakistan, copy trading Pakistan, social trading Pakistan, mirror trading Pakistan, signal providers Pakistan, trading mentors Pakistan, trading gurus Pakistan, trading experts Pakistan, market analysts Pakistan" />
      </head>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "PK Signal Pulse",
              "description": "Pakistan premier trading signals platform offering AI-powered forex, gold, and cryptocurrency signals with 87% accuracy rate",
              "url": "https://pksignalpulse.com",
              "logo": "https://pksignalpulse.com/logo.png",
              "image": "https://pksignalpulse.com/og-image.jpg",
              "telephone": "+92-300-0000000",
              "email": "support@pksignalpulse.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Financial District",
                "addressLocality": "Karachi",
                "addressRegion": "Sindh",
                "postalCode": "74000",
                "addressCountry": "PK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "24.8607",
                "longitude": "67.0011"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Pakistan"
              },
              "serviceType": "Trading Signals",
              "provider": {
                "@type": "Organization",
                "name": "PK Signal Pulse",
                "url": "https://pksignalpulse.com"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Basic Trading Signals",
                  "price": "49",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2025-12-31",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "Professional Trading Signals",
                  "price": "99",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2025-12-31",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "Elite Trading Signals",
                  "price": "199",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2025-12-31",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4.8",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Ahmed Khan"
                },
                "reviewBody": "Best trading signals platform in Pakistan. Very accurate and profitable signals."
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5"
              },
              "sameAs": [
                "https://www.facebook.com/pksignalpulse",
                "https://www.twitter.com/pksignalpulse",
                "https://www.instagram.com/pksignalpulse",
                "https://www.youtube.com/pksignalpulse",
                "https://www.linkedin.com/company/pksignalpulse",
                "https://t.me/pksignalpulse"
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'XXXXXXXXXX');
              fbq('track', 'PageView');
            `,
          }}
        />

        {children}
      </body>
    </html>
  )
}