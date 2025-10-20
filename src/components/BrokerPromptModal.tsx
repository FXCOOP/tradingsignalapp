'use client'
import { useState } from 'react'

interface BrokerPromptModalProps {
  isOpen: boolean
  onClose: () => void
  contentType: 'signals' | 'articles'
  remaining: number
}

export function BrokerPromptModal({
  isOpen,
  onClose,
  contentType,
  remaining
}: BrokerPromptModalProps) {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null)

  if (!isOpen) return null

  const brokers = [
    {
      name: 'Exness',
      logo: '🏦',
      minDeposit: '$10',
      benefits: 'Instant verification, Low spreads, Fast withdrawals',
      link: 'https://one.exnesstrack.net/a/c_8f0nxidtbt'
    }
  ]

  // Auto-select Exness (only option)
  if (!selectedBroker) {
    setSelectedBroker('Exness')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 999998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'authModalFadeIn 0.3s ease-in-out'
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '48px 40px',
            maxWidth: '600px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            animation: 'authModalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
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
              e.currentTarget.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {remaining === 0 ? '🔒' : '⚠️'}
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              lineHeight: '1.2'
            }}>
              {remaining === 0 ? 'Free Limit Reached!' : `${remaining} ${contentType === 'signals' ? 'Signals' : 'Articles'} Remaining`}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              {remaining === 0
                ? `You've used all 3 free ${contentType}. Unlock unlimited access!`
                : `You have ${remaining} free ${contentType} left. Unlock unlimited access now!`
              }
            </p>
          </div>

          {/* Benefits */}
          <div style={{
            background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)',
            border: '2px solid #86efac',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#15803d',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎁 Get UNLIMITED Access With Just $10 Minimum Deposit:
            </h3>
            <ul style={{
              fontSize: '16px',
              color: '#166534',
              lineHeight: '1.8',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '8px' }}><strong>🚀 Unlimited Premium Trading Signals</strong></li>
              <li style={{ marginBottom: '8px' }}><strong>📊 Full Market Analysis & Reports</strong></li>
              <li style={{ marginBottom: '8px' }}><strong>📰 Unlimited Financial News Articles</strong></li>
              <li style={{ marginBottom: '8px' }}><strong>🎓 Complete Trading Education Platform</strong></li>
              <li><strong>💼 Copy Trading Features & Signal Alerts</strong></li>
            </ul>
          </div>

          {/* Broker Selection */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Choose Your Broker (Just $10 minimum):
            </h3>

            {brokers.map((broker) => (
              <div
                key={broker.name}
                onClick={() => setSelectedBroker(broker.name)}
                style={{
                  background: selectedBroker === broker.name
                    ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                    : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  border: `2px solid ${selectedBroker === broker.name ? '#3b82f6' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
                onMouseEnter={(e) => {
                  if (selectedBroker !== broker.name) {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBroker !== broker.name) {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
              >
                <div style={{ fontSize: '48px' }}>{broker.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    {broker.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    Minimum Deposit: <strong>{broker.minDeposit}</strong>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#9ca3af'
                  }}>
                    {broker.benefits}
                  </div>
                </div>
                {selectedBroker === broker.name && (
                  <div style={{
                    fontSize: '24px',
                    color: '#3b82f6'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={async () => {
              if (selectedBroker) {
                const broker = brokers.find(b => b.name === selectedBroker)
                if (broker) {
                  // Track click
                  try {
                    const token = localStorage.getItem('auth_token')
                    await fetch('/api/track/exness-click', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        partner_id: 'c_8f0nxidtbt',
                        click_url: broker.link
                      })
                    })
                  } catch (error) {
                    console.error('Failed to track click:', error)
                  }

                  // Open Exness
                  window.open(broker.link, '_blank')
                }
              }
            }}
            disabled={!selectedBroker}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              background: selectedBroker
                ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)'
                : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: selectedBroker ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: selectedBroker
                ? '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                : 'none',
              opacity: selectedBroker ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (selectedBroker) {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(59, 130, 246, 0.6)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBroker) {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
              }
            }}
          >
            🚀 Open {selectedBroker || 'Broker'} Account & Get Unlimited Access
          </button>

          {/* Later Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            I'll do this later
          </button>
        </div>
      </div>
    </>
  )
}
