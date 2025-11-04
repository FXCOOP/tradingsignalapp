'use client';

import { useState, useRef, useEffect } from 'react';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const ALL_COUNTRIES: Country[] = [
  // GCC Countries
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  // MENA Region
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  // Asia
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  // Americas
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  // Africa
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

interface CountryAutocompleteProps {
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

export function CountryAutocomplete({ selectedCountries, onChange }: CountryAutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCountries = ALL_COUNTRIES.filter(
    (country) =>
      !selectedCountries.includes(country.code) &&
      (country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addCountry = (countryCode: string) => {
    onChange([...selectedCountries, countryCode]);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const removeCountry = (countryCode: string) => {
    onChange(selectedCountries.filter((c) => c !== countryCode));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCountryByCode = (code: string) => ALL_COUNTRIES.find((c) => c.code === code);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {/* Selected Countries */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {selectedCountries.map((code) => {
          const country = getCountryByCode(code);
          return country ? (
            <div
              key={code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                border: '2px solid #3b82f6',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1e40af'
              }}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <button
                onClick={() => removeCountry(code)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '0',
                  marginLeft: '4px'
                }}
                type="button"
              >
                ×
              </button>
            </div>
          ) : null;
        })}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Type to search countries..."
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
      />

      {/* Dropdown */}
      {showDropdown && filteredCountries.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          {filteredCountries.slice(0, 50).map((country) => (
            <div
              key={country.code}
              onClick={() => addCountry(country.code)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #f1f5f9',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <span style={{ fontSize: '20px' }}>{country.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{country.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{country.code}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
        {selectedCountries.length > 0
          ? `${selectedCountries.length} ${selectedCountries.length === 1 ? 'country' : 'countries'} selected`
          : 'Type to search and select countries'}
      </div>
    </div>
  );
}
