# Digital Ocean Deployment Guide - MWENDO MOJA

## Step 1: Create Digital Ocean Account
1. Go to https://www.digitalocean.com
2. Sign up with email
3. Add payment method
4. Verify account

## Step 2: Create a Droplet

1. Click "Create" → "Droplets"
2. **Choose Image:** Ubuntu 22.04 LTS
3. **Choose Plan:** Basic ($5/month - 1GB RAM, 1 vCPU, 25GB SSD)
4. **Choose Region:** Closest to Kenya (Frankfurt or London)
5. **Authentication:** Add SSH key (recommended) or password
6. **Hostname:** mwendo-moja
7. Click "Create Droplet"

## Step 3: Initial Server Setup

```bash
# SSH into your server
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2 (process manager)
npm install -g pm2

# Install Git
apt install -y git
```

## Step 4: Configure PostgreSQL

```bash
# Start PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE mwendo_moja;
CREATE USER mwendo_user WITH PASSWORD 'strong_password_here';
ALTER ROLE mwendo_user SET client_encoding TO 'utf8';
ALTER ROLE mwendo_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE mwendo_user SET default_transaction_deferrable TO on;
ALTER ROLE mwendo_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE mwendo_moja TO mwendo_user;
\q
```

## Step 5: Clone and Setup Application

```bash
# Create app directory
mkdir -p /var/www/mwendo-moja
cd /var/www/mwendo-moja

# Clone repository
git clone https://github.com/otienowilli/mwendo-moja-welfare.git .

# Install dependencies
npm install
cd client && npm install && cd ..

# Build frontend
cd client && npm run build && cd ..

# Create .env file
nano .env
```

## Step 6: Configure Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja
DB_USER=mwendo_user
DB_PASSWORD=strong_password_here

# JWT
JWT_SECRET=your_very_secure_random_string_here
JWT_EXPIRY=7d

# Application
NODE_ENV=production
PORT=5000
CLIENT_URL=https://yourdomain.com

# Services (configure as needed)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
SENDGRID_API_KEY=your_key
```

## Step 7: Start Application with PM2

```bash
# Start application
pm2 start src/server.js --name "mwendo-moja"

# Save PM2 configuration
pm2 save

# Enable PM2 startup
pm2 startup
pm2 save
```

## Step 8: Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/mwendo-moja
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/

# Test Nginx
nginx -t

# Restart Nginx
systemctl restart nginx
```

## Step 9: Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
systemctl enable certbot.timer
```

## Step 10: Configure DNS

In your domain registrar (Namecheap, etc.):
1. Go to DNS settings
2. Add A record: @ → your_droplet_ip
3. Add A record: www → your_droplet_ip
4. Wait 24 hours for propagation

## Step 11: Firewall Setup

```bash
# Enable UFW
ufw enable

# Allow SSH
ufw allow 22/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp
```

## Step 12: Monitoring & Backups

```bash
# Enable automatic backups in Digital Ocean dashboard
# Settings → Backups → Enable

# Monitor application
pm2 monit

# View logs
pm2 logs mwendo-moja
```

## Troubleshooting

**Application not starting:**
```bash
pm2 logs mwendo-moja
```

**Database connection error:**
```bash
sudo -u postgres psql -d mwendo_moja
```

**Nginx not working:**
```bash
nginx -t
systemctl status nginx
```

## Cost Breakdown
- Droplet: $5/month
- Managed PostgreSQL: $15/month (optional)
- Domain: $10-15/year
- **Total: ~$20-30/month**

## Next Steps
1. Point domain to server
2. Test application
3. Configure monitoring
4. Set up automated backups
5. Configure email notifications

