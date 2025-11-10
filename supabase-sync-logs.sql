-- Sync Logs Table
-- Tracks automatic status sync results

CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type TEXT NOT NULL,
  total_leads INTEGER DEFAULT 0,
  synced INTEGER DEFAULT 0,
  failed INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  status_changes INTEGER DEFAULT 0,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_sync_logs_executed_at ON sync_logs(executed_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_logs_sync_type ON sync_logs(sync_type);

-- Comments
COMMENT ON TABLE sync_logs IS 'Tracks automatic broker status sync results';
COMMENT ON COLUMN sync_logs.sync_type IS 'Type of sync: broker_status_hourly, manual, etc.';
COMMENT ON COLUMN sync_logs.total_leads IS 'Total leads processed';
COMMENT ON COLUMN sync_logs.synced IS 'Successfully synced leads';
COMMENT ON COLUMN sync_logs.failed IS 'Failed sync attempts';
COMMENT ON COLUMN sync_logs.conversions IS 'New FTD conversions detected';
COMMENT ON COLUMN sync_logs.status_changes IS 'Number of status changes detected';

-- Enable Row Level Security
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role to access
CREATE POLICY "Service role can manage sync_logs"
  ON sync_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- View for recent sync stats
CREATE OR REPLACE VIEW recent_sync_stats AS
SELECT
  sync_type,
  COUNT(*) as total_syncs,
  SUM(synced) as total_synced,
  SUM(failed) as total_failed,
  SUM(conversions) as total_conversions,
  SUM(status_changes) as total_status_changes,
  MAX(executed_at) as last_sync_at,
  AVG(synced::float / NULLIF(total_leads, 0) * 100) as avg_success_rate
FROM sync_logs
WHERE executed_at > NOW() - INTERVAL '7 days'
GROUP BY sync_type
ORDER BY last_sync_at DESC;
