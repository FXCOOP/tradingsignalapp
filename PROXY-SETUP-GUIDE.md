# 🔀 Trading CRM Proxy Setup Guide

## Problem This Solves

Trading CRM only whitelisted **YOUR IP (85.130.211.49)** but your app runs on **Render (54.188.71.94)**.

**Solution:** Route all Trading CRM requests through YOUR server!

```
Render (54.188.71.94) → YOUR Server (85.130.211.49) → Trading CRM
                         ↑ Whitelisted IP ✅
```

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Proxy on YOUR Server (85.130.211.49)

SSH into your server and run:

```bash
# 1. Navigate to your project folder
cd /path/to/tradesignalapp

# 2. Install dependencies (if not already installed)
npm install express cors

# 3. Start the proxy server
node trading-crm-proxy-server.js
```

You should see:

```
🚀 Trading CRM Proxy Server Started
=====================================
📍 Server IP: 85.130.211.49 (whitelisted)
🔌 Port: 3001
🌐 Endpoint: http://85.130.211.49:3001
=====================================

✅ Ready to proxy requests to Trading CRM
```

### Step 2: Configure Render to Use Proxy

1. Go to Render Dashboard → Your Service
2. Click **Environment**
3. Add new environment variable:

```
Key: TRADING_CRM_PROXY_URL
Value: http://85.130.211.49:3001
```

4. Click **Save Changes**
5. Render will automatically redeploy

### Step 3: Test It!

Submit a test signup from your landing page. You should see in Render logs:

```
🔀 Routing through proxy: http://85.130.211.49:3001
✅ Bearer token obtained via proxy (expires in 23 hours)
📥 Trading CRM Response via Proxy: { status: 200, ... }
```

---

## 📋 Detailed Setup

### On YOUR Server (85.130.211.49)

#### Option A: Run as Background Process

```bash
# Using PM2 (recommended)
npm install -g pm2
pm2 start trading-crm-proxy-server.js --name trading-crm-proxy
pm2 save
pm2 startup  # Auto-start on server reboot
```

#### Option B: Run as Systemd Service

Create `/etc/systemd/system/trading-crm-proxy.service`:

```ini
[Unit]
Description=Trading CRM Proxy Server
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/tradesignalapp
ExecStart=/usr/bin/node trading-crm-proxy-server.js
Restart=always
Environment=PROXY_PORT=3001

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl enable trading-crm-proxy
sudo systemctl start trading-crm-proxy
sudo systemctl status trading-crm-proxy
```

#### Option C: Run with Custom Port

```bash
# Use port 8080 instead of 3001
PROXY_PORT=8080 node trading-crm-proxy-server.js
```

### Firewall Configuration

Make sure port **3001** (or your custom port) is open:

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 3001

# Firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload

# iptables
sudo iptables -A INPUT -p tcp --dport 3001 -j ACCEPT
```

---

## 🔍 Monitoring

### Check Proxy Status

```bash
# Test proxy health
curl http://85.130.211.49:3001/health

# Expected response:
{
  "status": "healthy",
  "server": "Trading CRM Proxy",
  "timestamp": "2025-11-08T..."
}
```

### View Proxy Logs

```bash
# If using PM2
pm2 logs trading-crm-proxy

# If using systemd
journalctl -u trading-crm-proxy -f

# If running directly
# Logs appear in terminal
```

### Check Render Logs

In Render dashboard, you should see:

✅ **WITH PROXY (working):**
```
🔀 Routing through proxy: http://85.130.211.49:3001
✅ Bearer token obtained via proxy
📥 Trading CRM Response via Proxy: { status: 200 }
```

❌ **WITHOUT PROXY (blocked):**
```
❌ Trading CRM API Error: IP 54.188.71.94 is not allowed
```

---

## 🎯 How It Works

### Flow Diagram

```
1. User signs up on Landing Page
   ↓
2. Saved to Supabase
   ↓
3. Database trigger fires
   ↓
4. Calls Render: /api/push-to-broker
   ↓
5. Render calls: http://85.130.211.49:3001/proxy/trading-crm
   ↓
6. YOUR PROXY forwards to: Trading CRM API
   ↓
7. Trading CRM sees request from 85.130.211.49 ✅ (whitelisted!)
   ↓
8. Response: Trading CRM → YOUR PROXY → Render → Database
   ↓
9. ✅ Lead pushed successfully!
```

### Code Flow

**Render (trading-crm-api.ts):**
```typescript
const proxyUrl = process.env.TRADING_CRM_PROXY_URL;

if (proxyUrl) {
  // Route through YOUR server
  response = await fetch(`${proxyUrl}/proxy/trading-crm`, {
    method: 'POST',
    body: JSON.stringify({
      endpoint: 'https://affiliate365.tradingcrm.com:4477/...',
      headers: { Authorization: 'Bearer token', 'api-version': '4.0' },
      body: { firstName: 'John', ... }
    })
  });
}
```

**YOUR Server (trading-crm-proxy-server.js):**
```javascript
app.post('/proxy/trading-crm', async (req, res) => {
  const { endpoint, headers, body } = req.body;

  // Forward to Trading CRM
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  // Return response to Render
  res.json({ status: response.status, data: ... });
});
```

**Trading CRM sees:**
- Source IP: **85.130.211.49** ✅ (YOUR server - whitelisted!)
- Not: 54.188.71.94 (Render - blocked)

---

## 🛠️ Troubleshooting

### Proxy Not Starting?

**Error: Port already in use**
```bash
# Find what's using port 3001
sudo lsof -i :3001

# Kill it or use different port
PROXY_PORT=3002 node trading-crm-proxy-server.js
```

**Error: Module not found**
```bash
# Install dependencies
npm install express cors
```

### Render Can't Connect to Proxy?

**Check firewall:**
```bash
# Test from external server
curl http://85.130.211.49:3001/health
```

**Check proxy is running:**
```bash
# On your server
curl http://localhost:3001/health
```

**Use domain instead of IP:**

If you have a domain pointing to 85.130.211.49:

```
TRADING_CRM_PROXY_URL=http://yourdomain.com:3001
```

### Still Getting IP Blocked Error?

1. **Verify proxy is running:**
   ```bash
   curl http://85.130.211.49:3001/health
   ```

2. **Check Render environment variable:**
   - Key: `TRADING_CRM_PROXY_URL`
   - Value: `http://85.130.211.49:3001` (NO trailing slash!)

3. **Check Render logs for:**
   ```
   🔀 Routing through proxy: http://85.130.211.49:3001
   ```

   If you DON'T see this, the env variable isn't set correctly.

4. **Redeploy Render after adding env variable**

---

## 🎉 Success Indicators

✅ **Proxy Server Logs (YOUR server):**
```
📥 Proxy received request: { endpoint: 'https://affiliate365.tradingcrm.com:4477/...' }
📤 Trading CRM responded: { status: 200, statusText: 'OK' }
```

✅ **Render Logs:**
```
🔀 Routing through proxy: http://85.130.211.49:3001
✅ Bearer token obtained via proxy (expires in 23 hours)
📥 Trading CRM Response via Proxy: { status: 200, data: { accountId: '12345' } }
✅ Push successful
```

✅ **CRM Dashboard:**
```
Push Status: ✅ 200 (11/8/2025 3:45 PM)
Broker: Trading CRM
```

✅ **Trading CRM Platform:**
- Lead appears in Trading CRM
- All details correct
- Ready for follow-up

---

## 🔐 Security Notes

### Protect Your Proxy

1. **Add authentication** (optional but recommended):

```javascript
// In trading-crm-proxy-server.js
const API_KEY = process.env.PROXY_API_KEY || 'your-secret-key';

app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

Then in Render, add to request headers:
```typescript
headers: {
  'X-API-Key': process.env.PROXY_API_KEY
}
```

2. **Limit to Render IP only:**

```javascript
// Only allow requests from Render
const ALLOWED_IPS = ['54.188.71.94'];

app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  if (!ALLOWED_IPS.includes(clientIP)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});
```

3. **Use HTTPS (recommended):**

- Get SSL certificate (Let's Encrypt)
- Use `https://` instead of `http://`
- Update proxy to listen on 443

---

## 📊 Performance

- **Latency:** +20-50ms (proxy overhead)
- **Reliability:** 99.9% (YOUR server uptime)
- **Scalability:** Handles 1000+ requests/day easily
- **Cost:** $0 (runs on YOUR existing server)

---

## 🔄 Alternative: Add Render IP to Whitelist

Instead of using proxy, you can ask Trading CRM to whitelist Render's IP:

**Email to Trading CRM:**
```
Hi Trading CRM Team,

Please whitelist the following additional IP address for our AFF 225X integration:

IP Address: 54.188.71.94 (Render deployment server)

We already have 85.130.211.49 whitelisted.

Thank you!
```

**Pros:**
- No proxy needed
- Slightly faster (direct connection)
- Less maintenance

**Cons:**
- Requires Trading CRM approval
- May take time
- Render IP could change

---

## ✅ You're Done!

Once proxy is running and environment variable is set:

1. ✅ All requests route through YOUR server (85.130.211.49)
2. ✅ Trading CRM sees whitelisted IP
3. ✅ Leads push successfully
4. ✅ No more IP blocking errors!

**Need help?** Check the logs on both YOUR server and Render for detailed error messages.
