import Link from 'next/link';
export default function LockBlur({ children }:{ children: React.ReactNode }){
  return (
    <div className="relative">
      <div className="blur-sm select-none pointer-events-none" aria-hidden>{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href="/en/subscribe" className="btn-primary">Subscribe to unlock</Link>
      </div>
    </div>
  );
}