const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/database');

// Import models
const User = require('./models/User');
const Member = require('./models/Member');
const VoteHead = require('./models/VoteHead');
const HouseContributions = require('./models/HouseContributions');

// Import routes
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const voteHeadRoutes = require('./routes/voteHeadRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const houseContributionsRoutes = require('./routes/houseContributionsRoutes');
const loanRoutes = require('./routes/loanRoutes');
const welfareRoutes = require('./routes/welfareRoutes');
const hostingRoutes = require('./routes/hostingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dividendRoutes = require('./routes/dividendRoutes');
const paymentCampaignRoutes = require('./routes/paymentCampaignRoutes');
const mpesaPaymentRoutes = require('./routes/mpesaPaymentRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist folder (frontend)
const distPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/vote-heads', voteHeadRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/house-contributions', houseContributionsRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/welfare', welfareRoutes);
app.use('/api/hosting', hostingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dividends', dividendRoutes);
app.use('/api/payment-campaigns', paymentCampaignRoutes);
app.use('/api/mpesa-payments', mpesaPaymentRoutes);

// SPA fallback - serve index.html for all non-API routes
app.use((req, res) => {
  const indexPath = path.join(__dirname, '../client/dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not found. Please build the frontend.' });
  }
});

// Database sync
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    // Sync models with database (don't alter tables, just create if missing)
    await sequelize.sync({ force: false, alter: false });
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  await initializeDatabase();

  if (NODE_ENV === 'production') {
    // Use HTTPS in production
    const certPath = process.env.SSL_CERT_PATH || '/etc/letsencrypt/live/yourdomain.com/fullchain.pem';
    const keyPath = process.env.SSL_KEY_PATH || '/etc/letsencrypt/live/yourdomain.com/privkey.pem';

    try {
      if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
        const options = {
          cert: fs.readFileSync(certPath),
          key: fs.readFileSync(keyPath)
        };

        https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
          console.log(`🔒 HTTPS Server running on port ${PORT} (Production)`);
        });
      } else {
        console.warn('⚠️  SSL certificates not found. Running on HTTP.');
        app.listen(PORT, '0.0.0.0', () => {
          console.log(`Server running on port ${PORT} (HTTP - Development)`);
        });
      }
    } catch (error) {
      console.error('Error loading SSL certificates:', error);
      console.warn('Falling back to HTTP');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT} (HTTP - Fallback)`);
      });
    }
  } else {
    // Use HTTP in development
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} (Development - HTTP)`);
      console.log(`Access at: http://localhost:${PORT}`);
    });
  }
};

startServer();

module.exports = app;

