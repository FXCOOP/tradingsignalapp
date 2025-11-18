#!/bin/bash
# VPS Proxy Setup for AllCrypto API Routing
# Run this on your VPS (192.227.249.3)

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
# Port to listen on
http_port 3128

# Allow access from Render servers
# Add Render's IP ranges (you'll update these)
acl render_servers src 44.229.227.142/32
acl render_servers src 54.188.71.94/32
acl render_servers src 52.13.128.108/32
acl render_servers src 74.220.48.0/24
acl render_servers src 74.220.56.0/24

# Allow access to AllCrypto API only
acl allcrypto_api dstdomain yourleads.org
acl SSL_ports port 443
acl Safe_ports port 443

# Deny all other requests
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

# Forwarded for header (optional)
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
echo ""
echo "Next steps:"
echo "1. Contact AllCrypto to whitelist: 192.227.249.3"
echo "2. Update your Render app to use this proxy"
echo "3. Test with: curl -x http://192.227.249.3:3128 https://yourleads.org/api/affiliates/v2/goal-types -H 'Authorization: Bearer da8ihocq5cmy0vgkqfxasjt0ao1qsgwhn'"
