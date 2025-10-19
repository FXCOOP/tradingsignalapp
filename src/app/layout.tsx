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
        alt: 'GCC Signal Pro - Trading Signals GCC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GCC Signal Pro - Gulf Trading Signals',
    description: 'AI-powered trading signals for GCC traders. Forex, Gold, Bitcoin signals with 87% accuracy.',
    images: ['/twitter-image.jpg'],
    creator: '@gccsignalpro',
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

import { UserProvider } from '@/contexts/UserContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="AE" />
        <meta name="geo.country" content="United Arab Emirates" />
        <meta name="geo.placename" content="GCC Region" />
        <meta name="ICBM" content="24.4539, 54.3773" />
        <meta name="DC.title" content="GCC Signal Pro - Gulf Trading Signals" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="English, Arabic" />
        <meta name="target" content="GCC Countries, Middle East, Gulf Region" />
        <meta name="audience" content="GCC traders, forex traders, cryptocurrency investors" />
        <meta name="subject" content="Trading Signals, Financial Markets, Investment" />
        <meta name="copyright" content="GCC Signal Pro 2025" />
        <meta name="abstract" content="GCC premier trading signals platform offering AI-powered forex, gold, and cryptocurrency signals" />
        <meta name="topic" content="Trading Signals GCC" />
        <meta name="summary" content="Professional trading signals platform for GCC traders with 87% accuracy rate" />
        <meta name="Classification" content="Finance, Trading, Investment" />
        <meta name="designer" content="GCC Signal Pro" />
        <meta name="reply-to" content="support@gccsignalpro.com" />
        <meta name="owner" content="GCC Signal Pro" />
        <meta name="url" content="https://gccsignalpro.com" />
        <meta name="identifier-URL" content="https://gccsignalpro.com" />
        <meta name="category" content="Finance, Trading, Forex, Cryptocurrency" />
        <meta name="coverage" content="GCC Countries, Global" />

        {/* Arabic Meta Tags */}
        <meta name="description-ar" content="أفضل منصة إشارات التداول في دول الخليج | إشارات تداول فورية ودقيقة بالذكاء الاصطناعي | دقة 87% للفوركس والذهب والبيتكوين" />
        <meta name="keywords-ar" content="إشارات التداول الخليج، فوركس الإمارات، بيتكوين السعودية، تداول الذهب قطر، تداول اون لاين الخليج، استثمار الخليج" />

        {/* Economic Keywords for GCC */}
        <meta name="economic-keywords" content="AED USD, UAE dirham forex, Central Bank UAE rates, ADX DFM TASI, GCC economic indicators, inflation GCC, interest rates UAE Saudi, GDP GCC, GCC forex reserves, oil trading GCC, US GCC trade, China GCC trade, Europe GCC trade, GCC export import, oil exports GCC, petrochemical GCC economy, GCC stock markets, GCC bonds, GCC commodities, Dubai gold, GCC energy prices, GCC gas exports, GCC electricity, GCC taxation, GCC budgets, GCC economic growth, GCC inflation rate, GCC employment, GCC remittances, GCC exports, GCC imports, GCC trade surplus, GCC current account, GCC fiscal balance, GCC sovereign wealth" />

        {/* Local SEO */}
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="NUTS" content="AE" />
        <meta name="location" content="GCC Region" />

        {/* Financial Industry Keywords */}
        <meta name="industry-keywords" content="financial services GCC, investment advisory UAE, wealth management Dubai, portfolio management Qatar, asset management Kuwait, mutual funds GCC, pension funds GCC, insurance GCC, banking GCC, Islamic banking GCC, takaful GCC, sukuk GCC, GCC capital markets, GCC derivatives, GCC commodities exchange, GCC stock exchanges, GCC forex market, GCC money market, GCC bond market, halal trading GCC, sharia compliant trading, Islamic finance GCC" />

        {/* Trading Related Keywords */}
        <meta name="trading-keywords" content="day trading GCC, swing trading UAE, scalping Dubai, position trading Qatar, technical analysis GCC, fundamental analysis GCC, chart patterns GCC, candlestick patterns GCC, support resistance GCC, moving averages GCC, RSI GCC, MACD GCC, Bollinger bands GCC, Fibonacci GCC, Elliott wave GCC, trading strategies GCC, risk management GCC, money management GCC, trading psychology GCC, trading education GCC, trading course GCC, trading mentor GCC, trading signals telegram GCC, trading signals whatsapp GCC" />

        {/* Competitor Keywords */}
        <meta name="competitor-keywords" content="best trading signals GCC, top forex signals UAE, accurate trading signals Dubai, profitable signals Qatar, free trading signals GCC, premium trading signals GCC, VIP trading signals GCC, professional trading signals GCC, expert trading signals GCC, reliable trading signals GCC, trusted trading signals GCC, verified trading signals GCC, live trading signals GCC, real time signals GCC, instant trading signals GCC, automated trading signals GCC, copy trading GCC, social trading GCC, mirror trading GCC, signal providers GCC, trading mentors GCC, trading gurus GCC, trading experts GCC, market analysts GCC" />
      </head>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "GCC Signal Pro",
              "description": "GCC premier trading signals platform offering AI-powered forex, gold, and cryptocurrency signals with 87% accuracy rate",
              "url": "https://gccsignalpro.com",
              "logo": "https://gccsignalpro.com/logo.png",
              "image": "https://gccsignalpro.com/og-image.jpg",
              "telephone": "+971-4-0000000",
              "email": "support@gccsignalpro.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dubai International Financial Centre",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.2048",
                "longitude": "55.2708"
              },
              "areaServed": {
                "@type": "Country",
                "name": "GCC Countries"
              },
              "serviceType": "Trading Signals",
              "provider": {
                "@type": "Organization",
                "name": "GCC Signal Pro",
                "url": "https://gccsignalpro.com"
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
                "reviewBody": "Best trading signals platform in the GCC region. Very accurate and profitable signals."
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5"
              },
              "sameAs": [
                "https://www.facebook.com/gccsignalpro",
                "https://www.twitter.com/gccsignalpro",
                "https://www.instagram.com/gccsignalpro",
                "https://www.youtube.com/gccsignalpro",
                "https://www.linkedin.com/company/gccsignalpro",
                "https://t.me/gccsignalpro"
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

        {/* Facebook Pixel - Disabled (configure NEXT_PUBLIC_META_PIXEL_ID to enable) */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
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
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}