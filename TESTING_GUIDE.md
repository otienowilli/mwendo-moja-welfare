# MWENDO MOJA WELFARE - TESTING GUIDE

## Setup for Testing

### 1. Start the Server
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Database Setup
```bash
# Create database
createdb mwendo_moja

# Run migrations (if using migrations)
npm run db:migrate

# Seed initial data
npm run db:seed
```

---

## Testing Workflow

### Step 1: Register Admin User
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

### Step 2: Login to Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```
**Save the token from response**

### Step 3: Create Vote Heads
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:5000/api/vote-heads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Shares",
    "description": "Monthly share contribution",
    "expected_amount": 1000,
    "duration_months": 12
  }'
```

### Step 4: Create Members
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
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

### Step 5: Record Contributions
```bash
curl -X POST http://localhost:5000/api/contributions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "member_id": "MEMBER_UUID",
    "vote_head_id": "VOTE_HEAD_UUID",
    "amount": 1000,
    "payment_method": "cash",
    "reference_number": "REF001"
  }'
```

### Step 6: Confirm Contribution
```bash
curl -X PUT http://localhost:5000/api/contributions/CONTRIBUTION_UUID/confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 7: Apply for Loan
```bash
curl -X POST http://localhost:5000/api/loans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "member_id": "MEMBER_UUID",
    "loan_type": "emergency",
    "principal_amount": 50000,
    "interest_rate": 10,
    "loan_duration_months": 12,
    "purpose": "Medical emergency"
  }'
```

### Step 8: Approve Loan
```bash
curl -X PUT http://localhost:5000/api/loans/LOAN_UUID/approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 9: Disburse Loan
```bash
curl -X PUT http://localhost:5000/api/loans/LOAN_UUID/disburse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 10: Record Loan Repayment
```bash
curl -X POST http://localhost:5000/api/loans/LOAN_UUID/repayments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "loan_id": "LOAN_UUID",
    "principal_paid": 5000,
    "interest_paid": 500,
    "payment_method": "cash"
  }'
```

### Step 11: Report Welfare Incident
```bash
curl -X POST http://localhost:5000/api/welfare/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "member_id": "MEMBER_UUID",
    "incident_type": "illness",
    "incident_date": "2024-01-15",
    "description": "Member hospitalized"
  }'
```

### Step 12: Approve Incident
```bash
curl -X PUT http://localhost:5000/api/welfare/incidents/INCIDENT_UUID/approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "amount_approved": 50000
  }'
```

### Step 13: Create Hosting Event
```bash
curl -X POST http://localhost:5000/api/hosting/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "member_id": "MEMBER_UUID",
    "event_date": "2024-02-15",
    "event_type": "wedding",
    "event_location": "Nairobi",
    "expected_guests": 200
  }'
```

### Step 14: Get Reports
```bash
# Member Report
curl -X GET http://localhost:5000/api/reports/members/MEMBER_UUID \
  -H "Authorization: Bearer $TOKEN"

# Group Financial Report
curl -X GET http://localhost:5000/api/reports/group-financial \
  -H "Authorization: Bearer $TOKEN"

# Contributions Report
curl -X GET "http://localhost:5000/api/reports/contributions?start_date=2024-01-01&end_date=2024-12-31" \
  -H "Authorization: Bearer $TOKEN"

# Loans Report
curl -X GET http://localhost:5000/api/reports/loans \
  -H "Authorization: Bearer $TOKEN"

# Welfare Report
curl -X GET http://localhost:5000/api/reports/welfare \
  -H "Authorization: Bearer $TOKEN"

# Members List
curl -X GET http://localhost:5000/api/reports/members-list \
  -H "Authorization: Bearer $TOKEN"
```

### Step 15: Calculate Dividends
```bash
curl -X POST http://localhost:5000/api/dividends/calculate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "financial_year": 2024
  }'
```

---

## Testing with Postman

1. Import the Postman collection (to be created)
2. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: Your JWT token
3. Run requests in sequence

---

## Unit Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

---

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Run `npm install` to install dependencies

### Issue: "Database connection failed"
**Solution:** 
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `createdb mwendo_moja`

### Issue: "Invalid token"
**Solution:** 
- Get a new token by logging in
- Check token hasn't expired
- Verify Authorization header format: `Bearer TOKEN`

### Issue: "Insufficient permissions"
**Solution:** 
- Check user role matches endpoint requirements
- Admin has full access
- Treasurer can approve/disburse
- Secretary can create/record

---

## Performance Testing

### Load Testing with Apache Bench
```bash
ab -n 1000 -c 10 http://localhost:5000/api/health
```

### Stress Testing
```bash
# Create 100 members
for i in {1..100}; do
  curl -X POST http://localhost:5000/api/members \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"membership_card_number\": \"MM$(printf '%03d' $i)\",
      \"national_id\": \"ID$(printf '%08d' $i)\",
      \"full_name\": \"Member $i\",
      \"sex\": \"male\",
      \"phone_number\": \"+254712345$i\"
    }"
done
```

---

## Security Testing

### Test Invalid Token
```bash
curl -X GET http://localhost:5000/api/members \
  -H "Authorization: Bearer invalid_token"
```

### Test Missing Token
```bash
curl -X GET http://localhost:5000/api/members
```

### Test Role-Based Access
```bash
# Login as secretary
# Try to approve loan (should fail)
curl -X PUT http://localhost:5000/api/loans/LOAN_UUID/approve \
  -H "Authorization: Bearer SECRETARY_TOKEN"
```

---

## Data Validation Testing

### Test Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "full_name": "John Doe"
  }'
```

### Test Duplicate Membership Card
```bash
# Create member with MM001
# Try to create another with MM001 (should fail)
```

### Test Invalid Amount
```bash
curl -X POST http://localhost:5000/api/contributions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "member_id": "MEMBER_UUID",
    "vote_head_id": "VOTE_HEAD_UUID",
    "amount": -1000
  }'
```

---

## Cleanup

### Reset Database
```bash
dropdb mwendo_moja
createdb mwendo_moja
npm run db:migrate
npm run db:seed
```

---

## Next Steps

1. Create Postman collection for easy testing
2. Write unit tests for all controllers
3. Set up CI/CD pipeline
4. Performance optimization
5. Security audit

