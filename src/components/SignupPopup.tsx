'use client';

import { useState, useEffect } from 'react';
import { COUNTRIES, getCountryByISO, getPhoneCodeFromISO } from '@/lib/countries';
import './SignupPopup.css';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  termsAccepted: boolean;
}

interface SignupPopupProps {
  variant?: number; // 1-20 for different designs
  delay?: number; // Delay in milliseconds before showing popup
  onClose?: () => void;
}

export default function SignupPopup({ variant = 1, delay = 10000, onClose }: SignupPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    countryCode: '+971',
    phoneNumber: '',
    country: 'AE',
    termsAccepted: true, // Automatically checked
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already signed up
    const hasSignedUp = localStorage.getItem('gcc_signup_completed');
    if (hasSignedUp) return;

    // Detect user's country by IP
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = getCountryByISO(data.country_code);
        if (country) {
          setFormData(prev => ({
            ...prev,
            countryCode: country.code,
            country: country.iso,
          }));
          setDetectedCountry(country.name);
        }
      } catch (error) {
        console.error('Failed to detect country:', error);
      }
    };

    detectCountry();

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
    // Don't save dismissed state - popup can appear again when user interacts
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
        // Mark signup as completed
        localStorage.setItem('gcc_signup_completed', 'true');

        // Show success message
        setIsSuccess(true);

        // Close popup after 5 seconds
        setTimeout(() => {
          handleClose();
        }, 5000);
      } else {
        // Handle error
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

    // Auto-update country code when country changes
    if (name === 'country') {
      const phoneCode = getPhoneCodeFromISO(value);
      setFormData(prev => ({ ...prev, countryCode: phoneCode }));
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`signup-overlay variant-${variant}`} onClick={handleClose}>
      <div className={`signup-popup design-${variant}`} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>✕</button>

        {isSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Thank You for Signing Up!</h2>
            <p style={{ marginBottom: '16px' }}>Your registration has been successfully submitted.</p>
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0369a1', marginBottom: '12px' }}>
                📞 What Happens Next?
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
                <li>Our professional broker will contact you within <strong>24 hours</strong></li>
                <li>You'll receive personalized trading guidance</li>
                <li>Get access to premium trading tools and signals</li>
              </ul>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Check your email for confirmation and next steps.
            </p>
          </div>
        ) : (
          <>
            <div className="popup-header">
              <div className="icon-wrapper">
                <span className="icon">🎯</span>
              </div>
              <h2>Get Your Personal Trading Guide</h2>
              <p>Connect with a trusted professional broker for one-on-one guidance</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ahmed"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Al-Maktoum"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmed@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label>Country {detectedCountry && <span className="detected">({detectedCountry} detected)</span>}</label>
                <select name="country" value={formData.country} onChange={handleChange} required>
                  {COUNTRIES.map(country => (
                    <option key={country.iso} value={country.iso}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: '0 0 120px' }}>
                  <label>Code</label>
                  <select name="countryCode" value={formData.countryCode} onChange={handleChange} required>
                    {COUNTRIES.map((country, index) => (
                      <option key={`${country.code}-${index}`} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="501234567"
                    required
                  />
                </div>
              </div>

              <div className="terms-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting || !formData.termsAccepted}>
                {isSubmitting ? 'Connecting...' : 'Get Started Now'}
              </button>

              <p className="privacy-note">
                🔒 Your information is secure and will only be used to connect you with our professional brokers
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}