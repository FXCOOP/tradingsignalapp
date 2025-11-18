# AllCrypto VPS Proxy Setup Guide

## Overview

This guide explains how to route AllCrypto API requests through your VPS to solve IP whitelist requirements.

**VPS Details:**
- IP: 192.227.249.3
- Username: root
- Password: xYA2MkX0vR1F213jam
- SSH Port: 22

## Architecture

```
Render Server → VPS Proxy (192.227.249.3:3128) → AllCrypto API
```

AllCrypto sees all requests coming from **192.227.249.3** (whitelisted IP)

## Step 1: SSH into Your VPS

### Windows (using PuTTY):
1. Download [PuTTY](https://www.putty.org/)
2. Open PuTTY
3. Host Name: `192.227.249.3`
4. Port: `22`
5. Click "Open"
6. Login as: `root`
7. Password: `xYA2MkX0vR1F213jam`

### Mac/Linux (using Terminal):
```bash
ssh root@192.227.249.3
# Enter password when prompted: xYA2MkX0vR1F213jam
```

## Step 2: Run Setup Script on VPS

Once logged into your VPS, run these commands:

```bash
# Download and run setup script
curl -o vps-proxy-setup.sh https://raw.githubusercontent.com/YOUR_REPO/main/vps-proxy-setup.sh

# Make it executable
chmod +x vps-proxy-setup.sh

# Run the setup
./vps-proxy-setup.sh
```

**OR** manually copy and paste the script:

```bash
#!/bin/bash
echo "🚀 Setting up VPS as HTTP Proxy for AllCrypto..."

# Update system
apt-get update && apt-get upgrade -y

# Install Squid proxy server
apt-get install squid -y

# Backup original config
cp /etc/squid/squid.conf /etc/squid/squid.conf.backup

# Create new Squid configuration
cat > /etc/squid/squid.conf << 'EOF'
# Squid HTTP Proxy Configuration for AllCrypto API
http_port 3128

# Allow access from Render servers (you can add more IPs)
acl render_servers src 44.229.227.142/32
acl render_servers src 54.188.71.94/32
acl render_servers src 52.13.128.108/32
acl render_servers src 74.220.48.0/24
acl render_servers src 74.220.56.0/24

# Allow access to AllCrypto API only
acl allcrypto_api dstdomain yourleads.org
acl SSL_ports port 443
acl Safe_ports port 443

# Security rules
http_access deny !Safe_ports
http_access deny CONNECT !SSL_ports

# Allow Render servers to access AllCrypto
http_access allow render_servers allcrypto_api
http_access deny all

# Logging
access_log /var/log/squid/access.log squid
cache_log /var/log/squid/cache.log

# No caching for API requests
cache deny all

# Forwarded for header
forwarded_for on
EOF

# Restart Squid
systemctl restart squid
systemctl enable squid

# Configure firewall
ufw allow 3128/tcp
ufw allow 22/tcp
ufw --force enable

# Check status
systemctl status squid

echo "✅ Proxy setup complete!"
echo "📍 VPS IP: 192.227.249.3"
echo "📍 Proxy Port: 3128"
```

## Step 3: Test the Proxy

From your VPS, test the proxy:

```bash
# Test proxy connection to AllCrypto
curl -x http://192.227.249.3:3128 \
  https://yourleads.org/api/affiliates/v2/goal-types \
  -H "Authorization: Bearer da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn"
```

**Expected response**: Goal types JSON (success)
**If 401 error**: IP not whitelisted yet with AllCrypto

## Step 4: Contact AllCrypto to Whitelist VPS IP

Send this email to AllCrypto support:

```
Subject: IP Whitelist Request for Affiliate API

Hi AllCrypto Support,

Please whitelist the following IP address for our affiliate API access:

IP Address: 192.227.249.3
API Token: da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn
Domain: tradeflow.blog
Purpose: Production lead distribution via proxy

Thank you!
```

## Step 5: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your web service
3. Go to "Environment" tab
4. Add these variables:

```bash
ALLCRYPTO_PROXY_URL=http://192.227.249.3:3128
HTTPS_PROXY=http://192.227.249.3:3128
```

5. Click "Save Changes"
6. Wait for redeploy (2-3 minutes)

## Step 6: Test End-to-End

1. **Submit a test lead** from Canada on brokerv2:
   - https://tradeflow.blog/brokerv2

2. **Check Render logs** - should see:
   ```
   🔄 Using proxy: http://192.227.249.3:3128
   📤 Pushing lead to broker: test@example.com
   📍 Selected broker: AllCrypto for CA
   ✅ Push successful
   ```

3. **Check VPS proxy logs**:
   ```bash
   ssh root@192.227.249.3
   tail -f /var/log/squid/access.log
   ```
   Should see requests to yourleads.org

4. **Check CRM dashboard**:
   - Push Status should show ✅ **200** (green badge)

## Troubleshooting

### Issue 1: Still getting 401 error

**Solution**: AllCrypto hasn't whitelisted 192.227.249.3 yet. Contact them again.

### Issue 2: Connection timeout

**Check VPS firewall**:
```bash
ufw status
# Should show: 3128/tcp ALLOW
```

**Check Squid is running**:
```bash
systemctl status squid
```

### Issue 3: Proxy not being used

**Check Render environment variables**:
```bash
# In Render Shell tab:
echo $HTTPS_PROXY
# Should output: http://192.227.249.3:3128
```

### Issue 4: View proxy logs

```bash
# Real-time logs
tail -f /var/log/squid/access.log

# Last 50 lines
tail -50 /var/log/squid/access.log

# Search for specific requests
grep "yourleads.org" /var/log/squid/access.log
```

## Monitoring

### Check Proxy Status
```bash
systemctl status squid
```

### View Recent Requests
```bash
tail -50 /var/log/squid/access.log
```

### Test Proxy Manually
```bash
curl -x http://192.227.249.3:3128 https://yourleads.org/api/affiliates/v2/goal-types \
  -H "Authorization: Bearer da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn"
```

## Security Notes

1. **Firewall**: Only ports 22 (SSH) and 3128 (Proxy) are open
2. **Access Control**: Only Render IPs can use the proxy
3. **Domain Restriction**: Proxy only allows yourleads.org
4. **No Caching**: API responses are not cached
5. **Logging**: All requests are logged for debugging

## Maintenance

### Restart Proxy
```bash
systemctl restart squid
```

### Update ACL (Allow New IPs)
```bash
nano /etc/squid/squid.conf
# Add: acl render_servers src NEW_IP_HERE/32
systemctl restart squid
```

### View Logs
```bash
# Access log
tail -f /var/log/squid/access.log

# Error log
tail -f /var/log/squid/cache.log
```

## Cost

- VPS: $2-5/month (RackNerd KVM-512MB)
- Bandwidth: Minimal (API requests are small)
- Maintenance: None required

## Summary

✅ **Benefits**:
- Fixed IP address (192.227.249.3) for AllCrypto whitelist
- Dedicated proxy for API routing
- Full control over IP and configuration
- Minimal cost

✅ **Next Steps After Setup**:
1. Confirm AllCrypto whitelisted 192.227.249.3
2. Add environment variables to Render
3. Test Canada lead push
4. Monitor logs for successful requests

---

**Need Help?** Check Render logs and VPS proxy logs for detailed debugging information.
