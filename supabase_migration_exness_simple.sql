-- SIMPLE VERSION - Create Exness tables without complex dependencies
-- Safe to run multiple times (idempotent)

-- Create exness_conversions table
CREATE TABLE IF NOT EXISTS public.exness_conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  partner_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  ftd_amount DECIMAL(10, 2) DEFAULT 0,
  reward_amount DECIMAL(10, 2) DEFAULT 0,
  exness_user_id TEXT,
  raw_postback_data JSONB,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  user_approved BOOLEAN DEFAULT false,
  kyc_status TEXT,
  qualification_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exness_clicks table
CREATE TABLE IF NOT EXISTS public.exness_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  partner_id TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exness_conversions_user_id ON public.exness_conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_partner_id ON public.exness_conversions(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_event_type ON public.exness_conversions(event_type);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_created_at ON public.exness_conversions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_processed ON public.exness_conversions(processed);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_user_id ON public.exness_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_partner_id ON public.exness_clicks(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_clicked_at ON public.exness_clicks(clicked_at DESC);

-- Enable Row Level Security
ALTER TABLE public.exness_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exness_clicks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for service role" ON public.exness_conversions;
DROP POLICY IF EXISTS "Allow all operations for service role clicks" ON public.exness_clicks;
DROP POLICY IF EXISTS "Allow public insert on conversions" ON public.exness_conversions;
DROP POLICY IF EXISTS "Allow public insert on clicks" ON public.exness_clicks;

-- Create permissive policies to allow API access
-- These allow the service role (your API) to perform all operations
CREATE POLICY "Allow all operations for service role" ON public.exness_conversions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for service role clicks" ON public.exness_clicks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anon role to insert (for webhook postbacks)
CREATE POLICY "Allow public insert on conversions" ON public.exness_conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on clicks" ON public.exness_clicks
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add helpful comments
COMMENT ON TABLE public.exness_conversions IS 'Tracks Exness affiliate conversion events from postback webhooks';
COMMENT ON TABLE public.exness_clicks IS 'Tracks Exness affiliate link clicks';
COMMENT ON COLUMN public.exness_conversions.event_type IS 'Types: REGISTRATION, QUALIFICATION, AGGREGATED_DEPOSIT, REWARD_PROCESSING, IS_KYC_PASSED';
COMMENT ON COLUMN public.exness_conversions.processed IS 'Whether this conversion has been processed and user upgraded';
COMMENT ON COLUMN public.exness_conversions.user_approved IS 'Whether user was auto-approved for premium access';
