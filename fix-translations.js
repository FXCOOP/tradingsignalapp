const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the local translations object with import usage
const oldTranslations = `  // Language translations
  const translations = {
    en: {
      title: 'TradeFlow',
      subtitle: 'Cloud Trading Education & Real-Time Market Insights',
      liveSignals: 'Live Trading Signals',
      marketAnalysis: 'Market Analysis',
      worldwideMarkets: 'Worldwide Markets',
      news: 'Financial News',
      education: 'Trading Education'
    },
    ar: {
      title: 'دول الخليج سيجنال برو',
      subtitle: 'إشارات التداول المباشرة وتحليل السوق',
      liveSignals: 'إشارات التداول المباشرة',
      marketAnalysis: 'تحليل السوق',
      worldwideMarkets: 'الأسواق العالمية',
      news: 'الأخبار المالية',
      education: 'تعليم التداول'
    }
  }

  const t = translations[language as keyof typeof translations]`;

const newTranslations = `  // Use comprehensive translations from lib
  const t = translations[language]

  // Apply RTL for Arabic
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
  }, [language])`;

content = content.replace(oldTranslations, newTranslations);

// 2. Update the import to directly use translations instead of useTranslation hook
content = content.replace(
  `import { useTranslation } from '@/lib/translations'`,
  `import { translations } from '@/lib/translations'`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed page.tsx to use comprehensive translations');
console.log('📝 Added RTL support for Arabic');
console.log('🔄 Now page uses translations from lib/translations.ts');
