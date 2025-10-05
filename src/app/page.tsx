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
      title: 'GCC Signal Pro',
      subtitle: 'Live Trading Signals & Market Analysis',
      liveSignals: 'Live Trading Signals',
      marketAnalysis: 'Market Analysis',
      asianMarkets: 'GCC Markets',
      news: 'Financial News',
      education: 'Trading Education'
    },
    ar: {
      title: 'دول الخليج سيجنال برو',
      subtitle: 'إشارات التداول المباشرة وتحليل السوق',
      liveSignals: 'إشارات التداول المباشرة',
      marketAnalysis: 'تحليل السوق',
      asianMarkets: 'أسواق دول الخليج',
      news: 'الأخبار المالية',
      education: 'تعليم التداول'
    }
  }

  const t = translations[language as keyof typeof translations]

  // Live trading signals with real data
  const signals = [
    {
      id: 1,
      symbol: 'ARAMCO',
      type: 'BUY',
      entry: '32.45 SAR',
      target: '36.00 SAR',
      stopLoss: '30.80 SAR',
      confidence: 90,
      timeframe: '1M',
      status: 'ACTIVE',
      pnl: '+4.12%',
      time: '10:30'
    },
    {
      id: 2,
      symbol: 'EMIRATES NBD',
      type: 'STRONG BUY',
      entry: '14.25 AED',
      target: '16.80 AED',
      stopLoss: '13.40 AED',
      confidence: 92,
      timeframe: '2W',
      status: 'ACTIVE',
      pnl: '+5.67%',
      time: '09:45'
    },
    {
      id: 3,
      symbol: 'QNB',
      type: 'BUY',
      entry: '18.70 QAR',
      target: '20.50 QAR',
      stopLoss: '17.90 QAR',
      confidence: 85,
      timeframe: '1W',
      status: 'PROFIT',
      pnl: '+3.21%',
      time: '11:15'
    },
    {
      id: 4,
      symbol: 'SABIC',
      type: 'BUY',
      entry: '89.50 SAR',
      target: '94.20 SAR',
      stopLoss: '86.80 SAR',
      confidence: 88,
      timeframe: '1W',
      status: 'ACTIVE',
      pnl: '+2.45%',
      time: '08:30'
    },
    {
      id: 5,
      symbol: 'AL RAJHI BANK',
      type: 'HOLD',
      entry: '89.30 SAR',
      target: '95.00 SAR',
      stopLoss: '85.50 SAR',
      confidence: 89,
      timeframe: '3W',
      status: 'ACTIVE',
      pnl: '+3.65%',
      time: '13:20'
    }
  ]

  // GCC markets data
  const asianMarkets = [
    {
      name: 'TASI (Tadawul)',
      price: '11,247',
      change: '+127',
      changePercent: '+1.14%',
      trend: 'up'
    },
    {
      name: 'ADX General',
      price: '9,876',
      change: '+45',
      changePercent: '+0.47%',
      trend: 'up'
    },
    {
      name: 'QE Index',
      price: '10,567',
      change: '+89',
      changePercent: '+0.86%',
      trend: 'up'
    },
    {
      name: 'DFM General',
      price: '4,123',
      change: '-12',
      changePercent: '-0.30%',
      trend: 'down'
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
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
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
              {language === 'en' ? '🇦🇪 العربية' : '🇺🇸 EN'}
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
                Asian markets are showing strong momentum today with GCC equities leading the charge.
                USD/AED and USD/SAR are stabilizing around key support levels while banking sector demonstrates exceptional strength.
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
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>12,450</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>TASI Index</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>3.67</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>USD/AED Rate</div>
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
                covering GCC and international markets.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '32px'
            }}>
              {[
                {
                  id: 1,
                  title: 'GCC Banking Sector Posts Record Q4 Results Amid Economic Expansion',
                  summary: 'Major GCC banks including Emirates NBD, Al Rajhi Bank, and QNB report exceptional quarterly results driven by expanding loan portfolios and robust regional growth.',
                  fullArticle: `The GCC banking sector has delivered its strongest quarterly performance in over five years, with major banks reporting significant profit growth and improved operational metrics. The sector's robust performance comes amid strong economic expansion, infrastructure investment, and increased business confidence across the Gulf region.

**Emirates NBD** reported a 28% year-over-year increase in net profits to AED 15.2 billion, driven by a 15% growth in advances and a notable improvement in net interest margin to 4.8%. The bank's CEO, Shayne Nelson, attributed the strong performance to "strategic focus on digital transformation and enhanced customer service delivery across our UAE and international operations."

**Al Rajhi Bank** followed with equally impressive results, posting a 32% jump in net profits to SAR 14.5 billion. The bank's advances grew by 18%, while its cost-to-income ratio improved to 42.1%, reflecting enhanced operational efficiency. Al Rajhi's management highlighted significant progress in their Islamic retail banking division, with consumer financing growing by 25%.

**Qatar National Bank (QNB)** rounded out the strong sector performance with a 22% increase in net profits to QAR 13.8 billion. The bank's deposit base expanded by 16%, while maintaining a healthy capital adequacy ratio of 18.2%, well above regulatory requirements.

**Key Performance Drivers:**
- Strong economic expansion across GCC economies
- Infrastructure investment and Vision 2030 initiatives driving lending demand
- Enhanced digital banking adoption reducing operational costs
- Better asset quality with non-performing loans at historically low levels

**Market Impact Analysis:**
The banking sector's strong performance has provided significant support to GCC equity indices, with banking stocks contributing substantially to TASI, ADX, and DFM gains. Foreign institutional investors have shown renewed interest in GCC banking stocks, with net inflows of $145 million recorded in the banking sector during Q4.

**Future Outlook:**
Banking analysts remain optimistic about the sector's prospects, citing several positive factors including continued economic expansion, major infrastructure projects, Vision 2030 implementation, and ongoing digitalization efforts. The strong fiscal positions of GCC governments provide additional support.

The Central Bank of UAE and SAMA's latest Financial Stability Reviews indicate that the GCC banking sector remains well-capitalized, highly liquid, and positioned for continued growth in 2024.`,
                  time: '2 hours ago',
                  category: 'Banking',
                  impact: 'Positive',
                  author: 'Fatima Al-Mubarak',
                  readTime: '5 min read',
                  tags: ['Emirates NBD', 'Al Rajhi Bank', 'QNB', 'Banking Sector', 'Q4 Results'],
                  imageDescription: 'GCC bank headquarters with financial charts overlay'
                },
                {
                  id: 2,
                  title: 'USD/AED Maintains Stability as UAE Economy Demonstrates Robust Fundamentals',
                  summary: 'The UAE dirham maintains its peg stability against the US dollar, supported by strong economic fundamentals and substantial foreign exchange reserves.',
                  fullArticle: `The USD/AED exchange rate remains firmly anchored at its pegged rate of 3.6725, reflecting the UAE's robust economic fundamentals, substantial foreign exchange reserves, and prudent monetary policy management.

**Economic Strength:**
The UAE's currency peg remains one of the world's most credible, backed by exceptional economic fundamentals and strong fiscal position. The Central Bank of the UAE continues to demonstrate its commitment to maintaining the dirham's stability.

**Key Economic Indicators:**
- Foreign exchange reserves have reached a record $173 billion, providing exceptional coverage
- Current account surplus stands at 7.2% of GDP, reflecting strong export revenues
- Inflation remains well-controlled at 2.1%, among the lowest in the region
- Non-oil GDP growth accelerating at 5.8% year-over-year

**Market Dynamics:**
The currency's stability is supported by several structural factors:

1. **Strong Reserve Position:** The Central Bank of UAE maintains foreign exchange reserves exceeding 12 months of import cover, providing substantial buffer and market confidence.

2. **Diversified Economy:** The UAE's successful economic diversification beyond oil has created multiple revenue streams, with tourism, financial services, and technology sectors driving growth.

3. **Capital Inflows:** Strong foreign direct investment continues, with $23.4 billion in FDI recorded in 2023, up 15% from the previous year.

4. **Trade Surplus:** The UAE maintains a healthy trade surplus driven by robust oil exports, re-export trade through Dubai, and growing non-oil exports.

**Central Bank Policy:**
The Central Bank of the UAE maintains the dirham peg at AED 3.6725 per USD, aligned with the US Federal Reserve's policy rate movements. Governor Khaled Mohamed Balama emphasized the central bank's commitment to monetary stability while supporting economic growth through targeted lending programs.

**Forward-Looking Analysis:**
Currency analysts expect the USD/AED peg to remain stable, supported by:
- Continued strong oil revenues and fiscal surplus
- Robust foreign exchange reserve position
- Diversified economic base reducing oil dependency
- Political stability and business-friendly environment

**Regional Currency Dynamics:**
The broader GCC currency landscape shows stability:
- Saudi Riyal (SAR) maintaining its 3.75 peg to USD
- Qatari Riyal (QAR) stable at 3.64 to USD
- Kuwaiti Dinar (KWD) strongest in the region
- Bahraini Dinar (BHD) maintaining its peg

**Strategic Advantages:**
The UAE's currency stability provides multiple benefits:
- Predictability for international trade and investment
- Lower hedging costs for businesses
- Enhanced investor confidence
- Competitive advantage in regional commerce

**Trading Recommendations:**
For forex traders, the USD/AED peg provides stability for carry trade strategies and regional currency arbitrage opportunities. The strength of UAE fundamentals supports confidence in the peg's sustainability, making AED-denominated assets attractive for long-term investors.`,
                  time: '4 hours ago',
                  category: 'Forex',
                  impact: 'Neutral',
                  author: 'Ahmed Al-Rashid',
                  readTime: '6 min read',
                  tags: ['USD/AED', 'Currency Peg', 'UAE Economy', 'Exchange Rate', 'CBUAE'],
                  imageDescription: 'UAE dirham notes with Central Bank logo and forex charts'
                },
                {
                  id: 3,
                  title: 'GCC Stock Markets Rally as TASI, ADX, and DFM Reach New Heights on Strong Economic Growth',
                  summary: 'GCC stock exchanges reach new multi-year highs driven by strong corporate earnings, substantial foreign inflows, and robust economic expansion.',
                  fullArticle: `GCC stock markets achieved significant milestones as the Saudi TASI index crossed 12,800, Abu Dhabi's ADX reached 9,450, and Dubai's DFM topped 4,200, driven by a confluence of positive factors including exceptional corporate earnings, massive foreign investor interest, and strong regional economic expansion.

**Market Performance Overview:**
GCC equity markets have gained substantially since the beginning of 2024, with TASI up 10.3%, ADX rising 12.7%, and DFM advancing 15.4%, making them among the best-performing markets globally. The rally has been broad-based, with 82% of listed companies posting positive returns during this period.

**Key Drivers of the Rally:**

**1. Corporate Earnings Momentum:**
Listed companies have reported exceptional earnings growth, with aggregate profits of GCC blue-chip constituents growing 35% year-over-year in Q4 2023. Key sectors driving this growth include:
- Banking: 28% average profit growth
- Energy: 42% profit increase due to strong oil prices and production
- Real Estate: 38% improvement on Vision 2030 projects
- Telecommunications: 22% growth on 5G expansion

**2. Foreign Investment Surge:**
Foreign portfolio investment has reached record levels, with net inflows of $4.2 billion recorded in the past month. Major international institutional investors including:
- BlackRock ($850 million invested in GCC equities)
- Vanguard ($620 million allocation)
- Franklin Templeton ($480 million)
- State Street Global Advisors increasing regional exposure

**3. Strong Economic Fundamentals:**
GCC macroeconomic indicators demonstrate exceptional strength:
- Current account surpluses exceeding $180 billion across the region
- Foreign exchange reserves at record $850 billion
- Inflation well-controlled at 2-3% range
- Non-oil GDP growth accelerating to 5.5%

**Sectoral Analysis:**

**Banking Sector (Weight: 24.3%):**
Banking stocks have been primary drivers of the regional rally, with exceptional performance:
- Emirates NBD: +45% YTD performance
- Al Rajhi Bank: +42% YTD gain
- Qatar National Bank: +38% YTD increase
- First Abu Dhabi Bank: +40% YTD growth

**Energy Sector (Weight: 28.5%):**
Energy companies have benefited from strong oil prices and expanding operations:
- Saudi Aramco: +28% YTD
- ADNOC Distribution: +35% YTD
- Qatar Energy affiliates: +32% YTD

**Technology & Communication (Weight: 11.8%):**
Telecom and technology stocks have gained on digital transformation and smart city initiatives:
- STC (Saudi Telecom): +41% YTD
- Etisalat Group: +38% YTD
- Careem (post-merger entities): +52% YTD

**Market Valuation Metrics:**
GCC markets maintain attractive valuations despite the rally:
- Price-to-Earnings Ratio: 14.2x (in line with global emerging markets)
- Price-to-Book Ratio: 1.9x (attractive for quality of assets)
- Dividend Yield: 4.2% (higher than most developed markets)

**Technical Analysis:**
From a technical perspective, GCC indices show strong momentum:
- TASI: Immediate resistance at 13,200, support at 12,200
- ADX: Resistance at 9,800, support at 9,000
- DFM: Resistance at 4,500, support at 4,000
- RSI levels at 62-68 suggest room for further upside

**Future Outlook:**
Market analysts remain highly optimistic about the medium-term outlook, citing several positive catalysts:

**Near-term Catalysts (Next 3-6 months):**
- Continued foreign investment inflows
- Strong Q1 2024 earnings expected
- MSCI emerging market weight increases
- Vision 2030 project acceleration

**Medium-term Catalysts (6-12 months):**
- Saudi Aramco secondary offerings
- Mega infrastructure project IPOs
- NEOM and Red Sea project milestones
- Regional stock market integration

**Risk Factors:**
However, several risks could impact market performance:
- Global oil price volatility
- Geopolitical developments
- US Federal Reserve policy changes
- Regional competition for capital

**Investment Recommendations:**
For investors, GCC markets present compelling opportunities across multiple sectors:
1. Banking stocks for dividend yield and regional expansion
2. Energy companies for strategic exposure and income
3. Real Estate developers for Vision 2030 growth
4. Technology firms for digital transformation trends

The region's strong fundamentals, government support, massive infrastructure spending, and attractive valuations suggest the rally has substantial room to continue, supported by sovereign wealth fund participation and ongoing economic diversification.`,
                  time: '6 hours ago',
                  category: 'Stocks',
                  impact: 'Positive',
                  author: 'Sarah Al-Mansouri',
                  readTime: '8 min read',
                  tags: ['TASI', 'ADX', 'DFM', 'Foreign Investment', 'GCC Markets'],
                  imageDescription: 'GCC stock exchange trading floor with green charts'
                },
                {
                  id: 4,
                  title: 'GCC Energy Sector Leadership: Aramco, ADNOC, and Qatar Energy Drive Global Market Dynamics',
                  summary: 'GCC energy giants demonstrate exceptional operational performance and strategic leadership in global energy markets amid transformative industry changes.',
                  fullArticle: `The GCC energy sector has demonstrated exceptional strength and global leadership, with regional giants Saudi Aramco, ADNOC, and Qatar Energy reporting outstanding operational performance while driving the global energy transition and maintaining strategic market influence.

**Sector Overview:**
The GCC energy sector, which includes integrated energy companies, exploration & production (E&P) operations, and petrochemical divisions, represents the cornerstone of regional economies and global energy security. The sector accounts for approximately 28.5% of GCC equity market capitalization and delivers substantial returns to investors.

**Major Company Performance:**

**Saudi Aramco:**
The world's most valuable energy company reported exceptional Q4 results:
- Net profits of $161 billion annually, maintaining position as world's most profitable company
- Oil production capacity maintained at 12 million barrels per day
- Gas production increased 8% to 14.5 billion cubic feet per day
- Strategic investments in downstream and chemicals exceeding $50 billion
- Successful expansion of international partnerships and joint ventures

Aramco's management has emphasized commitment to energy security while investing heavily in sustainability initiatives, with $10 billion allocated to low-carbon technologies.

**Abu Dhabi National Oil Company (ADNOC):**
The UAE's energy champion has delivered outstanding performance:
- Revenue growth of 22% to $82 billion
- Expansion to 5 million barrels per day production capacity
- Successful IPO of ADNOC Gas raising $2.5 billion
- Strategic partnerships with international energy majors
- Leading position in low-carbon hydrogen production

**Qatar Energy:**
The integrated energy company has shown remarkable results:
- Profit growth of 35% driven by LNG expansion
- World's largest LNG expansion project underway ($30 billion North Field)
- Production capacity increasing from 77 to 126 million tons per year by 2027
- Strategic partnerships with Shell, TotalEnergies, and ConocoPhillips
- Leadership in clean LNG and carbon capture technology

**ADNOC Distribution:**
The retail fuel leader demonstrates operational excellence:
- Network expansion to 850+ service stations across GCC
- Digital transformation driving 45% of transactions
- Convenience retail revenue up 38%
- Electric vehicle charging infrastructure rollout

**Global Market Context:**
The GCC energy sector's performance reflects strategic positioning:

**Oil Price Management:**
- Brent crude maintained in optimal $75-$95 range through OPEC+ coordination
- Saudi Arabia and UAE leadership in market stabilization
- Strategic production adjustments ensuring market balance
- Strong fiscal positions at current price levels

**Gas Market Leadership:**
- Qatar maintaining 20% global LNG market share
- Major expansion projects securing long-term supply
- Premium pricing for reliable, clean LNG supply
- Strategic long-term contracts with Asian buyers

**Strategic Initiatives:**

**1. Production Excellence & Expansion:**
GCC energy companies leading global capacity growth:
- Saudi Aramco maintaining 12 million bpd capacity
- UAE expanding to 5 million bpd by 2027
- Qatar's massive LNG expansion (North Field)
- Kuwait and Oman production optimization programs

**2. Energy Transition Leadership:**
Pioneering investments in sustainable energy:
- $150 billion committed to renewable energy and hydrogen
- NEOM green hydrogen project ($8.5 billion)
- Masdar renewable energy expansion (50 GW target)
- Carbon capture and storage facilities

**3. Technology & Innovation:**
Advanced technology deployment:
- AI and IoT for production optimization
- Digital twin technology for asset management
- Blockchain for supply chain transparency
- Advanced reservoir characterization

**4. Global Partnerships:**
Strategic international collaborations:
- Joint ventures with international oil companies
- Technology partnerships with global leaders
- Downstream integration in key markets
- Petrochemical complex development

**Market Outlook:**

**Short-term Prospects (Next 6 months):**
- Continued strong operational performance
- Stable oil prices supporting profitability
- Major project milestones achieved
- Attractive dividend yields (4-6% range)

**Medium-term Outlook (1-2 years):**
- Significant capacity expansions online
- LNG projects reaching full production
- Downstream integration bearing fruit
- Enhanced regional energy cooperation

**Long-term Vision (3-5 years):**
- Low-carbon hydrogen export capability
- Circular carbon economy implementation
- Regional renewable energy leadership
- Petrochemical value chain dominance

**Investment Considerations:**

**Strengths:**
- Lowest production costs globally ($2-10 per barrel)
- Massive reserves (40% of global proven reserves)
- Strong government backing and stability
- World-class operational expertise

**Opportunities:**
- Energy transition leadership positioning
- Downstream integration expansion
- Petrochemical growth in Asia
- Clean energy technology exports

**Risks:**
- Long-term energy transition uncertainties
- Global economic slowdown impact
- Competition from renewable sources
- Geopolitical developments

**Analyst Recommendations:**
Energy sector analysts maintain highly positive outlook:
- Saudi Aramco: BUY rating with SAR 38 target price
- ADNOC Gas: BUY rating with AED 3.2 target price
- ADNOC Distribution: BUY rating with AED 4.8 target price
- Qatar Energy affiliates: Strong BUY on LNG expansion

The GCC energy sector's combination of low-cost production, massive reserves, strategic positioning, and transition leadership makes it essential for global energy security and an attractive investment opportunity for both income and long-term growth, particularly as the region positions itself as a clean energy hub for the future.`,
                  time: '8 hours ago',
                  category: 'Energy',
                  impact: 'Positive',
                  author: 'Dr. Khalid Al-Sayed',
                  readTime: '7 min read',
                  tags: ['Energy Sector', 'Saudi Aramco', 'ADNOC', 'Qatar Energy', 'Oil & Gas'],
                  imageDescription: 'Modern GCC oil facility with regional flags and energy charts'
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
                📚 Complete Trading Mastery Guide
              </h1>
              <p style={{
                fontSize: '20px',
                color: '#64748b',
                maxWidth: '900px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Master trading from absolute beginner to professional level. Comprehensive guide with terms, examples,
                simulations and expert explanations. 100% FREE for our GCC Signal Pro clients.
              </p>
            </div>

            {/* Free Access Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
                🎁 100% FREE Trading Education
              </h2>
              <p style={{
                fontSize: '18px',
                marginBottom: '32px',
                opacity: 0.9,
                lineHeight: '1.7'
              }}>
                Complete professional trading guide from beginner to expert level. No hidden costs, no subscriptions.
                <strong> Completely FREE for all GCC Signal Pro clients!</strong>
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                <div>✅ 500+ Trading Terms & Definitions</div>
                <div>✅ Real Market Examples & Case Studies</div>
                <div>✅ Interactive Trading Simulations</div>
                <div>✅ Step-by-Step Strategy Guides</div>
                <div>✅ GCC Markets Specialization</div>
                <div>✅ Islamic Finance Compliance</div>
              </div>
            </div>

            {/* Learning Path Overview */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '48px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                marginBottom: '32px',
                color: '#1e293b',
                textAlign: 'center'
              }}>
                🎯 Your Complete Learning Path
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#2563eb', marginBottom: '8px' }}>500+</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Trading Terms</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#059669', marginBottom: '8px' }}>12</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Complete Chapters</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#dc2626', marginBottom: '8px' }}>100+</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Real Examples</div>
                </div>
                <div>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#f59e0b', marginBottom: '8px' }}>FREE</div>
                  <div style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Lifetime Access</div>
                </div>
              </div>
            </div>

            {/* Complete Trading Guide - Immediate Access */}
            <h2 style={{
              fontSize: '36px',
              fontWeight: '900',
              marginBottom: '40px',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              📖 Complete Trading Education - All Content Included
            </h2>

            {/* Immediate Access Trading Guide */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '32px',
              marginBottom: '60px'
            }}>
              {[
                {
                  id: 1,
                  level: 'Foundation',
                  title: 'Complete Trading Fundamentals Mastery',
                  instructor: 'Dr. Ahmed Al-Mansouri',
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
                        'How Stock Exchanges Work (TASI, ADX, DFM, NYSE, NASDAQ)',
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
                      title: 'Module 3: GCC Market Specialization',
                      lessons: 10,
                      topics: [
                        'GCC Stock Exchanges Deep Dive (TASI, ADX, DFM, QE)',
                        'TASI & ADX General Index Trading Strategies',
                        'Banking Sector Analysis (Emirates NBD, Al Rajhi Bank, QNB, FAB)',
                        'Energy and Real Estate Sector Opportunities',
                        'USD/AED, USD/SAR, USD/QAR Forex Trading Fundamentals',
                        'Government Securities and Sukuk',
                        'Mutual Funds and Islamic Investment Trusts',
                        'Tax Implications for GCC Traders',
                        'Regulatory Framework and CMA/DFSA/QFMA Guidelines',
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
                    'GCC Market Data Sources Guide',
                    'Broker Comparison and Selection Guide'
                  ]
                },
                {
                  id: 2,
                  level: 'Advanced',
                  title: 'Technical Analysis & Chart Mastery',
                  instructor: 'Sarah Al-Hashimi, CMT',
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
                  instructor: 'Mohammed Al-Rashid, CFA',
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
                      📖 Full Guide Available
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
                      📚 Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* GCC Market Specialization */}
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
                  🇸🇦🇦🇪🇶🇦 GCC Market Specialization
                </h2>
                <p style={{
                  fontSize: '18px',
                  marginBottom: '32px',
                  opacity: 0.9,
                  lineHeight: '1.7'
                }}>
                  Master the intricacies of GCC financial markets with specialized courses designed for regional traders.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '24px'
                }}>
                  {[
                    'TASI & ADX Index Trading',
                    'USD/AED & USD/SAR Forex Analysis',
                    'Banking & Finance Sector Insights',
                    'Commodity Trading (Gold, Oil)',
                    'IPO and New Listings',
                    'Regulatory Framework (CMA/DFSA)'
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
                    name: 'Ahmed Al-Kuwari',
                    title: 'Senior Market Analyst',
                    experience: '15+ years',
                    specialization: 'GCC Markets & Forex',
                    achievements: 'Former QNB Capital Head Analyst'
                  },
                  {
                    name: 'Sarah Al-Zaabi',
                    title: 'Technical Analysis Expert',
                    experience: '12+ years',
                    specialization: 'Chart Patterns & Indicators',
                    achievements: 'Certified Financial Technician (CFTe)'
                  },
                  {
                    name: 'Mohammed Al-Suwaidi',
                    title: 'Risk Management Specialist',
                    experience: '10+ years',
                    specialization: 'Portfolio Management',
                    achievements: 'Former Emirates NBD Investment Manager'
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