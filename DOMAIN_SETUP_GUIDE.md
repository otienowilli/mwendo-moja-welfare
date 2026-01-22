# Domain Registration & DNS Setup Guide

## Step 1: Choose Your Domain

### Domain Options for MWENDO MOJA

1. **mwendomoja.com** (International)
   - Professional
   - Easy to remember
   - Cost: $10-15/year

2. **mwendomoja.co.ke** (Kenya-specific)
   - Local presence
   - Good for Kenya market
   - Cost: $15-25/year

3. **welfare.mwendomoja.com** (Subdomain)
   - Use if main domain exists
   - No additional cost

### Recommended: **mwendomoja.co.ke**
- Shows local presence
- Good for Kenya-based welfare groups
- Builds trust with local users

---

## Step 2: Register Domain

### Option A: Namecheap (Recommended)
1. Go to https://www.namecheap.com
2. Search for "mwendomoja.co.ke"
3. Add to cart
4. Checkout
5. Create account
6. Pay (accepts M-Pesa via Pesapal)
7. Confirm email

### Option B: Safaricom Domains
1. Go to https://domains.safaricom.co.ke
2. Search domain
3. Register
4. Pay via M-Pesa
5. Confirm

### Option C: Afriregister
1. Go to https://www.afriregister.com
2. Search domain
3. Register
4. Pay
5. Confirm

---

## Step 3: Point Domain to Hosting

### For Digital Ocean

1. **Get your Droplet IP:**
   - Log in to Digital Ocean
   - Go to Droplets
   - Copy your IP address (e.g., 192.168.1.1)

2. **Update DNS at Namecheap:**
   - Log in to Namecheap
   - Go to "Domain List"
   - Click "Manage" next to your domain
   - Go to "Advanced DNS"
   - Find "A Records"
   - Edit or add:
     ```
     Type: A
     Host: @
     Value: your_droplet_ip
     TTL: 30 min (or auto)
     ```
   - Add another for www:
     ```
     Type: A
     Host: www
     Value: your_droplet_ip
     TTL: 30 min
     ```

3. **Wait for DNS Propagation:**
   - Can take 24-48 hours
   - Check status: https://www.whatsmydns.net
   - Enter your domain name

---

## Step 4: Configure DNS Records

### Essential DNS Records

```
Type    Host    Value                   TTL
A       @       your_server_ip          3600
A       www     your_server_ip          3600
CNAME   api     your_server_ip          3600
MX      @       mail.yourdomain.com     3600
TXT     @       v=spf1 include:sendgrid.net ~all
```

### What Each Record Does

**A Record (@):** Points domain to server
**A Record (www):** Points www.domain to server
**CNAME (api):** Creates api.domain subdomain
**MX Record:** Handles email routing
**TXT Record (SPF):** Email authentication

---

## Step 5: Setup Email (Optional)

### Using SendGrid

1. Create SendGrid account: https://sendgrid.com
2. Verify domain:
   - Go to Settings → Sender Authentication
   - Click "Authenticate Your Domain"
   - Add these DNS records:
     ```
     CNAME: sendgrid.yourdomain.com
     Value: sendgrid.net
     ```

3. Update SPF record:
   ```
   v=spf1 include:sendgrid.net ~all
   ```

4. Add DKIM record (provided by SendGrid)

---

## Step 6: Setup SSL Certificate

### Using Let's Encrypt (Free)

```bash
# SSH into your server
ssh root@your_server_ip

# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
systemctl enable certbot.timer
```

### Update Nginx Config

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Step 7: Verify Everything

### Checklist

- [ ] Domain registered
- [ ] DNS A records pointing to server
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] Domain accessible in browser
- [ ] SSL certificate installed
- [ ] HTTPS working
- [ ] Email configured (if needed)
- [ ] Subdomains working (api.domain.com)

### Test Commands

```bash
# Check DNS
nslookup yourdomain.com

# Check SSL
curl -I https://yourdomain.com

# Check email (if configured)
dig yourdomain.com MX
```

---

## Troubleshooting

### Domain not resolving
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Clear browser cache
- Try different DNS: 8.8.8.8

### SSL certificate error
- Ensure domain is pointing to server
- Wait for DNS propagation
- Renew certificate: `certbot renew`

### Email not working
- Check SPF record
- Add DKIM record
- Verify domain in SendGrid

---

## Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| Domain (.co.ke) | $15-25/year | One-time |
| Domain (.com) | $10-15/year | One-time |
| SSL Certificate | Free | Let's Encrypt |
| Email Service | Free-$20/mo | SendGrid |
| **Total** | **$15-25/year** | Minimal |

---

## Timeline

1. **Day 1:** Register domain
2. **Day 1-2:** Configure DNS
3. **Day 2-3:** Wait for propagation
4. **Day 3:** Setup SSL
5. **Day 3:** Configure email
6. **Day 4:** Go live!

---

## Next Steps

1. Choose domain name
2. Register domain
3. Get server IP from hosting provider
4. Update DNS records
5. Wait for propagation
6. Setup SSL
7. Test everything

Need help with any step?

