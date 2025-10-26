export default function CompliancePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Compliance & Regulatory Information
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Our commitment to legal compliance and regulatory standards.
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
              TradeFlow is committed to maintaining the highest standards of legal and regulatory compliance. This document outlines our compliance framework, regulatory status, and the standards we adhere to.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              We operate as an educational technology platform providing trading signals and market analysis for informational purposes. We are not a financial institution, broker-dealer, or registered investment advisor.
            </p>
          </section>

          {/* Regulatory Status */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              2. Regulatory Status and Licensing
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.1 Company Information
            </h3>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Legal Entity:</strong> TradeFlow LLC
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Jurisdiction:</strong> Delaware, United States
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Registration Number:</strong> [Company Registration Number]
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333', marginBottom: '10px' }}>
                <strong>Business Type:</strong> Educational Technology Platform
              </p>
              <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
                <strong>Address:</strong> 123 Trading Street, Financial District, New York, NY 10004, United States
              </p>
            </div>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.2 Regulatory Clarification
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow operates as an educational platform and does not require registration as:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Investment Advisor:</strong> We do not provide personalized investment advice or manage client assets</li>
              <li><strong>Broker-Dealer:</strong> We do not execute trades, hold customer funds, or facilitate securities transactions</li>
              <li><strong>Commodity Trading Advisor (CTA):</strong> Our signals are educational content, not trading advice</li>
              <li><strong>Financial Institution:</strong> We do not accept deposits or provide banking services</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              2.3 Applicable Regulations
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              While not requiring specific financial licenses, we comply with:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>FTC Act - Fair and truthful advertising</li>
              <li>CAN-SPAM Act - Email marketing compliance</li>
              <li>GDPR - European data protection (for EU users)</li>
              <li>CCPA - California consumer privacy (for California residents)</li>
              <li>DMCA - Copyright protection</li>
              <li>State consumer protection laws</li>
            </ul>
          </section>

          {/* Service Boundaries */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              3. Service Boundaries and Disclaimers
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.1 What We Provide
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Educational content about trading strategies and market analysis</li>
              <li>AI-generated trading signals for educational purposes</li>
              <li>Market news aggregation and commentary</li>
              <li>Technical analysis and market research</li>
              <li>Trading tutorials and webinars</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.2 What We Do NOT Provide
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Personalized investment advice or recommendations</li>
              <li>Portfolio management or asset management services</li>
              <li>Trade execution or brokerage services</li>
              <li>Custody of funds or securities</li>
              <li>Financial planning or retirement advice</li>
              <li>Tax or legal advice</li>
              <li>Guaranteed returns or profit assurances</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              3.3 Required Disclaimers
            </h3>
            <div style={{ background: '#fff3cd', padding: '25px', borderRadius: '10px', borderLeft: '5px solid #ffc107' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#856404', marginBottom: '15px', fontWeight: 'bold' }}>
                IMPORTANT LEGAL DISCLAIMERS:
              </p>
              <ul style={{ fontSize: '1.05em', lineHeight: '1.8', color: '#856404', marginLeft: '20px' }}>
                <li>TradeFlow is for educational purposes only</li>
                <li>Trading involves substantial risk of loss</li>
                <li>Past performance does not guarantee future results</li>
                <li>We do not provide financial advice</li>
                <li>Consult a licensed financial advisor before trading</li>
                <li>Only trade with money you can afford to lose</li>
              </ul>
            </div>
          </section>

          {/* Data Protection and Privacy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              4. Data Protection and Privacy Compliance
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.1 GDPR Compliance (European Users)
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR):
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Lawful basis for processing: Consent, contract performance, legitimate interests</li>
              <li>Data Protection Officer appointed: dpo@tradeflow.com</li>
              <li>Standard Contractual Clauses for international data transfers</li>
              <li>User rights: Access, rectification, erasure, portability, objection</li>
              <li>Data breach notification within 72 hours</li>
              <li>Privacy by design and default</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.2 CCPA Compliance (California Users)
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For California residents, we comply with the California Consumer Privacy Act (CCPA):
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information (Note: We do not sell personal data)</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
              <li>Privacy notice provided at or before data collection</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.3 Data Security Measures
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Encryption at rest for sensitive data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee confidentiality agreements</li>
              <li>Incident response procedures</li>
              <li>Compliance with SOC 2 Type II standards</li>
            </ul>
          </section>

          {/* Anti-Money Laundering (AML) */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              5. Anti-Money Laundering (AML) and KYC
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.1 AML Policy
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              While TradeFlow does not handle client funds or execute trades, we maintain an AML policy to prevent misuse of our platform:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Prohibition of services to known criminals or sanctioned entities</li>
              <li>Monitoring for suspicious activity patterns</li>
              <li>Cooperation with law enforcement when legally required</li>
              <li>Compliance with OFAC sanctions and restricted countries list</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.2 Know Your Customer (KYC)
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For subscription services, we collect basic user information:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Full name and email address</li>
              <li>Payment information (processed by third-party providers)</li>
              <li>IP address and geolocation</li>
              <li>Age verification (must be 18+)</li>
            </ul>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Note: KYC/AML requirements are primarily the responsibility of brokers when you open trading accounts. We encourage users to only trade with regulated brokers that implement proper KYC/AML procedures.
            </p>
          </section>

          {/* Prohibited Jurisdictions */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              6. Prohibited Jurisdictions and Sanctions
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.1 OFAC Sanctions Compliance
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We comply with U.S. Office of Foreign Assets Control (OFAC) sanctions. Our services are NOT available to residents of:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Cuba</li>
              <li>Iran</li>
              <li>North Korea</li>
              <li>Syria</li>
              <li>Crimea region of Ukraine</li>
              <li>Any other country subject to U.S. comprehensive sanctions</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              6.2 Additional Restrictions
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Our services may also be restricted in jurisdictions where:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Providing trading signals or educational content is prohibited</li>
              <li>Regulatory requirements would make operations impractical</li>
              <li>Local laws conflict with our service model</li>
            </ul>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              It is your responsibility to ensure that using our services complies with your local laws and regulations.
            </p>
          </section>

          {/* Advertising and Marketing Compliance */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              7. Advertising and Marketing Compliance
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.1 Truth in Advertising
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We adhere to FTC guidelines and commit to:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Truthful and non-misleading advertising claims</li>
              <li>Clear disclosure of material terms and conditions</li>
              <li>Proper substantiation of performance claims</li>
              <li>Prominent display of required risk disclosures</li>
              <li>No guarantees or promises of specific results</li>
              <li>Honest testimonials and reviews</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.2 Performance Advertising
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              When displaying performance metrics:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>All performance data is clearly labeled as historical or hypothetical</li>
              <li>"Past performance does not guarantee future results" disclaimer is prominently displayed</li>
              <li>Hypothetical results are clearly marked as simulated</li>
              <li>Win rates and profit percentages include appropriate context</li>
              <li>Risk disclaimers accompany all performance claims</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              7.3 Email Marketing (CAN-SPAM Compliance)
            </h3>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Accurate "From" and subject lines</li>
              <li>Clear identification as an advertisement (when applicable)</li>
              <li>Valid physical postal address included</li>
              <li>Clear and conspicuous unsubscribe mechanism</li>
              <li>Honor opt-out requests within 10 business days</li>
              <li>No email harvesting or automated address generation</li>
            </ul>
          </section>

          {/* Broker Partnerships */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              8. Broker Partnerships and Referrals
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.1 Affiliate Relationships
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow has affiliate partnerships with brokers, including Exness. We disclose that:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>We may receive compensation for referring clients to broker partners</li>
              <li>These relationships are clearly disclosed on our website</li>
              <li>Referral fees do not influence the quality or content of our signals</li>
              <li>We only partner with regulated and reputable brokers</li>
              <li>Users are free to use any broker of their choice</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.2 Broker Due Diligence
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Before partnering with brokers, we verify:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Proper regulatory licensing and status</li>
              <li>Reputation and track record</li>
              <li>Client fund protection measures</li>
              <li>Transparency of terms and conditions</li>
              <li>Quality of customer support</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.3 Independence
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              Despite affiliate relationships, TradeFlow maintains independence in:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Signal generation and analysis</li>
              <li>Educational content creation</li>
              <li>Service quality and features</li>
              <li>User experience and platform design</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              9. Intellectual Property Compliance
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              9.1 Copyright Protection
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              All content on TradeFlow is protected by copyright:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Original content owned by TradeFlow LLC</li>
              <li>Licensed content used with proper permissions</li>
              <li>DMCA compliance for copyright infringement claims</li>
              <li>Designated copyright agent for takedown notices</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              9.2 Trademark
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              "TradeFlow" and associated logos are trademarks of TradeFlow LLC. Unauthorized use is prohibited.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              9.3 Third-Party Content
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We respect third-party intellectual property rights and:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Properly attribute sources when using external content</li>
              <li>Comply with fair use principles</li>
              <li>Remove infringing content upon valid notice</li>
              <li>Maintain licenses for all third-party tools and services</li>
            </ul>
          </section>

          {/* Complaint Resolution */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              10. Complaint Resolution and Dispute Handling
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.1 Customer Complaints
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We take customer complaints seriously and have established procedures:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Complaints submitted to: complaints@tradeflow.com</li>
              <li>Acknowledgment within 2 business days</li>
              <li>Investigation and response within 10 business days</li>
              <li>Escalation process for unresolved issues</li>
              <li>Record-keeping of all complaints</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.2 Dispute Resolution
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For disputes regarding services or billing:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Attempt informal resolution through customer support</li>
              <li>Binding arbitration for unresolved disputes (see Terms of Service)</li>
              <li>Waiver of class action participation</li>
            </ul>
          </section>

          {/* Record Keeping */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              11. Record Keeping and Reporting
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              11.1 Business Records
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We maintain comprehensive records including:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>User registrations and subscriptions</li>
              <li>Transaction and billing records (minimum 7 years)</li>
              <li>Customer communications and support tickets</li>
              <li>Marketing and advertising materials</li>
              <li>Compliance policies and procedures</li>
              <li>Security incident logs</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              11.2 Tax Compliance
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              TradeFlow complies with all applicable tax laws:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Proper tax registration and filing</li>
              <li>Sales tax collection where required</li>
              <li>1099 reporting for affiliates and contractors</li>
              <li>International tax compliance (where applicable)</li>
            </ul>
          </section>

          {/* Employee and Vendor Compliance */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              12. Employee and Vendor Compliance
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              12.1 Employee Training
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              All employees receive training on:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Data protection and privacy requirements</li>
              <li>Security best practices</li>
              <li>Compliance policies and procedures</li>
              <li>Ethical standards and code of conduct</li>
              <li>Anti-discrimination and harassment policies</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              12.2 Vendor Management
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              Third-party vendors are evaluated for:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Security and privacy practices</li>
              <li>Compliance certifications (SOC 2, ISO 27001)</li>
              <li>Data processing agreements</li>
              <li>Service level agreements (SLAs)</li>
              <li>Regular performance reviews</li>
            </ul>
          </section>

          {/* Continuous Improvement */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              13. Continuous Compliance Monitoring
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow is committed to maintaining ongoing compliance through:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Regular policy reviews and updates</li>
              <li>Monitoring of regulatory changes</li>
              <li>Annual compliance audits</li>
              <li>Security assessments and penetration testing</li>
              <li>Employee compliance training programs</li>
              <li>Legal counsel consultation</li>
              <li>Industry best practices adoption</li>
            </ul>
          </section>

          {/* Reporting Issues */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              14. Reporting Compliance Issues
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you believe TradeFlow has violated any laws or regulations, or if you have compliance concerns, please contact:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Compliance Officer:</strong> compliance@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Legal Department:</strong> legal@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Data Protection Officer:</strong> dpo@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
                <strong>Whistleblower Hotline:</strong> (Available for employees and contractors)
              </p>
            </div>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginTop: '20px' }}>
              All reports are taken seriously and investigated promptly. We prohibit retaliation against individuals who report compliance concerns in good faith.
            </p>
          </section>

          {/* Contact Information */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              15. Contact Information
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              For questions about our compliance program or regulatory matters:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>General Inquiries:</strong> info@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Legal:</strong> legal@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Compliance:</strong> compliance@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
                <strong>Mail:</strong> TradeFlow LLC<br />
                Attn: Compliance Department<br />
                123 Trading Street, Financial District<br />
                New York, NY 10004, United States
              </p>
            </div>
          </section>

          {/* Updates */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              16. Updates to This Document
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              This Compliance document may be updated periodically to reflect:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Changes in applicable laws and regulations</li>
              <li>Evolution of industry best practices</li>
              <li>Updates to our compliance program</li>
              <li>New service offerings or partnerships</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Material changes will be communicated via email and posted on our website with the "Last Updated" date revised accordingly.
            </p>
          </section>

          {/* Important Notice */}
          <section style={{ background: '#e3f2fd', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #2196f3' }}>
            <h3 style={{ fontSize: '1.5em', color: '#1565c0', marginBottom: '15px' }}>Our Commitment to Compliance</h3>
            <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#1565c0' }}>
              TradeFlow is dedicated to operating with the highest standards of legal and ethical conduct. We continuously monitor regulatory developments and adapt our practices to ensure ongoing compliance. Our goal is to provide valuable educational services while protecting our users and maintaining trust in our platform.
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
