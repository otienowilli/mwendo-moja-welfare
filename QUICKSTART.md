# Quick Start Guide - MWENDO MOJA WELFARE SYSTEM

## 5-Minute Setup

### 1. Database Setup
```bash
# Create PostgreSQL database
createdb mwendo_moja_welfare

# Load schema
psql -U postgres -d mwendo_moja_welfare -f DATABASE_SCHEMA.sql
```

### 2. Environment Configuration
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=your_password
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on: `http://localhost:5000`

## Testing the API

### 1. Register Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@mwendo.com",
    "password": "admin123",
    "full_name": "Admin User",
    "role": "admin"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

Copy the returned `token` for next requests.

### 3. Create Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "membership_card_number": "MM001",
    "national_id": "12345678",
    "full_name": "John Doe",
    "sex": "male",
    "date_of_birth": "1990-01-15",
    "phone_number": "+254712345678",
    "residence": "Nairobi",
    "role_in_group": "member"
  }'
```

### 4. Get All Members
```bash
curl -X GET http://localhost:5000/api/members \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure Overview

```
Backend (Node.js/Express)
├── Models (Sequelize ORM)
├── Controllers (Business Logic)
├── Routes (API Endpoints)
├── Middleware (Authentication)
└── Config (Database)

Database (PostgreSQL)
├── Users
├── Members
├── Contributions
├── Loans
├── Welfare
└── Financial Summaries
```

## Next Steps

1. **Frontend Setup**: Initialize React + Vite in `client/` folder
2. **Implement Remaining Modules**:
   - Contributions tracking
   - Loans management
   - Welfare incidents
   - Reports generation
3. **Add Tests**: Unit and integration tests
4. **Deploy**: Set up production environment

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DB credentials in `.env`
- Verify database exists: `psql -l`

### Port Already in Use
- Change PORT in `.env` (default: 5000)
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### JWT Token Errors
- Ensure JWT_SECRET is set in `.env`
- Token expires after 7 days by default

## Key Features Ready

✅ User authentication (JWT)
✅ Role-based access control
✅ Member management (CRUD)
✅ Database with 12 tables
✅ Password hashing
✅ Audit trail support

## Support

For detailed documentation, see `README.md`

