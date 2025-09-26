import { listAllSignals } from '../lib/signals';

export default async function sitemap(){
  const base = process.env.APP_BASE_URL || 'http://localhost:3000';

  try {
    const signals = await listAllSignals();
    return [
      { url: `${base}/en`, changefreq: 'hourly' },
      { url: `${base}/ur`, changefreq: 'hourly' },
      ...signals.map(s => ({ url: `${base}/${s.htmlPath}`, changefreq: 'daily' }))
    ];
  } catch (error) {
    // Return basic sitemap if database is not available during build
    return [
      { url: `${base}/en`, changefreq: 'hourly' },
      { url: `${base}/ur`, changefreq: 'hourly' },
    ];
  }
}