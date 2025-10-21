-- FRESH START - Drop existing tables and create clean versions
-- WARNING: This will delete existing data in exness_conversions and exness_clicks tables!
-- Only run this if you don't have important data in these tables.

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.exness_conversions CASCADE;
DROP TABLE IF EXISTS public.exness_clicks CASCADE;

-- Create exness_conversions table with all columns
CREATE TABLE public.exness_conversions (
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
CREATE TABLE public.exness_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  partner_id TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_exness_conversions_user_id ON public.exness_conversions(user_id);
CREATE INDEX idx_exness_conversions_partner_id ON public.exness_conversions(partner_id);
CREATE INDEX idx_exness_conversions_event_type ON public.exness_conversions(event_type);
CREATE INDEX idx_exness_conversions_created_at ON public.exness_conversions(created_at DESC);
CREATE INDEX idx_exness_conversions_processed ON public.exness_conversions(processed);
CREATE INDEX idx_exness_clicks_user_id ON public.exness_clicks(user_id);
CREATE INDEX idx_exness_clicks_partner_id ON public.exness_clicks(partner_id);
CREATE INDEX idx_exness_clicks_clicked_at ON public.exness_clicks(clicked_at DESC);

-- Enable RLS
ALTER TABLE public.exness_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exness_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (full access)
CREATE POLICY "Service role full access conversions" ON public.exness_conversions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access clicks" ON public.exness_clicks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anon role to insert (for webhook postbacks)
CREATE POLICY "Anon can insert conversions" ON public.exness_conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert clicks" ON public.exness_clicks
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add comments
COMMENT ON TABLE public.exness_conversions IS 'Exness affiliate conversion events';
COMMENT ON TABLE public.exness_clicks IS 'Exness affiliate link clicks';

-- Verify tables were created
SELECT 'exness_conversions created' as status, count(*) as row_count FROM public.exness_conversions
UNION ALL
SELECT 'exness_clicks created' as status, count(*) as row_count FROM public.exness_clicks;
