# FinoGlob Subdomain Setup Guide

Complete guide to deploy `trdflwfinoglob.html` on a subdomain like `finoglob.yourdomain.com` or as a separate domain.

---

## 📋 Quick Overview

**File:** `trdflwfinoglob.html`
**Subdomain:** `finoglob.yourdomain.com`
**Configuration:** `vercel-finoglob.json`

---

## 🚀 Option 1: Vercel Subdomain Setup

### Step 1: Deploy to Vercel

#### Method A: Using Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select your GitHub repository: `tradesignalapp`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty
   - **Output Directory:** `./`
   - **Install Command:** Leave empty

4. **Environment Variables** (if needed)
   - Add any environment variables (Supabase keys are already in the HTML)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

#### Method B: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy with custom config
vercel --prod --name finoglob-landing
```

---

### Step 2: Add Custom Domain/Subdomain

#### For Subdomain (e.g., finoglob.yourdomain.com)

1. **In Vercel Dashboard:**
   - Go to your deployed project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter: `finoglob.yourdomain.com`
   - Click "Add"

2. **Get DNS Records**
   - Vercel will show you DNS records to add
   - Example:
     ```
     Type: CNAME
     Name: finoglob
     Value: cname.vercel-dns.com
     ```

3. **Add DNS Records** (in your domain provider):

   **If using Cloudflare:**
   - Go to Cloudflare Dashboard
   - Select your domain
   - Go to "DNS" → "Records"
   - Click "Add record"
   - Type: `CNAME`
   - Name: `finoglob`
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only (grey cloud)
   - Click "Save"

   **If using GoDaddy:**
   - Go to GoDaddy Domain Manager
   - Click "DNS" → "Manage Zones"
   - Click "Add"
   - Type: `CNAME`
   - Host: `finoglob`
   - Points to: `cname.vercel-dns.com`
   - TTL: 1 Hour
   - Click "Save"

   **If using Namecheap:**
   - Go to Domain List
   - Click "Manage"
   - Go to "Advanced DNS"
   - Click "Add New Record"
   - Type: `CNAME Record`
   - Host: `finoglob`
   - Value: `cname.vercel-dns.com`
   - Click "Save"

4. **Wait for Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually takes 10-30 minutes
   - Check status: https://dnschecker.org

5. **Verify SSL Certificate**
   - Vercel automatically provisions SSL certificate
   - Your site will be available at: `https://finoglob.yourdomain.com`

---

## 🎯 Option 2: Deploy as Separate Domain

If you want to use a completely separate domain (e.g., `finoglob-trading.com`):

### Step 1: Purchase Domain
- Buy domain from: Namecheap, GoDaddy, Google Domains, etc.

### Step 2: Deploy to Vercel
- Follow same steps as Option 1

### Step 3: Add Custom Domain
1. In Vercel Dashboard → Settings → Domains
2. Add your root domain: `finoglob-trading.com`
3. Also add www subdomain: `www.finoglob-trading.com`

### Step 4: Update DNS Records
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔧 Option 3: Deploy on Your Current Domain

If you want it at `yourdomain.com/finoglob`:

### Update `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/finoglob",
      "destination": "/trdflwfinoglob.html"
    },
    {
      "source": "/finoglob/:path*",
      "destination": "/trdflwfinoglob.html"
    }
  ]
}
```

Then deploy normally. Access at: `yourdomain.com/finoglob`

---

## 📝 Option 4: Netlify Deployment

### Step 1: Create `netlify.toml`

Create file: `netlify-finoglob.toml`

```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/trdflwfinoglob.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "origin-when-cross-origin"
```

### Step 2: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=. --site-name=finoglob-landing
```

### Step 3: Add Custom Domain
- In Netlify Dashboard → Domain Settings → Add custom domain
- Follow DNS setup instructions

---

## 🌐 Option 5: Simple GitHub Pages

### Step 1: Rename File
```bash
# Copy and rename to index.html for a clean URL
cp trdflwfinoglob.html index.html
```

### Step 2: Create New Repository
1. Create new GitHub repository: `finoglob-landing`
2. Push only the `index.html` file

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages"
3. Source: Main branch
4. Save

### Step 4: Add Custom Domain
1. In Pages settings, add custom domain
2. Update DNS at your domain provider:
   ```
   Type: CNAME
   Name: finoglob
   Value: yourusername.github.io
   ```

Access at: `https://finoglob.yourdomain.com`

---

## ✅ Testing Your Deployment

### 1. Check DNS Propagation
```bash
# Check if DNS is live
nslookup finoglob.yourdomain.com

# Or use online tool
https://dnschecker.org
```

### 2. Test SSL Certificate
```bash
# Check HTTPS
curl -I https://finoglob.yourdomain.com
```

### 3. Test Form Submission
1. Open the page
2. Fill out the signup form
3. Submit
4. Check Supabase database for the new entry

### 4. Test Analytics
1. Open browser DevTools (F12)
2. Go to Network tab
3. Look for analytics requests to `postAnalytics`

### 5. Test Multi-Language
1. Click language selector
2. Switch between languages
3. Verify UI updates

---

## 🔒 Security Checklist

- ✅ SSL Certificate enabled (HTTPS)
- ✅ Security headers configured
- ✅ Supabase keys are anon keys (safe for client-side)
- ✅ Form validation enabled
- ✅ CORS properly configured

---

## 📊 Monitoring

### Vercel Analytics
```bash
# Enable Vercel Analytics in dashboard
Settings → Analytics → Enable
```

### Track Traffic
- Google Analytics (add tracking code if needed)
- Built-in ravxx analytics (already included)

---

## 🆘 Troubleshooting

### DNS Not Resolving
```bash
# Clear DNS cache (Windows)
ipconfig /flushdns

# Clear DNS cache (Mac)
sudo dscacheutil -flushcache

# Check propagation
https://dnschecker.org
```

### SSL Certificate Issues
- Wait 24 hours for full propagation
- Ensure DNS is pointing correctly
- Check Vercel dashboard for SSL status

### Form Not Submitting
1. Check browser console for errors
2. Verify Supabase URL and anon key
3. Check network tab for failed requests
4. Verify CORS settings in Supabase

### Page Not Loading
1. Check deployment status in Vercel
2. Verify file path in configuration
3. Check for JavaScript errors in console

---

## 🎨 Customization

### Update Branding
Edit `trdflwfinoglob.html`:
- Line 6: Update page title
- Line 1019-1023: Update logo and branding
- Update color scheme in CSS

### Update Supabase
- Line 1254-1255: Update Supabase credentials

### Update Analytics
- Line 25: Update analytics parameters

---

## 📞 Support

If you encounter issues:
1. Check deployment logs in Vercel/Netlify dashboard
2. Verify DNS records are correct
3. Check browser console for errors
4. Ensure Supabase is properly configured

---

## 🎯 Recommended Setup

**For Best Results:**
1. Use Vercel (fastest, free SSL, easy setup)
2. Set up subdomain: `finoglob.yourdomain.com`
3. Enable Vercel Analytics
4. Monitor form submissions in Supabase

**Quick Start Command:**
```bash
vercel --prod --name finoglob-landing
```

Then add custom domain in Vercel dashboard!

---

## 📁 File Structure

```
tradesignalapp/
├── trdflwfinoglob.html          # Main landing page
├── vercel-finoglob.json         # Vercel configuration
└── FINOGLOB-SUBDOMAIN-SETUP.md  # This guide
```

---

**Ready to deploy? Follow Option 1 for the quickest setup!**
