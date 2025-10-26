export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            📧 Contact Us
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)' }}>
            Get in touch with our team - We're here to help
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '50px' }}>
            <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3em', marginBottom: '15px' }}>📧</div>
              <h3 style={{ fontSize: '1.5em', color: '#667eea', marginBottom: '15px' }}>Email Support</h3>
              <p style={{ fontSize: '1.05em', color: '#555', marginBottom: '10px' }}>
                support@tradeflow.blog
              </p>
              <p style={{ fontSize: '0.95em', color: '#777' }}>
                Response time: Within 24 hours
              </p>
            </div>

            <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3em', marginBottom: '15px' }}>💬</div>
              <h3 style={{ fontSize: '1.5em', color: '#667eea', marginBottom: '15px' }}>Live Chat</h3>
              <p style={{ fontSize: '1.05em', color: '#555', marginBottom: '10px' }}>
                Available 24/7
              </p>
              <p style={{ fontSize: '0.95em', color: '#777' }}>
                Click the chat icon in the bottom right
              </p>
            </div>

            <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3em', marginBottom: '15px' }}>🐦</div>
              <h3 style={{ fontSize: '1.5em', color: '#667eea', marginBottom: '15px' }}>Social Media</h3>
              <p style={{ fontSize: '1.05em', color: '#555', marginBottom: '10px' }}>
                @TradeFlowOfficial
              </p>
              <p style={{ fontSize: '0.95em', color: '#777' }}>
                Follow us for updates
              </p>
            </div>
          </div>

          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', textAlign: 'center' }}>
              Send Us a Message
            </h2>
            <form style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '1.1em', color: '#333', fontWeight: 'bold' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1em',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border 0.3s'
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '1.1em', color: '#333', fontWeight: 'bold' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1em',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '1.1em', color: '#333', fontWeight: 'bold' }}>
                  Subject *
                </label>
                <select
                  required
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1em',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select a subject...</option>
                  <option value="general">General Inquiry</option>
                  <option value="signals">Trading Signals Question</option>
                  <option value="account">Account Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '1.1em', color: '#333', fontWeight: 'bold' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1em',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s'
                }}
              >
                📧 Send Message
              </button>
            </form>
          </section>

          <section style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '10px' }}>How do I get started with trading signals?</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Simply sign up for a free account, and you'll get instant access to 3 daily trading signals. For unlimited signals and premium features, upgrade to our Pro plan.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '10px' }}>What is your refund policy?</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact support within 30 days of purchase for a full refund.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '10px' }}>Do you provide financial advice?</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  No. TradeFlow is an educational platform. Our signals and analysis are for informational purposes only and should not be considered financial advice. Always consult a licensed financial advisor.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '10px' }}>How accurate are your signals?</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Our AI-powered signals have a historical accuracy rate of approximately 78%. However, past performance does not guarantee future results. Trading involves risk and losses are possible.
                </p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.3em', color: '#667eea', marginBottom: '10px' }}>Can I cancel my subscription anytime?</h3>
                <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                  Yes! You can cancel your subscription at any time from your account dashboard. There are no cancellation fees or penalties.
                </p>
              </div>
            </div>
          </section>

          <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px', background: '#f0f7ff', borderRadius: '15px' }}>
            <h3 style={{ fontSize: '1.8em', color: '#0052cc', marginBottom: '15px' }}>Looking for Partner Support?</h3>
            <p style={{ fontSize: '1.1em', color: '#333', marginBottom: '20px' }}>
              For issues related to your Exness trading account, please contact them directly:
            </p>
            <a
              href="https://www.exness.com/support/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                color: 'white',
                padding: '15px 35px',
                borderRadius: '50px',
                fontSize: '1.1em',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(255, 193, 7, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              💎 Exness Support Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}