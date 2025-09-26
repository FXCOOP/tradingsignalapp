import { getLatestSignals } from '@/lib/signals';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import LockBlur from '@/components/LockBlur';
import AffiliateRibbon from '@/components/AffiliateRibbon';

export default async function Home({ params: { locale } }:{ params: { locale:'en'|'ur' }}){
  const t = await getTranslations('home');
  const signals = await getLatestSignals(4);
  const isUrdu = locale === 'ur';

  return (
    <div className={`space-y-12 ${isUrdu ? 'rtl' : 'ltr'}`}>
      {/* Affiliate Ribbon */}
      <AffiliateRibbon />

      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/signals`} className="btn-primary text-lg px-8 py-3">
            ⚡ {t('viewSignals')}
          </Link>
          <Link href={`/${locale}/subscribe`} className="btn-ghost text-lg px-8 py-3">
            📩 {t('subscribe')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold">{t('features.daily')}</h3>
            <p className="text-gray-600">{t('features.dailyDesc')}</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold">{t('features.bilingual')}</h3>
            <p className="text-gray-600">{t('features.bilingualDesc')}</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold">{t('features.analysis')}</h3>
            <p className="text-gray-600">{t('features.analysisDesc')}</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold">{t('features.realtime')}</h3>
            <p className="text-gray-600">{t('features.realtimeDesc')}</p>
          </div>
        </div>
      </section>

      {/* Latest Signals */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('signals.latest')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {signals.map(s => (
            <article key={s.id} className="card p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">{s.instrument}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    s.direction === 'BUY'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {s.direction}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(s.date).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-US')}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <strong>{t('signals.timeframe')}:</strong> {s.timeframe} |
                <strong> {t('signals.confidence')}:</strong> {s.confidence}%
              </div>

              <p className="text-sm text-gray-600 italic">
                {locale === 'ur' ? s.rationale_ur : s.rationale_en}
              </p>

              <LockBlur>
                <div className="grid grid-cols-3 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{t('signals.entry')}</div>
                    <div className="text-lg font-bold text-blue-600">{s.entry}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{t('signals.stopLoss')}</div>
                    <div className="text-lg font-bold text-red-600">{s.stopLoss}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{t('signals.takeProfit')}</div>
                    <div className="text-sm font-bold text-green-600">
                      {JSON.parse(s.takeProfits).slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
              </LockBlur>

              <div className="flex gap-3 pt-4">
                <Link className="btn-ghost flex-1 text-center" href={`/${locale}/signals/${s.slug}`}>
                  {t('signals.open')}
                </Link>
                <Link className="btn-primary flex-1 text-center" href={`/${locale}/subscribe`}>
                  {t('signals.subscribe')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{t('cta.title')}</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link
            href={`/${locale}/subscribe`}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            {t('cta.getStarted')}
          </Link>
        </div>
      </section>
    </div>
  );
}