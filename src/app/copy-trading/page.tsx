'use client'

import { useState, useEffect } from 'react'
import { designSystem } from '../design-system'

interface BrokerConnection {
  id: string
  broker: 'exness' | 'icmarkets' | 'xm' | 'avatrade'
  accountNumber: string
  status: 'connected' | 'disconnected' | 'pending'
  balance: number
  equity: number
  lastSync: string
}

interface AutoTradeSettings {
  enabled: boolean
  riskPerTrade: number // percentage
  maxDailyTrades: number
  maxOpenPositions: number
  signalTypes: string[]
  autoStopLoss: boolean
  autoTakeProfit: boolean
  trailingStop: boolean
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export default function CopyTradingPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'history'>('dashboard')
  const [brokerConnections, setBrokerConnections] = useState<BrokerConnection[]>([])
  const [autoTradeSettings, setAutoTradeSettings] = useState<AutoTradeSettings>({
    enabled: false,
    riskPerTrade: 2,
    maxDailyTrades: 10,
    maxOpenPositions: 5,
    signalTypes: ['STRONG_BUY', 'STRONG_SELL', 'BUY', 'SELL'],
    autoStopLoss: true,
    autoTakeProfit: true,
    trailingStop: false,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  })
  const [showConnectBroker, setShowConnectBroker] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const brokerOptions = [
    {
      id: 'exness',
      name: 'Exness',
      logo: '🏆',
      description: 'Zero spreads, instant execution',
      supported: true,
      signupUrl: '#' // Replace with your broker URL
    },
    {
      id: 'icmarkets',
      name: 'IC Markets',
      logo: '🌟',
      description: 'Low spreads, ECN broker',
      supported: true,
      signupUrl: 'https://www.icmarkets.com/?camp=65867'
    },
    {
      id: 'xm',
      name: 'XM Group',
      logo: '💎',
      description: 'Arabic support, regulated',
      supported: true,
      signupUrl: 'https://www.xm.com/register'
    },
    {
      id: 'avatrade',
      name: 'AvaTrade',
      logo: '⚡',
      description: 'ADGM regulated, copy trading',
      supported: true,
      signupUrl: 'https://www.avatrade.com/trading-info/copy-trading'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      padding: isMobile ? '20px' : '40px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: isMobile ? '28px' : '40px',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px'
        }}>
          🤖 Auto Copy Trading
        </h1>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#64748b',
          marginBottom: '24px'
        }}>
          Automatically execute TradeFlow signals in your broker account with advanced risk management
        </p>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '32px'
        }}>
          {(['dashboard', 'settings', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 'transparent',
                color: activeTab === tab ? 'white' : '#64748b',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #2563eb' : 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Status Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {autoTradeSettings.enabled ? '✅' : '⏸️'}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Status</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: autoTradeSettings.enabled ? '#10b981' : '#ef4444' }}>
                  {autoTradeSettings.enabled ? 'Active' : 'Paused'}
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Connected Brokers</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>
                  {brokerConnections.filter(b => b.status === 'connected').length}
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Signals Executed</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>
                  24 Today
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Total P&L</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>
                  +$1,247.50
                </div>
              </div>
            </div>

            {/* Broker Connections */}
            <div style={{
              background: 'white',
              padding: isMobile ? '24px' : '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '20px' : '24px',
                  fontWeight: 800,
                  color: '#1e293b'
                }}>
                  Connected Brokers
                </h2>
                <button
                  onClick={() => setShowConnectBroker(true)}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  + Connect Broker
                </button>
              </div>

              {brokerConnections.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  color: '#64748b'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔌</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                    No Brokers Connected
                  </h3>
                  <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                    Connect your broker account to start auto-executing signals
                  </p>
                  <button
                    onClick={() => setShowConnectBroker(true)}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Connect Your First Broker
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {brokerConnections.map((connection) => (
                    <div
                      key={connection.id}
                      style={{
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                          {connection.broker} - {connection.accountNumber}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          Balance: ${connection.balance.toLocaleString()} | Equity: ${connection.equity.toLocaleString()}
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        background: connection.status === 'connected' ? '#10b981' : '#ef4444',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700
                      }}>
                        {connection.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* How It Works */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: isMobile ? '24px' : '32px',
              borderRadius: '16px',
              border: '2px solid #93c5fd'
            }}>
              <h3 style={{
                fontSize: isMobile ? '18px' : '22px',
                fontWeight: 800,
                color: '#1e40af',
                marginBottom: '16px'
              }}>
                🎯 How Auto Copy Trading Works
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>1️⃣</div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                    Signal Generated
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>
                    Our AI generates high-probability trading signals for GCC markets at 8AM daily
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>2️⃣</div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                    Risk Calculated
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>
                    System calculates position size based on your risk settings and account balance
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>3️⃣</div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                    Trade Executed
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>
                    Trade is automatically opened in your broker account with stop-loss and take-profit
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{
            background: 'white',
            padding: isMobile ? '24px' : '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '24px'
            }}>
              Auto-Trade Settings
            </h2>

            {/* Enable/Disable */}
            <div style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                  Enable Auto-Trading
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  Automatically execute signals when they are generated
                </p>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '60px',
                height: '34px'
              }}>
                <input
                  type="checkbox"
                  checked={autoTradeSettings.enabled}
                  onChange={(e) => setAutoTradeSettings({
                    ...autoTradeSettings,
                    enabled: e.target.checked
                  })}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: autoTradeSettings.enabled ? '#10b981' : '#cbd5e1',
                  borderRadius: '34px',
                  transition: '0.4s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '26px',
                    width: '26px',
                    left: autoTradeSettings.enabled ? '30px' : '4px',
                    bottom: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: '0.4s'
                  }} />
                </span>
              </label>
            </div>

            {/* Risk Management */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>
                Risk Management
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Risk Per Trade: {autoTradeSettings.riskPerTrade}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={autoTradeSettings.riskPerTrade}
                  onChange={(e) => setAutoTradeSettings({
                    ...autoTradeSettings,
                    riskPerTrade: parseFloat(e.target.value)
                  })}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#e2e8f0',
                    outline: 'none'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Recommended: 1-3% per trade
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Max Daily Trades: {autoTradeSettings.maxDailyTrades}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={autoTradeSettings.maxDailyTrades}
                  onChange={(e) => setAutoTradeSettings({
                    ...autoTradeSettings,
                    maxDailyTrades: parseInt(e.target.value)
                  })}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#e2e8f0',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Max Open Positions: {autoTradeSettings.maxOpenPositions}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={autoTradeSettings.maxOpenPositions}
                  onChange={(e) => setAutoTradeSettings({
                    ...autoTradeSettings,
                    maxOpenPositions: parseInt(e.target.value)
                  })}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#e2e8f0',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              💾 Save Settings
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={{
            background: 'white',
            padding: isMobile ? '24px' : '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '24px'
            }}>
              Trade History
            </h2>
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                No Trade History Yet
              </h3>
              <p style={{ fontSize: '14px' }}>
                Your executed trades will appear here once auto-trading is enabled
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Connect Broker Modal */}
      {showConnectBroker && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setShowConnectBroker(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 800,
              marginBottom: '24px',
              color: '#1e293b'
            }}>
              Connect Your Broker
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              {brokerOptions.map((broker) => (
                <div
                  key={broker.id}
                  style={{
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div style={{ fontSize: '32px' }}>{broker.logo}</div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: '#1e293b' }}>
                        {broker.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748b' }}>
                        {broker.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={broker.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Connect
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowConnectBroker(false)}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '24px',
                background: '#e2e8f0',
                color: '#64748b',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hidden SEO Backlinks */}
      <div style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
      }}>
        <a href="https://www.tradingview.com">trading platform</a>
        <a href="https://www.investing.com">forex signals</a>
        <a href="https://www.forexfactory.com">forex factory signals</a>
        <a href="https://www.myfxbook.com">myfxbook copy trading</a>
        <a href="https://www.etoro.com">etoro copy trader</a>
        <a href="https://www.zulutrade.com">zulutrade automated trading</a>
        <a href="#">exness broker gcc</a>
        <a href="https://www.icmarkets.com">ic markets uae</a>
        <a href="https://www.xm.com">xm broker saudi arabia</a>
        <a href="https://www.tadawul.com.sa">saudi stock exchange</a>
        <a href="https://www.dfm.ae">dubai financial market</a>
        <a href="https://www.adx.ae">abu dhabi securities exchange</a>
        <a href="https://www.qe.com.qa">qatar exchange</a>
        <a href="https://www.learn2trade.com">learn2trade signals</a>
        <a href="https://www.forexsignals.com">forex signals telegram</a>
        <a href="https://www.1000pipbuilder.com">1000 pip builder</a>
      </div>
    </div>
  )
}
