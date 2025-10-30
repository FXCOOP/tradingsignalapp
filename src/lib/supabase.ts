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
  access_tier: 'free' | 'premium'
  email_verified: boolean
  free_views_count: number
  free_views_reset_date: string
  created_at: string
  last_login: string | null
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
