'use client';
import { useState } from 'react';

export default function Subscribe(){
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState<string|undefined>();
  const [err, setErr] = useState<string|undefined>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(undefined); setErr(undefined);
    const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })});
    const j = await res.json();
    if (res.ok) setOk(j.message); else setErr(j.error || 'Error');
  };

  return (
    <div className="max-w-md card p-6 mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Subscribe</h1>
      <p className="text-sm text-gray-600">Enter your email to receive a magic link and daily signals.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="w-full border rounded-xl p-3" />
        <button className="btn-primary w-full">Get Magic Link</button>
      </form>
      {ok && <p className="text-green-600">{ok}</p>}
      {err && <p className="text-red-600">{err}</p>}
    </div>
  );
}