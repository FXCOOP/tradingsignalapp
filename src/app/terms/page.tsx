export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3em', color: 'white', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '1.3em', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Please read these terms carefully before using TradeFlow services.
          </p>
          <p style={{ fontSize: '1.1em', color: 'rgba(255,255,255,0.8)', marginTop: '15px' }}>
            Last Updated: October 23, 2025
          </p>
        </div>

        {/* Main Content */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

          {/* Agreement to Terms */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              1. Agreement to Terms
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and TradeFlow regarding your access to and use of our website, services, and educational content.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              By accessing or using TradeFlow, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
            </p>
          </section>

          {/* Eligibility */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              2. Eligibility
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              To use TradeFlow, you must:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Not be prohibited from using our services under applicable laws</li>
              <li>Not be a resident of a prohibited jurisdiction (see Section 19)</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Comply with all applicable laws and regulations in your jurisdiction</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              By using TradeFlow, you represent and warrant that you meet all eligibility requirements.
            </p>
          </section>

          {/* Services Description */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              3. Services Description
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow provides:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li><strong>Trading Signals:</strong> AI-generated trading signals and market analysis for educational purposes</li>
              <li><strong>Educational Content:</strong> Tutorials, guides, webinars, and other educational materials</li>
              <li><strong>Market News:</strong> Aggregated financial news and market commentary</li>
              <li><strong>Broker Referrals:</strong> Referral links to partner brokers like Exness</li>
              <li><strong>Community Features:</strong> Access to trading community and discussion forums</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px', fontWeight: 'bold' }}>
              IMPORTANT: TradeFlow is an educational platform. We do not provide financial advice, investment recommendations, or portfolio management services. We are not a registered investment advisor, broker-dealer, or financial institution.
            </p>
          </section>

          {/* User Accounts */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              4. User Accounts
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.1 Account Creation
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              To access certain features, you must create an account. When creating an account, you agree to:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized account access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.2 Account Security
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You are solely responsible for maintaining the security of your account credentials. TradeFlow will not be liable for any loss or damage arising from your failure to protect your account information.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              4.3 Account Termination
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any other reason at our sole discretion. You may also close your account at any time through your account settings.
            </p>
          </section>

          {/* Subscriptions and Payments */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              5. Subscriptions and Payments
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.1 Subscription Plans
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              TradeFlow offers various subscription plans with different features and pricing. Current plans and pricing are available on our website. We reserve the right to modify subscription plans and pricing at any time with notice to subscribers.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.2 Billing and Renewals
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Subscriptions are billed in advance on a recurring basis (monthly, quarterly, or annually). By subscribing, you authorize us to charge your payment method automatically at the beginning of each billing period.
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>You will be notified of upcoming renewals via email</li>
              <li>Prices may change upon renewal with 30 days' notice</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.3 Payment Methods
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We accept payment via credit card, debit card, and other methods as indicated on our website. All payments are processed securely through third-party payment processors (Stripe, PayPal).
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              5.4 Taxes
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              All prices are exclusive of applicable taxes. You are responsible for paying all taxes, duties, and governmental charges associated with your subscription.
            </p>
          </section>

          {/* Refund Policy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              6. Refund Policy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We offer a <strong>7-day money-back guarantee</strong> for first-time subscribers. If you are not satisfied with our service within the first 7 days, you may request a full refund by contacting support@tradeflow.com.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              After the 7-day period:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>No refunds are provided for partial billing periods</li>
              <li>Cancellation stops future charges but does not refund the current billing period</li>
              <li>You retain access to services until the end of your paid period</li>
              <li>Refunds may be granted at our sole discretion in exceptional circumstances</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Refunds are processed within 10 business days to the original payment method.
            </p>
          </section>

          {/* Cancellation */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              7. Cancellation
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              You may cancel your subscription at any time through your account settings or by contacting support. Upon cancellation:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Your subscription will not renew at the end of the current billing period</li>
              <li>You will retain access to premium features until the end of your paid period</li>
              <li>No prorated refunds are provided for unused time</li>
              <li>Your account data will be retained according to our <a href="/privacy" style={{ color: '#667eea', textDecoration: 'underline' }}>Privacy Policy</a></li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              8. Intellectual Property Rights
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.1 Our Content
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              All content on TradeFlow, including but not limited to text, graphics, logos, icons, images, trading signals, analysis, software, and data compilations, is the exclusive property of TradeFlow or its licensors and is protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.2 Limited License
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for personal, non-commercial purposes only. You may not:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Copy, modify, distribute, or create derivative works from our content</li>
              <li>Reverse engineer, decompile, or disassemble any software or algorithms</li>
              <li>Use automated systems (bots, scrapers) to access our services</li>
              <li>Resell, sublicense, or redistribute our signals or content</li>
              <li>Remove or modify any copyright, trademark, or proprietary notices</li>
              <li>Use our content for commercial purposes without written permission</li>
            </ul>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              8.3 User Content
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              If you submit content to TradeFlow (comments, feedback, suggestions), you grant us a worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, modify, and display such content for any purpose.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              9. Prohibited Activities
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Use the services for illegal activities or fraud</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Share your account credentials with others</li>
              <li>Interfere with or disrupt the services or servers</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload viruses, malware, or malicious code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Collect or harvest user information without consent</li>
              <li>Use the services to manipulate markets or engage in market abuse</li>
              <li>Provide false or misleading information</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              10. Disclaimers
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.1 Educational Purpose
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px', fontWeight: 'bold' }}>
              TRADEFLOW IS AN EDUCATIONAL PLATFORM. ALL TRADING SIGNALS, ANALYSIS, AND CONTENT ARE PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. THEY DO NOT CONSTITUTE FINANCIAL, INVESTMENT, LEGAL, OR TAX ADVICE.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.2 No Guarantee of Results
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We make no guarantees regarding the accuracy, completeness, or profitability of our trading signals or analysis. Past performance does not guarantee future results. Trading involves substantial risk of loss.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.3 "As Is" Service
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED ACCESS.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              10.4 Third-Party Services
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              We are not responsible for the actions, content, or services of third parties, including broker partners like Exness. Any relationship you establish with third parties is at your own risk.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              11. Limitation of Liability
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px', fontWeight: 'bold' }}>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRADEFLOW AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST DATA, OR TRADING LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              Some jurisdictions do not allow the exclusion or limitation of certain damages, so the above limitations may not apply to you.
            </p>
          </section>

          {/* Indemnification */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              12. Indemnification
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              You agree to indemnify, defend, and hold harmless TradeFlow and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Your use of our services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your trading activities and decisions</li>
              <li>Any content you submit or share</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              13. Dispute Resolution
            </h2>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              13.1 Informal Resolution
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you have any dispute with TradeFlow, you agree to first contact us at legal@tradeflow.com and attempt to resolve the dispute informally for at least 30 days.
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              13.2 Binding Arbitration
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If informal resolution fails, any dispute arising out of or relating to these Terms or the services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association (AAA).
            </p>

            <h3 style={{ fontSize: '1.6em', color: '#764ba2', marginBottom: '15px', marginTop: '30px' }}>
              13.3 Class Action Waiver
            </h3>
            <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
              You agree to resolve disputes with us only on an individual basis and waive any right to participate in a class action lawsuit or class-wide arbitration.
            </p>
          </section>

          {/* Governing Law */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              14. Governing Law and Jurisdiction
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              You agree to submit to the exclusive jurisdiction of the courts located in New York, New York for any disputes not subject to arbitration.
            </p>
          </section>

          {/* Changes to Terms */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              15. Changes to These Terms
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Posting the updated Terms with a new "Last Updated" date</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on our website</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              Your continued use of the services after changes become effective constitutes acceptance of the updated Terms. If you do not agree to the changes, you must stop using the services and cancel your account.
            </p>
          </section>

          {/* Service Availability */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              16. Service Availability
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              We strive to provide reliable service but cannot guarantee uninterrupted access. The services may be unavailable due to:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Scheduled maintenance</li>
              <li>Technical issues or system failures</li>
              <li>Network or internet outages</li>
              <li>Force majeure events</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              We are not liable for any losses resulting from service unavailability or interruptions.
            </p>
          </section>

          {/* Data and Privacy */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              17. Data and Privacy
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Your use of the services is also governed by our <a href="/privacy" style={{ color: '#667eea', textDecoration: 'underline' }}>Privacy Policy</a>, which is incorporated into these Terms by reference. Please review the Privacy Policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          {/* Communications */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              18. Communications
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              By using TradeFlow, you consent to receive electronic communications from us, including:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Trading signals and market alerts</li>
              <li>Service notifications and updates</li>
              <li>Billing and account information</li>
              <li>Marketing and promotional materials (you may opt out)</li>
              <li>Legal notices and policy updates</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              You agree that all electronic communications satisfy any legal requirement that communications be in writing.
            </p>
          </section>

          {/* Prohibited Jurisdictions */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              19. Prohibited Jurisdictions
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              Our services are not available to residents of certain jurisdictions where trading signals or financial services are restricted. Prohibited jurisdictions include, but are not limited to:
            </p>
            <ul style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginLeft: '30px' }}>
              <li>Countries subject to U.S. sanctions (e.g., Iran, North Korea, Syria, Cuba)</li>
              <li>Jurisdictions where our services would violate local laws</li>
            </ul>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginTop: '15px' }}>
              It is your responsibility to ensure compliance with your local laws. We reserve the right to restrict access from any jurisdiction at our discretion.
            </p>
          </section>

          {/* Severability */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              20. Severability and Waiver
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.
            </p>
          </section>

          {/* Entire Agreement */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              21. Entire Agreement
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333' }}>
              These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and TradeFlow regarding the use of our services and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* Contact Information */}
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2em', color: '#667eea', marginBottom: '20px', borderBottom: '3px solid #667eea', paddingBottom: '10px' }}>
              22. Contact Information
            </h2>
            <p style={{ fontSize: '1.15em', lineHeight: '1.8', color: '#333', marginBottom: '15px' }}>
              If you have questions about these Terms, please contact us:
            </p>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Email:</strong> legal@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333', marginBottom: '10px' }}>
                <strong>Support:</strong> support@tradeflow.com
              </p>
              <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#333' }}>
                <strong>Mail:</strong> TradeFlow Legal Department<br />
                123 Trading Street, Financial District<br />
                New York, NY 10004, United States
              </p>
            </div>
          </section>

          {/* Important Risk Warning */}
          <section style={{ background: '#fff3cd', padding: '30px', borderRadius: '15px', borderLeft: '5px solid #ffc107' }}>
            <h3 style={{ fontSize: '1.5em', color: '#856404', marginBottom: '15px' }}>Risk Warning</h3>
            <p style={{ fontSize: '1.05em', lineHeight: '1.6', color: '#856404' }}>
              Trading in financial markets carries substantial risk and may result in the loss of your entire investment. Our signals and content are for educational purposes only and do not constitute financial advice. You should carefully consider your investment objectives, level of experience, and risk appetite before trading. Always consult with a licensed financial advisor. See our <a href="/risk" style={{ color: '#856404', textDecoration: 'underline', fontWeight: 'bold' }}>Risk Disclosure</a> for more information.
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
