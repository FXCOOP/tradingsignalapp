'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('signals')
  const [language, setLanguage] = useState('en')
  const [isVerifiedBrokerUser, setIsVerifiedBrokerUser] = useState(false)
  const [signalsViewedCount, setSignalsViewedCount] = useState(0)
  const [showBrokerVerificationModal, setShowBrokerVerificationModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Language translations
  const translations = {
    en: {
      title: 'PK Signal Pulse',
      subtitle: 'Professional Trading Signals & Market Intelligence',
      freeSignals: 'Free Signals Preview',
      unlockMore: 'Open Broker Account for Unlimited Access',
      fromOnly: 'From Only $10',
      learnPractice: 'Learn, Practice, Earn & Enjoy',
      openAccount: 'Open Account Now',
      unlimited: 'Unlimited Access'
    },
    ur: {
      title: 'پی کے سگنل پلس',
      subtitle: 'پروفیشنل ٹریڈنگ سگنلز اور مارکیٹ انٹیلیجنس',
      freeSignals: 'مفت سگنلز کا جائزہ',
      unlockMore: 'لامحدود رسائی کے لیے بروکر اکاؤنٹ کھولیں',
      fromOnly: 'صرف $10 سے',
      learnPractice: 'سیکھیں، مشق کریں، کمائیں اور لطف اٹھائیں',
      openAccount: 'اب اکاؤنٹ کھولیں',
      unlimited: 'لامحدود رسائی'
    }
  }

  const t = translations[language as keyof typeof translations]

  // Sample signals data
  const signals = [
    {
      id: 1,
      symbol: 'USD/PKR',
      type: 'BUY',
      price: '278.45',
      target: '280.00',
      confidence: 85
    },
    {
      id: 2,
      symbol: 'HBL',
      type: 'BUY',
      price: '285.50',
      target: '295.00',
      confidence: 90
    },
    {
      id: 3,
      symbol: 'UBL',
      type: 'STRONG BUY',
      price: '245.80',
      target: '260.00',
      confidence: 92
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: 1.6
    }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 {t.title}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              style={{
                background: 'transparent',
                border: '1px solid #e2e8f0',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {language === 'en' ? '🇵🇰 اردو' : '🇺🇸 EN'}
            </button>

            {isVerifiedBrokerUser ? (
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ✓ {t.unlimited}
              </div>
            ) : (
              <button
                onClick={() => setShowBrokerVerificationModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
                }}
              >
                🚀 {t.openAccount}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 400px)',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div style={{ color: 'white', zIndex: 2 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              lineHeight: '1.1',
              margin: '0 0 20px 0',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}>
              {t.subtitle}
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              lineHeight: '1.6',
              margin: '0 0 30px 0',
              opacity: 0.95
            }}>
              {t.learnPractice} • {isVerifiedBrokerUser ? t.unlimited : `${signalsViewedCount}/3 signals viewed`}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {!isVerifiedBrokerUser && (
                <button
                  onClick={() => setShowBrokerVerificationModal(true)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1f2937',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '700',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }}
                >
                  💎 {t.openAccount} • {t.fromOnly}
                </button>
              )}

              <button
                onClick={() => setActiveTab('signals')}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.6)',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                ⚡ {t.freeSignals}
              </button>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 20px 0',
              textAlign: 'center'
            }}>
              🎯 {t.freeSignals}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {signals.slice(0, 3).map((signal, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    filter: index >= 3 - signalsViewedCount && !isVerifiedBrokerUser ? 'blur(3px)' : 'none',
                    opacity: index >= 3 - signalsViewedCount && !isVerifiedBrokerUser ? 0.7 : 1
                  }}
                >
                  <div>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {signal.symbol}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      {signal.price}
                    </div>
                  </div>

                  <div style={{
                    background: signal.type === 'BUY' || signal.type === 'STRONG BUY'
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}>
                    {signal.type}
                  </div>
                </div>
              ))}
            </div>

            {!isVerifiedBrokerUser && (
              <div style={{
                marginTop: '20px',
                textAlign: 'center',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.3)'
              }}>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {t.unlockMore}
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '12px'
                }}>
                  ✨ 100+ Daily Signals • Real-time Analysis • Expert Insights
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learn, Practice, Earn Section */}
      {!isVerifiedBrokerUser && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          margin: '40px 0',
          borderRadius: '20px',
          padding: '60px 0'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '900',
              color: 'white',
              marginBottom: '50px'
            }}>
              🚀 {t.learnPractice}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '50px'
            }}>
              {[
                { icon: '📚', title: 'Learn', desc: 'Master trading fundamentals' },
                { icon: '🎯', title: 'Practice', desc: 'Risk-free demo trading' },
                { icon: '💰', title: 'Earn', desc: 'Generate consistent profits' },
                { icon: '🎉', title: 'Enjoy', desc: 'Experience financial freedom' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '12px'
                  }}>{item.title}</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '14px'
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowBrokerVerificationModal(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '700',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
              }}
            >
              🚀 Start Trading Now • {t.fromOnly}
            </button>
          </div>
        </div>
      )}

      {/* Broker Verification Modal */}
      {showBrokerVerificationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '20px' }}>🔓 Unlock Unlimited Access</h2>
            <p style={{ marginBottom: '30px', color: '#64748b' }}>
              Open a broker account to get unlimited signal access. {t.fromOnly}!
            </p>

            <div style={{ marginBottom: '30px' }}>
              {['XM Trading', 'AvaTrade', 'IC Markets', 'Exness'].map((broker) => (
                <button
                  key={broker}
                  onClick={() => {
                    window.open('#', '_blank')
                    setShowBrokerVerificationModal(false)
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    margin: '10px 0',
                    padding: '15px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Open Account with {broker}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowBrokerVerificationModal(false)}
              style={{
                background: 'transparent',
                border: '1px solid #e2e8f0',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center !important;
          }
        }

        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}