-- ============================================
-- GCC Signal Pro - Complete Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor to create ALL tables

-- ============================================
-- 1. USERS TABLE (Already created, but included for reference)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    access_level TEXT NOT NULL DEFAULT 'free' CHECK (access_level IN ('free', 'premium')),
    has_broker_account BOOLEAN NOT NULL DEFAULT FALSE,
    free_signals_count INTEGER NOT NULL DEFAULT 0,
    free_articles_count INTEGER NOT NULL DEFAULT 0,
    broker_verified_at TIMESTAMPTZ,
    email_verification_token TEXT,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 2. TRADING SIGNALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.trading_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol TEXT NOT NULL,
    signal_type TEXT NOT NULL CHECK (signal_type IN ('BUY', 'SELL', 'STRONG BUY', 'STRONG SELL')),
    entry_price DECIMAL(10, 2) NOT NULL,
    target_price DECIMAL(10, 2) NOT NULL,
    stop_loss DECIMAL(10, 2) NOT NULL,
    confidence_level INTEGER NOT NULL CHECK (confidence_level BETWEEN 0 AND 100),
    timeframe TEXT NOT NULL,
    technical_reasoning TEXT NOT NULL,
    risk_reward_ratio DECIMAL(5, 2) NOT NULL,
    market_type TEXT NOT NULL CHECK (market_type IN ('forex', 'stocks', 'crypto', 'commodities')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hit_target', 'hit_stop', 'expired')),
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 3. NEWS ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('banking', 'forex', 'stocks', 'energy', 'economy', 'policy')),
    tags TEXT[] NOT NULL DEFAULT '{}',
    read_time INTEGER NOT NULL,
    image_url TEXT,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    views INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 4. MARKET ANALYSIS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.market_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    market_overview TEXT NOT NULL,
    sectoral_analysis JSONB NOT NULL,
    currency_analysis TEXT NOT NULL,
    global_impact TEXT NOT NULL,
    technical_analysis TEXT NOT NULL,
    economic_indicators JSONB NOT NULL,
    key_events TEXT[] NOT NULL DEFAULT '{}',
    trading_strategy TEXT NOT NULL,
    sentiment TEXT NOT NULL CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 5. EDUCATIONAL CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.educational_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('trading_tip', 'technical_analysis', 'risk_management', 'gcc_markets', 'trading_psychology')),
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    quiz_question TEXT,
    quiz_answer TEXT,
    key_takeaway TEXT NOT NULL,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 6. USER SIGNAL VIEWS TABLE (Track which signals users viewed)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_signal_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    signal_id UUID NOT NULL REFERENCES public.trading_signals(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, signal_id)
);

-- ============================================
-- 7. USER ARTICLE VIEWS TABLE (Track which articles users viewed)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_article_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.news_articles(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- ============================================
-- 8. FOLLOWED SIGNALS TABLE (Users can follow/copy signals)
-- ============================================
CREATE TABLE IF NOT EXISTS public.followed_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    signal_id UUID NOT NULL REFERENCES public.trading_signals(id) ON DELETE CASCADE,
    followed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, signal_id)
);

-- ============================================
-- 9. BROKER ACCOUNTS TABLE (Track user broker connections)
-- ============================================
CREATE TABLE IF NOT EXISTS public.broker_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    broker_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON public.users(access_level);
CREATE INDEX IF NOT EXISTS idx_users_has_broker_account ON public.users(has_broker_account);

-- Trading signals indexes
CREATE INDEX IF NOT EXISTS idx_signals_status ON public.trading_signals(status);
CREATE INDEX IF NOT EXISTS idx_signals_market_type ON public.trading_signals(market_type);
CREATE INDEX IF NOT EXISTS idx_signals_generated_at ON public.trading_signals(generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_signals_is_premium ON public.trading_signals(is_premium);

-- News articles indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_premium ON public.news_articles(is_premium);

-- Market analysis indexes
CREATE INDEX IF NOT EXISTS idx_analysis_date ON public.market_analysis(date DESC);

-- Educational content indexes
CREATE INDEX IF NOT EXISTS idx_education_category ON public.educational_content(category);
CREATE INDEX IF NOT EXISTS idx_education_difficulty ON public.educational_content(difficulty_level);

-- User views indexes
CREATE INDEX IF NOT EXISTS idx_user_signal_views_user ON public.user_signal_views(user_id);
CREATE INDEX IF NOT EXISTS idx_user_article_views_user ON public.user_article_views(user_id);

-- Followed signals indexes
CREATE INDEX IF NOT EXISTS idx_followed_signals_user ON public.followed_signals(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_signal_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followed_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_accounts ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full access users" ON public.users FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- Trading signals policies (public can view non-premium, premium users see all)
CREATE POLICY "Anyone can view free signals" ON public.trading_signals FOR SELECT USING (is_premium = FALSE);
CREATE POLICY "Premium users can view all signals" ON public.trading_signals FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND has_broker_account = TRUE)
);
CREATE POLICY "Service role full access signals" ON public.trading_signals FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- News articles policies
CREATE POLICY "Anyone can view free articles" ON public.news_articles FOR SELECT USING (is_premium = FALSE);
CREATE POLICY "Premium users can view all articles" ON public.news_articles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND has_broker_account = TRUE)
);
CREATE POLICY "Service role full access articles" ON public.news_articles FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- Market analysis policies
CREATE POLICY "Anyone can view free analysis" ON public.market_analysis FOR SELECT USING (is_premium = FALSE);
CREATE POLICY "Premium users can view all analysis" ON public.market_analysis FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND has_broker_account = TRUE)
);
CREATE POLICY "Service role full access analysis" ON public.market_analysis FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- Educational content policies
CREATE POLICY "Anyone can view free education" ON public.educational_content FOR SELECT USING (is_premium = FALSE);
CREATE POLICY "Premium users can view all education" ON public.educational_content FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND has_broker_account = TRUE)
);
CREATE POLICY "Service role full access education" ON public.educational_content FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- User views policies
CREATE POLICY "Users can view own signal views" ON public.user_signal_views FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own article views" ON public.user_article_views FOR ALL USING (auth.uid() = user_id);

-- Followed signals policies
CREATE POLICY "Users can manage own followed signals" ON public.followed_signals FOR ALL USING (auth.uid() = user_id);

-- Broker accounts policies
CREATE POLICY "Users can view own broker accounts" ON public.broker_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own broker accounts" ON public.broker_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role full access broker accounts" ON public.broker_accounts FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================

-- Create update function (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_analysis_updated_at BEFORE UPDATE ON public.market_analysis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.educational_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_broker_updated_at BEFORE UPDATE ON public.broker_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample trading signal
INSERT INTO public.trading_signals (symbol, signal_type, entry_price, target_price, stop_loss, confidence_level, timeframe, technical_reasoning, risk_reward_ratio, market_type, is_premium)
VALUES
('AED/USD', 'STRONG BUY', 3.67, 3.69, 3.65, 87, '4H', 'UAE Dirham showing bullish momentum with strong support. Oil prices rally supports continued strength.', 2.5, 'forex', FALSE),
('SABIC', 'BUY', 85.75, 89.20, 83.40, 82, '1D', 'Breaking above resistance with strong volume. Petrochemical sector outlook positive.', 1.5, 'stocks', FALSE),
('Gold', 'STRONG BUY', 2385.00, 2445.00, 2355.00, 91, '1D', 'Testing key support with bullish RSI divergence. GCC investors increasing positions.', 2.0, 'commodities', FALSE);

-- Insert sample news article
INSERT INTO public.news_articles (title, slug, summary, content, author, category, tags, read_time, is_premium)
VALUES
('UAE Banking Sector Posts Record Q3 Profits', 'uae-banking-record-q3-profits', 'Major UAE banks reported combined Q3 profits exceeding AED 15 billion, driven by digital transformation.', 'Full article content here...', 'Sarah Al-Fahim', 'banking', ARRAY['banking', 'UAE', 'profits'], 8, FALSE);

-- Insert sample educational content
INSERT INTO public.educational_content (title, content, category, difficulty_level, key_takeaway, is_premium)
VALUES
('Understanding Support and Resistance in GCC Markets', 'Support and resistance levels are fundamental concepts...', 'technical_analysis', 'beginner', 'Support and resistance levels help identify entry and exit points', FALSE);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Count records in each table
SELECT 'users' as table_name, COUNT(*) as count FROM public.users
UNION ALL SELECT 'trading_signals', COUNT(*) FROM public.trading_signals
UNION ALL SELECT 'news_articles', COUNT(*) FROM public.news_articles
UNION ALL SELECT 'market_analysis', COUNT(*) FROM public.market_analysis
UNION ALL SELECT 'educational_content', COUNT(*) FROM public.educational_content
UNION ALL SELECT 'user_signal_views', COUNT(*) FROM public.user_signal_views
UNION ALL SELECT 'user_article_views', COUNT(*) FROM public.user_article_views
UNION ALL SELECT 'followed_signals', COUNT(*) FROM public.followed_signals
UNION ALL SELECT 'broker_accounts', COUNT(*) FROM public.broker_accounts;
