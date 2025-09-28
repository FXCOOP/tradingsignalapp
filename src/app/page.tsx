'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [selectedSignal, setSelectedSignal] = useState<number | null>(null)
  const [selectedNews, setSelectedNews] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Enhanced state management for button functionality
  const [notifications, setNotifications] = useState<string[]>([])
  const [copiedSignals, setCopiedSignals] = useState<number[]>([])
  const [alertsSet, setAlertsSet] = useState<number[]>([])
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null)
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([])
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Comprehensive button handler functions
  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }

  const handleCopySignal = (signalId: number) => {
    setCopiedSignals(prev => [...prev, signalId])
    showNotification(`Signal ${signalId} copied to clipboard!`)
    // Simulate copying to clipboard
    navigator.clipboard?.writeText(`Trading Signal ${signalId} - Check PK Signal Pulse for details`)
  }

  const handleSetAlert = (signalId: number) => {
    setAlertsSet(prev => [...prev, signalId])
    showNotification(`Alert set for Signal ${signalId}!`)
  }

  const handleEnrollCourse = (courseId: number) => {
    setEnrolledCourses(prev => [...prev, courseId])
    showNotification(`Successfully enrolled in course ${courseId}!`)
  }

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName)
    setModalMessage(`Selected ${planName} plan! Redirecting to payment...`)
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 3000)
  }

  const handleStartTrading = () => {
    showNotification('Redirecting to trading platform...')
    setTimeout(() => {
      window.open('https://www.metatrader4.com/en/download', '_blank')
    }, 1000)
  }

  const handleViewSignals = () => {
    setActiveTab('signals')
    showNotification('Viewing live trading signals')
  }

  const handleBookmarkArticle = (articleId: number) => {
    setBookmarkedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    )
    showNotification(
      bookmarkedArticles.includes(articleId)
        ? 'Article removed from bookmarks'
        : 'Article bookmarked!'
    )
  }

  const handleContactUs = () => {
    setShowContactForm(true)
    showNotification('Contact form opened')
  }

  const handleBrokerSelect = (brokerName: string) => {
    setSelectedBroker(brokerName)
    showNotification(`Selected ${brokerName} as preferred broker`)
  }

  const handleGetPremium = () => {
    setShowPremiumModal(true)
  }

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
              onClick={handleGetPremium}
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
                  <button
                    onClick={handleStartTrading}
                    style={{
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
                  <button
                    onClick={handleViewSignals}
                    style={{
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
                <button
                  onClick={handleViewSignals}
                  style={{
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
                        <button
                          onClick={() => handleCopySignal(signal.id)}
                          style={{
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
                          📋 {copiedSignals.includes(signal.id) ? 'Copied!' : 'Copy Signal'}
                        </button>
                        <button
                          onClick={() => handleSetAlert(signal.id)}
                          style={{
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
                          🔔 {alertsSet.includes(signal.id) ? 'Alert Set!' : 'Set Alert'}
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

        {/* Education Tab */}
        {activeTab === 'education' && (
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
                  🎓 Trading Education Center
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Master trading fundamentals with our comprehensive courses and tutorials
                </p>
              </div>
            </div>

            {/* Learning Progress */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                📊 Your Learning Progress
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {[
                  { title: 'Trading Fundamentals', progress: 85, lessons: 12, completed: 10, color: '#10b981' },
                  { title: 'Technical Analysis', progress: 60, lessons: 15, completed: 9, color: '#3b82f6' },
                  { title: 'Risk Management', progress: 40, lessons: 8, completed: 3, color: '#f59e0b' },
                  { title: 'Advanced Strategies', progress: 20, lessons: 20, completed: 4, color: '#8b5cf6' }
                ].map((course, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    borderLeft: `4px solid ${course.color}`
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#0f172a',
                      marginBottom: '12px'
                    }}>
                      {course.title}
                    </h4>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{ color: '#64748b', fontSize: '14px' }}>
                          {course.completed}/{course.lessons} lessons completed
                        </span>
                        <span style={{ color: course.color, fontSize: '14px', fontWeight: '600' }}>
                          {course.progress}%
                        </span>
                      </div>

                      <div style={{
                        background: '#e2e8f0',
                        borderRadius: '8px',
                        height: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: course.color,
                          height: '100%',
                          width: `${course.progress}%`,
                          borderRadius: '8px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>

                    <button style={{
                      background: course.color,
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Courses */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                🌟 Featured Courses
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    title: 'Complete Forex Trading Masterclass',
                    description: 'Learn forex trading from scratch with our comprehensive 40-hour course covering everything from basics to advanced strategies.',
                    instructor: 'Ahmad Khan',
                    rating: 4.9,
                    students: 12847,
                    duration: '40 hours',
                    level: 'Beginner to Advanced',
                    price: 'Free',
                    image: '📈',
                    topics: ['Currency Pairs', 'Technical Analysis', 'Risk Management', 'Trading Psychology']
                  },
                  {
                    title: 'Cryptocurrency Trading Essentials',
                    description: 'Master crypto trading with practical strategies for Bitcoin, Ethereum, and altcoins in the Pakistani market.',
                    instructor: 'Sarah Ahmed',
                    rating: 4.8,
                    students: 8934,
                    duration: '25 hours',
                    level: 'Intermediate',
                    price: '$49',
                    image: '₿',
                    topics: ['Blockchain Basics', 'Crypto Analysis', 'Portfolio Management', 'Security']
                  },
                  {
                    title: 'Stock Market Analysis for PSX',
                    description: 'Deep dive into Pakistan Stock Exchange with sector analysis, fundamental research, and investment strategies.',
                    instructor: 'Dr. Hassan Ali',
                    rating: 4.7,
                    students: 6721,
                    duration: '30 hours',
                    level: 'Intermediate',
                    price: '$79',
                    image: '📊',
                    topics: ['PSX Fundamentals', 'Company Analysis', 'Sector Rotation', 'Portfolio Building']
                  }
                ].map((course, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '48px' }}>{course.image}</span>
                        <div>
                          <h4 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '4px'
                          }}>
                            {course.title}
                          </h4>
                          <p style={{ color: '#64748b', fontSize: '14px', margin: '0' }}>
                            by {course.instructor}
                          </p>
                        </div>
                      </div>

                      <p style={{
                        color: '#64748b',
                        fontSize: '15px',
                        lineHeight: 1.6,
                        marginBottom: '16px'
                      }}>
                        {course.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#fbbf24', fontSize: '16px' }}>⭐</span>
                          <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px' }}>
                            {course.rating}
                          </span>
                        </div>
                        <span style={{ color: '#64748b', fontSize: '14px' }}>
                          ({course.students.toLocaleString()} students)
                        </span>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Duration</span>
                          <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px' }}>
                            {course.duration}
                          </span>
                        </div>
                        <div>
                          <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Level</span>
                          <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px' }}>
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                          Course Topics:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {course.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} style={{
                              background: 'rgba(59, 130, 246, 0.1)',
                              color: '#3b82f6',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '24px',
                          fontWeight: '800',
                          color: course.price === 'Free' ? '#10b981' : '#0f172a'
                        }}>
                          {course.price}
                        </span>
                        <button style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          border: 'none',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }}>
                          {course.price === 'Free' ? 'Start Free' : 'Enroll Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Tips & Articles */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                💡 Latest Trading Tips & Articles
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    title: '5 Essential Risk Management Rules Every Pakistani Trader Must Know',
                    excerpt: 'Protect your capital with these proven risk management strategies tailored for the Pakistani market...',
                    author: 'Trading Expert Team',
                    readTime: '8 min read',
                    category: 'Risk Management',
                    publishDate: '2 days ago',
                    icon: '🛡️'
                  },
                  {
                    title: 'Understanding PKR Currency Pairs: A Complete Guide',
                    excerpt: 'Master the intricacies of Pakistani Rupee trading pairs and discover profitable opportunities...',
                    author: 'Forex Specialist',
                    readTime: '12 min read',
                    category: 'Forex',
                    publishDate: '1 week ago',
                    icon: '💱'
                  },
                  {
                    title: 'PSX Sector Analysis: Where to Invest in 2025',
                    excerpt: 'Comprehensive analysis of Pakistan Stock Exchange sectors with investment recommendations...',
                    author: 'Market Analyst',
                    readTime: '15 min read',
                    category: 'Stocks',
                    publishDate: '3 days ago',
                    icon: '📈'
                  },
                  {
                    title: 'Crypto Trading Psychology: Mastering Your Emotions',
                    excerpt: 'Learn how to control fear and greed while trading cryptocurrencies in volatile markets...',
                    author: 'Psychology Expert',
                    readTime: '10 min read',
                    category: 'Psychology',
                    publishDate: '5 days ago',
                    icon: '🧠'
                  }
                ].map((article, index) => (
                  <article key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '32px' }}>{article.icon}</span>
                      <div>
                        <span style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                          {article.publishDate} • {article.readTime}
                        </div>
                      </div>
                    </div>

                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '12px',
                      lineHeight: 1.4
                    }}>
                      {article.title}
                    </h4>

                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '16px'
                    }}>
                      {article.excerpt}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontSize: '13px' }}>
                        by {article.author}
                      </span>
                      <button style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#3b82f6',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}>
                        Read More →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Quick Learning Tools */}
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
                marginBottom: '24px'
              }}>
                🛠️ Quick Learning Tools
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    title: 'Trading Calculator',
                    description: 'Calculate position size, risk, and potential profits',
                    icon: '🧮',
                    action: 'Use Calculator'
                  },
                  {
                    title: 'Market Glossary',
                    description: 'Comprehensive dictionary of trading terms',
                    icon: '📚',
                    action: 'Browse Terms'
                  },
                  {
                    title: 'Economic Calendar',
                    description: 'Track important economic events and their impact',
                    icon: '📅',
                    action: 'View Calendar'
                  },
                  {
                    title: 'Practice Trading',
                    description: 'Demo trading platform to practice strategies',
                    icon: '🎯',
                    action: 'Start Demo'
                  }
                ].map((tool, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}>
                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>
                      {tool.icon}
                    </span>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {tool.title}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '20px',
                      lineHeight: 1.5
                    }}>
                      {tool.description}
                    </p>
                    <button style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      {tool.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'ai-analysis' && (
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
                  🤖 AI Market Analysis
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Advanced AI-powered market insights and predictions for informed trading decisions
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                }}>
                  🔮 Generate New Analysis
                </button>
              </div>
            </div>

            {/* AI Performance Stats */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                🎯 AI Performance Metrics
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {[
                  { metric: 'Prediction Accuracy', value: '87.3%', change: '+2.1%', color: '#10b981', icon: '🎯' },
                  { metric: 'Active Models', value: '24', change: '+3', color: '#3b82f6', icon: '🤖' },
                  { metric: 'Data Points Analyzed', value: '2.4M', change: '+150K', color: '#f59e0b', icon: '📊' },
                  { metric: 'Success Rate (7d)', value: '91.2%', change: '+4.8%', color: '#8b5cf6', icon: '📈' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    borderTop: `4px solid ${stat.color}`
                  }}>
                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>
                      {stat.icon}
                    </span>
                    <h4 style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      color: '#0f172a',
                      marginBottom: '4px'
                    }}>
                      {stat.value}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      {stat.metric}
                    </p>
                    <span style={{
                      color: stat.color,
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {stat.change} this week
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time AI Insights */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                ⚡ Real-time AI Insights
              </h3>

              <div style={{ display: 'grid', gap: '20px' }}>
                {[
                  {
                    title: 'Market Sentiment Analysis',
                    confidence: 94,
                    trend: 'Bullish',
                    timeframe: '4H',
                    analysis: 'AI models detect strong bullish sentiment across major pairs with USD/PKR showing consolidation patterns. Institutional buying pressure increasing.',
                    signals: ['Strong momentum indicators', 'Volume confirmation', 'Breakout potential'],
                    lastUpdated: '2 minutes ago',
                    icon: '💭',
                    color: '#10b981'
                  },
                  {
                    title: 'Price Action Prediction',
                    confidence: 89,
                    trend: 'Ranging',
                    timeframe: '1D',
                    analysis: 'Neural networks predict sideways movement in major indices with potential breakout expected within 48-72 hours based on pattern recognition.',
                    signals: ['Range-bound patterns', 'Support/resistance levels', 'Breakout setup'],
                    lastUpdated: '5 minutes ago',
                    icon: '📊',
                    color: '#f59e0b'
                  },
                  {
                    title: 'Risk Assessment',
                    confidence: 92,
                    trend: 'Moderate',
                    timeframe: 'Multi',
                    analysis: 'Current market conditions show moderate risk levels. AI recommends position sizing at 65% of normal allocation with tight stop-losses.',
                    signals: ['Volatility monitoring', 'Position sizing alerts', 'Risk management'],
                    lastUpdated: '1 minute ago',
                    icon: '⚖️',
                    color: '#3b82f6'
                  }
                ].map((insight, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '28px',
                    borderLeft: `4px solid ${insight.color}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '32px' }}>{insight.icon}</span>
                        <div>
                          <h4 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '4px'
                          }}>
                            {insight.title}
                          </h4>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{
                              background: `${insight.color}15`,
                              color: insight.color,
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {insight.trend}
                            </span>
                            <span style={{ color: '#64748b', fontSize: '12px' }}>
                              {insight.timeframe}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: '800',
                          color: insight.color,
                          marginBottom: '4px'
                        }}>
                          {insight.confidence}%
                        </div>
                        <div style={{ color: '#64748b', fontSize: '12px' }}>
                          Confidence
                        </div>
                      </div>
                    </div>

                    <p style={{
                      color: '#475569',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      {insight.analysis}
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        color: '#64748b',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Key Signals:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {insight.signals.map((signal, signalIndex) => (
                          <span key={signalIndex} style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            color: '#64748b',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>
                        Updated {insight.lastUpdated}
                      </span>
                      <button style={{
                        background: insight.color,
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Model Performance */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px'
              }}>
                🧠 Active AI Models
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    name: 'DeepTrend Neural Network',
                    type: 'Trend Analysis',
                    accuracy: '91.2%',
                    status: 'Active',
                    description: 'Advanced LSTM neural network for trend prediction and momentum analysis',
                    trainedOn: '2.1M data points',
                    specialty: 'Long-term trends',
                    icon: '🌊',
                    color: '#3b82f6'
                  },
                  {
                    name: 'Sentiment AI Engine',
                    type: 'Market Sentiment',
                    accuracy: '87.8%',
                    status: 'Active',
                    description: 'NLP-powered sentiment analysis from news, social media, and market data',
                    trainedOn: '500K articles',
                    specialty: 'News impact',
                    icon: '💭',
                    color: '#10b981'
                  },
                  {
                    name: 'Pattern Recognition AI',
                    type: 'Technical Patterns',
                    accuracy: '89.5%',
                    status: 'Active',
                    description: 'Computer vision model for detecting chart patterns and formations',
                    trainedOn: '1.8M charts',
                    specialty: 'Chart patterns',
                    icon: '🔍',
                    color: '#f59e0b'
                  },
                  {
                    name: 'Risk Assessment ML',
                    type: 'Risk Management',
                    accuracy: '93.7%',
                    status: 'Active',
                    description: 'Machine learning model for portfolio risk assessment and optimization',
                    trainedOn: '850K trades',
                    specialty: 'Risk control',
                    icon: '🛡️',
                    color: '#ef4444'
                  }
                ].map((model, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    borderTop: `4px solid ${model.color}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '32px' }}>{model.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#0f172a',
                          marginBottom: '4px'
                        }}>
                          {model.name}
                        </h4>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{
                            background: `${model.color}15`,
                            color: model.color,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {model.type}
                          </span>
                          <span style={{
                            background: '#10b98115',
                            color: '#10b981',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {model.status}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '800',
                          color: model.color
                        }}>
                          {model.accuracy}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '11px' }}>
                          Accuracy
                        </div>
                      </div>
                    </div>

                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      marginBottom: '16px'
                    }}>
                      {model.description}
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Training Data</span>
                        <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '13px' }}>
                          {model.trainedOn}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Specialty</span>
                        <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '13px' }}>
                          {model.specialty}
                        </span>
                      </div>
                    </div>

                    <button style={{
                      background: model.color,
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      View Model Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Predictions & Forecasts */}
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
                marginBottom: '24px'
              }}>
                🔮 AI Market Predictions
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    pair: 'USD/PKR',
                    currentPrice: '279.45',
                    prediction: 'Bullish',
                    targetPrice: '285.20',
                    timeframe: '7 days',
                    probability: '78%',
                    factors: ['Central bank policy', 'Export growth', 'Political stability'],
                    riskLevel: 'Moderate',
                    icon: '💱',
                    color: '#10b981'
                  },
                  {
                    pair: 'KSE-100',
                    currentPrice: '91,247',
                    prediction: 'Consolidation',
                    targetPrice: '93,500',
                    timeframe: '14 days',
                    probability: '65%',
                    factors: ['Earnings season', 'Interest rates', 'Foreign inflows'],
                    riskLevel: 'Low',
                    icon: '📈',
                    color: '#f59e0b'
                  },
                  {
                    pair: 'BTC/USD',
                    currentPrice: '$67,830',
                    prediction: 'Bearish',
                    targetPrice: '$62,100',
                    timeframe: '5 days',
                    probability: '72%',
                    factors: ['Regulatory concerns', 'Market sentiment', 'Technical signals'],
                    riskLevel: 'High',
                    icon: '₿',
                    color: '#ef4444'
                  },
                  {
                    pair: 'Gold (XAU)',
                    currentPrice: '$2,187',
                    prediction: 'Bullish',
                    targetPrice: '$2,250',
                    timeframe: '10 days',
                    probability: '69%',
                    factors: ['Inflation hedge', 'Safe haven demand', 'Dollar weakness'],
                    riskLevel: 'Low',
                    icon: '🥇',
                    color: '#10b981'
                  }
                ].map((forecast, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    borderLeft: `4px solid ${forecast.color}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '32px' }}>{forecast.icon}</span>
                        <div>
                          <h4 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '4px'
                          }}>
                            {forecast.pair}
                          </h4>
                          <div style={{ color: '#64748b', fontSize: '14px' }}>
                            Current: {forecast.currentPrice}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        background: `${forecast.color}15`,
                        color: forecast.color,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textAlign: 'center'
                      }}>
                        {forecast.prediction}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Target Price</span>
                        <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '16px' }}>
                          {forecast.targetPrice}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Timeframe</span>
                        <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '16px' }}>
                          {forecast.timeframe}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Probability</span>
                        <span style={{ color: forecast.color, fontWeight: '700', fontSize: '16px' }}>
                          {forecast.probability}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Risk Level</span>
                        <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '16px' }}>
                          {forecast.riskLevel}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        color: '#64748b',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Key Factors:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {forecast.factors.map((factor, factorIndex) => (
                          <span key={factorIndex} style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            color: '#64748b',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button style={{
                      background: forecast.color,
                      border: 'none',
                      color: 'white',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      Get Detailed Analysis
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
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
                  💰 Pricing Plans
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Choose the perfect plan for your trading journey
                </p>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                🎉 50% Off Limited Time
              </div>
            </div>

            {/* Special Offer Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                🚀 Launch Week Special
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '16px', opacity: 0.9 }}>
                Get 7 days FREE trial on any plan + 50% off your first month!
              </p>
              <button style={{
                background: 'white',
                color: '#10b981',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                Claim Your Free Trial
              </button>
            </div>

            {/* Pricing Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {[
                {
                  name: 'Basic Trader',
                  price: '$29',
                  originalPrice: '$58',
                  period: '/month',
                  description: 'Perfect for beginners starting their trading journey',
                  isPopular: false,
                  features: [
                    '10 Trading Signals per day',
                    'Basic market analysis',
                    'Email notifications',
                    'Mobile app access',
                    'Community forum access',
                    'Basic educational content',
                    'Risk management alerts',
                    'Customer support'
                  ],
                  notIncluded: [
                    'AI-powered insights',
                    'Premium signals',
                    'Video analysis',
                    'Personal trading mentor'
                  ],
                  color: '#3b82f6',
                  icon: '🌱'
                },
                {
                  name: 'Professional',
                  price: '$79',
                  originalPrice: '$158',
                  period: '/month',
                  description: 'Most popular choice for serious traders',
                  isPopular: true,
                  features: [
                    '50+ Trading Signals per day',
                    'AI-powered market analysis',
                    'Real-time notifications',
                    'Advanced technical analysis',
                    'Video signal explanations',
                    'Priority customer support',
                    'Risk management tools',
                    'Performance tracking',
                    'Educational webinars',
                    'Market news & alerts'
                  ],
                  notIncluded: [
                    'Personal trading mentor',
                    'Custom strategy development'
                  ],
                  color: '#10b981',
                  icon: '⚡'
                },
                {
                  name: 'Elite Trader',
                  price: '$149',
                  originalPrice: '$298',
                  period: '/month',
                  description: 'Ultimate package for professional traders',
                  isPopular: false,
                  features: [
                    'Unlimited trading signals',
                    'Advanced AI predictions',
                    'Personal trading mentor',
                    'Custom strategy development',
                    '1-on-1 consultation calls',
                    'VIP telegram channel',
                    'Advanced risk analysis',
                    'Portfolio optimization',
                    'Exclusive market reports',
                    'Early access to new features',
                    'White-label solutions',
                    '24/7 premium support'
                  ],
                  notIncluded: [],
                  color: '#8b5cf6',
                  icon: '👑'
                }
              ].map((plan, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: plan.isPopular ? `2px solid ${plan.color}` : '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '20px',
                  padding: '32px',
                  position: 'relative',
                  boxShadow: plan.isPopular ? `0 20px 40px ${plan.color}20` : '0 8px 32px rgba(0, 0, 0, 0.06)',
                  transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {plan.isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: plan.color,
                      color: 'white',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      🔥 Most Popular
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>
                      {plan.icon}
                    </span>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '800',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {plan.name}
                    </h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}>
                      {plan.description}
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        color: '#94a3b8',
                        fontSize: '18px',
                        textDecoration: 'line-through',
                        marginRight: '8px'
                      }}>
                        {plan.originalPrice}
                      </span>
                      <span style={{
                        fontSize: '48px',
                        fontWeight: '900',
                        color: plan.color
                      }}>
                        {plan.price}
                      </span>
                      <span style={{
                        color: '#64748b',
                        fontSize: '16px'
                      }}>
                        {plan.period}
                      </span>
                    </div>

                    <div style={{
                      background: `${plan.color}15`,
                      color: plan.color,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      Save 50% - Limited Time
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '12px'
                    }}>
                      ✅ What's included:
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      padding: '0',
                      margin: '0'
                    }}>
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px',
                          fontSize: '14px',
                          color: '#475569'
                        }}>
                          <span style={{ color: plan.color, fontWeight: '700' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: '#64748b',
                          marginBottom: '12px'
                        }}>
                          ❌ Not included:
                        </h4>
                        <ul style={{
                          listStyle: 'none',
                          padding: '0',
                          margin: '0'
                        }}>
                          {plan.notIncluded.map((feature, featureIndex) => (
                            <li key={featureIndex} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                              fontSize: '14px',
                              color: '#94a3b8'
                            }}>
                              <span style={{ color: '#ef4444', fontWeight: '700' }}>✗</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    style={{
                    background: plan.isPopular
                      ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`
                      : `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                    border: 'none',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: `0 8px 24px ${plan.color}40`,
                    transition: 'all 0.3s ease'
                  }}>
                    {plan.isPopular ? '🚀 Start Free Trial' : 'Get Started'}
                  </button>

                  <p style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#64748b',
                    marginTop: '12px',
                    margin: '12px 0 0 0'
                  }}>
                    7-day free trial • Cancel anytime
                  </p>
                </div>
              ))}
            </div>

            {/* Feature Comparison Table */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                📊 Detailed Feature Comparison
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#0f172a', fontWeight: '700' }}>
                        Features
                      </th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#3b82f6', fontWeight: '700' }}>
                        Basic
                      </th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#10b981', fontWeight: '700' }}>
                        Professional
                      </th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#8b5cf6', fontWeight: '700' }}>
                        Elite
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Daily Trading Signals', basic: '10', pro: '50+', elite: 'Unlimited' },
                      { feature: 'AI Market Analysis', basic: '❌', pro: '✅', elite: '✅ Advanced' },
                      { feature: 'Real-time Notifications', basic: 'Email', pro: 'Push + Email', elite: 'All Channels' },
                      { feature: 'Video Explanations', basic: '❌', pro: '✅', elite: '✅ + Live' },
                      { feature: 'Personal Mentor', basic: '❌', pro: '❌', elite: '✅' },
                      { feature: 'Custom Strategies', basic: '❌', pro: '❌', elite: '✅' },
                      { feature: 'API Access', basic: '❌', pro: 'Limited', elite: 'Full Access' },
                      { feature: 'Support Level', basic: 'Standard', pro: 'Priority', elite: '24/7 VIP' }
                    ].map((row, index) => (
                      <tr key={index} style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.2s ease'
                      }}>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#475569' }}>
                          {row.feature}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>
                          {row.basic}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>
                          {row.pro}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>
                          {row.elite}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                ❓ Frequently Asked Questions
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    question: 'Can I cancel my subscription anytime?',
                    answer: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
                    icon: '💳'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards, PayPal, and for Pakistani users, we also accept JazzCash and EasyPaisa.',
                    icon: '💰'
                  },
                  {
                    question: 'How accurate are your trading signals?',
                    answer: 'Our AI-powered signals maintain an average accuracy rate of 87.3%. However, trading involves risk and past performance doesn\'t guarantee future results.',
                    icon: '🎯'
                  },
                  {
                    question: 'Do you offer refunds?',
                    answer: 'We offer a 7-day free trial so you can test our service. After that, we provide refunds within 14 days of purchase if you\'re not satisfied.',
                    icon: '↩️'
                  },
                  {
                    question: 'Can I upgrade or downgrade my plan?',
                    answer: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at your next billing cycle.',
                    icon: '🔄'
                  },
                  {
                    question: 'Is there support for beginners?',
                    answer: 'Yes! All plans include educational content. Professional and Elite plans include additional learning resources and webinars.',
                    icon: '🎓'
                  }
                ].map((faq, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{faq.icon}</span>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#0f172a',
                        margin: '0'
                      }}>
                        {faq.question}
                      </h4>
                    </div>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      margin: '0'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              color: 'white'
            }}>
              <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
                🛡️
              </span>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                30-Day Money-Back Guarantee
              </h3>
              <p style={{
                fontSize: '16px',
                marginBottom: '20px',
                opacity: 0.9
              }}>
                Not satisfied with our signals? Get a full refund within 30 days, no questions asked.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button style={{
                  background: 'white',
                  color: '#f59e0b',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Start Your Free Trial
                </button>
                <button style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Partner Brokers Tab */}
        {activeTab === 'brokers' && (
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
                  🤝 Partner Brokers
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Trade with our trusted broker partners and get exclusive benefits
                </p>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                💰 Up to $500 Bonus
              </div>
            </div>

            {/* Benefits Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                🎁 Exclusive Benefits for Our Users
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                {[
                  { icon: '💰', title: 'Welcome Bonus', description: 'Up to $500 trading bonus' },
                  { icon: '🎯', title: 'Free Signals', description: 'Complimentary signal access' },
                  { icon: '📞', title: 'Priority Support', description: 'Dedicated account manager' },
                  { icon: '💸', title: 'Reduced Spreads', description: 'Lower trading costs' }
                ].map((benefit, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>
                      {benefit.icon}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                      {benefit.title}
                    </h4>
                    <p style={{ fontSize: '14px', opacity: 0.9, margin: '0' }}>
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <button style={{
                  background: 'white',
                  color: '#3b82f6',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}>
                  View All Benefits
                </button>
              </div>
            </div>

            {/* Featured Brokers */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                ⭐ Recommended Brokers
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    name: 'XM Trading',
                    logo: '🔷',
                    rating: 4.8,
                    minDeposit: '$5',
                    leverage: '1:1000',
                    spreads: 'From 0.6 pips',
                    bonus: 'Up to $500',
                    regulators: ['CySEC', 'ASIC', 'IFSC'],
                    features: ['No deposit fees', 'Free VPS', '24/7 support', 'MT4/MT5', 'Copy trading'],
                    specialOffer: 'Double bonus for PK Signal Pulse users',
                    isRecommended: true,
                    color: '#10b981'
                  },
                  {
                    name: 'AvaTrade',
                    logo: '🟢',
                    rating: 4.6,
                    minDeposit: '$100',
                    leverage: '1:400',
                    spreads: 'From 0.9 pips',
                    bonus: 'Up to $300',
                    regulators: ['ASIC', 'CBI', 'FSA'],
                    features: ['Social trading', 'Mobile app', 'Education hub', 'Webinars', 'Risk management'],
                    specialOffer: 'Free trading course + signals',
                    isRecommended: false,
                    color: '#3b82f6'
                  },
                  {
                    name: 'IC Markets',
                    logo: '🔴',
                    rating: 4.7,
                    minDeposit: '$200',
                    leverage: '1:500',
                    spreads: 'From 0.0 pips',
                    bonus: 'Cashback program',
                    regulators: ['ASIC', 'CySEC', 'FSA'],
                    features: ['Raw spreads', 'Fast execution', 'cTrader', 'MAM/PAMM', 'API trading'],
                    specialOffer: '50% commission rebate',
                    isRecommended: false,
                    color: '#f59e0b'
                  },
                  {
                    name: 'Exness',
                    logo: '🟡',
                    rating: 4.5,
                    minDeposit: '$1',
                    leverage: 'Unlimited',
                    spreads: 'From 0.3 pips',
                    bonus: 'No deposit bonus',
                    regulators: ['CySEC', 'FCA', 'FSA'],
                    features: ['Instant withdrawals', 'Multiple accounts', 'Expert advisors', 'Mobile trading', 'Low spreads'],
                    specialOffer: 'Free signals for 3 months',
                    isRecommended: false,
                    color: '#8b5cf6'
                  }
                ].map((broker, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: broker.isRecommended ? `2px solid ${broker.color}` : '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '16px',
                    padding: '28px',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: broker.isRecommended ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: broker.isRecommended ? `0 12px 24px ${broker.color}20` : '0 4px 12px rgba(0, 0, 0, 0.06)'
                  }}>
                    {broker.isRecommended && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: broker.color,
                        color: 'white',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        🏆 Top Choice
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '48px' }}>{broker.logo}</span>
                      <div>
                        <h4 style={{
                          fontSize: '24px',
                          fontWeight: '800',
                          color: '#0f172a',
                          marginBottom: '4px'
                        }}>
                          {broker.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: '#fbbf24', fontSize: '16px' }}>⭐</span>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>{broker.rating}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {broker.regulators.map((reg, regIndex) => (
                              <span key={regIndex} style={{
                                background: `${broker.color}15`,
                                color: broker.color,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '600'
                              }}>
                                {reg}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Min Deposit</span>
                        <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                          {broker.minDeposit}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Max Leverage</span>
                        <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                          {broker.leverage}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Spreads</span>
                        <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>
                          {broker.spreads}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Bonus</span>
                        <span style={{ fontWeight: '700', color: broker.color, fontSize: '14px' }}>
                          {broker.bonus}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <span style={{
                        color: '#64748b',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Key Features:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {broker.features.map((feature, featureIndex) => (
                          <span key={featureIndex} style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            color: '#64748b',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      background: `${broker.color}10`,
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      borderLeft: `3px solid ${broker.color}`
                    }}>
                      <span style={{
                        color: '#64748b',
                        fontSize: '11px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        🎁 Exclusive Offer:
                      </span>
                      <span style={{
                        color: '#0f172a',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {broker.specialOffer}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        background: `linear-gradient(135deg, ${broker.color} 0%, ${broker.color}dd 100%)`,
                        border: 'none',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        flex: 1,
                        boxShadow: `0 4px 12px ${broker.color}30`
                      }}>
                        Open Account
                      </button>
                      <button style={{
                        background: 'transparent',
                        border: `2px solid ${broker.color}`,
                        color: broker.color,
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}>
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Broker Comparison Table */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                📊 Broker Comparison
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#0f172a', fontWeight: '700' }}>Broker</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>Min Deposit</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>Leverage</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>Spreads</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>Platforms</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#0f172a', fontWeight: '700' }}>Regulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { broker: 'XM Trading', deposit: '$5', leverage: '1:1000', spreads: '0.6 pips', platforms: 'MT4/MT5', regulation: 'CySEC, ASIC' },
                      { broker: 'AvaTrade', deposit: '$100', leverage: '1:400', spreads: '0.9 pips', platforms: 'MT4/MT5, WebTrader', regulation: 'ASIC, CBI' },
                      { broker: 'IC Markets', deposit: '$200', leverage: '1:500', spreads: '0.0 pips', platforms: 'MT4/MT5, cTrader', regulation: 'ASIC, CySEC' },
                      { broker: 'Exness', deposit: '$1', leverage: 'Unlimited', spreads: '0.3 pips', platforms: 'MT4/MT5', regulation: 'CySEC, FCA' }
                    ].map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#475569' }}>{row.broker}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{row.deposit}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{row.leverage}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{row.spreads}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{row.platforms}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{row.regulation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Get Started */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                🚀 How to Get Started
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    step: '1',
                    title: 'Choose Your Broker',
                    description: 'Select from our recommended brokers based on your trading needs and preferences',
                    icon: '🎯',
                    color: '#3b82f6'
                  },
                  {
                    step: '2',
                    title: 'Open Account',
                    description: 'Click our special link to open account and get exclusive benefits and bonuses',
                    icon: '📝',
                    color: '#10b981'
                  },
                  {
                    step: '3',
                    title: 'Verify & Fund',
                    description: 'Complete account verification and make your first deposit to start trading',
                    icon: '💳',
                    color: '#f59e0b'
                  },
                  {
                    step: '4',
                    title: 'Start Trading',
                    description: 'Begin trading with our premium signals and enjoy exclusive member benefits',
                    icon: '📈',
                    color: '#8b5cf6'
                  }
                ].map((step, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    position: 'relative',
                    borderTop: `4px solid ${step.color}`
                  }}>
                    <div style={{
                      background: step.color,
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '800',
                      margin: '0 auto 16px auto'
                    }}>
                      {step.step}
                    </div>
                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>
                      {step.icon}
                    </span>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {step.title}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      margin: '0'
                    }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Warning */}
            <div style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '16px',
              padding: '24px',
              color: 'white',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>
                ⚠️
              </span>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                Important Risk Warning
              </h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                lineHeight: 1.6,
                margin: '0'
              }}>
                Trading carries a high level of risk and may not be suitable for all investors. Before deciding to trade,
                you should carefully consider your investment objectives, level of experience, and risk appetite.
                The possibility exists that you could sustain a loss of some or all of your initial investment.
              </p>
            </div>
          </div>
        )}

        {/* About Us Tab */}
        {activeTab === 'about' && (
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
                  🏢 About PK Signal Pulse
                </h2>
                <p style={{ color: '#64748b', fontSize: '16px' }}>
                  Pakistan's leading AI-powered trading signals platform empowering traders since 2021
                </p>
              </div>
            </div>

            {/* Hero Section */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '20px',
              padding: '48px 32px',
              marginBottom: '32px',
              color: 'white',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '80px', display: 'block', marginBottom: '20px' }}>
                📊
              </span>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '900',
                marginBottom: '16px',
                letterSpacing: '-0.025em'
              }}>
                Revolutionizing Trading in Pakistan
              </h3>
              <p style={{
                fontSize: '18px',
                opacity: 0.9,
                lineHeight: 1.6,
                maxWidth: '800px',
                margin: '0 auto 32px auto'
              }}>
                Since 2021, we've been pioneering AI-powered trading solutions specifically designed for the Pakistani market.
                Our mission is to democratize professional trading insights and empower every Pakistani trader with institutional-grade analysis.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {[
                  { number: '25,000+', label: 'Active Traders' },
                  { number: '87.3%', label: 'Signal Accuracy' },
                  { number: '50M+', label: 'Signals Delivered' },
                  { number: '3+', label: 'Years Experience' }
                ].map((stat, index) => (
                  <div key={index}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '900',
                      color: '#10b981',
                      marginBottom: '4px'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Story */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                📖 Our Story
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '16px'
                  }}>
                    Founded with a Vision
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    marginBottom: '16px'
                  }}>
                    PK Signal Pulse was born from a simple yet powerful vision: to level the playing field for Pakistani traders.
                    Our founders, experienced traders and AI engineers, recognized the gap between institutional trading capabilities
                    and retail trader resources in Pakistan.
                  </p>
                  <p style={{
                    color: '#64748b',
                    fontSize: '15px',
                    lineHeight: 1.7
                  }}>
                    Starting with a small team in Karachi, we've grown to become Pakistan's most trusted trading signals platform,
                    serving traders from Lahore to Islamabad and beyond.
                  </p>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
                    🚀
                  </span>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '8px'
                  }}>
                    Our Mission
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    margin: '0'
                  }}>
                    To democratize professional trading insights and empower every Pakistani trader with AI-powered market analysis
                  </p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                👥 Meet Our Team
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    name: 'Ahmed Khan',
                    role: 'CEO & Founder',
                    bio: '15+ years in forex trading, former investment banker at MCB Bank. Expert in Pakistani financial markets.',
                    avatar: '👨‍💼',
                    specialties: ['Market Analysis', 'Strategy', 'Leadership'],
                    color: '#3b82f6'
                  },
                  {
                    name: 'Sarah Ahmed',
                    role: 'CTO & AI Lead',
                    bio: 'PhD in Computer Science from LUMS, former AI researcher at Google. Specialized in machine learning for finance.',
                    avatar: '👩‍💻',
                    specialties: ['AI Development', 'Data Science', 'Tech Strategy'],
                    color: '#10b981'
                  },
                  {
                    name: 'Hassan Ali',
                    role: 'Head of Research',
                    bio: 'CFA charterholder, 12+ years analyzing Asian markets. Former research director at KTrade Securities.',
                    avatar: '👨‍🔬',
                    specialties: ['Market Research', 'Risk Analysis', 'Economic Modeling'],
                    color: '#f59e0b'
                  },
                  {
                    name: 'Fatima Sheikh',
                    role: 'Head of Product',
                    bio: 'Product management expert with 10+ years at fintech startups. Focused on user experience and growth.',
                    avatar: '👩‍💼',
                    specialties: ['Product Strategy', 'UX Design', 'Growth'],
                    color: '#8b5cf6'
                  }
                ].map((member, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center',
                    borderTop: `4px solid ${member.color}`
                  }}>
                    <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
                      {member.avatar}
                    </span>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '4px'
                    }}>
                      {member.name}
                    </h4>
                    <div style={{
                      color: member.color,
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px'
                    }}>
                      {member.role}
                    </div>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '16px'
                    }}>
                      {member.bio}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                      {member.specialties.map((specialty, specIndex) => (
                        <span key={specIndex} style={{
                          background: `${member.color}15`,
                          color: member.color,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Values */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                💎 Our Core Values
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    title: 'Transparency',
                    description: 'We believe in complete transparency in our methods, results, and pricing. No hidden fees, no false promises.',
                    icon: '🔍',
                    color: '#3b82f6'
                  },
                  {
                    title: 'Innovation',
                    description: 'Constantly pushing the boundaries of AI and machine learning to provide cutting-edge trading insights.',
                    icon: '⚡',
                    color: '#10b981'
                  },
                  {
                    title: 'Integrity',
                    description: 'We maintain the highest ethical standards and always put our traders\' interests first.',
                    icon: '🛡️',
                    color: '#f59e0b'
                  },
                  {
                    title: 'Excellence',
                    description: 'Committed to delivering exceptional results and continuously improving our platform and services.',
                    icon: '🏆',
                    color: '#8b5cf6'
                  }
                ].map((value, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    borderLeft: `4px solid ${value.color}`
                  }}>
                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>
                      {value.icon}
                    </span>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '12px'
                    }}>
                      {value.title}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      margin: '0'
                    }}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                ⚙️ Our Technology
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {[
                  { tech: 'Machine Learning', description: 'Advanced ML algorithms for pattern recognition', icon: '🧠' },
                  { tech: 'Natural Language Processing', description: 'AI-powered news and sentiment analysis', icon: '📝' },
                  { tech: 'Cloud Computing', description: 'Scalable infrastructure for real-time processing', icon: '☁️' },
                  { tech: 'Big Data Analytics', description: 'Processing millions of data points daily', icon: '📊' },
                  { tech: 'Real-time APIs', description: 'Lightning-fast signal delivery systems', icon: '⚡' },
                  { tech: 'Blockchain Security', description: 'Secure and transparent data handling', icon: '🔐' }
                ].map((item, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>
                      {item.icon}
                    </span>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {item.tech}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '12px',
                      lineHeight: 1.4,
                      margin: '0'
                    }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Recognition */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                🏅 Awards & Recognition
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {[
                  {
                    award: 'Best Fintech Startup 2023',
                    organization: 'Pakistan Fintech Awards',
                    icon: '🥇',
                    color: '#f59e0b'
                  },
                  {
                    award: 'Top AI Innovation 2022',
                    organization: 'Pakistan Tech Summit',
                    icon: '🏆',
                    color: '#3b82f6'
                  },
                  {
                    award: 'Excellence in Trading Tech',
                    organization: 'Pakistan Stock Exchange',
                    icon: '⭐',
                    color: '#10b981'
                  },
                  {
                    award: 'Best Customer Service 2024',
                    organization: 'Trading Platform Awards',
                    icon: '🎯',
                    color: '#8b5cf6'
                  }
                ].map((award, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    borderTop: `3px solid ${award.color}`
                  }}>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>
                      {award.icon}
                    </span>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {award.award}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '13px',
                      margin: '0'
                    }}>
                      {award.organization}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              borderRadius: '16px',
              padding: '32px',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                📞 Get in Touch
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>
                    🏢
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                    Headquarters
                  </h4>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: '0' }}>
                    Financial District, Block A<br />
                    Karachi, Sindh 74000<br />
                    Pakistan
                  </p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>
                    📧
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                    Email Support
                  </h4>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: '0' }}>
                    support@pksignalpulse.com<br />
                    partnerships@pksignalpulse.com<br />
                    media@pksignalpulse.com
                  </p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>
                    📱
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                    Follow Us
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    {['📘', '🐦', '📸', '💼', '📱'].map((icon, index) => (
                      <span key={index} style={{
                        fontSize: '24px',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                      }}>
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <button style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginRight: '12px'
                }}>
                  Contact Sales
                </button>
                <button style={{
                  background: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Schedule Demo
                </button>
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

      {/* Notification System */}
      {notifications.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {notifications.map((notification, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              transform: 'translateX(0)',
              animation: 'slideInRight 0.3s ease-out'
            }}>
              ✅ {notification}
            </div>
          ))}
        </div>
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🚀 Go Premium!</h2>
            <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.9 }}>
              Unlock advanced features, real-time signals, and priority support.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setShowPremiumModal(false)
                  setActiveTab('pricing')
                }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View Plans
              </button>
              <button
                onClick={() => setShowPremiumModal(false)}
                style={{
                  background: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Success!</h2>
            <p style={{ fontSize: '14px', margin: 0 }}>{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
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