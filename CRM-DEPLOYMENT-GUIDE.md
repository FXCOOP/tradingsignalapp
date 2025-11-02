# 🚀 CRM Deployment Guide

Step-by-step guide to deploy your CRM system to production.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] ✅ All CRM files committed to Git
- [x] ✅ Database migration ready (`supabase-crm-migration.sql`)
- [x] ✅ Environment variables configured
- [x] ✅ Authentication middleware in place
- [x] ✅ Code pushed to GitHub

**Status:** Ready to deploy! 🎉

---

## 🔧 Setup Environment Variables

### **In Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# CRM Authentication (Required)
CRM_USERNAME=admin
CRM_PASSWORD=crm2025

# Optional (if you want to change defaults)
# CRM_USERNAME=your_custom_username
# CRM_PASSWORD=your_strong_password_here
```

5. Click **Save**

### **In Netlify Dashboard:**

1. Go to: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add the same variables as above
5. Click **Save**

---

## 🗄️ Setup Database

### **Step 1: Run Migration**

1. Open Supabase Dashboard: https://app.supabase.com
2. Go to **SQL Editor**
3. Copy entire content from: `supabase-crm-migration.sql`
4. Paste in SQL Editor
5. Click **RUN**
6. Wait for success message

### **Step 2: Verify Tables Created**

Check these tables exist:
- ✅ `brokers`
- ✅ `lead_assignments`
- ✅ `sales_status`
- ✅ `assignment_rules`
- ✅ `lead_activity_log`
- ✅ `webhook_logs`

### **Step 3: Verify Sample Data**

```sql
SELECT * FROM brokers LIMIT 5;
```

You should see 3 sample brokers.

---

## 🚀 Deploy to Vercel (Automatic)

Since your code is pushed to GitHub, Vercel will automatically deploy!

### **Automatic Deployment:**

1. Vercel detects push to `main` branch
2. Starts build automatically
3. Runs `npm run build`
4. Deploys to production
5. **Done!** ✅

### **Check Deployment Status:**

1. Go to: https://vercel.com/dashboard
2. Look for latest deployment
3. Status should show: **✅ Ready**

### **Get Your CRM URL:**

Your CRM will be at:
```
https://your-project-name.vercel.app/crm
```

Example URLs:
- `https://tradingsignalapp.vercel.app/crm`
- `https://tradeflow.vercel.app/crm`
- `https://gcc-signal-pro.vercel.app/crm`

---

## 🚀 Deploy to Vercel (Manual)

If automatic deployment didn't work:

### **Option 1: Via Dashboard**

1. Go to Vercel Dashboard
2. Click **Deploy** button
3. Wait for build to complete
4. Check deployment URL

### **Option 2: Via CLI**

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Copy the deployment URL shown
```

### **Option 3: Redeploy**

```bash
# Trigger redeploy
git commit --allow-empty -m "Trigger deploy"
git push origin main
```

---

## 🌐 Access Your CRM

### **Step 1: Find Your URL**

Check one of these:
1. Vercel Dashboard → Your Project → Domains
2. GitHub Repository → Deployments tab
3. Email from Vercel (deployment notification)

### **Step 2: Access CRM**

Open in browser:
```
https://your-domain.vercel.app/crm
```

### **Step 3: Enter Credentials**

Browser will show authentication popup:
```
Username: admin
Password: crm2025
```

### **Step 4: Verify Access**

You should see:
✅ CRM Dashboard with 4 tabs
✅ Overview metrics
✅ Lead list (if any signups exist)
✅ Sample brokers

---

## 🔐 Change Default Password

**IMPORTANT:** Change the default password for production!

### **In Vercel:**

1. Go to **Settings** → **Environment Variables**
2. Edit `CRM_PASSWORD`
3. Set new strong password: `YourStr0ng!Pass2025`
4. Click **Save**
5. Redeploy (automatic)

### **Generate Strong Password:**

```bash
# Random secure password
openssl rand -base64 16
```

Or use: https://passwordsgenerator.net/

---

## 📱 Test on Multiple Devices

### **Desktop:**
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### **Mobile:**
- ✅ iOS Safari
- ✅ Android Chrome

### **Tablet:**
- ✅ iPad
- ✅ Android tablet

---

## 🧪 Post-Deployment Testing

### **1. Test Authentication**

```bash
# Should prompt for login
curl https://your-site.vercel.app/crm

# Should work with credentials
curl -u admin:crm2025 https://your-site.vercel.app/crm
```

### **2. Test API Endpoints**

```bash
# Get leads
curl https://your-site.vercel.app/api/crm/leads

# Get brokers
curl https://your-site.vercel.app/api/crm/brokers

# Get analytics
curl https://your-site.vercel.app/api/crm/analytics
```

### **3. Test Lead Assignment**

1. Go to CRM → Leads tab
2. Click "Assign" on a lead
3. Select a broker
4. Verify assignment works

### **4. Test Webhook**

```bash
curl -X POST https://your-site.vercel.app/api/crm/webhook/status \
  -H "Content-Type: application/json" \
  -d '{
    "broker_api_key": "test",
    "lead_id": "test-id",
    "status": "contacted"
  }'
```

---

## 🐛 Troubleshooting Deployment

### **Build Failed?**

Check build logs:
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. View build logs
4. Fix errors and redeploy

**Common issues:**
- Missing environment variables
- TypeScript errors
- Missing dependencies

### **CRM Not Loading?**

1. Check deployment succeeded
2. Verify environment variables set
3. Check middleware.ts exists
4. View runtime logs

### **Authentication Not Working?**

1. Check `CRM_USERNAME` and `CRM_PASSWORD` are set
2. Verify middleware.ts is deployed
3. Clear browser cache
4. Try incognito mode

### **Database Errors?**

1. Verify Supabase credentials
2. Check migration ran successfully
3. Test database connection:
   ```sql
   SELECT 1;
   ```

---

## 📊 Monitor Deployment

### **View Logs:**

**Vercel:**
```
https://vercel.com/[team]/[project]/logs
```

**Check for:**
- ✅ Successful builds
- ✅ No runtime errors
- ✅ API requests working
- ✅ Database connections

### **Analytics:**

**Vercel Analytics:**
```
https://vercel.com/[team]/[project]/analytics
```

Track:
- Page views
- User sessions
- Performance metrics

---

## 🔄 Update Deployment

### **Deploy Updates:**

```bash
# Make changes
git add .
git commit -m "Update CRM features"
git push origin main

# Vercel auto-deploys!
```

### **Rollback If Needed:**

1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click **Promote to Production**
4. Confirm rollback

---

## 🌍 Custom Domain (Optional)

### **Add Custom Domain:**

1. Vercel Dashboard → Your Project
2. Go to **Settings** → **Domains**
3. Add domain: `crm.yoursite.com`
4. Follow DNS setup instructions
5. Wait for SSL certificate (automatic)

### **DNS Configuration:**

Add CNAME record:
```
Type:  CNAME
Name:  crm
Value: your-project.vercel.app
```

### **Access CRM:**

```
https://crm.yoursite.com
```

---

## 📞 Get Deployment URL

### **Check These Locations:**

1. **Vercel Dashboard:**
   - Go to your project
   - Look at top: `your-project.vercel.app`

2. **GitHub Repository:**
   - Go to **Environments** tab
   - Click latest deployment
   - See deployment URL

3. **Terminal Output:**
   ```bash
   git log -1
   # Check commit, then visit:
   # https://github.com/FXCOOP/tradingsignalapp/deployments
   ```

4. **Vercel CLI:**
   ```bash
   vercel list
   # Shows all deployments
   ```

---

## ✅ Deployment Complete!

Your CRM is now live at:

### **🌐 Production URL:**
```
https://[your-project].vercel.app/crm
```

### **🔑 Login:**
```
Username: admin
Password: crm2025
```

### **📱 Share With Team:**

Send this to your team:
```
CRM Access:
URL: https://your-project.vercel.app/crm
Username: admin
Password: crm2025

Keep credentials secure!
```

---

## 🎯 Next Steps

1. ✅ Change default password
2. ✅ Add real broker profiles
3. ✅ Test lead assignment
4. ✅ Configure webhook URLs with brokers
5. ✅ Monitor analytics
6. ✅ Train team on CRM usage

---

## 📚 Additional Resources

- **CRM Documentation:** [CRM-SYSTEM-README.md](CRM-SYSTEM-README.md)
- **Quick Start:** [CRM-QUICK-START.md](CRM-QUICK-START.md)
- **Access Guide:** [CRM-ACCESS-LINKS.md](CRM-ACCESS-LINKS.md)
- **Credentials:** [CRM-CREDENTIALS.md](CRM-CREDENTIALS.md)

---

**🎉 Congratulations! Your CRM is deployed and ready to use!**

Access it now: **https://your-site.vercel.app/crm**