export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        padding: '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00d4ff' }}>
            PK Signal Pulse
          </div>
          <div style={{ display: 'flex', gap: '30px', fontSize: '0.95rem' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer' }}>Signals</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer' }}>Analysis</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer' }}>Pricing</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer' }}>Contact</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px 60px' }}>
        <div style={{
          background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '4.5rem',
          fontWeight: '800',
          margin: '0 0 20px 0',
          letterSpacing: '-2px'
        }}>
          Elite Trading Signals
        </div>
        <p style={{
          fontSize: '1.4rem',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: '0 0 30px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Precision-engineered trading insights powered by advanced market analysis and AI-driven predictions
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            color: 'white',
            border: 'none',
            padding: '18px 40px',
            fontSize: '1.1rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            Start Trading Now
          </button>
          <button style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            padding: '16px 40px',
            fontSize: '1.1rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            backdropFilter: 'blur(10px)'
          }}>
            View Performance
          </button>
        </div>
      </div>

      {/* Live Signals Section */}
      <div style={{ padding: '0 20px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              background: 'linear-gradient(45deg, #ffffff, #b3b3b3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Live Premium Signals
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
              margin: '0 auto 20px',
              borderRadius: '2px'
            }}></div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
              Real-time market opportunities with institutional-grade analysis
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {/* XAUUSD Signal */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #22c55e, #16a34a)'
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  color: '#22c55e',
                  fontSize: '1.8rem',
                  margin: '0',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  XAUUSD <span style={{ fontSize: '1.2rem' }}>📈</span>
                </h3>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  BUY SIGNAL
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Entry Price</div>
                  <div style={{ color: 'white', fontSize: '1.3rem', fontWeight: '700' }}>2640.50</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Stop Loss</div>
                  <div style={{ color: '#ef4444', fontSize: '1.3rem', fontWeight: '700' }}>2630.00</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Target 1</div>
                  <div style={{ color: '#22c55e', fontSize: '1.3rem', fontWeight: '700' }}>2650.00</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Target 2</div>
                  <div style={{ color: '#22c55e', fontSize: '1.3rem', fontWeight: '700' }}>2660.00</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>Confidence:</span>
                  <span style={{ color: '#22c55e', fontWeight: '700', fontSize: '1.1rem' }}>85%</span>
                  <span style={{ color: '#ffd700' }}>⭐⭐⭐⭐⭐</span>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ACTIVE
                </div>
              </div>
            </div>

            {/* EURUSD Signal */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #ef4444, #dc2626)'
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  color: '#ef4444',
                  fontSize: '1.8rem',
                  margin: '0',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  EURUSD <span style={{ fontSize: '1.2rem' }}>📉</span>
                </h3>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  SELL SIGNAL
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Entry Price</div>
                  <div style={{ color: 'white', fontSize: '1.3rem', fontWeight: '700' }}>1.1120</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Stop Loss</div>
                  <div style={{ color: '#ef4444', fontSize: '1.3rem', fontWeight: '700' }}>1.1150</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Target 1</div>
                  <div style={{ color: '#22c55e', fontSize: '1.3rem', fontWeight: '700' }}>1.1090</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '5px' }}>Target 2</div>
                  <div style={{ color: '#22c55e', fontSize: '1.3rem', fontWeight: '700' }}>1.1060</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>Confidence:</span>
                  <span style={{ color: '#22c55e', fontWeight: '700', fontSize: '1.1rem' }}>78%</span>
                  <span style={{ color: '#ffd700' }}>⭐⭐⭐⭐</span>
                </div>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
        backdropFilter: 'blur(20px)',
        margin: '0 20px 60px',
        borderRadius: '24px',
        padding: '60px 40px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              background: 'linear-gradient(45deg, #ffffff, #b3b3b3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Why Elite Traders Choose Us
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🎯', title: 'Precision Signals', desc: 'AI-powered analysis delivering 85%+ accuracy with real-time market insights' },
              { icon: '🛡️', title: 'Risk Management', desc: 'Every signal includes calculated stop-loss and multiple profit targets' },
              { icon: '⚡', title: 'Real-Time Alerts', desc: 'Instant notifications via Telegram, Discord, and mobile push notifications' },
              { icon: '📊', title: 'Advanced Analytics', desc: 'Comprehensive market analysis with technical and fundamental insights' },
              { icon: '🏆', title: 'Proven Track Record', desc: 'Consistent profitability with verified performance history' },
              { icon: '🔄', title: '24/7 Support', desc: 'Round-the-clock expert assistance and market guidance' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '60px 20px 80px' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 20px 0',
          color: 'white'
        }}>
          Ready to Transform Your Trading?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0 0 40px 0',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Join thousands of successful traders already profiting from our premium signals
        </p>
        <button style={{
          background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
          color: 'white',
          border: 'none',
          padding: '20px 50px',
          fontSize: '1.2rem',
          borderRadius: '15px',
          cursor: 'pointer',
          fontWeight: '700',
          boxShadow: '0 15px 35px rgba(0, 212, 255, 0.4)',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease'
        }}>
          🚀 Start Premium Trading Now
        </button>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        padding: '40px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem', margin: '0' }}>
          © 2025 PK Signal Pulse - Elite Trading Signals Platform
        </p>
        <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem', margin: '10px 0 0 0' }}>
          Professional trading involves risk. Past performance does not guarantee future results.
        </p>
      </footer>
    </div>
  )
}