export default function AnalysisPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            📊 Market Analysis
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)' }}>
            Professional technical and fundamental analysis for global markets
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              📈 What Is Market Analysis?
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Market analysis is the systematic study of market conditions, price movements, and economic factors to identify trading opportunities and make informed investment decisions. At TradeFlow, we provide two types of analysis:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginTop: '30px' }}>
              <div style={{ background: '#f0f7ff', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #0052cc' }}>
                <h3 style={{ fontSize: '1.5em', color: '#0052cc', marginBottom: '15px' }}>📊 Technical Analysis</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                  Studies price charts, patterns, indicators, and volume to predict future price movements.
                </p>
                <ul style={{ fontSize: '1em', lineHeight: '1.6', color: '#555', marginLeft: '20px' }}>
                  <li>Chart patterns (Head & Shoulders, Double Tops/Bottoms)</li>
                  <li>Technical indicators (RSI, MACD, Moving Averages)</li>
                  <li>Support and resistance levels</li>
                  <li>Trend analysis and breakouts</li>
                  <li>Volume analysis</li>
                </ul>
              </div>

              <div style={{ background: '#e8f5e9', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #00c853' }}>
                <h3 style={{ fontSize: '1.5em', color: '#00c853', marginBottom: '15px' }}>📰 Fundamental Analysis</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
                  Evaluates economic factors, company financials, and global events affecting asset prices.
                </p>
                <ul style={{ fontSize: '1em', lineHeight: '1.6', color: '#555', marginLeft: '20px' }}>
                  <li>Earnings reports and financial statements</li>
                  <li>Economic indicators (GDP, inflation, employment)</li>
                  <li>Central bank policies and interest rates</li>
                  <li>Geopolitical events and news</li>
                  <li>Market sentiment and investor psychology</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              🎯 Our Analysis Services
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '30px' }}>
              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>📊</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>Daily Market Reports</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Comprehensive daily reports covering major markets, key events, and trading opportunities. Updated every morning before market open.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>⚡</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>Real-Time Alerts</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Instant notifications for breaking news, major price movements, and significant market events that impact trading.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>📈</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>Technical Setups</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Detailed technical analysis identifying chart patterns, key levels, and potential breakout opportunities.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🌍</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>Economic Calendar</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Track upcoming economic releases, central bank meetings, and corporate earnings with impact analysis.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>💹</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>Sector Analysis</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Weekly deep dives into specific market sectors (tech, energy, finance) identifying trends and opportunities.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🎯</div>
                <h3 style={{ fontSize: '1.4em', color: '#667eea', marginBottom: '15px' }}>AI Sentiment Analysis</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Machine learning-powered analysis of news sentiment, social media trends, and market psychology.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              🔍 Markets We Analyze
            </h2>
            <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '40px', borderRadius: '15px', color: 'white', marginTop: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '1.8em', marginBottom: '15px' }}>📈 Global Stock Markets</h3>
                  <ul style={{ fontSize: '1.05em', lineHeight: '1.8', opacity: 0.95 }}>
                    <li>US Markets (S&P 500, NASDAQ, Dow Jones)</li>
                    <li>European Markets (FTSE, DAX, CAC 40)</li>
                    <li>Asian Markets (Nikkei, Hang Seng)</li>
                    <li>Individual Stocks (Apple, Tesla, Amazon)</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.8em', marginBottom: '15px' }}>💱 Forex Markets</h3>
                  <ul style={{ fontSize: '1.05em', lineHeight: '1.8', opacity: 0.95 }}>
                    <li>Major Pairs (EUR/USD, GBP/USD, USD/JPY)</li>
                    <li>Minor Pairs (EUR/GBP, AUD/JPY)</li>
                    <li>Exotic Pairs (USD/TRY, EUR/ZAR)</li>
                    <li>Central Bank Policies (Fed, ECB, BoJ)</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.8em', marginBottom: '15px' }}>🪙 Commodities</h3>
                  <ul style={{ fontSize: '1.05em', lineHeight: '1.8', opacity: 0.95 }}>
                    <li>Precious Metals (Gold, Silver, Platinum)</li>
                    <li>Energy (Crude Oil, Natural Gas)</li>
                    <li>Agricultural (Wheat, Corn, Soybeans)</li>
                    <li>Industrial Metals (Copper, Aluminum)</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.8em', marginBottom: '15px' }}>₿ Cryptocurrencies</h3>
                  <ul style={{ fontSize: '1.05em', lineHeight: '1.8', opacity: 0.95 }}>
                    <li>Major Coins (Bitcoin, Ethereum)</li>
                    <li>Altcoins (Cardano, Solana, Ripple)</li>
                    <li>DeFi Tokens and NFT Markets</li>
                    <li>Blockchain Technology Trends</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              🤖 AI-Powered Analysis Tools
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
              Our advanced AI system combines multiple data sources and analytical techniques:
            </p>

            <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
              <ol style={{ fontSize: '1.1em', lineHeight: '2', color: '#333', marginLeft: '20px' }}>
                <li><strong>Data Aggregation:</strong> Collects real-time data from 50+ exchanges, news sources, and economic databases</li>
                <li><strong>Pattern Recognition:</strong> Identifies 100+ chart patterns and technical setups with 85%+ accuracy</li>
                <li><strong>Sentiment Analysis:</strong> Processes 10,000+ news articles daily to gauge market sentiment</li>
                <li><strong>Correlation Analysis:</strong> Identifies relationships between different assets and market factors</li>
                <li><strong>Predictive Modeling:</strong> Uses machine learning to forecast potential price movements</li>
                <li><strong>Risk Assessment:</strong> Evaluates market volatility and risk factors in real-time</li>
              </ol>
            </div>
          </section>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              📚 How to Use Our Analysis
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '30px' }}>
              <div style={{ background: '#e3f2fd', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#1976d2', marginBottom: '15px' }}>1️⃣ Start Your Day</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                  Read the daily market report to understand major trends, key levels, and today's trading opportunities before market open.
                </p>
              </div>

              <div style={{ background: '#e8f5e9', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#388e3c', marginBottom: '15px' }}>2️⃣ Monitor Alerts</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                  Enable real-time notifications to receive instant alerts for breaking news and significant market movements.
                </p>
              </div>

              <div style={{ background: '#fff3e0', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#f57c00', marginBottom: '15px' }}>3️⃣ Check Technical Setups</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                  Review technical analysis for your favorite markets to identify support/resistance levels and potential breakouts.
                </p>
              </div>

              <div style={{ background: '#f3e5f5', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1.4em', color: '#7b1fa2', marginBottom: '15px' }}>4️⃣ Combine with Signals</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                  Use market analysis alongside our trading signals for better trade timing and higher probability setups.
                </p>
              </div>
            </div>
          </section>

          <section style={{ background: '#d1ecf1', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #17a2b8', marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.5em', color: '#0c5460', marginBottom: '15px' }}>💡 Pro Trading Tip</h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#0c5460' }}>
              The most successful traders combine multiple analysis types. Use our technical analysis to identify entry/exit points, fundamental analysis to understand the "why" behind price movements, and sentiment analysis to gauge market psychology. This multi-layered approach significantly improves trading accuracy.
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
              📊 View Live Analysis
            </a>
            <a
              href="/signals"
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
              ⚡ Get Trading Signals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}