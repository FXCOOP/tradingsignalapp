-- IP Monitoring Table
-- Tracks Render's IP address changes over time

CREATE TABLE IF NOT EXISTS ip_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  changed BOOLEAN DEFAULT FALSE,
  previous_ip TEXT,
  headers JSONB,
  environment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_ip_monitoring_created_at ON ip_monitoring(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ip_monitoring_changed ON ip_monitoring(changed) WHERE changed = TRUE;

-- Comment
COMMENT ON TABLE ip_monitoring IS 'Tracks server IP address changes to detect when Render changes IP';
COMMENT ON COLUMN ip_monitoring.ip_address IS 'Current server IP address';
COMMENT ON COLUMN ip_monitoring.changed IS 'TRUE if IP changed from previous check';
COMMENT ON COLUMN ip_monitoring.previous_ip IS 'Previous IP address before change';
COMMENT ON COLUMN ip_monitoring.headers IS 'HTTP headers containing IP info';

-- Enable Row Level Security (optional, for security)
ALTER TABLE ip_monitoring ENABLE ROW LEVEL SECURITY;

-- Allow service role to access
CREATE POLICY "Service role can manage ip_monitoring"
  ON ip_monitoring
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
