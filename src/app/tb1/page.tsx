'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function TaboolaLandingPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);

  // Auto-detect country and language from IP
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code) {
          const countryCode = data.country_code;
          const countryName = data.country_name;

          setFormData(prev => ({ ...prev, country: countryName }));

          const langMap: Record<string, string> = {
            'MY': 'ms', 'ES': 'es', 'MX': 'es', 'AR': 'es',
            'FR': 'fr', 'DE': 'de', 'IT': 'it', 'PT': 'pt',
            'BR': 'pt', 'RU': 'ru', 'CN': 'zh', 'TW': 'zh',
            'HK': 'zh', 'JP': 'ja', 'KR': 'ko', 'SA': 'ar',
            'AE': 'ar', 'EG': 'ar', 'TR': 'tr', 'SG': 'en'
          };

          if (langMap[countryCode]) {
            setCurrentLang(langMap[countryCode]);
          }

          setAutoDetected(true);
          console.log('✓ Location detected:', countryName, '-', langMap[countryCode] || 'en');
        }
      } catch (error) {
        console.error('Failed to detect location:', error);
      }
    };

    detectLocation();
  }, []);

  const translations = {
    en: {
      badge: '🔥 EXCLUSIVE TRADING OPPORTUNITY',
      headline: 'Get Matched With Elite Brokers',
      subheadline: 'Join 50,000+ Traders Worldwide',
      cta: 'START YOUR JOURNEY NOW',
      formTitle: 'Get Your Free Broker Match',
      formSubtitle: 'Fill out the form below',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      selectCountry: 'Select your country',
      submitButton: 'GET MATCHED NOW',
      submitting: 'Submitting...',
      successMessage: 'Success! Redirecting...',
      errorMessage: 'Error. Please try again.',
      trustBadge1: '100% Free',
      trustBadge2: 'No Card Required',
      trustBadge3: 'Secure',
    },
    ms: {
      badge: '🔥 PELUANG PERDAGANGAN EKSKLUSIF',
      headline: 'Dapatkan Padanan Broker Elit',
      subheadline: 'Sertai 50,000+ Pedagang',
      cta: 'MULAKAN SEKARANG',
      formTitle: 'Padanan Broker Percuma',
      formSubtitle: 'Isi borang di bawah',
      firstName: 'Nama Pertama',
      lastName: 'Nama Keluarga',
      email: 'Alamat Emel',
      phone: 'Nombor Telefon',
      country: 'Negara',
      selectCountry: 'Pilih negara',
      submitButton: 'DAPATKAN PADANAN',
      submitting: 'Menghantar...',
      successMessage: 'Berjaya! Mengalihkan...',
      errorMessage: 'Ralat. Sila cuba lagi.',
      trustBadge1: '100% Percuma',
      trustBadge2: 'Tiada Kad',
      trustBadge3: 'Selamat',
    },
    es: {
      badge: '🔥 OPORTUNIDAD EXCLUSIVA',
      headline: 'Encuentra Tu Bróker Elite',
      subheadline: 'Únete a 50,000+ Traders',
      cta: 'COMENZAR AHORA',
      formTitle: 'Emparejamiento Gratuito',
      formSubtitle: 'Completa el formulario',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo',
      phone: 'Teléfono',
      country: 'País',
      selectCountry: 'Selecciona tu país',
      submitButton: 'COMENZAR',
      submitting: 'Enviando...',
      successMessage: '¡Éxito! Redirigiendo...',
      errorMessage: 'Error. Intenta de nuevo.',
      trustBadge1: '100% Gratis',
      trustBadge2: 'Sin Tarjeta',
      trustBadge3: 'Seguro',
    },
    fr: {
      badge: '🔥 OPPORTUNITÉ EXCLUSIVE',
      headline: 'Trouvez Votre Courtier',
      subheadline: 'Rejoignez 50,000+ Traders',
      cta: 'COMMENCER',
      formTitle: 'Correspondance Gratuite',
      formSubtitle: 'Remplissez le formulaire',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      country: 'Pays',
      selectCountry: 'Sélectionnez',
      submitButton: 'COMMENCER',
      submitting: 'Envoi...',
      successMessage: 'Succès! Redirection...',
      errorMessage: 'Erreur. Réessayez.',
      trustBadge1: '100% Gratuit',
      trustBadge2: 'Sans Carte',
      trustBadge3: 'Sécurisé',
    },
    de: {
      badge: '🔥 EXKLUSIVE GELEGENHEIT',
      headline: 'Finden Sie Ihren Broker',
      subheadline: 'Treten Sie 50,000+ Händlern Bei',
      cta: 'JETZT STARTEN',
      formTitle: 'Kostenlose Zuordnung',
      formSubtitle: 'Füllen Sie das Formular aus',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      country: 'Land',
      selectCountry: 'Wählen Sie',
      submitButton: 'STARTEN',
      submitting: 'Senden...',
      successMessage: 'Erfolg! Umleitung...',
      errorMessage: 'Fehler. Versuchen Sie es erneut.',
      trustBadge1: '100% Kostenlos',
      trustBadge2: 'Keine Karte',
      trustBadge3: 'Sicher',
    },
    it: {
      badge: '🔥 OPPORTUNITÀ ESCLUSIVA',
      headline: 'Trova Il Tuo Broker',
      subheadline: 'Unisciti a 50,000+ Traders',
      cta: 'INIZIA ORA',
      formTitle: 'Corrispondenza Gratuita',
      formSubtitle: 'Compila il modulo',
      firstName: 'Nome',
      lastName: 'Cognome',
      email: 'Email',
      phone: 'Telefono',
      country: 'Paese',
      selectCountry: 'Seleziona',
      submitButton: 'INIZIA',
      submitting: 'Invio...',
      successMessage: 'Successo! Reindirizzamento...',
      errorMessage: 'Errore. Riprova.',
      trustBadge1: '100% Gratuito',
      trustBadge2: 'Senza Carta',
      trustBadge3: 'Sicuro',
    },
    pt: {
      badge: '🔥 OPORTUNIDADE EXCLUSIVA',
      headline: 'Encontre Seu Corretor',
      subheadline: 'Junte-se a 50,000+ Traders',
      cta: 'COMEÇAR AGORA',
      formTitle: 'Correspondência Gratuita',
      formSubtitle: 'Preencha o formulário',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'Email',
      phone: 'Telefone',
      country: 'País',
      selectCountry: 'Selecione',
      submitButton: 'COMEÇAR',
      submitting: 'Enviando...',
      successMessage: 'Sucesso! Redirecionando...',
      errorMessage: 'Erro. Tente novamente.',
      trustBadge1: '100% Grátis',
      trustBadge2: 'Sem Cartão',
      trustBadge3: 'Seguro',
    },
    ru: {
      badge: '🔥 ЭКСКЛЮЗИВНАЯ ВОЗМОЖНОСТЬ',
      headline: 'Найдите Своего Брокера',
      subheadline: 'Присоединяйтесь к 50,000+ Трейдерам',
      cta: 'НАЧАТЬ СЕЙЧАС',
      formTitle: 'Бесплатное Соответствие',
      formSubtitle: 'Заполните форму',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      country: 'Страна',
      selectCountry: 'Выберите',
      submitButton: 'НАЧАТЬ',
      submitting: 'Отправка...',
      successMessage: 'Успех! Перенаправление...',
      errorMessage: 'Ошибка. Попробуйте снова.',
      trustBadge1: '100% Бесплатно',
      trustBadge2: 'Без Карты',
      trustBadge3: 'Безопасно',
    },
    zh: {
      badge: '🔥 独家机会',
      headline: '找到您的经纪商',
      subheadline: '加入50,000+交易者',
      cta: '立即开始',
      formTitle: '免费匹配',
      formSubtitle: '填写表格',
      firstName: '名',
      lastName: '姓',
      email: '电子邮件',
      phone: '电话',
      country: '国家',
      selectCountry: '选择',
      submitButton: '开始',
      submitting: '提交中...',
      successMessage: '成功！重定向...',
      errorMessage: '错误。请重试。',
      trustBadge1: '100%免费',
      trustBadge2: '无需卡',
      trustBadge3: '安全',
    },
    ja: {
      badge: '🔥 限定機会',
      headline: 'ブローカーを見つける',
      subheadline: '50,000+トレーダーに参加',
      cta: '今すぐ始める',
      formTitle: '無料マッチング',
      formSubtitle: 'フォームに記入',
      firstName: '名',
      lastName: '姓',
      email: 'メール',
      phone: '電話',
      country: '国',
      selectCountry: '選択',
      submitButton: '開始',
      submitting: '送信中...',
      successMessage: '成功！リダイレクト中...',
      errorMessage: 'エラー。再試行。',
      trustBadge1: '100%無料',
      trustBadge2: 'カード不要',
      trustBadge3: '安全',
    },
    ko: {
      badge: '🔥 독점 기회',
      headline: '브로커 찾기',
      subheadline: '50,000+ 트레이더 참여',
      cta: '지금 시작',
      formTitle: '무료 매칭',
      formSubtitle: '양식 작성',
      firstName: '이름',
      lastName: '성',
      email: '이메일',
      phone: '전화',
      country: '국가',
      selectCountry: '선택',
      submitButton: '시작',
      submitting: '제출 중...',
      successMessage: '성공! 리디렉션 중...',
      errorMessage: '오류. 다시 시도.',
      trustBadge1: '100% 무료',
      trustBadge2: '카드 불필요',
      trustBadge3: '안전',
    },
    ar: {
      badge: '🔥 فرصة حصرية',
      headline: 'اعثر على وسيطك',
      subheadline: 'انضم إلى 50,000+ متداول',
      cta: 'ابدأ الآن',
      formTitle: 'مطابقة مجانية',
      formSubtitle: 'املأ النموذج',
      firstName: 'الاسم',
      lastName: 'العائلة',
      email: 'البريد',
      phone: 'الهاتف',
      country: 'البلد',
      selectCountry: 'اختر',
      submitButton: 'ابدأ',
      submitting: 'إرسال...',
      successMessage: 'نجاح! إعادة التوجيه...',
      errorMessage: 'خطأ. حاول مرة أخرى.',
      trustBadge1: '100٪ مجاني',
      trustBadge2: 'لا بطاقة',
      trustBadge3: 'آمن',
    },
  };

  const t = translations[currentLang as keyof typeof translations];

  const countries = [
    'Malaysia', 'Singapore', 'Hong Kong', 'Thailand', 'Indonesia',
    'Philippines', 'Vietnam', 'Turkey', 'Brazil',
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Portugal', 'Ireland',
    'Japan', 'South Korea', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
    'Kuwait', 'Israel', 'South Africa', 'Nigeria', 'Kenya', 'Egypt',
    'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru', 'New Zealand'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          country: formData.country,
          source: 'tb1',
          language: currentLang,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setSubmitMessage(t.successMessage);
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 1500);
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(t.errorMessage);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitSuccess(false);
      setSubmitMessage(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'ms', flag: '🇲🇾', name: 'Malay' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', name: 'Português' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  ];

  return (
    <>
      <div className="tb1-container">
        {/* Language Selector */}
        <div className="language-selector">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => setCurrentLang(lang.code)}
              title={lang.name}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">{t.badge}</div>
          <h1 className="hero-title">{t.headline}</h1>
          <p className="hero-subtitle">{t.subheadline}</p>
          <a href="#signup" className="cta-button">
            {t.cta}
          </a>
        </section>

        {/* Signup Form */}
        <section id="signup" className="signup-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{t.formTitle}</h2>
              <p className="form-subtitle">{t.formSubtitle}</p>
              {autoDetected && (
                <p className="auto-detected">✓ {formData.country}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{t.firstName}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.firstName}
                  />
                </div>
                <div className="form-group">
                  <label>{t.lastName}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.lastName}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.email}
                  />
                </div>
                <div className="form-group">
                  <label>{t.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder={t.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.country}</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">{t.selectCountry}</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.submitting : t.submitButton}
              </button>

              {submitMessage && (
                <div className={`submit-message ${submitSuccess ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
            </form>

            <div className="form-trust">
              <div className="trust-item">✓ {t.trustBadge1}</div>
              <div className="trust-item">✓ {t.trustBadge2}</div>
              <div className="trust-item">✓ {t.trustBadge3}</div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .tb1-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Language Selector */
        .language-selector {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.98);
          padding: 12px;
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          z-index: 1000;
        }

        .lang-btn {
          background: white;
          border: 3px solid transparent;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 22px;
        }

        .lang-btn:hover {
          transform: scale(1.15) rotate(5deg);
          border-color: #667eea;
        }

        .lang-btn.active {
          border-color: #667eea;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
          transform: scale(1.15);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 120px 20px 80px;
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f, #f093fb);
          color: white;
          padding: 14px 35px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 1px;
          margin-bottom: 35px;
          box-shadow: 0 8px 30px rgba(238, 90, 111, 0.5);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero-title {
          font-size: clamp(36px, 7vw, 72px);
          font-weight: 900;
          color: white;
          margin-bottom: 25px;
          line-height: 1.1;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: clamp(18px, 3.5vw, 26px);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 45px;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }

        /* CTA BUTTON - AMAZING! */
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f, #f093fb);
          color: white;
          padding: 22px 55px;
          border-radius: 50px;
          font-size: 20px;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.4s ease;
          box-shadow: 0 12px 40px rgba(238, 90, 111, 0.5);
          border: 3px solid white;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 18px 60px rgba(238, 90, 111, 0.7);
        }

        /* Form */
        .signup-form-section {
          padding: 80px 20px;
        }

        .form-container {
          max-width: 750px;
          margin: 0 auto;
          background: white;
          padding: 60px 50px;
          border-radius: 35px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        }

        .form-header {
          text-align: center;
          margin-bottom: 45px;
        }

        .form-title {
          font-size: clamp(30px, 5vw, 44px);
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 18px;
        }

        .form-subtitle {
          font-size: 17px;
          color: #4a5568;
        }

        .auto-detected {
          font-size: 14px;
          color: #38a169;
          margin-top: 12px;
          font-weight: 600;
          padding: 8px 16px;
          background: rgba(56, 161, 105, 0.1);
          border-radius: 20px;
          display: inline-block;
        }

        .signup-form {
          margin-bottom: 35px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          margin-bottom: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 15px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .form-input,
        .form-select {
          padding: 16px 22px;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .form-select {
          cursor: pointer;
        }

        /* SUBMIT BUTTON - WOW! */
        .submit-button {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 19px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
          margin-top: 15px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          overflow: hidden;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 18px 55px rgba(102, 126, 234, 0.6);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-message {
          margin-top: 22px;
          padding: 18px;
          border-radius: 14px;
          text-align: center;
          font-weight: 700;
          font-size: 16px;
        }

        .submit-message.success {
          background: #d4edda;
          color: #155724;
          border: 2px solid #b1dfbb;
        }

        .submit-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 2px solid #f1b0b7;
        }

        .form-trust {
          display: flex;
          justify-content: center;
          gap: 35px;
          flex-wrap: wrap;
          padding-top: 35px;
          border-top: 2px solid #e2e8f0;
        }

        .trust-item {
          color: #2d3748;
          font-size: 15px;
          font-weight: 600;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .language-selector {
            max-width: calc(100vw - 40px);
            right: 10px;
            top: 10px;
          }

          .lang-btn {
            width: 38px;
            height: 38px;
            font-size: 19px;
          }

          .hero {
            padding: 100px 15px 60px;
          }

          .cta-button {
            padding: 18px 40px;
            font-size: 17px;
          }

          .form-container {
            padding: 40px 25px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-trust {
            flex-direction: column;
            gap: 18px;
            align-items: center;
          }
        }
      `}</style>

      <Script id="tb1-scroll" strategy="afterInteractive">
        {`
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            });
          });
        `}
      </Script>
    </>
  );
}
