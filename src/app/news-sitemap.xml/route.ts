import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const baseUrl = 'https://finsignals.com';

    // Get articles published in the last 48 hours
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentArticles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          gte: twoDaysAgo,
          not: null,
        },
      },
      select: {
        slug: true,
        lang: true,
        title: true,
        publishedAt: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    const newsItems = recentArticles.map((article) => {
      const lang = article.lang.toLowerCase();
      const pubDate = article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString();

      return `
    <url>
      <loc>${baseUrl}/${lang}/article/${article.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>FinSignals</news:name>
          <news:language>${lang === 'ur' ? 'ur' : 'en'}</news:language>
        </news:publication>
        <news:publication_date>${pubDate}</news:publication_date>
        <news:title><![CDATA[${article.title}]]></news:title>
        <news:keywords>trading signals, forex, ${lang === 'ur' ? 'pakistan, اردو' : 'pakistan, urdu'}</news:keywords>
      </news:news>
    </url>`;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsItems}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}