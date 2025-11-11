-- Create language_tracking table for BrokerV2 language analytics
-- Tracks both auto-detected language selections and manual changes

CREATE TABLE IF NOT EXISTS language_tracking (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL CHECK (event_type IN ('auto_detect', 'manual_change')),
    country_code TEXT,
    language_code TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    landing_page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_language_tracking_event_type ON language_tracking(event_type);
CREATE INDEX IF NOT EXISTS idx_language_tracking_country_code ON language_tracking(country_code);
CREATE INDEX IF NOT EXISTS idx_language_tracking_language_code ON language_tracking(language_code);
CREATE INDEX IF NOT EXISTS idx_language_tracking_created_at ON language_tracking(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE language_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for tracking)
CREATE POLICY "Allow public inserts" ON language_tracking
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow reads only for authenticated users (for analytics)
CREATE POLICY "Allow authenticated reads" ON language_tracking
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Add comments for documentation
COMMENT ON TABLE language_tracking IS 'Tracks language selection events on BrokerV2 landing page';
COMMENT ON COLUMN language_tracking.event_type IS 'Type of event: auto_detect (IP-based) or manual_change (user selected)';
COMMENT ON COLUMN language_tracking.country_code IS 'ISO country code detected from IP';
COMMENT ON COLUMN language_tracking.language_code IS 'Language code selected (e.g., es, fr, zh-CN)';
COMMENT ON COLUMN language_tracking.ip_address IS 'Visitor IP address';
COMMENT ON COLUMN language_tracking.user_agent IS 'Browser user agent string';
COMMENT ON COLUMN language_tracking.referrer IS 'HTTP referrer URL';
COMMENT ON COLUMN language_tracking.landing_page IS 'Full URL of the landing page';
COMMENT ON COLUMN language_tracking.created_at IS 'Timestamp when the event occurred';
