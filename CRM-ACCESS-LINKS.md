# 🔗 CRM System - Access Links & Navigation

Quick reference for accessing your new Affiliate CRM & Back Office system.

---

## 🌐 Access URLs

### Main CRM Dashboard
```
http://localhost:3000/crm
```
**Production:**
```
https://yoursite.com/crm
```

### Standalone Access Page
```
http://localhost:3000/crm-access.html
```
Open this file directly in browser or host it separately.

---

## 🧭 Navigation Options

### Option 1: Main Site Header (When Logged In)

1. Log in to your main site
2. Look for the **🎯 CRM** button in the top right header
3. Clicks opens CRM in new tab

**Location in Code:**
- File: `src/app/page.tsx`
- Line: ~5314-5345
- The button appears next to the Logout button

### Option 2: Direct URL

Simply navigate to:
```
/crm
```

### Option 3: Standalone Access Page

Open `crm-access.html` for a beautiful landing page with:
- ✅ Quick access button
- ✅ Feature overview
- ✅ Documentation link

---

## 📱 CRM Dashboard Tabs

Once inside the CRM, you'll find **4 main tabs**:

### 1. 📊 Dashboard
```
/crm?tab=dashboard (default)
```
- Overview metrics
- Top performing brokers
- Country distribution
- Recent activity

### 2. 👥 Leads
```
/crm?tab=leads
```
- Full lead list
- Filters (status, country, broker)
- Manual assignment
- Lead details view

### 3. 🏢 Brokers
```
/crm?tab=brokers
```
- Broker profiles
- Performance metrics
- Add/Edit/Delete
- API configuration

### 4. 📈 Analytics
```
/crm?tab=analytics
```
- Status breakdown
- Detailed charts
- Performance reports

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api/crm`

### Lead Management
```
GET    /api/crm/leads              # List leads
PUT    /api/crm/leads              # Update lead
GET    /api/crm/leads/[id]         # Lead details
```

### Broker Management
```
GET    /api/crm/brokers            # List brokers
POST   /api/crm/brokers            # Create broker
GET    /api/crm/brokers/[id]       # Broker details
PUT    /api/crm/brokers/[id]       # Update broker
DELETE /api/crm/brokers/[id]       # Delete broker
```

### Lead Assignment
```
POST   /api/crm/assign-lead        # Assign lead to broker
```

### Webhooks
```
POST   /api/crm/webhook/status     # Receive status updates
GET    /api/crm/webhook/status     # API documentation
```

### Analytics
```
GET    /api/crm/analytics          # Get analytics data
```

---

## 🎨 Integration Examples

### Add CRM Link to Your Nav Menu

**HTML:**
```html
<a href="/crm" target="_blank" class="crm-link">
  🎯 CRM Dashboard
</a>
```

**React/Next.js:**
```jsx
<Link href="/crm" target="_blank">
  🎯 CRM Dashboard
</Link>
```

**JavaScript:**
```javascript
window.open('/crm', '_blank');
```

---

## 🔐 Access Control (To Be Implemented)

Currently, the CRM is accessible to all users. For production:

### Add Authentication Middleware

Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if accessing CRM
  if (request.nextUrl.pathname.startsWith('/crm')) {
    // Add your authentication check here
    const isAdmin = checkAdminAuth(request);

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/crm/:path*',
};
```

---

## 🎯 Quick Testing Checklist

After deployment, test these:

- [ ] CRM button appears in main site header (when logged in)
- [ ] CRM dashboard loads at `/crm`
- [ ] All 4 tabs work (Dashboard, Leads, Brokers, Analytics)
- [ ] Can view existing leads from signups
- [ ] Can assign a lead to a broker
- [ ] API endpoints return data
- [ ] Webhook endpoint accepts POST requests
- [ ] Mobile responsive design works

---

## 📞 Support & Documentation

- **Quick Start:** [CRM-QUICK-START.md](CRM-QUICK-START.md)
- **Full Documentation:** [CRM-SYSTEM-README.md](CRM-SYSTEM-README.md)
- **Database Migration:** [supabase-crm-migration.sql](supabase-crm-migration.sql)

---

## 🚀 Deployment Notes

### Vercel/Netlify
The CRM is a Next.js page and will be deployed automatically with your site.

### Custom Domain
```
https://crm.yoursite.com
```

You can set up a subdomain pointing to `/crm` route.

---

## 📊 Monitoring

Track CRM usage:
```sql
-- Check CRM access logs
SELECT * FROM lead_activity_log
WHERE activity_type = 'crm_access'
ORDER BY created_at DESC
LIMIT 100;

-- Check webhook calls
SELECT * FROM webhook_logs
ORDER BY created_at DESC
LIMIT 50;
```

---

## 🎉 You're All Set!

Access your CRM at: **http://localhost:3000/crm**

The button is in the header (when logged in) → **🎯 CRM**

---

**Built with ❤️ for efficient lead management**