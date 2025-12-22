# MWENDO MOJA - Monitoring & Logging Setup

## 📊 Monitoring Stack

### 1. Application Monitoring with PM2

```bash
# Install PM2
npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'mwendo-api',
      script: './src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 2. Docker Health Checks

All Docker containers include health checks:

```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}"

# View health check logs
docker inspect --format='{{json .State.Health}}' container-name | jq
```

### 3. Prometheus Metrics

```bash
# Install prometheus client
npm install prom-client

# Add to src/server.js
const prometheus = require('prom-client');

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Expose metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

### 4. ELK Stack (Elasticsearch, Logstash, Kibana)

```yaml
# docker-compose.elk.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

### 5. Application Logging

```javascript
// src/utils/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = {
  info: (message, data) => {
    const log = `[${new Date().toISOString()}] INFO: ${message}`;
    console.log(log, data || '');
    fs.appendFileSync(path.join(logDir, 'app.log'), log + '\n');
  },
  error: (message, error) => {
    const log = `[${new Date().toISOString()}] ERROR: ${message}`;
    console.error(log, error || '');
    fs.appendFileSync(path.join(logDir, 'error.log'), log + '\n');
  },
  warn: (message, data) => {
    const log = `[${new Date().toISOString()}] WARN: ${message}`;
    console.warn(log, data || '');
    fs.appendFileSync(path.join(logDir, 'app.log'), log + '\n');
  }
};

module.exports = logger;
```

## 🚨 Alerting

### Email Alerts

```javascript
// src/services/alertService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_PASSWORD
  }
});

const sendAlert = async (subject, message) => {
  await transporter.sendMail({
    from: process.env.ALERT_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `[ALERT] ${subject}`,
    text: message
  });
};

module.exports = { sendAlert };
```

### Slack Alerts

```javascript
// src/services/slackAlert.js
const axios = require('axios');

const sendSlackAlert = async (message) => {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `🚨 Alert: ${message}`
  });
};

module.exports = { sendSlackAlert };
```

## 📈 Performance Monitoring

### Database Query Monitoring

```javascript
// Monitor slow queries
const slowQueryThreshold = 1000; // 1 second

sequelize.addHook('afterFind', (result, options) => {
  if (options.benchmark && options.benchmark > slowQueryThreshold) {
    logger.warn(`Slow query detected: ${options.benchmark}ms`);
  }
});
```

### Memory & CPU Monitoring

```bash
# Install node-exporter
npm install node-exporter

# Monitor with top
top -p $(pgrep -f "node src/server.js")
```

## 🔍 Log Aggregation

### Centralized Logging

```bash
# Using Papertrail
npm install winston winston-papertrail

# Configure in src/utils/logger.js
const Papertrail = require('winston-papertrail').Papertrail;

const winstonPapertrail = new Papertrail({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT
});
```

## 📊 Dashboard Setup

### Grafana Dashboard

```bash
# Install Grafana
docker run -d -p 3001:3000 grafana/grafana

# Add Prometheus data source
# Create dashboards for:
# - Request rate
# - Error rate
# - Response time
# - Database connections
# - Memory usage
```

## ✅ Health Check Endpoints

```javascript
// src/routes/healthRoutes.js
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: 'connected'
  });
});
```

## 📋 Checklist

- [ ] Setup PM2 for process management
- [ ] Configure Docker health checks
- [ ] Setup Prometheus metrics
- [ ] Deploy ELK stack
- [ ] Configure application logging
- [ ] Setup email alerts
- [ ] Setup Slack integration
- [ ] Monitor database queries
- [ ] Setup Grafana dashboards
- [ ] Configure log rotation
- [ ] Setup backup monitoring
- [ ] Create runbooks for common issues

