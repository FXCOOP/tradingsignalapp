'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-xl font-bold text-white">FinSignals</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {locale === 'ur'
                ? 'پیشہ ور ٹریڈنگ سگنلز اور مارکیٹ تجزیہ۔ فوریکس، کرپٹو، کموڈٹیز اور مزید کے لیے ماہرانہ بصیرت۔'
                : 'Professional trading signals and market analysis. Expert insights for Forex, Crypto, Commodities and more.'
              }
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">
                <strong className="text-warning-500">
                  {locale === 'ur' ? 'خطرے کی تنبیہ:' : 'Risk Warning:'}
                </strong>
              </p>
              <p>
                {locale === 'ur'
                  ? 'ٹریڈنگ میں خاطر خواہ خطرہ شامل ہے اور اس کے نتیجے میں آپ کی سرمایہ کاری کا نقصان ہو سکتا ہے۔ آپ کو اس سے زیادہ سرمایہ کاری نہیں کرنی چاہیے جس کا نقصان آپ برداشت کر سکیں۔'
                  : 'Trading involves significant risk and may result in the loss of your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.'
                }
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {locale === 'ur' ? 'نیویگیشن' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'ہوم' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/signals`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'سگنلز' : 'Signals'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/archive`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'آرکائیو' : 'Archive'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'تعارف' : 'About'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {locale === 'ur' ? 'قانونی' : 'Legal'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'شرائط و ضوابط' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/disclaimer`} className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'ur' ? 'دستبرداری' : 'Disclaimer'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} FinSignals. {locale === 'ur' ? 'تمام حقوق محفوظ ہیں۔' : 'All rights reserved.'}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {locale === 'ur'
              ? 'یہ سائٹ Exness کے ساتھ affiliate links استعمال کرتی ہے۔'
              : 'This site uses affiliate links with Exness.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
}