import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AffiliateProvider } from '@/components/providers/AffiliateProvider';

export const metadata: Metadata = {
  title: "FinSignals - Professional Trading Signals & Market Analysis",
  description: "Get daily trading signals with professional market analysis. Expert insights for Forex, Crypto, Commodities and more.",
  keywords: "trading signals, forex signals, crypto signals, market analysis, Pakistan trading",
  authors: [{ name: "FinSignals Team" }],
  robots: "index, follow",
  openGraph: {
    title: "FinSignals - Professional Trading Signals",
    description: "Daily trading signals with expert market analysis",
    type: "website",
    locale: "en_US",
    alternateLocale: "ur_PK",
  },
  alternates: {
    canonical: "https://finsignals.com",
    languages: {
      'en': '/en',
      'ur': '/ur',
      'ur-PK': '/ur',
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRTL = locale === 'ur';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {locale === 'ur' && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        )}
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="ur-PK" href="/ur" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body className={`${isRTL ? 'font-urdu' : ''} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <AffiliateProvider>
            <Header locale={locale} />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
          </AffiliateProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}