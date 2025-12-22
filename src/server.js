const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// Import models
const User = require('./models/User');
const Member = require('./models/Member');
const VoteHead = require('./models/VoteHead');

// Import routes
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const voteHeadRoutes = require('./routes/voteHeadRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const loanRoutes = require('./routes/loanRoutes');
const welfareRoutes = require('./routes/welfareRoutes');
const hostingRoutes = require('./routes/hostingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dividendRoutes = require('./routes/dividendRoutes');

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

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/vote-heads', voteHeadRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/welfare', welfareRoutes);
app.use('/api/hosting', hostingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dividends', dividendRoutes);

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

const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = app;

