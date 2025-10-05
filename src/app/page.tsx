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
    'module1-lesson1': {
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
    'module1-lesson2': {
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
    'module1-lesson3': {
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
    'module1-lesson4': {
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
    'module1-lesson5': {
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
    'module1-lesson6': {
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
    'module1-lesson7': {
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
    'module1-lesson8': {
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
    'module2-lesson1': {
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
    'module2-lesson2': {
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
    'module2-lesson3': {
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
    'module2-lesson4': {
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
    'module2-lesson5': {
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
    'module2-lesson6': {
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
    }
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
                          <div style={{ marginTop: '12px' }}>
                            {module.topics.map((topic, topicIndex) => {
                              const lessonKey = `module${moduleIndex + 1}-lesson${topicIndex + 1}`
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