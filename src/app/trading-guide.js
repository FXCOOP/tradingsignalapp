// Complete Trading Guide Content for GCC Signal Pro
// This will be integrated into the main page.tsx

const tradingGuideContent = `
            {/* Complete Trading Guide Chapters */}
            <h2 style={{
              fontSize: '36px',
              fontWeight: '900',
              marginBottom: '40px',
              color: '#1e293b',
              textAlign: 'center'
            }}>
              📚 Complete Trading Mastery Guide
            </h2>

            {/* Trading Guide Chapters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px',
              marginBottom: '60px'
            }}>
              {[
                {
                  id: 1,
                  level: 'BEGINNER',
                  title: 'Chapter 1: Trading Fundamentals',
                  description: 'Master the basics of trading, markets, and financial instruments',
                  color: '#059669',
                  sections: [
                    {
                      title: '1.1 What is Trading?',
                      content: [
                        'Definition: Trading is buying and selling financial instruments to profit from price movements',
                        'Types: Stocks, Forex, Commodities, Bonds, Cryptocurrencies',
                        'Time Horizons: Day trading, Swing trading, Position trading',
                        'Market Participants: Retail traders, Institutions, Market makers'
                      ],
                      examples: [
                        'Example 1: Buy ARAMCO at 32.45 SAR, sell at 34.50 SAR = 6.3% profit',
                        'Example 2: Short EUR/USD from 1.0850 to 1.0780 = 70 pips profit'
                      ]
                    },
                    {
                      title: '1.2 Financial Markets Overview',
                      content: [
                        'Stock Markets: Ownership shares in companies (Tadawul, ADX, QE)',
                        'Forex Markets: Currency exchange (USD/SAR, EUR/AED)',
                        'Commodity Markets: Physical goods (Gold, Oil, Silver)',
                        'Bond Markets: Debt instruments (Government bonds, Corporate bonds)'
                      ],
                      examples: [
                        'GCC Stock Examples: ARAMCO (Energy), Emirates NBD (Banking)',
                        'GCC Forex: USD/SAR (3.75 fixed), EUR/AED (fluctuating)'
                      ]
                    },
                    {
                      title: '1.3 Market Hours & Sessions',
                      content: [
                        'Tadawul (Saudi): 10:00-15:00 AST (Sunday-Thursday)',
                        'ADX/DFM (UAE): 10:00-14:00 GST (Sunday-Thursday)',
                        'QE (Qatar): 9:30-13:30 AST (Sunday-Thursday)',
                        'Global Forex: 24/5 trading (Sydney, Tokyo, London, New York)'
                      ],
                      examples: [
                        'Best Times: Overlap periods (London-New York: 12:00-16:00 GMT)',
                        'Low Activity: Asian session for GCC traders (22:00-06:00 GST)'
                      ]
                    }
                  ]
                },
                {
                  id: 2,
                  level: 'BEGINNER',
                  title: 'Chapter 2: Order Types & Execution',
                  description: 'Learn all order types and how to execute trades properly',
                  color: '#2563eb',
                  sections: [
                    {
                      title: '2.1 Market Orders',
                      content: [
                        'Definition: Buy/sell immediately at current market price',
                        'Pros: Instant execution, guaranteed fill',
                        'Cons: Price slippage, no price control',
                        'Best Use: High liquidity stocks, urgent trades'
                      ],
                      examples: [
                        'Buy Market Order: Purchase 100 ARAMCO shares at current ask price',
                        'Sell Market Order: Sell 50 Emirates NBD shares immediately'
                      ]
                    },
                    {
                      title: '2.2 Limit Orders',
                      content: [
                        'Definition: Buy/sell at specific price or better',
                        'Buy Limit: Price at or below your limit',
                        'Sell Limit: Price at or above your limit',
                        'May not execute if price never reaches limit'
                      ],
                      examples: [
                        'Buy Limit: Buy QNB at 18.50 QAR (current price 18.70 QAR)',
                        'Sell Limit: Sell SABIC at 92.00 SAR (current price 89.50 SAR)'
                      ]
                    },
                    {
                      title: '2.3 Stop Orders (Stop Loss)',
                      content: [
                        'Stop Loss: Limit losses by selling when price falls',
                        'Stop Market: Becomes market order when stop triggered',
                        'Stop Limit: Becomes limit order when stop triggered',
                        'Trailing Stop: Adjusts with favorable price movement'
                      ],
                      examples: [
                        'Stop Loss: Own ARAMCO at 32.45 SAR, set stop at 30.80 SAR (-5%)',
                        'Trailing Stop: 2 SAR trailing stop moves up as price rises'
                      ]
                    }
                  ]
                },
                {
                  id: 3,
                  level: 'INTERMEDIATE',
                  title: 'Chapter 3: Technical Analysis Basics',
                  description: 'Master chart reading, patterns, and indicators',
                  color: '#7c3aed',
                  sections: [
                    {
                      title: '3.1 Chart Types & Timeframes',
                      content: [
                        'Line Charts: Simple price movement over time',
                        'Bar Charts: Open, High, Low, Close (OHLC) data',
                        'Candlestick Charts: Visual OHLC with color coding',
                        'Timeframes: 1min, 5min, 15min, 1hr, 4hr, 1D, 1W, 1M'
                      ],
                      examples: [
                        'Daily ARAMCO Chart: Green candle = close > open (bullish)',
                        'Weekly EUR/USD: Red candle = close < open (bearish)'
                      ]
                    },
                    {
                      title: '3.2 Support & Resistance',
                      content: [
                        'Support: Price level where buying pressure emerges',
                        'Resistance: Price level where selling pressure emerges',
                        'Key Levels: Round numbers, previous highs/lows',
                        'Breakouts: Price movement beyond support/resistance'
                      ],
                      examples: [
                        'ARAMCO Support: 30.00 SAR (psychological level)',
                        'Emirates NBD Resistance: 15.00 AED (previous high)'
                      ]
                    },
                    {
                      title: '3.3 Trend Analysis',
                      content: [
                        'Uptrend: Higher highs and higher lows',
                        'Downtrend: Lower highs and lower lows',
                        'Sideways: No clear direction, ranging',
                        'Trend Lines: Connect significant highs or lows'
                      ],
                      examples: [
                        'TASI Uptrend: 10,000 → 10,500 → 11,000 (higher highs)',
                        'USD/SAR: Fixed at 3.75 (sideways trend)'
                      ]
                    }
                  ]
                },
                {
                  id: 4,
                  level: 'INTERMEDIATE',
                  title: 'Chapter 4: Candlestick Patterns',
                  description: 'Decode market psychology through candlestick patterns',
                  color: '#dc2626',
                  sections: [
                    {
                      title: '4.1 Single Candlestick Patterns',
                      content: [
                        'Doji: Open = Close, indicates indecision',
                        'Hammer: Small body, long lower wick (bullish reversal)',
                        'Shooting Star: Small body, long upper wick (bearish reversal)',
                        'Marubozu: No wicks, strong directional movement'
                      ],
                      examples: [
                        'QNB Hammer: After downtrend, indicates buying support',
                        'SABIC Shooting Star: At resistance, suggests selling pressure'
                      ]
                    },
                    {
                      title: '4.2 Dual Candlestick Patterns',
                      content: [
                        'Bullish Engulfing: Large green candle engulfs previous red',
                        'Bearish Engulfing: Large red candle engulfs previous green',
                        'Piercing Pattern: Green candle pierces into red candle',
                        'Dark Cloud Cover: Red candle pierces into green candle'
                      ],
                      examples: [
                        'ARAMCO Bullish Engulfing: 31.50 red → 33.20 green candle',
                        'ADX Bearish Engulfing: 9,800 green → 9,600 red candle'
                      ]
                    },
                    {
                      title: '4.3 Triple Candlestick Patterns',
                      content: [
                        'Morning Star: Reversal from downtrend (bullish)',
                        'Evening Star: Reversal from uptrend (bearish)',
                        'Three White Soldiers: Three consecutive green candles',
                        'Three Black Crows: Three consecutive red candles'
                      ],
                      examples: [
                        'Emirates NBD Morning Star: 13.50 → 13.60 → 14.20',
                        'DFM Evening Star: 4,200 → 4,180 → 4,100'
                      ]
                    }
                  ]
                },
                {
                  id: 5,
                  level: 'INTERMEDIATE',
                  title: 'Chapter 5: Technical Indicators',
                  description: 'Master popular indicators for better trading decisions',
                  color: '#f59e0b',
                  sections: [
                    {
                      title: '5.1 Moving Averages',
                      content: [
                        'Simple MA: Average price over specific periods',
                        'Exponential MA: More weight to recent prices',
                        'Common Periods: 20, 50, 100, 200',
                        'Golden Cross: 50 MA crosses above 200 MA (bullish)'
                      ],
                      examples: [
                        'ARAMCO 50-day MA: 31.80 SAR (current price above = bullish)',
                        'TASI 200-day MA: 10,800 (index above = long-term bullish)'
                      ]
                    },
                    {
                      title: '5.2 RSI (Relative Strength Index)',
                      content: [
                        'Range: 0-100, measures price momentum',
                        'Overbought: RSI > 70 (potential selling)',
                        'Oversold: RSI < 30 (potential buying)',
                        'Divergence: Price vs RSI moving opposite directions'
                      ],
                      examples: [
                        'QNB RSI 25: Oversold, potential buying opportunity',
                        'SABIC RSI 75: Overbought, consider taking profits'
                      ]
                    },
                    {
                      title: '5.3 MACD (Moving Average Convergence Divergence)',
                      content: [
                        'Components: MACD line, Signal line, Histogram',
                        'Bullish Signal: MACD crosses above signal line',
                        'Bearish Signal: MACD crosses below signal line',
                        'Momentum: Histogram shows strength of trend'
                      ],
                      examples: [
                        'Emirates NBD MACD: Bullish crossover at 13.80 AED',
                        'ADX MACD: Bearish divergence suggests trend weakness'
                      ]
                    }
                  ]
                },
                {
                  id: 6,
                  level: 'ADVANCED',
                  title: 'Chapter 6: Risk Management',
                  description: 'Protect your capital with professional risk management',
                  color: '#059669',
                  sections: [
                    {
                      title: '6.1 Position Sizing',
                      content: [
                        '1% Rule: Risk only 1% of capital per trade',
                        '2% Rule: Maximum 2% risk for experienced traders',
                        'Position Size = Risk Amount ÷ (Entry - Stop Loss)',
                        'Never risk more than you can afford to lose'
                      ],
                      examples: [
                        'Capital: 100,000 SAR, 1% risk = 1,000 SAR max loss per trade',
                        'ARAMCO Trade: Entry 32.45, Stop 30.45, Risk 2 SAR per share',
                        'Position Size: 1,000 ÷ 2 = 500 shares maximum'
                      ]
                    },
                    {
                      title: '6.2 Risk-Reward Ratio',
                      content: [
                        'Minimum 1:2 ratio (risk 1 to make 2)',
                        'Preferred 1:3 ratio for better profitability',
                        'Calculate before entering any trade',
                        'Exit if ratio becomes unfavorable'
                      ],
                      examples: [
                        'QNB Trade: Risk 0.70 QAR, Target 2.10 QAR (1:3 ratio)',
                        'Entry: 18.70, Stop: 18.00, Target: 20.80 QAR'
                      ]
                    },
                    {
                      title: '6.3 Portfolio Diversification',
                      content: [
                        'Spread risk across different assets',
                        'Sector Diversification: Banking, Energy, Telecoms',
                        'Geographic: Saudi, UAE, Qatar markets',
                        'Asset Classes: Stocks, Forex, Commodities'
                      ],
                      examples: [
                        'Balanced GCC Portfolio: 40% Saudi, 30% UAE, 20% Qatar, 10% Cash',
                        'Sector Split: 25% Banking, 25% Energy, 25% Telecom, 25% Other'
                      ]
                    }
                  ]
                },
                {
                  id: 7,
                  level: 'ADVANCED',
                  title: 'Chapter 7: Trading Psychology',
                  description: 'Master the mental game of trading',
                  color: '#8b5cf6',
                  sections: [
                    {
                      title: '7.1 Emotional Control',
                      content: [
                        'Fear: Causes hesitation and missed opportunities',
                        'Greed: Leads to oversized positions and big losses',
                        'Hope: Prevents cutting losses when wrong',
                        'Discipline: Stick to your trading plan always'
                      ],
                      examples: [
                        'Fear Example: Missing ARAMCO breakout at 33.00 SAR',
                        'Greed Example: Risking 10% on single Emirates NBD trade',
                        'Hope Example: Holding losing SABIC position without stop loss'
                      ]
                    },
                    {
                      title: '7.2 Trading Journal',
                      content: [
                        'Record every trade: Entry, exit, reason, outcome',
                        'Track emotions: How you felt during the trade',
                        'Analyze patterns: What works and what doesn\'t',
                        'Monthly review: Identify areas for improvement'
                      ],
                      examples: [
                        'Good Entry: "Bought QNB on RSI oversold + support bounce"',
                        'Bad Entry: "FOMO bought ARAMCO at daily high without plan"'
                      ]
                    },
                    {
                      title: '7.3 Money Management Psychology',
                      content: [
                        'Trade size affects emotions: Smaller = calmer',
                        'Never trade scared money (money you can\'t lose)',
                        'Accept losses as cost of doing business',
                        'Focus on process, not just profits'
                      ],
                      examples: [
                        'Comfort Zone: Trade sizes that don\'t cause sleepless nights',
                        'Process Focus: "Followed my rules" vs "Made money"'
                      ]
                    }
                  ]
                },
                {
                  id: 8,
                  level: 'ADVANCED',
                  title: 'Chapter 8: GCC Markets Specialization',
                  description: 'Master the unique aspects of Gulf Cooperation Council markets',
                  color: '#059669',
                  sections: [
                    {
                      title: '8.1 Saudi Market (Tadawul)',
                      content: [
                        'TASI Index: Main benchmark index',
                        'Trading Hours: 10:00-15:00 AST',
                        'Key Sectors: Energy (ARAMCO), Banking (Al Rajhi), Petrochemicals (SABIC)',
                        'Circuit Breakers: 10% up/down limits',
                        'Settlement: T+2 (trade date plus 2 days)'
                      ],
                      examples: [
                        'ARAMCO: Largest stock by market cap (35% of TASI)',
                        'Al Rajhi Bank: Largest Islamic bank globally',
                        'SABIC: Major petrochemical producer'
                      ]
                    },
                    {
                      title: '8.2 UAE Markets (ADX & DFM)',
                      content: [
                        'Abu Dhabi Exchange (ADX): Larger, more liquid',
                        'Dubai Financial Market (DFM): Smaller, more volatile',
                        'Key Stocks: Emirates NBD, ADNOC, Emaar',
                        'Trading Hours: 10:00-14:00 GST',
                        'Foreign Ownership: Up to 100% in most stocks'
                      ],
                      examples: [
                        'Emirates NBD: Largest bank in UAE',
                        'ADNOC Distribution: Oil & gas retail',
                        'Emaar Properties: Real estate developer (Burj Khalifa)'
                      ]
                    },
                    {
                      title: '8.3 Qatar Exchange (QE)',
                      content: [
                        'QE All Share Index: Main benchmark',
                        'Trading Hours: 9:30-13:30 AST',
                        'Key Stocks: QNB, Ooredoo, Industries Qatar',
                        'MSCI Emerging Market inclusion',
                        'Strong banking and telecom sectors'
                      ],
                      examples: [
                        'QNB: Largest bank in Middle East by assets',
                        'Ooredoo: Major telecommunications provider',
                        'Industries Qatar: Petrochemicals and fertilizers'
                      ]
                    }
                  ]
                },
                {
                  id: 9,
                  level: 'PROFESSIONAL',
                  title: 'Chapter 9: Advanced Strategies',
                  description: 'Professional trading strategies for consistent profits',
                  color: '#dc2626',
                  sections: [
                    {
                      title: '9.1 Breakout Trading',
                      content: [
                        'Identify key resistance/support levels',
                        'Wait for volume confirmation on breakout',
                        'Enter on pullback to broken level',
                        'Set stops below/above the breakout level'
                      ],
                      examples: [
                        'ARAMCO breakout above 33.00 SAR resistance',
                        'Volume surge confirms genuine breakout',
                        'Enter on pullback to 33.20 SAR'
                      ]
                    },
                    {
                      title: '9.2 Trend Following',
                      content: [
                        'Identify strong trending markets',
                        'Enter on pullbacks in trend direction',
                        'Use moving averages for trend confirmation',
                        'Trail stops to protect profits'
                      ],
                      examples: [
                        'QNB uptrend: Buy dips to 20-day MA',
                        'TASI uptrend: Stay long above 200-day MA'
                      ]
                    },
                    {
                      title: '9.3 Mean Reversion',
                      content: [
                        'Identify oversold/overbought conditions',
                        'Use RSI, Bollinger Bands for signals',
                        'Enter counter-trend positions carefully',
                        'Quick profits, tight stops required'
                      ],
                      examples: [
                        'Emirates NBD oversold bounce from 13.50 AED',
                        'ADX overbought reversal from 10,200 level'
                      ]
                    }
                  ]
                },
                {
                  id: 10,
                  level: 'PROFESSIONAL',
                  title: 'Chapter 10: Islamic Finance & Halal Trading',
                  description: 'Trade in compliance with Islamic finance principles',
                  color: '#059669',
                  sections: [
                    {
                      title: '10.1 Shariah-Compliant Stocks',
                      content: [
                        'Avoid companies with high debt-to-equity ratios',
                        'No involvement in alcohol, gambling, pork, tobacco',
                        'No conventional banking or insurance',
                        'Focus on real economic activity'
                      ],
                      examples: [
                        'Halal: ARAMCO (energy), SABIC (manufacturing)',
                        'Questionable: Conventional banks like Emirates NBD',
                        'Check Shariah compliance ratings before trading'
                      ]
                    },
                    {
                      title: '10.2 Prohibited Trading Practices',
                      content: [
                        'Short Selling: Generally prohibited',
                        'Excessive Leverage: Avoid high debt ratios',
                        'Speculation vs Investment: Focus on value',
                        'Day Trading: Acceptable if not excessive gambling'
                      ],
                      examples: [
                        'Acceptable: Buying ARAMCO for dividend income',
                        'Prohibited: Short selling without owning shares',
                        'Gray Area: High-frequency day trading'
                      ]
                    },
                    {
                      title: '10.3 Profit Purification',
                      content: [
                        'Calculate non-compliant income percentage',
                        'Donate equivalent amount to charity',
                        'Keep detailed records for purification',
                        'Consult Islamic scholars for guidance'
                      ],
                      examples: [
                        'If 5% of company revenue is from interest: Donate 5% of profits',
                        'Mixed portfolio: Purify based on non-compliant percentage'
                      ]
                    }
                  ]
                },
                {
                  id: 11,
                  level: 'PROFESSIONAL',
                  title: 'Chapter 11: Trading Platforms & Tools',
                  description: 'Master professional trading platforms and tools',
                  color: '#2563eb',
                  sections: [
                    {
                      title: '11.1 Trading Platforms',
                      content: [
                        'MetaTrader 4/5: Popular for Forex',
                        'TradingView: Advanced charting and analysis',
                        'Broker Platforms: Tailored for specific markets',
                        'Mobile Apps: Trading on the go'
                      ],
                      examples: [
                        'MT5 for GCC Forex: USD/SAR, EUR/AED',
                        'TradingView for ARAMCO chart analysis',
                        'Tadawul website for Saudi stocks'
                      ]
                    },
                    {
                      title: '11.2 Market Data & Analysis',
                      content: [
                        'Real-time quotes and charts',
                        'Economic calendar and news',
                        'Company financials and reports',
                        'Technical screening tools'
                      ],
                      examples: [
                        'Bloomberg Terminal: Professional market data',
                        'Reuters for GCC market news',
                        'Company annual reports for fundamental analysis'
                      ]
                    },
                    {
                      title: '11.3 Risk Management Tools',
                      content: [
                        'Position size calculators',
                        'Risk-reward ratio tools',
                        'Portfolio analyzers',
                        'Correlation matrices'
                      ],
                      examples: [
                        'Calculator: Determine 1% risk position size',
                        'Portfolio: Monitor total GCC exposure',
                        'Correlation: UAE vs Saudi market relationship'
                      ]
                    }
                  ]
                },
                {
                  id: 12,
                  level: 'EXPERT',
                  title: 'Chapter 12: Professional Trading Business',
                  description: 'Build a sustainable trading business',
                  color: '#7c3aed',
                  sections: [
                    {
                      title: '12.1 Business Plan Development',
                      content: [
                        'Define trading goals and objectives',
                        'Create detailed trading rules and procedures',
                        'Set realistic profit targets and drawdown limits',
                        'Plan for different market conditions'
                      ],
                      examples: [
                        'Goal: 20% annual return with max 10% drawdown',
                        'Rules: Only trade top 50 GCC stocks',
                        'Procedure: Daily market analysis before trading'
                      ]
                    },
                    {
                      title: '12.2 Performance Analysis',
                      content: [
                        'Track key metrics: Win rate, average win/loss',
                        'Calculate Sharpe ratio and maximum drawdown',
                        'Analyze monthly and quarterly performance',
                        'Identify and fix performance issues'
                      ],
                      examples: [
                        'Metrics: 65% win rate, 1.8 avg win/loss ratio',
                        'Analysis: Better performance in trending markets',
                        'Issue: Over-trading during low volatility periods'
                      ]
                    },
                    {
                      title: '12.3 Scaling Your Trading',
                      content: [
                        'Gradually increase position sizes',
                        'Add new markets and instruments',
                        'Develop multiple trading strategies',
                        'Consider managing external capital'
                      ],
                      examples: [
                        'Scale: Start 1% risk, increase to 2% when profitable',
                        'Expansion: Add Qatar stocks to Saudi/UAE focus',
                        'Strategies: Combine trend following with mean reversion'
                      ]
                    }
                  ]
                }
              ].map((chapter, index) => (
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
                  e.currentTarget.style.borderColor = chapter.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = \`0 20px 40px \${chapter.color}20\`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  {/* Chapter Header */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: \`linear-gradient(90deg, \${chapter.color} 0%, \${chapter.color}80 100%)\`
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <span style={{
                        background: chapter.color + '15',
                        color: chapter.color,
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {chapter.level}
                      </span>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#1e293b',
                        marginTop: '12px',
                        marginBottom: '8px',
                        lineHeight: '1.3'
                      }}>
                        {chapter.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#64748b',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {chapter.description}
                      </p>
                    </div>
                  </div>

                  {/* Chapter Sections */}
                  <div style={{
                    marginBottom: '24px'
                  }}>
                    {selectedCourse === chapter.id ? (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '24px'
                      }}>
                        {chapter.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} style={{
                            marginBottom: sectionIndex < chapter.sections.length - 1 ? '32px' : 0,
                            paddingBottom: sectionIndex < chapter.sections.length - 1 ? '24px' : 0,
                            borderBottom: sectionIndex < chapter.sections.length - 1 ? '1px solid #e2e8f0' : 'none'
                          }}>
                            <h4 style={{
                              fontSize: '18px',
                              fontWeight: '700',
                              color: chapter.color,
                              marginBottom: '16px'
                            }}>
                              {section.title}
                            </h4>

                            {/* Section Content */}
                            <div style={{ marginBottom: '16px' }}>
                              <h5 style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1e293b',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                📖 Key Concepts:
                              </h5>
                              <ul style={{
                                margin: 0,
                                paddingLeft: '20px',
                                fontSize: '14px',
                                color: '#64748b',
                                lineHeight: '1.6'
                              }}>
                                {section.content.map((item, itemIndex) => (
                                  <li key={itemIndex} style={{ marginBottom: '6px' }}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Examples */}
                            {section.examples && (
                              <div>
                                <h5 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#059669',
                                  marginBottom: '8px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  💡 Real Examples:
                                </h5>
                                <ul style={{
                                  margin: 0,
                                  paddingLeft: '20px',
                                  fontSize: '14px',
                                  color: '#059669',
                                  lineHeight: '1.6',
                                  fontWeight: '500'
                                }}>
                                  {section.examples.map((example, exampleIndex) => (
                                    <li key={exampleIndex} style={{ marginBottom: '6px' }}>
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '20px'
                      }}>
                        <p style={{
                          fontSize: '14px',
                          color: '#64748b',
                          marginBottom: '16px',
                          lineHeight: '1.6'
                        }}>
                          📚 {chapter.sections.length} detailed sections covering:
                        </p>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                          gap: '8px',
                          marginBottom: '16px'
                        }}>
                          {chapter.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} style={{
                              fontSize: '13px',
                              color: '#64748b',
                              fontWeight: '500'
                            }}>
                              • {section.title}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCourse(selectedCourse === chapter.id ? null : chapter.id)
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: chapter.color,
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          📖 Read Full Chapter →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Chapter Action */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      flex: 1,
                      background: \`linear-gradient(135deg, \${chapter.color} 0%, \${chapter.color}DD 100%)\`,
                      color: 'white',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}>
                      ✅ Chapter {chapter.id} - FREE Access
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: '#64748b',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      📋 Quiz
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trading Simulator Section */}
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '20px',
              padding: '48px',
              marginBottom: '48px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '16px'
              }}>
                🎮 Interactive Trading Simulator
              </h2>
              <p style={{
                fontSize: '20px',
                marginBottom: '32px',
                opacity: 0.9,
                lineHeight: '1.7',
                maxWidth: '800px',
                margin: '0 auto 32px'
              }}>
                Practice everything you've learned with our advanced trading simulator.
                Real GCC market data, virtual money, zero risk.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {[
                  '🏛️ Live GCC Market Data',
                  '💰 Virtual 100,000 SAR Capital',
                  '📊 Real-time Charts & Analysis',
                  '📈 Track Your Performance',
                  '🏆 Compete with Other Traders',
                  '📱 Mobile & Desktop Access'
                ].map((feature, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '20px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {feature}
                  </div>
                ))}
              </div>
              <button style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#2563eb',
                border: 'none',
                padding: '18px 36px',
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
              }}>
                🚀 Launch Trading Simulator
              </button>
            </div>

            {/* Trading Terms Glossary */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '48px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '32px',
                color: '#1e293b',
                textAlign: 'center'
              }}>
                📚 Complete Trading Terms Glossary
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                textAlign: 'center',
                marginBottom: '32px',
                lineHeight: '1.7'
              }}>
                Over 500 trading terms with clear definitions, examples, and Arabic translations
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    category: 'Market Basics',
                    icon: '🏛️',
                    count: '50+ terms',
                    examples: ['Bull Market', 'Bear Market', 'Volume', 'Volatility']
                  },
                  {
                    category: 'Technical Analysis',
                    icon: '📈',
                    count: '80+ terms',
                    examples: ['Support', 'Resistance', 'Moving Average', 'RSI']
                  },
                  {
                    category: 'Order Types',
                    icon: '📋',
                    count: '30+ terms',
                    examples: ['Market Order', 'Limit Order', 'Stop Loss', 'Take Profit']
                  },
                  {
                    category: 'Risk Management',
                    icon: '🛡️',
                    count: '40+ terms',
                    examples: ['Position Size', 'Risk-Reward', 'Drawdown', 'Diversification']
                  },
                  {
                    category: 'GCC Markets',
                    icon: '🏝️',
                    count: '60+ terms',
                    examples: ['Tadawul', 'TASI', 'Circuit Breaker', 'Settlement']
                  },
                  {
                    category: 'Islamic Finance',
                    icon: '☪️',
                    count: '35+ terms',
                    examples: ['Halal Trading', 'Shariah Compliant', 'Riba', 'Gharar']
                  }
                ].map((category, index) => (
                  <div key={index} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}>
                    <div style={{
                      fontSize: '36px',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      {category.icon}
                    </div>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '8px',
                      textAlign: 'center'
                    }}>
                      {category.category}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#2563eb',
                      fontWeight: '600',
                      textAlign: 'center',
                      marginBottom: '16px'
                    }}>
                      {category.count}
                    </p>
                    <div style={{
                      fontSize: '13px',
                      color: '#64748b',
                      lineHeight: '1.5'
                    }}>
                      {category.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} style={{ marginBottom: '4px' }}>
                          • {example}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Support */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '20px',
              padding: '40px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '16px'
              }}>
                💬 24/7 Expert Support
              </h2>
              <p style={{
                fontSize: '18px',
                marginBottom: '32px',
                opacity: 0.9,
                lineHeight: '1.7'
              }}>
                Get help from our team of professional traders and market analysts.
                Ask questions, clarify concepts, and accelerate your learning.
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#059669',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
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
                }}>
                  💬 Live Chat Support
                </button>
                <button style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  padding: '16px 24px',
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
                }}>
                  📧 Email Support
                </button>
                <button style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  padding: '16px 24px',
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
                }}>
                  📞 Phone Support
                </button>
              </div>
            </div>
          </div>
        )}`;

export default tradingGuideContent;