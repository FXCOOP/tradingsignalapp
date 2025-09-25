import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://finsignals.com';

  try {
    // Get all published articles
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          not: null,
        },
      },
      select: {
        slug: true,
        language: true,
        updatedAt: true,
      },
    });

    // Static pages
    const staticPages = [
      {
        url: `${baseUrl}/en`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/ur`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/en/signals`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/ur/signals`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/en/archive`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/ur/archive`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ];

    // Article pages
    const articlePages = articles.map((article) => ({
      url: `${baseUrl}/${article.language.toLowerCase()}/article/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...articlePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if database query fails
    return [
      {
        url: `${baseUrl}/en`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/ur`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ];
  }
}