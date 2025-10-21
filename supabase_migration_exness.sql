-- Create exness_conversions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.exness_conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  partner_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  ftd_amount DECIMAL(10, 2) DEFAULT 0,
  reward_amount DECIMAL(10, 2) DEFAULT 0,
  exness_user_id TEXT,
  raw_postback_data JSONB,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  user_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exness_clicks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.exness_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  partner_id TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add optional columns that might not exist (these are safe to run multiple times)
DO $$
BEGIN
  -- Add kyc_status if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'exness_conversions'
    AND column_name = 'kyc_status'
  ) THEN
    ALTER TABLE public.exness_conversions ADD COLUMN kyc_status TEXT;
  END IF;

  -- Add qualification_status if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'exness_conversions'
    AND column_name = 'qualification_status'
  ) THEN
    ALTER TABLE public.exness_conversions ADD COLUMN qualification_status TEXT;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exness_conversions_user_id ON public.exness_conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_partner_id ON public.exness_conversions(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_event_type ON public.exness_conversions(event_type);
CREATE INDEX IF NOT EXISTS idx_exness_conversions_created_at ON public.exness_conversions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_user_id ON public.exness_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_partner_id ON public.exness_clicks(partner_id);
CREATE INDEX IF NOT EXISTS idx_exness_clicks_clicked_at ON public.exness_clicks(clicked_at DESC);

-- Enable Row Level Security
ALTER TABLE public.exness_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exness_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role full access
CREATE POLICY IF NOT EXISTS "Service role can manage exness_conversions" ON public.exness_conversions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Service role can manage exness_clicks" ON public.exness_clicks
  FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions to authenticated users (read-only for their own data)
CREATE POLICY IF NOT EXISTS "Users can view their own conversions" ON public.exness_conversions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can view their own clicks" ON public.exness_clicks
  FOR SELECT USING (auth.uid() = user_id);

COMMENT ON TABLE public.exness_conversions IS 'Tracks Exness affiliate conversion events';
COMMENT ON TABLE public.exness_clicks IS 'Tracks Exness affiliate link clicks';
