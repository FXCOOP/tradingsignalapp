-- 🏦 BROKER LEAD TRACKING SYSTEM
-- Migration for direct broker signup flow with API integration
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. BROKER LEADS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.broker_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User information
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  user_country TEXT,

  -- Broker information
  broker TEXT NOT NULL, -- 'exness', 'deriv', 'octafx', etc.
  lead_id TEXT UNIQUE, -- Broker's unique lead identifier
  tracking_url TEXT, -- Registration URL with tracking parameters

  -- Status tracking
  status TEXT DEFAULT 'pending',
  -- Status flow: pending → registered → verified → ftd → active
  -- pending: Lead created in our system
  -- registered: Sent to broker API successfully
  -- verified: User completed broker KYC
  -- ftd: First deposit made
  -- active: Actively trading

  -- Registration tracking
  registered_at TIMESTAMPTZ,

  -- Verification tracking (KYC completed)
  verified_at TIMESTAMPTZ,

  -- FTD (First Time Deposit) tracking
  ftd_at TIMESTAMPTZ,
  ftd_amount DECIMAL(10,2),
  ftd_currency TEXT DEFAULT 'USD',

  -- Commission tracking
  commission_type TEXT, -- 'cpa' or 'revshare'
  commission_amount DECIMAL(10,2),
  commission_currency TEXT DEFAULT 'USD',

  -- UTM tracking parameters
  utm_source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  utm_content TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Additional metadata (JSON for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_broker_leads_email ON public.broker_leads(user_email);
CREATE INDEX IF NOT EXISTS idx_broker_leads_lead_id ON public.broker_leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_broker_leads_broker ON public.broker_leads(broker);
CREATE INDEX IF NOT EXISTS idx_broker_leads_status ON public.broker_leads(status);
CREATE INDEX IF NOT EXISTS idx_broker_leads_created ON public.broker_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_broker_leads_ftd ON public.broker_leads(ftd_at DESC) WHERE ftd_at IS NOT NULL;

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_broker_leads_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_broker_leads_timestamp
BEFORE UPDATE ON public.broker_leads
FOR EACH ROW
EXECUTE FUNCTION update_broker_leads_timestamp();

-- ============================================
-- 2. CONVERSION EVENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Event details
  event_type TEXT NOT NULL, -- 'registration', 'verification', 'ftd', 'deposit', 'trade'
  broker TEXT NOT NULL,
  lead_id TEXT NOT NULL,

  -- User information
  user_email TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,

  -- Financial data (for FTD and deposits)
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  commission DECIMAL(10,2),

  -- Event metadata
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON public.conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_conversion_events_broker ON public.conversion_events(broker);
CREATE INDEX IF NOT EXISTS idx_conversion_events_lead ON public.conversion_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_created ON public.conversion_events(created_at DESC);

-- ============================================
-- 3. BROKER STATISTICS VIEW
-- ============================================

CREATE OR REPLACE VIEW public.broker_stats AS
SELECT
  broker,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'registered') as registered_count,
  COUNT(*) FILTER (WHERE status = 'verified') as verified_count,
  COUNT(*) FILTER (WHERE status = 'ftd') as ftd_count,
  COUNT(*) FILTER (WHERE status = 'active') as active_count,

  -- Conversion rates
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'ftd')::decimal / NULLIF(COUNT(*) FILTER (WHERE status = 'registered'), 0)) * 100,
    2
  ) as ftd_conversion_rate,

  -- Financial metrics
  SUM(ftd_amount) as total_ftd_volume,
  AVG(ftd_amount) as avg_ftd_amount,
  SUM(commission_amount) as total_commission,

  -- Time metrics
  MIN(created_at) as first_lead_at,
  MAX(created_at) as last_lead_at

FROM public.broker_leads
GROUP BY broker;

-- ============================================
-- 4. DAILY CONVERSION TRACKING VIEW
-- ============================================

CREATE OR REPLACE VIEW public.daily_conversions AS
SELECT
  DATE(created_at) as date,
  broker,
  event_type,
  COUNT(*) as event_count,
  SUM(amount) as total_amount,
  SUM(commission) as total_commission
FROM public.conversion_events
GROUP BY DATE(created_at), broker, event_type
ORDER BY DATE(created_at) DESC, broker;

-- ============================================
-- 5. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.broker_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- Admin can see everything
CREATE POLICY "Admin full access to broker_leads"
ON public.broker_leads
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid()
    AND users.is_admin = true
  )
);

CREATE POLICY "Admin full access to conversion_events"
ON public.conversion_events
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE users.id = auth.uid()
    AND users.is_admin = true
  )
);

-- Users can only see their own leads
CREATE POLICY "Users see own broker leads"
ON public.broker_leads
FOR SELECT
USING (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR user_id = auth.uid()
);

-- ============================================
-- 6. HELPER FUNCTIONS
-- ============================================

-- Function to get lead statistics by broker
CREATE OR REPLACE FUNCTION get_broker_performance(
  broker_name TEXT DEFAULT NULL,
  days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
  broker TEXT,
  period_leads INTEGER,
  period_ftds INTEGER,
  conversion_rate DECIMAL,
  total_volume DECIMAL,
  total_commission DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    bl.broker,
    COUNT(*)::INTEGER as period_leads,
    COUNT(*) FILTER (WHERE bl.status = 'ftd')::INTEGER as period_ftds,
    ROUND(
      (COUNT(*) FILTER (WHERE bl.status = 'ftd')::decimal / NULLIF(COUNT(*), 0)) * 100,
      2
    ) as conversion_rate,
    COALESCE(SUM(bl.ftd_amount), 0) as total_volume,
    COALESCE(SUM(bl.commission_amount), 0) as total_commission
  FROM public.broker_leads bl
  WHERE
    bl.created_at >= NOW() - (days_back || ' days')::INTERVAL
    AND (broker_name IS NULL OR bl.broker = broker_name)
  GROUP BY bl.broker
  ORDER BY period_leads DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get conversion funnel
CREATE OR REPLACE FUNCTION get_conversion_funnel(
  broker_name TEXT DEFAULT NULL
)
RETURNS TABLE (
  stage TEXT,
  count BIGINT,
  percentage DECIMAL
) AS $$
DECLARE
  total_leads BIGINT;
BEGIN
  -- Get total leads
  SELECT COUNT(*) INTO total_leads
  FROM public.broker_leads
  WHERE broker_name IS NULL OR broker = broker_name;

  -- Return funnel stages
  RETURN QUERY
  SELECT
    'Total Leads'::TEXT as stage,
    total_leads as count,
    100.0 as percentage
  UNION ALL
  SELECT
    'Registered'::TEXT,
    COUNT(*),
    ROUND((COUNT(*)::decimal / NULLIF(total_leads, 0)) * 100, 2)
  FROM public.broker_leads
  WHERE (broker_name IS NULL OR broker = broker_name)
    AND status IN ('registered', 'verified', 'ftd', 'active')
  UNION ALL
  SELECT
    'Verified'::TEXT,
    COUNT(*),
    ROUND((COUNT(*)::decimal / NULLIF(total_leads, 0)) * 100, 2)
  FROM public.broker_leads
  WHERE (broker_name IS NULL OR broker = broker_name)
    AND status IN ('verified', 'ftd', 'active')
  UNION ALL
  SELECT
    'FTD'::TEXT,
    COUNT(*),
    ROUND((COUNT(*)::decimal / NULLIF(total_leads, 0)) * 100, 2)
  FROM public.broker_leads
  WHERE (broker_name IS NULL OR broker = broker_name)
    AND status IN ('ftd', 'active');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. SAMPLE QUERIES (for testing)
-- ============================================

-- View all broker performance
-- SELECT * FROM broker_stats;

-- Get performance for last 30 days
-- SELECT * FROM get_broker_performance(NULL, 30);

-- Get performance for specific broker
-- SELECT * FROM get_broker_performance('exness', 7);

-- View conversion funnel
-- SELECT * FROM get_conversion_funnel('exness');

-- View recent conversions
-- SELECT * FROM daily_conversions ORDER BY date DESC LIMIT 30;

-- Get FTD leads with commission
-- SELECT
--   broker,
--   user_email,
--   ftd_amount,
--   commission_amount,
--   ftd_at
-- FROM broker_leads
-- WHERE status = 'ftd'
-- ORDER BY ftd_at DESC
-- LIMIT 50;

-- ============================================
-- 8. GRANT PERMISSIONS
-- ============================================

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.broker_leads TO authenticated;
GRANT SELECT, INSERT ON public.conversion_events TO authenticated;
GRANT SELECT ON public.broker_stats TO authenticated;
GRANT SELECT ON public.daily_conversions TO authenticated;
GRANT EXECUTE ON FUNCTION get_broker_performance TO authenticated;
GRANT EXECUTE ON FUNCTION get_conversion_funnel TO authenticated;

-- ============================================
-- 9. SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Broker tracking system installed successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Created tables:';
  RAISE NOTICE '   - broker_leads (main tracking table)';
  RAISE NOTICE '   - conversion_events (event log)';
  RAISE NOTICE '';
  RAISE NOTICE '📈 Created views:';
  RAISE NOTICE '   - broker_stats (performance metrics)';
  RAISE NOTICE '   - daily_conversions (daily tracking)';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 Created functions:';
  RAISE NOTICE '   - get_broker_performance(broker, days)';
  RAISE NOTICE '   - get_conversion_funnel(broker)';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next steps:';
  RAISE NOTICE '   1. Configure broker API credentials in Vercel';
  RAISE NOTICE '   2. Set up webhook endpoints with brokers';
  RAISE NOTICE '   3. Test registration flow';
  RAISE NOTICE '   4. Monitor conversions in admin dashboard';
END $$;
