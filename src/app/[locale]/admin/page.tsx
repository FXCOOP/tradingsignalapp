'use client';
import { useState } from 'react';

export default function Admin(){
  const [out, setOut] = useState('');
  async function run(){
    const res = await fetch('/api/ai/run', { method: 'POST' });
    const j = await res.json();
    setOut(JSON.stringify(j, null, 2));
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <button onClick={run} className="btn-primary">Run Daily Job</button>
      <pre className="card p-3 text-xs overflow-auto">{out}</pre>
    </div>
  );
}