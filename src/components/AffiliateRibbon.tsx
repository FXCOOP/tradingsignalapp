export default function AffiliateRibbon(){
  const base = process.env.EXNESS_AFFILIATE_URL || '#';
  return (
    <a href={base + '?utm_source=pksignal&utm_medium=site&utm_campaign=top_ribbon'} rel="nofollow noopener" target="_blank"
       className="block rounded-2xl bg-gradient-to-r from-accent to-sky-400 text-white text-center py-3 shadow-smooth">
      🚀 Start trading with Exness — competitive spreads & fast execution
    </a>
  );
}