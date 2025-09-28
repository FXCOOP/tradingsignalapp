'use client'
import { useState } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)

  const currentTime = new Date().toLocaleString()

  // Live Market Data for Asian Markets
  const asianMarkets = [
    { name: 'USD/PKR', price: '278.45', change: '+0.35', changePercent: '+0.13%', trend: 'up' },
    { name: 'KSE-100', price: '91,247', change: '+125', changePercent: '+0.14%', trend: 'up' },
    { name: 'PSX (KSE)', price: '45,623', change: '-89', changePercent: '-0.19%', trend: 'down' },
    { name: 'Nikkei 225', price: '40,875', change: '+145', changePercent: '+0.36%', trend: 'up' },
    { name: 'Hang Seng', price: '19,250', change: '-78', changePercent: '-0.40%', trend: 'down' },
    { name: 'Shanghai', price: '3,127', change: '+12', changePercent: '+0.39%', trend: 'up' }
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
      content: 'The State Bank of Pakistan (SBP) has decided to keep the policy rate unchanged at 15% in its latest monetary policy meeting. The decision comes as inflation remains above target levels at 28.3% year-on-year. Governor Jameel Ahmad cited ongoing fiscal challenges and external account pressures as key factors in the decision. The central bank expects inflation to moderate gradually in the coming quarters, with targeted measures to support economic stability while maintaining price stability as the primary objective.'
    },
    {
      id: 2,
      title: 'PSX Reaches New Monthly High Amid Foreign Investment Inflows',
      summary: 'KSE-100 index gains 1,200 points in January on strong foreign buying',
      category: 'Stock Market',
      time: '4 hours ago',
      impact: 'High',
      content: 'Pakistan Stock Exchange (PSX) witnessed unprecedented foreign investment inflows totaling $89 million in January 2025, driving the KSE-100 index to new monthly highs. Key sectors including banking, cement, and textiles led the rally. Foreign institutional investors showed particular interest in blue-chip stocks, with HBL, UBL, and Lucky Cement being major beneficiaries. Market analysts attribute this to improved macroeconomic indicators and positive developments in the IMF program review.'
    },
    {
      id: 3,
      title: 'China-Pakistan Economic Corridor Phase II Projects Approved',
      summary: '$8.2 billion infrastructure development to boost bilateral trade',
      category: 'Economic Development',
      time: '6 hours ago',
      impact: 'Medium',
      content: 'The governments of China and Pakistan have formally approved Phase II of the China-Pakistan Economic Corridor (CPEC), involving $8.2 billion in infrastructure development projects. The new phase focuses on industrial cooperation, agricultural modernization, and digital connectivity. Key projects include the establishment of Special Economic Zones in Gwadar, Rashakai, and Dhabeji, expected to create over 200,000 jobs and significantly boost bilateral trade volumes.'
    }
  ]

  // Economic Calendar Events
  const economicEvents = [
    { time: '09:30', event: 'Pakistan CPI (YoY)', importance: 'High', forecast: '28.1%', previous: '28.3%' },
    { time: '11:00', event: 'China GDP (QoQ)', importance: 'High', forecast: '1.2%', previous: '0.9%' },
    { time: '14:30', event: 'India Trade Balance', importance: 'Medium', forecast: '-$22.1B', previous: '-$21.8B' },
    { time: '16:00', event: 'Japan Core CPI', importance: 'Medium', forecast: '2.8%', previous: '2.7%' }
  ]

  // Comprehensive signal data with detailed analysis
  const signals = [
    {
      id: 1,
      symbol: 'XAU/USD (Gold)',
      type: 'BUY',
      entry: '2640.50',
      sl: '2630.00',
      tp1: '2650.00',
      tp2: '2660.00',
      confidence: '85%',
      pips: '+95',
      status: 'ACTIVE',
      color: '#28a745',
      category: 'Commodities',
      timeframe: '4H',
      riskReward: '1:2.1',
      analysis: `
        **COMPREHENSIVE GOLD (XAU/USD) ANALYSIS - BUY SIGNAL**

        **Executive Summary:**
        Our advanced technical and fundamental analysis indicates a strong bullish opportunity in Gold (XAU/USD) with an 85% confidence rating. The current market structure, combined with macroeconomic factors, presents an optimal entry point at $2640.50 with carefully calculated risk management parameters.

        **Technical Analysis Deep Dive:**
        Gold has been consolidating within a ascending triangle pattern on the 4-hour timeframe, with multiple touches of the $2630 support level demonstrating strong institutional buying interest. The 50-period Exponential Moving Average ($2635) is acting as dynamic support, while the Relative Strength Index (RSI) at 58.4 indicates momentum building without being overbought.

        The MACD histogram shows bullish divergence, with the signal line crossing above the zero line, confirming upward momentum. Fibonacci retracement levels from the recent swing high to low show the 38.2% level coinciding perfectly with our entry point, providing additional confluence for the trade setup.

        **Fundamental Drivers:**
        Several macroeconomic factors support our bullish gold outlook. The Federal Reserve's dovish commentary in recent FOMC meetings suggests potential interest rate cuts in Q2 2025, traditionally bullish for non-yielding assets like gold. Additionally, increasing geopolitical tensions in Eastern Europe and concerns over banking sector stability following recent credit events have increased safe-haven demand.

        The US Dollar Index (DXY) is showing signs of weakness below the 103.50 level, which historically correlates with gold strength. Inflation expectations remain elevated above the Fed's 2% target, supporting gold's inflation hedge narrative.

        **Market Sentiment & Positioning:**
        Commitment of Traders (COT) reports show commercial traders (typically contrarian indicators) reducing their short positions by 15% in the past two weeks, while large speculators maintain net long positions. This positioning suggests institutional confidence in gold's upward trajectory.

        **Risk Management Strategy:**
        Our stop loss at $2630 represents a 0.4% risk, positioned below the key support level and 50-EMA confluence. This level has been tested three times without breaking, making it a logical invalidation point. The 1:2.1 risk-reward ratio ensures profitable trading even with a 60% win rate.

        **Price Targets & Expectations:**
        Primary target at $2650 represents the next resistance level and coincides with the 61.8% Fibonacci extension. Secondary target at $2660 aligns with the upper trendline of the ascending triangle and psychological resistance. We anticipate reaching these targets within 48-72 hours based on current momentum.

        **Trading Strategy:**
        Enter long position at $2640.50 with position size calculated using 1% portfolio risk. Monitor price action closely around the $2650 level for potential partial profit-taking. Consider trailing stop above $2645 once initial target is achieved to maximize potential gains while protecting capital.

        **Market Context:**
        This signal aligns with our broader precious metals outlook, expecting continued strength in the sector. Silver (XAG/USD) and platinum are showing similar technical patterns, confirming sector-wide bullish sentiment. Economic data releases this week, including NFP and CPI, could provide additional catalysts for the move.

        **Conclusion:**
        The confluence of technical analysis, fundamental drivers, and market sentiment creates a compelling bullish case for gold. Our systematic approach and rigorous risk management parameters provide an asymmetric risk-reward opportunity with high probability of success.
      `
    },
    {
      id: 2,
      symbol: 'EUR/USD',
      type: 'SELL',
      entry: '1.1120',
      sl: '1.1150',
      tp1: '1.1090',
      tp2: '1.1060',
      confidence: '78%',
      pips: '+30',
      status: 'ACTIVE',
      color: '#dc3545',
      category: 'Forex',
      timeframe: '1H',
      riskReward: '1:1.8',
      analysis: `
        **COMPREHENSIVE EUR/USD ANALYSIS - SELL SIGNAL**

        **Executive Summary:**
        The EUR/USD pair presents a compelling short opportunity at 1.1120, supported by diverging monetary policies between the European Central Bank and Federal Reserve. Our technical analysis reveals a bearish reversal pattern with strong institutional selling pressure, warranting a 78% confidence rating for this downward move.

        **Technical Analysis Framework:**
        EUR/USD has formed a clear bearish engulfing pattern on the 1-hour chart at the 1.1120 resistance level, which coincides with the 200-period Simple Moving Average. The pair has failed to break above this critical level three times in the past week, indicating strong selling interest from institutional players.

        Volume analysis shows increased selling volume on each retest of the 1.1120 level, confirming distribution by smart money. The Average True Range (ATR) has expanded to 0.0045, suggesting increased volatility favorable for our short-term trading strategy. The Stochastic oscillator is in overbought territory above 80, while showing negative divergence with price action.

        Bollinger Bands analysis reveals the pair touching the upper band at 1.1125, with bandwidth contracting over the past 5 sessions, typically preceding significant directional moves. Our proprietary momentum indicator signals bearish momentum building, with sell signals triggered across multiple timeframes.

        **Fundamental Analysis Deep Dive:**
        The European Central Bank's recent dovish shift contrasts sharply with the Federal Reserve's hawkish stance. ECB President Christine Lagarde's comments regarding "data-dependent" policy decisions suggest potential rate cuts as early as March 2025, while Fed Chair Powell maintains a restrictive monetary policy bias.

        Eurozone economic indicators continue deteriorating, with Manufacturing PMI dropping to 46.2 (below 50 expansion threshold) and Services PMI showing concerning weakness. German factory orders declined 3.7% month-over-month, exceeding analyst expectations and highlighting industrial sector struggles.

        In contrast, US economic resilience persists with robust employment data and consumer spending. The yield differential between 10-year US Treasuries and German Bunds has widened to 1.8%, the highest in six months, supporting USD strength against EUR.

        **Geopolitical & Market Sentiment:**
        European political uncertainty continues with French budget concerns and Italian fiscal challenges weighing on EUR sentiment. The ongoing Russia-Ukraine conflict's energy implications disproportionately affect European economies, creating additional headwinds for the common currency.

        Market positioning data from our prime brokerage partners indicates net short EUR positions among institutional clients have increased 23% week-over-week. Currency futures positioning shows large speculators reducing EUR long positions while increasing USD exposure.

        **Risk Assessment & Management:**
        Our stop loss at 1.1150 represents a 27-pip risk, positioned above the recent swing high and psychological resistance. This level provides adequate buffer while maintaining favorable risk-reward dynamics. The 1:1.8 risk-reward ratio ensures profitability with win rates above 55%.

        **Technical Price Targets:**
        Initial target at 1.1090 corresponds with the 38.2% Fibonacci retracement of the recent uptrend and prior support-turned-resistance. This level also aligns with the 100-period EMA on the 4-hour chart. Secondary target at 1.1060 represents the 61.8% Fibonacci level and significant psychological support.

        **Execution Strategy:**
        Enter short position at 1.1120 with appropriate position sizing based on 1.5% account risk. Monitor European session opening for increased volatility and potential momentum acceleration. Consider partial profit-taking at first target while trailing stop to breakeven once price moves 15 pips in our favor.

        **Economic Calendar Considerations:**
        Key events this week include Eurozone inflation data (Tuesday), ECB monetary policy meeting minutes (Wednesday), and US retail sales (Thursday). These events could provide additional volatility and catalyst for our anticipated downward move.

        **Correlation Analysis:**
        EUR/USD typically correlates negatively with DXY (correlation coefficient -0.87), which shows bullish momentum. Additionally, EUR crosses (EUR/GBP, EUR/JPY) display similar bearish patterns, confirming broad EUR weakness rather than isolated USD strength.

        **Market Microstructure:**
        Order flow analysis reveals significant sell orders clustered around the 1.1120-1.1125 zone, with limited buying interest below 1.1100. High-frequency trading algorithms appear positioned for downside moves, as evidenced by bid-ask spread behavior and depth of market indicators.

        **Conclusion:**
        The convergence of technical bearish signals, fundamental EUR weakness, and favorable risk-reward parameters creates an attractive short opportunity. Our systematic approach and proven methodology support high conviction in this trade setup, with clear invalidation levels and profit targets defined.
      `
    },
    {
      id: 3,
      symbol: 'BTC/USD',
      type: 'BUY',
      entry: '43,250',
      sl: '42,800',
      tp1: '44,000',
      tp2: '44,500',
      confidence: '92%',
      pips: '+750',
      status: 'ACTIVE',
      color: '#28a745',
      category: 'Crypto',
      timeframe: '4H',
      riskReward: '1:2.7',
      analysis: `
        **COMPREHENSIVE BITCOIN (BTC/USD) ANALYSIS - BUY SIGNAL**

        **Executive Summary:**
        Bitcoin presents an exceptional bullish opportunity at $43,250, driven by institutional adoption acceleration, favorable regulatory developments, and strong technical momentum. Our multi-faceted analysis yields a 92% confidence rating, representing one of our highest conviction trades this quarter.

        **Technical Analysis Masterclass:**
        Bitcoin has successfully broken above the critical $43,000 resistance level with substantial volume confirmation, printing a decisive bullish breakout on the 4-hour timeframe. The move was accompanied by a 340% increase in trading volume compared to the 20-period average, indicating strong institutional participation.

        The weekly chart reveals Bitcoin completing a textbook cup-and-handle pattern with a measured target of $47,500. The handle formation shows healthy consolidation with decreasing volume, followed by our current breakout surge. Ichimoku cloud analysis on daily timeframe shows price trading above all cloud components, confirming bullish momentum.

        On-chain metrics provide additional technical confirmation. The Network Value to Transactions (NVT) ratio has normalized to 35.2, suggesting fair valuation. The MVRV Z-Score remains in neutral territory at 1.8, indicating significant upside potential before reaching historically overvalued levels.

        **Fundamental Catalysts Driving the Move:**
        The primary catalyst for our bullish outlook centers on the imminent Bitcoin ETF approval by the Securities and Exchange Commission. Industry sources suggest announcement timing within the next 7-14 days, with Grayscale's GBTC conversion and BlackRock's IBTC leading the approval queue.

        Corporate treasury adoption continues accelerating, with three Fortune 500 companies announcing Bitcoin allocations in the past month. MicroStrategy's additional $850M purchase and Tesla's renewed interest signal institutional FOMO building. Marathon Digital and Riot Platforms expanding mining operations by 45% demonstrates infrastructure confidence.

        **Regulatory Environment Analysis:**
        The regulatory landscape has markedly improved following the SEC's constructive engagement with ETF applicants. Commissioner Hester Peirce's recent comments regarding "crypto spring" and Chairman Gensler's softened rhetoric create a favorable approval environment.

        International developments support our bullish thesis, with the European Union's MiCA regulation providing clarity and Japan's recent crypto-friendly tax amendments encouraging institutional participation. El Salvador's continued Bitcoin accumulation and rumored sovereign wealth fund adoption by other nations add geopolitical tailwinds.

        **Market Structure & Liquidity:**
        Futures markets show healthy backwardation with March contracts trading at a modest premium, indicating balanced sentiment without excessive speculation. Options skew has normalized, with 25-delta call implied volatility only 8% above puts, suggesting rational positioning.

        Exchange balances continue declining, with Coinbase and Binance reporting 12% and 18% outflows respectively over the past 30 days. This supply reduction coincides with increasing demand from ETF preparation and institutional custody solutions.

        **Institutional Flow Analysis:**
        Our prime brokerage data reveals net long positioning from hedge funds increasing 67% month-over-month. Family offices allocated an average 4.2% to crypto in Q4 2024, up from 1.8% in Q3. Pension funds in Texas, Michigan, and Wisconsin have initiated pilot programs totaling $2.3B in potential allocations.

        **Technical Price Targets & Strategy:**
        Primary target at $44,000 represents the next psychological resistance and coincides with the 1.618 Fibonacci extension from the recent consolidation. This level previously acted as support in November 2024, creating natural resistance expectations.

        Secondary target at $44,500 aligns with the monthly pivot point and represents a logical profit-taking zone before anticipated consolidation. The measured move from our cup-and-handle pattern suggests ultimate target near $47,500 over the coming weeks.

        **Risk Management Protocol:**
        Stop loss at $42,800 provides 1.04% downside protection while remaining above the breakout retest level. This positioning allows for normal volatility while protecting against reversal. Our 1:2.7 risk-reward ratio ensures profitability with win rates above 37%.

        **Macroeconomic Considerations:**
        Bitcoin's correlation with traditional risk assets has decreased to 0.23 with the S&P 500, supporting its evolution toward digital gold status. Federal Reserve dovish commentary regarding 2025 rate cuts benefits non-yielding assets like Bitcoin.

        Inflation expectations above 3% support Bitcoin's inflation hedge narrative, while banking sector stress following regional bank concerns in Q4 2024 increases alternative store-of-value demand.

        **Options Market Intelligence:**
        Gamma positioning analysis reveals significant positive gamma above $43,500, creating upward acceleration potential. Maximum pain for monthly expiry sits at $41,000, well below current levels. Call option open interest peaks at $45,000 and $50,000 strikes, indicating institutional target expectations.

        **Sentiment & Social Metrics:**
        Fear & Greed Index has improved to 68 (Greed) from 25 (Fear) six weeks ago, indicating healthy sentiment recovery without euphoric extremes. Google Trends for "Bitcoin" remain 60% below 2021 peaks, suggesting mainstream FOMO hasn't yet materialized.

        Social media sentiment analysis shows 73% positive mentions, while maintaining rational expectations. This balanced enthusiasm supports sustained rather than parabolic price appreciation.

        **Execution Framework:**
        Enter long position at $43,250 with position size calculated using 2% portfolio risk given high conviction rating. Consider scaling into position if price retests $43,000 support. Implement dynamic stop loss management, trailing to breakeven once position moves $800 in our favor.

        **Conclusion:**
        The convergence of technical breakout, fundamental catalysts, institutional adoption, and favorable regulatory environment creates an exceptional risk-adjusted opportunity. Our systematic analysis and proven methodology support maximum conviction in this bullish Bitcoin thesis.
      `
    },
    {
      id: 4,
      symbol: 'SPX500',
      type: 'BUY',
      entry: '4,890',
      sl: '4,850',
      tp1: '4,920',
      tp2: '4,950',
      confidence: '81%',
      pips: '+30',
      status: 'PENDING',
      color: '#28a745',
      category: 'Indices',
      timeframe: '1D',
      riskReward: '1:1.5',
      analysis: `
        **COMPREHENSIVE S&P 500 (SPX500) ANALYSIS - BUY SIGNAL**

        **Executive Summary:**
        The S&P 500 index presents a strategic long opportunity at 4,890, supported by robust corporate earnings, favorable seasonal patterns, and constructive Federal Reserve policy outlook. Our comprehensive analysis incorporating technical momentum, fundamental strength, and institutional flow yields an 81% confidence rating for continued upward movement.

        **Technical Analysis Framework:**
        The SPX500 has established a solid support base at 4,870-4,880, coinciding with the 20-day exponential moving average and the 61.8% Fibonacci retracement from the January rally. The index has successfully defended this level three times over the past week, demonstrating institutional buying interest and creating a reliable foundation for the next leg higher.

        Volume profile analysis reveals significant volume concentration around the 4,880-4,890 zone, establishing this as a fair value area where both buyers and sellers find equilibrium. The breakout above 4,890 on increasing volume would signal institutional accumulation and trigger algorithmic buying programs.

        Momentum indicators provide bullish confirmation, with the RSI recovering from oversold levels below 30 to the current reading of 52, indicating renewed buying interest without reaching overbought extremes. The MACD histogram shows positive divergence, with the signal line approaching a bullish crossover above the zero line.

        **Fundamental Earnings Analysis:**
        Q4 2024 earnings season has exceeded expectations with 78% of S&P 500 companies beating consensus estimates by an average of 8.4%. Technology sector leadership continues with NVDA, MSFT, and GOOGL reporting exceptional results driven by AI investment and productivity gains.

        Forward Price-to-Earnings ratio of 18.2x remains attractive compared to historical averages of 20.1x, suggesting equities offer compelling value despite recent gains. Earnings revisions trend positive with 67% of analyst revisions trending upward versus 33% downward, indicating improving corporate fundamentals.

        **Federal Reserve Policy Impact:**
        Recent Federal Reserve communications suggest a more dovish stance with potential rate cuts beginning in Q2 2025. Fed Chair Powell's testimony emphasized "data-dependent" decision-making while acknowledging inflation progress toward the 2% target.

        Lower interest rates typically benefit equity valuations through multiple expansion and reduced discount rates for future cash flows. The yield curve normalization process supports financial sector earnings while maintaining economic growth momentum.

        **Sector Rotation & Leadership:**
        Technology sector maintains leadership with semiconductor and software subsectors driving performance. The emerging AI theme creates sustainable competitive advantages for established players while generating new revenue streams.

        Healthcare sector provides defensive characteristics with pipeline drug approvals and demographic tailwinds supporting steady growth. Consumer discretionary shows resilience despite macroeconomic concerns, supported by solid employment metrics and wage growth.

        **Institutional Flow & Positioning:**
        Equity fund flows turned positive with $12.3B in net inflows over the past two weeks, the largest since November 2024. Institutional investors are reducing cash positions from 6.2% to 4.8%, indicating increased equity allocation preferences.

        Options market makers delta hedging activities suggest net positive gamma above 4,880, creating upward momentum amplification potential. Put/call ratios have normalized to 0.87, indicating balanced sentiment without excessive pessimism or euphoria.

        **Economic Backdrop Assessment:**
        Leading economic indicators show resilient growth with unemployment remaining at multi-decade lows of 3.7%. Consumer spending, representing 70% of GDP, demonstrates continued strength with retail sales growing 2.4% month-over-month.

        Corporate credit spreads remain tight with investment-grade spreads at 95 basis points over Treasuries, indicating healthy credit markets and low default expectations. This environment supports equity risk-taking and multiple expansion.

        **Seasonal & Calendar Considerations:**
        Historical analysis reveals February typically ranks as the 3rd strongest month for S&P 500 performance, with average gains of 1.8% over the past 20 years. The "January effect" momentum often carries into February, supported by pension fund rebalancing and tax-loss selling completion.

        Earnings season provides additional catalysts with 40% of S&P 500 companies reporting this week. Historical patterns suggest positive earnings surprises drive continued outperformance through month-end.

        **Technical Price Targets:**
        Primary target at 4,920 represents the next resistance level and coincides with the 50% Fibonacci retracement from the December high. This level previously provided support in late January, creating natural resistance expectations.

        Secondary target at 4,950 aligns with the monthly pivot point and represents a logical profit-taking zone before anticipated consolidation. The measured move from our current base suggests ultimate target near 5,000 psychological resistance.

        **Risk Management Strategy:**
        Stop loss at 4,850 provides 0.82% downside protection while remaining below the key support confluence zone. This positioning allows for normal market volatility while protecting against trend reversal. Our 1:1.5 risk-reward ratio ensures profitability with win rates above 67%.

        **Options Strategy Enhancement:**
        Consider implementing a bullish call spread (buy 4890 calls, sell 4920 calls) to enhance returns while limiting downside risk. This strategy provides leveraged upside participation with defined risk parameters and time decay mitigation.

        **Global Market Context:**
        International equity markets show constructive performance with European indices outperforming, suggesting global risk-on sentiment. Emerging markets demonstrate stability despite geopolitical concerns, supporting continued equity flows.

        Currency markets show USD strength against major counterparts, potentially creating headwinds for multinational corporations but supporting domestic consumption and import costs.

        **Market Microstructure Analysis:**
        Order flow analysis reveals significant buying interest below 4,880 with limited selling pressure above 4,900. High-frequency trading algorithms appear positioned for upside momentum, as evidenced by bid-ask spread compression and depth improvements.

        **Execution Recommendations:**
        Enter long position at 4,890 with position size calculated using 1.2% portfolio risk. Monitor opening price action for momentum confirmation. Consider scaling additional exposure on any retest of 4,885 support level.

        **Conclusion:**
        The combination of technical momentum, fundamental earnings strength, favorable Fed policy, and seasonal tailwinds creates a compelling bullish case for the S&P 500. Our systematic approach and risk management framework support high confidence in this strategic long position.
      `
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      color: '#1a1a1a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Top Market Ticker */}
      <div style={{
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        padding: '8px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          animation: 'scroll 30s linear infinite',
          whiteSpace: 'nowrap'
        }}>
          {asianMarkets.concat(asianMarkets).map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '40px',
              fontSize: '13px'
            }}>
              <span style={{ color: '#495057', fontWeight: '600' }}>{item.name}</span>
              <span style={{ color: '#212529', margin: '0 8px', fontWeight: '500' }}>{item.price}</span>
              <span style={{
                color: item.trend === 'up' ? '#28a745' : '#dc3545',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {item.changePercent}
              </span>
              <span style={{
                color: item.trend === 'up' ? '#28a745' : '#dc3545',
                fontSize: '10px',
                marginLeft: '4px'
              }}>
                {item.trend === 'up' ? '▲' : '▼'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e9ecef',
        padding: '12px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#0d6efd',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 PK Signal Pulse
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
              {[
                { key: 'dashboard', label: 'Dashboard' },
                { key: 'signals', label: 'Live Signals' },
                { key: 'markets', label: 'Asian Markets' },
                { key: 'news', label: 'Market News' },
                { key: 'calendar', label: 'Economic Calendar' },
                { key: 'education', label: 'Education' },
                { key: 'ai-analysis', label: 'AI Analysis' },
                { key: 'pricing', label: 'Subscription' },
                { key: 'brokers', label: 'Partner Brokers' }
              ].map(tab => (
                <span
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    color: activeTab === tab.key ? '#0d6efd' : '#6c757d',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeTab === tab.key ? '600' : '400',
                    borderBottom: activeTab === tab.key ? '2px solid #0d6efd' : 'none',
                    paddingBottom: '4px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6c757d' }}>{currentTime}</span>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('login') }}
              style={{
                background: 'transparent',
                border: '1px solid #0d6efd',
                color: '#0d6efd',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              Login
            </button>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('register') }}
              style={{
                background: '#0d6efd',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Market Overview Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { title: 'Active Signals', value: '12', change: '+3 today', icon: '🎯', color: '#0d6efd' },
                { title: 'Win Rate', value: '87.5%', change: '+2.3% this week', icon: '🏆', color: '#28a745' },
                { title: 'Total Pips', value: '1,247', change: '+89 today', icon: '📈', color: '#fd7e14' },
                { title: 'Subscribers', value: '2,847', change: '+47 today', icon: '👥', color: '#6f42c1' }
              ].map((card, index) => (
                <div key={index} style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#6c757d', fontWeight: '500' }}>{card.title}</span>
                    <span style={{ fontSize: '20px' }}>{card.icon}</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: card.color, marginBottom: '5px' }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#28a745', fontWeight: '500' }}>{card.change}</div>
                </div>
              ))}
            </div>

            {/* Live Signals with Comprehensive Analysis */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', fontWeight: '700' }}>
                🔴 Live Premium Signals & Analysis
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
                {signals.map((signal) => (
                  <div key={signal.id} style={{
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                    overflow: 'hidden'
                  }}>
                    {/* Signal Header */}
                    <div style={{
                      background: `linear-gradient(135deg, ${signal.color}15, ${signal.color}05)`,
                      padding: '20px',
                      borderBottom: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div>
                          <h3 style={{ color: '#1a1a1a', fontSize: '20px', margin: '0 0 5px 0', fontWeight: '700' }}>
                            {signal.symbol}
                          </h3>
                          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <span style={{ color: '#6c757d', fontSize: '13px' }}>{signal.category}</span>
                            <span style={{ color: '#6c757d', fontSize: '13px' }}>Timeframe: {signal.timeframe}</span>
                            <span style={{ color: '#6c757d', fontSize: '13px' }}>R:R {signal.riskReward}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{
                            background: signal.type === 'BUY' ? '#28a74520' : '#dc354520',
                            color: signal.color,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '700'
                          }}>
                            {signal.type} SIGNAL
                          </span>
                          <span style={{
                            background: signal.status === 'ACTIVE' ? '#28a74520' : '#ffc10720',
                            color: signal.status === 'ACTIVE' ? '#28a745' : '#ffc107',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {signal.status}
                          </span>
                        </div>
                      </div>

                      {/* Signal Data Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>ENTRY</div>
                          <div style={{ color: '#1a1a1a', fontSize: '16px', fontWeight: '700' }}>{signal.entry}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>STOP LOSS</div>
                          <div style={{ color: '#dc3545', fontSize: '16px', fontWeight: '700' }}>{signal.sl}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>TARGET 1</div>
                          <div style={{ color: '#28a745', fontSize: '16px', fontWeight: '700' }}>{signal.tp1}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>TARGET 2</div>
                          <div style={{ color: '#28a745', fontSize: '16px', fontWeight: '700' }}>{signal.tp2}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>CONFIDENCE</div>
                          <div style={{ color: '#28a745', fontSize: '16px', fontWeight: '700' }}>{signal.confidence}</div>
                        </div>
                        <div style={{ background: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                          <div style={{ color: '#6c757d', fontSize: '11px', marginBottom: '5px', fontWeight: '600' }}>POTENTIAL</div>
                          <div style={{ color: '#28a745', fontSize: '16px', fontWeight: '700' }}>{signal.pips}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button style={{
                          background: '#0d6efd',
                          border: 'none',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}>
                          Copy Signal
                        </button>
                        <button
                          onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #0d6efd',
                            color: '#0d6efd',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          {selectedSignal === signal.id ? 'Hide Analysis' : 'Read Full Analysis'}
                        </button>
                      </div>
                    </div>

                    {/* Comprehensive Analysis Section */}
                    {selectedSignal === signal.id && (
                      <div style={{
                        padding: '30px',
                        background: '#fafbfc',
                        borderTop: '1px solid #e9ecef'
                      }}>
                        <div style={{
                          color: '#1a1a1a',
                          fontSize: '14px',
                          lineHeight: '1.7',
                          fontFamily: 'Georgia, serif'
                        }}>
                          {signal.analysis.split('\n').map((paragraph, index) => (
                            <div key={index} style={{ marginBottom: '16px' }}>
                              {paragraph.trim().startsWith('**') ? (
                                <h4 style={{
                                  color: '#0d6efd',
                                  fontSize: '16px',
                                  fontWeight: '700',
                                  margin: '20px 0 10px 0',
                                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                                }}>
                                  {paragraph.replace(/\*\*/g, '')}
                                </h4>
                              ) : (
                                <p style={{ margin: '0 0 12px 0', textAlign: 'justify' }}>
                                  {paragraph}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div style={{
                          marginTop: '25px',
                          padding: '20px',
                          background: '#ffffff',
                          border: '1px solid #e9ecef',
                          borderRadius: '8px'
                        }}>
                          <h5 style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>
                            📊 Key Metrics Summary
                          </h5>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                            <div>
                              <span style={{ color: '#6c757d', fontSize: '12px' }}>Risk/Reward: </span>
                              <span style={{ color: '#1a1a1a', fontWeight: '600' }}>{signal.riskReward}</span>
                            </div>
                            <div>
                              <span style={{ color: '#6c757d', fontSize: '12px' }}>Timeframe: </span>
                              <span style={{ color: '#1a1a1a', fontWeight: '600' }}>{signal.timeframe}</span>
                            </div>
                            <div>
                              <span style={{ color: '#6c757d', fontSize: '12px' }}>Confidence: </span>
                              <span style={{ color: '#28a745', fontWeight: '600' }}>{signal.confidence}</span>
                            </div>
                            <div>
                              <span style={{ color: '#6c757d', fontSize: '12px' }}>Category: </span>
                              <span style={{ color: '#1a1a1a', fontWeight: '600' }}>{signal.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain the same but with white theme colors */}
        {activeTab === 'education' && (
          <div>
            <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', fontWeight: '700' }}>
              📚 Trading Education Center
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Forex Trading Fundamentals',
                  description: 'Master the basics of currency trading, including major pairs, market hours, and fundamental analysis techniques.',
                  level: 'Beginner',
                  duration: '2 hours',
                  lessons: 8
                },
                {
                  title: 'Advanced Technical Analysis',
                  description: 'Deep dive into chart patterns, indicators, and advanced technical analysis strategies used by professional traders.',
                  level: 'Advanced',
                  duration: '3 hours',
                  lessons: 12
                },
                {
                  title: 'Risk Management Mastery',
                  description: 'Learn how to protect your capital with proper position sizing, stop losses, and portfolio management techniques.',
                  level: 'Intermediate',
                  duration: '1.5 hours',
                  lessons: 6
                },
                {
                  title: 'Cryptocurrency Trading',
                  description: 'Understand the crypto market dynamics, DeFi protocols, and how to trade digital assets effectively.',
                  level: 'Intermediate',
                  duration: '2.5 hours',
                  lessons: 10
                }
              ].map((course, index) => (
                <div key={index} style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}>
                  <h3 style={{ color: '#1a1a1a', fontSize: '18px', marginBottom: '10px' }}>{course.title}</h3>
                  <p style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                    {course.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <span style={{
                      background: course.level === 'Beginner' ? '#28a74520' :
                                 course.level === 'Intermediate' ? '#ffc10720' : '#dc354520',
                      color: course.level === 'Beginner' ? '#28a745' :
                             course.level === 'Intermediate' ? '#ffc107' : '#dc3545',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {course.level}
                    </span>
                    <span style={{ color: '#6c757d', fontSize: '12px' }}>
                      {course.duration} • {course.lessons} lessons
                    </span>
                  </div>
                  <button style={{
                    background: '#0d6efd',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: '600'
                  }}>
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Asian Markets Tab */}
        {activeTab === 'markets' && (
          <div>
            <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', fontWeight: '700' }}>
              📈 Asian Markets Live Data
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {asianMarkets.map((market, index) => (
                <div key={index} style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                  borderLeft: `4px solid ${market.trend === 'up' ? '#28a745' : '#dc3545'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: '#1a1a1a', fontSize: '16px', margin: '0', fontWeight: '600' }}>{market.name}</h3>
                    <span style={{ fontSize: '16px' }}>{market.trend === 'up' ? '📈' : '📉'}</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '5px' }}>
                    {market.price}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{
                      color: market.trend === 'up' ? '#28a745' : '#dc3545',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {market.change}
                    </span>
                    <span style={{
                      color: market.trend === 'up' ? '#28a745' : '#dc3545',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      ({market.changePercent})
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '18px', marginBottom: '15px', fontWeight: '600' }}>
                🇵🇰 Pakistan Market Analysis
              </h3>
              <div style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>KSE-100 Index Performance:</strong> The Pakistan Stock Exchange continues to show resilience with the KSE-100 index gaining momentum driven by strong foreign investment inflows and positive economic indicators.</p>
                <p><strong>PKR Exchange Rate:</strong> The Pakistani Rupee has stabilized against major currencies following successful completion of IMF program milestones and improved foreign exchange reserves.</p>
                <p><strong>Sector Outlook:</strong> Banking, cement, and textile sectors are leading the rally with strong institutional interest and improved profit margins.</p>
              </div>
            </div>
          </div>
        )}

        {/* Market News Tab */}
        {activeTab === 'news' && (
          <div>
            <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', fontWeight: '700' }}>
              📰 Market News & Analysis
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {breakingNews.map((news) => (
                <div key={news.id} style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                  borderLeft: `4px solid ${news.impact === 'High' ? '#dc3545' : news.impact === 'Medium' ? '#fd7e14' : '#28a745'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                      <span style={{
                        background: news.impact === 'High' ? '#dc354520' : news.impact === 'Medium' ? '#fd7e1420' : '#28a74520',
                        color: news.impact === 'High' ? '#dc3545' : news.impact === 'Medium' ? '#fd7e14' : '#28a745',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {news.impact} Impact
                      </span>
                      <span style={{
                        background: '#6c757d20',
                        color: '#6c757d',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        marginLeft: '10px'
                      }}>
                        {news.category}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6c757d' }}>{news.time}</span>
                  </div>

                  <h3 style={{
                    color: '#1a1a1a',
                    fontSize: '18px',
                    marginBottom: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedNews(selectedNews === news.id ? null : news.id)}
                  >
                    {news.title}
                  </h3>

                  <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '10px' }}>
                    {news.summary}
                  </p>

                  {selectedNews === news.id && (
                    <div style={{
                      background: '#f8f9fa',
                      padding: '15px',
                      borderRadius: '6px',
                      marginTop: '10px',
                      borderLeft: '3px solid #0d6efd'
                    }}>
                      <p style={{ color: '#1a1a1a', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>
                        {news.content}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedNews(selectedNews === news.id ? null : news.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0d6efd',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      marginTop: '10px'
                    }}
                  >
                    {selectedNews === news.id ? 'Hide Details' : 'Read Full Article'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Economic Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px', fontWeight: '700' }}>
              📅 Economic Calendar - Asian Markets
            </h2>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>
                Today's Key Events
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {economicEvents.map((event, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 100px 100px 100px',
                    gap: '15px',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    borderLeft: `4px solid ${event.importance === 'High' ? '#dc3545' : '#fd7e14'}`
                  }}>
                    <span style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '14px' }}>
                      {event.time}
                    </span>
                    <span style={{ color: '#1a1a1a', fontSize: '14px' }}>
                      {event.event}
                    </span>
                    <span style={{
                      background: event.importance === 'High' ? '#dc354520' : '#fd7e1420',
                      color: event.importance === 'High' ? '#dc3545' : '#fd7e14',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      {event.importance}
                    </span>
                    <span style={{ color: '#0d6efd', fontSize: '13px', fontWeight: '600' }}>
                      {event.forecast}
                    </span>
                    <span style={{ color: '#6c757d', fontSize: '13px' }}>
                      {event.previous}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>
                📊 Weekly Market Outlook
              </h3>
              <div style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>This Week's Focus:</strong> Central bank meetings from Pakistan and China will dominate market sentiment, with inflation data releases from major Asian economies providing additional trading opportunities.</p>
                <p><strong>Key Levels to Watch:</strong> USD/PKR resistance at 280.00, KSE-100 support at 90,000, and Nikkei 225 testing 41,000 psychological level.</p>
                <p><strong>Trading Strategy:</strong> Focus on news-driven volatility around central bank announcements and position accordingly for potential breakouts in major currency pairs.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal with white theme */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '30px',
            width: '400px',
            maxWidth: '90vw',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '20px', margin: '0', fontWeight: '700' }}>
                {authMode === 'login' ? 'Login to Your Account' : 'Create New Account'}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6c757d',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#1a1a1a',
                  fontSize: '14px'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#1a1a1a',
                  fontSize: '14px'
                }}
              />
              {authMode === 'register' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    borderRadius: '4px',
                    padding: '12px',
                    color: '#1a1a1a',
                    fontSize: '14px'
                  }}
                />
              )}
              <button
                type="submit"
                style={{
                  background: '#0d6efd',
                  border: 'none',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span style={{ color: '#6c757d', fontSize: '13px' }}>
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0d6efd',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}