import './globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LocaleLayout({ children, params: { locale } } : { children: ReactNode; params: { locale: 'en'|'ur' }}){
  const messages = useMessages();
  return (
    <html lang={locale} dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="container py-8">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}