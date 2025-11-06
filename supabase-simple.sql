-- Simple signups table - minimal version that should work immediately

CREATE TABLE signups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    country TEXT,
    country_code TEXT,
    trading_experience TEXT,
    account_size TEXT,
    lead_source TEXT,
    lead_type TEXT,
    lead_status TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    terms_accepted BOOLEAN,
    detected_country TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    page_language TEXT,
    signup_timestamp TIMESTAMP WITH TIME ZONE
);

ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anon users" ON signups
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON signups
    FOR SELECT TO authenticated USING (true);
