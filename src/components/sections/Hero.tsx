'use client';

import { useTranslations } from 'next-intl';
import AffiliateLink from '@/components/affiliate/AffiliateLink';
import { TrendingUp, BarChart3, Shield } from 'lucide-react';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations();
  const isRTL = locale === 'ur';

  return (
    <section className="relative gradient-bg border-b border-gray-800">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 text-accent-300 text-sm font-medium rounded-full">
                {locale === 'ur' ? 'PRD' : 'PRD'}
              </span>
              <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium rounded-full">
                EN/UR
              </span>
              <span className="px-3 py-1 bg-success-500/20 border border-success-500/30 text-success-300 text-sm font-medium rounded-full">
                {locale === 'ur' ? 'پاکستان' : 'Pakistan First SEO'}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {locale === 'ur' ? 'FinSignals' : 'FinSignals'}
              </span>
              <br />
              <span className="text-2xl lg:text-3xl text-gray-300 font-normal">
                {locale === 'ur'
                  ? 'پیشہ ور ٹریڈنگ سگنلز اور مارکیٹ تجزیہ'
                  : 'Professional Trading Signals & Market Analysis'
                }
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              {locale === 'ur'
                ? 'روزانہ 3-4 سگنلز، HTML کتبات کے ساتھ آرکائیو، اور Exness affiliate کے ذریعے آمدنی۔ پاکستان کے لیے SEO اور EN/UR میں دستیاب۔'
                : 'Daily 3-4 signals with HTML articles archive, and income through Exness affiliate. SEO optimized for Pakistan with EN/UR bilingual support.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <AffiliateLink variant="primary">
                {locale === 'ur' ? 'Exness — رجسٹر کریں' : 'Exness — Sign Up'}
              </AffiliateLink>
              <a
                href="#signals"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                {locale === 'ur' ? 'آج کے سگنلز' : "Today's Signals"}
              </a>
            </div>
          </div>

          {/* Features */}
          <div className={`${isRTL ? 'lg:order-1' : ''}`}>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {locale === 'ur' ? 'روزانہ سگنلز' : 'Daily Signals'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {locale === 'ur'
                      ? '3-4 پیشہ ور سگنلز یومیہ بنیادوں پر'
                      : '3-4 professional signals daily'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {locale === 'ur' ? 'مارکیٹ تجزیہ' : 'Market Analysis'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {locale === 'ur'
                      ? 'تفصیلی تکنیکی اور بنیادی تجزیہ'
                      : 'Detailed technical & fundamental analysis'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="w-12 h-12 bg-success-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {locale === 'ur' ? 'Exness پارٹنر' : 'Exness Partner'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {locale === 'ur'
                      ? 'قابل اعتماد بروکر کے ساتھ آمدنی'
                      : 'Trusted broker affiliate program'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">90%</div>
            <div className="text-sm text-gray-400">
              {locale === 'ur' ? 'انڈیکسیشن (T+30)' : 'Indexation (T+30)'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-gray-400">
              {locale === 'ur' ? 'یومیہ صارفین (T+60)' : 'Daily Users (T+60)'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">$830</div>
            <div className="text-sm text-gray-400">
              {locale === 'ur' ? 'زیادہ سے زیادہ کمیشن' : 'Max Commission'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">3-4</div>
            <div className="text-sm text-gray-400">
              {locale === 'ur' ? 'یومیہ سگنلز' : 'Daily Signals'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}