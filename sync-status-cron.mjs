/**
 * Automated Status Sync Cron Job
 *
 * Run: node sync-status-cron.mjs
 *
 * This script runs continuously and syncs lead statuses every hour
 * Perfect for production deployment to track conversions automatically
 */

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SYNC_INTERVAL_HOURS = 1; // Sync every hour
const SYNC_DAYS = 7; // Check leads from last 7 days

console.log('🤖 Trading CRM Status Sync - Automated Service');
console.log('═'.repeat(60));
console.log(`• API URL: ${API_URL}`);
console.log(`• Sync Interval: Every ${SYNC_INTERVAL_HOURS} hour(s)`);
console.log(`• Sync Window: Last ${SYNC_DAYS} days`);
console.log('═'.repeat(60));
console.log('');

/**
 * Perform a single sync operation
 */
async function syncLeadStatuses() {
  const timestamp = new Date().toLocaleString();
  console.log(`\n[${timestamp}] 🔄 Starting status sync...`);

  try {
    const response = await fetch(`${API_URL}/api/trading-crm/sync-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        syncAll: true,
        days: SYNC_DAYS,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log(`✅ Sync completed successfully!`);
      console.log(`   • Leads Synced: ${data.synced}`);
      console.log(`   • Database Updates: ${data.updated}`);
      console.log(`   • Conversions Found: ${data.conversions} 💰`);

      // Show new conversions if any
      if (data.conversions > 0 && data.leads) {
        const ftdLeads = data.leads.filter(l => l.ftd);
        if (ftdLeads.length > 0) {
          console.log('\n   🎉 FTD Conversions:');
          ftdLeads.forEach(lead => {
            console.log(`      • ${lead.email} - ${lead.status}`);
          });
        }
      }
    } else {
      console.log(`❌ Sync failed: ${data.error}`);
    }

  } catch (error) {
    console.log(`❌ Error during sync: ${error.message}`);
  }
}

/**
 * Get current sync statistics
 */
async function getStats() {
  try {
    const response = await fetch(`${API_URL}/api/trading-crm/sync-status`);
    const data = await response.json();

    if (data.success) {
      console.log('\n📊 Current Statistics:');
      console.log(`   • Total Synced: ${data.stats.totalSynced}`);
      console.log(`   • Conversions: ${data.stats.conversions}`);
      console.log(`   • Conversion Rate: ${data.stats.conversionRate}`);
      console.log(`   • Last Sync: ${data.stats.lastSync || 'Never'}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not fetch stats: ${error.message}`);
  }
}

/**
 * Main loop - runs sync at intervals
 */
async function startCronJob() {
  console.log('🚀 Cron job started!\n');
  console.log(`Next sync in ${SYNC_INTERVAL_HOURS} hour(s)...\n`);

  // Run initial sync immediately
  await syncLeadStatuses();
  await getStats();

  // Set up interval (convert hours to milliseconds)
  const intervalMs = SYNC_INTERVAL_HOURS * 60 * 60 * 1000;

  setInterval(async () => {
    await syncLeadStatuses();
    await getStats();
  }, intervalMs);
}

/**
 * Test mode - run once and exit
 */
async function testMode() {
  console.log('🧪 Running in TEST MODE (single sync, then exit)\n');

  await syncLeadStatuses();
  await getStats();

  console.log('\n✅ Test completed! Run without --test flag for continuous mode.\n');
  process.exit(0);
}

// Check for test mode
const isTestMode = process.argv.includes('--test');

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Shutting down cron job...');
  console.log('Goodbye! 👋\n');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n⏹️  Received SIGTERM, shutting down...');
  process.exit(0);
});

// Start the cron job
if (isTestMode) {
  testMode();
} else {
  startCronJob();
}
