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
