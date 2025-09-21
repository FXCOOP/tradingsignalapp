import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { formatDate, formatDateUrdu } from '@/lib/utils';
import SignalCard from '@/components/signals/SignalCard';
import AffiliateBanner from '@/components/affiliate/AffiliateBanner';
import AffiliateLink from '@/components/affiliate/AffiliateLink';
import { Calendar, User, ExternalLink, AlertTriangle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getArticle(slug: string, locale: string) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        lang: locale.toUpperCase(),
        status: 'PUBLISHED',
      },
      include: {
        signals: true,
        sources: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const baseUrl = 'https://finsignals.com';

  return {
    title: article.title,
    description: article.excerpt,
    keywords: `trading signals, ${article.signals.map(s => s.instrument).join(', ')}, market analysis, ${locale === 'ur' ? 'اردو' : 'english'}`,
    authors: [{ name: article.author.name || 'FinSignals Team' }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      locale: locale === 'ur' ? 'ur_PK' : 'en_US',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      url: `${baseUrl}/${locale}/article/${slug}`,
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(article.title)}&locale=${locale}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/article/${slug}`,
      languages: {
        'en': `${baseUrl}/en/article/${slug}`,
        'ur': `${baseUrl}/ur/article/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);
  const t = await getTranslations({ locale });

  if (!article) {
    notFound();
  }

  const isRTL = locale === 'ur';

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: `https://finsignals.com/api/og?title=${encodeURIComponent(article.title)}&locale=${locale}`,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name || 'FinSignals Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FinSignals',
      logo: {
        '@type': 'ImageObject',
        url: 'https://finsignals.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://finsignals.com/${locale}/article/${slug}`,
    },
    keywords: article.signals.map(s => s.instrument).join(', '),
    inLanguage: locale === 'ur' ? 'ur-PK' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
              </>
            )}

            <span className="text-gray-600">•</span>
            <span>{article.signals.length} {locale === 'ur' ? 'سگنلز' : 'signals'}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Affiliate Banner - Top */}
        <div className="mb-8">
          <AffiliateBanner slot="article_mid" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Trading Signals */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                {locale === 'ur' ? 'آج کے ٹریڈنگ سگنلز' : "Today's Trading Signals"}
              </h2>

              <div className="space-y-6">
                {article.signals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} locale={locale} />
                ))}
              </div>
            </section>

            {/* Article Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                {locale === 'ur' ? 'مارکیٹ تجزیہ' : 'Market Analysis'}
              </h2>

              <div
                className="article-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </section>

            {/* Sources */}
            {article.sources.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {locale === 'ur' ? 'ذرائع' : 'Sources'}
                </h3>

                <div className="space-y-3">
                  {article.sources.map((source, index) => (
                    <div key={source.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-gray-400 text-sm">{index + 1}.</span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
                      >
                        {source.title}
                        <ExternalLink className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Disclaimer */}
            <section className="mb-8">
              <div className="bg-warning-500/10 border border-warning-500/30 rounded-lg p-6">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <AlertTriangle className="w-6 h-6 text-warning-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-warning-500 mb-2">
                      {locale === 'ur' ? 'خطرے کی تنبیہ' : 'Risk Warning'}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {locale === 'ur'
                        ? 'ٹریڈنگ میں خاطر خواہ خطرہ شامل ہے اور اس کے نتیجے میں آپ کی سرمایہ کاری کا نقصان ہو سکتا ہے۔ آپ کو اس سے زیادہ سرمایہ کاری نہیں کرنی چاہیے جس کا نقصان آپ برداشت کر سکیں اور اس بات کو یقینی بنانا چاہیے کہ آپ اس میں شامل خطرات کو مکمل طور پر سمجھتے ہیں۔'
                        : 'Trading involves significant risk and may result in the loss of your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">
                  {locale === 'ur' ? 'Exness کے ساتھ ٹریڈنگ شروع کریں' : 'Start Trading with Exness'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {locale === 'ur'
                    ? 'دنیا بھر میں 625,000 سے زیادہ ٹریڈرز کا بھروسہ'
                    : 'Trusted by over 625,000 traders worldwide'
                  }
                </p>
                <AffiliateLink variant="primary" className="w-full justify-center">
                  {locale === 'ur' ? 'اکاؤنٹ کھولیں' : 'Open Account'}
                </AffiliateLink>
              </div>

              {/* Sidebar Banners */}
              <AffiliateBanner slot="sidebar_1" />
              <AffiliateBanner slot="sidebar_2" />
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12">
          <AffiliateBanner slot="article_bottom" />
        </div>
      </article>
    </>
  );
}