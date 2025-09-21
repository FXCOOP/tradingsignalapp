'use client';

import { useAffiliate } from '@/components/providers/AffiliateProvider';

interface AffiliateBannerProps {
  slot: string;
  className?: string;
}

export default function AffiliateBanner({ slot, className = '' }: AffiliateBannerProps) {
  const { banners } = useAffiliate();

  const banner = banners.find(b => b.slot === slot);

  if (!banner) {
    return null;
  }

  return (
    <div
      className={`affiliate-banner ${className}`}
      dangerouslySetInnerHTML={{ __html: banner.html }}
    />
  );
}