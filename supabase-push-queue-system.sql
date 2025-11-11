-- ================================================================
-- PUSH QUEUE SYSTEM FOR TRADING CRM
-- ================================================================
-- Working Hours: 04:00-13:00 GMT+2 (Monday-Friday)
-- Daily Cap: 10 leads per day
-- Natural spacing between pushes
-- ================================================================

-- 1. Add queue management fields to signups table
ALTER TABLE signups ADD COLUMN IF NOT EXISTS push_queue_status TEXT DEFAULT 'pending';
ALTER TABLE signups ADD COLUMN IF NOT EXISTS push_queue_comment TEXT;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS push_scheduled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS push_attempts INTEGER DEFAULT 0;
ALTER TABLE signups ADD COLUMN IF NOT EXISTS last_push_attempt_at TIMESTAMP WITH TIME ZONE;

-- 2. Create push_queue_log table for tracking
CREATE TABLE IF NOT EXISTS push_queue_log (
    id BIGSERIAL PRIMARY KEY,
    signup_id UUID REFERENCES signups(id),
    action TEXT NOT NULL, -- 'queued', 'pushed', 'failed', 'skipped'
    reason TEXT,
    push_count_today INTEGER,
    working_hours BOOLEAN,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create push_daily_stats table for daily cap tracking
CREATE TABLE IF NOT EXISTS push_daily_stats (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    push_count INTEGER DEFAULT 0,
    last_push_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_signups_push_queue_status ON signups(push_queue_status);
CREATE INDEX IF NOT EXISTS idx_signups_push_scheduled_at ON signups(push_scheduled_at);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_push_queue_log_signup_id ON push_queue_log(signup_id);
CREATE INDEX IF NOT EXISTS idx_push_queue_log_timestamp ON push_queue_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_push_daily_stats_date ON push_daily_stats(date DESC);

-- 5. Add comments for documentation
COMMENT ON COLUMN signups.push_queue_status IS 'Queue status: pending, waiting_working_hours, waiting_daily_cap, pushing, pushed, failed';
COMMENT ON COLUMN signups.push_queue_comment IS 'Human-readable reason for queue status';
COMMENT ON COLUMN signups.push_scheduled_at IS 'Next scheduled push attempt timestamp';
COMMENT ON COLUMN signups.push_attempts IS 'Number of push attempts made';
COMMENT ON COLUMN signups.last_push_attempt_at IS 'Timestamp of last push attempt';

COMMENT ON TABLE push_queue_log IS 'Audit log of all push queue actions';
COMMENT ON TABLE push_daily_stats IS 'Daily statistics for push rate limiting';

-- 6. Function to check if current time is within working hours (04:00-13:00 GMT+2, Mon-Fri)
CREATE OR REPLACE FUNCTION is_working_hours()
RETURNS BOOLEAN AS $$
DECLARE
    current_time_gmt2 TIMESTAMP WITH TIME ZONE;
    day_of_week INTEGER;
    hour_of_day INTEGER;
BEGIN
    -- Convert current UTC time to GMT+2
    current_time_gmt2 := NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+2';

    -- Get day of week (1=Monday, 7=Sunday)
    day_of_week := EXTRACT(ISODOW FROM current_time_gmt2);

    -- Get hour (0-23)
    hour_of_day := EXTRACT(HOUR FROM current_time_gmt2);

    -- Check if Monday-Friday (1-5) and between 04:00-13:00
    RETURN (day_of_week BETWEEN 1 AND 5) AND (hour_of_day >= 4 AND hour_of_day < 13);
END;
$$ LANGUAGE plpgsql;

-- 7. Function to get today's push count
CREATE OR REPLACE FUNCTION get_today_push_count()
RETURNS INTEGER AS $$
DECLARE
    today_date DATE;
    push_count INTEGER;
BEGIN
    today_date := CURRENT_DATE;

    SELECT COALESCE(push_count, 0) INTO push_count
    FROM push_daily_stats
    WHERE date = today_date;

    RETURN COALESCE(push_count, 0);
END;
$$ LANGUAGE plpgsql;

-- 8. Function to increment daily push count
CREATE OR REPLACE FUNCTION increment_daily_push_count()
RETURNS INTEGER AS $$
DECLARE
    today_date DATE;
    new_count INTEGER;
BEGIN
    today_date := CURRENT_DATE;

    -- Insert or update daily stats
    INSERT INTO push_daily_stats (date, push_count, last_push_at, updated_at)
    VALUES (today_date, 1, NOW(), NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        push_count = push_daily_stats.push_count + 1,
        last_push_at = NOW(),
        updated_at = NOW()
    RETURNING push_count INTO new_count;

    RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- 9. Function to calculate next working hours timestamp
CREATE OR REPLACE FUNCTION next_working_hours_start()
RETURNS TIMESTAMP WITH TIME ZONE AS $$
DECLARE
    current_time_gmt2 TIMESTAMP WITH TIME ZONE;
    next_start TIMESTAMP WITH TIME ZONE;
    day_of_week INTEGER;
    hour_of_day INTEGER;
BEGIN
    -- Convert current UTC time to GMT+2
    current_time_gmt2 := NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+2';
    day_of_week := EXTRACT(ISODOW FROM current_time_gmt2);
    hour_of_day := EXTRACT(HOUR FROM current_time_gmt2);

    -- If currently within working hours, return now
    IF (day_of_week BETWEEN 1 AND 5) AND (hour_of_day >= 4 AND hour_of_day < 13) THEN
        RETURN NOW();
    END IF;

    -- If after working hours today (Mon-Thu), return tomorrow 04:00 GMT+2
    IF (day_of_week BETWEEN 1 AND 4) AND (hour_of_day >= 13) THEN
        next_start := (CURRENT_DATE + INTERVAL '1 day' + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
        RETURN next_start;
    END IF;

    -- If before working hours today (Mon-Fri), return today 04:00 GMT+2
    IF (day_of_week BETWEEN 1 AND 5) AND (hour_of_day < 4) THEN
        next_start := (CURRENT_DATE + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
        RETURN next_start;
    END IF;

    -- If Friday after hours or weekend, return next Monday 04:00 GMT+2
    IF day_of_week = 5 AND hour_of_day >= 13 THEN
        -- Friday after 13:00 -> Monday
        next_start := (CURRENT_DATE + INTERVAL '3 days' + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
        RETURN next_start;
    END IF;

    IF day_of_week = 6 THEN
        -- Saturday -> Monday
        next_start := (CURRENT_DATE + INTERVAL '2 days' + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
        RETURN next_start;
    END IF;

    IF day_of_week = 7 THEN
        -- Sunday -> Monday
        next_start := (CURRENT_DATE + INTERVAL '1 day' + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
        RETURN next_start;
    END IF;

    -- Fallback: next Monday 04:00 GMT+2
    next_start := (CURRENT_DATE + INTERVAL '4 hours') AT TIME ZONE 'GMT+2' AT TIME ZONE 'UTC';
    RETURN next_start;
END;
$$ LANGUAGE plpgsql;

-- 10. View for queue dashboard
CREATE OR REPLACE VIEW push_queue_dashboard AS
SELECT
    COUNT(*) FILTER (WHERE push_queue_status = 'waiting_working_hours') AS waiting_working_hours,
    COUNT(*) FILTER (WHERE push_queue_status = 'waiting_daily_cap') AS waiting_daily_cap,
    COUNT(*) FILTER (WHERE push_queue_status = 'pending') AS pending,
    COUNT(*) FILTER (WHERE push_queue_status = 'pushing') AS currently_pushing,
    COUNT(*) FILTER (WHERE push_queue_status = 'pushed') AS successfully_pushed,
    COUNT(*) FILTER (WHERE push_queue_status = 'failed') AS failed,
    get_today_push_count() AS pushed_today,
    10 - get_today_push_count() AS remaining_today,
    is_working_hours() AS currently_working_hours,
    next_working_hours_start() AS next_working_hours
FROM signups;

-- 11. Enable Row Level Security (if needed)
ALTER TABLE push_queue_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_daily_stats ENABLE ROW LEVEL SECURITY;

-- 12. Create policies for authenticated users only
CREATE POLICY "Allow authenticated reads on push_queue_log" ON push_queue_log
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role writes on push_queue_log" ON push_queue_log
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on push_daily_stats" ON push_daily_stats
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role writes on push_daily_stats" ON push_daily_stats
    FOR ALL
    USING (true);

-- 13. Sample queries for monitoring

-- Get leads waiting in queue
-- SELECT id, email, country, push_queue_status, push_queue_comment, push_scheduled_at, created_at
-- FROM signups
-- WHERE push_queue_status IN ('waiting_working_hours', 'waiting_daily_cap')
-- ORDER BY push_scheduled_at ASC;

-- Get today's push statistics
-- SELECT * FROM push_daily_stats WHERE date = CURRENT_DATE;

-- Get push queue overview
-- SELECT * FROM push_queue_dashboard;

-- Get recent push activity
-- SELECT l.*, s.email, s.country
-- FROM push_queue_log l
-- JOIN signups s ON l.signup_id = s.id
-- ORDER BY l.timestamp DESC
-- LIMIT 50;
