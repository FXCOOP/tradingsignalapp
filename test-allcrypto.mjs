/**
 * Test script for AllCrypto Lead Distribution API integration
 *
 * This script tests:
 * 1. Pushing a test lead to AllCrypto
 * 2. Getting goal types
 * 3. Getting lead status
 *
 * Usage:
 * node test-allcrypto.mjs
 */

import fetch from 'node-fetch';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testPushLead() {
  log('\n📤 Test 1: Pushing test lead to AllCrypto...', 'cyan');

  const testLead = {
    signupId: 'test-' + Date.now(),
    firstName: 'John',
    lastName: 'Doe',
    email: `test+${Date.now()}@example.com`,
    phone: '+61412345678', // Australian phone number
    country: 'AU',
    language: 'en',
    ip: '203.0.113.1', // Test IP from Australia
    password: 'TestPass123!',
    tag: 'test_campaign',
    utmSource: 'test',
    utmCampaign: 'allcrypto_test',
    isTest: true, // This will add "test" to aff_sub5
    additionalInfo1: 'intermediate',
  };

  try {
    const response = await fetch(`${BASE_URL}/api/allcrypto/send-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLead),
    });

    const result = await response.json();

    if (result.success) {
      log('✅ Test lead pushed successfully!', 'green');
      log(`   Lead UUID: ${result.lead_uuid}`, 'green');
      log(`   Advertiser: ${result.advertiser_name}`, 'green');
      log(`   Auto-login URL: ${result.auto_login_url}`, 'green');
      return result.lead_uuid;
    } else {
      log(`❌ Failed to push test lead: ${result.error}`, 'red');
      log(`   Error Type: ${result.errorType}`, 'red');
      console.log('   Full response:', result);
      return null;
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    console.error(error);
    return null;
  }
}

async function testGetGoalTypes() {
  log('\n📊 Test 2: Getting goal types from AllCrypto...', 'cyan');

  try {
    const response = await fetch(`${BASE_URL}/api/allcrypto/goal-types`);
    const result = await response.json();

    if (result.success && result.goalTypes) {
      log('✅ Goal types retrieved successfully!', 'green');
      result.goalTypes.forEach((goalType, index) => {
        log(`   ${index + 1}. ${goalType.name} (UUID: ${goalType.uuid})`, 'green');
      });
    } else {
      log(`❌ Failed to get goal types: ${result.error}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    console.error(error);
  }
}

async function testGetLeadStatus(leadUuid) {
  if (!leadUuid) {
    log('\n⚠️  Test 3: Skipping lead status test (no lead UUID)', 'yellow');
    return;
  }

  log('\n🔍 Test 3: Getting lead status from AllCrypto...', 'cyan');

  try {
    const response = await fetch(`${BASE_URL}/api/allcrypto/get-status?lead_uuid=${leadUuid}`);
    const result = await response.json();

    if (result.success && result.lead) {
      log('✅ Lead status retrieved successfully!', 'green');
      log(`   UUID: ${result.lead.uuid}`, 'green');
      log(`   Email: ${result.lead.email}`, 'green');
      log(`   Country: ${result.lead.country}`, 'green');
      log(`   Goal Type: ${result.lead.goalType}`, 'green');
      log(`   Advertiser: ${result.lead.advertiserName}`, 'green');
      log(`   External ID: ${result.lead.externalId}`, 'green');
      log(`   Is Test: ${result.lead.isTest}`, 'green');
      log(`   Created At: ${result.lead.createdAt}`, 'green');
    } else {
      log(`❌ Failed to get lead status: ${result.error}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    console.error(error);
  }
}

async function testGetRecentLeads() {
  log('\n📋 Test 4: Getting recent leads from AllCrypto...', 'cyan');

  // Get leads from last 7 days
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    created_from: weekAgo.toISOString(),
    created_to: today.toISOString(),
    per_page: '10',
    is_test: 'true',
  });

  try {
    const response = await fetch(`${BASE_URL}/api/allcrypto/get-status?${params}`);
    const result = await response.json();

    if (result.success && result.leads) {
      log(`✅ Retrieved ${result.count} recent test leads!`, 'green');
      result.leads.forEach((lead, index) => {
        log(`   ${index + 1}. ${lead.email} (${lead.country}) - ${lead.goalType}`, 'green');
      });
    } else {
      log(`❌ Failed to get recent leads: ${result.error}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    console.error(error);
  }
}

// Run all tests
(async () => {
  log('🚀 Starting AllCrypto Integration Tests...', 'blue');
  log(`   Base URL: ${BASE_URL}`, 'blue');

  // Test 1: Push test lead
  const leadUuid = await testPushLead();

  // Wait a moment for the lead to be processed
  if (leadUuid) {
    log('\n⏳ Waiting 3 seconds for lead to be processed...', 'yellow');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Test 2: Get goal types
  await testGetGoalTypes();

  // Test 3: Get lead status
  await testGetLeadStatus(leadUuid);

  // Test 4: Get recent leads
  await testGetRecentLeads();

  log('\n✅ All tests completed!', 'blue');
  log('\n📝 Note: Check AllCrypto dashboard to verify the test lead was received.', 'yellow');
  log('   Test leads have "test" in aff_sub5 field and is_test=true.', 'yellow');
})();
