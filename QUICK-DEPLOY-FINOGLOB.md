# Quick Deploy: FinoGlob Landing Page

## 🚀 Fastest Way to Deploy

### Option 1: One-Click Vercel Deploy (2 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd c:\Users\User\OneDrive\Desktop\tradesignalapp
   vercel --prod
   ```

3. **Add Subdomain:**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Settings → Domains → Add Domain
   - Enter: `finoglob.yourdomain.com`
   - Copy the DNS records

4. **Update DNS:**
   - Add CNAME record:
     - Name: `finoglob`
     - Value: `cname.vercel-dns.com`

5. **Done!** Your site is live at `https://finoglob.yourdomain.com`

---

## 🌐 DNS Configuration Quick Reference

### Cloudflare DNS
```
Type: CNAME
Name: finoglob
Target: cname.vercel-dns.com
Proxy: DNS only (grey cloud)
```

### GoDaddy DNS
```
Type: CNAME
Host: finoglob
Points to: cname.vercel-dns.com
TTL: 1 Hour
```

### Namecheap DNS
```
Type: CNAME Record
Host: finoglob
Value: cname.vercel-dns.com
TTL: Automatic
```

---

## 📋 Deployment Checklist

- [ ] File exists: `trdflwfinoglob.html` ✅
- [ ] Vercel CLI installed
- [ ] Project deployed to Vercel
- [ ] Custom domain added in Vercel
- [ ] DNS records updated
- [ ] SSL certificate active (automatic)
- [ ] Test form submission
- [ ] Test language switching

---

## 🧪 Test Your Deployment

1. **Check DNS:**
   ```bash
   nslookup finoglob.yourdomain.com
   ```

2. **Test HTTPS:**
   - Visit: `https://finoglob.yourdomain.com`
   - Check for SSL padlock icon

3. **Test Form:**
   - Fill out signup form
   - Submit
   - Check Supabase for new entry

4. **Test Languages:**
   - Click language selector
   - Try different languages

---

## 💡 Alternative: Direct File Access

If you just want to test the HTML file locally:

```bash
# Windows
start trdflwfinoglob.html

# Mac
open trdflwfinoglob.html

# Linux
xdg-open trdflwfinoglob.html
```

Or run a local server:
```bash
python -m http.server 8000
# Then visit: http://localhost:8000/trdflwfinoglob.html
```

---

## 🔧 If You Already Have Vercel Account

Just run:
```bash
vercel --prod --name finoglob-landing
```

Then add domain in dashboard!

---

**Need help?** Check [FINOGLOB-SUBDOMAIN-SETUP.md](FINOGLOB-SUBDOMAIN-SETUP.md) for detailed instructions.
