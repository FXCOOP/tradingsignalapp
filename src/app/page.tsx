'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null)
  const [selectedNews, setSelectedNews] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Live Market Data for Asian Markets
  const asianMarkets = [
    { name: 'USD/PKR', price: '278.45', change: '+0.35', changePercent: '+0.13%', trend: 'up', volume: '2.4M' },
    { name: 'KSE-100', price: '91,247', change: '+125', changePercent: '+0.14%', trend: 'up', volume: '45.2M' },
    { name: 'PSX (KSE)', price: '45,623', change: '-89', changePercent: '-0.19%', trend: 'down', volume: '12.8M' },
    { name: 'Nikkei 225', price: '40,875', change: '+145', changePercent: '+0.36%', trend: 'up', volume: '89.1M' },
    { name: 'Hang Seng', price: '19,250', change: '-78', changePercent: '-0.40%', trend: 'down', volume: '67.3M' },
    { name: 'Shanghai', price: '3,127', change: '+12', changePercent: '+0.39%', trend: 'up', volume: '234.5M' }
  ]

  // Breaking News for Pakistan & Asian Markets
  const breakingNews = [
    {
      id: 1,
      title: 'Pakistan Central Bank Keeps Key Rate Unchanged at 15%',
      summary: 'State Bank of Pakistan maintains policy rate amid inflation concerns',
      category: 'Monetary Policy',
      time: '2 hours ago',
      impact: 'High',
      readTime: '3 min read',
      imageUrl: '📊',
      content: 'The State Bank of Pakistan (SBP) has decided to keep the policy rate unchanged at 15% in its latest monetary policy meeting. The decision comes as inflation remains above target levels at 28.3% year-on-year. Governor Jameel Ahmad cited ongoing fiscal challenges and external account pressures as key factors in the decision. The central bank expects inflation to moderate gradually in the coming quarters, with targeted measures to support economic stability while maintaining price stability as the primary objective.'
    },
    {
      id: 2,
      title: 'PSX Reaches New Monthly High Amid Foreign Investment Inflows',
      summary: 'KSE-100 index gains 1,200 points in January on strong foreign buying',
      category: 'Stock Market',
      time: '4 hours ago',
      impact: 'High',
      readTime: '4 min read',
      imageUrl: '📈',
      content: 'Pakistan Stock Exchange (PSX) witnessed unprecedented foreign investment inflows totaling $89 million in January 2025, driving the KSE-100 index to new monthly highs. Key sectors including banking, cement, and textiles led the rally. Foreign institutional investors showed particular interest in blue-chip stocks, with HBL, UBL, and Lucky Cement being major beneficiaries. Market analysts attribute this to improved macroeconomic indicators and positive developments in the IMF program review.'
    },
    {
      id: 3,
      title: 'China-Pakistan Economic Corridor Phase II Projects Approved',
      summary: '$8.2 billion infrastructure development to boost bilateral trade',
      category: 'Economic Development',
      time: '6 hours ago',
      impact: 'Medium',
      readTime: '5 min read',
      imageUrl: '🏗️',
      content: 'The governments of China and Pakistan have formally approved Phase II of the China-Pakistan Economic Corridor (CPEC), involving $8.2 billion in infrastructure development projects. The new phase focuses on industrial cooperation, agricultural modernization, and digital connectivity. Key projects include the establishment of Special Economic Zones in Gwadar, Rashakai, and Dhabeji, expected to create over 200,000 jobs and significantly boost bilateral trade volumes.'
    }
  ]

  // Economic Calendar Events
  const economicEvents = [
    { time: '09:30', event: 'Pakistan CPI (YoY)', importance: 'High', forecast: '28.1%', previous: '28.3%', impact: 'PKR' },
    { time: '11:00', event: 'China GDP (QoQ)', importance: 'High', forecast: '1.2%', previous: '0.9%', impact: 'CNY' },
    { time: '14:30', event: 'India Trade Balance', importance: 'Medium', forecast: '-$22.1B', previous: '-$21.8B', impact: 'INR' },
    { time: '16:00', event: 'Japan Core CPI', importance: 'Medium', forecast: '2.8%', previous: '2.7%', impact: 'JPY' }
  ]

  // Comprehensive signal data with detailed analysis
  const signals = [
    {
      id: 1,
      symbol: 'XAU/USD',
      pair: 'Gold',
      type: 'BUY',
      entry: '2640.50',
      sl: '2630.00',
      tp1: '2650.00',
      tp2: '2660.00',
      confidence: 85,
      pips: '+95',
      status: 'ACTIVE',
      color: '#10b981',
      category: 'Commodities',
      timeframe: '4H',
      riskReward: '1:2.1',
      accuracy: 89,
      volume: 'High',
      trend: 'Bullish'
    },
    {
      id: 2,
      symbol: 'EUR/USD',
      pair: 'Euro',
      type: 'SELL',
      entry: '1.1120',
      sl: '1.1150',
      tp1: '1.1090',
      tp2: '1.1060',
      confidence: 78,
      pips: '+30',
      status: 'ACTIVE',
      color: '#ef4444',
      category: 'Forex',
      timeframe: '1H',
      riskReward: '1:1.8',
      accuracy: 82,
      volume: 'Medium',
      trend: 'Bearish'
    },
    {
      id: 3,
      symbol: 'BTC/USD',
      pair: 'Bitcoin',
      type: 'BUY',
      entry: '43,250',
      sl: '42,800',
      tp1: '44,000',
      tp2: '44,500',
      confidence: 92,
      pips: '+750',
      status: 'ACTIVE',
      color: '#10b981',
      category: 'Crypto',
      timeframe: '4H',
      riskReward: '1:2.7',
      accuracy: 94,
      volume: 'Very High',
      trend: 'Bullish'
    }
  ]

  const ProgressBar = ({ value, max = 100, color = '#3b82f6' }: { value: number; max?: number; color?: string }) => (
    <div style={{
      width: '100%',
      height: '6px',
      backgroundColor: '#e5e7eb',
      borderRadius: '3px',
      overflow: 'hidden'
    }}>
      <div
        style={{
          width: `${(value / max) * 100}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '3px',
          transition: 'width 0.8s ease-in-out'
        }}
      />
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: 1.6
    }}>

      {/* Premium Market Ticker */}
      <div style={{
        background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
        borderBottom: '1px solid #475569',
        padding: '12px 0',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          animation: 'marquee 40s linear infinite',
          whiteSpace: 'nowrap'
        }}>
          {asianMarkets.concat(asianMarkets).map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '48px',
              fontSize: '14px',
              color: '#f8fafc',
              fontWeight: '500'
            }}>
              <span style={{
                color: '#e2e8f0',
                fontWeight: '600',
                marginRight: '8px'
              }}>
                {item.name}
              </span>
              <span style={{
                color: '#f8fafc',
                marginRight: '8px',
                fontWeight: '700',
                fontSize: '15px'
              }}>
                {item.price}
              </span>
              <span style={{
                color: item.trend === 'up' ? '#10b981' : '#ef4444',
                fontSize: '13px',
                fontWeight: '600',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: item.trend === 'up' ? '#10b98115' : '#ef444415'
              }}>
                {item.changePercent}
              </span>
              <span style={{
                color: item.trend === 'up' ? '#10b981' : '#ef4444',
                fontSize: '12px',
                marginLeft: '6px'
              }}>
                {item.trend === 'up' ? '▲' : '▼'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Navigation Header */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              letterSpacing: '-0.025em'
            }}>
              <span style={{ fontSize: '32px' }}>📊</span>
              PK Signal Pulse
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#10b981',
                backgroundColor: '#10b98115',
                padding: '3px 8px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                LIVE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                { key: 'dashboard', label: 'Market Overview', icon: '📈' },
                { key: 'signals', label: 'Live Signals', icon: '⚡' },
                { key: 'markets', label: 'Asian Markets', icon: '🌏' },
                { key: 'news', label: 'Market News', icon: '📰' },
                { key: 'calendar', label: 'Economic Calendar', icon: '📅' },
                { key: 'education', label: 'Education', icon: '🎓' },
                { key: 'ai-analysis', label: 'AI Analytics', icon: '🤖' },
                { key: 'pricing', label: 'Premium', icon: '💎' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    background: activeTab === tab.key
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      : 'transparent',
                    color: activeTab === tab.key ? '#ffffff' : '#64748b',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeTab === tab.key ? '600' : '500',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transform: activeTab === tab.key ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: activeTab === tab.key ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#64748b',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              LIVE • {currentTime.toLocaleTimeString()}
            </div>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('login') }}
              style={{
                background: 'transparent',
                border: '2px solid #3b82f6',
                color: '#3b82f6',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Login
            </button>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('register') }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              Get Premium
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Enhanced Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Hero Section */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '32px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.025em'
                }}>
                  Pakistan's Premier Trading Intelligence
                </h1>
                <p style={{
                  fontSize: '20px',
                  color: '#cbd5e1',
                  marginBottom: '32px',
                  maxWidth: '600px',
                  lineHeight: 1.6
                }}>
                  AI-powered market analysis with 89.4% accuracy. Real-time signals, comprehensive research, and professional-grade tools for Pakistani traders.
                </p>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                  }}>
                    Start Trading Now
                  </button>
                  <button style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}>
                    View Live Signals
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Performance Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {[
                { title: 'Active Signals', value: '24', change: '+8 today', icon: '🎯', color: '#3b82f6', progress: 85, subtitle: 'Live trading opportunities' },
                { title: 'Success Rate', value: '89.4%', change: '+2.1% this month', icon: '🏆', color: '#10b981', progress: 89, subtitle: 'Proven accuracy' },
                { title: 'Total Pips', value: '2,847', change: '+124 today', icon: '📈', color: '#f59e0b', progress: 76, subtitle: 'Profit generated' },
                { title: 'Premium Members', value: '5,240', change: '+89 today', icon: '👥', color: '#8b5cf6', progress: 92, subtitle: 'Growing community' }
              ].map((metric, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80px',
                    height: '80px',
                    background: `radial-gradient(circle, ${metric.color}15 0%, transparent 70%)`,
                    borderRadius: '50%'
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#64748b',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {metric.title}
                      </span>
                      <span style={{ fontSize: '28px' }}>{metric.icon}</span>
                    </div>

                    <div style={{ fontSize: '36px', fontWeight: '800', color: metric.color, marginBottom: '8px' }}>
                      {metric.value}
                    </div>

                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                      {metric.subtitle}
                    </div>

                    <ProgressBar value={metric.progress} color={metric.color} />

                    <div style={{ fontSize: '13px', color: '#10b981', fontWeight: '600', marginTop: '12px' }}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Trading Signals Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '8px',
                    letterSpacing: '-0.025em'
                  }}>
                    🔴 Live Premium Signals
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>
                    AI-powered trading opportunities with real-time analysis
                  </p>
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  View All Signals
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {signals.map((signal) => (
                  <div key={signal.id} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '16px',
                    padding: '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    {/* Signal Header */}
                    <div style={{
                      background: `linear-gradient(135deg, ${signal.color}08 0%, ${signal.color}03 100%)`,
                      padding: '24px',
                      borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
                      borderLeft: `4px solid ${signal.color}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h3 style={{
                              fontSize: '24px',
                              fontWeight: '800',
                              color: '#0f172a',
                              margin: '0',
                              letterSpacing: '-0.025em'
                            }}>
                              {signal.symbol}
                            </h3>
                            <span style={{
                              fontSize: '16px',
                              color: '#64748b',
                              fontWeight: '500'
                            }}>
                              {signal.pair}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{
                              color: '#64748b',
                              fontSize: '14px',
                              background: 'rgba(100, 116, 139, 0.1)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontWeight: '500'
                            }}>
                              {signal.category}
                            </span>
                            <span style={{
                              color: '#64748b',
                              fontSize: '14px',
                              background: 'rgba(100, 116, 139, 0.1)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontWeight: '500'
                            }}>
                              {signal.timeframe}
                            </span>
                            <span style={{
                              color: '#64748b',
                              fontSize: '14px',
                              background: 'rgba(100, 116, 139, 0.1)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontWeight: '500'
                            }}>
                              R:R {signal.riskReward}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{
                            background: signal.type === 'BUY'
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            boxShadow: signal.type === 'BUY'
                              ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                              : '0 4px 12px rgba(239, 68, 68, 0.3)'
                          }}>
                            {signal.type}
                          </span>
                          <span style={{
                            background: signal.status === 'ACTIVE' ? '#10b98115' : '#f59e0b15',
                            color: signal.status === 'ACTIVE' ? '#10b981' : '#f59e0b',
                            padding: '6px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            ● {signal.status}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Signal Data Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '16px',
                        marginBottom: '20px'
                      }}>
                        {[
                          { label: 'ENTRY PRICE', value: signal.entry, color: '#3b82f6' },
                          { label: 'STOP LOSS', value: signal.sl, color: '#ef4444' },
                          { label: 'TARGET 1', value: signal.tp1, color: '#10b981' },
                          { label: 'TARGET 2', value: signal.tp2, color: '#10b981' },
                          { label: 'CONFIDENCE', value: `${signal.confidence}%`, color: '#8b5cf6' },
                          { label: 'POTENTIAL', value: signal.pips, color: '#f59e0b' }
                        ].map((item, index) => (
                          <div key={index} style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(226, 232, 240, 0.5)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{
                              color: '#64748b',
                              fontSize: '11px',
                              marginBottom: '6px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              {item.label}
                            </div>
                            <div style={{
                              color: item.color,
                              fontSize: '18px',
                              fontWeight: '800',
                              letterSpacing: '-0.025em'
                            }}>
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          border: 'none',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          transition: 'all 0.3s ease'
                        }}>
                          📋 Copy Signal
                        </button>
                        <button style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          border: 'none',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                          transition: 'all 0.3s ease'
                        }}>
                          🔔 Set Alert
                        </button>
                        <button
                          onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
                          style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            border: '2px solid rgba(100, 116, 139, 0.2)',
                            color: '#64748b',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          📊 {selectedSignal === signal.id ? 'Hide Analysis' : 'View Analysis'}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Analysis Section */}
                    {selectedSignal === signal.id && (
                      <div style={{
                        padding: '32px',
                        background: 'rgba(248, 250, 252, 0.8)',
                        borderTop: '1px solid rgba(226, 232, 240, 0.5)'
                      }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '24px',
                          borderRadius: '12px',
                          border: '1px solid rgba(226, 232, 240, 0.5)'
                        }}>
                          <h4 style={{
                            color: '#0f172a',
                            fontSize: '18px',
                            fontWeight: '700',
                            marginBottom: '16px'
                          }}>
                            📈 Technical Analysis Summary
                          </h4>
                          <p style={{
                            color: '#475569',
                            fontSize: '15px',
                            lineHeight: 1.7,
                            margin: '0 0 20px 0'
                          }}>
                            Our AI models have identified a high-probability {signal.type.toLowerCase()} opportunity in {signal.symbol} based on multiple technical confluences including trend analysis, support/resistance levels, and momentum indicators.
                          </p>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px'
                          }}>
                            <div>
                              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>AI Accuracy: </span>
                              <span style={{ color: '#10b981', fontWeight: '700' }}>{signal.accuracy}%</span>
                            </div>
                            <div>
                              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Market Volume: </span>
                              <span style={{ color: '#0f172a', fontWeight: '700' }}>{signal.volume}</span>
                            </div>
                            <div>
                              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Trend Direction: </span>
                              <span style={{ color: signal.color, fontWeight: '700' }}>{signal.trend}</span>
                            </div>
                            <div>
                              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Risk Level: </span>
                              <span style={{ color: '#f59e0b', fontWeight: '700' }}>Moderate</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Market News Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '8px',
                    letterSpacing: '-0.025em'
                  }}>
                    📰 Latest Market News
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>
                    Breaking news and analysis from Pakistan and Asian markets
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
              }}>
                {breakingNews.map((news) => (
                  <article key={news.id} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    borderLeft: `4px solid ${
                      news.impact === 'High' ? '#ef4444' :
                      news.impact === 'Medium' ? '#f59e0b' : '#10b981'
                    }`
                  }}>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '32px' }}>{news.imageUrl}</span>
                        <div>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                            <span style={{
                              background: news.impact === 'High' ? '#ef444415' :
                                         news.impact === 'Medium' ? '#f59e0b15' : '#10b98115',
                              color: news.impact === 'High' ? '#ef4444' :
                                     news.impact === 'Medium' ? '#f59e0b' : '#10b981',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              {news.impact} Impact
                            </span>
                            <span style={{
                              background: 'rgba(100, 116, 139, 0.1)',
                              color: '#64748b',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600'
                            }}>
                              {news.category}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {news.time} • {news.readTime}
                          </div>
                        </div>
                      </div>

                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '12px',
                        lineHeight: 1.4,
                        letterSpacing: '-0.025em'
                      }}>
                        {news.title}
                      </h3>

                      <p style={{
                        color: '#64748b',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        marginBottom: '16px'
                      }}>
                        {news.summary}
                      </p>

                      <button
                        onClick={() => setSelectedNews(selectedNews === news.id ? null : news.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#3b82f6',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          padding: '0',
                          textDecoration: 'underline'
                        }}
                      >
                        {selectedNews === news.id ? 'Hide Details' : 'Read Full Article →'}
                      </button>

                      {selectedNews === news.id && (
                        <div style={{
                          marginTop: '16px',
                          padding: '16px',
                          background: 'rgba(248, 250, 252, 0.8)',
                          borderRadius: '8px',
                          borderLeft: '3px solid #3b82f6'
                        }}>
                          <p style={{
                            color: '#475569',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            margin: '0'
                          }}>
                            {news.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Live Signals Tab */}
        {activeTab === 'signals' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#0f172a',
                  marginBottom: '8px',
                  letterSpacing: '-0.025em'
                }}>
                  ⚡ Live Trading Signals
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Real-time AI-powered trading opportunities with detailed analysis
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  🔔 Subscribe to Alerts
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {signals.map((signal) => (
                <div key={signal.id} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  borderLeft: `4px solid ${signal.color}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#0f172a',
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.025em'
                      }}>
                        {signal.symbol} • {signal.pair}
                      </h3>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{
                          background: 'rgba(100, 116, 139, 0.1)',
                          color: '#64748b',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {signal.category}
                        </span>
                        <span style={{
                          background: 'rgba(100, 116, 139, 0.1)',
                          color: '#64748b',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {signal.timeframe}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        background: signal.type === 'BUY'
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: signal.type === 'BUY'
                          ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                          : '0 4px 12px rgba(239, 68, 68, 0.3)'
                      }}>
                        {signal.type}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    {[
                      { label: 'Entry Price', value: signal.entry, icon: '🎯' },
                      { label: 'Stop Loss', value: signal.sl, icon: '🛡️' },
                      { label: 'Target 1', value: signal.tp1, icon: '🎯' },
                      { label: 'Confidence', value: `${signal.confidence}%`, icon: '⭐' }
                    ].map((item, index) => (
                      <div key={index} style={{
                        background: 'rgba(248, 250, 252, 0.8)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '20px',
                          marginBottom: '8px'
                        }}>
                          {item.icon}
                        </div>
                        <div style={{
                          color: '#64748b',
                          fontSize: '12px',
                          marginBottom: '6px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {item.label}
                        </div>
                        <div style={{
                          color: '#0f172a',
                          fontSize: '18px',
                          fontWeight: '800'
                        }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      border: 'none',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      📋 Copy Signal
                    </button>
                    <button style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      🔔 Set Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Asian Markets Tab */}
        {activeTab === 'markets' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                🌏 Asian Markets Live Data
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Real-time market data and analysis for Pakistan and Asian markets
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {asianMarkets.map((market, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  borderLeft: `4px solid ${market.trend === 'up' ? '#10b981' : '#ef4444'}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#0f172a',
                      margin: '0'
                    }}>
                      {market.name}
                    </h3>
                    <span style={{ fontSize: '24px' }}>
                      {market.trend === 'up' ? '📈' : '📉'}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '12px'
                  }}>
                    {market.price}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        color: market.trend === 'up' ? '#10b981' : '#ef4444',
                        fontSize: '16px',
                        fontWeight: '700'
                      }}>
                        {market.change}
                      </span>
                      <span style={{
                        color: market.trend === 'up' ? '#10b981' : '#ef4444',
                        fontSize: '16px',
                        fontWeight: '700'
                      }}>
                        ({market.changePercent})
                      </span>
                    </div>
                    <div style={{
                      background: 'rgba(100, 116, 139, 0.1)',
                      color: '#64748b',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Vol: {market.volume}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '20px'
              }}>
                🇵🇰 Pakistan Market Analysis
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                color: '#64748b',
                fontSize: '15px',
                lineHeight: 1.7
              }}>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    KSE-100 Performance
                  </h4>
                  <p>The Pakistan Stock Exchange continues showing resilience with strong foreign investment inflows and positive economic indicators driving growth.</p>
                </div>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    PKR Exchange Rate
                  </h4>
                  <p>Pakistani Rupee has stabilized against major currencies following IMF program milestones and improved foreign exchange reserves.</p>
                </div>
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Sector Outlook
                  </h4>
                  <p>Banking, cement, and textile sectors lead the rally with strong institutional interest and improved profit margins across the board.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Market News Tab */}
        {activeTab === 'news' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                📰 Market News & Analysis
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Breaking news and expert analysis from Pakistan and Asian financial markets
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '24px'
            }}>
              {breakingNews.map((news) => (
                <article key={news.id} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${
                    news.impact === 'High' ? '#ef4444' :
                    news.impact === 'Medium' ? '#f59e0b' : '#10b981'
                  }`
                }}>
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '40px' }}>{news.imageUrl}</span>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <span style={{
                            background: news.impact === 'High' ? '#ef444415' :
                                       news.impact === 'Medium' ? '#f59e0b15' : '#10b98115',
                            color: news.impact === 'High' ? '#ef4444' :
                                   news.impact === 'Medium' ? '#f59e0b' : '#10b981',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {news.impact} Impact
                          </span>
                          <span style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            color: '#64748b',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {news.category}
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                          {news.time} • {news.readTime}
                        </div>
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '12px',
                      lineHeight: 1.4,
                      letterSpacing: '-0.025em'
                    }}>
                      {news.title}
                    </h3>

                    <p style={{
                      color: '#64748b',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      {news.summary}
                    </p>

                    <button
                      onClick={() => setSelectedNews(selectedNews === news.id ? null : news.id)}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {selectedNews === news.id ? 'Hide Details' : 'Read Full Article →'}
                    </button>

                    {selectedNews === news.id && (
                      <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        background: 'rgba(248, 250, 252, 0.8)',
                        borderRadius: '12px',
                        borderLeft: '3px solid #3b82f6'
                      }}>
                        <p style={{
                          color: '#475569',
                          fontSize: '15px',
                          lineHeight: 1.7,
                          margin: '0'
                        }}>
                          {news.content}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Economic Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '8px',
                letterSpacing: '-0.025em'
              }}>
                📅 Economic Calendar
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Key economic events and data releases for Asian markets
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                Today's Key Events
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {economicEvents.map((event, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 120px 120px 120px 80px',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '20px',
                    background: 'rgba(248, 250, 252, 0.8)',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${event.importance === 'High' ? '#ef4444' : '#f59e0b'}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}>
                      {event.time}
                    </span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#0f172a'
                    }}>
                      {event.event}
                    </span>
                    <span style={{
                      background: event.importance === 'High' ? '#ef444415' : '#f59e0b15',
                      color: event.importance === 'High' ? '#ef4444' : '#f59e0b',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {event.importance}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#3b82f6'
                    }}>
                      {event.forecast}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      {event.previous}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b',
                      background: 'rgba(100, 116, 139, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      textAlign: 'center'
                    }}>
                      {event.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '20px'
              }}>
                📊 Weekly Market Outlook
              </h3>
              <div style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7 }}>
                <p><strong>This Week's Focus:</strong> Central bank meetings from Pakistan and China will dominate market sentiment, with inflation data releases from major Asian economies providing additional trading opportunities.</p>
                <p><strong>Key Levels to Watch:</strong> USD/PKR resistance at 280.00, KSE-100 support at 90,000, and Nikkei 225 testing 41,000 psychological level.</p>
                <p><strong>Trading Strategy:</strong> Focus on news-driven volatility around central bank announcements and position accordingly for potential breakouts in major currency pairs.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '60px 0 30px 0',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '32px' }}>📊</span>
                PK Signal Pulse
              </div>
              <p style={{
                color: '#cbd5e1',
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                Pakistan's premier AI-powered trading signals platform. Empowering traders with professional-grade market analysis and consistent profitable opportunities.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📧', '📱', '💬', '🔗'].map((icon, index) => (
                  <span key={index} style={{
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#f8fafc'
              }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {['Dashboard', 'Live Signals', 'AI Analysis', 'Education', 'Premium'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#cbd5e1',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#f8fafc'
              }}>
                Support
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {['Help Center', 'Contact Us', 'Live Chat', 'WhatsApp Support', 'Telegram Channel'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#cbd5e1',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#f8fafc'
              }}>
                Legal
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {['Terms of Service', 'Privacy Policy', 'Risk Disclaimer', 'Refund Policy'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#cbd5e1',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '30px'
          }}>
            <h5 style={{
              color: '#fbbf24',
              fontSize: '16px',
              marginBottom: '12px',
              fontWeight: '700'
            }}>
              ⚠️ Risk Disclaimer
            </h5>
            <p style={{
              color: '#fef3c7',
              fontSize: '14px',
              lineHeight: 1.6,
              margin: '0'
            }}>
              <strong>Trading involves substantial risk and may not be suitable for all investors.</strong> Past performance is not indicative of future results. The high degree of leverage can work against you as well as for you. Our signals are for educational purposes only and should not be considered as financial advice.
            </p>
          </div>

          {/* Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>
              © 2025 PK Signal Pulse. All rights reserved. | Licensed in Pakistan
            </div>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>
              🇵🇰 Proudly serving Pakistani traders | 🔒 SSL Secured | ✅ Verified Platform
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Auth Modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '40px',
            width: '440px',
            maxWidth: '90vw',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                margin: '0',
                color: '#0f172a'
              }}>
                {authMode === 'login' ? 'Welcome Back' : 'Join PK Signal Pulse'}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '28px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#0f172a',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#0f172a',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              />
              {authMode === 'register' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#0f172a',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                />
              )}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <span style={{ color: '#64748b', fontSize: '14px' }}>
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textDecoration: 'underline'
                }}
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .signal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .news-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}