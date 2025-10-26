export default function CookiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Cookie Policy
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Learn how we use cookies and similar technologies to improve your experience.
          </p>
          <p style={{ fontSize: '1.1em', color: 'rgba(255,255,255,0.8)', marginTop: '15px' }}>
            Last Updated: October 23, 2025
          </p>
        </div>

        {/* Main Content */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

          {/* Introduction */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              1. What Are Cookies?
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              This Cookie Policy explains how TradeFlow uses cookies and similar tracking technologies on our website and services. It should be read together with our <a href="/privacy" style={{ color: '#667eea', textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              2. Why We Use Cookies
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use cookies and similar technologies for several purposes:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Essential Functionality:</strong> To enable core website features and maintain your session</li>
              <li><strong>Security:</strong> To detect fraud, protect your account, and secure our services</li>
              <li><strong>Performance:</strong> To analyze how visitors use our website and improve performance</li>
              <li><strong>Personalization:</strong> To remember your preferences and provide customized content</li>
              <li><strong>Analytics:</strong> To understand user behavior and improve our services</li>
              <li><strong>Marketing:</strong> To deliver relevant advertisements and track campaign effectiveness</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              3. Types of Cookies We Use
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.1 Strictly Necessary Cookies
            </h3>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
                These cookies are essential for the website to function properly. They enable core features such as security, network management, and accessibility.
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Purpose:</strong> Authentication, security, load balancing
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Examples:</strong> session_id, csrf_token, auth_token
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Duration:</strong> Session or up to 1 year
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                <strong>Can be disabled:</strong> No - Required for core functionality
              </p>
            </div>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.2 Performance Cookies
            </h3>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
                These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages.
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Purpose:</strong> Website analytics, performance monitoring, error tracking
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Examples:</strong> _ga (Google Analytics), _gid (Google Analytics)
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Duration:</strong> 24 hours to 2 years
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                <strong>Can be disabled:</strong> Yes - Through browser settings or cookie preferences
              </p>
            </div>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.3 Functional Cookies
            </h3>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
                These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, personalized features.
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Purpose:</strong> Language preferences, theme settings, user preferences
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Examples:</strong> language, theme, timezone
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Duration:</strong> 30 days to 1 year
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                <strong>Can be disabled:</strong> Yes - May affect personalized features
              </p>
            </div>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.4 Targeting/Advertising Cookies
            </h3>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
                These cookies are used to deliver advertisements relevant to you and your interests. They also limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Purpose:</strong> Targeted advertising, remarketing, conversion tracking
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Examples:</strong> _fbp (Facebook), ads/ga-audiences (Google), IDE (DoubleClick)
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555', marginBottom: '10px' }}>
                <strong>Duration:</strong> 90 days to 2 years
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#555' }}>
                <strong>Can be disabled:</strong> Yes - Through cookie preferences or ad settings
              </p>
            </div>
          </section>

          {/* Specific Cookies Table */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              4. Specific Cookies We Use
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1em' }}>
                <thead>
                  <tr style={{ background: '#667eea', color: 'white' }}>
                    <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #ddd' }}>Cookie Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #ddd' }}>Provider</th>
                    <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #ddd' }}>Purpose</th>
                    <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #ddd' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>session_id</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>TradeFlow</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Maintains user session</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Session</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>csrf_token</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>TradeFlow</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Security protection</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Session</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>auth_token</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>TradeFlow</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Authentication</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>30 days</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>_ga</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Google Analytics</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Analytics tracking</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>2 years</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>_gid</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Google Analytics</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Analytics tracking</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>24 hours</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>_fbp</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Facebook</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Advertising tracking</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>90 days</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>IDE</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Google DoubleClick</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Ad targeting</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 year</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>language</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>TradeFlow</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Language preference</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 year</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>theme</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>TradeFlow</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Theme preference</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 year</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>ajs_user_id</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Segment</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>User analytics</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 year</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>intercom-session</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Intercom</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Customer support chat</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>7 days</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>stripe_mid</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Stripe</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>Payment processing</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              5. Third-Party Cookies and Services
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use various third-party services that may set cookies on your device. These include:
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.1 Analytics Services
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
              <li><strong>Mixpanel:</strong> Product analytics and user engagement tracking</li>
              <li><strong>Hotjar:</strong> Heatmaps and user session recordings</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.2 Advertising and Marketing
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Google Ads:</strong> Advertising campaigns and conversion tracking</li>
              <li><strong>Facebook Pixel:</strong> Social media advertising and remarketing</li>
              <li><strong>Twitter Analytics:</strong> Social media campaign tracking</li>
              <li><strong>LinkedIn Insight Tag:</strong> Professional network advertising</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.3 Customer Support
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Intercom:</strong> Live chat and customer support</li>
              <li><strong>Zendesk:</strong> Help desk and ticket management</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.4 Payment Processing
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Stripe:</strong> Secure payment processing</li>
              <li><strong>PayPal:</strong> Alternative payment option</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.5 Broker Partners
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Exness:</strong> Tracking referrals and affiliate partnerships</li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              6. How to Manage Cookies
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.1 Cookie Preferences
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              When you first visit TradeFlow, you will see a cookie consent banner. You can:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your cookie preferences by category</li>
            </ul>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              You can change your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of our website.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.2 Browser Settings
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '15px' }}>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage cookies
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                <strong>Opera:</strong> Settings → Privacy & Security → Cookies
              </p>
            </div>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Note: Blocking all cookies may affect your ability to use certain features of our website.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.3 Opt-Out Links
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              You can opt out of specific third-party cookies:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Google Ads:</strong> <a href="https://adssettings.google.com" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">Google Ads Settings</a></li>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/ads/preferences" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">Facebook Ad Preferences</a></li>
              <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">NAI Opt-Out Tool</a></li>
              <li><strong>Digital Advertising Alliance:</strong> <a href="http://www.aboutads.info/choices/" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">DAA WebChoices Tool</a></li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.4 Mobile Devices
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              Mobile devices have settings to limit ad tracking:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>iOS:</strong> Settings → Privacy → Tracking → Allow Apps to Request to Track (disable)</li>
              <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
            </ul>
          </section>

          {/* Other Tracking Technologies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              7. Other Tracking Technologies
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.1 Web Beacons (Pixels)
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use web beacons (also called pixels or clear GIFs) in our emails and on our website to track user engagement, measure email open rates, and understand user behavior.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.2 Local Storage
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use browser local storage and session storage to store user preferences, cache data, and improve performance. This data is stored locally on your device and can be cleared through your browser settings.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.3 Device Fingerprinting
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We may collect technical information about your device (browser type, screen resolution, operating system) to detect fraud, improve security, and enhance user experience.
            </p>
          </section>

          {/* Impact of Disabling Cookies */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              8. Impact of Disabling Cookies
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you disable or refuse cookies, please note that:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Some features of our website may not function properly</li>
              <li>You may not be able to log in to your account</li>
              <li>Your preferences and settings will not be saved</li>
              <li>You may see less relevant advertisements</li>
              <li>We may not be able to provide personalized content</li>
              <li>Some pages may load more slowly</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Strictly necessary cookies cannot be disabled as they are essential for the website to function.
            </p>
          </section>

          {/* Do Not Track */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              9. Do Not Track Signals
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you do not want to have your online activity tracked.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              Currently, there is no industry-wide standard for recognizing and implementing DNT signals. As such, we do not currently respond to DNT browser signals. However, you can use the cookie management options described above to control tracking.
            </p>
          </section>

          {/* Children's Privacy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              10. Children's Privacy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              TradeFlow is not intended for individuals under the age of 18. We do not knowingly collect cookies or other data from children under 18. If you are a parent or guardian and believe your child has provided us with information, please contact us immediately.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              11. Updates to This Cookie Policy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We may update this Cookie Policy from time to time to reflect changes in technology, laws, or our practices. We will notify you of any material changes by:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Posting the updated policy with a new "Last Updated" date</li>
              <li>Displaying a notice on our website</li>
              <li>Sending an email notification (for significant changes)</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
            </p>
          </section>

          {/* Contact Information */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              12. Contact Us
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Email:</strong> privacy@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Data Protection Officer:</strong> dpo@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
                <strong>Mail:</strong> TradeFlow Privacy Team<br />
                123 Trading Street, Financial District<br />
                New York, NY 10004, United States
              </p>
            </div>
          </section>

          {/* Additional Resources */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              13. Additional Resources
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For more information about cookies and online privacy:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><a href="https://www.allaboutcookies.org" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">AllAboutCookies.org</a> - Comprehensive information about cookies</li>
              <li><a href="https://www.youronlinechoices.eu" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">Your Online Choices</a> - EU cookie opt-out tool</li>
              <li><a href="http://www.networkadvertising.org" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">Network Advertising Initiative</a> - Industry self-regulation</li>
              <li><a href="http://www.aboutads.info" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank">AboutAds.info</a> - Digital advertising information</li>
            </ul>
          </section>

          {/* Important Notice */}
          <section style={{ background: '#e3f2fd', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #2196f3' }}>
            <h3 style={{ fontSize: '1.5em', color: '#1565c0', marginBottom: '15px' }}>Your Privacy Matters</h3>
            <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#1565c0' }}>
              We are committed to protecting your privacy and being transparent about our use of cookies. If you have any concerns or questions about our cookie practices, please don't hesitate to contact us. For more information about how we handle your personal data, please review our <a href="/privacy" style={{ color: '#1565c0', textDecoration: 'underline', fontWeight: 'bold' }}>Privacy Policy</a>.
            </p>
          </section>

          {/* Back to Home */}
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
                transition: 'all 0.3s'
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
