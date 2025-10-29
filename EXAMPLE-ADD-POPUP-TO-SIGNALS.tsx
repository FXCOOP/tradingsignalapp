/**
 * 📝 EXAMPLE: How to Add Exness Signup Popup to Your Signals Page
 *
 * This shows how to integrate the popup into your existing signals display.
 * Copy the relevant parts to your actual signals page.
 */

'use client'
import { useState } from 'react'
import { ExnessSignupPopup } from '@/components/ExnessSignupPopup'
import { useUser } from '@/contexts/UserContext'

export default function SignalsPageExample() {
  const { user, isPremium } = useUser()

  // Popup state
  const [showExnessPopup, setShowExnessPopup] = useState(false)
  const [selectedSignal, setSelectedSignal] = useState(null)

  // Example signals data
  const signals = [
    {
      id: 1,
      asset: 'Gold (XAU/USD)',
      type: 'BUY',
      current_price: '2358.40',
      entry: '2358',
      target: '2410',
      stop: '2330',
      confidence: 'High',
      timeframe: '4H',
      analysis: 'Strong bullish momentum with break above resistance...'
    },
    {
      id: 2,
      asset: 'Bitcoin',
      type: 'BUY',
      current_price: '95420',
      entry: '95400',
      target: '98500',
      stop: '93000',
      confidence: 'Medium',
      timeframe: 'Daily',
      analysis: 'Consolidating above key support level...'
    },
    {
      id: 3,
      asset: 'EUR/USD',
      type: 'SELL',
      current_price: '1.0842',
      entry: '1.0842',
      target: '1.0780',
      stop: '1.0880',
      confidence: 'High',
      timeframe: '1H',
      analysis: 'Dollar strength continuing, bearish trend...'
    }
  ]

  // Handle "Get Signal" button click
  const handleGetSignal = (signal: any) => {
    // If user doesn't have broker account, show popup
    if (!user?.has_broker_account) {
      setSelectedSignal(signal)
      setShowExnessPopup(true)
    } else {
      // User already has broker, show the full signal
      alert(`Full signal for ${signal.asset} revealed!`)
      // Or navigate to full signal page
    }
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>
        📊 Trading Signals
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '40px' }}>
        Click any signal to get started with Exness
      </p>

      {/* Signals Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        {signals.map((signal) => (
          <div
            key={signal.id}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #e5e7eb',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1e293b'
              }}>
                {signal.asset}
              </div>
              <div style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                background: signal.type === 'BUY'
                  ? 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)'
                  : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                color: signal.type === 'BUY' ? '#15803d' : '#991b1b'
              }}>
                {signal.type}
              </div>
            </div>

            {/* Price */}
            <div style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#3b82f6',
              marginBottom: '20px'
            }}>
              {signal.current_price}
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
                  ENTRY
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>
                  {signal.entry}
                </div>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
                  TARGET
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>
                  {signal.target}
                </div>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
                  STOP
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>
                  {signal.stop}
                </div>
              </div>
            </div>

            {/* Confidence & Timeframe */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '6px 12px',
                background: '#f1f5f9',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#475569'
              }}>
                ⏱️ {signal.timeframe}
              </div>
              <div style={{
                padding: '6px 12px',
                background: '#dcfce7',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#15803d'
              }}>
                ✅ {signal.confidence}
              </div>
            </div>

            {/* Blurred Analysis (if no broker account) */}
            {!user?.has_broker_account ? (
              <div style={{
                position: 'relative',
                marginBottom: '20px'
              }}>
                <div style={{
                  filter: 'blur(5px)',
                  userSelect: 'none',
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {signal.analysis.substring(0, 50)}...
                </div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap'
                }}>
                  🔒 Open Exness Account to Read
                </div>
              </div>
            ) : (
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {signal.analysis}
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={() => handleGetSignal(signal)}
              style={{
                width: '100%',
                padding: '16px',
                background: user?.has_broker_account
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              {user?.has_broker_account ? (
                '✅ View Full Analysis'
              ) : (
                '🚀 Get This Signal Now'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Exness Signup Popup */}
      <ExnessSignupPopup
        isOpen={showExnessPopup}
        onClose={() => setShowExnessPopup(false)}
        signal={selectedSignal}
      />

      {/* Info Banner */}
      {!user?.has_broker_account && (
        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: '3px solid #3b82f6',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎯</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#1e40af',
            marginBottom: '10px'
          }}>
            Open Free Exness Account to Access All Signals
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#1e40af',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            Get unlimited premium signals, expert analysis, and 24/7 support.<br />
            $0 minimum deposit • Instant withdrawals • 0% commission
          </p>
          <button
            onClick={() => setShowExnessPopup(true)}
            style={{
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
            }}
          >
            🚀 Open Free Account
          </button>
        </div>
      )}
    </div>
  )
}
