import { findSignalBySlug } from '@/lib/signals';
import Link from 'next/link';
import fs from 'node:fs/promises';
import path from 'node:path';

export default async function SignalPage({ params: { slug, locale } }:{ params: { slug: string, locale:'en'|'ur' } }){
  const s = await findSignalBySlug(slug);
  if (!s) return <div className="card p-6">Not found</div>;

  const fullPath = path.join(process.cwd(), 'public', s.htmlPath);
  const exists = await fs.access(fullPath).then(()=>true).catch(()=>false);

  return (
    <div className="card overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-gray-50">
        <div>
          <h1 className="font-bold">{s.instrument} — {s.direction}</h1>
          <p className="text-xs text-gray-600">{new Date(s.date).toLocaleString()}</p>
        </div>
        <Link className="btn-primary" href={`/${locale}/subscribe`}>Subscribe</Link>
      </div>
      {exists ? (
        <iframe src={`/${s.htmlPath}`} className="w-full h-[75vh]" title={s.slug} />
      ) : (
        <div className="p-6">HTML file missing. Ask admin to regenerate.</div>
      )}
    </div>
  );
}