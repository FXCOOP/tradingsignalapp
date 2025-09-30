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
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  const [showArticleModal, setShowArticleModal] = useState(false)

  // Broker verification system
  const [isVerifiedBrokerUser, setIsVerifiedBrokerUser] = useState(false)
  const [brokerAccountId, setBrokerAccountId] = useState<string | null>(null)
  const [verifiedBroker, setVerifiedBroker] = useState<string | null>(null)
  const [signalsViewedCount, setSignalsViewedCount] = useState(0)
  const [showBrokerVerificationModal, setShowBrokerVerificationModal] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  // Trusted brokers configuration
  const trustedBrokers = [
    {
      name: 'XM Trading',
      id: 'xm_trading',
      verificationUrl: 'https://my.xm.com/research',
      accountPattern: /^[0-9]{8,}$/,
      logo: '🔷',
      color: '#10b981'
    },
    {
      name: 'AvaTrade',
      id: 'avatrade',
      verificationUrl: 'https://www.avatrade.com/trading-info/account-summary',
      accountPattern: /^[0-9]{6,}$/,
      logo: '🟢',
      color: '#3b82f6'
    },
    {
      name: 'IC Markets',
      id: 'ic_markets',
      verificationUrl: 'https://portal.icmarkets.com/',
      accountPattern: /^[0-9]{7,}$/,
      logo: '🔴',
      color: '#f59e0b'
    },
    {
      name: 'Exness',
      id: 'exness',
      verificationUrl: 'https://my.exness.com/',
      accountPattern: /^[0-9]{8,}$/,
      logo: '🟡',
      color: '#8b5cf6'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Load broker verification status from localStorage
  useEffect(() => {
    const savedVerification = localStorage.getItem('brokerVerification')
    if (savedVerification) {
      const { isVerified, accountId, broker, signalsViewed } = JSON.parse(savedVerification)
      setIsVerifiedBrokerUser(isVerified)
      setBrokerAccountId(accountId)
      setVerifiedBroker(broker)
      setSignalsViewedCount(signalsViewed || 0)
    }
  }, [])

  // Broker verification functions
  const saveBrokerVerification = (isVerified: boolean, accountId: string | null, broker: string | null, signalsViewed: number) => {
    const verificationData = { isVerified, accountId, broker, signalsViewed }
    localStorage.setItem('brokerVerification', JSON.stringify(verificationData))
  }

  const verifyBrokerAccount = async (brokerName: string, accountId: string) => {
    setIsVerifying(true)

    // Find the broker configuration
    const broker = trustedBrokers.find(b => b.name === brokerName)
    if (!broker) {
      showNotification('Broker not found in trusted list')
      setIsVerifying(false)
      return false
    }

    // Validate account ID format
    if (!broker.accountPattern.test(accountId)) {
      showNotification('Invalid account ID format for this broker')
      setIsVerifying(false)
      return false
    }

    // Simulate verification process (in real implementation, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // For demo purposes, consider verification successful
    const isVerified = true

    if (isVerified) {
      setIsVerifiedBrokerUser(true)
      setBrokerAccountId(accountId)
      setVerifiedBroker(brokerName)
      saveBrokerVerification(true, accountId, brokerName, signalsViewedCount)
      showNotification(`✅ Account verified with ${brokerName}! You now have full signal access.`)
      setShowBrokerVerificationModal(false)
    } else {
      showNotification('❌ Account verification failed. Please check your account details.')
    }

    setIsVerifying(false)
    return isVerified
  }

  const checkSignalAccess = (signalId: number) => {
    if (isVerifiedBrokerUser) {
      return true // Full access for verified users
    }

    // Allow viewing first 3 signals for non-verified users
    if (signalsViewedCount < 3) {
      const newCount = signalsViewedCount + 1
      setSignalsViewedCount(newCount)
      saveBrokerVerification(false, null, null, newCount)

      if (newCount === 3) {
        setTimeout(() => {
          setShowBrokerVerificationModal(true)
          showNotification('🔒 You\'ve viewed 3 signals. Verify your broker account for unlimited access!')
        }, 1000)
      }

      return true
    }

    // Block access after 3 signals
    setShowBrokerVerificationModal(true)
    showNotification('🔒 Please verify your broker account to view more signals')
    return false
  }

  // Comprehensive button handler functions
  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }

  const handleCopySignal = (signalId: number) => {
    if (!checkSignalAccess(signalId)) {
      return
    }
    setCopiedSignals(prev => [...prev, signalId])
    showNotification(`Signal ${signalId} copied to clipboard!`)
    // Simulate copying to clipboard
    navigator.clipboard?.writeText(`Trading Signal ${signalId} - Check PK Signal Pulse for details`)
  }

  const handleSetAlert = (signalId: number) => {
    if (!checkSignalAccess(signalId)) {
      return
    }
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

  const handleReadArticle = (articleId: number) => {
    setSelectedArticle(articleId)
    setShowArticleModal(true)
  }

  const handleSubscribeAlerts = () => {
    showNotification('Subscribed to trading alerts!')
    setActiveTab('pricing')
  }

  const handleContactSales = () => {
    setShowContactForm(true)
    showNotification('Contact form opened')
  }

  const handleScheduleDemo = () => {
    showNotification('Demo scheduled! Check your email for details.')
  }

  const handleOpenAccount = (brokerName: string) => {
    showNotification(`Opening account with ${brokerName}...`)
    setTimeout(() => {
      window.open('#', '_blank') // Would be actual broker link
    }, 1000)
  }

  const handleLearnMore = (brokerName: string) => {
    showNotification(`Learning more about ${brokerName}`)
    setSelectedBroker(brokerName)
  }

  const handleStartCourse = (courseId: number, courseName: string) => {
    if (enrolledCourses.includes(courseId)) {
      showNotification(`Continuing ${courseName}...`)
    } else {
      handleEnrollCourse(courseId)
      showNotification(`Started ${courseName}!`)
    }
    setSelectedCourse(courseId)
  }

  // Additional Missing Handler Functions
  const handleContinueLearning = (courseId: number) => {
    setSelectedCourse(courseId)
    showNotification(`Continuing course ${courseId}...`)
    // Simulate progress tracking
    setTimeout(() => {
      showNotification('Progress saved! Keep learning 📚')
    }, 1000)
  }

  const handleToolAction = (toolId: string, action: string) => {
    showNotification(`${action} with ${toolId} tool`)
    // Tool-specific actions
    switch (toolId) {
      case 'risk-calculator':
        showNotification('🧮 Risk Calculator opened')
        break
      case 'pip-calculator':
        showNotification('📏 Pip Calculator ready')
        break
      case 'profit-calculator':
        showNotification('💰 Profit Calculator activated')
        break
      case 'position-sizer':
        showNotification('📊 Position Sizer tool launched')
        break
      default:
        showNotification(`${action} completed`)
    }
  }

  const handleGenerateAnalysis = () => {
    showNotification('🔮 Generating new AI analysis...')
    setTimeout(() => {
      showNotification('✨ Fresh AI insights generated!')
    }, 2000)
  }

  const handleViewInsightDetails = (insightId: number) => {
    showNotification(`📊 Viewing detailed analysis for insight ${insightId}`)
    setSelectedSignal(insightId)
  }

  const handleMoreFeatures = () => {
    showNotification('🔧 Exploring additional features...')
    setShowPremiumModal(true)
  }

  const handleModalAction = (action: string, context: string) => {
    showNotification(`${action} in ${context}`)
    switch (action) {
      case 'Like':
        showNotification('❤️ Article liked!')
        break
      case 'Share':
        showNotification('🔄 Article shared!')
        break
      case 'Save for Later':
        showNotification('📚 Article saved!')
        break
      case 'Follow Author':
        showNotification('🔔 Following author!')
        break
      default:
        showNotification(`${action} completed`)
    }
  }

  const handleMarketAnalysisAction = (action: string, symbol: string) => {
    showNotification(`${action} for ${symbol}`)
    if (action === 'Copy Signal') {
      navigator.clipboard?.writeText(`${symbol} signal - Check PK Signal Pulse for details`)
      showNotification(`📋 ${symbol} signal copied!`)
    } else if (action === 'Set Alert') {
      showNotification(`🔔 Alert set for ${symbol}!`)
    }
  }

  const handlePricingAction = (action: string, plan?: string) => {
    switch (action) {
      case 'Contact Sales':
        handleContactSales()
        break
      case 'Get Started':
        showNotification(`🚀 Starting with ${plan} plan...`)
        break
      case 'Upgrade':
        showNotification(`⬆️ Upgrading to ${plan}...`)
        break
      default:
        showNotification(`${action} initiated`)
    }
  }

  // Comprehensive Asian Markets Data with Trading Insights
  const asianMarkets = [
    {
      name: 'USD/PKR',
      price: '278.45',
      change: '+0.35',
      changePercent: '+0.13%',
      trend: 'up',
      volume: '2.4M',
      high24h: '279.12',
      low24h: '277.89',
      marketCap: '₨45.2T',
      sector: 'Currency',
      volatility: 'Medium',
      support: '277.80',
      resistance: '279.50',
      signal: 'BUY',
      confidence: 78,
      analyst: 'Bullish momentum expected'
    },
    {
      name: 'KSE-100',
      price: '91,247',
      change: '+125',
      changePercent: '+0.14%',
      trend: 'up',
      volume: '45.2M',
      high24h: '91,456',
      low24h: '90,789',
      marketCap: '₨12.8T',
      sector: 'Index',
      volatility: 'Low',
      support: '90,500',
      resistance: '92,000',
      signal: 'HOLD',
      confidence: 85,
      analyst: 'Strong fundamentals, moderate growth'
    },
    {
      name: 'HBL Bank',
      price: '285.50',
      change: '+8.75',
      changePercent: '+3.16%',
      trend: 'up',
      volume: '1.2M',
      high24h: '287.20',
      low24h: '276.75',
      marketCap: '₨487B',
      sector: 'Banking',
      volatility: 'Medium',
      support: '275.00',
      resistance: '290.00',
      signal: 'BUY',
      confidence: 89,
      analyst: 'Strong Q4 results driving momentum'
    },
    {
      name: 'UBL Bank',
      price: '245.80',
      change: '+12.30',
      changePercent: '+5.27%',
      trend: 'up',
      volume: '890K',
      high24h: '248.50',
      low24h: '233.50',
      marketCap: '₨298B',
      sector: 'Banking',
      volatility: 'High',
      support: '240.00',
      resistance: '250.00',
      signal: 'STRONG BUY',
      confidence: 92,
      analyst: 'Exceptional growth trajectory'
    },
    {
      name: 'Lucky Cement',
      price: '1,456.75',
      change: '+45.25',
      changePercent: '+3.21%',
      trend: 'up',
      volume: '234K',
      high24h: '1,467.50',
      low24h: '1,411.50',
      marketCap: '₨234B',
      sector: 'Cement',
      volatility: 'Medium',
      support: '1,420.00',
      resistance: '1,480.00',
      signal: 'BUY',
      confidence: 81,
      analyst: 'Infrastructure boom beneficiary'
    },
    {
      name: 'Engro Corp',
      price: '487.25',
      change: '-15.75',
      changePercent: '-3.13%',
      trend: 'down',
      volume: '567K',
      high24h: '503.00',
      low24h: '485.50',
      marketCap: '₹156B',
      sector: 'Chemicals',
      volatility: 'High',
      support: '475.00',
      resistance: '500.00',
      signal: 'SELL',
      confidence: 76,
      analyst: 'Temporary correction, long-term positive'
    },
    {
      name: 'Nikkei 225',
      price: '40,875',
      change: '+145',
      changePercent: '+0.36%',
      trend: 'up',
      volume: '89.1M',
      high24h: '41,123',
      low24h: '40,567',
      marketCap: '¥567T',
      sector: 'Index',
      volatility: 'Low',
      support: '40,200',
      resistance: '41,500',
      signal: 'HOLD',
      confidence: 83,
      analyst: 'Stable growth amid global uncertainty'
    },
    {
      name: 'Hang Seng',
      price: '19,250',
      change: '-78',
      changePercent: '-0.40%',
      trend: 'down',
      volume: '67.3M',
      high24h: '19,456',
      low24h: '19,124',
      marketCap: 'HK$234T',
      sector: 'Index',
      volatility: 'Medium',
      support: '18,900',
      resistance: '19,600',
      signal: 'HOLD',
      confidence: 72,
      analyst: 'Consolidation phase continues'
    },
    {
      name: 'Shanghai Composite',
      price: '3,127',
      change: '+12',
      changePercent: '+0.39%',
      trend: 'up',
      volume: '234.5M',
      high24h: '3,145',
      low24h: '3,098',
      marketCap: '¥45.8T',
      sector: 'Index',
      volatility: 'Medium',
      support: '3,080',
      resistance: '3,180',
      signal: 'BUY',
      confidence: 79,
      analyst: 'Policy support driving recovery'
    },
    {
      name: 'Sensex',
      price: '73,456',
      change: '+234',
      changePercent: '+0.32%',
      trend: 'up',
      volume: '123.4M',
      high24h: '73,678',
      low24h: '73,012',
      marketCap: '₹187T',
      sector: 'Index',
      volatility: 'Low',
      support: '72,800',
      resistance: '74,200',
      signal: 'BUY',
      confidence: 86,
      analyst: 'Strong domestic consumption story'
    },
    {
      name: 'KOSPI',
      price: '2,567',
      change: '+18',
      changePercent: '+0.71%',
      trend: 'up',
      volume: '456.7M',
      high24h: '2,589',
      low24h: '2,543',
      marketCap: '₩1,234T',
      sector: 'Index',
      volatility: 'Medium',
      support: '2,520',
      resistance: '2,620',
      signal: 'HOLD',
      confidence: 77,
      analyst: 'Tech sector leading gains'
    },
    {
      name: 'SET Index',
      price: '1,687',
      change: '+23',
      changePercent: '+1.38%',
      trend: 'up',
      volume: '78.9M',
      high24h: '1,695',
      low24h: '1,664',
      marketCap: '฿19.8T',
      sector: 'Index',
      volatility: 'Medium',
      support: '1,650',
      resistance: '1,720',
      signal: 'BUY',
      confidence: 82,
      analyst: 'Tourism recovery boosting sentiment'
    }
  ]

  // Comprehensive sector analysis data
  const sectorAnalysis = [
    { sector: 'Banking', performance: '+4.2%', trend: 'up', stocks: 15, leaders: ['HBL', 'UBL', 'MCB'], outlook: 'Bullish' },
    { sector: 'Cement', performance: '+2.8%', trend: 'up', stocks: 8, leaders: ['Lucky', 'DG Khan', 'Maple Leaf'], outlook: 'Positive' },
    { sector: 'Energy', performance: '-1.2%', trend: 'down', stocks: 12, leaders: ['PSO', 'APL', 'SNGP'], outlook: 'Neutral' },
    { sector: 'Textile', performance: '+1.8%', trend: 'up', stocks: 23, leaders: ['Nishat', 'Gul Ahmed', 'Lucky Textile'], outlook: 'Positive' },
    { sector: 'Technology', performance: '+6.1%', trend: 'up', stocks: 7, leaders: ['Systems', 'TRG', 'NetSol'], outlook: 'Very Bullish' },
    { sector: 'Pharma', performance: '+3.4%', trend: 'up', stocks: 9, leaders: ['Searle', 'GSK', 'Abbott'], outlook: 'Bullish' }
  ]

  // Market insights and analysis
  const marketInsights = [
    {
      title: 'PKR Strengthening Against USD',
      content: 'Pakistani Rupee shows resilience with 0.13% gain, supported by improved remittances and export earnings.',
      impact: 'Positive for imports, mixed for exporters',
      timeframe: 'Short-term'
    },
    {
      title: 'Banking Sector Outperformance',
      content: 'Strong Q4 earnings and improved credit quality driving banking stocks to new highs.',
      impact: 'Sector rotation into financials',
      timeframe: 'Medium-term'
    },
    {
      title: 'Foreign Investment Surge',
      content: '$89M foreign inflows in January signal renewed confidence in Pakistani equities.',
      impact: 'Liquidity boost for large-cap stocks',
      timeframe: 'Long-term'
    }
  ]

  // Comprehensive Breaking News for Pakistan & Asian Markets
  const breakingNews = [
    {
      id: 1,
      title: 'Pakistan Central Bank Keeps Key Rate Unchanged at 15%',
      summary: 'State Bank of Pakistan maintains policy rate amid inflation concerns and economic stabilization efforts',
      category: 'Monetary Policy',
      time: '2 hours ago',
      impact: 'High',
      readTime: '3 min read',
      imageUrl: '📊',
      author: 'Economic Desk',
      tags: ['SBP', 'Interest Rates', 'Inflation', 'Monetary Policy'],
      market_impact: 'Banking stocks may see volatility, PKR stability expected',
      content: 'The State Bank of Pakistan (SBP) has decided to keep the policy rate unchanged at 15% in its latest monetary policy meeting. The decision comes as inflation remains above target levels at 28.3% year-on-year. Governor Jameel Ahmad cited ongoing fiscal challenges and external account pressures as key factors in the decision. The central bank expects inflation to moderate gradually in the coming quarters, with targeted measures to support economic stability while maintaining price stability as the primary objective. Market participants had anticipated this decision given the need to balance growth concerns with inflation control.'
    },
    {
      id: 2,
      title: 'PSX Reaches New Monthly High Amid Foreign Investment Inflows',
      summary: 'KSE-100 index gains 1,200 points in January on strong foreign buying and positive sentiment',
      category: 'Stock Market',
      time: '4 hours ago',
      impact: 'High',
      readTime: '4 min read',
      imageUrl: '📈',
      author: 'Markets Team',
      tags: ['PSX', 'Foreign Investment', 'KSE-100', 'Bull Market'],
      market_impact: 'Continued upward momentum expected in blue-chip stocks',
      content: 'Pakistan Stock Exchange (PSX) witnessed unprecedented foreign investment inflows totaling $89 million in January 2025, driving the KSE-100 index to new monthly highs. Key sectors including banking, cement, and textiles led the rally. Foreign institutional investors showed particular interest in blue-chip stocks, with HBL, UBL, and Lucky Cement being major beneficiaries. Market analysts attribute this to improved macroeconomic indicators and positive developments in the IMF program review. The rally has been broad-based with 75% of listed companies showing positive returns.'
    },
    {
      id: 3,
      title: 'China-Pakistan Economic Corridor Phase II Projects Approved',
      summary: '$8.2 billion infrastructure development to boost bilateral trade and create 200,000 jobs',
      category: 'Economic Development',
      time: '6 hours ago',
      impact: 'Medium',
      readTime: '5 min read',
      imageUrl: '🏗️',
      author: 'Infrastructure Correspondent',
      tags: ['CPEC', 'Infrastructure', 'China', 'Economic Growth'],
      market_impact: 'Construction and cement stocks likely to benefit significantly',
      content: 'The governments of China and Pakistan have formally approved Phase II of the China-Pakistan Economic Corridor (CPEC), involving $8.2 billion in infrastructure development projects. The new phase focuses on industrial cooperation, agricultural modernization, and digital connectivity. Key projects include the establishment of Special Economic Zones in Gwadar, Rashakai, and Dhabeji, expected to create over 200,000 jobs and significantly boost bilateral trade volumes. The announcement has already sparked investor interest in construction, cement, and logistics companies.'
    },
    {
      id: 4,
      title: 'HBL Bank Reports Record Q4 Profits of ₨45.2 Billion',
      summary: 'Pakistan\'s largest bank posts 28% YoY growth driven by digital transformation and loan recovery',
      category: 'Banking',
      time: '8 hours ago',
      impact: 'High',
      readTime: '6 min read',
      imageUrl: '🏦',
      author: 'Banking Analyst',
      tags: ['HBL', 'Banking', 'Earnings', 'Digital Banking'],
      market_impact: 'Banking sector rally expected, dividend increase likely',
      content: 'Habib Bank Limited (HBL) announced record quarterly profits of ₨45.2 billion for Q4 2024, representing a 28% increase year-over-year. The exceptional performance was driven by strong net interest income growth of 35%, improved loan loss provisions, and successful digital transformation initiatives. CEO Muhammad Aurangzeb highlighted the bank\'s market-leading position in digital banking with 5.2 million active mobile users. The bank also announced plans to expand its presence in Central Asia and strengthen its Islamic banking division.'
    },
    {
      id: 5,
      title: 'Pakistan Textile Exports Surge 15% in January 2025',
      summary: 'Strong global demand and competitive pricing drive textile sector recovery',
      category: 'Trade & Exports',
      time: '12 hours ago',
      impact: 'Medium',
      readTime: '4 min read',
      imageUrl: '🧵',
      author: 'Trade Reporter',
      tags: ['Textiles', 'Exports', 'Manufacturing', 'Global Trade'],
      market_impact: 'Textile stocks showing renewed investor confidence',
      content: 'Pakistan\'s textile exports recorded a remarkable 15% growth in January 2025, reaching $1.8 billion compared to $1.56 billion in the same period last year. The surge is attributed to increased orders from European and US buyers, competitive pricing due to improved energy supply, and enhanced product quality. Key beneficiaries include Nishat Mills, Gul Ahmed, and Lucky Textile. Industry experts predict continued growth momentum throughout 2025.'
    },
    {
      id: 6,
      title: 'Asian Markets Rally on China Reopening Optimism',
      summary: 'Regional indices gain 2-3% as China signals economic policy support measures',
      category: 'Regional Markets',
      time: '1 day ago',
      impact: 'High',
      readTime: '5 min read',
      imageUrl: '🌏',
      author: 'Asia Markets Desk',
      tags: ['China', 'Asian Markets', 'Economic Policy', 'Market Rally'],
      market_impact: 'Positive spillover effects expected across Asian markets',
      content: 'Asian equity markets experienced broad-based gains following China\'s announcement of additional economic stimulus measures. The Hang Seng gained 2.8%, Nikkei rose 2.1%, and emerging Asian markets outperformed developed counterparts. Chinese policymakers indicated readiness to support growth through fiscal and monetary measures, boosting investor confidence across the region. Pakistan and Indian markets are expected to benefit from increased Chinese trade and investment flows.'
    },
    {
      id: 7,
      title: 'Pakistan IT Exports Cross $3 Billion Milestone',
      summary: 'Technology sector achieves historic growth with 35% YoY increase in export revenues',
      category: 'Technology',
      time: '1 day ago',
      impact: 'Medium',
      readTime: '7 min read',
      imageUrl: '💻',
      author: 'Tech Correspondent',
      tags: ['IT Exports', 'Technology', 'Software', 'Digital Economy'],
      market_impact: 'Technology stocks gaining momentum, sector rerating expected',
      content: 'Pakistan\'s IT and software exports have crossed the historic $3 billion milestone, growing 35% year-over-year. The remarkable growth is driven by increased global demand for software development, IT-enabled services, and digital solutions. Key contributors include Systems Limited, TRG Pakistan, and NetSol Technologies. The government\'s Digital Pakistan initiative and improved internet infrastructure have significantly boosted the sector\'s competitiveness in international markets.'
    },
    {
      id: 8,
      title: 'IMF Program Review Shows Positive Progress',
      summary: 'Pakistan meets key performance indicators, next tranche release expected soon',
      category: 'Economic Policy',
      time: '2 days ago',
      impact: 'High',
      readTime: '6 min read',
      imageUrl: '📋',
      author: 'Economic Affairs',
      tags: ['IMF', 'Economic Reform', 'Fiscal Policy', 'International Aid'],
      market_impact: 'Currency stability and investor confidence boost expected',
      content: 'The International Monetary Fund\'s latest review of Pakistan\'s $3 billion standby arrangement shows significant progress in meeting key performance indicators. The country has successfully achieved fiscal consolidation targets, improved tax collection, and maintained external account stability. IMF officials praised Pakistan\'s commitment to structural reforms and indicated that the next tranche of $700 million will be released as scheduled. This positive development is expected to strengthen investor confidence and support currency stability.'
    },
    {
      id: 9,
      title: 'Karachi Stock Exchange Introduces New Trading Hours',
      summary: 'Extended trading session aims to increase market liquidity and international participation',
      category: 'Market Infrastructure',
      time: '3 days ago',
      impact: 'Medium',
      readTime: '3 min read',
      imageUrl: '⏰',
      author: 'Market Structure Team',
      tags: ['PSX', 'Trading Hours', 'Market Infrastructure', 'Liquidity'],
      market_impact: 'Increased trading volumes and international participation expected',
      content: 'Pakistan Stock Exchange (PSX) has announced extended trading hours effective March 1, 2025. The new session will run from 9:15 AM to 4:30 PM, adding 45 minutes to the current trading day. This change aims to enhance market liquidity, accommodate international investors in different time zones, and align with global market practices. The exchange also introduced pre-market and after-hours trading facilities for institutional investors.'
    },
    {
      id: 10,
      title: 'Green Sukuk Issuance Marks Islamic Finance Milestone',
      summary: 'Pakistan launches $500 million green Sukuk for renewable energy projects',
      category: 'Islamic Finance',
      time: '4 days ago',
      impact: 'Medium',
      readTime: '5 min read',
      imageUrl: '🌱',
      author: 'Islamic Finance Desk',
      tags: ['Sukuk', 'Green Finance', 'Renewable Energy', 'Islamic Banking'],
      market_impact: 'Islamic banking stocks and renewable energy companies to benefit',
      content: 'Pakistan has successfully issued its first Green Sukuk worth $500 million, marking a significant milestone in sustainable Islamic finance. The proceeds will fund renewable energy projects including solar and wind power installations across the country. The oversubscribed issuance attracted strong international demand, particularly from Middle Eastern and Malaysian investors. This innovative financial instrument aligns with Pakistan\'s climate commitments and Islamic finance principles.'
    }
  ]

  // News categories for better organization
  const newsCategories = [
    { id: 'all', name: 'All News', count: 10 },
    { id: 'monetary-policy', name: 'Monetary Policy', count: 1 },
    { id: 'stock-market', name: 'Stock Market', count: 2 },
    { id: 'banking', name: 'Banking', count: 1 },
    { id: 'trade-exports', name: 'Trade & Exports', count: 1 },
    { id: 'technology', name: 'Technology', count: 1 },
    { id: 'economic-policy', name: 'Economic Policy', count: 1 },
    { id: 'regional-markets', name: 'Regional Markets', count: 1 },
    { id: 'islamic-finance', name: 'Islamic Finance', count: 1 },
    { id: 'infrastructure', name: 'Infrastructure', count: 1 }
  ]

  // Comprehensive Economic Calendar Events
  const economicEvents = [
    {
      time: '08:00',
      event: 'Pakistan GDP Growth Rate (QoQ)',
      importance: 'High',
      forecast: '2.8%',
      previous: '2.4%',
      impact: 'PKR',
      description: 'Quarterly GDP growth rate showing economic expansion',
      volatility: 'High',
      tradingImplications: 'Strong growth may strengthen PKR'
    },
    {
      time: '09:30',
      event: 'Pakistan CPI (YoY)',
      importance: 'High',
      forecast: '28.1%',
      previous: '28.3%',
      impact: 'PKR',
      description: 'Consumer Price Index indicates inflation trends',
      volatility: 'Very High',
      tradingImplications: 'Declining inflation positive for stocks, bonds'
    },
    {
      time: '10:15',
      event: 'State Bank of Pakistan Interest Rate Decision',
      importance: 'Very High',
      forecast: '15.00%',
      previous: '15.00%',
      impact: 'PKR',
      description: 'Central bank monetary policy decision',
      volatility: 'Extreme',
      tradingImplications: 'Rate changes drive major market movements'
    },
    {
      time: '11:00',
      event: 'China GDP (QoQ)',
      importance: 'High',
      forecast: '1.2%',
      previous: '0.9%',
      impact: 'CNY',
      description: 'World\'s second-largest economy growth data',
      volatility: 'High',
      tradingImplications: 'China growth affects global commodity prices'
    },
    {
      time: '11:30',
      event: 'Pakistan Manufacturing PMI',
      importance: 'Medium',
      forecast: '52.5',
      previous: '51.8',
      impact: 'PKR',
      description: 'Manufacturing sector health indicator',
      volatility: 'Medium',
      tradingImplications: 'Above 50 indicates expansion'
    },
    {
      time: '12:00',
      event: 'China Industrial Production (YoY)',
      importance: 'High',
      forecast: '5.8%',
      previous: '5.4%',
      impact: 'CNY',
      description: 'Industrial output measuring economic activity',
      volatility: 'Medium',
      tradingImplications: 'Strong production boosts manufacturing stocks'
    },
    {
      time: '13:00',
      event: 'Pakistan Current Account Balance',
      importance: 'High',
      forecast: '-$1.2B',
      previous: '-$1.5B',
      impact: 'PKR',
      description: 'Trade balance and foreign exchange flows',
      volatility: 'High',
      tradingImplications: 'Improving balance strengthens currency'
    },
    {
      time: '14:30',
      event: 'India Trade Balance',
      importance: 'Medium',
      forecast: '-$22.1B',
      previous: '-$21.8B',
      impact: 'INR',
      description: 'Monthly trade deficit figures',
      volatility: 'Medium',
      tradingImplications: 'Trade deficit affects currency strength'
    },
    {
      time: '15:00',
      event: 'India Wholesale Price Index (WPI)',
      importance: 'Medium',
      forecast: '1.8%',
      previous: '2.1%',
      impact: 'INR',
      description: 'Producer price inflation measurement',
      volatility: 'Low',
      tradingImplications: 'Lower WPI suggests easing input costs'
    },
    {
      time: '16:00',
      event: 'Japan Core CPI',
      importance: 'High',
      forecast: '2.8%',
      previous: '2.7%',
      impact: 'JPY',
      description: 'Core inflation excluding fresh food',
      volatility: 'Medium',
      tradingImplications: 'Rising inflation may trigger BoJ policy shift'
    },
    {
      time: '16:30',
      event: 'Japan Employment Rate',
      importance: 'Medium',
      forecast: '2.4%',
      previous: '2.5%',
      impact: 'JPY',
      description: 'Labor market health indicator',
      volatility: 'Low',
      tradingImplications: 'Employment affects consumer spending'
    },
    {
      time: '17:00',
      event: 'South Korea GDP (QoQ)',
      importance: 'High',
      forecast: '0.8%',
      previous: '0.6%',
      impact: 'KRW',
      description: 'Quarterly economic growth measurement',
      volatility: 'High',
      tradingImplications: 'Growth acceleration positive for tech stocks'
    },
    {
      time: '18:00',
      event: 'Thailand Tourism Arrivals',
      importance: 'Medium',
      forecast: '2.8M',
      previous: '2.6M',
      impact: 'THB',
      description: 'Monthly tourist arrival statistics',
      volatility: 'Medium',
      tradingImplications: 'Tourism recovery drives service sector'
    },
    {
      time: '19:00',
      event: 'Singapore Non-Oil Domestic Exports',
      importance: 'Medium',
      forecast: '3.2%',
      previous: '2.8%',
      impact: 'SGD',
      description: 'Export performance excluding oil',
      volatility: 'Medium',
      tradingImplications: 'Export growth signals economic strength'
    }
  ]

  // Weekly Economic Outlook
  const weeklyOutlook = [
    {
      day: 'Monday',
      focus: 'Asian Market Opening',
      keyEvents: ['China Trade Data', 'Pakistan Bank Results'],
      sentiment: 'Positive',
      tradingTips: 'Focus on banking sector earnings'
    },
    {
      day: 'Tuesday',
      focus: 'Central Bank Communications',
      keyEvents: ['SBP Governor Speech', 'RBI Minutes'],
      sentiment: 'Neutral',
      tradingTips: 'Watch for policy guidance'
    },
    {
      day: 'Wednesday',
      focus: 'Inflation Data',
      keyEvents: ['Pakistan CPI', 'China PPI'],
      sentiment: 'Cautious',
      tradingTips: 'High volatility expected'
    },
    {
      day: 'Thursday',
      focus: 'Employment Reports',
      keyEvents: ['Japan Jobs', 'India Labor Force'],
      sentiment: 'Positive',
      tradingTips: 'Consumer stocks in focus'
    },
    {
      day: 'Friday',
      focus: 'GDP & Growth',
      keyEvents: ['Regional GDP Data', 'PMI Releases'],
      sentiment: 'Mixed',
      tradingTips: 'End-of-week position adjustments'
    }
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

  // Comprehensive Educational Courses Database
  const comprehensiveCourses = [
    {
      id: 1,
      title: 'Complete Forex Trading Masterclass',
      description: 'Master forex trading from absolute beginner to professional trader. This comprehensive course covers everything from currency pair analysis to advanced trading strategies, with specific focus on PKR pairs and Asian markets.',
      instructor: 'Ahmad Khan',
      credentials: 'CFA, 15+ Years Trading Experience',
      rating: 4.9,
      students: 12847,
      duration: '40 hours',
      lessons: 156,
      level: 'Beginner to Advanced',
      price: 'Free',
      originalPrice: '$299',
      language: 'English/Urdu',
      image: '📈',
      category: 'Forex Trading',
      certificate: true,
      topics: ['Currency Pairs', 'Technical Analysis', 'Risk Management', 'Trading Psychology', 'Fundamental Analysis', 'Chart Patterns'],
      curriculum: [
        { module: 'Forex Fundamentals', lessons: 25, duration: '8 hours' },
        { module: 'Technical Analysis Mastery', lessons: 35, duration: '12 hours' },
        { module: 'Risk Management Strategies', lessons: 20, duration: '6 hours' },
        { module: 'Advanced Trading Strategies', lessons: 30, duration: '10 hours' },
        { module: 'Psychology & Discipline', lessons: 15, duration: '4 hours' },
        { module: 'Live Trading Practice', lessons: 31, duration: '0 hours' }
      ],
      whatYouLearn: [
        'Master all major currency pairs including USD/PKR',
        'Read and interpret forex charts and indicators',
        'Develop profitable trading strategies',
        'Manage risk effectively in volatile markets',
        'Understand market psychology and timing',
        'Use MetaTrader 4/5 platforms professionally'
      ]
    },
    {
      id: 2,
      title: 'Cryptocurrency Trading Essentials',
      description: 'Comprehensive guide to cryptocurrency trading with focus on Bitcoin, Ethereum, and emerging altcoins. Learn security, wallet management, and profitable trading strategies.',
      instructor: 'Sarah Ahmed',
      credentials: 'Blockchain Expert, Crypto Analyst',
      rating: 4.8,
      students: 8934,
      duration: '25 hours',
      lessons: 89,
      level: 'Intermediate',
      price: '$49',
      originalPrice: '$199',
      language: 'English',
      image: '₿',
      category: 'Cryptocurrency',
      certificate: true,
      topics: ['Blockchain Basics', 'Crypto Analysis', 'Portfolio Management', 'Security', 'DeFi Trading', 'NFT Markets'],
      curriculum: [
        { module: 'Blockchain & Crypto Fundamentals', lessons: 15, duration: '5 hours' },
        { module: 'Technical Analysis for Crypto', lessons: 20, duration: '7 hours' },
        { module: 'Trading Strategies & Patterns', lessons: 18, duration: '6 hours' },
        { module: 'Security & Wallet Management', lessons: 12, duration: '3 hours' },
        { module: 'DeFi & Advanced Trading', lessons: 14, duration: '4 hours' },
        { module: 'Portfolio & Risk Management', lessons: 10, duration: '0 hours' }
      ],
      whatYouLearn: [
        'Understand blockchain technology and cryptocurrencies',
        'Analyze crypto markets using technical indicators',
        'Secure your crypto assets with proper wallet management',
        'Trade major cryptocurrencies profitably',
        'Navigate DeFi protocols and yield farming',
        'Build a diversified crypto portfolio'
      ]
    },
    {
      id: 3,
      title: 'Pakistan Stock Exchange (PSX) Mastery',
      description: 'Deep dive into Pakistan Stock Exchange with comprehensive sector analysis, fundamental research methodology, and professional investment strategies tailored for Pakistani markets.',
      instructor: 'Dr. Hassan Ali',
      credentials: 'PhD Finance, Former PSX Analyst',
      rating: 4.7,
      students: 6721,
      duration: '30 hours',
      lessons: 112,
      level: 'Intermediate',
      price: '$79',
      originalPrice: '$299',
      language: 'Urdu/English',
      image: '📊',
      category: 'Stock Market',
      certificate: true,
      topics: ['PSX Fundamentals', 'Company Analysis', 'Sector Rotation', 'Portfolio Building', 'Financial Statements', 'Valuation Models'],
      curriculum: [
        { module: 'PSX Market Structure & Regulations', lessons: 18, duration: '6 hours' },
        { module: 'Fundamental Analysis Deep Dive', lessons: 25, duration: '8 hours' },
        { module: 'Sector Analysis & Industry Trends', lessons: 20, duration: '7 hours' },
        { module: 'Company Valuation Techniques', lessons: 22, duration: '6 hours' },
        { module: 'Portfolio Construction & Management', lessons: 15, duration: '2 hours' },
        { module: 'Case Studies & Live Analysis', lessons: 12, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Navigate PSX trading systems and regulations',
        'Perform comprehensive fundamental analysis',
        'Evaluate companies using multiple valuation methods',
        'Understand Pakistani economic indicators',
        'Build and manage a profitable stock portfolio',
        'Identify sector rotation opportunities'
      ]
    },
    {
      id: 4,
      title: 'Advanced Options Trading Strategies',
      description: 'Master complex options strategies including spreads, butterflies, iron condors, and advanced hedging techniques. Learn to generate income and hedge portfolios effectively.',
      instructor: 'Fatima Malik',
      credentials: 'Options Specialist, Risk Manager',
      rating: 4.9,
      students: 4532,
      duration: '35 hours',
      lessons: 128,
      level: 'Advanced',
      price: '$149',
      originalPrice: '$499',
      language: 'English',
      image: '⚡',
      category: 'Options Trading',
      certificate: true,
      topics: ['Options Greeks', 'Complex Spreads', 'Volatility Trading', 'Risk Management', 'Income Strategies', 'Hedging Techniques'],
      curriculum: [
        { module: 'Options Fundamentals & Greeks', lessons: 22, duration: '8 hours' },
        { module: 'Basic Strategies & Spreads', lessons: 25, duration: '9 hours' },
        { module: 'Advanced Multi-Leg Strategies', lessons: 30, duration: '10 hours' },
        { module: 'Volatility Trading & Analysis', lessons: 20, duration: '5 hours' },
        { module: 'Portfolio Hedging Strategies', lessons: 18, duration: '2 hours' },
        { module: 'Live Trading & Case Studies', lessons: 13, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Master all options Greeks and their applications',
        'Execute complex multi-leg options strategies',
        'Trade volatility effectively using options',
        'Hedge portfolios against market downturns',
        'Generate consistent income through options',
        'Manage risk in options positions professionally'
      ]
    },
    {
      id: 5,
      title: 'Islamic Finance & Halal Trading Complete Guide',
      description: 'Comprehensive course on Shariah-compliant trading methods, halal investment principles, Islamic banking fundamentals, and ethical trading practices for Muslim investors.',
      instructor: 'Imam Muhammad Qasim',
      credentials: 'Islamic Scholar, Certified Islamic Finance Professional',
      rating: 4.8,
      students: 9876,
      duration: '20 hours',
      lessons: 67,
      level: 'Beginner',
      price: 'Free',
      originalPrice: '$199',
      language: 'Urdu/Arabic/English',
      image: '☪️',
      category: 'Islamic Finance',
      certificate: true,
      topics: ['Islamic Finance Principles', 'Halal Investments', 'Sukuk Trading', 'Ethical Trading', 'Shariah Compliance', 'Islamic Banking'],
      curriculum: [
        { module: 'Foundations of Islamic Finance', lessons: 15, duration: '5 hours' },
        { module: 'Halal vs Haram in Trading', lessons: 12, duration: '4 hours' },
        { module: 'Sukuk & Islamic Securities', lessons: 10, duration: '3 hours' },
        { module: 'Islamic Banking Products', lessons: 12, duration: '4 hours' },
        { module: 'Shariah-Compliant Investment Strategies', lessons: 10, duration: '3 hours' },
        { module: 'Practical Implementation & Case Studies', lessons: 8, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Understand Islamic finance principles and Shariah law',
        'Identify halal vs haram investment opportunities',
        'Trade Sukuk and Islamic financial instruments',
        'Build Shariah-compliant investment portfolios',
        'Navigate Islamic banking products effectively',
        'Apply ethical trading practices in all markets'
      ]
    },
    {
      id: 6,
      title: 'Algorithmic Trading & Quantitative Analysis',
      description: 'Build automated trading systems using Python, machine learning, and statistical analysis. Learn systematic trading, backtesting, and deployment of trading algorithms.',
      instructor: 'Ali Raza (PhD)',
      credentials: 'PhD Quantitative Finance, Algorithmic Trading Expert',
      rating: 4.6,
      students: 3241,
      duration: '50 hours',
      lessons: 189,
      level: 'Advanced',
      price: '$199',
      originalPrice: '$699',
      language: 'English',
      image: '🤖',
      category: 'Algorithmic Trading',
      certificate: true,
      topics: ['Python for Trading', 'Machine Learning', 'Backtesting', 'Strategy Development', 'Risk Models', 'API Integration'],
      curriculum: [
        { module: 'Python Programming for Trading', lessons: 35, duration: '12 hours' },
        { module: 'Data Analysis & Market Data', lessons: 30, duration: '10 hours' },
        { module: 'Trading Strategy Development', lessons: 40, duration: '14 hours' },
        { module: 'Backtesting & Performance Metrics', lessons: 25, duration: '8 hours' },
        { module: 'Machine Learning for Trading', lessons: 35, duration: '4 hours' },
        { module: 'Live Deployment & Monitoring', lessons: 24, duration: '2 hours' }
      ],
      whatYouLearn: [
        'Program trading algorithms in Python',
        'Develop and test systematic trading strategies',
        'Apply machine learning to market prediction',
        'Build robust backtesting frameworks',
        'Deploy algorithms to live trading environments',
        'Manage algorithmic trading risk effectively'
      ]
    },
    {
      id: 7,
      title: 'Technical Analysis Professional Certification',
      description: 'Comprehensive technical analysis course covering all chart patterns, indicators, and analytical techniques used by professional traders and analysts worldwide.',
      instructor: 'Rizwan Ahmed',
      credentials: 'CMT, Professional Technical Analyst',
      rating: 4.8,
      students: 7654,
      duration: '45 hours',
      lessons: 167,
      level: 'Intermediate to Advanced',
      price: '$129',
      originalPrice: '$399',
      language: 'English/Urdu',
      image: '📉',
      category: 'Technical Analysis',
      certificate: true,
      topics: ['Chart Patterns', 'Technical Indicators', 'Market Structure', 'Wave Analysis', 'Volume Analysis', 'Multi-Timeframe Analysis'],
      curriculum: [
        { module: 'Technical Analysis Foundations', lessons: 25, duration: '8 hours' },
        { module: 'Chart Patterns Mastery', lessons: 35, duration: '12 hours' },
        { module: 'Technical Indicators Deep Dive', lessons: 40, duration: '14 hours' },
        { module: 'Advanced Market Analysis', lessons: 30, duration: '8 hours' },
        { module: 'Multi-Timeframe Analysis', lessons: 20, duration: '2 hours' },
        { module: 'Professional Trading Setups', lessons: 17, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Master all major chart patterns and formations',
        'Use technical indicators effectively and accurately',
        'Analyze market structure and trends professionally',
        'Apply Elliott Wave and Fibonacci analysis',
        'Conduct multi-timeframe analysis for better entries',
        'Develop high-probability trading setups'
      ]
    },
    {
      id: 8,
      title: 'Risk Management & Trading Psychology',
      description: 'Essential course focusing on risk management techniques, trading psychology, emotional control, and developing the mindset of successful professional traders.',
      instructor: 'Dr. Aisha Khan',
      credentials: 'Trading Psychologist, Risk Management Expert',
      rating: 4.9,
      students: 11234,
      duration: '28 hours',
      lessons: 98,
      level: 'All Levels',
      price: '$89',
      originalPrice: '$249',
      language: 'English/Urdu',
      image: '🧠',
      category: 'Trading Psychology',
      certificate: true,
      topics: ['Risk Management', 'Trading Psychology', 'Emotional Control', 'Discipline', 'Money Management', 'Performance Analysis'],
      curriculum: [
        { module: 'Risk Management Fundamentals', lessons: 20, duration: '7 hours' },
        { module: 'Trading Psychology & Emotions', lessons: 25, duration: '8 hours' },
        { module: 'Discipline & Consistency', lessons: 18, duration: '6 hours' },
        { module: 'Money Management Strategies', lessons: 15, duration: '4 hours' },
        { module: 'Performance Tracking & Analysis', lessons: 12, duration: '2 hours' },
        { module: 'Building Trading Habits', lessons: 8, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Implement professional risk management techniques',
        'Control emotions and maintain trading discipline',
        'Develop consistent money management rules',
        'Analyze and improve trading performance',
        'Build sustainable trading habits and routines',
        'Overcome common psychological trading pitfalls'
      ]
    },
    {
      id: 9,
      title: 'Commodities Trading: Gold, Oil & Agriculture',
      description: 'Comprehensive guide to commodities trading including precious metals, energy markets, and agricultural products with focus on global and regional markets.',
      instructor: 'Tariq Mahmood',
      credentials: 'Commodities Specialist, Market Analyst',
      rating: 4.7,
      students: 5432,
      duration: '38 hours',
      lessons: 143,
      level: 'Intermediate',
      price: '$119',
      originalPrice: '$349',
      language: 'English',
      image: '🥇',
      category: 'Commodities',
      certificate: true,
      topics: ['Gold Trading', 'Oil Markets', 'Agricultural Commodities', 'Futures Trading', 'Commodity Analysis', 'Global Markets'],
      curriculum: [
        { module: 'Commodities Market Overview', lessons: 20, duration: '7 hours' },
        { module: 'Precious Metals Trading', lessons: 25, duration: '9 hours' },
        { module: 'Energy Markets & Oil Trading', lessons: 30, duration: '10 hours' },
        { module: 'Agricultural Commodities', lessons: 25, duration: '8 hours' },
        { module: 'Futures & Derivatives', lessons: 23, duration: '3 hours' },
        { module: 'Risk Management in Commodities', lessons: 20, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Trade gold, silver, and precious metals professionally',
        'Understand oil and energy market dynamics',
        'Analyze agricultural commodity markets',
        'Use futures contracts for trading and hedging',
        'Apply seasonal and cyclical analysis',
        'Manage risk in volatile commodity markets'
      ]
    },
    {
      id: 10,
      title: 'Real Estate Investment & REITs Trading',
      description: 'Complete guide to real estate investment including REITs trading, property investment analysis, and real estate market fundamentals for Pakistani and international markets.',
      instructor: 'Sana Malik',
      credentials: 'Real Estate Investment Expert, REIT Specialist',
      rating: 4.6,
      students: 4321,
      duration: '32 hours',
      lessons: 118,
      level: 'Beginner to Intermediate',
      price: '$99',
      originalPrice: '$279',
      language: 'Urdu/English',
      image: '🏢',
      category: 'Real Estate',
      certificate: true,
      topics: ['REIT Trading', 'Property Analysis', 'Real Estate Markets', 'Investment Strategies', 'Market Research', 'Portfolio Diversification'],
      curriculum: [
        { module: 'Real Estate Investment Basics', lessons: 18, duration: '6 hours' },
        { module: 'REIT Analysis & Trading', lessons: 25, duration: '9 hours' },
        { module: 'Property Valuation Methods', lessons: 20, duration: '7 hours' },
        { module: 'Market Research & Analysis', lessons: 22, duration: '6 hours' },
        { module: 'Investment Strategies & Financing', lessons: 18, duration: '3 hours' },
        { module: 'Portfolio Management & Tax Planning', lessons: 15, duration: '1 hour' }
      ],
      whatYouLearn: [
        'Analyze and trade REITs effectively',
        'Evaluate real estate investment opportunities',
        'Understand property valuation techniques',
        'Conduct thorough market research and analysis',
        'Develop diversified real estate portfolios',
        'Optimize tax strategies for real estate investments'
      ]
    }
  ]

  // Learning paths and specializations
  const learningPaths = [
    {
      id: 1,
      title: 'Complete Trader Certification Path',
      description: 'Comprehensive 6-month program covering all aspects of trading',
      courses: [1, 7, 8, 2, 4],
      duration: '180 hours',
      level: 'Beginner to Advanced',
      price: '$399',
      originalPrice: '$1,200',
      students: 2341,
      rating: 4.9
    },
    {
      id: 2,
      title: 'Islamic Finance Specialist Track',
      description: 'Shariah-compliant investment and trading specialization',
      courses: [5, 3, 10],
      duration: '82 hours',
      level: 'Beginner to Intermediate',
      price: '$199',
      originalPrice: '$577',
      students: 1876,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Quantitative Trading Master Class',
      description: 'Advanced algorithmic and systematic trading program',
      courses: [6, 7, 8, 9],
      duration: '161 hours',
      level: 'Advanced',
      price: '$499',
      originalPrice: '$1,016',
      students: 987,
      rating: 4.7
    }
  ]

  // Trading tools and resources
  const tradingTools = [
    {
      name: 'Position Size Calculator',
      description: 'Calculate optimal position sizes based on risk tolerance',
      icon: '🧮',
      category: 'Risk Management',
      difficulty: 'Beginner',
      isPremium: false
    },
    {
      name: 'Forex Correlation Matrix',
      description: 'Real-time currency pair correlation analysis',
      icon: '🔗',
      category: 'Analysis',
      difficulty: 'Intermediate',
      isPremium: true
    },
    {
      name: 'Economic Calendar Integration',
      description: 'Live economic events with market impact analysis',
      icon: '📅',
      category: 'Fundamental Analysis',
      difficulty: 'Beginner',
      isPremium: false
    },
    {
      name: 'Market Sentiment Indicator',
      description: 'Real-time market sentiment and positioning data',
      icon: '📊',
      category: 'Market Analysis',
      difficulty: 'Advanced',
      isPremium: true
    },
    {
      name: 'Fibonacci Retracement Tool',
      description: 'Interactive Fibonacci analysis for any timeframe',
      icon: '📐',
      category: 'Technical Analysis',
      difficulty: 'Intermediate',
      isPremium: false
    },
    {
      name: 'Options Strategy Builder',
      description: 'Build and analyze complex options strategies',
      icon: '⚡',
      category: 'Options',
      difficulty: 'Advanced',
      isPremium: true
    }
  ]

  // Comprehensive Trading Articles Database with Full Content
  const tradingArticles = [
    {
      id: 1,
      title: '5 Essential Risk Management Rules Every Pakistani Trader Must Know',
      excerpt: 'Protect your capital with these proven risk management strategies tailored for the Pakistani market conditions and regulatory environment.',
      author: 'Ahmad Shah',
      authorCredentials: 'Risk Management Expert, CFA',
      readTime: '8 min read',
      category: 'Risk Management',
      publishDate: '2 days ago',
      icon: '🛡️',
      tags: ['Risk Management', 'Pakistani Markets', 'Capital Protection', 'Trading Rules'],
      views: 12847,
      likes: 892,
      shares: 156,
      difficulty: 'Beginner',
      fullContent: `# 5 Essential Risk Management Rules Every Pakistani Trader Must Know

Risk management is the cornerstone of successful trading, especially in the volatile Pakistani financial markets. Here are five critical rules every trader must implement:

## 1. The 2% Rule for Pakistani Markets

Never risk more than 2% of your trading capital on a single trade. In Pakistani markets, where volatility can be extreme due to political and economic factors, this rule becomes even more critical.

**Example:** If you have ₨100,000 in trading capital, never risk more than ₨2,000 on any single trade.

**Pakistani Market Context:** Given the PKR's volatility against major currencies, forex traders should be especially cautious with position sizing.

## 2. Diversification Across Pakistani Sectors

Don't put all your eggs in one basket. The Pakistani market offers various sectors:
- Banking (HBL, UBL, MCB)
- Textiles (Nishat Mills, Gul Ahmed)
- Cement (Lucky Cement, DG Khan Cement)
- Energy (PSO, APL)
- Technology (Systems Limited, TRG)

**Action Plan:** Allocate maximum 20% of your portfolio to any single sector.

## 3. Stop-Loss Orders: Your Safety Net

Always set stop-loss orders before entering a trade. In PSX, where circuit breakers exist, having predetermined exit points is crucial.

**PSX-Specific Tip:** Consider the 5% daily limit on PSX when setting stop-losses. Plan for gap-downs that might occur due to overnight news.

## 4. Position Sizing Based on Volatility

Adjust your position size based on the volatility of the asset:
- High volatility stocks (like small-cap PSX stocks): Smaller positions
- Low volatility assets (like government bonds): Larger positions

**Pakistani Market Formula:**
Position Size = (Account Risk ÷ Trade Risk) × Account Balance

## 5. Regular Portfolio Review and Rebalancing

Review your portfolio monthly and rebalance based on:
- Market conditions
- Economic indicators (SBP interest rates, inflation)
- Political stability
- Global market trends affecting Pakistan

**Key Metrics to Monitor:**
- Portfolio Beta relative to KSE-100
- Sector allocation percentages
- Currency exposure (PKR vs USD)
- Liquidity ratios

## Conclusion

Risk management isn't about avoiding losses—it's about managing them intelligently. These five rules, when applied consistently in the Pakistani market context, will help preserve your capital and improve your long-term trading success.

Remember: In Pakistani markets, where information flow can be limited and volatility high, conservative risk management is your best friend.`
    },
    {
      id: 2,
      title: 'Understanding PKR Currency Pairs: A Complete Guide',
      excerpt: 'Master the intricacies of Pakistani Rupee trading pairs and discover profitable opportunities in forex markets with comprehensive analysis.',
      author: 'Fatima Malik',
      authorCredentials: 'Senior Forex Analyst, 12+ Years Experience',
      readTime: '12 min read',
      category: 'Forex',
      publishDate: '1 week ago',
      icon: '💱',
      tags: ['PKR', 'Forex Trading', 'Currency Pairs', 'Pakistani Economy'],
      views: 18934,
      likes: 1247,
      shares: 298,
      difficulty: 'Intermediate',
      fullContent: `# Understanding PKR Currency Pairs: A Complete Guide

The Pakistani Rupee (PKR) is one of the most actively traded emerging market currencies. Understanding its dynamics is crucial for profitable forex trading.

## Major PKR Currency Pairs

### 1. USD/PKR - The King of PKR Pairs
**Current Range:** 275-285 PKR per USD
**Average Daily Volume:** $2.5 billion
**Best Trading Times:** 9:00 AM - 6:00 PM PST

**Key Drivers:**
- State Bank of Pakistan (SBP) monetary policy
- IMF program developments
- Remittances from overseas Pakistanis
- Trade balance and current account deficit
- Political stability

**Trading Strategy:**
- Watch for SBP intervention levels around 280-285
- Trade breakouts during economic data releases
- Use support/resistance at round numbers (275, 280, 285)

### 2. EUR/PKR - European Connection
**Characteristics:** Less liquid but offers good opportunities
**Key Factor:** European trade relationships and EU economic data

### 3. GBP/PKR - The Commonwealth Link
**Special Considerations:** Strong correlation with UK-Pakistan trade
**Trading Volume:** Moderate, best during London session overlap

## Fundamental Analysis for PKR

### Economic Indicators to Watch:

1. **Inflation Rate (Current: ~28%)**
   - Higher inflation typically weakens PKR
   - Monitor CPI releases monthly

2. **Interest Rates (Current: 15%)**
   - SBP policy rate decisions
   - Real interest rates vs inflation

3. **Current Account Balance**
   - Trade deficit impacts PKR strength
   - Monthly SBP data releases

4. **Foreign Exchange Reserves**
   - Critical threshold: 3 months of imports
   - Weekly SBP updates

5. **Remittances**
   - $2.5+ billion monthly inflows
   - Major PKR support factor

## Technical Analysis Strategies

### Chart Patterns That Work for PKR:
1. **Range Trading** (Most Common)
   - PKR often trades in ranges due to SBP intervention
   - Buy support, sell resistance

2. **Breakout Trading**
   - Major news events can cause significant breakouts
   - High probability setups during:
     - IMF review announcements
     - Election periods
     - Major policy changes

3. **Trend Following**
   - Medium-term trends last 3-6 months
   - Use 50-day and 200-day moving averages

## Risk Management for PKR Trading

### Special Considerations:
1. **High Volatility:** PKR can move 1-2% in a day
2. **Liquidity Issues:** Avoid trading during Pakistan holidays
3. **Political Risk:** Elections and policy changes create uncertainty
4. **Central Bank Intervention:** SBP actively manages PKR levels

### Position Sizing Formula:
Risk Amount = Account Size × 1% (maximum for PKR trades)

## Trading Sessions and Optimal Times

### Pakistan Session (9:00 AM - 5:00 PM PST):
- Highest liquidity for PKR pairs
- Local bank participation
- Economic data releases

### London Session Overlap (2:00 PM - 4:00 PM PST):
- Increased EUR/PKR and GBP/PKR activity
- Best for major pair correlations

## Common Mistakes to Avoid

1. **Ignoring Political Events:** Elections and policy changes severely impact PKR
2. **Overleveraging:** PKR volatility can quickly wipe out accounts
3. **Trading During Ramadan:** Reduced liquidity and unusual patterns
4. **Ignoring IMF News:** Program updates are major market movers

## Profitable Trading Strategies

### Strategy 1: Range Trading USD/PKR
- Buy near 275-276 levels
- Sell near 283-285 levels
- Stop loss: 1% beyond range
- Risk-reward: 1:2 minimum

### Strategy 2: News Trading
- Trade SBP policy announcements
- IMF review outcomes
- Monthly inflation data
- Position 30 minutes before release

### Strategy 3: Correlation Trading
- USD/PKR vs Gold correlation (negative)
- Oil prices impact (Pakistan is oil importer)
- Regional currency correlations (INR, BDT)

## Conclusion

PKR trading offers excellent opportunities for informed traders. The key is understanding the unique economic and political factors that drive this currency. Always maintain strict risk management and stay updated with Pakistani economic developments.

**Remember:** PKR is classified as an exotic currency pair, so expect higher spreads and lower liquidity compared to major pairs.`
    },
    {
      id: 3,
      title: 'PSX Sector Analysis: Where to Invest in 2025',
      excerpt: 'Comprehensive analysis of Pakistan Stock Exchange sectors with detailed investment recommendations and growth prospects for the coming year.',
      author: 'Dr. Hassan Ali',
      authorCredentials: 'PhD Finance, Former PSX Chief Analyst',
      readTime: '15 min read',
      category: 'Stocks',
      publishDate: '3 days ago',
      icon: '📈',
      tags: ['PSX', 'Sector Analysis', 'Investment Strategy', 'Pakistani Stocks'],
      views: 15672,
      likes: 967,
      shares: 234,
      difficulty: 'Intermediate',
      fullContent: `# PSX Sector Analysis: Where to Invest in 2025

Pakistan Stock Exchange offers diverse investment opportunities across multiple sectors. Here's our comprehensive analysis for 2025 investment strategy.

## Banking Sector: The Crown Jewel 👑

### Performance Outlook: BULLISH
**Expected Return:** 25-35% in 2025

### Top Picks:
1. **Habib Bank Limited (HBL)**
   - Current Price: ₨285
   - Target Price: ₨350
   - P/E Ratio: 4.8x
   - Dividend Yield: 8.2%

2. **United Bank Limited (UBL)**
   - Current Price: ₨246
   - Target Price: ₨320
   - P/E Ratio: 3.9x
   - Dividend Yield: 9.1%

3. **MCB Bank Limited**
   - Current Price: ₨189
   - Target Price: ₨240
   - P/E Ratio: 4.2x
   - Dividend Yield: 7.8%

### Investment Rationale:
- **Improved Asset Quality:** NPL ratios declining across the sector
- **Interest Rate Environment:** High policy rates boosting net interest margins
- **Digital Transformation:** Cost efficiency through digital banking
- **Economic Recovery:** GDP growth supporting credit demand

### Risks to Watch:
- Political instability affecting business confidence
- Regulatory changes in banking sector
- Economic slowdown impacting loan demand

## Cement Sector: Infrastructure Play 🏗️

### Performance Outlook: POSITIVE
**Expected Return:** 15-25% in 2025

### Top Picks:
1. **Lucky Cement**
   - Strong export potential
   - Efficient operations
   - Capacity expansion plans

2. **DG Khan Cement**
   - Cost advantages
   - Strategic locations
   - Strong fundamentals

### Growth Drivers:
- CPEC Phase II projects
- Government infrastructure spending
- Housing sector recovery
- Export opportunities

## Technology Sector: The Dark Horse 💻

### Performance Outlook: VERY BULLISH
**Expected Return:** 40-60% in 2025

### Top Picks:
1. **Systems Limited**
   - Current Price: ₨89
   - Target Price: ₨130
   - IT exports growth story

2. **TRG Pakistan**
   - Global expansion
   - Recurring revenue model
   - Strong management

3. **NetSol Technologies**
   - Specialized software solutions
   - International presence
   - Growing customer base

### Why Technology Will Outperform:
- **IT Exports Boom:** Crossed $3 billion milestone
- **Government Support:** IT-friendly policies
- **Currency Advantage:** PKR depreciation boosts exports
- **Global Demand:** Increased outsourcing post-COVID

## Textile Sector: Traditional Strength 🧵

### Performance Outlook: NEUTRAL TO POSITIVE
**Expected Return:** 10-20% in 2025

### Investment Considerations:
**Positives:**
- Export recovery
- Energy cost stabilization
- GSP+ status extension

**Challenges:**
- High input costs
- International competition
- Environmental compliance costs

### Selective Investment Approach:
Focus on integrated players with:
- Backward integration
- Export-oriented operations
- Modern equipment
- Strong management

## Oil & Gas Sector: Value Play ⛽

### Performance Outlook: MIXED
**Expected Return:** 5-15% in 2025

### Segment Analysis:

#### Exploration & Production:
- **Pakistan Petroleum Limited (PPL):** Stable dividend yield
- **Oil & Gas Development Company (OGDC):** Government backing

#### Marketing Companies:
- **Pakistan State Oil (PSO):** Market leader but debt concerns
- **Attock Petroleum Limited (APL):** Better financial position

### Investment Strategy:
- Focus on companies with:
  - Low debt levels
  - Efficient operations
  - Government support
  - Dividend sustainability

## Fertilizer Sector: Agricultural Support 🌾

### Performance Outlook: STABLE
**Expected Return:** 8-18% in 2025

### Key Players:
1. **Engro Fertilizers**
2. **Fauji Fertilizer Company**

### Growth Drivers:
- Agricultural support policies
- Subsidy programs
- Food security focus

## Pharmaceutical Sector: Defensive Play 💊

### Performance Outlook: STEADY
**Expected Return:** 12-22% in 2025

### Investment Merit:
- Consistent demand
- Export potential
- Generic drug opportunities
- Healthcare sector growth

## Recommended Portfolio Allocation for 2025

### Aggressive Portfolio:
- Banking: 30%
- Technology: 25%
- Cement: 20%
- Textiles: 15%
- Others: 10%

### Conservative Portfolio:
- Banking: 25%
- Cement: 20%
- Pharmaceutical: 20%
- Oil & Gas: 15%
- FMCG: 10%
- Others: 10%

### Balanced Portfolio:
- Banking: 25%
- Technology: 20%
- Cement: 15%
- Textiles: 15%
- Pharmaceutical: 10%
- Oil & Gas: 10%
- Others: 5%

## Risk Factors to Monitor

### Political Risks:
- Election outcomes
- Policy continuity
- Governance issues

### Economic Risks:
- IMF program compliance
- Current account deficit
- Inflation trends
- Interest rate changes

### Global Risks:
- Commodity price volatility
- Global recession fears
- Geopolitical tensions

## Investment Strategy Recommendations

### For New Investors:
1. Start with blue-chip banking stocks
2. Diversify across 3-4 sectors
3. Use systematic investment plans
4. Focus on dividend-paying stocks

### For Experienced Investors:
1. Overweight technology and banking
2. Consider small-cap opportunities
3. Use technical analysis for timing
4. Implement sector rotation strategies

## Conclusion

2025 presents a mixed but overall positive outlook for PSX. Banking and technology sectors offer the best risk-adjusted returns, while traditional sectors like cement and textiles provide steady growth opportunities.

**Key Success Factors:**
- Diversification across sectors
- Focus on quality management
- Monitor economic indicators
- Maintain long-term perspective

**Investment Mantra for 2025:** "Quality over quantity, patience over panic."

The Pakistani market rewards patient investors who focus on fundamentals and maintain disciplined investment approaches.`
    },
    {
      id: 4,
      title: 'Crypto Trading Psychology: Mastering Your Emotions',
      excerpt: 'Learn how to control fear and greed while trading cryptocurrencies in volatile markets with proven psychological techniques and mindset strategies.',
      author: 'Dr. Aisha Khan',
      authorCredentials: 'Trading Psychologist, Behavioral Finance Expert',
      readTime: '10 min read',
      category: 'Psychology',
      publishDate: '5 days ago',
      icon: '🧠',
      tags: ['Crypto Trading', 'Psychology', 'Emotional Control', 'Mindset'],
      views: 23145,
      likes: 1589,
      shares: 412,
      difficulty: 'All Levels',
      fullContent: `# Crypto Trading Psychology: Mastering Your Emotions

Cryptocurrency trading is 80% psychology and 20% strategy. Master your emotions, and you'll master the markets.

## The Psychological Challenges of Crypto Trading

### 1. Extreme Volatility
Bitcoin can move 10-20% in a single day, creating intense emotional responses:
- **Fear** when prices crash
- **FOMO** (Fear of Missing Out) during rallies
- **Panic** during market corrections
- **Euphoria** during bull runs

### 2. 24/7 Markets
Unlike traditional markets, crypto never sleeps:
- Constant monitoring leads to stress
- Sleep deprivation affects decision-making
- Weekend moves catch traders off-guard
- Global news impacts prices anytime

### 3. Information Overload
- Social media noise and "crypto Twitter"
- Conflicting analyst opinions
- Whale movement alerts
- Regulatory news from multiple countries

## The Big Two: Fear and Greed

### Understanding Fear in Crypto Trading

**Types of Fear:**
1. **Fear of Loss:** "What if this investment goes to zero?"
2. **Fear of Missing Out (FOMO):** "What if I miss the next big pump?"
3. **Fear of Being Wrong:** "What if my analysis is incorrect?"

**How Fear Manifests:**
- Selling at the bottom of crashes
- Not taking profits during rallies
- Avoiding trades altogether
- Constantly checking prices

**Fear Management Strategies:**

1. Position Sizing: Never invest more than you can afford to lose
2. Stop Losses: Predetermined exit points reduce emotional decisions
3. Dollar-Cost Averaging: Reduces timing pressure
4. Education: Knowledge reduces uncertainty and fear

### Understanding Greed in Crypto Trading

**How Greed Appears:**
- "Just one more pump before I sell"
- Increasing position sizes after wins
- Ignoring risk management rules
- Chasing quick profits

**Greed Management Techniques:**

1. Profit-Taking Rules: Take 25% profits at 2x, 50% at 5x
2. Portfolio Limits: Maximum 10% in any single crypto
3. Cooling-Off Periods: Take breaks after big wins
4. Goal Setting: Define clear profit targets

## The Crypto Trading Emotional Cycle

### Stage 1: Optimism (Entry Point)
- "This time is different"
- Research looks promising
- Small initial investment

**Psychology Tip:** This is the best time to invest, but resist going all-in.

### Stage 2: Excitement (Early Gains)
- Price starts moving up
- Confirming your analysis
- Considering adding more

**Psychology Tip:** Take some profits and stick to your plan.

### Stage 3: Euphoria (Peak)
- Everyone talking about crypto
- Massive gains in portfolio
- Feeling like a genius

**Psychology Tip:** This is when you should be selling, not buying.

### Stage 4: Anxiety (First Drop)
- "It's just a small correction"
- Hoping for recovery
- Checking prices constantly

**Psychology Tip:** If you haven't taken profits yet, take some now.

### Stage 5: Denial (Continued Decline)
- "It will come back"
- Blaming market manipulation
- Seeking confirming opinions

**Psychology Tip:** Reassess your thesis objectively.

### Stage 6: Panic (Major Losses)
- Fear of total loss
- Desperate for recovery
- Irrational decision-making

**Psychology Tip:** This is often the bottom. Don't sell in panic.

### Stage 7: Capitulation (Bottom)
- Giving up hope
- Selling at major losses
- Vowing never to trade again

**Psychology Tip:** Markets often bottom when hope is lost.

## Practical Emotional Control Techniques

### 1. The 5-Minute Rule
Before making any trade:
- Wait 5 minutes
- Ask: "Am I making this decision emotionally?"
- If yes, wait longer or skip the trade

### 2. Position Sizing Psychology
**Rule:** If a position keeps you awake at night, it's too large.

**Formula for Peace of Mind:**
- Emergency fund: 6 months expenses
- Investment amount: Only money you can lose
- Crypto allocation: Maximum 10-20% of investment portfolio

### 3. The Trading Journal Method
Record for every trade:
- Date and time
- Entry reason (technical/fundamental)
- Emotional state (1-10 scale)
- Exit reason
- Lessons learned

**Pattern Recognition:** You'll start seeing emotional patterns in your trading.

### 4. Meditation and Mindfulness
**Daily Practice:**
- 10 minutes morning meditation
- Breathing exercises before trading
- Mindful price checking (set specific times)
- Gratitude practice for gains and losses

### 5. Social Media Detox
**Rules for Healthy Crypto Social Media:**
- Unfollow accounts that create FOMO
- Set specific times for crypto news
- Focus on educational content
- Avoid price prediction content

## Building Mental Resilience

### 1. Accept Losses as Part of Trading
- Professional traders have 40-60% win rates
- It's about overall profitability, not individual trades
- Every loss is a learning opportunity

### 2. Develop a Personal Trading Philosophy
Example philosophy:

"I trade cryptocurrencies to build long-term wealth, not get rich quick.
I will stick to my rules even when emotions run high.
I accept that losses are part of the journey to profits."

### 3. Stress Management Techniques
**During High Volatility:**
- Take deep breaths (4-7-8 breathing technique)
- Step away from charts for 30 minutes
- Do physical exercise
- Talk to a trusted friend or mentor

### 4. Celebrating Small Wins
- Acknowledge good trading decisions, not just profits
- Celebrate sticking to your plan
- Reward yourself for emotional control

## Common Psychological Traps and How to Avoid Them

### 1. Confirmation Bias
**Trap:** Only seeking information that confirms your position
**Solution:** Actively seek opposing viewpoints

### 2. Sunk Cost Fallacy
**Trap:** "I've already lost so much, I can't sell now"
**Solution:** Each decision is independent of past investments

### 3. Anchoring Bias
**Trap:** Fixating on the price you bought at
**Solution:** Focus on future potential, not past prices

### 4. Herd Mentality
**Trap:** Following the crowd
**Solution:** Do your own research and stick to your strategy

## Creating Your Emotional Trading Plan

### Pre-Trading Checklist:
□ I am well-rested and focused
□ I have clear entry and exit plans
□ My position size follows my rules
□ I am not revenge trading from a previous loss
□ I can handle the maximum possible loss

### During-Trading Rules:
□ I will not change my plan based on emotions
□ I will take breaks every 2 hours
□ I will not increase position size impulsively
□ I will follow my stop-loss rules

### Post-Trading Review:
□ What emotions did I experience?
□ Did I follow my plan?
□ What can I improve next time?
□ Am I taking adequate breaks?

## When to Take a Break

**Warning Signs You Need a Break:**
- Making impulsive trades
- Checking prices every few minutes
- Losing sleep over positions
- Relationship or work suffering
- Chasing losses with bigger bets

**Recommended Break Duration:**
- After major loss: 1-2 weeks
- After major win: 1 week
- Monthly: 3-4 day break
- Quarterly: 1-2 week break

## Conclusion: The Path to Emotional Mastery

Mastering crypto trading psychology is a lifelong journey. Remember:

1. **Emotions are normal** - even professional traders feel fear and greed
2. **Systems beat emotions** - always follow your predetermined rules
3. **Small, consistent gains** beat large, risky bets
4. **Self-awareness is key** - know your emotional triggers
5. **Health comes first** - no trade is worth your mental health

**Final Thought:** The market will always be there tomorrow. Protect your capital and your mental health, and you'll be able to trade for years to come.

**Remember:** "The goal isn't to eliminate emotions, but to make rational decisions despite them."`
    },
    {
      id: 5,
      title: 'Technical Analysis Masterclass: Chart Patterns That Actually Work',
      excerpt: 'Discover the most reliable chart patterns with real Pakistani market examples and proven entry/exit strategies for consistent profitability.',
      author: 'Rizwan Ahmed',
      authorCredentials: 'CMT, Professional Technical Analyst',
      readTime: '18 min read',
      category: 'Technical Analysis',
      publishDate: '1 day ago',
      icon: '📊',
      tags: ['Technical Analysis', 'Chart Patterns', 'Trading Strategies', 'Pakistani Markets'],
      views: 31245,
      likes: 2156,
      shares: 578,
      difficulty: 'Intermediate',
      fullContent: `# Technical Analysis Masterclass: Chart Patterns That Actually Work

Technical analysis is the art and science of reading market emotions through price action. Here are the most reliable patterns that consistently work in Pakistani markets.

## Foundation: The Three Pillars of Technical Analysis

### 1. Price Action Tells Everything
Markets discount all information:
- Economic data
- Political developments
- Company fundamentals
- Market sentiment

### 2. History Repeats Itself
Human emotions drive markets:
- Fear and greed patterns repeat
- Crowd psychology is predictable
- Chart patterns reflect these emotions

### 3. Trends Persist Until They Don't
- Uptrends continue until broken
- Downtrends persist until reversed
- Sideways markets eventually break out

## The Most Reliable Chart Patterns

### 1. Double Bottom: The Reversal King 👑

**Description:** Two equal lows with a peak in between
**Success Rate:** 78% in Pakistani markets
**Best Timeframe:** Daily and weekly charts

**How to Identify:**
- Two lows at approximately same level
- Volume decreases on second low
- Neckline resistance level
- Minimum 4-week formation period

**Pakistani Market Example: HBL Bank (2023)**

Price Action:
- First bottom: ₨245 (March 2023)
- Peak: ₨275 (May 2023)
- Second bottom: ₨247 (July 2023)
- Breakout: ₨276 (August 2023)
- Target achieved: ₨306 (October 2023)
- Gain: 25% in 3 months

**Trading Strategy:**
- **Entry:** Break above neckline with volume
- **Stop Loss:** Below second bottom (2-3%)
- **Target:** Height of pattern added to breakout point
- **Risk-Reward:** Minimum 1:2 ratio

### 2. Ascending Triangle: The Breakout Master 📈

**Description:** Flat resistance with rising support
**Success Rate:** 72% upside breakouts
**Psychology:** Buyers becoming more aggressive

**Identification Criteria:**
- Minimum 3 touches on resistance
- Minimum 2 higher lows
- Volume often decreases during formation
- Breakout volume should be 50% above average

**PSX Example: Lucky Cement (2024)**

Formation Period: January - March 2024
Resistance Level: ₨1,450
Rising Support: ₨1,350 to ₨1,420
Breakout: ₨1,455 with heavy volume
Target: ₨1,550 (achieved in 6 weeks)

**Entry Rules:**
1. Wait for close above resistance
2. Volume must exceed 20-day average
3. No more than 2% above breakout point
4. Stop loss below last swing low

### 3. Flag Pattern: The Continuation Champion 🏁

**Description:** Sharp move followed by consolidation
**Success Rate:** 84% in direction of original trend
**Duration:** 1-3 weeks for intraday, 3-12 weeks for daily

**Bullish Flag Characteristics:**
- Strong upward move (flagpole)
- Slight downward consolidation (flag)
- Parallel trend lines
- Decreasing volume during flag

**Trading Rules:**
- **Entry:** Break above flag resistance
- **Target:** Flagpole height added to breakout
- **Stop:** Below flag support
- **Volume:** Must increase on breakout

**Real Example: Systems Limited**

Flagpole: ₨72 to ₨89 (2 weeks)
Flag: ₨89 to ₨85 (1 week)
Breakout: ₨90
Target: ₨107 (achieved)
Time to target: 3 weeks

### 4. Head and Shoulders: The Reversal Specialist 🤷

**Description:** Three peaks with middle one highest
**Success Rate:** 89% for major reversals
**Best on:** Daily and weekly timeframes

**Perfect H&S Formation:**
- Left shoulder: First peak
- Head: Higher peak
- Right shoulder: Peak similar to left shoulder
- Neckline: Support connecting two troughs
- Volume: Decreases from left to right shoulder

**Bearish H&S Example: Engro Corporation**
Left Shoulder: ₨478 (High volume)
Head: ₨512 (Medium volume)
Right Shoulder: ₨485 (Low volume)
Neckline: ₨445
Breakdown Target: ₨378 (achieved)
Time Frame: 4 months formation, 6 weeks to target

**Trading Strategy:**
- **Entry:** Break below neckline
- **Confirmation:** Volume increase on breakdown
- **Target:** Head to neckline distance subtracted from neckline
- **Stop Loss:** Above right shoulder

### 5. Cup and Handle: The Growth Pattern ☕

**Description:** U-shaped bottom with small pullback
**Success Rate:** 91% in growth stocks
**Minimum Formation:** 8 weeks

**Cup Characteristics:**
- Rounded bottom (U-shape, not V)
- Equal highs on both sides
- Volume decreases to middle, increases on right side
- Depth: 15-50% retracement

**Handle Requirements:**
- Small pullback (10-15% of cup depth)
- Light volume
- Duration: 1-4 weeks
- Forms in upper half of cup

**PSX Success Story: TRG Pakistan**
Cup Formation: 8 months (₨45 to ₨28 to ₨45)
Handle: 3 weeks (₨45 to ₨41)
Breakout: ₨46
Target 1: ₨62 (achieved in 4 months)
Target 2: ₨78 (achieved in 8 months)

## Advanced Pattern Recognition

### Multi-Timeframe Analysis

**The Golden Rule:** Higher timeframe determines direction, lower timeframe determines entry.

**Example Strategy:**
- **Weekly Chart:** Identify major trend and patterns
- **Daily Chart:** Find pattern formation and breakout
- **4-Hour Chart:** Precise entry timing
- **1-Hour Chart:** Risk management and stop placement

### Volume Analysis Integration

**Volume Rules for Pattern Validation:**
1. **Breakouts:** Volume should increase 50-100%
2. **Breakdowns:** Volume should increase 25-50%
3. **Continuation:** Volume often decreases during pattern formation
4. **Reversal:** Volume often increases throughout formation

**Volume Indicators for PSX:**
- **On-Balance Volume (OBV):** Shows money flow
- **Volume Moving Average:** 20-period average
- **Volume Rate of Change:** Measures volume spikes

## Pattern Failure Analysis

### Why Patterns Fail (Pakistani Market Context)

**1. Political Events (40% of failures)**
- Election announcements
- Policy changes
- Government instability

**2. Economic Shocks (25% of failures)**
- SBP interest rate surprises
- IMF program developments
- Inflation spikes

**3. Low Volume Breakouts (20% of failures)**
- Lack of institutional participation
- Retail-driven moves
- Holiday periods

**4. External Factors (15% of failures)**
- Global market crashes
- Oil price shocks
- Currency crises

### Failure Recognition Signals
- **Volume Divergence:** Breakout without volume
- **Quick Reversal:** Price returns to pattern within 3 days
- **Momentum Loss:** RSI or MACD doesn't confirm
- **News Override:** Major fundamental changes

## Sector-Specific Pattern Performance

### Banking Sector Patterns
**Best Performers:**
1. Double Bottom (82% success)
2. Cup and Handle (79% success)
3. Ascending Triangle (75% success)

**Why Banking Patterns Work:**
- Cyclical nature
- Interest rate sensitivity
- Regulatory predictability

### Technology Sector Patterns
**Best Performers:**
1. Cup and Handle (94% success)
2. Flag Patterns (87% success)
3. Breakout from Bases (83% success)

**Tech Pattern Characteristics:**
- Longer formation periods
- Higher volume requirements
- Greater volatility

## Creating Your Pattern-Based Trading System

### Step 1: Pattern Selection
Focus on 3-4 high-probability patterns:
- Choose based on your timeframe
- Match to your risk tolerance
- Consider your available capital

### Step 2: Screening Process
**Daily Routine:**
1. Scan all PSX stocks for patterns
2. Rank by probability and risk-reward
3. Check volume and momentum
4. Verify with sector analysis

### Step 3: Entry Checklist
□ Pattern fully formed
□ Volume confirmation
□ Clear stop-loss level
□ Minimum 1:2 risk-reward
□ No major news expected
□ Market trend supportive

### Step 4: Management Rules
**During the Trade:**
- Trail stops on trending moves
- Take partial profits at targets
- Monitor volume and momentum
- Watch for reversal patterns

## Pakistani Market Specific Considerations

### Circuit Breakers and Limits
- 5% daily limits on individual stocks
- 7% limit on KSE-100 index
- Impact on pattern completion
- Adjust targets accordingly

### Liquidity Factors
**High Liquidity (Good for patterns):**
- Banking stocks
- Index heavyweights
- Large-cap names

**Low Liquidity (Avoid):**
- Small-cap stocks
- Rarely traded names
- New listings

### Seasonal Patterns
**Best Months for Pattern Trading:**
- October-December (Post-monsoon recovery)
- March-May (Pre-results season)

**Avoid:**
- July-August (Results season volatility)
- December (Year-end positioning)

## Common Mistakes and How to Avoid Them

### Mistake 1: Pattern Forcing
**Problem:** Seeing patterns that aren't there
**Solution:** Strict criteria checklist

### Mistake 2: Ignoring Volume
**Problem:** Trading patterns without volume confirmation
**Solution:** Volume must support price action

### Mistake 3: Poor Risk Management
**Problem:** Not setting proper stop losses
**Solution:** Always define risk before entering

### Mistake 4: Impatience
**Problem:** Entering before pattern completion
**Solution:** Wait for full confirmation

## Building Pattern Recognition Skills

### Practice Routine (Daily 30 minutes)
1. **Review 10 charts** from different sectors
2. **Identify any forming patterns**
3. **Mark key levels** (support, resistance, targets)
4. **Track your predictions** for accuracy

### Historical Analysis Exercise
- Study 100 completed patterns
- Calculate success rates by type
- Identify your best pattern types
- Note market conditions during successes

### Paper Trading Validation
- Trade patterns with virtual money
- Track performance for 3 months
- Identify strengths and weaknesses
- Refine your approach

## Conclusion: The Art of Reading Market Psychology

Chart patterns work because they reflect human psychology. In Pakistani markets, where retail participation is high, emotional patterns are even more pronounced.

**Key Success Factors:**
1. **Patience:** Wait for proper setups
2. **Discipline:** Follow your rules consistently
3. **Risk Management:** Never risk more than planned
4. **Continuous Learning:** Markets evolve, so must you

**Final Wisdom:** "Patterns are not predictions, they are probabilities. Trade them with respect for both their power and their limitations."

**Remember:** The best pattern traders in Pakistan combine technical analysis with fundamental awareness and excellent risk management. Master this combination, and the markets will reward your patience and discipline.`
    },
    {
      id: 6,
      title: 'Fundamental Analysis of Pakistani Blue Chip Stocks',
      excerpt: 'Deep dive into financial statements, ratios, and valuation methods for PSX listed companies with comprehensive stock analysis framework.',
      author: 'Dr. Omar Hassan',
      authorCredentials: 'PhD Finance, Former PSX Research Head',
      readTime: '25 min read',
      category: 'Fundamental Analysis',
      publishDate: '4 days ago',
      icon: '📋',
      tags: ['Fundamental Analysis', 'Financial Statements', 'Stock Valuation', 'PSX Research'],
      views: 19856,
      likes: 1423,
      shares: 356,
      difficulty: 'Advanced',
      fullContent: `# Fundamental Analysis of Pakistani Blue Chip Stocks

Fundamental analysis is the cornerstone of successful long-term investing. This comprehensive guide will teach you to analyze Pakistani blue chip stocks like a professional analyst.

## Understanding Financial Statements

### 1. Balance Sheet Analysis

**Key Components for Pakistani Stocks:**
- **Total Assets:** Look for consistent growth
- **Debt-to-Equity Ratio:** Critical in high-interest rate environment
- **Current Ratio:** Liquidity assessment (aim for 1.5+)
- **Book Value per Share:** Asset backing

**Pakistani Market Standards:**
- Banking sector: Equity/Assets ratio >12%
- Manufacturing: Current ratio >1.2
- Services: Debt/Equity <0.5

### 2. Income Statement Mastery

**Revenue Analysis:**
- Revenue growth trends (minimum 10% annually)
- Revenue mix and diversification
- Seasonal patterns (important for textiles, cement)

**Profitability Metrics:**
- Gross Profit Margin: Industry benchmarks
  - Banking: Net Interest Margin >3%
  - Cement: >25%
  - Textiles: >15%
  - IT Services: >40%

**Operating Leverage:**
- Fixed vs variable cost structure
- Operating margin improvement trends
- EBITDA margin sustainability

### 3. Cash Flow Statement

**Operating Cash Flow:**
- Must exceed net income consistently
- Cash conversion cycle optimization
- Working capital management

**Free Cash Flow:**
Formula: Operating Cash Flow - Capital Expenditure
- Positive FCF indicates self-funding ability
- FCF yield calculation: FCF per Share / Share Price

## Valuation Methods for PSX Stocks

### 1. Price-to-Earnings (P/E) Analysis

**Sector-Wise P/E Benchmarks (2025):**
- Banking: 4-6x (historically low due to high interest rates)
- Cement: 8-12x
- Textiles: 6-10x
- Technology: 15-25x
- FMCG: 12-18x

**P/E Analysis Framework:**
1. **Trailing P/E:** Last 12 months earnings
2. **Forward P/E:** Next 12 months estimated earnings
3. **Cyclically Adjusted P/E:** Average earnings over economic cycle

### 2. Price-to-Book (P/B) Ratio

**When P/B is Most Useful:**
- Asset-heavy industries (banking, real estate)
- Companies with stable asset values
- Turnaround situations

**PSX P/B Benchmarks:**
- Banks: 0.8-1.2x (below 1.0x often indicates value)
- Manufacturing: 1.0-2.0x
- Services: 1.5-3.0x

### 3. Dividend Discount Model (DDM)

**For Pakistani Dividend-Paying Stocks:**

**Gordon Growth Model:**
Fair Value = D1 / (r - g)

Where:
- D1 = Next year's expected dividend
- r = Required rate of return
- g = Sustainable growth rate

**Example: HBL Valuation**
Current Dividend: ₨24 per share
Expected Growth: 8%
Required Return: 15%
Fair Value = 24 × 1.08 / (0.15 - 0.08) = ₨370

Current Price: ₨285
Upside Potential: 30%

## Company-Specific Analysis Framework

### Banking Sector Deep Dive

**Key Metrics for Pakistani Banks:**

1. **Net Interest Margin (NIM):**
   - Formula: (Interest Income - Interest Expense) / Average Earning Assets
   - Target: >3% in current rate environment

2. **Return on Assets (ROA):**
   - Formula: Net Income / Average Total Assets
   - Benchmark: >1.5% for top-tier banks

3. **Return on Equity (ROE):**
   - Formula: Net Income / Average Shareholders' Equity
   - Target: >20% for efficient banks

4. **Cost-to-Income Ratio:**
   - Formula: Operating Expenses / Operating Income
   - Benchmark: <50% for efficient operations

5. **Loan Loss Provisions:**
   - Non-Performing Loans ratio
   - Provision coverage ratio
   - Credit cost trends

**HBL Case Study (2024 Analysis):**
Financial Metrics:
- NIM: 3.8% (Above sector average)
- ROA: 2.1% (Strong performance)
- ROE: 22.4% (Excellent efficiency)
- Cost/Income: 47% (Well-managed)
- NPL Ratio: 7.2% (Improving trend)

Valuation:
- P/E: 4.8x (Attractive)
- P/B: 0.95x (Below book value)
- Dividend Yield: 8.2% (Sustainable)

Investment Thesis: Strong fundamentals, improving asset quality, attractive valuation

### Manufacturing Sector Analysis

**Key Performance Indicators:**

1. **Asset Turnover:**
   - Formula: Revenue / Average Total Assets
   - Measures asset utilization efficiency

2. **Inventory Turnover:**
   - Formula: Cost of Goods Sold / Average Inventory
   - Higher turnover indicates efficient operations

3. **Working Capital Management:**
   - Days Sales Outstanding (DSO)
   - Days Inventory Outstanding (DIO)
   - Days Payable Outstanding (DPO)

**Lucky Cement Analysis:**
Operational Metrics:
- Capacity Utilization: 85% (High efficiency)
- Revenue per Ton: ₨14,500 (Premium pricing)
- EBITDA per Ton: ₨3,800 (Strong margins)

Financial Health:
- Debt/Equity: 0.35 (Conservative leverage)
- Interest Coverage: 8.2x (Comfortable)
- Current Ratio: 2.1 (Good liquidity)

Growth Drivers:
- Export market expansion
- Capacity additions planned
- Infrastructure spending increase

## Economic Moat Analysis

### Identifying Competitive Advantages

**1. Network Effects:**
- Banking relationships and branch networks
- Platform businesses (rare in Pakistan)

**2. Cost Advantages:**
- Scale economies (cement, textiles)
- Location advantages (port access)
- Technology advantages (IT services)

**3. Brand Power:**
- Consumer goods companies
- Established financial services

**4. Regulatory Barriers:**
- Banking licenses
- Telecom spectrum
- Manufacturing permits

### Quality Assessment Framework

**Management Quality Indicators:**
- Track record of capital allocation
- Transparency in communication
- Insider ownership levels
- Board independence

**Business Quality Metrics:**
- Consistent profitability over cycles
- Pricing power evidence
- Market share trends
- Customer retention rates

## Red Flags to Avoid

### Financial Red Flags

1. **Declining Cash Flow Despite Growing Profits:**
   - Aggressive revenue recognition
   - Working capital issues
   - Quality of earnings concerns

2. **Excessive Debt Accumulation:**
   - Rising debt-to-equity ratios
   - Declining interest coverage
   - Short-term debt refinancing risks

3. **Related Party Transactions:**
   - Significant transactions with affiliates
   - Non-arm's length pricing
   - Corporate governance concerns

### Operational Red Flags

1. **Market Share Erosion:**
   - Losing competitive position
   - New competitor threats
   - Technology disruption

2. **Management Turnover:**
   - Frequent CEO/CFO changes
   - Key personnel departures
   - Governance disputes

3. **Regulatory Issues:**
   - Pending investigations
   - Compliance violations
   - License renewals at risk

## Sector Rotation Strategy

### Understanding Economic Cycles

**Early Cycle (Economic Recovery):**
- Focus: Technology, discretionary consumer goods
- Rationale: Earnings growth acceleration

**Mid Cycle (Economic Expansion):**
- Focus: Industrial, materials, energy
- Rationale: Capital expenditure increase

**Late Cycle (Economic Maturity):**
- Focus: Defensive sectors, utilities
- Rationale: Stable cash flows, dividends

**Recession (Economic Contraction):**
- Focus: Healthcare, consumer staples
- Rationale: Non-cyclical demand

### Pakistani Market Sector Dynamics

**Interest Rate Sensitive:**
- Banking (positive correlation)
- Real estate (negative correlation)
- Utilities (negative correlation)

**Export Dependent:**
- Textiles
- IT Services
- Chemicals

**Domestic Demand Driven:**
- FMCG
- Pharmaceuticals
- Retail

## Building Your Analysis Toolkit

### Essential Ratios Checklist

**Profitability:**
□ Gross Profit Margin
□ Operating Profit Margin
□ Net Profit Margin
□ Return on Assets (ROA)
□ Return on Equity (ROE)

**Efficiency:**
□ Asset Turnover
□ Inventory Turnover
□ Receivables Turnover
□ Working Capital Turnover

**Leverage:**
□ Debt-to-Equity
□ Debt-to-Assets
□ Interest Coverage Ratio
□ Debt Service Coverage

**Liquidity:**
□ Current Ratio
□ Quick Ratio
□ Cash Ratio
□ Operating Cash Flow Ratio

**Valuation:**
□ Price-to-Earnings (P/E)
□ Price-to-Book (P/B)
□ Price-to-Sales (P/S)
□ Enterprise Value ratios

### Data Sources for Pakistani Stocks

**Official Sources:**
- PSX official website
- Company annual reports
- SECP filings
- SBP economic data

**Third-Party Providers:**
- Bloomberg Pakistan
- Refinitiv data
- KTrade Securities research
- Arif Habib Limited reports

**Free Resources:**
- PSX company profiles
- Company investor relations pages
- Business newspapers (Dawn, Express Tribune)
- Central bank publications

## Practical Application

### Step-by-Step Analysis Process

**Week 1: Industry Analysis**
1. Understand industry dynamics
2. Identify key success factors
3. Assess growth prospects
4. Analyze competitive landscape

**Week 2: Company Selection**
1. Screen for quality metrics
2. Shortlist 3-5 companies
3. Gather financial data
4. Initial valuation screening

**Week 3: Deep Dive Analysis**
1. Detailed financial analysis
2. Management assessment
3. Competitive positioning
4. Risk factor evaluation

**Week 4: Valuation & Decision**
1. Multiple valuation methods
2. Sensitivity analysis
3. Investment thesis formation
4. Position sizing decision

### Sample Investment Thesis Template

**Company:** [Name]
**Sector:** [Sector]
**Investment Case:**

**Strengths:**
- [Key competitive advantages]
- [Financial strengths]
- [Growth opportunities]

**Risks:**
- [Key risk factors]
- [Potential challenges]
- [Mitigation strategies]

**Valuation:**
- Current Price: ₨[X]
- Fair Value: ₨[Y]
- Upside/Downside: [%]
- Time Horizon: [Months]

**Catalysts:**
- [Expected positive developments]
- [Key milestones to monitor]

## Conclusion: Building Long-Term Wealth

Fundamental analysis is not about finding quick profits—it's about identifying quality businesses at attractive prices for long-term wealth creation.

**Key Principles to Remember:**
1. **Quality First:** Focus on businesses with sustainable competitive advantages
2. **Price Matters:** Even great companies can be poor investments at high prices
3. **Time Horizon:** Think in years, not months
4. **Continuous Learning:** Stay updated with industry developments
5. **Risk Management:** Diversify across sectors and companies

**Final Thought:** "In the short run, the market is a voting machine, but in the long run, it's a weighing machine." - Benjamin Graham

Master fundamental analysis, and you'll be able to weigh Pakistani companies accurately, leading to superior long-term investment returns.`
    },
    {
      id: 7,
      title: 'Day Trading vs Swing Trading: Which Strategy Suits Pakistani Markets?',
      excerpt: 'Compare trading styles, time commitments, and profit potential in the context of Pakistani financial markets with detailed strategy analysis.',
      author: 'Tariq Mehmood',
      authorCredentials: 'Professional Day Trader, Strategy Consultant',
      readTime: '14 min read',
      category: 'Trading Strategies',
      publishDate: '6 days ago',
      icon: '⚡',
      tags: ['Day Trading', 'Swing Trading', 'Pakistani Markets', 'Trading Strategy'],
      views: 27834,
      likes: 1892,
      shares: 445,
      difficulty: 'Intermediate',
      fullContent: `# Day Trading vs Swing Trading: Which Strategy Suits Pakistani Markets?

Choosing between day trading and swing trading can make or break your trading career. Here's a comprehensive comparison tailored for Pakistani market conditions.

## Understanding the Two Approaches

### Day Trading Definition
- **Holding Period:** Minutes to hours (closed by market end)
- **Capital Requirements:** Higher (₨500,000+ recommended)
- **Time Commitment:** Full-time during market hours
- **Profit Target:** 1-3% per trade
- **Risk Level:** Higher volatility, quick decisions

### Swing Trading Definition
- **Holding Period:** Days to weeks (2-10 days typical)
- **Capital Requirements:** Moderate (₨200,000+ acceptable)
- **Time Commitment:** Part-time (1-2 hours daily)
- **Profit Target:** 5-15% per trade
- **Risk Level:** Moderate, more time to analyze

## Pakistani Market Context

### Market Hours and Liquidity
**PSX Trading Hours:** 9:15 AM - 3:30 PM (6 hours, 15 minutes)
- **Pre-market:** 9:00 AM - 9:15 AM
- **Regular Session:** 9:15 AM - 3:30 PM
- **After Hours:** Limited activity

**Liquidity Patterns:**
- **Highest:** 9:30 AM - 11:00 AM (opening rush)
- **Moderate:** 11:00 AM - 2:00 PM (steady trading)
- **High:** 2:00 PM - 3:30 PM (closing activity)

### Circuit Breakers Impact
**Daily Limits:** ±5% for individual stocks, ±7% for KSE-100
- **Day Trading Impact:** Can halt momentum trades
- **Swing Trading Impact:** Less affected, longer time horizon

### Sector Characteristics
**High Frequency Trading Suitable:**
- Banking stocks (HBL, UBL, MCB)
- Index heavyweights
- High-volume textile stocks

**Swing Trading Suitable:**
- Technology stocks (volatile, trending)
- Cement sector (cyclical patterns)
- Energy stocks (news-driven)

## Detailed Comparison Matrix

### Capital Requirements

**Day Trading in Pakistan:**
- **Minimum:** ₨500,000 (to handle volatility)
- **Recommended:** ₨1,000,000+ (for diversification)
- **Risk per Trade:** 0.5-1% of capital
- **Leverage:** Up to 3:1 available

**Example Day Trading Setup:**
Account Size: ₨1,000,000
Risk per Trade: ₨10,000 (1%)
Position Size: ₨200,000-300,000
Daily Target: ₨15,000-20,000 (1.5-2%)

**Swing Trading in Pakistan:**
- **Minimum:** ₨200,000 (adequate for position sizing)
- **Recommended:** ₨500,000+ (better diversification)
- **Risk per Trade:** 2-3% of capital
- **Leverage:** 1:1 to 2:1 recommended

**Example Swing Trading Setup:**
Account Size: ₨500,000
Risk per Trade: ₨10,000-15,000 (2-3%)
Position Size: ₨100,000-150,000
Weekly Target: ₨25,000-40,000 (5-8%)

### Time Commitment Analysis

**Day Trading Schedule:**
8:30 AM - 9:15 AM: Pre-market analysis
- Review overnight news
- Check global markets
- Identify trading opportunities

9:15 AM - 3:30 PM: Active trading
- Monitor positions constantly
- Execute trades based on setups
- Manage risk in real-time

3:30 PM - 4:30 PM: Post-market review
- Analyze performance
- Plan for next day
- Update trading journal

**Swing Trading Schedule:**
Daily (30-60 minutes):
- Check overnight developments
- Review existing positions
- Scan for new opportunities
- Set/adjust stop losses

Weekly (2-3 hours):
- Comprehensive market analysis
- Strategy review and adjustment
- Portfolio rebalancing
- Risk assessment

## Strategy-Specific Advantages and Disadvantages

### Day Trading in Pakistani Markets

**Advantages:**
1. **No Overnight Risk:** Positions closed daily
2. **Quick Profits:** Daily income potential
3. **High Leverage:** Maximize small capital
4. **Market Familiarity:** Consistent focus builds expertise

**Pakistani Market Advantages:**
- **High Volatility:** Large intraday moves
- **News Flow:** Frequent corporate announcements
- **Technical Patterns:** Retail-driven markets show clear patterns

**Disadvantages:**
1. **High Stress:** Constant decision-making pressure
2. **Transaction Costs:** Brokerage fees eat into profits
3. **Full-Time Commitment:** Cannot have another job
4. **Emotional Burnout:** Daily performance pressure

**Pakistani Market Challenges:**
- **Limited Hours:** Only 6.25 hours trading time
- **Liquidity Issues:** Some stocks have poor liquidity
- **News Delays:** Information asymmetry affects timing

### Swing Trading in Pakistani Markets

**Advantages:**
1. **Time Efficient:** Part-time trading possible
2. **Lower Stress:** More time for analysis
3. **Trend Capture:** Can ride longer-term moves
4. **Fundamental Alignment:** Can use company news/results

**Pakistani Market Advantages:**
- **Earnings Seasons:** Quarterly results create 2-3 week trends
- **Policy Announcements:** SBP, government decisions create sustained moves
- **Sector Rotation:** Clear seasonal patterns in textiles, cement

**Disadvantages:**
1. **Overnight Risk:** Gap up/down risk
2. **Slower Profits:** Weekly/monthly returns
3. **Tied-Up Capital:** Money locked in positions
4. **Missed Opportunities:** Cannot always act on daily moves

**Pakistani Market Challenges:**
- **Political Risk:** Overnight policy changes
- **Global Influence:** Asian market gaps affect positions
- **Weekend Risk:** Friday to Monday gaps

## Profit Potential Analysis

### Day Trading Returns (Realistic Expectations)

**Successful Day Trader Profile:**
- Win Rate: 55-60%
- Average Win: 1.8%
- Average Loss: 1.2%
- Trades per Day: 3-5

**Monthly Return Calculation:**
Trading Days: 22 per month
Successful Trades: 22 × 4 × 0.55 = 48 wins
Failed Trades: 22 × 4 × 0.45 = 40 losses

Monthly Return:
Wins: 48 × 1.8% = 86.4%
Losses: 40 × 1.2% = 48%
Net Return: 38.4% per month

**Reality Check:** Most day traders lose money
- **90% lose money** in first year
- **5% break even**
- **5% consistently profitable**

### Swing Trading Returns (Realistic Expectations)

**Successful Swing Trader Profile:**
- Win Rate: 45-50%
- Average Win: 8%
- Average Loss: 4%
- Trades per Month: 6-10

**Monthly Return Calculation:**
Monthly Trades: 8
Successful Trades: 8 × 0.475 = 3.8 wins
Failed Trades: 8 × 0.525 = 4.2 losses

Monthly Return:
Wins: 3.8 × 8% = 30.4%
Losses: 4.2 × 4% = 16.8%
Net Return: 13.6% per month

**Reality Check:** More achievable success rate
- **70% lose money** in first year
- **20% break even**
- **10% consistently profitable**

## Pakistani Market-Specific Strategies

### Day Trading Strategies for PSX

**1. Opening Range Breakout**
- Trade breakouts from first hour range
- Best on high-volume stocks
- Target: 1-2% moves

**2. News-Based Trading**
- Trade earnings announcements
- Corporate actions (dividends, bonuses)
- Regulatory news impact

**3. Sector Momentum**
- When banking sector moves, trade HBL, UBL
- Cement sector correlation trading
- Index arbitrage opportunities

### Swing Trading Strategies for PSX

**1. Earnings Season Swing**
- Hold stocks 1-2 weeks before results
- Exit after results announcement
- Focus on consensus beats/misses

**2. Policy-Driven Swings**
- SBP interest rate decisions
- Government policy announcements
- IMF program updates

**3. Technical Pattern Swings**
- Cup and handle patterns
- Double bottom reversals
- Trend continuation flags

## Risk Management Frameworks

### Day Trading Risk Management

**Position Sizing Rules:**
- Maximum 1% risk per trade
- Never risk more than 5% in single day
- Use stop losses religiously

**Psychological Rules:**
- Take breaks after 3 losses
- Set daily loss limits
- Review trades objectively

### Swing Trading Risk Management

**Portfolio Rules:**
- Maximum 3% risk per trade
- Never more than 15% in single position
- Diversify across sectors

**Time-Based Rules:**
- Review positions every 2-3 days
- Adjust stops based on technicals
- Take profits systematically

## Technology and Tools Requirements

### Day Trading Setup

**Essential Tools:**
- **Trading Platform:** KTrade Pro, Next Capital Pro
- **Multiple Monitors:** 2-3 screens minimum
- **Fast Internet:** Fiber connection essential
- **Real-time Data:** Level 2 data feed
- **News Services:** Reuters, Bloomberg Pakistan

**Software Requirements:**
- **Charting:** TradingView, MetaStock
- **Scanners:** Stock screeners for setups
- **Risk Management:** Position sizing calculators

### Swing Trading Setup

**Basic Requirements:**
- **Trading Platform:** Standard brokerage platform
- **Single Monitor:** Adequate for analysis
- **Regular Internet:** Broadband sufficient
- **End-of-day Data:** Free sources acceptable
- **News Alerts:** Mobile notifications

## Psychological Considerations

### Day Trading Psychology

**Required Traits:**
- **Quick Decision Making:** No hesitation
- **Emotional Control:** Handle rapid losses
- **Discipline:** Follow rules consistently
- **Stamina:** Maintain focus 6+ hours

**Common Psychological Traps:**
- Revenge trading after losses
- Overconfidence after wins
- FOMO on missed opportunities
- Analysis paralysis

### Swing Trading Psychology

**Required Traits:**
- **Patience:** Wait for setups
- **Conviction:** Hold through volatility
- **Analytical:** Thorough research
- **Long-term Thinking:** Beyond daily noise

**Common Psychological Challenges:**
- Premature profit taking
- Holding losses too long
- Weekend worry syndrome
- News reaction overtrading

## Making Your Decision

### Choose Day Trading If:
□ You have ₨500,000+ trading capital
□ You can dedicate 8+ hours daily
□ You have high stress tolerance
□ You have no other income source
□ You're technically proficient
□ You can make quick decisions

### Choose Swing Trading If:
□ You have ₨200,000+ trading capital
□ You have 1-2 hours daily available
□ You have another income source
□ You prefer analytical approach
□ You can tolerate overnight risk
□ You're patient by nature

## Success Factors for Pakistani Markets

### Day Trading Success Factors

1. **Market Timing:** Trade high-volume hours
2. **Stock Selection:** Focus on liquid stocks
3. **News Awareness:** Stay informed on developments
4. **Risk Management:** Strict position sizing
5. **Continuous Learning:** Adapt to market changes

### Swing Trading Success Factors

1. **Fundamental Awareness:** Understand business cycles
2. **Technical Skills:** Chart pattern recognition
3. **Patience:** Wait for proper setups
4. **Risk Management:** Portfolio-level thinking
5. **Information Edge:** Research advantage

## Conclusion: Your Path Forward

Both strategies can be profitable in Pakistani markets, but success depends on matching your personality, resources, and circumstances to the right approach.

**Key Takeaways:**
- **Day Trading:** Higher risk, higher reward, full-time commitment
- **Swing Trading:** Moderate risk, steady returns, part-time possible
- **Pakistani Markets:** Offer opportunities for both styles
- **Success Rate:** Higher for swing trading beginners
- **Capital Requirements:** Day trading needs more capital

**Recommendation for Beginners:**
Start with swing trading to learn market dynamics, then consider day trading if you prove consistently profitable and can commit full-time.

**Remember:** The best strategy is the one you can execute consistently with proper risk management. Master one approach before considering the other.`
    },
    {
      id: 8,
      title: 'Islamic Banking and Sharia-Compliant Investment Options in Pakistan',
      excerpt: 'Complete guide to halal investment opportunities including Islamic bonds, mutual funds, and ethical trading practices for Muslim investors.',
      author: 'Dr. Muhammad Qasim',
      authorCredentials: 'Islamic Scholar, Certified Islamic Finance Professional',
      readTime: '20 min read',
      category: 'Islamic Finance',
      publishDate: '1 week ago',
      icon: '☪️',
      tags: ['Islamic Finance', 'Halal Investment', 'Sharia Compliance', 'Islamic Banking'],
      views: 33567,
      likes: 2789,
      shares: 623,
      difficulty: 'Beginner',
      fullContent: `# Islamic Banking and Sharia-Compliant Investment Options in Pakistan

A comprehensive guide to halal financial practices and investment opportunities that align with Islamic principles while building wealth responsibly.

## Foundations of Islamic Finance

### Core Principles (Maqasid al-Shariah)

**1. Prohibition of Riba (Interest)**
- No predetermined, fixed return on loans
- Profit-sharing based on actual business performance
- Risk-sharing between parties

**2. Prohibition of Gharar (Excessive Uncertainty)**
- Avoiding speculative transactions
- Clear terms and conditions
- Tangible asset backing

**3. Prohibition of Haram Activities**
- No investment in alcohol, gambling, pork
- Avoiding conventional banking, insurance
- No participation in exploitative industries

**4. Asset-Backed Transactions**
- All transactions must involve real assets
- No pure monetary exchanges
- Tangible economic activity required

**5. Risk and Profit Sharing**
- Investor and entrepreneur share risks
- Profits distributed fairly
- No guaranteed returns

## Islamic Banking in Pakistan

### Current Landscape

**Market Share:** 18.5% of total banking assets (2024)
**Growth Rate:** 15% annually
**Total Assets:** ₨7.2 trillion
**Number of Branches:** 3,500+ across Pakistan

### Major Islamic Banks in Pakistan

**1. Meezan Bank Limited**
- **Market Share:** 35% of Islamic banking
- **Branches:** 850+ nationwide
- **Specialties:** Retail banking, SME finance
- **Sharia Board:** 7-member independent board

**2. Al Baraka Bank Pakistan**
- **Market Share:** 12% of Islamic banking
- **International Backing:** Al Baraka Banking Group
- **Focus:** Corporate and investment banking

**3. BankIslami Pakistan Limited**
- **Unique Position:** Fully Islamic bank since inception
- **Innovation:** Digital Islamic banking solutions
- **Coverage:** 350+ branches

**4. Islamic Banking Divisions**
- **HBL Islamic:** Largest by asset size
- **UBL Ameen:** Comprehensive Islamic solutions
- **MCB Islamic:** Corporate focus

### Islamic Banking Products

**Deposit Products:**

**1. Mudarabah Savings Account**
- **Concept:** Profit-sharing arrangement
- **Profit Rate:** Variable based on bank's performance
- **Minimum Balance:** ₨500-5,000
- **Sharia Compliance:** 100% halal returns

**2. Musharakah Term Deposit**
- **Concept:** Partnership in bank's investments
- **Duration:** 1 month to 5 years
- **Returns:** Higher than savings (8-12% annually)
- **Risk:** Profit/loss sharing

**Financing Products:**

**1. Murabaha (Cost-Plus Sale)**
- **Use:** Home, car, commodity financing
- **Structure:** Bank buys asset, sells at marked-up price
- **Installments:** Fixed monthly payments
- **Example:** Home financing at 14-16% markup

**2. Ijarah (Leasing)**
- **Application:** Equipment, vehicle financing
- **Ownership:** Bank owns, customer uses
- **End Option:** Purchase at residual value

**3. Diminishing Musharakah**
- **Best For:** Home financing
- **Structure:** Joint ownership, customer buys bank's share
- **Advantage:** Customer becomes sole owner gradually

## Sharia-Compliant Investment Options

### 1. Sukuk (Islamic Bonds)

**Government Sukuk:**
- **Pakistan Investment Bonds (PIBs):** Sharia-compliant version
- **Duration:** 3, 5, 10, 15, 20 years
- **Returns:** 11-13% annually (2024 rates)
- **Minimum Investment:** ₨100,000

**Corporate Sukuk Examples:**
- **K-Electric Sukuk:** Infrastructure financing
- **Lucky Cement Sukuk:** Expansion projects
- **Engro Sukuk:** Working capital requirements

**Sukuk Structure Types:**
1. **Ijarah Sukuk:** Asset leasing-based
2. **Murabaha Sukuk:** Trade financing-based
3. **Musharakah Sukuk:** Partnership-based
4. **Wakala Sukuk:** Agency-based investments

### 2. Islamic Mutual Funds

**Equity Funds:**

**1. Al-Meezan Mutual Fund**
- **Focus:** Sharia-compliant PSX stocks
- **5-Year Return:** 18.2% annually
- **Minimum Investment:** ₨5,000
- **Management Fee:** 2% annually

**2. HBL Islamic Equity Fund**
- **Strategy:** Large-cap Islamic stocks
- **Assets Under Management:** ₨12 billion
- **Top Holdings:** HBL, UBL, Lucky Cement

**3. UBL Islamic Stock Fund**
- **Approach:** Diversified portfolio
- **Risk Level:** Medium to high
- **Dividend Policy:** Annual distribution

**Commodity Funds:**
- **Al-Meezan Gold Fund:** Sharia-compliant gold investment
- **KTrade Islamic Commodity Fund:** Agricultural commodities

**Money Market Funds:**
- **Al-Meezan Islamic Income Fund:** Low-risk, steady returns
- **ABL Islamic Income Fund:** Capital preservation focus

### 3. Direct Stock Investment

**Sharia Screening Criteria:**

**Primary Screening (Business Activities):**
✅ **Halal Industries:**
- Banking (Islamic banks only)
- Manufacturing (non-haram goods)
- Technology and software
- Healthcare and pharmaceuticals
- Textiles and clothing
- Food and beverages (halal only)

❌ **Haram Industries:**
- Conventional banking and insurance
- Alcohol and tobacco
- Gambling and casinos
- Adult entertainment
- Pork-related businesses
- Weapons manufacturing

**Secondary Screening (Financial Ratios):**

**Debt-to-Market Cap Ratio:** <33%
- Company should not be heavily debt-financed
- Promotes equity-based financing

**Interest-bearing Securities:** <33% of total assets
- Limits exposure to riba-based investments
- Ensures primary business focus

**Liquid Assets:** <33% of total assets
- Prevents trading in pure monetary instruments
- Ensures asset-backed business model

**Accounts Receivable:** <45% of total assets
- Limits credit sales exposure
- Maintains business substance

### Sharia-Compliant PSX Stocks (2024)

**Banking Sector:**
- ✅ Meezan Bank (MEBL)
- ✅ Al Baraka Bank (AKBL)
- ✅ BankIslami (BIPL)
- ❌ Conventional banks (interest-based)

**Technology Sector:**
- ✅ Systems Limited (SYS)
- ✅ TRG Pakistan (TRG)
- ✅ NetSol Technologies (NETSOL)

**Manufacturing:**
- ✅ Lucky Cement (LUCK)
- ✅ Packages Limited (PKGS)
- ✅ Nishat Mills (NML)

**Healthcare:**
- ✅ Searle Company (SEARL)
- ✅ GlaxoSmithKline (GSK)
- ✅ Abbott Laboratories (ABL)

### 4. Real Estate Investment

**Islamic Real Estate Principles:**

**Permissible Investments:**
- Residential properties for rental income
- Commercial real estate (halal businesses)
- Industrial properties and warehouses
- Agricultural land and farming

**Financing Methods:**

**1. Diminishing Musharakah:**
Property Value: ₨10,000,000
Customer Contribution: ₨2,000,000 (20%)
Bank Contribution: ₨8,000,000 (80%)

Monthly Payment: ₨120,000
- Rental component: ₨80,000
- Purchase component: ₨40,000

After 15 years: Customer owns 100%

**2. Ijarah Muntahia Bittamleek:**
- Bank purchases property
- Customer pays rent with purchase option
- Ownership transfers upon completion

**Real Estate Investment Trusts (REITs):**
- **Dolmen City REIT:** Sharia-compliant shopping centers
- **KTrade REIT:** Industrial and commercial properties

### 5. Commodity Trading

**Halal Commodities:**
- **Gold and Silver:** Store of value, inflation hedge
- **Agricultural Products:** Wheat, rice, cotton, sugarcane
- **Energy:** Crude oil (if not financing haram activities)

**Trading Principles:**
- Physical delivery or intention to take delivery
- No pure speculation without underlying need
- Actual possession before resale (for some commodities)

**Practical Implementation:**
- **Gold Investment:** Through Islamic banks' gold accounts
- **Agriculture:** Salam contracts for crop financing
- **Energy:** Musharakah in oil and gas exploration

## Islamic Investment Strategies

### 1. Halal Portfolio Construction

**Balanced Islamic Portfolio Example:**

**Asset Allocation:**
- **40% Islamic Stocks:** Diversified across sectors
- **30% Sukuk:** Government and corporate bonds
- **20% Real Estate:** Direct or REIT investment
- **10% Commodities:** Gold and agricultural products

**Risk Management:**
- Maximum 5% in any single stock
- Sector diversification across 6+ industries
- Geographic diversification (local and international)
- Regular rebalancing quarterly

### 2. Sharia-Compliant Trading Strategies

**Day Trading Guidelines:**
- ✅ **Actual ownership:** Must take possession
- ✅ **Spot transactions:** Immediate settlement
- ❌ **Short selling:** Not owning what you sell
- ❌ **Margin trading:** Interest-based borrowing

**Long-term Investment:**
- Focus on fundamentally strong companies
- Hold for genuine investment purposes
- Avoid frequent trading for speculation
- Reinvest dividends in halal opportunities

### 3. Ethical Screening Process

**Monthly Portfolio Review:**
1. **Business Activity Check:** Ensure companies remain halal
2. **Financial Ratio Verification:** Maintain Sharia compliance
3. **News Monitoring:** Watch for business model changes
4. **Purification Calculation:** Donate impure income portions

**Income Purification:**
- Calculate percentage of haram income
- Donate equivalent amount to charity
- Do not consider it as your wealth
- Keep detailed records for accountability

## Practical Implementation Guide

### Getting Started with Islamic Banking

**Step 1: Choose Your Islamic Bank**
- Compare profit rates and services
- Check Sharia board credentials
- Evaluate branch network and digital services
- Review fee structures

**Step 2: Account Opening**
- Provide required documentation
- Understand profit-sharing mechanism
- Set up online banking
- Learn about available products

**Step 3: Financial Planning**
- Set halal investment goals
- Create emergency fund (6 months expenses)
- Plan for major purchases (home, car)
- Consider retirement planning

### Building Your Islamic Investment Portfolio

**Beginner Portfolio (₨500,000):**
Emergency Fund: ₨150,000 (Islamic savings account)
Islamic Mutual Funds: ₨200,000 (40%)
Direct Stocks: ₨100,000 (20%)
Sukuk Investment: ₨50,000 (10%)

**Advanced Portfolio (₨2,000,000):**
Emergency Fund: ₨300,000 (Islamic savings)
Islamic Stocks: ₨800,000 (40%)
Sukuk Portfolio: ₨400,000 (20%)
Real Estate: ₨300,000 (15%)
Commodities: ₨100,000 (5%)
International Islamic Funds: ₨100,000 (5%)

## Common Misconceptions and Clarifications

### Myth 1: "Islamic Banking is More Expensive"
**Reality:** Competitive pricing with conventional banks
- Similar profit rates to interest rates
- Often better service and relationship management
- Long-term benefits of ethical investing

### Myth 2: "Limited Investment Options"
**Reality:** Growing universe of Sharia-compliant investments
- 300+ halal stocks on PSX
- Expanding sukuk market
- International Islamic funds access
- Real estate and commodity options

### Myth 3: "Lower Returns than Conventional"
**Reality:** Comparable and often superior returns
- Focus on real economic value creation
- Lower risk due to asset backing
- Sustainable business model focus

### Myth 4: "Complex and Difficult to Understand"
**Reality:** Simple principles with practical application
- Basic concept: avoid interest, speculation, haram
- Professional guidance available
- Educational resources abundant

## Regulatory Framework

### State Bank of Pakistan (SBP) Guidelines

**Islamic Banking Department:**
- Separate regulatory framework
- Sharia compliance monitoring
- Product development guidelines
- Consumer protection measures

**Key Regulations:**
- **Fit and Proper Criteria:** For Sharia board members
- **Governance Framework:** Independent oversight required
- **Product Approval Process:** Sharia compliance mandatory
- **Reporting Requirements:** Quarterly compliance reports

### Securities and Exchange Commission of Pakistan (SECP)

**Islamic Finance Regulations:**
- Mutual fund compliance requirements
- Sukuk issuance guidelines
- Islamic insurance (Takaful) framework
- Corporate governance standards

## Future of Islamic Finance in Pakistan

### Growth Projections
- **Target:** 35% market share by 2030
- **Government Support:** Tax incentives for Islamic finance
- **Infrastructure Development:** Digital Islamic banking
- **International Integration:** Cross-border Islamic finance

### Emerging Opportunities
- **Islamic Fintech:** Digital solutions
- **Green Sukuk:** Environmental financing
- **SME Islamic Banking:** Small business support
- **Microfinance:** Islamic poverty alleviation

### Challenges and Solutions
- **Awareness:** Educational campaigns needed
- **Product Innovation:** More diverse offerings
- **Standardization:** Uniform Sharia compliance
- **Technology:** Digital transformation required

## Conclusion: Your Islamic Financial Journey

Islamic finance offers a comprehensive alternative to conventional banking and investment, allowing Muslims to build wealth while adhering to their religious principles.

**Key Action Steps:**
1. **Educate Yourself:** Understand Islamic finance principles
2. **Start Small:** Begin with Islamic savings account
3. **Diversify Gradually:** Build a balanced halal portfolio
4. **Seek Guidance:** Consult qualified Islamic finance advisors
5. **Stay Informed:** Keep updated with Sharia-compliant opportunities

**Remember:** Islamic finance is not just about avoiding interest—it's about building a just and equitable economic system that benefits all participants.

**Final Thought:** "And Allah has permitted trade and has forbidden interest." (Quran 2:275)

Your financial journey can be both profitable and spiritually fulfilling when aligned with Islamic principles. Start today and build a halal financial future for yourself and your family.`
    },
    {
      id: 9,
      title: 'Building Your First Trading Portfolio: A Pakistani Investor\'s Guide',
      excerpt: 'Step-by-step portfolio construction with asset allocation strategies suitable for Pakistani investors, from beginner to advanced levels.',
      author: 'Sana Malik',
      authorCredentials: 'Portfolio Manager, Investment Advisor',
      readTime: '16 min read',
      category: 'Portfolio Management',
      publishDate: '3 days ago',
      icon: '💼',
      tags: ['Portfolio Management', 'Asset Allocation', 'Pakistani Investors', 'Investment Strategy'],
      views: 21456,
      likes: 1534,
      shares: 387,
      difficulty: 'Beginner',
      fullContent: `# Building Your First Trading Portfolio: A Pakistani Investor's Guide

Creating a well-balanced investment portfolio is the foundation of long-term wealth building. This comprehensive guide will help Pakistani investors construct their first portfolio with practical steps and local market insights.

## Understanding Portfolio Basics

### What is a Portfolio?
A portfolio is a collection of financial investments like stocks, bonds, commodities, and cash equivalents. The goal is to maximize returns while minimizing risk through diversification.

### Core Portfolio Principles

**1. Diversification**
- Spread investments across different asset classes
- Reduce risk through non-correlation
- "Don't put all eggs in one basket"

**2. Asset Allocation**
- Strategic distribution of investments
- Based on risk tolerance and time horizon
- Regular rebalancing required

**3. Risk Management**
- Understanding and managing downside
- Position sizing and stop losses
- Emergency fund maintenance

**4. Time Horizon**
- Long-term focus for wealth building
- Different strategies for different goals
- Compound interest advantage

## Pakistani Market Context

### Economic Environment (2024-2025)
- **Inflation Rate:** 28% (declining trend expected)
- **Policy Rate:** 15% (SBP benchmark)
- **GDP Growth:** 2.8% projected
- **Currency:** PKR relatively stable vs USD

### Investment Climate
- **PSX Performance:** KSE-100 showing resilience
- **Foreign Investment:** Gradual return of international investors
- **Regulatory Environment:** SECP modernization efforts
- **Digital Infrastructure:** Improved online trading platforms

### Tax Considerations
- **Capital Gains Tax:** 15% on shares held <12 months, 12.5% for >12 months
- **Dividend Tax:** 15% withholding tax
- **Advance Tax:** 0.01% on transactions >₨2.5 million

## Step 1: Financial Foundation

### Emergency Fund First
Before investing, establish an emergency fund:
- **Amount:** 6-12 months of living expenses
- **Location:** High-yield Islamic savings account
- **Purpose:** Unexpected expenses, job loss protection
- **Pakistani Options:** Meezan Bank, Al Baraka savings

**Example Emergency Fund Calculation:**
Monthly Expenses: ₨80,000
Emergency Fund Target: ₨480,000 - ₨960,000
Recommended: ₨600,000 (7.5 months)
Account: Islamic savings earning 8-10% annually

### Debt Management
Address high-interest debt before investing:
- **Credit Cards:** 36-42% annual rates
- **Personal Loans:** 18-24% annual rates
- **Priority:** Pay off debt before investing

### Investment Capital
Determine how much you can invest:
- **Rule of Thumb:** 20% of monthly income for investments
- **After Emergency Fund:** Additional savings for investing
- **Risk Capital:** Only invest what you can afford to lose

## Step 2: Know Your Investor Profile

### Risk Tolerance Assessment

**Conservative Investor:**
- **Profile:** Risk-averse, capital preservation focus
- **Time Horizon:** 1-3 years
- **Return Expectation:** 8-12% annually
- **Allocation:** 70% bonds/fixed income, 30% stocks

**Moderate Investor:**
- **Profile:** Balanced approach, moderate risk tolerance
- **Time Horizon:** 3-7 years
- **Return Expectation:** 12-18% annually
- **Allocation:** 50% stocks, 40% bonds, 10% alternatives

**Aggressive Investor:**
- **Profile:** High risk tolerance, growth focused
- **Time Horizon:** 7+ years
- **Return Expectation:** 18-25% annually
- **Allocation:** 80% stocks, 15% alternatives, 5% bonds

### Age-Based Guidelines

**20s-30s (Aggressive Growth):**
Stocks: 80-90%
Bonds: 5-10%
Alternatives: 5-10%
Cash: 5%

**40s-50s (Balanced Growth):**
Stocks: 60-70%
Bonds: 20-30%
Alternatives: 5-10%
Cash: 5%

**60+ (Conservative Income):**
Stocks: 30-40%
Bonds: 50-60%
Alternatives: 5%
Cash: 5-10%

## Step 3: Asset Classes in Pakistani Context

### 1. Pakistani Equities (PSX)

**Blue Chip Stocks (Core Holdings):**
- **Banking:** HBL, UBL, MCB Bank
- **Cement:** Lucky Cement, DG Khan Cement
- **Energy:** PSO, APL, SNGP
- **FMCG:** Engro Foods, Nestle Pakistan

**Growth Stocks:**
- **Technology:** Systems Limited, TRG Pakistan
- **Pharmaceuticals:** Searle, GSK Pakistan
- **Textiles:** Nishat Mills, Gul Ahmed

**Dividend Stocks:**
- **Utilities:** K-Electric, SSGC
- **Banks:** High dividend yields (8-12%)
- **Mature Companies:** Consistent payout history

### 2. Fixed Income Securities

**Government Securities:**
- **Pakistan Investment Bonds (PIBs):** 10-15 year tenure
- **Treasury Bills:** 3, 6, 12 month duration
- **National Savings Schemes:** Defense Savings, Special Savings

**Corporate Bonds:**
- **Bank TDRs:** Fixed deposits with banks
- **Corporate Sukuk:** Islamic bonds from companies
- **Return Range:** 12-16% annually

### 3. Alternative Investments

**Real Estate:**
- **Direct Property:** Residential/commercial
- **REITs:** Dolmen City REIT, KTrade REIT
- **Considerations:** Illiquid, high transaction costs

**Commodities:**
- **Gold:** Physical gold, gold ETFs
- **Agricultural:** Commodity futures
- **Energy:** Oil and gas investments

**International Exposure:**
- **Mutual Funds:** International equity funds
- **Dollar Accounts:** USD savings accounts
- **Foreign Stocks:** Limited through local brokers

## Step 4: Sample Portfolio Constructions

### Beginner Portfolio (₨500,000)

**Conservative Approach:**
Emergency Fund: ₨200,000 (Islamic savings)
Investment Capital: ₨300,000

Allocation:
- PSX Blue Chips: ₨150,000 (50%)
  * HBL: ₨50,000
  * Lucky Cement: ₨50,000
  * Systems Limited: ₨50,000

- Fixed Income: ₨120,000 (40%)
  * PIBs: ₨80,000
  * Bank TDR: ₨40,000

- Cash Buffer: ₨30,000 (10%)
  * Trading opportunities
  * Immediate liquidity

### Intermediate Portfolio (₨1,500,000)

**Balanced Growth:**
Emergency Fund: ₨400,000
Investment Capital: ₨1,100,000

Allocation:
- PSX Equities: ₨660,000 (60%)
  * Banking Sector: ₨200,000
  * Technology: ₨150,000
  * Cement: ₨100,000
  * FMCG: ₨100,000
  * Energy: ₨110,000

- Fixed Income: ₨330,000 (30%)
  * Government Securities: ₨200,000
  * Corporate Bonds: ₨130,000

- Alternatives: ₨110,000 (10%)
  * Gold: ₨60,000
  * International Fund: ₨50,000

### Advanced Portfolio (₨5,000,000)

**Aggressive Growth:**
Emergency Fund: ₨600,000
Investment Capital: ₨4,400,000

Allocation:
- PSX Equities: ₨3,080,000 (70%)
  * Large Cap: ₨1,540,000 (35%)
  * Mid Cap: ₨880,000 (20%)
  * Small Cap: ₨440,000 (10%)
  * Sector Funds: ₨220,000 (5%)

- Fixed Income: ₨880,000 (20%)
  * Government: ₨440,000
  * Corporate: ₨440,000

- Alternatives: ₨440,000 (10%)
  * Real Estate: ₨220,000
  * Commodities: ₨110,000
  * International: ₨110,000

## Step 5: Implementation Strategy

### Opening Investment Accounts

**Stock Brokerage Account:**
- **Top Brokers:** KTrade Securities, Arif Habib Limited, Next Capital
- **Features Needed:** Online trading, research reports, mobile app
- **Costs:** 0.15-0.25% brokerage fee

**Bank Accounts:**
- **Islamic Banking:** For Sharia-compliant investments
- **Foreign Currency:** USD account for international exposure
- **High-Yield Savings:** Emergency fund placement

### Gradual Investment Approach

**Month 1-2: Foundation**
- Open brokerage and bank accounts
- Build emergency fund
- Start with one blue-chip stock

**Month 3-4: Expansion**
- Add 2-3 more quality stocks
- Invest in government securities
- Establish regular investment routine

**Month 5-6: Diversification**
- Add different sectors
- Consider mutual funds
- Explore alternative investments

**Month 7-12: Optimization**
- Regular portfolio review
- Rebalancing as needed
- Tax-loss harvesting opportunities

## Step 6: Portfolio Management

### Regular Monitoring

**Daily (5 minutes):**
- Check portfolio value
- Review major news affecting holdings
- Monitor stop-loss levels

**Weekly (30 minutes):**
- Analyze individual stock performance
- Review sector allocation
- Check for rebalancing needs

**Monthly (2 hours):**
- Comprehensive portfolio review
- Performance vs benchmarks
- Risk assessment and adjustment

**Quarterly (4 hours):**
- Complete portfolio rebalancing
- Tax planning review
- Strategy adjustment if needed

### Rebalancing Strategy

**When to Rebalance:**
- Any asset class deviates >5% from target
- Quarterly scheduled reviews
- Major market movements
- Change in personal circumstances

**Example Rebalancing:**
Target Allocation: 60% stocks, 40% bonds
Current Allocation: 70% stocks, 30% bonds
Action: Sell 10% of stocks, buy bonds to restore balance

### Performance Measurement

**Benchmarks for Pakistani Portfolios:**
- **Equity Portion:** KSE-100 Index
- **Bond Portion:** Government bond yields
- **Overall Portfolio:** Weighted benchmark

**Key Metrics to Track:**
- **Total Return:** Capital gains + dividends
- **Risk-Adjusted Return:** Sharpe ratio
- **Maximum Drawdown:** Largest peak-to-trough decline
- **Volatility:** Standard deviation of returns

## Common Mistakes to Avoid

### 1. Emotional Investing
- **Mistake:** Buying high during euphoria, selling low during panic
- **Solution:** Stick to systematic investment plan
- **Pakistani Example:** Panic selling during political uncertainty

### 2. Lack of Diversification
- **Mistake:** Concentrating in 1-2 stocks or sectors
- **Solution:** Spread across at least 8-10 stocks, 4-5 sectors
- **Pakistani Context:** Don't overweight banking just because it's familiar

### 3. Timing the Market
- **Mistake:** Trying to predict short-term market movements
- **Solution:** Regular investing regardless of market conditions
- **Better Approach:** Dollar-cost averaging

### 4. Ignoring Costs
- **Mistake:** Not considering brokerage fees, taxes
- **Solution:** Calculate total cost of ownership
- **Pakistani Reality:** Frequent trading eats into returns

### 5. No Exit Strategy
- **Mistake:** Holding losing positions too long
- **Solution:** Set stop-losses and profit targets
- **Rule:** Cut losses at 20%, let profits run

## Tax-Efficient Strategies

### Capital Gains Optimization
- **Hold Period:** Keep investments >12 months for lower tax rate
- **Loss Harvesting:** Realize losses to offset gains
- **Timing:** Plan sales around tax year-end

### Dividend Strategy
- **High Dividend Stocks:** Factor in 15% withholding tax
- **Growth vs Income:** Consider growth stocks for lower immediate tax
- **Tax-Efficient Funds:** Choose funds with low turnover

## Advanced Strategies

### Sector Rotation
- **Concept:** Moving between sectors based on economic cycles
- **Pakistani Application:** Banking (rate cycle), Cement (construction), Textiles (exports)
- **Implementation:** Adjust sector weights quarterly

### Value Averaging
- **Concept:** Invest more when prices are low, less when high
- **Advantage:** Better returns than dollar-cost averaging
- **Complexity:** Requires more active management

### Core-Satellite Approach
- **Core (70%):** Low-cost index funds or blue chips
- **Satellite (30%):** Active bets on specific themes/sectors
- **Benefits:** Diversification with opportunity for outperformance

## Technology and Tools

### Essential Tools for Pakistani Investors

**Portfolio Tracking:**
- **KTrade Mobile App:** Real-time portfolio monitoring
- **Excel Spreadsheets:** Custom portfolio tracking
- **Yahoo Finance:** International benchmarking

**Research Platforms:**
- **PSX Official Website:** Company financials
- **Business newspapers:** Dawn, Express Tribune
- **Broker Research:** Analyst reports and recommendations

**Tax Software:**
- **Personal tax software:** Calculate capital gains
- **Accounting services:** Professional tax planning

## Building Long-Term Wealth

### Compound Interest Power
**Example: ₨100,000 Investment**

Annual Return: 15%
After 10 years: ₨404,556
After 20 years: ₨1,636,654
After 30 years: ₨6,621,177

### Regular Investment Plan
**Systematic Investment (₨10,000/month):**
Monthly Investment: ₨10,000
Annual Return: 15%
After 10 years: ₨2,341,509
After 20 years: ₨12,682,503
After 30 years: ₨69,373,057

### Retirement Planning
**Goal: ₨50 million retirement fund**
Starting Age: 25
Retirement Age: 60
Investment Period: 35 years
Required Monthly Investment: ₨3,247
(Assuming 15% annual returns)

## Conclusion: Your Investment Journey

Building your first trading portfolio is a significant step toward financial independence. Remember these key principles:

**Start Simple:**
- Begin with emergency fund
- Choose quality blue-chip stocks
- Gradually add complexity

**Stay Disciplined:**
- Stick to your investment plan
- Regular investing beats timing
- Rebalance systematically

**Keep Learning:**
- Stay informed about markets
- Understand what you invest in
- Adapt to changing conditions

**Be Patient:**
- Wealth building takes time
- Compound interest requires patience
- Focus on long-term goals

**Pakistani Advantage:**
- Growing economy with potential
- Improving market infrastructure
- Young demographic dividend

**Your Action Plan:**
1. **This Week:** Open brokerage account, set up emergency fund
2. **This Month:** Make first stock investment (start with HBL or Lucky Cement)
3. **Next 3 Months:** Build core portfolio with 5-8 stocks
4. **Next Year:** Add bonds and alternative investments

**Remember:** The best time to start investing was yesterday. The second-best time is today.

**Final Thought:** "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." - Albert Einstein

Your journey to financial freedom starts with the first investment. Take that step today, and your future self will thank you.`
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
            {/* Broker Verification Status */}
            {isVerifiedBrokerUser ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <span>✅</span>
                <span>Verified with {verifiedBroker}</span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => setShowBrokerVerificationModal(true)}
              >
                <span>🔒</span>
                <span>Signals: {signalsViewedCount}/3</span>
              </div>
            )}

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
                <button
                  onClick={handleSubscribeAlerts}
                  style={{
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
              {signals.map((signal, index) => {
                const isAccessible = isVerifiedBrokerUser || index < 3
                const showBlurred = !isVerifiedBrokerUser && index >= 3
                return (
                <div key={signal.id} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  borderLeft: `4px solid ${signal.color}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  filter: showBlurred ? 'blur(4px)' : 'none',
                  opacity: showBlurred ? 0.6 : 1
                }}>
                  {/* Access Restriction Overlay */}
                  {showBlurred && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.8)',
                      borderRadius: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      color: 'white',
                      textAlign: 'center',
                      padding: '20px'
                    }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'white' }}>
                        Premium Signal
                      </h3>
                      <p style={{ fontSize: '14px', marginBottom: '20px', color: '#e2e8f0', lineHeight: 1.5 }}>
                        Verify your broker account to unlock this signal and get unlimited access to all premium signals.
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowBrokerVerificationModal(true)
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
                        🔓 Unlock Now
                      </button>
                    </div>
                  )}
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
                    <button
                      onClick={() => handleMarketAnalysisAction('Copy Signal', signal.symbol)}
                      style={{
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
                    <button
                      onClick={() => handleMarketAnalysisAction('Set Alert', signal.symbol)}
                      style={{
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
                )
              })}
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

                    <button onClick={() => handleContinueLearning(index)} style={{
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
                {comprehensiveCourses.slice(0, 6).map((course, index) => (
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
                        <button
                          onClick={() => handleStartCourse(course.id, course.title)}
                          style={{
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
                          {enrolledCourses.includes(course.id)
                            ? 'Continue Course'
                            : (course.price === 'Free' ? 'Start Free' : 'Enroll Now')
                          }
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
                {tradingArticles.map((article, index) => (
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
                      <button
                        onClick={() => handleReadArticle(article.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#3b82f6',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
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
                    <button
                      onClick={() => handleToolAction(tool.title, tool.action)}
                      style={{
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
                <button
                  onClick={handleGenerateAnalysis}
                  style={{
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
                      <button
                        onClick={() => handleViewInsightDetails(index)}
                        style={{
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
                <button
                  onClick={() => handlePricingAction('Get Started')}
                  style={{
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
                <button
                  onClick={() => handlePricingAction('Contact Sales')}
                  style={{
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
                      <button
                        onClick={() => handleOpenAccount(broker.name)}
                        style={{
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
                      <button
                        onClick={() => handleLearnMore(broker.name)}
                        style={{
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
                <button
                  onClick={handleContactSales}
                  style={{
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
                <button
                  onClick={handleScheduleDemo}
                  style={{
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

      {/* Article Reading Modal */}
      {showArticleModal && selectedArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
              padding: '24px',
              borderRadius: '16px 16px 0 0',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '24px' }}>
                      {tradingArticles.find(a => a.id === selectedArticle)?.icon}
                    </span>
                    <span style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {tradingArticles.find(a => a.id === selectedArticle)?.category}
                    </span>
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {tradingArticles.find(a => a.id === selectedArticle)?.difficulty}
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#0f172a',
                    lineHeight: 1.3,
                    margin: '0 0 12px 0'
                  }}>
                    {tradingArticles.find(a => a.id === selectedArticle)?.title}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '14px' }}>
                    <span>
                      by <strong>{tradingArticles.find(a => a.id === selectedArticle)?.author}</strong>
                    </span>
                    <span>{tradingArticles.find(a => a.id === selectedArticle)?.authorCredentials}</span>
                    <span>{tradingArticles.find(a => a.id === selectedArticle)?.readTime}</span>
                    <span>{tradingArticles.find(a => a.id === selectedArticle)?.publishDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', color: '#64748b', fontSize: '13px' }}>
                    <span>👁️ {tradingArticles.find(a => a.id === selectedArticle)?.views?.toLocaleString()} views</span>
                    <span>❤️ {tradingArticles.find(a => a.id === selectedArticle)?.likes?.toLocaleString()} likes</span>
                    <span>🔄 {tradingArticles.find(a => a.id === selectedArticle)?.shares} shares</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowArticleModal(false)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: '#ef4444'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Article Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tradingArticles.find(a => a.id === selectedArticle)?.tags?.map((tag, index) => (
                  <span key={index} style={{
                    background: 'rgba(100, 116, 139, 0.1)',
                    color: '#64748b',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              <div style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: 1.7,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {/* Render the full content with markdown-like formatting */}
                <div style={{ whiteSpace: 'pre-line' }}>
                  {tradingArticles.find(a => a.id === selectedArticle)?.fullContent}
                </div>
              </div>

              {/* Article Actions */}
              <div style={{
                marginTop: '40px',
                padding: '24px',
                background: 'rgba(248, 250, 252, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.5)'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
                  Did you find this article helpful?
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleModalAction('Like', 'article')}
                    style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    👍 Like ({tradingArticles.find(a => a.id === selectedArticle)?.likes?.toLocaleString()})
                  </button>
                  <button
                    onClick={() => handleModalAction('Share', 'article')}
                    style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    🔄 Share
                  </button>
                  <button
                    onClick={() => handleModalAction('Save for Later', 'article')}
                    style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    📚 Save for Later
                  </button>
                  <button
                    onClick={() => handleModalAction('Follow Author', 'article')}
                    style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    🔔 Follow Author
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div style={{ marginTop: '32px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
                  📖 Related Articles
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {tradingArticles.filter(a => a.id !== selectedArticle).slice(0, 3).map((relatedArticle, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: 'rgba(248, 250, 252, 0.5)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid rgba(226, 232, 240, 0.5)'
                    }}
                    onClick={() => {
                      setSelectedArticle(relatedArticle.id)
                    }}
                    >
                      <span style={{ fontSize: '20px' }}>{relatedArticle.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>
                          {relatedArticle.title}
                        </h5>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                          {relatedArticle.readTime} • {relatedArticle.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          background: 'rgba(0, 0, 0, 0.9)',
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
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                Verify Your Broker Account
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.6 }}>
                {isVerifiedBrokerUser
                  ? `✅ Verified with ${verifiedBroker} - Account: ${brokerAccountId?.slice(-4).padStart(8, '*')}`
                  : `You've viewed ${signalsViewedCount}/3 free signals. Verify your account with a trusted broker for unlimited access.`
                }
              </p>
            </div>

            {!isVerifiedBrokerUser && (
              <>
                {/* Trusted Brokers Grid */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>
                    🤝 Choose Your Trusted Broker
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px'
                  }}>
                    {trustedBrokers.map((broker, index) => (
                      <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${selectedBroker === broker.name ? broker.color : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                      }}
                      onClick={() => setSelectedBroker(broker.name)}
                      >
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{broker.logo}</div>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                          {broker.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          Click to select
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account ID Input */}
                {selectedBroker && (
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#e2e8f0'
                    }}>
                      Enter Your {selectedBroker} Account ID
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g., ${selectedBroker === 'XM Trading' ? '12345678' : selectedBroker === 'AvaTrade' ? '123456' : selectedBroker === 'IC Markets' ? '1234567' : '12345678'}`}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                      onChange={(e) => setBrokerAccountId(e.target.value)}
                    />
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                      Find your account ID in your broker's member area or trading platform
                    </p>
                  </div>
                )}

                {/* Benefits List */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '32px'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#10b981' }}>
                    ✨ Benefits of Verification
                  </h4>
                  <ul style={{ fontSize: '14px', color: '#94a3b8', paddingLeft: '20px', margin: 0 }}>
                    <li>🎯 Unlimited premium signal access</li>
                    <li>⚡ Real-time signal notifications</li>
                    <li>📊 Advanced market analytics</li>
                    <li>🔔 Priority support & updates</li>
                    <li>📈 Exclusive trading strategies</li>
                  </ul>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {!isVerifiedBrokerUser && selectedBroker && brokerAccountId && (
                <button
                  onClick={() => verifyBrokerAccount(selectedBroker, brokerAccountId)}
                  disabled={isVerifying}
                  style={{
                    background: isVerifying
                      ? 'rgba(100, 116, 139, 0.5)'
                      : `linear-gradient(135deg, ${trustedBrokers.find(b => b.name === selectedBroker)?.color || '#3b82f6'} 0%, ${trustedBrokers.find(b => b.name === selectedBroker)?.color || '#1d4ed8'} 100%)`,
                    border: 'none',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isVerifying ? 'not-allowed' : 'pointer',
                    minWidth: '140px'
                  }}
                >
                  {isVerifying ? '🔄 Verifying...' : '✅ Verify Account'}
                </button>
              )}

              <button
                onClick={() => setShowBrokerVerificationModal(false)}
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isVerifiedBrokerUser ? 'Close' : 'Maybe Later'}
              </button>
            </div>

            {!isVerifiedBrokerUser && (
              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                padding: '16px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px'
              }}>
                <p style={{ fontSize: '12px', color: '#f59e0b', margin: 0 }}>
                  🔒 Don't have an account?
                  <span
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginLeft: '4px'
                    }}
                    onClick={() => {
                      setShowBrokerVerificationModal(false)
                      setActiveTab('brokers')
                    }}
                  >
                    Open one with our partners
                  </span>
                </p>
              </div>
            )}
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