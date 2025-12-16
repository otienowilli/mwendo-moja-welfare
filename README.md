# MWENDO MOJA WELFARE SYSTEM

A comprehensive welfare management system for group savings and loans with member management, contributions tracking, loans servicing, and dividend computation.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
MWENDO MOJA WELFARE/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── models/                  # Sequelize models
│   │   ├── User.js
│   │   ├── Member.js
│   │   ├── VoteHead.js
│   │   ├── MemberContribution.js
│   │   ├── Loan.js
│   │   ├── LoanRepayment.js
│   │   ├── Beneficiary.js
│   │   ├── WelfareIncident.js
│   │   ├── HostingEvent.js
│   │   ├── HostingContribution.js
│   │   ├── GroupFinancial.js
│   │   └── MemberSharesSavings.js
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   └── memberController.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   └── memberRoutes.js
│   ├── middleware/              # Custom middleware
│   │   └── auth.js
│   └── server.js                # Express app entry point
├── client/                      # React frontend (to be created)
├── DATABASE_SCHEMA.sql          # PostgreSQL schema
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. **Clone and navigate to project**
```bash
cd "MWENDO MOJA WELFARE"
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja_welfare
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

5. **Create PostgreSQL database**
```bash
createdb mwendo_moja_welfare
```

6. **Run database schema**
```bash
psql -U postgres -d mwendo_moja_welfare -f DATABASE_SCHEMA.sql
```

7. **Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/members/:id` - Get member details
- `PUT /api/members/:id` - Update member
- `PUT /api/members/:id/deactivate` - Deactivate member

## Database Models

### Core Models
- **User**: Admin accounts with roles (admin, treasurer, secretary)
- **Member**: Group members with personal information
- **VoteHead**: Contribution types (14 types defined)

### Financial Models
- **MemberContribution**: Individual contributions to vote heads
- **Loan**: Loan records with types and terms
- **LoanRepayment**: Loan repayment tracking
- **MemberSharesSavings**: Member financial summary

### Welfare Models
- **Beneficiary**: Member beneficiaries
- **WelfareIncident**: Welfare claims (death, illness, etc.)

### Event Models
- **HostingEvent**: Member hosting events
- **HostingContribution**: Contributions to hosting events

### Summary Models
- **GroupFinancial**: Group-level financial summary

## Features Implemented

✅ User authentication with JWT
✅ Role-based access control (Admin, Treasurer, Secretary)
✅ Member registration and management
✅ Unique ID validation (membership card, national ID)
✅ Member deactivation/archival
✅ Database schema with proper relationships
✅ Password hashing with bcryptjs
✅ Audit trail support (timestamps)

## Features To Implement

- [ ] Contributions tracking module
- [ ] Loans management module
- [ ] Loan repayment tracking
- [ ] Beneficiary management
- [ ] Welfare incidents handling
- [ ] Hosting events management
- [ ] Dividend computation
- [ ] Reports generation (PDF/Excel)
- [ ] React frontend
- [ ] SMS notifications
- [ ] M-Pesa integration

## Development

### Running Tests
```bash
npm test
```

### Running with Nodemon (auto-reload)
```bash
npm run dev
```

### Production Build
```bash
npm start
```

## Environment Variables

See `.env.example` for all available configuration options.

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- Role-based access control on all protected routes
- National ID and membership card numbers are unique
- Audit trail with timestamps on all records

## License

MIT

## Support

For issues or questions, please contact the development team.

