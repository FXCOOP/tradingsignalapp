// Automatic language detection for GCC countries
// Users from GCC countries see Arabic by default

// GCC country codes (Gulf Cooperation Council)
const GCC_COUNTRIES = [
  'AE', // United Arab Emirates
  'SA', // Saudi Arabia
  'KW', // Kuwait
  'QA', // Qatar
  'BH', // Bahrain
  'OM'  // Oman
]

// Additional Arabic-speaking countries (optional - uncomment if needed)
const ARABIC_COUNTRIES = [
  ...GCC_COUNTRIES,
  // 'EG', // Egypt
  // 'JO', // Jordan
  // 'LB', // Lebanon
  // 'IQ', // Iraq
  // 'SY', // Syria
  // 'YE', // Yemen
  // 'PS', // Palestine
  // 'MA', // Morocco
  // 'DZ', // Algeria
  // 'TN', // Tunisia
  // 'LY', // Libya
  // 'SD', // Sudan
]

/**
 * Detect user's country from various sources
 */
export async function detectUserCountry(): Promise<string | null> {
  try {
    // Method 1: Try Cloudflare headers (if using Cloudflare)
    if (typeof window !== 'undefined') {
      const cfCountry = (window as any).__CF_COUNTRY__
      if (cfCountry) return cfCountry
    }

    // Method 2: Try browser language
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage
      if (browserLang) {
        // Extract country code from language tag (e.g., 'ar-AE' -> 'AE')
        const match = browserLang.match(/[-_]([A-Z]{2})/)
        if (match && match[1]) {
          return match[1]
        }

        // Check if browser language is Arabic
        if (browserLang.startsWith('ar')) {
          return 'SA' // Default to Saudi Arabia if language is Arabic
        }
      }
    }

    // Method 3: Fetch from geolocation API
    const response = await fetch('https://ipapi.co/json/')
    if (response.ok) {
      const data = await response.json()
      return data.country_code || null
    }

    return null
  } catch (error) {
    console.error('Error detecting country:', error)
    return null
  }
}

/**
 * Check if country code is a GCC country
 */
export function isGCCCountry(countryCode: string | null): boolean {
  if (!countryCode) return false
  return GCC_COUNTRIES.includes(countryCode.toUpperCase())
}

/**
 * Check if country code is Arabic-speaking
 */
export function isArabicCountry(countryCode: string | null): boolean {
  if (!countryCode) return false
  return ARABIC_COUNTRIES.includes(countryCode.toUpperCase())
}

/**
 * Detect appropriate language based on user's location
 * @returns 'ar' for GCC countries, 'en' for others
 */
export async function detectLanguage(): Promise<'en' | 'ar'> {
  try {
    // Check localStorage first (user preference)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred_language')
      if (savedLanguage === 'ar' || savedLanguage === 'en') {
        return savedLanguage as 'en' | 'ar'
      }
    }

    // Detect country
    const country = await detectUserCountry()

    // Return Arabic for GCC countries
    if (isGCCCountry(country)) {
      return 'ar'
    }

    // Default to English
    return 'en'
  } catch (error) {
    console.error('Error detecting language:', error)
    return 'en' // Default to English on error
  }
}

/**
 * Save user's language preference
 */
export function saveLanguagePreference(language: 'en' | 'ar') {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred_language', language)
  }
}

/**
 * Get country name in English and Arabic
 */
export function getCountryName(countryCode: string): { en: string; ar: string } {
  const countryNames: Record<string, { en: string; ar: string }> = {
    'AE': { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
    'SA': { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    'KW': { en: 'Kuwait', ar: 'الكويت' },
    'QA': { en: 'Qatar', ar: 'قطر' },
    'BH': { en: 'Bahrain', ar: 'البحرين' },
    'OM': { en: 'Oman', ar: 'عمان' }
  }

  return countryNames[countryCode] || { en: 'Unknown', ar: 'غير معروف' }
}