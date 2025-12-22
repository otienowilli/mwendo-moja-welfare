# 🚀 QUICK START GUIDE - MWENDO MOJA

**Get the application running in 5 minutes!**

---

## ⚡ QUICK START (5 MINUTES)

### 1. Install Dependencies
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..
```

### 2. Start Backend Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Start Frontend (New Terminal)
```bash
cd client
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Access Application
Open browser and go to: **http://localhost:3000**

---

## 📝 DEFAULT CREDENTIALS

**Username:** admin
**Password:** password123

---

## 🧪 RUN TESTS

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- src/__tests__/services/smsService.test.js
```

---

## 📁 PROJECT STRUCTURE

```
MWENDO MOJA WELFARE/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/      # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # External services
│   ├── middleware/       # Express middleware
│   ├── __tests__/        # Test files
│   └── server.js        # Entry point
├── client/              # React frontend
├── .env                 # Environment variables
├── package.json         # Dependencies
└── jest.config.js       # Test configuration
```

---

## 🔧 ENVIRONMENT SETUP

### Backend .env
```
PORT=5000
NODE_ENV=development
USE_SQLITE=true
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend .env
```
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

---

## 📊 API ENDPOINTS

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create member
- `GET /api/members/:id` - Get member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Loans
- `GET /api/loans` - Get all loans
- `POST /api/loans` - Create loan
- `GET /api/loans/:id` - Get loan
- `PUT /api/loans/:id` - Update loan

### SMS
- `POST /api/sms/send` - Send SMS
- `POST /api/sms/send-bulk` - Send bulk SMS
- `GET /api/sms/templates` - Get SMS templates

### Analytics
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/members` - Member analytics
- `GET /api/analytics/loans` - Loan analytics

---

## 🐛 TROUBLESHOOTING

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Ensure SQLite is installed: `npm install sqlite3`
- Check .env file has `USE_SQLITE=true`

### Tests Failing
```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests with verbose output
npm run test:verbose
```

---

## 📚 USEFUL COMMANDS

```bash
# Development
npm run dev              # Start backend in dev mode
npm run start            # Start backend in production

# Testing
npm test                 # Run all tests
npm run test:coverage    # Run with coverage report
npm run test:watch       # Watch mode

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
```

---

## 🎯 COMMON TASKS

### Add New Member
1. Go to Members page
2. Click "Add Member"
3. Fill in details
4. Click "Save"

### Apply for Loan
1. Go to Loans page
2. Click "Apply for Loan"
3. Fill in loan details
4. Submit application

### View Analytics
1. Go to Dashboard
2. View member statistics
3. View loan statistics
4. View contribution trends

### Export Data
1. Go to Reports
2. Select export format (PDF/Excel)
3. Click "Export"
4. Download file

---

## 📞 SUPPORT

- Check documentation files
- Review test cases for examples
- Check API endpoints in routes

---

**Ready to go!** 🚀

Start with: `npm run dev` and `cd client && npm run dev`

