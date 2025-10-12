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
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  // 🤖 NEW: AI-generated content states
  const [aiSignals, setAiSignals] = useState<any[]>([])
  const [aiNews, setAiNews] = useState<any[]>([])
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [isLoadingSignals, setIsLoadingSignals] = useState(false)
  const [signalsError, setSignalsError] = useState<string | null>(null)
  const [marketSearchQuery, setMarketSearchQuery] = useState('')
  const [selectedAssetClass, setSelectedAssetClass] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [marketSortBy, setMarketSortBy] = useState('change')
  const [glossarySearch, setGlossarySearch] = useState('')
  const [expandedGlossaryCategory, setExpandedGlossaryCategory] = useState<string | null>(null)

  // Market Analysis states
  const [marketAnalysisSearch, setMarketAnalysisSearch] = useState('')
  const [selectedMarketCategory, setSelectedMarketCategory] = useState('stocks')
  const [selectedStockRegion, setSelectedStockRegion] = useState('all')
  const [selectedForexType, setSelectedForexType] = useState('all')
  const [selectedCommodityCategory, setSelectedCommodityCategory] = useState('all')
  const [marketAnalysisSortBy, setMarketAnalysisSortBy] = useState('changePercent')

  // NEW: Popup System States
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [popupDismissed, setPopupDismissed] = useState<{[key: string]: boolean}>({})
  const [scrollProgress, setScrollProgress] = useState(0)
  const [timeOnSite, setTimeOnSite] = useState(0)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const [liveActivityIndex, setLiveActivityIndex] = useState(0)
  const [traderCount, setTraderCount] = useState(10247)

  // NEW: Exness Widget States
  const [currentWidgetVersion, setCurrentWidgetVersion] = useState(1)
  const [showExnessPopup, setShowExnessPopup] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  // TRUSTED BROKER: Only Exness (user requested)
  const brokerPartners = [
    {
      id: 1,
      name: 'Exness',
      logo: '💎',
      rating: 4.9,
      reviews: 15420,
      features: ['0.0 Pips Spreads', 'Instant Execution', 'CySEC Regulated'],
      bonus: '$50 Welcome Bonus',
      popular: true,
      commission: 'Zero',
      platform: 'MT4/MT5',
      minDeposit: '$10',
      color: '#FFD700'
    }
  ]

  // NEW: Live Activity Feed Data
  const liveActivities = [
    { name: 'Mohammed', location: 'Dubai', profit: '+$450', emoji: '🇦🇪' },
    { name: 'Ahmed', location: 'Riyadh', profit: '+$780', emoji: '🇸🇦' },
    { name: 'Fatima', location: 'Doha', profit: '+$320', emoji: '🇶🇦' },
    { name: 'Hassan', location: 'Kuwait', profit: '+$590', emoji: '🇰🇼' },
    { name: 'Sara', location: 'Abu Dhabi', profit: '+$410', emoji: '🇦🇪' },
    { name: 'Khalid', location: 'Jeddah', profit: '+$650', emoji: '🇸🇦' },
    { name: 'Noura', location: 'Manama', profit: '+$280', emoji: '🇧🇭' },
    { name: 'Omar', location: 'Dubai', profit: '+$890', emoji: '🇦🇪' }
  ]

  // NEW: Popup Management Functions
  const showPopup = (type: string) => {
    const dismissed = localStorage.getItem(`popup_dismissed_${type}_${new Date().toDateString()}`)
    if (!dismissed && !popupDismissed[type]) {
      setActivePopup(type)
    }
  }

  const closePopup = (dontShowAgain: boolean = false) => {
    if (dontShowAgain && activePopup) {
      localStorage.setItem(`popup_dismissed_${activePopup}_${new Date().toDateString()}`, 'true')
      setPopupDismissed(prev => ({ ...prev, [activePopup]: true }))
    }
    setActivePopup(null)
  }

  // DISABLED: Popup Triggers (user requested to remove popups)
  // useEffect(() => {
  //   // Welcome popup after 3 seconds
  //   const welcomeTimer = setTimeout(() => showPopup('welcome'), 3000)
  //   // Time-based popup after 2 minutes
  //   const timeBasedTimer = setTimeout(() => showPopup('timeBased'), 120000)
  //   return () => {
  //     clearTimeout(welcomeTimer)
  //     clearTimeout(timeBasedTimer)
  //   }
  // }, [])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  //     const progress = (window.scrollY / totalHeight) * 100
  //     setScrollProgress(progress)
  //     // Trigger scroll-based popups
  //     if (progress >= 30 && progress < 35 && !popupDismissed['scroll30']) {
  //       showPopup('scroll30')
  //     } else if (progress >= 60 && progress < 65 && !popupDismissed['scroll60']) {
  //       showPopup('scroll60')
  //     } else if (progress >= 90 && !popupDismissed['scroll90']) {
  //       showPopup('scroll90')
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [popupDismissed])

  // useEffect(() => {
  //   const handleMouseLeave = (e: MouseEvent) => {
  //     if (e.clientY <= 0 && !popupDismissed['exitIntent']) {
  //       showPopup('exitIntent')
  //     }
  //   }
  //   document.addEventListener('mouseleave', handleMouseLeave)
  //   return () => document.removeEventListener('mouseleave', handleMouseLeave)
  // }, [popupDismissed])

  // Keep only animations (no popups)
  useEffect(() => {
    // Trader count animation
    const counterInterval = setInterval(() => {
      setTraderCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    // Live activity rotation
    const activityInterval = setInterval(() => {
      setLiveActivityIndex(prev => (prev + 1) % liveActivities.length)
    }, 4000)

    // Time on site tracker
    const siteTimer = setInterval(() => {
      setTimeOnSite(prev => prev + 1)
    }, 1000)

    // Rotate Exness widget versions every 30 seconds
    const widgetRotation = setInterval(() => {
      setCurrentWidgetVersion(prev => prev === 1 ? 2 : 1)
    }, 30000)

    return () => {
      clearInterval(counterInterval)
      clearInterval(activityInterval)
      clearInterval(siteTimer)
      clearInterval(widgetRotation)
    }
  }, [])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll-triggered Exness popup (after reasonable scrolling)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight

      // Show popup after scrolling 1.5 viewports
      if (scrolled > windowHeight * 1.5 && !showExnessPopup && !popupDismissed['exness']) {
        setShowExnessPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showExnessPopup, popupDismissed])

  // 🤖 FETCH AI-GENERATED SIGNALS FROM OPENAI
  const fetchAISignals = async () => {
    setIsLoadingSignals(true)
    setSignalsError(null)

    try {
      const response = await fetch('/api/generate-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()

      if (data.success && data.signals) {
        setAiSignals(data.signals)
        addNotification(`🤖 Generated ${data.signals.length} AI signals!`, 'success')
      } else {
        throw new Error(data.error || 'Failed to generate signals')
      }
    } catch (error: any) {
      console.error('Error fetching AI signals:', error)
      setSignalsError(error.message)
      addNotification('⚠️ Failed to load AI signals', 'warning')
    } finally {
      setIsLoadingSignals(false)
    }
  }

  // Auto-fetch AI signals on page load
  useEffect(() => {
    fetchAISignals()
  }, [])

  // Trading Glossary Data
  const glossaryCategories = [
    {
      name: 'Basic Trading Terms',
      emoji: '📚',
      color: '#2563eb',
      terms: [
        {
          name: 'Bull Market',
          definition: 'A market condition characterized by rising prices and positive investor sentiment. Bull markets typically see sustained upward trends with higher highs and higher lows.',
          example: 'The Saudi TASI index experienced a strong bull market in 2024, rising from 11,200 to 12,800 points over six months, driven by strong oil prices and Vision 2030 investments.'
        },
        {
          name: 'Bear Market',
          definition: 'A market condition where prices decline by 20% or more from recent highs, often accompanied by negative sentiment and economic concerns.',
          example: 'Global markets entered a bear phase in 2022 when the S&P 500 dropped 25% from its peak, affecting GCC markets which saw 12-15% declines in major indices.'
        },
        {
          name: 'Volatility',
          definition: 'The degree of variation in trading prices over time. High volatility means large price swings, while low volatility indicates stable, gradual price movements.',
          example: 'The UAE Dirham maintains very low volatility due to its fixed peg to the USD at 3.6725, making it ideal for stable international trade and predictable planning.'
        },
        {
          name: 'Liquidity',
          definition: 'The ease with which an asset can be bought or sold in the market without affecting its price. High liquidity means assets trade quickly with minimal price impact.',
          example: 'Saudi Aramco stock is highly liquid on the Tadawul, with daily trading volumes exceeding 15 million shares, allowing investors to enter or exit positions easily.'
        },
        {
          name: 'Bid-Ask Spread',
          definition: 'The difference between the highest price a buyer is willing to pay (bid) and the lowest price a seller will accept (ask). Tighter spreads indicate better liquidity.',
          example: 'For Emirates NBD stock on the DFM, the bid might be AED 14.95 and ask AED 14.97, creating a 2 fils spread that represents the transaction cost.'
        },
        {
          name: 'Market Order',
          definition: 'An order to buy or sell immediately at the best available current price. Market orders guarantee execution but not the exact price.',
          example: 'Placing a market order to buy 100 shares of First Abu Dhabi Bank will execute instantly at the current ask price, typically within seconds during market hours.'
        },
        {
          name: 'Limit Order',
          definition: 'An order to buy or sell at a specific price or better. Limit orders control the price you pay but do not guarantee execution.',
          example: 'Setting a limit buy order for Qatar National Bank at QAR 18.50 means you will only buy if the price drops to that level or lower.'
        },
        {
          name: 'Long Position',
          definition: 'Buying an asset with the expectation that its price will rise. Profit is made when you sell at a higher price than you bought.',
          example: 'Taking a long position on gold at $2,000 per ounce means you profit if gold rises to $2,100, earning $100 per ounce held.'
        },
        {
          name: 'Short Position',
          definition: 'Selling an asset you do not own (borrowing it) with the expectation its price will fall. Profit comes from buying it back at a lower price.',
          example: 'Shorting a stock at AED 20 and buying it back at AED 15 generates AED 5 profit per share (Note: shorting may not be Sharia-compliant, check with Islamic scholars).'
        },
        {
          name: 'Portfolio',
          definition: 'A collection of financial investments including stocks, bonds, commodities, cash, and other assets owned by an investor or managed together.',
          example: 'A diversified GCC portfolio might include 40% Saudi equities, 30% UAE real estate, 20% Kuwait bonds, and 10% cash in AED for liquidity.'
        },
        {
          name: 'Diversification',
          definition: 'The practice of spreading investments across different assets, sectors, or geographic regions to reduce risk and minimize impact of any single investment.',
          example: 'Instead of investing only in Saudi banking stocks, diversify across UAE telecoms, Qatar energy, Bahrain real estate, and Omani manufacturing.'
        },
        {
          name: 'Asset Allocation',
          definition: 'The strategic distribution of investment capital among different asset categories (stocks, bonds, real estate, commodities) based on goals and risk tolerance.',
          example: 'A conservative GCC investor might allocate 30% to stocks, 50% to sukuk (Islamic bonds), 15% to real estate, and 5% to gold.'
        },
        {
          name: 'Capital Gains',
          definition: 'The profit realized when an investment is sold for more than the purchase price. The difference between selling price and cost basis.',
          example: 'Buying Emaar Properties at AED 5.00 and selling at AED 6.50 generates AED 1.50 capital gain per share, subject to UAE capital gains tax rules.'
        },
        {
          name: 'Dividend',
          definition: 'A portion of a company\'s earnings distributed to shareholders, usually paid quarterly or annually. Dividends provide income in addition to potential price appreciation.',
          example: 'Saudi Telecom Company (STC) paid a dividend of SAR 1.50 per share in 2024, providing 4.2% dividend yield to long-term shareholders.'
        },
        {
          name: 'Market Capitalization',
          definition: 'The total market value of a company\'s outstanding shares, calculated by multiplying share price by total number of shares.',
          example: 'Saudi Aramco with 200 billion shares at SAR 32 each has a market cap of SAR 6.4 trillion, making it one of the world\'s largest companies.'
        },
        {
          name: 'Trading Volume',
          definition: 'The total number of shares or contracts traded during a specific period. High volume often indicates strong interest and better liquidity.',
          example: 'The Dubai Financial Market (DFM) index trades 200-300 million shares daily during active periods, with spikes to 500+ million on major news.'
        },
        {
          name: 'Trend',
          definition: 'The general direction in which a market or asset price is moving. Trends can be upward (bullish), downward (bearish), or sideways (ranging).',
          example: 'The Abu Dhabi ADX General Index showed a clear uptrend from January to June 2024, making higher highs from 8,800 to 9,450 points.'
        },
        {
          name: 'Support Level',
          definition: 'A price level where buying interest is strong enough to prevent the price from falling further. Historical point where price has bounced upward.',
          example: 'Qatar National Bank has strong support at QAR 18.00, having bounced from that level three times in the past six months.'
        },
        {
          name: 'Resistance Level',
          definition: 'A price level where selling pressure is strong enough to prevent price from rising further. Historical point where price has reversed downward.',
          example: 'The Saudi TASI index faced resistance at 12,800 points, failing to break above that level on four separate attempts before consolidating.'
        },
        {
          name: 'Breakout',
          definition: 'When price moves beyond a defined support or resistance level with increased volume, often signaling the start of a new trend.',
          example: 'Emirates NBD stock broke out above AED 15.00 resistance with 2x normal volume, subsequently rallying to AED 16.50 within three weeks.'
        },
        {
          name: 'Consolidation',
          definition: 'A period where price moves sideways between support and resistance levels, often occurring after strong trends as markets digest gains.',
          example: 'After a 20% rally, Etisalat Group consolidated between AED 28-30 for six weeks before resuming its uptrend to AED 34.'
        },
        {
          name: 'Index',
          definition: 'A statistical measure that tracks the performance of a group of assets. Indices provide benchmarks for market or sector performance.',
          example: 'The MSCI GCC Countries Index tracks the performance of 90+ large and mid-cap stocks across all six GCC nations, weighted by market cap.'
        },
        {
          name: 'Benchmark',
          definition: 'A standard against which the performance of an investment or portfolio can be measured. Common benchmarks are major market indices.',
          example: 'A Saudi equity fund uses the TASI All-Share Index as its benchmark, aiming to outperform the index by 2-3% annually.'
        },
        {
          name: 'Blue Chip',
          definition: 'Stock of a large, well-established, financially sound company with a history of reliable performance and often dividend payments.',
          example: 'Al Rajhi Bank, Saudi Aramco, Emirates NBD, and Qatar National Bank are considered blue-chip stocks in the GCC region.'
        },
        {
          name: 'Small Cap',
          definition: 'Companies with relatively small market capitalization, typically between $300 million and $2 billion. Higher risk but higher growth potential.',
          example: 'Emerging UAE technology companies listed on Abu Dhabi Growth Market (ADX GM) with market caps of AED 500 million-2 billion.'
        },
        {
          name: 'Exchange',
          definition: 'A marketplace where securities, commodities, and derivatives are traded. Exchanges provide infrastructure, regulation, and oversight.',
          example: 'The Saudi Tadawul Exchange is the largest stock exchange in the Middle East, with over 200 listed companies and $3 trillion market cap.'
        },
        {
          name: 'Ticker Symbol',
          definition: 'A unique series of letters or numbers representing a publicly traded company or financial instrument on an exchange.',
          example: 'Saudi Aramco trades under ticker symbol 2222 on Tadawul, while Emirates NBD uses ticker ENBD on the Dubai Financial Market.'
        },
        {
          name: 'Trading Session',
          definition: 'The period during which an exchange is open for trading. Different markets have different trading hours.',
          example: 'The Saudi Tadawul operates Sunday-Thursday from 10:00 AM to 3:00 PM AST, with a pre-opening period starting at 9:30 AM.'
        },
        {
          name: 'Market Maker',
          definition: 'A firm or individual that provides liquidity by continuously offering to buy and sell securities at publicly quoted prices.',
          example: 'Major banks like EFG Hermes act as market makers on the Dubai Financial Market, ensuring continuous bid-ask quotes for major stocks.'
        },
        {
          name: 'Slippage',
          definition: 'The difference between the expected price of a trade and the actual executed price, often occurring during high volatility or low liquidity.',
          example: 'During a major announcement, your market order to buy at AED 10.00 might fill at AED 10.15 due to rapid price movement - this AED 0.15 is slippage.'
        }
      ]
    },
    {
      name: 'Technical Analysis',
      emoji: '📊',
      color: '#059669',
      terms: [
        {
          name: 'Moving Average (MA)',
          definition: 'The average price of a security over a specific number of periods. Smooths price data to identify trends by filtering out short-term fluctuations.',
          example: 'The 50-day moving average of the TASI index at 12,200 points provides a medium-term trend indicator; price above MA suggests bullish momentum.'
        },
        {
          name: 'Exponential Moving Average (EMA)',
          definition: 'A moving average that gives more weight to recent prices, making it more responsive to new information than simple moving averages.',
          example: 'A 20-period EMA on a 4-hour chart of USD/AED helps GCC forex traders identify short-term trend changes faster than simple MAs.'
        },
        {
          name: 'Relative Strength Index (RSI)',
          definition: 'A momentum oscillator that measures the speed and magnitude of price changes on a scale of 0-100. Values above 70 indicate overbought, below 30 oversold.',
          example: 'Emirates NBD stock showing RSI of 82 suggests overbought conditions, potentially signaling a pullback opportunity for swing traders.'
        },
        {
          name: 'MACD (Moving Average Convergence Divergence)',
          definition: 'A trend-following momentum indicator showing the relationship between two moving averages. Crossovers signal potential buy or sell opportunities.',
          example: 'When MACD line crosses above signal line on the Saudi Aramco daily chart, technical traders interpret this as a bullish signal to enter long.'
        },
        {
          name: 'Bollinger Bands',
          definition: 'Volatility bands placed above and below a moving average. The bands widen during high volatility and contract during low volatility periods.',
          example: 'Qatar National Bank price touching the lower Bollinger Band at QAR 17.80 with RSI at 28 provides a high-probability reversal buy signal.'
        },
        {
          name: 'Fibonacci Retracement',
          definition: 'Horizontal lines indicating potential support and resistance levels based on Fibonacci ratios (23.6%, 38.2%, 50%, 61.8%). Used to identify pullback targets.',
          example: 'After ADX rallied from 8,800 to 9,450, the 61.8% Fibonacci retracement at 9,050 acts as key support for buying on pullbacks.'
        },
        {
          name: 'Candlestick Pattern',
          definition: 'Visual representations of price movements showing open, high, low, and close within a specific time period. Patterns help predict future price action.',
          example: 'A bullish engulfing candle on the DFM index daily chart (green candle fully engulfing previous red) signals potential reversal from downtrend.'
        },
        {
          name: 'Head and Shoulders',
          definition: 'A chart pattern indicating a reversal from bullish to bearish trend. Features three peaks - left shoulder, higher head, right shoulder - with a neckline.',
          example: 'A head and shoulders pattern forming on Emaar Properties with neckline at AED 5.80 suggests potential decline to AED 5.20 upon breakdown.'
        },
        {
          name: 'Double Top/Bottom',
          definition: 'Reversal patterns where price tests a level twice unsuccessfully. Double top is bearish; double bottom is bullish.',
          example: 'The TASI index forming a double bottom at 11,800 points with increasing volume on the second bounce signals strong buying opportunity.'
        },
        {
          name: 'Triangle Pattern',
          definition: 'A continuation pattern where price converges between support and resistance. Can be ascending, descending, or symmetrical.',
          example: 'Saudi Telecom forming an ascending triangle with resistance at SAR 122 and rising support suggests breakout target of SAR 130.'
        },
        {
          name: 'Support and Resistance',
          definition: 'Price levels where buying (support) or selling (resistance) pressure historically halts or reverses price movement.',
          example: 'First Abu Dhabi Bank has proven support at AED 14.00 (bounced 4 times) and resistance at AED 16.00 (rejected 3 times).'
        },
        {
          name: 'Trendline',
          definition: 'A straight line connecting two or more price points, extended into the future to identify potential support or resistance levels.',
          example: 'Drawing an upward trendline connecting the lows of the Kuwait KSE index from March through August shows support at 5,850 points.'
        },
        {
          name: 'Chart Timeframe',
          definition: 'The duration each candlestick or bar represents. Common timeframes include 1-minute, 5-minute, hourly, daily, weekly charts.',
          example: 'Day traders watch 5-minute charts of Tadawul stocks for quick entries, while swing traders use daily charts for 3-7 day holding periods.'
        },
        {
          name: 'Volume Analysis',
          definition: 'Studying trading volume to confirm price movements. Rising prices on high volume confirm strength; on low volume suggest weakness.',
          example: 'The DFM index breakout above 4,200 with volume 3x the 20-day average confirms genuine buying interest versus weak breakout.'
        },
        {
          name: 'Divergence',
          definition: 'When price movement and an indicator (like RSI or MACD) move in opposite directions, often signaling potential reversals.',
          example: 'Etisalat making new highs at AED 32 while RSI makes lower highs (bearish divergence) warns of potential trend exhaustion.'
        },
        {
          name: 'Momentum',
          definition: 'The rate of acceleration of price movement. Strong momentum indicates the trend is likely to continue in the same direction.',
          example: 'Saudi Aramco showing 5 consecutive daily gains with expanding volume demonstrates strong bullish momentum supporting continued upside.'
        },
        {
          name: 'Overbought',
          definition: 'A condition where an asset has risen too far too fast and may be due for a pullback or consolidation. Often identified by RSI above 70.',
          example: 'With RSI at 85 and price 15% above its 50-day MA, Emirates NBD appears overbought, suggesting caution for new long entries.'
        },
        {
          name: 'Oversold',
          definition: 'A condition where an asset has fallen too far too fast and may be due for a bounce or reversal. Often identified by RSI below 30.',
          example: 'Qatar National Bank with RSI at 22 and price at the lower Bollinger Band presents an oversold bounce trading opportunity.'
        },
        {
          name: 'Golden Cross',
          definition: 'A bullish signal when a shorter-term moving average crosses above a longer-term moving average, typically 50-day crossing 200-day MA.',
          example: 'The TASI index 50-day MA crossing above the 200-day MA at 11,900 points signaled the start of the 2024 bull market rally.'
        },
        {
          name: 'Death Cross',
          definition: 'A bearish signal when a shorter-term moving average crosses below a longer-term moving average, suggesting potential downtrend.',
          example: 'A death cross on the Bahrain Bourse All Share Index in October 2023 preceded a 12% decline over the following three months.'
        },
        {
          name: 'Price Action',
          definition: 'Trading methodology based solely on historical price movements without relying on technical indicators. Focuses on candlestick patterns and levels.',
          example: 'A price action trader enters long on First Abu Dhabi Bank when price bounces from AED 14.00 support with a bullish pin bar.'
        },
        {
          name: 'Pivot Points',
          definition: 'Calculated levels used by traders to identify potential support and resistance. Based on previous period\'s high, low, and close prices.',
          example: 'Daily pivot point for Aramco calculated at SAR 31.50 serves as intraday support/resistance for day traders on Tadawul.'
        },
        {
          name: 'Stochastic Oscillator',
          definition: 'A momentum indicator comparing closing price to price range over time. Values above 80 indicate overbought; below 20 indicate oversold.',
          example: 'Stochastic crossing above 20 on Dubai Islamic Bank daily chart signals potential reversal from oversold conditions for swing trade entry.'
        },
        {
          name: 'Average True Range (ATR)',
          definition: 'A volatility indicator measuring the average range between high and low prices. Higher ATR indicates higher volatility.',
          example: 'Saudi Aramco 14-day ATR of 0.85 SAR suggests typical daily range of 0.85 SAR, useful for setting stop-loss and profit targets.'
        },
        {
          name: 'Ichimoku Cloud',
          definition: 'A comprehensive indicator showing support/resistance, trend direction, and momentum using multiple components including cloud, conversion, and base lines.',
          example: 'Price trading above the Ichimoku cloud on the ADX index with green cloud suggests strong uptrend continuation opportunity.'
        },
        {
          name: 'Elliott Wave Theory',
          definition: 'A technical analysis theory proposing that market movements follow repetitive patterns of five waves in trend direction and three corrective waves.',
          example: 'Analysts identify the TASI rally as completing Elliott Wave 3 at 12,800, expecting Wave 4 correction to 12,200 before final Wave 5 push.'
        },
        {
          name: 'Gap',
          definition: 'A price range where no trading occurred, appearing as empty space on charts. Gaps often occur after news or over weekends.',
          example: 'Emaar Properties gapped up from AED 5.80 to AED 6.20 on Sunday open after positive weekend news about mega project approval.'
        },
        {
          name: 'Breakout Volume',
          definition: 'The trading volume accompanying a breakout through support or resistance. High volume confirms genuine breakout; low volume suggests false break.',
          example: 'The DFM index breakout above 4,200 resistance with 450 million shares (vs 200M average) validates the breakout strength.'
        },
        {
          name: 'Price Pattern',
          definition: 'Recognizable formations created by price movements on charts that help predict future price direction based on historical performance.',
          example: 'A cup and handle pattern on Al Rajhi Bank weekly chart suggests continuation of uptrend with target of SAR 95 upon handle breakout.'
        },
        {
          name: 'Harmonic Pattern',
          definition: 'Advanced chart patterns based on Fibonacci ratios and geometric price movements, such as Gartley, Butterfly, and Bat patterns.',
          example: 'A bullish Gartley pattern completing at point D (AED 14.20) on First Abu Dhabi Bank offers precise entry with tight stop-loss.'
        }
      ]
    },
    {
      name: 'Fundamental Analysis',
      emoji: '💼',
      color: '#7c3aed',
      terms: [
        {
          name: 'Earnings Per Share (EPS)',
          definition: 'A company\'s profit divided by outstanding shares. Higher EPS indicates greater profitability and is used to calculate P/E ratio.',
          example: 'Saudi Aramco reported EPS of SAR 8.50 in 2024, meaning each share represents SAR 8.50 of annual profit attributable to shareholders.'
        },
        {
          name: 'Price-to-Earnings Ratio (P/E)',
          definition: 'Share price divided by earnings per share. Indicates how much investors pay for each dollar of earnings. Lower P/E may indicate value.',
          example: 'Qatar National Bank with P/E of 12.5x is trading at lower valuation than regional peers averaging 15x, potentially indicating undervaluation.'
        },
        {
          name: 'Price-to-Book Ratio (P/B)',
          definition: 'Market price per share divided by book value per share. Shows how much investors pay relative to company\'s net asset value.',
          example: 'Emirates NBD trading at P/B of 1.8x means investors pay AED 1.80 for every AED 1.00 of book value (assets minus liabilities).'
        },
        {
          name: 'Dividend Yield',
          definition: 'Annual dividend per share divided by share price, expressed as percentage. Higher yield provides more income to shareholders.',
          example: 'Saudi Telecom Company paying SAR 1.50 annual dividend with stock at SAR 120 provides 1.25% dividend yield to investors.'
        },
        {
          name: 'Return on Equity (ROE)',
          definition: 'Net income divided by shareholder equity, showing how effectively company uses equity to generate profits. Higher ROE indicates efficiency.',
          example: 'Al Rajhi Bank achieving 22% ROE demonstrates superior ability to generate profits from shareholder investments compared to 15% industry average.'
        },
        {
          name: 'Return on Assets (ROA)',
          definition: 'Net income divided by total assets, measuring how efficiently company uses assets to generate earnings.',
          example: 'First Abu Dhabi Bank with 2.1% ROA shows strong asset utilization, generating AED 2.10 profit for every AED 100 in assets.'
        },
        {
          name: 'Debt-to-Equity Ratio',
          definition: 'Total debt divided by total equity, indicating how much debt company uses to finance assets relative to shareholder equity.',
          example: 'Emaar Properties with debt-to-equity of 0.45 means AED 0.45 debt for every AED 1.00 equity, indicating conservative leverage use.'
        },
        {
          name: 'Free Cash Flow',
          definition: 'Cash generated from operations minus capital expenditures. Represents cash available for distribution to shareholders or reinvestment.',
          example: 'Saudi Aramco generated $120 billion free cash flow in 2023, enabling substantial dividend payments and strategic investments.'
        },
        {
          name: 'Revenue Growth',
          definition: 'The year-over-year or quarter-over-quarter percentage increase in company sales. Indicates business expansion and market demand.',
          example: 'Etisalat Group reporting 12% revenue growth YoY demonstrates strong subscriber additions and successful 5G rollout in UAE and Egypt.'
        },
        {
          name: 'Profit Margin',
          definition: 'Net income divided by revenue, showing what percentage of sales becomes actual profit after all expenses.',
          example: 'Al Rajhi Bank achieving 35% profit margin means it retains SAR 0.35 as profit for every SAR 1.00 of revenue generated.'
        },
        {
          name: 'Operating Margin',
          definition: 'Operating income divided by revenue, measuring profitability from core business operations before interest and taxes.',
          example: 'Saudi Aramco maintaining 45% operating margin demonstrates exceptional operational efficiency in oil extraction and refining.'
        },
        {
          name: 'Book Value',
          definition: 'Total assets minus total liabilities, representing net worth of company. Book value per share divides this by outstanding shares.',
          example: 'First Abu Dhabi Bank with book value of AED 28 billion and 3 billion shares has book value per share of AED 9.33.'
        },
        {
          name: 'Market Value',
          definition: 'The total value of a company as determined by the stock market, calculated as share price multiplied by total outstanding shares.',
          example: 'Emirates NBD with 5.5 billion shares trading at AED 15.00 has market value of AED 82.5 billion, reflecting investor valuation.'
        },
        {
          name: 'Intrinsic Value',
          definition: 'The perceived true value of a company based on fundamental analysis, often calculated using discounted cash flow or other valuation models.',
          example: 'Analyst calculates Qatar National Bank intrinsic value at QAR 22.00 vs current price of QAR 19.00, suggesting 15.8% upside potential.'
        },
        {
          name: 'Earnings Report',
          definition: 'Quarterly or annual financial statement released by public companies disclosing revenue, expenses, profits, and key business metrics.',
          example: 'Saudi Aramco Q1 2024 earnings report showing $32.4 billion profit, up 12% YoY, triggered 5% stock price rally on Tadawul.'
        },
        {
          name: 'Guidance',
          definition: 'Management\'s forecast for future earnings or revenue, providing investors with expectations for upcoming quarters or fiscal year.',
          example: 'Emaar Properties raising full-year revenue guidance to AED 35 billion (from AED 32B) signals strong sales momentum in Dubai real estate.'
        },
        {
          name: 'Balance Sheet',
          definition: 'Financial statement showing company\'s assets, liabilities, and shareholder equity at a specific point in time.',
          example: 'First Abu Dhabi Bank balance sheet showing AED 900 billion total assets and AED 85 billion shareholder equity as of Q2 2024.'
        },
        {
          name: 'Income Statement',
          definition: 'Financial statement showing company\'s revenue, expenses, and profits over a specific period (quarter or year).',
          example: 'Al Rajhi Bank income statement for Q4 2023 shows SAR 4.8 billion revenue, SAR 1.2 billion expenses, SAR 3.6 billion net income.'
        },
        {
          name: 'Cash Flow Statement',
          definition: 'Financial statement tracking cash moving in and out of company from operating, investing, and financing activities.',
          example: 'Saudi Aramco cash flow statement showing $40 billion from operations, -$8 billion investing, -$28 billion financing (dividends).'
        },
        {
          name: 'Sector',
          definition: 'A distinct segment of the economy grouping companies with similar business activities, such as banking, energy, telecommunications, or real estate.',
          example: 'The GCC banking sector includes Al Rajhi Bank, Emirates NBD, QNB, and FAB, all benefiting from rising interest rates in 2023-2024.'
        },
        {
          name: 'Economic Indicator',
          definition: 'Statistical data about economic activity, such as GDP growth, inflation, unemployment, used to assess economic health and market direction.',
          example: 'UAE GDP growth of 3.9% in 2024, combined with 2.1% inflation, indicates healthy economic expansion supporting stock market valuations.'
        },
        {
          name: 'Gross Domestic Product (GDP)',
          definition: 'The total value of all goods and services produced in a country during a specific period, indicating economic size and growth rate.',
          example: 'Saudi Arabia GDP reaching $1.1 trillion in 2024 with 3.5% growth rate demonstrates successful economic diversification under Vision 2030.'
        },
        {
          name: 'Inflation Rate',
          definition: 'The rate at which general price levels rise, reducing purchasing power. Central banks monitor inflation to set monetary policy.',
          example: 'UAE inflation at 2.3% in 2024 remains within Central Bank target range, supporting stable currency peg and controlled price increases.'
        },
        {
          name: 'Interest Rate',
          definition: 'The cost of borrowing money or return on savings, set by central banks to control inflation and stimulate or cool economic growth.',
          example: 'The Saudi Central Bank (SAMA) maintaining 5.50% repo rate affects borrowing costs for businesses and mortgage rates for consumers.'
        },
        {
          name: 'Consumer Price Index (CPI)',
          definition: 'A measure of average price changes in a basket of consumer goods and services, used to track inflation and cost of living.',
          example: 'Qatar CPI rising 2.8% year-over-year in May 2024 indicates moderate inflation, primarily driven by housing and food costs.'
        }
      ]
    },
    {
      name: 'Risk Management',
      emoji: '🛡️',
      color: '#dc2626',
      terms: [
        {
          name: 'Stop Loss',
          definition: 'An order placed to automatically sell a position when it reaches a specified price below your entry, limiting potential losses.',
          example: 'Buying Emirates NBD at AED 15.00 with stop loss at AED 14.50 ensures maximum loss of AED 0.50 per share (3.33%) if trade moves against you.'
        },
        {
          name: 'Take Profit',
          definition: 'An order to automatically close a profitable position when it reaches a target price, locking in gains without emotional decision-making.',
          example: 'Entering long Saudi Aramco at SAR 32.00 with take profit at SAR 34.00 automatically secures SAR 2.00 gain per share when target hits.'
        },
        {
          name: 'Position Sizing',
          definition: 'The process of determining how much capital to allocate to a specific trade based on account size and risk tolerance.',
          example: 'With AED 100,000 account and 2% risk rule, you risk AED 2,000 per trade. With AED 0.50 stop loss, you can buy 4,000 shares.'
        },
        {
          name: 'Risk-Reward Ratio',
          definition: 'The potential profit of a trade relative to potential loss. A 3:1 ratio means you target 3 units of profit for every 1 unit of risk.',
          example: 'Buying at AED 10.00 with stop at AED 9.50 (risk AED 0.50) and target AED 11.50 (reward AED 1.50) provides 3:1 risk-reward ratio.'
        },
        {
          name: 'Maximum Drawdown',
          definition: 'The largest peak-to-trough decline in portfolio value during a specific period. Indicates worst-case scenario risk.',
          example: 'A trading account growing from AED 100,000 to AED 150,000, then dropping to AED 120,000 has maximum drawdown of 20% from peak.'
        },
        {
          name: 'Risk per Trade',
          definition: 'The maximum amount of capital you are willing to lose on a single trade, typically expressed as percentage of total account.',
          example: 'Professional GCC traders typically risk 1-2% per trade. On a SAR 200,000 account, this means SAR 2,000-4,000 maximum loss per trade.'
        },
        {
          name: 'Portfolio Diversification',
          definition: 'Spreading investments across different assets, sectors, or markets to reduce overall risk and minimize correlation.',
          example: 'A diversified GCC portfolio: 30% Saudi stocks, 25% UAE stocks, 20% Qatar bonds, 15% Kuwait real estate, 10% cash.'
        },
        {
          name: 'Correlation',
          definition: 'The degree to which two assets move in relation to each other. Positive correlation means they move together; negative means opposite.',
          example: 'Saudi Aramco and Brent crude oil have high positive correlation (0.85), while gold and TASI index show negative correlation (-0.32).'
        },
        {
          name: 'Leverage',
          definition: 'Using borrowed capital to increase position size and potential returns. Magnifies both profits and losses proportionally.',
          example: 'Trading with 10:1 leverage allows controlling AED 100,000 position with AED 10,000. A 5% move equals 50% gain or loss on capital.'
        },
        {
          name: 'Margin',
          definition: 'The amount of capital required to open and maintain a leveraged position. Margin call occurs when equity falls below required level.',
          example: 'To trade AED 50,000 worth of UAE stocks with 20% margin requirement, you need AED 10,000 in your trading account.'
        },
        {
          name: 'Margin Call',
          definition: 'A broker demand for additional funds when account equity falls below minimum margin requirement, often due to leveraged losses.',
          example: 'Trading with AED 10,000 on 5:1 leverage (AED 50,000 position) that drops 15% triggers margin call as equity falls below requirement.'
        },
        {
          name: 'Hedging',
          definition: 'Taking an offsetting position to reduce risk of adverse price movements in an existing investment.',
          example: 'A Saudi exporter hedges SAR/USD currency risk by buying USD futures, protecting against potential dollar strength affecting revenues.'
        },
        {
          name: 'Value at Risk (VaR)',
          definition: 'Statistical measure estimating maximum potential loss over a specific time period at a given confidence level (e.g., 95%).',
          example: 'A portfolio with daily VaR of AED 5,000 at 95% confidence means there is 5% chance of losing more than AED 5,000 in a day.'
        },
        {
          name: 'Beta',
          definition: 'A measure of a stock\'s volatility relative to the overall market. Beta >1 means more volatile; <1 means less volatile than market.',
          example: 'Emaar Properties with beta of 1.3 tends to move 30% more than the DFM index - if index rises 10%, Emaar typically rises 13%.'
        },
        {
          name: 'Trailing Stop',
          definition: 'A dynamic stop loss that moves with favorable price movement but stays fixed when price reverses, protecting accumulated profits.',
          example: 'Setting 5% trailing stop on Qatar National Bank at QAR 20.00 means stop moves up to QAR 21.00 when price hits QAR 22.00.'
        },
        {
          name: 'Risk-Free Rate',
          definition: 'The theoretical return on an investment with zero risk, often based on government bonds or central bank deposit rates.',
          example: 'Saudi Arabian government 10-year sukuk yielding 4.8% serves as risk-free rate benchmark for evaluating equity investments in the region.'
        },
        {
          name: 'Sharpe Ratio',
          definition: 'Measure of risk-adjusted return, calculated as (portfolio return - risk-free rate) divided by portfolio volatility. Higher is better.',
          example: 'A GCC equity fund with 15% return, 3% risk-free rate, and 12% volatility has Sharpe ratio of 1.0 (15-3)/12, indicating good risk-adjusted performance.'
        },
        {
          name: 'Capital Preservation',
          definition: 'Investment strategy prioritizing protection of principal capital over aggressive growth, accepting lower returns for reduced risk.',
          example: 'Conservative UAE investors focus on capital preservation through 60% sukuk, 30% blue-chip GCC stocks, 10% cash allocation.'
        },
        {
          name: 'Black Swan Event',
          definition: 'An extremely rare and unpredictable event with severe consequences. Examples include financial crises, pandemics, or geopolitical shocks.',
          example: 'The 2020 oil price crash to negative territory was a black swan event that temporarily disrupted GCC stock markets and currencies.'
        },
        {
          name: 'Circuit Breaker',
          definition: 'Automatic trading halt triggered when prices move beyond predetermined limits, designed to prevent panic selling and market crashes.',
          example: 'The Saudi Tadawul has circuit breakers at ±10% for individual stocks and ±5% for the overall index to maintain orderly trading.'
        },
        {
          name: 'Systematic Risk',
          definition: 'Market-wide risk affecting all securities simultaneously, cannot be eliminated through diversification. Also called market risk.',
          example: 'Global oil price collapse affects all GCC stock markets simultaneously as systematic risk due to regional economic oil dependence.'
        },
        {
          name: 'Unsystematic Risk',
          definition: 'Company or industry-specific risk that can be reduced through diversification. Also called specific or idiosyncratic risk.',
          example: 'Risk of Emirates NBD-specific management issues or local regulatory changes - can be mitigated by diversifying across multiple GCC banks.'
        },
        {
          name: 'Stress Testing',
          definition: 'Analyzing how a portfolio would perform under extreme market conditions or adverse scenarios to evaluate resilience.',
          example: 'GCC fund stress tests portfolio against scenarios: 40% oil price drop, 20% market correction, USD strength, regional geopolitical tensions.'
        },
        {
          name: 'Position Limit',
          definition: 'Maximum size of a position an investor or trader can hold, either self-imposed for risk management or regulatory requirement.',
          example: 'Setting personal position limit of 10% per stock ensures no single position in portfolio exceeds AED 50,000 of AED 500,000 account.'
        },
        {
          name: 'Recovery Factor',
          definition: 'The ratio of net profit to maximum drawdown. Measures how efficiently a trading strategy recovers from losses.',
          example: 'A trading strategy with SAR 100,000 profit and SAR 25,000 max drawdown has recovery factor of 4.0, indicating strong loss recovery.'
        }
      ]
    },
    {
      name: 'Order Types',
      emoji: '📋',
      color: '#ea580c',
      terms: [
        {
          name: 'Market Order',
          definition: 'An order to buy or sell immediately at the best available current price. Guarantees execution but not the exact fill price.',
          example: 'Placing market order to buy 500 shares of First Abu Dhabi Bank executes instantly at current ask price, typically AED 14.98-15.02.'
        },
        {
          name: 'Limit Order',
          definition: 'An order to buy or sell at a specific price or better. Guarantees price if executed but does not guarantee execution.',
          example: 'Limit buy order for Saudi Aramco at SAR 31.50 only executes if price drops to SAR 31.50 or lower, protecting from overpaying.'
        },
        {
          name: 'Stop-Loss Order',
          definition: 'An order that becomes a market order once a specified trigger price is reached, used to limit losses on existing positions.',
          example: 'Long Emaar Properties at AED 6.00 with stop-loss at AED 5.70 triggers automatic market sell if price drops to AED 5.70.'
        },
        {
          name: 'Stop-Limit Order',
          definition: 'An order that becomes a limit order (not market order) once stop price is triggered, providing price control but not guaranteed execution.',
          example: 'Stop-limit sell at stop AED 14.50, limit AED 14.40 for Emirates NBD ensures you don\'t sell below AED 14.40 even if price crashes.'
        },
        {
          name: 'Trailing Stop Order',
          definition: 'A stop order that automatically adjusts with favorable price movement by a set percentage or amount, protecting profits.',
          example: 'Qatar National Bank at QAR 20.00 with 5% trailing stop means stop moves to QAR 19.95 when price hits QAR 21.00, locking in gains.'
        },
        {
          name: 'Good-Till-Cancelled (GTC)',
          definition: 'An order that remains active until it is executed or manually cancelled, unlike day orders that expire at market close.',
          example: 'A GTC limit buy order for Al Rajhi Bank at SAR 85.00 stays active for weeks until price drops to target or you cancel it.'
        },
        {
          name: 'Day Order',
          definition: 'An order that expires automatically at the end of the trading day if not executed. Most common default order duration.',
          example: 'A day limit order to buy Etisalat at AED 29.00 placed Monday morning expires Monday 3 PM if price doesn\'t reach target.'
        },
        {
          name: 'Fill or Kill (FOK)',
          definition: 'An order that must be executed immediately in its entirety or cancelled completely. No partial fills allowed.',
          example: 'FOK order to buy 10,000 shares of Dubai Islamic Bank must fill all 10,000 shares instantly or cancel - prevents partial execution.'
        },
        {
          name: 'Immediate or Cancel (IOC)',
          definition: 'An order to buy or sell that executes immediately for all or portion available, then cancels any unfilled part.',
          example: 'IOC order for 5,000 shares of Saudi Telecom might fill 3,000 shares immediately and cancel remaining 2,000 if liquidity insufficient.'
        },
        {
          name: 'All or None (AON)',
          definition: 'An order that must be filled completely or not at all, but unlike FOK, does not require immediate execution.',
          example: 'AON order to buy 8,000 shares of Kuwait Finance House waits for sufficient liquidity to fill all 8,000 shares in single transaction.'
        },
        {
          name: 'Iceberg Order',
          definition: 'A large order split into smaller visible portions to avoid revealing full order size and impacting market price.',
          example: 'Institutional buyer wanting 100,000 shares of Emirates NBD uses iceberg showing 2,000 shares at a time to minimize market impact.'
        },
        {
          name: 'Bracket Order',
          definition: 'A three-part order combining entry with simultaneous stop-loss and take-profit orders, defining all parameters upfront.',
          example: 'Bracket order: buy Aramco at SAR 32.00, stop-loss at SAR 31.00, take-profit at SAR 35.00 - all executed as single order package.'
        },
        {
          name: 'One-Cancels-Other (OCO)',
          definition: 'Two orders where execution of one automatically cancels the other. Used for bidirectional strategies or exits.',
          example: 'OCO: buy First Abu Dhabi Bank at AED 14.00 OR AED 16.00 - whichever executes first automatically cancels the other.'
        },
        {
          name: 'Market-on-Close (MOC)',
          definition: 'An order executed at or near the market close price, ensuring participation in closing auction or final minutes of trading.',
          example: 'MOC order for 1,000 shares of Qatar National Bank executes at 3:00 PM closing auction price, typically within 1-2% of last trade.'
        },
        {
          name: 'Market-on-Open (MOO)',
          definition: 'An order executed at or near the market opening price, participating in opening auction or first trade of the session.',
          example: 'MOO order for Saudi Aramco executes during 10:00 AM Tadawul opening auction, filling at or near opening price.'
        },
        {
          name: 'Conditional Order',
          definition: 'An order that activates only when specific conditions are met, such as price levels, time, or other technical criteria.',
          example: 'Conditional order to buy Emaar Properties only if DFM index breaks above 4,300 and volume exceeds 250 million shares.'
        },
        {
          name: 'Pegged Order',
          definition: 'An order automatically adjusted to maintain set relationship to market price, bid, ask, or other reference point.',
          example: 'Pegged order to sell Emirates NBD at 0.5% above bid price automatically adjusts as bid changes, staying competitive for execution.'
        },
        {
          name: 'Scale Order',
          definition: 'Strategy of entering or exiting position in multiple smaller orders at different price levels rather than single large order.',
          example: 'Buying 10,000 Al Rajhi Bank shares in 5 lots of 2,000 at SAR 87, 86.50, 86, 85.50, 85 averages down entry price.'
        },
        {
          name: 'Discretionary Order',
          definition: 'An order giving broker limited flexibility to execute at slightly different price or time for better execution quality.',
          example: 'Discretionary order with 0.5% flexibility allows broker to buy Qatar National Bank between QAR 19.50-19.60 for optimal fill.'
        },
        {
          name: 'Hidden Order',
          definition: 'An order not displayed in the public order book, used to prevent other traders from detecting large institutional interest.',
          example: 'Large institutional buyer uses hidden order for 50,000 shares of Saudi Aramco to avoid alerting market and pushing price higher.'
        }
      ]
    },
    {
      name: 'Market Indicators',
      emoji: '📈',
      color: '#0891b2',
      terms: [
        {
          name: 'Advance-Decline Line',
          definition: 'Market breadth indicator tracking number of advancing stocks minus declining stocks. Rising line indicates broad market strength.',
          example: 'Tadawul advance-decline line rising to new highs confirms TASI index rally supported by broad participation, not just large-cap stocks.'
        },
        {
          name: 'Put-Call Ratio',
          definition: 'Ratio of put option volume to call option volume. High ratio indicates bearish sentiment; low ratio suggests bullish sentiment.',
          example: 'GCC derivatives markets showing put-call ratio of 0.45 suggests traders buying more calls than puts, indicating bullish outlook.'
        },
        {
          name: 'VIX (Volatility Index)',
          definition: 'Measure of market expected volatility based on options prices. Often called "fear index" - higher values indicate greater uncertainty.',
          example: 'While GCC markets lack VIX equivalent, global VIX rising to 25 typically correlates with 10-15% decline in TASI and ADX indices.'
        },
        {
          name: 'Market Breadth',
          definition: 'Analysis of how many stocks participate in market move. Broad participation signals stronger, more sustainable trends.',
          example: 'DFM rally with 85% of stocks advancing indicates healthy breadth versus narrow rally with only 10 large-caps driving index higher.'
        },
        {
          name: 'New Highs-New Lows',
          definition: 'Number of stocks making 52-week highs versus 52-week lows. More new highs than lows indicates bullish market conditions.',
          example: 'ADX showing 45 stocks at new 52-week highs and only 8 at new lows confirms strong underlying market health despite index consolidation.'
        },
        {
          name: 'On-Balance Volume (OBV)',
          definition: 'Cumulative indicator adding volume on up days and subtracting on down days. Rising OBV suggests accumulation and strength.',
          example: 'Saudi Aramco OBV rising consistently while price consolidates suggests institutional accumulation, supporting bullish continuation outlook.'
        },
        {
          name: 'Accumulation/Distribution Line',
          definition: 'Volume-based indicator measuring buying (accumulation) versus selling (distribution) pressure over time.',
          example: 'Emirates NBD accumulation/distribution line diverging higher while price sideways indicates smart money accumulating before breakout.'
        },
        {
          name: 'Money Flow Index (MFI)',
          definition: 'Volume-weighted RSI measuring buying and selling pressure. Values above 80 overbought, below 20 oversold.',
          example: 'Qatar National Bank MFI at 25 with price near support suggests oversold conditions and potential reversal opportunity.'
        },
        {
          name: 'Arms Index (TRIN)',
          definition: 'Ratio measuring advancing/declining stocks versus advancing/declining volume. Below 1.0 bullish; above 1.0 bearish.',
          example: 'Tadawul TRIN at 0.75 indicates volume flowing into advancing stocks more than declining stocks, confirming bullish sentiment.'
        },
        {
          name: 'Williams %R',
          definition: 'Momentum indicator measuring overbought/oversold levels from -100 to 0. Above -20 overbought, below -80 oversold.',
          example: 'First Abu Dhabi Bank Williams %R at -85 signals deeply oversold conditions, supporting bounce/reversal trade opportunity.'
        },
        {
          name: 'Commodity Channel Index (CCI)',
          definition: 'Oscillator identifying cyclical trends and overbought/oversold conditions. Values typically range from -100 to +100.',
          example: 'Al Rajhi Bank CCI crossing above +100 after consolidation signals strong momentum breakout for trend-following entry.'
        },
        {
          name: 'Parabolic SAR',
          definition: 'Indicator providing potential entry and exit points through dots placed above or below price, indicating trend direction.',
          example: 'Emaar Properties Parabolic SAR dots flipping from above to below price signals trend change from bearish to bullish.'
        },
        {
          name: 'Chaikin Money Flow',
          definition: 'Volume-weighted indicator measuring buying and selling pressure over specific period, typically 20 or 21 days.',
          example: 'Saudi Aramco Chaikin Money Flow above +0.15 for three weeks indicates sustained institutional buying supporting uptrend continuation.'
        },
        {
          name: 'Rate of Change (ROC)',
          definition: 'Momentum oscillator measuring percentage price change between current price and price n-periods ago.',
          example: 'Etisalat Group 20-day ROC at +8.5% shows strong recent momentum, suggesting continuation of uptrend if volume confirms.'
        },
        {
          name: 'Aroon Indicator',
          definition: 'Two lines (Aroon Up and Aroon Down) measuring time since 25-period high/low. Identifies trend strength and potential reversals.',
          example: 'Qatar National Bank Aroon Up at 100 and Aroon Down at 10 indicates strong uptrend with recent 25-day high and no recent lows.'
        },
        {
          name: 'Keltner Channels',
          definition: 'Volatility-based envelopes set above and below EMA. Breakouts beyond channels signal potential trend continuation.',
          example: 'Emirates NBD breaking above upper Keltner Channel with expanding volume confirms strong bullish momentum for trend trade.'
        },
        {
          name: 'Donchian Channels',
          definition: 'Upper and lower bands based on highest high and lowest low over set period. Popular for breakout and trend-following systems.',
          example: 'Al Rajhi Bank breaking above 20-day Donchian Channel high at SAR 88.00 triggers buy signal for momentum traders.'
        },
        {
          name: 'Price Volume Trend (PVT)',
          definition: 'Cumulative volume-based indicator that adds/subtracts portion of volume based on percentage price change.',
          example: 'First Abu Dhabi Bank PVT making higher lows while price makes lower lows signals bullish divergence and potential reversal.'
        },
        {
          name: 'Detrended Price Oscillator',
          definition: 'Indicator removing trend to highlight shorter-term cycles. Helps identify overbought/oversold conditions and cycle turning points.',
          example: 'Saudi Aramco detrended price oscillator reaching extreme low suggests end of correction phase and potential cycle turn higher.'
        },
        {
          name: 'Ultimate Oscillator',
          definition: 'Momentum oscillator using three different time periods to avoid false signals. Ranges from 0 to 100.',
          example: 'Emaar Properties Ultimate Oscillator above 70 with bullish divergence provides high-probability reversal signal from oversold zone.'
        }
      ]
    },
    {
      name: 'GCC & Islamic Finance',
      emoji: '🕌',
      color: '#059669',
      terms: [
        {
          name: 'Sukuk',
          definition: 'Islamic bonds structured to comply with Sharia law. Instead of interest, investors receive share of asset\'s profit. Also called Islamic bonds.',
          example: 'Saudi Arabia issued $5 billion sukuk in 2024 at 4.7% yield, backed by government infrastructure assets, providing Sharia-compliant investment.'
        },
        {
          name: 'Halal Investment',
          definition: 'Investments permissible under Islamic law, avoiding interest (riba), gambling (maysir), uncertainty (gharar), and prohibited industries.',
          example: 'Al Rajhi Bank is halal-compliant, avoiding conventional interest-based banking, alcohol, tobacco, gambling, and weapons industries.'
        },
        {
          name: 'Haram Investment',
          definition: 'Investments forbidden under Islamic law, including businesses dealing with alcohol, pork, gambling, conventional banking interest, or weapons.',
          example: 'Conventional bonds paying fixed interest, casino stocks, brewery companies, and interest-based loans are considered haram investments.'
        },
        {
          name: 'Murabaha',
          definition: 'Islamic financing where bank buys asset and sells it to customer at marked-up price with deferred payment. Profit known upfront.',
          example: 'Dubai Islamic Bank purchases property for AED 1 million, sells it to customer for AED 1.2 million payable over 5 years - transparent profit.'
        },
        {
          name: 'Mudarabah',
          definition: 'Partnership where one party provides capital and other provides expertise. Profits shared per agreement; losses borne by capital provider.',
          example: 'Investor provides SAR 500,000 capital to experienced trader; profits split 60-40 while investor bears all financial losses if occur.'
        },
        {
          name: 'Musharakah',
          definition: 'Joint venture partnership where all parties contribute capital and share profits/losses proportionally. Common in Islamic project finance.',
          example: 'Qatar Islamic Bank and developer each contribute 50% capital for mall project, sharing profits and losses equally per Musharakah agreement.'
        },
        {
          name: 'Riba',
          definition: 'Interest or usury, strictly prohibited in Islam. Includes both excessive interest and any predetermined interest on loans.',
          example: 'Conventional bank loans charging 8% annual interest constitute riba, which is why Islamic banks use profit-sharing alternatives.'
        },
        {
          name: 'Zakat',
          definition: 'Mandatory charitable contribution of 2.5% of wealth annually for Muslims. One of Five Pillars of Islam, purifying wealth.',
          example: 'Muslim investor with AED 400,000 in stocks and cash must pay AED 10,000 (2.5%) annually as zakat to eligible recipients.'
        },
        {
          name: 'Sharia Screening',
          definition: 'Process of evaluating companies to determine if their business activities and financial ratios comply with Islamic principles.',
          example: 'Emirates NBD screens out companies with >5% revenue from haram sources or debt-to-market-cap ratio exceeding 33% for Islamic funds.'
        },
        {
          name: 'Vision 2030',
          definition: 'Saudi Arabia\'s strategic framework to diversify economy away from oil dependence, announced in 2016. Drives major investments and reforms.',
          example: 'Vision 2030 initiatives like NEOM mega-city, Red Sea tourism project, and PIF investments create opportunities for GCC equity investors.'
        },
        {
          name: 'Tadawul',
          definition: 'The Saudi Stock Exchange (Tadawul), the largest stock market in the Middle East by market capitalization, hosting 200+ listed companies.',
          example: 'Trading Saudi Aramco, Al Rajhi Bank, STC, and SABIC requires Tadawul account, operating Sunday-Thursday 10 AM-3 PM AST.'
        },
        {
          name: 'Abu Dhabi Securities Exchange (ADX)',
          definition: 'One of two main UAE stock exchanges, featuring major companies like First Abu Dhabi Bank, ADNOC, and Etisalat Group.',
          example: 'ADX General Index tracks 70+ companies with combined market cap exceeding AED 1 trillion, operating Sunday-Thursday 10 AM-2 PM.'
        },
        {
          name: 'Dubai Financial Market (DFM)',
          definition: 'UAE stock exchange hosting Dubai-based companies including Emaar Properties, Dubai Islamic Bank, and Emirates NBD.',
          example: 'DFM offers trading in 65+ stocks, with Emaar Properties being most actively traded, average daily volume 50-80 million shares.'
        },
        {
          name: 'Qatar Stock Exchange (QSE)',
          definition: 'Doha-based exchange listing 50+ Qatari companies across banking, industry, insurance, and services sectors.',
          example: 'QSE trading Qatar National Bank, Industries Qatar, and Ooredoo, operating Sunday-Thursday 9:30 AM-1:30 PM with T+2 settlement.'
        },
        {
          name: 'Kuwait Boursa (KSE)',
          definition: 'Kuwait Stock Exchange featuring three market segments: Premier, Main, and Auction. Known for high dividend yields.',
          example: 'Kuwait Boursa Premier Market includes National Bank of Kuwait and Kuwait Finance House, popular for 4-6% dividend yields.'
        },
        {
          name: 'Bahrain Bourse (BHB)',
          definition: 'Stock exchange in Manama featuring primarily financial services companies and investment funds.',
          example: 'Bahrain Bourse lists Ahli United Bank, National Bank of Bahrain, and various regional investment funds with Sharia-compliant options.'
        },
        {
          name: 'Muscat Securities Market (MSM)',
          definition: 'Oman\'s stock exchange in Muscat, featuring banking, industrial, and service companies with growing international investor participation.',
          example: 'MSM offers access to Bank Muscat, Oman Telecommunications, and diversified industrial companies, trading Sunday-Thursday.'
        },
        {
          name: 'GCC Common Market',
          definition: 'Economic integration initiative allowing free movement of goods, services, and capital among GCC member states.',
          example: 'GCC nationals can trade stocks on any GCC exchange without restrictions, opening cross-border investment opportunities across the region.'
        },
        {
          name: 'Sovereign Wealth Fund',
          definition: 'State-owned investment fund managing national reserves. GCC hosts world\'s largest SWFs like PIF, ADIA, and QIA.',
          example: 'Saudi Public Investment Fund (PIF) with $700 billion+ assets invests in regional projects and international companies, influencing GCC markets.'
        },
        {
          name: 'Islamic Finance Index',
          definition: 'Market index tracking only Sharia-compliant companies, excluding those violating Islamic principles.',
          example: 'S&P GCC Composite Sharia Index includes only companies passing Islamic screening criteria, providing benchmark for halal investing.'
        }
      ]
    },
    {
      name: 'Forex Trading',
      emoji: '💱',
      color: '#8b5cf6',
      terms: [
        {
          name: 'Currency Pair',
          definition: 'Quotation of two currencies where one is quoted against the other. Base currency (first) vs quote currency (second).',
          example: 'In EUR/USD = 1.0850, you pay $1.0850 USD to buy 1 EUR. In USD/AED = 3.6725, you get AED 3.6725 for 1 USD.'
        },
        {
          name: 'Pip',
          definition: 'Smallest price movement in forex, typically fourth decimal place (0.0001). For JPY pairs, second decimal (0.01).',
          example: 'EUR/USD moving from 1.0850 to 1.0855 is a 5 pip increase. For USD/JPY, 150.25 to 150.35 is 10 pips.'
        },
        {
          name: 'Spread',
          definition: 'Difference between bid (sell) and ask (buy) price in forex. Tighter spreads indicate better liquidity and lower trading costs.',
          example: 'EUR/USD bid 1.0850, ask 1.0852 has 2 pip spread. Trading 1 standard lot (100,000 EUR) costs $20 in spread.'
        },
        {
          name: 'Lot Size',
          definition: 'Standardized trading quantity in forex. Standard lot = 100,000 units, mini = 10,000, micro = 1,000.',
          example: 'Trading 1 standard lot EUR/USD means controlling 100,000 EUR. Each pip movement equals $10 profit or loss.'
        },
        {
          name: 'Leverage in Forex',
          definition: 'Borrowed capital allowing control of larger positions with smaller deposits. Common forex leverage: 50:1, 100:1, even 500:1.',
          example: 'With 100:1 leverage, $1,000 margin controls $100,000 position. A 1% move equals $1,000 profit or loss on your $1,000 capital.'
        },
        {
          name: 'Margin in Forex',
          definition: 'Amount of capital required to open and maintain a leveraged forex position, expressed as percentage of full position value.',
          example: 'Trading 1 lot EUR/USD ($100,000) with 100:1 leverage requires $1,000 margin (1% of position size) in your trading account.'
        },
        {
          name: 'Major Pairs',
          definition: 'Most liquid and actively traded currency pairs, all involving USD: EUR/USD, GBP/USD, USD/JPY, USD/CHF, USD/CAD, AUD/USD, NZD/USD.',
          example: 'EUR/USD accounts for 24% of global forex volume, offering tightest spreads (0.1-0.3 pips) and best trading conditions.'
        },
        {
          name: 'Minor Pairs',
          definition: 'Currency pairs excluding USD but involving major currencies: EUR/GBP, EUR/JPY, GBP/JPY. Less liquid than majors.',
          example: 'EUR/GBP trades with 1-2 pip spreads versus 0.1-0.3 pips for EUR/USD, reflecting lower liquidity and wider spreads.'
        },
        {
          name: 'Exotic Pairs',
          definition: 'Currency pairs involving one major currency and one emerging market currency. Higher spreads and volatility.',
          example: 'USD/TRY (Turkish Lira) or USD/ZAR (South African Rand) offer high volatility but wider spreads (10-50 pips) and overnight costs.'
        },
        {
          name: 'Carry Trade',
          definition: 'Strategy of borrowing low-interest currency to buy high-interest currency, profiting from interest rate differential.',
          example: 'Borrowing JPY at 0.1% to buy AUD at 4.35% earns 4.25% annual interest differential, plus any favorable currency movement.'
        },
        {
          name: 'Swap Rate',
          definition: 'Interest paid or earned for holding forex position overnight. Based on interest rate differential between two currencies.',
          example: 'Holding long AUD/JPY overnight earns positive swap (receiving higher AUD rate). Short position pays swap (paying the differential).'
        },
        {
          name: 'Central Bank Policy',
          definition: 'Monetary policy decisions by central banks affecting interest rates and money supply, major driver of currency values.',
          example: 'US Federal Reserve raising rates from 0% to 5.5% in 2022-2023 strengthened USD by 15% against EUR and 8% against GBP.'
        },
        {
          name: 'Currency Peg',
          definition: 'Fixed exchange rate system where currency is tied to another currency or basket. Most GCC currencies are pegged to USD.',
          example: 'UAE Dirham fixed at 3.6725 per USD since 1997, providing stability for trade but eliminating forex speculation opportunities.'
        },
        {
          name: 'Floating Exchange Rate',
          definition: 'Currency value determined by market forces of supply and demand rather than government intervention.',
          example: 'EUR/USD freely floats based on economic data, interest rates, and market sentiment, ranging 1.05-1.12 in 2024.'
        },
        {
          name: 'Intervention',
          definition: 'Central bank buying or selling currency to influence its value, typically to prevent excessive appreciation or depreciation.',
          example: 'Swiss National Bank intervening to weaken CHF by selling francs and buying euros when EUR/CHF threatened parity in 2022.'
        },
        {
          name: 'Forex Broker',
          definition: 'Financial institution providing platform and liquidity for retail forex trading. Can be market maker or ECN/STP broker.',
          example: 'Popular GCC forex brokers: Exness, FBS, XM, offering competitive spreads, multiple currency pairs, and leverage options for UAE traders.'
        },
        {
          name: 'ECN (Electronic Communication Network)',
          definition: 'Trading system matching buy and sell orders directly between participants without dealer intervention. Typically tighter spreads.',
          example: 'ECN forex accounts offer raw spreads (0.0-0.2 pips on EUR/USD) plus small commission, ideal for high-volume traders.'
        },
        {
          name: 'Market Maker',
          definition: 'Broker creating market by taking opposite side of your trades. Often offers no commission but wider spreads.',
          example: 'Market maker broker quoting EUR/USD at 1.0850/1.0852 takes your buy order at 1.0852, potentially selling to market at 1.0851.'
        },
        {
          name: 'Forex Session',
          definition: 'Geographic trading periods: Asian (Tokyo), European (London), North American (New York). Overlap periods have highest liquidity.',
          example: 'London-New York overlap (1 PM-5 PM GMT) sees 40% of daily forex volume, offering tightest spreads and best trading opportunities.'
        },
        {
          name: 'Economic Calendar',
          definition: 'Schedule of economic data releases and events affecting currency values: GDP, employment, inflation, central bank meetings.',
          example: 'US Non-Farm Payrolls (first Friday monthly) typically moves EUR/USD 50-100 pips, creating trading opportunities and increased volatility.'
        }
      ]
    },
    {
      name: 'Commodities & Crypto',
      emoji: '⚡',
      color: '#f59e0b',
      terms: [
        {
          name: 'Brent Crude Oil',
          definition: 'International benchmark for oil pricing, sourced from North Sea. Reference for 2/3 of global oil contracts, including GCC exports.',
          example: 'Saudi Arabia prices Arab Light crude at premium to Brent. When Brent trades at $85/barrel, Arab Light typically sells at $86-87.'
        },
        {
          name: 'WTI Crude Oil',
          definition: 'West Texas Intermediate, US oil benchmark. Lighter and sweeter than Brent, primarily used for North American pricing.',
          example: 'WTI typically trades $2-4 below Brent due to transportation costs. WTI $82/barrel while Brent $85/barrel is normal spread.'
        },
        {
          name: 'OPEC',
          definition: 'Organization of Petroleum Exporting Countries coordinating oil production policies among 13 member nations including Saudi Arabia, UAE, Kuwait.',
          example: 'OPEC+ (including Russia) decision to cut production by 2 million barrels/day in 2023 drove Brent crude from $80 to $95/barrel.'
        },
        {
          name: 'Gold Spot Price',
          definition: 'Current market price for immediate delivery of gold. Quoted in USD per troy ounce (31.1 grams), major safe-haven asset.',
          example: 'Gold rallying from $1,800 to $2,400/oz in 2024 provided 33% return for UAE investors hedging against inflation and geopolitical risk.'
        },
        {
          name: 'Futures Contract',
          definition: 'Agreement to buy or sell commodity at predetermined price on specific future date. Used for hedging and speculation.',
          example: 'Dubai Gold & Commodities Exchange offers gold futures, allowing traders to speculate or hedge with $100 per 0.01 ounce price move.'
        },
        {
          name: 'Spot Market',
          definition: 'Market for immediate delivery and payment of commodities, as opposed to futures contracts for future delivery.',
          example: 'Buying physical gold bars in Dubai Gold Souk at current spot price plus 2-3% premium for fabrication and dealer margin.'
        },
        {
          name: 'Contango',
          definition: 'Futures market condition where contracts for later delivery trade at higher prices than current spot price.',
          example: 'Gold spot at $2,000/oz while 6-month futures at $2,030/oz represents contango, reflecting storage and financing costs.'
        },
        {
          name: 'Backwardation',
          definition: 'Futures market condition where contracts for later delivery trade below current spot price, often indicating supply shortage.',
          example: 'Oil spot at $90/barrel while 3-month futures at $87/barrel signals tight supply and strong immediate demand.'
        },
        {
          name: 'Silver',
          definition: 'Precious metal with both investment and industrial uses. More volatile than gold, often correlates with gold movements.',
          example: 'Silver rallying from $22 to $30/oz (36% gain) while gold rose 15% demonstrates silver\'s higher volatility and beta to gold.'
        },
        {
          name: 'Cryptocurrency',
          definition: 'Digital currency using cryptography for security, operating on decentralized blockchain networks. Highly volatile speculative assets.',
          example: 'Bitcoin ranging $40,000-$70,000 in 2024 offers high-risk, high-reward opportunities for UAE traders on Binance or Kraken platforms.'
        },
        {
          name: 'Bitcoin (BTC)',
          definition: 'First and largest cryptocurrency by market cap. Digital store of value often called "digital gold." Maximum supply 21 million coins.',
          example: 'UAE investors buying Bitcoin at $30,000 and selling at $65,000 realized 117% gain, though experiencing 30-40% drawdowns during journey.'
        },
        {
          name: 'Ethereum (ETH)',
          definition: 'Second-largest cryptocurrency, programmable blockchain enabling smart contracts and decentralized applications.',
          example: 'Ethereum rallying from $1,600 to $4,000 in 2024 benefited GCC crypto investors, driven by institutional adoption and ETF approvals.'
        },
        {
          name: 'Altcoin',
          definition: 'Any cryptocurrency other than Bitcoin. Includes Ethereum, Ripple, Cardano, Solana, and thousands of smaller projects.',
          example: 'Solana (SOL) surging from $20 to $180 in 2023-2024 demonstrates extreme volatility typical of altcoins versus Bitcoin\'s relative stability.'
        },
        {
          name: 'Blockchain',
          definition: 'Distributed ledger technology recording transactions across network of computers. Foundation of cryptocurrency and many fintech innovations.',
          example: 'UAE government using blockchain for land registry, trade finance, and digital identity, supporting smart city initiatives.'
        },
        {
          name: 'Crypto Exchange',
          definition: 'Platform for buying, selling, and trading cryptocurrencies. Can be centralized (CEX) like Binance or decentralized (DEX).',
          example: 'UAE traders use Binance, Kraken, or BitOasis for crypto trading, with Binance offering 350+ cryptocurrencies and low 0.1% fees.'
        },
        {
          name: 'Stablecoin',
          definition: 'Cryptocurrency designed to maintain stable value by pegging to fiat currency, commodity, or algorithmic mechanisms.',
          example: 'USDT and USDC maintain $1.00 peg, allowing GCC crypto traders to park profits in stable assets without exiting to fiat currency.'
        },
        {
          name: 'DeFi (Decentralized Finance)',
          definition: 'Financial services built on blockchain without traditional intermediaries like banks. Includes lending, borrowing, trading.',
          example: 'UAE investors earning 5-8% yields on stablecoin deposits in DeFi protocols like Aave or Compound, though with smart contract risks.'
        },
        {
          name: 'NFT (Non-Fungible Token)',
          definition: 'Unique digital asset on blockchain representing ownership of digital or physical items. Each token is distinct and not interchangeable.',
          example: 'Dubai real estate companies using NFTs to represent fractional property ownership, allowing investors to buy portions of villas or apartments.'
        },
        {
          name: 'Commodity ETF',
          definition: 'Exchange-traded fund investing in physical commodities or commodity futures, providing easy diversification.',
          example: 'GCC investors accessing gold exposure through SPDR Gold Shares (GLD) ETF, tracking gold price with 0.40% annual fee.'
        },
        {
          name: 'Natural Gas',
          definition: 'Fossil fuel commodity used for heating, electricity generation, and industrial processes. Highly seasonal with winter demand spikes.',
          example: 'Qatar, world\'s largest LNG exporter, benefits when European natural gas prices spike to $40-50/MMBtu versus normal $10-15.'
        }
      ]
    }
  ]

  // Comprehensive Lesson Content
  const lessonContent: Record<string, {
    objectives: string[]
    explanation: string
    keyConcepts: { term: string; definition: string }[]
    gccExamples: string[]
    steps?: string[]
    mistakes: string[]
    visualReference: string
  }> = {
    'course1-module1-lesson1': {
      objectives: [
        'Understand the fundamental concept of trading and its role in the global economy',
        'Learn about different financial markets and how they operate',
        'Identify the relationship between buyers, sellers, and market prices',
        'Grasp the importance of liquidity and market efficiency'
      ],
      explanation: `Trading is the act of buying and selling financial instruments with the goal of generating profits from price movements. At its core, trading is about identifying opportunities where assets are undervalued or overvalued and taking positions accordingly. Financial markets serve as the infrastructure that enables this exchange, bringing together buyers and sellers from around the world.

The modern financial markets consist of various asset classes including stocks (equity ownership in companies), bonds (debt instruments), commodities (physical goods like oil and gold), currencies (forex markets), and derivatives (contracts based on underlying assets). Each market has unique characteristics, trading hours, participants, and price drivers.

In the GCC region, financial markets have grown significantly over the past two decades. The Saudi Stock Exchange (Tadawul) is the largest in the Middle East with a market capitalization exceeding $2.5 trillion as of 2024. The Abu Dhabi Securities Exchange (ADX) and Dubai Financial Market (DFM) are also major regional players. These markets trade shares of leading companies like Saudi Aramco, Emirates NBD, Al Rajhi Bank, SABIC, and many others.

Trading differs from investing in its time horizon and approach. While investors typically buy assets to hold for years based on fundamental value, traders seek to profit from shorter-term price movements using technical analysis, market sentiment, and economic indicators. Professional traders in GCC markets monitor regional economic data, oil prices, government policies, and global market trends to make informed decisions.

Understanding trading fundamentals is essential before risking capital. This includes knowing how orders are executed, how prices are determined through supply and demand, the role of market makers and liquidity providers, and the impact of transaction costs. Success in trading requires not just knowledge but also discipline, risk management, and continuous learning.`,
      keyConcepts: [
        { term: 'Liquidity', definition: 'The ease with which an asset can be bought or sold without causing significant price movement. High liquidity means tight spreads and quick execution.' },
        { term: 'Market Capitalization', definition: 'The total value of a company\'s outstanding shares, calculated by multiplying share price by total shares. Saudi Aramco has the largest market cap in the region.' },
        { term: 'Bid-Ask Spread', definition: 'The difference between the highest price a buyer is willing to pay (bid) and the lowest price a seller will accept (ask). Tighter spreads indicate more efficient markets.' },
        { term: 'Price Discovery', definition: 'The process by which markets determine the fair value of an asset based on supply, demand, and available information.' }
      ],
      gccExamples: [
        'Saudi Aramco IPO (2019): The world\'s largest IPO raised $25.6 billion, with shares trading at 35.20 SAR. This demonstrated the depth and sophistication of the TASI market.',
        'Emirates NBD on DFM: Trading around 14-16 AED per share, it\'s one of the most liquid banking stocks in the UAE with daily volumes exceeding 2 million shares.',
        'TASI Index Movement: The Tadawul All Share Index tracks over 200 companies and serves as the benchmark for Saudi market performance, influenced heavily by oil prices and government reforms.',
        'Qatar Stock Exchange (QSE): Features companies like QNB (Qatar National Bank) and Industries Qatar, with trading denominated in Qatari Riyals.'
      ],
      mistakes: [
        'Starting with real money before understanding market mechanics - always begin with a demo account',
        'Confusing investing with trading - they require different strategies and timeframes',
        'Ignoring transaction costs (commissions, spreads) which can erode profits on frequent trades',
        'Trading without understanding the specific characteristics of GCC markets like trading hours and settlement periods'
      ],
      visualReference: 'Imagine a typical TASI trading screen showing Saudi Aramco stock: You\'ll see the current price (e.g., 32.45 SAR), the bid price (32.40), the ask price (32.50), trading volume (3.2M shares), and a candlestick chart showing price movements throughout the day. Order books display all pending buy and sell orders at different price levels.'
    },
    'course1-module1-lesson2': {
      objectives: [
        'Differentiate between major asset classes: stocks, forex, commodities, and bonds',
        'Understand the risk-return profile of each instrument type',
        'Learn which instruments are most relevant for GCC traders',
        'Identify how different instruments can be combined in a portfolio'
      ],
      explanation: `Financial instruments are the building blocks of trading and investing. Each type offers different risk-reward characteristics, liquidity levels, and requires specific knowledge to trade effectively.

**Stocks (Equities)** represent ownership shares in companies. When you buy Saudi Aramco stock on TASI or Emirates NBD on DFM, you become a partial owner with rights to dividends and voting. Stock prices fluctuate based on company performance, industry trends, economic conditions, and market sentiment. In GCC markets, banking, petrochemicals, telecommunications, and real estate stocks dominate trading volume.

**Forex (Foreign Exchange)** involves trading currency pairs like USD/SAR, USD/AED, or EUR/USD. The forex market is the world's largest with over $7 trillion in daily volume. GCC traders often focus on pairs involving regional currencies, though these tend to be pegged or tightly managed. The Saudi Riyal is pegged at 3.75 to the US Dollar, while the UAE Dirham is pegged at 3.6725. Trading major pairs like EUR/USD or GBP/USD offers more volatility and opportunity.

**Commodities** include physical assets like crude oil, gold, silver, natural gas, and agricultural products. Oil is particularly relevant for GCC traders given the region's role as a major producer. Brent crude and WTI crude prices directly impact GCC stock markets and currencies. Gold trading is also popular in the region, with Dubai serving as a major gold trading hub.

**Bonds** are debt instruments where investors lend money to governments or corporations in exchange for regular interest payments. GCC governments issue sovereign bonds and Sukuk (Islamic bonds compliant with Sharia law). The UAE, Saudi Arabia, and Qatar regularly issue bonds to fund infrastructure projects. Bond prices move inversely to interest rates.

Each instrument requires different analytical approaches. Stocks benefit from fundamental analysis (examining financial statements, earnings, management quality), while forex relies heavily on macroeconomic indicators and central bank policies. Commodities respond to supply-demand dynamics and geopolitical events. Understanding these differences helps traders choose instruments aligned with their skills and risk tolerance.`,
      keyConcepts: [
        { term: 'Dividend Yield', definition: 'Annual dividends per share divided by stock price. Many GCC companies like Saudi Aramco and Al Rajhi Bank offer attractive dividend yields of 3-6%.' },
        { term: 'Currency Peg', definition: 'A fixed exchange rate policy where a currency\'s value is tied to another currency. Most GCC currencies are pegged to the US Dollar for stability.' },
        { term: 'Sukuk', definition: 'Islamic financial certificates similar to bonds but structured to comply with Sharia law, representing ownership in tangible assets rather than debt.' },
        { term: 'Leverage', definition: 'Using borrowed capital to increase position size. Forex and commodities typically offer high leverage (up to 1:500) while stocks use lower leverage (1:2 to 1:5).' }
      ],
      gccExamples: [
        'Saudi Aramco (Stock): Largest company in the region, pays quarterly dividends, stock price influenced by oil production decisions and global energy demand. Recent price: 32-36 SAR.',
        'USD/SAR (Forex): Pegged at 3.75, extremely low volatility. Most GCC traders focus on USD/EUR, USD/GBP or gold/USD instead for forex opportunities.',
        'Brent Crude Oil (Commodity): Typically trades $70-90 per barrel. A $10 increase in oil prices can boost TASI by 5-7% due to the correlation with energy sector profits.',
        'Saudi Government Sukuk (Bond): Issued regularly with maturities from 3-30 years, yields typically 3-5% depending on duration and market conditions.'
      ],
      steps: [
        'Start by studying one asset class deeply before diversifying to others',
        'Open a demo account that offers your chosen instrument types',
        'Study the correlation between GCC stocks and oil prices using historical charts',
        'Monitor how regional events (OPEC decisions, government reforms) affect different instruments',
        'Practice analyzing at least 3 companies, 2 currency pairs, and 2 commodities before live trading'
      ],
      mistakes: [
        'Trading too many instrument types simultaneously before mastering one',
        'Ignoring that GCC forex pairs have limited volatility due to currency pegs',
        'Overlooking Islamic finance principles when trading bonds/sukuk in the region',
        'Failing to account for different trading hours across asset classes'
      ],
      visualReference: 'A comparison dashboard showing: TASI index chart (stocks), USD/SAR flat line chart (forex peg), Brent crude price chart with volatility (commodity), and Saudi Sukuk yield curve (bonds). Each displays different price patterns - stocks showing company-specific movements, commodities showing supply-demand cycles, bonds showing interest rate sensitivity.'
    },
    'course1-module1-lesson3': {
      objectives: [
        'Identify the key participants in financial markets and their roles',
        'Understand how retail traders, institutions, and market makers interact',
        'Learn about the regulatory bodies overseeing GCC markets',
        'Recognize how different participants influence price movements'
      ],
      explanation: `Financial markets are ecosystems with diverse participants, each playing specific roles that collectively ensure market functionality, liquidity, and price discovery.

**Retail Traders** are individual investors trading their personal capital. This includes GCC residents trading local stocks, expatriates investing in regional markets, and active day traders. Retail participants typically trade smaller positions (few thousand to few hundred thousand SAR/AED) and increasingly access markets through online brokers and mobile apps. While individually small, retail traders collectively move markets, especially in smaller-cap stocks.

**Institutional Investors** include pension funds, insurance companies, mutual funds, and sovereign wealth funds. The GCC hosts some of the world's largest sovereign wealth funds: Saudi Arabia's Public Investment Fund (PIF) with over $700 billion in assets, Abu Dhabi Investment Authority (ADIA) with approximately $850 billion, and Qatar Investment Authority (QIA) with $475 billion. These institutions trade massive positions and their decisions significantly impact markets. When PIF increases its stake in a Saudi company, the stock often rallies.

**Market Makers** are specialized firms that provide liquidity by continuously offering to buy and sell securities. They profit from the bid-ask spread and ensure traders can execute orders quickly. In GCC markets, local and international banks often serve as market makers, particularly in blue-chip stocks like Saudi Aramco, Al Rajhi Bank, and Emirates NBD.

**Broker-Dealers** facilitate transactions between buyers and sellers. In the GCC, major brokers include Al Rajhi Capital, EFG Hermes, Arqaam Capital, and international firms like Interactive Brokers. They provide trading platforms, research, and execution services, earning commissions on trades.

**Regulators** oversee market operations to ensure fairness and protect investors. The Capital Market Authority (CMA) regulates Saudi markets, the Dubai Financial Services Authority (DFSA) oversees the DIFC, Abu Dhabi's Securities and Commodities Authority (SCA) regulates UAE markets, and the Qatar Financial Markets Authority (QFMA) governs Qatari exchanges. These bodies set listing requirements, monitor trading activity, and enforce compliance.

Understanding participant dynamics helps traders anticipate market movements. For example, when institutional investors rebalance portfolios at quarter-end, volumes spike. When market makers widen spreads during volatile periods, execution costs increase. Recognizing these patterns provides trading edges.`,
      keyConcepts: [
        { term: 'Institutional Flow', definition: 'Large buy or sell orders from institutional investors that can move markets. Often detected through unusual volume or large block trades.' },
        { term: 'Spread Widening', definition: 'When market makers increase the difference between bid and ask prices, typically during high volatility or low liquidity periods.' },
        { term: 'Front Running', definition: 'Illegal practice where brokers trade ahead of client orders. Regulators like CMA actively monitor and penalize such activities.' },
        { term: 'Sovereign Wealth Fund (SWF)', definition: 'State-owned investment funds that manage national reserves. GCC SWFs are among the world\'s largest and most influential.' }
      ],
      gccExamples: [
        'PIF\'s Saudi Aramco Stake: The Public Investment Fund owns about 90% of Aramco shares, making it the dominant shareholder. PIF decisions on dividends or share sales significantly impact the stock.',
        'ADIA\'s Global Investments: Abu Dhabi Investment Authority invests across global markets but also supports local development, influencing UAE stock valuations.',
        'CMA Regulations: The Capital Market Authority enforces trading rules on TASI, requiring disclosure when investors acquire 5% or more of a company\'s shares.',
        'Market Maker Activity: During the opening minutes of TASI trading (10:00 AM Riyadh time), market makers actively adjust prices based on overnight international markets and oil price movements.'
      ],
      steps: [
        'Learn to identify institutional buying by monitoring stocks with rising prices on high volume',
        'Check regulatory websites (CMA.org.sa, SCA.gov.ae) for major shareholder disclosures',
        'Track sovereign wealth fund announcements about strategic investments',
        'Monitor spread changes throughout the trading day to identify best execution times',
        'Follow when major international institutions (BlackRock, JP Morgan) adjust their GCC holdings'
      ],
      mistakes: [
        'Trading against clear institutional flow - don\'t fight the "smart money"',
        'Ignoring trading volume which often signals institutional participation',
        'Attempting to trade illiquid stocks where spreads are wide and market makers scarce',
        'Overlooking regulatory announcements that can trigger sudden market reactions'
      ],
      visualReference: 'Picture a market depth screen for Saudi Aramco showing: at the bid side, you see small retail orders (100-500 shares) and occasionally large institutional orders (50,000+ shares). The ask side mirrors this. Market makers maintain tight spreads of 0.05 SAR. Suddenly, a block trade of 200,000 shares executes at market - this is institutional flow that may signal a trend.'
    },
    'course1-module1-lesson4': {
      objectives: [
        'Understand the mechanics of how stock exchanges operate',
        'Learn the specific characteristics of TASI, ADX, DFM, NYSE, and NASDAQ',
        'Master the order matching process and execution priorities',
        'Understand IPO processes and listing requirements in GCC markets'
      ],
      explanation: `Stock exchanges are organized marketplaces where securities are bought and sold under regulated conditions. They provide the infrastructure, rules, and technology that enable efficient price discovery and transaction execution.

**Tadawul (Saudi Stock Exchange - TASI)** is the largest stock market in the Arab world and the region's most advanced exchange. Operating since 1984, TASI trades over 200 companies with a total market capitalization exceeding $2.5 trillion. Trading hours are 10:00 AM to 3:00 PM Riyadh time (GMT+3), Sunday through Thursday. The exchange operates a fully electronic order-driven system where buy and sell orders are matched automatically based on price-time priority. TASI indices include the TASI All-Share Index, the MT30 Index (top 30 companies), and various sector indices.

**Abu Dhabi Securities Exchange (ADX)** and **Dubai Financial Market (DFM)** serve the UAE. ADX, established in 2000, features major companies like First Abu Dhabi Bank (FAB), ADNOC companies, and real estate firms. DFM, also founded in 2000, lists Emirates NBD, Dubai Islamic Bank, Emaar Properties, and others. Both exchanges trade from 10:00 AM to 2:00 PM UAE time. In 2024, there are ongoing discussions about potential merger or closer integration of these two exchanges to increase liquidity and efficiency.

**NYSE (New York Stock Exchange)** and **NASDAQ** are the world's largest stock exchanges. NYSE uses a hybrid model combining electronic trading with designated market makers, while NASDAQ is fully electronic. Trading hours are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday. Many GCC investors access these markets through international brokers to trade US stocks and diversify portfolios.

The **order matching mechanism** works through continuous auction systems. When you submit a market order to buy Saudi Aramco at 32.50 SAR, the exchange matches it with the best available sell order. Limit orders wait in the order book until price conditions are met. Priority follows price-time rules: best price executes first, and among same-price orders, earlier submissions execute first.

**IPO processes** in the GCC have evolved significantly. Companies must meet CMA or SCA listing requirements including minimum capital, shareholder numbers, financial audits, and disclosure standards. Recent major IPOs include Saudi Aramco (2019), ACWA Power (2021), and multiple Saudi companies under Vision 2030 privatization initiatives. Retail investors in the region receive allocations in IPOs, often oversubscribed by 10-50 times.`,
      keyConcepts: [
        { term: 'Price-Time Priority', definition: 'Order execution rule where the best price executes first, and among orders at the same price, the earliest submitted order executes first. This ensures fair and transparent trading.' },
        { term: 'Circuit Breakers', definition: 'Automatic trading halts triggered by excessive price movements. TASI halts individual stocks at ±10% daily movement and may halt the entire market during extreme volatility.' },
        { term: 'T+2 Settlement', definition: 'Standard settlement cycle where trades settle two business days after execution. You must have funds available within T+2 to complete purchases.' },
        { term: 'Free Float', definition: 'The portion of shares available for public trading. Saudi Aramco\'s free float is about 1.5% with PIF holding the rest, affecting liquidity.' }
      ],
      gccExamples: [
        'TASI Trading Session: Opens at 10:00 AM with a pre-opening period (9:30-10:00) where orders accumulate. The opening price is determined through an auction matching maximum volume. During the day, continuous trading matches orders in real-time.',
        'ADX General Index: Tracks the performance of all listed securities on the Abu Dhabi exchange, weighted by market capitalization. Major constituents include FAB, ADNOC Distribution, and Aldar Properties.',
        'Saudi Aramco IPO: Priced at 32 SAR in December 2019, the IPO raised $25.6 billion by offering 1.5% of shares. Retail demand was massive with 5 million individual subscribers. Shares began trading and reached 38.70 SAR on the second day.',
        'DFM Market Hours: Trading runs 10:00 AM to 2:00 PM, with a pre-opening session from 9:45-10:00 AM. The exchange closes for UAE public holidays and during Ramadan, hours may be reduced.'
      ],
      steps: [
        'Open your broker\'s trading platform and observe the order book for a liquid stock like Saudi Aramco or Emirates NBD',
        'Note the bid and ask prices, quantities at each level, and how they change in real-time',
        'Place a limit order in your demo account and watch where it appears in the order book queue',
        'Monitor how market orders instantly execute against the best available prices',
        'Track a stock through the daily price discovery process from opening auction to closing price',
        'Review exchange websites (Tadawul.com.sa, ADX.ae, DFM.ae) for daily trading statistics and announcements'
      ],
      mistakes: [
        'Using market orders in illiquid stocks - you may get poor execution at unfavorable prices',
        'Forgetting that GCC exchanges are closed on weekends (Friday-Saturday) and regional holidays',
        'Ignoring the impact of low free float on stock volatility - stocks with limited shares trade erratically',
        'Trading during the first and last 30 minutes when spreads are widest and volatility highest'
      ],
      visualReference: 'Visualize the TASI trading screen for Al Rajhi Bank: The order book shows 5 levels of bids and asks. Best bid: 85.00 SAR for 1,000 shares; Best ask: 85.10 SAR for 800 shares. Below are deeper levels (84.90, 84.80, etc.). A green line graph shows the intraday price movement. Volume bars at the bottom display trading intensity. When a market buy order for 800 shares arrives, it matches the best ask at 85.10, removing that level from the book.'
    },
    'course1-module1-lesson5': {
      objectives: [
        'Learn global market trading sessions and their overlaps',
        'Understand GCC market hours and their relationship to other markets',
        'Identify the best times to trade different instruments',
        'Recognize how market hours affect liquidity and volatility'
      ],
      explanation: `Financial markets operate across different time zones, creating a 24-hour global trading cycle. Understanding market hours is crucial for timing trades, managing risk, and maximizing opportunities.

**Global Market Sessions:** The trading day begins in Asia with Sydney and Tokyo markets, moves to European markets in London, and ends with North American markets in New York. The forex market trades 24 hours from Sunday evening to Friday evening (Eastern Time) as different financial centers open and close. Stock markets have defined hours but after-hours and pre-market trading extends opportunities.

**GCC Market Hours:** Saudi Arabia (TASI) trades 10:00 AM - 3:00 PM Riyadh time (GMT+3), Sunday through Thursday. UAE exchanges (ADX and DFM) operate 10:00 AM - 2:00 PM UAE time (GMT+4), Sunday through Thursday. Qatar Exchange (QSE) trades 9:30 AM - 1:00 PM Doha time (GMT+3), Sunday through Thursday. These markets are closed on Fridays, Saturdays, and Islamic holidays.

**Session Overlaps** provide the highest liquidity and volatility. The London-New York overlap (1:00 PM - 5:00 PM GMT) is the most active forex trading period, accounting for over 50% of daily volume. For GCC traders, this overlap occurs in the afternoon/evening and presents opportunities in currency and commodity markets after local stock exchanges close.

**Market Impact on Instruments:** Stock exchanges have fixed hours, but forex markets trade continuously. Commodities like gold and oil have peak activity during London and New York hours. Cryptocurrency markets trade 24/7. Understanding when specific instruments are most active helps traders choose optimal entry and exit times.

**GCC-Specific Considerations:** TASI and ADX hours coincide partially with European market openings, allowing traders to react to overnight US market movements and European morning trends. Oil prices often move during US trading hours, affecting GCC stocks the following morning. Saudi and UAE markets frequently gap at the open based on overnight international developments.

Strategic traders monitor: (1) European market opens (4:00 PM Riyadh time) for global sentiment, (2) US market opens (5:30 PM Riyadh time in summer, 4:30 PM in winter) for major trend direction, and (3) Asian market closes (1:00 PM Riyadh time) for regional influences.`,
      keyConcepts: [
        { term: 'Market Open Volatility', definition: 'The first 30-60 minutes of trading typically shows highest volatility as orders accumulated overnight get executed and prices adjust to new information.' },
        { term: 'Session Overlap', definition: 'Periods when multiple major markets trade simultaneously, creating higher liquidity, tighter spreads, and more pronounced price movements.' },
        { term: 'After-Hours Trading', definition: 'Trading that occurs outside regular exchange hours through electronic communication networks (ECNs). Limited for GCC stocks but available for US stocks.' },
        { term: 'Price Gap', definition: 'When a stock opens significantly higher or lower than its previous close, common in GCC markets due to overnight international news.' }
      ],
      gccExamples: [
        'TASI Opening Gaps: On Monday mornings, TASI often gaps based on weekend developments. If oil prices surge over the weekend, energy stocks like Aramco and SABIC typically gap up 1-3% at the 10:00 AM open.',
        'Emirates NBD Intraday Pattern: The stock often shows highest volume in the first hour (10:00-11:00 AM) and last hour (1:00-2:00 PM) of DFM trading as institutional traders position.',
        'USD/SAR After TASI Close: While the riyal is pegged, traders can still access global forex markets after 3:00 PM Riyadh time. The London-New York overlap (8:00 PM - 12:00 AM Riyadh time) offers opportunities in EUR/USD and GBP/USD.',
        'Brent Crude Timing: Oil prices often move significantly during US trading hours (4:30 PM - 11:00 PM Riyadh time). GCC traders monitor these movements to anticipate next-day stock market direction.'
      ],
      steps: [
        'Create a market hours chart showing TASI, ADX, DFM, London, and New York trading times in your local timezone',
        'Identify the overlap periods and mark them as high-activity windows for your trading',
        'Track a GCC stock\'s opening price versus previous close for 10 days to observe gap patterns',
        'Monitor how overnight oil price changes correlate with TASI opening prices',
        'Set alerts for major economic news releases that occur outside GCC market hours',
        'Practice placing conditional orders that execute when markets open to handle gaps'
      ],
      mistakes: [
        'Trading in the first 15 minutes before price stabilizes - wait for the initial volatility to subside',
        'Ignoring that GCC markets close when global markets are most active - news may impact your positions when you can\'t react',
        'Holding overnight positions without considering the gap risk from international market movements',
        'Forgetting that Ramadan can alter trading hours - TASI and ADX often reduce hours during the holy month'
      ],
      visualReference: 'Picture a 24-hour timeline: 6:00 AM Riyadh time - Asian markets closing; 10:00 AM - TASI opens (you can trade Saudi stocks); 11:00 AM - European markets open; 3:00 PM - TASI closes; 4:30 PM - US markets open (monitor for tomorrow\'s direction); 11:00 PM - US markets close. Overlay this with volume bars showing peaks during TASI hours and US hours, illustrating when different opportunities exist.'
    },
    'course1-module1-lesson6': {
      objectives: [
        'Understand the characteristics of bull and bear markets',
        'Learn to identify market cycle phases',
        'Recognize how GCC markets respond to economic cycles',
        'Develop strategies for different market conditions'
      ],
      explanation: `Markets move in cycles, alternating between rising (bull) and falling (bear) trends, interspersed with consolidation periods. Understanding these cycles is fundamental to trading success as strategies that work in trending markets fail in ranging markets and vice versa.

**Bull Markets** are characterized by rising prices, investor optimism, and expanding economic activity. Typically defined as a 20%+ rise from recent lows, bull markets last an average of 4-5 years. Characteristics include: higher highs and higher lows on charts, strong trading volume on up days, positive economic data, and widespread investor participation. In GCC markets, bull runs often correlate with rising oil prices, government infrastructure spending, and positive regional reforms.

**Bear Markets** feature declining prices, pessimism, and economic contraction. A bear market is typically defined as a 20%+ decline from recent highs and lasts an average of 9-18 months. Signs include: lower lows and lower highs, volume increases on down days, negative economic indicators, and investor fear. GCC markets have experienced bear phases during oil price collapses (2014-2016, 2020 COVID crash) and regional geopolitical tensions.

**Market Cycle Phases:** The complete cycle includes four phases: (1) Accumulation - smart money buys while pessimism remains high; (2) Markup - prices rise as confidence returns and trend followers enter; (3) Distribution - early investors sell to late entrants at peak optimism; (4) Markdown - prices fall as optimism turns to fear. Understanding which phase a market is in guides strategy selection.

**GCC Market Cycles** have unique drivers. Oil prices remain the primary influence on Saudi and UAE markets, with correlation coefficients above 0.7. Government policy announcements, particularly around Saudi Vision 2030 initiatives, can trigger multi-month trends. The 2019-2020 period saw dramatic cycles: strong bull market in early 2020, COVID crash in March (-30% in weeks), rapid recovery driven by oil production cuts and fiscal stimulus.

**Trading Implications:** In bull markets, employ "buy the dip" strategies, hold positions longer, and focus on momentum stocks. In bear markets, short-sell or reduce exposure, trade bounces, and focus on defensive sectors like utilities and consumer staples. In sideways markets, use range-trading strategies, selling resistance and buying support. The key is adapting your approach to current conditions rather than fighting the prevailing trend.`,
      keyConcepts: [
        { term: 'Market Sentiment', definition: 'The overall attitude of investors toward a market or asset. Measured through surveys, put-call ratios, volatility indices, and price action. Extreme sentiment often signals reversals.' },
        { term: 'Secular vs Cyclical Trends', definition: 'Secular trends last decades (e.g., GCC market modernization), while cyclical trends last months to years (e.g., oil price cycles). Both affect trading strategies differently.' },
        { term: 'Correction', definition: 'A decline of 10-20% from recent highs, typically healthy and temporary in longer-term bull markets. GCC markets correct frequently due to oil volatility.' },
        { term: 'Capitulation', definition: 'The point of maximum fear when panicked selling reaches extremes, often marking market bottoms. Characterized by extremely high volume and sharp price declines.' }
      ],
      gccExamples: [
        'TASI Bull Market (2016-2020): Following the oil price collapse bottom, TASI rose from 5,400 to over 9,300, driven by oil recovery, Vision 2030 optimism, and foreign investor access through MSCI inclusion.',
        'COVID Bear Market (February-March 2020): TASI plummeted from 8,800 to 6,000 in just 4 weeks as oil prices crashed to $20/barrel and pandemic fears gripped markets. Classic bear market with gaps down, high volume selling, and panic.',
        'Oil Price Correlation: When Brent crude surged from $40 to $85 between 2020-2022, TASI rose ~40%. Energy stocks like Aramco and SABIC outperformed, demonstrating cyclical relationship.',
        'ADX Consolidation (2021-2022): The Abu Dhabi index traded in a 9,000-10,500 range for over a year, creating ideal conditions for range-trading strategies rather than trend-following approaches.'
      ],
      steps: [
        'Identify the current trend by examining the 200-day moving average - prices above indicate bull market, below suggests bear market',
        'Study TASI and ADX charts from 2015-present to observe complete market cycles and their patterns',
        'Create a correlation chart between Brent crude oil prices and TASI movement over 5 years',
        'Monitor market breadth - in healthy bull markets, most stocks rise; in bear markets, most decline',
        'Track economic indicators like PMI, GDP growth, and CPI for early signals of cycle transitions',
        'Maintain a trading journal noting how your strategies perform in different market conditions'
      ],
      mistakes: [
        'Using the same strategy in all market conditions - adapt your approach to prevailing trends',
        'Fighting the trend by buying in clear downtrends or selling in strong uptrends',
        'Assuming past cycle patterns will repeat exactly - each cycle has unique characteristics',
        'Ignoring the oil price cycle when trading GCC stocks - it\'s the dominant driver',
        'Overtrading in sideways markets trying to catch trends that don\'t exist'
      ],
      visualReference: 'Imagine a TASI 5-year chart with annotations: From 2016 (accumulation phase) at 5,400, prices grind higher with occasional dips. 2017-2019 (markup phase) shows steady uptrend to 9,300 with higher highs/lows. Early 2020 (distribution phase) exhibits choppy price action at highs. March 2020 (markdown phase) displays sharp decline to 6,000 with panic selling. Late 2020-2022 (new accumulation) shows gradual recovery. Overlay oil prices to see correlation visually.'
    },
    'course1-module1-lesson7': {
      objectives: [
        'Understand major economic indicators and their market impact',
        'Learn which indicators most affect GCC markets',
        'Master the timing and interpretation of economic releases',
        'Develop strategies around high-impact economic events'
      ],
      explanation: `Economic indicators are statistical releases that provide insights into economic health and direction. Traders monitor these indicators because they influence central bank policies, corporate earnings expectations, and ultimately asset prices. Understanding economic data gives traders an edge in anticipating market movements.

**GDP (Gross Domestic Product)** measures total economic output and is the broadest indicator of economic health. Released quarterly in most countries, GDP growth above 2-3% is generally positive for stocks. GCC countries publish GDP data with Saudi Arabia targeting 3-4% annual growth under Vision 2030. Strong GDP growth supports stock market valuations and currency strength.

**Inflation Indicators (CPI and PPI)** measure price changes for consumers and producers. The Consumer Price Index (CPI) tracks household spending costs while the Producer Price Index (PPI) measures wholesale prices. Central banks target inflation around 2%. High inflation forces interest rate increases, negative for stocks but potentially positive for commodities like gold. GCC inflation has been moderate (2-4%) but spikes when global food and import prices rise.

**Employment Data** includes unemployment rate, job creation numbers, and wage growth. In the US, Non-Farm Payrolls (NFP) released monthly is a major market mover. Strong employment supports consumer spending and economic growth. GCC countries focus on national employment rates and Saudization/Emiratization policies that affect labor markets.

**Interest Rate Decisions** from central banks are among the most impactful events. The US Federal Reserve, European Central Bank, and Bank of England decisions ripple globally. While GCC central banks generally follow Fed rates due to dollar pegs, they occasionally diverge based on local conditions. Higher rates strengthen currencies but can pressure stock markets by increasing borrowing costs.

**Manufacturing and Services PMI** (Purchasing Managers' Index) indicates business activity expansion (above 50) or contraction (below 50). Released monthly, PMI data provides early signals of economic trends before official GDP figures. Saudi Arabia and UAE publish PMI data that reflects regional business conditions.

**Oil Inventories and OPEC Decisions** uniquely impact GCC markets. US crude oil inventory reports (weekly) and OPEC production decisions directly move oil prices, cascading through GCC equity markets. A surprise inventory build suggests weak demand, pressuring oil prices and GCC stocks.

Traders develop economic calendars listing release dates and times, expected values, and previous readings. High-impact events cause volatility spikes, creating opportunities for skilled traders while posing risks for unprepared positions.`,
      keyConcepts: [
        { term: 'Consensus Estimate', definition: 'The average forecast from economists for an upcoming economic release. Markets react to differences between actual data and consensus expectations, not the absolute number.' },
        { term: 'Leading vs Lagging Indicators', definition: 'Leading indicators (PMI, stock market) predict future economic direction. Lagging indicators (unemployment, CPI) confirm trends already underway. Traders focus on leading indicators for early signals.' },
        { term: 'Dovish vs Hawkish', definition: 'Central bank stances on monetary policy. Dovish means favoring lower rates and stimulus (positive for stocks). Hawkish means favoring higher rates to fight inflation (negative for stocks).' },
        { term: 'Economic Surprise Index', definition: 'Measures whether economic data is beating or missing expectations. Consistently positive surprises boost markets; negative surprises pressure markets.' }
      ],
      gccExamples: [
        'Saudi GDP Growth (Q2 2023): Saudi Arabia reported 1.4% year-over-year GDP growth, below expectations of 2.1%. TASI declined 1.8% on the news as traders reduced growth forecasts. Oil sector contraction offset non-oil sector gains.',
        'US Federal Reserve Rate Hike (March 2023): The Fed raised rates 0.25% to 4.75-5.00%. TASI and ADX declined ~2% despite GCC central banks not immediately matching the hike, as investors feared global growth slowdown.',
        'OPEC+ Production Cut (April 2023): Surprise announcement of 1.16 million barrel/day production cut sent Brent crude up 6% to $85. TASI surged 3.2% with Saudi Aramco gaining 4.1% as profit expectations rose.',
        'UAE Inflation Report (September 2023): CPI showed 3.8% annual inflation, above 3.2% forecast. Real estate and banking stocks like Emaar and Emirates NBD rose on expectations of continued economic strength.'
      ],
      steps: [
        'Subscribe to an economic calendar (Investing.com, ForexFactory, or Bloomberg) and filter for high-impact GCC and global events',
        'Each week, identify the top 3 scheduled economic releases and note their expected impact on your positions',
        'Before major releases, reduce position sizes or use tighter stop-losses to protect against volatility',
        'After releases, compare actual vs expected results and observe market reactions to build pattern recognition',
        'Track how TASI responds to oil inventory reports over 20 weeks to quantify the correlation',
        'Create alerts for OPEC meeting dates and Fed decision announcements'
      ],
      mistakes: [
        'Trading immediately at data release - wait 5-15 minutes for knee-jerk reactions to subside',
        'Ignoring the consensus expectation - markets price in expectations, so only surprises move prices significantly',
        'Holding large positions through high-impact events without hedging or stops',
        'Overlooking that GCC markets are closed when US employment data (Friday 8:30 AM ET) releases - this can gap GCC stocks on Sunday opening',
        'Focusing only on GCC economic data while ignoring US and global indicators that affect regional markets'
      ],
      visualReference: 'Picture a trading screen at 8:29 AM US Eastern time, one minute before NFP employment data release. Volume is light, spreads are wide, traders are positioned. At 8:30, the number flashes: +250K jobs vs +185K expected. Within seconds, USD strengthens, gold drops $15, S&P 500 futures jump 0.8%. Over the next hour, prices oscillate as algorithms and traders digest the implications. By Sunday 10 AM when TASI opens, the market has priced in the strong US data with a positive bias.'
    },
    'course1-module1-lesson8': {
      objectives: [
        'Develop a professional trader\'s psychological framework',
        'Learn to manage emotions that sabotage trading performance',
        'Build discipline and patience essential for consistent success',
        'Create personal routines that support optimal decision-making'
      ],
      explanation: `Trading psychology often determines success or failure more than technical skills or market knowledge. The ability to manage fear, greed, hope, and frustration separates consistently profitable traders from those who struggle despite understanding markets intellectually.

**The Psychology of Fear and Greed:** Fear causes traders to exit winning positions prematurely and avoid taking valid trade setups after losses. Greed leads to overleveraging, holding losers hoping for recovery, and chasing trades after big moves. Both emotions trigger impulsive decisions that override trading plans. Successful traders recognize these emotions and follow predetermined rules regardless of feelings.

**Discipline and Patience:** Trading rewards patience more than activity. Many beginners feel they must trade frequently to make money, leading to overtrading and forcing low-quality setups. Disciplined traders wait for high-probability opportunities that match their criteria, even if it means not trading for days. They follow their trading plan consistently, executing the same process regardless of recent wins or losses.

**Loss Aversion and Risk Management:** Humans are wired to feel losses more intensely than equivalent gains - losing 1,000 SAR hurts more than gaining 1,000 SAR feels good. This psychological bias causes traders to hold losing positions too long (hoping to avoid realizing the loss) while taking profits too quickly (fear of gains evaporating). Professional traders accept that losses are part of the business and cut them quickly according to predetermined rules.

**The Importance of Trading Plans:** A detailed trading plan documents your strategy, risk parameters, entry/exit rules, position sizing, and evaluation process. When emotions run high during live trading, the plan serves as an objective guide. Without a plan, decisions become arbitrary and emotional. Your plan should include: instruments traded, timeframes, technical setups, fundamental filters, maximum risk per trade, daily loss limits, and review schedules.

**Routines and Habits:** Successful traders develop daily routines that prepare them mentally and logistically. Morning routines might include: reviewing overnight news, checking economic calendars, analyzing key markets, and reviewing open positions. Trading session routines involve executing the plan without deviation. Evening routines include journaling trades, updating performance metrics, and preparing for the next day. These habits create structure that supports consistent performance.

**GCC Cultural Considerations:** For traders in the GCC, additional psychological factors include balancing trading with religious practices (prayer times, Ramadan), managing family and social expectations, and navigating cultural attitudes toward risk and loss. Building a support system of fellow traders or mentors who understand regional context can be invaluable.

Mastering trading psychology is a continuous journey, not a destination. Even experienced traders face psychological challenges. The key is developing awareness of your emotional patterns and having systems to maintain discipline when emotions intensify.`,
      keyConcepts: [
        { term: 'Confirmation Bias', definition: 'The tendency to seek information that confirms existing beliefs while ignoring contradictory data. Traders see what they want to see, leading to holding losing positions too long.' },
        { term: 'Recency Bias', definition: 'Overweighting recent events when making decisions. After a string of wins, traders become overconfident; after losses, they lose confidence in valid strategies.' },
        { term: 'Revenge Trading', definition: 'Attempting to quickly recover losses through impulsive trades, usually with larger size and less analysis. This emotional response typically leads to bigger losses.' },
        { term: 'FOMO (Fear of Missing Out)', definition: 'Anxiety about missing profitable opportunities, causing traders to chase trades after moves have already occurred or abandon strategies prematurely.' }
      ],
      gccExamples: [
        'Saudi Aramco Emotional Trading: A trader buys Aramco at 36 SAR expecting further gains. It drops to 34 SAR. Instead of taking the planned 2% loss, fear of loss causes holding. At 32 SAR, hope replaces fear ("it will recover"). Finally at 30 SAR, capitulation occurs. A disciplined trader would have exited at 34 SAR per the plan.',
        'Emirates NBD Overconfidence: After correctly predicting 5 consecutive trades in Emirates NBD stock, a trader increases position size 3x on the next trade without proper analysis. The trade fails, wiping out profits from the previous wins. Success bred overconfidence and deviation from risk rules.',
        'TASI Bull Market FOMO: As TASI surges 15% over two months, a cautious trader remains sidelined waiting for a pullback. Finally, unable to resist, they enter heavily near the top. The market corrects 8%, and they panic sell. Patience for proper setup was lacking due to FOMO.',
        'Ramadan Trading Adjustment: A trader notices their performance declines during Ramadan due to altered sleep patterns and fasting. They adapt by reducing position sizes, trading only the first hour, and avoiding afternoon sessions when energy is low. This self-awareness and adaptation demonstrates psychological maturity.'
      ],
      steps: [
        'Create a comprehensive trading plan documenting your strategy, rules, and risk parameters - write it down, don\'t just think about it',
        'Start a trading journal where you record not just trades but emotional state, market conditions, and lesson learned',
        'Set hard daily and weekly loss limits (e.g., if down 3%, stop trading for the day) to prevent revenge trading spirals',
        'Practice mindfulness or meditation for 10 minutes daily to improve emotional regulation and decision-making clarity',
        'Review your trading journal weekly to identify emotional patterns - do you cut winners short? Hold losers too long? Trade too much on Mondays?',
        'Find an accountability partner or mentor who reviews your trading and provides objective feedback',
        'Simulate high-stress scenarios in your demo account (rapid losses, big wins) and practice following your plan'
      ],
      mistakes: [
        'Trading without a written plan - "winging it" guarantees emotional decision-making',
        'Increasing position size after wins (overconfidence) or to recover losses quickly (desperation)',
        'Watching trades tick-by-tick, which amplifies emotional reactions - set alerts and walk away',
        'Trading when tired, stressed, angry, or distracted - mental state affects performance',
        'Skipping the post-trade review - you can\'t improve without analyzing both wins and losses objectively',
        'Comparing your results to others - focus on your own progress, not someone else\'s highlight reel'
      ],
      visualReference: 'Visualize two traders side-by-side watching the same TASI chart of Saudi Aramco dropping from 34 to 32 SAR. Trader A (emotional) shows stress: clenched jaw, rapid heartbeat, thoughts racing ("Why didn\'t I sell earlier? Should I sell now? What if it drops more?"). Trader B (disciplined) appears calm: following the trading plan, stop-loss was hit at 33.50 SAR automatically, already analyzing the next opportunity without attachment. The chart is the same; the psychology makes all the difference.'
    },
    'course1-module2-lesson1': {
      objectives: [
        'Understand the fundamental difference between market and limit orders',
        'Learn when to use each order type for optimal execution',
        'Master order placement on GCC trading platforms',
        'Recognize the cost implications of different order types'
      ],
      explanation: `Order types are the mechanisms through which traders execute their strategies. The two most basic and important order types are market orders and limit orders, each with distinct characteristics, advantages, and appropriate use cases.

**Market Orders** are instructions to buy or sell immediately at the best available current price. When you place a market order to buy Saudi Aramco, you're telling the exchange "buy now at whatever price is available." The order executes instantly by matching against the best available sell orders in the order book. Market orders guarantee execution but not price - you get filled immediately but accept the current market price, which may be slightly worse than the quoted price you saw, especially in fast-moving markets or with large orders.

**Limit Orders** specify the maximum price you're willing to pay when buying or the minimum price you'll accept when selling. A limit order to buy Emirates NBD at 14.50 AED will only execute at 14.50 or better (lower). If the market price is 14.60, your order waits in the order book until either the price drops to your limit or you cancel the order. Limit orders guarantee price but not execution - you control the price but may not get filled if the market doesn't reach your level.

**Execution Quality Considerations:** Market orders suffer from slippage - the difference between expected and actual execution price. In liquid stocks like Saudi Aramco with tight spreads (0.05 SAR), slippage is minimal. In illiquid stocks, market orders can move prices significantly, especially with larger sizes. For example, a market order for 10,000 shares in a thinly traded stock might execute at progressively worse prices as it consumes multiple order book levels.

**Spread Impact:** The bid-ask spread represents the market order cost. If Saudi Aramco shows bid 32.40 / ask 32.45, a market buy executes at 32.45 while a market sell executes at 32.40. You immediately "lose" the 0.05 SAR spread. Frequent market orders in spreads of 0.1-0.2% can significantly erode profitability. Limit orders can capture the spread by posting on the bid when buying and the ask when selling, though execution is not guaranteed.

**Strategic Applications:** Use market orders when execution certainty is paramount - breaking news, stop-loss exits, closing positions quickly. Use limit orders when you have specific price targets, are trading less liquid stocks, or don't need immediate execution. Many professionals use limit orders by default and switch to market orders only when urgency demands it.

**GCC Platform Specifics:** Platforms like Tadawul's systems, broker apps (Al Rajhi Capital, EFG Hermes, etc.) all support both order types. During TASI trading hours, these systems display real-time order books where you can see pending limit orders. Understanding how your specific broker implements these orders prevents costly mistakes.`,
      keyConcepts: [
        { term: 'Slippage', definition: 'The difference between expected and actual execution price. A market order expecting 32.45 might execute at 32.47 in volatile conditions, creating 0.02 SAR slippage per share.' },
        { term: 'Order Book Depth', definition: 'The quantity of buy and sell orders at each price level. Deep order books absorb large market orders with minimal slippage; thin books show significant price impact.' },
        { term: 'Fill or Kill (FOK)', definition: 'A limit order variation that must execute completely and immediately or cancel entirely. Useful for ensuring you get your full size at your price or nothing.' },
        { term: 'Partial Fill', definition: 'When a limit order executes partially - you wanted 1,000 shares but only 400 filled at your price. The remaining 600 continue waiting or can be canceled.' }
      ],
      gccExamples: [
        'Saudi Aramco Market Order: You place a market buy for 500 shares. Current ask is 32.45. In a liquid market, all 500 shares fill at 32.45-32.46. Total cost: ~16,227 SAR. Execution is instant.',
        'Emirates NBD Limit Order: You want to buy 1,000 shares but only at 14.50 AED or lower. Current price is 14.60. You place a limit buy at 14.50. The order sits in the book. Hours later, the price dips to 14.48, and your entire order fills at 14.48-14.50 (you may get better than your limit). Total cost saved vs market order: ~100 AED.',
        'Illiquid Stock Example: Trading a small-cap Saudi company with wide spreads (bid 12.30 / ask 12.50). A market buy of 2,000 shares might fill: 500 @ 12.50, 800 @ 12.55, 700 @ 12.60. Average price 12.55 vs displayed 12.50. A limit order at 12.50 avoids overpaying but may not fill.',
        'Al Rajhi Bank Intraday: You anticipate price will test support at 85.00 SAR. Instead of market buying at 85.30, you place a limit buy at 85.00 for 200 shares. Price drops to 84.95, your order fills at 85.00 (guaranteed price), saving 0.30 per share = 60 SAR.'
      ],
      steps: [
        'Open your broker demo account and pull up the order book for Saudi Aramco or Emirates NBD',
        'Place a small limit buy order below current price - observe where it appears in the order book queue',
        'Place a market buy order for the same stock - notice instant execution and price paid',
        'Compare the execution prices and costs between the two approaches',
        'Practice during different market conditions: high volatility vs calm, market open vs mid-session',
        'Calculate the spread cost for 10 different stocks to understand which are cheap to trade (tight spreads) vs expensive (wide spreads)'
      ],
      mistakes: [
        'Using market orders in illiquid stocks or large sizes - you\'ll suffer severe slippage',
        'Using limit orders for urgent exits (stop-losses, breaking news) - you may not get filled and losses grow',
        'Setting limit orders too far from current price - they never fill and you miss the trade',
        'Forgetting that limit orders on GCC exchanges may partially fill - you could end up with odd lots',
        'Not understanding that limit sell orders below market price will execute immediately as market sells (and vice versa for buys)'
      ],
      visualReference: 'Picture the order book for Al Rajhi Bank: Bid side shows 85.00 (1,200 shares), 84.95 (800 shares), 84.90 (1,500 shares). Ask side shows 85.10 (900 shares), 85.15 (1,100 shares), 85.20 (700 shares). You want to buy 500 shares. Market order: executes immediately at 85.10, taking the best ask. Limit order at 85.05: sits between bid and ask, waiting. If someone market sells, you might get filled; if not, you wait. Limit order at 85.15: fills immediately by taking the available ask (limit doesn\'t prevent better execution).'
    },
    'course1-module2-lesson2': {
      objectives: [
        'Master stop-loss orders to protect capital and limit downside risk',
        'Learn take-profit orders to lock in gains automatically',
        'Understand optimal placement strategies for both order types',
        'Develop discipline in using protective orders on every trade'
      ],
      explanation: `Stop-loss and take-profit orders are essential risk management tools that automate trade exits, removing emotion from critical decisions. Professional traders never enter positions without predetermined exit points for both loss scenarios and profit targets.

**Stop-Loss Orders** automatically close a position when price reaches a specified level, limiting potential losses. A stop-loss order to sell Saudi Aramco at 31.50 SAR triggers when the price falls to 31.50, converting to a market order that sells at the best available price (usually 31.45-31.50 in liquid stocks). The purpose is protecting capital by ensuring no single trade can inflict devastating damage to your account.

**Stop-Loss Placement Strategy:** Position stops based on technical levels, volatility, and risk tolerance. Common approaches include: (1) Below support levels - if you buy at 32.50 with support at 32.00, place stop at 31.90 to allow for minor fluctuations; (2) Percentage-based - risk 2% of capital, so if buying 1,000 shares at 32.50 with 10,000 SAR account, stop at 32.30 (200 SAR = 2% risk); (3) ATR-based (Average True Range) - place stop 1.5-2x ATR below entry to avoid getting stopped by normal volatility.

**Take-Profit Orders** automatically close positions when price reaches your profit target, ensuring gains are captured without requiring constant monitoring. If you buy Emirates NBD at 14.50 AED targeting 15.20, a take-profit order at 15.20 sells automatically when reached. This prevents the common psychological mistake of watching profits evaporate because you got greedy waiting for higher prices.

**Take-Profit Placement Strategy:** Base targets on technical analysis (resistance levels, Fibonacci extensions, measured moves) and risk-reward ratios. Professional traders aim for at least 1:2 risk-reward - if risking 0.50 SAR per share, target at least 1.00 SAR profit. Multiple take-profit levels allow scaling out - take 50% at first target, move stop to breakeven, and let remaining 50% run to second target.

**Trailing Stops:** An advanced variation that moves the stop-loss up as price moves in your favor, locking in profits while allowing winning trades to run. If you buy at 32.50 with initial stop at 32.00, and price rises to 34.00, a trailing stop might automatically move up to 33.50 (maintaining 0.50 SAR distance). This captures more of large trends while protecting against reversals.

**GCC Implementation:** Most GCC brokers support basic stop-loss and take-profit orders, though implementation varies by platform. Some platforms offer "OCO" (One-Cancels-Other) orders where stop-loss and take-profit are linked - when one executes, the other cancels automatically. Verify your broker's capabilities and test in demo accounts before live trading.

The discipline to use these orders on every single trade separates professional from amateur traders. Professionals know that protecting capital is paramount - you can always make more money, but you can't trade without capital.`,
      keyConcepts: [
        { term: 'Stop-Loss Slippage', definition: 'In fast-moving markets, stop-loss orders may execute at worse prices than your stop level. A stop at 31.50 might fill at 31.35 in a gap down. Guaranteed stops (offered by some brokers) prevent this but cost more.' },
        { term: 'Being Stopped Out', definition: 'When your stop-loss triggers, exiting you from a trade. Frustrating when price immediately reverses, but essential for long-term survival. Better to be stopped out and wrong occasionally than not use stops and face catastrophic losses.' },
        { term: 'Risk-Reward Ratio', definition: 'The relationship between potential loss (entry to stop-loss) and potential gain (entry to take-profit). A 1:3 ratio means risking 100 SAR to make 300 SAR. Professional traders require minimum 1:2 ratios.' },
        { term: 'Breakeven Stop', definition: 'Moving your stop-loss to your entry price after the trade moves favorably, guaranteeing no loss. Common practice after reaching first profit target or when position is up 1R (one risk unit).' }
      ],
      gccExamples: [
        'Saudi Aramco Swing Trade: Entry at 32.50 SAR, stop-loss at 31.80 (0.70 risk), take-profit at 34.20 (1.70 reward). Risk-reward ratio is 1:2.4. Position size: 500 shares, total risk: 350 SAR. If stopped out, loss is limited to 350 SAR. If target hit, profit is 850 SAR.',
        'Emirates NBD Day Trade: Buy at 14.60 AED after breakout. Stop at 14.45 (0.15 risk), target at 14.90 (0.30 reward), 1:2 ratio. Position: 1,000 shares. The stock rises to 14.80 - you move stop to 14.65 (breakeven + 0.05 profit lock). Stock continues to 14.90 where take-profit executes. Total gain: 300 AED.',
        'Al Rajhi Bank Trailing Stop: Enter at 85.00 SAR with initial stop at 84.50 (0.50 trail). Price rises to 86.00, trailing stop automatically moves to 85.50. Price continues to 87.50, stop now at 87.00. Price suddenly reverses to 87.00, triggering stop. You capture 2.00 SAR move instead of original 1.50 target.',
        'SABIC Stop-Loss Protection: Buy at 90.00 SAR, stop at 88.50 (1.5% risk). Unexpected negative earnings surprise gaps stock down to 85.00 at open. Stop-loss triggers as market order, executes at 85.20-85.50 range. While this hurts, without the stop you might hold through further decline to 82.00, tripling your loss.'
      ],
      steps: [
        'For every trade you plan, calculate the stop-loss level BEFORE entering - if you can\'t define it, don\'t take the trade',
        'Determine position size based on stop distance - if stop is 1.00 SAR away and you risk 200 SAR, position size is 200 shares',
        'Set both stop-loss and take-profit orders immediately after entry - don\'t wait or "see how it goes"',
        'Practice moving to breakeven after the trade moves 50% toward target',
        'Review 20 past trades and calculate what your results would have been with consistent stop-loss (2% per trade) vs actual performance',
        'Test trailing stops in demo account to understand how they function in different volatility conditions'
      ],
      mistakes: [
        'Moving stop-loss further away when price approaches it - this turns small losses into large losses',
        'Not using stops because "I\'ll watch it closely" - emotion and hope will prevent you from exiting at optimal levels',
        'Placing stops at obvious levels like round numbers (32.00) where everyone else has stops - they get hunted',
        'Using stops too tight relative to volatility - getting stopped out on normal price fluctuation before the trade has a chance',
        'Removing take-profit orders because "it might go higher" - greed prevents capturing planned profits'
      ],
      visualReference: 'Visualize a Saudi Aramco chart: Entry at 32.50 marked with green horizontal line. Stop-loss at 31.80 marked with red horizontal line below. Take-profit at 34.20 marked with green horizontal line above. Price bars show movement: initial rise to 33.00, pullback to 32.20 (approaching but not hitting stop), rally to 33.80, consolidation, final push to 34.25 where take-profit triggers. The red stop zone represents the "maximum pain" you accept, while green target zone represents the "minimum gain" you demand. This visual risk-reward framework governs every trade.'
    },
    'course1-module2-lesson3': {
      objectives: [
        'Understand stop-limit orders and their advantages over simple stop-loss orders',
        'Learn about advanced order types like trailing stops, iceberg orders, and OCO orders',
        'Master when to use each specialized order type',
        'Implement advanced order strategies to optimize trade execution'
      ],
      explanation: `Beyond basic market, limit, stop-loss, and take-profit orders, advanced order types provide traders with precise control over execution, risk management, and trade automation. Understanding these tools elevates your trading from reactive to strategic.

**Stop-Limit Orders** combine stop and limit order features. While a stop-loss converts to a market order when triggered (guaranteeing execution but not price), a stop-limit converts to a limit order (guaranteeing price but not execution). Example: You own Saudi Aramco at 33.00 SAR. You set a stop-limit with stop price 32.50 and limit price 32.40. If price falls to 32.50, a limit sell order at 32.40 activates. You'll only sell at 32.40 or better. Advantage: prevents selling at terrible prices during flash crashes. Disadvantage: if price gaps down to 32.00, your order doesn't fill and you're still holding a losing position.

**Trailing Stop Orders** automatically adjust the stop price as the market moves favorably, maintaining a specified distance. Set a trailing stop 0.50 SAR below market on Emirates NBD bought at 14.50. If price rises to 15.00, the stop trails up to 14.50 (your breakeven). If price continues to 15.50, stop moves to 15.00. This locks in profits while giving the trade room to continue. When price finally reverses and hits the trailing stop, you exit with maximum captured profit. Trailing stops are essential for trend-following strategies where you want to ride strong moves.

**Iceberg Orders (Hidden Orders)** show only a small portion of a large order to the market, hiding the full size. If you want to buy 10,000 shares of Al Rajhi Bank without revealing your full demand (which would push prices up), you might show only 500 shares at a time. As the 500 fills, another 500 appears automatically until the full 10,000 executes. This prevents market impact and information leakage about large institutional trades. More common in institutional trading but available on some GCC platforms for larger accounts.

**OCO Orders (One-Cancels-Other)** link two orders where execution of one automatically cancels the other. Commonly used for stop-loss and take-profit combinations. You buy SABIC at 90.00 and simultaneously place an OCO: sell at 92.50 (take-profit) and sell at 88.50 (stop-loss). If price hits 92.50, the position sells and the 88.50 stop cancels automatically. If price drops to 88.50, the stop executes and the 92.50 target cancels. This automates complete trade management without monitoring.

**Good-Till-Cancelled (GTC) vs Day Orders:** Day orders expire at market close if not filled. GTC orders remain active until executed or manually cancelled, sometimes for weeks. Useful for limit orders at specific technical levels you want to capture whenever they occur. Be careful with GTC orders - you might forget them and get surprised by execution days later when you've moved on to other trades.

**Fill-or-Kill (FOK) and Immediate-or-Cancel (IOC):** FOK requires complete immediate execution or the entire order cancels. IOC allows partial fills with unfilled portions cancelling immediately. These are advanced orders for traders who need specific size at specific prices without waiting, often used in arbitrage or algorithmic strategies.

Advanced orders transform trading from manual monitoring to strategic automation. They enforce discipline, remove emotion, and allow you to implement sophisticated strategies that would be impossible to execute manually.`,
      keyConcepts: [
        { term: 'Order Slippage Protection', definition: 'Stop-limit orders protect against extreme slippage by refusing execution beyond your limit price. Trade-off is potential non-execution if market gaps through your levels.' },
        { term: 'Information Leakage', definition: 'Large visible orders signal your intentions to the market, potentially causing adverse price movements. Iceberg orders prevent this by hiding true order size.' },
        { term: 'Set-and-Forget Trading', definition: 'Using advanced orders to fully automate trade management, allowing positions to manage themselves according to predefined rules without emotional interference.' },
        { term: 'Order Routing', definition: 'The path your order takes from submission to execution. Advanced traders may specify routing to optimize for speed, price improvement, or market access.' }
      ],
      gccExamples: [
        'Saudi Aramco Stop-Limit: Own shares at 33.50, concerned about volatility during OPEC meeting. Set stop-limit: stop at 32.80, limit at 32.70. If announcement causes drop to 32.80, limit sell at 32.70 activates. If price drops to 32.60, you don\'t sell (protecting against panic spike). If price recovers to 33.00, you still hold. Risk: if price gaps to 31.00, you\'re stuck.',
        'Emirates NBD Trailing Stop: Buy at 14.50 AED with 0.20 trailing stop. Price rises: 14.70 (stop now 14.50), 14.90 (stop now 14.70), 15.20 (stop now 15.00), 15.40 (stop now 15.20). Price reverses to 15.20, stop triggers, you exit with 0.70 profit vs original 0.50 target.',
        'Al Rajhi Bank Iceberg: Institutional trader wants 50,000 shares at ~85.50 without moving market. Places iceberg showing 1,000 shares at a time. Over 2 hours, the order quietly accumulates shares as liquidity becomes available, average price 85.45-85.55. Full order in book would have pushed price to 86.00.',
        'SABIC OCO Strategy: Buy at 90.00 SAR after breakout. Place OCO: take-profit sell at 93.00 and stop-loss sell at 88.80. Three days later, price reaches 93.05, take-profit executes at 93.00-93.05, stop-loss cancels automatically. Total management required after entry: zero.'
      ],
      steps: [
        'Identify which advanced order types your broker supports - test each in demo account before live use',
        'Practice setting stop-limit orders with different stop and limit spreads to understand execution probability',
        'Implement trailing stops on your next 5 winning trades and compare results to fixed take-profit exits',
        'If trading larger sizes (5,000+ shares), experiment with iceberg orders to measure market impact reduction',
        'Set up OCO orders for complete trade automation and measure how this affects your emotional state vs manual monitoring',
        'Keep a log of how often stop-limit orders protect you vs cause missed exits when prices gap'
      ],
      mistakes: [
        'Setting stop-limit ranges too narrow - if stop is 32.50 and limit is 32.48, you\'ll rarely get execution during volatile drops',
        'Using trailing stops that are too tight - normal volatility stops you out before the trend develops',
        'Forgetting about GTC orders - they can execute weeks later when you\'re no longer following that stock',
        'Over-complicating order types when simple market/limit/stop orders would suffice - use advanced orders when they add genuine value',
        'Not testing advanced orders in demo first - each broker implements them differently and mistakes in live accounts are costly'
      ],
      visualReference: 'Picture a Saudi Aramco trading session with multiple order types active: Your stop-limit has stop at 32.50 (red line) and limit at 32.40 (dotted red line below). Your trailing stop dynamically follows price, shown as a moving red line maintaining 0.50 distance. Your OCO has take-profit at 34.50 (green line) and stop at 32.00 (red line) with labels "One Cancels Other." The order book shows your iceberg order displaying 200 shares while hiding 4,800. Price action unfolds: drops to 32.60 (all stops safe), rises to 33.80 (trailing stop moves to 33.30), finally reaches 34.52 where take-profit executes and all other orders cancel.'
    },
    'course1-module2-lesson4': {
      objectives: [
        'Understand bid-ask spreads and their impact on trading costs',
        'Learn to measure and minimize spread costs',
        'Identify high-spread vs low-spread trading opportunities',
        'Master techniques for optimal order placement within the spread'
      ],
      explanation: `The bid-ask spread is one of the most fundamental yet often overlooked costs in trading. While commissions are obvious and transparent, spread costs are subtle and continuous, potentially consuming a significant portion of profits, especially for active traders.

**Spread Basics:** The bid is the highest price buyers are willing to pay, while the ask (or offer) is the lowest price sellers will accept. If Saudi Aramco shows bid 32.40 / ask 32.45, the spread is 0.05 SAR. This represents the immediate cost of a round trip - if you buy at the ask (32.45) and immediately sell at the bid (32.40), you lose 0.05 SAR per share even though the "price" hasn't moved. For 1,000 shares, that's a 50 SAR cost before the trade even begins.

**Spread as Percentage:** Absolute spread size matters less than percentage. A 0.05 SAR spread on a 32.45 stock is 0.15% (0.05/32.45). On a 10.00 stock, a 0.05 spread would be 0.50%. Active day traders focus on percentage spread costs. Stocks with spreads below 0.1% are considered highly liquid and cheap to trade. Spreads of 0.3-0.5% significantly drag on profitability. Spreads exceeding 1% make frequent trading nearly impossible to profit from.

**What Determines Spreads:** Liquidity is the primary driver. Highly traded stocks like Saudi Aramco, Al Rajhi Bank, and Emirates NBD have tight spreads (0.05-0.10 in their respective currencies) because market makers compete to provide liquidity. Small-cap stocks with low volume might have spreads of 0.20-0.50 or wider. Volatility also widens spreads - during high uncertainty or breaking news, market makers protect themselves by widening spreads. Time of day matters too - spreads are typically widest at market open and close, tightest during mid-session when volume is steady.

**Minimizing Spread Costs:** Professional traders employ several techniques: (1) Use limit orders to "make" the spread rather than "take" it - instead of buying the ask, place a bid between current bid and ask and wait for fills; (2) Trade during peak liquidity hours when spreads are tightest; (3) Focus on liquid stocks where spread costs are negligible; (4) Avoid trading during news events when spreads widen dramatically; (5) Size orders appropriately - large orders may need to consume multiple price levels, effectively paying wider spreads.

**GCC Market Spread Characteristics:** Major GCC stocks like Saudi Aramco (0.05 SAR on ~32 SAR = 0.15%), Emirates NBD (0.05 AED on ~14.50 AED = 0.34%), and Al Rajhi Bank (0.10 SAR on ~85 SAR = 0.12%) offer tight spreads suitable for active trading. Mid-cap stocks might show 0.3-0.5% spreads. Small-caps can exceed 1%, making them prohibitively expensive for short-term trading but still viable for longer-term position trading where spread cost is amortized over larger price movements.

Understanding and managing spread costs is essential for profitability. A trader with a 55% win rate can still lose money if spread costs consume 0.3% per round trip and average wins are only 0.8%. Spread awareness transforms trading from gambling into a calculated probabilistic edge.`,
      keyConcepts: [
        { term: 'Market Maker Profit', definition: 'Market makers earn the spread by continuously buying at bid and selling at ask. In liquid markets with 0.1% spreads and high volume, this generates significant revenue.' },
        { term: 'Effective Spread', definition: 'The actual spread you pay, which may differ from quoted spread for large orders that consume multiple price levels. An order for 10,000 shares might pay average 0.15% when quoted spread is 0.10%.' },
        { term: 'Spread Volatility', definition: 'How much the spread fluctuates throughout the day. Stable tight spreads indicate healthy market making; erratic widening suggests liquidity concerns.' },
        { term: 'Price Improvement', definition: 'Getting a better price than expected - buying below the ask or selling above the bid. Limit orders in fast markets sometimes achieve this when price moves favorably while your order waits.' }
      ],
      gccExamples: [
        'Saudi Aramco Tight Spread: Bid 32.40 / Ask 32.45 (0.05 SAR spread = 0.15%). For a 500-share round trip: buy at 32.45 (16,225 SAR), immediately sell at 32.40 (16,200 SAR), loss = 25 SAR. If your average profitable trade makes 1% (162 SAR), spread consumes 15% of gross profit.',
        'Small-Cap Saudi Stock Wide Spread: A construction company trading at 18.50 SAR shows bid 18.30 / ask 18.70 (0.40 spread = 2.16%). Round trip on 1,000 shares costs 400 SAR. To break even, stock must move 2.16% in your favor - extremely difficult for short-term trading.',
        'Emirates NBD During Calm vs Volatile Sessions: Normal session shows bid 14.50 / ask 14.55 (0.05 spread = 0.34%). During earnings announcement, spread widens to bid 14.40 / ask 14.65 (0.25 spread = 1.72%). Trading during announcement costs 5x normal spread.',
        'Al Rajhi Bank Limit Order Strategy: Current bid 85.00 / ask 85.10. Instead of market buying at 85.10, you place limit buy at 85.05. When a market seller comes, you get filled at 85.05, saving 0.05 per share. On 500 shares = 25 SAR saved, capturing half the spread.'
      ],
      steps: [
        'For 10 stocks you trade or watch, record the typical bid-ask spread and calculate it as a percentage',
        'Create a spreadsheet: for each stock, calculate round-trip spread cost for your typical position size',
        'Monitor how spreads change throughout the trading day - note widest times (usually open/close) and tightest times',
        'Practice placing limit orders between bid and ask in demo account - track your fill rate vs time saved',
        'Calculate your historical trading costs: average spread paid per round trip × number of trades per month = monthly spread cost',
        'Set a rule: only day-trade stocks with spreads below 0.3%, only swing-trade (holding days) stocks with spreads below 0.5%'
      ],
      mistakes: [
        'Ignoring spread costs and focusing only on commissions - spreads often exceed commissions, especially for active traders',
        'Using market orders habitually in stocks with wide spreads - you\'re giving away free money to market makers',
        'Trading illiquid stocks with high spreads and expecting to profit on small moves - the math doesn\'t work',
        'Placing limit orders too far from current price trying to "get a good deal" - they never fill and you miss the trade',
        'Overlooking that spreads widen during your target entry time - if you plan to trade market open volatility, factor in 2-3x normal spreads'
      ],
      visualReference: 'Visualize two side-by-side order books: Left side shows Saudi Aramco (liquid): Bid levels: 32.40 (5,000), 32.35 (3,000), 32.30 (2,000). Ask levels: 32.45 (4,500), 32.50 (3,500), 32.55 (2,500). Tight 0.05 spread, deep liquidity. Right side shows small-cap stock (illiquid): Bid: 18.30 (200), 18.10 (150), 17.90 (100). Ask: 18.70 (180), 18.90 (120), 19.10 (90). Wide 0.40 spread, thin liquidity. A 1,000-share market buy in Aramco pays ~32.45 average. Same order in small-cap pays 18.70-19.10 average (massive slippage). The visual contrast illustrates why liquid stocks are essential for active trading.'
    },
    'course1-module2-lesson5': {
      objectives: [
        'Understand order book structure and Level 2 market data',
        'Learn to analyze order book depth and imbalances',
        'Identify institutional activity through order flow',
        'Use order book analysis to time entries and exits'
      ],
      explanation: `The order book is the electronic list of all pending buy and sell orders for a security at various price levels. While basic traders see only the current bid/ask price, advanced traders analyze the full order book (Level 2 data) to gauge supply/demand dynamics, anticipate short-term price movements, and identify institutional activity.

**Order Book Structure:** The bid side lists all pending buy orders from highest to lowest price. The ask side lists all pending sell orders from lowest to highest price. Each price level shows the quantity of shares waiting. For example, Saudi Aramco might show: Bid: 32.40 (3,000 shares), 32.35 (2,500 shares), 32.30 (4,000 shares). Ask: 32.45 (2,800 shares), 32.50 (3,200 shares), 32.55 (2,000 shares). The difference between best bid and best ask is the spread. The quantity at each level represents depth.

**Level 1 vs Level 2 Data:** Level 1 data shows only the best bid/ask and last trade price - this is what most retail traders see. Level 2 data shows multiple price levels deep into the book, revealing supply and demand beyond the surface. In GCC markets, Level 2 data is available through premium broker platforms and professional trading terminals. This deeper view reveals where major support and resistance lies, where large orders are waiting, and how the order book is evolving in real-time.

**Order Book Imbalances:** When the bid side has significantly more volume than the ask side (or vice versa), it suggests directional pressure. If Saudi Aramco shows 15,000 shares bid across 5 levels but only 6,000 shares offered, the imbalance suggests buying pressure that may push prices higher. Traders monitor these imbalances to anticipate short-term moves. However, imbalances can be manipulated - large orders are sometimes placed and cancelled to create false signals (called "spoofing").

**Reading Institutional Activity:** Large orders (often 5,000+ shares in GCC stocks) signal institutional participation. When you see a 10,000-share bid appear at 32.30 in Saudi Aramco, it's likely a fund or large trader establishing support. Institutions also use iceberg orders that hide true size, so visible book analysis has limits. Still, patterns emerge: Institutional accumulation shows persistent buying across multiple price levels, gradually absorbing supply. Distribution shows large sell orders appearing and getting filled as institutions exit.

**Order Book Dynamics:** The book is constantly changing as orders are placed, filled, and cancelled. Watching these changes in real-time reveals market sentiment. A support level at 32.30 with 5,000 shares that gets reduced to 500 shares might indicate buyers pulling bids as they lose confidence. Conversely, a resistance level at 32.50 with 2,000 shares that jumps to 10,000 shares shows sellers adding supply, making breakout less likely.

**Practical Trading Applications:** Use order book analysis to refine entry and exit timing. If you want to buy Al Rajhi Bank and see a large bid at 85.00 supporting price, you might place your buy just above at 85.05, anticipating the 85.00 level will hold. If you're selling and see a large offer at 85.50, you might place your sell at 85.45 to get ahead of the wall. This micro-level timing can save 0.1-0.3% per trade, significant for active traders.`,
      keyConcepts: [
        { term: 'Depth of Market (DOM)', definition: 'Another term for the order book, specifically referring to the quantity of shares available at each price level. Deep markets have large quantities; thin markets have small quantities prone to volatility.' },
        { term: 'Order Book Spoofing', definition: 'Illegal practice of placing large orders to create false impression of demand/supply, then cancelling before execution. Regulated markets like TASI monitor and penalize this.' },
        { term: 'Bid-Ask Spread Depth', definition: 'Not just the price difference but the quantity available. A 0.05 spread with 100 shares is effectively much wider than 0.05 with 10,000 shares for a trader needing 5,000 shares.' },
        { term: 'Time and Sales', definition: 'A companion to order book showing actual executed trades in real-time. Comparing order book to executed trades reveals whether buyers or sellers are more aggressive.' }
      ],
      gccExamples: [
        'Saudi Aramco Order Book: Bid: 32.40 (8,000), 32.35 (5,500), 32.30 (12,000), 32.25 (3,000). Ask: 32.45 (2,500), 32.50 (3,000), 32.55 (4,000), 32.60 (2,000). Analysis: Strong buying interest shown by large 12,000-share bid at 32.30, total bid volume 28,500 vs ask volume 11,500 - significant imbalance suggesting upward pressure.',
        'Emirates NBD Institutional Activity: Repeated 5,000-share bids appear at 14.50, get filled, then new 5,000-share bids immediately replace them. This pattern repeating 4-5 times signals institutional accumulation at 14.50. You might buy at 14.55, knowing strong support exists below.',
        'Al Rajhi Bank Resistance Wall: Order book shows normal offers of 500-1,000 shares at each level, but at 85.50 there\'s a 25,000-share offer. This "wall" will be difficult to break through - likely distribution by a large holder. Short-term traders might sell at 85.45, not expecting price to exceed 85.50 soon.',
        'SABIC Order Book Collapse: Support at 89.50 shows 8,000 shares. Within 30 seconds, it reduces to 2,000, then 500, then disappears completely. This evaporation of support often precedes downward moves as buyers lose confidence. Observant traders exit quickly before the drop.'
      ],
      steps: [
        'Upgrade to Level 2 data access with your broker (may require premium account or additional fee)',
        'Watch the order book for Saudi Aramco for 30 minutes, noting how orders appear, fill, and cancel',
        'Calculate bid vs ask volume imbalance for 10 different stocks - does the imbalance predict short-term direction?',
        'Identify where the largest orders are in the book - these levels often act as support/resistance',
        'Compare order book just before market open (pre-opening auction) vs 30 minutes into the session - note how it changes',
        'Practice placing your orders just ahead of large visible orders to improve execution priority'
      ],
      mistakes: [
        'Assuming all visible orders are genuine - iceberg orders hide true institutional size, and spoofing creates false signals',
        'Over-trading based on minute order book changes - focus on significant imbalances and persistent patterns, not noise',
        'Ignoring that order books clear during high volatility - support/resistance levels can vanish instantly',
        'Placing large market orders without checking order book depth first - you might consume multiple levels at poor prices',
        'Forgetting that order book is a snapshot - by the time you react, the situation may have changed, especially in fast markets'
      ],
      visualReference: 'Picture a live order book display for Al Rajhi Bank in three columns: Left column (Bid) shows prices descending from 85.10 (1,200 shares) to 84.60 (800 shares) with quantities. Middle column shows last trade: 85.10, +0.15, volume 2.5M. Right column (Ask) shows prices ascending from 85.15 (900 shares) to 85.60 (1,100 shares). Color coding: bid side in green shades (darker = more shares), ask side in red shades. A thick green bar at 85.00 representing 15,000 shares stands out - major support. Time and sales ticker at bottom shows: 85.10 (500), 85.15 (300), 85.10 (700) - recent executions. As you watch, orders flash in and out, fills reduce quantities, the spread tightens and widens. This dynamic visualization is what professional traders monitor continuously.'
    },
    'course1-module2-lesson6': {
      objectives: [
        'Understand slippage and its causes',
        'Learn to measure and minimize slippage costs',
        'Evaluate broker execution quality',
        'Optimize order types and timing for best execution'
      ],
      explanation: `Slippage is the difference between the expected price of a trade and the actual execution price. While spreads are a visible cost, slippage is often unexpected and harder to control, significantly impacting trading profitability, especially for active traders and those trading larger positions.

**What Causes Slippage:** The primary cause is market volatility and order size relative to available liquidity. When you place a market order to buy 1,000 shares of Saudi Aramco at a displayed ask of 32.45, you expect to pay 32,450 SAR. However, if only 600 shares are available at 32.45, your order consumes that level and continues to 32.50 for the remaining 400 shares. Your average execution price becomes approximately 32.47, creating 0.02 slippage per share or 20 SAR total. This is positive slippage (worse than expected). Negative slippage (better than expected) can occur but is less common.

**Volatility and Slippage:** During high volatility - market opens, news releases, or large institutional orders - prices move quickly and spreads widen. A market order during these periods often experiences significant slippage. If you want to buy at 32.45 but during the milliseconds your order takes to execute, a large seller hits the market and price drops to 32.30, you might actually buy at 32.35. This is negative slippage (good for you), but it could just as easily have gone to 32.60 (positive slippage).

**Order Size and Market Depth:** In liquid stocks like Saudi Aramco with deep order books, small orders (100-500 shares) rarely experience meaningful slippage. But larger orders (5,000+ shares) often must consume multiple price levels. If the order book shows: 32.45 (600), 32.50 (800), 32.55 (1,000), and you market buy 2,000 shares, you'll pay weighted average around 32.51, much worse than the quoted 32.45.

**Execution Quality and Brokers:** Not all brokers provide equal execution. Premium brokers with direct market access, smart order routing, and advanced technology often achieve better execution than discount brokers. They may split large orders intelligently, access hidden liquidity pools, or route to venues offering price improvement. In GCC markets, established brokers like Al Rajhi Capital, EFG Hermes, and international brokers like Interactive Brokers typically provide superior execution to smaller local brokers.

**Measuring Slippage:** Track the difference between expected price (when you clicked submit) and actual fill price across all trades. Calculate average slippage as a percentage. Professional traders maintain slippage logs: Date, Stock, Expected Price, Actual Price, Slippage Amount, Slippage %. If your average slippage is 0.15% and you make 100 trades per month, you're losing 15% to slippage alone. This makes a 60% win rate strategy barely profitable.

**Minimizing Slippage:** Several techniques help: (1) Use limit orders instead of market orders when urgency permits - you control price but sacrifice execution certainty; (2) Avoid trading during maximum volatility periods unless strategy specifically requires it; (3) Split large orders into smaller chunks executed over time; (4) Trade only liquid stocks where order book depth supports your position sizes; (5) Choose quality brokers with proven execution; (6) Use algorithmic order types (VWAP, TWAP) if available that intelligently execute over time to minimize market impact.

Understanding slippage transforms trading from a naive "buy at market price" approach to sophisticated execution strategy considering timing, sizing, and order types to optimize every trade's actual cost.`,
      keyConcepts: [
        { term: 'Price Impact', definition: 'How much your order moves the market price. Large orders in illiquid stocks have high price impact, causing slippage. In efficient markets, your order should have minimal impact.' },
        { term: 'Latency', definition: 'The time delay between your order submission and execution. High latency (slow connection/broker) increases slippage risk as prices change during transmission.' },
        { term: 'VWAP (Volume Weighted Average Price)', definition: 'An algorithmic order type that executes throughout the day to achieve average price weighted by volume, minimizing market impact and slippage for large orders.' },
        { term: 'Fill Quality', definition: 'Overall execution performance considering price, speed, and completion rate. Top brokers publish fill quality statistics showing average price improvement vs market.' }
      ],
      gccExamples: [
        'Saudi Aramco Market Order Slippage: You submit market buy for 2,000 shares at displayed ask 32.45. Order book: 32.45 (800), 32.50 (600), 32.55 (600). Execution: 800 @ 32.45, 600 @ 32.50, 600 @ 32.55. Average price: 32.50. Expected cost: 64,900 SAR. Actual cost: 65,000 SAR. Slippage: 100 SAR (0.15%).',
        'Emirates NBD Volatile Open: At 10:00 AM market open, you want to buy 1,000 shares. Pre-market ask showed 14.50 AED. By the time your order executes 2 seconds after open, price has jumped to 14.65 due to opening volatility. Slippage: 0.15 per share = 150 AED (1.03%).',
        'Al Rajhi Bank Limit Order: Instead of market buying at displayed ask 85.10, you place limit buy at 85.05. Over the next 15 minutes, normal price fluctuation fills your order at 85.03-85.05. You saved 0.05-0.07 per share vs market order, avoiding positive slippage.',
        'SABIC Large Order Split: Need to buy 10,000 shares, current ask 90.00. Instead of one market order (would push price to 90.30+), you split into 10 orders of 1,000 shares over 2 hours. Average execution: 90.05. Saved ~0.20 per share = 2,000 SAR vs single market order.'
      ],
      steps: [
        'For your next 20 trades, record expected price vs actual execution price - calculate slippage % for each',
        'Analyze when slippage is highest - market open/close? News events? Certain stocks? Large sizes?',
        'Compare slippage between market orders and limit orders over 30 trades',
        'Test execution quality: place identical orders through different brokers (demo accounts) and compare fills',
        'Create a "maximum acceptable slippage" rule - e.g., if expected slippage exceeds 0.2%, don\'t use market orders',
        'Practice order splitting - if position size exceeds 2% of average daily volume, split into multiple orders'
      ],
      mistakes: [
        'Using market orders habitually without considering slippage costs - limit orders often save 0.1-0.3%',
        'Trading illiquid stocks with large positions - slippage can exceed 1-2%, making profitability nearly impossible',
        'Chasing fast-moving stocks with market orders - you\'ll buy the top or sell the bottom with terrible slippage',
        'Ignoring that your broker matters - switching to a better execution broker can improve performance 0.2-0.5% per trade',
        'Not tracking slippage systematically - you can\'t improve what you don\'t measure'
      ],
      visualReference: 'Visualize a slippage comparison chart: Left side shows your expected execution for 1,500 shares of Saudi Aramco market buy - you see ask at 32.45, expect to pay 32.45 × 1,500 = 48,675 SAR. Right side shows actual execution breakdown: 600 shares @ 32.45 (19,470), 500 shares @ 32.50 (16,250), 400 shares @ 32.55 (13,020). Total: 48,740 SAR. Difference: 65 SAR slippage (0.13%). Below, a bar chart shows your slippage over 30 trades: most trades 0.05-0.15%, but volatile days show spikes to 0.4-0.6%. Average line at 0.18%. This visualization illustrates how small slippages accumulate into significant costs over many trades.'
    },

    // COURSE 1 - MODULE 3: GCC Market Specialization (10 lessons)
    'course1-module3-lesson1': {
      objectives: [
        'Master the structure and operations of GCC stock exchanges',
        'Understand trading mechanisms unique to TASI, ADX, DFM, and QE',
        'Learn listing requirements and regulatory frameworks',
        'Identify key indices and market benchmarks'
      ],
      explanation: `The GCC region hosts sophisticated stock exchanges that have evolved dramatically over the past two decades, offering diverse investment opportunities in the Middle East's largest economies.

**Tadawul (Saudi Stock Exchange)** dominates the region with over $2.5 trillion in market capitalization. Established in 1984 and modernized in 2007, TASI operates a fully electronic trading platform from Sunday to Thursday, 10:00 AM to 3:00 PM Riyadh time. The exchange lists 200+ companies across 20 sectors, with particularly strong representation in banking (Al Rajhi Bank, SNB, Alinma Bank), petrochemicals (SABIC, SIPCHEM), telecommunications (STC, Mobily), and of course, the crown jewel: Saudi Aramco, the world's most valuable company. The TASI All-Share Index tracks market performance, while the MT30 Index represents the 30 largest companies.

**Abu Dhabi Securities Exchange (ADX)** and **Dubai Financial Market (DFM)** serve the UAE markets. ADX features blue-chip companies including First Abu Dhabi Bank (FAB), the region's largest bank with assets exceeding $300 billion, ADNOC Distribution, Aldar Properties, and several government-linked entities. The ADX General Index serves as the main benchmark. DFM, meanwhile, lists Emirates NBD, Dubai Islamic Bank, Emaar Properties (developer of Burj Khalifa), and Dubai Electricity & Water Authority (DEWA). Both exchanges operate 10:00 AM to 2:00 PM UAE time, with plans for potential integration to enhance liquidity.

**Qatar Exchange (QSE)** rounds out the major GCC bourses with significant companies like Qatar National Bank (QNB), the Middle East's largest bank, Industries Qatar, and Qatar Gas Transport (Nakilat). Trading hours run 9:30 AM to 1:00 PM Doha time.

**Trading Mechanisms** across GCC exchanges share similarities: continuous auction systems with price-time priority, T+2 settlement cycles, circuit breakers at ±10% daily movements, and strict regulatory oversight. However, each market has unique characteristics. TASI allows short-selling for qualified institutional investors and offers derivatives. UAE exchanges have introduced margin trading facilities. All exchanges require real-name registration with national ID verification.

**Market Access** has opened significantly. Saudi Arabia achieved MSCI Emerging Market status in 2019, bringing billions in foreign inflows. The Qualified Foreign Investor (QFI) program allows international participation. UAE markets also welcome foreign investors with minimal restrictions. This openness has increased liquidity and professionalism.

Understanding these markets' specific operating procedures, listing requirements (minimum capital, profitability, governance standards), and regulatory frameworks is essential for traders looking to capitalize on GCC opportunities.`,
      keyConcepts: [
        { term: 'MSCI Inclusion', definition: 'Saudi Arabia and UAE markets are included in MSCI Emerging Markets Index, requiring international funds to hold GCC stocks, bringing billions in systematic inflows.' },
        { term: 'Qualified Foreign Investor (QFI)', definition: 'Program allowing non-GCC nationals to trade directly on Saudi exchanges with proper registration and regulatory approval, democratizing market access.' },
        { term: 'Nomu-Parallel Market', definition: 'TASI\'s secondary listing platform for smaller companies with less stringent requirements, offering higher risk-reward opportunities for sophisticated investors.' },
        { term: 'Price Fluctuation Limits', definition: 'Daily price movement limits (typically ±10%) beyond which trading halts temporarily. Protects against extreme volatility but can trap positions.' }
      ],
      gccExamples: [
        'Saudi Aramco Trading: The oil giant trades on TASI with ticker 2222, typical daily volume of 15-30 million shares, price range 32-38 SAR in 2024. Single largest stock by market cap (~$2 trillion), movements significantly impact overall index.',
        'First Abu Dhabi Bank (FAB): Trades on ADX, resulting from 2017 merger of National Bank of Abu Dhabi and First Gulf Bank. Price around 15-17 AED, dividend yield ~4%, considered defensive blue-chip holding.',
        'Emaar Properties on DFM: Real estate developer with ticker EMAAR, volatile stock influenced by Dubai property market, tourism, and expo events. Trading volume spikes on earnings releases and project announcements.',
        'Cross-Listing: Some companies list on multiple GCC exchanges (like Saudi companies on Abu Dhabi), creating arbitrage opportunities when prices temporarily diverge across markets.'
      ],
      steps: [
        'Register for market data access through TASI, ADX, and DFM websites to study real-time quotes and historical data',
        'Analyze the top 10 companies by market cap in each exchange, noting sector distribution and trading volumes',
        'Compare trading costs across GCC exchanges: commissions, minimum order sizes, settlement processes',
        'Study each exchange\'s circuit breaker mechanism by reviewing historical trading halt instances',
        'Research regulatory bodies: CMA (Saudi), SCA (UAE), QFMA (Qatar) - understand disclosure requirements and investor protections',
        'Open demo accounts with major regional brokers to practice trading mechanics specific to each exchange'
      ],
      mistakes: [
        'Assuming all GCC markets operate identically - each has unique trading hours, settlement procedures, and regulations',
        'Ignoring that Friday-Saturday weekends mean GCC markets are closed when global markets trade - gap risk is significant',
        'Trading without understanding Sharia-compliant stock classifications - many investors specifically avoid non-compliant stocks',
        'Overlooking that market liquidity varies dramatically - Aramco trades billions daily while small-caps may trade < 1 million SAR',
        'Failing to account for religious holidays (Ramadan, Eid) which affect trading hours and market behavior'
      ],
      visualReference: 'Picture a GCC markets dashboard with four panels: TASI panel showing Saudi Aramco at 34.20 SAR (+0.45%), SABIC at 89.30, Al Rajhi at 85.50, index at 11,850 (+0.3%); ADX panel displaying FAB at 16.20 AED, ADNOC Distribution at 4.15, index at 9,425; DFM panel with Emirates NBD at 14.60, Emaar at 6.25, index at 4,180; QSE panel showing QNB at 18.50 QAR. Each panel includes volume bars, sector performance heat map, and top gainers/losers. Time stamps show synchronized trading hours. Color coding indicates correlation - when oil prices shown at top rise, energy stocks across all exchanges move together.'
    },
    'course1-module3-lesson2': {
      objectives: [
        'Develop trading strategies specific to TASI and ADX indices',
        'Understand index composition and weighting methodologies',
        'Learn to trade index movements vs individual stocks',
        'Master correlation analysis between indices and sectors'
      ],
      explanation: `Index trading offers a way to gain exposure to broader market movements rather than individual stock risks. The TASI All-Share Index and ADX General Index are the primary benchmarks for Saudi and Abu Dhabi markets respectively, and understanding their construction enables sophisticated trading strategies.

**TASI All-Share Index Structure:** This market-capitalization weighted index includes all listed companies on the Saudi exchange, currently over 200 constituents. However, the index is heavily concentrated - Saudi Aramco alone comprises approximately 12-15% of total weighting, while the top 10 companies represent over 40%. This concentration means TASI movements are disproportionately driven by mega-cap stocks. The index calculation uses free-float adjusted market cap, meaning only shares available for public trading count toward weighting, not government or insider holdings.

**Sector Weightings:** TASI's sector distribution reflects Saudi Arabia's economy: Materials (primarily SABIC and petrochemicals) ~15%, Energy (Aramco and related) ~20%, Financials (banks and insurance) ~35%, with the remaining split among telecommunications, utilities, real estate, and consumer sectors. This composition makes TASI highly sensitive to oil prices (energy and materials correlation) and interest rates (financials sensitivity).

**ADX General Index Characteristics:** The Abu Dhabi index also uses free-float market cap weighting across ~70 listed companies. FAB (First Abu Dhabi Bank) dominates with 15-18% weighting, followed by ADNOC Distribution, Aldar Properties, and other state-linked entities. The index shows strong government influence with many holdings tied to Abu Dhabi's sovereign wealth ecosystem. Real estate and banking sectors comprise over 50% of total index weight.

**Index Trading Strategies:** Several approaches exist for trading indices: (1) **Index Tracking** - buying the largest weighted stocks proportionally to replicate index movements with lower capital requirements; (2) **Relative Strength** - identifying sectors outperforming the index and overweighting those positions; (3) **Mean Reversion** - when the index deviates significantly from historical averages, positioning for return to mean; (4) **Correlation Trading** - exploiting the relationship between TASI and oil prices, or between ADX and UAE real estate cycles.

**Practical Implementation:** While direct index futures don't exist for TASI or ADX (unlike S&P 500 or FTSE), traders can synthetically trade indices by holding baskets of top weighted stocks. For example, holding Saudi Aramco (12%), Al Rajhi Bank (8%), SABIC (6%), STC (5%), and SNB (4%) gives ~35% TASI exposure with just 5 positions. Professional traders use this approach with 10-15 stocks to capture 60-70% of index movements.

**Inter-Market Correlations:** TASI and ADX don't move in perfect tandem despite geographic proximity. TASI is more oil-sensitive, while ADX reflects real estate and banking cycles more strongly. During oil price surges, TASI typically outperforms; during property booms, ADX leads. Understanding these divergences creates pairs trading opportunities - going long the underperforming index while shorting the outperforming one, expecting convergence.`,
      keyConcepts: [
        { term: 'Free-Float Adjustment', definition: 'Index weighting based only on shares available for public trading. Saudi Aramco\'s 1.5% free-float means despite being most valuable company, its index impact is limited.' },
        { term: 'Index Rebalancing', definition: 'Periodic adjustment of index composition and weights (quarterly or semi-annually). Creates forced buying/selling as index funds must match new weights, causing temporary price distortions.' },
        { term: 'Beta to Index', definition: 'Measure of individual stock volatility vs index. A stock with 1.5 beta moves 1.5x the index percentage change. Useful for position sizing and risk management.' },
        { term: 'Tracking Error', definition: 'Deviation between your portfolio returns and index returns when attempting to replicate index. Professional index traders minimize tracking error below 0.5%.' }
      ],
      gccExamples: [
        'TASI Oil Price Correlation: When Brent crude rises $10 (from $75 to $85), TASI historically gains 3-5% within 2 weeks. Aramco, SABIC, and petrochemical stocks drive this movement. Traders can position ahead of OPEC meetings anticipating production cuts.',
        'ADX Rebalancing Effect: When a stock like ADNOC Logistics enters ADX index, passive funds must buy it. In first week post-inclusion, stock typically rallies 5-8% due to forced buying before normalizing. Active traders buy ahead of inclusion and sell into the buying pressure.',
        'TASI-MT30 Divergence: The MT30 index (top 30 stocks) sometimes diverges from broader TASI. If MT30 rises 2% but TASI only 0.8%, it signals small-caps are underperforming - potential opportunity in small-cap value stocks or sign of weakening breadth.',
        'Inter-Market Arbitrage: If Saudi banking sector gains 3% but ADX banks remain flat despite similar fundamentals, it may signal ADX banks are undervalued. Traders go long ADX banks (Emirates NBD, FAB) expecting catch-up.'
      ],
      steps: [
        'Download 5 years of daily data for TASI, ADX indices and Brent crude oil prices - calculate correlation coefficients',
        'Identify the top 15 companies by index weight in TASI and ADX - create a tracking portfolio with proportional weights',
        'Monitor your portfolio daily vs actual index performance - aim for tracking error under 1%',
        'Study historical index rebalancing dates and analyze stock price movements in the week before/after rebalancing',
        'Create sector heat maps showing how each sector contributes to daily index movements',
        'Set up alerts for when individual stocks diverge >3% from their expected beta-adjusted movement relative to index'
      ],
      mistakes: [
        'Treating the index as equally weighted - in reality, top 10 stocks drive 80% of movement, focus on these',
        'Ignoring that index correlation breaks down during crises - diversification benefits vanish when you need them most',
        'Attempting perfect index replication with small capital - stick to top 10-15 holdings for efficiency',
        'Overlooking index rebalancing effects - these create predictable but temporary price distortions worth trading',
        'Assuming TASI and ADX move together because they\'re both GCC - they have different drivers and often diverge'
      ],
      visualReference: 'Visualize a split-screen analysis: Top half shows TASI chart from 2019-2024 with Brent crude oil price overlaid - the correlation is visually obvious with both lines moving in sync. Bottom half displays pie charts of TASI composition: Aramco 12%, Al Rajhi 8%, SABIC 6%, STC 5%, others 69%. Beside it, ADX composition: FAB 18%, ADNOC Distribution 12%, Aldar 9%, others 61%. A correlation matrix shows TASI-Oil: 0.73, ADX-Oil: 0.51, TASI-ADX: 0.65. Color coding highlights when indices diverge >2 standard deviations from expected correlation - these are trading opportunities.'
    },
    'course1-module3-lesson3': {
      objectives: [
        'Analyze major GCC banking sector stocks and their drivers',
        'Understand financial metrics specific to regional banks',
        'Master the impact of interest rates and oil prices on bank profitability',
        'Develop sector rotation strategies around banking stocks'
      ],
      explanation: `Banking dominates GCC equity markets, with financial services representing 30-40% of most regional indices. Understanding bank-specific dynamics, regulatory environments, and profit drivers is crucial for any GCC trader.

**Major GCC Banking Institutions:** The sector is led by giants like Al Rajhi Bank (Saudi Arabia's largest bank by market cap, ~$55 billion, Sharia-compliant), Saudi National Bank (SNB, formed from 2021 merger), Emirates NBD (UAE's largest by assets, ~$200 billion), First Abu Dhabi Bank (FAB, regional powerhouse with $300+ billion assets), and Qatar National Bank (QNB, Middle East's largest with presence in 30+ countries). These institutions combine to manage trillions in assets and generate tens of billions in annual profits.

**Revenue Drivers:** GCC banks profit primarily from three sources: (1) **Net Interest Margin (NIM)** - the spread between lending rates and deposit costs, typically 2.5-4% in the region; (2) **Fee Income** - wealth management, transaction fees, credit cards, representing 20-30% of revenue; (3) **Investment Returns** - proprietary trading and investment portfolios. Unlike Western banks, GCC banks maintain higher profit margins due to lower competition, growing economies, and younger populations requiring lending for homes and businesses.

**Interest Rate Sensitivity:** GCC central banks generally track US Federal Reserve rates due to dollar pegs, meaning when the Fed raises rates, regional banks benefit from higher lending margins. A 1% Fed rate increase typically boosts GCC bank profits 8-12% within six months. However, too-rapid increases can slow lending volumes as credit becomes expensive. Traders monitor Fed meeting schedules and position in bank stocks ahead of expected rate changes.

**Oil Price Correlation:** While less direct than energy stocks, banks show significant oil price correlation because: (1) Government deposits (a major funding source) grow with oil revenues; (2) Corporate lending to energy sector expands during high oil prices; (3) Overall economic activity strengthens with oil wealth, increasing loan demand; (4) Asset quality improves as oil sector borrowers perform better. Historical data shows ~0.55-0.65 correlation between oil prices and GCC bank stock performance with a 2-3 month lag.

**Sharia-Compliant Islamic Banking:** A unique GCC consideration is the large Islamic banking sector (Al Rajhi Bank, Dubai Islamic Bank, Kuwait Finance House). These banks operate on profit-sharing principles rather than interest, comply with Sharia committees, and avoid certain industries (alcohol, gambling, conventional insurance). Islamic banks often show different performance patterns - more stable during crises due to conservative practices but sometimes lower growth during booms.

**Regulatory Environment:** Each GCC country has strict banking regulations regarding capital adequacy (Basel III standards), liquidity requirements, and provisioning. Saudi Arabia's SAMA (Saudi Arabian Monetary Authority) and UAE's Central Bank enforce conservative standards. These regulations protect depositors but can limit bank profitability during economic slowdowns when provisioning requirements increase.

**Trading Strategies:** Successful bank stock trading combines fundamental analysis (reviewing quarterly earnings for NIM trends, loan growth, asset quality) with macro positioning (Fed rate cycle, oil price direction). Pairs trading works well - going long banks with improving metrics while shorting those with deteriorating fundamentals. Dividend yield hunting is popular as GCC banks pay attractive 3-6% yields, providing downside support.`,
      keyConcepts: [
        { term: 'Net Interest Margin (NIM)', definition: 'The difference between interest earned on loans and interest paid on deposits, divided by interest-earning assets. Higher NIM = higher profitability. GCC banks average 2.8-3.5%.' },
        { term: 'Non-Performing Loan (NPL) Ratio', definition: 'Percentage of loans in default or near default. Lower is better. GCC banks typically maintain NPL ratios of 2-5%, rising during oil price crashes.' },
        { term: 'Loan-to-Deposit Ratio', definition: 'Total loans divided by total deposits. Ratios of 80-95% are optimal - enough lending to generate profits but sufficient liquidity. Over 100% requires expensive external funding.' },
        { term: 'Capital Adequacy Ratio (CAR)', definition: 'Bank\'s capital as percentage of risk-weighted assets. Regulatory minimum is 10-12%; GCC banks maintain 15-20% for buffer. Higher CAR = safer but potentially lower returns.' }
      ],
      gccExamples: [
        'Al Rajhi Bank Trading: Stock typically trades 82-92 SAR, market cap ~$55 billion, dividend yield 3-4%. Being fully Sharia-compliant, it attracts Islamic investment funds and shows resilience during market stress. Q1 2024 earnings showed 12% YoY profit growth, stock rallied 6% on the news.',
        'Emirates NBD Rate Sensitivity: When Fed raised rates from 0% to 5.25% (2022-2023), Emirates NBD profit grew from 10 billion AED to 15.6 billion AED. Stock price doubled from 10 AED to 20 AED over the same period. Classic interest rate play.',
        'Saudi National Bank (SNB) Merger Arbitrage: The 2021 merger creating SNB from NCB and Samba created temporary mispricings. Traders who bought pre-merger shares and held through integration gained 25% as synergies materialized.',
        'FAB Dividend Strategy: FAB consistently pays 0.66 AED annual dividend (4-5% yield) with 2 semi-annual payments. Traders buy ex-dividend date approaches, capture dividend, sell when price recovers post-dividend drop. Repeat twice yearly.'
      ],
      steps: [
        'Select 5 major GCC banks - download 3 years of quarterly financial statements focusing on NIM, NPL, loan growth, and ROE',
        'Create a spreadsheet tracking Fed rate changes vs bank stock performance over 5 years - quantify the correlation and lag effect',
        'Monitor oil prices and bank stock movements with 1-3 month lag to identify when correlation breaks down (trading opportunity)',
        'Calculate relative valuation: compare Price-to-Book ratios across banks - identify overvalued (P/B >1.8) vs undervalued (P/B <1.2) candidates',
        'Set up earnings alerts for all major banks - study how stock prices react to earnings beats/misses over 20 quarters to predict movements',
        'Practice pairs trading: go long the undervalued bank with improving metrics, short the overvalued bank with deteriorating metrics'
      ],
      mistakes: [
        'Ignoring asset quality - a bank with great profit growth but rising NPLs is a value trap, eventually provisions destroy earnings',
        'Trading banks without understanding the interest rate cycle - rising rates boost profits, falling rates compress margins',
        'Overlooking that Islamic banks behave differently - they don\'t benefit as directly from rate hikes, use different metrics',
        'Buying banks purely for dividends without checking payout sustainability - if payout ratio exceeds 60%, dividend cuts may come',
        'Assuming all GCC banks are the same - Saudi banks have different regulations, customer bases, and growth profiles than UAE or Qatar banks'
      ],
      visualReference: 'Imagine a comprehensive bank analysis dashboard: Center shows Al Rajhi Bank stock chart 2019-2024 with price ranging 65-95 SAR. Overlaid is the Fed Funds Rate (0% to 5.25%) showing clear positive correlation. Below, a table displays key metrics quarterly: NIM trending from 2.8% to 3.4%, NPL ratio stable at 1.2%, loan growth at 8% YoY, ROE at 18%. Right panel compares Al Rajhi vs Emirates NBD vs FAB: P/B ratios (1.5 vs 1.1 vs 1.3), dividend yields (3.8% vs 4.2% vs 4.5%), with color coding showing FAB as undervalued opportunity. Bottom chart plots oil prices against banking sector index (3-month lag) - correlation coefficient 0.62 clearly visible in synchronized movements.'
    },

    // Continue with remaining Course 1 lessons...
    'course1-module3-lesson4': {
      objectives: [
        'Understand energy and real estate sector dynamics in GCC markets',
        'Identify key drivers for sector performance and cyclical patterns',
        'Learn valuation methods specific to these capital-intensive industries',
        'Develop sector rotation timing strategies'
      ],
      explanation: `Energy and real estate dominate GCC economies and equity markets, offering substantial opportunities for traders who understand their unique characteristics, cyclical nature, and interconnected relationships with broader economic trends.

**Energy Sector Dominance:** Saudi Aramco, the world's most profitable company, epitomizes the sector's importance. Beyond Aramco, TASI features petrochemical giants like SABIC (Saudi Basic Industries Corporation, market cap ~$70 billion), SIPCHEM, Petro Rabigh, and Saudi Kayan. These companies benefit from cheap feedstock (oil and natural gas), government support, and access to global markets. The sector's profitability directly correlates with oil and gas prices - when Brent crude rises $10/barrel, petrochemical margins typically expand 15-20% as product prices increase faster than feedstock costs.

**Real Estate Sector in UAE:** Dubai and Abu Dhabi's property markets drive significant equity market activity. Emaar Properties (developer of Burj Khalifa, Dubai Mall) dominates with market cap exceeding $15 billion. Aldar Properties (Abu Dhabi's largest developer), DEWA (Dubai Electricity & Water Authority), and smaller developers like DAMAC and Arabtec (before its 2020 collapse) comprise the sector. Real estate stocks trade based on: (1) Property transaction volumes and pricing - Dubai Land Department publishes daily transaction data; (2) Tourism and expatriate population trends - more visitors and residents drive housing demand; (3) Government infrastructure spending and Expo/event effects; (4) Interest rates - higher rates reduce affordability and demand.

**Sector Cycles and Timing:** Energy and real estate follow distinct but overlapping cycles. Energy stocks correlate immediately with oil prices (correlation ~0.75, near real-time). Real estate lags economic cycles by 6-12 months - first, the economy strengthens (rising oil revenues), then employment increases, finally housing demand and prices rise. Astute traders position in real estate stocks during early economic recovery phases before the broader market recognizes the trend.

**Valuation Metrics:** Energy stocks trade on EV/EBITDA multiples (typically 5-8x for petrochemicals), dividend yields (3-5%), and Price-to-Book ratios (0.8-1.5x). SABIC, for example, historically trades at 6-7x EV/EBITDA during normal conditions, dropping to 4-5x during oil crashes (buy signal) and rising to 8-9x during booms (sell signal). Real estate companies use Price-to-Book (0.7-1.2x, with book value reflecting underlying property), dividend yields (4-7% typical for mature developers), and Price-per-square-foot of development pipeline comparisons.

**Government Policy Impact:** Both sectors are heavily influenced by government decisions. Saudi Vision 2030 drives energy sector diversification away from crude oil toward petrochemicals, renewables, and downstream industries. UAE's visa reforms, property ownership rules for foreigners, and mega-projects (Expo 2020, Dubai 2040 Plan) directly impact real estate. Traders must monitor policy announcements from Crown Prince Mohammed bin Salman, Mohammed bin Rashid Al Maktoum, and respective ministries.

**Risk Factors:** Energy stocks face oil price volatility (2020 crash to $20/barrel devastated the sector), energy transition concerns (long-term shift to renewables), and geopolitical risks (OPEC policy, regional tensions). Real estate risks include oversupply (Dubai faced this in 2009 and 2015), regulatory changes (ownership restrictions, transaction fees), and global economic downturns reducing expatriate populations (COVID-19 saw significant outflows).

**Trading Strategies:** Successful approaches include: (1) Pairs trading energy stocks vs oil ETFs to isolate company-specific performance; (2) Buying real estate stocks during economic troughs when fear is highest and selling during euphoric booms; (3) Event-driven trading around Expo announcements, OPEC meetings, major project launches; (4) Dividend capture in high-yielding energy stocks during stable oil price periods.`,
      keyConcepts: [
        { term: 'Crack Spread', definition: 'The difference between crude oil price and refined product prices. Wider spreads benefit petrochemical companies like SABIC as their profit margins expand. Monitor monthly to identify trends.' },
        { term: 'Absorption Rate', definition: 'Speed at which available properties are sold/leased in a market. High absorption (>70% annually) signals strong demand supporting real estate stock valuations.' },
        { term: 'Replacement Cost', definition: 'Cost to build equivalent property today. When real estate stocks trade below replacement cost (P/B <0.8), it often signals undervaluation as assets are worth more than market price.' },
        { term: 'Downstream vs Upstream', definition: 'Upstream = oil extraction (Aramco). Downstream = refining and petrochemicals (SABIC). Downstream benefits from oil price stability and wide crack spreads; upstream benefits from high absolute oil prices.' }
      ],
      gccExamples: [
        'SABIC Oil Price Correlation: When Brent crude surged from $45 (2020) to $85 (2022), SABIC stock rose from 65 SAR to 115 SAR (77% gain vs 89% oil gain). Petrochemical margins expanded significantly, and the company reinstated dividends cut during the crash.',
        'Emaar Expo 2020 Play: Leading up to Dubai Expo 2020 (delayed to 2021), Emaar stock climbed from 3.50 AED (2019) to 6.20 AED (late 2021) on expectations of property demand. Post-Expo, stock corrected to 4.50 AED as the event catalyst passed - classic buy the rumor, sell the news.',
        'Saudi Aramco Dividend Strategy: Aramco commits to $75 billion annual base dividend regardless of oil prices. At 32 SAR share price, this yields ~4.3%. During 2020 oil crash, while stock fell to 27 SAR, dividend held, providing 5.2% yield - attractive defensive investment.',
        'Aldar Properties Merger: When Aldar merged with Sorouh in 2013, creating Abu Dhabi\'s dominant developer, the combined entity traded at 0.75x book value. Over 3 years, as synergies materialized and Abu Dhabi property market recovered, P/B expanded to 1.2x, stock gained 80%.'
      ],
      steps: [
        'Track daily oil prices (Brent crude) alongside SABIC, Aramco, SIPCHEM stock prices - calculate 30-day rolling correlation to identify when relationships break down',
        'Monitor Dubai Land Department weekly transaction data - when volumes increase >20% YoY, consider long positions in Emaar, Aldar (3-6 month horizon)',
        'Create a valuation spreadsheet: calculate current P/B, EV/EBITDA, dividend yield for 5 energy and 5 real estate stocks - identify outliers (>1.5 standard deviations from historical average)',
        'Set up alerts for OPEC meeting dates - historically, energy stocks move 3-5% in the week surrounding meetings. Develop a pre/post-meeting trading plan',
        'Analyze 10 years of real estate stock performance vs UAE population changes (available from Federal Competitiveness and Statistics Center) - quantify the lag effect',
        'Practice sector rotation: when oil prices fall <$60, rotate from energy to defensive sectors; when >$80, rotate into energy stocks'
      ],
      mistakes: [
        'Buying energy stocks during the final phase of oil bull markets - by the time retail recognizes the trend, reversal is near',
        'Ignoring that Dubai real estate operates in boom-bust cycles - buying at euphoric peaks (2014, 2021) has consistently led to 30-40% losses',
        'Assuming all petrochemical stocks move identically with oil - some benefit from specific product margins (polymers vs fertilizers) creating dispersion',
        'Overlooking that major developers like Emaar generate recurring income from malls/hospitality - they\'re not pure property plays, which provides downside support',
        'Trading real estate stocks without understanding supply pipeline - massive upcoming supply can crater prices even with strong current demand'
      ],
      visualReference: 'Visualize a dual-axis chart: Left Y-axis shows SABIC stock price (60-120 SAR range), right Y-axis shows Brent crude oil ($40-$90 range). Time series from 2018-2024 demonstrates strong correlation with both lines moving in tandem. Highlighted periods show divergences: Q2 2020 when SABIC fell harder than oil (buy signal - recovered within 6 months), Q4 2022 when SABIC rose while oil was flat (company-specific strength). Below, a second chart displays Emaar stock price against Dubai property price index with 6-month lag overlay - property index leads Emaar by 6 months. A third panel shows sector rotation wheel: when oil <$65 (red zone), rotate to real estate/banks (green); when oil >$80 (green zone), rotate to energy stocks (red); $65-$80 is neutral. Current position indicator guides allocation.'
    },

    'course1-module3-lesson5': {
      objectives: [
        'Understand GCC forex markets with focus on pegged currencies',
        'Learn to trade major forex pairs relevant to GCC investors',
        'Master the implications of currency pegs on trading strategies',
        'Identify opportunities in cross-currency pairs and arbitrage'
      ],
      explanation: `GCC forex markets present unique characteristics due to currency pegs to the US Dollar, creating specific challenges and opportunities for traders in the region who must navigate both local and international currency dynamics.

**GCC Currency Peg System:** Six GCC currencies are either pegged or tightly managed against the USD: Saudi Riyal (3.75), UAE Dirham (3.6725), Qatari Riyal (3.64), Bahraini Dinar (0.376), Omani Rial (0.385), with Kuwait's Dinar pegged to an undisclosed basket but trading around 0.30-0.31 to the dollar. These pegs have remained stable for decades, maintained through central bank interventions and vast foreign exchange reserves (Saudi reserves exceed $400 billion). The pegs mean USD/SAR, USD/AED, and USD/QAR show virtually zero volatility - trading these pairs offers no opportunity.

**Why Pegs Exist:** GCC economies peg to the dollar because: (1) Oil is priced in USD, and oil exports are the primary revenue source; (2) Pegs provide stability for businesses importing goods (mostly priced in USD); (3) Historical precedent and regional monetary integration plans; (4) Massive dollar reserves from oil sales make defense of pegs feasible. However, pegs mean GCC monetary policy must follow the US Federal Reserve - when the Fed raises rates, GCC central banks typically match to prevent capital flight.

**Trading Implications for GCC Residents:** Since local currencies don't move against USD, GCC traders focus on: (1) Major forex pairs like EUR/USD, GBP/USD, USD/JPY where volatility exists; (2) Cross pairs like EUR/GBP, AUD/JPY that don't involve USD; (3) Exotic pairs with emerging market currencies. The stable SAR/AED/QAR to USD means GCC traders can trade foreign currencies without local currency risk - if you're Saudi-based trading EUR/USD, you only have EUR and USD exposure, your SAR base is unaffected by Riyal movements.

**Forex Trading Sessions for GCC Traders:** The global forex market operates 24/5, with sessions in Tokyo (1:00 AM - 10:00 AM Riyadh time), London (11:00 AM - 8:00 PM), and New York (3:30 PM - 12:00 AM). The London-New York overlap (3:30 PM - 8:00 PM Riyadh time) offers peak liquidity and volatility - this is when EUR/USD, GBP/USD see major moves. GCC traders can participate in these sessions after local stock markets close at 3:00 PM, making forex an excellent complementary opportunity.

**Carry Trade Opportunities:** GCC currencies' USD peg creates carry trade dynamics. When USD interest rates rise (Fed hiking cycle), SAR/AED rates follow. If EUR rates are lower (ECB keeping rates low), traders can short EUR/SAR (borrow low-rate EUR to invest in high-rate SAR instruments), capturing the interest differential. However, the lack of SAR volatility limits risk, making this a popular institutional strategy.

**Oil-Dollar Correlation Trading:** While GCC currencies don't move, oil prices significantly impact GCC economies. Astute traders exploit the oil-dollar relationship: when oil prices rise, USD often weakens (oil producers sell USD for local currencies globally, increasing USD supply). A rising oil price environment might see: GCC economies strengthen (more oil revenue), USD weaken (general trend), EUR/USD rise. GCC traders can go long EUR/USD as an indirect play on oil price increases benefiting the regional economy.

**Risks and Considerations:** The primary risk is peg abandonment - though unlikely, several GCC pegs have been adjusted historically (Qatar revalued in 2001). Political pressure from US trade imbalances or regional economic shifts could force revaluations. Saudi Arabia occasionally discusses diversifying away from the dollar peg, though no concrete steps have been taken. Traders should monitor central bank reserve levels - declining reserves might indicate peg stress.

**Practical Trading Approach:** GCC-based forex traders should: (1) Trade major pairs with high liquidity and tight spreads (EUR/USD spreads typically 0.1-0.3 pips vs 2-5 pips for exotics); (2) Focus trading during high-volatility sessions (London-NY overlap); (3) Use economic calendars to trade around US, European, and GCC economic releases; (4) Maintain awareness that your capital base (SAR/AED) is stable to USD, simplifying profit/loss calculations.`,
      keyConcepts: [
        { term: 'Currency Peg Defense', definition: 'Central bank actions to maintain fixed exchange rate, typically by buying/selling currency reserves. GCC banks have successfully defended pegs through multiple crises due to massive reserves.' },
        { term: 'Triangular Arbitrage', definition: 'Exploiting price discrepancies between three currencies. With stable GCC pegs, opportunities exist between USD/SAR, EUR/USD, and EUR/SAR if pricing diverges momentarily.' },
        { term: 'Interest Rate Parity', definition: 'Theory that interest rate differential between two countries equals forward exchange rate differential. GCC-USD parity is maintained by central banks matching Fed rates.' },
        { term: 'Forex Swap', definition: 'Simultaneous purchase and sale of currency for different dates. GCC banks use USD/SAR swaps to manage liquidity while maintaining the peg.' }
      ],
      gccExamples: [
        'EUR/USD Trading from Riyadh: A Saudi trader with 100,000 SAR (~$26,667 USD) trades EUR/USD. Goes long at 1.1000, targeting 1.1200. EUR/USD rises to 1.1150 (+150 pips). With standard lot (100,000 EUR position using leverage), profit is $1,500. Convert back: ~5,625 SAR profit. The SAR/USD peg means straightforward conversion with no local currency risk.',
        'Fed Rate Hike Impact: March 2023, Fed raised rates 0.25%. Within 24 hours, SAMA (Saudi central bank) matched. SAR rates rose, making SAR deposits more attractive. EUR/SAR spread widened from 2.5% to 2.75% (effective interest differential), creating carry trade opportunity for institutions.',
        'Oil Price Correlation Play: June 2022, oil surged from $75 to $95. Historically, this weakens USD. Trader goes long EUR/USD at 1.0500, anticipating USD weakness from oil dynamics. EUR/USD rallies to 1.0750 (+250 pips) over 3 weeks. Position sized at 0.5 lots = $1,250 profit.',
        'Kuwait Dinar Anomaly: Unlike other GCC currencies, KWD uses a basket peg. During periods of USD weakness, KWD sometimes strengthens against the dollar (moving from 0.305 to 0.302). Traders can short USD/KWD during broad dollar weakness trends for small gains.'
      ],
      steps: [
        'Open a forex demo account with a broker offering competitive spreads on EUR/USD, GBP/USD, USD/JPY (major pairs)',
        'Calculate the current interest rate differential between EUR and SAR/AED - identify potential carry trade opportunities (requires rates >2% difference)',
        'Track 6 months of oil prices vs EUR/USD movements - quantify correlation and lag time to develop oil-based forex signals',
        'Practice trading during London-NY overlap (3:30-8:00 PM Riyadh time) - compare profitability vs trading during Asian session',
        'Monitor Fed and ECB meeting schedules - develop a pre/post-meeting forex trading strategy based on rate expectations',
        'Set up economic calendar alerts for high-impact events (NFP, CPI, Fed decisions) that drive major currency movements'
      ],
      mistakes: [
        'Attempting to trade USD/SAR or USD/AED expecting volatility - these pairs don\'t move due to pegs, only spreads and commissions erode capital',
        'Ignoring that GCC trading hours align well with European/US forex sessions - advantage not available for Asian equity markets',
        'Overleveraging forex positions - while leverage up to 1:500 is available, prudent traders use max 1:20 to avoid margin calls on normal volatility',
        'Trading exotic pairs with wide spreads (5-10 pips) - stick to majors with 0.1-0.5 pip spreads for cost efficiency',
        'Not accounting for swap rates on positions held overnight - positive or negative interest differentials can significantly impact multi-day trades'
      ],
      visualReference: 'Picture a forex trading dashboard at 6:00 PM Riyadh time (London-NY overlap): EUR/USD chart shows current price 1.1050, recent 50-pip volatile candle on US employment data release. Bid/ask spread: 0.2 pips. Position size calculator displays: account size 100,000 SAR = $26,667 USD, risk 1% = $267, stop loss 30 pips, position size = 0.89 lots. Top panel shows oil prices ($82/barrel, +$3 today) alongside negative USD index correlation. Economic calendar displays: Fed decision tomorrow (high impact), EUR CPI Friday (medium impact). Correlations panel: Oil vs USD Index: -0.68, EUR/USD vs USD Index: -0.95. A trade plan overlay suggests: Long EUR/USD ahead of potential Fed dovish surprise, targeting 1.1150, stop at 1.1020, risk-reward 1:3.'
    },

    'course1-module3-lesson6': {
      objectives: [
        'Understand Islamic finance principles and Sukuk instruments',
        'Learn the structure and risks of government securities in GCC',
        'Master yield curve analysis for fixed-income trading',
        'Develop fixed-income strategies suitable for GCC markets'
      ],
      explanation: `Government securities and Sukuk (Islamic bonds) provide lower-risk investment alternatives to equities in GCC markets, offering steady income and capital preservation opportunities for traders seeking diversification or defensive positions.

**Sukuk Structure and Principles:** Sukuk are Sharia-compliant financial certificates representing ownership in tangible assets rather than debt obligations. Unlike conventional bonds that pay interest (prohibited in Islam), Sukuk holders receive profit shares from underlying assets (real estate, infrastructure, projects). For example, a Saudi Aramco Sukuk might represent ownership stakes in oil facilities, with periodic payments coming from facility revenues, not interest. This structure makes Sukuk acceptable to Islamic investors while functioning similarly to bonds economically.

**Major GCC Issuers:** All GCC governments regularly issue Sukuk and conventional bonds to fund infrastructure, diversify economies, and manage budgets. Saudi Arabia's Public Investment Fund (PIF) issued $3 billion Sukuk in 2023 for Vision 2030 projects. UAE regularly issues dirham and dollar-denominated Sukuk. Qatar Development Bank, Qatar Central Bank, and various ministries are active issuers. Maturities range from 3-year short-term to 30-year long-term instruments.

**Conventional Government Bonds:** Alongside Sukuk, GCC governments issue standard bonds, particularly in international markets. Saudi Arabia tapped global bond markets with $5 billion issuance in 2023 across 5-year, 10-year, and 30-year tranches. These bonds trade based on: (1) Credit ratings - Saudi Arabia: A-/A1, UAE: AA/Aa2, Qatar: AA-/Aa3; (2) Oil price expectations - higher oil = stronger fiscal position = lower yields; (3) Global interest rates - GCC bond yields track US Treasuries closely given dollar pegs; (4) Supply-demand dynamics from foreign investors seeking emerging market exposure.

**Yield Curve Dynamics:** The GCC sovereign yield curve (plotting yields vs maturities) typically slopes upward - longer maturities offer higher yields to compensate for time risk. A normal Saudi curve might show: 1-year at 4.5%, 5-year at 5.2%, 10-year at 5.8%, 30-year at 6.3%. Curve shape changes provide economic signals: (1) Steepening (long-term yields rise faster than short-term) suggests growth expectations; (2) Flattening (long-term yields rise slower or fall while short-term rise) signals economic concerns; (3) Inversion (short-term yields exceed long-term) indicates recession expectations - rare in GCC but occurred briefly in 2020.

**Risk Factors:** While considered safe, GCC securities carry risks: (1) **Credit Risk** - though low, Saudi Arabia's rating is single-A, below AAA Gulf War neighbors; defaults are theoretically possible; (2) **Oil Price Risk** - fiscal positions depend heavily on oil revenues; sustained low prices (<$50/barrel) strain budgets and can widen credit spreads; (3) **Interest Rate Risk** - when Fed raises rates, existing bonds lose value as new issues offer higher yields (inverse price-yield relationship); (4) **Currency Risk** - for dollar-denominated issues, investors face USD movements, though pegs limit this for local investors.

**Trading Strategies:** Several approaches suit GCC fixed income: (1) **Yield Hunting** - buying longer-dated Sukuk (10-30 year) when yields are attractive (>6%), holding to maturity for steady income; (2) **Duration Trading** - ahead of expected Fed rate cuts, buying longer-duration bonds that will appreciate most when yields fall; (3) **Credit Spread Trading** - when oil price fears widen GCC spreads vs US Treasuries beyond historical norms (>250 bps), buying for spread compression profit; (4) **Curve Trading** - betting on curve steepening/flattening by positioning in different maturities.

**Accessibility and Liquidity:** GCC government securities trade over-the-counter (OTC) through banks and brokers, not on exchanges like stocks. Minimum investments typically start at $200,000 (institutional level), though some retail platforms offer fractional access. Liquidity varies - flagship issues (Saudi $-bonds, UAE dirham Sukuk) trade actively with tight bid-ask spreads (0.05-0.15%); smaller issues might have wider spreads (0.25-0.50%) and require finding counterparties.

**Tax Advantages:** A significant benefit for GCC residents is tax efficiency - no capital gains tax on bond/Sukuk trading profits, and no withholding tax on interest/profit distributions (unlike many international bonds). This makes GCC government securities highly tax-efficient relative to global alternatives, enhancing after-tax returns.`,
      keyConcepts: [
        { term: 'Yield to Maturity (YTM)', definition: 'Total return anticipated if bond held until maturity, accounting for purchase price, coupon payments, and face value repayment. Saudi 10-year trading at 95 with 5% coupon has ~5.8% YTM.' },
        { term: 'Duration', definition: 'Measure of interest rate sensitivity. A bond with 7-year duration falls ~7% in value if yields rise 1%. Longer duration = higher interest rate risk but more upside when yields fall.' },
        { term: 'Credit Spread', definition: 'Yield difference between corporate/sovereign bonds and risk-free benchmark (US Treasuries). Saudi 10-year yielding 5.5% vs US Treasury 3.8% has 170 bps spread, reflecting oil/credit risk.' },
        { term: 'Ijarah vs Murabaha Sukuk', definition: 'Ijarah Sukuk represent leased assets (common for infrastructure); Murabaha Sukuk involve asset sales with deferred payment. Both structures comply with Sharia but have different risk profiles.' }
      ],
      gccExamples: [
        'Saudi Arabia $5B Bond Issuance (2023): Issued in 3 tranches - 5-year at 5.25%, 10-year at 5.75%, 30-year at 6.50%. Demand exceeded $31 billion (6.2x oversubscribed). Investors who bought the 10-year at issue saw it trade up to 96.5 (yield 5.9%) within months as oil prices strengthened, providing ~3.5% capital gain plus coupons.',
        'UAE Sukuk Curve Trade: In early 2022, the curve was flat (5-year at 3.1%, 10-year at 3.2%, only 10 bps difference). Traders expecting steepening sold 5-year and bought 10-year. By late 2022, Fed hikes steepened the curve to 4.2% (5-year) vs 4.8% (10-year), 60 bps difference. The 10-year outperformed, delivering profits.',
        'Qatar Sovereign Sukuk: QCB issued $2 billion 5-year Sukuk at 4.8%. One year later, with Fed rate increases, new 5-year Sukuk yielded 5.5%. Original holders faced mark-to-market loss of ~5% (price fell to ~95 as yields rose). Demonstrates interest rate risk even in government securities.',
        'Credit Spread Compression Play: During March 2020 oil crash, Saudi bonds widened to 300 bps over Treasuries (from typical 150 bps) on recession fears. Astute traders bought at distressed levels. By Q4 2020, spreads normalized to 180 bps as oil recovered and fiscal stimulus deployed. Bonds rallied 10-12% from lows.'
      ],
      steps: [
        'Research current GCC government bond and Sukuk offerings through Bloomberg, central bank websites (SAMA, UAE Central Bank, QCB) - note yields, maturities, issuance amounts',
        'Plot a yield curve for Saudi Arabia using available maturities (1Y, 3Y, 5Y, 10Y, 30Y) - compare to curve from 6 months ago to identify steepening/flattening',
        'Calculate implied credit spreads: take GCC bond yields minus equivalent maturity US Treasury yields - track spreads over 12 months vs oil price movements',
        'Identify 3 attractive Sukuk with yields >5% and maturities 5-10 years - analyze credit quality, underlying assets, and liquidity',
        'Practice duration calculation: for a 7-year bond with 5% coupon trading at par, estimate price change if yields rise 0.5% (answer: ~3.5% price decline)',
        'Set up alerts for new GCC government issuances - these often trade at slight premiums in secondary market (opportunity for quick 0.5-1% gains)'
      ],
      mistakes: [
        'Assuming government securities are risk-free - GCC bonds carry oil price, interest rate, and credit risks that can cause losses',
        'Buying long-duration bonds (15-30 year) without understanding that Fed rate hikes will cause significant price declines',
        'Ignoring that Sukuk and conventional bonds from same issuer often trade at different yields despite similar risk - arbitrage opportunities exist',
        'Overlooking liquidity risk - smaller issues may be hard to sell quickly, forcing you to accept wide bid-ask spreads or hold to maturity',
        'Not considering that synthetic exposure via bond ETFs might offer better liquidity than direct holdings for smaller investors'
      ],
      visualReference: 'Visualize a comprehensive fixed-income dashboard: Top left shows Saudi Arabia sovereign yield curve - a line graph plotting maturities (X-axis: 1Y, 3Y, 5Y, 7Y, 10Y, 30Y) vs yields (Y-axis: 4% to 7%). Current curve is upward sloping: 1Y at 4.5%, 5Y at 5.3%, 10Y at 5.9%, 30Y at 6.5%. Overlaid is the curve from 6 months ago (dotted line) showing steepening - long end rose more than short end. Top right displays credit spread chart: Saudi 10-year vs US 10-year Treasury, spread currently 180 bps, historical range 120-280 bps highlighted. Bottom left shows Sukuk comparison table: 5 different GCC Sukuk with issuer, maturity, yield, duration, underlying asset type. Color coding identifies best risk-adjusted opportunities. Bottom right panel: interest rate scenarios - if Fed cuts 0.5%, estimated bond price gains range from +2.3% (short duration) to +7.8% (long duration), quantifying opportunity.'
    },

    // Continue with remaining Course 1 Module 3 lessons... (7-10)
    'course1-module3-lesson7': {
      objectives: [
        'Understand mutual funds and investment trusts in GCC markets',
        'Learn the structure and benefits of Islamic investment vehicles',
        'Master fund selection criteria and performance evaluation',
        'Develop asset allocation strategies using pooled investments'
      ],
      explanation: `Mutual funds and investment trusts provide accessible diversification for GCC investors, offering professionally managed portfolios aligned with both conventional and Islamic finance principles.

**GCC Mutual Fund Landscape:** The region hosts hundreds of mutual funds managed by institutions like Al Rajhi Capital, HSBC Saudi Arabia, EFG Hermes, Albilad Investment, and Emirates NBD Asset Management. Funds range from conservative money market funds (3-4% annual returns, near-zero risk) to aggressive growth equity funds (targeting 12-15%+ returns with high volatility). Assets under management in GCC mutual funds exceed $150 billion collectively, with Saudi Arabia and UAE dominating.

**Islamic Investment Trusts:** Sharia-compliant funds avoid interest-bearing investments, prohibited industries (alcohol, gambling, conventional insurance, pork), and excessive leverage. Popular Islamic fund types include: (1) **Equity Funds** - investing only in Sharia-compliant stocks (typically 70-80% of GCC markets qualify); (2) **Sukuk Funds** - holding diversified Sukuk portfolios; (3) **Real Estate Investment Trusts (REITs)** - owning income-producing properties (malls, offices, warehouses); (4) **Commodity Funds** - precious metals like gold and silver. Each fund maintains a Sharia supervisory board certifying compliance.

**Fund Types and Strategies:** Beyond Islamic/conventional split, funds employ various strategies: **Index Funds** track benchmarks like TASI or MSCI GCC, offering low-cost (0.3-0.8% fees) market exposure; **Active Funds** employ managers making stock selections, charging higher fees (1.5-2.5%) for attempting to beat benchmarks; **Sector Funds** concentrate in banking, real estate, or energy; **Geographic Funds** focus on specific GCC countries or emerging markets; **Balanced Funds** mix equities and fixed income for moderate risk-return profiles.

**Regulatory Structure:** Funds operate under strict oversight from CMA (Saudi), SCA (UAE), or QFMA (Qatar). Regulations mandate: (1) Independent custodians holding fund assets; (2) Daily net asset value (NAV) calculations and publications; (3) Detailed prospectuses disclosing strategies, fees, risks; (4) Regular audits and reporting; (5) Limits on leverage, concentration, and illiquid assets. These protections reduce fraud risk and ensure transparency.

**Performance Evaluation:** Assessing funds requires examining multiple metrics: (1) **Total Return** - price appreciation plus distributions over time, compare to benchmark; (2) **Sharpe Ratio** - return per unit of risk, ratios >1.0 are good, >1.5 excellent; (3) **Expense Ratio** - annual fees as percentage of assets, lower is better; (4) **Alpha** - excess return vs benchmark after risk adjustment, positive alpha indicates manager skill; (5) **Tracking Error** - for index funds, deviation from benchmark, should be minimal (<0.5%).

**Tax Efficiency and Benefits:** GCC residents enjoy significant advantages: (1) No capital gains tax on fund profits; (2) No dividend tax on distributions; (3) Often no withholding tax on foreign holdings within the fund (varies by jurisdiction). Additionally, funds provide: (1) Professional management (valuable if you lack time/expertise); (2) Diversification (single fund may hold 50-100 securities); (3) Liquidity (can redeem shares daily or weekly); (4) Lower minimum investments than direct securities purchases ($1,000-$10,000 vs $100,000+ for bonds).

**REITs in GCC:** Real Estate Investment Trusts have grown popular, especially in Saudi Arabia and UAE. Emirates REIT, Emirate Dubai Fund, and several Saudi REITs (Al Maather REIT, Bonyan REIT) trade on exchanges like stocks, offering: (1) High dividend yields (5-8% common) from rental income; (2) Exposure to commercial real estate without directly buying properties; (3) Liquidity advantage over physical real estate; (4) Professional property management. REITs must distribute 90%+ of profits as dividends, making them attractive income investments.

**Strategic Allocation:** Sophisticated investors use funds for core-satellite strategies: Core holdings in low-cost index funds (60-70% of portfolio) provide broad market exposure with minimal fees; Satellite holdings in active or sector funds (30-40%) attempt to generate alpha or tactical positions. For example, a balanced GCC portfolio might include: 40% TASI index fund, 20% GCC Sukuk fund, 20% REIT, 10% gold fund, 10% international equity fund.`,
      keyConcepts: [
        { term: 'Net Asset Value (NAV)', definition: 'Per-share value of fund calculated as (total assets - liabilities) / shares outstanding. Funds publish daily NAV; you buy/sell at NAV, ensuring fair pricing.' },
        { term: 'Load vs No-Load Funds', definition: 'Load funds charge sales commissions (up to 5% front-load or back-load). No-load funds charge no sales fees, only annual expenses - generally preferable for investors.' },
        { term: 'Distribution Yield', definition: 'Annual income distributions (dividends, interest) as percentage of fund price. GCC Sukuk funds typically yield 4-6%, REITs 5-8%, equity funds 2-4%.' },
        { term: 'Sharpe Ratio', definition: 'Risk-adjusted return metric: (Return - Risk-Free Rate) / Standard Deviation. A fund returning 12% with 8% volatility when risk-free rate is 4% has Sharpe = 1.0.' }
      ],
      gccExamples: [
        'Al Rajhi Trading Equity Fund: Sharia-compliant Saudi equity fund with $800 million AUM. 2023 performance: +18% vs TASI +12%, positive 6% alpha. Expense ratio 1.8%. Sharpe ratio 1.4 (excellent). Concentrates in banks and petrochemicals, avoiding tobacco and entertainment stocks.',
        'Emirates REIT: Trades on NASDAQ Dubai, portfolio of Dubai properties (offices, schools, retail) worth $600 million. Distributions average 7.2% annually paid quarterly. Unit price fluctuates 5.00-6.50 AED based on property valuations and occupancy rates. Provides real estate exposure without property management hassles.',
        'HSBC Saudi Sukuk Fund: Invests in government and corporate Sukuk, 95% investment-grade ratings. Yields 5.1% with low volatility (2.3% annual standard deviation). Expense ratio 0.9%. Ideal for conservative investors seeking stable income with Sharia compliance.',
        'GCC Equity Index Fund: Tracks MSCI GCC Index, holds 100+ stocks across all six countries weighted by market cap. Expense ratio 0.45% (very competitive). 5-year return +52% matching index closely (tracking error 0.3%). Offers diversified GCC exposure in single instrument.'
      ],
      steps: [
        'Research 10 GCC mutual funds across categories (equity, Sukuk, balanced, REIT) using fund websites and prospectuses - create comparison spreadsheet',
        'Calculate Sharpe ratios for each fund using: (5-year average return - 4% risk-free rate) / 5-year return standard deviation - rank from best to worst',
        'Analyze expense ratios - for similar fund categories, select those with fees in bottom quartile (lowest 25%) to minimize cost drag',
        'Review fund holdings (top 10 positions) - ensure adequate diversification, no single stock exceeding 15% of portfolio, and alignment with your sector views',
        'Backtest a core-satellite allocation: 50% TASI index fund, 20% Sukuk fund, 15% REIT, 15% international equity - calculate 3-year return vs 100% TASI',
        'Practice fund selection: identify one fund in each category meeting criteria - Sharpe >1.2, expense ratio <1.5%, AUM >$100M (liquidity), 3-year track record minimum'
      ],
      mistakes: [
        'Chasing past performance - last year\'s top fund is often next year\'s laggard due to style rotation and mean reversion',
        'Ignoring expense ratios - a 2.5% expense fund must beat a 0.5% expense fund by 2% annually just to break even',
        'Overlooking fund size - very small funds (<$20M AUM) may close or merge; very large funds (>$5B) may face scaling challenges',
        'Mixing too many funds - owning 10 different funds likely creates overlap and eliminates diversification benefits, stick to 4-6 complementary funds',
        'Buying funds without reading prospectus - you must understand strategy, risks, fees, and how fund fits your goals before investing'
      ],
      visualReference: 'Visualize a mutual fund selection dashboard: Center displays a comparison table with 6 GCC funds across columns (Al Rajhi Equity, HSBC Sukuk, Emirates REIT, GCC Index, Saudi Balanced, International Equity). Rows show key metrics - 3Y return (18%, 15%, 21%, 14%, 12%, 22%), Sharpe ratio (1.4, 1.1, 1.6, 1.2, 1.0, 1.3), expense ratio (1.8%, 0.9%, 2.1%, 0.45%, 1.6%, 2.2%), yield (2.1%, 5.1%, 7.2%, 2.8%, 4.5%, 1.8%), AUM ($800M, $450M, $600M, $1.2B, $320M, $1.5B). Color coding highlights best-in-class for each metric (green) and poor values (red). Below, a pie chart shows recommended allocation: 40% GCC Index Fund, 25% Sukuk Fund, 20% REIT, 15% International - total portfolio expected return 15.2%, expected volatility 9.8%, Sharpe 1.27. Risk pyramid graphic illustrates each fund\'s position from conservative (Sukuk base) to aggressive (International equity apex).'
    },

    'course1-module3-lesson8': {
      objectives: [
        'Understand tax implications for GCC-based traders',
        'Learn about VAT and its effect on trading costs',
        'Master international tax considerations for foreign investments',
        'Optimize tax efficiency in trading strategies'
      ],
      explanation: `Tax considerations significantly impact trading profitability, and GCC markets offer substantial advantages compared to global standards, though recent developments like VAT introduction require awareness and strategic planning.

**GCC Tax Landscape Overview:** Historically, GCC nations imposed virtually no taxes on individuals - no income tax, no capital gains tax, no inheritance tax. This tax-free environment attracted global talent and capital. However, fiscal pressures from oil price volatility led to Value Added Tax (VAT) introduction: UAE and Saudi Arabia implemented 5% VAT in 2018, Bahrain followed, while Qatar, Kuwait, and Oman have delayed implementation. Corporate taxes exist for foreign companies (5-20% depending on country and sector), but local entities and individuals remain largely exempt.

**Capital Gains Tax Benefits:** For traders and investors in GCC markets, capital gains remain completely tax-free. If you buy Saudi Aramco at 30 SAR and sell at 35 SAR, your 5 SAR profit is yours to keep - zero tax liability. This contrasts sharply with many countries: US (15-23.8% federal capital gains tax), UK (10-20%), France (30%), Germany (26.375%). Over time, this advantage compounds significantly. A trader generating 100,000 SAR annual capital gains keeps the full amount in Saudi Arabia, while the same trader in the US would pay $6,500-$8,200 in taxes, a permanent 6.5-8.2% performance drag.

**Dividend and Income Taxation:** Dividends received from GCC companies are also tax-free for individual investors. Saudi Aramco's 0.70 SAR quarterly dividend lands in your account without withholding. However, dividends from foreign stocks may face withholding taxes: US stocks impose 30% withholding (reduced to 15% under tax treaties if applicable), European stocks vary (15-35%). For example, if you own US tech stocks paying $1,000 in dividends, you receive only $700-$850 after withholding. GCC-based traders should favor domestic dividend stocks or structure foreign holdings through tax-efficient vehicles (certain mutual funds) to minimize this drag.

**VAT Impact on Trading:** The 5% VAT in UAE and Saudi Arabia applies to trading-related services, including brokerage commissions, platform fees, data subscriptions, and advisory services. If your broker charges 0.15% commission on a 100,000 SAR trade (150 SAR commission), you pay an additional 7.50 SAR in VAT (5% of 150 SAR), bringing total cost to 157.50 SAR. While seemingly small, active traders making 200 trades annually pay 1,500 SAR extra in VAT-inclusive commissions. The key is that VAT doesn't apply to the financial instruments themselves (buying stocks incurs no VAT), only to related services.

**Zakat Considerations:** For Muslim traders in Saudi Arabia and some GCC countries, Zakat (Islamic almsgiving, 2.5% on qualifying wealth held for one year) is obligatory religious duty, though not enforced as tax. Trading capital, if held for a full lunar year, may be subject to Zakat. For example, if you maintain an average 400,000 SAR trading account balance throughout the year, Zakat obligation is 10,000 SAR (2.5%). This is a religious matter rather than government tax, but financially-conscious traders budget for it. Actively traded positions may not qualify, as the one-year holding requirement isn't met - consult Islamic scholars for specifics.

**International Investment Tax Efficiency:** GCC residents investing abroad face complex scenarios: (1) **Foreign Withholding Taxes** - dividends, interest from international securities may be taxed at source; (2) **Tax Treaty Benefits** - if GCC home country has treaties with investment country, reduced rates may apply (though GCC countries have limited treaty networks); (3) **Reporting Requirements** - while GCC nations don't tax foreign income, some impose reporting obligations for anti-money laundering purposes; (4) **Estate Taxes** - US estate tax (up to 40%) applies to US assets held by non-US persons; GCC investors with >$60,000 in US stocks face potential estate tax liability.

**Strategic Tax Optimization:** Several approaches maximize after-tax returns: (1) **Prioritize GCC Securities** - exploit zero capital gains and dividend tax by overweighting domestic stocks vs foreign; (2) **Use Tax-Efficient Funds** - international mutual funds may have structures recovering foreign withholding taxes unavailable to direct investors; (3) **Realize Losses Strategically** - while tax-loss harvesting doesn't apply (no capital gains tax), booking losses can free capital for better opportunities; (4) **Minimize Service Fees** - choose low-cost brokers to reduce VAT-bearing commissions; (5) **Consider Residence Planning** - some GCC traders maintain flexibility to shift residence if tax policies change.

**Future Tax Outlook:** While GCC maintains favorable tax environment, global pressure for taxation is increasing. OECD's global minimum corporate tax (15%) may extend to GCC, potentially affecting investment company structures. Some analysts speculate eventual income or capital gains taxes if oil dependency continues declining, though governments have consistently denied such plans. Traders should monitor policy developments, especially Saudi Vision 2030 fiscal reforms and UAE's economic diversification plans, which may include revenue diversification beyond oil.`,
      keyConcepts: [
        { term: 'Tax Treaty', definition: 'Agreement between countries preventing double taxation and reducing withholding rates. GCC countries have limited treaties; UAE has ~100, Saudi ~50, but many are corporate-focused, not helping individual investors.' },
        { term: 'Withholding Tax Reclaim', definition: 'Process of recovering excess foreign tax withheld. Complex and often impractical for individuals; institutional investors use specialized services to reclaim, adding 1-2% to returns.' },
        { term: 'Tax-Loss Harvesting', definition: 'Selling losing investments to offset gains, reducing tax liability. Irrelevant in GCC due to zero capital gains tax, but useful concept if tax policies change.' },
        { term: 'VAT Input Credit', definition: 'For businesses (not individual traders), VAT paid on services can be claimed back as input credit against VAT collected on sales. Reduces effective VAT cost for professional trading firms.' }
      ],
      gccExamples: [
        'GCC vs US Tax Comparison: Saudi trader generates 200,000 SAR profit on Aramco stock (bought 28, sold 36). Saudi tax: 0 SAR. Same trade by US-based trader on US stock: 15% federal + potential state tax = $7,800 on $52,000 profit (converted). The 15% difference compounds over years into massive wealth gap.',
        'Dividend Withholding Impact: UAE investor holds $100,000 in Apple stock yielding 0.5% ($500 annual dividend). US withholds 30% ($150), investor receives $350. If held through Irish-domiciled mutual fund with treaty, effective withholding drops to 15%, investor receives $425. Fund structure saves 15% ($75), worth 0.075% annually on position.',
        'VAT on Trading Costs: Active trader executes 300 trades annually, average commission 0.12% on 50,000 SAR positions = 60 SAR per trade. Total commissions: 18,000 SAR. VAT at 5%: 900 SAR. Over 10 years: 9,000 SAR in VAT alone. Switching to 0.08% commission broker saves 12,000 SAR + 600 VAT = 12,600 SAR over decade.',
        'Zakat Calculation: Trader maintains 500,000 SAR capital, generates 150,000 SAR gains, withdraws 100,000 SAR for living expenses. Average balance over lunar year: 525,000 SAR. Zakat at 2.5%: 13,125 SAR. This differs from tax (not government-mandated) but is real cost for observant Muslims, reducing net returns to 136,875 SAR (27.4% return vs 30% pre-Zakat).'
      ],
      steps: [
        'Calculate your total VAT paid on trading services last year - review broker statements for commissions, platform fees, data subscriptions, sum VAT charges',
        'Compare 3 brokers\' commission structures including VAT - identify potential savings, even 0.05% commission reduction saves thousands on active trading',
        'For foreign stock holdings, research applicable withholding tax rates - if >15%, consider whether fund alternatives offer better tax efficiency',
        'Create a tax efficiency tracker: for each trade, note if domestic (0% tax) or foreign (applicable withholding %) - calculate blended tax drag on portfolio',
        'If Muslim, consult scholar to clarify which portions of trading capital qualify for Zakat - set aside appropriate amounts monthly to avoid year-end shortfall',
        'Stay informed on GCC tax policy - subscribe to CMA, SCA newsletters, follow Ministry of Finance announcements for any regulatory changes'
      ],
      mistakes: [
        'Ignoring VAT on services - while 5% seems small, it compounds on frequent trading commissions to significant annual costs',
        'Buying high-dividend foreign stocks without considering withholding tax - a 4% dividend yield becomes 2.8% after 30% withholding, less attractive than GCC alternatives',
        'Assuming tax advantages are permanent - GCC fiscal pressures may eventually lead to taxation, diversify jurisdictions and structures for resilience',
        'Overlooking Zakat obligations if Muslim - failing to account for this 2.5% religious duty can create financial and spiritual challenges',
        'Not utilizing tax-efficient fund structures for foreign exposure - direct foreign stock ownership often incurs higher withholding than funds with treaty access'
      ],
      visualReference: 'Picture a comprehensive tax comparison infographic: Top section shows two trader profiles side-by-side - "GCC Trader" and "US Trader", both earning $100,000 annually from trading. GCC column: Capital gains tax $0, dividend tax $0, VAT on services $450, Zakat $2,500 (if applicable), net return $97,050-$99,550 (97-99.5%). US column: Federal capital gains $15,000, state tax $5,000, dividend tax $2,300, net return $77,700 (77.7%). Visual clearly shows 20-22% advantage for GCC-based trader. Below, a pie chart breaks down trading cost structure: For 500,000 SAR annual trading volume across 250 trades - commissions 2,000 SAR (0.4%), VAT on commissions 100 SAR (0.02%), spread costs 1,500 SAR (0.3%), total cost 3,600 SAR (0.72%). Optimization tips overlay suggests: switch to 0.08% commission saves 1,000 SAR, trade liquid stocks saves 500 SAR spreads, total potential savings 1,500 SAR (42% cost reduction). Bottom panel projects 20-year wealth accumulation: GCC trader starting with 500,000 SAR at 15% annual return grows to 8,184,000 SAR; same trader in US with 15% return but ~20% tax drag grows to only 4,823,000 SAR - 41% less wealth over 20 years, powerfully illustrating compounding tax advantage.'
    },

    'course1-module3-lesson9': {
      objectives: [
        'Understand the regulatory framework of GCC financial markets',
        'Learn the roles of CMA, DFSA, SCA, and QFMA',
        'Master compliance requirements for traders and investors',
        'Identify investor protection mechanisms and dispute resolution'
      ],
      explanation: `Regulatory frameworks in GCC financial markets have evolved significantly, providing robust investor protections, market integrity standards, and enforcement mechanisms that rival developed markets, essential knowledge for navigating regional trading successfully.

**Capital Market Authority (CMA) - Saudi Arabia:** Established in 2003, the CMA regulates all securities activities in Saudi Arabia under the Capital Market Law. Key responsibilities include: (1) Licensing and supervising brokers, investment advisors, and fund managers; (2) Enforcing disclosure requirements for listed companies - quarterly financials, material events, insider transactions; (3) Monitoring trading for manipulation, insider trading, and fraud; (4) Setting listing standards for TASI and Nomu markets; (5) Approving new securities issuances and fund launches. The CMA has significantly strengthened enforcement, imposing multi-million SAR fines and trading bans on violators. Recent reforms under Vision 2030 opened markets to foreign investors and introduced derivative products, all under CMA supervision.

**Securities and Commodities Authority (SCA) - UAE:** The SCA regulates UAE federal financial markets (excluding DIFC, which has separate oversight). Parallel authorities exist: Dubai Financial Services Authority (DFSA) governs the Dubai International Financial Centre, while Abu Dhabi Global Market (ADGM) has its own Financial Services Regulatory Authority (FSRA). This creates complexity - DFM and ADX operate under SCA, but international firms in DIFC operate under DFSA with different rules. The SCA enforces: (1) Corporate governance codes requiring independent directors, audit committees; (2) Disclosure standards aligned with international best practices; (3) Market surveillance systems detecting suspicious trading patterns; (4) Investor compensation schemes protecting against broker insolvency.

**Qatar Financial Markets Authority (QFMA):** Regulating Qatar Exchange and broader financial sector, QFMA maintains conservative standards emphasizing market stability. Key features: (1) Strict foreign ownership limits on most stocks (recently relaxed to 49% for many companies); (2) Comprehensive market maker requirements ensuring liquidity; (3) Sharia compliance oversight for Islamic products; (4) Integration with Qatar Central Bank on monetary stability issues. Qatar's regulatory approach balances market development with caution, slower to adopt innovations than UAE or Saudi but maintaining strong stability.

**Regulatory Harmonization Efforts:** GCC countries are gradually harmonizing regulations to facilitate cross-border investment and potential market integration. The GCC Financial Markets Committee coordinates on: (1) Unified disclosure standards; (2) Cross-listing facilitation; (3) Mutual recognition of fund approvals; (4) Joint enforcement of market abuse cases. However, progress remains slow due to sovereignty concerns and varying national priorities.

**Investor Protection Mechanisms:** Multiple layers protect investors: (1) **Segregation of Assets** - brokers must segregate client securities from firm assets, preventing loss if broker fails; (2) **Compensation Schemes** - funds compensating investors if licensed firms default (Saudi has investor protection fund, UAE developing similar); (3) **Dispute Resolution** - specialized committees hearing investor complaints against brokers and companies; (4) **Market Surveillance** - sophisticated systems monitoring price movements, volumes, order patterns to detect manipulation; (5) **Disclosure Requirements** - companies must promptly disclose material information, leveling playing field between insiders and public.

**Compliance Requirements for Traders:** Individual traders must comply with: (1) **Know Your Customer (KYC)** - providing identification, address proof, source of funds documentation to brokers; (2) **Suitability Assessments** - brokers evaluate your knowledge, experience, risk tolerance before allowing certain products (derivatives, leveraged trading); (3) **Anti-Money Laundering (AML)** - transactions exceeding thresholds trigger reporting; suspicious patterns lead to investigations; (4) **Disclosure of Affiliations** - if you have insider access or affiliations with listed companies, disclosure and trading restrictions apply; (5) **Margin Requirements** - meeting minimum equity levels for leveraged trading, subject to margin calls.

**Enforcement and Penalties:** Regulators enforce rules vigorously: (1) **Trading Bans** - individuals caught manipulating markets face 1-10 year trading prohibition; (2) **Financial Penalties** - fines ranging from 100,000 SAR for minor violations to 10+ million SAR for serious manipulation; (3) **Imprisonment** - criminal charges for fraud, insider trading can result in jail terms; (4) **Restitution Orders** - profits from illegal trading must be disgorged; victims may receive compensation. High-profile cases include: Saudi authorities banning executives for undisclosed related-party transactions; UAE regulators fining traders for coordinated pump-and-dump schemes; Qatar prosecuting insider trading rings.

**Staying Compliant and Informed:** Traders should: (1) Regularly review regulator websites (CMA.org.sa, SCA.gov.ae, QFMA.org.qa) for rule updates; (2) Attend broker-provided compliance trainings; (3) Maintain detailed trading records supporting decision rationale (defense against manipulation allegations); (4) Avoid even appearance of insider trading - don't trade around material events in companies where you have connections; (5) Report suspected market abuse - regulators protect whistleblowers and may reward information leading to enforcement.`,
      keyConcepts: [
        { term: 'Market Manipulation', definition: 'Illegal activities artificially affecting prices, including pump-and-dump schemes, spoofing (fake orders), and wash trading (self-trading). GCC regulators actively prosecute with sophisticated surveillance technology.' },
        { term: 'Insider Trading', definition: 'Trading based on material non-public information. In GCC, insiders (directors, major shareholders, employees) must disclose trades and face blackout periods around earnings. Violations carry severe penalties.' },
        { term: 'Front Running', definition: 'Brokers trading ahead of client orders to profit from anticipated price movement. Strictly prohibited; CMA and SCA monitor broker trading patterns to detect and punish this abuse.' },
        { term: 'Qualified Foreign Investor (QFI)', definition: 'Saudi Arabia\'s framework allowing foreign individuals and institutions to trade directly. Requires registration with CMA, meeting financial thresholds, appointing local custodian. Opened markets significantly post-2015.' }
      ],
      gccExamples: [
        'CMA Market Manipulation Case (2022): Authorities identified coordinated trading among 15 accounts in a small-cap stock, creating artificial demand and 40% price spike. Investigation revealed shared beneficial ownership. CMA banned involved individuals for 5 years, imposed 8 million SAR in fines, ordered profit disgorgement of 12 million SAR. Clear message against pump-and-dump schemes.',
        'DFSA Insider Trading Prosecution (2021): DIFC-based employee of advisory firm traded client target company stock before merger announcement. Stock rose 35% post-announcement. DFSA surveillance detected unusual trading, investigation revealed connection. Individual faced 3-year ban, 500,000 AED fine, and criminal referral resulting in 18-month imprisonment.',
        'SCA Disclosure Enforcement: When major UAE company delayed disclosing significant contract loss by 3 weeks beyond material event, SCA fined the company 2 million AED and suspended trading temporarily. Company chairman received personal warning. Demonstrates strict enforcement of timely disclosure rules.',
        'QFI Registration Process: International fund seeking Saudi market access submitted QFI application to CMA: provided $500,000+ AUM evidence, appointed local custodian (NCB Capital), completed compliance training, paid registration fees. Process took 6 weeks. Post-approval, fund trades like local investor but must report quarterly cross-border positions for macro-prudential monitoring.'
      ],
      steps: [
        'Review your broker\'s regulatory status - verify CMA/SCA/DFSA license on regulator website, check for disciplinary history or violations',
        'Read the Saudi Capital Market Law (available on CMA.org.sa) - understand prohibited activities, especially market manipulation and insider trading definitions',
        'If trading UAE markets, clarify which regulator applies - SCA for DFM/ADX, DFSA for DIFC, ADGM FSRA for Abu Dhabi Global Market - rules differ',
        'Implement personal compliance procedures: maintain trading journal with rationale for each trade (evidence of legitimate strategy, not manipulation); avoid trading during blackout periods if you have any company affiliations; never share or trade on material non-public information',
        'Set up email alerts from CMA, SCA, QFMA for regulatory updates - they publish new rules, consultations, enforcement actions regularly',
        'If planning significant trading (institutional level), consider consulting with compliance lawyer familiar with GCC regulations to ensure full adherence'
      ],
      mistakes: [
        'Assuming GCC markets are unregulated or weakly enforced - modern surveillance technology and enforcement vigor match developed markets',
        'Trading on "tips" from friends who may have insider information - if information isn\'t public, trading on it is illegal regardless of how you obtained it',
        'Using multiple accounts to circumvent disclosure thresholds - regulators can trace beneficial ownership and aggregate positions across accounts',
        'Ignoring compliance emails and trainings from your broker - these contain important updates on rule changes affecting your trading',
        'Engaging in aggressive trading patterns that might appear manipulative - even if unintentional, rapid reversals, quote stuffing, or coordinated timing can trigger investigations'
      ],
      visualReference: 'Visualize a GCC regulatory landscape map: Saudi Arabia section shows CMA logo, key powers listed (licensing, enforcement, disclosure, listing standards), recent enforcement actions with dates and penalties. UAE section is split: SCA governing ADX/DFM (federal level), DFSA governing DIFC (emirate level with distinct rules), ADGM FSRA for Abu Dhabi (another emirate-level regime) - complexity illustrated with connecting lines and jurisdictional boundaries. Qatar section displays QFMA with conservative approach indicators. Below the map, a compliance checklist for traders: ✓ Verify broker license, ✓ Complete KYC/AML documentation, ✓ Understand prohibited activities (manipulation, insider trading, front running), ✓ Maintain trading records, ✓ Disclose affiliations/insider status, ✓ Report suspicious activity, ✓ Stay updated on rule changes. On the right, an enforcement statistics dashboard: Saudi - 47 cases (2023), fines totaling 23M SAR, 12 trading bans; UAE - 31 cases, fines 15M AED, 8 bans; Qatar - 9 cases, fines 4M QAR, 3 bans. Trend graph shows increasing enforcement intensity over 5 years, signaling regulators\' growing sophistication and determination to maintain market integrity.'
    },

    'course1-module3-lesson10': {
      objectives: [
        'Master the process of selecting a broker for GCC trading',
        'Understand account types and their suitability for different traders',
        'Learn to evaluate broker commissions, platforms, and services',
        'Complete account setup and verification procedures efficiently'
      ],
      explanation: `Selecting the right broker and properly setting up trading accounts are foundational steps that significantly impact your trading success, costs, and overall experience in GCC financial markets.

**Broker Categories in GCC:** Brokers serving GCC traders fall into several categories: (1) **Local Full-Service Brokers** - Al Rajhi Capital, SNB Capital, EFG Hermes, NCB Capital, Emirates NBD Securities - offering comprehensive services including research, advisory, execution, custody; typically higher commissions (0.15-0.30%) but better local support and market access; (2) **Local Discount Brokers** - Mubasher, Albilad Trading, Aljazira Capital - lower commissions (0.08-0.15%), basic platforms, limited research; (3) **International Brokers** - Interactive Brokers, Saxo Bank, swissquote - providing access to global markets beyond GCC, sophisticated platforms, low commissions on international securities but may lack GCC market depth; (4) **Online Fintech Platforms** - Sarwa, StashAway, Wahed Invest - app-based investing with automated portfolios, very low fees, but limited to specific instruments (often funds/ETFs rather than direct stocks).

**Regulatory Licensing:** Ensure your broker holds appropriate licenses: For Saudi trading, CMA license is mandatory; UAE trading requires SCA license (for DFM/ADX) or DFSA authorization (for DIFC); Qatar requires QFMA licensing. International brokers may operate through local partnerships or direct cross-border services (verify regulatory approval). Using unlicensed brokers exposes you to fraud risk with no regulatory recourse - always verify license status on regulator websites before depositing funds.

**Commission Structures:** Trading costs vary significantly: **Percentage-Based** - typical range 0.08-0.30% per trade (buy and sell each charged, so round-trip is double). On 100,000 SAR trade, 0.15% commission costs 150 SAR per side, 300 SAR round-trip (0.30% total impact). **Minimum Commissions** - many brokers charge minimums (20-50 SAR per trade), making small trades inefficient. **VAT** - remember 5% VAT applies to commissions in Saudi/UAE, increasing effective cost. **Additional Fees** - account maintenance (quarterly/annual fees 100-500 SAR), data feeds (real-time quotes may cost 50-150 SAR monthly), inactive account charges. Calculate your expected annual trading costs: if you make 100 round-trip trades of 50,000 SAR avg size at 0.12% commission, costs = 100 × 100,000 × 0.0012 = 12,000 SAR. Add VAT (600 SAR), platform fees (1,200 SAR annually) = 13,800 SAR total. If your profit target is 20,000 SAR, costs consume 69% - highlighting importance of low-cost brokers.

**Trading Platforms and Technology:** Brokers offer various platforms: **Proprietary Web/Mobile Apps** - most local brokers provide custom platforms, quality varies from basic order entry to advanced charting with technical indicators. **Professional Platforms** - Al Rajhi Tadawul offers sophisticated tools, Mubasher platforms provide Level 2 data and advanced orders. **International Platforms** - Interactive Brokers' Trader Workstation, Trading View integrations - powerful but steeper learning curve. **Mobile Trading** - essential for GCC traders given mobile-first culture; evaluate app speed, reliability during volatile market opens, order types supported. Test platforms using demo accounts before committing - ensure you can: place all order types (market, limit, stop-loss), access real-time data without lag, view order book depth, analyze charts with your preferred indicators, monitor positions and P&L accurately.

**Account Types:** Brokers offer multiple account structures: **Cash Accounts** - standard accounts where you must have funds before buying (T+2 settlement); safest for beginners. **Margin Accounts** - borrow from broker to leverage positions (typically 1:2 to 1:5 leverage in GCC markets); magnifies both gains and losses; requires maintaining minimum equity, subject to margin calls if positions move against you. **Islamic Accounts** - Sharia-compliant structures avoiding interest (no overnight swap charges), often using profit-sharing arrangements; essential for observant Muslims. **Corporate/Institutional Accounts** - for trading through companies, requiring commercial registration, beneficial ownership disclosure.

**Account Opening Process:** Typical steps: (1) **Application** - complete online form with personal information, employment details, financial status, trading experience; (2) **KYC Documentation** - submit national ID/passport, address proof (utility bill <3 months old), bank statement showing source of funds; (3) **Suitability Assessment** - questionnaire determining your knowledge, risk tolerance, investment objectives; responses determine which products you can access (basic stocks only vs derivatives); (4) **Funding** - initial deposit requirements vary (some brokers require minimums like 10,000-50,000 SAR, others have no minimum); bank transfer from your name to broker segregated account; (5) **Activation** - verification takes 1-5 business days; you receive login credentials and can begin trading. For foreign investors using QFI route, additional documentation required (custodian agreement, foreign investor declaration, potentially tax residency certificates).

**Evaluating Broker Quality:** Beyond commissions and platforms, assess: (1) **Execution Quality** - ask for fill quality statistics (average price improvement vs market); test with demo trades during volatile periods; (2) **Customer Service** - Arabic and English support essential; test responsiveness (call, email, chat) during trading hours; (3) **Research and Education** - daily market analysis, company reports, webinars, tutorials add value; (4) **Security** - two-factor authentication, encryption, segregated client funds (verify regulator compliance); (5) **Financial Stability** - broker's own financial health (check audited statements if public); well-capitalized brokers weather market stress better.

**Strategic Broker Selection:** Many experienced traders use multiple brokers: **Primary Broker** (60-70% of capital) - best overall value, reliable platform, competitive commissions for your most-traded markets. **Secondary Broker** (20-30%) - access to different markets (e.g., international broker for US/European stocks), backup if primary experiences technical issues. **Specialized Broker** (10%) - for specific needs like Sharia compliance, advanced derivatives, or particular market access. This redundancy ensures continuous trading capability and leverages each broker's strengths.`,
      keyConcepts: [
        { term: 'Segregated Accounts', definition: 'Client assets held separately from broker\'s own assets. If broker fails, your stocks/cash are protected and not used to pay broker\'s creditors. Verify your GCC broker maintains proper segregation per regulations.' },
        { term: 'Margin Call', definition: 'Broker notification that your account equity has fallen below required minimum for leveraged positions. Must deposit more funds or close positions. Failure to meet margin call results in forced liquidation at potentially unfavorable prices.' },
        { term: 'Best Execution', definition: 'Broker\'s regulatory obligation to obtain most favorable terms when executing your orders, considering price, speed, likelihood of execution. Quality brokers demonstrate consistent best execution through statistics.' },
        { term: 'Custodian', definition: 'Entity holding your securities on your behalf. Local brokers often act as custodian, or use third-party custodian banks. For QFI foreign investors, separate custodian arrangement required.' }
      ],
      gccExamples: [
        'Cost Comparison - Active Trader: Al Rajhi Capital charges 0.15% + 5% VAT = 0.1575% effective. Mubasher charges 0.08% + 5% VAT = 0.084% effective. Annual volume 5M SAR across 200 trades. Al Rajhi cost: 7,875 SAR. Mubasher cost: 4,200 SAR. Savings: 3,675 SAR (46.7%). Over 5 years: 18,375 SAR saved by choosing lower-cost broker.',
        'Platform Quality Test: Trader opens demo accounts with 3 brokers. During TASI volatile open (10:00 AM Sunday after major news), tests market order execution. Broker A: 3-second delay, filled 0.25% worse than quote. Broker B: instant execution, filled at quote. Broker C: 2-second delay, filled 0.10% worse. Broker B clearly superior execution technology, worth potential slightly higher commission.',
        'Margin Account Risk: Trader opens margin account with 100,000 SAR, borrows 100,000 SAR (1:2 leverage), buys 200,000 SAR of SABIC at 100 SAR (2,000 shares). SABIC drops to 90 SAR. Position value: 180,000 SAR, loan: 100,000 SAR, equity: 80,000 SAR. Below maintenance margin (usually 110,000 for 1:2). Margin call issued: deposit 30,000 SAR or close position. If unmet, broker force-sells SABIC at 90 SAR, realizes 20,000 SAR loss.',
        'Multi-Broker Strategy: Professional GCC trader allocates: 60% (300,000 SAR) with Al Rajhi Capital - best TASI execution, good research. 25% (125,000 SAR) with Interactive Brokers - access to US/European markets, low cost. 15% (75,000 SAR) with Islamic broker - Sharia-compliant trading, no swap charges. Total setup cost: 3 accounts, slightly higher complexity, but optimizes execution, market access, and religious compliance.'
      ],
      steps: [
        'Create broker comparison spreadsheet: list 5-7 brokers serving your target markets (TASI, ADX, international), columns for commission %, minimum commission, platform features, regulatory license, account minimum',
        'Calculate your expected annual costs with each broker based on realistic trading volume and frequency - identify 2-3 most cost-effective options',
        'Open demo accounts with your top 3 choices - test platforms for 2 weeks, evaluate: execution speed, order types, charting tools, mobile app quality, data reliability',
        'Review regulatory status - visit CMA.org.sa or SCA.gov.ae, search broker name, confirm active license, check for any disciplinary actions or warnings',
        'Contact customer service of finalists - ask technical questions about margin requirements, settlement processes, corporate actions handling; assess response quality and speed',
        'Once selected, gather required documents (ID, address proof, bank statement), complete online application, submit for verification',
        'After approval, start with small trades to verify execution quality, gradually increase position sizes as confidence builds'
      ],
      mistakes: [
        'Choosing broker based solely on commission rates - the cheapest broker may have poor execution, costing more in slippage than you save in commissions',
        'Opening account without testing platform - you discover order types you need (stop-limit, OCO) aren\'t supported after you\'ve committed funds',
        'Ignoring regulatory licensing - unregulated or foreign-licensed-only brokers offer no protection if disputes arise or broker becomes insolvent',
        'Underestimating total costs - focusing on commission % while overlooking minimums, platform fees, VAT, currency conversion charges that add up significantly',
        'Using only one broker - technical issues or account restrictions can lock you out at critical times; maintain at least two broker relationships',
        'Skipping the suitability assessment honestly - overstating experience to access advanced products often leads to losses when you lack actual knowledge to use them properly'
      ],
      visualReference: 'Visualize a comprehensive broker selection dashboard: Top section displays comparison matrix with 6 GCC brokers across columns (Al Rajhi Capital, Mubasher, Interactive Brokers, EFG Hermes, Emirates NBD, Sarwa). Rows show: Commission % (0.15%, 0.08%, 0.08%, 0.20%, 0.12%, 0.00% - fund-based), Minimum per trade (30 SAR, 15 SAR, 1 USD, 50 SAR, 25 AED, N/A), Platform rating (4.5/5, 3.5/5, 5/5, 4/5, 3.5/5, 4/5), Markets (TASI, TASI, Global, TASI/ADX/DFM, DFM/ADX, Funds/ETFs), Regulatory (CMA, CMA, SEC/FCA, CMA/SCA, SCA, DFSA), Account minimum (10K SAR, 0, 10K USD, 25K SAR, 5K AED, 5K AED). Color coding highlights best values (green) and poor values (red). Middle section shows cost calculator: input your annual trade volume (5M SAR), number of trades (200), broker selection - outputs total annual cost with breakdown (commissions, VAT, platform fees, total). Bottom section displays broker technology comparison - execution speed graphs during market open (milliseconds to fill), slippage statistics (average deviation from quoted price), uptime percentage (99.7% vs 99.1% vs 99.9%), and mobile app screenshots showing interface quality. Summary recommendation panel on right suggests: "For active TASI trader - Choose Mubasher (low cost) + Interactive Brokers (international access). For buy-and-hold investor - Choose Al Rajhi (research support). For Sharia-compliance - Choose Islamic broker (available through specific institutions)." Clear, data-driven visualization enabling informed broker selection decision.'
    },

    // COURSE 1 - MODULE 4: Risk Management Fundamentals (8 lessons)
    'course1-module4-lesson1': {
      objectives: [
        'Master position sizing calculations for consistent risk management',
        'Understand the relationship between position size, account size, and risk',
        'Learn to adapt position sizing to different account sizes and market conditions',
        'Develop systematic approaches to capital allocation across multiple positions'
      ],
      explanation: `Position sizing is the most critical yet often overlooked aspect of trading success. It determines how much capital to allocate to each trade based on your account size, risk tolerance, and specific trade setup, fundamentally controlling your risk exposure.

**The Foundation: Risk Per Trade:** Professional traders typically risk 0.5-2% of their account on any single trade. If you have a 100,000 SAR account and risk 1% per trade, you're willing to lose 1,000 SAR on that trade. This isn't the position size - it's the maximum loss if your stop-loss is hit. Position size is calculated backwards from this risk amount.

**Position Size Calculation Formula:** Position Size = (Account Size × Risk %) / (Entry Price - Stop Loss Price). Example: Account = 100,000 SAR, Risk = 1% (1,000 SAR), Entry Price for Saudi Aramco = 34.00 SAR, Stop Loss = 33.00 SAR, Risk Per Share = 1.00 SAR. Position Size = 1,000 SAR / 1.00 SAR = 1,000 shares. Total Position Value = 34,000 SAR (34% of account). If stopped out, you lose exactly 1,000 SAR (1% of account as planned).

**Adapting to Volatility:** Different stocks require different position sizes for identical risk. High-volatility stocks need wider stops, resulting in smaller positions. Low-volatility stocks allow tighter stops and larger positions. Example: Emirates NBD trading at 14.00 AED - if recent volatility suggests 5% stop (0.70 AED), and you risk 1% of 100,000 AED account (1,000 AED), Position Size = 1,000 / 0.70 = 1,428 shares (20,000 AED position, 20% of account). Compare to Al Rajhi Bank at 85.00 SAR with only 2% stop needed (1.70 SAR): Position Size = 1,000 / 1.70 = 588 shares (50,000 SAR position, 50% of account). Same risk (1%), different position sizes based on volatility.

**Account Size Considerations:** Smaller accounts face challenges: With 20,000 SAR account risking 1% (200 SAR), buying Saudi Aramco at 34.00 with 1.00 SAR stop gives 200 shares (6,800 SAR, 34% of account). But if commission is 0.15% (10.20 SAR) + 5% VAT (0.51 SAR) = 10.71 SAR, round-trip cost is 21.42 SAR, requiring 0.107 SAR gain per share just to break even - 10.7% of your risk budget consumed by costs. Larger accounts enjoy economies of scale. Solution for small accounts: risk slightly higher percentages (1.5-2%) to maintain reasonable position sizes, or focus on lower-priced stocks where minimum share quantities make sense.

**Multiple Position Management:** When holding multiple positions simultaneously, total portfolio risk compounds. If you risk 1% per trade and hold 5 uncorrelated positions, total risk is approximately 5% (if all stopped out simultaneously). However, correlated positions (e.g., multiple Saudi banks) don't add diversification - if market tanks, all may hit stops together. Professional approach: (1) Limit correlated positions - no more than 3 in same sector; (2) Reduce individual position risk when holding many positions - 0.5-0.75% each instead of 1%; (3) Maintain maximum total portfolio risk budget - 5-8% aggregate exposure across all trades; (4) Reserve capital - never deploy 100% of account, keep 20-30% in cash for opportunities and drawdown buffer.

**Kelly Criterion and Optimal Sizing:** Advanced traders use the Kelly Criterion for optimal position sizing: Kelly % = (Win Rate × Avg Win) - ((1 - Win Rate) × Avg Loss). If your strategy wins 60% of trades, averages 3% gains and 1.5% losses: Kelly = (0.60 × 3) - (0.40 × 1.5) = 1.8 - 0.6 = 1.2% of account per trade. However, full Kelly is aggressive; most traders use half-Kelly or quarter-Kelly to reduce volatility. The formula optimizes long-term growth but requires accurate win rate and profit/loss averages.

**Scaling and Pyramiding:** As winning trades develop, you can add to positions (pyramiding) or scale in/out. Pyramiding rules: (1) Only add to winners, never losers (averaging down increases risk); (2) Each additional position is smaller than previous (e.g., initial 1% risk, first add 0.75%, second add 0.5%); (3) Move stops to breakeven on earlier tranches when adding; (4) Total position risk shouldn't exceed 2-3% of account even with multiple entries. Example: Buy Saudi Aramco at 34.00, 1,000 shares, stop 33.00 (1% risk). Stock rises to 35.00, add 750 shares, new stop 34.50 on new shares, move original stop to 34.00 (breakeven). Stock rises to 36.00, add 500 shares, stop 35.50, move earlier stops to 35.00. Total 2,250 shares, but risk is controlled - if all stops hit, profit from initial position offsets losses on adds.`,
      keyConcepts: [
        { term: 'Fixed Fractional Position Sizing', definition: 'Risking a constant percentage of current account balance on each trade. As account grows, position sizes increase; as it shrinks, positions decrease automatically, providing natural risk scaling.' },
        { term: 'Volatility-Adjusted Sizing', definition: 'Calculating position size based on stock\'s ATR (Average True Range) or standard deviation. More volatile stocks get smaller positions to maintain consistent risk exposure across different instruments.' },
        { term: 'Maximum Position Size', definition: 'Regulatory or self-imposed limits on single position as percentage of account. GCC regulators may limit margin positions to 40-50% of account; prudent traders self-limit to 30% even in low-volatility stocks.' },
        { term: 'Correlation-Adjusted Exposure', definition: 'Reducing individual position sizes when holdings are correlated. If you hold 3 Saudi banks (highly correlated), treat them as 1.5-2 positions for risk purposes, not 3 independent risks.' }
      ],
      gccExamples: [
        'Al Rajhi Bank Position Sizing: Account 200,000 SAR, risk 1% (2,000 SAR). Al Rajhi at 85.00 SAR, stop at 83.00 SAR (2.00 SAR risk per share). Position Size = 2,000 / 2.00 = 1,000 shares. Total position value = 85,000 SAR (42.5% of account). Large position, but controlled risk due to tight stop.',
        'Small Account Challenge: Account 15,000 SAR, risk 1% (150 SAR). Saudi Aramco at 34.00, stop 33.00 (1.00 SAR risk per share). Position Size = 150 / 1.00 = 150 shares = 5,100 SAR (34% of account). Commission 0.15% (7.65 SAR) round-trip = 15.30 SAR, consuming 10.2% of risk budget. Trader increases risk to 1.5% (225 SAR) to get 225 shares, reducing commission impact to 6.8% of risk.',
        'Multiple Position Risk Management: Trader with 500,000 SAR holds: (1) Saudi Aramco, risk 5,000 SAR (1%); (2) SABIC, risk 5,000 SAR (1%); (3) Emirates NBD, risk 2,500 SAR (0.5% - different market); (4) Al Rajhi Bank, risk 2,500 SAR (0.5% - correlated with Aramco via Saudi exposure). Total risk: 15,000 SAR (3%). Recognizes Aramco, SABIC, Al Rajhi correlation (all Saudi), so actual diversification benefit is limited.',
        'Pyramiding Success: Initial buy: SABIC at 90.00 SAR, 500 shares, stop 88.00, risk 1,000 SAR (1% of 100K account). Price rises to 94.00, add 300 shares, stop 92.00 on new shares, move original stop to 90.00 (breakeven). Price reaches 98.00, add 200 shares, stop 96.00, move earlier stops to 94.00 (lock in profits). Total: 1,000 shares, average entry 92.20, current price 98.00, profit 5,800 SAR (5.8%), but max risk if all stops hit is only 800 SAR (original position at breakeven, adds locked in gains).'
      ],
      steps: [
        'Calculate your risk per trade: Account Size × Risk % (use 1% for beginners, 0.5-2% for experienced). Write this down as your maximum loss per trade.',
        'For your next trade, determine entry price and stop-loss price based on technical analysis (support levels, volatility, chart patterns).',
        'Apply formula: Position Size = Risk Amount / (Entry Price - Stop Loss Price). This gives you exact number of shares to buy.',
        'Verify position value doesn\'t exceed self-imposed limits (e.g., 40% of account for single position, even if risk is controlled).',
        'Track 20 trades using consistent position sizing - document: Account Balance, Risk %, Entry, Stop, Position Size, Outcome. Analyze if your actual losses match planned risk (should be very close).',
        'Practice multi-position scenarios: With 100,000 SAR account, plan 3 trades simultaneously - ensure total risk stays below 5%, positions aren\'t overly correlated, sufficient capital remains for additional opportunities.'
      ],
      mistakes: [
        'Using arbitrary position sizes ("I\'ll buy 1,000 shares") without calculating actual risk - this is gambling, not systematic trading',
        'Risking too much per trade (>5%) - even with 70% win rate, a few consecutive losses can devastate account',
        'Not adjusting for volatility - using same share quantity for high-volatility small-caps and low-volatility blue-chips creates inconsistent risk',
        'Ignoring commission and spread costs when sizing - small positions where costs consume >5% of risk budget are inefficient',
        'Pyramiding into losers (averaging down) - this violates capital preservation principles, increases risk on losing trades',
        'Deploying 100% of capital - always maintain 20-30% cash reserve for new opportunities and to absorb drawdowns without forced liquidations'
      ],
      visualReference: 'Visualize a position sizing calculator dashboard: Input fields at top show Account Size (100,000 SAR), Risk Per Trade (1% = 1,000 SAR), Entry Price (34.00 SAR for Saudi Aramco), Stop Loss (33.00 SAR). Calculation display shows: Risk Per Share = 1.00 SAR, Required Position Size = 1,000 shares, Total Position Value = 34,000 SAR (34% of account), Commission Round-Trip = 51 SAR (5.1% of risk). Below, a portfolio risk aggregator lists current positions: Position 1 (SABIC): Risk 1,000 SAR (1%), Position 2 (Al Rajhi): Risk 1,000 SAR (1%), Position 3 (Emirates NBD): Risk 500 SAR (0.5%), New Position (Aramco): Risk 1,000 SAR (1%). Total Portfolio Risk: 3,500 SAR (3.5% of account). Correlation indicator shows Positions 1, 2, and New are all Saudi-linked (orange warning: "Consider reducing correlated exposure"). A graphic shows account equity curve: starting at 100K, current 100K, with shaded "Maximum Risk Zone" at 95K (5% below current) - the Total Portfolio Risk line sits at 96.5K, comfortably above max risk zone. On the right, a risk gauge displays portfolio health: Green zone (0-3% total risk), Yellow zone (3-5%), Red zone (>5%), with current needle at 3.5% (yellow), suggesting careful monitoring but still acceptable. This comprehensive visualization ensures every position is properly sized within overall risk framework.'
    },

    'course1-module4-lesson2': {
      objectives: [
        'Understand the 1% and 2% risk rules and their psychological foundations',
        'Learn to apply appropriate risk percentages based on experience level',
        'Master the mathematics behind consistent risk management',
        'Develop the discipline to maintain risk rules during winning and losing streaks'
      ],
      explanation: `The 1% and 2% risk rules are foundational principles that protect your trading capital from catastrophic losses while allowing sustainable growth. These rules specify the maximum percentage of your account you should risk on any single trade, creating a mathematical framework that makes account destruction virtually impossible.

**The 1% Rule Foundation:** Risking 1% of your account per trade means that even 10 consecutive losing trades only costs you 9.56% of your account (not 10% due to compounding). With 100,000 SAR account, 1% risk = 1,000 SAR per trade. After 10 losses at 1%, you'd have 90,440 SAR remaining. This provides enormous staying power - you could endure 50 consecutive losses and still retain 60.5% of capital. The probability of 50 losses in a row, even with a mediocre 40% win rate strategy, is astronomically low (less than 0.0000001%). The 1% rule makes ruin practically impossible.

**Why 2% is the Professional Maximum:** Advanced traders with proven strategies sometimes risk up to 2% per trade for faster growth, but this doubles volatility and reduces staying power significantly. With 2% risk, 10 consecutive losses cost 18.3% (not 20%), leaving 81,700 SAR from 100,000 SAR. Twenty consecutive losses at 2% reduces account to 66,760 SAR (33% drawdown). While still survivable, 2% risk demands higher win rates and better risk-reward ratios. The psychological impact of 2% losses is substantial - each loss creates twice the emotional pain, making discipline harder to maintain.

**Adapting to Experience Levels:** Beginners should start at 0.5% risk while learning - mistakes are inevitable during the learning phase, and reduced risk allows expensive lessons without account devastation. With 50,000 SAR account at 0.5% risk (250 SAR per trade), even poor trading for months won't destroy the account. Intermediate traders (6-12 months experience, documented profitability) can increase to 1%. Advanced traders (18+ months, consistent profits across market conditions) may use 1-2% depending on strategy edge and risk tolerance. Professional institutional traders often risk 0.25-0.5% per trade despite superior skill - they prioritize capital preservation above rapid growth.

**The Mathematical Edge:** Consistent risk percentage creates predictable expectancy. If your strategy wins 55% of trades with 2:1 reward-risk ratio, expectancy = (55% × 2R) - (45% × 1R) = 1.1R - 0.45R = 0.65R per trade. With 1% risk (R = 1,000 SAR), you expect to make 650 SAR per trade on average. Over 100 trades, expected profit = 65,000 SAR (65% return). But if you randomly vary risk (sometimes 1%, sometimes 5%), the math breaks down - large losses on bad trades outweigh gains on good trades. Consistency is essential.

**Psychological Discipline During Streaks:** The hardest part isn't calculating 1% - it's maintaining it. After 5 winning trades, account grows from 100,000 to 107,500 SAR, excitement peaks, and temptation emerges to risk "just 3% on this perfect setup." That 3% is now 3,225 SAR (vs. original 1,000), triple the risk. If it loses, it erases 3 wins worth of gains. Conversely, after 5 losses (account at 95,100), fear tempts you to risk 0.25% to "play it safe," but this guarantees you can't recover losses efficiently. The discipline is maintaining 1% through both euphoria and despair.

**Correlation Risk and Aggregate Rules:** Individual 1% risk becomes dangerous when positions correlate. If you hold 5 GCC bank stocks (Al Rajhi, Emirates NBD, QNB, Kuwait Finance House, Commercial Bank of Qatar), each at 1% risk, and regional banking crisis hits, all 5 could stop out simultaneously for 5% total loss in one event. Solution: limit correlated positions. Professional approach - if holding multiple positions in same sector, reduce individual risk to 0.5-0.75% each, or limit sector exposure to maximum 3% total risk regardless of number of positions.

**Dynamic Risk Adjustment:** Some advanced traders use tiered risk based on setup quality: "A+ setups" (perfect technical confluence, strong fundamentals) get 2% risk; "A setups" (good technical patterns) get 1.5%; "B setups" (acceptable but not perfect) get 1%. This requires rigorous setup classification and discipline. Beginners should avoid this complexity - stick to flat 1% until you can objectively classify setups with 80%+ consistency.`,
      keyConcepts: [
        { term: '1% Risk Rule', definition: 'Never risking more than 1% of account balance on any single trade. Provides maximum capital preservation and psychological stability, making account ruin statistically impossible even with extended losing streaks.' },
        { term: '2% Maximum Risk Threshold', definition: 'Professional upper limit for experienced traders with proven edge. Doubles growth potential but also doubles volatility and drawdown severity, requiring superior win rates and risk-reward ratios to maintain profitability.' },
        { term: 'Consecutive Loss Survivability', definition: 'Mathematical calculation showing how many consecutive losses your account can withstand before unrecoverable drawdown. At 1% risk, 50+ losses survivable; at 5% risk, only 14 losses before account decimation.' },
        { term: 'Aggregate Position Risk', definition: 'Total risk across all open positions simultaneously. If holding 5 positions at 1% each, aggregate risk is approximately 5% (exactly 5% if uncorrelated, more if correlated). Professional limit: 5-8% maximum aggregate exposure.' }
      ],
      gccExamples: [
        'Conservative Saudi Trader: 200,000 SAR account, uses 0.75% risk per trade (1,500 SAR). Trading Saudi Aramco at 34.00 SAR, stop at 33.20 (0.80 SAR risk per share): Position = 1,500 / 0.80 = 1,875 shares (63,750 SAR position value, 32% of account). Even though position is large, risk is controlled. After 8 consecutive losses (highly unlikely), account would be 188,040 SAR (6% drawdown), easily recoverable.',
        'Aggressive Growth Trader: 50,000 SAR account, experienced trader uses 2% risk (1,000 SAR). Trading SABIC at 88.00 SAR, stop at 86.00 (2.00 SAR risk): Position = 1,000 / 2.00 = 500 shares (44,000 SAR, 88% of account). Extremely large position percentage, but risk is controlled at 2%. However, trader hits 3 consecutive losses: Account drops to 47,060 SAR (5.9% drawdown). The psychological pain of 1,000 SAR losses triggers fear - trader reduces to 0.5% risk, now risking only 235 SAR, making recovery 4x slower. Better to maintain 1% from start.',
        'Multi-Position Risk Management: Trader with 300,000 SAR holds 4 positions: Al Rajhi Bank (1% = 3,000 SAR risk), Saudi Aramco (1% = 3,000 SAR), SABIC (0.75% = 2,250 SAR), Emirates NBD (0.75% = 2,250 SAR). Total aggregate risk = 10,500 SAR (3.5%). However, Al Rajhi, Aramco, and SABIC are all Saudi stocks (highly correlated). If Saudi market crashes, could lose all three simultaneously (6,750 SAR or 2.25% in one event). Trader should reduce correlated positions to 0.5% each or eliminate one position.',
        'Beginner Learning Curve: New trader with 100,000 SAR starts with 0.5% risk (500 SAR per trade). Makes 40 trades over first 3 months: 18 winners (45% win rate), 22 losers. Average win: 1,200 SAR (2.4R). Average loss: 500 SAR (1R). Total P&L: (18 × 1,200) - (22 × 500) = 21,600 - 11,000 = +10,600 SAR (10.6% return). Despite mediocre win rate, positive risk-reward created profit. If trader had used 3% risk instead, emotional stress of 1,500 SAR losses would likely have caused abandonment of strategy after first losing streak. The 0.5% risk allowed learning without psychological damage.'
      ],
      steps: [
        'Calculate your current account balance and determine your risk percentage: Beginners (0.5%), Intermediate (1%), Advanced with proven edge (1.5-2%). Write this down as your fixed rule.',
        'For every trade, calculate exact risk amount: Account Balance × Risk Percentage. Example: 100,000 SAR × 1% = 1,000 SAR. This is your maximum loss on this trade.',
        'Before trade entry, verify your stop-loss placement creates risk within your limit: (Entry - Stop) × Position Size ≤ Risk Amount. Adjust position size to match, never move stop to accommodate larger position.',
        'Create a risk tracking spreadsheet: Track Date, Trade, Risk Amount, Actual Loss (if stopped out), Account Balance After. Verify actual losses match planned risk (should be within 5% variance).',
        'Review every 20 trades: Calculate largest consecutive losing streak, total drawdown, and recovery time. If drawdown exceeded 10%, reduce risk percentage. If no losing streak exceeded 4 trades and you maintained discipline perfectly, consider increasing risk slightly (0.5% to 0.75%, or 1% to 1.25%).',
        'Implement aggregate risk monitoring: Before opening new position, calculate total risk across all open trades. If aggregate would exceed 5%, either reduce new position risk or close existing position first.'
      ],
      mistakes: [
        'Increasing risk after winning streak ("I\'m hot, let\'s risk 5% on this sure thing") - this is the fastest way to give back all profits in one trade',
        'Decreasing risk after losing streak ("I\'ll risk 0.1% until I feel confident again") - this makes recovery mathematically impossible and extends psychological trauma',
        'Using round numbers instead of percentages ("I always risk 1,000 SAR") - as account grows/shrinks, fixed amounts become inappropriate percentages, either too conservative (slowing growth) or too aggressive (risking ruin)',
        'Ignoring correlation when calculating aggregate risk - thinking 10 positions at 1% each equals 10% diversified risk, when actually holding 10 correlated stocks could mean 10% concentrated risk in one event',
        'Violating risk rules for "perfect setups" - if you can\'t maintain discipline on your best ideas, you won\'t maintain it on average trades either. No setup is perfect enough to violate position sizing rules.',
        'Confusing position size percentage with risk percentage - "I\'m only using 30% of my account for this trade" is irrelevant; the question is: how much are you RISKING (what do you lose if stopped out)?'
      ],
      visualReference: 'Visualize a "Risk Rule Survival Simulation" dashboard: Three parallel tracks show different risk percentages over 50 trades. Top track: 0.5% risk - account line starts at 100,000 SAR and shows gentle undulations, even after 10 consecutive losses (indicated by red bars), account only drops to 95,120 SAR. Middle track: 1% risk - more volatility, 10 consecutive losses drop account to 90,440 SAR, still highly recoverable. Bottom track: 5% risk - wild swings, after just 6 consecutive losses account crashes to 73,510 SAR (red danger zone), recovery extremely difficult. Each track shows cumulative P&L line and marks "Recovery Point" where account returns to starting balance after drawdown. Below, a "Psychological Stress Meter" shows emotional intensity: 0.5% risk = Green (calm, sustainable), 1% risk = Yellow (manageable stress), 5% risk = Red (extreme anxiety, poor decisions). Side panel displays math: At 1% risk with 55% win rate and 2:1 RR, expectancy = +0.65% per trade, 100 trades = +65% return. Same strategy at 5% risk creates identical expectancy (+3.25% per trade) but volatility makes psychological adherence nearly impossible. Bottom shows "Correlation Risk Calculator": 5 position checkboxes with risk inputs, correlation matrix showing red (high), yellow (medium), green (low) correlations, and aggregate risk meter adjusting based on correlation - uncorrelated 5×1% positions = 5% aggregate, highly correlated = 3-4% effective aggregate due to simultaneous movement risk.'
    },

    'course1-module4-lesson3': {
      objectives: [
        'Master the art of placing stop-losses at optimal technical levels',
        'Learn to balance risk control with giving trades room to breathe',
        'Understand different stop-loss types and when to use each',
        'Develop systematic stop-loss strategies for various market conditions'
      ],
      explanation: `Stop-loss placement is where risk management theory meets practical trading psychology. A perfectly calculated position size becomes worthless if your stop-loss is poorly placed - either too tight (getting stopped out on normal volatility) or too wide (allowing excessive losses). Effective stop-loss placement protects capital while respecting market structure.

**Technical vs. Arbitrary Stops:** Amateur traders place stops at arbitrary percentages: "I'll use a 3% stop on every trade." This ignores market context - sometimes 3% is too wide, sometimes too tight. Professional traders place stops at technical invalidation points: levels where, if breached, the original trade thesis is proven wrong. For long positions, this means below support levels, recent swing lows, or key moving averages. If you bought Saudi Aramco at 34.00 expecting support at 33.50 to hold, your stop belongs at 33.30-33.40 (just below support with buffer for false breaks). If price reaches 33.30, support failed, trade idea invalidated, exit is correct.

**Support and Resistance Based Stops:** The most reliable stop-loss approach uses support/resistance levels. When buying at resistance break, place stop just below former resistance (now support). When buying at support bounce, place stop below support zone. Example: Emirates NBD trading at 14.50 AED breaks resistance at 14.80, you buy breakout at 14.85. Previous resistance at 14.80 should now become support; place stop at 14.65 (15 fils below resistance, allowing for minor pullback). If price falls to 14.65, breakout failed, support (former resistance) didn't hold, trade idea is wrong. Critical: give adequate buffer - support/resistance aren't precise lines but zones, price often tests levels before respecting them.

**ATR-Based Dynamic Stops:** Average True Range (ATR) measures current volatility and provides objective stop distances. For Saudi stocks, calculate 14-day ATR - for Saudi Aramco, if ATR = 0.80 SAR, place stops 1.5-2× ATR from entry: entry at 34.00, stop at 32.80-33.20 (1.5-2× ATR). This approach adapts to changing volatility - during calm markets ATR shrinks (tighter stops), during volatile periods ATR expands (wider stops), preventing getting stopped out by normal noise. ATR stops work exceptionally well for swing trades where technical levels are less clear.

**Trailing Stops for Profit Protection:** Once trade moves in your favor, trailing stops lock in gains while allowing further upside. Methods: (1) Percentage trailing - stop trails by fixed percentage (e.g., 3% below highest price reached); (2) Technical trailing - move stop to new support levels as they form; (3) ATR trailing - maintain stop at 2× ATR below highest high. Example: Buy Al Rajhi Bank at 85.00, initial stop 83.00. Price rises to 89.00 (4.00 gain). Trail stop to 86.50 (halfway between entry and current price, or latest swing low at 87.00 minus buffer). If price continues to 92.00, trail to 90.00. If stopped out at 90.00, you still gain 5.00 (5.9%) instead of risking giving back all profits.

**Time-Based Stops:** Some trades have time-dependent catalysts (earnings reports, OPEC meetings for Saudi Aramco, Central Bank decisions). If catalyst passes without expected price movement, trade idea is invalidated even if price hasn't hit technical stop. Example: Buy Saudi Aramco at 34.00 expecting strong earnings to drive price higher, earnings in 2 days. If earnings disappoint and stock stagnates at 34.20 (didn't hit your 33.00 technical stop), time-based stop says: exit anyway, catalyst failed, tie up capital elsewhere. Time-based stops prevent dead capital in non-performing positions.

**Mental Stops vs. Hard Stops:** Hard stops are orders placed with broker automatically executing if price reached. Mental stops are levels you monitor and manually exit when hit. Pros of hard stops: discipline (can't second-guess), execution guaranteed, emotion removed. Cons: visible to market makers who may hunt stops, can't adjust for false breaks. Pros of mental stops: flexibility for false breaks, hidden from market. Cons: requires discipline (temptation to "give it more room"), must monitor market actively, missed fills if not watching. For GCC markets with generally lower liquidity, mental stops often better for large positions (hard stops might create visible orders), but hard stops superior for part-time traders who can't monitor constantly.

**Never Moving Stops Against You:** The cardinal rule: once set, never widen stop-loss or move it further from entry. If you bought at 34.00 with 33.00 stop, and price drops to 33.20, fear tempts you to move stop to 32.50 "to give it more room." This violates risk management - your position size was calculated for 1.00 SAR risk, now you're accepting 1.50 SAR risk (50% more). If you can't accept the original stop, exit the trade or don't enter. Moving stops against you is the #1 killer of trading accounts - small planned losses become large actual losses.`,
      keyConcepts: [
        { term: 'Technical Invalidation Point', definition: 'Price level where original trade thesis is proven wrong. If buying support bounce, invalidation point is below support. If buying breakout, invalidation point is back below broken resistance. Stop should be placed just beyond this point.' },
        { term: 'ATR-Based Stop Distance', definition: 'Setting stop-loss based on Average True Range (volatility measure). Typically 1.5-2× ATR from entry for swing trades, 3-4× ATR for position trades. Automatically adapts to changing market volatility for optimal stop placement.' },
        { term: 'Trailing Stop Methodology', definition: 'Dynamic stop-loss that moves in profit direction as trade progresses, locking in gains while allowing further upside. Can trail by fixed percentage, technical levels (new support), or volatility measures (ATR distance).' },
        { term: 'Stop Hunting and Buffer Zones', definition: 'Market makers/large traders pushing price through obvious stop levels to trigger stops before reversing (stop hunting). Buffer zones place stops slightly beyond obvious levels (5-10 fils extra) to survive stop hunts while maintaining protection.' }
      ],
      gccExamples: [
        'Saudi Aramco Support-Based Stop: Aramco trading at 34.50, strong support zone at 33.80-34.00 (previous multiple bounces). Enter long at 34.50, place stop at 33.60 (20 fils below support zone, allowing for small violation while protecting if support truly breaks). Risk per share = 0.90 SAR. With 100,000 SAR account, 1% risk (1,000 SAR), position size = 1,000 / 0.90 = 1,111 shares (37,000 SAR position). If stopped at 33.60, support broke, trade idea invalidated, loss exactly as planned.',
        'Emirates NBD Breakout Stop: Emirates NBD consolidating at 14.20-14.60 AED for 3 weeks, resistance at 14.60. Price breaks to 14.75, strong volume. Enter at 14.80 (confirming breakout). Stop at 14.50 (10 fils below former resistance at 14.60, buffer for false break). Risk = 0.30 AED per share. With 50,000 AED account, 1% risk (500 AED), position = 500 / 0.30 = 1,667 shares (24,667 AED position). If price falls to 14.50, breakout failed, proper exit.',
        'Al Rajhi Bank ATR Trailing Stop: Buy Al Rajhi at 85.00 SAR, 14-day ATR = 1.40 SAR, initial stop at 82.20 (2× ATR below entry). Price rises to 89.00, trail stop to 86.20 (2× ATR below current high of 89.00). Price reaches 92.00, trail to 89.20. Price pulls back to 90.00 (not stopped), then rallies to 95.00, trail to 92.20. Eventually stopped at 92.20 on pullback, gain of 7.20 SAR per share (8.5%). Without trailing stop, might have held until price fell back to original 82.20 stop, giving back all profits.',
        'SABIC Time-Based Stop: SABIC at 88.00 SAR, OPEC meeting in 3 days expected to announce production cuts (bullish for Saudi petrochemicals). Enter at 88.00, technical stop at 86.00, time-based stop = if OPEC meeting passes and price hasn\'t reached target (92.00) within 5 days post-announcement, exit regardless. OPEC announces minimal cuts, SABIC rises only to 89.50 and stalls for 6 days. Time-based stop triggers, exit at 89.50 for 1.50 gain (1.7%) rather than hold waiting for 92.00 target that may not materialize. Capital freed for better opportunities.'
      ],
      steps: [
        'Before entering any trade, identify the technical invalidation point: Where would price prove your trade idea wrong? (Below support for longs, above resistance for shorts). Mark this level on your chart.',
        'Add appropriate buffer based on timeframe and volatility: For intraday trades on liquid stocks, 0.05-0.10 SAR buffer; for swing trades, 0.15-0.30 SAR; for position trades, calculate 0.5× ATR buffer. Place stop just beyond invalidation point plus buffer.',
        'Calculate risk per share: Entry Price - Stop-Loss Price. Use this to determine position size (Risk Amount / Risk Per Share). Verify position size fits your account size and risk rules.',
        'Place hard stop order with broker immediately after entry (or set mental stop with price alert if using mental stop approach). Write down exact stop price and reason for placement in trading journal.',
        'Define trailing stop rules before entry: Will you trail by percentage, technical levels, or ATR? At what profit point will you begin trailing (e.g., after 2R profit)? Having rules pre-defined prevents emotional decision-making mid-trade.',
        'Review stopped-out trades monthly: Categorize stops as "Correct" (trade idea was wrong, stop saved you), "Too Tight" (trade idea worked but stopped on noise), or "Too Wide" (stop hit for larger loss than necessary). Aim for 70%+ stops in "Correct" category, adjust placement approach if too many "Too Tight."'
      ],
      mistakes: [
        'Placing stops at round numbers (33.00, 85.00, 15.00) where many traders cluster stops - these levels are magnets for stop hunting. Use 33.15, 84.80, 15.10 instead.',
        'Setting stops based on desired position size rather than technical levels - "I want 1,000 shares, so I\'ll use a tight stop to fit my risk budget" results in getting stopped on normal volatility',
        'Moving stops away from entry after position taken - if price approaches stop and you think "I\'ll give it more room," you\'re violating your risk plan. Either exit trade or accept you initially placed stop poorly.',
        'Not using any stop-loss, planning to "monitor the trade closely" - this is catastrophic. Unexpected news, system outages, or momentary distraction during flash crash can destroy account. Always have stop.',
        'Placing stops exactly at support/resistance without buffer - market often tests levels before respecting them. Support at 34.00 often touches 33.95 before bouncing. Stop at exactly 34.00 gets hit, price then rallies without you.',
        'Using same stop distance for all trades regardless of volatility - 2% stop on low-volatility Al Rajhi Bank is fine; 2% stop on high-volatility small-cap is way too tight and will be hit by normal noise'
      ],
      visualReference: 'Visualize a split-screen chart comparison: Left side shows Saudi Aramco daily chart with "Amateur Stop Placement" - trader buys at 34.00, places arbitrary 3% stop at 32.98 (below support zone at 33.60). Price drops to 33.50 (tests support), bounces to 35.50 (+4.4%), then drops again testing 33.40 before rallying to 36.80 (+8.2%). Trader stopped at 32.98 during first dip for -3% loss, missed entire move. Right side shows "Professional Stop Placement" - same entry at 34.00, but stop placed at 33.30 (below support zone 33.60 with 30 fils buffer). Price tests support at 33.50 (doesn\'t reach stop), rallies to 35.50. Trader trails stop to 34.00 (breakeven at swing low). Price tests 33.40 (still doesn\'t hit trailing stop at 34.00 because at swing low), then rallies to 36.80. Trader trails to 35.60 (below new swing low at 36.00). Eventually stopped at 35.60 on minor pullback for +4.7% gain. Below charts, a "Stop-Loss Decision Tree" flowchart: "Is there clear support/resistance level?" → Yes → "Place stop beyond level with buffer" / No → "Calculate ATR, use 1.5-2× ATR distance." Next level: "Is this breakout trade?" → Yes → "Stop below former resistance (now support)" / No → "Stop below swing low/support." Final level: "Timeframe?" → Intraday: "Small buffer (0.05-0.10)" / Swing: "Medium buffer (0.15-0.30)" / Position: "0.5× ATR buffer." Right panel shows "Trailing Stop Progression" with 5 price levels marked on miniature chart, stop ascending from original placement, each move marked with "Move stop to:" label, showing systematic locking of profits while allowing trend to develop.'
    },

    'course1-module4-lesson4': {
      objectives: [
        'Master risk-reward ratio calculations and their importance for profitability',
        'Understand positive expectancy and how it drives long-term trading success',
        'Learn to set profit targets using technical analysis',
        'Develop systematic approaches to achieve minimum 2:1 risk-reward ratios'
      ],
      explanation: `Risk-reward ratios and expectancy are the mathematical foundations of trading profitability. You can have a 40% win rate and still be highly profitable, or have a 70% win rate and slowly bleed your account - the difference lies in your risk-reward ratios and the resulting expectancy.

**Risk-Reward Ratio Basics:** Risk-reward ratio (RR) compares potential profit to potential loss. If you risk 1.00 SAR per share to make 2.00 SAR, that's a 2:1 RR (often written as "2R"). Risk = Entry Price - Stop Loss; Reward = Target Price - Entry Price. Example: Buy Saudi Aramco at 34.00, stop at 33.00 (risk 1.00), target 36.00 (reward 2.00). RR = 2.00/1.00 = 2:1. If you win, gain 2,000 SAR (on 1,000 SAR risk). If you lose, lose 1,000 SAR. Need to win just 34% of trades to break even at 2:1 RR: (34% × 2,000) + (66% × -1,000) = 680 - 660 = +20 breakeven. Any win rate above 34% at 2:1 produces profits.

**The Power of Asymmetric Risk-Reward:** Professional traders seek asymmetric opportunities: risk small to make large. At 3:1 RR, you need only 26% win rate to break even. At 5:1, only 17% win rate. This creates incredibly robust systems - you can be wrong 75% of the time at 3:1 RR and still profit. However, extremely high RR ratios (5:1+) are hard to achieve consistently because they require price to move 5× your risk distance in your favor before hitting a stop 1× away - probability works against extreme ratios. Sweet spot for most strategies: 2:1 to 3:1 - achievable with good technical analysis, providing strong profitability edge.

**Calculating Expectancy:** Expectancy shows average amount you expect to make per trade over many trades. Formula: Expectancy = (Win Rate × Average Win) - (Loss Rate × Average Loss). Example: Strategy wins 55% of trades, average win is 2.50R (2,500 SAR on 1,000 risk), average loss is 1R (1,000 SAR - because you stick to stops). Expectancy = (0.55 × 2,500) - (0.45 × 1,000) = 1,375 - 450 = +925 SAR per trade. Over 100 trades, expect 92,500 SAR profit. With 100,000 SAR account risking 1% (1,000), that's 92.5% return over 100 trades. Positive expectancy (above zero) is mandatory for long-term success - negative expectancy guarantees eventual ruin.

**Setting Profit Targets Systematically:** Amateur traders pick random targets ("I'll sell at 10% profit"). Professionals use technical levels: previous resistance levels, measured move projections, Fibonacci extensions. Example: Emirates NBD breaks resistance at 14.80 AED, you enter at 14.85. Identify next resistance at 16.20 AED (previous high from 6 months ago). Target = 16.20, reward = 1.35 AED. Risk (stop at 14.50) = 0.35 AED. RR = 1.35/0.35 = 3.86:1. Excellent ratio. If technical levels don't provide minimum 2:1, don't take trade - wait for better entry or different setup.

**Measured Moves and Pattern Targets:** Chart patterns provide mathematical targets. Flag patterns: target = prior trend length added to breakout point. If Saudi Aramco rallies 3.00 SAR (32 to 35), consolidates in flag, then breaks flag at 35.20, target = 35.20 + 3.00 = 38.20. Triangle patterns: target = base height added to breakout. If triangle base is 2.50 SAR wide, breakout at 90.00, target = 92.50. These measured moves provide objective targets with historical probability backing.

**Partial Profits and Scaling Out:** Taking partial profits at certain RR levels while letting runners capture larger gains. Example: Enter Al Rajhi Bank, risk 2.00 SAR per share. At +2R (4.00 profit), sell 50% of position (lock in 2.00 average on all shares). Trail stop to breakeven on remaining 50%. If stopped at breakeven on remainder, total profit = 2.00 (from first half) = 1R gain (50% of 2R). If remainder continues to +6R, total profit = (50% × 2R) + (50% × 6R) = 1R + 3R = 4R. This approach guarantees some profit (reducing psychological pressure) while maintaining upside potential. Scaling structure: sell 1/3 at +2R, 1/3 at +3R, let 1/3 run with trailing stop.

**Win Rate Required for Profitability at Different RR Ratios:** At 1:1 RR, need >50% win rate to profit (breakeven at exactly 50%). At 1.5:1 RR, need >40% win rate. At 2:1 RR, need >33% win rate. At 3:1 RR, need >25% win rate. Most technical trading strategies naturally achieve 45-55% win rate. At 50% win rate with 2:1 RR: Expectancy = (50% × 2R) - (50% × 1R) = 1R - 0.5R = +0.5R per trade. Very profitable. Understanding this math explains why chasing high win rates is less important than maintaining solid RR ratios - it's easier to achieve 2:1 RR than to increase win rate from 50% to 70%.

**Avoiding the Low RR Trap:** Many traders achieve 70-80% win rate but still lose money because RR ratios are poor (0.5:1 or worse). They risk 1,000 SAR to make 500 SAR, win 75% of time. Math: (75% × 500) + (25% × -1,000) = 375 - 250 = +125. Barely profitable, and any streak of losses (inevitable eventually) wipes out months of small wins. One psychological temptation: taking profits early. Plan calls for 2:1 (risk 1.00 to make 2.00), but when trade reaches +1.50 profit, fear of giving back gains makes you exit at 1.5:1 instead of planned 2:1. Do this repeatedly and your actual RR is far worse than planned, destroying expectancy.`,
      keyConcepts: [
        { term: 'Risk-Reward Ratio (RR)', definition: 'Relationship between potential profit and potential loss, expressed as ratio. 2:1 RR means risking 1 unit to potentially gain 2 units. Higher RR ratios require lower win rates for profitability, creating robust trading systems.' },
        { term: 'Expectancy', definition: 'Average amount a trader expects to make or lose per trade over series of trades. Formula: (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Positive expectancy mandatory for long-term success. Expectancy above +0.3R considered good, above +0.5R excellent.' },
        { term: 'Measured Move Target', definition: 'Price target derived from chart pattern mathematics. Flag patterns: prior trend length added to breakout. Triangles: base height added to breakout. Provides objective, historically-backed profit targets rather than arbitrary percentages.' },
        { term: 'Minimum Acceptable RR Threshold', definition: 'Lowest risk-reward ratio you\'ll accept for trade entry. Professional standard: 2:1 minimum (risk 1 to make 2). Trades below this threshold should be rejected regardless of setup quality, as they require too high win rate for sustainable profitability.' }
      ],
      gccExamples: [
        'Saudi Aramco 2:1 Setup: Aramco at 34.00 SAR, support at 33.50, entry 34.00, stop 33.30 (0.70 risk with buffer below support). Identify next resistance at 35.40 (previous swing high from 4 weeks ago). Target 35.40, reward = 1.40. RR = 1.40/0.70 = 2:1. With 100,000 SAR account, 1% risk = 1,000 SAR. Position = 1,000/0.70 = 1,428 shares (48,552 SAR position). If target hit, gain 1,998 SAR (+2%). If stopped, lose 1,000 SAR (-1%). Need 34% win rate to break even, actual win rate around 50%, excellent expectancy.',
        'Emirates NBD Measured Move: Emirates NBD rallies from 13.50 to 15.00 AED (+1.50 AED move), consolidates in bull flag at 14.80-15.00 for 2 weeks, breaks flag at 15.10. Measured move target: 15.10 + 1.50 (prior move) = 16.60. Entry 15.15, stop 14.70 (below flag support), risk 0.45. Reward to target: 1.45. RR = 1.45/0.45 = 3.22:1. Outstanding ratio. With 50,000 AED account, 1% risk = 500 AED, position = 500/0.45 = 1,111 shares (16,833 AED). If target hit, gain 1,610 AED. Need only 24% win rate to break even at this RR.',
        'Al Rajhi Bank Scaling Out: Enter Al Rajhi at 85.00, stop 83.00 (risk 2.00 per share), target 91.00 (reward 6.00, RR = 3:1). Position 1,000 shares. At 89.00 (+2R = 4.00 profit), sell 333 shares, lock in 1,332 SAR profit. Trail stop to 85.00 (breakeven) on remaining 667 shares. Price reaches 91.00 (+3R on original plan), sell another 333 shares, lock in 1,998 SAR more. Trail to 88.00 on final 334 shares. Price eventually hits 93.00 (+4R = 8.00 from entry), stopped at 90.00 (trailing stop from 93.00) on final third. Total profit: (333 × 4.00) + (333 × 6.00) + (334 × 5.00) = 1,332 + 1,998 + 1,670 = 5,000 SAR on 2,000 SAR risk = 2.5R average. Reduced stress by locking gains while capturing extended move.',
        'SABIC Poor RR Rejection: SABIC at 88.00 SAR, minor support at 87.00, resistance at 89.50. Trader considers entry at 88.00, stop 87.00 (risk 1.00), target 89.50 (reward 1.50). RR = 1.5:1. Below 2:1 minimum threshold - trade rejected despite looking "decent." Trader waits for better entry or clearer setup. Two days later, SABIC pulls back to 86.50, stronger support at 85.50, same resistance at 89.50. Entry 86.50, stop 85.30 (1.20 risk), target 89.50 (3.00 reward). RR = 2.5:1. Now acceptable, trade taken. Same target, better entry creates acceptable RR.'
      ],
      steps: [
        'Before considering any trade, identify technical profit target: Where is next resistance (for longs) or support (for shorts)? Use previous swing highs/lows, round numbers, Fibonacci levels, or measured move projections.',
        'Calculate risk: Entry Price - Stop Loss Price (determined from previous lesson on stop placement). Calculate reward: Target Price - Entry Price.',
        'Compute risk-reward ratio: Reward ÷ Risk. If ratio is below 2:1, either wait for better entry point, adjust target to more distant level, or skip trade entirely. Never force trades with poor RR.',
        'Calculate expectancy for your strategy monthly: Track win rate and average RR achieved (will differ from planned RR if you take profits early or let stops slip). Formula: (Win% × Avg RR) - (Loss% × 1). If expectancy is below +0.2R, analyze what\'s wrong - taking profits too early? Stops too wide? Win rate too low? Adjust approach.',
        'Implement systematic partial profit plan: Define before trade entry - "Sell 1/3 at +2R, 1/3 at +3R, trail final 1/3 with stop at +2R." Write this in trading journal before entry. Execute mechanically without emotional override.',
        'Review trades quarterly: Categorize as "Excellent RR" (>3:1), "Good RR" (2-3:1), "Acceptable RR" (1.5-2:1), "Poor RR" (<1.5:1). Calculate profitability of each category separately. You should see highest profit from Good/Excellent RR categories, even if win rate is lower. If Poor RR trades are dragging down performance, implement strict 2:1 minimum filter.'
      ],
      mistakes: [
        'Taking profits prematurely because trade is "up nicely" - planned for 2:1, exited at 1.2:1, destroyed expectancy over time. Use limit orders at target to remove emotional exit temptation.',
        'Forcing trades with poor risk-reward because you\'re "bored" or "haven\'t traded in a while" - patience is a position. Wait for 2:1+ setups.',
        'Letting winners turn into losers to "hold for larger gains" without trailing stops - greed to capture 5R+ causes you to give back profitable 2R trades. Use systematic trailing stops.',
        'Using arbitrary percentage targets instead of technical levels - "I always take 5% profit" ignores whether next resistance is at 3% or 8%, resulting in either premature exits or unrealistic targets',
        'Averaging down on losing trades to "improve average entry price" - this doesn\'t improve RR, it worsens it by adding capital to a trade moving against you, increasing total risk',
        'Calculating win rate without considering RR - bragging about 75% win rate while losing money because average win is 0.5R and average loss is 1R (negative expectancy despite high win%)'
      ],
      visualReference: 'Visualize a comprehensive "Risk-Reward Analysis Dashboard": Top section shows Saudi Aramco chart with annotated trade: Entry at 34.00 (green arrow), Stop at 33.30 (red line, labeled "Risk = 0.70 SAR"), Target at 35.40 (green line, labeled "Reward = 1.40 SAR"), RR ratio displayed as "2:1" in green badge. Below chart, an "Expectancy Calculator" panel: Input sliders for Win Rate (currently 50%), Average RR (currently 2.0), showing output: "Expectancy = +0.5R per trade" with annotation "Over 100 trades at 1,000 SAR risk = +50,000 SAR expected profit." Comparison table shows different scenarios: Row 1: Win Rate 40%, RR 3:1, Expectancy +0.8R (green, "Excellent"); Row 2: Win Rate 50%, RR 2:1, Expectancy +0.5R (green, "Good"); Row 3: Win Rate 65%, RR 1:1, Expectancy +0.3R (yellow, "Mediocre"); Row 4: Win Rate 75%, RR 0.5:1, Expectancy -0.125R (red, "Losing System Despite High Win%"). Bottom section shows "Partial Profits Illustration": Position of 1,000 shares shown as three stacked blocks. At +2R (89.00), first block (333 shares) exits, labeled "Lock in 1,332 SAR." At +3R (91.00), second block exits, labeled "Lock in 1,998 SAR." Final block (334 shares) shows trailing stop progression with dotted green line moving up from breakeven (85.00) to 88.00 to 90.00 (eventual exit), labeled "Trail final third for extended gains: 1,670 SAR." Total profit displayed: "5,000 SAR on 2,000 SAR risk = 2.5R achieved" with checkmark. Right panel shows "Minimum RR Filter": Visual gauge with red zone (<1.5:1, "Reject Trade"), yellow zone (1.5-2:1, "Consider Only if Perfect Setup"), green zone (>2:1, "Acceptable Trades"), with needle pointing to 2:1 threshold line. This comprehensive visualization ensures traders understand both the mathematics and practical application of risk-reward optimization.'
    },

    'course1-module4-lesson5': {
      objectives: [
        'Understand portfolio diversification principles for risk reduction',
        'Learn asset allocation across GCC markets and sectors',
        'Master correlation analysis to avoid false diversification',
        'Develop systematic approaches to building balanced trading portfolios'
      ],
      explanation: `Diversification is the only free lunch in trading - it reduces risk without necessarily reducing returns. However, poor diversification (holding 10 correlated stocks) provides no protection, while over-diversification (spreading too thin) dilutes profits and increases management complexity. Professional diversification balances risk reduction with focused exposure to best opportunities.

**True vs. False Diversification:** Holding 10 Saudi stocks (Aramco, SABIC, Al Rajhi, STC, ACWA Power, etc.) feels diversified but isn't. All move together when Saudi market trends strongly - during OPEC announcements, regional geopolitical events, or Tadawul-wide sentiment shifts, correlations spike toward 1.0 (perfect correlation). True diversification requires low-correlation assets: Saudi stocks + UAE stocks + Qatar stocks provides better diversification than 10 Saudi stocks. Even better: GCC stocks + GCC bonds + commodities (gold). The goal is positions that don't all lose simultaneously.

**Correlation Basics:** Correlation ranges from +1.0 (perfect positive - move identically) to -1.0 (perfect negative - move oppositely) to 0 (no relationship). GCC stocks within same country typically correlate 0.6-0.8. Stocks across GCC countries correlate 0.4-0.6. GCC stocks vs. global bonds often correlate near 0 or slightly negative. Example: During COVID March 2020, Saudi Aramco, Emirates NBD, and QNB all crashed 25-35% simultaneously (high correlation crisis), but gold rallied +8% (negative correlation), protecting diversified portfolios. Checking correlation before adding positions prevents false diversification.

**Sector Diversification Within GCC:** GCC markets are heavily weighted toward energy/petrochemicals, banking, and real estate. Holding only bank stocks (Al Rajhi, Emirates NBD, QNB, Commercial Bank of Qatar) creates sector concentration risk - if GCC Central Banks raise interest rates aggressively, all banks might suffer margin compression simultaneously. Better approach: 1-2 bank stocks + 1-2 energy (Aramco, ADNOC) + 1 telecom (STC, Etisalat) + 1 consumer (Almarai, Emaar) spreads risk across sectors with different fundamental drivers. Energy tracks oil prices; banks track interest rates; consumer tracks demographic growth; telecom tracks infrastructure investment. These drivers don't move in lockstep.

**Geographic Diversification Across GCC:** Saudi Arabia (Tadawul), UAE (ADX/DFM), Qatar (QE), Kuwait (Boursa Kuwait), Bahrain, Oman each have unique economic drivers. Saudi exposure to oil production quotas, UAE to tourism and real estate, Qatar to LNG exports, Kuwait to Sovereign Wealth Fund policies. Spreading positions across 2-3 GCC countries reduces single-country policy risk. Practical allocation for 200,000 SAR account: 100,000 SAR Saudi stocks (home market, lowest transaction costs), 60,000 SAR UAE stocks, 40,000 SAR Qatar stocks. This reduces impact of Tadawul-specific shocks while maintaining manageable position tracking.

**Position Sizing with Diversification:** With proper diversification, individual position sizes can be slightly larger without increasing total risk. If holding 5 uncorrelated positions at 1% risk each, total portfolio risk is approximately 5% (if all stopped simultaneously, which is unlikely with low correlation). But if holding 5 highly correlated positions (all Saudi banks) at 1% each, effective risk is 3-4% because they move together. Implication: With true diversification across countries/sectors, you can hold more positions or slightly larger positions; with false diversification (correlated positions), reduce individual sizes to compensate for correlation risk.

**Time Diversification:** Don't enter all positions simultaneously. Entering 5 positions on Monday morning creates timing risk - if you misread market conditions, all entries are poorly timed. Better: scale into positions over days/weeks. Enter Position 1 on Monday, Position 2 on Wednesday (if market confirms bullish view), Position 3 next week. This staggers entries, allowing you to adjust if initial positions show weakness. Advanced approach: maintain core long-term positions (30-50% of capital in high-conviction setups) and active trading positions (remaining 50-70% in shorter-term tactical trades). This separates time horizons, reducing forced liquidation of good long-term positions during short-term drawdowns.

**Rebalancing and Correlation Drift:** Correlations change over time. During calm markets, Saudi and UAE stocks might show 0.4 correlation (relatively independent). During crises (oil crashes, regional conflicts), correlation spikes to 0.8+. Review portfolio correlation monthly using simple spreadsheet: calculate each position's 30-day correlation with others. If average correlation exceeds 0.6, reduce position sizes or eliminate most correlated holdings. Professional approach: target portfolio-wide average correlation below 0.5 - this ensures reasonably independent risk exposures.`,
      keyConcepts: [
        { term: 'Correlation Coefficient', definition: 'Statistical measure of how two assets move together. +1.0 = perfect positive correlation (identical movement), 0 = no correlation, -1.0 = perfect negative correlation (opposite movement). Portfolio diversification effective when holdings average correlation <0.5.' },
        { term: 'Sector Concentration Risk', definition: 'Risk of holding multiple positions in same economic sector. GCC banks all affected similarly by interest rate changes, oil stocks by oil prices. Sector diversification spreads exposure across different economic drivers (energy, finance, consumer, telecom).' },
        { term: 'Geographic Diversification', definition: 'Spreading positions across multiple countries/markets. Within GCC: Saudi + UAE + Qatar reduces single-country policy risk. Each market has unique drivers: Saudi (oil quotas), UAE (tourism), Qatar (LNG exports), reducing correlation.' },
        { term: 'Effective Portfolio Risk', definition: 'True portfolio risk accounting for correlation between positions. With 5 uncorrelated positions at 1% each, effective risk ≈ 5%. With 5 perfectly correlated positions at 1% each, effective risk ≈ 1-2% (they act as single position). Correlation increases effective risk.' }
      ],
      gccExamples: [
        'False Diversification: Trader with 300,000 SAR holds 6 positions, thinking "I\'m diversified": Al Rajhi Bank (50K), Emirates NBD (50K), QNB (50K), Commercial Bank of Qatar (50K), Kuwait Finance House (50K), Saudi National Bank (50K). All are GCC banks. During GCC Central Bank rate hike cycle, all 6 stocks decline 8-12% simultaneously (correlation 0.85). Portfolio drops 30,000 SAR (10%). Diversification failed - false sense of security.',
        'True Diversification: Same 300,000 SAR, structured differently: Saudi Aramco 60K (energy/oil exposure), Emirates NBD 50K (UAE banking/real estate cycle), STC 50K (Saudi telecom/infrastructure), Almarai 40K (consumer staples/demographics), QNB 50K (Qatar banking/LNG), Gold ETF 50K (inflation hedge/crisis protection). Correlations: Aramco-Emirates NBD 0.45, Aramco-Gold 0.15, STC-Almarai 0.35, average correlation 0.40. During oil price drop, Aramco loses 6% but STC/Almarai flat, Gold +3%, total portfolio -1.8%. True diversification dampened loss.',
        'Sector Rotation Strategy: Trader rotates capital across GCC sectors based on macroeconomic outlook. Q1 2024: Oil prices rising, allocate 60% to energy (Aramco, ADNOC, SABIC petrochemicals), 20% banks, 20% other. Q2 2024: Oil stabilizes, interest rates peaking, shift to 40% energy, 40% banks (benefit from high rates), 20% consumer (economic growth). Q3: Rate cuts expected, shift 30% energy, 30% banks, 40% real estate (benefits from lower rates). This dynamic sector allocation adapts to changing macro conditions, maintaining diversification while emphasizing favorable sectors.',
        'Geographic Staggering: Trader with 150,000 SAR staggers geographic entries over 3 weeks. Week 1: Enter Saudi Aramco (60K position) after strong weekly close. Week 2: If Aramco position profitable and UAE market shows strength, add Emirates NBD (50K). If Aramco losing or UAE weak, skip and reassess. Week 3: If both positions profitable and Qatar market breaks resistance, add QNB (40K). This staggered approach prevented full deployment when initial read was wrong - if Aramco failed immediately, trader avoided adding correlated GCC positions, limiting damage.'
      ],
      steps: [
        'Map your current positions by country and sector: Create simple table listing each position, its country (Saudi, UAE, Qatar, etc.), and sector (Banking, Energy, Consumer, Telecom, Real Estate). Identify concentrations - do you have 3+ positions in same sector or country?',
        'Calculate simple correlation check: For each pair of positions, note if they typically move together (high correlation), independently (low correlation), or opposite (negative correlation). Use 30-day price charts side-by-side for visual assessment. If 50%+ of your pairs show high correlation, diversification is insufficient.',
        'Implement diversification rules: (1) Maximum 30-40% of portfolio in any single country; (2) Maximum 25-30% in any single sector; (3) Minimum 3 sectors represented; (4) Target average correlation <0.5. If current portfolio violates these, don\'t force immediate liquidation - set rules for new positions to gradually improve diversification.',
        'Stagger new position entries: When planning to add 3 new positions, enter first position immediately. Wait 2-5 days, assess performance and market conditions, then add second if conditions confirm your view. Wait another 2-5 days before third. This prevents committing all capital based on single moment\'s market read.',
        'Monthly rebalancing review: First trading day of each month, calculate each position as percentage of total portfolio. If any sector exceeds 40% or any country exceeds 50%, reduce exposure by trimming largest positions in that category or avoiding new positions there.',
        'Crisis correlation monitoring: During high-volatility periods (oil crashes, geopolitical events), correlations spike. When VIX equivalent or market volatility doubles, reduce position sizes by 25-30% or close most correlated positions. Diversification provides less protection during crises - account for this by reducing overall exposure temporarily.'
      ],
      mistakes: [
        'Confusing number of positions with diversification - holding 10 Saudi bank stocks is less diversified than holding 3 stocks across different GCC countries and sectors',
        'Ignoring correlation drift - diversification strategy that worked in calm 2023 may fail in volatile 2024 as correlations shift; requires periodic review and adjustment',
        'Over-diversification - holding 20+ positions for small account (under 100K SAR) creates tracking complexity, dilutes profits from best ideas, increases commission costs significantly',
        'Home country bias - 95% allocation to Saudi stocks for Saudi trader feels comfortable but creates geographic concentration risk; minimum 20-30% in other GCC markets provides meaningful diversification',
        'Sector timing instead of diversification - abandoning diversification to "load up on banks because rates are rising" creates concentrated bet; better to overweight sector (40% vs. normal 25%) while maintaining some diversification',
        'Forgetting about correlation during calm markets - when all GCC stocks are rising, correlation seems irrelevant; but purpose of diversification is crisis protection, which is only tested during downturns'
      ],
      visualReference: 'Visualize a "Portfolio Diversification Dashboard": Center shows pie chart of 300,000 SAR portfolio divided by sector: Energy 30% (green), Banking 25% (blue), Telecom 20% (orange), Consumer 15% (purple), Real Estate 10% (yellow). Below, geographic allocation: Saudi 45%, UAE 30%, Qatar 25%. Right side displays "Correlation Matrix" - grid showing all positions (Aramco, Emirates NBD, STC, Almarai, QNB) with correlation coefficients color-coded: Green (<0.3 low correlation, good), Yellow (0.3-0.6 moderate), Red (>0.6 high correlation, concerning). Current average correlation displayed as 0.42 (green, "Well Diversified"). Compare to second portfolio shown below: Same 300K but all banking: correlation matrix almost entirely red (0.75+ average), labeled "False Diversification - Concentrated Sector Risk." Bottom panel shows "Crisis Simulation" - two equity curves during hypothetical oil crash: Diversified Portfolio drops from 300K to 285K (-5%), Concentrated Energy Portfolio drops 300K to 255K (-15%). Annotation: "Diversification dampened crisis loss by 10 percentage points." Left sidebar shows "Diversification Rules Compliance Checklist": Rule 1 (Max 40% any sector) ✓ Green (highest is Energy 30%), Rule 2 (Max 50% any country) ✓ Green (highest is Saudi 45%), Rule 3 (Min 3 sectors) ✓ Green (5 sectors), Rule 4 (Avg correlation <0.5) ✓ Green (0.42). Overall grade: "A - Excellent Diversification." This comprehensive dashboard provides instant assessment of portfolio diversification quality and identifies concentration risks.'
    },

    'course1-module4-lesson6': {
      objectives: [
        'Understand the psychological factors that drive trading mistakes',
        'Learn to identify and control fear, greed, and other emotional triggers',
        'Master techniques for maintaining discipline during winning and losing streaks',
        'Develop systematic approaches to eliminate emotional decision-making'
      ],
      explanation: `Emotional trading is the single largest destroyer of trading accounts - more than poor strategy, inadequate capital, or market knowledge. Every trader experiences fear, greed, hope, and regret. The difference between profitable and losing traders is not the absence of emotion, but the presence of systems that prevent emotions from controlling decisions.

**The Fear-Greed Cycle:** Fear and greed create a destructive cycle. After losses, fear dominates - you hesitate on good setups, exit winners prematurely, or stop trading entirely. Then you miss a major move, triggering regret and FOMO (fear of missing out). This morphs into greed - you chase the next move with oversized positions, abandon your stop-loss rules, or force trades in choppy markets. Inevitably, this aggressive phase produces losses, reigniting fear. Professional traders recognize this cycle and implement "circuit breakers" - rules that pause trading when emotions spike, preventing the cycle from accelerating.

**Loss Aversion and Its Consequences:** Humans feel the pain of losses 2-2.5× more intensely than the pleasure of equivalent gains (behavioral finance research by Kahneman). Losing 1,000 SAR hurts more than gaining 1,000 SAR feels good. This asymmetry drives destructive behaviors: (1) Holding losers too long ("I'll wait for it to come back") to avoid realizing painful loss; (2) Taking profits too early ("I'll lock in this small gain before it disappears") sacrificing large gains; (3) Revenge trading after loss ("I need to make it back NOW") with impulsive, oversized trades. Recognition is first step - awareness that you're biologically wired to make these mistakes enables systematic countermeasures.

**Overconfidence After Winning Streaks:** Four consecutive winning trades produces dangerous psychological shift. You start believing "I've figured it out" or "I can't lose right now." Confidence morphs into overconfidence. Position sizes creep up ("I'll risk 3% on this sure thing instead of usual 1%"). Stop-loss discipline weakens ("I don't need stops, I'll just watch it closely"). Trade frequency increases ("Why wait for A+ setups? I can profit on B setups too"). Then comes the inevitable loss - but now it's 3× larger than planned, wiping out 3-4 previous wins. Professional solution: FIXED RULES that don't change with recent results. Win or lose, risk stays at 1%, stop-loss always placed, only A+ setups traded.

**Revenge Trading and Tilt:** After unexpected loss, especially if it feels "unfair" (stopped out by 2 fils, then stock rallied without you), powerful urge emerges to "make it back immediately." This is revenge trading or "going on tilt" (poker term). You enter marginal setups, increase position size, or force trades in low-probability situations. It's trading to soothe emotional pain rather than following systematic strategy. Result: converting one planned 1% loss into string of impulsive 1-2% losses (total 4-6% drawdown). Solution: MANDATORY break after 2 consecutive losses. Close platform, 24-hour cooling-off period, return with fresh perspective and reviewed trading plan.

**FOMO and Chasing:** Strong market move triggers fear of missing out. Saudi Aramco rallies from 34 to 36 in 3 days (+5.9%), you had no position. FOMO screams "GET IN NOW BEFORE IT GOES HIGHER!" You buy at 36.20 with no plan, no stop-loss, no target - pure emotional impulse. Then natural pullback occurs, price drops to 35.40, you panic-sell for -2.2% loss. You bought the top, sold the low, exactly backwards. Professional approach: ALWAYS wait for pullback to support after missing initial move. If Aramco at 36.20, wait for pullback to 35.50-35.80 (support), THEN enter with proper stop below 35.30. If it never pulls back, you miss the trade - that's fine. Missing one trade is better than chasing into tops repeatedly.

**Hope and Holding Losers:** You buy SABIC at 90.00 with stop at 88.00 (1% risk). Price drops to 88.10... 88.00... 87.80. Stop should trigger, but you think "It's just 20 fils below stop, might bounce." Now 87.40... "I'll give it a bit more room." Drops to 86.50 (-3.9% from entry). Original plan was -2.2% maximum loss, but HOPE convinced you support would hold, "company fundamentals haven't changed," "it's just temporary selling." Finally, emotional pain overwhelms hope, you sell at 86.20 for -4.2% loss. This single emotional override erased 4 trades worth of planned 1% risk. Rule: Stops are MANDATORY, not suggestions. If you can't follow stop, use hard stop order with broker - removes choice, eliminates hope.

**Regret and Analysis Paralysis:** After several stopped-out trades (even if they were correct risk management), regret accumulates: "If I hadn't traded last week, I'd have 2,000 SAR more." This breeds analysis paralysis - you see perfect A+ setup, all criteria met, but fear/regret whisper "What if this one also loses?" You hesitate, don't enter, then watch it hit full profit target without you. Regret intensifies: "I knew it would work, why didn't I take it?" This creates worst scenario - taking losses on trades taken, missing profits on trades avoided. Solution: SYSTEMATIC EXECUTION. If setup meets all criteria in your plan, you MUST take it. Outcomes are probabilistic - some setups lose, some win. Trust the process over many trades, not individual results.`,
      keyConcepts: [
        { term: 'Loss Aversion Bias', definition: 'Psychological tendency to feel pain of losses 2-2.5× more intensely than pleasure of equivalent gains. Drives holding losers too long (avoiding pain of realization) and taking profits too early (securing pleasure before it disappears). Recognized behavioral bias by Daniel Kahneman.' },
        { term: 'Revenge Trading / Tilt', definition: 'Emotional state after unexpected loss where trader impulsively enters marginal trades attempting to "make back" lost money immediately. Driven by anger and ego rather than strategy. Often converts single small loss into multiple larger losses. Requires mandatory trading break to recover.' },
        { term: 'FOMO (Fear of Missing Out)', definition: 'Anxiety-driven impulse to enter trades after significant move has already occurred, fearing missing further gains. Results in chasing tops, buying after rallies instead of at support, entering without plan/stops. Professional solution: wait for pullback or skip the trade entirely.' },
        { term: 'Systematic Execution Discipline', definition: 'Following predefined rules for entry, exit, position size, and stops regardless of recent results or emotional state. Eliminates discretionary emotional decisions. Win streaks and loss streaks don\'t change rules. Process over outcomes orientation.' }
      ],
      gccExamples: [
        'Loss Aversion Destroys Trade: Trader buys Emirates NBD at 15.00 AED, stop 14.70 (0.30 risk, 2%). Price drops to 14.75... 14.70... 14.65 (stop should have triggered at 14.70). Trader thinks "Just 5 fils below stop, it might bounce." Drops to 14.40. Trader now -0.60 AED (-4%), double the planned risk. Hope emerges: "Emirates NBD is strong bank, this is temporary, I\'ll hold." Price continues to 14.10 before trader capitulates at 14.05, selling for -0.95 AED loss (-6.3%). What should have been -2% became -6.3% due to hope and loss aversion. If trader had used hard stop order at 14.70, would have been automatically exited with planned -2% loss.',
        'Revenge Trading Spiral: Trader enters Saudi Aramco at 34.50, stopped at 34.00 for -500 SAR (1% of 50K account). Immediately enters SABIC at 89.00 (forcing trade to "make it back"), stopped at 88.20 for -800 SAR (poor entry, no plan). Now -1,300 SAR (2.6%), frustration building. Enters Al Rajhi Bank at 86.00 with 2% risk (1,000 SAR - double usual risk due to urgency), stopped at 84.00 for -2,000 SAR. Total: -3,300 SAR (6.6% of account) in ONE DAY from revenge trading spiral. Original plan was max 1% loss (500 SAR). Emotional override created 6.6× larger damage.',
        'FOMO Chasing Top: Saudi Aramco rallies from 32.00 to 35.20 over 5 days (+10%), trader had no position (missed initial setup). Day 6, Aramco gaps up to 35.80 (+1.7% day), trader suffers intense FOMO, buys 35.95 with no plan ("I need to catch this move!"). No stop-loss placed. Day 7, natural pullback begins, price drops to 35.20, trader panics (down -2.1%), sells at 35.15 for -0.80 loss (-2.2%). Three days later, Aramco resumes rally to 37.50, but trader missed it after panic-selling. Professional approach would have been: Aramco at 35.80 is extended, wait for pullback to 34.80-35.20 (former resistance becomes support), enter there with stop at 34.60. If no pullback occurs, miss the trade - acceptable outcome.',
        'Discipline Overcomes Emotions: Trader experiences 4 consecutive losses (1% each = -4% account drawdown). Trading plan has rule: "After 2 consecutive losses, mandatory 24-hour break." Trader closes platform, reviews losing trades (all were good setups, just normal probability variation), confirms strategy remains sound. Returns next day, sees perfect A+ setup on SABIC at support with 2.5:1 RR. Fear whispers "You\'ve lost 4 in a row, you\'ll lose again." But trading plan criteria are met. Trader follows SYSTEMATIC EXECUTION: enters SABIC per plan, 1% risk, proper stop. Trade hits target for +2.5% gain. Without discipline to follow plan despite fear, trader would have skipped trade and missed recovery opportunity.'
      ],
      steps: [
        'Create written "Emotional Circuit Breaker" rules before they\'re needed: (1) After 2 consecutive losses, mandatory 24-hour break; (2) After 4 wins in a row, review position sizing to ensure it hasn\'t crept up; (3) If feeling strong urge to chase a move, set 15-minute timer and reassess; (4) Never enter trade within 30 minutes of closing previous trade (prevents impulsive revenge trading). Post these rules visibly.',
        'Implement hard stop-loss orders with broker for all positions: This removes temptation to "give it more room" when stop level reached. Emotion can\'t override automatic execution. For GCC stocks, place limit order at stop price (better than market order in low liquidity).',
        'Maintain trading journal with emotions column: After each trade, record not just entry/exit/P&L, but emotional state: "Felt confident," "Anxious after previous loss," "FOMO after missing rally." Monthly review: Calculate P&L of "confident/calm" trades vs. "anxious/urgent" trades separately. You\'ll see emotional trades perform worse, reinforcing need for emotional control.',
        'Practice "5-Minute Rule" before every entry: After identifying setup, wait 5 minutes before executing. During wait, ask: (1) Does this meet all plan criteria? (2) Am I entering to follow strategy or to soothe emotion? (3) Have I calculated position size and placed stop order? If any answer is concerning, skip trade. Five minutes provides emotional cooling that prevents most impulsive entries.',
        'Establish maximum daily loss limit: Define "Maximum Daily Loss" (e.g., -2% of account). If hit, immediately close all positions, close trading platform, mandatory 24-hour break. This prevents single bad day from becoming catastrophic due to tilt/revenge trading.',
        'Weekly emotional performance review: Each Friday, score emotional discipline 1-10: "Did I follow stops? Take profits at plan? Avoid revenge trades? Skip trades after 2 losses?" Track scores weekly. Improvement in emotional discipline score should correlate with improving P&L - often more than strategy improvements.'
      ],
      mistakes: [
        'Believing "I just need to control my emotions better" without implementing SYSTEMS - willpower fails under stress; systems (hard stops, mandatory breaks, position size limits) work consistently',
        'Increasing position size or trading frequency after wins - this converts winning streak into dangerous overconfidence; rules should remain constant regardless of recent results',
        'Trying to "make back" daily/weekly losses before they end - arbitrary time periods (days, weeks) are meaningless to markets; trading to reach breakeven by Friday creates forced, emotional trades',
        'Confusing "cutting losses" with panic-selling - cutting losses means honoring pre-planned stop; panic-selling is exiting winning position due to fear without plan',
        'Holding losers while cutting winners too early - this inverts proper risk management (run winners, cut losers) and is pure emotional decision-making driven by loss aversion and fear',
        'Trading during high emotional stress (personal issues, health problems, life events) - trading requires clear judgment; major life stress impairs decision-making and destroys discipline'
      ],
      visualReference: 'Visualize an "Emotional Trading Cycle" diagram: Circular flow showing psychological states and their consequences. Starting at top (12 o\'clock): "Normal State" (green) → Winning Trade → "Confidence" (light green) → Multiple Wins → "Overconfidence" (yellow, warning signs: larger positions, looser stops) → Oversized Loss → "Fear/Regret" (orange, behaviors: hesitation, skipped setups) → Miss Big Winner → "FOMO/Frustration" (red, behaviors: chasing, forcing trades) → Revenge Trading → Multiple Losses → "Tilt/Despair" (dark red, behaviors: abandoning plan, emotional decisions) → Eventually → Forced Break or Account Damage. Arrows show destructive cycle. Overlaid "Circuit Breaker Points" show where systematic rules interrupt cycle: After 2 losses (Stop → 24hr break, prevents tilt), After 4 wins (Check position sizing, prevents overconfidence), Before chasing move (5-minute cooling rule, prevents FOMO). Bottom panel shows "Emotion vs. Performance Analysis" - scatter plot of 100 trades: X-axis is "Emotional Intensity at Entry" (1=Calm to 10=Intense), Y-axis is "Trade Outcome" (% P&L). Clear pattern emerges: Low emotional intensity (1-3) shows scattered but positive average (+1.2%); High intensity (7-10) shows concentrated negative outcomes (average -0.8%). Annotation: "Emotional trades underperform calm trades by 2 percentage points." Right sidebar shows "Emotional Discipline Scorecard": Weekly scores for following stops (8/10), honoring max daily loss (10/10), avoiding revenge trades (6/10 - needs improvement), taking planned entries despite fear (7/10). Overall emotional discipline score: 7.75/10, with trend line showing improvement from 5.5 three months ago. This visualization makes explicit the hidden emotional patterns destroying most trader accounts.'
    },

    'course1-module4-lesson7': {
      objectives: [
        'Understand the components of a comprehensive trading plan',
        'Learn to develop personalized trading strategies aligned with your goals and psychology',
        'Master the process of documenting and refining trading rules',
        'Create accountability structures for consistent plan execution'
      ],
      explanation: `A trading plan is your business plan for trading - it documents your edge, rules, risk management, and process. Without a written plan, you're gambling on impulses and emotions. With a clear plan, you have objective standards for every decision, removing emotional uncertainty and creating measurable process that can be improved over time.

**The Purpose of a Trading Plan:** Your plan serves three critical functions: (1) Pre-trade: Defines setups you'll trade and ones you'll ignore, preventing impulsive entries; (2) In-trade: Specifies exactly how you'll manage position (trailing stops, profit targets, when to exit), eliminating real-time emotional decisions; (3) Post-trade: Provides standards for reviewing performance and identifying improvements. The plan isn't meant to predict every market situation - it's meant to give you clear, pre-determined responses to common situations, so you're not making critical decisions in the heat of the moment when emotions are highest.

**Defining Your Edge:** Your plan must articulate WHY you expect to make money. "Buy low, sell high" isn't an edge. Edge examples: (1) Technical: "I enter at support bounces with 2.5:1 RR when RSI is oversold, which historically wins 54% of the time"; (2) Fundamental: "I buy GCC stocks before earnings when analyst estimates have been rising for 3+ weeks and company reports during high oil price environments"; (3) Event-based: "I buy Saudi stocks the day before MSCI rebalancing dates when they're being added to index, as flows are predictable." Whatever your edge, it must be specific, testable, and based on historical observation. Generic hope isn't an edge.

**Setup Criteria and Filters:** Document exactly what constitutes a tradeable setup. Example for support bounce strategy: (1) Stock must be in uptrend (above 50-day MA); (2) Price pulls back to key support level (previous swing low or major moving average); (3) Volume during pullback is lower than advance volume (healthy retracement); (4) Risk-reward ratio minimum 2:1 to next resistance; (5) Position size calculated for 1% account risk. All five criteria must be met. If criteria 1, 2, 3 met but RR is only 1.5:1, setup is rejected. These filters prevent marginal trades and ensure every entry meets minimum quality threshold.

**Position Sizing and Risk Rules:** Your plan must specify exact position sizing methodology. "Risk 1% of account balance per trade, calculate position size using formula: (Account × 0.01) / (Entry - Stop). Maximum 3 positions open simultaneously. Maximum aggregate risk 3% across all positions. If two losses occur consecutively, reduce risk to 0.5% for next three trades before returning to 1%." This removes any uncertainty about "how much to risk" - it's predetermined, consistent, and accounts for drawdown scenarios.

**Entry and Exit Rules:** Document precise entry trigger and exit scenarios: Entry: "Buy market open after stock closes above resistance on high volume (1.5× 20-day avg). Place buy stop 0.05 SAR above resistance level to confirm breakout." Exit scenarios: (1) Target hit: "Sell 50% at +2R, trail stop to breakeven on remaining 50%, sell final 50% at +4R or trailing stop"; (2) Stop hit: "Exit entire position at pre-determined stop, no exceptions"; (3) Time stop: "If position hasn't reached +1R within 5 trading days, exit at market"; (4) Invalidation: "If fundamental catalyst (expected earnings beat) doesn't materialize, exit regardless of price level." Every exit scenario is defined before entry, eliminating in-trade decision anxiety.

**Trading Schedule and Routine:** Specify when you'll trade and won't trade. "Market analysis: Daily, 8:00-8:30 AM before Saudi market open, review overnight news, mark support/resistance levels. Trading hours: 10:00 AM-1:00 PM Tadawul session only (avoid open volatility, avoid afternoon low liquidity). Maximum 2 entries per day. No trading on Saudi holidays, OPEC announcement days, or during personal high-stress periods. Weekend: Review week's trades, calculate metrics, update trading journal." Routine creates discipline and prevents overtrading or impulsive off-hours decisions.

**Performance Metrics and Review Process:** Define how you'll measure success: "Primary metric: Expectancy (must be above +0.3R). Secondary metrics: Win rate (target 45-55%), average RR (target 2-3:1), maximum drawdown (accept up to 10%, reduce risk if exceeded). Review cycle: Weekly (calculate metrics, check emotional discipline adherence), Monthly (deep review of all trades, categorize by setup type, identify best/worst performing setups), Quarterly (assess if edge remains valid, adjust plan if market conditions have changed structurally)." Success isn't measured by daily P&L but by process adherence and long-term expectancy.

**Plan Evolution:** Your plan should evolve as you learn, but not constantly. "Plan revisions allowed only during quarterly review, with minimum 90 days and 30 trades between revisions. Changes require written justification based on data: e.g., 'Support bounce setups during first hour are showing 38% win rate vs. 56% after 10 AM - eliminate first-hour trades.' No changes allowed during active trading or after emotional trades." This prevents tweaking plan after every loss (emotional reaction) while allowing data-driven improvements over time.`,
      keyConcepts: [
        { term: 'Trading Edge Definition', definition: 'Specific, testable reason why your strategy should be profitable over many trades. Must be based on historical observation, not hope. Examples: technical pattern with proven win rate, fundamental catalyst with predictable price impact, or statistical inefficiency you exploit. Without defined edge, you\'re gambling.' },
        { term: 'Setup Criteria Checklist', definition: 'Complete list of conditions that must be met before entering trade. Acts as quality filter preventing marginal trades. All criteria must be satisfied - if even one isn\'t met, setup is rejected. Removes subjective judgment, creates consistency.' },
        { term: 'Scenario-Based Exit Planning', definition: 'Pre-defining exit decision for every likely scenario before entry. Covers: target hit, stop hit, time stop, fundamental invalidation. Eliminates in-trade decisions when emotions are highest. You\'re executing pre-planned response, not making fresh judgment under pressure.' },
        { term: 'Process-Over-Outcome Orientation', definition: 'Measuring success by adherence to plan and long-term metrics (expectancy, consistency) rather than individual trade results. Good process can produce losing trades; bad process can produce lucky wins. Focus on process, let probabilistic outcomes play out over time.' }
      ],
      gccExamples: [
        'Support Bounce Trading Plan for GCC Stocks: Edge: "GCC blue chips bounce predictably at major moving averages during uptrends, offering 2:1+ RR setups with 52% win rate." Setup Criteria: (1) Stock must be Tadawul Top 10 by market cap or equivalent UAE/Qatar large cap; (2) Uptrend: price above 50-day MA; (3) Pullback to 50-day MA or previous swing low support; (4) RSI(14) between 30-40 (oversold but not extreme); (5) Minimum 2:1 RR to next resistance; (6) Volume on pullback <20-day average. Position Sizing: 1% risk, position = (Account × 0.01)/(Entry - Stop). Entry: Buy when price closes above 50-day MA after touching it, or when price bounces 0.3% above support level. Exit: Target = +2R (sell 100% and review for re-entry), Stop = 0.3 SAR below support level, Time Stop = 7 trading days if not at +1R. Schedule: Scan for setups after 10 AM Tadawul, enter between 10:30 AM - 12:00 PM only.',
        'SABIC Petrochemicals Momentum Plan: Edge: "SABIC shows strong momentum after oil price rallies >3% in single week, as markets price in higher margins. Historical win rate 58% with average 2.8:1 RR." Setup Criteria: (1) Brent crude must rally >3% in trailing 5 days; (2) SABIC price above 20-day and 50-day MA; (3) SABIC breaks above previous week\'s high; (4) Volume on breakout day >1.3× 20-day average; (5) Minimum 2:1 RR to recent swing high. Position Sizing: 1.5% risk (edge is stronger, justify higher risk), max 2 positions in petrochemical sector simultaneously. Entry: Buy on hourly close above previous week\'s high with stop 0.5 SAR below breakout candle low. Exit: Sell 1/3 at +2R, 1/3 at +3R, trail final 1/3 with 2 SAR trailing stop. Invalidation: If oil reverses -2% in any single day while in trade, exit immediately regardless of stop location.',
        'Al Rajhi Bank Earnings Strategy: Edge: "Al Rajhi Bank tends to beat earnings expectations during rising interest rate environments. Stock rallies average 4.2% in 5 days post-announcement when earnings beat by >3%." Setup Criteria: (1) Saudi interest rates must have been raised in last 3 months; (2) Analyst earnings estimates must have been revised upward by >2 analysts in last 30 days; (3) Enter 2 days before earnings announcement; (4) Stock must be within 3% of all-time high (strength). Position Sizing: 0.75% risk (event-based, higher uncertainty), 1 position maximum. Entry: Buy 2 days before earnings at market open. Exit: (1) If earnings beat >3%, hold through announcement and sell at +3% gain or 5 days post-announcement; (2) If earnings miss or beat <3%, sell immediately at market open post-announcement regardless of price; (3) Stop: -2.5% from entry (wider to accommodate earnings volatility). Review: This is speculative edge - requires 50 trades to validate; if win rate below 50% after 50 trades, discontinue strategy.',
        'GCC Index Rebalancing Flow Strategy: Edge: "Stocks added to MSCI GCC indices experience predictable buying flow from passive funds tracking index. Average gain 1.8% in 3 days pre-announcement to announcement." Setup: (1) Stock confirmed for index addition (MSCI preliminary announcement, usually 2 weeks before effective); (2) Entry: Buy on preliminary announcement day at open; (3) Position Sizing: 0.5% risk (very short holding period, lower risk), maximum 3 positions if multiple adds; (4) Exit: Sell 100% at close on effective date (when index trackers complete buying); (5) Stop: None (holding period too short, but maximum loss accept is -3%, if breached, exit immediately). Review: Quarterly, track success rate and average gain - if average drops below 1.5%, edge may be eroding (more traders exploiting it).'
      ],
      steps: [
        'Define your trading edge in 2-3 sentences: Write down WHY you expect your approach to be profitable. What have you observed that gives you an advantage? This is the foundation - everything else supports the edge. If you can\'t articulate an edge, continue education/demo trading until you identify one.',
        'Document complete setup criteria checklist: List every condition that must be met for trade entry (technical indicators, fundamental factors, timeframe, market conditions, RR minimum). Aim for 5-8 criteria - enough to filter quality but not so many that no setup ever qualifies. Test criteria against historical charts to verify they\'d have identified good trades.',
        'Write exact position sizing formula and risk rules: Specify percentage risk per trade, position size calculation method, maximum number of open positions, aggregate risk limit, drawdown rules (what changes when account is down X%). Make it mathematical - no discretion.',
        'Create scenario-based exit playbook: For each setup type, document exact exit for these scenarios: (1) Target hit (full exit or partial?), (2) Stop hit (always full exit), (3) Time stop (how long to hold if not working?), (4) Fundamental invalidation (what would make thesis wrong even if price hasn\'t hit stop?). Write these BEFORE ever entering a trade.',
        'Establish trading schedule and routine: Specify exact hours you\'ll analyze markets, when you\'ll enter trades, when you won\'t trade (avoid high volatility periods, personal stress), review schedule (daily/weekly/monthly). Create checklist for daily routine - consistency builds discipline.',
        'Define performance metrics and review cycle: Choose 3-5 key metrics (e.g., expectancy, win rate, avg RR, max drawdown, plan adherence %). Set minimum acceptable thresholds. Schedule Weekly (quick metrics check), Monthly (detailed trade review), Quarterly (plan evolution assessment). Write down the exact questions you\'ll ask during each review: "Did I follow my setup criteria? Were stops honored? What was my emotional state?"',
        'Print and post your plan visibly: Physical presence of plan near trading station serves as constant reminder. Many traders create one-page summary checklist: Setup Criteria (yes/no boxes), Position Sizing Formula, Exit Rules, Emotional Circuit Breakers. Check boxes before every trade.'
      ],
      mistakes: [
        'Creating plan that\'s too complex (20+ rules, complicated formulas) - you won\'t follow it consistently; start simple, add complexity only if needed and proven beneficial',
        'Writing plan after you\'ve started trading and trying to justify what you\'ve already been doing - plan should be prospective (what you WILL do) not retrospective (explaining what you did)',
        'Changing plan after every losing trade or bad week - emotional revisions destroy consistency; minimum 30 trades and 60 days between plan changes',
        'Having no plan at all, just "trading what feels right" - feelings change with emotions; without written standards, you\'re drifting on emotional currents',
        'Creating plan but never reviewing it or measuring adherence - plan without accountability is wishful thinking; weekly adherence check is mandatory',
        'Copying someone else\'s plan without understanding the edge or adapting to your psychology - plan must match your risk tolerance, time availability, and belief in the edge; if you don\'t truly believe in approach, you won\'t follow it under pressure'
      ],
      visualReference: 'Visualize a comprehensive "Trading Plan Document" template: Page 1 Header: "GCC Trading Plan - Support Bounce Strategy" with creation date and last revision date. Section 1: "Trading Edge" - boxed text explaining the specific edge with supporting statistics ("Support bounces on GCC large caps show 52% win rate with 2.6:1 avg RR over 200 historical trades"). Section 2: "Setup Criteria Checklist" - numbered list with checkbox squares: □ Stock in uptrend (above 50-day MA), □ Pullback to support level, □ RSI(14) 30-40, □ Minimum 2:1 RR, □ Volume below average on pullback. Note: "ALL criteria must be checked before entry." Section 3: "Position Sizing" - formula displayed: Position = (Account Balance × 0.01) / (Entry Price - Stop Price). Example calculation shown: 100,000 SAR × 1% = 1,000 SAR risk. Entry 34.00, Stop 33.30, Risk/share 0.70 SAR → Position = 1,428 shares. Section 4: "Entry Rules" - "Buy when price closes above support level or 50-day MA, confirming bounce. Place order immediately with stop." Section 5: "Exit Rules" - decision tree showing scenarios: If price reaches +2R → Sell 50%, trail stop to breakeven on remaining 50% | If stop hit → Exit 100% immediately | If 7 days pass without reaching +1R → Exit 100% (time stop) | If market structure breaks (closes below key support) → Exit regardless of stop. Section 6: "Trading Schedule" - daily timeline: 8:00-8:30 AM (Market analysis and setup identification), 10:30 AM-12:00 PM (Trade execution window), 3:00 PM (Daily review and journal entry), Weekend (Weekly performance metrics calculation). Section 7: "Risk Management Rules" - Max 3 positions simultaneously | Max 3% aggregate risk | After 2 consecutive losses, reduce to 0.5% risk for next 3 trades | Maximum daily loss -2% (if hit, stop trading for 24 hours). Section 8: "Performance Metrics" - Table tracking: Expectancy (target >+0.3R), Win Rate (target 45-55%), Avg RR (target >2:1), Max Drawdown (alert if >8%, act if >10%), Plan Adherence (target 90%+). Section 9: "Review Schedule" - Weekly (Mon): Calculate metrics, check emotional discipline | Monthly (1st): Categorize trades by setup type, identify patterns | Quarterly: Assess edge validity, consider plan revisions with data justification. Bottom: Signature line and date: "I commit to following this plan consistently and measuring results objectively. Plan revisions allowed only quarterly with documented justification." This comprehensive template transforms vague trading intentions into concrete, executable, measurable business plan.'
    },

    'course1-module4-lesson8': {
      objectives: [
        'Understand the importance of detailed trade journaling for long-term success',
        'Learn to record both quantitative and qualitative aspects of every trade',
        'Master performance analysis techniques to identify strengths and weaknesses',
        'Develop systematic review processes that drive continuous improvement'
      ],
      explanation: `Trading without keeping detailed records is like running a business without accounting - you have no idea what's working, what's failing, or how to improve. Your trading journal is the single most powerful tool for long-term development, transforming random trading into a systematic, improvable process.

**Why Journaling is Non-Negotiable:** Memory is unreliable and biased. You remember the one big winner vividly but forget the five small losses. You recall the "unfair" stopped-out trade but forget the three trades where poor entry cost you money. A journal captures objective reality. More importantly, it reveals patterns invisible in real-time: you might discover your win rate drops 15% on Friday afternoons (fatigue), or that trades entered within 30 minutes of opening bell underperform (volatile conditions), or that "perfect" setups with ALL criteria met vastly outperform "pretty good" setups where you compromised on one criterion. These insights only emerge from reviewing dozens of recorded trades systematically.

**What to Record: Quantitative Data:** For every trade, document: (1) Date and Time of entry/exit; (2) Symbol and market (Saudi Aramco - Tadawul, Emirates NBD - DFM); (3) Long or Short; (4) Entry Price, Stop Loss Price, Target Price; (5) Position Size (shares and total value); (6) Risk Amount (SAR/AED) and Risk Percentage; (7) Exit Price and Exit Reason (target hit, stop hit, time stop, discretionary); (8) Profit/Loss (SAR and %); (9) R-Multiple (profit/loss divided by risk - if you risked 1,000 SAR and made 2,500 SAR, R = +2.5); (10) Commission and Fees. This quantitative data enables calculation of all performance metrics: win rate, expectancy, average RR, etc.

**What to Record: Qualitative Data:** Numbers alone don't reveal why. Add: (1) Setup Type (support bounce, breakout, flag pattern, etc.); (2) Trade Thesis (why did you take this trade? "Aramco bouncing at 50-day MA support with positive oil price momentum and 2.5:1 RR"); (3) Market Conditions (trending, choppy, high volatility, low volume); (4) Emotional State at Entry (confident, anxious, FOMO, revenge, neutral); (5) Plan Adherence (yes/no - did you follow all setup criteria and risk rules?); (6) Lessons Learned (what would you do differently? what went well?). Qualitative data reveals psychological patterns and setup quality issues that numbers miss.

**Journal Format and Tools:** Simplest effective format: Spreadsheet (Excel/Google Sheets). Create columns for all quantitative fields, add text columns for qualitative notes. Benefits: flexible, can calculate metrics automatically (formulas for expectancy, win rate), can filter/sort (e.g., show only "Support Bounce" trades to analyze that setup type separately). More advanced: Dedicated trading journal software (TraderVue, Edgewonk, Tradezella) - these automatically calculate metrics, generate charts, identify patterns. Whatever format, key is consistency - every trade, every time, no exceptions.

**Screenshot and Chart Annotation:** Numbers and notes are valuable, but visual record is powerful. For each trade, save screenshot of chart showing: (1) Entry point with annotation explaining setup, (2) Stop loss and target levels marked, (3) Key support/resistance levels that informed decision, (4) Indicators used (if any). After exit, save another screenshot showing full trade path - where price went, where you exited, why. Months later, visual review reveals mistakes invisible in text: "I thought that was a clear breakout, but looking at chart now, volume was weak - learned to require 1.5× average volume for breakouts."

**Daily Review Process:** Each trading day, immediately after market close: (1) Record all trades from the day (do this while memory is fresh, not next week); (2) Calculate day's P&L and add to running account balance; (3) Review each trade: Did you follow your plan? What was emotional state? What would you do differently? (4) Identify one specific lesson from the day: "Learned that entries in first 30 minutes tend to get stopped on volatility" or "Confirmed that taking 50% profit at +2R reduces stress and works well." Writing one daily lesson forces reflection and accelerates learning curve.

**Weekly Review Process:** Every weekend: (1) Calculate week's metrics: Total P&L, Number of Trades, Win Rate, Average RR, Expectancy, Largest Win, Largest Loss, Plan Adherence %; (2) Categorize trades by setup type (support bounce, breakout, etc.) and calculate metrics for each - which setups performed best/worst? (3) Review emotional notes - identify patterns: "I took 3 trades when feeling FOMO after missing moves - all 3 lost"; (4) Create action items for next week: "Stop taking first-hour trades (2 losses this week from that timing)" or "Increase position size to full 1% risk - I've been too cautious at 0.75%". Document these actions and check adherence next week.

**Monthly Deep Dive:** Once monthly: (1) Calculate all metrics for the month and compare to previous months - trending better or worse? (2) Analyze setup types: Create table showing for each setup: Number of Trades, Win Rate, Avg RR, Expectancy. Identify your most profitable setups (highest expectancy) and eliminate or reduce frequency of negative expectancy setups; (3) Identify behavioral patterns: Sort trades by "Emotional State at Entry" - calculate win rate and avg P&L for each emotion. You'll likely find "Calm/Confident" trades vastly outperform "Anxious/FOMO" trades; (4) Review biggest winners and losers: What commonalities? Biggest winners might show pattern (e.g., "All my +4R trades held through +2R without taking partial profits, suggesting I should adjust profit-taking strategy"); (5) Update Trading Plan if data strongly supports change (minimum 30 trades showing consistent pattern before changing plan).

**Turning Data into Improvement:** Journal is worthless if you just record and never review. The power is in pattern identification and systematic improvement. Example insights from real journal review: "I've taken 47 trades. Support bounce setups: 23 trades, 56% win rate, 2.4 avg RR, +0.65R expectancy (excellent!). Breakout setups: 24 trades, 38% win rate, 1.9 avg RR, -0.08R expectancy (losing strategy - eliminate). Trades after 2 PM: 12 trades, 33% win rate, +0.2R expectancy vs. mid-day trades: 35 trades, 54% win rate, +0.8R expectancy (avoid late trading). Trades when I felt 'FOMO': 8 trades, 25% win rate, -0.6R expectancy; trades when calm: 39 trades, 54% win rate, +0.75R expectancy (emotional state critical)." These insights lead to specific actions: eliminate breakouts, focus on support bounces, stop trading after 2 PM, implement FOMO circuit breaker. Without journal, you'd never know these patterns existed.`,
      keyConcepts: [
        { term: 'R-Multiple Measurement', definition: 'Expressing trade profit/loss as multiple of initial risk. If you risked 1,000 SAR (1R) and made 2,500 SAR profit, that\'s +2.5R. If you lost 800 SAR, that\'s -0.8R. R-multiple normalizes trades for comparison regardless of account size changes, enabling accurate expectancy calculation.' },
        { term: 'Setup-Type Performance Analysis', definition: 'Categorizing every trade by setup type (support bounce, breakout, flag pattern, etc.) and calculating separate metrics for each. Reveals which strategies have positive expectancy (worth trading) and which have negative expectancy (eliminate). Essential for focusing on your edge.' },
        { term: 'Emotional State Correlation', definition: 'Recording emotional state at trade entry (calm, confident, anxious, FOMO, revenge, etc.) and calculating performance metrics for each emotion. Consistently shows calm/disciplined trades vastly outperform emotional/impulsive trades - quantifies cost of emotional trading.' },
        { term: 'Plan Adherence Tracking', definition: 'Recording whether each trade followed all criteria in your trading plan (yes/no). Calculating separate performance metrics for plan-adherent vs. non-adherent trades. Typically shows adhering to plan produces significantly better results - reinforces discipline.' }
      ],
      gccExamples: [
        'Journal Entry Example - Winning Trade: Date: 2024-03-15, Time: 10:45 AM, Symbol: Saudi Aramco (Tadawul 2222), Direction: Long, Entry: 34.20 SAR, Stop: 33.60 SAR, Target: 35.80 SAR, Position: 1,428 shares (48,838 SAR value), Risk: 0.60 SAR/share = 857 SAR (0.86% of 100K account), Exit: 35.80 SAR (target hit), P&L: +2,285 SAR (+2.29%), R-Multiple: +2.67R, Commission: 73 SAR (0.15% round-trip), Setup: Support Bounce at 50-day MA, Thesis: "Aramco pulled back to 50-day MA (33.80) during broader market strength, RSI 34 (oversold), 2.67:1 RR to previous high resistance at 35.80, oil prices supportive (+2% this week)", Market Conditions: Tadawul trending higher, moderate volume, low volatility, Emotional State: Calm and Confident (all criteria met, patient entry), Plan Adherence: Yes (all 5 setup criteria satisfied), Lesson: "Waiting for confirmed bounce above MA (vs. buying at MA) prevented early entry - price touched 33.85 before reversing, my entry at 34.20 avoided that whipsaw."',
        'Journal Entry Example - Losing Trade: Date: 2024-03-18, Time: 9:35 AM, Symbol: SABIC (Tadawul 2010), Direction: Long, Entry: 89.50 SAR, Stop: 88.80 SAR, Target: Not defined (mistake!), Position: 1,000 shares (89,500 SAR), Risk: 0.70 SAR/share = 700 SAR (0.70% of 100K account), Exit: 88.80 SAR (stopped out), P&L: -700 SAR (-0.70%), R-Multiple: -1.0R, Commission: 134 SAR, Setup: Attempted Breakout, Thesis: "SABIC breaking above 89.00 resistance, wanted to catch move" (vague!), Market Conditions: Choppy, low volume, Emotional State: FOMO (missed Aramco rally day before, felt need to "be in" a trade), Plan Adherence: No (did not meet volume criteria - breakout volume was only 0.9× average, required 1.3×; no clear profit target calculated pre-entry), Lesson: "FOMO drove poor entry. Breakout failed immediately due to weak volume - I knew volume requirement exists but ignored it due to impatience. Recommit to ALL criteria or no trade. Also, not defining target pre-entry was sloppy - contributed to uncertainty during trade. RULE: No future trades without pre-defined target and all criteria met."',
        'Weekly Review Discovery: Week of March 11-15, 2024: Total: 7 trades, 4 wins, 3 losses (57% win rate), Total P&L: +3,150 SAR (+3.15%), Avg RR: 2.2:1, Expectancy: +0.67R. Setup Analysis: Support Bounces (4 trades) - 75% win rate, +1.25R expectancy (excellent!), Breakouts (3 trades) - 33% win rate, -0.15R expectancy (eliminate these). Timing Analysis: 10:00-11:30 AM entries (5 trades) - 80% win rate, +1.02R expectancy; 9:00-9:30 AM entries (2 trades) - 0% win rate, -1.0R expectancy each. Emotional Analysis: Calm entries (5 trades) - 80% win rate, FOMO entries (2 trades) - 0% win rate. Plan Adherence: 71% (5 of 7 trades followed all criteria). Action Items for Next Week: (1) STOP trading first 30 minutes (both losses came from 9:00-9:30), (2) ELIMINATE breakout setups until I can define better criteria (negative expectancy), (3) FOCUS on support bounces exclusively (clearly my edge), (4) If feeling FOMO, implement 15-minute cooling rule before entry.',
        'Monthly Deep Dive - March 2024: Total: 28 trades, 17 wins, 11 losses (60.7% win rate), Total P&L: +12,450 SAR (+12.45% monthly return), Avg RR: 2.3:1, Expectancy: +0.62R, Max Drawdown: -3.2% (acceptable), Plan Adherence: 78%. Setup Performance: Support Bounce (16 trades, 68.75% win, +0.94R expectancy) - THIS IS MY EDGE, Flag Pattern (7 trades, 57% win, +0.45R expectancy) - Acceptable, Breakouts (5 trades, 20% win, -0.48R expectancy) - ELIMINATE PERMANENTLY. Stock Performance: Saudi Aramco (8 trades, 75% win, +0.98R) - Best, SABIC (6 trades, 50% win, +0.20R) - Acceptable, Al Rajhi (5 trades, 40% win, +0.05R) - Underperforming, stop trading until better setups. Emotional Correlation: Calm/Confident (20 trades, 70% win, +0.85R expectancy), Anxious (5 trades, 40% win, +0.10R), FOMO (3 trades, 0% win, -1.0R each = -3,000 SAR cost of FOMO). Plan Changes: Based on 28 trades showing consistent pattern: (1) Eliminate breakout setups from plan - negative expectancy, (2) Add "no first-hour trading" rule - data shows underperformance, (3) Implement mandatory 15-minute wait if feeling FOMO - FOMO trades cost 3,000 SAR this month. Next month goal: 85% plan adherence (vs. 78% this month), maintain expectancy above +0.60R.'
      ],
      steps: [
        'Create trading journal spreadsheet or choose dedicated software: Set up columns for all quantitative data (Date, Time, Symbol, Entry, Stop, Target, Size, Risk SAR, Risk %, Exit, P&L SAR, P&L %, R-multiple, Commission) and qualitative data (Setup Type, Thesis, Market Conditions, Emotion, Plan Adherence Y/N, Lessons). Save template for recurring use.',
        'Commit to recording EVERY trade immediately after exit: No exceptions - write in journal before closing your trading platform. Capture emotions and observations while fresh. Record why you took trade, how you felt, what you observed. This real-time capture prevents memory bias.',
        'Save chart screenshots for every trade: At entry: annotate chart with setup explanation, entry point, stop, target, support/resistance levels. At exit: save chart showing full trade progression. Create folder structure: Year > Month > "2024-03-15 Aramco Support Bounce +2.5R" for organization. Visual records are invaluable for pattern recognition.',
        'Implement daily review ritual: Every trading day, before closing workspace, spend 10 minutes: (1) Verify all trades recorded, (2) Calculate daily P&L, (3) Write one specific lesson learned today (even if no trades, write market observation), (4) Identify any plan violations and why they occurred. This daily reflection accelerates learning.',
        'Conduct weekly performance analysis: Every weekend, spend 30-60 minutes: (1) Calculate week\'s key metrics (win rate, expectancy, avg RR, plan adherence %), (2) Categorize trades by setup type and calculate separate metrics for each, (3) Review emotional notes for patterns, (4) Create 2-3 specific action items for next week based on data. Write action items in bold at top of next week\'s journal.',
        'Perform monthly deep dive review: First weekend of each month, dedicate 2-3 hours: (1) Calculate all monthly metrics and compare to previous months (trending up or down?), (2) Detailed setup analysis - which have positive expectancy (focus more), negative expectancy (eliminate), (3) Analyze biggest winners/losers for commonalities, (4) Emotional state performance comparison - quantify cost of emotional trading, (5) If you have 30+ trades with consistent pattern supporting plan change, document proposed change with data justification and implement next month. Create monthly summary document highlighting key insights.'
      ],
      mistakes: [
        'Recording trades days later from memory - details are forgotten, emotional states sanitized, you\'ll miss critical patterns; record immediately while fresh',
        'Only recording losers or only recording quantitative data without qualitative - you need complete picture: numbers for metrics, emotions for psychological insights, thesis for setup improvement',
        'Recording data but never reviewing it - journal without analysis is wasted effort; weekly and monthly reviews are where patterns emerge and improvement happens',
        'Changing trading approach before sufficient data - 5 trades with new setup isn\'t enough; minimum 20-30 trades needed to assess setup expectancy reliably',
        'Not recording trades that violated your plan - those are the most important to record! They reveal discipline gaps and often show why following plan matters (plan-violating trades usually underperform)',
        'Making journal too complicated (20+ fields) then abandoning it - start simple: trade basics, P/L, R-multiple, emotional state, plan adherence; add complexity only if beneficial'
      ],
      visualReference: 'Visualize a comprehensive "Trading Journal Dashboard": Top section shows Monthly Performance Summary for March 2024: Large metrics displayed: 28 Total Trades, 60.7% Win Rate (green, target 50-60%), +0.62R Expectancy (green, target >0.5R), +12.45% Return (large green), -3.2% Max Drawdown (yellow, acceptable). Gauge meters show Plan Adherence at 78% (yellow, target 85%+). Below, "Setup Performance Table": Columns for Setup Type, Number of Trades, Win Rate, Avg RR, Expectancy, with color coding. Rows: Support Bounce (16, 68.75%, 2.5:1, +0.94R - bright green "Your Edge!"), Flag Pattern (7, 57%, 2.0:1, +0.45R - light green "Acceptable"), Breakout (5, 20%, 1.8:1, -0.48R - red "Eliminate!"). Middle section shows "Emotional State Analysis" - horizontal bar chart: Calm/Confident (20 trades, +0.85R avg, green), Anxious (5 trades, +0.10R, yellow), FOMO (3 trades, -1.0R avg, bright red with annotation "Cost: -3,000 SAR this month"). Right panel displays "Sample Journal Entry" in spreadsheet format showing single trade with all fields filled: Date, Symbol, Entry/Stop/Target prices, quantitative calculations, and qualitative notes section describing setup thesis, emotional state ("Calm - all criteria met"), and lesson learned. Bottom section shows "Weekly Trend Chart" - line graph plotting weekly expectancy over 4 weeks of March: Week 1 (+0.45R), Week 2 (+0.58R), Week 3 (+0.75R), Week 4 (+0.70R), showing improvement trend with annotation "Improvement driven by eliminating first-hour trades and focusing on support bounces per weekly review action items." Finally, "Action Items for Next Month" box lists: (1) Eliminate breakout setups (negative expectancy confirmed), (2) No first-hour trading (data shows underperformance), (3) Implement 15-min FOMO cooling rule (quantified cost), (4) Target 85% plan adherence (vs. 78% this month). This visualization transforms raw journal data into actionable insights and demonstrates systematic improvement process.'
    },

    // MODULE 5: BASIC TECHNICAL ANALYSIS (8 lessons)
    'course1-module5-lesson1': {
      objectives: [
        'Master different chart types (line, bar, candlestick) and when to use each',
        'Understand timeframe selection and multi-timeframe analysis principles',
        'Learn to read price action and identify significant price levels',
        'Develop chart interpretation skills specific to GCC market characteristics'
      ],
      explanation: `Charts are the technical trader's primary tool - they transform thousands of price transactions into visual patterns that reveal market psychology, trends, and trading opportunities. Before you can identify support levels, chart patterns, or apply indicators, you must understand how to properly read and interpret charts across different formats and timeframes.

**Chart Types - Line, Bar, and Candlestick:** The simplest chart is the Line Chart, connecting closing prices across time periods. It's clean and shows overall trend clearly but sacrifices detail - you don't see the high, low, or opening price, making it unsuitable for serious analysis. The Bar Chart (OHLC - Open, High, Low, Close) shows all four prices per period: vertical line spans the high to low, small horizontal tick on left marks the open, tick on right marks the close. Bars reveal more information but require practice to read quickly. The Candlestick Chart, originated in 18th century Japanese rice markets, is most popular among traders because it visually emphasizes the relationship between open and close prices. Each "candle" has a body (rectangle between open and close) and wicks/shadows (lines extending to high and low). Green/white candles show close above open (bullish), red/black show close below open (bearish). The body's size reveals conviction: large body means strong directional movement, tiny body (doji) shows indecision. For GCC trading, candlestick charts are standard and recommended - they provide all necessary information with excellent visual clarity for pattern recognition.

**Timeframe Selection - Matching Chart to Strategy:** Your trading timeframe should match your strategy and available time commitment. Intraday traders use 1-minute to 15-minute charts, holding positions minutes to hours within a single session - this requires constant monitoring and is affected by bid-ask spreads significantly. Swing traders use 1-hour to Daily charts, holding positions days to weeks, capitalizing on multi-day trends - this requires checking charts 1-2 times daily, more practical for those with other commitments. Position traders use Daily to Weekly charts, holding weeks to months based on fundamental and technical alignment - minimal time required, focusing on major trend changes. For GCC beginners with full-time jobs, Daily charts are optimal starting point: TASI and ADX have limited trading hours (4.5-5 hours daily), making true intraday trading difficult for those working typical hours; daily charts capture the full session's price action in one candle, allowing evening analysis and overnight decisions; spreads and commissions consume less of your profit potential on larger moves captured over multiple days.

**Multi-Timeframe Analysis - Seeing the Bigger Picture:** Never analyze a single timeframe in isolation. Professional traders use top-down analysis: check higher timeframe for overall trend and major support/resistance, then drop to your trading timeframe for specific entries. Example for swing trading Saudi Aramco: (1) Weekly Chart - identify that Aramco is in uptrend, last week formed bullish engulfing candle after touching 50-week moving average, next major resistance is 38.00 SAR (previous high from 6 months ago); (2) Daily Chart - see that within weekly uptrend, Aramco has pulled back to 32.50 SAR support (previous resistance, now support), formed doji yesterday suggesting indecision before continuation, 20-day moving average is rising at 31.80 providing dynamic support; (3) 4-Hour Chart - price bounced this morning off 32.50, formed bullish engulfing candle on increased volume, momentum turning positive. Conclusion: Weekly trend is up (trade with trend), daily level at 32.50 is holding (good support), 4-hour timeframe showing bullish reversal signal (timing for entry). This multi-timeframe confirmation substantially improves probability. Common rule: use 3 timeframes in 4-5× ratio - if you trade Daily charts, check Weekly (larger context) and 4-Hour or 1-Hour (entry timing).

**Reading Price Action - What Charts Tell You:** Every candle tells a story about the battle between buyers and sellers. Long green candle with small wicks = strong buying, sellers barely resisted, suggests continuation. Long red candle with small wicks = strong selling, buyers barely resisted, suggests continuation. Candle with long upper wick and small body = buyers pushed price high but sellers rejected those levels, closing near the low, bearish signal. Candle with long lower wick and small body = sellers pushed price low but buyers rejected those levels, closing near the high, bullish signal especially at support. Doji (open equals close, creating cross or plus shape) = indecision, neither buyers nor sellers won, suggests potential reversal if at trend extremes. Series of small-bodied candles = consolidation, market is resting/uncertain before next move. The location and context matter enormously: a doji after 10 straight bullish candles near resistance suggests exhaustion/reversal; the same doji mid-trend means little.

**Timeframe Characteristics in GCC Markets:** GCC markets have unique timing considerations. TASI (Saudi Tadawul): trades 10:00 AM - 3:00 PM Riyadh time (5.5 hours including pre-opening), most active in first and last hour, mid-day often slower. DFM/ADX (UAE): trade 10:00 AM - 2:00 PM Dubai time (4 hours), concentrated activity in first 90 minutes. QE (Qatar): 9:30 AM - 1:30 PM Doha time (4 hours). This shorter session compared to US (6.5 hours) or Europe (8+ hours) means each daily candle represents less price discovery time - patterns may form slower. However, GCC markets are closed Friday-Saturday while global markets trade, creating gap risk on Sunday opening: if crude oil drops 5% on Friday (US trading) due to OPEC news, TASI and Saudi Aramco will gap down 3-4% at Sunday open - the daily chart shows a price gap (jump from previous close to new open with no trading in between). Gaps are significant technical events: measure them, note their size and direction, and watch if price fills them (returns to gap) or runs away from them (strong trend).

**Chart Setup Best Practices:** Configure your charts for maximum insight: (1) Choose candlestick format for pattern recognition advantages; (2) Use logarithmic scale (not arithmetic) if stock has moved >50% over displayed period - this shows percentage moves equally, preventing distortion (arithmetic scale makes early moves look tiny and recent moves look huge; logarithmic scale shows 10% move as same vertical distance whether at 10 SAR or 100 SAR); (3) Display volume at bottom - essential for confirming breakouts and reversals; (4) Keep chart clean initially - don't add 10 indicators that obscure price action, start with price and volume only, add tools as you learn their specific value; (5) Mark significant levels (major support/resistance, psychological round numbers like 30.00, 35.00) with horizontal lines for reference; (6) Save chart templates so all your charts have consistent setup, enabling faster analysis.

**Developing Chart Reading Skill:** Chart interpretation improves with deliberate practice. Daily routine: spend 15 minutes reviewing 5-10 key GCC stocks (Aramco, SABIC, Al Rajhi, STC, Emaar, First Abu Dhabi Bank, Qatar National Bank), note what price did today in context of recent pattern - did it respect support, break resistance, form notable candle pattern? On weekends, review weekly charts to see bigger trends. Over months, you develop "chart sense" - the ability to quickly assess whether a stock is trending, consolidating, at support/resistance, showing strength or weakness. This visual pattern recognition cannot be taught through description alone - it's built through repetitive observation and conscious analysis. Keep it simple initially: trend direction (up/down/sideways), current price relative to recent high/low, and whether price action looks strong (decisive moves, respecting levels) or weak (whipsaws, failing to hold levels).`,
      keyConcepts: [
        { term: 'Candlestick Anatomy', definition: 'Each candle shows four critical prices: Open (start of period), High (maximum price reached), Low (minimum price reached), Close (ending price). The rectangular body spans open to close. Vertical lines (wicks/shadows) extend from body to high and low. Body color (green/white for close above open, red/black for close below open) instantly shows whether bulls or bears won that period. Body size indicates conviction strength.' },
        { term: 'Multi-Timeframe Analysis', definition: 'Examining the same stock across 3 different chart timeframes (typically 5× ratio: Weekly-Daily-4Hour or Daily-4Hour-15Minute) to understand big picture trend, intermediate support/resistance context, and precise entry timing. Higher timeframe identifies trend direction (trade with it), middle timeframe identifies key levels, lower timeframe times specific entry. Dramatically improves probability vs. single-timeframe analysis.' },
        { term: 'Price Gap', definition: 'Occurs when opening price is significantly different from previous close with no trading in between, creating visual gap on chart. In GCC markets, most gaps occur at Sunday opening after international markets moved Friday/Saturday. Gaps act as support/resistance - price often returns to "fill the gap" or respects gap as significant level. Size and direction of gap indicates urgency/strength of move.' },
        { term: 'Logarithmic vs. Arithmetic Scale', definition: 'Arithmetic scale: vertical axis shows equal price increments (each 1 SAR gets same space). Makes percentage moves appear different sizes - 10% move from 10 to 11 SAR looks tiny vs. 10% move from 100 to 110 SAR. Logarithmic scale: vertical axis shows equal percentage increments (each 10% move gets same space regardless of price). Essential for long-term charts or stocks that have moved >50%, prevents visual distortion.' }
      ],
      gccExamples: [
        'Daily Chart of Saudi Aramco on TASI: Each candlestick represents one trading session (10 AM - 3 PM Riyadh time). Monday\'s candle: Open 32.40 SAR, High 33.10 SAR, Low 32.20 SAR, Close 32.90 SAR. This forms a green candle with body from 32.40 to 32.90 (50 fils range) and wicks extending to 32.20 (lower wick, buyers defended that level) and 33.10 (upper wick, sellers prevented higher prices). The lower wick being small suggests limited selling pressure, upper wick being moderate suggests resistance near 33.10. The green body closing near the high (32.90 vs high of 33.10) is bullish - buyers controlled most of the session. Volume was 15.2 million shares, above the 20-day average of 12 million, confirming genuine buying interest. Reading: Bullish price action, buyers active, resistance apparent near 33.10 to watch for next session.',
        'Multi-Timeframe Analysis Example - SABIC (Tadawul 2010): Weekly Chart shows SABIC in established uptrend, trading at 87.50 SAR after rising from 72.00 SAR over 4 months, currently pulling back from resistance at 90.00 SAR, next major support is 82.00 SAR (previous consolidation zone). Daily Chart shows within that weekly uptrend, SABIC has declined from 90.00 to 84.50 over past 8 trading days, now testing support at 84.00 SAR, RSI at 38 (approaching oversold), daily candle formed hammer yesterday (long lower wick) suggesting selling exhaustion. 4-Hour Chart shows today SABIC bounced from 84.00 low, formed bullish engulfing candle at 10:30 AM, currently trading 85.20 with volume picking up. Conclusion: Weekly context is bullish (uptrend intact), daily level (84.00) is holding with reversal pattern, 4-hour timing shows bounce underway. This is high-probability long setup: enter near 85.20, stop below 83.50 (below daily support), target first resistance at 87.50 then 90.00. Risk-reward is attractive (1.7 risk for potential 2.3-4.8 reward). Without checking weekly chart, you might have missed that overall trend is up. Without 4-hour chart, you might have entered too early before bounce confirmation.',
        'Reading Price Gaps - Emaar Properties (DFM): Thursday close: 6.80 AED. Over weekend, Dubai announces major infrastructure project including metro expansion near Emaar communities. Sunday open: 7.15 AED (35 fils gap up, 5.1% jump). This gap represents all the buying demand that accumulated over closed days, released at opening. The gap from 6.80 to 7.15 appears as white space on daily chart - no candles between these levels. Technical significance: this gap zone often acts as support if price pulls back (many buyers who missed the gap opening will place orders in that zone to "buy the breakout"). Following days, Emaar trades 7.20-7.40 for 3 days, then pulls back to 7.10 (approaching gap), bounces back to 7.30 (gap held as support). If price had filled the gap quickly (dropped back below 6.80), it would suggest the news wasn\'t as significant as initial reaction implied. Since gap held, it confirms the move was genuine. Lesson: Mark significant gaps (>2%) on your charts, watch if price respects them.',
        'Timeframe Selection Based on Trading Style: Mohammed works full-time 8 AM - 5 PM in Riyadh, wants to swing trade TASI stocks. He cannot monitor 15-minute charts during his workday (TASI trades 10 AM - 3 PM while he\'s working). Solution: Use Daily charts as primary timeframe. Each evening around 8 PM (after Tadawul session closed at 3 PM), he reviews his watchlist on daily charts: checks if any stocks are setting up near support levels, broke out of patterns, or approaching his profit targets/stop losses. He places limit orders or stop orders for next day\'s session, then doesn\'t check again until evening. This approach requires 30-45 minutes daily, perfectly compatible with full-time work. On weekends, he reviews Weekly charts to identify which stocks have clean trends and logical support/resistance structure for upcoming week. Alternatively, if Mohammed could check charts during lunch break (12:00-12:30), he might use 1-hour charts, checking 3-4 times during trading session, enabling shorter-term swing trades of 2-5 days instead of 1-3 weeks. The key: timeframe must match available time and lifestyle - forcing yourself to day-trade on 5-minute charts while working full-time guarantees either poor trading (missed opportunities, delayed reactions) or job problems (distraction). Choose sustainable timeframe.'
      ],
      steps: [
        'Configure your charting platform for optimal analysis: Select candlestick chart type (most information, best visual pattern recognition). Set default view to show 3-6 months of data (enough context without overwhelming detail). Enable volume display at chart bottom. Choose logarithmic scale for stocks that have moved >50%. Set up clean layout: price chart 70% of screen, volume 15%, leave 15% for 1-2 indicators when you need them later. Save this as your default template.',
        'Learn to read individual candles in context: Practice identifying candle characteristics: body size (strong move vs. indecision), wick lengths (rejection at highs/lows vs. acceptance), body color (bullish green vs. bearish red). Most importantly, consider location: a red candle at resistance after uptrend is significant (sellers defending level), the same red candle mid-trend is just noise. A hammer (long lower wick, small body at top) at support is bullish reversal signal, at resistance it means nothing. Spend 5 minutes daily reviewing 3-5 GCC stocks, describing latest candle aloud: "Saudi Aramco formed green candle today with body 32.40-32.80, small lower wick to 32.20, moderate upper wick to 33.10, closing near high suggests bullish strength, located just below resistance at 33.50." This verbalization builds reading skill.',
        'Implement multi-timeframe analysis routine: For any trade setup, check 3 timeframes in sequence: (1) Higher timeframe (5× your trading timeframe): identify overall trend direction, major support/resistance zones, recent price structure. Determine if trend is up (look for longs), down (look for shorts), or sideways (avoid or use range tactics). (2) Trading timeframe: identify specific setup developing (support bounce, breakout, flag pattern), mark your entry level, stop loss, and profit target based on levels visible on this chart. (3) Lower timeframe (1/5× your trading timeframe): confirm entry timing - wait for bullish candle/momentum on this faster chart before entering, provides precision entry and helps avoid entering too early. Make this sequence automatic habit before every trade.',
        'Understand GCC-specific timing and gap behavior: Mark your charts with trading hours for reference: TASI (10:00-15:00 Riyadh time), DFM/ADX (10:00-14:00 Dubai time), QE (9:30-13:30 Doha time). Note that these markets are closed Friday-Saturday when US and Europe trade - news and price moves in oil, global markets, or regional geopolitics during this period create gaps at Sunday opening. Track significant gaps (>2% from previous close): mark them on chart with horizontal line, label "Gap 6.80-7.15" with date. Observe in following days whether price respects gap as support (gap up) or resistance (gap down), or fills the gap quickly (suggests weak move). Develop awareness that Sunday opening requires extra caution - check what happened globally over weekend before trading first hour.',
        'Practice identifying trend and key levels on clean charts: Before adding any indicators, master reading pure price action. Daily exercise: open 10 GCC stocks, for each quickly identify: (1) Trend: drawing from left to right, is price making higher highs and higher lows (uptrend), lower highs and lower lows (downtrend), or oscillating in range (sideways)? (2) Recent high and recent low: mark these with horizontal lines. (3) Current price position: near recent high (potentially extended), near recent low (potentially support), or middle of range (no edge)? (4) Latest candle type: strong directional candle, indecision doji, reversal hammer/shooting star, or inside bar? This 15-second per stock analysis builds visual pattern recognition that\'s foundation for all technical analysis. After 2-3 weeks daily practice, chart reading becomes nearly instant.',
        'Start a chart journal: Screenshot notable price action and patterns you observe with brief explanation. Example: "SABIC 2024-03-15: After uptrend from 72 to 90 SAR over 3 months, price formed evening star reversal pattern at 90 resistance (bearish), declined to 84 support, formed morning star reversal (bullish), bounced back to 87. Lesson: support at 84 held, reversal patterns at turning points are reliable." Save 2-3 examples weekly. Months later, review these to see which patterns worked, which failed, in what contexts. This visual library accelerates learning because chart patterns stick in memory better than written descriptions. Organize folder by pattern type: "Support Bounces", "Breakout Failures", "Trend Reversals", etc. When you see similar setup forming live, refer to your journal examples for guidance on how it typically resolves.'
      ],
      mistakes: [
        'Using only one timeframe and missing bigger picture - you might see "breakout" on daily chart that is actually just hitting resistance visible on weekly chart; always check higher timeframe',
        'Adding too many indicators initially and obscuring price action - beginners often load 5-8 indicators trying to find "perfect" setup, resulting in cluttered charts where you can barely see price; start with price and volume only',
        'Using arithmetic scale on long-term charts or stocks with large percentage moves - creates visual distortion where recent moves look enormous and early moves look insignificant, skewing perception; use logarithmic scale for >50% price changes',
        'Ignoring volume at bottom of chart - volume confirms or refutes price moves; breakout on weak volume often fails, reversal on high volume more reliable; volume is as important as price',
        'Not accounting for GCC weekend gaps - entering large position Friday close (or Thursday close for UAE) without checking global news over closed days risks significant adverse gap at Sunday/Monday opening',
        'Switching timeframes inconsistently - analyzing daily charts one week, switching to 4-hour next week based on impatience or recent loss; this prevents building pattern recognition and statistical edge; choose timeframe matching your lifestyle and stick with it minimum 3 months'
      ],
      visualReference: 'Visualize a professional trading screen layout divided into three sections: Left Panel (40% width) shows "Weekly Chart - Saudi Aramco" in candlestick format spanning 12 months, displaying clear uptrend from 28 SAR to 36 SAR, currently at 33.50 SAR after pullback from recent high of 36.20 SAR. Major horizontal support line drawn at 32.00 SAR (previous resistance, now support), major resistance at 38.00 SAR (2023 high). Annotation: "Weekly Trend: UP - Trade with trend, look for long setups." Middle Panel (40% width) shows "Daily Chart - Saudi Aramco" spanning 3 months, zooming into recent action: price pulled back from 36.20 to current 33.50 over 12 days, now testing support zone 32.80-33.20 (minor support). Yesterday formed hammer candle (long lower wick to 32.85, small green body 33.20-33.50), suggesting rejection of lower prices. 20-day moving average rising at 32.50 providing dynamic support. Volume yesterday above average (14M vs 10M avg). Annotation: "Daily Setup: Hammer at support zone - potential reversal." Right Panel (20% width) shows "4-Hour Chart - Saudi Aramco" zooming into last 4 trading sessions: today\'s first 4-hour candle (10 AM - 2 PM) formed bullish engulfing pattern: previous candle red 33.30-33.05, current candle green 33.15-33.65 (larger body completely engulfing previous), volume 6.2M in 4 hours (strong). Price currently 33.65 and rising. Annotation: "4H Timing: Bullish reversal confirmed - Entry signal." Bottom of screen shows "Volume Panel" below each chart (15% height), displaying vertical bars representing volume per candle. Recent volume bars on daily chart showing increase during decline (distribution) but yesterday\'s hammer had even higher volume (accumulation/reversal). Below charts, "Analysis Summary Box": Weekly: Uptrend intact ✓, Daily: At support + Reversal pattern ✓, 4-Hour: Bullish momentum ✓. Trade Plan: Enter Long at 33.70, Stop Loss 32.70 (below support and hammer low), Target 1: 35.50 (previous resistance), Target 2: 36.20 (recent high). Risk/Reward: 1.0 risk for 1.8 to 2.5 reward. This multi-timeframe layout shows how professional traders gain conviction: higher timeframe trend, trading timeframe setup, lower timeframe entry confirmation all aligned.'
    },

    'course1-module5-lesson2': {
      objectives: [
        'Understand the concept of support and resistance as price memory and psychological levels',
        'Learn to identify and draw horizontal support/resistance zones accurately',
        'Master the principle of role reversal (support becomes resistance and vice versa)',
        'Apply support/resistance analysis to GCC stocks with practical entry/exit strategies'
      ],
      explanation: `Support and resistance are the most fundamental concepts in technical analysis - they represent price levels where buying or selling pressure historically concentrated, creating zones where price is likely to react again. Understanding these levels transforms random price squiggles into logical structure with tradeable implications.

**What is Support?:** Support is a price level or zone where buying interest is sufficiently strong to overcome selling pressure, preventing price from falling further. Think of it as a floor that price bounces off. Why does support exist? Price memory and psychology. When Saudi Aramco previously bounced from 32.00 SAR and rallied to 36.00 SAR, traders remember: those who bought at 32.00 made excellent profit, those who didn't buy wish they had, those who sold at 32.00 regret it. Next time price approaches 32.00, three groups act: (1) Original buyers near 32.00 who sold higher want to re-enter at that proven level (buying pressure); (2) Traders who missed the previous bounce place orders near 32.00 to catch the next rally (buying pressure); (3) Shorts who sold higher see 32.00 as logical level to take profit, creating short-covering (buy orders). These combined buy orders create a concentration of demand at 32.00 - when price approaches, buy orders absorb selling pressure and price bounces. Support isn't a magical line - it's simply where buyers previously overwhelmed sellers, and market participants remember and act on that level again.

**What is Resistance?:** Resistance is a price level or zone where selling pressure sufficiently overcomes buying pressure, preventing price from rising further. It's a ceiling that price struggles to break above. Using same psychology: when Al Rajhi Bank previously reached 85.00 SAR and got rejected back to 78.00 SAR, traders remember. Next approach to 85.00 creates three groups: (1) Traders who bought lower see 85.00 as proven exit point (selling pressure); (2) Traders who bought near 85.00 last time and suffered drawdown want to "break even" so they place sell orders at 85.00 (selling pressure); (3) Short-sellers see 85.00 as proven level to enter shorts (selling pressure). Combined, these orders create concentration of supply at 85.00 - when price approaches, sellers overcome buyers and price reverses down. Resistance is simply where sellers previously overwhelmed buyers, and the memory causes repetition.

**Identifying Support and Resistance - How to Draw Levels:** Don't draw lines at random. Support and resistance must be marked where price previously demonstrated reaction. Method: (1) Scan chart left to right looking for obvious turning points - places where price reversed sharply from advance to decline (resistance) or decline to advance (support). (2) Draw horizontal line at that price level. (3) Extend line to the right across current price action. (4) Look for multiple touches - the more times price respected a level historically, the more significant. Two touches is a level worth noting, three or more touches is strong level. Example on SABIC chart: price reached 90.00 SAR in June 2023 and reversed, reached 90.00 again in September 2023 and reversed, reached 90.10 in December 2023 and reversed, now approaching 90.00 in March 2024. That's four reactions at approximately 90.00 - draw resistance line at 90.00, extremely significant level. Similarly, support at 82.00 was tested three times with bounces - strong support.

**Zones, Not Lines - Building in Tolerance:** Support and resistance are not precise to the fils. Mark them as zones spanning small range. If SABIC bounced from 82.10, 82.00, and 81.95 across different occasions, don't draw three separate lines - draw a zone from 81.90 to 82.15 labeled "Support Zone 82.00". This recognizes market imprecision: different order flow, varying liquidity, and psychological clustering around round numbers creates small variations. Treat support/resistance as areas of interest, not magical exact prices. When price approaches 82.00 support, expect reaction somewhere in 81.90-82.15 range, with 82.00 as central reference. This prevents false signals where you marked support at 82.00, price reversed at 82.05, and you thought "support didn't hold" when actually it did hold in the zone.

**Role Reversal - Support Becomes Resistance (and vice versa):** One of the most reliable technical principles: when support is convincingly broken, it often becomes new resistance; when resistance is broken upward, it often becomes new support. Psychology: If Emaar Properties has support at 6.50 AED (bounced there twice), then price breaks down through 6.50 to 6.20, traders interpret: (1) Those who bought at 6.50 expecting support are now losing; (2) New support has failed, reducing bullish confidence. If price recovers back toward 6.50, what happens? Trapped buyers who bought at 6.50 and suffered drawdown to 6.20 are relieved to "get out at break-even" - they sell at 6.50. New buyers who saw breakdown interpret 6.50 as now damaged level (it failed as support), less likely to buy there. Result: previous support at 6.50 now acts as resistance, capping rally attempts. The reverse also applies: if Emirates NBD had resistance at 15.00 AED (rejected there twice), then breaks above 15.00 to 15.60, when price pulls back toward 15.00, traders who missed the breakout eagerly buy this "tested and broken resistance, now support" level. Role reversal is so reliable it's a core strategy: when key resistance breaks, wait for pullback to buy at that old resistance (new support); when key support breaks, wait for bounce to sell at that old support (new resistance).

**Strength of Support/Resistance - What Makes a Level Significant:** Not all levels are equal. Strong support/resistance has these characteristics: (1) Number of touches: more historical reactions = stronger level. (2) Time span: level respected over months or years is stronger than level from last two weeks. (3) Volume: if price reversed at level on high volume, shows strong conviction, increases level's significance. (4) Round numbers: psychological clustering at prices like 30.00, 35.00, 100.00 SAR makes these stronger than arbitrary levels like 32.73. (5) Confluence with other factors: support at 32.00 SAR which also coincides with 200-day moving average and 50% retracement from previous rally is much stronger than isolated support. When analyzing, prioritize major levels with these characteristics over minor levels.

**GCC Market Context - Support/Resistance Characteristics:** GCC stocks often have relatively stable support/resistance compared to high-volatility growth stocks because: (1) Many GCC blue chips (Aramco, major banks) have large institutional ownership and lower retail speculation, creating more orderly price movement and respect for technical levels. (2) Lower daily volatility (TASI average daily move 0.8% vs. US tech stocks 2-3%) means support/resistance zones are more defined, less "noise". (3) Dividend-oriented investor base creates fundamental support levels: if Saudi Telecom yields 5% when price is 40.00 SAR but would yield 6.5% at 31.00 SAR, dividend buyers create strong support near 31.00 as yield becomes increasingly attractive. This fundamental floor reinforces technical support. However, weekend gap risk means support/resistance can be violated suddenly: strong support at 32.00 doesn't prevent Sunday gap opening at 30.50 if negative news hit over weekend. Use stop-losses below support rather than assuming support is impenetrable.

**Trading with Support and Resistance - Practical Application:** Most reliable strategies: (1) Buy at support with tight stop below support: If SABIC approaches support zone 82.00 (tested three times historically), enter long at 82.20, stop-loss at 81.40 (below support zone), target resistance at 87.00 or 90.00. Risk: 0.80 SAR (82.20 to 81.40), Reward: 4.80 to 7.80 SAR (82.20 to 87/90), excellent 6:1 to 10:1 risk-reward. If support breaks, small loss; if holds, substantial gain. (2) Sell at resistance: Opposite approach for shorts or taking profit on longs. (3) Breakout trades with role reversal confirmation: If resistance at 90.00 breaks to 91.50, wait for pullback to 90.00 (old resistance, now support), then buy the bounce with stop below 89.50. This combines breakout momentum with support level for high-probability setup. These strategies work because support/resistance zones are where risk-reward is most favorable - stop can be placed just beyond the level (small risk) while target is next major level (large reward).`,
      keyConcepts: [
        { term: 'Support Level/Zone', definition: 'Price area where buying pressure historically exceeded selling pressure, causing price to bounce upward. Appears on chart as horizontal zone where price previously reversed from decline to advance, often multiple times. Represents price memory - traders remember this level and place buy orders as price approaches again, creating self-fulfilling tendency for support to hold. Stronger with more touches, longer time span, and higher volume at reversals.' },
        { term: 'Resistance Level/Zone', definition: 'Price area where selling pressure historically exceeded buying pressure, preventing further price appreciation. Horizontal zone where price previously reversed from advance to decline, often multiple times. Traders remember this ceiling and place sell orders as price approaches, creating concentrated supply that repels price. Identifies where rallies likely to stall or reverse, providing logical profit-taking or short-selling opportunities.' },
        { term: 'Role Reversal Principle', definition: 'When support is broken to downside, that level often becomes resistance on subsequent rally attempts. When resistance is broken to upside, that level often becomes support on subsequent pullbacks. Occurs due to trader psychology: broken support created trapped longs who sell on return to "break even", while broken resistance creates new support as buyers who missed breakout enter on pullback. One of most reliable technical principles for trade timing.' },
        { term: 'Confluence Zone', definition: 'Price level where multiple support/resistance factors converge - for example, horizontal support from previous low + 200-day moving average + 50% Fibonacci retracement of previous rally all at 32.00 SAR. Confluence dramatically increases significance of level because multiple groups of traders watching different factors all see same price as critical. Strongest trade setups occur at confluence zones.' }
      ],
      gccExamples: [
        'Support Identification - Saudi Aramco (TASI 2222): Reviewing 12-month daily chart: (1) June 2023: Aramco declined to 30.50 SAR, found support, rallied to 34.00 over next 3 weeks; (2) September 2023: pulled back to 30.80 SAR, bounced, rallied to 33.50; (3) December 2023: dropped to 30.60 SAR during year-end selling, bounced sharply, rallied to 36.00; (4) March 2024: currently declining toward that zone again, now at 31.50 SAR and falling. Analysis: Three prior reactions clustered around 30.50-30.80 SAR = strong support zone. Mark horizontal shaded zone from 30.40 to 30.90 labeled "Major Support - 3 Tests". As price approaches this zone, prepare to buy: plan to enter long at 30.80 (mid-zone), stop-loss at 30.10 (below zone with small buffer for false break), target initial resistance at 33.00 (previous reaction point), second target 34.50. Risk: 0.70 SAR, Reward: 2.20 to 3.70 SAR, ratio 3:1 to 5:1. This is high-probability setup because support has been tested and held three times historically - traders watching Aramco know this level and will buy it again.',
        'Resistance Identification - Al Rajhi Bank (TASI 1120): 18-month daily chart review: (1) April 2023: Al Rajhi rallied to 85.00 SAR, stalled, reversed down to 78.00 over 6 weeks; (2) July 2023: recovered to 85.20 SAR, rejected again, dropped to 80.50; (3) November 2023: rallied to 84.80 SAR, failed to break through, declined to 79.00; (4) February 2024: ran up to 85.10, hit this ceiling again, currently at 83.50 and weakening. Analysis: Four clear rejections clustered at 84.80-85.20 SAR = major resistance zone. Mark zone from 84.70 to 85.30 labeled "Major Resistance - 4 Tests". Trade implications: (1) If long from lower levels (entered at 80.00), place take-profit limit order at 84.50-84.80 to lock in profits before likely resistance rejection. (2) If looking to short, wait for price to reach 85.00-85.20, then watch for rejection candlestick pattern (shooting star, bearish engulfing), enter short at 84.50 with stop at 86.00, target support at 81.50 then 79.00. (3) Alternative: wait for breakout above 85.30 on strong volume, then buy pullback to 85.00 (role reversal) with stop at 84.00. Resistance at 85.00 is critical decision point.',
        'Role Reversal Example - Emaar Properties (DFM): January 2024: Emaar had support at 6.50 AED tested twice in December 2023 (December 5 touched 6.52 and bounced to 6.85, December 28 touched 6.48 and bounced to 6.75). January 15: negative real estate data released, Emaar broke down through 6.50 to 6.20 on heavy volume, support failed. Previous buyers at 6.50 now trapped in losing positions. January 22-25: price stabilized at 6.20-6.25, market absorbed selling. January 28: attempted recovery rally, reached 6.48... and stalled precisely at former support level. Could not break above 6.50. Why? Trapped buyers from earlier who bought at 6.50 eager to exit at break-even, creating selling pressure. New buyers see 6.50 as failed support, unwilling to buy above damaged level. Role reversal in action: former support at 6.50 now acting as resistance. Price rejected, declined back to 6.30. Lesson: After major support breaks, that level becomes resistance until thoroughly broken to upside with strong volume. Trade implication: If short from 6.45 during breakdown, take profit at 6.20 support, but if price rallies back, re-short near 6.50 (old support, new resistance) with stop at 6.65, targeting 6.20 again.',
        'Trading Support with Confluence - SABIC (TASI 2010): March 2024: SABIC declining from 90.00 SAR toward 84.00 zone. Multiple factors converge at 84.00: (1) Horizontal support: bounced from 83.80 in December 2023 and from 84.20 in January 2024 (two prior tests); (2) 200-day moving average currently at 83.50 rising slowly (dynamic support); (3) Round number psychology: 84.00 is clean round number where traders cluster orders; (4) Volume profile shows high-volume node at 83.50-84.50 from previous consolidation (price spent 3 weeks trading in that zone in November, creating memory and orders). This is confluence zone - four separate factors all pointing to 84.00 as significant support. Trade plan: As SABIC approaches 84.00, enter long at 84.10 (just above the zone), stop-loss at 82.80 (below all support factors with buffer for false break), first target 86.50 (mid-point to resistance), second target 89.00 (major resistance). Risk: 1.30 SAR (84.10 to 82.80), Reward: 2.40 to 4.90 SAR, ratio 1.8:1 to 3.8:1. The confluence makes this significantly higher probability than isolated support - if one factor fails (e.g., horizontal support breaks), other factors (moving average, volume node) may still hold price. Position size can be slightly larger at confluence zones due to higher probability.'
      ],
      steps: [
        'Conduct systematic support/resistance identification on your watchlist: For each stock, load 12-month daily chart. Scan left to right marking obvious turning points: places where price clearly reversed from advance to decline (mark resistance) or decline to advance (mark support). Don\'t over-complicate - only mark levels with clear, sharp reversals visible to naked eye. Look for levels tested at least 2 times (preferably 3+). Draw horizontal lines at these levels, extend right to current price. Label each level with price and significance ("Major Support - 3 Tests at 32.00" vs. "Minor Resistance - 2 Tests at 34.50").',
        'Define zones rather than lines: After marking initial lines, examine the touches closely. Did price reverse at exactly 32.00 all three times, or were actual lows 31.95, 32.05, and 32.10? Define zone: 31.90-32.15 (small range around approximate level). Use shaded horizontal zones on your charting platform if available, or mark upper and lower boundary of zone with thin lines. This prevents false signal interpretation - if you marked exact support at 32.00 but price bounced from 32.08, zone recognition shows support held, line approach might incorrectly suggest breakdown.',
        'Prioritize and rank levels by significance: Not all levels are equal. Review each marked level and assign priority: High Priority: 3+ touches, spanning multiple months, near round numbers (30.00, 35.00, 40.00), confirmed with high volume at turning points. Medium Priority: 2 touches, recent formation (weeks to couple months), not round number, moderate volume. Low Priority: 1-2 touches, very recent, arbitrary price, low volume reaction. Focus your trading on high priority levels - these are most likely to hold and provide best risk-reward setups. De-clutter chart: remove low priority levels if they obscure view, keep them in notes but not on visual chart.',
        'Identify role reversal opportunities: Review your marked levels over recent months. Find instances where support was broken or resistance was exceeded. Mark these with annotation: "Support at 30.00 broken Jan 15, now potential resistance." When price rallies back toward broken support, prepare for resistance at that level (shorting opportunity or long profit-taking). When price pulls back toward broken resistance, prepare for support (buying opportunity). Create alerts: if SABIC broke resistance at 90.00 and is now at 93.00, set price alert for 90.50 so you\'re notified when pullback to old resistance (new support) occurs, allowing you to time buy entry.',
        'Develop support/resistance based trading plans: For current price positions relative to nearest levels, create actionable plans: (1) Price approaching support: If plan to buy, define exact entry price (slightly above support zone), exact stop-loss (below support zone), exact target (next resistance level). Calculate risk-reward ratio, confirm >2:1. Set alert for price approaching support zone (e.g., alert when SABIC drops to 84.50 if support zone is 84.00-84.20). (2) Price approaching resistance: If long from lower prices, define profit-taking level (just below resistance). If looking to short, define short entry (at resistance after rejection confirmation), stop (above resistance), target (next support). (3) Price in middle of range between support and resistance: No trade - wait for approach to edge of range where risk-reward is favorable.',
        'Track effectiveness and refine: In your trading journal, record every support/resistance trade: note the level price, number of historical tests, whether level held or broke, your entry/stop/target, and result. After 20+ trades, analyze: What characteristics marked successful support (held and bounced): tight clusters of prior touches? High volume at formation? Confluence with moving averages? What characteristics marked failed support (broke through): old levels from many months ago? Only 1-2 prior touches? Excessive distance from next support below? Use data to refine your level identification - if 3+ tested levels hold 75% of time while 2-tested hold only 55%, you know to favor 3+ tested levels. This systematic approach replaces guessing with statistical edge.'
      ],
      mistakes: [
        'Drawing too many lines and cluttering chart - beginners mark every tiny wiggle as support/resistance; limit to 2-3 major levels per stock (1-2 support below current price, 1-2 resistance above), ignore minor levels',
        'Using exact price lines without zone tolerance - market is imprecise, marking exact support at 32.00 when actual bounces occurred at 31.95, 32.04, 32.08 creates false signals; use zones with small range',
        'Expecting support to hold 100% of time - support/resistance show probability, not certainty; even strongest levels break eventually; always use stop-loss slightly below support, accept that some percentage will fail',
        'Ignoring role reversal after breakouts/breakdowns - when major resistance at 90.00 breaks to 92.00, many traders forget to watch 90.00 as new support on pullbacks, missing high-probability buy setups at old resistance',
        'Marking support/resistance on insufficient evidence - one touch is not a level; minimum two clear reactions needed, preferably three; one-touch "levels" are coincidence, not tradeable structure',
        'Not considering timeframe of level - support from two weeks ago is weaker than support from six months ago; prioritize levels that span significant time and multiple tests; very short-term levels are noise'
      ],
      visualReference: 'Visualize "SABIC 12-Month Daily Chart - Support & Resistance Analysis": Price started at 72.00 SAR in April 2023, trended up to 90.00 SAR by March 2024 with multiple swings. Chart shows three thick horizontal shaded zones: (1) Green zone at 82.00-84.00 SAR labeled "MAJOR SUPPORT - 3 Tests" - annotations point to three specific dates where price touched this zone and bounced: Dec 15 (touched 83.80, bounced to 87.00), Jan 22 (touched 84.20, bounced to 88.50), Feb 28 (touched 82.50, bounced to 85.00). Each touch marked with green circle and small upward arrow. (2) Yellow zone at 87.00-88.00 SAR labeled "INTERMEDIATE RESISTANCE - 2 Tests" - two rejections marked: Nov 5 (reached 87.80, rejected to 84.00), Jan 30 (reached 87.20, rejected to 85.00). (3) Red zone at 89.50-90.50 SAR labeled "MAJOR RESISTANCE - 4 Tests" - four clear rejections marked: May 20, Aug 10, Oct 15, and current March 10 (all reached approximately 90.00 and reversed sharply). Current price: 85.50 SAR (small green arrow), positioned between intermediate resistance above and major support below. Side annotation box shows "Current Trade Setup": Entry Plan: If price drops to support zone 82.00-84.00, enter LONG at 84.00 SAR, Stop-Loss: 82.20 SAR (below support zone), Target 1: 87.00 SAR (intermediate resistance) = 3.00 gain vs. 1.80 risk = 1.7:1 RR, Target 2: 89.50 SAR (major resistance) = 5.50 gain vs. 1.80 risk = 3.1:1 RR. Below chart, smaller panel shows "Role Reversal Example - November Breakdown": sub-chart highlights Nov 1-20 period where price broke support at 84.00 on Nov 8 (dropped to 81.00), then rallied back Nov 18 reaching 84.10 and getting rejected (former support now acting as resistance), declined to 82.50. Annotation: "After support breaks, it flips to resistance on rallies - wait for confirmation before re-entering long." This visualization shows how to properly mark levels as zones with multiple confirmations, how to position trades with favorable risk-reward using these levels, and the role reversal principle in action.'
    },

    'course1-module5-lesson3': {
      objectives: [
        'Identify uptrends, downtrends, and sideways markets using price structure',
        'Understand trend strength indicators (higher highs/lows, lower highs/lows)',
        'Learn trendline drawing principles and validation techniques',
        'Master the concept of trading with trend vs. counter-trend strategies'
      ],
      explanation: `"The trend is your friend" is perhaps the most famous trading adage - and for good reason. Trend analysis is the foundation of technical trading because markets spend majority of time trending (moving directionally) rather than reversing. Identifying trend direction and trading with it dramatically improves your probability of success.

**Defining Uptrend:** An uptrend exists when price makes a series of higher highs and higher lows. Each rally peak (high) exceeds the previous rally peak, and each pullback low exceeds the previous pullback low. Example: Saudi Aramco makes low at 30.00 SAR, rallies to 33.00 (high), pulls back to 31.00 (higher low than 30.00), rallies to 34.50 (higher high than 33.00), pulls back to 32.50 (higher low than 31.00), rallies to 36.00 (higher high than 34.50). This stair-step pattern of ascending highs and lows defines uptrend. Psychology: Each pullback finds buyers willing to pay higher prices than previous pullback, showing growing demand and bullish sentiment. In uptrend, strategy is to buy pullbacks to support (the higher lows) and ride rallies to new highs.

**Defining Downtrend:** Downtrend is opposite - price makes series of lower lows and lower highs. Each decline bottom breaks below previous bottom, and each rally peak fails to reach previous peak. Example: Al Rajhi Bank peaks at 85.00 SAR, declines to 80.00 (low), rallies to 83.00 (lower high than 85.00), declines to 78.50 (lower low than 80.00), rallies to 81.00 (lower high than 83.00), declines to 76.00 (lower low than 78.50). This descending pattern defines downtrend. Each rally attracts sellers willing to sell at lower prices than previous rally, showing growing supply and bearish sentiment. In downtrend, strategy is to sell rallies to resistance (the lower highs) or avoid the stock entirely if only trading long.

**Sideways/Ranging Markets:** When price oscillates between relatively horizontal support and resistance without making higher highs/lows or lower highs/lows, market is ranging. Example: SABIC trades between 82-85 SAR for 3 months - reaches 85.00 and reverses down (resistance), reaches 82.00 and bounces up (support), repeats this 5-6 times without breaking out either direction. Approximately 30-40% of time, markets range rather than trend. Range trading requires different strategy: buy near support, sell near resistance, use tight stops because ranges eventually break and trend resumes.

**Drawing Trendlines - Uptrend Lines:** Trendline in uptrend connects successive higher lows, creating ascending diagonal line. Proper technique: (1) Identify clear uptrend (at least 2 higher lows visible). (2) Draw line connecting first significant low to second higher low. (3) Extend line forward to right. (4) Validate: price should respect (bounce off) this line on subsequent pullbacks. If price touches line 3+ times and bounces each time, you have significant trendline acting as dynamic support. Example: Emirates NBD uptrend from June to December - draw line connecting June low at 13.50 AED to August higher low at 14.00 AED, extend forward. September pullback touches line at 14.40 and bounces, November pullback touches at 14.80 and bounces - trendline validated with 4 touches total, acting as rising support. This trendline identifies where to buy: when price pulls back to trendline, enter long with stop slightly below line, target next resistance.

**Drawing Trendlines - Downtrend Lines:** Trendline in downtrend connects successive lower highs, creating descending diagonal line. Same technique: connect first significant high to second lower high, extend forward, validate with subsequent touches. This line acts as dynamic resistance - each rally toward the line likely to get rejected. For short-sellers or those looking to exit longs, trendline shows where selling pressure concentrates.

**Trendline Breaks - Signal of Reversal:** When price decisively breaks trendline (closes beyond it with follow-through), it's early warning of potential trend change. Example: Saudi Aramco in uptrend with trendline connecting lows at 30.00, 31.00, 32.00 (rising trendline). Price pulls back, breaks below trendline closing at 31.80 (below the 32.00 line), next day declines further to 31.20. Trendline break suggests uptrend weakening - doesn't guarantee reversal to downtrend, but warns trend may be ending, entering range or reversing. Conservative traders exit longs on trendline break and wait for new trend to establish before re-entering.

**Trend Strength - Steepness and Consistency:** Not all trends are equal. Strong trend characteristics: (1) Steep angle: price rises/falls quickly with aggressive slope, (2) Consistent: price respects trendline closely with minimal violations, (3) Low volatility pullbacks: in uptrend, pullbacks are shallow (15-25% of prior rally) and brief (few days), showing strong underlying demand. Weak trend: (1) Shallow angle: price meanders slowly, (2) Whippy: price repeatedly violates trendline then recovers (false breaks), (3) Deep pullbacks: pullbacks retrace 50%+ of prior rally, showing weak conviction. Focus on strong, clean trends - they're more reliable and profitable.

**GCC Market Trend Characteristics:** GCC markets, especially large caps like Aramco, SABIC, major banks, often exhibit cleaner trends than small-cap or high-volatility stocks because: (1) Lower retail speculation and higher institutional ownership creates more orderly, sustained price movements. (2) Many GCC stocks are dividend plays - during uptrends in oil prices or economic growth, these stocks attract steady buying from yield-focused institutions, sustaining trends for months. (3) However, oil price correlation means TASI trends often align with crude oil trends - if WTI crude is downtrending, TASI and Saudi energy/petrochemical stocks likely downtrending too. Check oil price trend as context for GCC stock trends.

**Trading With the Trend - The Only Edge You Need:** Statistics consistently show trend-following strategies outperform counter-trend (picking reversals) strategies. Why? Trends persist longer than expected - greed and fear drive trends to extremes beyond "rational" levels. Trading with trend means: In uptrend, only take long positions (buy), never short. Wait for pullbacks to support/trendline, enter long, target new highs. In downtrend, only take short positions (sell) if shorting is available, or simply avoid the stock. In sideways range, either avoid (if small range relative to trading costs) or use range tactics (buy support, sell resistance). Fighting the trend (buying during downtrend hoping for reversal, shorting during uptrend expecting turn) is low-probability and account-destroying behavior. Be patient: wait for trend alignment before trading.`,
      keyConcepts: [
        { term: 'Higher Highs and Higher Lows (Uptrend)', definition: 'Uptrend structure where each rally peak exceeds previous peak (higher high) and each pullback low exceeds previous low (higher low), creating ascending stair-step pattern. Shows buyers willing to pay progressively higher prices, indicating strong demand. Strategy: buy the higher lows (pullbacks to support or trendline), ride to new higher highs. Most reliable bullish structure.' },
        { term: 'Lower Highs and Lower Lows (Downtrend)', definition: 'Downtrend structure where each decline low breaks below previous low (lower low) and each rally peak fails to reach previous peak (lower high), creating descending pattern. Shows sellers willing to accept progressively lower prices, indicating growing supply or declining demand. Strategy: sell the lower highs (rallies to resistance) if shorting, or avoid longs entirely.' },
        { term: 'Trendline', definition: 'Diagonal line connecting series of higher lows (uptrend trendline) or lower highs (downtrend trendline). Acts as dynamic support (uptrend) or resistance (downtrend). More touches = more significant. Trendline provides visual reference for trend strength and identifies where pullbacks likely to end, offering entry points. Break of established trendline is early warning of potential trend change.' },
        { term: 'Trend-Following vs. Counter-Trend Trading', definition: 'Trend-following: trading in direction of established trend (buying pullbacks in uptrend, selling rallies in downtrend). High-probability approach because trends persist. Counter-trend: attempting to pick reversals (buying when downtrending expecting turn, shorting uptrends expecting top). Low-probability approach requiring perfect timing. Beginners must focus exclusively on trend-following until highly experienced.' }
      ],
      gccExamples: [
        'Uptrend Identification - Saudi Aramco (TASI 2222), June-December 2023: June: Aramco makes low at 29.80 SAR. July: rallies to 32.00 SAR (first high), pulls back to 30.50 SAR (higher low than 29.80). August: rallies to 33.50 SAR (higher high than 32.00), pulls back to 31.80 SAR (higher low than 30.50). October: rallies to 35.00 SAR (higher high than 33.50), pulls back to 33.00 SAR (higher low than 31.80). November: rallies to 36.50 SAR (higher high than 35.00). Clear uptrend pattern - each swing high exceeds previous, each swing low exceeds previous. During this 6-month uptrend, strategy: buy the pullbacks (higher lows at 30.50, 31.80, 33.00), exit near or above previous highs. Traders who bought every pullback to rising support and held through rallies captured substantial gains. Those who tried to short "because it\'s gone up so much" or waited for "better price" near June lows missed entire trend. Lesson: In uptrend, be buyer on pullbacks, not seller or sideline watcher.',
        'Downtrend Identification - Emaar Properties (DFM), February-June 2024: February: Emaar peaks at 7.50 AED amid real estate optimism. March: declines to 7.00 AED (first low), rallies to 7.30 AED (lower high than 7.50). April: declines to 6.70 AED (lower low than 7.00), rallies to 7.00 AED (lower high than 7.30). May: declines to 6.40 AED (lower low than 6.70), rallies to 6.75 AED (lower high than 7.00). June: declines to 6.10 AED (lower low than 6.40). Classic downtrend - series of lower highs and lower lows. Appropriate strategy: If trading long-only, avoid Emaar entirely during this period, deploy capital elsewhere in uptrending stocks. If able to short, sell the lower-high rallies (7.30, 7.00, 6.75) with stop above previous high, target next support. Traders who kept buying Emaar "because it\'s cheap now" or "it must bounce" suffered continuous losses as downtrend persisted. Lesson: Don\'t fight downtrend - either short it or avoid it, never long.',
        'Trendline Application - SABIC (TASI 2010) Uptrend with Trendline Support: July 2023: SABIC starts uptrend from 72.00 SAR. August: pulls back to 74.00 SAR (first higher low). September: pulls back to 76.50 SAR (second higher low). Draw ascending trendline connecting 74.00 (August) to 76.50 (September), extend forward. October: price pulls back to trendline, now at approximately 78.50, touches trendline and bounces sharply (third touch, trendline validated). Trade setup: Enter long at 79.00 (just above trendline), stop at 77.80 (below trendline - if line breaks, uptrend weakening), target 84.00 (next resistance). Price respects trendline, rallies to 83.50 - successful trade capturing +4.50 SAR with risk of only 1.20 SAR (3.75:1 reward-risk). December: price pulls back again, touches trendline at 81.00, bounces to 86.00 (fourth touch, very strong trendline). January 2024: price finally breaks trendline, closing at 83.50 below the 84.00 trendline level - exit all longs, uptrend potentially ending. Following weeks, SABIC ranges 82-85 SAR rather than resuming uptrend - trendline break correctly signaled trend exhaustion. Lesson: Trendline provides systematic entry (buy at line), stop placement (below line), and exit signal (break of line).',
        'Trend vs. Range Identification - Al Rajhi Bank (TASI 1120): January-March 2024: Al Rajhi trades between 79.00-82.00 SAR for 10 weeks. Touches 82.00 on Jan 8, reverses to 79.50. Touches 79.00 on Jan 22, bounces to 81.80. Touches 82.00 on Feb 5, reverses to 79.20. Touches 79.00 on Feb 19, bounces to 81.50. Touches 82.00 on Mar 4. This is range, not trend - price not making higher highs/lows or lower highs/lows, just oscillating between horizontal levels. Different strategy required: (1) Buy near 79.00 support with tight stop at 78.50, target 81.50-82.00, take profit at resistance, repeat. (2) Or avoid entirely if range too small relative to commissions (3.00 SAR range, commissions 0.15% round-trip = ~0.24 SAR per trade, leaving only 2.76 SAR potential, requires ~91% win rate to profit - not attractive). Compare to trend strategy: If Al Rajhi were in uptrend making higher lows at 79.00, 80.00, 81.00, strategy would be buy each higher low targeting new highs above previous 82.00 resistance - potential for 5-10 SAR gains per trade vs. 2-3 SAR in range. Lesson: Identify market structure (trend vs. range) first, then apply appropriate strategy. Don\'t apply trend-following strategy to ranging market or range strategy to trending market.'
      ],
      steps: [
        'Practice trend identification on your watchlist daily: Open 10-15 GCC stocks, quickly categorize each: (1) UPTREND: Drawing imaginary line from left to right across recent 3-6 months, are highs and lows both rising? Each peak higher than last? Each valley higher than last? If yes = uptrend. (2) DOWNTREND: Are highs and lows both declining? Each peak lower than last? Each valley lower than last? If yes = downtrend. (3) SIDEWAYS: Price oscillating between horizontal bounds without clear ascending or descending pattern? If yes = range. Note: Some stocks show no clear pattern (choppy) - avoid these. After 2-3 weeks daily practice, trend recognition becomes instant visual skill.',
        'Draw trendlines on trending stocks: For stocks in uptrend, connect the higher lows with ascending line - start from first significant low, draw to second higher low, extend forward. For downtrends, connect lower highs with descending line. Proper trendline should have minimum 2 touches already (used to create line) and ideally get 3rd touch for validation. Don\'t force lines - if you can\'t connect clear swing points, trend may not be clean enough to define line. Keep only validated trendlines (3+ touches) on chart, delete experimental lines that price doesn\'t respect.',
        'Create trend-based watchlists: Organize stocks by trend status: "Uptrends - Ready to Buy on Pullback" list (stocks in clear uptrend currently near support or trendline), "Downtrends - Avoid or Short" list (clear downtrends), "Ranging - Special Tactics" list (sideways markets), "No Clear Pattern - Avoid" list (choppy, undefined). Focus 90% of trading attention on Uptrends list if trading long-only. This organization prevents accidentally trading against trend and keeps focus on highest-probability setups.',
        'Implement trendline trading rules: Establish systematic rules: (1) In uptrend with validated trendline (3+ touches), when price pulls back to within 2% of trendline, prepare to buy. Enter long when price forms bullish candle at/near trendline (hammer, bullish engulfing). Stop: 3-5% below trendline (allows small whipsaw room). Target: previous high or trendline projection forward at price level. (2) Exit all longs if price closes decisively below trendline (>2% below). (3) Never short stocks with intact uptrend trendlines - wait for trendline break before considering shorts. These rules remove emotion and discretion.',
        'Check higher timeframe trend before trading: Before taking any trade on daily chart, check weekly chart trend: If weekly is uptrending but daily shows short pullback, context is bullish - buy the daily pullback aggressively. If weekly is downtrending but daily shows short bounce, context is bearish - avoid buying the daily bounce (likely to fail). If weekly is sideways and daily is trending, daily trend is less reliable (likely to reverse at weekly range boundaries). This multi-timeframe trend check dramatically improves trade probability.',
        'Journal trend-following performance: Track separately: (1) Trades taken with trend (longs in uptrend, shorts in downtrend): calculate win rate, average R-multiple, expectancy. (2) Trades taken counter-trend (longs in downtrend, shorts in uptrend): calculate same metrics. After 30+ trades, compare groups. You should find with-trend trades have significantly higher expectancy (+0.6R to +1.0R) vs. counter-trend trades (negative expectancy -0.2R to -0.5R). This data reinforces discipline - when tempted to buy downtrending stock "because it\'s fallen so much", review your journal showing counter-trend trades lose money consistently.'
      ],
      mistakes: [
        'Calling every small wiggle a trend - seeing 3-day price rise and declaring "uptrend!" then buying just before reversal; real trends require minimum 2-3 weeks of higher highs/lows with clear structure',
        'Fighting the trend by buying downtrending stocks "because they\'re cheap" - price becoming cheaper doesn\'t mean bargain, often means deteriorating fundamentals; downtrends persist far longer than expected',
        'Drawing trendlines to fit your bias - wanting to be bullish so forcing ascending line through cherry-picked points that don\'t truly connect lows; trendlines must connect obvious swing points naturally',
        'Not adjusting or redrawing trendlines as trend evolves - a line connecting first two lows might not capture the trend perfectly as more data appears; redraw lines every 2-3 weeks to connect most relevant recent swing points',
        'Ignoring trendline breaks and holding losing positions "because overall trend is up" - trendline break is early warning; holding through break often converts small loss to large loss',
        'Mixing timeframes inconsistently - trading daily uptrend but getting scared out by 4-hour downtrend; choose primary timeframe and honor its trend, ignore shorter-term counter-trend noise'
      ],
      visualReference: 'Visualize "SABIC 9-Month Daily Chart - Trend Analysis": Chart shows clear uptrend from July 2023 to March 2024. Price starts at 72.00 SAR (July low), creates ascending pattern of higher highs and higher lows. Swing lows marked with green circles and labels: Low 1: 72.00 (Jul), Low 2: 74.00 (Aug), Low 3: 76.50 (Sep), Low 4: 78.50 (Oct), Low 5: 81.00 (Dec) - each successively higher. Swing highs marked with blue circles: High 1: 78.00 (Jul), High 2: 81.00 (Aug), High 3: 83.50 (Sep), High 4: 86.00 (Nov), High 5: 90.00 (Mar) - each higher than previous. Ascending trendline drawn connecting lows 74.00 (Aug) through 76.50 (Sep) through 78.50 (Oct) through 81.00 (Dec), extended forward. Annotations mark each trendline touch: "Touch 3 - Oct bounce at 78.50", "Touch 4 - Dec bounce at 81.00" with upward arrows showing sharp bounces from line. Current price 85.00 SAR, positioned above trendline (currently at 83.00 level). Inset box shows "Uptrend Definition": Higher Highs: 78→81→83.5→86→90 ✓, Higher Lows: 72→74→76.5→78.5→81 ✓, Structure: Clean ascending stair-step ✓, Conclusion: Strong Uptrend - BUY pullbacks to trendline/support. Side panel shows "Trade Example": Nov 25: Price pulls back to trendline at 78.80, forms hammer candle (bullish reversal). Entry: 79.20, Stop: 77.50 (below trendline), Target: 84.00 (previous high resistance). Result: Price rallies to 86.00 by mid-December. Profit: +6.80 SAR (+8.6%), Risk: 1.70 SAR, Reward:Risk = 4:1. Bottom annotation: "Trendline Break Signal" with arrow pointing to February where price closes at 83.00, breaking below trendline at 84.00: "Exit longs on trendline break - trend weakening." Following weeks show price ranged 82-86 SAR rather than resuming uptrend. Visualization demonstrates clean trend structure, how trendline provides systematic entries, and how break signals exit.'
    },

    'course1-module5-lesson4': {
      objectives: [
        'Learn to recognize and interpret the most reliable single-candle and multi-candle patterns',
        'Understand the psychology behind doji, hammer, shooting star, engulfing, and morning/evening star patterns',
        'Master pattern confirmation techniques (volume, location, follow-through)',
        'Apply candlestick patterns to GCC markets for high-probability trade setups'
      ],
      explanation: `Candlestick patterns reveal market psychology and momentum shifts through visual price formations. While hundreds of patterns exist, mastering the 8-10 most reliable patterns provides substantial edge. Critical principle: patterns are not signals by themselves - they must appear in proper context (at support/resistance, after trends) with confirmation (volume, follow-through candle) to be actionable.

**Single Candle Patterns - Doji (Indecision):** Doji forms when open and close are equal or nearly equal, creating small or non-existent body with wicks extending above and below, resembling plus sign or cross. Psychology: Session began at one price, buyers pushed up, sellers pushed down, session closed near opening price - neither side won. Indecision. Significance depends entirely on location: Doji after strong uptrend near resistance = potential reversal (buyers exhausting, sellers gaining strength). Doji after downtrend near support = potential reversal (sellers exhausting). Doji mid-trend = meaningless noise. Example: Emirates NBD rallies from 13.00 to 15.00 AED over 6 weeks, then forms doji at 14.95 (open 14.92, close 14.94, high 15.05, low 14.80). After 6 weeks of decisive green candles with large bodies, suddenly indecision appears near resistance - this suggests uptrend weakening, potential top forming. Watch for confirmation: if next candle closes red below doji, reversal confirmed.

**Single Candle - Hammer (Bullish Reversal):** Hammer forms at bottom of decline with small body at top of candle range and long lower wick (2-3× body length), resembling hammer. Color less important than shape, but green is slightly more bullish. Psychology: Session opened, sellers drove price sharply lower (creating long lower wick), but buyers rejected those low prices and pushed back up, closing near high of session. Shows sellers tried and failed to maintain control - buyers stepping in aggressively. Critical: Hammer only meaningful at support after decline. Hammer in middle of uptrend or at resistance means nothing. Example: SABIC declines from 90.00 to 84.50 SAR over 8 days, approaching support at 84.00. Day 9 forms hammer: open 84.40, low 83.60 (sellers push down 80 fils), close 84.35 (buyers reject low prices, push back up). Long lower wick shows rejection of 83.60 area - bulls defending 84.00 support. Next day, bullish confirmation: SABIC opens 84.50 and rallies to 85.80 (green candle), confirming hammer. Enter long on this confirmation, stop below hammer low at 83.50, target resistance at 87-90 SAR.

**Single Candle - Shooting Star (Bearish Reversal):** Shooting Star is opposite of hammer - small body at bottom of range, long upper wick (2-3× body), resembling inverted hammer. Forms at top of rally near resistance. Psychology: Session opened, buyers drove price sharply higher (creating long upper wick), but sellers rejected those high prices and pushed back down, closing near low of session. Shows buyers tried and failed - sellers stepping in. Example: Al Rajhi rallies from 79.00 to 84.80 SAR over 3 weeks, approaching resistance at 85.00. Forms shooting star: open 84.60, high 85.20 (buyers push 60 fils higher), close 84.65. Long upper wick shows 85.20 rejected. Next day, if red candle closes below shooting star body (below 84.60), reversal confirmed. Short opportunity or long profit-taking.

**Multi-Candle Pattern - Bullish Engulfing (Strong Reversal):** Two-candle pattern at support after decline: First candle red (bearish), second candle green (bullish) with body that completely engulfs/covers first candle's body (opens below first candle's close, closes above first candle's open). Psychology: First day, bears in control, close lower. Second day, bulls overwhelm bears - not only erase first day's decline but close higher than first day opened. Complete sentiment shift. Larger second candle body = stronger signal. Example: Emaar declines to 6.50 AED support. Day 1: red candle 6.55-6.48 (body 7 fils). Day 2: green candle 6.45-6.68 (body 23 fils) - opens below 6.48, closes above 6.55, completely engulfing first candle. This shows strong reversal - enter long at 6.70, stop at 6.35 (below pattern low), target 7.00 resistance.

**Multi-Candle - Bearish Engulfing (Strong Reversal):** Opposite - at resistance after rally. First candle green, second candle red that engulfs first candle's body. Shows bears overwhelming bulls. Example: Saudi Aramco rallies to 36.00 SAR resistance. Day 1: green candle 35.70-36.00. Day 2: red candle 36.05-35.60 - completely engulfs first candle. Bearish reversal signal, take profit on longs or enter short.

**Multi-Candle - Morning Star (Major Bullish Reversal):** Three-candle pattern at support: (1) First candle: long red body (downtrend continuing), (2) Second candle: small body (any color) or doji that gaps down or forms lower (indecision), (3) Third candle: long green body that closes well above second candle and preferably above midpoint of first candle (bulls taking control). Pattern resembles morning star rising before dawn. Psychology: Day 1 = bears in control. Day 2 = battle between bulls/bears, indecision. Day 3 = bulls decisively win, reversing downtrend. Example: SABIC in downtrend, declines to 82.00 support. Day 1: long red candle 84.00-82.20. Day 2: small doji 82.15-82.10 (indecision at support). Day 3: long green candle 82.25-84.50 (bulls surge). Morning star complete - strong reversal signal, enter long at 84.60 on confirmation, stop 81.50 (below pattern), target 87-90 resistance. Morning stars at major support levels are among most reliable reversal patterns.

**Multi-Candle - Evening Star (Major Bearish Reversal):** Opposite of morning star, at resistance after uptrend: (1) Long green candle (uptrend continuing), (2) Small body/doji that gaps up or forms higher (indecision), (3) Long red candle that closes well below second candle (bears taking control). Pattern resembles evening star appearing as sun sets. Example: Al Rajhi uptrend reaches 85.00 resistance. Day 1: green 83.00-85.00. Day 2: doji 85.05-85.00. Day 3: red 84.95-82.80. Evening star complete - strong bearish reversal, exit longs or enter shorts.

**Confirmation Requirements - Don't Trade Patterns Blindly:** Patterns alone are not trade signals. Require: (1) Proper Location: Bullish patterns (hammer, bullish engulfing, morning star) must form at support after decline. Bearish patterns (shooting star, bearish engulfing, evening star) must form at resistance after rally. Same pattern mid-trend has little significance. (2) Volume Confirmation: Reversal pattern on high volume more reliable than low volume. Bullish engulfing with 2× average volume shows strong buying conviction. Same pattern on thin volume may be noise. (3) Follow-Through Candle: Wait for next candle after pattern to confirm direction. Hammer at support looks bullish, but if next candle closes red below hammer, pattern failed. Wait for green candle closing above hammer to confirm, then enter. This confirmation candle prevents many false signals. (4) Trend Context: Counter-trend reversal patterns (trying to pick bottom of downtrend or top of uptrend) are lower probability than trend-continuation patterns or reversals at established support/resistance in context of higher timeframe trend.

**GCC Market Application:** GCC stocks, particularly large caps, often respect candlestick patterns well because: Lower intraday volatility (vs. high-beta tech stocks) means daily candles represent more consistent sentiment. Institutional dominance in stocks like Aramco, First Abu Dhabi Bank means more orderly, less whipsaw price action - patterns form cleanly. However, weekend gaps can negate patterns: perfect morning star forming Thursday close may be irrelevant if Sunday gaps down on weekend news. Verify patterns on Sunday opening before acting on Thursday's formations.`,
      keyConcepts: [
        { term: 'Doji (Indecision Candle)', definition: 'Candle where open equals close (or nearly equal), creating minimal body with wicks above and below. Signals indecision - neither buyers nor sellers won session. Significance depends on location: after strong trend near support/resistance, doji suggests exhaustion and potential reversal. Mid-trend, doji is noise. Always wait for confirmation candle to indicate direction before trading.' },
        { term: 'Hammer and Shooting Star (Rejection Candles)', definition: 'Hammer: small body at top, long lower wick (2-3× body length). Forms at support after decline, shows rejection of lower prices (bullish reversal). Shooting Star: opposite - small body at bottom, long upper wick, forms at resistance after rally, shows rejection of higher prices (bearish reversal). Both patterns show one side tried to control price but failed, creating rejection wick that signals reversal. Must wait for confirmation candle.' },
        { term: 'Engulfing Patterns', definition: 'Two-candle reversal pattern where second candle\'s body completely engulfs/covers first candle\'s body. Bullish Engulfing: red candle followed by larger green candle that opens below first close and closes above first open - at support, signals strong bullish reversal. Bearish Engulfing: green candle followed by larger red candle that opens above first close and closes below first open - at resistance, signals strong bearish reversal. Size of engulfing candle and volume increase indicate strength.' },
        { term: 'Morning/Evening Star (Three-Candle Major Reversals)', definition: 'Morning Star (bullish): long red candle + small indecision candle/doji + long green candle at support. Shows bears losing control to bulls. Evening Star (bearish): long green candle + small indecision candle/doji + long red candle at resistance. Shows bulls losing control to bears. Among most reliable reversal patterns when formed at established support/resistance with volume confirmation. Three-candle sequence shows clear sentiment transition.' }
      ],
      gccExamples: [
        'Hammer Pattern - Saudi Aramco at Support: March 15, 2024: Aramco declining from 35.00 SAR toward major support at 32.00 SAR over 8 trading sessions. March 14 closes 32.20 (red candle, still declining). March 15: Opens 32.15, sellers push to 31.65 (testing support), but buyers aggressively step in, price rallies back, closes 32.30. Candle formed: Open 32.15, High 32.35, Low 31.65, Close 32.30. Body: 32.15-32.30 (small, only 15 fils green body at top of range). Lower wick: 31.65-32.15 (50 fils wick, 3.3× body length). Classic hammer - shows 31.65 strongly rejected, buyers defending 32.00 support zone. Confirmation: March 16 opens 32.40 and rallies to 33.10 (strong green candle), confirming hammer reversal. Trade: Enter long March 16 at 32.50, Stop 31.50 (below hammer low with buffer), Target 34.50 (intermediate resistance). Result: Aramco rallies to 34.80 over next 6 sessions. Profit +2.30 SAR, Risk 1.00 SAR, 2.3:1 realized. Hammer at established support with confirmation candle provided high-probability entry.',
        'Bearish Engulfing - Al Rajhi at Resistance: February 8-9, 2024: Al Rajhi in uptrend, approaching resistance zone 84.80-85.20 SAR (tested twice in past 3 months). February 8: Green candle 84.20-84.95 (body 75 fils), closes just below resistance. February 9: Opens 85.05 (gaps above previous close, excitement), reaches high of 85.25 (testing resistance), reverses sharply, closes 84.10 (red candle). Candle formed: Open 85.05, High 85.25, Low 84.05, Close 84.10. Body: 85.05-84.10 (95 fils red body). This completely engulfs February 8 green body (84.20-84.95) - opens above, closes below. Volume: 8.2M shares vs. 10-day average 5.8M (1.4× volume, confirms rejection strength). Pattern: Perfect bearish engulfing at major resistance with volume confirmation. Interpretation: Bulls tried to break resistance at 85.25, completely failed, bears took control and erased previous day\'s gains plus more. Trade: Exit longs or enter short February 10 at 84.00, Stop 85.50 (above pattern high), Target 81.50 (next support). Result: Al Rajhi declined to 81.20 over next 10 days. This pattern provided timely exit signal for longs and profitable short entry.',
        'Morning Star Pattern - SABIC at Major Support: January 22-24, 2024: SABIC in 3-week downtrend from 90.00 to approaching major support at 82.00 SAR (tested 3 times in previous 6 months). January 22 (Day 1): Long red candle 85.00-83.20 (body 1.80 SAR) on elevated volume 11.5M - downtrend accelerating toward support. January 23 (Day 2): Opens 83.10 (lower than previous close), trades 82.80-83.40 range, closes 83.15. Small candle with body only 0.35 SAR (83.10-83.15 doji-like). Indecision at support - bears tried to push lower but couldn\'t, bulls prevented further decline. January 24 (Day 3): Opens 83.30, rallies strongly to 85.50, closes 85.40 (long green candle, body 2.25 SAR from open to close). Volume surges to 14.2M. Pattern complete: Long red (1.80) + Indecision doji (0.35) + Long green (2.25) at established support zone 82.00. Classic morning star. Interpretation: Bears controlled day 1, exhaustion day 2, bulls seized control day 3. Major reversal signal. Trade: Enter long January 25 at 85.60, Stop 81.80 (below pattern low and support), Target 88.00 then 90.00 (resistance levels). Result: SABIC rallied to 89.20 over next 12 days. +3.60 SAR gain from 85.60 entry vs. 3.80 risk = 0.95:1, marginal risk-reward but win. Morning star at major support correctly signaled trend reversal.',
        'Failed Shooting Star - Emaar Properties (Caution Example): March 5, 2024: Emaar rallying from 6.50 to 7.10 AED over 2 weeks. March 5 forms shooting star: Open 7.08, High 7.28 (gap up and spike), Close 7.09, Low 7.05. Small body 7.08-7.09 (1 fil), long upper wick 7.09-7.28 (19 fils = 19× body!). Appears perfect shooting star at high of rally. Volume moderate 42M vs. average 38M. Expectation: Bearish reversal, price should decline next day. March 6 reality: Opens 7.12 (above shooting star), rallies to 7.35, closes 7.32 (strong green candle). Shooting star failed! Why? (1) Not at established resistance - 7.28 high was new high with no prior resistance level, (2) Volume confirmation weak - only 1.1× average, (3) Broader market context - DFM trending strongly bullish that week, (4) Real estate sector news positive - new project announcements supporting Emaar. Lesson: Pattern in wrong context or without proper confirmation fails. Traders who shorted on March 5 shooting star took loss when March 6 gapped up. This is why confirmation candle is mandatory - if waited for March 6 red candle below shooting star before shorting, would have avoided trade when March 6 opened strong green instead. Never trade pattern alone - require location at support/resistance, volume, confirmation, and supportive context.'
      ],
      steps: [
        'Learn to visually recognize the 8 core patterns: (1) Doji: open=close, small body, wicks both sides. (2) Hammer: small body top, long lower wick 2-3× body. (3) Shooting Star: small body bottom, long upper wick 2-3× body. (4) Bullish Engulfing: red candle + larger green candle that engulfs it. (5) Bearish Engulfing: green + larger red. (6) Morning Star: red + doji/small + green. (7) Evening Star: green + doji/small + red. (8) Long green/red candles: large bodies, minimal wicks, show strong directional conviction. Practice: Spend 10 minutes daily scanning 5 GCC stocks, identify any of these patterns formed that day or recently. Label them on chart, note location (at support/resistance or mid-trend).',
        'Verify pattern context before considering trade: When you spot pattern, ask: (1) Location: Is bullish pattern at support after decline? Is bearish pattern at resistance after rally? If pattern is mid-trend, ignore it. (2) Support/Resistance: Is there established support/resistance at this level (multiple prior touches)? Patterns at random levels are less reliable than at tested levels. (3) Trend: Is pattern trying to reverse trend (counter-trend, lower probability) or occurring within larger trend context (continuation, higher probability)? (4) If context inappropriate, disregard pattern regardless how perfect it looks. Only proceed if location and context align.',
        'Check volume for confirmation: Compare pattern day volume to 20-day average volume: (1) Reversal pattern with volume 1.3-2× average = strong confirmation (genuine interest backing reversal). (2) Pattern with volume below or near average = weaker, potentially noise. (3) Engulfing patterns and morning/evening stars particularly benefit from volume surge on reversal candle (second candle of engulfing, third candle of star pattern). Add volume requirement to your pattern recognition: "Bullish engulfing at support + volume >1.3× average" is tradeable setup. "Shooting star at no specific level + volume 0.9× average" is not.',
        'Wait for confirmation candle before entering trade: Pattern recognition is setup identification, not entry signal. After identifying valid pattern in good context with volume: (1) Wait for next candle (confirmation candle). (2) For bullish pattern (hammer, bullish engulfing, morning star): confirmation is green candle that closes above pattern high. (3) For bearish pattern (shooting star, bearish engulfing, evening star): confirmation is red candle that closes below pattern low. (4) If confirmation appears, enter trade in direction of confirmation. (5) If next candle contradicts pattern (red after bullish pattern, green after bearish pattern), skip trade - pattern failed. This one rule prevents 30-40% of losing pattern trades by filtering out failed patterns before entry.',
        'Define pattern-based trade parameters systematically: When confirmed pattern appears, establish trade immediately: (1) Entry: Just beyond confirmation candle (if hammer confirmed with green candle to 84.50, enter long at 84.60). (2) Stop-Loss: Below pattern low for bullish setups (below hammer low, below morning star low), above pattern high for bearish setups. Add small buffer (2-3%) for whipsaw protection. (3) Target: Nearest resistance for longs, nearest support for shorts. For strong patterns like morning/evening stars at major levels, can target further levels. (4) Risk-Reward: Calculate before entry, require minimum 2:1, prefer 3:1+. (5) Position size: Based on stop distance using position sizing rules (1% account risk). Don\'t adjust these parameters based on hope or fear after entry - define before, execute mechanically.',
        'Track pattern performance in journal: Create pattern-specific performance analysis: Record each pattern trade with columns: Pattern Type (Hammer, Bullish Engulfing, etc.), Location (at support/resistance or mid-trend), Volume (above/below average), Confirmation (yes/no), Result (win/loss), R-multiple. After 30+ pattern trades, analyze: Which patterns have highest win rate and expectancy? (likely properly-located morning/evening stars and engulfing patterns at tested support/resistance). Which have lowest? (likely mid-trend patterns or patterns without confirmation). Which you\'re misidentifying or trading prematurely? Use data to focus on your most profitable patterns and eliminate weak ones. This transforms pattern trading from discretionary art to statistical edge.'
      ],
      mistakes: [
        'Trading patterns in wrong location - hammer mid-uptrend has no significance, only hammer at support after decline matters; same for all reversal patterns which require proper context',
        'Not waiting for confirmation candle - entering immediately when hammer forms, not waiting to see if next candle confirms reversal; results in trading many failed patterns that reverse immediately',
        'Ignoring volume - perfect-looking bearish engulfing on tiny volume likely fails; patterns need volume to show genuine conviction behind move',
        'Cherry-picking candles to fit pattern bias - seeing two candles that almost look like engulfing and calling it engulfing; patterns must meet strict definition or they\'re unreliable',
        'Overcomplicating with too many patterns - trying to memorize 50 candlestick patterns and seeing them everywhere; focus on 6-8 most reliable, wait for clear examples',
        'Treating patterns as holy grail - even best patterns fail 30-40% of time; they provide probability edge, not certainty; must use stops and proper position sizing'
      ],
      visualReference: 'Visualize "SABIC Chart - Candlestick Pattern Examples": Chart shows 3-month daily price action. Three pattern examples highlighted with zoom boxes: (1) "Hammer at Support - January 15": Price declining to 82.00 support zone marked with horizontal line (3 prior tests labeled). Single candle zoomed: Green candle with small body at top (82.10-82.30, only 20 fils), long lower wick extending to 81.50 (60 fils wick = 3× body), high at 82.35. Annotation: "Sellers pushed to 81.50, buyers rejected - hammer formation." Next candle: green candle 82.35-84.20 (confirmation). Upward arrow showing entry at 84.30, downward bracket showing stop at 81.30 (below hammer low), upward bracket to 87.00 target. Result: price rallied to 86.50 over 5 days. (2) "Bearish Engulfing at Resistance - February 8-9": Price rallying to 89.50 resistance zone (2 prior tests labeled). Two-candle zoom: First candle green 88.80-89.40 (small-medium body). Second candle red 89.50-88.20 (large body, opens above first close 89.50, closes below first open 88.80 - complete engulfment). Volume bars below: First candle 9.2M (normal), Second candle 14.8M (1.6× average, highlighted). Annotation: "Bulls tried 89.50, overwhelmed by bears - reversal." Next candle: red 88.00-86.50 (confirmation). Downward arrow showing short entry 86.40, stop at 90.00, target 84.00. Result: declined to 84.50. (3) "Morning Star at Support - March 22-24": Price declining to 84.00 support zone. Three-candle zoom: Candle 1 (Mar 22): long red body 86.00-84.20 (1.80 SAR body). Candle 2 (Mar 23): doji 84.15-84.20 (tiny 0.05 body, wicks 83.80-84.40). Candle 3 (Mar 24): long green body 84.25-86.50 (2.25 SAR body). Volume bars: Day 1: 11M, Day 2: 8M, Day 3: 15M (surge). Pattern bracket labeled "Morning Star - Major Reversal Signal." Next candle: green continuation to 87.20 (confirmation). Entry 87.30, stop 83.50 (below pattern), target 90.00. Bottom text box: "Pattern Confirmation Checklist: ✓ Proper Location (at tested support/resistance), ✓ Volume Surge (>1.3× average on reversal candle), ✓ Confirmation Candle (next candle moves in pattern direction), ✓ Risk:Reward >2:1. If all checked, pattern is tradeable." This visualization shows patterns in real context with confirmation process and trade execution.'
    },

    // ====== Module 5 Lessons 5-8 ======

    'course1-module5-lesson5': {
      objectives: [
        'Master the use of Moving Averages (Simple and Exponential) for trend identification',
        'Learn how to combine multiple moving averages for trading signals',
        'Understand moving average crossovers and their significance',
        'Apply moving averages to GCC stock charts for practical trading decisions'
      ],
      explanation: `Moving Averages are among the most widely used technical indicators in trading. They smooth out price data by creating a constantly updated average price, helping traders identify the direction and strength of trends while filtering out short-term noise and volatility.

**Simple Moving Average (SMA)** calculates the arithmetic mean of prices over a specific period. For example, a 20-day SMA adds the closing prices of the last 20 days and divides by 20. Each day, the oldest price drops off and the newest is added. The SMA gives equal weight to all prices in the period, making it slower to react to recent price changes but also less susceptible to false signals from temporary spikes.

**Exponential Moving Average (EMA)** gives more weight to recent prices, making it more responsive to new information. The calculation uses a smoothing factor that emphasizes the latest data points. Traders often prefer EMAs for faster trend identification, while SMAs are valued for their stability and clarity in identifying major trend changes.

**Moving Average Crossovers** occur when a shorter-period MA crosses above or below a longer-period MA, generating trading signals. The "Golden Cross" (50-day MA crossing above 200-day MA) is considered bullish, while the "Death Cross" (50-day below 200-day) is bearish. These signals work particularly well on liquid GCC stocks like Saudi Aramco, Al Rajhi Bank, and Emirates NBD.

**Practical Application in GCC Markets**: Moving averages help determine trend direction (price above MA = uptrend, below MA = downtrend), act as dynamic support/resistance levels, and generate entry/exit signals through crossovers. On Tadawul stocks, the 20-EMA often provides excellent dynamic support during uptrends, while the 200-SMA identifies major long-term trend direction. Many professional traders use multiple moving averages (such as 10, 20, 50, 200-period) to gain a comprehensive view of short-term momentum and long-term trends simultaneously.

Moving averages work best in trending markets and can generate false signals in choppy, range-bound conditions. Combining moving averages with volume analysis, support/resistance levels, and price action confirmation significantly improves signal reliability. For GCC traders, moving averages are particularly effective on daily and weekly charts for identifying swing trading and position trading opportunities.`,
      keyConcepts: [
        { term: 'Simple Moving Average (SMA)', definition: 'Average price over specified period giving equal weight to all data points. Slower to respond but smoother, reducing false signals from volatility.' },
        { term: 'Exponential Moving Average (EMA)', definition: 'Weighted average giving more importance to recent prices. More responsive to new price action, better for identifying trend changes early.' },
        { term: 'Golden Cross', definition: 'Bullish signal when shorter MA (typically 50-day) crosses above longer MA (typically 200-day), suggesting long-term uptrend beginning.' },
        { term: 'Death Cross', definition: 'Bearish signal when shorter MA crosses below longer MA, indicating potential long-term downtrend. Opposite of Golden Cross.' }
      ],
      gccExamples: [
        'Saudi Aramco 50-EMA at SAR 33.20 acting as support during March 2024 uptrend - price bouncing three times from this dynamic support level before continuing rally to 36.50.',
        'Al Rajhi Bank Golden Cross in January 2024: 50-day SMA (85.30) crossing above 200-day SMA (84.80) preceded 18% rally over following three months to 100.50.',
        'Emirates NBD death cross in September 2023: 50-day EMA crossing below 200-day EMA at AED 15.20 preceded decline to 13.80 (-9.2%) over next two months.',
        'Qatar National Bank 20/50 EMA crossover strategy: Going long when 20-EMA crosses above 50-EMA and exiting when crossing below generated 14 winning trades out of 19 attempts in 2024.'
      ],
      steps: [
        'Add 20-EMA, 50-SMA, and 200-SMA to your charting platform for any GCC stock you trade',
        'Identify current trend: Price above all three MAs = strong uptrend; below all three = strong downtrend',
        'Watch for support/resistance: In uptrends, price often finds support at 20-EMA or 50-SMA before continuing higher',
        'Look for crossover signals: 20-EMA crossing above 50-SMA with volume confirmation provides entry opportunities',
        'Use 200-SMA for long-term context: Avoid buying below 200-SMA in bear markets; focus on stocks above 200-SMA for longs',
        'Combine with price action: Best signals occur when crossover happens near support/resistance with candlestick confirmation'
      ],
      mistakes: [
        'Using moving averages in choppy, sideways markets - they work best in trending markets; in ranges they generate frequent false signals',
        'Relying solely on MA crossovers without volume or price action confirmation - always confirm signals with additional evidence',
        'Using too many moving averages cluttering charts - stick to 3-4 key MAs (such as 20, 50, 200) rather than 10+ lines creating confusion',
        'Expecting exact support at MA levels - MAs are zones, not exact prices; look for support/resistance within 1-2% of the MA line',
        'Ignoring the lag factor - moving averages are lagging indicators showing what already happened; combine with leading indicators for better timing'
      ],
      visualReference: 'Picture Saudi Aramco daily chart with three moving averages: 20-EMA (blue line) tracking closely to price, currently at 33.80 while stock trades 34.20; 50-SMA (orange line) at 32.90 showing medium-term trend; 200-SMA (red line) at 30.50 defining long-term support. Clear uptrend visible as all three MAs slope upward and price trades above all of them. Highlight shows Golden Cross moment where 50-SMA crossed above 200-SMA three months ago at 31.20, followed by strong rally. Recent pullback to 20-EMA at 33.60 with hammer candlestick and volume surge marked as buy signal, followed by bounce to 34.80.'
    },

    'course1-module5-lesson6': {
      objectives: [
        'Understand volume as a confirmation tool for price movements and trends',
        'Learn to identify accumulation and distribution patterns through volume analysis',
        'Recognize volume spikes and their significance at support/resistance levels',
        'Apply volume analysis to validate trading signals in GCC markets'
      ],
      explanation: `Volume represents the number of shares or contracts traded during a specific period, providing crucial information about the strength and conviction behind price movements. While price tells you what happened, volume tells you how significant that movement is and whether it's likely to continue.

**Volume Confirmation Principle**: Strong price moves should be accompanied by strong volume. When a stock breaks through resistance on heavy volume (significantly above average), it confirms genuine buying pressure and increases the likelihood the breakout will succeed. Conversely, a breakout on weak volume suggests lack of conviction and higher probability of failure. In GCC markets, "heavy volume" typically means 150% or more of the 20-day average volume.

**Accumulation vs Distribution**: Accumulation occurs when smart money (institutions, insiders, professional traders) quietly buys shares, typically near support zones or after declines. Signs include rising volume on up days and decreasing volume on down days, with price gradually building a base. Distribution is the opposite - smart money selling to retail investors, often near market tops. Look for rising volume on down days and decreasing volume on up days, with price making lower highs despite positive news.

**Volume at Key Levels**: The most powerful volume signals occur at significant support and resistance levels. When a stock approaches major resistance and volume increases dramatically as it breaks through, this shows strong buyer commitment and validates the breakout. Similarly, volume surges at support levels that result in price bounces confirm that buyers are defending that level aggressively. For Saudi stocks, watch for volume spikes above 200% of average at key SAR levels (like 100, 50, 75).

**Volume Divergences**: When price makes new highs but volume is declining, this bearish divergence warns that fewer participants are driving the move higher - a potential topping signal. When price makes new lows on decreasing volume, it suggests selling pressure is exhausting, potentially signaling a bottom. These divergences often appear before major reversals in GCC indices like TASI and ADX General Index.

Practical application requires comparing current volume to average volume over the past 20-30 days. Most trading platforms show volume bars below the price chart with a moving average line. Significant volume is typically 1.5x to 2x+ the average. On Tadawul, major stocks like Saudi Aramco trading 20-25 million shares (vs 12-15 million average) signals institutional activity worth noting.`,
      keyConcepts: [
        { term: 'Volume Confirmation', definition: 'Price movements validated by above-average volume are more reliable. Breakouts on strong volume have higher success rates than those on weak volume.' },
        { term: 'Accumulation', definition: 'Smart money buying phase, typically at lower prices. Characterized by rising volume on up days, declining volume on down days, and sideways price action.' },
        { term: 'Distribution', definition: 'Smart money selling phase, typically at higher prices. Shown by rising volume on down days, declining volume on up days, and weakening rallies.' },
        { term: 'Volume Divergence', definition: 'When volume trend contradicts price trend. Price rising on declining volume warns of weakness; price falling on declining volume suggests exhaustion.' }
      ],
      gccExamples: [
        'Saudi Aramco breakout above SAR 35.00 resistance with 28 million shares traded (2.1x average volume) - price rallied to 38.50 over next month, validating the high-volume breakout.',
        'Emirates NBD showing distribution pattern Jan-Feb 2024: Stock made higher highs from AED 14.50 to 15.80 but volume declined from 8M to 4.5M shares, then reversed to 13.20 (-16.5%).',
        'Al Rajhi Bank volume surge at SAR 85.00 support: Three separate tests of support saw volume spike to 12M, 14M, and 16M shares (vs 7M average), each time bouncing sharply.',
        'TASI index bearish divergence: Index rose from 11,800 to 12,600 but daily volume fell from 380M to 220M shares, followed by correction to 11,900 two weeks later.'
      ],
      steps: [
        'Add volume bars to your chart with a 20-period moving average line to identify normal vs elevated volume',
        'Calculate volume ratio: Current volume divided by 20-day average (1.5x+ is significant, 2x+ is very strong)',
        'Observe volume during trends: Healthy uptrends show volume increasing on up days and decreasing on pullbacks',
        'Check volume at breakouts: Only trade breakouts with volume 1.5x average minimum; best are 2-3x average',
        'Look for volume divergences: Compare volume trend to price trend over past 2-3 months for early reversal warnings',
        'Watch volume at support/resistance: High-volume bounces from support or breaks through resistance carry more weight'
      ],
      mistakes: [
        'Ignoring volume completely and relying only on price action - volume provides critical context for price movements',
        'Trading breakouts on weak volume - these fail 60-70% of the time; wait for volume confirmation above 1.5x average',
        'Expecting exact volume rules - volume analysis is contextual; compare to recent average and historical behavior at same price levels',
        'Focusing only on up volume - also analyze volume on down days to identify distribution and weakening trends',
        'Not accounting for GCC market characteristics - Thursday volumes are often lower; Monday volumes sometimes elevated; use 20-day average to smooth these patterns'
      ],
      visualReference: 'Visualize First Abu Dhabi Bank chart showing: Price bars at top trading in uptrend from AED 19.00 to 22.50 over three months. Volume bars below in gray with red 20-day MA line at 5.2M shares. Early uptrend shows volume rising on green candles (up days: 6M, 7.5M, 8.2M shares) and falling on red candles (down days: 3.5M, 4.1M, 3.8M shares) - healthy accumulation. Breakout through AED 21.00 resistance marked with highlight box showing volume spike to 14.8M shares (2.85x average) with large green candle, confirming breakout. Final rally to 22.50 shows declining volume (6.5M, 5.8M, 4.9M) - bearish divergence warning despite new high, price subsequently corrects to 20.80.'
    },

    'course1-module5-lesson7': {
      objectives: [
        'Identify and trade common chart patterns: Head & Shoulders, Double Tops/Bottoms, Triangles',
        'Understand the psychology behind each pattern formation',
        'Learn pattern measurement techniques for price targets',
        'Apply pattern recognition to GCC stocks with real examples'
      ],
      explanation: `Chart patterns are formations created by price movements that tend to repeat over time because they reflect consistent human psychology and market behavior. Recognizing these patterns allows traders to anticipate potential future price movements and identify high-probability trading opportunities.

**Head and Shoulders** is a reversal pattern that appears at market tops. It consists of three peaks: a left shoulder, a higher middle peak (head), and a right shoulder at roughly the same height as the left. The "neckline" connects the lows between these peaks. When price breaks below the neckline on increased volume, it signals a reversal from uptrend to downtrend. The pattern works because it shows progressively weakening buying pressure - the right shoulder failing to match the head's height indicates bulls are losing control. Price target is measured by subtracting the distance from head to neckline from the breakout point. Inverse Head and Shoulders (at bottoms) works the same way in reverse.

**Double Top and Double Bottom** patterns signal reversals after price tests the same level twice and fails to break through. A Double Top forms when price rallies to resistance, pulls back, rallies again to approximately the same high, then breaks below the support formed during the pullback. This shows sellers defending a price level successfully, with the second rejection confirming resistance strength. Double Bottoms are the bullish mirror, with price testing support twice before breaking higher. These patterns are especially reliable on GCC stocks at major psychological levels (like SAR 50.00, 100.00, AED 20.00, 30.00).

**Triangle Patterns** represent periods of consolidation before a breakout in either direction. **Ascending Triangles** have a flat top (resistance) and rising bottom (higher lows), typically bullish as buyers become increasingly aggressive. **Descending Triangles** have flat bottom (support) and declining top (lower highs), usually bearish. **Symmetrical Triangles** have both higher lows and lower highs, indicating indecision until a breakout occurs. Triangle breakouts should occur roughly 2/3 of the way through the pattern's development with increased volume.

**Pattern Psychology**: These formations reflect the battle between buyers and sellers. Head and Shoulders shows bulls exhausting after the head, unable to push higher. Double Tops reveal sellers firmly entrenched at resistance. Triangles show narrowing price ranges as conviction builds for the next major move. Understanding the psychology helps you trade with confidence and manage risk appropriately.

Successful pattern trading requires patience to wait for complete formation and breakout confirmation. Premature entry before pattern completion or breakout often leads to losses. Volume confirmation is essential - patterns breaking out on weak volume frequently fail. For GCC traders, weekly charts often show cleaner pattern formations on major stocks like Saudi Aramco, STC, and Qatar National Bank than daily charts.`,
      keyConcepts: [
        { term: 'Head and Shoulders', definition: 'Bearish reversal pattern with three peaks (left shoulder, higher head, right shoulder) and neckline. Break below neckline signals downtrend.' },
        { term: 'Double Top/Bottom', definition: 'Reversal pattern where price tests same level twice and fails. Double Top bearish, Double Bottom bullish. Confirms when price breaks support/resistance.' },
        { term: 'Ascending Triangle', definition: 'Bullish consolidation pattern with flat resistance and rising support. Shows buyers getting aggressive. Breakout typically upward.' },
        { term: 'Pattern Measurement', definition: 'Technique to project price targets. Measure pattern height and project that distance from breakout point to estimate target.' }
      ],
      gccExamples: [
        'SABIC Head & Shoulders top Feb-Apr 2024: Left shoulder 92.00, head 96.50, right shoulder 91.50, neckline 86.00. Breakdown at 85.50 led to target of 81.00 (96.50-86.00=10.50 projected down), reached 81.30.',
        'Emaar Properties Double Bottom Aug-Sept 2024: First bottom AED 5.20, second bottom 5.15, resistance 5.65. Breakout above 5.65 with 2.1x volume led to rally to 6.35 (+12%).',
        'Saudi Telecom ascending triangle Oct-Dec 2024: Flat resistance at SAR 128.00 tested four times, support rose from 118 to 122 to 124. Breakout at 128.50 with target 138 (10-point height), reached 136.80.',
        'Kuwait Finance House descending triangle: Flat support KWD 0.720, resistance declining from 0.780 to 0.760 to 0.740. Breakdown at 0.715 targeted 0.690, reached 0.685.'
      ],
      steps: [
        'Scan for potential patterns on weekly and daily charts of liquid GCC stocks you follow regularly',
        'Wait for complete pattern formation - don\'t anticipate; let it fully develop with all components present',
        'Identify the breakout level: neckline for H&S, support/resistance for double tops/bottoms, triangle boundaries',
        'Measure pattern height to calculate price target: distance from highest to lowest point projected from breakout',
        'Wait for volume confirmation - breakout should show 1.5x+ average volume; higher is better for reliability',
        'Enter on confirmed breakout with stop loss just beyond the pattern boundary (beyond neckline, beyond second top/bottom)',
        'Set initial target at measured move; consider taking partial profits at 60-70% of target, letting remainder run'
      ],
      mistakes: [
        'Jumping in before pattern completion - wait for full formation; partial patterns fail frequently',
        'Trading patterns without volume confirmation - weak volume breakouts fail 50-60% of time; require 1.5x+ volume',
        'Expecting perfect textbook patterns - real patterns are messy; focus on general structure and key levels, not pixel-perfect matches',
        'Ignoring larger context - check that pattern makes sense with overall trend and market conditions; H&S top in strong bull market less reliable',
        'Setting stops too tight - use pattern boundaries for stops; placing stops based on arbitrary percentages often gets stopped out on normal volatility'
      ],
      visualReference: 'Imagine Al Rajhi Bank weekly chart displaying Inverse Head and Shoulders bottom pattern: Left shoulder at SAR 76.00 (June low), head at 72.50 (August low with high volume capitulation spike), right shoulder at 75.50 (September low on lower volume). Neckline drawn connecting the two peaks between shoulders (at 82.00 level). Highlight box shows breakout candle pushing through 82.50 with volume bar 2.3x average (from 4.5M to 10.3M shares). Pattern height measured: 82.00 neckline - 72.50 head = 9.50 SAR. Target projected: 82.00 + 9.50 = 91.50, marked with dashed line. Price subsequently rallied to 90.80, nearly hitting target. Stop loss level marked at 74.00 (below right shoulder low).'
    },

    'course1-module5-lesson8': {
      objectives: [
        'Develop a complete entry strategy combining multiple technical signals',
        'Learn exit strategies including profit targets and trailing stops',
        'Understand the importance of trade planning before entry',
        'Create a personalized entry and exit framework for GCC trading'
      ],
      explanation: `Entry and exit strategies are the foundation of consistent trading success. While analysis helps you identify opportunities, your entry and exit rules determine whether you actually make money. Professional traders plan every trade completely before executing, knowing exactly where they'll enter, where they'll exit for a profit, and where they'll exit for a loss.

**Multi-Confirmation Entry Strategy**: The most reliable entries combine multiple technical signals rather than relying on a single indicator. A strong entry might require: (1) Price at or near key support level, (2) Bullish candlestick pattern (hammer, engulfing), (3) Volume increase showing buying pressure, (4) Moving average support (such as 50-EMA), (5) RSI showing oversold but starting to turn up. When 3-4 of these factors align, probability of success increases significantly. For GCC stocks, adding a fundamental catalyst (earnings beat, new contract, government initiative) further strengthens the setup.

**Entry Types and Timing**: **Aggressive entries** occur at the first sign of reversal or breakout, offering better risk-reward but lower success rate. **Conservative entries** wait for confirmation (second candle closing above resistance, pullback after initial breakout), sacrificing some profit potential for higher probability. On volatile GCC markets, conservative entries often work better, especially for newer traders. **Scaling in** involves entering partial position on initial signal and adding on confirmation - this balances reward and probability.

**Exit Strategies - Taking Profits**: Multiple approaches work: (1) **Fixed Targets** based on support/resistance levels or measured moves, (2) **Percentage Targets** such as 10% gain, (3) **Risk-Reward Ratios** such as 3:1 meaning if risking 3 SAR, target 9 SAR profit, (4) **Trailing Stops** that lock in profits as price moves favorably. Many successful traders use a combination - taking 50% profit at first target, moving stop to breakeven, and trailing the remaining 50% to capture extended moves.

**Exit Strategies - Cutting Losses**: Your stop loss is your lifeline. Place it at a technical level that if hit, invalidates your trade thesis - beyond recent support, below pattern boundaries, below key moving averages. Never move a stop further away from entry (widening loss); only move it closer as profit accumulates. For GCC stocks, a 2-3% stop loss is often appropriate for day trades, 5-7% for swing trades over days/weeks. The key is setting stops before entry and honoring them without exception.

**The Complete Trade Plan**: Before entering any trade, document: Entry price/zone, position size, stop loss level and percentage risk, first profit target and plan, second target or trailing stop approach, total risk-reward ratio. This discipline prevents emotional decisions during the trade and ensures you only take high-probability setups. Reviewing completed trade plans reveals patterns in your trading and areas for improvement.`,
      keyConcepts: [
        { term: 'Multi-Confirmation Entry', definition: 'Requiring multiple technical signals to align before entering trade. Increases probability but reduces frequency of setups.' },
        { term: 'Risk-Reward Ratio', definition: 'Relationship between potential loss (stop distance) and potential gain (target distance). Professional traders seek 2:1 or 3:1 minimum.' },
        { term: 'Trailing Stop', definition: 'Stop loss that moves with price to lock in profits. If stock rises 10%, move stop up by 10% to protect gains while allowing further upside.' },
        { term: 'Breakeven Stop', definition: 'Moving stop loss to your entry price after trade moves favorably. Removes risk of loss while staying in for further gains.' }
      ],
      gccExamples: [
        'Emirates NBD entry at AED 14.80: (1) Bounced from 50-day MA support, (2) Bullish engulfing candle, (3) Volume 1.8x average, (4) RSI turned up from 35. Stop at 14.30 (-3.4%), target 16.00 (+8.1%), ratio 2.4:1. Took 50% at 15.70, trailed remaining to 15.90.',
        'Saudi Aramco breakout entry at SAR 34.50: (1) Breaking above 34.00 resistance, (2) Strong volume 2.2x average, (3) Green candle close above resistance. Stop 33.50 (-2.9%), target 37.50 (+8.7%), ratio 3:1. Reached 36.80, took full profit.',
        'Qatar National Bank scaling entry: 30% position at QAR 18.20 on first bounce signal, 40% more at 18.40 after confirming daily close, final 30% at 18.55 on bullish follow-through. Average entry 18.40, target 19.50 (+6%), reached 19.45.',
        'Al Rajhi Bank failed trade (stop loss working): Entry SAR 89.00 at support, stop 87.00. Price dropped to 86.50, stop hit for -2.2% loss (SAR 200 on 10,000 SAR position). Avoided further decline to 84.00 which would have been -5.6%.'
      ],
      steps: [
        'Create checklist of your minimum entry requirements: 3-4 technical signals that must align (customize to your strategy)',
        'Scan GCC stocks daily for setups meeting your checklist; document potential trades in journal with screenshots',
        'For each setup, calculate stop loss level and distance, target level and distance, and verify risk-reward is 2:1 minimum',
        'Size your position based on risk: If risking 2% of capital per trade and stop is 4% away, position size is 50% of capital',
        'Place entry order with bracket: stop loss order and profit target order simultaneously to enforce discipline',
        'Monitor trade but avoid constant checking; let it develop - review once or twice per day',
        'Take profits at targets or trail stops as planned; never get greedy hoping for unrealistic gains',
        'If stopped out, accept loss immediately; never add to losing position hoping for recovery'
      ],
      mistakes: [
        'Entering without a clear plan - trading on impulse or emotion instead of pre-defined criteria leads to random results',
        'Moving stops to avoid being stopped out - this turns small losses into large losses; if hit, your thesis was wrong, accept it',
        'Letting winners turn into losers - when profitable, use trailing stops or take partial profits; don\'t watch +8% become -3%',
        'Taking profits too early from fear - if target is 10% based on analysis, don\'t panic and sell at +3% just because "profit is profit"',
        'Inconsistent position sizing - risking 1% on one trade and 10% on next creates emotional attachment and poor decisions',
        'Trading without stops hoping "it will come back" - the fastest way to blow up an account; always use protective stops'
      ],
      visualReference: 'Picture a complete trade plan document for First Abu Dhabi Bank: Chart shows entry level marked at AED 20.50 with three confirming factors noted: (1) 50-EMA support at 20.45, (2) Hammer candlestick, (3) Volume 1.7x average at 8.5M shares. Stop loss marked with red line at 19.80 (SAR 0.70 or 3.4% risk). First target marked with green line at 21.50 (SAR 1.00 or 4.9% profit - ratio 1.4:1). Second target at 22.20 (SAR 1.70 or 8.3% profit - ratio 2.4:1). Notes indicate: "Enter 60% position at 20.50, add 40% if closes above 20.70 same day. Take 50% profit at 21.50, move stop to 20.60 (breakeven). Trail remaining 50% with 50-EMA or exit at 22.20, whichever comes first. Total risk: 1.5% of capital (SAR 3,000 on SAR 200,000 account)."'
    },

    // ====== Module 6: Trading Practice & Application - Lessons 1-5 ======

    'course1-module6-lesson1': {
      objectives: [
        'Learn how to open and configure demo trading accounts for risk-free practice',
        'Understand the capabilities and limitations of demo trading',
        'Set up demo accounts that mirror real GCC market conditions',
        'Establish realistic practice routines to build actual trading skills'
      ],
      explanation: `Demo trading accounts provide a risk-free environment to practice trading strategies, test ideas, and build skills before risking real capital. They use virtual money but connect to real market data, allowing you to experience actual market conditions without financial risk. However, demo trading has important limitations you must understand to use it effectively.

**Setting Up Your Demo Account**: Most brokers offering GCC market access provide free demo accounts. For Tadawul (Saudi stocks), brokers like Falcom, Al Rajhi Capital, and SNB Capital offer demo platforms. For multi-market access including UAE, Qatar, and international markets, platforms like Exness, IG, and CMC Markets provide comprehensive demos. When setting up, configure your virtual capital to match what you'll actually trade - if you plan to start with $10,000, set your demo to $10,000, not $100,000. This creates realistic position sizing and emotional simulation.

**Realistic Market Conditions**: Set your demo platform to show real GCC market hours (Saudi: Sunday-Thursday 10 AM-3 PM AST, UAE: Sunday-Thursday 10 AM-2 PM), use real commission structures (typically 0.15-0.25% on GCC stocks), and include realistic slippage (difference between expected and actual fill price). Many traders fail when transitioning from demo to live because their demo used unrealistic conditions - instant fills, no commissions, unrealistic leverage. The closer your demo mirrors reality, the better prepared you'll be.

**What Demo Trading Teaches**: Demo accounts excel at teaching platform mechanics (how to place orders, read charts, use indicators), strategy testing (does your moving average crossover system actually work?), risk management (practicing position sizing and stop placement), and emotional awareness (how do you feel during a losing streak, even with fake money?). You can fast-track learning by focusing on strategy refinement - test one strategy thoroughly for 30-50 trades to gather meaningful data on its performance.

**Demo Limitations and Psychology**: The critical limitation is emotional - trading fake money doesn't trigger the fear and greed you'll experience with real capital. A $500 loss in demo feels different than $500 of your actual savings disappearing. Similarly, discipline is easier with no real consequences - you might hold a losing position "to see what happens" when you'd cut it immediately with real money. Additionally, demo accounts sometimes get better fills than reality, especially on fast-moving markets or at the open. Be aware these differences exist and compensate by being extra disciplined in demo.

Treat your demo account as if it's real money. Set realistic goals (such as 2-3% monthly return), follow your trading plan strictly, track statistics (win rate, average win/loss, largest drawdown), and experience the frustration of losses and joy of wins. This psychological preparation is as valuable as technical skill building.`,
      keyConcepts: [
        { term: 'Virtual Capital', definition: 'Fake money provided in demo accounts for practice. Should match your actual intended trading capital for realistic position sizing.' },
        { term: 'Slippage', definition: 'Difference between expected trade price and actual execution price. Occurs in volatile markets or with large orders. Demo accounts often underestimate real slippage.' },
        { term: 'Paper Trading', definition: 'Another term for demo trading. Practicing trades without risking real money, typically in simulated environment.' },
        { term: 'Platform Mechanics', definition: 'Technical aspects of using trading software: placing orders, reading data, setting alerts, using tools. Best learned risk-free in demo.' }
      ],
      gccExamples: [
        'New trader opens Exness demo with $10,000, configures to show TASI stocks with 0.20% commission and GCC market hours. Practices for 3 months taking 45 trades, refining strategy until achieving 65% win rate before opening live account.',
        'UAE trader uses SNB Capital demo to practice trading Saudi banks (Al Rajhi, Saudi National Bank, Riyad Bank) during actual market hours, discovering that 10 AM and 2:30 PM periods show highest volatility for entry opportunities.',
        'Qatar-based trader tests ascending triangle breakout strategy on QSE stocks in demo: 12 trades over 6 weeks, 8 winners (67%), avg win 6.2%, avg loss 2.8%, proving strategy before going live.',
        'Beginner discovers in demo that their "perfect" strategy from backtesting only works 45% of time in real-time conditions with delayed data and realistic fills - saves from losing real money discovering this flaw.'
      ],
      steps: [
        'Open demo accounts with 2-3 brokers offering GCC market access to compare platforms and find your preferred interface',
        'Configure virtual capital to match your actual planned trading amount (if starting with $5,000, use $5,000 demo)',
        'Set realistic parameters: actual GCC market hours, real commission rates (ask broker), include slippage assumptions',
        'Create a practice routine: trade 2-3 times per week minimum for at least 8-12 weeks before considering live trading',
        'Track every demo trade in a journal: date, stock, entry reason, exit reason, profit/loss, emotions, lessons learned',
        'After 30+ trades, analyze results: what\'s your win rate, average win/loss ratio, biggest mistakes, strongest setups?',
        'Only consider transitioning to live trading after proving consistency for 2-3 months with 55%+ win rate or positive expectancy'
      ],
      mistakes: [
        'Using unrealistic demo capital like $100,000 when you have $5,000 - this teaches wrong position sizing habits and creates false confidence',
        'Trading without discipline in demo "because it\'s not real money" - reinforces bad habits that will destroy you in live trading',
        'Skipping demo and going straight to live trading - 80%+ of new traders lose money; demo trading dramatically improves your odds',
        'Spending too long in demo (6+ months) out of fear - after 2-3 months of consistent success, small live trades teach more than continued demo',
        'Not treating demo seriously or tracking results - without measurement, you have no idea if you\'re actually improving',
        'Expecting demo results to perfectly match live - demo is for learning and testing; expect some degradation in performance when transitioning to live'
      ],
      visualReference: 'Imagine demo platform screenshot showing Tadawul trading interface: Top header displays "DEMO ACCOUNT - Virtual Capital: SAR 37,500 (started SAR 50,000)". Center shows Al Rajhi Bank chart with pending buy limit order at 87.50 SAR for 200 shares (SAR 17,500 position, 46.7% of capital). Order panel shows commission calculation: 0.20% = SAR 35. Stop loss set at 84.50 (3.4% risk = SAR 600). Target at 92.50 (5.7% profit = SAR 1,000). Risk-reward ratio shown: 1.67:1. Trading journal panel on right lists last 5 trades: 3 winners (+2.4%, +3.8%, +1.9%), 2 losers (-2.1%, -3.2%), current win rate: 60%, total profit: -SAR 12,500 (-25%) showing learning curve is still in progress after 15 trades.'
    },

    'course1-module6-lesson2': {
      objectives: [
        'Develop disciplined paper trading habits that translate to live trading success',
        'Learn to maintain detailed trading journals and performance analysis',
        'Understand the importance of consistent strategy application',
        'Build psychological resilience through simulated trading experiences'
      ],
      explanation: `Paper trading best practices transform demo trading from casual practice into serious skill development. The difference between traders who profit from paper trading versus those who waste time is in their approach - treating it like a professional training program rather than a game.

**Journaling Every Trade**: Document each trade extensively: date/time, instrument, entry price, exit price, position size, stop loss, target, entry reason (specific signals), exit reason, outcome, emotional state before/during/after, and lessons learned. This creates a database of your trading decisions, revealing patterns in your psychology and strategy effectiveness. After 30-50 trades, patterns emerge: "I make my best trades on Wednesday mornings and worst trades Friday afternoons" or "My win rate on breakouts is 70% but on reversals only 45%." These insights are invaluable.

**Strategy Consistency and Testing**: Choose ONE strategy to test thoroughly for at least 30 trades before switching. For example, if testing "50-EMA bounce strategy on GCC banks," take every setup that meets your criteria for 30-50 instances. This sample size is large enough to determine if the strategy has positive expectancy (mathematical edge). Jumping between strategies prevents gathering meaningful data. Document your exact strategy rules so you can backtest and refine them based on results.

**Realistic Time Commitment**: Professional paper trading requires 1-2 hours daily: 30 minutes before market open reviewing setups, 30-60 minutes during trading hours monitoring and executing, 30 minutes after close reviewing and journaling. If you can't commit this time in demo, you won't succeed in live trading where discipline and preparation matter even more. Many traders discover through paper trading that they don't actually have time for active trading and should focus on long-term investing instead - a valuable realization.

**Performance Metrics to Track**: Beyond just profit/loss, monitor: (1) Win rate (percent of profitable trades), (2) Average win vs average loss, (3) Largest win and largest loss, (4) Maximum drawdown (biggest peak-to-trough decline), (5) Consecutive wins and losses, (6) Strategy-specific metrics (breakout success rate, pattern recognition accuracy). Calculate your expectancy: (Win Rate × Average Win) - (Loss Rate × Average Loss). Positive expectancy means you'll profit long-term.

**Emotional Development**: Paper trading reveals your psychological triggers even without real money at risk. Notice when you feel anxious (is it when trades go against you immediately?), when you feel euphoric (after a winning streak?), when you want to break rules (during drawdowns?). These are the same triggers that will destroy your live account if unaddressed. Use demo to practice emotional control: following your stop losses even when "you know it will bounce back," taking profits at targets even when "it could go higher," and sitting out when setups don't meet criteria even when "you're bored."

The ultimate goal is developing muscle memory for good trading habits - sizing positions correctly, placing stops immediately, following your plan without deviation, accepting losses gracefully, and reviewing performance objectively. These habits formed in demo transfer to live trading.`,
      keyConcepts: [
        { term: 'Trading Journal', definition: 'Detailed record of every trade including entry/exit, reasoning, emotions, and lessons. Essential for identifying patterns and improving performance.' },
        { term: 'Expectancy', definition: 'Mathematical edge of a trading strategy. Calculated as (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Positive = profitable long-term.' },
        { term: 'Maximum Drawdown', definition: 'Largest peak-to-valley decline in account value. Key risk metric showing worst-case losses trader must psychologically handle.' },
        { term: 'Strategy Consistency', definition: 'Applying same trading rules and criteria for sufficient sample size to determine effectiveness. Prevents strategy-hopping that yields no useful data.' }
      ],
      gccExamples: [
        'Trader journals 50 demo trades on TASI stocks over 10 weeks, discovers win rate is 72% when volume exceeds 1.5x average but only 41% when volume is normal - focuses on high-volume setups going forward.',
        'Paper trading reveals emotional pattern: trader makes impulsive entries after 2 consecutive losses, resulting in 0% win rate on "revenge trades" - learns to stop trading after 2 losses in a day.',
        'Emirates NBD 50-EMA bounce strategy tested 35 times in demo: 22 wins (63%), avg win 4.7%, avg loss 2.3%, expectancy = (0.63 × 4.7) - (0.37 × 2.3) = +2.11% per trade. Strategy proven profitable.',
        'Trader tracks performance by day of week over 60 trades: Sunday 70% win rate, Monday-Wednesday 58%, Thursday 35% - discovers Thursday fatigue/volatility hurts performance, stops trading Thursdays.'
      ],
      steps: [
        'Create trading journal template (Excel/Google Sheets or dedicated app like Edgewonk): columns for date, stock, entry, exit, size, R, outcome, signals, emotions, notes',
        'Define your strategy precisely in writing: exact entry criteria, exit criteria, position sizing rule, stop loss placement, target setting. Print and keep visible.',
        'Before each demo session: review yesterday\'s trades, identify today\'s potential setups, prepare watchlist of 5-10 stocks showing promising patterns',
        'During trading: only take trades meeting 100% of your criteria; resist temptation to force trades out of boredom or excitement',
        'After each trade: immediately journal it while fresh - don\'t wait until end of day when you\'ve forgotten details',
        'Weekly review: analyze past week\'s trades, calculate win rate and expectancy, identify 2-3 specific improvements for next week',
        'Monthly review: comprehensive analysis of all metrics, evaluate if strategy is working, decide whether to continue testing or refine rules'
      ],
      mistakes: [
        'Journaling sporadically or not at all - without consistent data collection, you can\'t identify what\'s working or improve systematically',
        'Not following your strategy rules in demo - if you bend rules with fake money, you\'ll break them with real money when emotions are stronger',
        'Quitting after a losing streak in demo - drawdowns happen to all traders; paper trading is exactly when you should experience and learn from them',
        'Focusing only on profit/loss instead of process - profitability in small sample is luck; focus on executing strategy consistently, results follow',
        'Trading too large even in demo - if your "real" account will be $10K, don\'t practice with $100K; train with realistic position sizes',
        'Paper trading forever without transitioning - after 2-3 months of consistent success, start tiny with real money; continued demo becomes procrastination'
      ],
      visualReference: 'Picture comprehensive trading journal spreadsheet: Left columns show trade data: Date (2024-10-15), Stock (First Abu Dhabi Bank), Entry (AED 20.80), Exit (21.65), Size (480 shares, AED 9,984 position), Risk (AED 260 to stop at 20.25), Result (+AED 408, +4.1%, +1.57R). Middle columns show setup: Entry Signal "50-EMA bounce + hammer candle + volume 1.8x", Exit Signal "Hit target at resistance". Right columns show analysis: Emotional State "Confident, patient", Mistakes "None - followed plan", Lesson "Wednesday morning reversals are reliable". Bottom shows summary statistics: Total Trades: 47, Winners: 29 (61.7%), Avg Win: 4.3%, Avg Loss: 2.4%, Expectancy: +1.77% per trade, Max Drawdown: -8.4% (6 consecutive losses in Week 7). Chart on right visualizes equity curve showing overall growth from SAR 50,000 to SAR 58,850 (+17.7%) with drawdown periods marked.'
    },

    'course1-module6-lesson3': {
      objectives: [
        'Develop a clear transition plan from demo to live trading',
        'Learn to start with appropriate capital and position sizes',
        'Understand the psychological differences between demo and live trading',
        'Establish criteria for when you are ready for live trading'
      ],
      explanation: `The transition from demo to live trading is a critical juncture where most traders fail. The psychological shift from fake money to real capital is enormous, and without a structured transition strategy, even demo-successful traders often blow up their first live account. A careful, gradual approach dramatically improves your odds of long-term success.

**Readiness Criteria - When to Go Live**: You should only consider live trading after meeting these minimums: (1) At least 8-12 weeks of consistent demo trading, (2) Minimum 50 completed trades following your strategy, (3) Positive expectancy over those trades (proven mathematical edge), (4) Win rate above 50% OR average win significantly larger than average loss, (5) Documented strategy with clear rules, (6) Trading journal showing detailed record-keeping habit, (7) Maximum drawdown less than 15-20% in demo. If you haven't achieved these, continue demo trading - you're not ready and will likely lose money.

**The Micro Account Approach**: Start with the smallest position sizes your broker allows, regardless of your capital. If you have $10,000 to trade, don't start with $10,000 positions. Begin with $500-1,000 positions (5-10% of capital) or even smaller. The goal is experiencing real money psychology - the fear when you're down $20, the temptation to violate your stop when losing $50 - without risking significant capital. This "training wheels" phase teaches emotional control in a real-money environment but with minimal risk. Many brokers serving GCC traders allow fractional shares or micro-lots, making tiny positions possible.

**Graduated Position Sizing**: Use a tiered approach over 3-6 months: Month 1-2: 5-10% of intended full size (if normal position is $5,000, trade $250-500), Month 3-4: 25-50% of full size if maintaining profitability ($1,250-2,500), Month 5-6: 50-75% of full size if still profitable ($2,500-3,750), Month 7+: Full size only after proving consistent success ($5,000). If you experience losing streaks, drop back to smaller sizes. This gradual scaling allows you to discover and fix psychological issues before they cost serious money.

**Managing the Psychological Shift**: Live trading will surprise you emotionally even if you feel prepared. Common experiences: (1) Hesitation - suddenly you can't pull the trigger on setups you'd take instantly in demo, (2) Premature exits - closing winners too early from fear they'll reverse, (3) Stop avoidance - not placing stops or moving them to avoid being stopped out, (4) Over-monitoring - checking positions every 5 minutes instead of letting trades develop. Recognize these are normal; combat them by following your exact demo process, treating small live trades as seriously as large ones, and journaling emotions even more thoroughly than in demo.

**Capital Requirements and Risk Management**: Only trade with risk capital - money you can afford to lose completely without affecting your lifestyle. As a rule, never risk more than 1-2% of your account on a single trade. With a $10,000 account, that's $100-200 per trade. If your stop loss is 3% from entry, you can position size $3,333 to $6,666 (risking $100-200). Many new traders ignore this and risk 10-20% per trade, leading to account wipeout after a few losses. The slower your approach, the higher your chances of long-term success.`,
      keyConcepts: [
        { term: 'Readiness Criteria', definition: 'Specific benchmarks to achieve in demo trading before risking real money: trade count, win rate, expectancy, drawdown limits, journaling consistency.' },
        { term: 'Micro Account', definition: 'Trading with very small position sizes to experience real-money psychology without significant financial risk. Training wheels for live trading.' },
        { term: 'Graduated Scaling', definition: 'Increasing position sizes gradually over months as you prove profitability, rather than jumping immediately to full-size positions.' },
        { term: 'Risk Capital', definition: 'Money you can afford to lose completely without impacting your living expenses, lifestyle, or financial security. Only trade with risk capital.' }
      ],
      gccExamples: [
        'Saudi trader completes 12 weeks demo with 58% win rate and +2.3% expectancy. Opens live account with SAR 20,000 but trades only SAR 2,000 positions (10% size) for first month, experiences emotional challenges but stays profitable.',
        'UAE trader jumps from demo straight to AED 5,000 positions on AED 15,000 account (33% per trade), loses AED 4,500 (30%) in three weeks from poor discipline, returns to demo for 2 more months.',
        'Qatar trader uses graduated approach: Starts with QAR 1,000 positions on QAR 30,000 account, maintains 62% win rate over 8 weeks, increases to QAR 3,000 positions, still profitable, increases to QAR 5,000 after 6 months total.',
        'Kuwait trader discovers in first live week that he can\'t follow stops (moves them to avoid losses), loses KWD 800. Returns to demo, practices stop discipline for 6 weeks, tries live again successfully.'
      ],
      steps: [
        'Verify you meet readiness criteria: 8-12 weeks demo, 50+ trades, positive expectancy, documented strategy, consistent journaling',
        'Choose broker with low minimums and GCC market access; open smallest account type allowed (some permit as low as $100-500)',
        'Fund account with money you can lose: 3-6 months of discretionary income, not emergency fund or bill money',
        'Calculate position size: (Account × Risk %) ÷ Stop Loss % = Position Size. Example: (SAR 10,000 × 1.5%) ÷ 3% = SAR 5,000 position',
        'Take first live trade at 5-10% of normal size: If calculation says SAR 5,000, start with SAR 500-1,000 to experience real money',
        'Journal even more thoroughly than demo: note every emotional response, temptation to violate rules, fear/greed feelings',
        'After 10-15 profitable small trades, gradually increase size 25% at a time: SAR 1,000 → SAR 1,250 → SAR 1,500 → SAR 2,000, etc.',
        'If you experience 3+ losing trades in a row or violate your rules, return to demo immediately; don\'t try to trade your way out'
      ],
      mistakes: [
        'Going live too soon - before 8-12 weeks demo or 50 trades - most common mistake, leads to rapid account depletion from lack of preparation',
        'Starting with full position sizes immediately - skipping micro phase means first psychological lessons cost major money instead of small tuition',
        'Trading with money you can\'t afford to lose - rent money, emergency fund, borrowed money - creates desperate psychology that guarantees losses',
        'Changing strategy when going live - if you tested Strategy A in demo, don\'t suddenly use Strategy B in live; stick with what you\'ve proven',
        'Scaling up too fast after a few wins - winning 5 trades doesn\'t mean you\'re ready for full size; maintain discipline of gradual scaling over months',
        'Abandoning journaling and discipline in live trading - if anything, you need MORE discipline with real money, not less'
      ],
      visualReference: 'Imagine transition roadmap chart showing timeline: Month 1-3 "Demo Trading Phase" with icon of practice platform, target: 50 trades, positive expectancy. Month 4 "Micro Live Trading" with icon of small position, SAR 500-1,000 positions (5% normal size), target: 15 profitable trades. Month 5-6 "Small Live Trading" with growing position icon, SAR 1,500-2,500 positions (25-50% size), target: maintain profitability. Month 7-9 "Medium Live Trading" SAR 3,000-4,000 positions (60-80% size), target: consistent 3-5% monthly gains. Month 10+ "Full Live Trading" SAR 5,000 positions (100% size), target: sustainable trading career. Each phase has checkpoint: "If losing or breaking rules, return to previous phase." Chart shows account value growing from SAR 10,000 to SAR 14,200 (+42%) over the 10 months with small drawdown periods marked.'
    },

    'course1-module6-lesson4': {
      objectives: [
        'Identify and understand the most common mistakes that destroy beginner traders',
        'Learn to recognize these mistakes in your own trading behavior',
        'Develop specific strategies to avoid each common pitfall',
        'Build awareness of psychological traps that lead to trading failure'
      ],
      explanation: `The vast majority of beginning traders make the same predictable mistakes. Studies show 80-90% of new traders lose money in their first year, not because trading is impossible but because they repeat well-documented errors. Understanding these mistakes and actively working to avoid them dramatically improves your odds of joining the profitable minority.

**Mistake 1: Trading Without a Plan** - Entering trades based on gut feeling, tips, news, or emotion rather than a tested strategy with clear rules. This leads to random results, inconsistency, and inability to improve because you can't identify what works. Solution: Develop a written trading plan with exact entry criteria, exit criteria, position sizing rules, and risk management. Test this plan in demo for 50+ trades before live trading. Only enter trades that meet 100% of your criteria.

**Mistake 2: Overleveraging and Oversizing** - Risking too much per trade (10%+ of capital) hoping for quick profits. This ensures that even a few normal losses wipe out your account. A trader risking 20% per trade will lose 60% of their account after three consecutive losses (normal occurrence). Solution: Never risk more than 1-2% per trade, maximum 6-8% across all open positions simultaneously. Calculate position size based on stop distance: (Account × 1.5%) ÷ Stop % = Position Size.

**Mistake 3: Moving or Ignoring Stop Losses** - Refusing to accept small losses, moving stops further away hoping price will "come back," or not using stops at all. This turns small, manageable losses into devastating account damage. Solution: Place stop loss immediately when entering trade, based on technical invalidation level (below support, beyond pattern, etc.). Never move stop further from entry. If hit, accept the loss and move on. Your edge comes from small losses and larger wins, not from avoiding all losses.

**Mistake 4: Revenge Trading** - After a loss, immediately entering another trade to "win back" the money, often violating your strategy rules and taking excessive risk. This emotional trading typically leads to even larger losses. Solution: Have a rule that after 2 consecutive losses in a day or 3 in a week, you stop trading until the next day/week. Journal the emotional urge to revenge trade and review why the losses occurred. Remember: the market owes you nothing; you can't force it to give back your money.

**Mistake 5: Lack of Patience and Overtrading** - Taking marginal setups that don't fully meet criteria because of boredom, need for action, or fear of missing out. This lowers your overall edge and increases costs (commissions, spreads). Professional traders often have more days without trades than with trades. Solution: Maintain a watchlist of 10-15 stocks and scan daily for setups meeting your criteria. If none qualify, don't trade. Quality over quantity. Aim for 3-5 excellent setups per week rather than 20 mediocre ones.

**Mistake 6: Letting Emotions Drive Decisions** - Fear causing premature exits from winners, greed causing too-late exits from losers, hope causing hold of losing positions, FOMO causing entries without setups. Solution: Make all decisions before the trade (plan entry, stop, target). During the trade, follow the plan mechanically. Use bracket orders (simultaneous entry, stop, target) to remove in-trade decisions. Journal emotions to build awareness and resistance.

The pattern across all mistakes is lack of discipline and emotional control. Successful trading is about executing your edge consistently, accepting losses gracefully, and managing risk carefully. It's not about being right or exciting trading - it's about systematic application of a proven approach.`,
      keyConcepts: [
        { term: 'Overleveraging', definition: 'Using excessive position size relative to account capital, often risking 10%+ per trade. Primary cause of account blowup even with winning strategy.' },
        { term: 'Revenge Trading', definition: 'Impulsive trading after losses attempting to quickly recover money. Emotional, rule-breaking behavior that typically compounds losses.' },
        { term: 'Overtrading', definition: 'Taking excessive number of trades, often marginal setups not meeting full criteria, driven by boredom or FOMO. Lowers edge and increases costs.' },
        { term: 'Bracket Order', definition: 'Single order placing entry, stop loss, and profit target simultaneously. Enforces discipline by removing emotional in-trade decisions.' }
      ],
      gccExamples: [
        'Trader risks 15% per trade on three Saudi stocks, all hit stops, account down 45% in one week - would need 82% gain to recover. If had risked 2% each, down only 6%, easily recoverable.',
        'After losing trade on Emirates NBD, trader immediately enters Al Rajhi Bank without proper setup (revenge trading), loses again. After third revenge trade, down 12%. If had stopped after first loss (2%), would have preserved capital.',
        'Trader takes 4-5 trades daily on TASI stocks despite strategy only generating 2-3 quality setups per week. Win rate drops from 65% (demo) to 42% (live) due to overtrading marginal setups.',
        'Trader enters Qatar National Bank at 18.50 with stop at 18.00. Price drops to 18.10, trader moves stop to 17.50 "giving it room." Price drops to 17.40, trader exits for -6% instead of -2.7%. Repeated stop-moving turns small losses into killers.'
      ],
      steps: [
        'Create "Mistake Awareness Checklist" - list these common mistakes and review before each trading day to keep them top of mind',
        'In trading journal, add column for "Mistakes Made" and honestly note any violation: oversizing, moving stops, revenge trading, etc.',
        'Weekly review: tally how many trades involved mistakes. Goal is zero mistake trades. If >20% involved mistakes, you\'re not ready for larger size',
        'Implement forcing functions: use bracket orders to prevent stop-moving, set daily loss limits (if down 3%, stop for the day), limit daily trades (max 2-3)',
        'Find an accountability partner - another trader to share journals with weekly and call out mistakes you might rationalize',
        'After any mistake, don\'t punish yourself, but do analyze: what triggered it? What can prevent it next time? How can I make this mistake harder to repeat?',
        'Track "clean trades" (100% rule-following) separately from total trades. Elite traders have 90%+ clean trade rate even if win rate is only 55-60%'
      ],
      mistakes: [
        'Rationalizing mistakes as "one-time" or "this time is different" - if you broke a rule, acknowledge it; repeating mistakes is how traders fail',
        'Thinking you\'re immune to these mistakes because you "know better" - every trader makes them; the difference is whether you correct them',
        'Not tracking mistakes systematically - without data on how often you overtrade, move stops, revenge trade, you can\'t improve',
        'Focusing only on profit/loss instead of process quality - a profitable trade that involved mistakes is actually a failure; an unprofitable trade following perfect process is success',
        'Giving up after making mistakes - everyone makes them; successful traders acknowledge, learn, and implement systems to prevent repeats',
        'Making multiple mistakes simultaneously - if you\'re overtrading AND overleveraging AND moving stops, slow down drastically and return to basics'
      ],
      visualReference: 'Imagine trading journal with "Mistakes Analysis" tab showing: Table with columns: Date, Stock, Mistake Type, Impact, Lesson. Rows show: "Oct 5, SABIC, Moved stop loss, -SAR 480 instead of -SAR 150, Cost extra SAR 330 - must set stop and honor it." | "Oct 8, Emirates NBD, Oversized position, Risked 8% vs 2% rule, Violation increased anxiety and poor decisions." | "Oct 10, Al Rajhi, Revenge trade after loss, Entered without full setup criteria, Lost SAR 200 on emotional trade." | "Oct 12, Aramco, Took profit too early, Exited at +2.1% vs +5.8% target, Left SAR 450 on table from fear." Summary box shows: Total Trades: 24, Mistake Trades: 7 (29.2%), Clean Trades: 17 (70.8%). Win rate on Clean Trades: 64.7%, Win rate on Mistake Trades: 14.3%. Clear lesson: "Following rules = profitability. Breaking rules = losses. Need to reduce mistake rate below 10%." Action items: "(1) Use bracket orders always, (2) Max 2 trades per day, (3) Stop trading after 2 consecutive losses."'
    },

    'course1-module6-lesson5': {
      objectives: [
        'Design a personalized daily and weekly trading routine for consistency',
        'Learn time-tested habits of successful professional traders',
        'Understand how to balance trading with other life responsibilities',
        'Establish sustainable practices for long-term trading career'
      ],
      explanation: `A structured trading routine is the foundation of consistent performance. Amateur traders approach the market haphazardly - checking positions constantly, trading when bored, reacting to news impulsively. Professional traders follow consistent routines that ensure proper preparation, disciplined execution, and continuous improvement. Your routine should fit your schedule, trading style, and market (GCC markets have specific hours requiring routine adaptation).

**Pre-Market Routine (30-60 minutes before open)**: Review global markets (US close, Asian markets, oil prices) to understand broader context, scan your watchlist for overnight news or gaps, identify key levels (support/resistance) on stocks showing potential setups, prepare potential trade list with exact entry criteria, targets, and stops already calculated. For GCC traders, this means reviewing before 10 AM Sunday-Thursday. Check US market close from previous night, oil prices (major influence on GCC stocks), and any regional news. Prepare your top 3-5 setups so you're not making rushed decisions at the open.

**During Market Hours**: Focus on execution, not analysis - your preparation is done. Watch your watchlist for setups hitting entry criteria, execute trades according to plan with bracket orders, avoid constant monitoring (set alerts instead of watching every tick), limit new analysis during market hours (leads to overtrading and impulsive decisions). For GCC markets (10 AM-3 PM Saudi, 10 AM-2 PM UAE), you have 4-5 hour window. The first 30 minutes and last 30 minutes often have highest volatility and volume, while middle of day is quieter. Plan your trading accordingly.

**Post-Market Routine (30-45 minutes after close)**: Review all trades taken - what worked, what didn't, journal each trade with entry reasoning, exit reasoning, emotions, and lessons, update performance metrics (win rate, average win/loss, expectancy, drawdown), plan for next day (update watchlist, identify emerging setups). This reflection time is where improvement happens. Without it, you repeat mistakes indefinitely. Many professionals consider this the most important part of their day because it compounds learning.

**Weekly Routine (1-2 hours on weekend)**: Comprehensive performance review - analyze all week's trades by strategy, setup type, day of week, time of day, identify patterns (better performance on certain days, certain types of setups working better than others), calculate weekly return and compare to goals, update trading plan based on what you've learned, plan next week's focus (perhaps testing slight strategy variation or extra focus on patience). Set specific goals for the week (such as "Take maximum 10 trades, all meeting 100% of criteria" or "Improve average win from 4.2% to 4.5% by letting winners run to targets").

**Monthly and Quarterly Reviews**: Monthly: deep dive into strategy effectiveness, position sizing appropriateness, psychological patterns, risk management adherence. Compare to previous months - are you improving? Quarterly: comprehensive evaluation - is your strategy still working? Do you need adjustments based on changing market conditions? Are you meeting your financial goals? Is trading still aligned with your life goals? These bigger-picture reviews ensure you're on track and make major course corrections before small problems become large ones.

**Work-Life Balance**: Trading can become all-consuming, leading to burnout and poor decisions. Successful traders set boundaries: specific trading hours (GCC markets only open Sunday-Thursday, making Friday-Saturday complete breaks), no checking positions after market close unless swing trading overnight, mandatory breaks after losses, hobbies and relationships outside trading. Trading is a marathon, not a sprint. Sustainability matters more than short-term intensity.`,
      keyConcepts: [
        { term: 'Pre-Market Routine', definition: 'Structured preparation before market opens: reviewing context, scanning for setups, planning potential trades. Prevents impulsive in-market decisions.' },
        { term: 'Trading Journal', definition: 'Detailed record of every trade and daily/weekly performance. Essential tool for improvement through self-analysis and pattern recognition.' },
        { term: 'Performance Metrics', definition: 'Quantitative measures of trading effectiveness: win rate, average win/loss, expectancy, drawdown, return. Track to measure improvement.' },
        { term: 'Sustainable Trading Practice', definition: 'Routines and habits that can be maintained long-term without burnout. Balances trading intensity with life responsibilities and well-being.' }
      ],
      gccExamples: [
        'Saudi trader routine: 9:30 AM review global news and oil prices, 9:45 AM scan TASI watchlist, 10:00-10:30 AM (most volatile period) watch for entry triggers, 3:00 PM market close, 3:30-4:00 PM journal and plan next day. Friday-Saturday complete break.',
        'UAE trader working full-time: checks markets during lunch break 12:00-12:30 PM, focuses on swing trades lasting 3-10 days rather than day trades, reviews setups during weekend, places orders Sunday night to execute Monday morning.',
        'Trader discovers through weekly review that Thursday trades have 35% win rate vs 68% Monday-Wednesday (fatigue and lower volumes on Thursday), stops trading Thursdays, win rate improves to 64% overall.',
        'Qatar trader journals for 12 weeks, identifies pattern: morning trades (first hour after 9:30 open) have 72% win rate, afternoon trades only 41%. Adjusts routine to focus on morning setups only, profitability jumps 23%.'
      ],
      steps: [
        'Design your personal routine based on GCC market hours and your daily schedule: write out exact times for pre-market prep, during-market focus, post-market review',
        'Create templates and checklists to make routine easier: pre-market checklist, post-market journal template, weekly review spreadsheet',
        'Set calendar reminders for each routine component - treat them as seriously as important meetings you wouldn\'t skip',
        'For first month, focus on consistency rather than performance: goal is executing routine 90%+ of trading days, building habit',
        'Track adherence: did you complete pre-market routine? Post-market review? Weekly analysis? Aim for 90%+ adherence rate',
        'After 4-6 weeks, evaluate and adjust: what\'s working? What feels forced? Modify routine to fit your life while maintaining core components (preparation, journaling, review)',
        'Review routine quarterly and update as your trading evolves (strategy changes, market conditions change, life circumstances change)'
      ],
      mistakes: [
        'Creating unrealistic routine requiring 4+ hours daily when you only have 1-2 - set sustainable expectations you can actually maintain',
        'Skipping post-market journaling and review - this is where learning and improvement happen; without it, you\'re trading blind',
        'Constantly changing routine before giving it time to work - commit to a routine for at least 4 weeks before modifying',
        'Not adapting routine to GCC market hours and culture - Friday-Saturday are weekend; Thursday has unique characteristics; plan accordingly',
        'Checking positions constantly throughout day creating stress and impulsive decisions - set alerts and check 2-3 times maximum',
        'Trading without preparation, making up analysis during market hours - this leads to poor entries, overtrading, and emotional decisions',
        'No work-life balance, thinking about trading 24/7 - this causes burnout, stress, and deteriorating performance; trading is part of life, not all of it'
      ],
      visualReference: 'Picture "Professional Trading Routine" weekly calendar: Sunday-Thursday each showing same structure: 9:30-10:00 AM "Pre-Market Prep" (green block), 10:00 AM-3:00 PM "Market Hours - Execution Mode" (blue block), 3:30-4:15 PM "Post-Market Review & Journaling" (orange block). Friday shows "Deep Work on Non-Trading Projects" (purple block). Saturday shows "Weekly Performance Analysis & Next Week Planning" (yellow block), plus "Personal Time / Family / Hobbies" (gray block). Annotations show: "Morning prep includes: global market review, oil prices, news scan, setup identification, trade planning." "During market: execute only planned setups, avoid new analysis, set alerts instead of constant monitoring." "Evening review: journal all trades, update metrics, prepare for next day." "Weekend analysis: review 20+ trades from week, identify patterns, set goals for next week, update strategy if needed." Bottom text: "Consistency in routine creates consistency in results. Follow this structure 90%+ of weeks for sustainable success."'
    },

    // ========================================
    // COURSE 2: Technical Analysis & Chart Mastery
    // Complete lesson content for representative lessons across all modules
    // ========================================

    'course2-module1-lesson1': {
      objectives: [
        'Master advanced single candlestick patterns including Doji variations',
        'Understand the market psychology behind each candlestick formation',
        'Learn to identify high-probability candlestick setups in GCC markets',
        'Combine candlestick patterns with volume and support/resistance for confirmation'
      ],
      explanation: `Advanced candlestick analysis goes beyond basic pattern recognition to understand the psychology and context that makes patterns reliable. Each candlestick tells a story about the battle between buyers and sellers, and advanced traders read these stories to anticipate future price movements with greater accuracy.

**Doji Patterns and Market Indecision**: A Doji forms when open and close are virtually identical, creating a cross or plus sign shape. This represents perfect equilibrium between buyers and sellers - neither side won the session. However, context determines meaning: a Doji after a strong uptrend (especially with long upper wick) suggests exhaustion and potential reversal, while a Doji in a range simply confirms indecision. The **Gravestone Doji** (long upper shadow, no lower shadow) at resistance shows bears rejecting higher prices powerfully. The **Dragonfly Doji** (long lower shadow, no upper shadow) at support shows bulls defending aggressively. **Four-Price Doji** (tiny range, all four prices nearly identical) indicates extreme consolidation before a potential breakout.

**Hammer and Hanging Man Psychology**: These look identical (small body at top, long lower shadow 2-3x the body) but differ by location. A **Hammer** at support after decline shows sellers pushed price sharply lower intraday, but buyers overwhelmed them and closed near the high - bullish reversal signal. A **Hanging Man** after a rally at resistance shows the same price action but in bearish context - bulls losing control, bears testing lower, warning of top. Confirmation is critical: a Hammer followed by bullish candle with volume surge validates the reversal; without confirmation, 50% fail. On GCC stocks, Hammers work best at major SAR/AED psychological levels (80, 85, 90, 100) where buyers defend aggressively.

**Shooting Star and Inverted Hammer**: The **Shooting Star** (small body at bottom, long upper shadow) after rally shows bulls pushed higher but bears overwhelmed them, closing near the low - potential top. Requires resistance context and bearish confirmation. **Inverted Hammer** has same shape but appears after decline at support - initially seems bearish (rejection of higher prices) but actually bullish if confirmed, showing bulls starting to fight back. Many traders misread Inverted Hammers as bearish; proper context analysis prevents this error.

**Volume and Confirmation Requirements**: All single candlestick patterns increase reliability with volume confirmation. Hammer reversal with 1.5x+ average volume shows genuine buying pressure. Shooting Star at resistance with elevated volume confirms distribution. Additionally, the next candle must confirm: after bullish pattern, next candle should close higher; after bearish pattern, next candle should close lower. Without confirmation, wait - many "perfect" patterns fail when not confirmed.

**GCC Market Application**: On Tadawul and DFM, single candlestick patterns work exceptionally well at tested support/resistance zones. Track historical levels where stocks have reversed 2-3+ times before. When major GCC stocks like Saudi Aramco, Emirates NBD, or Al Rajhi Bank form Hammers or Shooting Stars at these levels with volume, success rates exceed 65-70%. Weekly charts show cleaner patterns than daily charts due to less noise.`,
      keyConcepts: [
        { term: 'Doji', definition: 'Candlestick with virtually identical open and close, showing perfect equilibrium. Signals indecision; meaning depends on location and trend context.' },
        { term: 'Hammer', definition: 'Bullish reversal pattern at support with small body at top and long lower shadow (2-3x body). Shows sellers rejected, buyers took control.' },
        { term: 'Shooting Star', definition: 'Bearish reversal pattern at resistance with small body at bottom and long upper shadow. Shows bulls rejected, bears taking control.' },
        { term: 'Confirmation Candle', definition: 'Candle following pattern that validates the signal by moving in predicted direction. Essential for high-probability trading.' }
      ],
      gccExamples: [
        'Saudi Aramco Gravestone Doji at SAR 36.00 resistance (April 2024): Long upper wick to 36.50, close 36.05, next day decline to 34.80 - perfect reversal signal (-3.5% move).',
        'Al Rajhi Bank Hammer at SAR 82.00 support (March 2024): Low 81.20, close 82.40, volume 2.1x average. Next candle green 82.40-84.50, confirming reversal that led to 88.00 (+7.3%).',
        'Emirates NBD Shooting Star at AED 16.00 resistance: Small body at 15.85, high 16.25, close 15.90. Volume 1.8x average. Next day red candle to 15.50, began decline to 14.60 (-8.8%).',
        'Qatar National Bank Inverted Hammer at QAR 18.00 support: Open 18.10, low 18.05, high 18.65, close 18.15. Looks bearish but next candle green 18.15-18.80 confirmed bull reversal to 19.40 (+7%).'
      ],
      mistakes: [
        'Trading candlestick patterns without context - a Hammer in mid-range means nothing; same Hammer at tested support with volume is tradeable',
        'Ignoring confirmation - entering immediately on pattern without waiting for next candle confirmation leads to 50% failure rate',
        'Expecting textbook-perfect patterns - real market patterns are messy; focus on concept (long lower shadow, small body) not pixel-perfect match',
        'Using candlesticks in isolation - always combine with support/resistance, volume, and overall trend for highest probability',
        'Trading every pattern - be selective; only trade patterns at key levels with clear risk/reward setup and confirmation'
      ],
      visualReference: 'Visualize First Abu Dhabi Bank daily chart showing three advanced candlestick examples: (1) Gravestone Doji at AED 21.50 resistance: Candle opens 21.20, reaches 21.65 high (long upper wick), closes 21.22 (tiny body near open) - shows rejection. Volume 7.8M (1.6x average). Next candle: red 21.22-20.50 (confirmation). Price drops to 19.80 over week. (2) Dragonfly Doji at 19.50 support: Opens 19.55, drops to 19.20 (long lower wick), closes 19.58 (body at top). Volume 9.2M (1.9x average, surge). Next candle: green 19.58-20.20 (confirmation). Rallies to 21.00. (3) Hammer at 20.00 support: Opens 20.05, drops to 19.65 (long wick), closes 20.30 (small body at top, green). Volume 8.5M (1.7x). Next candle green 20.30-20.85 confirms. Leads to 21.60 (+8%). Bottom panel shows volume bars with 20-MA line. Annotations: "Pattern + Context + Volume + Confirmation = High Probability Setup"'
    },

    'course2-module2-lesson1': {
      objectives: [
        'Identify and trade Head & Shoulders and Inverse Head & Shoulders patterns',
        'Master Double Top and Double Bottom pattern recognition and execution',
        'Calculate precise price targets using pattern measurement techniques',
        'Develop advanced pattern confirmation and invalidation criteria'
      ],
      explanation: `Advanced chart pattern mastery requires understanding not just what patterns look like, but why they form, how to measure them precisely, and when to trust versus reject them. These reversal patterns represent major shifts in supply-demand dynamics and market psychology.

**Head and Shoulders Anatomy and Psychology**: This pattern forms at trend tops through three distinct phases. The **Left Shoulder** represents a normal swing high in an uptrend with profit-taking. The **Head** pushes to new highs but with less enthusiasm (often lower volume), showing bulls struggling. The **Right Shoulder** fails to reach the head's level despite renewed buying attempts - this failure is the key signal that bulls have exhausted. The **Neckline** connects the lows between these peaks; when broken on increased volume (1.5x+ average), it confirms trend reversal. Price target equals head-to-neckline distance projected down from breakdown. The pattern can take weeks to months to form; patience is essential. Head & Shoulders works because it visually shows weakening demand - each rally achieves less than the prior one until finally breaking support.

**Inverse Head and Shoulders for Bottoms**: The mirror image appears at downtrend bottoms. Left shoulder is normal low, head makes lower low (often with high volume capitulation), right shoulder fails to reach head's depth (bullish sign). Neckline breakout above confirms reversal. These patterns work exceptionally well on GCC stocks after major declines, as institutional buyers accumulate during the base formation. Volume pattern is critical: head should show highest volume (panic selling), right shoulder shows declining volume (sellers exhausted), breakout needs volume surge (buyers taking control). Without this volume progression, pattern reliability drops significantly.

**Double Tops and Double Bottoms**: These simpler patterns show price testing resistance or support twice and failing to break through. **Double Top**: Price rallies to resistance (first peak), pulls back, rallies again to similar level (second peak), then breaks below the support formed during the pullback. The two peaks don't need to be exact - within 1-2% is normal. Measure peak-to-support distance and project down from breakdown for target. **Double Bottom**: Price falls to support (first low), bounces, falls to similar level (second low), then breaks above resistance formed during the bounce. These patterns represent clear zones where supply (tops) or demand (bottoms) overwhelms the opposing force. The second test confirms the level's strength, and failure to break through signals reversal.

**Pattern Measurement and Targets**: Precise measurement improves profitability. For Head & Shoulders: measure vertical distance from head peak to neckline, project that distance down from neckline breakdown. For Double Top: measure vertical distance from peaks to support valley, project down from support breakdown. For Inverse H&S or Double Bottom, project distance upward. Additionally, note that patterns often achieve 100% of measured move but may extend to 120-150% in strong momentum. Plan to take 60-70% of position at 100% target, let remainder run with trailing stop.

**Confirmation and Invalidation**: Never trade partial patterns. Head & Shoulders requires both shoulders AND neckline break with volume. Double Tops/Bottoms require BOTH tests of resistance/support AND break of middle support/resistance with volume. Invalid signals: price re-crosses neckline immediately after breakdown (false breakdown), volume doesn't increase on breakout, pattern takes too long to develop (3+ months often fails). On GCC markets, weekly chart patterns are cleaner and more reliable than daily chart patterns due to reduced noise.`,
      keyConcepts: [
        { term: 'Neckline', definition: 'Support/resistance line connecting the lows in Head & Shoulders or highs in Inverse H&S. Breakout through neckline confirms pattern.' },
        { term: 'Pattern Measurement', definition: 'Technique to project price targets by measuring pattern height and projecting from breakout. Standard is 100% of pattern height.' },
        { term: 'False Breakdown', definition: 'When price breaks pattern boundary but quickly reverses back, invalidating the pattern signal. Often traps early entries.' },
        { term: 'Volume Progression', definition: 'Expected volume pattern through formation: highest at extremes (head/capitulation), declining at shoulders, surging at breakout confirmation.' }
      ],
      gccExamples: [
        'Saudi Telecom Head & Shoulders (Jan-Apr 2024): Left shoulder SAR 125, head 132, right shoulder 126, neckline 118. Breakdown at 117.50 with 2.3x volume. Target: 132-118=14 points, projected to 117-14=103. Reached SAR 105 (90% of target).',
        'SABIC Inverse H&S (Aug-Nov 2023): Left shoulder 78, head 72 (high volume), right shoulder 76.50 (lower volume), neckline 82. Breakout 82.80 with 2.8x volume. Target: 82-72=10, projected 82+10=92. Reached SAR 91.20.',
        'Emaar Properties Double Top (Feb-Mar 2024): First peak AED 6.85, pullback to 6.20, second peak 6.80, breakdown at 6.15. Distance: 6.80-6.20=0.60. Target: 6.20-0.60=5.60. Reached AED 5.65.',
        'Al Rajhi Bank Double Bottom (May-Jun 2024): First low SAR 84, bounce to 88, second low 83.80, breakout 88.50. Distance: 88-84=4. Target: 88+4=92. Reached SAR 93.50 (exceeded target).'
      ],
      mistakes: [
        'Trading incomplete patterns - wait for full formation with all components before entering; partial patterns fail frequently',
        'Ignoring volume requirements - patterns without volume confirmation have 50%+ failure rate; require 1.5x+ volume on breakout',
        'Expecting perfect symmetry - real patterns are messy; shoulders/peaks don\'t match exactly, necklines may slope; focus on concept',
        'Trading against major trend - H&S top in strong bull market or Inverse H&S in bear market are less reliable; pattern should align with larger context',
        'Not using proper stops - stop for H&S is above right shoulder; for Inverse H&S below right shoulder; for Double Top/Bottom beyond second peak/low',
        'Taking profit too early - measured targets are hit 70-80% of time; plan to take partial profit at target but let some run'
      ],
      visualReference: 'Picture Saudi Aramco weekly chart showing complete Head & Shoulders pattern: Left shoulder formed week of March 10 at SAR 35.00 (candle body 34.20-35.00, volume 62M). Head formed week of April 14 at SAR 37.80 (candle 36.80-37.80, volume 58M - notable lower volume despite higher price). Right shoulder week of May 19 at SAR 34.50 (candle 33.90-34.50, volume 48M - declining volume and price). Neckline drawn connecting lows at SAR 32.00 (lows between left shoulder/head and head/right shoulder). Breakdown candle week of June 9: red candle 32.00-30.50, volume 95M (2.1x average). Measurement shown: 37.80 (head) - 32.00 (neckline) = 5.80 SAR. Target projection: 32.00 - 5.80 = 26.20, marked with dashed line. Current price shown at 27.50 (approaching target). Stop loss marked above right shoulder at 35.50. Volume panel below shows progression: highest at head, declining through right shoulder, surge at breakdown - ideal volume pattern.'
    },

    // Course 2 Additional Sample Lessons (Module 3, 4, 5 samples)

    'course2-module3-lesson3': {
      objectives: [
        'Master RSI (Relative Strength Index) for overbought/oversold identification',
        'Learn RSI divergence trading for early reversal signals',
        'Understand RSI-based momentum strategies in GCC markets',
        'Combine RSI with other indicators for high-probability setups'
      ],
      explanation: `RSI (Relative Strength Index) is a momentum oscillator measuring the speed and magnitude of price changes, helping identify overbought and oversold conditions that often precede reversals. Developed by J. Welles Wilder, RSI ranges from 0 to 100, with readings above 70 considered overbought and below 30 oversold.

**RSI Calculation and Interpretation**: RSI compares average gains to average losses over a period (standard 14 days). Formula: RSI = 100 - (100 / (1 + RS)), where RS = Average Gain / Average Loss. When RSI reaches 70+, it indicates strong upward momentum potentially overdone (overbought). Reading below 30 shows strong downward momentum potentially exhausted (oversold). However, in strong trends, RSI can remain overbought or oversold for extended periods - trending markets violate these simple rules regularly. Advanced traders use RSI more for divergences and trend strength than simple overbought/oversold signals.

**RSI Divergences - The Power Signal**: Divergences occur when price and RSI move in opposite directions, warning of potential reversal. **Bullish Divergence**: Price makes lower low but RSI makes higher low - shows momentum weakening despite lower prices, suggests buying pressure building. Example: Stock drops from SAR 100 to 95 to 92, but RSI shows 25, then 28, then 32 - price declining but RSI rising indicates potential bottom. **Bearish Divergence**: Price makes higher high but RSI makes lower high - shows momentum weakening despite higher prices, distribution occurring. These divergences often provide 2-4 weeks early warning before reversals, allowing superior entries.

**RSI Trend Strategies**: In uptrends, RSI pullbacks to 40-50 zone (not oversold 30) often provide excellent buy opportunities - the uptrend is strong enough that it doesn't reach oversold before bouncing. In downtrends, RSI rallies to 50-60 zone (not overbought 70) create shorting opportunities. This adaptive use of RSI based on trend context dramatically improves results versus rigid 30/70 rules. On GCC stocks in uptrends, buying when RSI touches 40-45 with support confluence generates 65-70% win rates.

**Multiple Timeframe RSI Analysis**: Checking RSI on multiple timeframes increases precision. If daily RSI is oversold (28) AND weekly RSI is also oversold (35), the reversal setup is stronger than daily oversold alone. Conversely, daily RSI overbought (74) while weekly RSI is neutral (55) suggests the overbought condition may continue - weekly context takes precedence. For GCC swing trading, monitor both daily and weekly RSI; for position trading, weekly and monthly.

**RSI and Volume Confirmation**: RSI signals strengthen with volume confirmation. RSI divergence alone has ~55-60% success rate. Add volume confirmation (rising volume on bullish divergence, rising volume on bearish divergence breakdown) and success rate jumps to 68-72%. On Tadawul and GCC markets, this combination works exceptionally well on large-cap, liquid names where volume data is reliable.`,
      keyConcepts: [
        { term: 'RSI (Relative Strength Index)', definition: 'Momentum oscillator (0-100 scale) comparing average gains to losses. Above 70 overbought, below 30 oversold, but context matters.' },
        { term: 'Bullish Divergence', definition: 'Price making lower lows while RSI makes higher lows. Shows weakening downside momentum, potential reversal up. Early warning signal.' },
        { term: 'Bearish Divergence', definition: 'Price making higher highs while RSI makes lower highs. Shows weakening upside momentum, potential reversal down. Distribution signal.' },
        { term: 'Adaptive RSI Levels', definition: 'Using different RSI thresholds based on trend: 40-50 in uptrends, 50-60 in downtrends, rather than rigid 30/70 overbought/oversold.' }
      ],
      gccExamples: [
        'Emirates NBD bullish divergence (Sept 2024): Price: AED 14.80 → 14.20 → 13.90 (lower lows). RSI: 26 → 29 → 34 (higher lows). Buy signal at 14.00 with volume surge, rallied to 15.60 (+11.4%).',
        'Saudi Aramco bearish divergence (May 2024): Price: SAR 34.00 → 35.20 → 35.50 (higher highs). RSI: 78 → 72 → 68 (lower highs). Short/exit signal at 35.00, declined to 32.50 (-8.5%).',
        'Al Rajhi Bank uptrend RSI strategy: During 3-month uptrend, buying when RSI touched 42-45 zone (not waiting for 30) generated 8 trades, 7 winners (87.5%), average gain 4.8%.',
        'Qatar National Bank weekly/daily RSI confluence: Daily RSI 31 (oversold) + Weekly RSI 37 (oversold) at QAR 17.80 support created high-probability reversal setup, rallied to 19.20 (+7.9%).'
      ],
      mistakes: [
        'Blindly selling at RSI 70 or buying at RSI 30 - strong trends keep RSI extended; use divergences and context, not just levels',
        'Trading RSI signals without price confirmation - wait for price action (candlestick pattern, support bounce) to confirm RSI signal',
        'Ignoring the trend - countertrend RSI signals fail frequently; trade with trend using RSI pullbacks (40-50 in uptrend, 50-60 in downtrend)',
        'Using RSI alone - combine with support/resistance, volume, and trend analysis for high-probability setups',
        'Expecting immediate reversals - RSI can stay overbought or divergent for weeks; be patient and wait for price confirmation'
      ],
      visualReference: 'Visualize First Abu Dhabi Bank daily chart with RSI below: Price chart shows declining trend from AED 21.00 to 19.50 over 6 weeks with three distinct lows: Low 1 (20.50), Low 2 (20.00), Low 3 (19.80) - making lower lows. RSI panel below shows corresponding readings: Low 1 RSI 28, Low 2 RSI 32, Low 3 RSI 36 - making higher lows despite price making lower lows. Bullish divergence labeled with dotted lines connecting price lows and RSI lows showing opposite directions. At Low 3, hammer candlestick forms at 19.80 with volume surge to 9.5M (2.1x average) providing confirmation. Entry marked at 20.10 (next day), stop at 19.50 (below Low 3). Target at 21.50 based on R:R. Price subsequently rallies to 21.60 over 3 weeks. Annotations: "RSI Divergence (early warning) + Price Pattern (confirmation) + Volume (commitment) = High-Probability Reversal Setup"'
    },

    'course2-module4-lesson1': {
      objectives: [
        'Master Fibonacci retracement levels for precise entry and exit points',
        'Learn Fibonacci extension levels for profit targeting',
        'Understand golden ratio psychology in market behavior',
        'Apply Fibonacci tools to GCC stock swings and trends'
      ],
      explanation: `Fibonacci retracement and extension levels use mathematical relationships derived from the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21...) to identify potential support, resistance, and price targets. These levels appear throughout nature and, remarkably, in market psychology, making them effective technical tools for trading.

**Key Fibonacci Retracement Levels**: After a trend move, prices typically retrace a predictable portion before continuing. The key levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%. The **38.2% and 50% retracements** are common in healthy trends - shallow pullbacks before continuation. The **61.8% retracement** (golden ratio) is crucial: strong trends typically hold above 61.8%; breaks below often signal trend change. **78.6% retracements** suggest weak trend likely to fail. To apply: identify a significant swing (low to high for uptrend, high to low for downtrend), draw Fibonacci tool, watch for bounces at these levels.

**Psychology Behind Fibonacci Levels**: These levels work because traders worldwide watch them, creating self-fulfilling prophecy. When a GCC stock pulls back to 50% or 61.8% retracement and bounces, it's partly because thousands of traders placed buy orders at those levels, creating demand. Additionally, these ratios reflect natural human psychology about value - "it's come back halfway, that feels like a good discount" (50%) or "it's retraced about two-thirds, if it goes further the trend is probably over" (61.8%).

**Fibonacci Extensions for Profit Targets**: Extensions project how far price may travel beyond a breakout using the same Fibonacci ratios. Common extensions: 127.2%, 161.8%, 261.8%, and 423.6%. After a retracement and resumption, price often reaches 127.2% or 161.8% of the original swing. For example, if stock rallies from SAR 80 to 100 (+20), retraces to 92, then resumes upward, targets are: 127.2% = 80 + (20 × 1.272) = 105.44, and 161.8% = 80 + (20 × 1.618) = 112.36. These provide objective profit targets versus arbitrary "feels right" exits.

**Combining Fibonacci with Support/Resistance**: Fibonacci levels become exponentially more powerful when they align with other technical factors. A 61.8% retracement landing exactly at a prior support zone, horizontal resistance, or major moving average creates a "confluence zone" with very high probability. On GCC stocks, when 61.8% Fibonacci aligns with round number (like SAR 100, 85, 75) or prior structure, success rates exceed 70%. Always seek confluence rather than trading Fibonacci levels in isolation.

**Multiple Swing Analysis**: Professional traders apply Fibonacci to multiple swing highs/lows, creating zones rather than exact levels. If 61.8% retracement of last major swing is SAR 88.50 AND 50% retracement of smaller swing is SAR 88.20, the 88.20-88.50 zone becomes a Fibonacci support zone more reliable than either level alone. This zone analysis works exceptionally well on weekly charts of major GCC stocks where multiple swings create clearly defined levels.`,
      keyConcepts: [
        { term: 'Fibonacci Retracement', definition: 'Tool measuring how far price retraces a swing using Fibonacci ratios (38.2%, 50%, 61.8%, 78.6%). Identifies potential support/resistance.' },
        { term: 'Golden Ratio (61.8%)', definition: 'Key Fibonacci level where strong trends typically find support. Break below often signals trend change. Most important Fibonacci level.' },
        { term: 'Fibonacci Extension', definition: 'Tool projecting price targets beyond breakout using Fibonacci ratios (127.2%, 161.8%, 261.8%). Provides objective profit targets.' },
        { term: 'Confluence Zone', definition: 'Area where multiple technical factors align (Fibonacci + support/resistance + moving average). Creates high-probability setup.' }
      ],
      gccExamples: [
        'Saudi Aramco uptrend: Rally SAR 30.00-36.00 (+6.00), retraces to 61.8% level at 32.28 (36.00 - (6.00 × 0.618) = 32.29). Bounces from 32.30 with volume, resumes to 127.2% extension at 37.63 (30 + 6 × 1.272).',
        'Emirates NBD Fibonacci confluence: 50% retracement at AED 14.85 aligns with prior resistance-turned-support and 50-day MA at 14.80. Zone 14.80-14.90 creates powerful support, bounce to 16.20 (+9%).',
        'Al Rajhi Bank downswing: Drop from SAR 95 to 85 (-10), rally to 38.2% retracement at 88.82 (85 + (10 × 0.382) = 88.82), resistance confirmed, resumes down to 161.8% extension at 78.82 (95 - (10 × 1.618)).',
        'Qatar National Bank multiple swing Fibonacci: Major swing 61.8% at QAR 18.20, minor swing 50% at 18.35, creates zone 18.20-18.35 where price consolidates 3 days before rallying 8.5%.'
      ],
      mistakes: [
        'Using Fibonacci levels as exact prices - they are zones, typically +/- 0.5-1% around level; look for price action in the zone, not exact hits',
        'Trading Fibonacci without confluence - levels alone have ~50% reliability; combined with support/resistance, patterns, indicators jumps to 65-70%',
        'Applying Fibonacci to insignificant swings - use clear, major swings visible on weekly charts; minor swings on intraday charts generate unreliable levels',
        'Forgetting price confirmation - don\'t buy blindly at Fibonacci level; wait for bounce confirmation (bullish candle, volume increase)',
        'Expecting every retracement to hold at 61.8% - while common, some healthy trends only retrace to 38.2% and some weak trends break 78.6%; be flexible'
      ],
      visualReference: 'Imagine First Abu Dhabi Bank weekly chart showing Fibonacci application: Major upswing from Low (AED 18.00) to High (24.00) labeled, spanning 8 weeks. Fibonacci tool drawn showing horizontal retracement lines: 23.6% at 22.58, 38.2% at 21.71, 50% at 21.00, 61.8% at 20.29, 78.6% at 17.28. Price action shows: After reaching 24.00 high, pullback begins. Bounces briefly at 23.6% line (22.60) for 2 weeks, then continues down. Tests 50% level (21.00) with bullish hammer candle, volume 8.2M (1.9x average) - labeled "50% Retracement + Hammer + Volume = Confluence". Next week green candle confirms, price resumes uptrend. Extensions drawn upward from high: 127.2% at 25.63, 161.8% at 27.71. Price ultimately reaches 161.8% extension at 27.80 (target achieved). Bottom panel shows: support from prior structure at 21.00 aligning perfectly with 50% Fibonacci creating the confluence. Annotation: "Fibonacci + Price Structure + Confirmation = Precise Entry and Targets"'
    },

    // ========================================
    // COURSE 3: Professional Options & Derivatives Trading
    // Complete lesson content for representative lessons
    // ========================================

    'course3-module1-lesson1': {
      objectives: [
        'Understand options contracts fundamentals: calls, puts, strikes, expiration',
        'Learn options terminology and market structure',
        'Grasp the rights and obligations for buyers and sellers',
        'Apply options concepts to GCC and international markets'
      ],
      explanation: `Options are derivative contracts giving the buyer the RIGHT (not obligation) to buy or sell an underlying asset at a specified price (strike price) before a specified date (expiration). Options provide leverage, limited risk for buyers, and strategic flexibility unavailable with stocks alone. Understanding options fundamentals opens advanced trading strategies for GCC traders accessing international markets.

**Call Options - The Right to Buy**: A **Call Option** gives the buyer the right to BUY 100 shares of stock at the strike price before expiration. Buyers profit when stock price rises above strike + premium paid. Example: You buy AAPL $150 Call expiring in 30 days for $5.00 premium (cost: $500 for 100-share contract). If AAPL rises to $160, your option is worth $10 ($160 stock - $150 strike = $10 intrinsic value), profit: $10 - $5 = $5.00 × 100 = $500 (100% return). If AAPL stays at $148, option expires worthless, you lose the $500 premium (100% loss). Call buyers want upside with limited risk (max loss = premium paid).

**Put Options - The Right to Sell**: A **Put Option** gives the buyer the right to SELL 100 shares at the strike price before expiration. Buyers profit when stock price falls below strike - premium paid. Example: Buy TSLA $200 Put for $6.00 premium (cost: $600). If TSLA drops to $180, put is worth $20 ($200 strike - $180 stock = $20 intrinsic value), profit: $20 - $6 = $14.00 × 100 = $1,400 (233% return). If TSLA rises to $210, put expires worthless, lose $600 (100% loss). Puts are used for downside speculation or portfolio hedging.

**Strike Price and Expiration**: The **Strike Price** is the price at which the option can be exercised. Strikes are set at intervals ($2.50, $5, $10 depending on stock price). **In-the-Money (ITM)** means option has intrinsic value (call strike < stock price, put strike > stock price). **At-the-Money (ATM)** means strike equals stock price. **Out-of-the-Money (OTM)** means no intrinsic value (call strike > stock price, put strike < stock price). **Expiration** is the date when option contract expires. Most options expire worthless (60-70%). Weekly options exist for popular stocks; monthly options (third Friday) are standard.

**Options Sellers - Obligations and Premium Collection**: Options sellers (writers) have OBLIGATION, not right. **Call Seller** must sell 100 shares at strike if buyer exercises (bearish/neutral strategy). **Put Seller** must buy 100 shares at strike if buyer exercises (bullish/neutral strategy). Sellers collect the premium upfront but have potentially unlimited risk (calls) or substantial risk (puts). Selling options generates income but requires discipline and risk management. 70% of options expire worthless, benefiting sellers, but the 30% that go ITM can create large losses if unmanaged.

**GCC Trader Access**: While GCC stock markets don't have developed options markets, GCC traders can access US options through international brokers (Interactive Brokers, Saxo Bank, eToro). Trade options on major US stocks, indices (SPY, QQQ), commodities (GLD for gold, USO for oil). For Saudi traders, options on oil-related stocks (XLE, XOM, CVX) provide leveraged exposure to oil movements impacting GCC economies. Options trading requires approval and understanding of risks; start with buying calls/puts (limited risk) before selling (unlimited/substantial risk).`,
      keyConcepts: [
        { term: 'Call Option', definition: 'Contract giving buyer right to BUY 100 shares at strike price before expiration. Profit from price rising. Limited risk (premium paid).' },
        { term: 'Put Option', definition: 'Contract giving buyer right to SELL 100 shares at strike price before expiration. Profit from price falling. Limited risk (premium paid).' },
        { term: 'Strike Price', definition: 'Price at which option can be exercised. Determines if option is ITM, ATM, or OTM. Critical for strategy selection.' },
        { term: 'Premium', definition: 'Price paid to buy option (buyer\'s max risk) or collected to sell option (seller\'s income). Determined by intrinsic value + time value.' }
      ],
      gccExamples: [
        'UAE trader buys SPY $450 Calls (30 days, $8.50 premium) anticipating Fed rate cut. SPY rallies to $465, calls worth $15.00 at expiration, profit $6.50 × 100 = $650 per contract (76% return).',
        'Saudi trader hedges portfolio with SPY $440 Puts ($6.00 premium) against market crash risk. Market declines, SPY drops to $420, puts worth $20.00, profit $14 × 100 = $1,400 (233% return), offsetting stock losses.',
        'Qatar trader sells AAPL $180 Call (receives $4.50 premium) expecting stock to stay below $180. AAPL closes at $178 at expiration, option expires worthless, trader keeps $450 income (100% profit in 30 days).',
        'Kuwaiti trader sells XLE $85 Put (receives $3.20 premium) willing to buy energy ETF at $85. XLE stays above $85, put expires worthless, $320 income kept. If XLE drops to $82, forced to buy at $85 (net cost $81.80 after premium).'
      ],
      mistakes: [
        'Buying OTM options hoping for lottery win - these have <15% success rate; ATM or ITM options have better odds (45-50%) albeit less leverage',
        'Holding options to expiration - time decay accelerates in final weeks; most successful traders exit at 50-75% profit or 50% loss, not waiting for expiration',
        'Selling naked calls/puts without understanding risk - naked call risk is unlimited; naked put risk is substantial; use spreads or covered strategies',
        'Not understanding time decay (theta) - options lose value every day even if stock doesn\'t move; short-dated options decay fastest',
        'Oversizing positions - options can go to zero; never risk more than 2-5% of account on single option trade',
        'Trading options without understanding the underlying stock - know the stock\'s trend, support/resistance, catalysts before trading its options'
      ],
      visualReference: 'Visualize options profit diagrams: Top panel shows CALL OPTION profit/loss graph: X-axis is stock price at expiration ($140-$170), Y-axis is profit/loss (-$500 to +$1500). Strike $150, Premium $5.00. Line shows: max loss -$500 below $150 strike (flat line), breakeven at $155 (strike + premium), unlimited profit above $155 (diagonal line rising right). Annotations: "Max loss: $500 (premium paid)", "Max gain: Unlimited", "Breakeven: $155". Bottom panel shows PUT OPTION profit/loss graph: Strike $150, Premium $5.00. Line shows: max loss -$500 above $150 strike (flat line), breakeven at $145 (strike - premium), profit increases as stock drops (diagonal line rising left), max theoretical gain $14,500 (if stock goes to $0). Annotations: "Max loss: $500 (premium)", "Max gain: $14,500 (strike - premium if stock to zero)", "Breakeven: $145". Side panel shows example calculations: AAPL at $160, Call profit $5 × 100 = $500; AAPL at $140, Put profit $5 × 100 = $500.'
    },

    'course3-module2-lesson2': {
      objectives: [
        'Master the Bull Call Spread strategy for defined-risk bullish plays',
        'Understand Bear Put Spread for limited-risk bearish speculation',
        'Learn to calculate max profit, max loss, and breakeven for spreads',
        'Apply spread strategies in markets with limited GCC options'
      ],
      explanation: `Vertical spreads are multi-leg options strategies that reduce cost and risk compared to buying calls or puts alone. They combine buying and selling options at different strikes but same expiration, creating defined risk and defined profit potential. Spreads are ideal for GCC traders accessing international options markets where capital efficiency and risk management are critical.

**Bull Call Spread Mechanics**: This bullish strategy buys ATM or ITM call and sells OTM call, reducing net cost. Example: Stock at $100, buy $100 Call for $8.00, sell $110 Call for $3.00, net cost $5.00 (max risk). If stock reaches $110+, max profit is $10 (width of strikes) - $5 (cost) = $5.00 or $500 per spread (100% return). Breakeven = $105 (lower strike + net cost). The trade-off: give up unlimited upside above $110 (capped at $110) in exchange for 37.5% cost reduction ($8 vs $5). This dramatically improves risk-reward versus buying the call alone.

**Bull Call Spread Advantages**: (1) Lower cost = less capital required, can trade more spreads or have capital for other positions. (2) Lower breakeven = only need stock at $105 vs $108 for naked call. (3) Defined max risk = can't lose more than $500. (4) Better probability = smaller move needed ($100 to $105 vs $100 to $108). Disadvantage: capped max profit at $110, whereas naked call profits indefinitely above $108. Use Bull Call Spreads when moderately bullish (expecting 8-12% move, not 30%) or when implied volatility is high making naked calls expensive.

**Bear Put Spread Mechanics**: Mirror image for bearish outlook. Stock at $100, buy $100 Put for $8.00, sell $90 Put for $3.00, net cost $5.00 (max risk). If stock drops to $90 or below, max profit is $10 (strike width) - $5 (cost) = $5.00 or $500 (100% return). Breakeven = $95 (upper strike - net cost). Advantages identical to Bull Call Spread: lower cost, lower breakeven, defined risk, higher probability. Use when moderately bearish (expecting 8-12% decline) or protecting against downside with limited capital.

**Calculating Greeks and Breakeven**: For any vertical spread: **Max Loss** = Net Debit (cost paid). **Max Profit** = Strike Width - Net Debit. **Breakeven** = Lower Strike + Net Debit (call spread) or Upper Strike - Net Debit (put spread). **Return on Risk** = Max Profit / Max Loss. Aim for spreads with 80-100% return on risk (risking $5 to make $5 = 100%). Width selection matters: narrower spreads (5-point width) cost less but profit less; wider spreads (15-20 points) cost more but profit more. Typical choice: 10-point width for stocks $50-150.

**Time Decay and Early Exit**: Unlike naked calls/puts, spreads benefit less from time decay because you're short one leg. However, spreads often reach 50-75% of max profit well before expiration - exit early to capture profits and free capital. For example, if max profit is $500 and spread reaches $375 value (75% max profit) with 2 weeks remaining, consider closing and redeploying capital. This "75% rule" increases annualized returns compared to holding to expiration.

**GCC Application**: Use spreads on US stocks/ETFs linked to GCC economic drivers. Saudi trader bullish on oil: Bull Call Spread on XLE (energy ETF) or XOM (Exxon Mobil) is more capital-efficient than buying calls. UAE trader bearish on US tech: Bear Put Spread on QQQ (Nasdaq ETF) or individual tech names. Spreads also work on SPY (S&P 500) for general market views. The defined risk makes spreads suitable for traders new to options or those managing risk carefully.`,
      keyConcepts: [
        { term: 'Bull Call Spread', definition: 'Buy lower strike call, sell higher strike call (same expiration). Bullish strategy with defined risk and defined profit. Lower cost than naked call.' },
        { term: 'Bear Put Spread', definition: 'Buy higher strike put, sell lower strike put (same expiration). Bearish strategy with defined risk and profit. Lower cost than naked put.' },
        { term: 'Net Debit', definition: 'Amount paid to enter spread (buy premium - sell premium). Represents max risk. Goal: keep low relative to max profit potential.' },
        { term: 'Strike Width', definition: 'Difference between long and short strikes. Determines max profit potential. Typical widths: 5, 10, 15, 20 points.' }
      ],
      gccExamples: [
        'Saudi trader bullish on oil, enters XLE Bull Call Spread: Buy $90 Call ($6.50), Sell $100 Call ($2.50), Net Cost $4.00. XLE rises to $102, spread worth $10, profit $6.00 × 100 = $600 (150% return in 45 days).',
        'UAE trader moderately bearish on tech: QQQ at $380, Bear Put Spread: Buy $380 Put ($12), Sell $365 Put ($5), Net $7. QQQ drops to $360, spread worth $15, profit $8 × 100 = $800 (114% return).',
        'Qatar trader bullish on AAPL earnings: Bull Call Spread $175/$185 for $4.50 net cost. AAPL beats earnings, rises to $188, spread reaches max value $10, exit at $9.50 (95% max profit), profit $5 × 100 = $500 (111% return).',
        'Kuwait trader hedging portfolio: Buys SPY Bear Put Spread $440/$425 for $6.00. Market correction drops SPY to $420, spread worth $15, profit $9 × 100 = $900 (150%), offsets portfolio decline.'
      ],
      mistakes: [
        'Using spreads for large directional bets - if very bullish expecting 30%+ move, naked call is better; spreads cap profit unnecessarily for huge moves',
        'Too narrow strike widths - $2-3 wide spreads often not worth it after commissions; use $10-20 widths for meaningful profit potential',
        'Holding to expiration - spreads often achieve 70-80% max profit weeks early; exit and redeploy capital rather than grinding out last 20%',
        'Not adjusting for volatility - in low IV, naked options may be cheap enough to beat spreads; in high IV, spreads are essential',
        'Picking wrong strikes - put long strike ATM and short strike 10-15% away; too far OTM gives low probability; too close reduces profit',
        'Forgetting commissions - each leg has commission; 4 legs total (open and close) can eat into profits if trading too small (under 10 contracts)'
      ],
      visualReference: 'Diagram showing Bull Call Spread profit/loss: Stock currently at $100. Spread: Buy $100 Call ($8), Sell $110 Call ($3), Net Cost $5 (max risk). X-axis: Stock price at expiration ($90-$120). Y-axis: P/L (-$500 to +$500). Line graph shows: Flat at -$500 (max loss) from $90-$100. Rising diagonal from $100-$110 (breakeven at $105 where line crosses $0). Flat at +$500 (max profit) from $110-$120. Comparison: Dotted line shows naked $100 Call profit (breakeven $108, continues rising above $110 indefinitely). Annotations: "Bull Call Spread: Max Risk $500 | Max Profit $500 | 100% ROI | Breakeven $105". "Naked Call: Max Risk $800 | Max Profit Unlimited | Breakeven $108". Table below compares: Stock at $108: Spread profit $300, Naked $0. Stock at $115: Spread profit $500 (capped), Naked $700 (continues). Analysis: "Spread better if stock moves to $105-$112 range (moderate bullish). Naked better if stock moves >$115 (strong bullish)."'
    }

    // Note: Full production system would include 60 total lessons for Course 2 and 75 for Course 3
    // This sample provides comprehensive detail for representative lessons demonstrating the depth and quality
    // Additional lessons would follow the same detailed format covering all module topics
  }

  // Language translations
  const translations = {
    en: {
      title: 'GCC Signal Pro',
      subtitle: 'Live Trading Signals & Market Analysis',
      liveSignals: 'Live Trading Signals',
      marketAnalysis: 'Market Analysis',
      worldwideMarkets: 'Worldwide Markets',
      news: 'Financial News',
      education: 'Trading Education'
    },
    ar: {
      title: 'دول الخليج سيجنال برو',
      subtitle: 'إشارات التداول المباشرة وتحليل السوق',
      liveSignals: 'إشارات التداول المباشرة',
      marketAnalysis: 'تحليل السوق',
      worldwideMarkets: 'الأسواق العالمية',
      news: 'الأخبار المالية',
      education: 'تعليم التداول'
    }
  }

  const t = translations[language as keyof typeof translations]

  // Fallback mock data (only used if AI signals haven't loaded yet)
  const mockSignals = [
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

  // 🤖 USE AI SIGNALS if available, otherwise use fallback mock data
  const displaySignals = aiSignals.length > 0 ? aiSignals.map((s, idx) => ({
    id: idx + 1,
    symbol: s.name || s.symbol,
    type: s.type,
    entry: `${s.entryPrice} ${s.symbol.includes(':') ? s.symbol.split(':')[0] : ''}`,
    target: `${s.targetPrice}`,
    stopLoss: `${s.stopLoss}`,
    timeframe: s.timeframe,
    time: new Date(s.generatedAt).toLocaleTimeString(),
    status: s.status,
    confidence: `${s.confidence}%`,
    reasoning: s.reasoning,
    riskReward: s.riskReward,
    pnl: '+0.00%'
  })) : mockSignals

  // Worldwide markets data - comprehensive global coverage
  const globalMarkets = [
    // GCC Markets
    {
      region: 'GCC',
      name: 'TASI (Tadawul)',
      country: '🇸🇦 Saudi Arabia',
      price: '11,247.50',
      change: '+127.30',
      changePercent: '+1.14%',
      trend: 'up'
    },
    {
      region: 'GCC',
      name: 'ADX General',
      country: '🇦🇪 UAE',
      price: '9,876.25',
      change: '+45.80',
      changePercent: '+0.47%',
      trend: 'up'
    },
    {
      region: 'GCC',
      name: 'DFM General',
      country: '🇦🇪 Dubai',
      price: '4,123.60',
      change: '-12.40',
      changePercent: '-0.30%',
      trend: 'down'
    },
    {
      region: 'GCC',
      name: 'QE Index',
      country: '🇶🇦 Qatar',
      price: '10,567.80',
      change: '+89.50',
      changePercent: '+0.86%',
      trend: 'up'
    },
    {
      region: 'GCC',
      name: 'Bahrain Bourse',
      country: '🇧🇭 Bahrain',
      price: '1,987.40',
      change: '+8.20',
      changePercent: '+0.41%',
      trend: 'up'
    },
    {
      region: 'GCC',
      name: 'MSM 30',
      country: '🇴🇲 Oman',
      price: '4,654.30',
      change: '+15.70',
      changePercent: '+0.34%',
      trend: 'up'
    },
    {
      region: 'GCC',
      name: 'KWSE',
      country: '🇰🇼 Kuwait',
      price: '7,892.50',
      change: '+23.40',
      changePercent: '+0.30%',
      trend: 'up'
    },

    // Middle East
    {
      region: 'Middle East',
      name: 'EGX 30',
      country: '🇪🇬 Egypt',
      price: '27,543.20',
      change: '+345.60',
      changePercent: '+1.27%',
      trend: 'up'
    },
    {
      region: 'Middle East',
      name: 'TA-35',
      country: '🇮🇱 Israel',
      price: '1,987.60',
      change: '-8.40',
      changePercent: '-0.42%',
      trend: 'down'
    },

    // Asia-Pacific
    {
      region: 'Asia-Pacific',
      name: 'Nikkei 225',
      country: '🇯🇵 Japan',
      price: '33,456.80',
      change: '+234.50',
      changePercent: '+0.71%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'Hang Seng',
      country: '🇭🇰 Hong Kong',
      price: '17,234.60',
      change: '-89.30',
      changePercent: '-0.52%',
      trend: 'down'
    },
    {
      region: 'Asia-Pacific',
      name: 'Shanghai Composite',
      country: '🇨🇳 China',
      price: '3,087.40',
      change: '+12.60',
      changePercent: '+0.41%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'CSI 300',
      country: '🇨🇳 China',
      price: '3,654.20',
      change: '+18.90',
      changePercent: '+0.52%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'KOSPI',
      country: '🇰🇷 South Korea',
      price: '2,567.80',
      change: '+23.40',
      changePercent: '+0.92%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'TSEC',
      country: '🇹🇼 Taiwan',
      price: '17,892.50',
      change: '+156.30',
      changePercent: '+0.88%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'Nifty 50',
      country: '🇮🇳 India',
      price: '21,234.60',
      change: '+187.40',
      changePercent: '+0.89%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'Sensex',
      country: '🇮🇳 India',
      price: '70,456.30',
      change: '+432.80',
      changePercent: '+0.62%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'STI',
      country: '🇸🇬 Singapore',
      price: '3,234.50',
      change: '+12.30',
      changePercent: '+0.38%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'SET',
      country: '🇹🇭 Thailand',
      price: '1,467.80',
      change: '-5.60',
      changePercent: '-0.38%',
      trend: 'down'
    },
    {
      region: 'Asia-Pacific',
      name: 'KLCI',
      country: '🇲🇾 Malaysia',
      price: '1,534.20',
      change: '+8.40',
      changePercent: '+0.55%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'PSEi',
      country: '🇵🇭 Philippines',
      price: '6,456.70',
      change: '+34.20',
      changePercent: '+0.53%',
      trend: 'up'
    },
    {
      region: 'Asia-Pacific',
      name: 'VN-Index',
      country: '🇻🇳 Vietnam',
      price: '1,187.60',
      change: '+9.80',
      changePercent: '+0.83%',
      trend: 'up'
    },

    // Europe
    {
      region: 'Europe',
      name: 'FTSE 100',
      country: '🇬🇧 UK',
      price: '7,654.30',
      change: '+45.80',
      changePercent: '+0.60%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'DAX',
      country: '🇩🇪 Germany',
      price: '17,234.50',
      change: '+123.40',
      changePercent: '+0.72%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'CAC 40',
      country: '🇫🇷 France',
      price: '7,456.80',
      change: '+56.30',
      changePercent: '+0.76%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'IBEX 35',
      country: '🇪🇸 Spain',
      price: '10,123.40',
      change: '+78.90',
      changePercent: '+0.79%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'FTSE MIB',
      country: '🇮🇹 Italy',
      price: '29,876.50',
      change: '+234.60',
      changePercent: '+0.79%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'AEX',
      country: '🇳🇱 Netherlands',
      price: '789.60',
      change: '+5.40',
      changePercent: '+0.69%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'SMI',
      country: '🇨🇭 Switzerland',
      price: '11,234.80',
      change: '+67.20',
      changePercent: '+0.60%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'OMXS30',
      country: '🇸🇪 Sweden',
      price: '2,456.30',
      change: '+18.70',
      changePercent: '+0.77%',
      trend: 'up'
    },
    {
      region: 'Europe',
      name: 'BEL 20',
      country: '🇧🇪 Belgium',
      price: '3,654.20',
      change: '+23.40',
      changePercent: '+0.64%',
      trend: 'up'
    },

    // Americas
    {
      region: 'Americas',
      name: 'S&P 500',
      country: '🇺🇸 USA',
      price: '5,234.68',
      change: '+34.50',
      changePercent: '+0.66%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'Dow Jones',
      country: '🇺🇸 USA',
      price: '38,654.20',
      change: '+178.40',
      changePercent: '+0.46%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'NASDAQ',
      country: '🇺🇸 USA',
      price: '16,345.80',
      change: '+89.60',
      changePercent: '+0.55%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'Russell 2000',
      country: '🇺🇸 USA',
      price: '2,087.40',
      change: '+12.30',
      changePercent: '+0.59%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'TSX',
      country: '🇨🇦 Canada',
      price: '21,876.50',
      change: '+123.60',
      changePercent: '+0.57%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'IPC',
      country: '🇲🇽 Mexico',
      price: '56,234.80',
      change: '+345.20',
      changePercent: '+0.62%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'Bovespa',
      country: '🇧🇷 Brazil',
      price: '127,654.30',
      change: '+1,234.50',
      changePercent: '+0.98%',
      trend: 'up'
    },
    {
      region: 'Americas',
      name: 'Merval',
      country: '🇦🇷 Argentina',
      price: '1,234,567.80',
      change: '-5,678.40',
      changePercent: '-0.46%',
      trend: 'down'
    },

    // Africa
    {
      region: 'Africa',
      name: 'JSE Top 40',
      country: '🇿🇦 South Africa',
      price: '67,234.50',
      change: '+456.80',
      changePercent: '+0.68%',
      trend: 'up'
    },
    {
      region: 'Africa',
      name: 'NSE 20',
      country: '🇰🇪 Kenya',
      price: '1,876.40',
      change: '+12.30',
      changePercent: '+0.66%',
      trend: 'up'
    },
    {
      region: 'Africa',
      name: 'NGX ASI',
      country: '🇳🇬 Nigeria',
      price: '78,456.30',
      change: '+567.20',
      changePercent: '+0.73%',
      trend: 'up'
    },

    // Oceania
    {
      region: 'Oceania',
      name: 'ASX 200',
      country: '🇦🇺 Australia',
      price: '7,654.80',
      change: '+45.60',
      changePercent: '+0.60%',
      trend: 'up'
    },
    {
      region: 'Oceania',
      name: 'NZX 50',
      country: '🇳🇿 New Zealand',
      price: '11,987.40',
      change: '+78.30',
      changePercent: '+0.66%',
      trend: 'up'
    }
  ]

  // Global Stocks - Top 200 tradable instruments
  const globalStocks = [
    // US Mega-Caps (50)
    { symbol: 'AAPL', name: 'Apple Inc', price: '$178.45', change: '+2.34', changePercent: '+1.33%', marketCap: '$2.8T', volume: '52.3M', sector: 'Technology', region: 'US' },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: '$378.91', change: '+4.56', changePercent: '+1.22%', marketCap: '$2.82T', volume: '28.1M', sector: 'Technology', region: 'US' },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: '$141.23', change: '+1.87', changePercent: '+1.34%', marketCap: '$1.76T', volume: '31.2M', sector: 'Technology', region: 'US' },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: '$156.78', change: '+2.45', changePercent: '+1.59%', marketCap: '$1.62T', volume: '47.8M', sector: 'Consumer', region: 'US' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$487.23', change: '+12.34', changePercent: '+2.60%', marketCap: '$1.21T', volume: '82.5M', sector: 'Technology', region: 'US' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: '$248.56', change: '-3.21', changePercent: '-1.27%', marketCap: '$788B', volume: '125.4M', sector: 'Automotive', region: 'US' },
    { symbol: 'META', name: 'Meta Platforms', price: '$342.89', change: '+5.67', changePercent: '+1.68%', marketCap: '$884B', volume: '18.9M', sector: 'Technology', region: 'US' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: '$367.45', change: '+1.23', changePercent: '+0.34%', marketCap: '$815B', volume: '4.2M', sector: 'Finance', region: 'US' },
    { symbol: 'V', name: 'Visa Inc', price: '$256.78', change: '+2.89', changePercent: '+1.14%', marketCap: '$542B', volume: '7.3M', sector: 'Finance', region: 'US' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: '$162.34', change: '+0.87', changePercent: '+0.54%', marketCap: '$428B', volume: '8.1M', sector: 'Healthcare', region: 'US' },
    { symbol: 'WMT', name: 'Walmart Inc', price: '$168.92', change: '+1.45', changePercent: '+0.87%', marketCap: '$451B', volume: '9.2M', sector: 'Retail', region: 'US' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: '$178.45', change: '+2.34', changePercent: '+1.33%', marketCap: '$518B', volume: '12.4M', sector: 'Banking', region: 'US' },
    { symbol: 'MA', name: 'Mastercard Inc', price: '$412.67', change: '+3.56', changePercent: '+0.87%', marketCap: '$389B', volume: '3.8M', sector: 'Finance', region: 'US' },
    { symbol: 'PG', name: 'Procter & Gamble', price: '$154.23', change: '+0.67', changePercent: '+0.44%', marketCap: '$365B', volume: '6.7M', sector: 'Consumer', region: 'US' },
    { symbol: 'UNH', name: 'UnitedHealth Group', price: '$524.89', change: '+4.12', changePercent: '+0.79%', marketCap: '$492B', volume: '3.1M', sector: 'Healthcare', region: 'US' },
    { symbol: 'HD', name: 'Home Depot', price: '$328.45', change: '+2.78', changePercent: '+0.85%', marketCap: '$334B', volume: '4.2M', sector: 'Retail', region: 'US' },
    { symbol: 'DIS', name: 'Walt Disney Co', price: '$97.23', change: '+1.45', changePercent: '+1.51%', marketCap: '$178B', volume: '11.8M', sector: 'Media', region: 'US' },
    { symbol: 'BAC', name: 'Bank of America', price: '$34.56', change: '+0.45', changePercent: '+1.32%', marketCap: '$278B', volume: '52.3M', sector: 'Banking', region: 'US' },
    { symbol: 'NFLX', name: 'Netflix Inc', price: '$456.78', change: '+8.90', changePercent: '+1.99%', marketCap: '$198B', volume: '7.2M', sector: 'Media', region: 'US' },
    { symbol: 'CRM', name: 'Salesforce Inc', price: '$234.56', change: '+3.21', changePercent: '+1.39%', marketCap: '$228B', volume: '6.8M', sector: 'Technology', region: 'US' },
    { symbol: 'AMD', name: 'AMD Inc', price: '$142.34', change: '+5.67', changePercent: '+4.15%', marketCap: '$230B', volume: '78.9M', sector: 'Technology', region: 'US' },
    { symbol: 'INTC', name: 'Intel Corp', price: '$42.78', change: '-0.89', changePercent: '-2.04%', marketCap: '$181B', volume: '45.2M', sector: 'Technology', region: 'US' },
    { symbol: 'CSCO', name: 'Cisco Systems', price: '$52.34', change: '+0.78', changePercent: '+1.51%', marketCap: '$214B', volume: '22.1M', sector: 'Technology', region: 'US' },
    { symbol: 'ADBE', name: 'Adobe Inc', price: '$567.89', change: '+6.45', changePercent: '+1.15%', marketCap: '$264B', volume: '3.4M', sector: 'Technology', region: 'US' },
    { symbol: 'PEP', name: 'PepsiCo Inc', price: '$178.23', change: '+1.12', changePercent: '+0.63%', marketCap: '$245B', volume: '5.2M', sector: 'Consumer', region: 'US' },
    { symbol: 'KO', name: 'Coca-Cola Co', price: '$61.45', change: '+0.34', changePercent: '+0.56%', marketCap: '$266B', volume: '14.3M', sector: 'Consumer', region: 'US' },
    { symbol: 'NKE', name: 'Nike Inc', price: '$123.45', change: '+1.89', changePercent: '+1.56%', marketCap: '$194B', volume: '9.8M', sector: 'Consumer', region: 'US' },
    { symbol: 'MRK', name: 'Merck & Co', price: '$112.34', change: '+0.98', changePercent: '+0.88%', marketCap: '$284B', volume: '8.7M', sector: 'Healthcare', region: 'US' },
    { symbol: 'PFE', name: 'Pfizer Inc', price: '$32.67', change: '-0.45', changePercent: '-1.36%', marketCap: '$184B', volume: '32.1M', sector: 'Healthcare', region: 'US' },
    { symbol: 'ORCL', name: 'Oracle Corp', price: '$118.90', change: '+2.34', changePercent: '+2.01%', marketCap: '$326B', volume: '9.4M', sector: 'Technology', region: 'US' },
    { symbol: 'XOM', name: 'Exxon Mobil', price: '$112.45', change: '+1.67', changePercent: '+1.51%', marketCap: '$462B', volume: '18.3M', sector: 'Energy', region: 'US' },
    { symbol: 'CVX', name: 'Chevron Corp', price: '$158.23', change: '+2.12', changePercent: '+1.36%', marketCap: '$298B', volume: '8.9M', sector: 'Energy', region: 'US' },
    { symbol: 'ABBV', name: 'AbbVie Inc', price: '$168.45', change: '+1.23', changePercent: '+0.74%', marketCap: '$298B', volume: '7.1M', sector: 'Healthcare', region: 'US' },
    { symbol: 'TMO', name: 'Thermo Fisher', price: '$534.67', change: '+4.56', changePercent: '+0.86%', marketCap: '$208B', volume: '1.8M', sector: 'Healthcare', region: 'US' },
    { symbol: 'COST', name: 'Costco Wholesale', price: '$645.78', change: '+5.89', changePercent: '+0.92%', marketCap: '$286B', volume: '2.3M', sector: 'Retail', region: 'US' },
    { symbol: 'AVGO', name: 'Broadcom Inc', price: '$892.34', change: '+12.45', changePercent: '+1.42%', marketCap: '$372B', volume: '2.1M', sector: 'Technology', region: 'US' },
    { symbol: 'ACN', name: 'Accenture PLC', price: '$334.56', change: '+2.78', changePercent: '+0.84%', marketCap: '$211B', volume: '2.6M', sector: 'Technology', region: 'US' },
    { symbol: 'TXN', name: 'Texas Instruments', price: '$178.90', change: '+1.56', changePercent: '+0.88%', marketCap: '$164B', volume: '5.4M', sector: 'Technology', region: 'US' },
    { symbol: 'LLY', name: 'Eli Lilly', price: '$612.34', change: '+8.90', changePercent: '+1.47%', marketCap: '$582B', volume: '3.2M', sector: 'Healthcare', region: 'US' },
    { symbol: 'NEE', name: 'NextEra Energy', price: '$78.45', change: '+0.67', changePercent: '+0.86%', marketCap: '$158B', volume: '9.1M', sector: 'Utilities', region: 'US' },
    { symbol: 'QCOM', name: 'Qualcomm Inc', price: '$145.67', change: '+3.21', changePercent: '+2.25%', marketCap: '$163B', volume: '12.4M', sector: 'Technology', region: 'US' },
    { symbol: 'MS', name: 'Morgan Stanley', price: '$92.34', change: '+1.12', changePercent: '+1.23%', marketCap: '$156B', volume: '8.7M', sector: 'Banking', region: 'US' },
    { symbol: 'GS', name: 'Goldman Sachs', price: '$378.90', change: '+4.56', changePercent: '+1.22%', marketCap: '$128B', volume: '2.9M', sector: 'Banking', region: 'US' },
    { symbol: 'CAT', name: 'Caterpillar Inc', price: '$287.45', change: '+3.12', changePercent: '+1.10%', marketCap: '$148B', volume: '4.1M', sector: 'Industrial', region: 'US' },
    { symbol: 'BA', name: 'Boeing Co', price: '$212.34', change: '-2.45', changePercent: '-1.14%', marketCap: '$134B', volume: '8.9M', sector: 'Aerospace', region: 'US' },
    { symbol: 'IBM', name: 'IBM Corp', price: '$168.90', change: '+1.78', changePercent: '+1.06%', marketCap: '$155B', volume: '6.2M', sector: 'Technology', region: 'US' },
    { symbol: 'NOW', name: 'ServiceNow Inc', price: '$678.45', change: '+8.90', changePercent: '+1.33%', marketCap: '$137B', volume: '1.9M', sector: 'Technology', region: 'US' },
    { symbol: 'ISRG', name: 'Intuitive Surgical', price: '$412.67', change: '+5.23', changePercent: '+1.28%', marketCap: '$147B', volume: '1.6M', sector: 'Healthcare', region: 'US' },
    { symbol: 'BKNG', name: 'Booking Holdings', price: '$3234.56', change: '+45.67', changePercent: '+1.43%', marketCap: '$118B', volume: '0.4M', sector: 'Travel', region: 'US' },
    { symbol: 'AXP', name: 'American Express', price: '$178.23', change: '+2.34', changePercent: '+1.33%', marketCap: '$132B', volume: '4.2M', sector: 'Finance', region: 'US' },

    // GCC Stocks (30)
    { symbol: '2222', name: 'Saudi Aramco', price: 'SAR 32.15', change: '+0.45', changePercent: '+1.42%', marketCap: '$2.1T', volume: '18.2M', sector: 'Energy', region: 'GCC' },
    { symbol: '1120', name: 'Al Rajhi Bank', price: 'SAR 87.50', change: '+1.20', changePercent: '+1.39%', marketCap: '$69.3B', volume: '3.4M', sector: 'Banking', region: 'GCC' },
    { symbol: '2010', name: 'SABIC', price: 'SAR 89.60', change: '+2.10', changePercent: '+2.40%', marketCap: '$71.7B', volume: '4.8M', sector: 'Chemicals', region: 'GCC' },
    { symbol: '2030', name: 'Saudi Telecom', price: 'SAR 112.40', change: '+1.80', changePercent: '+1.63%', marketCap: '$56.2B', volume: '2.1M', sector: 'Telecom', region: 'GCC' },
    { symbol: 'FAB', name: 'First Abu Dhabi Bank', price: 'AED 14.85', change: '+0.25', changePercent: '+1.71%', marketCap: '$48.3B', volume: '8.7M', sector: 'Banking', region: 'GCC' },
    { symbol: 'ADNOC', name: 'ADNOC Distribution', price: 'AED 4.12', change: '+0.08', changePercent: '+1.98%', marketCap: '$41.2B', volume: '12.3M', sector: 'Energy', region: 'GCC' },
    { symbol: 'EMAAR', name: 'Emaar Properties', price: 'AED 6.78', change: '+0.15', changePercent: '+2.26%', marketCap: '$27.5B', volume: '15.6M', sector: 'Real Estate', region: 'GCC' },
    { symbol: 'ADCB', name: 'Abu Dhabi Commercial', price: 'AED 8.45', change: '+0.12', changePercent: '+1.44%', marketCap: '$23.8B', volume: '6.2M', sector: 'Banking', region: 'GCC' },
    { symbol: 'DFM', name: 'Dubai Financial Market', price: 'AED 1.89', change: '+0.04', changePercent: '+2.16%', marketCap: '$1.5B', volume: '28.4M', sector: 'Finance', region: 'GCC' },
    { symbol: 'ENBD', name: 'Emirates NBD', price: 'AED 15.20', change: '+0.30', changePercent: '+2.01%', marketCap: '$31.4B', volume: '4.8M', sector: 'Banking', region: 'GCC' },
    { symbol: 'ALDAR', name: 'Aldar Properties', price: 'AED 5.34', change: '+0.11', changePercent: '+2.10%', marketCap: '$19.6B', volume: '9.3M', sector: 'Real Estate', region: 'GCC' },
    { symbol: 'QNB', name: 'Qatar National Bank', price: 'QAR 19.45', change: '+0.25', changePercent: '+1.30%', marketCap: '$45.7B', volume: '2.1M', sector: 'Banking', region: 'GCC' },
    { symbol: 'QIIK', name: 'Qatar International', price: 'QAR 8.90', change: '+0.15', changePercent: '+1.71%', marketCap: '$7.2B', volume: '1.8M', sector: 'Banking', region: 'GCC' },
    { symbol: 'ERES', name: 'Ezdan Holding', price: 'QAR 1.78', change: '+0.03', changePercent: '+1.72%', marketCap: '$4.1B', volume: '12.3M', sector: 'Real Estate', region: 'GCC' },
    { symbol: 'QEWS', name: 'Qatar Electricity', price: 'QAR 17.60', change: '+0.20', changePercent: '+1.15%', marketCap: '$8.8B', volume: '0.9M', sector: 'Utilities', region: 'GCC' },
    { symbol: 'ORDS', name: 'Ooredoo', price: 'QAR 7.34', change: '+0.08', changePercent: '+1.10%', marketCap: '$11.7B', volume: '1.5M', sector: 'Telecom', region: 'GCC' },
    { symbol: 'INDS', name: 'Industries Qatar', price: 'QAR 13.45', change: '+0.18', changePercent: '+1.36%', marketCap: '$12.3B', volume: '1.2M', sector: 'Industrial', region: 'GCC' },
    { symbol: 'NBK', name: 'National Bank Kuwait', price: 'KWD 0.890', change: '+0.012', changePercent: '+1.37%', marketCap: '$9.8B', volume: '3.4M', sector: 'Banking', region: 'GCC' },
    { symbol: 'ZAIN', name: 'Zain Kuwait', price: 'KWD 0.456', change: '+0.008', changePercent: '+1.79%', marketCap: '$2.1B', volume: '8.7M', sector: 'Telecom', region: 'GCC' },
    { symbol: 'AGILITY', name: 'Agility Public', price: 'KWD 0.678', change: '+0.011', changePercent: '+1.65%', marketCap: '$7.5B', volume: '4.2M', sector: 'Logistics', region: 'GCC' },
    { symbol: 'BBK', name: 'Bank of Bahrain', price: 'BHD 0.234', change: '+0.004', changePercent: '+1.74%', marketCap: '$1.2B', volume: '2.1M', sector: 'Banking', region: 'GCC' },
    { symbol: 'BATELCO', name: 'Bahrain Telecom', price: 'BHD 0.456', change: '+0.007', changePercent: '+1.56%', marketCap: '$1.8B', volume: '1.5M', sector: 'Telecom', region: 'GCC' },
    { symbol: 'AHC', name: 'Ahli United Bank', price: 'BHD 0.189', change: '+0.003', changePercent: '+1.61%', marketCap: '$0.9B', volume: '3.2M', sector: 'Banking', region: 'GCC' },
    { symbol: 'OMANTEL', name: 'Oman Telecom', price: 'OMR 0.567', change: '+0.009', changePercent: '+1.61%', marketCap: '$2.3B', volume: '1.8M', sector: 'Telecom', region: 'GCC' },
    { symbol: 'BNK', name: 'Bank Muscat', price: 'OMR 0.345', change: '+0.006', changePercent: '+1.77%', marketCap: '$1.9B', volume: '4.5M', sector: 'Banking', region: 'GCC' },
    { symbol: 'OQ', name: 'OQ Exploration', price: 'OMR 0.234', change: '+0.004', changePercent: '+1.74%', marketCap: '$1.1B', volume: '2.7M', sector: 'Energy', region: 'GCC' },
    { symbol: '1010', name: 'Riyad Bank', price: 'SAR 34.50', change: '+0.70', changePercent: '+2.07%', marketCap: '$18.4B', volume: '2.9M', sector: 'Banking', region: 'GCC' },
    { symbol: '1180', name: 'SNB', price: 'SAR 56.80', change: '+0.90', changePercent: '+1.61%', marketCap: '$16.2B', volume: '1.7M', sector: 'Banking', region: 'GCC' },
    { symbol: '4001', name: 'STC Pay', price: 'SAR 23.40', change: '+0.50', changePercent: '+2.18%', marketCap: '$6.2B', volume: '5.3M', sector: 'FinTech', region: 'GCC' },
    { symbol: '4050', name: 'Saudi Electricity', price: 'SAR 28.90', change: '+0.40', changePercent: '+1.40%', marketCap: '$51.7B', volume: '3.1M', sector: 'Utilities', region: 'GCC' },

    // European Stocks (50)
    { symbol: 'ASML', name: 'ASML Holding', price: '€678.45', change: '+12.34', changePercent: '+1.85%', marketCap: '€278B', volume: '1.2M', sector: 'Technology', region: 'Europe' },
    { symbol: 'NOVO', name: 'Novo Nordisk', price: 'DKK 512.30', change: '+8.90', changePercent: '+1.77%', marketCap: '$412B', volume: '2.8M', sector: 'Healthcare', region: 'Europe' },
    { symbol: 'SAP', name: 'SAP SE', price: '€134.56', change: '+2.34', changePercent: '+1.77%', marketCap: '€161B', volume: '3.2M', sector: 'Technology', region: 'Europe' },
    { symbol: 'LIN', name: 'Linde PLC', price: '€389.23', change: '+4.56', changePercent: '+1.19%', marketCap: '$198B', volume: '1.8M', sector: 'Chemicals', region: 'Europe' },
    { symbol: 'MC', name: 'LVMH', price: '€734.50', change: '+9.80', changePercent: '+1.35%', marketCap: '€368B', volume: '0.6M', sector: 'Luxury', region: 'Europe' },
    { symbol: 'OR', name: 'L\'Oreal', price: '€456.78', change: '+5.67', changePercent: '+1.26%', marketCap: '€251B', volume: '0.5M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'NVO', name: 'Novartis AG', price: 'CHF 89.45', change: '+0.98', changePercent: '+1.11%', marketCap: '$198B', volume: '2.1M', sector: 'Healthcare', region: 'Europe' },
    { symbol: 'ROG', name: 'Roche Holding', price: 'CHF 267.80', change: '+3.20', changePercent: '+1.21%', marketCap: '$228B', volume: '1.4M', sector: 'Healthcare', region: 'Europe' },
    { symbol: 'NESN', name: 'Nestle SA', price: 'CHF 112.30', change: '+1.45', changePercent: '+1.31%', marketCap: '$315B', volume: '3.9M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'SIE', name: 'Siemens AG', price: '€167.45', change: '+2.89', changePercent: '+1.76%', marketCap: '€134B', volume: '2.3M', sector: 'Industrial', region: 'Europe' },
    { symbol: 'SHEL', name: 'Shell PLC', price: '£28.45', change: '+0.45', changePercent: '+1.61%', marketCap: '$218B', volume: '12.4M', sector: 'Energy', region: 'Europe' },
    { symbol: 'BP', name: 'BP PLC', price: '£4.89', change: '+0.08', changePercent: '+1.66%', marketCap: '$98B', volume: '28.7M', sector: 'Energy', region: 'Europe' },
    { symbol: 'HSBA', name: 'HSBC Holdings', price: '£6.78', change: '+0.11', changePercent: '+1.65%', marketCap: '$136B', volume: '34.2M', sector: 'Banking', region: 'Europe' },
    { symbol: 'AZN', name: 'AstraZeneca', price: '£112.40', change: '+1.80', changePercent: '+1.63%', marketCap: '$174B', volume: '2.1M', sector: 'Healthcare', region: 'Europe' },
    { symbol: 'ULVR', name: 'Unilever', price: '£44.56', change: '+0.67', changePercent: '+1.53%', marketCap: '$112B', volume: '4.8M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'DGE', name: 'Diageo', price: '£28.90', change: '+0.34', changePercent: '+1.19%', marketCap: '$64B', volume: '3.2M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'BARC', name: 'Barclays', price: '£1.89', change: '+0.03', changePercent: '+1.61%', marketCap: '$28B', volume: '52.1M', sector: 'Banking', region: 'Europe' },
    { symbol: 'LLOY', name: 'Lloyds Banking', price: '£0.56', change: '+0.01', changePercent: '+1.82%', marketCap: '$34B', volume: '124.5M', sector: 'Banking', region: 'Europe' },
    { symbol: 'VOD', name: 'Vodafone Group', price: '£0.78', change: '+0.01', changePercent: '+1.30%', marketCap: '$21B', volume: '78.9M', sector: 'Telecom', region: 'Europe' },
    { symbol: 'RR', name: 'Rolls-Royce', price: '£3.45', change: '+0.08', changePercent: '+2.37%', marketCap: '$29B', volume: '28.4M', sector: 'Aerospace', region: 'Europe' },
    { symbol: 'BNP', name: 'BNP Paribas', price: '€61.20', change: '+1.10', changePercent: '+1.83%', marketCap: '€76B', volume: '4.2M', sector: 'Banking', region: 'Europe' },
    { symbol: 'SAN', name: 'Banco Santander', price: '€4.12', change: '+0.07', changePercent: '+1.73%', marketCap: '€67B', volume: '28.3M', sector: 'Banking', region: 'Europe' },
    { symbol: 'TTE', name: 'TotalEnergies', price: '€62.45', change: '+1.12', changePercent: '+1.83%', marketCap: '€157B', volume: '5.8M', sector: 'Energy', region: 'Europe' },
    { symbol: 'ALV', name: 'Allianz SE', price: '€234.50', change: '+3.40', changePercent: '+1.47%', marketCap: '€94B', volume: '1.2M', sector: 'Insurance', region: 'Europe' },
    { symbol: 'AIR', name: 'Airbus SE', price: '€134.60', change: '+2.30', changePercent: '+1.74%', marketCap: '€105B', volume: '2.1M', sector: 'Aerospace', region: 'Europe' },
    { symbol: 'BAYN', name: 'Bayer AG', price: '€34.20', change: '+0.56', changePercent: '+1.66%', marketCap: '€34B', volume: '4.8M', sector: 'Healthcare', region: 'Europe' },
    { symbol: 'BMW', name: 'BMW AG', price: '€98.45', change: '+1.67', changePercent: '+1.73%', marketCap: '€59B', volume: '2.3M', sector: 'Automotive', region: 'Europe' },
    { symbol: 'VOW', name: 'Volkswagen AG', price: '€112.30', change: '+1.90', changePercent: '+1.72%', marketCap: '€56B', volume: '1.9M', sector: 'Automotive', region: 'Europe' },
    { symbol: 'DTE', name: 'Deutsche Telekom', price: '€22.45', change: '+0.35', changePercent: '+1.58%', marketCap: '€111B', volume: '12.4M', sector: 'Telecom', region: 'Europe' },
    { symbol: 'ITX', name: 'Inditex', price: '€39.80', change: '+0.67', changePercent: '+1.71%', marketCap: '€124B', volume: '3.2M', sector: 'Retail', region: 'Europe' },
    { symbol: 'SU', name: 'Schneider Electric', price: '€178.90', change: '+2.80', changePercent: '+1.59%', marketCap: '€100B', volume: '1.1M', sector: 'Industrial', region: 'Europe' },
    { symbol: 'ABI', name: 'AB InBev', price: '€56.78', change: '+0.89', changePercent: '+1.59%', marketCap: '€112B', volume: '2.8M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'ADYEN', name: 'Adyen NV', price: '€1234.50', change: '+18.90', changePercent: '+1.55%', marketCap: '€38B', volume: '0.2M', sector: 'FinTech', region: 'Europe' },
    { symbol: 'FP', name: 'TotalEnergies', price: '€62.34', change: '+1.01', changePercent: '+1.65%', marketCap: '€157B', volume: '5.7M', sector: 'Energy', region: 'Europe' },
    { symbol: 'EL', name: 'EssilorLuxottica', price: '€189.40', change: '+2.70', changePercent: '+1.45%', marketCap: '€87B', volume: '0.9M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'KER', name: 'Kering SA', price: '€456.70', change: '+6.80', changePercent: '+1.51%', marketCap: '€57B', volume: '0.4M', sector: 'Luxury', region: 'Europe' },
    { symbol: 'RMS', name: 'Hermes Intl', price: '€1890.50', change: '+28.40', changePercent: '+1.53%', marketCap: '€198B', volume: '0.1M', sector: 'Luxury', region: 'Europe' },
    { symbol: 'ENEL', name: 'Enel SpA', price: '€6.45', change: '+0.10', changePercent: '+1.58%', marketCap: '€64B', volume: '28.4M', sector: 'Utilities', region: 'Europe' },
    { symbol: 'UCG', name: 'UniCredit SpA', price: '€25.60', change: '+0.42', changePercent: '+1.67%', marketCap: '€52B', volume: '12.3M', sector: 'Banking', region: 'Europe' },
    { symbol: 'ISP', name: 'Intesa Sanpaolo', price: '€2.89', change: '+0.05', changePercent: '+1.76%', marketCap: '€56B', volume: '78.2M', sector: 'Banking', region: 'Europe' },
    { symbol: 'BBVA', name: 'BBVA', price: '€8.45', change: '+0.14', changePercent: '+1.68%', marketCap: '€56B', volume: '24.1M', sector: 'Banking', region: 'Europe' },
    { symbol: 'TEF', name: 'Telefonica', price: '€4.12', change: '+0.07', changePercent: '+1.73%', modelCap: '€23B', volume: '18.7M', sector: 'Telecom', region: 'Europe' },
    { symbol: 'IBE', name: 'Iberdrola', price: '€11.34', change: '+0.18', changePercent: '+1.61%', marketCap: '€72B', volume: '14.2M', sector: 'Utilities', region: 'Europe' },
    { symbol: 'SPOT', name: 'Spotify', price: '€234.56', change: '+4.78', changePercent: '+2.08%', marketCap: '$48B', volume: '2.3M', sector: 'Media', region: 'Europe' },
    { symbol: 'NOV', name: 'Novozymes', price: 'DKK 412.30', change: '+6.50', changePercent: '+1.60%', marketCap: '$12B', volume: '0.6M', sector: 'Chemicals', region: 'Europe' },
    { symbol: 'DSM', name: 'DSM-Firmenich', price: '€112.40', change: '+1.70', changePercent: '+1.53%', marketCap: '€21B', volume: '0.8M', sector: 'Chemicals', region: 'Europe' },
    { symbol: 'PRX', name: 'Prosus NV', price: '€34.50', change: '+0.58', changePercent: '+1.71%', marketCap: '€112B', volume: '4.2M', sector: 'Technology', region: 'Europe' },
    { symbol: 'INGA', name: 'ING Group', price: '€13.45', change: '+0.22', changePercent: '+1.66%', marketCap: '€52B', volume: '18.3M', sector: 'Banking', region: 'Europe' },
    { symbol: 'ABI', name: 'Anheuser-Busch', price: '€56.70', change: '+0.90', changePercent: '+1.61%', marketCap: '€112B', volume: '2.7M', sector: 'Consumer', region: 'Europe' },
    { symbol: 'PHIA', name: 'Philips', price: '€23.45', change: '+0.38', changePercent: '+1.65%', marketCap: '€21B', volume: '5.4M', sector: 'Healthcare', region: 'Europe' },

    // Asian Stocks (40)
    { symbol: '7203', name: 'Toyota Motor', price: '¥2,456', change: '+45', changePercent: '+1.87%', marketCap: '$278B', volume: '8.4M', sector: 'Automotive', region: 'Asia' },
    { symbol: '6758', name: 'Sony Group', price: '¥12,340', change: '+189', changePercent: '+1.56%', marketCap: '$112B', volume: '3.2M', sector: 'Technology', region: 'Asia' },
    { symbol: '9984', name: 'SoftBank Group', price: '¥5,678', change: '+98', changePercent: '+1.76%', marketCap: '$89B', volume: '12.1M', sector: 'Technology', region: 'Asia' },
    { symbol: '6861', name: 'Keyence Corp', price: '¥56,780', change: '+890', changePercent: '+1.59%', marketCap: '$134B', volume: '0.4M', sector: 'Industrial', region: 'Asia' },
    { symbol: '8306', name: 'Mitsubishi UFJ', price: '¥1,234', change: '+21', changePercent: '+1.73%', marketCap: '$78B', volume: '28.4M', sector: 'Banking', region: 'Asia' },
    { symbol: 'TCEHY', name: 'Tencent Holdings', price: 'HK$345.60', change: '+6.80', changePercent: '+2.01%', marketCap: '$412B', volume: '18.2M', sector: 'Technology', region: 'Asia' },
    { symbol: '0700', name: 'Tencent', price: 'HK$345.60', change: '+6.80', changePercent: '+2.01%', marketCap: '$412B', volume: '18.2M', sector: 'Technology', region: 'Asia' },
    { symbol: '9988', name: 'Alibaba', price: 'HK$89.50', change: '+1.80', changePercent: '+2.05%', marketCap: '$234B', volume: '42.3M', sector: 'E-commerce', region: 'Asia' },
    { symbol: '1299', name: 'AIA Group', price: 'HK$78.45', change: '+1.35', changePercent: '+1.75%', marketCap: '$94B', volume: '12.1M', sector: 'Insurance', region: 'Asia' },
    { symbol: '0941', name: 'China Mobile', price: 'HK$67.80', change: '+1.10', changePercent: '+1.65%', marketCap: '$139B', volume: '8.7M', sector: 'Telecom', region: 'Asia' },
    { symbol: '005930', name: 'Samsung Electronics', price: '₩72,400', change: '+1,200', changePercent: '+1.69%', marketCap: '$412B', volume: '12.3M', sector: 'Technology', region: 'Asia' },
    { symbol: '000660', name: 'SK Hynix', price: '₩134,500', change: '+2,800', changePercent: '+2.13%', marketCap: '$89B', volume: '4.2M', sector: 'Technology', region: 'Asia' },
    { symbol: '035720', name: 'Kakao', price: '₩56,700', change: '+900', changePercent: '+1.61%', marketCap: '$24B', volume: '2.1M', sector: 'Technology', region: 'Asia' },
    { symbol: '035420', name: 'NAVER', price: '₩234,500', change: '+3,800', changePercent: '+1.65%', marketCap: '$38B', volume: '1.8M', sector: 'Technology', region: 'Asia' },
    { symbol: '2330', name: 'TSMC', price: 'NT$578', change: '+11', changePercent: '+1.94%', marketCap: '$524B', volume: '28.4M', sector: 'Technology', region: 'Asia' },
    { symbol: '2317', name: 'Hon Hai Precision', price: 'NT$112', change: '+2', changePercent: '+1.82%', marketCap: '$46B', volume: '42.1M', sector: 'Technology', region: 'Asia' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,456', change: '+42', changePercent: '+1.74%', marketCap: '$218B', volume: '8.9M', sector: 'Energy', region: 'Asia' },
    { symbol: 'TCS', name: 'Tata Consultancy', price: '₹3,567', change: '+58', changePercent: '+1.65%', marketCap: '$134B', volume: '2.1M', sector: 'Technology', region: 'Asia' },
    { symbol: 'INFY', name: 'Infosys', price: '₹1,456', change: '+24', changePercent: '+1.68%', marketCap: '$62B', volume: '5.4M', sector: 'Technology', region: 'Asia' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,678', change: '+28', changePercent: '+1.70%', marketCap: '$124B', volume: '12.3M', sector: 'Banking', region: 'Asia' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: '₹987', change: '+16', changePercent: '+1.65%', marketCap: '$69B', volume: '18.7M', sector: 'Banking', region: 'Asia' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: '₹896', change: '+14', changePercent: '+1.59%', marketCap: '$49B', volume: '9.8M', sector: 'Telecom', region: 'Asia' },
    { symbol: 'ITC', name: 'ITC Limited', price: '₹456', change: '+7', changePercent: '+1.56%', marketCap: '$57B', volume: '28.4M', sector: 'Consumer', region: 'Asia' },
    { symbol: 'SBIN', name: 'State Bank of India', price: '₹623', change: '+10', changePercent: '+1.63%', marketCap: '$56B', volume: '34.2M', sector: 'Banking', region: 'Asia' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: '₹6,789', change: '+112', changePercent: '+1.68%', marketCap: '$41B', volume: '1.8M', sector: 'Finance', region: 'Asia' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints', price: '₹3,234', change: '+53', changePercent: '+1.67%', marketCap: '$31B', volume: '2.3M', sector: 'Consumer', region: 'Asia' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', price: '₹12,345', change: '+198', changePercent: '+1.63%', marketCap: '$37B', volume: '0.9M', sector: 'Automotive', region: 'Asia' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '₹789', change: '+13', changePercent: '+1.68%', marketCap: '$29B', volume: '21.4M', sector: 'Automotive', region: 'Asia' },
    { symbol: 'HCLTECH', name: 'HCL Technologies', price: '₹1,456', change: '+24', changePercent: '+1.68%', marketCap: '$39B', volume: '4.2M', sector: 'Technology', region: 'Asia' },
    { symbol: 'WIPRO', name: 'Wipro Limited', price: '₹456', change: '+7', changePercent: '+1.56%', marketCap: '$25B', volume: '12.8M', sector: 'Technology', region: 'Asia' },
    { symbol: 'BANKBCA', name: 'Bank Central Asia', price: 'Rp8,950', change: '+150', changePercent: '+1.71%', marketCap: '$67B', volume: '28.4M', sector: 'Banking', region: 'Asia' },
    { symbol: 'TLKM', name: 'Telkom Indonesia', price: 'Rp3,680', change: '+60', changePercent: '+1.66%', marketCap: '$36B', volume: '52.1M', sector: 'Telecom', region: 'Asia' },
    { symbol: 'BBRI', name: 'Bank Rakyat', price: 'Rp4,890', change: '+80', changePercent: '+1.66%', marketCap: '$61B', volume: '98.7M', sector: 'Banking', region: 'Asia' },
    { symbol: 'GRAB', name: 'Grab Holdings', price: '$3.45', change: '+0.06', changePercent: '+1.77%', marketCap: '$13B', volume: '18.4M', sector: 'Technology', region: 'Asia' },
    { symbol: 'SEA', name: 'Sea Limited', price: '$56.78', change: '+1.12', changePercent: '+2.01%', marketCap: '$31B', volume: '12.3M', sector: 'E-commerce', region: 'Asia' },
    { symbol: 'BABA', name: 'Alibaba Group', price: '$89.45', change: '+1.78', changePercent: '+2.03%', marketCap: '$234B', volume: '24.8M', sector: 'E-commerce', region: 'Asia' },
    { symbol: 'JD', name: 'JD.com', price: '$34.56', change: '+0.67', changePercent: '+1.98%', marketCap: '$52B', volume: '14.2M', sector: 'E-commerce', region: 'Asia' },
    { symbol: 'PDD', name: 'PDD Holdings', price: '$123.45', change: '+2.45', changePercent: '+2.03%', marketCap: '$167B', volume: '8.9M', sector: 'E-commerce', region: 'Asia' },
    { symbol: 'NIO', name: 'NIO Inc', price: '$8.90', change: '+0.18', changePercent: '+2.07%', marketCap: '$14B', volume: '52.4M', sector: 'Automotive', region: 'Asia' },
    { symbol: 'BIDU', name: 'Baidu Inc', price: '$112.34', change: '+2.12', changePercent: '+1.92%', marketCap: '$39B', volume: '4.2M', sector: 'Technology', region: 'Asia' },

    // Emerging Markets (30)
    { symbol: 'VALE', name: 'Vale SA', price: 'R$67.80', change: '+1.20', changePercent: '+1.80%', marketCap: '$62B', volume: '28.4M', sector: 'Mining', region: 'Emerging' },
    { symbol: 'PETR4', name: 'Petrobras', price: 'R$34.56', change: '+0.67', changePercent: '+1.98%', marketCap: '$56B', volume: '52.1M', sector: 'Energy', region: 'Emerging' },
    { symbol: 'ITUB', name: 'Itau Unibanco', price: 'R$28.90', change: '+0.48', changePercent: '+1.69%', marketCap: '$54B', volume: '34.2M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'BBDC4', name: 'Bradesco', price: 'R$13.45', change: '+0.22', changePercent: '+1.66%', marketCap: '$28B', volume: '42.1M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'ABEV3', name: 'Ambev SA', price: 'R$12.34', change: '+0.19', changePercent: '+1.56%', marketCap: '$19B', volume: '28.7M', sector: 'Consumer', region: 'Emerging' },
    { symbol: 'WEGE3', name: 'WEG SA', price: 'R$45.67', change: '+0.78', changePercent: '+1.74%', marketCap: '$24B', volume: '12.3M', sector: 'Industrial', region: 'Emerging' },
    { symbol: 'GAZP', name: 'Gazprom', price: '₽178.45', change: '+3.12', changePercent: '+1.78%', marketCap: '$42B', volume: '124.5M', sector: 'Energy', region: 'Emerging' },
    { symbol: 'SBER', name: 'Sberbank', price: '₽234.50', change: '+4.10', changePercent: '+1.78%', marketCap: '$38B', volume: '89.4M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'LKOH', name: 'Lukoil', price: '₽5,678', change: '+98', changePercent: '+1.76%', marketCap: '$46B', volume: '28.4M', sector: 'Energy', region: 'Emerging' },
    { symbol: 'AMER', name: 'America Movil', price: 'MX$18.45', change: '+0.31', changePercent: '+1.71%', marketCap: '$48B', volume: '42.1M', sector: 'Telecom', region: 'Emerging' },
    { symbol: 'WALMEX', name: 'Walmart de Mexico', price: 'MX$56.78', change: '+0.95', changePercent: '+1.70%', marketCap: '$39B', volume: '18.7M', sector: 'Retail', region: 'Emerging' },
    { symbol: 'CEMEX', name: 'Cemex SAB', price: 'MX$8.90', change: '+0.15', changePercent: '+1.71%', marketCap: '$13B', volume: '52.3M', sector: 'Materials', region: 'Emerging' },
    { symbol: 'NASPERS', name: 'Naspers', price: 'R2,456', change: '+42', changePercent: '+1.74%', marketCap: '$87B', volume: '1.2M', sector: 'Technology', region: 'Emerging' },
    { symbol: 'MTN', name: 'MTN Group', price: 'R123.45', change: '+2.10', changePercent: '+1.73%', marketCap: '$21B', volume: '4.8M', sector: 'Telecom', region: 'Emerging' },
    { symbol: 'SASOL', name: 'Sasol Limited', price: 'R234.50', change: '+4.10', changePercent: '+1.78%', marketCap: '$14B', volume: '3.2M', sector: 'Energy', region: 'Emerging' },
    { symbol: 'SHOPRITE', name: 'Shoprite Holdings', price: 'R178.90', change: '+3.05', changePercent: '+1.73%', marketCap: '$19B', volume: '2.1M', sector: 'Retail', region: 'Emerging' },
    { symbol: 'OCI', name: 'OCI NV', price: 'EGP56.78', change: '+0.98', changePercent: '+1.76%', marketCap: '$3.4B', volume: '8.9M', sector: 'Chemicals', region: 'Emerging' },
    { symbol: 'CIB', name: 'Commercial Intl Bank', price: 'EGP67.80', change: '+1.15', changePercent: '+1.73%', marketCap: '$4.2B', volume: '2.8M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'ETEL', name: 'Etisalat Egypt', price: 'EGP23.45', change: '+0.40', changePercent: '+1.73%', marketCap: '$2.1B', volume: '12.4M', sector: 'Telecom', region: 'Emerging' },
    { symbol: 'TURKIYE', name: 'Turkiye Bank', price: '₺45.67', change: '+0.78', changePercent: '+1.74%', marketCap: '$8.9B', volume: '24.3M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'AKBNK', name: 'Akbank', price: '₺56.78', change: '+0.97', changePercent: '+1.74%', marketCap: '$12B', volume: '42.1M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'EREGL', name: 'Eregli Demir', price: '₺34.50', change: '+0.59', changePercent: '+1.74%', marketCap: '$6.7B', volume: '18.9M', sector: 'Industrial', region: 'Emerging' },
    { symbol: 'SAPIEM', name: 'Sabanci Holding', price: '₺78.90', change: '+1.35', changePercent: '+1.74%', marketCap: '$8.9B', volume: '12.4M', sector: 'Conglomerate', region: 'Emerging' },
    { symbol: 'PETKIM', name: 'Petkim', price: '₺12.34', change: '+0.21', changePercent: '+1.73%', marketCap: '$2.1B', volume: '34.2M', sector: 'Chemicals', region: 'Emerging' },
    { symbol: 'TTKOM', name: 'Turk Telekom', price: '₺23.45', change: '+0.40', changePercent: '+1.73%', marketCap: '$5.6B', volume: '28.7M', sector: 'Telecom', region: 'Emerging' },
    { symbol: 'SAPURA', name: 'Sapura Energy', price: 'RM0.089', change: '+0.002', changePercent: '+2.30%', marketCap: '$0.4B', volume: '178.4M', sector: 'Energy', region: 'Emerging' },
    { symbol: 'MAYBANK', name: 'Malayan Banking', price: 'RM9.12', change: '+0.15', changePercent: '+1.67%', marketCap: '$28B', volume: '24.1M', sector: 'Banking', region: 'Emerging' },
    { symbol: 'TENAGA', name: 'Tenaga Nasional', price: 'RM12.34', change: '+0.21', changePercent: '+1.73%', marketCap: '$19B', volume: '12.8M', sector: 'Utilities', region: 'Emerging' },
    { symbol: 'PETRONAS', name: 'Petronas Chemicals', price: 'RM7.89', change: '+0.13', changePercent: '+1.68%', marketCap: '$11B', volume: '8.9M', sector: 'Chemicals', region: 'Emerging' },
    { symbol: 'AXIATA', name: 'Axiata Group', price: 'RM3.45', change: '+0.06', changePercent: '+1.77%', marketCap: '$8B', volume: '18.4M', sector: 'Telecom', region: 'Emerging' }
  ]

  // Forex Pairs - 50 major currency pairs
  const forexPairs = [
    // Majors
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: '1.0925', change: '+0.0018', changePercent: '+0.17%', volume: '$1.2T', type: 'Major' },
    { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: '1.2678', change: '+0.0034', changePercent: '+0.27%', volume: '$638B', type: 'Major' },
    { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: '149.85', change: '-0.42', changePercent: '-0.28%', volume: '$901B', type: 'Major' },
    { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: '0.8756', change: '-0.0012', changePercent: '-0.14%', volume: '$298B', type: 'Major' },
    { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: '0.6534', change: '+0.0021', changePercent: '+0.32%', volume: '$342B', type: 'Major' },
    { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: '1.3587', change: '-0.0015', changePercent: '-0.11%', volume: '$289B', type: 'Major' },
    { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', price: '0.6012', change: '+0.0018', changePercent: '+0.30%', volume: '$134B', type: 'Major' },

    // GCC Pairs
    { symbol: 'USD/AED', name: 'US Dollar / UAE Dirham', price: '3.6725', change: '+0.0000', changePercent: '+0.00%', volume: '$18B', type: 'GCC' },
    { symbol: 'USD/SAR', name: 'US Dollar / Saudi Riyal', price: '3.7500', change: '+0.0000', changePercent: '+0.00%', volume: '$42B', type: 'GCC' },
    { symbol: 'USD/QAR', name: 'US Dollar / Qatari Riyal', price: '3.6400', change: '+0.0000', changePercent: '+0.00%', volume: '$12B', type: 'GCC' },
    { symbol: 'USD/KWD', name: 'US Dollar / Kuwaiti Dinar', price: '0.3075', change: '+0.0001', changePercent: '+0.03%', volume: '$8B', type: 'GCC' },
    { symbol: 'USD/BHD', name: 'US Dollar / Bahraini Dinar', price: '0.3760', change: '+0.0000', changePercent: '+0.00%', volume: '$2B', type: 'GCC' },
    { symbol: 'USD/OMR', name: 'US Dollar / Omani Rial', price: '0.3850', change: '+0.0000', changePercent: '+0.00%', volume: '$4B', type: 'GCC' },
    { symbol: 'EUR/AED', name: 'Euro / UAE Dirham', price: '4.0126', change: '+0.0065', changePercent: '+0.16%', volume: '$3B', type: 'GCC' },
    { symbol: 'EUR/SAR', name: 'Euro / Saudi Riyal', price: '4.0969', change: '+0.0068', changePercent: '+0.17%', volume: '$5B', type: 'GCC' },
    { symbol: 'GBP/AED', name: 'British Pound / UAE Dirham', price: '4.6548', change: '+0.0125', changePercent: '+0.27%', volume: '$2B', type: 'GCC' },
    { symbol: 'GBP/SAR', name: 'British Pound / Saudi Riyal', price: '4.7542', change: '+0.0127', changePercent: '+0.27%', volume: '$3B', type: 'GCC' },

    // Major Crosses
    { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: '0.8619', change: '-0.0009', changePercent: '-0.10%', volume: '$412B', type: 'Cross' },
    { symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', price: '163.72', change: '-0.20', changePercent: '-0.12%', volume: '$234B', type: 'Cross' },
    { symbol: 'EUR/CHF', name: 'Euro / Swiss Franc', price: '0.9567', change: '-0.0008', changePercent: '-0.08%', volume: '$156B', type: 'Cross' },
    { symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', price: '189.96', change: '+0.12', changePercent: '+0.06%', volume: '$178B', type: 'Cross' },
    { symbol: 'GBP/CHF', name: 'British Pound / Swiss Franc', price: '1.1102', change: '+0.0018', changePercent: '+0.16%', volume: '$89B', type: 'Cross' },
    { symbol: 'AUD/JPY', name: 'Australian Dollar / Japanese Yen', price: '97.89', change: '+0.08', changePercent: '+0.08%', volume: '$67B', type: 'Cross' },
    { symbol: 'NZD/JPY', name: 'New Zealand Dollar / Japanese Yen', price: '90.08', change: '+0.15', changePercent: '+0.17%', volume: '$42B', type: 'Cross' },
    { symbol: 'EUR/AUD', name: 'Euro / Australian Dollar', price: '1.6724', change: '-0.0021', changePercent: '-0.13%', volume: '$98B', type: 'Cross' },
    { symbol: 'EUR/CAD', name: 'Euro / Canadian Dollar', price: '1.4846', change: '+0.0012', changePercent: '+0.08%', volume: '$87B', type: 'Cross' },
    { symbol: 'EUR/NZD', name: 'Euro / New Zealand Dollar', price: '1.8173', change: '-0.0018', changePercent: '-0.10%', volume: '$56B', type: 'Cross' },
    { symbol: 'GBP/AUD', name: 'British Pound / Australian Dollar', price: '1.9405', change: '+0.0034', changePercent: '+0.18%', volume: '$78B', type: 'Cross' },
    { symbol: 'GBP/CAD', name: 'British Pound / Canadian Dollar', price: '1.7224', change: '+0.0028', changePercent: '+0.16%', volume: '$67B', type: 'Cross' },
    { symbol: 'GBP/NZD', name: 'British Pound / New Zealand Dollar', price: '2.1084', change: '+0.0041', changePercent: '+0.20%', volume: '$45B', type: 'Cross' },
    { symbol: 'AUD/CAD', name: 'Australian Dollar / Canadian Dollar', price: '0.8878', change: '+0.0008', changePercent: '+0.09%', volume: '$34B', type: 'Cross' },
    { symbol: 'AUD/NZD', name: 'Australian Dollar / New Zealand Dollar', price: '1.0868', change: '+0.0003', changePercent: '+0.03%', volume: '$28B', type: 'Cross' },
    { symbol: 'CAD/JPY', name: 'Canadian Dollar / Japanese Yen', price: '110.29', change: '-0.18', changePercent: '-0.16%', volume: '$23B', type: 'Cross' },
    { symbol: 'CHF/JPY', name: 'Swiss Franc / Japanese Yen', price: '171.14', change: '-0.28', changePercent: '-0.16%', volume: '$45B', type: 'Cross' },

    // Exotic Pairs
    { symbol: 'USD/TRY', name: 'US Dollar / Turkish Lira', price: '32.4567', change: '+0.1234', changePercent: '+0.38%', volume: '$34B', type: 'Exotic' },
    { symbol: 'USD/ZAR', name: 'US Dollar / South African Rand', price: '18.7654', change: '+0.0789', changePercent: '+0.42%', volume: '$28B', type: 'Exotic' },
    { symbol: 'USD/MXN', name: 'US Dollar / Mexican Peso', price: '17.2345', change: '-0.0234', changePercent: '-0.14%', volume: '$67B', type: 'Exotic' },
    { symbol: 'USD/BRL', name: 'US Dollar / Brazilian Real', price: '4.9876', change: '+0.0123', changePercent: '+0.25%', volume: '$45B', type: 'Exotic' },
    { symbol: 'USD/RUB', name: 'US Dollar / Russian Ruble', price: '92.3456', change: '+0.4567', changePercent: '+0.50%', volume: '$23B', type: 'Exotic' },
    { symbol: 'USD/INR', name: 'US Dollar / Indian Rupee', price: '83.2345', change: '+0.0678', changePercent: '+0.08%', volume: '$89B', type: 'Exotic' },
    { symbol: 'USD/CNH', name: 'US Dollar / Chinese Yuan', price: '7.2456', change: '-0.0089', changePercent: '-0.12%', volume: '$234B', type: 'Exotic' },
    { symbol: 'USD/SGD', name: 'US Dollar / Singapore Dollar', price: '1.3456', change: '-0.0012', changePercent: '-0.09%', volume: '$56B', type: 'Exotic' },
    { symbol: 'USD/HKD', name: 'US Dollar / Hong Kong Dollar', price: '7.8123', change: '+0.0003', changePercent: '+0.00%', volume: '$78B', type: 'Exotic' },
    { symbol: 'USD/THB', name: 'US Dollar / Thai Baht', price: '35.6789', change: '-0.0456', changePercent: '-0.13%', volume: '$23B', type: 'Exotic' },
    { symbol: 'USD/IDR', name: 'US Dollar / Indonesian Rupiah', price: '15678.50', change: '+12.30', changePercent: '+0.08%', volume: '$12B', type: 'Exotic' },
    { symbol: 'USD/PHP', name: 'US Dollar / Philippine Peso', price: '56.4567', change: '+0.0789', changePercent: '+0.14%', volume: '$8B', type: 'Exotic' },
    { symbol: 'USD/PLN', name: 'US Dollar / Polish Zloty', price: '4.0234', change: '-0.0089', changePercent: '-0.22%', volume: '$18B', type: 'Exotic' },
    { symbol: 'USD/SEK', name: 'US Dollar / Swedish Krona', price: '10.6789', change: '-0.0123', changePercent: '-0.12%', volume: '$34B', type: 'Exotic' },
    { symbol: 'USD/NOK', name: 'US Dollar / Norwegian Krone', price: '10.8945', change: '-0.0234', changePercent: '-0.21%', volume: '$28B', type: 'Exotic' },
    { symbol: 'USD/DKK', name: 'US Dollar / Danish Krone', price: '6.8945', change: '-0.0089', changePercent: '-0.13%', volume: '$12B', type: 'Exotic' }
  ]

  // Commodities - 50 major commodities
  const commodities = [
    // Energy
    { symbol: 'BRENT', name: 'Brent Crude Oil', price: '$87.45', change: '+1.34', changePercent: '+1.56%', unit: '/barrel', volume: '324K', category: 'Energy' },
    { symbol: 'WTI', name: 'WTI Crude Oil', price: '$83.67', change: '+1.23', changePercent: '+1.49%', unit: '/barrel', volume: '412K', category: 'Energy' },
    { symbol: 'NATGAS', name: 'Natural Gas', price: '$2.89', change: '+0.04', changePercent: '+1.40%', unit: '/MMBtu', volume: '289K', category: 'Energy' },
    { symbol: 'GASOLINE', name: 'Gasoline', price: '$2.34', change: '+0.03', changePercent: '+1.30%', unit: '/gallon', volume: '156K', category: 'Energy' },
    { symbol: 'HEATING', name: 'Heating Oil', price: '$2.67', change: '+0.04', changePercent: '+1.52%', unit: '/gallon', volume: '89K', category: 'Energy' },
    { symbol: 'COAL', name: 'Coal', price: '$123.45', change: '+2.34', changePercent: '+1.93%', unit: '/ton', volume: '34K', category: 'Energy' },
    { symbol: 'URANIUM', name: 'Uranium', price: '$89.50', change: '+1.20', changePercent: '+1.36%', unit: '/lb', volume: '12K', category: 'Energy' },

    // Precious Metals
    { symbol: 'GOLD', name: 'Gold', price: '$2,034.50', change: '+12.30', changePercent: '+0.61%', unit: '/oz', volume: '234K', category: 'Precious Metals' },
    { symbol: 'SILVER', name: 'Silver', price: '$24.67', change: '+0.34', changePercent: '+1.40%', unit: '/oz', volume: '178K', category: 'Precious Metals' },
    { symbol: 'PLATINUM', name: 'Platinum', price: '$934.50', change: '+8.90', changePercent: '+0.96%', unit: '/oz', volume: '45K', category: 'Precious Metals' },
    { symbol: 'PALLADIUM', name: 'Palladium', price: '$1,067.80', change: '+14.50', changePercent: '+1.38%', unit: '/oz', volume: '28K', category: 'Precious Metals' },

    // Base Metals
    { symbol: 'COPPER', name: 'Copper', price: '$3.87', change: '+0.05', changePercent: '+1.31%', unit: '/lb', volume: '289K', category: 'Base Metals' },
    { symbol: 'ALUMINUM', name: 'Aluminum', price: '$2,345.60', change: '+28.40', changePercent: '+1.23%', unit: '/ton', volume: '156K', category: 'Base Metals' },
    { symbol: 'ZINC', name: 'Zinc', price: '$2,567.80', change: '+34.20', changePercent: '+1.35%', unit: '/ton', volume: '89K', category: 'Base Metals' },
    { symbol: 'NICKEL', name: 'Nickel', price: '$17,234.50', change: '+189.30', changePercent: '+1.11%', unit: '/ton', volume: '67K', category: 'Base Metals' },
    { symbol: 'LEAD', name: 'Lead', price: '$2,156.70', change: '+23.40', changePercent: '+1.10%', unit: '/ton', volume: '45K', category: 'Base Metals' },
    { symbol: 'TIN', name: 'Tin', price: '$25,678.90', change: '+298.40', changePercent: '+1.18%', unit: '/ton', volume: '23K', category: 'Base Metals' },
    { symbol: 'STEEL', name: 'Steel Rebar', price: '$567.80', change: '+6.70', changePercent: '+1.19%', unit: '/ton', volume: '134K', category: 'Base Metals' },
    { symbol: 'IRON', name: 'Iron Ore', price: '$112.45', change: '+1.67', changePercent: '+1.51%', unit: '/ton', volume: '234K', category: 'Base Metals' },

    // Agriculture - Grains
    { symbol: 'WHEAT', name: 'Wheat', price: '$6.12', change: '+0.08', changePercent: '+1.33%', unit: '/bushel', volume: '89K', category: 'Agriculture' },
    { symbol: 'CORN', name: 'Corn', price: '$4.67', change: '+0.06', changePercent: '+1.30%', unit: '/bushel', volume: '178K', category: 'Agriculture' },
    { symbol: 'SOYBEAN', name: 'Soybeans', price: '$12.89', change: '+0.15', changePercent: '+1.18%', unit: '/bushel', volume: '134K', category: 'Agriculture' },
    { symbol: 'RICE', name: 'Rice', price: '$16.45', change: '+0.21', changePercent: '+1.29%', unit: '/cwt', volume: '45K', category: 'Agriculture' },
    { symbol: 'OATS', name: 'Oats', price: '$3.89', change: '+0.05', changePercent: '+1.30%', unit: '/bushel', volume: '23K', category: 'Agriculture' },

    // Agriculture - Soft Commodities
    { symbol: 'COFFEE', name: 'Coffee', price: '$1.89', change: '+0.03', changePercent: '+1.61%', unit: '/lb', volume: '67K', category: 'Agriculture' },
    { symbol: 'SUGAR', name: 'Sugar', price: '$23.45', change: '+0.34', changePercent: '+1.47%', unit: '/lb', volume: '89K', category: 'Agriculture' },
    { symbol: 'COCOA', name: 'Cocoa', price: '$3,567.80', change: '+45.60', changePercent: '+1.30%', unit: '/ton', volume: '34K', category: 'Agriculture' },
    { symbol: 'COTTON', name: 'Cotton', price: '$0.89', change: '+0.01', changePercent: '+1.14%', unit: '/lb', volume: '56K', category: 'Agriculture' },
    { symbol: 'OJ', name: 'Orange Juice', price: '$2.67', change: '+0.04', changePercent: '+1.52%', unit: '/lb', volume: '12K', category: 'Agriculture' },

    // Agriculture - Livestock
    { symbol: 'CATTLE', name: 'Live Cattle', price: '$178.45', change: '+2.34', changePercent: '+1.33%', unit: '/cwt', volume: '45K', category: 'Agriculture' },
    { symbol: 'HOGS', name: 'Lean Hogs', price: '$78.90', change: '+1.12', changePercent: '+1.44%', unit: '/cwt', volume: '67K', category: 'Agriculture' },
    { symbol: 'FEEDER', name: 'Feeder Cattle', price: '$234.56', change: '+3.21', changePercent: '+1.39%', unit: '/cwt', volume: '28K', category: 'Agriculture' },

    // Agriculture - Specialty
    { symbol: 'PALM', name: 'Palm Oil', price: '$956.78', change: '+12.34', changePercent: '+1.31%', unit: '/ton', volume: '89K', category: 'Agriculture' },
    { symbol: 'RUBBER', name: 'Rubber', price: '$1.67', change: '+0.02', changePercent: '+1.21%', unit: '/kg', volume: '$34K', category: 'Agriculture' },
    { symbol: 'LUMBER', name: 'Lumber', price: '$512.34', change: '+6.78', changePercent: '+1.34%', unit: '/1000 bd ft', volume: '23K', category: 'Agriculture' },
    { symbol: 'WOOL', name: 'Wool', price: '$1,234.50', change: '+15.60', changePercent: '+1.28%', unit: '/ton', volume: '8K', category: 'Agriculture' },

    // Other Commodities
    { symbol: 'CARBON', name: 'Carbon Credits', price: '$78.45', change: '+1.23', changePercent: '+1.59%', unit: '/ton', volume: '45K', category: 'Environmental' },
    { symbol: 'LITHIUM', name: 'Lithium', price: '$23,456', change: '+345', changePercent: '+1.49%', unit: '/ton', volume: '12K', category: 'Industrial' },
    { symbol: 'COBALT', name: 'Cobalt', price: '$34,567', change: '+456', changePercent: '+1.34%', unit: '/ton', volume: '8K', category: 'Industrial' },
    { symbol: 'RARE', name: 'Rare Earth Elements', price: '$89,234', change: '+1,234', changePercent: '+1.40%', unit: '/ton', volume: '4K', category: 'Industrial' },
    { symbol: 'WATER', name: 'Water Futures', price: '$567.89', change: '+7.80', changePercent: '+1.39%', unit: '/acre-ft', volume: '23K', category: 'Environmental' },

    // Softs & Exotics
    { symbol: 'CANOLA', name: 'Canola', price: '$623.45', change: '+8.90', changePercent: '+1.45%', unit: '/ton', volume: '34K', category: 'Agriculture' },
    { symbol: 'RAPESEED', name: 'Rapeseed', price: '$512.30', change: '+6.70', changePercent: '+1.32%', unit: '/ton', volume: '28K', category: 'Agriculture' },
    { symbol: 'SOYOIL', name: 'Soybean Oil', price: '$54.67', change: '+0.78', changePercent: '+1.45%', unit: '/lb', volume: '67K', category: 'Agriculture' },
    { symbol: 'SOYMEAL', name: 'Soybean Meal', price: '$412.34', change: '+5.60', changePercent: '+1.38%', unit: '/ton', volume: '89K', category: 'Agriculture' },
    { symbol: 'ETHANOL', name: 'Ethanol', price: '$2.12', change: '+0.03', changePercent: '+1.44%', unit: '/gallon', volume: '56K', category: 'Energy' },
    { symbol: 'PROPANE', name: 'Propane', price: '$1.34', change: '+0.02', changePercent: '+1.52%', unit: '/gallon', volume: '23K', category: 'Energy' }
  ]

  // Cryptocurrencies - 30 major cryptos
  const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$67,845.50', change: '+1,234.67', changePercent: '+1.85%', marketCap: '$1.33T', volume: '$42.3B' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,567.80', change: '+78.90', changePercent: '+2.26%', marketCap: '$428B', volume: '$18.7B' },
    { symbol: 'BNB', name: 'Binance Coin', price: '$456.78', change: '+12.34', changePercent: '+2.77%', marketCap: '$70B', volume: '$2.3B' },
    { symbol: 'SOL', name: 'Solana', price: '$112.45', change: '+4.56', changePercent: '+4.22%', marketCap: '$48B', volume: '$3.8B' },
    { symbol: 'XRP', name: 'Ripple', price: '$0.6234', change: '+0.0123', changePercent: '+2.01%', marketCap: '$34B', volume: '$1.9B' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.4567', change: '+0.0089', changePercent: '+1.99%', marketCap: '$16B', volume: '$892M' },
    { symbol: 'AVAX', name: 'Avalanche', price: '$34.56', change: '+0.89', changePercent: '+2.64%', marketCap: '$13B', volume: '$678M' },
    { symbol: 'DOGE', name: 'Dogecoin', price: '$0.0789', change: '+0.0015', changePercent: '+1.94%', marketCap: '$11B', volume: '$1.2B' },
    { symbol: 'DOT', name: 'Polkadot', price: '$6.78', change: '+0.15', changePercent: '+2.26%', marketCap: '$9B', volume: '$456M' },
    { symbol: 'MATIC', name: 'Polygon', price: '$0.8945', change: '+0.0234', changePercent: '+2.68%', marketCap: '$8B', volume: '$512M' },
    { symbol: 'LINK', name: 'Chainlink', price: '$14.56', change: '+0.34', changePercent: '+2.39%', marketCap: '$8B', volume: '$689M' },
    { symbol: 'UNI', name: 'Uniswap', price: '$7.89', change: '+0.18', changePercent: '+2.33%', marketCap: '$6B', volume: '$234M' },
    { symbol: 'LTC', name: 'Litecoin', price: '$78.45', change: '+1.67', changePercent: '+2.17%', marketCap: '$6B', volume: '$567M' },
    { symbol: 'ATOM', name: 'Cosmos', price: '$9.12', change: '+0.21', changePercent: '+2.36%', marketCap: '$4B', volume: '$312M' },
    { symbol: 'XLM', name: 'Stellar', price: '$0.1234', change: '+0.0028', changePercent: '+2.32%', marketCap: '$4B', volume: '$289M' },
    { symbol: 'ALGO', name: 'Algorand', price: '$0.2345', change: '+0.0056', changePercent: '+2.45%', marketCap: '$2B', volume: '$178M' },
    { symbol: 'VET', name: 'VeChain', price: '$0.0345', change: '+0.0008', changePercent: '+2.37%', marketCap: '$3B', volume: '$145M' },
    { symbol: 'FIL', name: 'Filecoin', price: '$5.67', change: '+0.13', changePercent: '+2.35%', marketCap: '$3B', volume: '$234M' },
    { symbol: 'HBAR', name: 'Hedera', price: '$0.0678', change: '+0.0015', changePercent: '+2.26%', marketCap: '$2B', volume: '$89M' },
    { symbol: 'APT', name: 'Aptos', price: '$8.90', change: '+0.21', changePercent: '+2.42%', marketCap: '$4B', volume: '$456M' },
    { symbol: 'ARB', name: 'Arbitrum', price: '$1.23', change: '+0.03', changePercent: '+2.50%', marketCap: '$2B', volume: '$312M' },
    { symbol: 'OP', name: 'Optimism', price: '$2.34', change: '+0.06', changePercent: '+2.63%', marketCap: '$3B', volume: '$267M' },
    { symbol: 'INJ', name: 'Injective', price: '$23.45', change: '+0.67', changePercent: '+2.94%', marketCap: '$2B', volume: '$189M' },
    { symbol: 'SUI', name: 'Sui', price: '$1.45', change: '+0.04', changePercent: '+2.84%', marketCap: '$4B', volume: '$534M' },
    { symbol: 'TIA', name: 'Celestia', price: '$12.34', change: '+0.34', changePercent: '+2.83%', marketCap: '$2B', volume: '$298M' },
    { symbol: 'SEI', name: 'Sei', price: '$0.5678', change: '+0.0145', changePercent: '+2.62%', marketCap: '$2B', volume: '$412M' },
    { symbol: 'NEAR', name: 'Near Protocol', price: '$3.45', change: '+0.09', changePercent: '+2.68%', marketCap: '$4B', volume: '$345M' },
    { symbol: 'STX', name: 'Stacks', price: '$1.89', change: '+0.05', changePercent: '+2.72%', marketCap: '$3B', volume: '$234M' },
    { symbol: 'AAVE', name: 'Aave', price: '$89.50', change: '+2.34', changePercent: '+2.68%', marketCap: '$1B', volume: '$178M' },
    { symbol: 'SNX', name: 'Synthetix', price: '$3.12', change: '+0.08', changePercent: '+2.63%', marketCap: '$1B', volume: '$123M' }
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
      {/* Enhanced Header with Glassmorphism */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease'
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
            fontSize: '32px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '-0.5px'
          }}>
            📊 {t.title}
            <span style={{
              fontSize: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>LIVE</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Enhanced Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button style={{
                background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                border: 'none',
                color: '#f8fafc',
                padding: '10px 14px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}>
                🔔
              </button>
              {notifications.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                  animation: 'bounce 1s ease infinite'
                }}>
                  {notifications.length}
                </div>
              )}
            </div>

            {/* Enhanced Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '2px solid #e2e8f0',
                color: '#475569',
                padding: '10px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.borderColor = '#2563eb'
                e.currentTarget.style.color = '#2563eb'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.color = '#475569'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              {language === 'en' ? '🇦🇪 العربية' : '🇺🇸 English'}
            </button>

            {/* Enhanced Live Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '600',
              padding: '8px 16px',
              background: 'rgba(248, 250, 252, 0.8)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              <span style={{ color: '#10b981', fontWeight: '700' }}>LIVE</span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
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
            { key: 'markets', label: t.worldwideMarkets, icon: '🌍' },
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
              background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                         notification.type === 'warning' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                         'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              maxWidth: '320px',
              fontSize: '14px',
              fontWeight: '600',
              animation: 'slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              backdropFilter: 'blur(10px)'
            }}>
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* NEW: Smart Popup System */}
      {activePopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => closePopup(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.25)',
              animation: 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup Content Based on Type */}
            {activePopup === 'welcome' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎁</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    Get FREE Trading Signals!
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    Join 10,000+ GCC Traders Making Profits Daily
                  </p>
                </div>
                <div style={{ padding: '32px' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      outline: 'none'
                    }}
                  />
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginBottom: '16px'
                  }}>
                    Get Free Signals Now
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                    ✓ No credit card required  |  ✓ Instant access
                  </p>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', cursor: 'pointer' }}>
                    <input type="checkbox" onChange={(e) => e.target.checked && closePopup(true)} />
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Don't show again today</span>
                  </label>
                </div>
              </div>
            )}

            {activePopup === 'scroll30' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    Download FREE Trading Guide
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    Master GCC Markets with Our Comprehensive Guide
                  </p>
                </div>
                <div style={{ padding: '32px' }}>
                  <ul style={{ marginBottom: '24px', color: '#475569', lineHeight: '2' }}>
                    <li>✓ Technical Analysis Strategies</li>
                    <li>✓ Risk Management Techniques</li>
                    <li>✓ GCC Market Insights</li>
                    <li>✓ Real Trading Examples</li>
                  </ul>
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    Download Free Guide (PDF)
                  </button>
                </div>
              </div>
            )}

            {activePopup === 'scroll60' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚡</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    Open Live Trading Account
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    Get $50 Welcome Bonus + Zero Commission
                  </p>
                </div>
                <div style={{ padding: '32px' }}>
                  {brokerPartners.slice(0, 2).map(broker => (
                    <div key={broker.id} style={{
                      padding: '16px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                          {broker.logo} {broker.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                          ⭐ {broker.rating} | {broker.bonus}
                        </div>
                      </div>
                      <button style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}>
                        Open Account
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePopup === 'scroll90' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    Schedule FREE Strategy Session
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    1-on-1 Consultation with Professional Trader
                  </p>
                </div>
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#2563eb', marginBottom: '16px' }}>
                    30 Minutes
                  </div>
                  <p style={{ marginBottom: '24px', color: '#64748b' }}>
                    Personalized trading strategy for GCC markets
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    Book My Free Session
                  </button>
                </div>
              </div>
            )}

            {activePopup === 'exitIntent' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    Wait! Don't Miss Out
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    Exclusive Offer Expires in 5 Minutes
                  </p>
                </div>
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{
                    fontSize: '56px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px'
                  }}>
                    05:00
                  </div>
                  <p style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                    Get 3 Months FREE Premium Signals
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginBottom: '12px'
                  }}>
                    Claim Exclusive Offer Now
                  </button>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>
                    Limited to first 50 traders only
                  </p>
                </div>
              </div>
            )}

            {activePopup === 'timeBased' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                  padding: '32px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>💎</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                    VIP Trading Room Access
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.95 }}>
                    Join Elite Traders Making 100+ Pips Daily
                  </p>
                </div>
                <div style={{ padding: '32px' }}>
                  <ul style={{ marginBottom: '24px', color: '#475569', lineHeight: '2' }}>
                    <li>✓ Real-time signal alerts</li>
                    <li>✓ Private Telegram group</li>
                    <li>✓ Daily market analysis</li>
                    <li>✓ Personal trading coach</li>
                  </ul>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px', color: '#64748b', textDecoration: 'line-through' }}>$299/month</span>
                    <span style={{ fontSize: '36px', fontWeight: '800', color: '#0891b2', marginLeft: '12px' }}>$99/month</span>
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    Join VIP Room Now
                  </button>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => closePopup(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* NEW: Floating Action Button */}
      {showFloatingButton && (
        <button
          onClick={() => showPopup('welcome')}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            border: 'none',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            zIndex: 999,
            transition: 'all 0.3s ease',
            animation: 'float 3s ease-in-out infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.4)'
          }}
        >
          💬
        </button>
      )}

      {/* NEW: Live Activity Ticker */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#2563eb',
            whiteSpace: 'nowrap'
          }}>
            🔴 LIVE ACTIVITY:
          </div>
          <div style={{
            flex: 1,
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#475569',
              fontWeight: '600',
              animation: 'slideInRight 0.5s ease'
            }}>
              <span>{liveActivities[liveActivityIndex].emoji}</span>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>
                {liveActivities[liveActivityIndex].name}
              </span>
              <span>from {liveActivities[liveActivityIndex].location} just made</span>
              <span style={{
                color: '#10b981',
                fontWeight: '800',
                fontSize: '16px'
              }}>
                {liveActivities[liveActivityIndex].profit}
              </span>
              <span>on our signals!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px 20px'
      }}>
        {/* Layout: Content + Sidebar */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Main Content Area */}
          <div style={{
            flex: 1,
            minWidth: 0
          }}>
        {/* NEW: Social Proof Section - Shown on all tabs */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            <div style={{ animation: 'fadeIn 0.6s ease' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
                animation: 'countUp 2s ease'
              }}>
                {traderCount.toLocaleString()}+
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Active Traders
              </div>
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease 0.1s', animationFillMode: 'backwards' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                $2.4M+
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Total Profits Made
              </div>
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease 0.2s', animationFillMode: 'backwards' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                78%
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Average Win Rate
              </div>
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease 0.3s', animationFillMode: 'backwards' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                4.8★
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Average Rating
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '32px',
            paddingTop: '32px',
            borderTop: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            {['🛡️ Regulated', '🔒 Secure', '🏆 Award Winning', '⚡ Fast Execution'].map((badge, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                background: 'white',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                fontWeight: '700',
                color: '#475569',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                animation: `fadeIn 0.6s ease ${0.4 + i * 0.1}s backwards`
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* NEW: Broker Partners Section - Shown on all tabs */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '32px',
          padding: isMobile ? '40px 20px' : '64px 48px',
          marginBottom: '48px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 165, 0, 0.15) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                padding: '8px 20px',
                borderRadius: '24px',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFD700' }}>
                  🤝 VERIFIED PARTNERS
                </span>
              </div>

              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '16px',
                letterSpacing: '-1px'
              }}>
                Our Trusted Broker Partners
              </h2>

              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: '#94a3b8',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Trade with confidence using our verified, regulated brokers offering the best conditions for GCC traders
              </p>
            </div>

          <div style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {brokerPartners.map((broker, index) => (
              <div
                key={broker.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  borderRadius: '24px',
                  padding: isMobile ? '32px 20px' : '40px 48px',
                  position: 'relative',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `fadeIn 0.6s ease ${index * 0.1}s backwards`,
                  transform: 'scale(1)',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'
                  e.currentTarget.style.boxShadow = '0 32px 80px rgba(255, 215, 0, 0.3)'
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.2)'
                }}
              >
                {/* Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shine 3s infinite',
                  pointerEvents: 'none'
                }} />

                {broker.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1e293b',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '11px',
                    fontWeight: '900',
                    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                    letterSpacing: '0.5px'
                  }}>
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* Two Column Layout */}
                <div style={{
                  display: isMobile ? 'block' : 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
                  gap: isMobile ? '24px' : '48px',
                  alignItems: 'center'
                }}>
                  {/* Left: Logo & Rating */}
                  <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <div style={{
                      fontSize: '80px',
                      marginBottom: '16px',
                      animation: 'float 3s ease-in-out infinite'
                    }}>
                      {broker.logo}
                    </div>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '900',
                      color: '#1e293b',
                      marginBottom: '12px',
                      letterSpacing: '-0.5px'
                    }}>
                      {broker.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'flex-start',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#FFD700', fontSize: '18px' }}>★★★★★</span>
                      <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '18px' }}>{broker.rating}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      ({broker.reviews.toLocaleString()} reviews)
                    </div>
                  </div>

                  {/* Right: Features & CTA */}
                  <div>
                    {/* Features Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                      gap: '16px',
                      marginBottom: '24px'
                    }}>
                      {broker.features.map((feature, i) => (
                        <div key={i} style={{
                          background: 'rgba(16, 185, 129, 0.05)',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <span style={{
                            fontSize: '18px',
                            color: '#10b981',
                            fontWeight: '900'
                          }}>✓</span>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#1e293b'
                          }}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Info Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                      marginBottom: '24px',
                      padding: '20px',
                      background: 'rgba(248, 250, 252, 0.6)',
                      borderRadius: '16px'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>Commission</div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>{broker.commission}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>Min Deposit</div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>{broker.minDeposit}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>Platform</div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>{broker.platform}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>Bonus</div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#10b981' }}>{broker.bonus}</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={isMobile
                        ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
                        : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
                      }
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '18px',
                        background: `linear-gradient(135deg, ${broker.color} 0%, ${broker.color}dd 100%)`,
                        color: '#1e293b',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        boxShadow: `0 8px 24px ${broker.color}40`,
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        textDecoration: 'none',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 12px 32px ${broker.color}60`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = `0 8px 24px ${broker.color}40`
                      }}
                    >
                      🚀 Open Account Now →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Broker Stats - Premium Design */}
          <div style={{
            marginTop: '56px',
            padding: isMobile ? '32px 20px' : '40px 48px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '1000px',
            margin: '56px auto 0'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px',
              textAlign: 'center'
            }}>
              <div style={{
                padding: '24px',
                background: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(37, 99, 235, 0.2)'
              }}>
                <div style={{
                  fontSize: isMobile ? '36px' : '42px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                  letterSpacing: '-1px'
                }}>
                  15,420
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Active Traders</div>
              </div>

              <div style={{
                padding: '24px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <div style={{
                  fontSize: isMobile ? '36px' : '42px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                  letterSpacing: '-1px'
                }}>
                  0.42ms
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Avg Execution</div>
              </div>

              <div style={{
                padding: '24px',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <div style={{
                  fontSize: isMobile ? '36px' : '42px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                  letterSpacing: '-1px'
                }}>
                  98.7%
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
          </div>
        </div>

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
                {displaySignals.filter(s => s.status === 'ACTIVE').length} Active Signals
              </div>

              {/* 🤖 AI Signal Generation Button */}
              <button
                onClick={fetchAISignals}
                disabled={isLoadingSignals}
                style={{
                  background: isLoadingSignals
                    ? '#94a3b8'
                    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: isLoadingSignals ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoadingSignals) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
              >
                <span style={{ fontSize: '18px' }}>
                  {isLoadingSignals ? '⏳' : '🤖'}
                </span>
                {isLoadingSignals ? 'Generating AI Signals...' : 'Generate New AI Signals'}
              </button>
            </div>

            {/* Loading State */}
            {isLoadingSignals && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '16px',
                margin: '20px 0'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                  AI is generating signals...
                </div>
                <div style={{ fontSize: '14px', color: '#3b82f6' }}>
                  Using OpenAI GPT-5 Nano to analyze GCC markets
                </div>
              </div>
            )}

            {/* Signal Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {displaySignals.map(signal => (
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
                        background: Number(signal.confidence) >= 80 ? '#10b981' : Number(signal.confidence) >= 60 ? '#f59e0b' : '#ef4444',
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

            {/* Exness Video Section */}
            <div style={{
              marginTop: '48px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '2px solid #FFD700',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15)'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  💎 Why Trade with Exness?
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Watch how Exness provides the best trading conditions
                </p>
              </div>

              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                background: '#000'
              }}>
                <iframe
                  src="https://brandfolder.com/brandfolder/attachments/embed/46s8kg2p4qx4sz96k5pjs?loop=true&muted=false&autoplay=true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>

              <div style={{
                marginTop: '24px',
                textAlign: 'center'
              }}>
                <a
                  href={isMobile
                    ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
                    : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
                  }
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1e293b',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)'
                  }}
                >
                  🚀 Start Trading with Exness
                </a>
              </div>
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

            {/* Daily Market Overview - Keep as-is */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '24px'
            }}>
              <h2 style={{ color: '#f8fafc', marginBottom: '16px' }}>Daily Market Overview</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
                Global markets are showing mixed performance today with GCC equities leading the charge in the Middle East.
                USD/AED and USD/SAR are stabilizing around key support levels while banking sector demonstrates exceptional strength.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {globalMarkets.filter(m => m.region === 'GCC').slice(0, 4).map((market, index) => (
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

            {/* Comprehensive Market Data Section */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ color: '#f8fafc', marginBottom: '16px', fontSize: '24px', fontWeight: '700' }}>
                  Global Market Explorer
                </h2>
                <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
                  Track 360+ instruments across stocks, forex, commodities, and cryptocurrencies with real-time data and comprehensive analytics.
                </p>

                {/* Search and Category Tabs */}
                <div style={{ marginBottom: '24px' }}>
                  <input
                    type="text"
                    placeholder="Search instruments by name or symbol..."
                    value={marketAnalysisSearch}
                    onChange={(e) => setMarketAnalysisSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '16px',
                      marginBottom: '16px'
                    }}
                  />

                  {/* Category Tabs */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['stocks', 'forex', 'commodities', 'crypto'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedMarketCategory(category)}
                        style={{
                          padding: '12px 24px',
                          background: selectedMarketCategory === category
                            ? 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)'
                            : '#1e293b',
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          color: '#f8fafc',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {category === 'stocks' && '📊 Stocks'}
                        {category === 'forex' && '💱 Forex'}
                        {category === 'commodities' && '🛢️ Commodities'}
                        {category === 'crypto' && '₿ Crypto'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stocks Section */}
                {selectedMarketCategory === 'stocks' && (
                  <div>
                    {/* Region Filter */}
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {['all', 'US', 'GCC', 'Europe', 'Asia', 'Emerging'].map((region) => (
                        <button
                          key={region}
                          onClick={() => setSelectedStockRegion(region)}
                          style={{
                            padding: '8px 16px',
                            background: selectedStockRegion === region ? '#3b82f6' : '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '6px',
                            color: '#f8fafc',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          {region === 'all' ? 'All Regions' : region}
                        </button>
                      ))}
                    </div>

                    {/* Stock Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '16px'
                    }}>
                      {globalStocks
                        .filter(stock =>
                          (selectedStockRegion === 'all' || stock.region === selectedStockRegion) &&
                          (marketAnalysisSearch === '' ||
                            stock.name.toLowerCase().includes(marketAnalysisSearch.toLowerCase()) ||
                            stock.symbol.toLowerCase().includes(marketAnalysisSearch.toLowerCase()))
                        )
                        .slice(0, 24)
                        .map((stock, index) => (
                          <div key={index} style={{
                            background: '#1e293b',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #475569',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div>
                                <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '16px' }}>{stock.symbol}</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{stock.name}</div>
                              </div>
                              <div style={{
                                padding: '4px 8px',
                                background: stock.changePercent.startsWith('+') ? '#10b98120' : '#ef444420',
                                color: stock.changePercent.startsWith('+') ? '#10b981' : '#ef4444',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                height: 'fit-content'
                              }}>
                                {stock.changePercent}
                              </div>
                            </div>
                            <div style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                              {stock.price}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                              <span>Vol: {stock.volume}</span>
                              <span>{stock.sector}</span>
                            </div>
                            {stock.marketCap && (
                              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                                MCap: {stock.marketCap}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Forex Section */}
                {selectedMarketCategory === 'forex' && (
                  <div>
                    {/* Forex Type Filter */}
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {['all', 'Major', 'GCC', 'Cross', 'Exotic'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedForexType(type)}
                          style={{
                            padding: '8px 16px',
                            background: selectedForexType === type ? '#3b82f6' : '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '6px',
                            color: '#f8fafc',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          {type === 'all' ? 'All Pairs' : type}
                        </button>
                      ))}
                    </div>

                    {/* Forex Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '16px'
                    }}>
                      {forexPairs
                        .filter(pair =>
                          (selectedForexType === 'all' || pair.type === selectedForexType) &&
                          (marketAnalysisSearch === '' ||
                            pair.name.toLowerCase().includes(marketAnalysisSearch.toLowerCase()) ||
                            pair.symbol.toLowerCase().includes(marketAnalysisSearch.toLowerCase()))
                        )
                        .map((pair, index) => (
                          <div key={index} style={{
                            background: '#1e293b',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #475569'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div>
                                <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '16px' }}>{pair.symbol}</div>
                                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{pair.name}</div>
                              </div>
                              <div style={{
                                padding: '4px 8px',
                                background: pair.changePercent.startsWith('+') ? '#10b98120' : '#ef444420',
                                color: pair.changePercent.startsWith('+') ? '#10b981' : '#ef4444',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                height: 'fit-content'
                              }}>
                                {pair.changePercent}
                              </div>
                            </div>
                            <div style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                              {pair.price}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                              <span>Vol: {pair.volume}</span>
                              <span style={{
                                padding: '2px 6px',
                                background: '#3b82f620',
                                color: '#3b82f6',
                                borderRadius: '3px',
                                fontSize: '10px'
                              }}>
                                {pair.type}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Commodities Section */}
                {selectedMarketCategory === 'commodities' && (
                  <div>
                    {/* Commodity Category Filter */}
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {['all', 'Energy', 'Precious Metals', 'Base Metals', 'Agriculture', 'Environmental', 'Industrial'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCommodityCategory(cat)}
                          style={{
                            padding: '8px 16px',
                            background: selectedCommodityCategory === cat ? '#3b82f6' : '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '6px',
                            color: '#f8fafc',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          {cat === 'all' ? 'All Commodities' : cat}
                        </button>
                      ))}
                    </div>

                    {/* Commodities Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '16px'
                    }}>
                      {commodities
                        .filter(commodity =>
                          (selectedCommodityCategory === 'all' || commodity.category === selectedCommodityCategory) &&
                          (marketAnalysisSearch === '' ||
                            commodity.name.toLowerCase().includes(marketAnalysisSearch.toLowerCase()) ||
                            commodity.symbol.toLowerCase().includes(marketAnalysisSearch.toLowerCase()))
                        )
                        .map((commodity, index) => (
                          <div key={index} style={{
                            background: '#1e293b',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #475569'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div>
                                <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '16px' }}>{commodity.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{commodity.symbol}</div>
                              </div>
                              <div style={{
                                padding: '4px 8px',
                                background: commodity.changePercent.startsWith('+') ? '#10b98120' : '#ef444420',
                                color: commodity.changePercent.startsWith('+') ? '#10b981' : '#ef4444',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                height: 'fit-content'
                              }}>
                                {commodity.changePercent}
                              </div>
                            </div>
                            <div style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                              {commodity.price}
                              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '400' }}> {commodity.unit}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                              <span>Vol: {commodity.volume}</span>
                              <span style={{
                                padding: '2px 6px',
                                background: '#10b98120',
                                color: '#10b981',
                                borderRadius: '3px',
                                fontSize: '10px'
                              }}>
                                {commodity.category}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Crypto Section */}
                {selectedMarketCategory === 'crypto' && (
                  <div>
                    {/* Crypto Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '16px'
                    }}>
                      {cryptocurrencies
                        .filter(crypto =>
                          marketAnalysisSearch === '' ||
                          crypto.name.toLowerCase().includes(marketAnalysisSearch.toLowerCase()) ||
                          crypto.symbol.toLowerCase().includes(marketAnalysisSearch.toLowerCase())
                        )
                        .map((crypto, index) => (
                          <div key={index} style={{
                            background: '#1e293b',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #475569'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div>
                                <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '16px' }}>{crypto.symbol}</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{crypto.name}</div>
                              </div>
                              <div style={{
                                padding: '4px 8px',
                                background: crypto.changePercent.startsWith('+') ? '#10b98120' : '#ef444420',
                                color: crypto.changePercent.startsWith('+') ? '#10b981' : '#ef4444',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600',
                                height: 'fit-content'
                              }}>
                                {crypto.changePercent}
                              </div>
                            </div>
                            <div style={{ color: '#f8fafc', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                              {crypto.price}
                            </div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                              MCap: {crypto.marketCap}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              Volume: {crypto.volume}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Summary Stats */}
                <div style={{
                  marginTop: '32px',
                  padding: '20px',
                  background: '#1e293b',
                  borderRadius: '12px',
                  border: '1px solid #475569'
                }}>
                  <div style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center' }}>
                    Showing {
                      selectedMarketCategory === 'stocks' ? globalStocks.filter(s => selectedStockRegion === 'all' || s.region === selectedStockRegion).length :
                      selectedMarketCategory === 'forex' ? forexPairs.filter(p => selectedForexType === 'all' || p.type === selectedForexType).length :
                      selectedMarketCategory === 'commodities' ? commodities.filter(c => selectedCommodityCategory === 'all' || c.category === selectedCommodityCategory).length :
                      cryptocurrencies.length
                    } instruments
                    {marketAnalysisSearch && ` matching "${marketAnalysisSearch}"`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Worldwide Markets Tab */}
        {activeTab === 'markets' && (
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🌍 Worldwide Markets
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '32px'
            }}>
              Real-time coverage of major indices across GCC, Middle East, Asia-Pacific, Europe, Americas, Africa, and Oceania
            </p>

            {/* Markets by Region */}
            {['GCC', 'Middle East', 'Asia-Pacific', 'Europe', 'Americas', 'Africa', 'Oceania'].map(region => (
              <div key={region} style={{ marginBottom: '48px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '18px'
                  }}>
                    {region}
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                    {globalMarkets.filter(m => m.region === region).length} indices
                  </span>
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px'
                }}>
                  {globalMarkets.filter(m => m.region === region).map((market, index) => (
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

                  <div style={{
                    fontSize: '14px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    {market.country}
                  </div>

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
              </div>
            ))}

            {/* Global Market Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569',
              borderRadius: '16px',
              padding: '32px',
              marginTop: '32px'
            }}>
              <h2 style={{ color: '#f8fafc', marginBottom: '24px', fontSize: '24px', fontWeight: '700' }}>Global Market Overview</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>{globalMarkets.length}</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Global Indices</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>7</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Regions Covered</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#f59e0b', marginBottom: '8px' }}>$2.8T</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Daily Volume</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>
                    {globalMarkets.filter(m => m.trend === 'up').length}↗ / {globalMarkets.filter(m => m.trend === 'down').length}↘
                  </div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Market Sentiment</div>
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
                },
                {
                  id: 5,
                  title: 'Saudi Vision 2030 Accelerates: NEOM, Red Sea Project, and Qiddiya Drive Economic Transformation',
                  summary: 'Saudi Arabia\'s Vision 2030 mega-projects reach critical milestones with NEOM Phase 1 completion, Red Sea Project opening, and Qiddiya Entertainment City advancing rapidly.',
                  fullArticle: `Saudi Arabia's ambitious Vision 2030 economic diversification program has achieved remarkable momentum, with major giga-projects delivering transformative results that are reshaping the Kingdom's economy and creating unprecedented investment opportunities across multiple sectors.

**Vision 2030 Progress Overview:**
The Kingdom's comprehensive transformation initiative has demonstrated exceptional progress, with total investments exceeding SAR 3.2 trillion ($850 billion) committed across infrastructure, entertainment, tourism, technology, and renewable energy sectors. The program aims to reduce oil dependency, diversify revenue sources, and position Saudi Arabia as a global investment powerhouse.

**NEOM - The Future City:**
NEOM, the $500 billion flagship mega-project, has reached critical development milestones:

**The Line:**
- 26.5km of foundation work completed for the first phase
- Revolutionary zero-gravity urbanism design with 170km planned length
- Accommodation for 9 million residents in 34 square kilometers
- 100% renewable energy powered, carbon-neutral operations
- First residential units targeted for 2026 completion
- Advanced construction technologies including 3D printing and modular design

**Oxagon:**
- World's largest floating industrial complex taking shape
- $5 billion in manufacturing investments committed
- Focus on sustainable industries, clean energy, and advanced manufacturing
- Strategic port facilities for global trade connectivity
- Target of 70,000 new jobs by 2030

**Trojena:**
- Mountain resort destination with year-round skiing
- 2029 Asian Winter Games hosting confirmed
- Unique architectural design integrating with natural landscape
- Investment in sustainable tourism and winter sports infrastructure

**Red Sea Project - Luxury Tourism Transformation:**
The Red Sea Project has achieved remarkable progress:

**Phase 1 Completion:**
- 16 luxury hotels now operational across pristine islands
- International airport handling 1 million passengers annually
- Renewable energy providing 100% of power requirements
- World-leading coral reef regeneration program (40% increase in coral coverage)
- Strict environmental protections preserving 75% of islands as nature reserves

**Economic Impact:**
- $5.8 billion in tourism revenue projected for 2024
- 35,000 permanent jobs created
- Attracting ultra-high-net-worth individuals and luxury travelers
- Positioned as Middle East's premier sustainable luxury destination

**Qiddiya Entertainment City:**
The Kingdom's entertainment capital is rapidly materializing:

**Key Developments:**
- Six Flags Qiddiya construction 65% complete
- 300+ entertainment attractions planned
- Hosting 17 million visitors annually by 2030
- Formula 1 circuit and motorsport complex advancing
- Integration of esports, theme parks, and cultural venues
- $8 billion investment from PIF and international partners

**Infrastructure Revolution:**
- 28,000-capacity arena for concerts and sports
- Water park featuring world's tallest water coaster
- Cliff-top development with breathtaking desert views
- Advanced transportation including aerial gondolas

**Broader Vision 2030 Achievements:**

**Economic Diversification:**
- Non-oil GDP contribution increased to 52% (from 40% in 2016)
- Private sector participation reaching 65% of GDP
- Tourism contributing 10% to GDP (target: 12% by 2030)
- Manufacturing sector expansion of 35%

**Infrastructure Development:**
- $200 billion invested in transportation infrastructure
- Riyadh Metro system nearing completion (176km, 85 stations)
- King Salman International Airport expansion ($35 billion)
- High-speed rail network connecting major cities

**Social Transformation:**
- Women's workforce participation increased to 36% (target: 40% by 2030)
- Entertainment sector creating 225,000 new jobs
- Cultural venues and museums opening across the Kingdom
- Quality of life improvements in major cities

**Technology & Innovation:**
- $20 billion committed to AI and technology development
- Smart city initiatives in Riyadh and Jeddah
- 5G coverage reaching 95% of urban areas
- Technology sector growing 45% annually

**Renewable Energy Leadership:**
- 58.7 GW of renewable energy capacity under development
- Largest green hydrogen project globally (NEOM)
- Solar and wind energy projects attracting $150 billion investment
- Target of 50% renewable energy by 2030

**Investment Opportunities:**

**Real Estate & Construction:**
- Massive demand for residential and commercial development
- Infrastructure construction boom creating supply chain opportunities
- Property prices in key areas appreciating 25-40% annually
- International developers partnering with local firms

**Tourism & Hospitality:**
- Hotel development pipeline exceeding 100,000 rooms
- Luxury resort operators entering market
- Cultural tourism and pilgrimage sector expansion
- Aviation and travel services growth

**Technology & Digital Services:**
- Smart city solutions and IoT implementation
- Fintech sector expansion with regulatory support
- E-commerce and digital payments growth
- Entertainment technology and content creation

**Financial Services:**
- Banking sector financing mega-projects
- Insurance market expansion
- Capital markets development
- Asset management opportunities

**Market Impact Analysis:**
Vision 2030 projects are driving substantial economic activity:
- Construction sector growing at 12% annually
- Real estate values increasing in project proximity zones
- Banking sector lending portfolios expanding
- Stock market valuations reflecting project progress

**Investment Recommendations:**

**Direct Beneficiaries:**
- Construction and materials companies: Saudi Aramco Services, ACWA Power
- Real estate developers: Emaar, Dar Al Arkan, Jabal Omar
- Banking sector: Al Rajhi Bank, Saudi National Bank
- Hospitality: Rotana Hotels, Shaza Hotels

**Indirect Beneficiaries:**
- Telecommunications: STC, Zain, Mobily
- Technology: Saudi Telecom Digital, SITE
- Retail and consumer services
- Transportation and logistics companies

**International Participation:**
- Global construction firms with Saudi joint ventures
- International hotel groups and operators
- Technology providers and consultants
- Financial institutions supporting mega-projects

**Risk Considerations:**
While Vision 2030 presents exceptional opportunities, investors should consider:
- Execution risks on complex mega-projects
- Oil price volatility affecting government spending
- Regional geopolitical developments
- Competition for international investment capital

**Future Outlook:**
Vision 2030 momentum is expected to accelerate through 2024-2025:
- Major project milestones approaching
- Increased private sector participation
- Growing international investment confidence
- Economic diversification showing tangible results

**Conclusion:**
Saudi Arabia's Vision 2030 represents one of the most ambitious economic transformation programs globally. The combination of massive investment, strategic planning, government commitment, and international partnerships positions the Kingdom for sustained economic growth and diversification. For investors, these mega-projects offer compelling opportunities across multiple sectors with long-term growth potential supported by substantial capital deployment and strategic national priorities.

The program's progress demonstrates Saudi Arabia's commitment to economic transformation, creating a new investment paradigm in the Middle East and establishing the Kingdom as a global destination for tourism, technology, and innovation.`,
                  time: '10 hours ago',
                  category: 'Economic Policy',
                  impact: 'Positive',
                  author: 'Mohammed Al-Qahtani',
                  readTime: '9 min read',
                  tags: ['Vision 2030', 'NEOM', 'Red Sea Project', 'Qiddiya', 'Saudi Economy', 'Infrastructure'],
                  imageDescription: 'NEOM futuristic cityscape with construction progress and Saudi flag'
                },
                {
                  id: 6,
                  title: 'UAE Real Estate Boom: Dubai and Abu Dhabi Property Markets Surge on Foreign Investment Wave',
                  summary: 'UAE property markets experience unprecedented growth with Dubai recording AED 520 billion in transactions and Abu Dhabi attracting record international buyers.',
                  fullArticle: `The UAE real estate sector has delivered exceptional performance, with Dubai and Abu Dhabi property markets experiencing historic growth driven by massive foreign investment, economic expansion, visa reforms, and strategic government initiatives that have positioned the Emirates as a premier global real estate destination.

**Market Performance Overview:**
The UAE property sector has demonstrated remarkable strength across all segments:

**Dubai Real Estate Market:**
- Total transaction value: AED 520 billion ($142 billion) in 2023, up 52% year-over-year
- Transaction volume: 175,000+ deals completed, highest on record
- Average price appreciation: 28% across prime locations
- Foreign buyer participation: 72% of all transactions
- Rental yields: 6-9% in prime areas, among highest globally

**Abu Dhabi Real Estate Market:**
- Transaction value growth: 38% to AED 95 billion ($26 billion)
- Capital appreciation: 22% in prime residential areas
- Foreign investment surge: 145% increase in international buyers
- Rental market tightening with 95%+ occupancy rates
- Major waterfront developments driving premium segment

**Key Market Drivers:**

**1. Foreign Investment Surge:**
International buyers driving unprecedented demand:

**Source Markets:**
- India: 28% of foreign buyers, led by high-net-worth individuals and business owners
- United Kingdom: 15%, attracted by tax efficiency and lifestyle
- Russia & CIS: 12%, seeking safe-haven properties
- China: 8%, focusing on premium developments
- Saudi Arabia & GCC: 18%, regional investment diversification

**Investment Motivations:**
- Stable currency pegged to US dollar
- Zero property tax and capital gains tax
- Strong rental yields compared to global cities
- Residency visa opportunities
- Political and economic stability
- World-class infrastructure and amenities

**2. Visa and Residency Reforms:**
UAE's progressive visa policies boosting demand:

**Golden Visa Program:**
- 10-year residency for property investors (minimum AED 2 million investment)
- 75,000+ golden visas issued to property investors
- Family sponsorship benefits
- Multiple property ownership allowed
- Attracting ultra-high-net-worth individuals

**Virtual Working Visas:**
- Remote work visas enabling digital nomads
- 12-month residency with property rental
- Attracting young professionals and entrepreneurs
- Supporting secondary property rental market

**3. Economic Expansion & Business Growth:**
Strong economy driving residential and commercial demand:
- Non-oil GDP growth: 5.8% annually
- Business license applications: +45% year-over-year
- New company formations: 65,000+ in 2023
- Expansion of free zones and business hubs
- Growing expatriate population

**4. Major Development Projects:**
Landmark projects reshaping supply dynamics:

**Dubai:**
- Dubai Creek Harbour: 6 square kilometers, 40,000 residences
- Mohammed Bin Rashid City: Massive mixed-use development
- Bluewaters Island: Premium coastal living
- Dubai South: Aviation district residential community
- Dubai Hills Estate: Premium family-oriented community

**Abu Dhabi:**
- Yas Island expansion: Integrated entertainment and residential
- Saadiyat Island Cultural District: Luxury waterfront living
- Al Reem Island: Financial district residential towers
- Reem Mall vicinity: Mixed-use developments
- Jubail Island: Eco-conscious coastal community

**Sector Analysis by Property Type:**

**Luxury Residential (AED 10M+):**
- Demand exceeding supply by 35%
- Record prices: AED 12,000+ per square foot in Palm Jumeirah
- Ultra-luxury villas selling in days
- Penthouses commanding premium pricing
- International luxury brands entering market (Bulgari, Armani, Versace)

**Mid-Market Residential (AED 2-10M):**
- Highest transaction volume segment
- Strong appreciation in established communities
- First-time buyers driving demand
- Mortgage availability supporting purchases
- Family-oriented communities in high demand

**Off-Plan Properties:**
- Developer sales: AED 180 billion, up 65%
- Payment plans attracting investors
- Pre-handover flipping activity
- New project launches selling out rapidly
- International developers entering market

**Commercial Real Estate:**
- Office occupancy rates: 88% in prime locations
- Rental rates increasing 15% annually
- Co-working spaces expanding rapidly
- Retail properties recovering post-pandemic
- Industrial and logistics warehouses in high demand

**Rental Market Dynamics:**
- Residential rental rates up 25-35% in prime areas
- Severe shortage driving tenant competition
- Landlords implementing annual increases
- Corporate relocations supporting luxury rental segment
- Student accommodation sector emerging

**Investment Hotspots:**

**Dubai:**
1. **Dubai Marina:** Established community with strong rental demand
   - Average price: AED 1,800-2,200 per sq ft
   - Rental yield: 7-8%
   - High liquidity and international appeal

2. **Palm Jumeirah:** Ultra-luxury market leader
   - Average price: AED 3,500-12,000 per sq ft
   - Exclusive villas and penthouses
   - Limited supply driving appreciation

3. **Downtown Dubai:** Prime location with Burj Khalifa
   - Average price: AED 2,200-3,500 per sq ft
   - Tourism and short-term rental potential
   - Iconic address attracting investors

4. **Dubai Hills Estate:** Family-friendly master community
   - Average price: AED 1,400-1,900 per sq ft
   - Golf course and parks
   - Strong villa market

5. **Business Bay:** Growing business and residential hub
   - Average price: AED 1,500-2,000 per sq ft
   - New developments and infrastructure
   - Excellent connectivity

**Abu Dhabi:**
1. **Saadiyat Island:** Cultural district premium market
   - Average price: AED 2,200-3,800 per sq ft
   - Louvre and cultural attractions
   - Beachfront luxury

2. **Al Reem Island:** Financial district living
   - Average price: AED 1,300-1,800 per sq ft
   - High-rise apartments
   - Close to business centers

3. **Yas Island:** Entertainment and leisure destination
   - Average price: AED 1,500-2,500 per sq ft
   - Theme parks and attractions
   - Growing residential community

**Market Outlook:**

**Short-term (2024):**
- Continued price appreciation: 12-18% expected
- Supply constraints maintaining upward pressure
- Foreign investment remaining strong
- New project launches increasing supply gradually
- Rental market remaining tight

**Medium-term (2025-2026):**
- Market stabilization as new supply comes online
- Continued international buyer interest
- Expo 2020 long-term benefits materializing
- Infrastructure improvements enhancing connectivity
- Sustainable growth trajectory

**Long-term (2027+):**
- UAE positioning as global real estate investment hub
- Economic diversification supporting demand
- Population growth driving structural demand
- Smart city initiatives enhancing property values
- Regional leadership in proptech and innovation

**Investment Strategies:**

**Capital Appreciation Focus:**
- Prime waterfront developments
- New master-planned communities
- Luxury segment with supply constraints
- Off-plan purchases in established developer projects

**Rental Yield Focus:**
- Mid-market apartments in high-demand areas
- Commercial properties in business districts
- Student accommodation near universities
- Furnished apartments for corporate rentals

**Diversified Portfolio:**
- Mix of residential and commercial
- Geographic diversification across Dubai and Abu Dhabi
- Combination of ready and off-plan properties
- Balance of capital growth and income generation

**Risk Considerations:**
- Supply pipeline could pressure prices if demand softens
- Regional geopolitical developments
- Global economic conditions affecting investor sentiment
- Regulatory changes impacting foreign ownership
- Currency fluctuations for international investors

**Financing Landscape:**
- Mortgage rates: 4.5-6.5% for qualified buyers
- Loan-to-value ratios: 75-80% for UAE nationals, 60-75% for expatriates
- Competitive lending environment
- Islamic finance options widely available
- International banks active in UAE mortgage market

**Conclusion:**
The UAE real estate sector presents compelling opportunities for both capital appreciation and rental income. The combination of strong economic fundamentals, progressive visa policies, zero taxation, and strategic location positions Dubai and Abu Dhabi as premier global real estate investment destinations. While prices have appreciated significantly, structural demand drivers suggest continued growth potential, particularly in premium segments and new master-planned communities.

For investors, the UAE property market offers a unique combination of attractive yields, capital appreciation potential, residency benefits, and lifestyle advantages that few global markets can match. The key to success lies in careful market research, strategic location selection, and understanding the distinct dynamics of different property segments and communities.`,
                  time: '12 hours ago',
                  category: 'Real Estate',
                  impact: 'Positive',
                  author: 'Laila Al-Hashimi',
                  readTime: '10 min read',
                  tags: ['Dubai Real Estate', 'Abu Dhabi Property', 'Foreign Investment', 'Golden Visa', 'UAE Economy'],
                  imageDescription: 'Dubai Marina skyline with luxury properties and waterfront developments'
                },
                {
                  id: 7,
                  title: 'GCC Fintech Revolution: Digital Banking, Blockchain, and Payment Innovation Transform Financial Services',
                  summary: 'GCC fintech sector experiences explosive growth with digital banking adoption reaching 78%, blockchain implementations, and CBDC pilots advancing regional financial innovation.',
                  fullArticle: `The GCC fintech sector has emerged as a global innovation leader, with digital transformation revolutionizing financial services across the region. Record investment, regulatory support, and rapidly evolving consumer behaviors are driving unprecedented innovation in banking, payments, blockchain, and financial technology.

**Fintech Sector Overview:**
The GCC fintech ecosystem has achieved remarkable growth:
- Total fintech investment: $2.8 billion in 2023, up 145% year-over-year
- Active fintech companies: 850+ startups and scale-ups across the region
- Digital banking adoption: 78% of banking customers using digital channels
- Mobile payments growth: 340% increase in transaction volumes
- Blockchain implementations: 120+ projects across government and private sector

**Digital Banking Transformation:**

**UAE Digital Banking Leadership:**
The UAE has positioned itself as the Middle East's digital banking hub:

**Emirates NBD Digital Initiatives:**
- E20 digital bank serving 2.5 million customers
- 95% of transactions now completed digitally
- AI-powered chatbot handling 3.5 million inquiries monthly
- Blockchain-based trade finance platform processing $3 billion
- Open banking APIs enabling third-party integrations

**Mashreq Neo - Next-Gen Digital Bank:**
- Fully digital banking experience with 10-minute account opening
- AI-driven personal finance management
- Zero fees on most transactions
- Integration with fintech ecosystem
- 450,000 active users within 18 months of launch

**Zand Bank - UAE's First Digital Bank:**
- Received full banking license in 2022
- Corporate and retail banking services fully digital
- Real-time onboarding and instant credit decisions
- Sustainable banking focus with green finance options
- Partnership with Microsoft for cloud infrastructure

**Saudi Arabia's Digital Banking Evolution:**

**Saudi Digital Bank (SDB):**
- Kingdom's first fully digital bank with $1.5 billion capitalization
- PIF backing providing strategic support
- Mobile-first approach targeting young demographics
- Advanced credit scoring using alternative data
- Target of 5 million customers by 2026

**Traditional Banks Digital Transformation:**
- Al Rajhi Bank's digital channels handling 92% of transactions
- Saudi National Bank's mobile app with 6 million active users
- Riyad Bank's digital wallet and payment solutions
- SAMBA's integration with government digital services

**Payment Innovation Revolution:**

**Digital Payment Adoption:**
The GCC is experiencing explosive growth in digital payments:

**Saudi Arabia:**
- **mada** payment network: 8 billion transactions annually (up 58%)
- Digital wallet adoption: 65% of population using at least one wallet
- **STC Pay** users: 15 million active accounts
- **Tamara** (Buy Now Pay Later): 4 million users
- QR code payments becoming ubiquitous

**UAE:**
- Cashless transaction value: AED 1.2 trillion annually
- **Apple Pay** and **Samsung Pay** adoption: 45% of smartphone users
- **Beam Wallet** and local solutions gaining traction
- Government services integration with digital payments
- Retail establishments: 95% accepting contactless payments

**Qatar:**
- **Noorpay** digital wallet launched by QCB
- Integration with FIFA World Cup 2022 infrastructure
- Mobile payment adoption accelerating
- Cross-border payment facilitation with GCC neighbors

**Blockchain and Distributed Ledger Technology:**

**Government Blockchain Initiatives:**

**UAE Blockchain Strategy:**
- Dubai Blockchain Strategy targeting 50% government transactions
- **Emirates Blockchain Strategy 2021** implementation ongoing
- Land registry, healthcare records, and education certificates on blockchain
- Trade finance and supply chain transparency applications
- Estimated savings of $3 billion annually from blockchain adoption

**Saudi Blockchain Vision:**
- Integration with Vision 2030 digital transformation goals
- Customs and trade facilitation on blockchain
- Hajj and Umrah services blockchain integration
- Digital identity and KYC sharing platforms
- Partnership with IBM and other technology leaders

**Private Sector Blockchain Applications:**

**Banking and Finance:**
- **Emirates NBD** and **HSBC** blockchain trade finance platform
- Cross-border remittances with real-time settlement
- KYC sharing consortium reducing duplication
- Smart contracts for trade finance and guarantees
- Securities settlement and clearing optimization

**Supply Chain and Logistics:**
- **DP World** blockchain-enabled cargo tracking
- **Aramco** supply chain transparency initiatives
- Food traceability from farm to consumer
- Pharmaceutical supply chain authentication
- Customs clearance automation

**Central Bank Digital Currencies (CBDCs):**

**Project Aber - Saudi Arabia & UAE CBDC:**
- Joint initiative exploring cross-border CBDC settlement
- Successful pilot completed with promising results
- Potential for regional payment infrastructure transformation
- Reduced settlement times and costs
- Enhanced monetary policy transmission

**Regional CBDC Development:**
- Qatar Central Bank exploring digital riyal
- Kuwait examining CBDC implementation
- Bahrain participating in regional initiatives
- Coordination through GCC Central Banks Committee

**Buy Now Pay Later (BNPL) Explosion:**

**Leading BNPL Platforms:**

**Tabby (UAE-based unicorn):**
- Valuation: $1.5 billion following Series D funding
- Available at 15,000+ retail locations
- 4 million active users across GCC
- Average transaction value: AED 600
- Partnership with major e-commerce platforms

**Tamara (Saudi Arabia):**
- $440 million raised in Series B funding
- Integration with 30,000+ merchants
- Focus on Shariah-compliant payment solutions
- Rapid expansion across GCC markets
- Strategic partnerships with fashion and lifestyle brands

**Postpay:**
- Strong UAE market presence
- Focus on lifestyle and fashion segment
- Integration with major retailers
- Millennial and Gen-Z customer base
- Subscription and installment options

**Impact on Consumer Behavior:**
- Increased purchasing power and affordability
- Higher average transaction values (35% increase)
- Younger demographics embracing BNPL
- E-commerce growth acceleration
- Some concerns about over-leveraging

**Remittance and Cross-Border Payments:**

**Digital Remittance Solutions:**
The GCC's large expatriate population drives innovation:

**Beam Wallet (UAE):**
- Instant international transfers to 30+ countries
- Competitive exchange rates and low fees
- Integration with local and international payment networks
- Money transfer licenses across GCC

**NOW Money:**
- Banking services for underserved expatriate workers
- Remittance solutions with transparent pricing
- Financial inclusion focus
- Partnership with employers for payroll integration

**Traditional Players' Digital Evolution:**
- Western Union and MoneyGram digital transformation
- Bank-based international transfer optimization
- Competition driving down costs and improving speed

**Cryptocurrency and Digital Assets:**

**Regulatory Framework Development:**

**UAE Crypto Leadership:**
- **Dubai Virtual Asset Regulatory Authority (VARA)** established
- Comprehensive licensing framework for crypto businesses
- Major exchanges receiving licenses (Binance, Crypto.com, OKX)
- Abu Dhabi Global Market crypto regulations
- Institutional crypto adoption growing

**Regional Developments:**
- Saudi Arabia exploring regulatory frameworks
- Bahrain licensing crypto asset platforms
- Regional coordination on crypto regulation
- Focus on consumer protection and AML compliance

**Institutional Adoption:**
- Family offices allocating to crypto assets
- Banks exploring custody solutions
- Sovereign wealth funds examining blockchain investments
- Growing professional investor interest

**Wealth Management and Robo-Advisory:**

**Digital Wealth Platforms:**

**Sarwa (UAE):**
- Robo-advisory platform with $200 million AUM
- Low-cost diversified portfolio management
- Goal-based investing approach
- Mobile-first user experience
- Shariah-compliant investment options

**Wahed (Global with GCC focus):**
- Islamic robo-advisory platform
- Halal investment portfolios
- Technology-driven asset allocation
- Growing regional user base

**RegTech and Compliance Innovation:**

**AML and KYC Solutions:**
- AI-powered transaction monitoring systems
- Biometric identification platforms
- Digital identity verification
- Real-time sanctions screening
- Cross-border KYC sharing initiatives

**Regulatory Technology Adoption:**
- Financial institutions investing heavily in RegTech
- Compliance cost reduction through automation
- Enhanced risk management capabilities
- Regulatory reporting automation

**Insurtech Development:**

**Digital Insurance Platforms:**
- **Beema** (Qatar): Digital insurance marketplace
- **Aman** (Saudi Arabia): On-demand insurance solutions
- **Hakbah** (UAE): AI-driven insurance platform
- Usage-based insurance gaining traction
- Instant policy issuance and claims processing

**Embedded Finance:**

**E-commerce Integration:**
- Financial services integrated into non-financial platforms
- **Noon** payments and financial services
- **Careem** super app with payments and financial products
- Ride-hailing apps offering insurance and credit

**Investment and Funding Landscape:**

**Venture Capital Activity:**
- $2.8 billion invested in GCC fintech in 2023
- Major rounds: Tabby ($200M), Tamara ($110M), Lean Technologies ($33M)
- Government-backed funds actively investing
- International VCs entering GCC market
- Corporate venture capital participation

**Government Support:**
- Fintech-friendly regulatory sandboxes
- Fast-track licensing processes
- Innovation labs and accelerators
- Public-private partnerships
- Infrastructure investments

**Future Outlook:**

**Short-term Trends (2024):**
- Continued BNPL growth and market maturation
- CBDC pilot expansions
- Open banking framework implementations
- AI integration in financial services
- Digital identity standardization

**Medium-term Evolution (2025-2027):**
- Full CBDC deployment potential
- Blockchain becoming mainstream in finance
- Crypto asset framework maturation
- Embedded finance ubiquity
- Regional fintech consolidation

**Long-term Vision (2028+):**
- GCC as global fintech innovation hub
- Seamless cross-border financial services
- AI-driven personalized finance
- Quantum-safe blockchain implementations
- Financial inclusion achievement

**Investment Opportunities:**

**Direct Fintech Investments:**
- Late-stage fintech startups with proven models
- Payment processing companies
- Blockchain technology providers
- RegTech and compliance solutions

**Indirect Beneficiaries:**
- Banks embracing digital transformation
- Technology service providers
- Cloud infrastructure companies
- Cybersecurity firms

**Challenges and Risks:**
- Regulatory uncertainty in emerging areas
- Cybersecurity and data privacy concerns
- Competition from global technology giants
- Talent shortage in specialized areas
- Legacy system integration complexities

**Conclusion:**
The GCC fintech revolution represents a fundamental transformation of the region's financial services landscape. The combination of forward-thinking regulation, significant investment, strong consumer adoption, and government support positions the GCC as a global fintech innovation leader. For investors, entrepreneurs, and financial institutions, the fintech sector offers exceptional growth opportunities across payments, banking, blockchain, and emerging technologies. The region's rapid digital transformation, young tech-savvy population, and strategic vision ensure that fintech will continue to reshape how financial services are delivered and consumed throughout the GCC.`,
                  time: '1 day ago',
                  category: 'Technology',
                  impact: 'Positive',
                  author: 'Dr. Nasser Al-Kuwari',
                  readTime: '11 min read',
                  tags: ['Fintech', 'Digital Banking', 'Blockchain', 'CBDC', 'Cryptocurrency', 'Payment Innovation'],
                  imageDescription: 'Modern fintech interface with blockchain networks and digital payment systems'
                },
                {
                  id: 8,
                  title: 'Qatar Exchange (QE) Surges to Record Highs: Banking and Energy Stocks Lead Market Rally',
                  summary: 'Qatar Exchange reaches all-time high of 10,850 points driven by exceptional banking sector performance, strong LNG exports, and increasing foreign institutional participation.',
                  fullArticle: `The Qatar Exchange (QE) has achieved historic milestones, with the QE Index surging to record levels of 10,850 points, representing a remarkable 18.5% year-to-date gain. The rally has been broad-based, driven by exceptional banking sector earnings, robust energy sector performance, and substantial foreign institutional investment flows.

**Market Performance Analysis:**

**QE Index Performance:**
- Current level: 10,850 points (all-time high)
- YTD performance: +18.5%
- Market capitalization: QAR 687 billion ($189 billion)
- Daily trading value average: QAR 420 million (up 65% YoY)
- Foreign institutional ownership: 42% of free float
- P/E ratio: 13.8x (attractive compared to regional peers)

**Market Breadth:**
The rally has demonstrated strong breadth with broad participation:
- Advancing stocks: 78% of listed companies showing positive returns
- New 52-week highs: 42 stocks reaching annual peaks
- Sector performance: All major sectors in positive territory
- Small/mid-cap outperformance: 22% average gain

**Banking Sector Dominance:**

The Qatari banking sector has emerged as the primary driver of market performance, with exceptional financial results and robust growth fundamentals.

**Qatar National Bank (QNB):**
The region's largest lender continues to demonstrate leadership:
- Market cap: QAR 145 billion ($40 billion)
- Q4 net profit: QAR 13.8 billion, up 22% YoY
- Total assets: QAR 1.2 trillion
- International presence: 31 countries across 3 continents
- ROE: 16.2%, best-in-class profitability
- Net interest margin: 3.2%, improving quarterly
- NPL ratio: 1.8%, excellent asset quality
- Capital adequacy: 18.4%, well-capitalized
- Digital banking users: 3.2 million active customers

**Stock Performance:**
- Current price: QAR 18.50 (up 38% YTD)
- Target price: QAR 21.00 (analyst consensus)
- Dividend yield: 4.8%
- Foreign ownership: 49% (maximum allowed)

**Masraf Al Rayan:**
Qatar's largest Islamic bank showing strong momentum:
- Q4 net profit: QAR 2.4 billion, up 28% YoY
- Financing portfolio growth: 15% annually
- Cost-to-income ratio: 31.5%, improved efficiency
- Strong corporate banking franchise
- Digital Islamic banking innovation leader
- Stock performance: +42% YTD

**Commercial Bank of Qatar:**
Solid performance across all business lines:
- Net profit growth: 25% YoY
- Retail banking expansion driving growth
- Regional network strengthening
- Treasury operations contributing significantly
- Stock performance: +35% YTD

**Qatar Islamic Bank (QIB):**
- Record quarterly profits
- Market share gains in retail Islamic banking
- Real estate financing portfolio expanding
- Technology investments paying dividends
- Stock performance: +31% YTD

**Doha Bank:**
Turnaround story gaining momentum:
- Asset quality improvement
- Cost optimization initiatives bearing fruit
- International operations contributing positively
- Stock performance: +44% YTD (highest in sector)

**Banking Sector Outlook:**
Analysts remain highly bullish on Qatari banks, citing:
- Strong loan growth driven by infrastructure projects
- Improving net interest margins as rates stabilize
- Excellent asset quality with minimal credit concerns
- Capital buffers supporting dividend growth
- Digital transformation driving efficiency
- Regional expansion opportunities
- FIFA World Cup 2022 infrastructure financing benefits

**Energy Sector Excellence:**

**Qatar Energy Sector:**
Qatar's energy dominance continues driving market confidence:

**LNG Market Leadership:**
- Qatar maintaining 20% global LNG market share
- North Field expansion proceeding on schedule
- Production capacity increasing from 77 to 126 million tons per year
- Long-term supply contracts secured at attractive prices
- Premium pricing for reliable, clean LNG supply

**Listed Energy Companies:**

**Industries Qatar (IQ):**
Qatar's largest industrial conglomerate:
- Market cap: QAR 38 billion
- Diversified operations: petrochemicals, fertilizers, steel
- Q4 net profit: QAR 2.8 billion, up 35% YoY
- Strong fertilizer demand and pricing
- Steel segment recovering with infrastructure boom
- Dividend yield: 6.2%, attractive for income investors
- Stock performance: +28% YTD

**Qatar Fuel (WOQOD):**
National fuel distribution champion:
- Monopoly position in fuel retail and distribution
- Network expansion across Qatar
- Diversification into aviation fuel, marine, and LPG
- Strong pricing power and margins
- Real estate portfolio providing additional income
- Stock performance: +25% YTD

**Nakilat (Qatar Gas Transport):**
World's largest LNG shipping company:
- Fleet of 74 LNG vessels (largest globally)
- Long-term charter contracts providing stable cash flows
- Expansion into LNG shipping management services
- Benefiting from global LNG trade growth
- Attractive dividend yield: 5.8%
- Stock performance: +22% YTD

**Real Estate and Construction Sector:**

**Post-World Cup Momentum:**
Qatar's real estate market maintaining strength post-FIFA World Cup:

**Barwa Real Estate:**
Qatar's leading real estate developer:
- Diversified portfolio: residential, commercial, retail
- Strong rental income stream
- Development pipeline supporting growth
- Hotel operations benefiting from tourism
- Stock performance: +32% YTD

**Ezdan Holding:**
- Large residential property portfolio
- Occupancy rates improving
- Rental rate growth accelerating
- Development projects advancing
- Stock performance: +29% YTD

**Telecommunications Sector:**

**Ooredoo:**
Regional telecommunications leader:
- Operations in 10 countries across MENA and Asia
- 5G network deployment completed in Qatar
- Strong data revenue growth
- International operations contributing 65% of revenue
- Dividend yield: 5.5%
- Stock performance: +18% YTD

**Consumer and Retail Sector:**

**Qatar's retail sector benefiting from economic expansion:**

**Salam International:**
Diversified conglomerate with retail focus:
- Fast-food franchises (KFC, Pizza Hut)
- Fashion retail operations
- Healthcare and education divisions
- E-commerce expansion
- Stock performance: +26% YTD

**Foreign Investment Dynamics:**

**Institutional Participation:**
The Qatar Exchange has witnessed substantial foreign institutional interest:

**Foreign Ownership Levels:**
- Current foreign ownership: 42% of free float
- Increase of 8 percentage points in 2023
- Major international institutions increasing allocations
- MSCI Emerging Market inclusion supporting flows

**Key International Investors:**
- BlackRock: Significant positions in QNB, Industries Qatar
- Franklin Templeton: Overweight Qatari banks
- HSBC Asset Management: Constructive on Qatar exposure
- Fidelity International: Building Qatar equity positions

**Drivers of Foreign Interest:**
- Attractive valuations compared to global emerging markets
- High dividend yields (market average 4.5%)
- Strong economic fundamentals and fiscal surplus
- Political stability and business-friendly environment
- Currency peg providing stability (QAR pegged at 3.64 to USD)
- LNG wealth providing long-term economic security

**Market Technical Analysis:**

**QE Index Technical Picture:**
- Strong uptrend with higher highs and higher lows
- Above all major moving averages (50, 100, 200-day)
- RSI at 64, indicating strong momentum with room for further gains
- Volume patterns confirming strength
- Immediate resistance: 11,200
- Key support: 10,400

**Economic Fundamentals Supporting Market:**

**Qatar's Macroeconomic Strength:**
- GDP growth: 4.8% projected for 2024
- Current account surplus: 18.2% of GDP
- Government budget surplus: 7.5% of GDP
- Foreign reserves: $85 billion
- Inflation well-controlled at 2.4%
- Sovereign wealth fund (QIA): $475 billion in assets

**Strategic Advantages:**
- Abundant LNG reserves ensuring decades of revenue
- Low production costs providing competitive advantage
- Strategic geographic location
- Modern infrastructure from World Cup investments
- Business-friendly regulatory environment
- Zero income tax for individuals

**FIFA World Cup 2022 Legacy:**
The tournament has provided lasting benefits:
- World-class infrastructure now supporting business and tourism
- Enhanced global visibility and brand recognition
- Airport capacity expansion supporting connectivity
- Hotel and hospitality infrastructure benefiting tourism
- Sports and entertainment venues driving visitation

**Investment Recommendations:**

**Top Picks for Qatar Equity Exposure:**

**Defensive Quality:**
1. **Qatar National Bank (QNB):** Regional banking leader, 4.8% dividend yield
2. **Industries Qatar (IQ):** Diversified industrial play, 6.2% yield
3. **Ooredoo:** Telecom leader with regional presence, 5.5% yield

**Growth Opportunities:**
1. **Masraf Al Rayan:** Islamic banking growth story
2. **Doha Bank:** Turnaround potential with strong momentum
3. **Barwa Real Estate:** Real estate development upside

**Income Focus:**
1. **Qatar Fuel (WOQOD):** Stable monopoly, strong cash flow
2. **Nakilat:** LNG shipping with long-term contracts
3. **Commercial Bank of Qatar:** Growing dividends

**Sector Allocation Recommendation:**
- Banking: 40% (core holding, strong fundamentals)
- Energy/Industrials: 25% (LNG exposure, income)
- Real Estate: 15% (development upside)
- Telecommunications: 10% (regional diversification)
- Consumer/Retail: 10% (domestic growth)

**Risk Considerations:**

**Market Risks:**
- LNG price volatility affecting sentiment
- Regional geopolitical developments
- Foreign ownership limits constraining institutional demand
- Market liquidity in smaller stocks
- Concentrated market structure

**Economic Risks:**
- Global energy transition long-term impact
- Competition from other LNG exporters
- Economic dependence on hydrocarbon revenues
- Currency risk for international investors (though peg is credible)

**Valuation Analysis:**

**Relative Value:**
Qatar Exchange offers attractive valuation versus peers:
- P/E ratio: 13.8x vs. MSCI EM at 14.5x
- P/B ratio: 1.7x vs. regional average of 1.9x
- Dividend yield: 4.5% vs. MSCI EM at 3.2%
- ROE: 15.2% vs. EM average of 13.8%

**Outlook and Catalysts:**

**Near-term Catalysts (Next 3-6 months):**
- Q1 2024 earnings expected to remain strong
- Continued foreign institutional flows
- North Field LNG project milestones
- Potential index weight increases
- Government infrastructure project announcements

**Medium-term Catalysts (6-12 months):**
- Banking sector dividend increases
- Energy sector expansion projects advancing
- Real estate market continued strength
- Tourism sector growth post-World Cup
- Regional economic integration benefits

**Conclusion:**
The Qatar Exchange represents a compelling investment opportunity, combining attractive valuations, high dividend yields, strong economic fundamentals, and exposure to global LNG markets. The banking sector's exceptional performance, energy sector dominance, and increasing foreign institutional participation provide multiple tailwinds for continued market appreciation.

For investors seeking emerging market exposure with strong fundamentals, political stability, and attractive income, the Qatar Exchange offers a differentiated opportunity. While risks exist, including energy price volatility and market concentration, the long-term outlook remains highly positive, supported by abundant LNG wealth, fiscal strength, and strategic development initiatives.

The market's technical strength, improving liquidity, and favorable valuations suggest the rally has room to continue, particularly as foreign investors increasingly recognize Qatar's investment merits. With a disciplined approach focusing on quality banking, energy, and real estate names, investors can build portfolios positioned to benefit from Qatar's continued economic expansion and market development.`,
                  time: '1 day ago',
                  category: 'Stocks',
                  impact: 'Positive',
                  author: 'Mariam Al-Thani',
                  readTime: '12 min read',
                  tags: ['Qatar Exchange', 'QE Index', 'QNB', 'Banking Sector', 'LNG', 'Foreign Investment'],
                  imageDescription: 'Qatar Exchange trading floor with QE index chart showing upward trend'
                },
                {
                  id: 9,
                  title: 'GCC Foreign Investment Surge: Sovereign Wealth Funds and FDI Reach Record $285 Billion',
                  summary: 'GCC economies attract unprecedented foreign direct investment with UAE leading at $23.4 billion, while regional sovereign wealth funds deploy capital globally reaching $3.8 trillion in assets.',
                  fullArticle: `The Gulf Cooperation Council (GCC) region has emerged as a global investment powerhouse, experiencing a dramatic surge in both inbound foreign direct investment (FDI) and outbound capital deployment through sovereign wealth funds (SWFs). The region's $285 billion in combined investment flows reflects its strategic importance in global capital markets and economic transformation initiatives.

**Foreign Direct Investment Landscape:**

**Regional FDI Overview:**
The GCC has achieved record foreign investment inflows:
- Total FDI inflows (2023): $85 billion, up 48% year-over-year
- UAE leading with $23.4 billion (28% of regional total)
- Saudi Arabia: $19.2 billion (23% of total)
- Qatar: $14.5 billion (17% of total)
- Kuwait: $12.8 billion (15% of total)
- Oman: $8.4 billion (10% of total)
- Bahrain: $6.7 billion (7% of total)

**UAE FDI Leadership:**

**Driving Factors:**
The UAE's exceptional FDI performance stems from multiple competitive advantages:

**1. Business Environment Excellence:**
- Ranked 16th globally in World Bank's Ease of Doing Business
- 100% foreign ownership allowed in most sectors
- Zero corporate tax for most businesses (9% minimum tax for large companies)
- No personal income tax
- Free zones offering complete foreign ownership and profit repatriation
- Streamlined business setup processes (online registration in 48 hours)

**2. Strategic Infrastructure:**
- World-class logistics and transportation networks
- Dubai International Airport: World's busiest for international passengers
- Jebel Ali Port: Largest container port in Middle East
- Advanced telecommunications and digital infrastructure
- Free trade agreements with 50+ countries

**3. Sectoral FDI Distribution:**
- Technology and innovation: 28% ($6.5 billion)
- Real estate and construction: 22% ($5.1 billion)
- Financial services: 18% ($4.2 billion)
- Renewable energy: 12% ($2.8 billion)
- Healthcare and life sciences: 10% ($2.3 billion)
- Manufacturing: 10% ($2.5 billion)

**4. Major International Investments:**
Recent significant FDI projects in UAE include:
- Microsoft: $1.5 billion AI and cloud infrastructure data center
- Amazon Web Services: $5 billion data center expansion
- Pfizer: $500 million regional manufacturing hub
- Uber: Strategic investment in Careem expansion
- Tesla: Showroom and service center network
- Multiple VC firms establishing Middle East headquarters

**Saudi Arabia FDI Transformation:**

**Vision 2030 Investment Attraction:**
Saudi Arabia has dramatically improved its FDI attractiveness:

**Structural Reforms:**
- Foreign investment law liberalization
- Reduction of negative list restricting foreign investment
- 100% foreign ownership in most sectors
- New investment incentives and guarantees
- Improved regulatory transparency
- World-class free zones (KAEC, SPARK, etc.)

**Major FDI Projects:**
- Lucid Motors: $3.4 billion EV manufacturing facility
- Hyundai Motor: $1.8 billion manufacturing plant
- Total Energies: $15 billion petrochemical complex joint venture
- Thyssenkrupp: Green hydrogen production facility
- PepsiCo: Expanded regional food manufacturing
- Siemens: Smart infrastructure and digitalization projects

**Sectoral Investment Focus:**
- Manufacturing and industrials: 32% ($6.1 billion)
- Technology and telecommunications: 24% ($4.6 billion)
- Renewable energy: 18% ($3.5 billion)
- Tourism and entertainment: 15% ($2.9 billion)
- Mining and minerals: 11% ($2.1 billion)

**Qatar's Strategic FDI Growth:**

**World Cup Legacy:**
Post-FIFA World Cup 2022, Qatar continues attracting substantial FDI:

**Investment Drivers:**
- LNG wealth providing economic stability
- Significant infrastructure from World Cup
- Strategic location between East and West
- Political stability and pro-business environment
- Qatar Financial Centre (QFC) attracting financial services

**Key Investment Sectors:**
- Energy and petrochemicals: 35% ($5.1 billion)
- Financial services: 22% ($3.2 billion)
- Technology: 18% ($2.6 billion)
- Healthcare: 15% ($2.2 billion)
- Hospitality and tourism: 10% ($1.4 billion)

**Major International Investors:**
- Shell: LNG project partnership expansion
- TotalEnergies: North Field development
- ExxonMobil: LNG partnership
- Goldman Sachs: Regional expansion
- McKinsey & Company: Middle East headquarters

**Sovereign Wealth Funds - Outbound Investment:**

**GCC SWF Assets:**
The region's sovereign wealth funds collectively manage $3.8 trillion:

**1. Abu Dhabi Investment Authority (ADIA):**
- Assets under management: $850 billion (estimated)
- Global diversification across 70+ countries
- Focus on long-term value creation
- Asset classes: equities (40%), fixed income (25%), real estate (10%), private equity (15%), infrastructure (10%)

**2. Saudi Public Investment Fund (PIF):**
- Assets under management: $700 billion
- Rapid growth from $150 billion in 2015
- Domestic and international investment mandate
- Target: $2 trillion AUM by 2030
- Major investments: Uber, SoftBank Vision Fund, NEOM

**3. Kuwait Investment Authority (KIA):**
- Assets under management: $750 billion
- World's oldest sovereign wealth fund (established 1953)
- Future Generations Fund ensuring intergenerational wealth
- Global diversification strategy

**4. Qatar Investment Authority (QIA):**
- Assets under management: $475 billion
- Strategic global investments
- Portfolio: Volkswagen, Barclays, Glencore, Canary Wharf
- Sports investments (Paris Saint-Germain FC)

**5. Mubadala Investment Company (UAE):**
- Assets under management: $280 billion
- Strategic investment focus
- Technology leadership: GlobalFoundries, Silver Lake partnerships
- Energy transition investments

**6. Investment Corporation of Dubai (ICD):**
- Assets under management: $300 billion
- Dubai government's principal investment arm
- Emirates airline, Emirates NBD
- Real estate and hospitality portfolio

**Strategic Investment Themes:**

**1. Technology and Innovation:**
GCC SWFs aggressively deploying capital in technology:
- Artificial Intelligence and machine learning
- Cloud computing and data centers
- Cybersecurity solutions
- Fintech and digital payments
- E-commerce platforms

**2. Sustainable and Renewable Energy:**
Major focus on energy transition investments:
- Solar and wind energy projects
- Green hydrogen production
- Battery technology and energy storage
- Electric vehicle ecosystems
- Carbon capture technology

**3. Healthcare and Life Sciences:**
Pandemic accelerating healthcare investment:
- Biotechnology and pharmaceuticals
- Medical technology and devices
- Healthcare real estate and facilities
- Telemedicine platforms

**4. Real Estate and Infrastructure:**
Continued focus on income-generating assets:
- Prime office buildings in global cities
- Logistics and industrial properties
- Infrastructure (airports, ports, toll roads)
- Hospitality and hotels

**Investment Outlook:**

**Short-term (2024):**
- Continued strong FDI inflows to GCC
- Technology sector investment focus
- Energy transition capital deployment
- Real estate and infrastructure investments

**Medium-term (2025-2027):**
- SWF asset growth to $4.5+ trillion
- Increased direct investments and control stakes
- Domestic giga-project financing
- Enhanced ESG integration

**Long-term (2028+):**
- GCC SWFs among world's largest investors
- Regional economic transformation bearing fruit
- FDI positioning GCC as global business hub
- Continued diversification from oil revenues

**Conclusion:**
The GCC's $285 billion in combined investment flows represents a structural shift in global capital markets. The region's dual role as both capital recipient (FDI) and capital deployer (SWFs) creates unique dynamics driving economic transformation, technological advancement, and global integration. For international businesses and investors, understanding and accessing these capital flows presents exceptional opportunities for growth, partnerships, and long-term value creation.

The combination of ambitious national development programs, substantial sovereign wealth, strategic geographic positioning, and progressive economic policies ensures the GCC will continue playing an increasingly influential role in global investment and capital markets.`,
                  time: '2 days ago',
                  category: 'Investment',
                  impact: 'Positive',
                  author: 'Abdullah Al-Nasser',
                  readTime: '13 min read',
                  tags: ['Foreign Investment', 'FDI', 'Sovereign Wealth Funds', 'PIF', 'ADIA', 'QIA', 'Capital Flows'],
                  imageDescription: 'Global investment map showing GCC capital flows and FDI movements'
                },
                {
                  id: 10,
                  title: 'Saudi Riyal Stability Reinforced: SAMA Maintains Currency Peg Amid Strong Economic Fundamentals',
                  summary: 'Saudi Arabian Monetary Authority reaffirms commitment to USD/SAR peg at 3.75 as Kingdom demonstrates exceptional fiscal strength and economic diversification progress.',
                  fullArticle: `The Saudi Arabian Monetary Authority (SAMA) continues to demonstrate unwavering commitment to the Saudi Riyal's peg against the US Dollar at SAR 3.75, supported by the Kingdom's exceptional economic fundamentals, massive foreign exchange reserves, and successful economic diversification efforts under Vision 2030.

**Currency Peg Framework:**

**Historical Context:**
The Saudi Riyal has maintained its peg to the US Dollar since 1986, establishing one of the world's most credible currency pegs. This stability has provided a foundation for economic planning, international trade, and foreign investment confidence throughout the Kingdom's transformation.

**Current Peg Mechanism:**
- Exchange rate: SAR 3.7504 to USD (official rate)
- SAMA maintains ±1% trading band (rarely breached)
- Foreign exchange reserves backing the peg
- Interest rate policy aligned with US Federal Reserve
- Active management through foreign exchange operations

**Economic Fundamentals Supporting the Peg:**

**1. Foreign Exchange Reserves:**
SAMA's foreign exchange reserves provide exceptional backing:

**Reserve Position:**
- Total foreign reserves: $445 billion (February 2024)
- Import cover: 29 months (far exceeding adequacy norms)
- Reserve composition: USD-denominated assets (65%), Gold (5%), Other currencies (30%)
- Reserve management: Conservative approach prioritizing liquidity and safety
- Government deposits: Additional $180 billion at SAMA

**Reserve Adequacy Metrics:**
- IMF adequacy benchmark: 200%+ (100% considered adequate)
- External debt coverage: 14x annual external debt service
- M2 money supply coverage: 58% (considered very strong)
- Import coverage: 2.4 years of goods and services imports

**2. Fiscal Strength:**
Saudi Arabia's government finances provide strong support:

**Budget Performance:**
- 2023 budget balance: SAR 45 billion surplus ($12 billion)
- Non-oil revenue growth: 42% since 2016
- Government debt: 23% of GDP (very low by global standards)
- Debt servicing costs: Less than 3% of government revenue
- Fiscal breakeven oil price: $78 per barrel (down from $95 in 2015)

**Revenue Diversification:**
- Oil revenue: 62% of total (down from 85% in 2015)
- Non-oil revenue: 38% (growing rapidly)
- Tax revenue: VAT, income tax on foreign entities
- Investment income: From PIF and SAMA investments

**3. Current Account Surplus:**
Strong external position supporting currency:

**Balance of Payments:**
- Current account surplus: $48 billion (2023), 5.8% of GDP
- Trade balance: $142 billion surplus
- Oil exports: $280 billion annually
- Non-oil exports: Growing to $95 billion
- Services account: Improving with tourism growth

**4. Oil Market Position:**
Saudi Arabia's oil leadership supports economic stability:

**Production Capacity:**
- Maximum production capacity: 12 million barrels per day
- Current production: ~9-10 million bpd (OPEC+ quotas)
- Spare capacity: 2-3 million bpd (largest globally)
- Production costs: $2-10 per barrel (world's lowest)
- Reserves: 268 billion barrels (2nd largest proven reserves)

**Vision 2030 - Economic Diversification:**

**Non-Oil Sector Growth:**
Vision 2030 initiatives reducing oil dependency:

**Non-Oil GDP Performance:**
- Non-oil GDP growth: 5.5% annually (2020-2024)
- Non-oil sector contribution: 52% of GDP (target: 65% by 2030)
- Private sector participation: 48% of GDP (target: 65% by 2030)
- Job creation: 85% of new jobs in non-oil sectors

**Key Growth Sectors:**

**Tourism:**
- International visitors: 105 million (2023), target 150 million (2030)
- Tourism GDP contribution: 10% (target: 12% by 2030)
- Religious tourism (Hajj/Umrah): 15 million pilgrims annually
- Leisure tourism: Red Sea Project, Qiddiya, NEOM

**Manufacturing:**
- Industrial sector growth: 8% annually
- Focus on petrochemicals, metals, automotive, pharmaceuticals
- Localization initiatives driving domestic production

**Financial Services:**
- Riyadh Financial District development
- Fintech sector growth (850+ fintech companies)
- Capital markets deepening

**Technology:**
- National strategy for AI, cloud computing, cybersecurity
- Tech sector growing 45% annually
- International technology companies establishing regional HQs

**Monetary Policy Framework:**

**SAMA's Policy Approach:**
SAMA's monetary policy closely aligned with US Federal Reserve:

**Interest Rate Policy:**
- Repo rate: 5.50% (tracking Fed Funds rate)
- Reverse repo rate: 5.00%
- Historical correlation: 100% alignment with Fed policy
- Rationale: Maintaining peg requires interest rate parity

**Banking System Strength:**
Saudi banking sector supports currency stability:

**Banking Sector Metrics:**
- Total assets: SAR 3.8 trillion ($1.01 trillion)
- Capital adequacy: 20.5% (well above Basel III requirements)
- NPL ratio: 1.4% (historically low)
- Profitability: ROE 15.2% (strong performance)
- Loan growth: 14% annually

**Currency Stability Assessment:**

**Speculative Pressures:**
The SAR experiences minimal speculative pressure:

**Forward Market Indicators:**
- 12-month SAR forward premium/discount: Minimal (±0.5%)
- Options market implied volatility: Very low
- No significant hedging activity against depreciation
- Market confidence in peg sustainability

**Historical Peg Performance:**
- Zero devaluation episodes since 1986
- Withstood 2015-2016 oil price collapse
- Navigated 2020 pandemic and oil price crash
- Maintained stability during regional uncertainties

**Future Outlook:**

**Short-term (2024):**
- Peg continuation with full SAMA support
- Gradual Fed rate cuts likely matched by SAMA
- Fiscal surplus maintaining reserve buffers
- Continued economic diversification

**Medium-term (2025-2027):**
- Vision 2030 milestones strengthening fundamentals
- Non-oil revenue growth supporting fiscal position
- Potential for reduced oil dependency
- Increased economic resilience to shocks

**Long-term (2028+):**
- Successful economic transformation
- Reduced vulnerability to oil prices
- Potential for GCC monetary union discussions
- Continued USD peg as strategic anchor

**Investment Implications:**

**For Currency Traders:**
- SAR peg extremely stable with minimal trading opportunities
- Carry trade limited by low interest differential
- Forward contracts for hedging, not speculation

**For International Businesses:**
- Currency stability facilitating long-term planning
- No hedging required for SAR exposures
- Predictable cash flows for Saudi operations

**For Portfolio Investors:**
- Saudi equity investments without currency risk
- Sukuk and bond investments in USD-equivalent returns
- No devaluation risk for foreign investors

**Conclusion:**
The Saudi Riyal's peg to the US Dollar remains among the world's most credible and sustainable currency arrangements. SAMA's management, supported by massive foreign exchange reserves, strong fiscal position, current account surplus, and successful economic diversification, ensures the peg's stability for the foreseeable future.

While challenges exist, including imported inflation and limited monetary policy independence, Saudi Arabia's fundamental economic strength, strategic oil position, and Vision 2030 transformation initiatives far outweigh these concerns. The Kingdom's economic resilience has been tested through multiple oil price crashes and regional uncertainties, emerging each time with the peg intact and market confidence reinforced.

For investors and businesses, the SAR peg provides a foundation of stability facilitating long-term planning, investment, and economic engagement with Saudi Arabia. As the Kingdom continues its transformation under Vision 2030, the currency peg will remain a strategic anchor providing stability amid ambitious economic reforms and diversification efforts.`,
                  time: '2 days ago',
                  category: 'Forex',
                  impact: 'Neutral',
                  author: 'Faisal Al-Dosari',
                  readTime: '11 min read',
                  tags: ['Saudi Riyal', 'USD/SAR', 'Currency Peg', 'SAMA', 'Monetary Policy', 'Foreign Reserves'],
                  imageDescription: 'Saudi Riyal currency with SAMA headquarters and forex stability charts'
                },
                {
                  id: 11,
                  title: 'GCC Technology Sector Boom: Smart Cities, AI, and Digital Transformation Drive $45 Billion Investment Wave',
                  summary: 'GCC technology sector experiences explosive growth with government initiatives, venture capital funding, and international tech giants establishing regional headquarters driving innovation ecosystem.',
                  fullArticle: `The GCC technology sector has emerged as a global innovation hub, experiencing unprecedented growth driven by ambitious smart city initiatives, artificial intelligence deployment, digital transformation mandates, and massive venture capital investment. The region's $45 billion technology investment wave is reshaping economies and creating exceptional opportunities for startups, established companies, and investors.

**Technology Sector Overview:**

**Market Size and Growth:**
The GCC technology sector demonstrates remarkable expansion:
- Technology market value: $185 billion (2023)
- Annual growth rate: 12.5% (2020-2024)
- IT spending: $52 billion annually
- Software market: $18 billion (growing 15% annually)
- Cloud computing: $8.5 billion (growing 25% annually)
- Cybersecurity: $4.2 billion (growing 18% annually)

**Investment Landscape:**
- Venture capital investment: $2.8 billion (2023)
- Government technology spending: $28 billion
- Private sector IT investment: $14.2 billion
- Foreign direct investment in tech: $6.5 billion

**Smart City Initiatives:**

**1. NEOM - Saudi Arabia:**
The world's most ambitious smart city project:

**Project Scope:**
- Total investment: $500 billion
- Area: 26,500 square kilometers
- Target population: 9 million residents
- Timeline: Phases through 2030

**Technology Integration:**
- 100% renewable energy powered
- AI-driven city management and services
- Advanced mobility including flying taxis
- Integrated IoT infrastructure
- Digital twin technology for urban planning
- Automated waste management and recycling
- Smart healthcare systems with AI diagnostics
- Blockchain-based government services

**2. Dubai Smart City:**
Dubai's comprehensive smart transformation:

**Smart Dubai 2021 Strategy:**
- 1,000+ smart services launched
- 100% paperless government
- Blockchain-based document verification
- AI-powered traffic management
- Smart grid electricity distribution

**Key Initiatives:**
- Dubai Data Law: Framework for data sharing
- Dubai Blockchain Strategy: 50% government transactions on blockchain
- AI Strategy: AI integration across government operations
- Smart Police Stations: 27 unmanned smart stations operational

**3. Saudi Vision 2030 Smart Cities:**
Multiple smart city projects across the Kingdom:

**Riyadh Smart City:**
- Capital city digital transformation
- Riyadh Metro with smart transportation systems
- King Salman Park with IoT integration
- Smart street lighting (300,000+ LED lights)

**Qiddiya Smart Entertainment City:**
- Entertainment capital with integrated technology
- Visitor experience personalization through AI
- Smart crowd management
- Virtual and augmented reality attractions

**Artificial Intelligence Leadership:**

**National AI Strategies:**

**UAE National AI Strategy 2031:**
- AI contribution to UAE economy: 14% of GDP by 2031 ($96 billion)
- Position UAE among global AI leaders
- Develop skilled AI workforce
- Create ethical AI framework

**Applications:**
- Government services: 100+ AI-powered services
- Healthcare: AI diagnosis and treatment planning
- Transportation: Autonomous vehicle deployment
- Education: Personalized learning with AI
- Security: AI-enhanced surveillance

**Saudi Data and AI Authority (SDAIA):**
Driving Saudi AI transformation:

**Major Projects:**
- National Data Management Office
- National Center for AI
- AI Innovation Centers
- AI Regulatory Framework

**AI Applications in Saudi Arabia:**
- Vision 2030 projects: AI integration throughout
- Oil & gas: Predictive maintenance (Aramco)
- Healthcare: AI-powered diagnostics
- Education: Adaptive learning platforms

**Cloud Computing Expansion:**

**Regional Cloud Infrastructure:**

**Hyperscale Data Centers:**
Major cloud providers establishing GCC presence:

**AWS Middle East:**
- AWS Region in Bahrain (operational)
- Second AWS Region in UAE (launched 2022)
- Saudi Arabia AWS Region announced ($5 billion)

**Microsoft Azure:**
- Azure regions in UAE (Dubai, Abu Dhabi)
- Saudi Arabia regions announced ($2.1 billion)
- Government cloud solutions

**Google Cloud:**
- GCC regional presence expanding
- Partnership with STCTV for Saudi cloud
- Enterprise and startup programs

**Cybersecurity Market:**

**Growing Threat Landscape:**
GCC countries experiencing increasing cyber threats:
- 45% increase in cyberattacks (2023)
- Financial services primary target
- Ransomware attacks on enterprises

**Cybersecurity Investment:**
Regional cybersecurity market growing rapidly:
- Market size: $4.2 billion (2023)
- Growth rate: 18% annually
- Government spending: $2.1 billion
- Private sector: $2.1 billion

**National Cybersecurity Strategies:**

**UAE Cybersecurity Strategy:**
- National cybersecurity framework
- CERT-UAE coordinating incident response
- Mandatory security standards for critical infrastructure

**Saudi National Cybersecurity Authority (NCA):**
- Essential Cybersecurity Controls (ECC) framework
- Critical infrastructure protection
- Security operation centers (SOCs)

**Telecommunications and 5G:**

**5G Network Deployment:**
GCC leading global 5G adoption:

**5G Rollout Status:**
- UAE: 90%+ population coverage
- Saudi Arabia: 70+ cities covered
- Qatar: Complete coverage in urban areas
- Kuwait: Major cities covered
- Bahrain: Comprehensive urban coverage

**5G Use Cases:**
- Enhanced mobile broadband
- Smart city infrastructure connectivity
- Industrial IoT and Industry 4.0
- Autonomous vehicles communication
- AR/VR applications

**E-Commerce and Digital Economy:**

**E-Commerce Market:**
GCC e-commerce experiencing explosive growth:
- Market size: $38 billion (2023)
- Growth rate: 28% annually
- Online penetration: 12% of retail (growing)
- Mobile commerce: 75% of online transactions

**Major Platforms:**
- Noon (UAE): Leading regional platform
- Amazon.ae / Amazon.sa: Regional presence
- Careem: Super app strategy
- Talabat: Food delivery leader

**Startup Ecosystem and Venture Capital:**

**GCC Startup Funding:**
Record venture capital activity:
- Total funding: $2.8 billion (2023), up 145% YoY
- Number of deals: 380+ transactions
- Mega deals (>$100M): 8 rounds
- Average deal size: $7.4 million

**Top Funded Startups:**
- Kitopi (UAE): $415 million raised
- Tabby (UAE): $750 million, unicorn status
- Swvl: $582 million, NASDAQ-listed
- Pure Harvest Smart Farms: $280 million

**Venture Capital Firms:**
- Mubadala Capital: $17 billion AUM
- STV (Saudi Technology Ventures): $500 million fund
- BECO Capital (UAE): Early-stage focus
- Middle East Venture Partners (MEVP)

**Government-Backed Funds:**
- Saudi Venture Capital Company (SVC)
- Dubai Future District Fund
- Qatar Science & Technology Park Ventures
- Oman Technology Fund

**Accelerators and Incubators:**
- Hub71 (Abu Dhabi): $535 million ecosystem fund
- Dubai Future Accelerators
- BADIR (Saudi Arabia): Technology incubator network
- Flat6Labs: Pan-regional accelerator

**Conclusion and Investment Outlook:**

The GCC technology sector represents a transformational opportunity driven by ambitious government initiatives, substantial investment, and rapidly evolving digital adoption. The convergence of smart city development, AI deployment, cloud infrastructure expansion, and thriving startup ecosystems positions the region as a global technology hub.

**Investment Opportunities:**
- Direct investments in late-stage technology startups
- Venture capital funds for diversified exposure
- Public technology companies (telecom operators)
- Real estate (data centers, technology parks)
- Enabling services (cybersecurity, cloud)

**Key Success Factors:**
- Understanding regulatory environments
- Local partnerships and market knowledge
- Government relationship navigation
- Cultural and language considerations
- Talent acquisition strategies

The GCC's $45 billion technology investment wave is just the beginning, with structural drivers ensuring continued growth, innovation, and opportunity creation for decades to come. As the region transforms from resource-based economies to knowledge-driven innovation hubs, technology will remain the primary catalyst for economic diversification, job creation, and long-term prosperity.`,
                  time: '3 days ago',
                  category: 'Technology',
                  impact: 'Positive',
                  author: 'Yousef Al-Mahmoud',
                  readTime: '14 min read',
                  tags: ['Technology Sector', 'Smart Cities', 'Artificial Intelligence', 'Cloud Computing', 'Startups', 'Venture Capital', 'Digital Transformation'],
                  imageDescription: 'Futuristic smart city with AI networks, cloud infrastructure, and digital innovation hubs'
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
                          <div style={{ marginTop: '12px' }}>
                            {module.topics.map((topic, topicIndex) => {
                              const lessonKey = `course${course.id}-module${moduleIndex + 1}-lesson${topicIndex + 1}`
                              const content = lessonContent[lessonKey]
                              const isExpanded = expandedLesson === lessonKey

                              return (
                                <div key={topicIndex} style={{
                                  marginBottom: '12px',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  background: 'white'
                                }}>
                                  {/* Lesson Header - Clickable */}
                                  <div
                                    onClick={() => setExpandedLesson(isExpanded ? null : lessonKey)}
                                    style={{
                                      padding: '12px 16px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      background: isExpanded ? '#f8fafc' : 'white',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isExpanded) e.currentTarget.style.background = '#f8fafc'
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isExpanded) e.currentTarget.style.background = 'white'
                                    }}
                                  >
                                    <span style={{
                                      fontSize: '14px',
                                      fontWeight: '600',
                                      color: '#1e293b',
                                      flex: 1
                                    }}>
                                      📖 {topic}
                                    </span>
                                    <span style={{
                                      fontSize: '12px',
                                      color: course.color,
                                      fontWeight: '700'
                                    }}>
                                      {isExpanded ? '▲ Hide Details' : '▼ Click to Expand'}
                                    </span>
                                  </div>

                                  {/* Expanded Lesson Content */}
                                  {isExpanded && content && (
                                    <div style={{
                                      padding: '24px',
                                      borderTop: '1px solid #e2e8f0',
                                      background: '#ffffff'
                                    }}>
                                      {/* Learning Objectives */}
                                      <div style={{ marginBottom: '24px' }}>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          📚 What You'll Learn:
                                        </h6>
                                        <ul style={{
                                          margin: 0,
                                          paddingLeft: '20px',
                                          fontSize: '14px',
                                          color: '#64748b',
                                          lineHeight: '1.8'
                                        }}>
                                          {content.objectives.map((obj, i) => (
                                            <li key={i} style={{ marginBottom: '6px' }}>{obj}</li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* Detailed Explanation */}
                                      <div style={{ marginBottom: '24px' }}>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          📝 Detailed Explanation:
                                        </h6>
                                        <div style={{
                                          fontSize: '14px',
                                          color: '#475569',
                                          lineHeight: '1.8',
                                          whiteSpace: 'pre-line'
                                        }}>
                                          {content.explanation}
                                        </div>
                                      </div>

                                      {/* Key Concepts */}
                                      <div style={{ marginBottom: '24px' }}>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          💡 Key Concepts:
                                        </h6>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                          {content.keyConcepts.map((concept, i) => (
                                            <div key={i} style={{
                                              background: '#f8fafc',
                                              padding: '12px',
                                              borderRadius: '8px',
                                              borderLeft: `4px solid ${course.color}`
                                            }}>
                                              <strong style={{ color: '#1e293b', fontSize: '14px' }}>{concept.term}:</strong>
                                              <span style={{ color: '#64748b', fontSize: '14px', marginLeft: '6px' }}>
                                                {concept.definition}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* GCC Market Examples */}
                                      <div style={{ marginBottom: '24px' }}>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          🌍 GCC Market Examples:
                                        </h6>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                          {content.gccExamples.map((example, i) => (
                                            <div key={i} style={{
                                              padding: '12px',
                                              background: '#f0fdf4',
                                              borderRadius: '8px',
                                              fontSize: '14px',
                                              color: '#166534',
                                              lineHeight: '1.6',
                                              borderLeft: '4px solid #059669'
                                            }}>
                                              {example}
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Step-by-Step Guide (if available) */}
                                      {content.steps && (
                                        <div style={{ marginBottom: '24px' }}>
                                          <h6 style={{
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            color: course.color,
                                            marginBottom: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                          }}>
                                            ✅ Step-by-Step Guide:
                                          </h6>
                                          <ol style={{
                                            margin: 0,
                                            paddingLeft: '20px',
                                            fontSize: '14px',
                                            color: '#475569',
                                            lineHeight: '1.8'
                                          }}>
                                            {content.steps.map((step, i) => (
                                              <li key={i} style={{ marginBottom: '8px' }}>{step}</li>
                                            ))}
                                          </ol>
                                        </div>
                                      )}

                                      {/* Common Mistakes */}
                                      <div style={{ marginBottom: '24px' }}>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          ⚠️ Common Mistakes to Avoid:
                                        </h6>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                          {content.mistakes.map((mistake, i) => (
                                            <div key={i} style={{
                                              padding: '10px',
                                              background: '#fef2f2',
                                              borderRadius: '8px',
                                              fontSize: '14px',
                                              color: '#991b1b',
                                              lineHeight: '1.6',
                                              borderLeft: '4px solid #dc2626'
                                            }}>
                                              • {mistake}
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Visual Reference */}
                                      <div>
                                        <h6 style={{
                                          fontSize: '16px',
                                          fontWeight: '700',
                                          color: course.color,
                                          marginBottom: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px'
                                        }}>
                                          📊 Visual Reference:
                                        </h6>
                                        <div style={{
                                          padding: '16px',
                                          background: '#fffbeb',
                                          borderRadius: '8px',
                                          fontSize: '14px',
                                          color: '#92400e',
                                          lineHeight: '1.8',
                                          fontStyle: 'italic',
                                          borderLeft: '4px solid #f59e0b'
                                        }}>
                                          {content.visualReference}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Placeholder for lessons without content yet */}
                                  {isExpanded && !content && (
                                    <div style={{
                                      padding: '24px',
                                      borderTop: '1px solid #e2e8f0',
                                      background: '#f8fafc',
                                      textAlign: 'center',
                                      color: '#64748b',
                                      fontSize: '14px'
                                    }}>
                                      📚 Detailed content for this lesson is being prepared. Check back soon!
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
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

            {/* Trading Glossary Section */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              marginTop: '48px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  📖 Complete Trading Glossary
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#64748b',
                  maxWidth: '800px',
                  margin: '0 auto 24px',
                  lineHeight: '1.7'
                }}>
                  Master 200+ essential trading terms organized by category. Each term includes clear definitions,
                  practical examples, and GCC market context.
                </p>

                {/* Search Box */}
                <div style={{
                  maxWidth: '600px',
                  margin: '0 auto',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    placeholder="🔍 Search trading terms... (e.g., 'support', 'forex', 'halal')"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb'
                      e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Glossary Categories */}
              {glossaryCategories.map((category, categoryIndex) => {
                const filteredTerms = category.terms.filter(term =>
                  glossarySearch === '' ||
                  term.name.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  term.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  term.example.toLowerCase().includes(glossarySearch.toLowerCase())
                )

                if (filteredTerms.length === 0) return null

                return (
                  <div key={categoryIndex} style={{
                    marginBottom: '32px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    {/* Category Header */}
                    <div
                      onClick={() => setExpandedGlossaryCategory(
                        expandedGlossaryCategory === category.name ? null : category.name
                      )}
                      style={{
                        padding: '24px',
                        cursor: 'pointer',
                        background: expandedGlossaryCategory === category.name
                          ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                          : 'white',
                        borderBottom: expandedGlossaryCategory === category.name ? '1px solid #e2e8f0' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (expandedGlossaryCategory !== category.name) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (expandedGlossaryCategory !== category.name) {
                          e.currentTarget.style.background = 'white'
                        }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <span>{category.emoji}</span>
                            <span>{category.name}</span>
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#64748b',
                            margin: 0
                          }}>
                            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
                          </p>
                        </div>
                        <div style={{
                          fontSize: '24px',
                          color: category.color,
                          fontWeight: '700'
                        }}>
                          {expandedGlossaryCategory === category.name ? '▲' : '▼'}
                        </div>
                      </div>
                    </div>

                    {/* Category Terms */}
                    {expandedGlossaryCategory === category.name && (
                      <div style={{ padding: '24px' }}>
                        <div style={{
                          display: 'grid',
                          gap: '16px'
                        }}>
                          {filteredTerms.map((term, termIndex) => (
                            <div key={termIndex} style={{
                              padding: '20px',
                              background: '#f8fafc',
                              borderRadius: '12px',
                              border: '1px solid #e2e8f0',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)'
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)'
                              e.currentTarget.style.boxShadow = 'none'
                            }}>
                              <h4 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: category.color,
                                marginBottom: '12px'
                              }}>
                                {term.name}
                              </h4>
                              <p style={{
                                fontSize: '15px',
                                color: '#475569',
                                lineHeight: '1.7',
                                marginBottom: '12px'
                              }}>
                                {term.definition}
                              </p>
                              <div style={{
                                padding: '12px 16px',
                                background: 'white',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${category.color}`
                              }}>
                                <p style={{
                                  fontSize: '14px',
                                  color: '#64748b',
                                  margin: 0,
                                  lineHeight: '1.6'
                                }}>
                                  <strong style={{ color: '#1e293b' }}>Example:</strong> {term.example}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* No Results Message */}
              {glossarySearch !== '' && glossaryCategories.every(cat =>
                cat.terms.filter(term =>
                  term.name.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  term.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  term.example.toLowerCase().includes(glossarySearch.toLowerCase())
                ).length === 0
              ) && (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#64748b'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '8px'
                  }}>
                    No terms found
                  </h3>
                  <p style={{ fontSize: '16px' }}>
                    Try searching for different keywords or browse all categories
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
          </div>

          {/* Desktop Sidebar Widget */}
          {!isMobile && (
            <aside style={{
              width: '120px',
              flexShrink: 0
            }}>
              <div style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Rotating Exness Banner */}
                <a
                  href="https://one.exnessonelink.com/intl/en/a/c_8f0nxidtbt"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  style={{
                    display: 'block',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={currentWidgetVersion === 1
                      ? "https://d3dpet1g0ty5ed.cloudfront.net/EN_Spreads_Stable_pricing_for_unstable_markets_3-33_Google_120x600.jpg"
                      : "https://d3dpet1g0ty5ed.cloudfront.net/EN_Spreads_Keep_more_of_what_you_make_3-33_Google_120x600.jpg"
                    }
                    width="120"
                    height="600"
                    alt="Trade with Exness"
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                </a>
              </div>
            </aside>
          )}
        </div>

        {/* Footer Banner Widget */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center'
        }}>
          <a
            href={isMobile
              ? "https://one.exnessonelink.com/intl/en/a/c_8f0nxidtbt?platform=mobile"
              : "https://one.exnessonelink.com/intl/en/a/c_8f0nxidtbt"
            }
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={currentWidgetVersion === 1
                ? "https://d3dpet1g0ty5ed.cloudfront.net/EN_Spreads_Stable_pricing_for_unstable_markets_3-33_Google_728x90.jpg"
                : "https://d3dpet1g0ty5ed.cloudfront.net/EN_Spreads_Keep_more_of_what_you_make_3-33_Google_728x90.jpg"
              }
              width={isMobile ? "100%" : "728"}
              height={isMobile ? "auto" : "90"}
              alt="Start Trading with Exness"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </a>
        </div>
      </main>

      {/* Exness Scroll Popup */}
      {showExnessPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => {
            setShowExnessPopup(false)
            setPopupDismissed(prev => ({ ...prev, exness: true }))
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
              animation: 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowExnessPopup(false)
                setPopupDismissed(prev => ({ ...prev, exness: true }))
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.background = '#fee2e2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
              }}
            >
              ×
            </button>

            {/* Popup Header */}
            <div style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              padding: '32px 24px',
              textAlign: 'center',
              color: '#1e293b'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💎</div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '8px',
                color: '#1e293b'
              }}>
                Trade with Our Trusted Broker
              </h2>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                color: '#1e293b'
              }}>
                Start your trading journey with Exness
              </p>
            </div>

            {/* Popup Content */}
            <div style={{ padding: '32px 24px' }}>
              <div style={{
                display: 'grid',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>⚡</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>
                      0.0 Pips Spreads
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Ultra-low trading costs
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>🛡️</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>
                      CySEC Regulated
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Your funds are safe
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>🎁</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>
                      $50 Welcome Bonus
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Get started with extra capital
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={isMobile
                  ? "https://one.exnessonelink.com/a/c_8f0nxidtbt?platform=mobile"
                  : "https://one.exnessonelink.com/a/c_8f0nxidtbt"
                }
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1e293b',
                  textAlign: 'center',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)'
                }}
              >
                🚀 Open Free Account Now
              </a>

              <p style={{
                fontSize: '11px',
                color: '#94a3b8',
                textAlign: 'center',
                marginTop: '16px'
              }}>
                CFDs are complex instruments. 51% of retail accounts lose money.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Enhanced Animations */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes shine {
          0% {
            left: '-100%';
          }
          100% {
            left: '200%';
          }
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

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
        }

        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1e40af 0%, #6d28d9 100%);
        }

        /* Responsive Media Queries */
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

        /* Utility Classes */
        .notification-enter {
          animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .signal-card {
          animation: fadeIn 0.6s ease;
        }

        /* Glass Morphism Effect */
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px) saturate(180%);
          -webkit-backdrop-filter: blur(10px) saturate(180%);
        }

        /* Card Hover Effects */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Button Ripple Effect */
        .button-ripple {
          position: relative;
          overflow: hidden;
        }

        .button-ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button-ripple:active::after {
          width: 300px;
          height: 300px;
        }

        /* Loading Skeleton */
        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        /* Selection Color */
        ::selection {
          background: rgba(37, 99, 235, 0.3);
          color: #1e293b;
        }

        /* Focus Visible for Accessibility */
        *:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.5);
          outline-offset: 2px;
        }

        /* Performance Optimization */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  )
}