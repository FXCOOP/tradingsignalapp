import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import FeaturedSignals from '@/components/sections/FeaturedSignals';
import LatestArticles from '@/components/sections/LatestArticles';
import AffiliateBanner from '@/components/affiliate/AffiliateBanner';
import { prisma } from '@/lib/db';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      locale: locale === 'ur' ? 'ur_PK' : 'en_US',
    },
    alternates: {
      languages: {
        'en': '/en',
        'ur': '/ur',
      },
    },
  };
}

async function getLatestSignals() {
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
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 6,
    });

    return articles;
  } catch (error) {
    console.error('Error fetching latest signals:', error);
    return [];
  }
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const latestArticles = await getLatestSignals();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero locale={locale} />

      {/* Affiliate Banner - Top */}
      <section className="container mx-auto px-4 py-8">
        <AffiliateBanner slot="home_top" />
      </section>

      {/* Featured Signals */}
      <FeaturedSignals articles={latestArticles} locale={locale} />

      {/* Latest Articles */}
      <LatestArticles articles={latestArticles} locale={locale} />

      {/* Affiliate Banner - Bottom */}
      <section className="container mx-auto px-4 py-8">
        <AffiliateBanner slot="article_bottom" />
      </section>
    </div>
  );
}