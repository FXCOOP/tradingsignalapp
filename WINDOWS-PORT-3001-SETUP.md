# 🔧 Windows Port 3001 Configuration Guide

Make your proxy server accessible from the internet at http://85.130.211.49:3001

---

## Step 1: Configure Windows Firewall

### Option A: Using PowerShell (Administrator)

Open PowerShell as Administrator and run:

```powershell
# Create inbound rule for port 3001
New-NetFirewallRule -DisplayName "Trading CRM Proxy (TCP 3001)" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow

# Create outbound rule for port 3001
New-NetFirewallRule -DisplayName "Trading CRM Proxy (TCP 3001)" -Direction Outbound -LocalPort 3001 -Protocol TCP -Action Allow
```

### Option B: Using Windows Firewall GUI

1. Press **Windows + R**, type `wf.msc`, press Enter
2. Click **Inbound Rules** → **New Rule**
3. Select **Port** → Next
4. Select **TCP**, enter **3001** → Next
5. Select **Allow the connection** → Next
6. Check all profiles (Domain, Private, Public) → Next
7. Name: `Trading CRM Proxy` → Finish
8. Repeat for **Outbound Rules**

### Option C: Quick Command (CMD as Administrator)

```cmd
netsh advfirewall firewall add rule name="Trading CRM Proxy TCP 3001" dir=in action=allow protocol=TCP localport=3001
netsh advfirewall firewall add rule name="Trading CRM Proxy TCP 3001" dir=out action=allow protocol=TCP localport=3001
```

---

## Step 2: Verify Firewall Rule

```powershell
# Check if rule exists
Get-NetFirewallRule -DisplayName "*Trading CRM Proxy*" | Select-Object DisplayName, Enabled, Direction
```

Expected output:
```
DisplayName                     Enabled Direction
-----------                     ------- ---------
Trading CRM Proxy (TCP 3001)    True    Inbound
Trading CRM Proxy (TCP 3001)    True    Outbound
```

---

## Step 3: Bind Proxy to All Network Interfaces

Currently, the proxy might be binding only to localhost (127.0.0.1).

### Check Current Binding

The proxy server code has this line:
```javascript
app.listen(PORT, '0.0.0.0', () => {
```

**`0.0.0.0`** means "listen on ALL network interfaces" ✅

This is already correct in `trading-crm-proxy-server.js`!

---

## Step 4: Configure Router Port Forwarding (If Behind Router)

If your machine is behind a router/NAT, you need to forward port 3001.

### Steps:

1. **Find your router's IP** (usually 192.168.1.1 or 192.168.0.1)
   ```cmd
   ipconfig | findstr "Default Gateway"
   ```

2. **Find your local IP**
   ```cmd
   ipconfig | findstr "IPv4"
   ```
   Example: `192.168.1.100`

3. **Access router admin panel**
   - Open browser: http://192.168.1.1 (or your gateway IP)
   - Login with admin credentials

4. **Create Port Forwarding Rule**
   - Find: "Port Forwarding" or "Virtual Server" or "NAT"
   - Add new rule:
     - **Service Name:** Trading CRM Proxy
     - **External Port:** 3001
     - **Internal IP:** 192.168.1.100 (your local IP)
     - **Internal Port:** 3001
     - **Protocol:** TCP
   - Save/Apply

---

## Step 5: Verify Your Public IP

Check if your public IP is actually 85.130.211.49:

### Option A: PowerShell
```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

### Option B: Browser
Visit: https://whatismyipaddress.com/

**Expected:** `85.130.211.49`

**If different:** Your public IP changed! Update Render environment variable to the new IP.

---

## Step 6: Test External Access

### From Your Machine (Internal Test)
```cmd
curl http://localhost:3001/health
```

Expected:
```json
{"status":"healthy","server":"Trading CRM Proxy",...}
```

### From External Network (Internet Test)

Use online tool: https://www.yougetsignal.com/tools/open-ports/

- **Remote Address:** 85.130.211.49
- **Port Number:** 3001
- Click **Check**

**Expected:** ✅ Port 3001 is open

---

## Step 7: Test from Render

Once port is open, Render should be able to connect.

Check Render logs for:
```
🔀 Using proxy: http://85.130.211.49:3001
✅ Bearer token obtained via proxy
```

---

## 🛠️ Troubleshooting

### Port Still Not Accessible?

#### Check if proxy is running:
```cmd
netstat -ano | findstr :3001
```

Expected output shows process listening on port 3001.

#### Check antivirus/security software:
- Windows Defender
- Norton/McAfee/Kaspersky
- Third-party firewalls

**Temporarily disable** to test, then add exception.

#### Check ISP blocking:
Some ISPs block certain ports. Contact ISP if port forwarding doesn't work.

#### Check if behind CGNAT (Carrier-Grade NAT):
If your public IP shown by your router admin panel is DIFFERENT from https://whatismyipaddress.com/, you're behind CGNAT.

**Solution:** Use a VPN with static IP or ask ISP for public IP.

---

## Alternative: Use Different Port

If port 3001 is blocked and can't be opened, use a different port:

### Change Proxy Server Port

Edit `trading-crm-proxy-server.js`:
```javascript
const PORT = process.env.PROXY_PORT || 8080; // Changed from 3001
```

Or start with:
```cmd
set PROXY_PORT=8080 && node trading-crm-proxy-server.js
```

### Update Render Environment Variable
```
TRADING_CRM_PROXY_URL=http://85.130.211.49:8080
```

### Update Firewall Rules
```powershell
New-NetFirewallRule -DisplayName "Trading CRM Proxy (TCP 8080)" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow
```

Common unblocked ports: **80, 443, 8080, 8443, 8888**

---

## Quick Test Script

Save as `test-port.ps1`:

```powershell
# Test Trading CRM Proxy Port 3001

Write-Host "1. Checking if proxy is running..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($process) {
    Write-Host "✅ Proxy is running on port 3001" -ForegroundColor Green
} else {
    Write-Host "❌ Proxy NOT running on port 3001" -ForegroundColor Red
}

Write-Host "`n2. Checking firewall rules..." -ForegroundColor Yellow
$rules = Get-NetFirewallRule -DisplayName "*3001*" -ErrorAction SilentlyContinue
if ($rules) {
    Write-Host "✅ Firewall rules exist for port 3001" -ForegroundColor Green
    $rules | Select-Object DisplayName, Enabled, Direction | Format-Table
} else {
    Write-Host "❌ No firewall rules for port 3001" -ForegroundColor Red
}

Write-Host "`n3. Testing local access..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 5
    Write-Host "✅ Local access works" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "❌ Local access failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n4. Checking public IP..." -ForegroundColor Yellow
try {
    $publicIP = (Invoke-WebRequest -Uri "https://api.ipify.org").Content
    Write-Host "Your public IP: $publicIP" -ForegroundColor Cyan
    if ($publicIP -eq "85.130.211.49") {
        Write-Host "✅ Public IP matches expected (85.130.211.49)" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Public IP does NOT match 85.130.211.49!" -ForegroundColor Yellow
        Write-Host "Update Render env var to: http://$publicIP:3001" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Could not check public IP" -ForegroundColor Red
}

Write-Host "`nSetup Complete! If all checks pass, port 3001 should be accessible." -ForegroundColor Green
```

Run with:
```powershell
powershell -ExecutionPolicy Bypass -File test-port.ps1
```

---

## ✅ Success Checklist

- [ ] Windows Firewall allows port 3001 (inbound + outbound)
- [ ] Proxy server running (shows "Ready to proxy requests")
- [ ] Proxy bound to 0.0.0.0 (all interfaces)
- [ ] Router port forwarding configured (if behind router)
- [ ] Public IP is 85.130.211.49 (or updated in Render)
- [ ] External port test shows port 3001 is OPEN
- [ ] Render can connect to proxy (check logs)
- [ ] Trading CRM requests work via proxy

---

## 📞 Still Not Working?

If after all steps the port is still not accessible:

1. **Simplest Solution:** Ask Trading CRM to whitelist Render's IP (54.188.71.94)
2. **Alternative:** Deploy proxy to a cloud server (AWS, DigitalOcean, etc.) where ports are easier to manage

---

## Summary Commands (Run as Administrator)

```powershell
# 1. Add firewall rule
New-NetFirewallRule -DisplayName "Trading CRM Proxy (TCP 3001)" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow

# 2. Check if running
Get-NetTCPConnection -LocalPort 3001

# 3. Test locally
Invoke-WebRequest -Uri "http://localhost:3001/health"

# 4. Check public IP
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

**Then test externally:** https://www.yougetsignal.com/tools/open-ports/

Good luck! 🚀
