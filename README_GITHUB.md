# MWENDO MOJA - Welfare Management System

[![GitHub](https://img.shields.io/badge/GitHub-Otiwilli-blue)](https://github.com/Otiwilli/mwendomoja)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-50%25%20Complete-orange)](PROJECT_STATUS_REPORT.md)

A comprehensive welfare management system for community groups, built with React, Node.js, and PostgreSQL.

## 🎯 Project Overview

MWENDO MOJA is a full-stack web application designed to manage:
- **Member Management** - Track members and their information
- **Contribution Tracking** - Record and monitor member contributions
- **Loan Management** - Process and track member loans
- **Financial Reports** - Generate comprehensive financial reports
- **Welfare Management** - Manage welfare incidents and benefits
- **Hosting Management** - Organize group events and contributions

## 📊 Project Status

| Phase | Name | Status | Completion |
|-------|------|--------|-----------|
| 1 | Frontend Development | ✅ Complete | 100% |
| 2 | Testing & QA | ✅ Complete | 100% |
| 3 | Advanced Features | ⏳ In Progress | 0% |
| 4 | Deployment | ⏳ Pending | 0% |
| **Overall** | **Full Project** | **50% Complete** | **50%** |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 12+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Otiwilli/mwendomoja.git
cd mwendomoja

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create .env file
cp .env.example .env

# Setup database
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev          # Backend on port 5000
cd client && npm run dev  # Frontend on port 5173
```

## 📁 Project Structure

```
mwendomoja/
├── src/                    # Backend source
│   ├── controllers/        # Route controllers
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   └── server.js          # Entry point
├── client/                # Frontend source
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # State management
│   │   ├── services/     # API services
│   │   └── App.jsx       # Main component
│   └── package.json
├── __tests__/            # Test files
├── jest.config.js        # Backend test config
├── client/vitest.config.js # Frontend test config
└── package.json
```

## 🧪 Testing

### Run Tests

```bash
# Backend tests
npm test                 # Run all tests
npm run test:coverage   # Generate coverage report
npm run test:watch      # Watch mode

# Frontend tests
cd client
npm run test            # Run tests
npm run test:coverage   # Coverage report
npm run test:ui         # UI dashboard
```

### Test Coverage
- **Overall:** 75%
- **Components:** 75%
- **Services:** 85%
- **Controllers:** 60%
- **Routes:** 70%
- **Middleware:** 75%

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md)
- [Phase 1: Frontend Development](PHASE_1_SUMMARY.md)
- [Phase 2: Testing & QA](PHASE_2_COMPLETION_SUMMARY.md)
- [Phase 3: Advanced Features](PHASE_3_IMPLEMENTATION_GUIDE.md)
- [Phase 4: Deployment](PHASE_4_DEPLOYMENT_GUIDE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Project Status Report](PROJECT_STATUS_REPORT.md)

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM v7** - Routing
- **Context API** - State management
- **Vitest** - Testing framework
- **@testing-library/react** - Component testing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## 🔐 Features

### Phase 1 (Complete)
✅ User authentication with JWT
✅ Member management
✅ Contribution tracking
✅ Loan management
✅ Financial reports
✅ Responsive UI
✅ Protected routes
✅ API integration

### Phase 2 (Complete)
✅ 137 test cases
✅ 75% code coverage
✅ Component testing
✅ API testing
✅ Controller testing
✅ Route testing
✅ Middleware testing

### Phase 3 (Upcoming)
⏳ SMS notifications (Twilio)
⏳ M-Pesa integration
⏳ Email notifications (SendGrid)
⏳ Self-service portal
⏳ PDF/Excel export

### Phase 4 (Upcoming)
⏳ Docker containerization
⏳ CI/CD pipeline
⏳ Production deployment
⏳ Monitoring & logging

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify token

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Contributions
- `GET /api/contributions` - Get contributions
- `POST /api/contributions` - Add contribution
- `PUT /api/contributions/:id` - Update contribution
- `DELETE /api/contributions/:id` - Delete contribution

### Loans
- `GET /api/loans` - Get loans
- `POST /api/loans` - Apply for loan
- `PUT /api/loans/:id` - Update loan
- `DELETE /api/loans/:id` - Delete loan

### Reports
- `GET /api/reports` - Get financial reports
- `GET /api/reports/members` - Member statistics
- `GET /api/reports/contributions` - Contribution reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Blessed Williams**
- GitHub: [@Otiwilli](https://github.com/Otiwilli)
- Email: blessed@mwendomoja.com

## 🙏 Acknowledgments

- Built with Augment Agent
- Powered by React, Node.js, and PostgreSQL
- Inspired by community welfare management needs

## 📞 Support

For support, email blessed@mwendomoja.com or open an issue on GitHub.

## 🗺️ Roadmap

- [x] Phase 1: Frontend Development
- [x] Phase 2: Testing & QA
- [ ] Phase 3: Advanced Features
- [ ] Phase 4: Deployment
- [ ] Phase 5: Maintenance & Updates

---

**Status:** 50% Complete | **Last Updated:** December 16, 2024 | **Version:** 1.0.0

