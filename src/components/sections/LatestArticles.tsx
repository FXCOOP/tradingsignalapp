'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { formatDate, formatDateUrdu } from '@/lib/utils';
import { Calendar, User, TrendingUp, Archive } from 'lucide-react';

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

interface LatestArticlesProps {
  articles: Article[];
  locale: string;
}

export default function LatestArticles({ articles, locale }: LatestArticlesProps) {
  const isRTL = locale === 'ur';

  // Filter articles by current locale
  const filteredArticles = articles.filter(article => article.lang === locale.toUpperCase());

  if (filteredArticles.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {locale === 'ur' ? 'تازہ ترین مضامین' : 'Latest Articles'}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ur'
                ? 'مارکیٹ کے تجزیے اور ٹریڈنگ کی تجاویز'
                : 'Market analysis and trading insights'
              }
            </p>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {locale === 'ur' ? 'ابھی کوئی مضمون دستیاب نہیں' : 'No articles available yet'}
            </h3>
            <p className="text-gray-500">
              {locale === 'ur'
                ? 'جلد ہی نئے مضامین شائع کیے جائیں گے۔'
                : 'New articles will be published soon.'
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {locale === 'ur' ? 'تازہ ترین مضامین' : 'Latest Articles'}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {locale === 'ur'
              ? 'مارکیٹ کے تجزیے اور ٹریڈنگ کی تجاویز'
              : 'Market analysis and trading insights'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {article.publishedAt
                        ? (isRTL ? formatDateUrdu(article.publishedAt) : formatDate(article.publishedAt))
                        : ''
                      }
                    </span>
                  </div>

                  {article.author.name && (
                    <>
                      <span className="text-gray-600">•</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{article.author.name}</span>
                      </div>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-primary-300 transition-colors">
                  <Link href={`/${locale}/article/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {/* Signals Summary */}
                {article.signals.length > 0 && (
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">
                        {article.signals.length} {locale === 'ur' ? 'سگنلز' : 'signals'}
                      </span>
                    </div>

                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {article.signals.slice(0, 3).map((signal, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                        >
                          {signal.instrument}
                        </span>
                      ))}
                      {article.signals.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{article.signals.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Link
                  href={`/${locale}/article/${article.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  {locale === 'ur' ? 'مکمل پڑھیں' : 'Read More'}
                  <svg
                    className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View Archive Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/archive`}
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-200"
          >
            <Archive className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            {locale === 'ur' ? 'آرکائیو دیکھیں' : 'View Archive'}
          </Link>
        </div>
      </div>
    </section>
  );
}