# MWENDO MOJA WELFARE - DEVELOPER GUIDE

## Quick Reference for Developers

---

## PROJECT STRUCTURE

```
src/
├── models/          # Sequelize models (database schemas)
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # Authentication & authorization
├── config/          # Database configuration
└── server.js        # Express app setup
```

---

## ADDING A NEW FEATURE

### Step 1: Create Model
```javascript
// src/models/NewFeature.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewFeature = sequelize.define('NewFeature', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
}, {
  timestamps: true,
  tableName: 'new_features',
});

module.exports = NewFeature;
```

### Step 2: Create Controller
```javascript
// src/controllers/newFeatureController.js
const NewFeature = require('../models/NewFeature');

const createNewFeature = async (req, res) => {
  try {
    const { name } = req.body;
    const feature = await NewFeature.create({ name });
    res.status(201).json({ message: 'Created', feature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewFeature };
```

### Step 3: Create Routes
```javascript
// src/routes/newFeatureRoutes.js
const express = require('express');
const { createNewFeature } = require('../controllers/newFeatureController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', roleMiddleware(['admin']), createNewFeature);

module.exports = router;
```

### Step 4: Register Routes in server.js
```javascript
const newFeatureRoutes = require('./routes/newFeatureRoutes');
app.use('/api/new-features', newFeatureRoutes);
```

---

## COMMON PATTERNS

### Authentication Check
```javascript
// All routes automatically check token via authMiddleware
router.get('/', authMiddleware, getResource);
```

### Role-Based Access
```javascript
// Only admin and treasurer can access
router.post('/', roleMiddleware(['admin', 'treasurer']), createResource);
```

### Error Handling
```javascript
try {
  // Your code
  res.json({ message: 'Success', data });
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

### Database Query
```javascript
// Find by ID
const item = await Model.findByPk(id);

// Find with conditions
const items = await Model.findAll({ where: { status: 'active' } });

// Create
const item = await Model.create({ name: 'value' });

// Update
await item.update({ name: 'new value' });

// Delete
await item.destroy();
```

### Increment/Decrement
```javascript
// Increment a field
await memberSavings.increment('total_contributions', { by: 1000 });

// Decrement a field
await memberSavings.decrement('outstanding_balance', { by: 500 });
```

---

## ENVIRONMENT VARIABLES

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mwendo_moja
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja
DB_USER=postgres
DB_PASSWORD=password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## RUNNING COMMANDS

```bash
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Database migration (when implemented)
npm run db:migrate

# Database seed (when implemented)
npm run db:seed
```

---

## TESTING AN ENDPOINT

### Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Use Token
```bash
TOKEN="your_token_here"

curl -X GET http://localhost:5000/api/members \
  -H "Authorization: Bearer $TOKEN"
```

---

## DEBUGGING

### Enable Logging
```javascript
// In server.js
const sequelize = require('./config/database');
sequelize.options.logging = console.log; // Log all SQL queries
```

### Check Database
```bash
# Connect to PostgreSQL
psql -U postgres -d mwendo_moja

# List tables
\dt

# Describe table
\d members

# Query data
SELECT * FROM members;
```

### Check Server Logs
```bash
# Terminal output shows:
# - Database connection status
# - Server port
# - Route registrations
# - Error messages
```

---

## CODE STYLE

### Naming Conventions
- **Files:** camelCase (memberController.js)
- **Functions:** camelCase (createMember)
- **Classes:** PascalCase (Member)
- **Constants:** UPPER_SNAKE_CASE (JWT_SECRET)
- **Variables:** camelCase (memberData)

### File Organization
```javascript
// 1. Imports
const Model = require('../models/Model');

// 2. Controller functions
const createItem = async (req, res) => { ... };
const getItem = async (req, res) => { ... };

// 3. Exports
module.exports = { createItem, getItem };
```

---

## COMMON ISSUES & SOLUTIONS

### Issue: "Cannot find module"
```bash
# Solution: Install dependencies
npm install
```

### Issue: "Database connection failed"
```bash
# Solution: Check PostgreSQL is running
psql -U postgres

# Create database if needed
createdb mwendo_moja
```

### Issue: "Invalid token"
```bash
# Solution: Get new token by logging in
# Check token format: "Bearer TOKEN"
# Check token hasn't expired
```

### Issue: "Insufficient permissions"
```bash
# Solution: Check user role matches endpoint requirements
# Admin: full access
# Treasurer: finance operations
# Secretary: member & report operations
```

---

## USEFUL LINKS

- **Express.js:** https://expressjs.com
- **Sequelize:** https://sequelize.org
- **PostgreSQL:** https://www.postgresql.org
- **JWT:** https://jwt.io
- **bcryptjs:** https://github.com/dcodeIO/bcrypt.js

---

## BEST PRACTICES

1. **Always validate input** - Check required fields
2. **Use try-catch** - Handle errors gracefully
3. **Check permissions** - Use roleMiddleware
4. **Log important actions** - For audit trail
5. **Use transactions** - For multi-step operations
6. **Sanitize data** - Prevent SQL injection
7. **Use environment variables** - Never hardcode secrets
8. **Write comments** - Explain complex logic
9. **Test thoroughly** - Before pushing to production
10. **Keep it simple** - KISS principle

---

## NEXT DEVELOPER CHECKLIST

- [ ] Read API_DOCUMENTATION.md
- [ ] Read TESTING_GUIDE.md
- [ ] Review DATABASE_SCHEMA.sql
- [ ] Run `npm install`
- [ ] Setup .env file
- [ ] Create database
- [ ] Start server with `npm run dev`
- [ ] Test health endpoint
- [ ] Review existing controllers
- [ ] Understand authentication flow

---

**Happy Coding! 🚀**

