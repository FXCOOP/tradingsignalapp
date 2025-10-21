-- Create activity_log table for tracking system events
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action ON public.activity_log(action);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- Enable RLS
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role full access activity_log" ON public.activity_log;
DROP POLICY IF EXISTS "Allow public insert activity_log" ON public.activity_log;

-- Create policies
CREATE POLICY "Service role full access activity_log" ON public.activity_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public insert activity_log" ON public.activity_log
  FOR INSERT
  TO anon
  WITH CHECK (true);

COMMENT ON TABLE public.activity_log IS 'System activity and event tracking';
