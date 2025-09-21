'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { getAffiliateConfig } from '@/lib/utils';

interface AffiliateLink {
  label: string;
  url: string;
  rel: string;
}

interface AffiliateBanner {
  slot: string;
  html: string;
}

interface AffiliateConfig {
  default: AffiliateLink[];
  banners: AffiliateBanner[];
}

const AffiliateContext = createContext<AffiliateConfig>({
  default: [],
  banners: []
});

interface AffiliateProviderProps {
  children: ReactNode;
}

export function AffiliateProvider({ children }: AffiliateProviderProps) {
  const config = getAffiliateConfig();

  return (
    <AffiliateContext.Provider value={config}>
      {children}
    </AffiliateContext.Provider>
  );
}

export function useAffiliate() {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
}