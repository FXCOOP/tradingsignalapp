'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample data for Asian Markets
  const asianMarkets = [
    { name: 'USD/PKR', price: '278.45', change: '+0.35', changePercent: '+0.13%', trend: 'up' },
    { name: 'KSE-100', price: '91,247', change: '+125', changePercent: '+0.14%', trend: 'up' },
    { name: 'Nikkei 225', price: '40,875', change: '+145', changePercent: '+0.36%', trend: 'up' },
    { name: 'Hang Seng', price: '19,250', change: '-78', changePercent: '-0.40%', trend: 'down' }
  ]

  const breakingNews = [
    {
      id: 1,
      title: 'Pakistan Central Bank Keeps Key Rate Unchanged at 15%',
      summary: 'State Bank of Pakistan maintains policy rate amid inflation concerns',
      category: 'Monetary Policy',
      time: '2 hours ago',
      impact: 'High'
    },
    {
      id: 2,
      title: 'PSX Reaches New Monthly High Amid Foreign Investment Inflows',
      summary: 'KSE-100 index gains 1,200 points in January on strong foreign buying',
      category: 'Stock Market',
      time: '4 hours ago',
      impact: 'High'
    }
  ]

  const economicEvents = [
    { time: '09:30', event: 'Pakistan CPI (YoY)', importance: 'High', forecast: '28.1%', previous: '28.3%' },
    { time: '11:00', event: 'China GDP (QoQ)', importance: 'High', forecast: '1.2%', previous: '0.9%' },
    { time: '14:30', event: 'India Trade Balance', importance: 'Medium', forecast: '-$22.1B', previous: '-$21.8B' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Asian Markets Mastery',
      instructor: 'Dr. Ahmad Khan',
      level: 'Intermediate',
      duration: '8 weeks',
      rating: 4.8,
      price: '$299'
    },
    {
      id: 2,
      title: 'Technical Analysis Fundamentals',
      instructor: 'Sarah Chen',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.9,
      price: '$199'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#0f172a',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#1e293b' }}>
              🌟 PK Signal Pulse
            </h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Premium Trading Signals & Market Analysis
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🔴 LIVE: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { key: 'dashboard', label: 'Market Overview', icon: '📈' },
            { key: 'asian-markets', label: 'Asian Markets', icon: '🌏' },
            { key: 'news', label: 'Market News', icon: '📰' },
            { key: 'economic-calendar', label: 'Economic Calendar', icon: '📅' },
            { key: 'education', label: 'Education', icon: '🎓' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? '#3b82f6' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#64748b',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
              📈 Market Overview
            </h2>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {asianMarkets.map((market, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                    {market.name}
                  </h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {market.price}
                  </div>
                  <div style={{
                    color: market.trend === 'up' ? '#10b981' : '#ef4444',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {market.change} ({market.changePercent})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Asian Markets Tab */}
        {activeTab === 'asian-markets' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
              🌏 Asian Markets
            </h2>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                📊 Live Market Data
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {asianMarkets.map((market, index) => (
                  <div key={index} style={{
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderRadius: '0.75rem',
                    borderLeft: `4px solid ${market.trend === 'up' ? '#10b981' : '#ef4444'}`
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.75rem 0' }}>
                      {market.name}
                    </h4>
                    <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                      {market.price}
                    </div>
                    <div style={{
                      color: market.trend === 'up' ? '#10b981' : '#ef4444',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      {market.change} ({market.changePercent})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
              📰 Market News
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {breakingNews.map((news) => (
                <article key={news.id} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  borderLeft: `4px solid ${news.impact === 'High' ? '#ef4444' : '#f59e0b'}`
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: news.impact === 'High' ? '#ef444415' : '#f59e0b15',
                      color: news.impact === 'High' ? '#ef4444' : '#f59e0b',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {news.impact}
                    </span>
                    <span style={{
                      background: '#e2e8f0',
                      color: '#64748b',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {news.category}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    lineHeight: 1.4
                  }}>
                    {news.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    marginBottom: '1rem',
                    lineHeight: 1.6
                  }}>
                    {news.summary}
                  </p>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {news.time}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Economic Calendar Tab */}
        {activeTab === 'economic-calendar' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
              📅 Economic Calendar
            </h2>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                🔥 Today's Events
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {economicEvents.map((event, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 2fr 100px 100px 100px',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderRadius: '0.75rem',
                    borderLeft: `4px solid ${event.importance === 'High' ? '#ef4444' : '#f59e0b'}`
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>
                      {event.time}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                        {event.event}
                      </h4>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Forecast
                      </div>
                      <div style={{ fontWeight: '600' }}>
                        {event.forecast}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Previous
                      </div>
                      <div style={{ color: '#64748b' }}>
                        {event.previous}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        background: event.importance === 'High' ? '#ef444415' : '#f59e0b15',
                        color: event.importance === 'High' ? '#ef4444' : '#f59e0b',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {event.importance}
                      </div>
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
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
              🎓 Trading Education
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {courses.map((course) => (
                <div key={course.id} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                  }}>
                    🌏
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    marginBottom: '1rem'
                  }}>
                    by {course.instructor}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    <div>⏱️ {course.duration}</div>
                    <div>📊 {course.level}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
                      <span style={{ fontWeight: '600' }}>{course.rating}</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6', marginLeft: '0.5rem' }}>
                        {course.price}
                      </span>
                    </div>
                    <button style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '3rem 2rem 2rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              PK Signal Pulse
            </h4>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
              Premium trading signals and market analysis for Pakistani and Asian markets.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Quick Links
            </h5>
            <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span>Market Overview</span>
              <span>Trading Signals</span>
              <span>Economic Calendar</span>
              <span>Education</span>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Contact
            </h5>
            <div style={{ color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span>📧 support@pksignalpulse.com</span>
              <span>📱 +92-300-1234567</span>
              <span>🌐 www.pksignalpulse.com</span>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #475569',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <p>© 2025 PK Signal Pulse. All rights reserved. Trading involves substantial risk.</p>
        </div>
      </footer>
    </div>
  )
}