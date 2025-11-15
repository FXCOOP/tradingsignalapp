import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Trading Partners - Your Path to Financial Freedom',
  description: 'Join 5,000+ traders who earn $2,500-$10,000 monthly. Get matched with premium brokers, receive exclusive signals, and access professional mentorship - 100% FREE.',
}

export default function LP1Page() {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" async></script>
        <style dangerouslySetInnerHTML={{ __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #fff;
          }

          .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .hero-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .hero h1 {
            font-size: 48px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .hero-highlight {
            color: #ffd700;
            display: block;
          }

          .hero p {
            font-size: 20px;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 40px;
            flex-wrap: wrap;
          }

          .stat {
            text-align: center;
          }

          .stat-number {
            font-size: 36px;
            font-weight: 800;
            color: #ffd700;
            display: block;
          }

          .stat-label {
            font-size: 14px;
            opacity: 0.9;
          }

          .form-section {
            background: white;
            padding: 60px 20px;
          }

          .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            padding: 40px;
            border: 1px solid #e5e7eb;
          }

          .form-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .form-header h2 {
            font-size: 28px;
            color: #1a1a1a;
            margin-bottom: 10px;
          }

          .form-header p {
            color: #6b7280;
            font-size: 16px;
          }

          .trust-line {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 15px;
            color: #10b981;
            font-size: 14px;
            font-weight: 600;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #374151;
            font-size: 14px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }

          input, select {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.2s;
            font-family: inherit;
          }

          input:focus, select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .submit-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
          }

          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }

          .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .form-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 13px;
            color: #6b7280;
          }

          .benefits {
            background: #f9fafb;
            padding: 80px 20px;
          }

          .section-title {
            text-align: center;
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 50px;
            color: #1a1a1a;
          }

          .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .benefit-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: all 0.3s;
          }

          .benefit-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }

          .benefit-icon {
            font-size: 40px;
            margin-bottom: 15px;
          }

          .benefit-card h3 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #1a1a1a;
          }

          .benefit-card p {
            color: #6b7280;
            line-height: 1.6;
          }

          .social-proof {
            background: white;
            padding: 80px 20px;
          }

          .testimonials {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .testimonial {
            background: #f9fafb;
            padding: 30px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
          }

          .testimonial-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
          }

          .testimonial-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 20px;
          }

          .testimonial-name {
            font-weight: 600;
            color: #1a1a1a;
          }

          .testimonial-role {
            font-size: 14px;
            color: #6b7280;
          }

          .testimonial-stars {
            color: #fbbf24;
            margin-bottom: 10px;
          }

          .testimonial-text {
            color: #4b5563;
            line-height: 1.6;
            font-style: italic;
          }

          .trust-section {
            background: #f9fafb;
            padding: 60px 20px;
            text-align: center;
          }

          .trust-badges {
            display: flex;
            justify-content: center;
            gap: 50px;
            flex-wrap: wrap;
            max-width: 900px;
            margin: 0 auto;
          }

          .trust-badge {
            text-align: center;
          }

          .trust-badge-icon {
            font-size: 50px;
            margin-bottom: 10px;
          }

          .trust-badge-text {
            font-size: 14px;
            font-weight: 600;
            color: #6b7280;
          }

          .success-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .success-overlay.active {
            display: flex;
          }

          .success-message {
            background: white;
            padding: 50px;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            animation: slideUp 0.5s ease-out;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-icon {
            font-size: 80px;
            margin-bottom: 20px;
          }

          .success-message h3 {
            font-size: 28px;
            color: #1a1a1a;
            margin-bottom: 15px;
          }

          .success-message p {
            color: #6b7280;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .hero h1 {
              font-size: 32px;
            }

            .hero p {
              font-size: 16px;
            }

            .form-row {
              grid-template-columns: 1fr;
            }

            .hero-stats {
              gap: 20px;
            }

            .stat-number {
              font-size: 28px;
            }
          }
        `}} />
      </head>
      <body>
        <section className="hero">
          <div className="container">
            <div className="hero-badge">🔥 Limited Spots - Only 47 Remaining This Week</div>
            <h1>
              Stop Losing Money on Bad Trades
              <span className="hero-highlight">Start Earning $2,500-$10,000/Month</span>
            </h1>
            <p>
              Get matched with elite brokers, receive professional signals, and access 1-on-1 mentorship from traders who've made millions. 100% Free. No strings attached.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">5,247+</span>
                <span className="stat-label">Active Traders</span>
              </div>
              <div className="stat">
                <span className="stat-number">78%</span>
                <span className="stat-label">Average Win Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">$4.2M+</span>
                <span className="stat-label">Total Profits Generated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Claim Your Free Elite Broker Match</h2>
              <p>Takes 30 seconds. Get instant access to premium trading tools.</p>
              <div className="trust-line">
                <span>🔒</span>
                <span>Your data is 100% secure & never shared</span>
              </div>
            </div>

            <form id="leadForm">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input type="text" id="firstName" required placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input type="text" id="lastName" required placeholder="Doe" />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" id="email" required placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" id="phone" required placeholder="+1 234 567 8900" />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <select id="country" required>
                  <option value="">Select your country</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="MY">🇲🇾 Malaysia</option>
                  <option value="HK">🇭🇰 Hong Kong</option>
                  <option value="TW">🇹🇼 Taiwan</option>
                  <option value="IT">🇮🇹 Italy</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="ES">🇪🇸 Spain</option>
                  <option value="BR">🇧🇷 Brazil</option>
                  <option value="TR">🇹🇷 Turkey</option>
                  <option value="OTHER">🌍 Other</option>
                </select>
              </div>

              <button type="submit" className="submit-btn" id="submitBtn">
                🚀 Get My Free Broker Match Now
              </button>

              <div className="form-footer">
                By submitting, you agree to receive trading insights via email & SMS.
                <br />Unsubscribe anytime. We respect your privacy.
              </div>
            </form>
          </div>
        </section>

        <section className="benefits">
          <div className="container">
            <h2 className="section-title">Why Elite Traders Choose Us</h2>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Daily Premium Signals</h3>
                <p>Receive 5-10 high-probability trading signals daily with exact entry, stop-loss, and take-profit levels.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">💎</div>
                <h3>Elite Broker Matching</h3>
                <p>Get matched with top-tier regulated brokers offering the best spreads, execution, and trading conditions.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📚</div>
                <h3>1-on-1 Mentorship</h3>
                <p>Personal guidance from traders who've made millions. Learn their exact strategies and risk management.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h3>Live Market Analysis</h3>
                <p>Daily market breakdowns, economic calendar insights, and real-time trading opportunities.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🛡️</div>
                <h3>Risk Management Tools</h3>
                <p>Professional position sizing calculators, risk/reward analyzers, and portfolio trackers.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🌍</div>
                <h3>24/7 Support</h3>
                <p>Access our dedicated support team anytime. Get help with trades, platform issues, or strategy questions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="social-proof">
          <div className="container">
            <h2 className="section-title">Success Stories from Real Traders</h2>

            <div className="testimonials">
              <div className="testimonial">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">M</div>
                  <div>
                    <div className="testimonial-name">Michael Chen</div>
                    <div className="testimonial-role">Singapore · Verified Trader</div>
                  </div>
                </div>
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "Made $8,400 in my first month following their signals. The broker they matched me with has incredible execution speed. This is a game-changer!"
                </p>
              </div>

              <div className="testimonial">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">S</div>
                  <div>
                    <div className="testimonial-name">Sarah Rodriguez</div>
                    <div className="testimonial-role">Spain · Verified Trader</div>
                  </div>
                </div>
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "I was losing money for 2 years. After getting my free mentor, I'm finally profitable. Up $12,000 in 3 months. Thank you!"
                </p>
              </div>

              <div className="testimonial">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">J</div>
                  <div>
                    <div className="testimonial-name">James Wilson</div>
                    <div className="testimonial-role">UK · Verified Trader</div>
                  </div>
                </div>
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "Best decision ever. The signals are accurate, the broker is top-tier, and the mentorship is worth thousands. All completely free!"
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-section">
          <div className="container">
            <div className="trust-badges">
              <div className="trust-badge">
                <div className="trust-badge-icon">🔒</div>
                <div className="trust-badge-text">256-bit SSL Encrypted</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">✅</div>
                <div className="trust-badge-text">Regulated Brokers Only</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">🏆</div>
                <div className="trust-badge-text">5-Star Rated Service</div>
              </div>
              <div className="trust-badge">
                <div className="trust-badge-icon">💯</div>
                <div className="trust-badge-text">100% Free Forever</div>
              </div>
            </div>
          </div>
        </section>

        <div className="success-overlay" id="successOverlay">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Welcome to Elite Trading!</h3>
            <p>
              Thank you for joining! Our team will contact you within 24 hours to match you with your perfect broker and personal trading mentor.
              <br /><br />
              <strong>Check your email and phone for next steps!</strong>
            </p>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          const SUPABASE_URL = 'https://bsupjdeayuylynsdmfdx.supabase.co';
          const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdXBqZGVheXV5bHluc2RtZmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDg4OTgsImV4cCI6MjA3NTIyNDg5OH0.9GYAHxRfLjoSlxmgsb3HTDoTeLcy3pnhYNvT59obIxY';

          let supabase;
          let detectedIPData = null;

          async function initSupabase() {
            if (window.supabase) {
              supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
              await detectIP();
              setupForm();
            } else {
              setTimeout(initSupabase, 100);
            }
          }

          async function detectIP() {
            try {
              const response = await fetch('https://ipapi.co/json/');
              detectedIPData = await response.json();

              const countrySelect = document.getElementById('country');
              let countryCode = detectedIPData.country_code;
              if (countryCode === 'GB') countryCode = 'UK';

              const supported = ['US', 'UK', 'CA', 'AU', 'SG', 'MY', 'HK', 'TW', 'IT', 'FR', 'DE', 'ES', 'BR', 'TR'];
              if (supported.includes(countryCode)) {
                countrySelect.value = countryCode;
              } else {
                countrySelect.value = 'OTHER';
              }

              const phonePrefixes = {
                'US': '+1', 'CA': '+1', 'GB': '+44', 'AU': '+61', 'SG': '+65',
                'MY': '+60', 'HK': '+852', 'TW': '+886', 'IT': '+39', 'FR': '+33',
                'DE': '+49', 'ES': '+34', 'BR': '+55', 'TR': '+90'
              };

              const phoneInput = document.getElementById('phone');
              const prefix = phonePrefixes[detectedIPData.country_code];
              if (prefix) {
                phoneInput.value = prefix + ' ';
                phoneInput.placeholder = prefix + ' 123 456 7890';
              }
            } catch (error) {
              console.error('IP detection failed:', error);
            }
          }

          function setupForm() {
            document.getElementById('leadForm').addEventListener('submit', async function(event) {
              event.preventDefault();

              const submitBtn = document.getElementById('submitBtn');
              submitBtn.disabled = true;
              submitBtn.textContent = '⏳ Processing...';

              const data = {
                first_name: document.getElementById('firstName').value.trim(),
                last_name: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone_number: document.getElementById('phone').value.trim(),
                country: document.getElementById('country').value,
                country_code: document.getElementById('phone').value.substring(0, 4),
                trading_experience: 'Not specified',
                account_size: 'Not specified',
                lead_source: 'lp1-elite',
                lead_type: 'elite-broker-matching',
                lead_status: 'new',
                ip_address: detectedIPData?.ip || 'Unknown',
                user_agent: navigator.userAgent,
                referrer: document.referrer || 'Direct',
                landing_page: window.location.href,
                created_at: new Date().toISOString()
              };

              try {
                const { data: result, error } = await supabase
                  .from('signups')
                  .insert([data])
                  .select();

                if (error) throw error;

                document.getElementById('successOverlay').classList.add('active');

                if (typeof dataLayer !== 'undefined') {
                  dataLayer.push({
                    'event': 'conversion',
                    'conversion_type': 'lp1_lead_submit',
                    'value': 1.0,
                    'currency': 'USD'
                  });
                }
              } catch (error) {
                console.error('Submission error:', error);
                alert('Oops! Something went wrong. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = '🚀 Get My Free Broker Match Now';
              }
            });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSupabase);
          } else {
            initSupabase();
          }
        `}} />
      </body>
    </html>
  )
}
