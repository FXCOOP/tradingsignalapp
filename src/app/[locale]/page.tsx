import { Metadata } from 'next';
import { prisma } from '@/lib/db';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const isUrdu = locale === 'ur';

  return {
    title: isUrdu ? 'FinSignals - پیشہ ور ٹریڈنگ سگنلز' : 'FinSignals - Professional Trading Signals',
    description: isUrdu
      ? 'روزانہ ٹریڈنگ سگنلز کے ساتھ پیشہ ورانہ مارکیٹ تجزیہ'
      : 'Daily trading signals with professional market analysis',
  };
}

async function getLatestArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          not: null,
        },
      },
      include: {
        signals: true,
        sources: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 6,
    });

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return sample data if database is not available
    return [];
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const articles = await getLatestArticles();
  const isUrdu = locale === 'ur';

  return (
    <div className={`min-h-screen ${isUrdu ? 'rtl font-urdu' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="gradient-bg border-b border-gray-800">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                FinSignals
              </span>
              <br />
              <span className="text-2xl lg:text-3xl text-gray-300 font-normal">
                {isUrdu
                  ? 'پیشہ ور ٹریڈنگ سگنلز اور مارکیٹ تجزیہ'
                  : 'Professional Trading Signals & Market Analysis'
                }
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {isUrdu
                ? 'روزانہ 3-4 سگنلز، تفصیلی تجزیہ، اور Exness affiliate کے ذریعے آمدنی۔ پاکستان کے لیے SEO اور EN/UR میں دستیاب۔'
                : 'Daily 3-4 signals with detailed analysis, and income through Exness affiliate. SEO optimized for Pakistan with EN/UR bilingual support.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://one.exnessonelink.com/a/c_8f0nxidtbt"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                {isUrdu ? 'Exness — رجسٹر کریں' : 'Exness — Sign Up'}
              </a>
              <a
                href="#signals"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                {isUrdu ? 'آج کے سگنلز' : "Today's Signals"}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">90%</div>
              <div className="text-sm text-gray-400">
                {isUrdu ? 'انڈیکسیشن (T+30)' : 'Indexation (T+30)'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-400">
                {isUrdu ? 'یومیہ صارفین (T+60)' : 'Daily Users (T+60)'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$830</div>
              <div className="text-sm text-gray-400">
                {isUrdu ? 'زیادہ سے زیادہ کمیشن' : 'Max Commission'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3-4</div>
              <div className="text-sm text-gray-400">
                {isUrdu ? 'یومیہ سگنلز' : 'Daily Signals'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center">
          <a
            href="https://one.exnessonelink.com/a/c_8f0nxidtbt"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            <img
              src="https://d3dpet1g0ty5ed.cloudfront.net/UR_The_best_pricing_on_gold_1200x628_GOOGLE.png"
              alt="Exness Trading"
              className="mx-auto max-w-full h-auto rounded-lg"
              width={800}
              height={420}
            />
          </a>
        </div>
      </section>

      {/* Featured Signals */}
      <section id="signals" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUrdu ? 'تازہ ترین سگنلز' : 'Latest Trading Signals'}
            </h2>
            <p className="text-gray-400">
              {isUrdu
                ? 'پیشہ ور تجزیہ کے ساتھ روزانہ ٹریڈنگ سگنلز'
                : 'Daily trading signals with professional analysis'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    {isUrdu ? 'ڈیٹابیس سیٹ اپ کی ضرورت' : 'Database Setup Required'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {isUrdu
                      ? 'تجارتی سگنلز دکھانے کے لیے، براہ کرم پروڈکشن ڈیٹابیس کو سیٹ اپ کریں اور ڈیٹا سیڈ کریں۔'
                      : 'To display trading signals, please set up the production database and seed data.'
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    <p className="mb-2">1. Set up Vercel Postgres database</p>
                    <p className="mb-2">2. Run database migrations</p>
                    <p>3. Seed with sample data</p>
                  </div>
                </div>
              </div>
            ) : (
              articles.slice(0, 6).map((article) => (
              <div
                key={article.id}
                className="signal-card bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">
                    {isUrdu ? article.titleUrdu || article.title : article.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {article.language.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 text-sm">
                  {isUrdu ? article.excerptUrdu || article.excerpt : article.excerpt}
                </p>

                {article.signals.length > 0 && (
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      {isUrdu ? 'سگنلز:' : 'Signals:'}
                    </h4>
                    <div className="space-y-2">
                      {article.signals.slice(0, 2).map((signal) => (
                        <div key={signal.id} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-medium">
                              {signal.instrument}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                signal.bias === 'BULLISH'
                                  ? 'bg-green-600 text-white'
                                  : signal.bias === 'BEARISH'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-yellow-600 text-black'
                              }`}
                            >
                              {signal.bias}
                            </span>
                          </div>
                          <div className="text-gray-400 text-xs mt-1">
                            Entry: {signal.entry.toFixed(4)} | SL: {signal.stopLoss.toFixed(4)} | TP: {signal.takeProfit1.toFixed(4)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {new Date(article.publishedAt!).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US')}
                    </span>
                    <span>{article.signals.length} {isUrdu ? 'سگنلز' : 'signals'}</span>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Language Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href={isUrdu ? '/en' : '/ur'}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
        >
          {isUrdu ? '🇺🇸 English' : '🇵🇰 اردو'}
        </a>
      </div>
    </div>
  );
}