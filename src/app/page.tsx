export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            🚀 PK Signal Pulse
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Professional Trading Signals Platform
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-green-600 mb-4">XAUUSD - BUY</h3>
              <div className="space-y-2 text-left">
                <p><strong>Entry:</strong> 2640.50</p>
                <p><strong>Stop Loss:</strong> 2630.00</p>
                <p><strong>Take Profit:</strong> 2650.00, 2660.00</p>
                <p><strong>Confidence:</strong> 85%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-red-600 mb-4">EURUSD - SELL</h3>
              <div className="space-y-2 text-left">
                <p><strong>Entry:</strong> 1.1120</p>
                <p><strong>Stop Loss:</strong> 1.1150</p>
                <p><strong>Take Profit:</strong> 1.1090, 1.1060</p>
                <p><strong>Confidence:</strong> 78%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-3xl font-bold mb-6">About PK Signal Pulse</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Professional trading signals platform providing daily market analysis
              and trading opportunities. Our expert team analyzes market conditions
              to deliver high-quality trading signals with proper risk management.
            </p>
            <div className="mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Premium Signals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}