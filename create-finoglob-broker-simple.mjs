#!/usr/bin/env node

/**
 * Direct Database Script: Create Finoglob Broker
 * Run with: node create-finoglob-broker-simple.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple .env parser
function loadEnv() {
  const env = {};
  try {
    const envPath = join(__dirname, '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    console.error('⚠️  Could not read .env file');
  }

  // Try .env.local too
  try {
    const envLocalPath = join(__dirname, '.env.local');
    const envContent = readFileSync(envLocalPath, 'utf8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    // .env.local is optional
  }

  return env;
}

const env = loadEnv();

// Initialize Supabase
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials\n');
  console.error('Please set these in your .env file:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"');
  console.error('  SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Finoglob broker configuration
const finoglobBroker = {
  name: 'Finoglob',
  company_name: 'Trading CRM (affiliate365)',
  email: 'support@tradingcrm.com',
  phone: null,
  country_codes: ['MY', 'TR', 'FR', 'IT', 'HK', 'SG', 'TW', 'BR'],
  status: 'active',
  api_endpoint: env.TRADING_CRM_API_ENDPOINT || 'https://affiliate365.tradingcrm.com:4477/accounts/registrationwithsso',
  api_key: env.TRADING_CRM_USERNAME || '225X',
  api_method: 'POST',
  api_headers: {
    'Content-Type': 'application/json-patch+json',
    'Accept': 'application/json',
  },
  max_leads_per_day: 1000,
  max_leads_per_hour: 100,
  working_hours_start: '00:00:00',
  working_hours_end: '23:59:59',
  working_days: [1, 2, 3, 4, 5, 6, 7],
  payout_per_lead: 5.00,
  payout_per_conversion: 50.00,
};

async function main() {
  console.log('\n================================================');
  console.log('Creating Finoglob Broker in Database');
  console.log('================================================\n');

  try {
    // Check if broker already exists
    console.log('Checking if Finoglob already exists...');
    const { data: existingBrokers, error: fetchError } = await supabase
      .from('brokers')
      .select('*')
      .or(`name.eq.Finoglob,name.eq.Trading CRM,company_name.ilike.%affiliate365%`);

    if (fetchError) {
      throw new Error(`Database query failed: ${fetchError.message}`);
    }

    if (existingBrokers && existingBrokers.length > 0) {
      console.log('⚠️  Broker already exists!\n');
      console.log('Existing Broker:');
      console.log('  Name:', existingBrokers[0].name);
      console.log('  Company:', existingBrokers[0].company_name);
      console.log('  Status:', existingBrokers[0].status);
      console.log('  Countries:', existingBrokers[0].country_codes.join(', '));
      console.log('\n✅ The broker is already in your CRM dashboard at /crm\n');
      process.exit(0);
    }

    // Create the broker
    console.log('Creating Finoglob broker...');
    const { data: newBroker, error: createError } = await supabase
      .from('brokers')
      .insert([finoglobBroker])
      .select()
      .single();

    if (createError) {
      throw new Error(`Failed to create broker: ${createError.message}`);
    }

    console.log('✅ SUCCESS! Finoglob broker created\n');
    console.log('Broker Details:');
    console.log('  ID:', newBroker.id);
    console.log('  Name:', newBroker.name);
    console.log('  Company:', newBroker.company_name);
    console.log('  Status:', newBroker.status);
    console.log('  Countries:', newBroker.country_codes.join(', '));
    console.log('  Max Leads/Day:', newBroker.max_leads_per_day);
    console.log('  Max Leads/Hour:', newBroker.max_leads_per_hour);
    console.log('  API Endpoint:', newBroker.api_endpoint);
    console.log('\n✅ The broker is now visible in your CRM dashboard!');
    console.log('   Visit: /crm\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.details) console.error('   Details:', error.details);
    if (error.hint) console.error('   Hint:', error.hint);
    console.log('');
    process.exit(1);
  }
}

main();
