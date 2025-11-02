# 🔐 CRM Access Credentials

**CONFIDENTIAL - Keep this information secure**

---

## 🌐 Production Access

### **Live URL:**
```
https://your-site.vercel.app/crm
```
*Will be provided after deployment*

---

## 🔑 Login Credentials

### **Username:**
```
admin
```

### **Password:**
```
crm2025
```

---

## 📝 How to Access

### **Step 1: Navigate to CRM**
Open your browser and go to:
```
https://your-site.vercel.app/crm
```

### **Step 2: Enter Credentials**
A login popup will appear (HTTP Basic Auth):

```
┌──────────────────────────────┐
│  Authentication Required     │
├──────────────────────────────┤
│  Username: admin             │
│  Password: ••••••••          │
│                              │
│  [Cancel]  [Sign In]         │
└──────────────────────────────┘
```

Enter:
- **Username:** `admin`
- **Password:** `crm2025`

### **Step 3: Access CRM Dashboard**
After authentication, you'll see the full CRM dashboard!

---

## 🔧 Changing Credentials

### **Option 1: Environment Variables (Recommended)**

In your hosting platform (Vercel/Netlify):

1. Go to **Settings** → **Environment Variables**
2. Add/Update:
   ```
   CRM_USERNAME=your_new_username
   CRM_PASSWORD=your_new_password
   ```
3. **Redeploy** the site

### **Option 2: Local Development**

Edit your `.env.local` file:
```env
CRM_USERNAME=your_new_username
CRM_PASSWORD=your_new_password
```

---

## 🌍 Different Environments

### **Local Development:**
```
http://localhost:3000/crm
Username: admin
Password: crm2025
```

### **Staging:**
```
https://your-site-staging.vercel.app/crm
Username: admin
Password: crm2025
```

### **Production:**
```
https://your-site.vercel.app/crm
Username: admin (or custom)
Password: crm2025 (or custom)
```

---

## 🔐 Security Best Practices

### **1. Change Default Password**
```bash
# In production, use a strong password:
CRM_PASSWORD=YourStr0ng!P@ssw0rd2025
```

### **2. Use Different Credentials Per Environment**
```env
# Development
CRM_USERNAME=dev_admin
CRM_PASSWORD=dev_pass_123

# Production
CRM_USERNAME=prod_admin
CRM_PASSWORD=SuperSecure!Pass2025
```

### **3. Rotate Credentials Regularly**
- Change password every 3 months
- Use password manager
- Never commit credentials to git

### **4. Monitor Access**
Check logs for unauthorized attempts:
```sql
SELECT * FROM lead_activity_log
WHERE activity_type = 'crm_access'
ORDER BY created_at DESC;
```

---

## 👥 Multiple User Access

### **Option 1: Shared Credentials (Simple)**
Share the same username/password with your team.

### **Option 2: Multiple Users (Advanced)**
Edit `src/middleware.ts` to support multiple users:

```typescript
const validUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'manager', password: 'manager123' },
  { username: 'analyst', password: 'analyst123' }
];

const isValid = validUsers.some(
  user => user.username === username && user.password === password
);
```

---

## 🆘 Troubleshooting

### **Can't Access CRM?**

1. **Double-check credentials:**
   - Username: `admin` (all lowercase)
   - Password: `crm2025` (no spaces)

2. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Safari: Cmd+Opt+E

3. **Try incognito/private mode:**
   - Chrome: Ctrl+Shift+N
   - Safari: Cmd+Shift+N

4. **Check environment variables:**
   ```bash
   # Verify they're set
   echo $CRM_USERNAME
   echo $CRM_PASSWORD
   ```

### **Wrong Credentials Error?**

1. Browser shows: "401 Unauthorized"
2. Click "Cancel" to try again
3. Re-enter credentials carefully
4. Contact admin if still failing

### **Login Popup Keeps Appearing?**

1. Clear saved passwords for the site
2. Use correct credentials
3. Try different browser

---

## 📱 Mobile Access

### **iOS Safari:**
1. Open Safari
2. Go to CRM URL
3. Enter credentials in popup
4. ✅ Access granted

### **Android Chrome:**
1. Open Chrome
2. Go to CRM URL
3. Enter credentials in popup
4. ✅ Access granted

**Note:** Mobile browsers remember credentials after first login.

---

## 🔗 Share Access Securely

### **DO:**
✅ Share via secure messaging (Signal, WhatsApp)
✅ Send username and password separately
✅ Use password manager (1Password, LastPass)
✅ Set expiration reminder

### **DON'T:**
❌ Email credentials in plain text
❌ Post in public channels (Slack, Teams)
❌ Write on paper or sticky notes
❌ Share screenshot with credentials

---

## 📊 Access Logging

All CRM access is logged automatically:

```sql
-- View recent logins
SELECT
  ip_address,
  user_agent,
  created_at
FROM lead_activity_log
WHERE activity_type = 'crm_access'
ORDER BY created_at DESC
LIMIT 50;
```

---

## 🔄 Resetting Access

### **Forgot Password?**

1. Access server environment variables
2. Reset `CRM_PASSWORD`
3. Redeploy
4. Use new password

### **Locked Out?**

1. Check environment variables are set
2. Verify middleware.ts exists
3. Redeploy site
4. Clear browser cache

---

## 🎯 Quick Reference Card

Print or save this:

```
═══════════════════════════════════
     CRM ACCESS CREDENTIALS
═══════════════════════════════════

URL:      https://your-site.vercel.app/crm
Username: admin
Password: crm2025

KEEP SECURE - DO NOT SHARE PUBLICLY
═══════════════════════════════════
```

---

## 📞 Support

Issues with access? Contact:
- Email: your-email@domain.com
- Slack: #crm-support
- Emergency: +XXX-XXX-XXXX

---

**Security Notice:** This document contains sensitive credentials.
Store securely and share only with authorized personnel.

🔐 **Last Updated:** 2025-01-02
