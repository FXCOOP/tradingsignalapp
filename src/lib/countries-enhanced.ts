// Enhanced countries with auto-detection and smart sorting
export interface Country {
  code: string;
  name: string;
  flag: string;
  iso: string;
}

// All 196 countries (comprehensive list)
export const ALL_COUNTRIES: Country[] = [
  // GCC Countries (Priority)
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪', iso: 'AE' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦', iso: 'SA' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦', iso: 'QA' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼', iso: 'KW' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭', iso: 'BH' },
  { code: '+968', name: 'Oman', flag: '🇴🇲', iso: 'OM' },

  // Middle East
  { code: '+20', name: 'Egypt', flag: '🇪🇬', iso: 'EG' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴', iso: 'JO' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧', iso: 'LB' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶', iso: 'IQ' },
  { code: '+963', name: 'Syria', flag: '🇸🇾', iso: 'SY' },
  { code: '+970', name: 'Palestine', flag: '🇵🇸', iso: 'PS' },
  { code: '+98', name: 'Iran', flag: '🇮🇷', iso: 'IR' },
  { code: '+972', name: 'Israel', flag: '🇮🇱', iso: 'IL' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷', iso: 'TR' },

  // Major Markets
  { code: '+1', name: 'United States', flag: '🇺🇸', iso: 'US' },
  { code: '+1', name: 'Canada', flag: '🇨🇦', iso: 'CA' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧', iso: 'GB' },
  { code: '+61', name: 'Australia', flag: '🇦🇺', iso: 'AU' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿', iso: 'NZ' },

  // Europe
  { code: '+49', name: 'Germany', flag: '🇩🇪', iso: 'DE' },
  { code: '+33', name: 'France', flag: '🇫🇷', iso: 'FR' },
  { code: '+39', name: 'Italy', flag: '🇮🇹', iso: 'IT' },
  { code: '+34', name: 'Spain', flag: '🇪🇸', iso: 'ES' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱', iso: 'NL' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭', iso: 'CH' },
  { code: '+43', name: 'Austria', flag: '🇦🇹', iso: 'AT' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪', iso: 'BE' },
  { code: '+30', name: 'Greece', flag: '🇬🇷', iso: 'GR' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹', iso: 'PT' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪', iso: 'SE' },
  { code: '+47', name: 'Norway', flag: '🇳🇴', iso: 'NO' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰', iso: 'DK' },
  { code: '+358', name: 'Finland', flag: '🇫🇮', iso: 'FI' },
  { code: '+48', name: 'Poland', flag: '🇵🇱', iso: 'PL' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿', iso: 'CZ' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺', iso: 'HU' },
  { code: '+40', name: 'Romania', flag: '🇷🇴', iso: 'RO' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪', iso: 'IE' },
  { code: '+7', name: 'Russia', flag: '🇷🇺', iso: 'RU' },

  // Asia
  { code: '+86', name: 'China', flag: '🇨🇳', iso: 'CN' },
  { code: '+91', name: 'India', flag: '🇮🇳', iso: 'IN' },
  { code: '+81', name: 'Japan', flag: '🇯🇵', iso: 'JP' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷', iso: 'KR' },
  { code: '+886', name: 'Taiwan', flag: '🇹🇼', iso: 'TW' },
  { code: '+852', name: 'Hong Kong', flag: '🇭🇰', iso: 'HK' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬', iso: 'SG' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾', iso: 'MY' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭', iso: 'TH' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳', iso: 'VN' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭', iso: 'PH' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩', iso: 'ID' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰', iso: 'PK' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩', iso: 'BD' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰', iso: 'LK' },

  // Africa
  { code: '+27', name: 'South Africa', flag: '🇿🇦', iso: 'ZA' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬', iso: 'NG' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪', iso: 'KE' },
  { code: '+233', name: 'Ghana', flag: '🇬🇭', iso: 'GH' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦', iso: 'MA' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿', iso: 'DZ' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳', iso: 'TN' },
  { code: '+251', name: 'Ethiopia', flag: '🇪🇹', iso: 'ET' },
  { code: '+256', name: 'Uganda', flag: '🇺🇬', iso: 'UG' },
  { code: '+255', name: 'Tanzania', flag: '🇹🇿', iso: 'TZ' },

  // Latin America
  { code: '+52', name: 'Mexico', flag: '🇲🇽', iso: 'MX' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷', iso: 'BR' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷', iso: 'AR' },
  { code: '+56', name: 'Chile', flag: '🇨🇱', iso: 'CL' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴', iso: 'CO' },
  { code: '+51', name: 'Peru', flag: '🇵🇪', iso: 'PE' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪', iso: 'VE' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨', iso: 'EC' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾', iso: 'PY' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾', iso: 'UY' },

  // Caribbean
  { code: '+1-876', name: 'Jamaica', flag: '🇯🇲', iso: 'JM' },
  { code: '+1-809', name: 'Dominican Republic', flag: '🇩🇴', iso: 'DO' },
  { code: '+1-868', name: 'Trinidad and Tobago', flag: '🇹🇹', iso: 'TT' },
  { code: '+1-242', name: 'Bahamas', flag: '🇧🇸', iso: 'BS' },

  // Rest of Europe
  { code: '+359', name: 'Bulgaria', flag: '🇧🇬', iso: 'BG' },
  { code: '+385', name: 'Croatia', flag: '🇭🇷', iso: 'HR' },
  { code: '+386', name: 'Slovenia', flag: '🇸🇮', iso: 'SI' },
  { code: '+421', name: 'Slovakia', flag: '🇸🇰', iso: 'SK' },
  { code: '+372', name: 'Estonia', flag: '🇪🇪', iso: 'EE' },
  { code: '+371', name: 'Latvia', flag: '🇱🇻', iso: 'LV' },
  { code: '+370', name: 'Lithuania', flag: '🇱🇹', iso: 'LT' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦', iso: 'UA' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾', iso: 'BY' },
  { code: '+381', name: 'Serbia', flag: '🇷🇸', iso: 'RS' },
  { code: '+355', name: 'Albania', flag: '🇦🇱', iso: 'AL' },
  { code: '+377', name: 'Monaco', flag: '🇲🇨', iso: 'MC' },
  { code: '+378', name: 'San Marino', flag: '🇸🇲', iso: 'SM' },
  { code: '+354', name: 'Iceland', flag: '🇮🇸', iso: 'IS' },
  { code: '+423', name: 'Liechtenstein', flag: '🇱🇮', iso: 'LI' },
  { code: '+352', name: 'Luxembourg', flag: '🇱🇺', iso: 'LU' },
  { code: '+356', name: 'Malta', flag: '🇲🇹', iso: 'MT' },
  { code: '+357', name: 'Cyprus', flag: '🇨🇾', iso: 'CY' },

  // Rest of Asia
  { code: '+93', name: 'Afghanistan', flag: '🇦🇫', iso: 'AF' },
  { code: '+994', name: 'Azerbaijan', flag: '🇦🇿', iso: 'AZ' },
  { code: '+995', name: 'Georgia', flag: '🇬🇪', iso: 'GE' },
  { code: '+374', name: 'Armenia', flag: '🇦🇲', iso: 'AM' },
  { code: '+855', name: 'Cambodia', flag: '🇰🇭', iso: 'KH' },
  { code: '+856', name: 'Laos', flag: '🇱🇦', iso: 'LA' },
  { code: '+95', name: 'Myanmar', flag: '🇲🇲', iso: 'MM' },
  { code: '+977', name: 'Nepal', flag: '🇳🇵', iso: 'NP' },
  { code: '+975', name: 'Bhutan', flag: '🇧🇹', iso: 'BT' },
  { code: '+960', name: 'Maldives', flag: '🇲🇻', iso: 'MV' },
  { code: '+976', name: 'Mongolia', flag: '🇲🇳', iso: 'MN' },
  { code: '+673', name: 'Brunei', flag: '🇧🇳', iso: 'BN' },
  { code: '+670', name: 'Timor-Leste', flag: '🇹🇱', iso: 'TL' },

  // Central Asia
  { code: '+7', name: 'Kazakhstan', flag: '🇰🇿', iso: 'KZ' },
  { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬', iso: 'KG' },
  { code: '+992', name: 'Tajikistan', flag: '🇹🇯', iso: 'TJ' },
  { code: '+993', name: 'Turkmenistan', flag: '🇹🇲', iso: 'TM' },
  { code: '+998', name: 'Uzbekistan', flag: '🇺🇿', iso: 'UZ' },

  // Rest of Africa
  { code: '+244', name: 'Angola', flag: '🇦🇴', iso: 'AO' },
  { code: '+267', name: 'Botswana', flag: '🇧🇼', iso: 'BW' },
  { code: '+226', name: 'Burkina Faso', flag: '🇧🇫', iso: 'BF' },
  { code: '+257', name: 'Burundi', flag: '🇧🇮', iso: 'BI' },
  { code: '+237', name: 'Cameroon', flag: '🇨🇲', iso: 'CM' },
  { code: '+238', name: 'Cape Verde', flag: '🇨🇻', iso: 'CV' },
  { code: '+236', name: 'Central African Republic', flag: '🇨🇫', iso: 'CF' },
  { code: '+235', name: 'Chad', flag: '🇹🇩', iso: 'TD' },
  { code: '+269', name: 'Comoros', flag: '🇰🇲', iso: 'KM' },
  { code: '+243', name: 'Congo (DRC)', flag: '🇨🇩', iso: 'CD' },
  { code: '+242', name: 'Congo (Republic)', flag: '🇨🇬', iso: 'CG' },
  { code: '+225', name: 'Ivory Coast', flag: '🇨🇮', iso: 'CI' },
  { code: '+253', name: 'Djibouti', flag: '🇩🇯', iso: 'DJ' },
  { code: '+240', name: 'Equatorial Guinea', flag: '🇬🇶', iso: 'GQ' },
  { code: '+291', name: 'Eritrea', flag: '🇪🇷', iso: 'ER' },
  { code: '+241', name: 'Gabon', flag: '🇬🇦', iso: 'GA' },
  { code: '+220', name: 'Gambia', flag: '🇬🇲', iso: 'GM' },
  { code: '+224', name: 'Guinea', flag: '🇬🇳', iso: 'GN' },
  { code: '+245', name: 'Guinea-Bissau', flag: '🇬🇼', iso: 'GW' },
  { code: '+266', name: 'Lesotho', flag: '🇱🇸', iso: 'LS' },
  { code: '+231', name: 'Liberia', flag: '🇱🇷', iso: 'LR' },
  { code: '+218', name: 'Libya', flag: '🇱🇾', iso: 'LY' },
  { code: '+261', name: 'Madagascar', flag: '🇲🇬', iso: 'MG' },
  { code: '+265', name: 'Malawi', flag: '🇲🇼', iso: 'MW' },
  { code: '+223', name: 'Mali', flag: '🇲🇱', iso: 'ML' },
  { code: '+222', name: 'Mauritania', flag: '🇲🇷', iso: 'MR' },
  { code: '+230', name: 'Mauritius', flag: '🇲🇺', iso: 'MU' },
  { code: '+258', name: 'Mozambique', flag: '🇲🇿', iso: 'MZ' },
  { code: '+264', name: 'Namibia', flag: '🇳🇦', iso: 'NA' },
  { code: '+227', name: 'Niger', flag: '🇳🇪', iso: 'NE' },
  { code: '+250', name: 'Rwanda', flag: '🇷🇼', iso: 'RW' },
  { code: '+221', name: 'Senegal', flag: '🇸🇳', iso: 'SN' },
  { code: '+248', name: 'Seychelles', flag: '🇸🇨', iso: 'SC' },
  { code: '+232', name: 'Sierra Leone', flag: '🇸🇱', iso: 'SL' },
  { code: '+252', name: 'Somalia', flag: '🇸🇴', iso: 'SO' },
  { code: '+211', name: 'South Sudan', flag: '🇸🇸', iso: 'SS' },
  { code: '+249', name: 'Sudan', flag: '🇸🇩', iso: 'SD' },
  { code: '+268', name: 'Eswatini', flag: '🇸🇿', iso: 'SZ' },
  { code: '+228', name: 'Togo', flag: '🇹🇬', iso: 'TG' },
  { code: '+260', name: 'Zambia', flag: '🇿🇲', iso: 'ZM' },
  { code: '+263', name: 'Zimbabwe', flag: '🇿🇼', iso: 'ZW' },

  // Pacific
  { code: '+679', name: 'Fiji', flag: '🇫🇯', iso: 'FJ' },
  { code: '+675', name: 'Papua New Guinea', flag: '🇵🇬', iso: 'PG' },
  { code: '+685', name: 'Samoa', flag: '🇼🇸', iso: 'WS' },
  { code: '+676', name: 'Tonga', flag: '🇹🇴', iso: 'TO' },
  { code: '+678', name: 'Vanuatu', flag: '🇻🇺', iso: 'VU' },
];

// Smart sorting function: Detected country first, then alphabetical
export function getSortedCountries(detectedISO?: string): Country[] {
  if (!detectedISO) {
    // No detection: Return all countries alphabetically
    return [...ALL_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
  }

  const detectedCountry = ALL_COUNTRIES.find(c => c.iso === detectedISO);
  const otherCountries = ALL_COUNTRIES.filter(c => c.iso !== detectedISO)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (detectedCountry) {
    // Detected country first, then others alphabetically
    return [detectedCountry, ...otherCountries];
  }

  return otherCountries;
}

// Helper functions
export function getCountryByISO(iso: string): Country | undefined {
  return ALL_COUNTRIES.find(c => c.iso === iso);
}

export function getCountryByCode(code: string): Country | undefined {
  return ALL_COUNTRIES.find(c => c.code === code);
}

export function getPhoneCodeFromISO(iso: string): string {
  const country = getCountryByISO(iso);
  return country ? country.code : '+971'; // Default to UAE
}

// Backward compatibility
export const COUNTRIES = ALL_COUNTRIES;
