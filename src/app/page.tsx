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
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [hasExnessAccount, setHasExnessAccount] = useState<boolean>(false)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  const [dailyContent, setDailyContent] = useState<any>(null)

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

  // Access course function (for Exness subscribers)
  const accessCourse = (courseId: number, courseName: string) => {
    if (!hasExnessAccount) {
      addNotification('Open an Exness account to access free education!', 'warning')
      return
    }
    addNotification(`Accessing ${courseName} - Free for Exness clients!`, 'success')
  }

  // Verify Exness account
  const verifyExnessAccount = () => {
    // This would integrate with Exness API
    setHasExnessAccount(true)
    addNotification('✅ Exness account verified! Free education unlocked.', 'success')
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
                📰 Financial News & Market Analysis
              </h1>
              <p style={{
                fontSize: '20px',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Stay informed with comprehensive financial news, market analysis, and expert insights
                covering Pakistani and international markets.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '32px'
            }}>
              {[
                {
                  id: 1,
                  title: 'Pakistani Banking Sector Posts Record Q4 Results Amid Economic Recovery',
                  summary: 'Major Pakistani banks including HBL, UBL, and MCB report exceptional quarterly results driven by expanding loan portfolios and improved asset quality.',
                  fullArticle: `Pakistan's banking sector has delivered its strongest quarterly performance in over five years, with major banks reporting significant profit growth and improved operational metrics. The sector's robust performance comes amid a broader economic recovery and increased business confidence.

**Habib Bank Limited (HBL)** reported a 28% year-over-year increase in net profits to PKR 41.2 billion, driven by a 15% growth in advances and a notable improvement in net interest margin to 4.8%. The bank's CEO, Muhammad Aurangzeb, attributed the strong performance to "strategic focus on digital transformation and enhanced customer service delivery."

**United Bank Limited (UBL)** followed with equally impressive results, posting a 32% jump in net profits to PKR 38.7 billion. The bank's advances grew by 18%, while its cost-to-income ratio improved to 42.1%, reflecting enhanced operational efficiency. UBL's management highlighted significant progress in their retail banking division, with consumer loans growing by 25%.

**MCB Bank Limited** rounded out the strong sector performance with a 22% increase in net profits to PKR 35.8 billion. The bank's deposit base expanded by 16%, while maintaining a healthy capital adequacy ratio of 18.2%, well above regulatory requirements.

**Key Performance Drivers:**
- Rising interest rate environment boosting net interest margins
- Improved economic sentiment leading to increased lending demand
- Enhanced digital banking adoption reducing operational costs
- Better asset quality with non-performing loans declining sector-wide

**Market Impact Analysis:**
The banking sector's strong performance has provided significant support to the KSE-100 index, with banking stocks contributing approximately 340 points to the index's recent gains. Foreign institutional investors have shown renewed interest in Pakistani banking stocks, with net inflows of $45 million recorded in the banking sector during Q4.

**Future Outlook:**
Banking analysts remain optimistic about the sector's prospects, citing several positive factors including continued economic recovery, potential for further interest rate normalization, and ongoing digitalization efforts. However, they also note risks related to global economic uncertainties and potential policy changes.

The State Bank of Pakistan's latest Financial Stability Review indicates that the banking sector remains well-capitalized and liquid, providing a solid foundation for continued growth in 2024.`,
                  time: '2 hours ago',
                  category: 'Banking',
                  impact: 'Positive',
                  author: 'Fatima Sheikh',
                  readTime: '5 min read',
                  tags: ['HBL', 'UBL', 'MCB', 'Banking Sector', 'Q4 Results'],
                  imageDescription: 'Pakistani bank headquarters with financial charts overlay'
                },
                {
                  id: 2,
                  title: 'USD/PKR Exchange Rate Stabilizes Following Successful IMF Program Review',
                  summary: 'The Pakistani rupee finds stability against the US dollar after the International Monetary Fund completes its quarterly review, providing market confidence.',
                  fullArticle: `The USD/PKR exchange rate has stabilized in the 278-280 range following the successful completion of Pakistan's IMF program review, bringing much-needed stability to the currency markets after months of volatility.

**IMF Program Progress:**
The International Monetary Fund's Executive Board completed the second quarterly review of Pakistan's $3 billion Stand-By Arrangement, approving the release of approximately $700 million. This brings total disbursements under the program to $1.9 billion, providing crucial support to Pakistan's foreign exchange reserves.

**Key Economic Indicators:**
- Foreign exchange reserves have increased to $8.2 billion, up from $4.3 billion at the program's inception
- Current account deficit has narrowed to 0.8% of GDP, down from 4.6% in the previous year
- Inflation has begun to moderate, falling to 24.5% in December from its peak of 38% in May
- Tax collection has exceeded targets, with FBR revenues growing 30% year-over-year

**Market Dynamics:**
The currency's stabilization has been supported by several factors:

1. **Improved Investor Confidence:** The successful IMF review has restored international investor confidence in Pakistan's economic management and reform agenda.

2. **Enhanced Reserves Position:** The central bank's foreign exchange reserves have reached their highest level in over 18 months, providing adequate import cover and market stability.

3. **Remittance Recovery:** Overseas Pakistani remittances have shown strong recovery, reaching $2.4 billion in December, up 15% from the previous month.

4. **Export Growth:** Pakistan's exports have demonstrated resilience, with textile exports particularly strong due to improved global demand and competitive pricing.

**Central Bank Policy:**
The State Bank of Pakistan has maintained its policy rate at 22%, citing the need to ensure inflation continues its downward trajectory. Governor Jameel Ahmad indicated that the central bank remains committed to maintaining exchange rate stability while allowing market forces to determine the rate within a managed float regime.

**Forward-Looking Analysis:**
Currency analysts expect the USD/PKR rate to remain relatively stable in the 275-285 range over the next quarter, supported by:
- Continued IMF program compliance
- Seasonal improvement in remittances and exports
- Gradual improvement in economic fundamentals
- Reduced political uncertainty

**Risk Factors:**
However, several risks could impact currency stability:
- Global commodity price volatility
- Changes in US Federal Reserve policy
- Geopolitical developments affecting regional markets
- Domestic policy implementation challenges

**Trading Recommendations:**
For forex traders, the current environment suggests a range-bound trading approach, with support levels at 277-278 and resistance at 282-283. Long-term outlook remains cautiously optimistic, contingent on continued reform implementation and external account improvements.`,
                  time: '4 hours ago',
                  category: 'Forex',
                  impact: 'Neutral',
                  author: 'Ahmed Malik',
                  readTime: '6 min read',
                  tags: ['USD/PKR', 'IMF', 'Currency', 'Exchange Rate', 'SBP'],
                  imageDescription: 'Pakistani rupee notes with IMF logo and forex charts'
                },
                {
                  id: 3,
                  title: 'KSE-100 Index Breaks Above 91,000 as Foreign Investors Return to Pakistani Equities',
                  summary: 'Pakistan Stock Exchange reaches new multi-year highs driven by strong corporate earnings, foreign inflows, and improved economic outlook.',
                  fullArticle: `The Pakistan Stock Exchange (PSX) achieved a significant milestone as the benchmark KSE-100 index crossed the 91,000 mark for the first time since early 2017, driven by a confluence of positive factors including strong corporate earnings, foreign investor return, and improved macroeconomic stability.

**Market Performance Overview:**
The KSE-100 index has gained over 8,500 points (+10.3%) since the beginning of 2024, making it one of the best-performing emerging market indices globally. The rally has been broad-based, with 78% of listed companies posting positive returns during this period.

**Key Drivers of the Rally:**

**1. Corporate Earnings Momentum:**
Listed companies have reported exceptional earnings growth, with aggregate profits of KSE-100 constituents growing 35% year-over-year in Q4 2023. Key sectors driving this growth include:
- Banking: 28% average profit growth
- Oil & Gas: 42% profit increase due to higher margins
- Cement: 18% improvement on increased infrastructure spending
- Textiles: 15% growth on export recovery

**2. Foreign Investment Return:**
Foreign portfolio investment has turned positive for the first time in over two years, with net inflows of $127 million recorded in the past month. Major international institutional investors including:
- Dubai International Capital ($45 million invested)
- Arif Habib Investments ($32 million)
- JS Global Capital ($28 million)
- International Finance Corporation (IFC) increasing its exposure

**3. Improved Economic Fundamentals:**
Several macroeconomic indicators have shown marked improvement:
- Current account deficit narrowed to $0.8 billion from $3.2 billion
- Foreign exchange reserves increased to $8.2 billion
- Inflation trajectory showing downward trend
- Political stability improving investor confidence

**Sectoral Analysis:**

**Banking Sector (Weight: 22.1%):**
Banking stocks have been the primary drivers of the index rally, contributing approximately 3,800 points to the overall gain. Key performers include:
- HBL: +45% YTD performance
- UBL: +38% YTD gain
- MCB: +42% YTD increase
- NBP: +35% YTD growth

**Oil & Gas Sector (Weight: 18.7%):**
Energy companies have benefited from higher crude oil prices and improved refining margins:
- Pakistan State Oil (PSO): +52% YTD
- Oil & Gas Development Company (OGDCL): +28% YTD
- Pakistan Petroleum Limited (PPL): +33% YTD

**Technology & Communication (Weight: 12.4%):**
Telecom and technology stocks have gained on 5G rollout expectations and digital transformation:
- Pakistan Telecommunication Company Limited (PTCL): +41% YTD
- Systems Limited: +67% YTD
- TRG Pakistan: +89% YTD

**Market Valuation Metrics:**
Despite the rally, the KSE-100 remains attractively valued compared to regional peers:
- Price-to-Earnings Ratio: 6.2x (vs. regional average of 14.5x)
- Price-to-Book Ratio: 1.1x (vs. regional average of 1.8x)
- Dividend Yield: 7.8% (vs. regional average of 3.2%)

**Technical Analysis:**
From a technical perspective, the KSE-100 has successfully broken through multiple resistance levels:
- Immediate resistance: 92,500
- Next major resistance: 95,000
- Support levels: 89,200 and 87,500
- RSI at 68 suggests room for further upside

**Future Outlook:**
Market analysts remain optimistic about the medium-term outlook, citing several positive catalysts:

**Near-term Catalysts (Next 3-6 months):**
- Continued foreign investment inflows
- Strong Q1 2024 earnings expected
- MSCI frontier market review (potential upgrade)
- IMF program completion

**Medium-term Catalysts (6-12 months):**
- Potential sovereign rating upgrade
- CPEC project restart
- Privatization program implementation
- Capital market reforms

**Risk Factors:**
However, several risks could impact market performance:
- Global market volatility spillover
- Commodity price fluctuations
- Political developments
- Implementation of policy reforms

**Investment Recommendations:**
For investors, the current market presents opportunities across multiple sectors, with particular focus on:
1. Banking stocks for dividend yield and earnings growth
2. Technology companies for long-term growth potential
3. Infrastructure and cement for economic recovery play
4. Energy sector for commodity exposure

The market's strong fundamentals, attractive valuations, and improving economic outlook suggest the rally may have further room to run, though investors should remain mindful of potential volatility.`,
                  time: '6 hours ago',
                  category: 'Stocks',
                  impact: 'Positive',
                  author: 'Sarah Ahmad',
                  readTime: '8 min read',
                  tags: ['KSE-100', 'PSX', 'Foreign Investment', 'Stock Market', 'Equities'],
                  imageDescription: 'Pakistan Stock Exchange trading floor with green charts'
                },
                {
                  id: 4,
                  title: 'Energy Sector Resilience: Pakistani Oil & Gas Companies Navigate Global Commodity Volatility',
                  summary: 'Pakistani energy companies demonstrate strong operational performance and strategic adaptability amid fluctuating global oil prices and geopolitical uncertainties.',
                  fullArticle: `Pakistan's energy sector has demonstrated remarkable resilience and adaptability in the face of global commodity market volatility, with major oil and gas companies reporting strong operational performance and implementing strategic initiatives to navigate challenging market conditions.

**Sector Overview:**
The Pakistani energy sector, which includes exploration & production (E&P) companies, oil marketing companies (OMCs), and refineries, has shown robust performance despite global uncertainties. The sector represents approximately 18.7% of the KSE-100 index weight and has delivered strong returns to investors.

**Major Company Performance:**

**Oil & Gas Development Company Limited (OGDCL):**
Pakistan's largest E&P company reported exceptional Q4 results with:
- Net profits up 31% to PKR 156 billion
- Oil production increased by 8% to 38,450 barrels per day
- Gas production grew 5% to 985 million cubic feet per day
- New discoveries in Sindh and Balochistan provinces
- Enhanced recovery projects yielding positive results

OGDCL's management has emphasized its commitment to sustainable energy transition while maximizing value from existing assets. The company's exploration budget for 2024 has been increased by 25% to PKR 45 billion.

**Pakistan State Oil (PSO):**
The country's largest oil marketing company has navigated supply chain challenges effectively:
- Revenue growth of 22% to PKR 1.78 trillion
- Market share expansion to 44% in petroleum products
- Successful implementation of digital payment systems
- Strategic partnerships with international suppliers
- Retail network expansion with 150 new outlets planned

**Pakistan Petroleum Limited (PPL):**
The integrated oil and gas company has delivered consistent performance:
- Profit after tax increased 27% to PKR 68 billion
- Successful completion of Kandhkot gas field development
- Joint venture agreements for enhanced oil recovery
- Investment in renewable energy projects initiated

**Attock Petroleum Limited (APL):**
The refining company has shown operational excellence:
- Refinery utilization rate maintained at 87%
- Product mix optimization improving margins
- Environmental compliance upgrades completed
- Strategic crude oil procurement reducing costs

**Global Market Context:**
The energy sector's performance comes against a backdrop of significant global challenges:

**Oil Price Volatility:**
- Brent crude prices fluctuating between $75-$95 per barrel
- OPEC+ production decisions impacting global supply
- Geopolitical tensions affecting market sentiment
- US shale production growth providing price ceiling

**Gas Market Dynamics:**
- Global LNG prices experiencing high volatility
- Winter demand patterns affecting pricing
- Pipeline infrastructure developments
- Energy security concerns driving policy decisions

**Strategic Initiatives:**

**1. Exploration & Production Enhancement:**
Pakistani E&P companies have intensified exploration activities:
- 47 new exploration wells planned for 2024
- Enhanced oil recovery projects in mature fields
- Application of advanced seismic technologies
- Joint ventures with international partners

**2. Infrastructure Development:**
Significant investments in infrastructure expansion:
- North-South gas pipeline project progress
- LNG terminal capacity expansion
- Refinery upgrade and modernization programs
- Renewable energy integration initiatives

**3. Digital Transformation:**
Energy companies embracing technology:
- IoT implementation for asset monitoring
- Predictive maintenance systems
- Digital customer service platforms
- Blockchain for supply chain transparency

**4. Sustainability Focus:**
Environmental and social responsibility initiatives:
- Carbon footprint reduction programs
- Renewable energy project investments
- Community development programs
- Environmental compliance enhancements

**Market Outlook:**

**Short-term Prospects (Next 6 months):**
- Continued operational excellence expected
- New field developments coming online
- Refinery margin improvements anticipated
- Dividend yields remaining attractive

**Medium-term Outlook (1-2 years):**
- Significant exploration results expected
- Infrastructure projects completion
- Energy transition strategy implementation
- Regional energy market integration

**Long-term Vision (3-5 years):**
- Renewable energy portfolio expansion
- Carbon neutral operations targets
- Technology-driven efficiency improvements
- Regional energy hub development

**Investment Considerations:**

**Strengths:**
- Attractive dividend yields (8-12% range)
- Strong cash flow generation
- Strategic asset base
- Experienced management teams

**Opportunities:**
- Untapped exploration potential
- Energy transition investment
- Regional market expansion
- Technology adoption benefits

**Risks:**
- Commodity price volatility
- Regulatory changes
- Environmental compliance costs
- Global economic uncertainties

**Analyst Recommendations:**
Energy sector analysts maintain positive outlook with specific recommendations:
- OGDCL: BUY rating with PKR 128 target price
- PSO: HOLD rating with PKR 285 target price
- PPL: BUY rating with PKR 98 target price
- APL: HOLD rating with PKR 478 target price

The sector's resilience, combined with attractive valuations and strong fundamentals, makes it an important component of diversified investment portfolios, particularly for income-focused investors seeking exposure to commodity markets and energy infrastructure.`,
                  time: '8 hours ago',
                  category: 'Energy',
                  impact: 'Positive',
                  author: 'Dr. Hassan Ali',
                  readTime: '7 min read',
                  tags: ['Energy Sector', 'OGDCL', 'PSO', 'Oil & Gas', 'Commodities'],
                  imageDescription: 'Oil refinery with Pakistani flag and commodity price charts'
                }
              ].map((news, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                }}
                onClick={() => setSelectedArticle(selectedArticle === news.id ? null : news.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(37, 99, 235, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)'
                }}>
                  {/* Article Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          background: news.category === 'Banking' ? '#2563eb' :
                                     news.category === 'Forex' ? '#059669' :
                                     news.category === 'Stocks' ? '#f59e0b' :
                                     news.category === 'Energy' ? '#dc2626' : '#8b5cf6',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {news.category}
                        </span>
                        <span style={{
                          background: news.impact === 'Positive' ? '#05966915' :
                                     news.impact === 'Negative' ? '#dc262615' : '#64748b15',
                          color: news.impact === 'Positive' ? '#059669' :
                                news.impact === 'Negative' ? '#dc2626' : '#64748b',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {news.impact}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        <span>📝 by {news.author}</span>
                        <span>⏱️ {news.readTime}</span>
                        <span>🕒 {news.time}</span>
                      </div>
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '800',
                    color: '#1e293b',
                    marginBottom: '16px',
                    lineHeight: '1.3'
                  }}>
                    {news.title}
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.7',
                    marginBottom: '20px'
                  }}>
                    {news.summary}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {news.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Full Article */}
                  {selectedArticle === news.id && (
                    <div style={{
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: '24px',
                      marginTop: '20px'
                    }}>
                      <div style={{
                        fontSize: '15px',
                        color: '#374151',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-line'
                      }}>
                        {news.fullArticle}
                      </div>
                    </div>
                  )}

                  {/* Read More Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedArticle(selectedArticle === news.id ? null : news.id)
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '16px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {selectedArticle === news.id ? '📄 Show Less' : '📖 Read Full Article'}
                  </button>
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
                🎓 Professional Trading Academy
              </h1>
              <p style={{
                fontSize: '20px',
                color: '#64748b',
                maxWidth: '900px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Transform your trading career with our comprehensive, industry-leading education platform.
                Learn from certified professionals and master both Pakistani and international markets.
              </p>
            </div>

            {/* Exness Account Verification */}
            {!hasExnessAccount && (
              <div style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '20px',
                padding: '40px',
                marginBottom: '48px',
                color: 'white',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '900',
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  🔓 Unlock FREE Professional Trading Education
                </h2>
                <p style={{
                  fontSize: '18px',
                  marginBottom: '32px',
                  opacity: 0.9,
                  lineHeight: '1.7'
                }}>
                  Open an account with our trusted broker <strong>Exness</strong> and get instant access to all premium courses worth $2000+ absolutely FREE!
                </p>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '32px'
                }}>
                  <button
                    onClick={verifyExnessAccount}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#2563eb',
                      border: 'none',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white'
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    🚀 Open Exness Account
                  </button>

                  <span style={{ fontSize: '16px', opacity: 0.8 }}>or</span>

                  <button
                    onClick={verifyExnessAccount}
                    style={{
                      background: 'transparent',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.7)',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'white'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    Already have account? Verify
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  fontSize: '14px'
                }}>
                  <div>✅ 3 Complete Professional Courses</div>
                  <div>✅ 180+ Video Lessons</div>
                  <div>✅ Professional Certificates</div>
                  <div>✅ Live Trading Sessions</div>
                  <div>✅ 24/7 Expert Support</div>
                  <div>✅ Mobile Learning App</div>
                </div>
              </div>
            )}

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

            {/* Professional Courses */}
            <h2 style={{
              fontSize: '36px',
              fontWeight: '900',
              marginBottom: '40px',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              📚 Complete Professional Trading Courses
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '40px',
              marginBottom: '60px'
            }}>
              {[
                {
                  id: 1,
                  level: 'Foundation',
                  title: 'Complete Trading Fundamentals Mastery',
                  instructor: 'Dr. Ahmed Hassan',
                  rating: 4.9,
                  students: 2847,
                  price: 'FREE',
                  originalPrice: 'For Exness Clients',
                  description: 'Master the complete foundations of trading with this comprehensive course designed for absolute beginners to intermediate traders.',
                  lessons: 45,
                  duration: '25 hours',
                  certificate: true,
                  color: '#059669',
                  modules: [
                    {
                      title: 'Module 1: Trading Foundations',
                      lessons: 8,
                      topics: [
                        'What is Trading? Financial Markets Overview',
                        'Types of Financial Instruments (Stocks, Forex, Commodities, Bonds)',
                        'Market Participants and Their Roles',
                        'How Stock Exchanges Work (PSX, NYSE, NASDAQ)',
                        'Understanding Market Hours and Sessions',
                        'Bull vs Bear Markets - Market Cycles',
                        'Economic Indicators and Market Impact',
                        'Building Your Trading Mindset'
                      ]
                    },
                    {
                      title: 'Module 2: Order Types & Execution',
                      lessons: 6,
                      topics: [
                        'Market Orders vs Limit Orders',
                        'Stop Loss and Take Profit Orders',
                        'Stop Limit Orders and Advanced Order Types',
                        'Understanding Bid-Ask Spreads',
                        'Order Book Analysis and Level 2 Data',
                        'Slippage and Order Execution Quality'
                      ]
                    },
                    {
                      title: 'Module 3: Pakistani Market Specialization',
                      lessons: 10,
                      topics: [
                        'Pakistan Stock Exchange (PSX) Deep Dive',
                        'KSE-100 Index Trading Strategies',
                        'Banking Sector Analysis (HBL, UBL, MCB)',
                        'Textile and Energy Sector Opportunities',
                        'USD/PKR Forex Trading Fundamentals',
                        'Government Securities and T-Bills',
                        'Mutual Funds and Investment Trusts',
                        'Tax Implications for Pakistani Traders',
                        'Regulatory Framework and SECP Guidelines',
                        'Local Broker Selection and Account Setup'
                      ]
                    },
                    {
                      title: 'Module 4: Risk Management Fundamentals',
                      lessons: 8,
                      topics: [
                        'Position Sizing and Capital Allocation',
                        'The 1% and 2% Risk Rules',
                        'Setting Stop Losses Effectively',
                        'Risk-Reward Ratios and Expectancy',
                        'Diversification Strategies',
                        'Managing Emotional Trading',
                        'Creating a Trading Plan',
                        'Record Keeping and Performance Analysis'
                      ]
                    },
                    {
                      title: 'Module 5: Basic Technical Analysis',
                      lessons: 8,
                      topics: [
                        'Introduction to Charts and Timeframes',
                        'Support and Resistance Basics',
                        'Trend Identification and Analysis',
                        'Basic Candlestick Patterns',
                        'Moving Averages (SMA, EMA)',
                        'Volume Analysis Fundamentals',
                        'Basic Chart Patterns',
                        'Entry and Exit Strategies'
                      ]
                    },
                    {
                      title: 'Module 6: Trading Practice & Application',
                      lessons: 5,
                      topics: [
                        'Setting Up Demo Trading Accounts',
                        'Paper Trading Best Practices',
                        'Live Trading Transition Strategy',
                        'Common Beginner Mistakes to Avoid',
                        'Building Your Trading Routine'
                      ]
                    }
                  ],
                  bonuses: [
                    'Private Discord Trading Community Access',
                    'Weekly Live Q&A Sessions with Instructor',
                    'Trading Journal Template & Calculator',
                    'Pakistani Market Data Sources Guide',
                    'Broker Comparison and Selection Guide'
                  ]
                },
                {
                  id: 2,
                  level: 'Advanced',
                  title: 'Technical Analysis & Chart Mastery',
                  instructor: 'Sarah Khan, CMT',
                  rating: 4.8,
                  students: 1923,
                  price: 'FREE',
                  originalPrice: 'For Exness Clients',
                  description: 'Become a technical analysis expert with advanced chart reading, pattern recognition, and indicator mastery.',
                  lessons: 60,
                  duration: '40 hours',
                  certificate: true,
                  color: '#2563eb',
                  modules: [
                    {
                      title: 'Module 1: Advanced Candlestick Analysis',
                      lessons: 12,
                      topics: [
                        'Single Candlestick Patterns (Doji, Hammer, Shooting Star)',
                        'Dual Candlestick Patterns (Engulfing, Harami)',
                        'Triple Candlestick Patterns (Morning Star, Evening Star)',
                        'Candlestick Psychology and Market Sentiment',
                        'Japanese Candlestick History and Philosophy',
                        'Candlestick Patterns in Different Market Conditions',
                        'Volume Confirmation with Candlestick Patterns',
                        'Timeframe Analysis for Candlestick Patterns',
                        'False Signals and Pattern Reliability',
                        'Combining Candlesticks with Support/Resistance',
                        'Live Chart Analysis and Pattern Identification',
                        'Building Candlestick-Based Trading Strategies'
                      ]
                    },
                    {
                      title: 'Module 2: Chart Patterns Mastery',
                      lessons: 15,
                      topics: [
                        'Reversal Patterns: Head & Shoulders, Double Tops/Bottoms',
                        'Continuation Patterns: Triangles, Flags, Pennants',
                        'Rectangle and Channel Patterns',
                        'Cup and Handle Pattern Trading',
                        'Wedge Patterns (Rising/Falling)',
                        'Diamond and Broadening Patterns',
                        'Gap Analysis and Gap Trading Strategies',
                        'Pattern Measurement and Price Targets',
                        'Volume Confirmation for Chart Patterns',
                        'Failed Patterns and Risk Management',
                        'Multi-Timeframe Pattern Analysis',
                        'Pattern Trading in Different Market Phases',
                        'Combining Patterns for Higher Probability',
                        'Real-Time Pattern Recognition Practice',
                        'Creating Pattern-Based Trading Systems'
                      ]
                    },
                    {
                      title: 'Module 3: Technical Indicators Deep Dive',
                      lessons: 18,
                      topics: [
                        'Moving Average Systems and Crossovers',
                        'RSI Strategies and Divergence Analysis',
                        'MACD Histogram and Signal Line Trading',
                        'Bollinger Bands and Volatility Trading',
                        'Stochastic Oscillator Advanced Strategies',
                        'Fibonacci Retracements and Extensions',
                        'Ichimoku Cloud System Complete Guide',
                        'Volume Indicators (OBV, A/D Line, Chaikin)',
                        'Momentum Indicators (Williams %R, CCI)',
                        'Market Structure Indicators (Pivot Points)',
                        'Custom Indicator Development',
                        'Multiple Indicator Confluence',
                        'Indicator Optimization and Backtesting',
                        'Creating Indicator-Based Alerts',
                        'Avoiding Indicator Overload',
                        'Combining Indicators with Price Action',
                        'Live Market Indicator Analysis',
                        'Building Robust Trading Systems'
                      ]
                    },
                    {
                      title: 'Module 4: Advanced Price Action Trading',
                      lessons: 10,
                      topics: [
                        'Pure Price Action Trading Philosophy',
                        'Market Structure and Trend Analysis',
                        'Supply and Demand Zone Identification',
                        'Order Flow and Institutional Trading',
                        'Price Action Setups and Confluences',
                        'Reading Market Sentiment through Price',
                        'Multiple Timeframe Price Action Analysis',
                        'Price Action Risk Management',
                        'Live Price Action Trading Examples',
                        'Developing Price Action Intuition'
                      ]
                    },
                    {
                      title: 'Module 5: Market Psychology & Sentiment',
                      lessons: 5,
                      topics: [
                        'Understanding Market Cycles and Phases',
                        'Fear and Greed Index Analysis',
                        'Contrarian Trading Strategies',
                        'News Impact on Technical Analysis',
                        'Sentiment Indicators and Market Timing'
                      ]
                    }
                  ],
                  bonuses: [
                    'Professional Trading Platform Setup Guide',
                    'Custom Technical Analysis Templates',
                    'Live Trading Room Access (3 months)',
                    'Advanced Charting Software Training',
                    'Personal Trading Strategy Development Session'
                  ]
                },
                {
                  id: 3,
                  level: 'Professional',
                  title: 'Advanced Options & Derivatives Mastery',
                  instructor: 'Muhammad Raza, CFA',
                  rating: 4.9,
                  students: 856,
                  price: 'FREE',
                  originalPrice: 'For Exness Clients',
                  description: 'Master advanced options strategies, derivatives trading, and institutional-level techniques for professional traders.',
                  lessons: 75,
                  duration: '55 hours',
                  certificate: true,
                  color: '#dc2626',
                  modules: [
                    {
                      title: 'Module 1: Options Fundamentals',
                      lessons: 15,
                      topics: [
                        'Options Basics: Calls, Puts, Strike Prices, Expiration',
                        'Intrinsic Value vs Time Value',
                        'The Greeks: Delta, Gamma, Theta, Vega, Rho',
                        'Options Pricing Models (Black-Scholes)',
                        'Implied Volatility and Its Impact',
                        'Options Chain Analysis',
                        'American vs European Style Options',
                        'Index Options vs Stock Options',
                        'Options Settlement and Assignment',
                        'Tax Implications of Options Trading',
                        'Options Market Makers and Liquidity',
                        'Early Exercise and Assignment Risk',
                        'Options Expiration Strategies',
                        'Paper Trading Options Strategies',
                        'Options Risk Management Fundamentals'
                      ]
                    },
                    {
                      title: 'Module 2: Basic Options Strategies',
                      lessons: 12,
                      topics: [
                        'Long Calls and Puts Strategy',
                        'Covered Call Writing',
                        'Cash-Secured Put Selling',
                        'Protective Put Strategy',
                        'Bull Call Spreads',
                        'Bear Put Spreads',
                        'Bull Put Spreads',
                        'Bear Call Spreads',
                        'Long Straddle Strategy',
                        'Long Strangle Strategy',
                        'Iron Condor Strategy',
                        'Butterfly Spreads'
                      ]
                    },
                    {
                      title: 'Module 3: Advanced Options Strategies',
                      lessons: 18,
                      topics: [
                        'Calendar Spreads and Time Decay',
                        'Diagonal Spreads Strategy',
                        'Ratio Spreads (Call and Put)',
                        'Backspread Strategies',
                        'Synthetic Positions Creation',
                        'Collar Strategy Implementation',
                        'Jade Lizard Strategy',
                        'Big Lizard Strategy',
                        'Broken Wing Butterfly',
                        'Christmas Tree Spreads',
                        'Condor Variations',
                        'Volatility Trading Strategies',
                        'Earnings Play Strategies',
                        'Dividend Capture with Options',
                        'Rolling and Adjustment Techniques',
                        'Multi-Leg Options Execution',
                        'Options Portfolio Management',
                        'Advanced Risk Management'
                      ]
                    },
                    {
                      title: 'Module 4: Futures Trading Mastery',
                      lessons: 15,
                      topics: [
                        'Futures Contracts Fundamentals',
                        'Futures vs Options Comparison',
                        'Margin Requirements and Leverage',
                        'Contango and Backwardation',
                        'Futures Curve Analysis',
                        'Commodity Futures Trading',
                        'Financial Futures (Index, Currency)',
                        'Futures Spreads and Arbitrage',
                        'Seasonal Trading Patterns',
                        'Futures Options (FOPS)',
                        'Delivery and Settlement Process',
                        'Futures Risk Management',
                        'Algorithmic Futures Trading',
                        'Cross-Market Analysis',
                        'Institutional Futures Strategies'
                      ]
                    },
                    {
                      title: 'Module 5: Portfolio Management & Hedging',
                      lessons: 10,
                      topics: [
                        'Portfolio Delta Management',
                        'Hedging Stock Positions with Options',
                        'Volatility Hedging Strategies',
                        'Currency Hedging with Derivatives',
                        'Commodity Exposure Hedging',
                        'Portfolio Insurance Strategies',
                        'Dynamic Hedging Techniques',
                        'Risk Parity and Options',
                        'Alternative Risk Premia',
                        'Institutional Portfolio Strategies'
                      ]
                    },
                    {
                      title: 'Module 6: Advanced Trading Psychology',
                      lessons: 5,
                      topics: [
                        'Professional Trader Mindset',
                        'Managing Large Position Sizes',
                        'Dealing with Complex Strategy P&L',
                        'Institutional Trading Discipline',
                        'Career Development in Trading'
                      ]
                    }
                  ],
                  bonuses: [
                    'Professional Options Trading Platform Access',
                    'Real-Time Options Flow Analysis Tools',
                    'Weekly Live Options Trading Sessions',
                    'Personal Mentorship Session (2 hours)',
                    'Advanced Options Calculator and Greeks Monitor',
                    'Institutional Trading Strategies Guide'
                  ]
                }
              ].map((course, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = course.color
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = `0 20px 60px ${course.color}25`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '8px',
                    background: `linear-gradient(90deg, ${course.color} 0%, ${course.color}80 100%)`
                  }} />

                  {/* Course Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
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
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{
                              color: i < Math.floor(course.rating) ? '#f59e0b' : '#e5e7eb',
                              fontSize: '14px'
                            }}>★</span>
                          ))}
                          <span style={{
                            fontSize: '14px',
                            color: '#64748b',
                            fontWeight: '600',
                            marginLeft: '4px'
                          }}>
                            {course.rating} ({course.students.toLocaleString()} students)
                          </span>
                        </div>
                      </div>
                      <h3 style={{
                        fontSize: '26px',
                        fontWeight: '900',
                        color: '#1e293b',
                        marginBottom: '8px',
                        lineHeight: '1.3'
                      }}>
                        {course.title}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        by {course.instructor}
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'right'
                    }}>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: '900',
                        color: course.color,
                        lineHeight: '1'
                      }}>
                        {course.price}
                      </div>
                      <div style={{
                        fontSize: '16px',
                        color: '#64748b',
                        textDecoration: 'line-through',
                        marginBottom: '4px'
                      }}>
                        {course.originalPrice}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#059669',
                        fontWeight: '600'
                      }}>
                        🎁 FREE
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.7',
                    marginBottom: '24px'
                  }}>
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: course.color }}>{course.lessons}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Lessons</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: course.color }}>{course.duration}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Duration</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: course.color }}>
                        {course.certificate ? '✓' : '✗'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Certificate</div>
                    </div>
                  </div>

                  {/* Course Modules */}
                  <div style={{
                    marginBottom: '24px'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#1e293b',
                      marginBottom: '16px'
                    }}>
                      📋 Course Curriculum ({course.modules.length} Modules):
                    </h4>
                    {selectedCourse === course.id ? (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '20px'
                      }}>
                        {course.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} style={{
                            marginBottom: moduleIndex < course.modules.length - 1 ? '20px' : 0,
                            paddingBottom: moduleIndex < course.modules.length - 1 ? '20px' : 0,
                            borderBottom: moduleIndex < course.modules.length - 1 ? '1px solid #e2e8f0' : 'none'
                          }}>
                            <h5 style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              color: course.color,
                              marginBottom: '8px'
                            }}>
                              {module.title} ({module.lessons} lessons)
                            </h5>
                            <ul style={{
                              margin: 0,
                              paddingLeft: '20px',
                              fontSize: '14px',
                              color: '#64748b',
                              lineHeight: '1.6'
                            }}>
                              {module.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} style={{ marginBottom: '4px' }}>
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Bonuses */}
                        <div style={{
                          marginTop: '20px',
                          paddingTop: '20px',
                          borderTop: '1px solid #e2e8f0'
                        }}>
                          <h5 style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#dc2626',
                            marginBottom: '12px'
                          }}>
                            🎁 Exclusive Bonuses:
                          </h5>
                          <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '14px',
                            color: '#64748b',
                            lineHeight: '1.6'
                          }}>
                            {course.bonuses.map((bonus, bonusIndex) => (
                              <li key={bonusIndex} style={{ marginBottom: '4px' }}>
                                {bonus}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '20px'
                      }}>
                        {course.modules.slice(0, 2).map((module, moduleIndex) => (
                          <div key={moduleIndex} style={{
                            marginBottom: moduleIndex < 1 ? '16px' : 0
                          }}>
                            <h5 style={{
                              fontSize: '14px',
                              fontWeight: '700',
                              color: course.color,
                              marginBottom: '6px'
                            }}>
                              {module.title} ({module.lessons} lessons)
                            </h5>
                            <div style={{
                              fontSize: '13px',
                              color: '#64748b'
                            }}>
                              {module.topics.slice(0, 3).join(', ')}...
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCourse(selectedCourse === course.id ? null : course.id)
                          }}
                          style={{
                            marginTop: '12px',
                            background: 'none',
                            border: 'none',
                            color: course.color,
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          View Full Curriculum →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        accessCourse(course.id, course.title)
                      }}
                      style={{
                        flex: 1,
                        background: hasExnessAccount
                          ? `linear-gradient(135deg, #059669 0%, #047857 100%)`
                          : `linear-gradient(135deg, ${course.color} 0%, ${course.color}DD 100%)`,
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
                      }}
                    >
                      {hasExnessAccount ? '✅ Access Course' : '🔐 Verify Exness Account'}
                    </button>
                    <button style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: '#64748b',
                      border: '1px solid #e2e8f0',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = course.color
                      e.currentTarget.style.color = course.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.color = '#64748b'
                    }}>
                      Preview
                    </button>
                  </div>
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