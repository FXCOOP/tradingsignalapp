#!/usr/bin/env node
/**
 * Update Exness Click Tracking
 * Adds email tracking to the 30-minute popup
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the onClick handler
const oldOnClick = `onClick={() => {
                // Track conversion
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'exness_click', {
                    event_category: '30min_popup',
                    event_label: 'cpa_offer'
                  })
                }
              }}`;

const newOnClick = `onClick={async () => {
                // Track in Google Analytics
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'exness_click', {
                    event_category: '30min_popup',
                    event_label: 'cpa_offer'
                  })
                }

                // ✅ Track click in database with email
                try {
                  const token = localStorage.getItem('tradeflow_token')
                  if (token && user) {
                    const response = await fetch('/api/track/exness-click', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${token}\`
                      },
                      body: JSON.stringify({
                        partner_id: 'c_8f0nxidtbt',
                        click_url: 'https://one.exnesstrack.org/a/ckdhtel03',
                        user_email: user.email
                      })
                    })
                    const data = await response.json()
                    console.log('✅ Click tracked:', data.click_id)
                  } else {
                    console.warn('⚠️ User not logged in - please log in to track clicks')
                  }
                } catch (error) {
                  console.error('❌ Failed to track click:', error)
                }
              }}`;

if (content.includes(oldOnClick)) {
  content = content.replace(oldOnClick, newOnClick);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Updated page.tsx onClick handler');
} else {
  console.log('⚠️ onClick handler already updated or not found');
}
