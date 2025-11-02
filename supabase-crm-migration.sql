-- Affiliate CRM Database Schema Migration
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. BROKERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS brokers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  country_codes TEXT[], -- Array of country codes they accept (e.g., ['AE', 'SA', 'QA'])
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),

  -- API Integration
  api_endpoint VARCHAR(500), -- URL to send leads to
  api_key TEXT, -- Encrypted API key
  api_method VARCHAR(10) DEFAULT 'POST' CHECK (api_method IN ('POST', 'GET', 'PUT')),
  api_headers JSONB, -- Custom headers for API calls

  -- Capacity Management
  max_leads_per_day INTEGER DEFAULT 100,
  max_leads_per_hour INTEGER DEFAULT 10,
  leads_received_today INTEGER DEFAULT 0,
  leads_received_this_hour INTEGER DEFAULT 0,
  last_lead_sent_at TIMESTAMP,

  -- Working Hours (UTC time)
  working_hours_start TIME DEFAULT '00:00:00',
  working_hours_end TIME DEFAULT '23:59:59',
  working_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6,7], -- 1=Monday, 7=Sunday

  -- Performance Metrics
  total_leads_received INTEGER DEFAULT 0,
  total_leads_converted INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  average_response_time_minutes INTEGER,

  -- Payout Settings
  payout_per_lead DECIMAL(10,2) DEFAULT 0.00,
  payout_per_conversion DECIMAL(10,2) DEFAULT 0.00,
  total_payout DECIMAL(12,2) DEFAULT 0.00,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_brokers_status ON brokers(status);
CREATE INDEX idx_brokers_country_codes ON brokers USING GIN(country_codes);

-- =====================================================
-- 2. LEAD ASSIGNMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS lead_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL, -- References signups table
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,

  -- Assignment Details
  assigned_at TIMESTAMP DEFAULT NOW(),
  assignment_method VARCHAR(50), -- 'auto', 'manual', 'round_robin', 'weighted'
  priority INTEGER DEFAULT 0, -- Higher priority = sent first

  -- Delivery Status
  delivery_status VARCHAR(20) DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'failed', 'rejected')),
  delivery_attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP,
  delivered_at TIMESTAMP,
  error_message TEXT,

  -- API Response
  api_response JSONB, -- Store full API response
  external_lead_id VARCHAR(255), -- Broker's internal ID for this lead

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lead_assignments_lead_id ON lead_assignments(lead_id);
CREATE INDEX idx_lead_assignments_broker_id ON lead_assignments(broker_id);
CREATE INDEX idx_lead_assignments_status ON lead_assignments(delivery_status);
CREATE INDEX idx_lead_assignments_assigned_at ON lead_assignments(assigned_at DESC);

-- =====================================================
-- 3. SALES STATUS TABLE (Conversion Tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS sales_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_assignment_id UUID REFERENCES lead_assignments(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL, -- References signups table
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,

  -- Sales Information
  status VARCHAR(30) DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'interested', 'demo_scheduled', 'demo_completed',
    'application_submitted', 'kyc_pending', 'kyc_approved', 'kyc_rejected',
    'deposit_made', 'active_trader', 'inactive', 'lost', 'blocked'
  )),

  -- Financial Data
  deposit_amount DECIMAL(12,2),
  deposit_currency VARCHAR(3) DEFAULT 'USD',
  deposit_date TIMESTAMP,

  trading_volume DECIMAL(15,2) DEFAULT 0.00,
  total_trades INTEGER DEFAULT 0,
  last_trade_date TIMESTAMP,

  -- Commission & Payout
  commission_earned DECIMAL(10,2) DEFAULT 0.00,
  commission_status VARCHAR(20) DEFAULT 'pending' CHECK (commission_status IN ('pending', 'approved', 'paid', 'rejected')),
  commission_paid_at TIMESTAMP,

  -- Contact History
  first_contact_at TIMESTAMP,
  last_contact_at TIMESTAMP,
  contact_attempts INTEGER DEFAULT 0,

  -- Notes
  notes TEXT,
  broker_notes TEXT, -- Notes from broker's CRM

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sales_status_lead_id ON sales_status(lead_id);
CREATE INDEX idx_sales_status_broker_id ON sales_status(broker_id);
CREATE INDEX idx_sales_status_status ON sales_status(status);
CREATE INDEX idx_sales_status_deposit_date ON sales_status(deposit_date DESC);

-- =====================================================
-- 4. ASSIGNMENT RULES TABLE (Routing Logic)
-- =====================================================
CREATE TABLE IF NOT EXISTS assignment_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  priority INTEGER DEFAULT 0, -- Higher = evaluated first
  is_active BOOLEAN DEFAULT true,

  -- Conditions (JSONB for flexibility)
  conditions JSONB NOT NULL, -- e.g., {"country": ["AE", "SA"], "min_leads": 0, "max_leads": 100}

  -- Actions
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
  action_type VARCHAR(50) DEFAULT 'assign' CHECK (action_type IN ('assign', 'round_robin', 'weighted_random')),

  -- Statistics
  times_triggered INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_assignment_rules_priority ON assignment_rules(priority DESC);
CREATE INDEX idx_assignment_rules_active ON assignment_rules(is_active);

-- =====================================================
-- 5. LEAD ACTIVITY LOG (Audit Trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS lead_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL, -- References signups table
  activity_type VARCHAR(50) NOT NULL, -- 'created', 'assigned', 'status_changed', 'contacted', etc.
  actor VARCHAR(50), -- 'system', 'admin', 'broker', 'api'
  actor_id UUID, -- ID of the actor (user/broker)

  details JSONB, -- Additional details about the activity
  ip_address VARCHAR(50),
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lead_activity_log_lead_id ON lead_activity_log(lead_id);
CREATE INDEX idx_lead_activity_log_created_at ON lead_activity_log(created_at DESC);

-- =====================================================
-- 6. WEBHOOK LOGS (Track incoming broker callbacks)
-- =====================================================
CREATE TABLE IF NOT EXISTS webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID REFERENCES brokers(id) ON DELETE SET NULL,
  webhook_type VARCHAR(50), -- 'status_update', 'deposit', 'conversion'

  request_method VARCHAR(10),
  request_headers JSONB,
  request_body JSONB,

  response_status INTEGER,
  response_body JSONB,

  processed BOOLEAN DEFAULT false,
  error_message TEXT,

  ip_address VARCHAR(50),
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_broker_id ON webhook_logs(broker_id);
CREATE INDEX idx_webhook_logs_created_at ON webhook_logs(created_at DESC);
CREATE INDEX idx_webhook_logs_processed ON webhook_logs(processed);

-- =====================================================
-- 7. Update signups table with CRM fields
-- =====================================================
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_status VARCHAR(30) DEFAULT 'new';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS assigned_broker_id UUID REFERENCES brokers(id) ON DELETE SET NULL;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS lead_source VARCHAR(100);
ALTER TABLE signups ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_signups_lead_status ON signups(lead_status);
CREATE INDEX IF NOT EXISTS idx_signups_assigned_broker ON signups(assigned_broker_id);
CREATE INDEX IF NOT EXISTS idx_signups_lead_score ON signups(lead_score DESC);

-- =====================================================
-- 8. Create Views for Analytics
-- =====================================================

-- Broker Performance View
CREATE OR REPLACE VIEW broker_performance AS
SELECT
  b.id,
  b.name,
  b.company_name,
  b.status,
  b.total_leads_received,
  b.total_leads_converted,
  b.conversion_rate,
  COUNT(DISTINCT la.id) as assigned_leads,
  COUNT(DISTINCT CASE WHEN ss.status = 'deposit_made' THEN ss.id END) as deposited_leads,
  SUM(ss.deposit_amount) as total_deposits,
  SUM(ss.commission_earned) as total_commission,
  b.total_payout
FROM brokers b
LEFT JOIN lead_assignments la ON b.id = la.broker_id
LEFT JOIN sales_status ss ON b.id = ss.broker_id
GROUP BY b.id;

-- Daily Lead Statistics View
CREATE OR REPLACE VIEW daily_lead_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_signups,
  COUNT(DISTINCT country) as unique_countries,
  COUNT(CASE WHEN assigned_broker_id IS NOT NULL THEN 1 END) as assigned_leads,
  COUNT(CASE WHEN lead_status = 'deposit_made' THEN 1 END) as converted_leads
FROM signups
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- =====================================================
-- 9. Functions & Triggers
-- =====================================================

-- Function to update broker stats
CREATE OR REPLACE FUNCTION update_broker_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update conversion rate
  UPDATE brokers
  SET
    total_leads_received = (SELECT COUNT(*) FROM lead_assignments WHERE broker_id = NEW.broker_id AND delivery_status = 'sent'),
    total_leads_converted = (SELECT COUNT(*) FROM sales_status WHERE broker_id = NEW.broker_id AND status = 'deposit_made'),
    conversion_rate = (
      CASE
        WHEN (SELECT COUNT(*) FROM lead_assignments WHERE broker_id = NEW.broker_id AND delivery_status = 'sent') > 0
        THEN (SELECT COUNT(*) FROM sales_status WHERE broker_id = NEW.broker_id AND status = 'deposit_made')::DECIMAL /
             (SELECT COUNT(*) FROM lead_assignments WHERE broker_id = NEW.broker_id AND delivery_status = 'sent')::DECIMAL * 100
        ELSE 0
      END
    ),
    updated_at = NOW()
  WHERE id = NEW.broker_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update broker stats when sales status changes
CREATE TRIGGER trigger_update_broker_stats
AFTER INSERT OR UPDATE ON sales_status
FOR EACH ROW
EXECUTE FUNCTION update_broker_stats();

-- Function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp trigger to all relevant tables
CREATE TRIGGER update_brokers_updated_at BEFORE UPDATE ON brokers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_assignments_updated_at BEFORE UPDATE ON lead_assignments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_status_updated_at BEFORE UPDATE ON sales_status
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 10. Insert Sample Data (Optional - for testing)
-- =====================================================

-- Sample broker
INSERT INTO brokers (name, company_name, email, phone, country_codes, api_endpoint, max_leads_per_day, payout_per_conversion)
VALUES
  ('Ahmed Trading', 'Ahmed Trading LLC', 'ahmed@tradingbroker.com', '+971501234567', ARRAY['AE', 'SA', 'QA'], 'https://api.broker1.com/leads', 50, 250.00),
  ('GCC Markets', 'GCC Markets Group', 'contact@gccmarkets.com', '+966501234567', ARRAY['SA', 'KW', 'BH'], 'https://api.broker2.com/leads', 100, 300.00),
  ('Dubai Forex', 'Dubai Forex Services', 'leads@dubaiforex.com', '+971507654321', ARRAY['AE', 'OM'], 'https://api.broker3.com/leads', 75, 280.00);

-- Sample assignment rule
INSERT INTO assignment_rules (name, priority, conditions, broker_id, action_type)
VALUES
  ('UAE Leads to Ahmed Trading', 100, '{"country": ["AE"], "working_hours": true}',
   (SELECT id FROM brokers WHERE name = 'Ahmed Trading'), 'assign'),
  ('Saudi Leads to GCC Markets', 90, '{"country": ["SA"], "min_leads": 0}',
   (SELECT id FROM brokers WHERE name = 'GCC Markets'), 'assign');

-- =====================================================
-- DONE!
-- =====================================================
-- Next steps:
-- 1. Run this migration in Supabase SQL Editor
-- 2. Configure your .env with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
-- 3. Use the API endpoints to manage leads and brokers
