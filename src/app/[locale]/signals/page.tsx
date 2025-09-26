import { listSignals } from '../../../lib/signals';
import Link from 'next/link';

export default async function Signals({ params: { locale } }:{ params: { locale:'en'|'ur' } }){
  const signals = await listSignals(1, 24);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Signals</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {signals.map(s => (
          <div key={s.id} className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{s.instrument} — {s.direction}</h3>
              <span className="badge">{new Date(s.date).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{s.sentiment}</p>
            <div className="mt-3 flex gap-3">
              <Link className="btn-ghost" href={`/${locale}/signal/${s.slug}`}>Open</Link>
              <Link className="btn-primary" href={`/${locale}/subscribe`}>Subscribe</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}