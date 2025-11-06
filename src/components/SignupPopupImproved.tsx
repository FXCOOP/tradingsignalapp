'use client';

import { useState, useEffect } from 'react';
import { ALL_COUNTRIES, getSortedCountries, getCountryByISO, getPhoneCodeFromISO, Country } from '@/lib/countries-enhanced';
import './SignupPopupImproved.css';

// 20 Popular Languages for Trading
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', nativeName: 'Bahasa Melayu' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷', nativeName: 'فارسی' }
];

// Language to Country mapping for auto-detection
const LANGUAGE_TO_COUNTRY_MAP: Record<string, string> = {
  'AE': 'ar', 'SA': 'ar', 'QA': 'ar', 'KW': 'ar', 'BH': 'ar', 'OM': 'ar', // GCC -> Arabic
  'EG': 'ar', 'JO': 'ar', 'LB': 'ar', 'IQ': 'ar', // MENA -> Arabic
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', // China -> Chinese
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', // Spanish countries
  'IN': 'hi', // India -> Hindi
  'FR': 'fr', 'CA': 'fr', 'BE': 'fr', // French countries
  'DE': 'de', 'AT': 'de', 'CH': 'de', // German countries
  'BR': 'pt', 'PT': 'pt', // Portuguese
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', // Russian
  'JP': 'ja', // Japan
  'TR': 'tr', // Turkey
  'KR': 'ko', // Korea
  'IT': 'it', // Italy
  'ID': 'id', // Indonesia
  'TH': 'th', // Thailand
  'VN': 'vi', // Vietnam
  'PL': 'pl', // Poland
  'NL': 'nl', // Netherlands
  'MY': 'ms', // Malaysia
  'IR': 'fa', // Iran
};

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  language: string;
  tradingExperience?: string;
  accountSize?: string;
  termsAccepted: boolean;
}

interface SignupPopupImprovedProps {
  variant?: number;
  delay?: number;
  onClose?: () => void;
  show?: boolean;
}

export default function SignupPopupImproved({ variant = 1, delay = 10000, onClose, show }: SignupPopupImprovedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+971',
    phoneNumber: '',
    country: 'AE',
    language: 'en',
    tradingExperience: '',
    accountSize: '',
    termsAccepted: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [sortedCountries, setSortedCountries] = useState<Country[]>(ALL_COUNTRIES);
  const [sortedLanguages, setSortedLanguages] = useState(LANGUAGES);

  useEffect(() => {
    const hasSignedUp = localStorage.getItem('gcc_signup_completed');
    if (hasSignedUp) return;

    // Detect user's country and language by IP
    const detectLocationAndLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const country = getCountryByISO(data.country_code);
        const detectedLang = LANGUAGE_TO_COUNTRY_MAP[data.country_code] || 'en';
        const browserLang = navigator.language.split('-')[0];

        // Prioritize: Detected IP language > Browser language > English
        const finalLanguage = detectedLang !== 'en' ? detectedLang :
                            LANGUAGES.find(l => l.code === browserLang) ? browserLang : 'en';

        if (country) {
          setFormData(prev => ({
            ...prev,
            countryCode: country.code,
            country: country.iso,
            language: finalLanguage
          }));
          setDetectedCountry(country.name);
          const langName = LANGUAGES.find(l => l.code === finalLanguage)?.name;
          setDetectedLanguage(langName || 'English');

          // Sort countries: Detected first, then alphabetical
          const sorted = getSortedCountries(country.iso);
          setSortedCountries(sorted);

          // Sort languages: Detected first, then keep original order
          const detectedLangObj = LANGUAGES.find(l => l.code === finalLanguage);
          if (detectedLangObj) {
            const otherLangs = LANGUAGES.filter(l => l.code !== finalLanguage);
            setSortedLanguages([detectedLangObj, ...otherLangs]);
          }
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
        // Fallback to browser language
        const browserLang = navigator.language.split('-')[0];
        if (LANGUAGES.find(l => l.code === browserLang)) {
          setFormData(prev => ({ ...prev, language: browserLang }));
        }
      }
    };

    detectLocationAndLanguage();

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (show) {
      const hasSignedUp = localStorage.getItem('gcc_signup_completed');
      if (!hasSignedUp) {
        setIsVisible(true);
      }
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('gcc_signup_completed', 'true');

        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setIsSuccess(true);

        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 3000);
      } else {
        const data = await response.json();
        alert(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'country') {
      const phoneCode = getPhoneCodeFromISO(value);
      setFormData(prev => ({ ...prev, countryCode: phoneCode }));
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`signup-overlay-improved variant-${variant}`} onClick={handleClose}>
      <div className={`signup-popup-improved design-${variant}`} onClick={e => e.stopPropagation()}>
        <button className="close-btn-improved" onClick={handleClose}>✕</button>

        {isSuccess ? (
          <div className="success-message-improved">
            <div className="success-icon-improved">
              <svg viewBox="0 0 52 52" className="checkmark">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2>🎉 Welcome Aboard!</h2>
            <p className="success-subtitle">Your account has been created successfully</p>

            <div className="benefits-card">
              <h3>✨ Premium Access Granted</h3>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="benefit-icon">📊</span>
                  <span>Unlimited Signals</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📈</span>
                  <span>Market Analysis</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🎓</span>
                  <span>Premium Education</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🤝</span>
                  <span>Broker Support</span>
                </div>
              </div>
            </div>

            <div className="loading-bar">
              <div className="loading-bar-fill"></div>
            </div>
            <p className="loading-text">Logging you in...</p>
          </div>
        ) : (
          <>
            <div className="popup-header-improved">
              <div className="icon-badge">🎯</div>
              <h2>Get Your Personal Trading Guide</h2>
              <p>Connect with a professional broker for personalized guidance and free premium access to signals and education kit</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form-improved">

              {/* Language Selector - Prominent Position */}
              <div className="form-group-improved language-selector-group">
                <label className="label-improved">
                  <span className="label-icon">🌍</span>
                  Preferred Language
                  {detectedLanguage && <span className="detected-badge">{detectedLanguage} detected</span>}
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="select-improved language-select"
                  required
                >
                  {sortedLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name Fields */}
              <div className="form-row-improved">
                <div className="form-group-improved">
                  <label className="label-improved">
                    <span className="label-icon">👤</span>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ahmed"
                    className="input-improved"
                    required
                  />
                </div>
                <div className="form-group-improved">
                  <label className="label-improved">
                    <span className="label-icon">👤</span>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Al-Maktoum"
                    className="input-improved"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group-improved">
                <label className="label-improved">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmed@example.com"
                  className="input-improved"
                  required
                />
              </div>

              {/* Country */}
              <div className="form-group-improved">
                <label className="label-improved">
                  <span className="label-icon">🌎</span>
                  Country
                  {detectedCountry && <span className="detected-badge">{detectedCountry} detected</span>}
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="select-improved"
                  required
                >
                  {sortedCountries.map(country => (
                    <option key={country.iso} value={country.iso}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="form-row-improved phone-row">
                <div className="form-group-improved code-group">
                  <label className="label-improved">
                    <span className="label-icon">📞</span>
                    Code
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="select-improved code-select"
                    required
                  >
                    {sortedCountries.map((country, index) => (
                      <option key={`${country.code}-${index}`} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group-improved phone-group">
                  <label className="label-improved">
                    <span className="label-icon">📱</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="501234567"
                    className="input-improved"
                    required
                  />
                </div>
              </div>

              {/* Trading Experience - Optional */}
              <div className="form-group-improved">
                <label className="label-improved">
                  <span className="label-icon">📊</span>
                  Current Trading Experience
                  <span className="optional-badge">(Optional)</span>
                </label>
                <select
                  name="tradingExperience"
                  value={formData.tradingExperience}
                  onChange={handleChange}
                  className="select-improved"
                >
                  <option value="">Select your level</option>
                  <option value="beginner">🌱 Beginner - New to trading</option>
                  <option value="intermediate">📈 Intermediate - Some experience</option>
                  <option value="advanced">⭐ Advanced - Experienced trader</option>
                  <option value="professional">💎 Professional - Full-time trader</option>
                </select>
              </div>

              {/* Account Size - Optional */}
              <div className="form-group-improved">
                <label className="label-improved">
                  <span className="label-icon">💰</span>
                  Account Size
                  <span className="optional-badge">(Optional)</span>
                </label>
                <select
                  name="accountSize"
                  value={formData.accountSize}
                  onChange={handleChange}
                  className="select-improved"
                >
                  <option value="">Select range</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>
              </div>

              {/* Terms */}
              <div className="terms-checkbox-improved">
                <label className="checkbox-label-improved">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="checkbox-improved"
                    required
                  />
                  <span className="checkbox-text">
                    I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn-improved"
                disabled={isSubmitting || !formData.termsAccepted}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Connecting...
                  </>
                ) : (
                  <>
                    Get Started Now
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <span>🔒</span>
                  <span>Secure & Encrypted</span>
                </div>
                <div className="trust-badge">
                  <span>⚡</span>
                  <span>Instant Access</span>
                </div>
                <div className="trust-badge">
                  <span>✓</span>
                  <span>No Credit Card</span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
