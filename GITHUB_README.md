# MWENDO MOJA - Welfare Management System

A comprehensive welfare management system for community groups, built with Node.js, Express, React, and PostgreSQL.

## 🎯 Project Overview

MWENDO MOJA is a complete welfare management solution that helps community groups manage:
- Member registration and profiles
- Contribution tracking by vote heads
- Loan applications and management
- Loan repayment tracking
- Welfare incident management
- Financial reporting and analytics

## 🚀 Features

### Core Modules
- **Authentication** - Secure JWT-based authentication
- **Member Management** - Register, manage, and track members
- **Contributions** - Track contributions by vote head
- **Loans** - Complete loan lifecycle management
- **Welfare** - Manage welfare incidents and beneficiaries
- **Reports** - Financial summaries and analytics

### Technology Stack
- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** React 18, Vite, React Router
- **Authentication:** JWT tokens
- **Styling:** CSS3, Responsive Design

## 📋 Project Status

| Phase | Status | Completion |
|-------|--------|-----------|
| Phase 1: Frontend | ✅ Complete | 100% |
| Phase 2: Testing & QA | ⏳ In Progress | 0% |
| Phase 3: Advanced Features | ⏳ Pending | 0% |
| Phase 4: Deployment | ⏳ Pending | 0% |

## 🏗️ Project Structure

```
MWENDO MOJA/
├── src/                    # Backend source code
│   ├── controllers/        # Business logic
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   └── config/            # Configuration
├── client/                # Frontend React app
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # State management
│   │   ├── services/     # API service
│   │   └── styles/       # CSS files
└── Documentation/        # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js v20.10.0+
- npm v10.2.3+
- PostgreSQL

### Backend Setup
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start server
npm start
```

### Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the application at `http://localhost:5173`

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - Get running in 5 minutes
- [FRONTEND_SETUP.md](client/FRONTEND_SETUP.md) - Frontend guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development guide
- [DEVELOPMENT_ROADMAP.md](DEVELOPMENT_ROADMAP.md) - Project roadmap

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- Error handling

## 📊 Statistics

- **Backend Files:** 31
- **Frontend Files:** 19
- **Documentation:** 25+
- **Total Lines of Code:** 10,000+

## 🤝 Contributing

Contributions are welcome! Please follow the development guide.

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Developed by Augment Agent
Date: December 16, 2024

## 📞 Support

For issues and questions, please refer to the documentation files.

---

**Status:** Phase 1 Complete ✅ | Ready for Phase 2 🚀

