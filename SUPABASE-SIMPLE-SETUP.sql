-- ============================================
-- SIMPLE VERSION - No Errors Guaranteed
-- ============================================
-- This creates ONLY what's missing, skips everything that exists

-- Create trading_signals table
CREATE TABLE IF NOT EXISTS public.trading_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol TEXT NOT NULL,
    signal_type TEXT NOT NULL,
    entry_price DECIMAL(10, 2) NOT NULL,
    target_price DECIMAL(10, 2) NOT NULL,
    stop_loss DECIMAL(10, 2) NOT NULL,
    confidence_level INTEGER NOT NULL,
    timeframe TEXT NOT NULL,
    technical_reasoning TEXT NOT NULL,
    risk_reward_ratio DECIMAL(5, 2) NOT NULL,
    market_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create news_articles table
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    read_time INTEGER NOT NULL,
    image_url TEXT,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    views INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create market_analysis table
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
    sentiment TEXT NOT NULL,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create educational_content table
CREATE TABLE IF NOT EXISTS public.educational_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty_level TEXT NOT NULL,
    quiz_question TEXT,
    quiz_answer TEXT,
    key_takeaway TEXT NOT NULL,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_signal_views table
CREATE TABLE IF NOT EXISTS public.user_signal_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    signal_id UUID NOT NULL,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, signal_id)
);

-- Create user_article_views table
CREATE TABLE IF NOT EXISTS public.user_article_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    article_id UUID NOT NULL,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- Create followed_signals table
CREATE TABLE IF NOT EXISTS public.followed_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    signal_id UUID NOT NULL,
    followed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, signal_id)
);

-- Create broker_accounts table
CREATE TABLE IF NOT EXISTS public.broker_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    broker_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_signal_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followed_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_accounts ENABLE ROW LEVEL SECURITY;

-- Insert sample data (only if table is empty)
INSERT INTO public.trading_signals (symbol, signal_type, entry_price, target_price, stop_loss, confidence_level, timeframe, technical_reasoning, risk_reward_ratio, market_type)
SELECT 'AED/USD', 'STRONG BUY', 3.67, 3.69, 3.65, 87, '4H', 'UAE Dirham showing bullish momentum', 2.5, 'forex'
WHERE NOT EXISTS (SELECT 1 FROM public.trading_signals LIMIT 1);

INSERT INTO public.trading_signals (symbol, signal_type, entry_price, target_price, stop_loss, confidence_level, timeframe, technical_reasoning, risk_reward_ratio, market_type)
SELECT 'SABIC', 'BUY', 85.75, 89.20, 83.40, 82, '1D', 'Breaking above resistance with volume', 1.5, 'stocks'
WHERE NOT EXISTS (SELECT 1 FROM public.trading_signals WHERE symbol = 'SABIC');

INSERT INTO public.trading_signals (symbol, signal_type, entry_price, target_price, stop_loss, confidence_level, timeframe, technical_reasoning, risk_reward_ratio, market_type)
SELECT 'Gold', 'STRONG BUY', 2385.00, 2445.00, 2355.00, 91, '1D', 'Testing support with bullish divergence', 2.0, 'commodities'
WHERE NOT EXISTS (SELECT 1 FROM public.trading_signals WHERE symbol = 'Gold');

-- Verify: Count all tables
SELECT
  'users' as table_name, COUNT(*) as count FROM public.users
UNION ALL SELECT 'trading_signals', COUNT(*) FROM public.trading_signals
UNION ALL SELECT 'news_articles', COUNT(*) FROM public.news_articles
UNION ALL SELECT 'user_signal_views', COUNT(*) FROM public.user_signal_views
UNION ALL SELECT 'user_article_views', COUNT(*) FROM public.user_article_views
UNION ALL SELECT 'followed_signals', COUNT(*) FROM public.followed_signals
UNION ALL SELECT 'broker_accounts', COUNT(*) FROM public.broker_accounts;
