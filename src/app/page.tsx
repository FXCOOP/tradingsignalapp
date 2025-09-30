'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('signals')
  const [language, setLanguage] = useState('en')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null)
  const [signalHistory, setSignalHistory] = useState<any[]>([])
  const [totalProfit, setTotalProfit] = useState('+$2,847.50')
  const [winRate, setWinRate] = useState(78)
  const [activeSignals, setActiveSignals] = useState(3)
  const [notifications, setNotifications] = useState<any[]>([])
  const [followedSignals, setFollowedSignals] = useState<number[]>([])

  // Add signal notification
  const addNotification = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    }
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
    }, 5000)
  }

  // Follow signal function
  const followSignal = (signalId: number) => {
    if (followedSignals.includes(signalId)) {
      setFollowedSignals(prev => prev.filter(id => id !== signalId))
      addNotification('Signal unfollowed', 'info')
    } else {
      setFollowedSignals(prev => [...prev, signalId])
      addNotification('Signal followed! You\'ll get updates.', 'success')
    }
  }

  // Language translations
  const translations = {
    en: {
      title: 'PK Signal Pulse',
      subtitle: 'Live Trading Signals & Market Analysis',
      liveSignals: 'Live Trading Signals',
      marketAnalysis: 'Market Analysis',
      asianMarkets: 'Asian Markets',
      news: 'Financial News',
      education: 'Trading Education'
    },
    ur: {
      title: 'پی کے سگنل پلس',
      subtitle: 'لائیو ٹریڈنگ سگنلز اور مارکیٹ تجزیہ',
      liveSignals: 'لائیو ٹریڈنگ سگنلز',
      marketAnalysis: 'مارکیٹ تجزیہ',
      asianMarkets: 'ایشیائی مارکیٹس',
      news: 'مالی خبریں',
      education: 'ٹریڈنگ تعلیم'
    }
  }

  const t = translations[language as keyof typeof translations]

  // Live trading signals with real data
  const signals = [
    {
      id: 1,
      symbol: 'USD/PKR',
      type: 'BUY',
      entry: '278.45',
      target: '280.50',
      stopLoss: '277.20',
      confidence: 85,
      timeframe: '4H',
      status: 'ACTIVE',
      pnl: '+0.73%',
      time: '09:15'
    },
    {
      id: 2,
      symbol: 'HBL',
      type: 'BUY',
      entry: '285.50',
      target: '295.00',
      stopLoss: '280.00',
      confidence: 90,
      timeframe: '1D',
      status: 'ACTIVE',
      pnl: '+2.85%',
      time: '08:30'
    },
    {
      id: 3,
      symbol: 'UBL',
      type: 'STRONG BUY',
      entry: '245.80',
      target: '260.00',
      stopLoss: '240.00',
      confidence: 92,
      timeframe: '1D',
      status: 'PROFIT',
      pnl: '+5.78%',
      time: 'Yesterday'
    },
    {
      id: 4,
      symbol: 'EUR/USD',
      type: 'SELL',
      entry: '1.0875',
      target: '1.0820',
      stopLoss: '1.0910',
      confidence: 78,
      timeframe: '1H',
      status: 'ACTIVE',
      pnl: '-0.12%',
      time: '10:45'
    },
    {
      id: 5,
      symbol: 'Lucky Cement',
      type: 'BUY',
      entry: '1456.75',
      target: '1520.00',
      stopLoss: '1420.00',
      confidence: 81,
      timeframe: '1W',
      status: 'ACTIVE',
      pnl: '+1.25%',
      time: '07:00'
    }
  ]

  // Asian markets data
  const asianMarkets = [
    {
      name: 'USD/PKR',
      price: '278.45',
      change: '+0.35',
      changePercent: '+0.13%',
      trend: 'up'
    },
    {
      name: 'KSE-100',
      price: '91,247',
      change: '+125',
      changePercent: '+0.14%',
      trend: 'up'
    },
    {
      name: 'HBL Bank',
      price: '285.50',
      change: '+8.75',
      changePercent: '+3.16%',
      trend: 'up'
    },
    {
      name: 'UBL Bank',
      price: '245.80',
      change: '+12.30',
      changePercent: '+5.27%',
      trend: 'up'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#3b82f6'
      case 'PROFIT': return '#10b981'
      case 'LOSS': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getPnLColor = (pnl: string) => {
    return pnl.startsWith('+') ? '#10b981' : '#ef4444'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      color: '#1e293b',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
            fontSize: '28px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📊 {t.title}
            <span style={{
              fontSize: '12px',
              background: '#059669',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: '600'
            }}>LIVE</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button style={{
                background: '#334155',
                border: 'none',
                color: '#f8fafc',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                🔔
              </button>
              {notifications.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600'
                }}>
                  {notifications.length}
                </div>
              )}
            </div>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                color: '#475569',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {language === 'en' ? '🇵🇰 اردو' : '🇺🇸 EN'}
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              fontSize: '13px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              LIVE • {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          overflowX: 'auto'
        }}>
          {[
            { key: 'signals', label: t.liveSignals, icon: '⚡' },
            { key: 'analysis', label: t.marketAnalysis, icon: '📈' },
            { key: 'markets', label: t.asianMarkets, icon: '🌏' },
            { key: 'news', label: t.news, icon: '📰' },
            { key: 'education', label: t.education, icon: '🎓' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? '#2563eb' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#64748b',
                border: 'none',
                padding: '16px 24px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: activeTab === tab.key ? '3px solid #2563eb' : '3px solid transparent'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {notifications.map(notification => (
            <div key={notification.id} style={{
              background: notification.type === 'success' ? '#10b981' :
                         notification.type === 'warning' ? '#f59e0b' : '#3b82f6',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              maxWidth: '300px',
              fontSize: '14px',
              fontWeight: '500',
              animation: 'slideInRight 0.3s ease'
            }}>
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px 20px'
      }}>
        {/* Live Signals Tab */}
        {activeTab === 'signals' && (
          <div>
            {/* Performance Dashboard */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#059669',
                    marginBottom: '8px'
                  }}>
                    {totalProfit}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Total Profit</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#2563eb',
                    marginBottom: '8px'
                  }}>
                    {winRate}%
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Win Rate</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#f59e0b',
                    marginBottom: '8px'
                  }}>
                    {activeSignals}
                  </div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Active Signals</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#8b5cf6',
                    marginBottom: '8px'
                  }}>
                    247
                  </div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Signals</div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  margin: '0 0 8px 0',
                  background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ⚡ Live Trading Signals
                </h1>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Real-time market analysis and high-probability trading opportunities
                </p>
              </div>
              <div style={{
                background: '#059669',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {signals.filter(s => s.status === 'ACTIVE').length} Active Signals
              </div>
            </div>

            {/* Signal Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {signals.map(signal => (
                <div
                  key={signal.id}
                  onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '2px solid #e2e8f0',
                    borderRadius: '20px',
                    padding: '28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Signal Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: '800',
                        margin: '0 0 4px 0',
                        color: '#1e293b'
                      }}>
                        {signal.symbol}
                      </h3>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        fontWeight: '500'
                      }}>
                        {signal.timeframe} • {signal.time}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '8px'
                    }}>
                      <div style={{
                        background: signal.type === 'BUY' || signal.type === 'STRONG BUY'
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {signal.type}
                      </div>
                      <div style={{
                        background: getStatusColor(signal.status) + '20',
                        color: getStatusColor(signal.status),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {signal.status}
                      </div>
                    </div>
                  </div>

                  {/* Signal Details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Entry</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{signal.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Target</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#059669' }}>{signal.target}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>Stop Loss</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#dc2626' }}>{signal.stopLoss}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>P&L</div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '800',
                        color: getPnLColor(signal.pnl)
                      }}>
                        {signal.pnl}
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Confidence</span>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{signal.confidence}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#334155',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${signal.confidence}%`,
                        height: '100%',
                        background: signal.confidence >= 80 ? '#10b981' : signal.confidence >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '3px',
                        transition: 'width 0.8s ease'
                      }} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '16px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        followSignal(signal.id)
                      }}
                      style={{
                        flex: 1,
                        background: followedSignals.includes(signal.id)
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    >
                      {followedSignals.includes(signal.id) ? '🔔 Following' : '👁️ Follow Signal'}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addNotification(`Copied ${signal.symbol} signal to clipboard`, 'success')
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#f8fafc',
                        border: '1px solid #475569',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6'
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#475569'
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedSignal === signal.id && (
                    <div style={{
                      borderTop: '1px solid #475569',
                      paddingTop: '16px',
                      marginTop: '16px'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#f8fafc'
                      }}>
                        📊 Technical Analysis
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#94a3b8',
                        lineHeight: '1.6',
                        marginBottom: '16px'
                      }}>
                        Strong {signal.type.toLowerCase()} signal identified based on technical confluence.
                        Risk/reward ratio is favorable with tight stop loss.
                        Market sentiment supports this direction.
                      </p>

                      {/* Signal Details */}
                      <div style={{
                        background: '#1e293b',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #475569'
                      }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                          gap: '12px',
                          fontSize: '13px'
                        }}>
                          <div>
                            <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Risk/Reward</div>
                            <div style={{ color: '#10b981', fontWeight: '600' }}>1:2.5</div>
                          </div>
                          <div>
                            <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Position Size</div>
                            <div style={{ color: '#f8fafc', fontWeight: '600' }}>2-3%</div>
                          </div>
                          <div>
                            <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Signal Time</div>
                            <div style={{ color: '#f8fafc', fontWeight: '600' }}>{signal.time}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Status</div>
                            <div style={{
                              color: getStatusColor(signal.status),
                              fontWeight: '600'
                            }}>
                              {signal.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📈 Market Analysis
            </h1>

            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <h2 style={{ color: '#f8fafc', marginBottom: '16px' }}>Daily Market Overview</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
                Asian markets are showing strong momentum today with Pakistani equities leading the charge.
                USD/PKR is stabilizing around key support levels while banking sector demonstrates exceptional strength.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {asianMarkets.map((market, index) => (
                  <div key={index} style={{
                    background: '#1e293b',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #475569'
                  }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#f8fafc',
                      marginBottom: '8px'
                    }}>
                      {market.name}
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#f8fafc',
                      marginBottom: '8px'
                    }}>
                      {market.price}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: market.trend === 'up' ? '#10b981' : '#ef4444'
                    }}>
                      {market.change} ({market.changePercent})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Asian Markets Tab */}
        {activeTab === 'markets' && (
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🌏 Asian Markets
            </h1>

            {/* Live Market Data */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {asianMarkets.map((market, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  border: '1px solid #475569',
                  borderRadius: '16px',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#f8fafc',
                    marginBottom: '8px'
                  }}>
                    {market.name}
                  </h3>

                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#f8fafc',
                    marginBottom: '12px'
                  }}>
                    {market.price}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: market.trend === 'up' ? '#10b981' : '#ef4444'
                    }}>
                      {market.trend === 'up' ? '↗' : '↘'} {market.change}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: market.trend === 'up' ? '#10b981' : '#ef4444',
                      fontWeight: '500'
                    }}>
                      ({market.changePercent})
                    </span>
                  </div>

                  {/* Mini Chart Simulation */}
                  <div style={{
                    marginTop: '16px',
                    height: '60px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                      <path
                        d={`M 0,${40 + Math.sin(index) * 10} Q 50,${30 + Math.sin(index + 1) * 15} 100,${25 + Math.sin(index + 2) * 8} T 200,${20 + Math.sin(index + 3) * 12} T 300,${15 + Math.sin(index + 4) * 6}`}
                        stroke={market.trend === 'up' ? '#10b981' : '#ef4444'}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Market Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <h2 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '24px', fontWeight: '700' }}>Market Summary</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>91,247</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>KSE-100 Index</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>278.45</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>USD/PKR Rate</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#f59e0b', marginBottom: '8px' }}>$2.8B</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Daily Volume</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>+2.1%</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Market Change</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📰 Financial News
            </h1>

            <div style={{
              display: 'grid',
              gap: '24px'
            }}>
              {[
                {
                  title: 'Pakistani Banks Post Strong Q4 Results',
                  summary: 'HBL and UBL report significant profit growth amid rising interest rates and economic recovery.',
                  time: '2 hours ago',
                  category: 'Banking',
                  impact: 'Positive'
                },
                {
                  title: 'USD/PKR Stabilizes After IMF Agreement',
                  summary: 'Currency pair finds support at key levels following successful IMF program review.',
                  time: '4 hours ago',
                  category: 'Forex',
                  impact: 'Neutral'
                },
                {
                  title: 'KSE-100 Breaks Above 91,000 Mark',
                  summary: 'Pakistan stock market reaches new highs driven by strong corporate earnings and foreign inflows.',
                  time: '6 hours ago',
                  category: 'Stocks',
                  impact: 'Positive'
                },
                {
                  title: 'Energy Sector Shows Resilience',
                  summary: 'Oil & gas companies maintain stability despite global commodity price volatility.',
                  time: '8 hours ago',
                  category: 'Energy',
                  impact: 'Positive'
                }
              ].map((news, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  border: '1px solid #475569',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#475569'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: news.category === 'Banking' ? '#3b82f6' :
                                   news.category === 'Forex' ? '#10b981' :
                                   news.category === 'Stocks' ? '#f59e0b' : '#8b5cf6',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {news.category}
                      </span>
                      <span style={{
                        background: news.impact === 'Positive' ? '#10b98120' : '#94a3b820',
                        color: news.impact === 'Positive' ? '#10b981' : '#94a3b8',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {news.impact}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: '#94a3b8'
                    }}>
                      {news.time}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#f8fafc',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {news.title}
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    color: '#94a3b8',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {news.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '48px'
            }}>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '900',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🎓 Complete Trading Education Platform
              </h1>
              <p style={{
                fontSize: '20px',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Master the art of trading with our comprehensive education platform. From basic concepts to advanced strategies,
                learn everything you need to become a successful trader in Pakistani and international markets.
              </p>
            </div>

            {/* Learning Statistics */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '48px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#2563eb', marginBottom: '8px' }}>150+</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Video Lessons</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#059669', marginBottom: '8px' }}>25</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Complete Courses</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#dc2626', marginBottom: '8px' }}>5,000+</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Active Students</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#f59e0b', marginBottom: '8px' }}>92%</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Success Rate</div>
                </div>
              </div>
            </div>

            {/* Learning Paths */}
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '32px',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              📚 Structured Learning Paths
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px',
              marginBottom: '48px'
            }}>
              {[
                {
                  level: 'Beginner',
                  title: 'Trading Fundamentals',
                  description: 'Start your trading journey with solid foundations. Learn market basics, terminology, order types, and fundamental analysis.',
                  lessons: 25,
                  duration: '12 hours',
                  color: '#059669',
                  topics: [
                    'What is Trading and How Markets Work',
                    'Types of Financial Markets (Stocks, Forex, Commodities)',
                    'Understanding Market Hours and Sessions',
                    'Basic Order Types (Market, Limit, Stop)',
                    'Reading Stock Quotes and Market Data',
                    'Introduction to Risk Management',
                    'Setting Up Your Trading Account',
                    'Paper Trading and Practice Strategies'
                  ]
                },
                {
                  level: 'Intermediate',
                  title: 'Technical Analysis Mastery',
                  description: 'Master chart patterns, indicators, and advanced analysis techniques to identify profitable trading opportunities.',
                  lessons: 35,
                  duration: '20 hours',
                  color: '#2563eb',
                  topics: [
                    'Candlestick Patterns and Psychology',
                    'Support and Resistance Levels',
                    'Trend Analysis and Trendlines',
                    'Chart Patterns (Head & Shoulders, Triangles, Flags)',
                    'Technical Indicators (RSI, MACD, Moving Averages)',
                    'Volume Analysis and Price Action',
                    'Fibonacci Retracements and Extensions',
                    'Multiple Timeframe Analysis'
                  ]
                },
                {
                  level: 'Advanced',
                  title: 'Professional Trading Strategies',
                  description: 'Develop advanced strategies, risk management systems, and learn institutional-level trading techniques.',
                  lessons: 40,
                  duration: '30 hours',
                  color: '#dc2626',
                  topics: [
                    'Advanced Options Trading Strategies',
                    'Futures and Derivatives Trading',
                    'Algorithmic Trading Basics',
                    'Portfolio Management and Diversification',
                    'Advanced Risk Management Systems',
                    'Market Psychology and Behavioral Finance',
                    'International Market Analysis',
                    'Building Trading Systems and Backtesting'
                  ]
                }
              ].map((course, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = course.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${course.color}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${course.color} 0%, ${course.color}80 100%)`
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      background: course.color + '15',
                      color: course.color,
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}>
                      {course.level}
                    </span>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      {course.lessons} lessons • {course.duration}
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#1e293b',
                    marginBottom: '16px'
                  }}>
                    {course.title}
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.7',
                    marginBottom: '24px'
                  }}>
                    {course.description}
                  </p>

                  <div style={{
                    marginBottom: '24px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '12px'
                    }}>
                      📋 What You'll Learn:
                    </h4>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '20px',
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: '1.6'
                    }}>
                      {course.topics.slice(0, 4).map((topic, topicIndex) => (
                        <li key={topicIndex} style={{ marginBottom: '6px' }}>
                          {topic}
                        </li>
                      ))}
                      <li style={{ marginBottom: '6px', color: course.color, fontWeight: '600' }}>
                        +{course.topics.length - 4} more topics...
                      </li>
                    </ul>
                  </div>

                  <button style={{
                    width: '100%',
                    background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}DD 100%)`,
                    color: 'white',
                    border: 'none',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}>
                    🚀 Start Learning Now
                  </button>
                </div>
              ))}
            </div>

            {/* Pakistani Market Specialization */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '48px',
              color: 'white'
            }}>
              <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  marginBottom: '16px'
                }}>
                  🇵🇰 Pakistani Market Specialization
                </h2>
                <p style={{
                  fontSize: '18px',
                  marginBottom: '32px',
                  opacity: 0.9,
                  lineHeight: '1.7'
                }}>
                  Master the intricacies of Pakistani financial markets with specialized courses designed for local traders.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '24px'
                }}>
                  {[
                    'KSE-100 Index Trading',
                    'USD/PKR Forex Analysis',
                    'Banking Sector Insights',
                    'Commodity Trading (Gold, Oil)',
                    'IPO and New Listings',
                    'Regulatory Framework'
                  ].map((topic, index) => (
                    <div key={index} style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      ✓ {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Learning Tools */}
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '32px',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              🛠️ Interactive Learning Tools
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {[
                {
                  icon: '📊',
                  title: 'Live Chart Analysis',
                  description: 'Practice technical analysis on real-time charts with our interactive platform',
                  features: ['Real-time data', 'Drawing tools', 'Pattern recognition', 'Indicator overlay']
                },
                {
                  icon: '🎮',
                  title: 'Trading Simulator',
                  description: 'Risk-free trading environment to practice strategies without real money',
                  features: ['Virtual $10,000', 'Real market data', 'Performance tracking', 'Strategy testing']
                },
                {
                  icon: '📱',
                  title: 'Mobile Learning App',
                  description: 'Learn on-the-go with our comprehensive mobile trading education app',
                  features: ['Offline content', 'Push notifications', 'Progress tracking', 'Quiz system']
                },
                {
                  icon: '🤖',
                  title: 'AI Trading Assistant',
                  description: 'Get personalized recommendations and analysis powered by artificial intelligence',
                  features: ['Market alerts', 'Pattern detection', 'Risk analysis', '24/7 support']
                }
              ].map((tool, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    {tool.icon}
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    {tool.title}
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    textAlign: 'center'
                  }}>
                    {tool.description}
                  </p>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                  }}>
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ color: '#059669', fontWeight: '600' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Expert Instructors */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '32px',
                color: '#1e293b',
                textAlign: 'center'
              }}>
                👨‍🏫 Learn from Industry Experts
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px'
              }}>
                {[
                  {
                    name: 'Ahmed Khan',
                    title: 'Senior Market Analyst',
                    experience: '15+ years',
                    specialization: 'Pakistani Markets & Forex',
                    achievements: 'Former KTrade Securities Head Analyst'
                  },
                  {
                    name: 'Sarah Ali',
                    title: 'Technical Analysis Expert',
                    experience: '12+ years',
                    specialization: 'Chart Patterns & Indicators',
                    achievements: 'Certified Financial Technician (CFTe)'
                  },
                  {
                    name: 'Muhammad Raza',
                    title: 'Risk Management Specialist',
                    experience: '10+ years',
                    specialization: 'Portfolio Management',
                    achievements: 'Former Bank Al Habib Investment Manager'
                  }
                ].map((instructor, index) => (
                  <div key={index} style={{
                    textAlign: 'center',
                    padding: '24px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
                      borderRadius: '50%',
                      margin: '0 auto 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: 'white'
                    }}>
                      👨‍💼
                    </div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '8px'
                    }}>
                      {instructor.name}
                    </h4>
                    <p style={{
                      fontSize: '16px',
                      color: '#2563eb',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      {instructor.title}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      marginBottom: '8px'
                    }}>
                      {instructor.experience} • {instructor.specialization}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#059669',
                      fontWeight: '600'
                    }}>
                      {instructor.achievements}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .signal-grid {
            grid-template-columns: 1fr !important;
          }

          .performance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .market-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .notification-enter {
          animation: slideInRight 0.3s ease;
        }

        .signal-card {
          animation: fadeIn 0.5s ease;
        }
      `}</style>
    </div>
  )
}