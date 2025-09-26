'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(){
  const path = usePathname();
  const isUr = path?.startsWith('/ur');
  const toggle = isUr ? path.replace('/ur', '/en') : path?.replace('/en','/ur') || '/ur';
  return (
    <header className="header">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/en" className="text-xl font-black tracking-tight">PK Signal Pulse</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/en/signals" className="hover:opacity-80">Signals</Link>
          <Link href="/en/subscribe" className="btn-primary">Subscribe</Link>
          <Link href={toggle} className="hover:opacity-80">{isUr ? 'English' : 'اردو'}</Link>
        </nav>
      </div>
    </header>
  );
}