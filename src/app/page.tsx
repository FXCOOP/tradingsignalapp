export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 20px 0', fontWeight: 'bold' }}>
          🚀 PK Signal Pulse
        </h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9, margin: '0 0 40px 0' }}>
          Professional Trading Signals Platform
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        borderRadius: '10px',
        padding: '30px',
        margin: '20px auto',
        maxWidth: '800px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px', color: '#333' }}>
          Today's Premium Signals
        </h2>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            padding: '20px',
            margin: '15px',
            display: 'inline-block',
            width: '300px',
            verticalAlign: 'top',
            borderLeft: '5px solid #22c55e'
          }}>
            <h3 style={{ color: '#22c55e', fontSize: '1.8rem', margin: '0 0 15px 0' }}>
              XAUUSD - BUY 📈
            </h3>
            <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
              <p><strong>Entry:</strong> 2640.50</p>
              <p><strong>Stop Loss:</strong> 2630.00</p>
              <p><strong>Take Profit 1:</strong> 2650.00</p>
              <p><strong>Take Profit 2:</strong> 2660.00</p>
              <p><strong>Confidence:</strong> 85% ⭐⭐⭐⭐⭐</p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            padding: '20px',
            margin: '15px',
            display: 'inline-block',
            width: '300px',
            verticalAlign: 'top',
            borderLeft: '5px solid #ef4444'
          }}>
            <h3 style={{ color: '#ef4444', fontSize: '1.8rem', margin: '0 0 15px 0' }}>
              EURUSD - SELL 📉
            </h3>
            <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
              <p><strong>Entry:</strong> 1.1120</p>
              <p><strong>Stop Loss:</strong> 1.1150</p>
              <p><strong>Take Profit 1:</strong> 1.1090</p>
              <p><strong>Take Profit 2:</strong> 1.1060</p>
              <p><strong>Confidence:</strong> 78% ⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        borderRadius: '10px',
        padding: '30px',
        margin: '20px auto',
        maxWidth: '800px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px', color: '#333' }}>
          Why Choose PK Signal Pulse?
        </h2>
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555' }}>
          <p>✅ <strong>Daily Premium Signals</strong> - 3-4 high-quality trading opportunities every day</p>
          <p>✅ <strong>Expert Analysis</strong> - Professional market analysis with proper risk management</p>
          <p>✅ <strong>High Success Rate</strong> - Consistent profitable signals with detailed entry/exit points</p>
          <p>✅ <strong>Risk Management</strong> - Every signal includes stop loss and multiple take profit levels</p>
          <p>✅ <strong>Real-time Updates</strong> - Instant notifications for all new trading opportunities</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button style={{
            background: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            fontSize: '1.3rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            🎯 Get Premium Signals Now
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.8 }}>
        <p style={{ fontSize: '1.1rem' }}>
          © 2025 PK Signal Pulse - Professional Trading Signals Platform
        </p>
      </div>
    </div>
  )
}