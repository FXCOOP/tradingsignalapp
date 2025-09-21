'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { formatDate, formatDateUrdu } from '@/lib/utils';
import SignalCard from '@/components/signals/SignalCard';
import { TrendingUp, Calendar, Target } from 'lucide-react';

interface Signal {
  id: string;
  instrument: string;
  class: string;
  bias: string;
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2?: number;
  timeframe: string;
  confidence: number;
}

interface Article {
  id: string;
  slug: string;
  lang: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
  signals: Signal[];
  author: {
    name: string | null;
  };
}

interface FeaturedSignalsProps {
  articles: Article[];
  locale: string;
}

export default function FeaturedSignals({ articles, locale }: FeaturedSignalsProps) {
  const t = useTranslations('signals');
  const isRTL = locale === 'ur';

  // Filter articles by current locale and get the latest ones
  const filteredArticles = articles.filter(article => article.lang === locale.toUpperCase());
  const latestArticles = filteredArticles.slice(0, 3);

  if (latestArticles.length === 0) {
    return (
      <section id="signals" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {locale === 'ur' ? 'ابھی کوئی سگنل دستیاب نہیں' : 'No signals available yet'}
            </h3>
            <p className="text-gray-500">
              {locale === 'ur'
                ? 'جلد ہی نئے سگنلز شائع کیے جائیں گے۔'
                : 'New signals will be published soon.'
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signals" className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <div key={article.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
              {/* Article Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {article.publishedAt
                        ? (isRTL ? formatDateUrdu(article.publishedAt) : formatDate(article.publishedAt))
                        : ''
                      }
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs font-medium rounded">
                    {article.signals.length} {locale === 'ur' ? 'سگنلز' : 'signals'}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Signals */}
              <div className="p-6 space-y-4">
                {article.signals.slice(0, 2).map((signal) => (
                  <SignalCard key={signal.id} signal={signal} locale={locale} compact />
                ))}

                {article.signals.length > 2 && (
                  <div className="text-center text-sm text-gray-400">
                    +{article.signals.length - 2} {locale === 'ur' ? 'مزید سگنلز' : 'more signals'}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <Link
                  href={`/${locale}/article/${article.slug}`}
                  className="block w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white font-medium py-3 px-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
                >
                  {locale === 'ur' ? 'مکمل تجزیہ پڑھیں' : 'Read Full Analysis'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/signals`}
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-200"
          >
            <Target className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            {locale === 'ur' ? 'تمام سگنلز دیکھیں' : 'View All Signals'}
          </Link>
        </div>
      </div>
    </section>
  );
}