export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Your privacy is important to us. Learn how we collect, use, and protect your data.
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
              1. Introduction
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Welcome to TradeFlow. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our trading signals and educational services.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              By accessing or using TradeFlow, you agree to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              2. Information We Collect
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.1 Personal Information
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px', marginBottom: '20px' }}>
              <li>Register for an account</li>
              <li>Subscribe to our trading signals service</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              This information may include:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Name and email address</li>
              <li>Phone number</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Account credentials (username and encrypted password)</li>
              <li>Trading preferences and experience level</li>
              <li>Communication preferences</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.2 Automatically Collected Information
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              When you visit our website, we automatically collect certain information about your device and usage:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>IP address and geolocation data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Device identifiers</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referral source</li>
              <li>Clickstream data</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.3 Cookies and Tracking Technologies
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use cookies, web beacons, and similar tracking technologies to collect information and improve your experience. See our <a href="/cookies" style={{ color: '#667eea', textDecoration: 'underline' }}>Cookie Policy</a> for more details.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.4 Third-Party Data
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We may receive information about you from third parties, including:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Analytics providers (Google Analytics, Mixpanel)</li>
              <li>Advertising partners</li>
              <li>Social media platforms (if you connect your accounts)</li>
              <li>Broker partners like Exness (with your consent)</li>
              <li>Payment processors (Stripe, PayPal)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              3. How We Use Your Information
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We use the information we collect for the following purposes:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Service Delivery:</strong> To provide, operate, and maintain our trading signals and educational services</li>
              <li><strong>Account Management:</strong> To create and manage your account, process subscriptions, and handle payments</li>
              <li><strong>Communication:</strong> To send you trading signals, notifications, updates, and marketing materials (with your consent)</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries and provide technical assistance</li>
              <li><strong>Personalization:</strong> To customize your experience and provide relevant content and recommendations</li>
              <li><strong>Analytics:</strong> To analyze usage patterns, improve our services, and develop new features</li>
              <li><strong>Security:</strong> To detect, prevent, and address fraud, security issues, and technical problems</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
              <li><strong>Affiliate Partnerships:</strong> To track referrals and manage partnerships with brokers like Exness</li>
            </ul>
          </section>

          {/* Information Sharing and Disclosure */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              4. Information Sharing and Disclosure
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We may share your information in the following circumstances:
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.1 Service Providers
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We share information with third-party service providers who help us operate our business:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Cloud hosting providers (AWS, Google Cloud)</li>
              <li>Email service providers (SendGrid, Mailchimp)</li>
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Analytics services (Google Analytics, Mixpanel)</li>
              <li>Customer support tools (Intercom, Zendesk)</li>
              <li>AI and data processing services (OpenAI)</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.2 Broker Partners
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              If you open an account with a broker partner like Exness through our referral links, we may share limited information (such as your email address) to facilitate account creation and track referrals. This is done only with your explicit consent.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.3 Business Transfers
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              If TradeFlow is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website of any change in ownership or use of your personal information.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.4 Legal Requirements
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We may disclose your information if required by law, court order, or governmental regulation, or to protect our rights, property, or safety, or that of our users or the public.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.5 Aggregate Information
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We may share aggregated or de-identified information that cannot reasonably be used to identify you with third parties for marketing, research, or analytics purposes.
            </p>
          </section>

          {/* Data Retention */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              5. Data Retention
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Specifically:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Active Accounts:</strong> Information is retained while your account is active</li>
              <li><strong>Closed Accounts:</strong> Information is retained for 7 years after account closure for legal and tax purposes</li>
              <li><strong>Transaction Records:</strong> Retained for 7 years as required by financial regulations</li>
              <li><strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
              <li><strong>Analytics Data:</strong> Retained for up to 26 months in anonymized form</li>
            </ul>
          </section>

          {/* Data Security */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              6. Data Security
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Encryption of data at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              7. Your Rights and Choices
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Depending on your location, you may have the following rights regarding your personal information:
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.1 Access and Portability
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You have the right to request a copy of the personal information we hold about you and to receive it in a structured, commonly used, machine-readable format.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.2 Correction and Update
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You can update your account information at any time through your account settings. You may also contact us to correct inaccurate information.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.3 Deletion
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You have the right to request deletion of your personal information, subject to certain legal exceptions (e.g., record-keeping requirements).
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.4 Opt-Out of Marketing
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You can unsubscribe from marketing emails by clicking the "unsubscribe" link in any email or by contacting us directly.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.5 Cookies
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You can manage cookie preferences through your browser settings or our cookie consent tool. See our <a href="/cookies" style={{ color: '#667eea', textDecoration: 'underline' }}>Cookie Policy</a> for details.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.6 Do Not Track
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              Some browsers have "Do Not Track" features. Currently, we do not respond to Do Not Track signals.
            </p>
          </section>

          {/* International Data Transfers */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              8. International Data Transfers
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow operates globally, and your information may be transferred to, stored, and processed in countries other than your country of residence, including the United States and European Union.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses (SCCs) approved by the European Commission and compliance with applicable data protection laws.
            </p>
          </section>

          {/* Children's Privacy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              9. Children's Privacy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              If we discover that we have collected information from a child under 18, we will delete that information promptly.
            </p>
          </section>

          {/* GDPR (European Users) */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              10. GDPR Rights (European Users)
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Right to Object:</strong> Object to processing of your personal information</li>
              <li><strong>Right to Restrict Processing:</strong> Request restriction of processing of your personal information</li>
              <li><strong>Right to Lodge a Complaint:</strong> Lodge a complaint with your local data protection authority</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Our legal basis for processing your information includes: performance of a contract, legitimate interests, and your consent where applicable.
            </p>
          </section>

          {/* CCPA (California Users) */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              11. CCPA Rights (California Users)
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we collect</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of your personal information (Note: We do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              To exercise these rights, please contact us at privacy@tradeflow.com or use the contact information below.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              12. Changes to This Privacy Policy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Posting the updated policy on our website with a new "Last Updated" date</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on our website</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              13. Contact Us
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Email:</strong> privacy@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Data Protection Officer:</strong> dpo@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Mail:</strong> TradeFlow Privacy Team<br />
                123 Trading Street, Financial District<br />
                New York, NY 10004, United States
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
                <strong>Response Time:</strong> We will respond to your inquiry within 30 days
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              14. Third-Party Links
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              Our website may contain links to third-party websites, including broker partners like Exness. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Important Notice */}
          <section style={{ background: '#e3f2fd', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #2196f3' }}>
            <h3 style={{ fontSize: '1.5em', color: '#1565c0', marginBottom: '15px' }}>Important Notice</h3>
            <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#1565c0' }}>
              TradeFlow is an educational platform providing trading signals and market analysis. We are not a financial institution or licensed investment advisor. This Privacy Policy applies to our educational services only and does not cover the privacy practices of any broker or financial institution you may choose to work with.
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
