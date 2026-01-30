# Setup PM2 for Production (Keep Backend Running)

PM2 is a process manager that will automatically restart your Node.js server if it crashes or if the server reboots.

## Step 1: Install PM2 Globally on TrueHost

Run in **cPanel Terminal:**

```bash
npm install -g pm2
```

## Step 2: Create PM2 Ecosystem Config

Run in **cPanel Terminal:**

```bash
cat > ~/public_html/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'mwendo-backend',
    script: './src/server.js',
    cwd: '/home/gmooutas/public_html',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    },
    error_file: '/tmp/mwendo-error.log',
    out_file: '/tmp/mwendo-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
EOF
```

## Step 3: Start with PM2

```bash
cd ~/public_html
pm2 start ecosystem.config.js
pm2 save
```

## Step 4: Setup PM2 Startup (Auto-restart on server reboot)

```bash
pm2 startup
# Copy and run the command it outputs
```

## Step 5: Verify It's Running

```bash
pm2 list
pm2 logs mwendo-backend
```

## Useful PM2 Commands

```bash
pm2 stop mwendo-backend      # Stop the app
pm2 restart mwendo-backend   # Restart the app
pm2 delete mwendo-backend    # Remove from PM2
pm2 logs mwendo-backend      # View logs
pm2 monit                    # Monitor in real-time
```

## Troubleshooting

If PM2 doesn't work, fall back to nohup:

```bash
pkill -f "node src/server.js"
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

