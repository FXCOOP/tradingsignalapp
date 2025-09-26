# Trading Signal App - PK Signal Pulse

## 🚀 **RENDER DEPLOYMENT INSTRUCTIONS**

**⚠️ IMPORTANT:** This repository contains the application in the `pksignalpulse` directory.

### For Render Web Service Configuration:
1. **Root Directory**: `pksignalpulse`
2. **Build Command**: `npm ci && npm run build`
3. **Start Command**: `npm start`
4. **Branch**: `main`

### Environment Variables Required:
```
NODE_ENV=production
DATABASE_URL=<from_postgresql_database>
EXNESS_AFFILIATE_URL=https://one.exnessonelink.com/a/c_8f0nxidtbt
APP_BASE_URL=https://tradingsignalapp.onrender.com
```

---

# PK Signal Pulse - Professional Trading Signals Platform

A bilingual (English/Urdu) trading signals platform built with Next.js 14, featuring daily signal generation, market analysis, and Exness affiliate integration.

## 🎯 Project Overview

FinSignals is a comprehensive trading signals platform designed for the Pakistani market, offering:

- **Daily Trading Signals**: 3-4 professional signals per day with Entry/SL/TP levels
- **Bilingual Support**: Full English and Urdu (RTL) support
- **SEO Optimized**: Pakistan-first SEO strategy with hreflang, News Sitemaps
- **Affiliate Integration**: Exness affiliate program with commission tracking
- **Content Management**: HTML articles with archive functionality
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL

## 🚀 Features

### Core Features
- ✅ Bilingual content (EN/UR) with RTL support
- ✅ Daily signal generation using OpenAI GPT-4
- ✅ Professional signal cards with technical analysis
- ✅ HTML article system with rich content
- ✅ Archive with filtering and search
- ✅ Exness affiliate integration
- ✅ SEO optimization for Pakistan market

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS with custom design system
- ✅ Prisma ORM with PostgreSQL
- ✅ next-intl for internationalization
- ✅ Responsive design with mobile-first approach
- ✅ Core Web Vitals optimization

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Git

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tradesignalapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/finsignals"
   OPENAI_API_KEY="your_openai_api_key_here"
   OPENAI_MODEL="gpt-5-nano"
   NEXTAUTH_SECRET="your_nextauth_secret_here"
   NEXTAUTH_URL="http://localhost:3000"
   AFFILIATE_JSON='{"default": [{"label": "Exness — Sign Up", "url": "https://one.exnessonelink.com/a/c_8f0nxidtbt", "rel": "sponsored nofollow"}], "banners": [...]}'
   ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Visit the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤖 Signal Generation

The platform uses OpenAI GPT-4 to generate daily trading signals:

### API Endpoint
```
POST /api/generate-signals
Authorization: Bearer <token>
```

### Generated Content
- 3-4 trading signals per day
- Professional market analysis
- Entry, Stop Loss, Take Profit levels
- Confidence ratings (1-10)
- Supporting sources and references
- Automatic English→Urdu translation

## 🌐 SEO Implementation

### Key Features
- **Hreflang**: Proper EN/UR-PK language targeting
- **News Sitemap**: `/news-sitemap.xml` (48h content)
- **Regular Sitemap**: `/sitemap.xml` (all pages)
- **JSON-LD**: NewsArticle structured data
- **OpenGraph**: Dynamic social media optimization
- **Core Web Vitals**: Performance optimization

### URLs Structure
```
/en - English homepage
/ur - Urdu homepage (RTL)
/en/article/[slug] - English articles
/ur/article/[slug] - Urdu articles
/en/archive - English archive
/ur/archive - Urdu archive
```

## 💰 Affiliate Integration

### Exness Partnership
- Commission tiers: $60-$830 based on deposit amount
- UTM tracking and SubID support
- Responsive banner integration
- Multiple placement slots

### Banner Slots
- `home_top` - Homepage hero banner
- `sidebar_1` - Article sidebar (300x250)
- `sidebar_2` - Article sidebar (120x600)
- `article_mid` - In-article banner
- `article_bottom` - Article footer banner

## 🚀 Development

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Content Creation Workflow
1. **Generate**: Daily cron generates signal drafts
2. **Review**: Editor reviews and approves content
3. **Publish**: Automated EN→UR translation and publishing
4. **SEO**: Automatic sitemap updates and social media optimization

### Code Quality
```bash
# Run linting
npm run lint

# Run type checking
npm run build
```

## 📈 Performance Targets

### Core Web Vitals
- **LCP**: < 2.5s on mobile
- **FID**: < 100ms
- **CLS**: < 0.1

### SEO Goals (T+30/T+60)
- 90% indexation within 30 days
- 200-500 daily users from Pakistan within 60 days
- 3%+ organic CTR

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set up PostgreSQL database (Vercel Postgres or external)
4. Deploy with automatic previews

### Environment Variables
```env
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
NEXTAUTH_SECRET=...
AFFILIATE_JSON={"default":...}
```

---

Built with ❤️ for the Pakistani trading community
