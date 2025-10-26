export default function EducationPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            🎓 Trading Education
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)' }}>
            Learn to trade like a professional with our comprehensive educational resources
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              📚 Learning Path for Traders
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '30px' }}>
              Whether you're a complete beginner or an experienced trader looking to refine your skills, our structured learning path will guide you from fundamentals to advanced strategies.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div style={{ background: '#e3f2fd', padding: '30px', borderRadius: '15px', borderTop: '5px solid #1976d2' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🌱</div>
                <h3 style={{ fontSize: '1.5em', color: '#1976d2', marginBottom: '15px' }}>Level 1: Beginner</h3>
                <ul style={{ fontSize: '1.05em', lineHeight: '1.8', color: '#333', marginLeft: '20px' }}>
                  <li>Introduction to Financial Markets</li>
                  <li>Basic Trading Terminology</li>
                  <li>How to Read Price Charts</li>
                  <li>Understanding Risk Management</li>
                  <li>Opening Your First Trading Account</li>
                  <li>Paper Trading & Demo Accounts</li>
                </ul>
              </div>

              <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '15px', borderTop: '5px solid #388e3c' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🌿</div>
                <h3 style={{ fontSize: '1.5em', color: '#388e3c', marginBottom: '15px' }}>Level 2: Intermediate</h3>
                <ul style={{ fontSize: '1.05em', lineHeight: '1.8', color: '#333', marginLeft: '20px' }}>
                  <li>Technical Analysis Fundamentals</li>
                  <li>Support & Resistance Levels</li>
                  <li>Chart Patterns Recognition</li>
                  <li>Trading Indicators (RSI, MACD, MA)</li>
                  <li>Candlestick Patterns</li>
                  <li>Position Sizing & Risk/Reward</li>
                </ul>
              </div>

              <div style={{ background: '#fff3e0', padding: '30px', borderRadius: '15px', borderTop: '5px solid #f57c00' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🌳</div>
                <h3 style={{ fontSize: '1.5em', color: '#f57c00', marginBottom: '15px' }}>Level 3: Advanced</h3>
                <ul style={{ fontSize: '1.05em', lineHeight: '1.8', color: '#333', marginLeft: '20px' }}>
                  <li>Advanced Chart Patterns</li>
                  <li>Multiple Timeframe Analysis</li>
                  <li>Fibonacci Retracements</li>
                  <li>Elliott Wave Theory</li>
                  <li>Options Trading Strategies</li>
                  <li>Algorithmic Trading Basics</li>
                </ul>
              </div>

              <div style={{ background: '#f3e5f5', padding: '30px', borderRadius: '15px', borderTop: '5px solid #7b1fa2' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🏆</div>
                <h3 style={{ fontSize: '1.5em', color: '#7b1fa2', marginBottom: '15px' }}>Level 4: Professional</h3>
                <ul style={{ fontSize: '1.05em', lineHeight: '1.8', color: '#333', marginLeft: '20px' }}>
                  <li>Market Microstructure</li>
                  <li>Advanced Risk Management</li>
                  <li>Trading Psychology Mastery</li>
                  <li>Quantitative Analysis</li>
                  <li>Building Trading Systems</li>
                  <li>Portfolio Management</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              🎯 Trading Strategies You'll Learn
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>📈 Trend Following</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Learn to identify and trade with the major market trend using moving averages, trendlines, and momentum indicators.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>⚡ Breakout Trading</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Master the art of trading breakouts from consolidation patterns, channels, and key support/resistance levels.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>🔄 Range Trading</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Trade sideways markets effectively by buying at support and selling at resistance in range-bound conditions.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>⏰ Day Trading</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Learn intraday strategies, scalping techniques, and how to capitalize on short-term price movements.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>📅 Swing Trading</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Hold positions for days or weeks to capture larger price swings while managing overnight risk.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>📰 News Trading</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Trade economic releases, earnings reports, and breaking news events with proper risk management.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              🧠 Trading Psychology
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
              90% of trading success is mental. Learn to master your emotions and develop the psychological edge needed for consistent profitability:
            </p>

            <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '40px', borderRadius: '15px', color: 'white' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5em', marginBottom: '15px' }}>😤 Emotional Control</h3>
                  <p style={{ opacity: 0.95, lineHeight: '1.6' }}>
                    Learn to manage fear, greed, and revenge trading that destroy most traders' accounts.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5em', marginBottom: '15px' }}>🎯 Discipline & Patience</h3>
                  <p style={{ opacity: 0.95, lineHeight: '1.6' }}>
                    Develop the discipline to follow your trading plan and patience to wait for high-probability setups.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5em', marginBottom: '15px' }}>💪 Confidence Building</h3>
                  <p style={{ opacity: 0.95, lineHeight: '1.6' }}>
                    Build unshakeable confidence through proper preparation, backtesting, and consistent execution.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5em', marginBottom: '15px' }}>📊 Risk Acceptance</h3>
                  <p style={{ opacity: 0.95, lineHeight: '1.6' }}>
                    Accept that losses are part of trading and focus on long-term statistical edge.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              📖 Educational Resources
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '30px' }}>
              <div style={{ background: '#f0f7ff', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #0052cc' }}>
                <h3 style={{ fontSize: '1.4em', color: '#0052cc', marginBottom: '15px' }}>📚 Video Courses</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                  100+ hours of professional video tutorials covering everything from basics to advanced strategies.
                </p>
                <ul style={{ fontSize: '1em', lineHeight: '1.6', color: '#555', marginLeft: '20px' }}>
                  <li>HD video quality</li>
                  <li>Downloadable resources</li>
                  <li>Quizzes & assessments</li>
                  <li>Lifetime access</li>
                </ul>
              </div>

              <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #00c853' }}>
                <h3 style={{ fontSize: '1.4em', color: '#00c853', marginBottom: '15px' }}>📝 Trading Guides</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                  Comprehensive written guides, eBooks, and PDF resources you can reference anytime.
                </p>
                <ul style={{ fontSize: '1em', lineHeight: '1.6', color: '#555', marginLeft: '20px' }}>
                  <li>Step-by-step tutorials</li>
                  <li>Strategy blueprints</li>
                  <li>Cheat sheets & checklists</li>
                  <li>Printable workbooks</li>
                </ul>
              </div>

              <div style={{ background: '#fff3e0', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #ff9800' }}>
                <h3 style={{ fontSize: '1.4em', color: '#ff9800', marginBottom: '15px' }}>🎥 Live Webinars</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                  Weekly live trading sessions where you can watch professionals trade and ask questions in real-time.
                </p>
                <ul style={{ fontSize: '1em', lineHeight: '1.6', color: '#555', marginLeft: '20px' }}>
                  <li>Live market analysis</li>
                  <li>Q&A sessions</li>
                  <li>Trade reviews</li>
                  <li>Recorded replays</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ background: '#fff3cd', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #ffc107', marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.5em', color: '#856404', marginBottom: '15px' }}>💡 Important: Practice Before Risking Real Money</h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#856404' }}>
              We strongly recommend all new traders spend at least 3-6 months practicing on a demo account before trading with real money. Most brokers, including our partner Exness, offer free demo accounts with virtual money where you can practice everything you learn without any financial risk.
            </p>
          </section>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a
              href="/"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                fontSize: '1.2em',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s',
                marginRight: '20px'
              }}
            >
              🎓 Start Learning Now
            </a>
            <a
              href="https://one.exnesstrack.net/a/scknhe9tsg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #00c853 0%, #00a344 100%)',
                color: 'white',
                padding: '18px 40px',
                borderRadius: '50px',
                fontSize: '1.2em',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(0, 200, 83, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              🚀 Open Demo Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}