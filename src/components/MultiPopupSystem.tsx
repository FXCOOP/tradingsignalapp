'use client'

import { useState, useEffect } from 'react'

interface MultiPopupSystemProps {
  onOpenBrokerAccount: () => void
}

export function MultiPopupSystem({ onOpenBrokerAccount }: MultiPopupSystemProps) {
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [showNextStep, setShowNextStep] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [quickStartClosed, setQuickStartClosed] = useState(false)
  const [quickStartClosedTime, setQuickStartClosedTime] = useState<number | null>(null)

  // Countdown timer state - using seconds for smooth countdown
  const [timeRemaining, setTimeRemaining] = useState(9 * 3600 + 47 * 60) // 9 hours 47 minutes in seconds

  // Countdown timer logic - updates every second
  useEffect(() => {
    if (showCountdown && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1))
      }, 1000) // Update every second

      return () => clearInterval(timer)
    }
  }, [showCountdown, timeRemaining])

  // Calculate hours and minutes from seconds
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  // Initial popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuickStart(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Show countdown banner after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCountdown(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Show bottom bar on mobile after 3 seconds
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowBottomBar(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Track scroll and time after QuickStart is closed
  useEffect(() => {
    if (quickStartClosedTime) {
      const timer = setTimeout(() => {
        setShowNextStep(true)
      }, 50000) // 50 seconds after closing QuickStart

      return () => clearTimeout(timer)
    }
  }, [quickStartClosedTime])

  const handleQuickStartClose = () => {
    setShowQuickStart(false)
    setQuickStartClosed(true)
    setQuickStartClosedTime(Date.now())
  }

  const handleGetStarted = () => {
    setShowQuickStart(false)
    onOpenBrokerAccount()
  }

  const handleNextStepCTA = () => {
    setShowNextStep(false)
    onOpenBrokerAccount()
  }

  return (
    <>
      {/* 1. Quick Start Popup (Entry Intent - 2 seconds) */}
      {showQuickStart && (
        <div
          onClick={handleQuickStartClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px 40px',
              maxWidth: '580px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={handleQuickStartClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#6b7280',
                transition: 'all 0.2s ease',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ef4444'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
                e.currentTarget.style.color = '#6b7280'
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>
                Start Trading in 3 Easy Steps
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '1.6'
              }}>
                Join thousands of traders who started their journey with us.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              {[
                { number: '1', title: 'Open Account (2 min)', description: 'Just $10 minimum • Instant verification' },
                { number: '2', title: 'Get Free Signals', description: 'Access unlimited trading signals & analysis' },
                { number: '3', title: 'Start Trading', description: 'Trade your first position in 5 minutes' }
              ].map((step) => (
                <div
                  key={step.number}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '20px',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    border: '2px solid #bae6fd',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                    flexShrink: 0
                  }}>
                    {step.number}
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGetStarted}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(59, 130, 246, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
              }}
            >
              ✨ Get Started Now (2 Min Setup)
            </button>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              12,547 traders started this way
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '1px solid #fcd34d',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '12px',
              color: '#92400e',
              lineHeight: '1.5'
            }}>
              ⚠️ <strong>CFDs are complex instruments.</strong> Consider your risk tolerance before trading.
            </div>
          </div>
        </div>
      )}

      {/* 2. Next Step Popup (50 seconds after closing Quick Start) */}
      {showNextStep && (
        <div
          onClick={() => setShowNextStep(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px 40px',
              maxWidth: '580px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <button
              onClick={() => setShowNextStep(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#6b7280',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>
                Ready to Apply What You Learned?
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '1.6'
              }}>
                Turn knowledge into action. Get step-by-step implementation guides + practice signals.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              border: '2px solid #86efac',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#15803d', marginBottom: '16px' }}>
                🚀 Your Next Steps:
              </h3>
              <div style={{ fontSize: '16px', color: '#166534', lineHeight: '2' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>1</strong> Open demo account (practice risk-free)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>2</strong> Follow our practice signals (20 signals/week)
                </div>
                <div>
                  <strong>3</strong> Go live when ready ($10 minimum)
                </div>
              </div>
            </div>

            <button
              onClick={handleNextStepCTA}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
              }}
            >
              🎯 Start Practicing Now (Free Demo)
            </button>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              92% of successful traders started with demo
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '1px solid #fcd34d',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '12px',
              color: '#92400e',
              lineHeight: '1.5'
            }}>
              ⚠️ Demo results may differ from live trading. Always start small.
            </div>
          </div>
        </div>
      )}

      {/* 3. Countdown Timer Banner (Top) */}
      {showCountdown && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 999998,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideDown 0.5s ease-out',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <div>
              <strong style={{ fontSize: '16px' }}>FLASH SALE: Premium Access for $10</strong>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Offer ends in:</div>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '700',
              fontSize: '18px',
              letterSpacing: '2px'
            }}>
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          <button
            onClick={onOpenBrokerAccount}
            style={{
              background: 'white',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Claim Now →
          </button>
          <button
            onClick={() => setShowCountdown(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px 8px',
              marginLeft: 'auto'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Bottom Bar (Mobile Only) */}
      {showBottomBar && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          color: 'white',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 999998,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideUp 0.5s ease-out',
          gap: '12px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
              Ready to start trading?
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Join 12,547+ traders • Just $10 minimum
            </div>
          </div>
          <button
            onClick={onOpenBrokerAccount}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Open Account
          </button>
          <button
            onClick={() => setShowBottomBar(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}