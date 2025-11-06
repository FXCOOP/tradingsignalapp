/**
 * Test Status Sync Script
 *
 * Run: node test-status-sync.mjs
 *
 * This script tests the Trading CRM status sync functionality
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

console.log('🧪 Testing Trading CRM Status Sync\n');
console.log('═'.repeat(60));

// Test 1: Get sync statistics
async function testGetStats() {
  console.log('\n📊 Test 1: Getting Sync Statistics...\n');

  try {
    const response = await fetch(`${API_URL}/api/trading-crm/sync-status`);
    const data = await response.json();

    if (data.success) {
      console.log('✅ Stats retrieved successfully!');
      console.log('\nCurrent Status:');
      console.log(`  • Total Synced: ${data.stats.totalSynced}`);
      console.log(`  • Conversions (FTD): ${data.stats.conversions}`);
      console.log(`  • Conversion Rate: ${data.stats.conversionRate}`);
      console.log(`  • Last Sync: ${data.stats.lastSync || 'Never'}`);

      if (Object.keys(data.stats.statusBreakdown).length > 0) {
        console.log('\n  Status Breakdown:');
        Object.entries(data.stats.statusBreakdown).forEach(([status, count]) => {
          console.log(`    - ${status}: ${count}`);
        });
      }
    } else {
      console.log('❌ Error:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Test 2: Sync a single lead
async function testSyncSingleLead() {
  console.log('\n\n' + '═'.repeat(60));
  console.log('\n🔄 Test 2: Syncing Single Lead...\n');

  try {
    // Get the most recent lead with assigned_broker
    const { data: leads, error } = await supabase
      .from('signups')
      .select('id, email, assigned_broker, country')
      .eq('assigned_broker', 'Finoglob')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !leads || leads.length === 0) {
      console.log('⚠️  No assigned leads found. Skipping single lead sync test.');
      return;
    }

    const lead = leads[0];
    console.log(`Testing with lead: ${lead.email}`);
    console.log(`Lead ID: ${lead.id}`);
    console.log(`Country: ${lead.country}\n`);

    const response = await fetch(`${API_URL}/api/trading-crm/sync-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signupId: lead.id }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Lead synced successfully!');
      console.log(`  • Status: ${data.status}`);
      console.log(`  • Status Code: ${data.statusCode}`);
      console.log(`  • FTD Exists: ${data.ftdExists ? '💰 YES!' : 'No'}`);
      console.log(`  • TP Account: ${data.tpAccount || 'None'}`);
      console.log(`  • Database Updated: ${data.updated ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ Sync failed:', data.error);
      if (data.error.includes('not found')) {
        console.log('\n💡 This lead might not have been pushed to Trading CRM yet.');
        console.log('   Try pushing leads first, then sync statuses.');
      }
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Test 3: Sync all recent leads
async function testSyncAllRecent() {
  console.log('\n\n' + '═'.repeat(60));
  console.log('\n📥 Test 3: Syncing All Recent Leads (Last 7 Days)...\n');

  try {
    const response = await fetch(`${API_URL}/api/trading-crm/sync-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ syncAll: true, days: 7 }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Bulk sync completed!');
      console.log(`  • Total Synced: ${data.synced}`);
      console.log(`  • Updated in DB: ${data.updated}`);
      console.log(`  • Conversions Found: ${data.conversions} 💰`);

      if (data.leads && data.leads.length > 0) {
        console.log('\n  Recent Leads:');
        data.leads.slice(0, 5).forEach(lead => {
          const ftdBadge = lead.ftd ? '💰' : '';
          console.log(`    - ${lead.email}: ${lead.status} ${ftdBadge}`);
        });

        if (data.leads.length > 5) {
          console.log(`    ... and ${data.leads.length - 5} more`);
        }
      }
    } else {
      console.log('❌ Sync failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Test 4: Check database tables
async function testDatabaseTables() {
  console.log('\n\n' + '═'.repeat(60));
  console.log('\n🗄️  Test 4: Checking Database Tables...\n');

  try {
    // Check if status columns exist
    const { data: signups, error: signupsError } = await supabase
      .from('signups')
      .select('broker_status, ftd_exists, last_status_check')
      .limit(1);

    if (signupsError) {
      console.log('❌ Error checking signups table:', signupsError.message);
      console.log('💡 Run add-status-tracking-columns.sql first!');
      return;
    }

    console.log('✅ Signups table has status columns');

    // Check lead_status_history table
    const { error: historyError } = await supabase
      .from('lead_status_history')
      .select('id')
      .limit(1);

    if (historyError) {
      console.log('❌ lead_status_history table missing');
      console.log('💡 Run add-status-tracking-columns.sql first!');
    } else {
      console.log('✅ lead_status_history table exists');
    }

    // Check conversions table
    const { error: conversionsError } = await supabase
      .from('conversions')
      .select('id')
      .limit(1);

    if (conversionsError) {
      console.log('❌ conversions table missing');
      console.log('💡 Run add-status-tracking-columns.sql first!');
    } else {
      console.log('✅ conversions table exists');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting at:', new Date().toLocaleString());
  console.log('API URL:', API_URL);
  console.log('');

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log('❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    process.exit(1);
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    process.exit(1);
  }

  await testDatabaseTables();
  await testGetStats();
  await testSyncSingleLead();
  await testSyncAllRecent();

  console.log('\n\n' + '═'.repeat(60));
  console.log('\n✅ All tests completed!\n');
  console.log('Next steps:');
  console.log('  1. Check results in Supabase dashboard');
  console.log('  2. Set up automated sync with sync-status-cron.mjs');
  console.log('  3. Monitor conversions in the conversions table\n');
}

// Run tests
runAllTests().catch(console.error);
