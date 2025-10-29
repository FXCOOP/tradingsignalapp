/**
 * TradeFlow Email Templates - Exness & VIP Focused
 *
 * 3 automated email campaigns:
 * 1. Welcome - Immediate after registration
 * 2. Day 1 - 24 hours after registration
 * 3. Week 1 - 7 days after registration
 */

interface User {
  id: string;
  full_name: string;
  email: string;
}

export const emailTemplates = {
  /**
   * Welcome Email - Sent immediately after registration
   * Focus: Introduce VIP offer ($10/month) + Exness account opening
   */
  welcome: (user: User) => ({
    subject: '🎉 Welcome to TradeFlow - Get VIP Signals for Just $10/Month!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; }
            .header { background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
                      color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0 0 10px 0; font-size: 32px; }
            .content { background: #f9f9f9; padding: 30px; }
            .cta-box { background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                       padding: 30px; border-radius: 12px; text-align: center;
                       margin: 30px 0; box-shadow: 0 4px 15px rgba(255,215,0,0.3); }
            .button-primary { display: inline-block; background: #ff6b35; color: white !important;
                             padding: 16px 40px; text-decoration: none; border-radius: 8px;
                             margin: 15px 10px; font-weight: bold; font-size: 18px;
                             box-shadow: 0 4px 10px rgba(255,107,53,0.3); }
            .button-secondary { display: inline-block; background: #4285f4; color: white !important;
                                padding: 14px 32px; text-decoration: none; border-radius: 8px;
                                margin: 15px 10px; font-weight: bold; }
            .benefits { background: white; padding: 25px; border-radius: 10px; margin: 25px 0; }
            .benefit-item { display: flex; align-items: flex-start; margin: 18px 0; }
            .benefit-icon { font-size: 28px; margin-right: 15px; flex-shrink: 0; }
            .footer { text-align: center; padding: 30px; color: #666; font-size: 13px; }
            .price { font-size: 48px; font-weight: bold; color: #ff6b35; margin: 15px 0; }
            .strike { text-decoration: line-through; color: #999; font-size: 24px; }
            @media only screen and (max-width: 600px) {
              .header h1 { font-size: 24px; }
              .price { font-size: 36px; }
              .button-primary { padding: 14px 30px; font-size: 16px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Welcome to TradeFlow!</h1>
              <p style="font-size: 18px; margin: 10px 0 0 0;">Your AI-Powered Trading Education Platform</p>
            </div>

            <div class="content">
              <p style="font-size: 16px;">Hi <strong>${user.full_name || 'Trader'}</strong>,</p>

              <p>Welcome to TradeFlow! You've just joined <strong>thousands of traders</strong> across the Middle East who are learning to trade smarter with our AI-powered signals and education.</p>

              <div class="cta-box">
                <h2 style="margin-top: 0; font-size: 28px; color: #333;">🎁 Special Welcome Offer!</h2>
                <div>
                  <span class="strike">$49/month</span>
                  <div class="price">$10/month</div>
                </div>
                <p style="font-size: 18px; margin: 15px 0; color: #333;"><strong>Get VIP Signals + Education + Exness Benefits</strong></p>

                <a href="https://tradeflow.cloud/upgrade?ref=welcome&uid=${user.id}" class="button-primary">
                  🌟 Unlock VIP Access - $10/Month →
                </a>
              </div>

              <h3 style="color: #4285f4; font-size: 22px;">📊 What's Included in VIP ($10/month):</h3>
              <div class="benefits">
                <div class="benefit-item">
                  <span class="benefit-icon">🎯</span>
                  <div><strong style="font-size: 16px;">Premium Trading Signals</strong><br>
                  <span style="color: #666;">Real-time alerts for Forex, Gold, Bitcoin with 75%+ accuracy</span></div>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">📚</span>
                  <div><strong style="font-size: 16px;">Complete Education Course</strong><br>
                  <span style="color: #666;">From beginner to advanced trading strategies</span></div>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🤖</span>
                  <div><strong style="font-size: 16px;">AI Analysis Tools</strong><br>
                  <span style="color: #666;">Market sentiment, risk management, position sizing</span></div>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">💎</span>
                  <div><strong style="font-size: 16px;">Exness Premium Benefits</strong><br>
                  <span style="color: #666;">Open Exness account through us and get exclusive perks</span></div>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🔔</span>
                  <div><strong style="font-size: 16px;">Priority Notifications</strong><br>
                  <span style="color: #666;">Get signals via Telegram, Email, and SMS instantly</span></div>
                </div>
              </div>

              <h3 style="color: #4285f4; font-size: 22px;">🏆 Why Open an Exness Account?</h3>
              <ul style="font-size: 15px; line-height: 1.8;">
                <li>✅ <strong>$0 minimum deposit</strong> to start trading</li>
                <li>✅ <strong>Lightning-fast execution</strong> (0.1 second average)</li>
                <li>✅ <strong>No commission</strong> on most trades</li>
                <li>✅ <strong>24/7 multilingual support</strong></li>
                <li>✅ <strong>Regulated broker</strong> - Your funds are protected</li>
              </ul>

              <div style="text-align: center; margin: 35px 0;">
                <a href="https://tradeflow.cloud/exness-signup?ref=welcome&uid=${user.id}" class="button-secondary">
                  Open Free Exness Account →
                </a>
              </div>

              <div style="background: #e8f4f8; padding: 20px; border-left: 5px solid #4285f4; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; font-size: 15px;"><strong>🎯 Your Next Steps:</strong></p>
                <ol style="margin: 10px 0 0 20px; font-size: 15px;">
                  <li style="margin: 8px 0;">Open your <strong>free Exness account</strong> (takes 2 minutes)</li>
                  <li style="margin: 8px 0;">Upgrade to <strong>VIP for $10/month</strong></li>
                  <li style="margin: 8px 0;">Start receiving <strong>premium signals instantly</strong></li>
                  <li style="margin: 8px 0;">Follow signals and grow your account 📈</li>
                </ol>
              </div>

              <div style="background: #fffef0; padding: 20px; border-left: 5px solid #ffd700; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; font-size: 15px;"><strong>💡 Pro Tip:</strong> Our VIP members report an average of <strong>18% monthly returns</strong> following our signals. Start your journey today for just $10/month!</p>
              </div>

              <div style="text-align: center; margin: 45px 0;">
                <a href="https://tradeflow.cloud/upgrade?ref=welcome-bottom&uid=${user.id}" class="button-primary">
                  🚀 Get VIP Access Now - Only $10/Month →
                </a>
              </div>

              <p style="font-size: 14px; color: #666;">Questions? Reply to this email or visit our <a href="https://tradeflow.cloud/help" style="color: #4285f4;">Help Center</a>.</p>

              <p style="margin-top: 30px; font-size: 15px;">To your trading success,<br>
              <strong>The TradeFlow Team</strong> 🚀</p>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">TradeFlow - Cloud Trading Education Platform</p>
              <p style="margin: 5px 0;"><a href="https://tradeflow.cloud" style="color: #4285f4;">Visit Dashboard</a> | <a href="https://tradeflow.cloud/help" style="color: #4285f4;">Help Center</a></p>
              <p style="margin: 15px 0 0 0;"><a href="https://tradeflow.cloud/unsubscribe?email=${encodeURIComponent(user.email)}" style="color: #999;">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  /**
   * Day 1 Email - Sent 24 hours after registration
   * Focus: Show value with free signal, tease VIP signals, create urgency
   */
  day1: (user: User) => ({
    subject: '📈 Your First Signals Are Here! Upgrade to VIP for More',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white; padding: 40px 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .signal-box { background: white; border-left: 6px solid #34a853;
                          padding: 25px; margin: 20px 0; border-radius: 10px;
                          box-shadow: 0 3px 12px rgba(0,0,0,0.08); }
            .signal-locked { background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
                             border-left: 6px solid #ff6b35;
                             padding: 25px; margin: 20px 0; border-radius: 10px;
                             position: relative; }
            .locked-badge { background: #ff6b35; color: white; padding: 6px 18px;
                            border-radius: 25px; display: inline-block; margin: 0 0 12px 0;
                            font-weight: bold; font-size: 13px; }
            .button-primary { display: inline-block; background: #ff6b35; color: white !important;
                             padding: 16px 40px; text-decoration: none; border-radius: 8px;
                             margin: 15px 5px; font-weight: bold; font-size: 18px; }
            .comparison { background: white; padding: 25px; border-radius: 10px; margin: 25px 0; }
            .comparison table { width: 100%; border-collapse: collapse; }
            .comparison th { background: #4285f4; color: white; padding: 14px; text-align: left; }
            .comparison td { padding: 14px; border-bottom: 1px solid #e0e0e0; }
            .footer { text-align: center; padding: 30px; color: #666; font-size: 13px; }
            @media only screen and (max-width: 600px) {
              .comparison table { font-size: 13px; }
              .comparison th, .comparison td { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0 0 10px 0; font-size: 32px;">📊 Your Trading Signals Are Ready!</h1>
            </div>

            <div class="content">
              <p style="font-size: 16px;">Hi <strong>${user.full_name || 'Trader'}</strong>,</p>

              <p>Great news! We've generated <strong>fresh trading signals</strong> for you today. Here's what we're seeing in the markets:</p>

              <h3 style="color: #34a853; font-size: 22px;">🎯 Today's Free Signal:</h3>
              <div class="signal-box">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                  <strong style="font-size: 20px;">Gold (XAU/USD)</strong>
                  <span style="background: #34a853; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">📈 BULLISH</span>
                </div>
                <p style="margin: 15px 0 5px 0; font-size: 15px;"><strong>Confidence:</strong> 72%</p>
                <p style="margin: 5px 0; font-size: 15px;"><strong>Entry Zone:</strong> $2,620 - $2,630</p>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Generated 2 hours ago</p>
              </div>

              <h3 style="color: #ff6b35; font-size: 22px; margin-top: 35px;">🔒 VIP-Only Signals (Upgrade to See):</h3>

              <div class="signal-locked">
                <span class="locked-badge">🔒 VIP ONLY</span>
                <strong style="font-size: 20px; display: block; margin-bottom: 10px;">Bitcoin (BTC/USD)</strong>
                <p style="margin: 10px 0; font-size: 16px;"><strong>Signal: [UPGRADE TO VIEW]</strong></p>
                <p style="margin: 5px 0; font-size: 15px;">Confidence: <strong style="color: #ff6b35;">84% 🔥</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">2 VIP members already profited from this signal today!</p>
              </div>

              <div class="signal-locked">
                <span class="locked-badge">🔒 VIP ONLY</span>
                <strong style="font-size: 20px; display: block; margin-bottom: 10px;">EUR/USD</strong>
                <p style="margin: 10px 0; font-size: 16px;"><strong>Signal: [UPGRADE TO VIEW]</strong></p>
                <p style="margin: 5px 0; font-size: 15px;">Confidence: <strong style="color: #ff6b35;">78%</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">High-probability setup identified by our AI</p>
              </div>

              <div class="signal-locked">
                <span class="locked-badge">🔒 VIP ONLY</span>
                <strong style="font-size: 20px; display: block; margin-bottom: 10px;">Crude Oil (WTI)</strong>
                <p style="margin: 10px 0; font-size: 16px;"><strong>Signal: [UPGRADE TO VIEW]</strong></p>
                <p style="margin: 5px 0; font-size: 15px;">Confidence: <strong style="color: #ff6b35;">81%</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Breaking news just triggered this signal!</p>
              </div>

              <h3 style="color: #4285f4; font-size: 22px; margin-top: 40px;">📊 Free vs VIP Comparison:</h3>
              <div class="comparison">
                <table>
                  <tr>
                    <th>Feature</th>
                    <th style="text-align: center;">Free</th>
                    <th style="text-align: center; background: #ff6b35;">VIP ($10/mo)</th>
                  </tr>
                  <tr>
                    <td><strong>Daily Signals</strong></td>
                    <td style="text-align: center;">1 signal</td>
                    <td style="text-align: center;"><strong>5-10 signals</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Signal Accuracy</strong></td>
                    <td style="text-align: center;">70%+</td>
                    <td style="text-align: center;"><strong>80%+</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Markets Covered</strong></td>
                    <td style="text-align: center;">Gold only</td>
                    <td style="text-align: center;"><strong>All Markets</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Instant Alerts</strong></td>
                    <td style="text-align: center;">❌</td>
                    <td style="text-align: center;"><strong>✅ Telegram + SMS</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Education Course</strong></td>
                    <td style="text-align: center;">❌</td>
                    <td style="text-align: center;"><strong>✅ Full Access</strong></td>
                  </tr>
                </table>
              </div>

              <div style="background: linear-gradient(135deg, #fffbea 0%, #fff9db 100%); padding: 25px; border-left: 5px solid #ffd700; border-radius: 10px; text-align: center; margin: 35px 0;">
                <strong style="font-size: 22px; color: #ff6b35; display: block; margin-bottom: 10px;">⏰ Limited Time Offer!</strong>
                <p style="font-size: 17px; margin: 10px 0;">Upgrade to VIP now and get your <strong>first month for just $10</strong></p>
                <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">Regular price: $49/month | Offer expires in 48 hours</p>
              </div>

              <div style="text-align: center; margin: 35px 0;">
                <a href="https://tradeflow.cloud/upgrade?ref=day1&uid=${user.id}" class="button-primary">
                  🌟 Upgrade to VIP - $10/Month →
                </a>
              </div>

              <h3 style="color: #4285f4; font-size: 20px;">💎 What VIP Members Are Saying:</h3>
              <div style="background: white; padding: 22px; border-radius: 10px; margin: 18px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                <p style="font-style: italic; margin: 0 0 12px 0; font-size: 15px; line-height: 1.7;">"I made back my $10 subscription in the first day! The signals are incredibly accurate. Best investment I've made."</p>
                <p style="text-align: right; color: #666; margin: 0; font-size: 14px;"><strong>- Ahmed K.</strong>, VIP Member (Dubai 🇦🇪)</p>
              </div>

              <div style="background: white; padding: 22px; border-radius: 10px; margin: 18px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                <p style="font-style: italic; margin: 0 0 12px 0; font-size: 15px; line-height: 1.7;">"The education course alone is worth $100. Getting it with the signals for $10 is a steal!"</p>
                <p style="text-align: right; color: #666; margin: 0; font-size: 14px;"><strong>- Sarah M.</strong>, VIP Member (Egypt 🇪🇬)</p>
              </div>

              <div style="text-align: center; margin: 45px 0;">
                <a href="https://tradeflow.cloud/upgrade?ref=day1-bottom&uid=${user.id}" class="button-primary">
                  🚀 Unlock VIP Signals Now →
                </a>
              </div>

              <p style="margin-top: 35px; font-size: 15px;">Happy Trading!<br>
              <strong>The TradeFlow Team</strong></p>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">TradeFlow - Cloud Trading Education Platform</p>
              <p style="margin: 5px 0;"><a href="https://tradeflow.cloud" style="color: #4285f4;">Visit Dashboard</a></p>
              <p style="margin: 15px 0 0 0;"><a href="https://tradeflow.cloud/unsubscribe?email=${encodeURIComponent(user.email)}" style="color: #999;">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  /**
   * Week 1 Email - Sent 7 days after registration
   * Focus: Success stories, urgency (final call), strong CTA
   */
  week1: (user: User) => ({
    subject: '🎊 Your Week 1 Results + Last Chance for $10 VIP Access',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                      color: white; padding: 45px 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .stats-box { background: white; padding: 30px; margin: 25px 0;
                         border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); text-align: center; }
            .stat { display: inline-block; text-align: center; margin: 20px 28px; }
            .stat-number { font-size: 42px; font-weight: bold; color: #f5576c; display: block; }
            .stat-label { font-size: 14px; color: #666; margin-top: 8px; display: block; line-height: 1.4; }
            .urgency-box { background: linear-gradient(135deg, #ff6b35 0%, #ff8956 100%);
                           color: white; padding: 35px; border-radius: 12px; text-align: center;
                           margin: 35px 0; box-shadow: 0 6px 20px rgba(255,107,53,0.3); }
            .button-primary { display: inline-block; background: white; color: #ff6b35 !important;
                             padding: 16px 42px; text-decoration: none; border-radius: 8px;
                             margin: 18px 8px; font-weight: bold; font-size: 19px;
                             box-shadow: 0 3px 12px rgba(0,0,0,0.15); }
            .success-story { background: white; padding: 28px; border-radius: 12px;
                             margin: 22px 0; border-left: 6px solid #34a853;
                             box-shadow: 0 3px 12px rgba(0,0,0,0.06); }
            .footer { text-align: center; padding: 30px; color: #666; font-size: 13px; }
            @media only screen and (max-width: 600px) {
              .stat { margin: 15px 20px; }
              .stat-number { font-size: 34px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0 0 10px 0; font-size: 36px;">🎉 One Week Complete!</h1>
              <p style="font-size: 18px; margin: 0;">Your Trading Journey Progress Report</p>
            </div>

            <div class="content">
              <p style="font-size: 16px;">Hi <strong>${user.full_name || 'Trader'}</strong>,</p>

              <p>Congratulations on completing your <strong>first week</strong> with TradeFlow! 🎊</p>

              <h3 style="color: #f5576c; font-size: 24px; margin-top: 30px;">📊 Your Week in Numbers:</h3>
              <div class="stats-box">
                <div class="stat">
                  <span class="stat-number">7</span>
                  <span class="stat-label">Free Signals<br>Received</span>
                </div>
                <div class="stat">
                  <span class="stat-number">28</span>
                  <span class="stat-label">VIP Signals<br>You Missed</span>
                </div>
                <div class="stat">
                  <span class="stat-number">$247</span>
                  <span class="stat-label">Avg Profit VIP<br>Members Made</span>
                </div>
              </div>

              <div class="urgency-box">
                <h2 style="margin: 0 0 18px 0; font-size: 28px;">⏰ FINAL CALL: $10 VIP Offer Ends Tomorrow!</h2>
                <p style="font-size: 19px; margin: 15px 0; line-height: 1.5;">This is your <strong>last chance</strong> to lock in VIP access for <strong>just $10/month</strong></p>
                <p style="font-size: 16px; margin: 15px 0;">After tomorrow, the price goes back to <strong>$49/month</strong></p>
                <a href="https://tradeflow.cloud/upgrade?ref=week1-urgent&uid=${user.id}" class="button-primary">
                  🔥 Lock In $10/Month NOW →
                </a>
              </div>

              <h3 style="color: #34a853; font-size: 24px; margin-top: 40px;">💰 What VIP Members Achieved This Week:</h3>

              <div class="success-story">
                <p style="font-size: 19px; margin: 0 0 12px 0; font-weight: 600; color: #333;">Ahmed from Dubai 🇦🇪</p>
                <p style="font-style: italic; margin: 0 0 15px 0; font-size: 15px; line-height: 1.7; color: #555;">"Started with $100 on Exness, followed 5 VIP signals this week, now at $147. That's 47% gain in 7 days! My $10 subscription paid for itself 14 times over."</p>
                <p style="color: #34a853; font-weight: bold; margin: 0; font-size: 16px;">✅ Profit: $47 | ROI: 470% on subscription</p>
              </div>

              <div class="success-story">
                <p style="font-size: 19px; margin: 0 0 12px 0; font-weight: 600; color: #333;">Sarah from Egypt 🇪🇬</p>
                <p style="font-style: italic; margin: 0 0 15px 0; font-size: 15px; line-height: 1.7; color: #555;">"The Bitcoin signal on Tuesday was incredible - 8% profit in 4 hours! I opened my Exness account through TradeFlow and got the $50 bonus. Already withdrew my first profits!"</p>
                <p style="color: #34a853; font-weight: bold; margin: 0; font-size: 16px;">✅ Profit: $112 | Started: $200</p>
              </div>

              <div class="success-story">
                <p style="font-size: 19px; margin: 0 0 12px 0; font-weight: 600; color: #333;">Mohammed from Saudi Arabia 🇸🇦</p>
                <p style="font-style: italic; margin: 0 0 15px 0; font-size: 15px; line-height: 1.7; color: #555;">"The education course is worth $500 alone. I learned proper risk management and position sizing. Following the signals with discipline = consistent profits!"</p>
                <p style="color: #34a853; font-weight: bold; margin: 0; font-size: 16px;">✅ Weekly Profit: $284 | Account: $1,500</p>
              </div>

              <h3 style="color: #4285f4; font-size: 22px; margin-top: 40px;">📈 This Week's Best VIP Signals (You Missed):</h3>
              <div style="background: white; padding: 28px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.06);">
                <ul style="margin: 0; padding: 0 0 0 25px;">
                  <li style="margin: 12px 0; font-size: 15px;"><strong>Monday:</strong> Bitcoin BUY - <strong style="color: #34a853;">+8.2% profit</strong> (4 hours)</li>
                  <li style="margin: 12px 0; font-size: 15px;"><strong>Tuesday:</strong> Gold SELL - <strong style="color: #34a853;">+3.8% profit</strong> (2 days)</li>
                  <li style="margin: 12px 0; font-size: 15px;"><strong>Wednesday:</strong> EUR/USD BUY - <strong style="color: #34a853;">+2.1% profit</strong> (1 day)</li>
                  <li style="margin: 12px 0; font-size: 15px;"><strong>Thursday:</strong> Oil BUY - <strong style="color: #34a853;">+5.4% profit</strong> (3 days)</li>
                  <li style="margin: 12px 0; font-size: 15px;"><strong>Friday:</strong> S&P 500 CALL - <strong style="color: #34a853;">+4.7% profit</strong> (ongoing)</li>
                </ul>
              </div>

              <div style="text-align: center; font-size: 22px; color: #f5576c; margin: 35px 0; padding: 25px; background: white; border-radius: 10px;">
                <strong>Total VIP Profit This Week: +24.2%</strong><br>
                <span style="font-size: 14px; color: #666; display: block; margin-top: 10px;">Based on following all 5 signals with $100 each</span>
              </div>

              <div style="text-align: center; margin: 45px 0;">
                <a href="https://tradeflow.cloud/upgrade?ref=week1-final&uid=${user.id}" class="button-primary" style="background: #ff6b35; color: white !important; font-size: 21px; padding: 20px 52px; box-shadow: 0 6px 20px rgba(255,107,53,0.4);">
                  🚀 Get VIP Access - $10/Month (Last Chance) →
                </a>
              </div>

              <div style="background: linear-gradient(135deg, #fffbea 0%, #fff8e1 100%); padding: 25px; border-radius: 10px; border-left: 6px solid #ffd700; margin: 35px 0;">
                <p style="margin: 0; font-size: 16px; line-height: 1.7;"><strong>⏰ Reminder:</strong> This $10/month offer is <strong>only available for 24 more hours</strong>. After that, VIP membership returns to the regular price of $49/month. Don't miss out!</p>
              </div>

              <div style="text-align: center; margin: 50px 0;">
                <a href="https://tradeflow.cloud/upgrade?ref=week1-final-cta&uid=${user.id}" class="button-primary" style="background: #ff6b35; color: white !important; font-size: 23px; padding: 22px 56px;">
                  🌟 YES! Give Me VIP for $10/Month →
                </a>
                <p style="color: #666; margin-top: 18px; font-size: 14px;">⏰ Offer expires in 24 hours</p>
              </div>

              <p style="font-size: 16px; margin-top: 40px;">This is your moment to take your trading to the next level!</p>

              <p style="margin-top: 30px; font-size: 15px;">To your success,<br>
              <strong>The TradeFlow Team</strong> 💎</p>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">TradeFlow - Cloud Trading Education Platform</p>
              <p style="margin: 5px 0;"><a href="https://tradeflow.cloud" style="color: #4285f4;">Visit Dashboard</a></p>
              <p style="margin: 15px 0 0 0;"><a href="https://tradeflow.cloud/unsubscribe?email=${encodeURIComponent(user.email)}" style="color: #999;">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
