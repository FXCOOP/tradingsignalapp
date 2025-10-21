export const metadata = {
  title: 'TradeFlow - Cloud Trading Education Platform | Forex Gold BTC Signals | Real-Time Market Insights',
  description: 'TradeFlow: Cloud-based trading education platform | Learn Forex, Gold, Bitcoin & Stock strategies | AI-powered real-time market insights | Live signals & analysis | Educational purposes only | Global trading education',
  keywords: 'TradeFlow, cloud trading, trading education, forex signals, market insights, trading platform, cryptocurrency learning, real-time analysis, trading signals, market education',
  authors: [{ name: 'TradeFlow' }],
  creator: 'TradeFlow',
  publisher: 'TradeFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tradeflow.cloud'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-AE': '/ar-AE',
    },
  },
  openGraph: {
    title: 'TradeFlow - Cloud Trading Education Platform',
    description: 'Join thousands of traders learning with our AI-powered market insights. Live Forex, Gold, Bitcoin education. Real-time cloud-based signals. For educational purposes only.',
    url: 'https://tradeflow.cloud',
    siteName: 'TradeFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TradeFlow - Cloud Trading Education Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradeFlow - Cloud Trading Education',
    description: 'AI-powered cloud-based trading education. Learn Forex, Gold, Bitcoin strategies. Real-time market insights. For educational purposes only.',
    images: ['/twitter-image.jpg'],
    creator: '@tradeflow',
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
        <meta name="abstract" content="GCC premier trading education platform offering AI-powered forex, gold, and cryptocurrency market insights for learning purposes" />
        <meta name="topic" content="Trading Education GCC" />
        <meta name="summary" content="Professional trading education platform for GCC traders to learn market strategies" />
        <meta name="Classification" content="Finance, Trading, Investment" />
        <meta name="designer" content="GCC Signal Pro" />
        <meta name="reply-to" content="support@gccsignalpro.com" />
        <meta name="owner" content="GCC Signal Pro" />
        <meta name="url" content="https://gccsignalpro.com" />
        <meta name="identifier-URL" content="https://gccsignalpro.com" />
        <meta name="category" content="Finance, Trading, Forex, Cryptocurrency" />
        <meta name="coverage" content="GCC Countries, Global" />

        {/* Arabic Meta Tags */}
        <meta name="description-ar" content="منصة تعليمية لتداول في دول الخليج | تعلم استراتيجيات الفوركس والذهب والبيتكوين بالذكاء الاصطناعي | لأغراض تعليمية فقط" />
        <meta name="keywords-ar" content="تعليم التداول الخليج، تعلم فوركس الإمارات، دورات التداول، استراتيجيات السوق قطر، تداول إسلامي الخليج" />

        {/* Local SEO */}
        <meta name="geo.position" content="24.4539;54.3773" />
        <meta name="NUTS" content="AE" />
        <meta name="location" content="GCC Region" />
      </head>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "TradeFlow",
              "description": "TradeFlow: Cloud-based trading education platform offering AI-powered real-time market insights for forex, gold, cryptocurrency, and stock learning. For educational purposes only.",
              "disclaimer": "Trading involves substantial risk of loss. Content provided is for educational purposes only and should not be considered financial advice. Past performance is not indicative of future results.",
              "url": "https://tradeflow.cloud",
              "logo": "https://tradeflow.cloud/logo.png",
              "image": "https://tradeflow.cloud/og-image.jpg",
              "email": "support@tradeflow.cloud",
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
                "@type": "Place",
                "name": "Worldwide"
              },
              "serviceType": "Cloud-Based Trading Education",
              "provider": {
                "@type": "Organization",
                "name": "TradeFlow",
                "url": "https://tradeflow.cloud"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Trading Education - Basic",
                  "description": "Educational market insights for learning purposes",
                  "price": "0",
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
                "reviewBody": "Excellent cloud-based trading education platform. Very helpful for learning market strategies and real-time signals. Results may vary."
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5"
              },
              "sameAs": [
                "https://www.facebook.com/tradeflow",
                "https://www.twitter.com/tradeflow",
                "https://www.instagram.com/tradeflow",
                "https://www.youtube.com/tradeflow",
                "https://www.linkedin.com/company/tradeflow",
                "https://t.me/tradeflow"
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