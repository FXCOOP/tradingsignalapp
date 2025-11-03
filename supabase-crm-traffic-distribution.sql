-- =====================================================
-- CRM TRAFFIC DISTRIBUTION ENHANCEMENT
-- =====================================================

-- Add traffic distribution columns to brokers table
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS traffic_percentage INTEGER DEFAULT 0 CHECK (traffic_percentage >= 0 AND traffic_percentage <= 100);
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS traffic_priority INTEGER DEFAULT 0; -- Higher number = higher priority
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS max_leads_per_month INTEGER DEFAULT 1000;
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS leads_received_this_month INTEGER DEFAULT 0;
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS auto_push_enabled BOOLEAN DEFAULT false; -- Auto-push leads to broker API
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS country_distribution JSONB DEFAULT '{}'::jsonb; -- Per-country traffic % e.g., {"AE": 50, "SA": 30}
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS min_lead_amount DECIMAL(10,2) DEFAULT 0.00; -- Minimum deposit amount for leads
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS max_lead_amount DECIMAL(10,2); -- Maximum deposit amount for leads
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS accept_demo_accounts BOOLEAN DEFAULT true;
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS accept_real_accounts BOOLEAN DEFAULT true;

-- Create lead push logs table
CREATE TABLE IF NOT EXISTS lead_push_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL,
  broker_id UUID NOT NULL REFERENCES brokers(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'pending', 'retry')),
  http_status INTEGER,
  request_data JSONB,
  response_data JSONB,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  pushed_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (lead_id) REFERENCES signups(id) ON DELETE CASCADE
);

CREATE INDEX idx_lead_push_logs_lead ON lead_push_logs(lead_id);
CREATE INDEX idx_lead_push_logs_broker ON lead_push_logs(broker_id);
CREATE INDEX idx_lead_push_logs_status ON lead_push_logs(status);
CREATE INDEX idx_lead_push_logs_pushed_at ON lead_push_logs(pushed_at);

-- Create broker distribution rules table
CREATE TABLE IF NOT EXISTS broker_distribution_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID NOT NULL REFERENCES brokers(id) ON DELETE CASCADE,
  rule_type VARCHAR(50) NOT NULL CHECK (rule_type IN ('country', 'amount', 'time', 'source', 'custom')),
  rule_condition JSONB NOT NULL, -- Flexible condition storage
  traffic_percentage INTEGER DEFAULT 0 CHECK (traffic_percentage >= 0 AND traffic_percentage <= 100),
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_distribution_rules_broker ON broker_distribution_rules(broker_id);
CREATE INDEX idx_distribution_rules_type ON broker_distribution_rules(rule_type);
CREATE INDEX idx_distribution_rules_active ON broker_distribution_rules(is_active);

-- Create broker API files table (for storing uploaded configs)
CREATE TABLE IF NOT EXISTS broker_api_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID NOT NULL REFERENCES brokers(id) ON DELETE CASCADE,
  config_name VARCHAR(255) NOT NULL,
  config_data JSONB NOT NULL,
  file_name VARCHAR(255),
  file_size INTEGER,
  uploaded_by VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_api_configs_broker ON broker_api_configs(broker_id);
CREATE INDEX idx_api_configs_active ON broker_api_configs(is_active);

-- Function to reset monthly counters
CREATE OR REPLACE FUNCTION reset_monthly_broker_stats()
RETURNS void AS $$
BEGIN
  UPDATE brokers
  SET leads_received_this_month = 0
  WHERE DATE_TRUNC('month', updated_at) < DATE_TRUNC('month', NOW());
END;
$$ LANGUAGE plpgsql;

-- Function to get available brokers for lead distribution
CREATE OR REPLACE FUNCTION get_available_brokers_for_lead(
  p_country_code VARCHAR(2),
  p_lead_amount DECIMAL(10,2) DEFAULT 0
)
RETURNS TABLE (
  broker_id UUID,
  broker_name VARCHAR(255),
  traffic_percentage INTEGER,
  traffic_priority INTEGER,
  current_load INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id,
    b.name,
    b.traffic_percentage,
    b.traffic_priority,
    b.leads_received_today
  FROM brokers b
  WHERE
    b.status = 'active'
    AND (p_country_code = ANY(b.country_codes) OR b.country_codes = '{}')
    AND b.leads_received_today < b.max_leads_per_day
    AND b.leads_received_this_hour < b.max_leads_per_hour
    AND b.leads_received_this_month < b.max_leads_per_month
    AND (b.min_lead_amount = 0 OR p_lead_amount >= b.min_lead_amount)
    AND (b.max_lead_amount IS NULL OR p_lead_amount <= b.max_lead_amount)
  ORDER BY
    b.traffic_priority DESC,
    b.leads_received_today ASC,
    RANDOM();
END;
$$ LANGUAGE plpgsql;

-- Function to increment broker stats
CREATE OR REPLACE FUNCTION increment_broker_stats(
  p_broker_id UUID,
  p_field VARCHAR(50) DEFAULT 'total_leads_received'
)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE brokers SET %I = %I + 1, updated_at = NOW() WHERE id = $1', p_field, p_field)
  USING p_broker_id;
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON COLUMN brokers.traffic_percentage IS 'Percentage of total traffic this broker should receive (0-100)';
COMMENT ON COLUMN brokers.traffic_priority IS 'Priority level for lead distribution (higher = more priority)';
COMMENT ON COLUMN brokers.country_distribution IS 'JSON object with country-specific traffic percentages';
COMMENT ON COLUMN brokers.auto_push_enabled IS 'Automatically push leads to broker API when assigned';
COMMENT ON TABLE lead_push_logs IS 'Logs all attempts to push leads to broker APIs';
COMMENT ON TABLE broker_distribution_rules IS 'Advanced rules for traffic distribution to brokers';
COMMENT ON TABLE broker_api_configs IS 'Uploaded API configuration files for brokers';

-- Insert sample distribution rule (optional)
-- INSERT INTO broker_distribution_rules (broker_id, rule_type, rule_condition, traffic_percentage, priority)
-- VALUES (
--   'broker-uuid-here',
--   'country',
--   '{"countries": ["AE", "SA"], "percentage": 60}'::jsonb,
--   60,
--   10
-- );

GRANT ALL ON lead_push_logs TO anon, authenticated;
GRANT ALL ON broker_distribution_rules TO anon, authenticated;
GRANT ALL ON broker_api_configs TO anon, authenticated;
