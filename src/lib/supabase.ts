import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create a Supabase client with service role for backend operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Type for our user
export interface User {
  id: string
  email: string
  full_name: string | null
  access_level: 'free' | 'premium' // Database uses access_level, not access_tier
  email_verified: boolean
  free_views_count: number
  free_views_reset_date: string
  created_at: string
  last_login_at: string | null // Database uses last_login_at, not last_login
}

// Type for broker account
export interface BrokerAccount {
  id: string
  user_id: string
  broker_name: string
  account_number: string | null
  verification_status: 'pending' | 'verified' | 'rejected'
  deposit_amount: number | null
  submitted_at: string
  verified_at: string | null
  affiliate_click_id: string | null
  notes: string | null
}

// Type for signup data
export interface SignupData {
  first_name: string
  last_name: string
  email: string
  country_code: string
  phone_number: string
  country: string
  detected_country?: string | null
  terms_accepted: boolean
  ip_address?: string | null
  user_agent?: string | null
  referrer?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

// Insert a new signup
export async function createSignup(data: SignupData) {
  const { data: signup, error } = await supabaseAdmin
    .from('signups')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error creating signup:', error)
    throw error
  }

  return signup
}

// Get all signups (admin function)
export async function getAllSignups() {
  const { data, error } = await supabaseAdmin
    .from('signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching signups:', error)
    throw error
  }

  return data
}

// Get signup by email
export async function getSignupByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('signups')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    console.error('Error fetching signup:', error)
    throw error
  }

  return data
}

// =====================================================
// USER ACCOUNT FUNCTIONS
// =====================================================

// Create a new user account (for authentication)
export async function createUser(data: {
  email: string
  password_hash: string
  full_name: string
  access_level?: 'free' | 'premium' // Changed from access_tier to match database
}) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .insert([{
      email: data.email,
      password_hash: data.password_hash,
      full_name: data.full_name,
      access_level: data.access_level || 'premium', // Default to premium for all signups
      email_verified: false,
      free_signals_count: 0, // Initialize counters
      free_articles_count: 0,
      has_broker_account: false
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    throw error
  }

  return user as User
}

// Get user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user:', error)
    throw error
  }

  return data as User | null
}

// Get user by ID
export async function getUserById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user:', error)
    throw error
  }

  return data as User | null
}

// Update user's last login
export async function updateLastLogin(userId: string) {
  const { error } = await supabaseAdmin
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) {
    console.error('Error updating last login:', error)
    throw error
  }

  return true
}

// =====================================================
// CRM FUNCTIONS
// =====================================================

// ----- BROKER MANAGEMENT -----

export interface Broker {
  id: string
  name: string
  company_name?: string
  email: string
  phone?: string
  country_codes: string[]
  status: 'active' | 'inactive' | 'suspended'
  api_endpoint?: string
  api_key?: string
  api_method?: string
  api_headers?: any
  max_leads_per_day: number
  max_leads_per_hour: number
  leads_received_today: number
  leads_received_this_hour: number
  last_lead_sent_at?: string
  working_hours_start: string
  working_hours_end: string
  working_days: number[]
  total_leads_received: number
  total_leads_converted: number
  conversion_rate: number
  average_response_time_minutes?: number
  payout_per_lead: number
  payout_per_conversion: number
  total_payout: number
  created_at: string
  updated_at: string
}

export async function getAllBrokers() {
  const { data, error } = await supabaseAdmin
    .from('brokers')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data as Broker[]
}

export async function getBrokerById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('brokers')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data as Broker | null
}

export async function getActiveBrokers() {
  const { data, error } = await supabaseAdmin
    .from('brokers')
    .select('*')
    .eq('status', 'active')
    .order('name', { ascending: true })

  if (error) throw error
  return data as Broker[]
}

export async function createBroker(broker: Partial<Broker>) {
  const { data, error } = await supabaseAdmin
    .from('brokers')
    .insert([broker])
    .select()
    .single()

  if (error) throw error
  return data as Broker
}

export async function updateBroker(id: string, updates: Partial<Broker>) {
  const { data, error } = await supabaseAdmin
    .from('brokers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Broker
}

export async function deleteBroker(id: string) {
  const { error } = await supabaseAdmin
    .from('brokers')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ----- LEAD ASSIGNMENT -----

export interface LeadAssignment {
  id: string
  lead_id: string
  broker_id: string
  assigned_at: string
  assignment_method?: string
  priority: number
  delivery_status: 'pending' | 'sent' | 'failed' | 'rejected'
  delivery_attempts: number
  last_attempt_at?: string
  delivered_at?: string
  error_message?: string
  api_response?: any
  external_lead_id?: string
  created_at: string
  updated_at: string
}

export async function createLeadAssignment(assignment: Partial<LeadAssignment>) {
  const { data, error } = await supabaseAdmin
    .from('lead_assignments')
    .insert([assignment])
    .select()
    .single()

  if (error) throw error
  return data as LeadAssignment
}

export async function getLeadAssignments(leadId: string) {
  const { data, error } = await supabaseAdmin
    .from('lead_assignments')
    .select('*, brokers(*)')
    .eq('lead_id', leadId)
    .order('assigned_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateLeadAssignment(id: string, updates: Partial<LeadAssignment>) {
  const { data, error } = await supabaseAdmin
    .from('lead_assignments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as LeadAssignment
}

export async function getBrokerAssignments(brokerId: string, limit = 100) {
  const { data, error } = await supabaseAdmin
    .from('lead_assignments')
    .select('*, signups(*)')
    .eq('broker_id', brokerId)
    .order('assigned_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// ----- SALES STATUS -----

export interface SalesStatus {
  id: string
  lead_assignment_id: string
  lead_id: string
  broker_id: string
  status: string
  deposit_amount?: number
  deposit_currency?: string
  deposit_date?: string
  trading_volume: number
  total_trades: number
  last_trade_date?: string
  commission_earned: number
  commission_status: 'pending' | 'approved' | 'paid' | 'rejected'
  commission_paid_at?: string
  first_contact_at?: string
  last_contact_at?: string
  contact_attempts: number
  notes?: string
  broker_notes?: string
  created_at: string
  updated_at: string
}

export async function createSalesStatus(status: Partial<SalesStatus>) {
  const { data, error } = await supabaseAdmin
    .from('sales_status')
    .insert([status])
    .select()
    .single()

  if (error) throw error
  return data as SalesStatus
}

export async function updateSalesStatus(id: string, updates: Partial<SalesStatus>) {
  const { data, error } = await supabaseAdmin
    .from('sales_status')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as SalesStatus
}

export async function getSalesStatusByLeadId(leadId: string) {
  const { data, error } = await supabaseAdmin
    .from('sales_status')
    .select('*, brokers(*)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getSalesStatusByBrokerId(brokerId: string) {
  const { data, error } = await supabaseAdmin
    .from('sales_status')
    .select('*, signups(*)')
    .eq('broker_id', brokerId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

// ----- ASSIGNMENT RULES -----

export interface AssignmentRule {
  id: string
  name: string
  priority: number
  is_active: boolean
  conditions: any
  broker_id: string
  action_type: 'assign' | 'round_robin' | 'weighted_random'
  times_triggered: number
  last_triggered_at?: string
  created_at: string
  updated_at: string
}

export async function getAllAssignmentRules() {
  const { data, error } = await supabaseAdmin
    .from('assignment_rules')
    .select('*, brokers(*)')
    .order('priority', { ascending: false })

  if (error) throw error
  return data
}

export async function getActiveAssignmentRules() {
  const { data, error } = await supabaseAdmin
    .from('assignment_rules')
    .select('*, brokers(*)')
    .eq('is_active', true)
    .order('priority', { ascending: false })

  if (error) throw error
  return data
}

export async function createAssignmentRule(rule: Partial<AssignmentRule>) {
  const { data, error } = await supabaseAdmin
    .from('assignment_rules')
    .insert([rule])
    .select()
    .single()

  if (error) throw error
  return data as AssignmentRule
}

export async function updateAssignmentRule(id: string, updates: Partial<AssignmentRule>) {
  const { data, error } = await supabaseAdmin
    .from('assignment_rules')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as AssignmentRule
}

export async function deleteAssignmentRule(id: string) {
  const { error } = await supabaseAdmin
    .from('assignment_rules')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ----- ACTIVITY LOG -----

export interface LeadActivity {
  id?: string
  lead_id: string
  activity_type: string
  actor?: string
  actor_id?: string
  details?: any
  ip_address?: string
  user_agent?: string
  created_at?: string
}

export async function logLeadActivity(activity: LeadActivity) {
  const { data, error } = await supabaseAdmin
    .from('lead_activity_log')
    .insert([activity])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLeadActivity(leadId: string, limit = 50) {
  const { data, error } = await supabaseAdmin
    .from('lead_activity_log')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// ----- WEBHOOK LOGS -----

export interface WebhookLog {
  id?: string
  broker_id?: string
  webhook_type?: string
  request_method?: string
  request_headers?: any
  request_body?: any
  response_status?: number
  response_body?: any
  processed?: boolean
  error_message?: string
  ip_address?: string
  user_agent?: string
  created_at?: string
}

export async function createWebhookLog(log: WebhookLog) {
  const { data, error } = await supabaseAdmin
    .from('webhook_logs')
    .insert([log])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getWebhookLogs(brokerId?: string, limit = 100) {
  let query = supabaseAdmin
    .from('webhook_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (brokerId) {
    query = query.eq('broker_id', brokerId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

// ----- ANALYTICS & REPORTS -----

export async function getBrokerPerformance() {
  const { data, error } = await supabaseAdmin
    .from('broker_performance')
    .select('*')
    .order('conversion_rate', { ascending: false })

  if (error) throw error
  return data
}

export async function getDailyLeadStats(days = 30) {
  const { data, error } = await supabaseAdmin
    .from('daily_lead_stats')
    .select('*')
    .limit(days)

  if (error) throw error
  return data
}

// Update signup with CRM fields
export async function updateSignupCRM(id: string, updates: {
  lead_status?: string
  assigned_broker_id?: string
  lead_score?: number
  lead_source?: string
  last_activity_at?: string
}) {
  const { data, error } = await supabaseAdmin
    .from('signups')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Get leads with filters
export async function getLeadsWithFilters(filters: {
  status?: string
  country?: string
  broker_id?: string
  date_from?: string
  date_to?: string
  limit?: number
  offset?: number
}) {
  let query = supabaseAdmin
    .from('signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.status) {
    query = query.eq('lead_status', filters.status)
  }
  if (filters.country) {
    query = query.eq('country', filters.country)
  }
  if (filters.broker_id) {
    query = query.eq('assigned_broker_id', filters.broker_id)
  }
  if (filters.date_from) {
    query = query.gte('created_at', filters.date_from)
  }
  if (filters.date_to) {
    query = query.lte('created_at', filters.date_to)
  }
  if (filters.limit) {
    query = query.limit(filters.limit)
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { data, count }
}
