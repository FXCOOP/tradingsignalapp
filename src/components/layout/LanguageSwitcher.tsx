'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 rtl:left-0 rtl:right-auto mt-2 w-24 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full px-4 py-2 text-left rtl:text-right text-sm hover:bg-gray-700 transition-colors ${
              currentLocale === 'en' ? 'text-blue-400 font-medium' : 'text-gray-300'
            }`}
          >
            English
          </button>
          <button
            onClick={() => switchLanguage('ur')}
            className={`w-full px-4 py-2 text-left rtl:text-right text-sm hover:bg-gray-700 transition-colors ${
              currentLocale === 'ur' ? 'text-blue-400 font-medium' : 'text-gray-300'
            }`}
          >
            اردو
          </button>
        </div>
      </div>
    </div>
  );
}