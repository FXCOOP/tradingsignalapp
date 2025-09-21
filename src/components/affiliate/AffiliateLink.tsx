'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAffiliate } from '@/components/providers/AffiliateProvider';
import { ExternalLink } from 'lucide-react';

interface AffiliateLinkProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function AffiliateLink({
  className = '',
  children,
  variant = 'primary'
}: AffiliateLinkProps) {
  const t = useTranslations();
  const { default: affiliateLinks } = useAffiliate();

  const primaryLink = affiliateLinks[0];

  if (!primaryLink) {
    return null;
  }

  const baseClasses = variant === 'primary'
    ? 'inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
    : 'inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-200';

  return (
    <Link
      href={primaryLink.url}
      target="_blank"
      rel={primaryLink.rel}
      className={`${baseClasses} ${className}`}
    >
      {children || (
        <>
          <span>{primaryLink.label}</span>
          <ExternalLink className="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4" />
        </>
      )}
    </Link>
  );
}