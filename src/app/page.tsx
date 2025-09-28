'use client'
import { useState } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const currentTime = new Date().toLocaleString()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#131722',
      color: '#d1d4dc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Market Ticker */}
      <div style={{
        background: '#1e222d',
        borderBottom: '1px solid #2a2e39',
        padding: '8px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          animation: 'scroll 30s linear infinite',
          whiteSpace: 'nowrap'
        }}>
          {[
            { symbol: 'EUR/USD', price: '1.1120', change: '-0.23%', color: '#f23645' },
            { symbol: 'GBP/USD', price: '1.2890', change: '+0.45%', color: '#4caf50' },
            { symbol: 'USD/JPY', price: '149.85', change: '+0.12%', color: '#4caf50' },
            { symbol: 'XAU/USD', price: '2640.50', change: '+1.2%', color: '#4caf50' },
            { symbol: 'BTC/USD', price: '43,250', change: '+2.8%', color: '#4caf50' },
            { symbol: 'SPX500', price: '4,890', change: '+0.8%', color: '#4caf50' },
            { symbol: 'NASDAQ', price: '15,420', change: '+1.1%', color: '#4caf50' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '40px',
              fontSize: '13px'
            }}>
              <span style={{ color: '#d1d4dc', fontWeight: '500' }}>{item.symbol}</span>
              <span style={{ color: '#d1d4dc', margin: '0 8px' }}>{item.price}</span>
              <span style={{ color: item.color, fontSize: '12px' }}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{
        background: '#1e222d',
        borderBottom: '1px solid #2a2e39',
        padding: '12px 0'
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
              color: '#2962ff',
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
                { key: 'education', label: 'Education' },
                { key: 'ai-analysis', label: 'AI Analysis' },
                { key: 'pricing', label: 'Subscription' },
                { key: 'brokers', label: 'Partner Brokers' }
              ].map(tab => (
                <span
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    color: activeTab === tab.key ? '#2962ff' : '#868993',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeTab === tab.key ? '600' : '400',
                    borderBottom: activeTab === tab.key ? '2px solid #2962ff' : 'none',
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
            <span style={{ fontSize: '12px', color: '#868993' }}>{currentTime}</span>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('login') }}
              style={{
                background: 'transparent',
                border: '1px solid #2962ff',
                color: '#2962ff',
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
                background: '#2962ff',
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
                { title: 'Active Signals', value: '12', change: '+3 today', icon: '🎯' },
                { title: 'Win Rate', value: '87.5%', change: '+2.3% this week', icon: '🏆' },
                { title: 'Total Pips', value: '1,247', change: '+89 today', icon: '📈' },
                { title: 'Subscribers', value: '2,847', change: '+47 today', icon: '👥' }
              ].map((card, index) => (
                <div key={index} style={{
                  background: '#1e222d',
                  border: '1px solid #2a2e39',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#868993' }}>{card.title}</span>
                    <span style={{ fontSize: '20px' }}>{card.icon}</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d1d4dc', marginBottom: '5px' }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#4caf50' }}>{card.change}</div>
                </div>
              ))}
            </div>

            {/* Live Signals Grid */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#d1d4dc', fontSize: '20px', marginBottom: '20px', fontWeight: '600' }}>
                🔴 Live Premium Signals
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '20px'
              }}>
                {/* Forex Signals */}
                {[
                  {
                    symbol: 'XAU/USD (Gold)',
                    type: 'BUY',
                    entry: '2640.50',
                    sl: '2630.00',
                    tp1: '2650.00',
                    tp2: '2660.00',
                    confidence: '85%',
                    pips: '+95',
                    status: 'ACTIVE',
                    color: '#4caf50',
                    category: 'Commodities'
                  },
                  {
                    symbol: 'EUR/USD',
                    type: 'SELL',
                    entry: '1.1120',
                    sl: '1.1150',
                    tp1: '1.1090',
                    tp2: '1.1060',
                    confidence: '78%',
                    pips: '+30',
                    status: 'ACTIVE',
                    color: '#f23645',
                    category: 'Forex'
                  },
                  {
                    symbol: 'BTC/USD',
                    type: 'BUY',
                    entry: '43,250',
                    sl: '42,800',
                    tp1: '44,000',
                    tp2: '44,500',
                    confidence: '92%',
                    pips: '+750',
                    status: 'ACTIVE',
                    color: '#4caf50',
                    category: 'Crypto'
                  },
                  {
                    symbol: 'SPX500',
                    type: 'BUY',
                    entry: '4,890',
                    sl: '4,850',
                    tp1: '4,920',
                    tp2: '4,950',
                    confidence: '81%',
                    pips: '+30',
                    status: 'PENDING',
                    color: '#4caf50',
                    category: 'Indices'
                  }
                ].map((signal, index) => (
                  <div key={index} style={{
                    background: '#1e222d',
                    border: '1px solid #2a2e39',
                    borderRadius: '8px',
                    padding: '20px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '3px',
                      background: signal.color,
                      borderRadius: '8px 8px 0 0'
                    }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <div>
                        <div style={{ color: '#d1d4dc', fontSize: '16px', fontWeight: '600' }}>{signal.symbol}</div>
                        <div style={{ color: '#868993', fontSize: '12px' }}>{signal.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: signal.type === 'BUY' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(242, 54, 69, 0.2)',
                          color: signal.color,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {signal.type}
                        </span>
                        <span style={{
                          background: signal.status === 'ACTIVE' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)',
                          color: signal.status === 'ACTIVE' ? '#4caf50' : '#ffc107',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          {signal.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                      <div style={{ background: '#131722', padding: '12px', borderRadius: '6px' }}>
                        <div style={{ color: '#868993', fontSize: '11px', marginBottom: '4px' }}>Entry</div>
                        <div style={{ color: '#d1d4dc', fontSize: '14px', fontWeight: '600' }}>{signal.entry}</div>
                      </div>
                      <div style={{ background: '#131722', padding: '12px', borderRadius: '6px' }}>
                        <div style={{ color: '#868993', fontSize: '11px', marginBottom: '4px' }}>Stop Loss</div>
                        <div style={{ color: '#f23645', fontSize: '14px', fontWeight: '600' }}>{signal.sl}</div>
                      </div>
                      <div style={{ background: '#131722', padding: '12px', borderRadius: '6px' }}>
                        <div style={{ color: '#868993', fontSize: '11px', marginBottom: '4px' }}>Target 1</div>
                        <div style={{ color: '#4caf50', fontSize: '14px', fontWeight: '600' }}>{signal.tp1}</div>
                      </div>
                      <div style={{ background: '#131722', padding: '12px', borderRadius: '6px' }}>
                        <div style={{ color: '#868993', fontSize: '11px', marginBottom: '4px' }}>Target 2</div>
                        <div style={{ color: '#4caf50', fontSize: '14px', fontWeight: '600' }}>{signal.tp2}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div>
                          <span style={{ color: '#868993', fontSize: '11px' }}>Confidence: </span>
                          <span style={{ color: '#4caf50', fontSize: '13px', fontWeight: '600' }}>{signal.confidence}</span>
                        </div>
                        <div>
                          <span style={{ color: '#868993', fontSize: '11px' }}>Pips: </span>
                          <span style={{ color: '#4caf50', fontSize: '13px', fontWeight: '600' }}>{signal.pips}</span>
                        </div>
                      </div>
                      <button style={{
                        background: '#2962ff',
                        border: 'none',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}>
                        Copy Signal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div>
            <h2 style={{ color: '#d1d4dc', fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>
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
                  background: '#1e222d',
                  border: '1px solid #2a2e39',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h3 style={{ color: '#d1d4dc', fontSize: '18px', marginBottom: '10px' }}>{course.title}</h3>
                  <p style={{ color: '#868993', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                    {course.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <span style={{
                      background: course.level === 'Beginner' ? 'rgba(76, 175, 80, 0.2)' :
                                 course.level === 'Intermediate' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(242, 54, 69, 0.2)',
                      color: course.level === 'Beginner' ? '#4caf50' :
                             course.level === 'Intermediate' ? '#ffc107' : '#f23645',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {course.level}
                    </span>
                    <span style={{ color: '#868993', fontSize: '12px' }}>
                      {course.duration} • {course.lessons} lessons
                    </span>
                  </div>
                  <button style={{
                    background: '#2962ff',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'ai-analysis' && (
          <div>
            <h2 style={{ color: '#d1d4dc', fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>
              🤖 AI-Powered Market Analysis
            </h2>

            <div style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#1e222d',
                border: '1px solid #2a2e39',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '20px' }}>🧠</span>
                  <h3 style={{ color: '#d1d4dc', fontSize: '18px', margin: '0' }}>Today's AI Market Insights</h3>
                  <span style={{
                    background: 'rgba(76, 175, 80, 0.2)',
                    color: '#4caf50',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    Updated 6:00 AM EST
                  </span>
                </div>
                <p style={{ color: '#868993', fontSize: '14px', lineHeight: '1.6' }}>
                  Our GPT-5 Nano AI has analyzed 847 news articles, 23 economic indicators, and 156 technical patterns this morning.
                  Based on this analysis, we've identified 5 high-probability trading opportunities across multiple asset classes.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {[
                  {
                    event: 'US Non-Farm Payrolls Release',
                    time: '8:30 AM EST',
                    impact: 'High',
                    analysis: 'Our AI predicts a higher-than-expected reading of 240K vs forecast 220K based on recent ADP data and unemployment claims. This could strengthen USD across major pairs. Key levels to watch: EUR/USD 1.1100 support, GBP/USD 1.2850 resistance. Recommended position: Short EUR/USD with tight stops above 1.1140.',
                    confidence: '87%',
                    assets: ['EUR/USD', 'GBP/USD', 'USD/JPY']
                  },
                  {
                    event: 'Fed Chair Powell Speech',
                    time: '2:00 PM EST',
                    impact: 'High',
                    analysis: 'Powell likely to maintain hawkish tone regarding inflation concerns. Our sentiment analysis of recent Fed communications suggests 75% probability of dovish shift signals. Gold may see volatility around $2640 level. Treasury yields could spike above 4.5% resistance. Recommended: Long XAU/USD on any dip below $2635.',
                    confidence: '82%',
                    assets: ['XAU/USD', 'US10Y', 'DXY']
                  },
                  {
                    event: 'Bitcoin ETF Approval Update',
                    time: '4:00 PM EST',
                    impact: 'Medium',
                    analysis: 'SEC decision timeline suggests positive momentum for spot Bitcoin ETF approvals. Technical analysis shows BTC consolidating above $43,000 support with potential breakout to $45,000. Options flow indicates large institutional positioning for upside. Recommended: Long BTC/USD targeting $44,500 resistance level.',
                    confidence: '79%',
                    assets: ['BTC/USD', 'ETH/USD', 'Crypto Sector']
                  }
                ].map((insight, index) => (
                  <div key={index} style={{
                    background: '#1e222d',
                    border: '1px solid #2a2e39',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <div>
                        <h4 style={{ color: '#d1d4dc', fontSize: '16px', margin: '0 0 5px 0' }}>{insight.event}</h4>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ color: '#868993', fontSize: '13px' }}>{insight.time}</span>
                          <span style={{
                            background: insight.impact === 'High' ? 'rgba(242, 54, 69, 0.2)' : 'rgba(255, 193, 7, 0.2)',
                            color: insight.impact === 'High' ? '#f23645' : '#ffc107',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '11px'
                          }}>
                            {insight.impact} Impact
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#4caf50', fontSize: '14px', fontWeight: '600' }}>
                          AI Confidence: {insight.confidence}
                        </div>
                        <div style={{ color: '#868993', fontSize: '12px' }}>
                          Affecting: {insight.assets.join(', ')}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: '#d1d4dc', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
                      {insight.analysis}
                    </p>
                    <button style={{
                      background: '#2962ff',
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Generate Signal
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'pricing' && (
          <div>
            <h2 style={{ color: '#d1d4dc', fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>
              💎 Premium Subscription Plans
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                {
                  name: 'Basic',
                  price: '$49',
                  period: '/month',
                  features: [
                    '5 Premium Signals Daily',
                    'Basic Market Analysis',
                    'Email Notifications',
                    'Mobile App Access',
                    'Community Chat'
                  ],
                  popular: false
                },
                {
                  name: 'Professional',
                  price: '$99',
                  period: '/month',
                  features: [
                    '15 Premium Signals Daily',
                    'Advanced AI Analysis',
                    'Real-time Alerts',
                    'Trading Education',
                    'Priority Support',
                    'Risk Management Tools'
                  ],
                  popular: true
                },
                {
                  name: 'Elite',
                  price: '$199',
                  period: '/month',
                  features: [
                    'Unlimited Premium Signals',
                    'Personal Trading Coach',
                    'Custom Strategy Development',
                    'VIP Community Access',
                    '1-on-1 Monthly Calls',
                    'Portfolio Management'
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <div key={index} style={{
                  background: '#1e222d',
                  border: plan.popular ? '2px solid #2962ff' : '1px solid #2a2e39',
                  borderRadius: '8px',
                  padding: '25px',
                  position: 'relative'
                }}>
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#2962ff',
                      color: 'white',
                      padding: '4px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ color: '#d1d4dc', fontSize: '20px', margin: '0 0 10px 0' }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '5px' }}>
                      <span style={{ color: '#2962ff', fontSize: '32px', fontWeight: 'bold' }}>{plan.price}</span>
                      <span style={{ color: '#868993', fontSize: '14px' }}>{plan.period}</span>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 25px 0' }}>
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} style={{
                        color: '#d1d4dc',
                        fontSize: '14px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ color: '#4caf50' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button style={{
                    background: plan.popular ? '#2962ff' : 'transparent',
                    border: plan.popular ? 'none' : '1px solid #2962ff',
                    color: plan.popular ? 'white' : '#2962ff',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: '600'
                  }}>
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              background: '#1e222d',
              border: '1px solid #2a2e39',
              borderRadius: '8px',
              padding: '25px',
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#d1d4dc', fontSize: '20px', marginBottom: '15px' }}>
                🤝 Partner Broker Program
              </h3>
              <p style={{ color: '#868993', fontSize: '14px', marginBottom: '20px' }}>
                Sign up with one of our trusted broker partners and get premium signals absolutely FREE for 3 months!
              </p>
              <button style={{
                background: '#4caf50',
                border: 'none',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                View Partner Brokers
              </button>
            </div>
          </div>
        )}

        {/* Partner Brokers Tab */}
        {activeTab === 'brokers' && (
          <div>
            <h2 style={{ color: '#d1d4dc', fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>
              🤝 Trusted Broker Partners
            </h2>

            <div style={{
              background: '#1e222d',
              border: '1px solid #2a2e39',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#4caf50', fontSize: '18px', marginBottom: '10px' }}>
                🎁 Special Offer: FREE 3-Month Premium Access
              </h3>
              <p style={{ color: '#d1d4dc', fontSize: '14px' }}>
                Open a trading account with any of our partner brokers and receive 3 months of premium signals absolutely free!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {[
                {
                  name: 'IC Markets',
                  logo: '🏢',
                  rating: '4.8/5',
                  minDeposit: '$200',
                  spreads: 'From 0.0 pips',
                  leverage: '1:500',
                  regulation: 'ASIC, CySEC',
                  features: ['ECN Trading', 'MT4/MT5', 'Raw Spreads', 'Fast Execution']
                },
                {
                  name: 'Pepperstone',
                  logo: '🌶️',
                  rating: '4.7/5',
                  minDeposit: '$200',
                  spreads: 'From 0.0 pips',
                  leverage: '1:400',
                  regulation: 'ASIC, FCA',
                  features: ['Smart Trader Tools', 'TradingView', 'cTrader', 'Social Trading']
                },
                {
                  name: 'XM Global',
                  logo: '🌍',
                  rating: '4.6/5',
                  minDeposit: '$100',
                  spreads: 'From 0.6 pips',
                  leverage: '1:888',
                  regulation: 'CySEC, ASIC',
                  features: ['100+ Instruments', 'Education Hub', 'VPS Hosting', '24/5 Support']
                }
              ].map((broker, index) => (
                <div key={index} style={{
                  background: '#1e222d',
                  border: '1px solid #2a2e39',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '24px' }}>{broker.logo}</span>
                    <div>
                      <h3 style={{ color: '#d1d4dc', fontSize: '18px', margin: '0' }}>{broker.name}</h3>
                      <div style={{ color: '#4caf50', fontSize: '13px' }}>⭐ {broker.rating}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <span style={{ color: '#868993', fontSize: '12px' }}>Min Deposit:</span>
                        <div style={{ color: '#d1d4dc', fontSize: '14px', fontWeight: '600' }}>{broker.minDeposit}</div>
                      </div>
                      <div>
                        <span style={{ color: '#868993', fontSize: '12px' }}>Spreads:</span>
                        <div style={{ color: '#d1d4dc', fontSize: '14px', fontWeight: '600' }}>{broker.spreads}</div>
                      </div>
                      <div>
                        <span style={{ color: '#868993', fontSize: '12px' }}>Leverage:</span>
                        <div style={{ color: '#d1d4dc', fontSize: '14px', fontWeight: '600' }}>{broker.leverage}</div>
                      </div>
                      <div>
                        <span style={{ color: '#868993', fontSize: '12px' }}>Regulation:</span>
                        <div style={{ color: '#d1d4dc', fontSize: '14px', fontWeight: '600' }}>{broker.regulation}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ color: '#868993', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Key Features:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {broker.features.map((feature, fIndex) => (
                        <span key={fIndex} style={{
                          background: '#131722',
                          color: '#2962ff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px'
                        }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button style={{
                    background: '#4caf50',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: '600'
                  }}>
                    Open Account & Get Free Signals
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#1e222d',
            border: '1px solid #2a2e39',
            borderRadius: '8px',
            padding: '30px',
            width: '400px',
            maxWidth: '90vw'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#d1d4dc', fontSize: '20px', margin: '0' }}>
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#868993',
                  fontSize: '20px',
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
                  background: '#131722',
                  border: '1px solid #2a2e39',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#d1d4dc',
                  fontSize: '14px'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  background: '#131722',
                  border: '1px solid #2a2e39',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#d1d4dc',
                  fontSize: '14px'
                }}
              />
              {authMode === 'register' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  style={{
                    background: '#131722',
                    border: '1px solid #2a2e39',
                    borderRadius: '4px',
                    padding: '12px',
                    color: '#d1d4dc',
                    fontSize: '14px'
                  }}
                />
              )}
              <button
                type="submit"
                style={{
                  background: '#2962ff',
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
              <span style={{ color: '#868993', fontSize: '13px' }}>
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2962ff',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
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