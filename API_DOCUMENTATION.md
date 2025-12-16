# MWENDO MOJA WELFARE - API DOCUMENTATION

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login/register) require JWT token in header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Response Format
All responses are JSON:
```json
{
  "message": "Success message",
  "data": {}
}
```

---

## 1. AUTHENTICATION ENDPOINTS

### Register User
```
POST /auth/register
```
**Body:**
```json
{
  "username": "admin",
  "email": "admin@mwendo.com",
  "password": "password123",
  "full_name": "Admin User",
  "role": "admin"
}
```
**Roles:** admin, treasurer, secretary

### Login
```
POST /auth/login
```
**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
**Response:** Returns JWT token

---

## 2. MEMBER MANAGEMENT

### Create Member
```
POST /members
```
**Required Role:** admin, secretary
**Body:**
```json
{
  "membership_card_number": "MM001",
  "national_id": "12345678",
  "full_name": "John Doe",
  "sex": "male",
  "date_of_birth": "1990-01-15",
  "phone_number": "+254712345678",
  "residence": "Nairobi",
  "role_in_group": "member"
}
```

### Get All Members
```
GET /members
```

### Get Member by ID
```
GET /members/:id
```

### Update Member
```
PUT /members/:id
```

### Deactivate Member
```
PUT /members/:id/deactivate
```
**Required Role:** admin

---

## 3. VOTE HEADS (Contribution Types)

### Create Vote Head
```
POST /vote-heads
```
**Required Role:** admin
**Body:**
```json
{
  "name": "Shares",
  "description": "Monthly share contribution",
  "expected_amount": 1000,
  "duration_months": 12
}
```

### Get All Vote Heads
```
GET /vote-heads?active_only=true
```

### Get Vote Head by ID
```
GET /vote-heads/:id
```

### Update Vote Head
```
PUT /vote-heads/:id
```
**Required Role:** admin

### Deactivate Vote Head
```
PUT /vote-heads/:id/deactivate
```
**Required Role:** admin

---

## 4. CONTRIBUTIONS

### Record Contribution
```
POST /contributions
```
**Required Role:** admin, treasurer, secretary
**Body:**
```json
{
  "member_id": "uuid",
  "vote_head_id": "uuid",
  "amount": 1000,
  "payment_method": "cash",
  "reference_number": "REF123",
  "notes": "Monthly contribution"
}
```
**Payment Methods:** cash, mpesa, bank_transfer, cheque

### Confirm Contribution
```
PUT /contributions/:id/confirm
```
**Required Role:** admin, treasurer

### Get Member Contributions
```
GET /contributions/member/:member_id?status=confirmed
```

### Get Contribution Summary
```
GET /contributions/member/:member_id/summary
```

---

## 5. LOANS

### Apply for Loan
```
POST /loans
```
**Required Role:** admin, secretary
**Body:**
```json
{
  "member_id": "uuid",
  "loan_type": "emergency",
  "principal_amount": 50000,
  "interest_rate": 10,
  "loan_duration_months": 12,
  "purpose": "Medical emergency",
  "guarantor_id": "uuid"
}
```
**Loan Types:** emergency, development, business

### Get Loan Details
```
GET /loans/:id
```

### Approve Loan
```
PUT /loans/:id/approve
```
**Required Role:** admin, treasurer

### Disburse Loan
```
PUT /loans/:id/disburse
```
**Required Role:** admin, treasurer

### Get Member Loans
```
GET /loans/member/:member_id?status=disbursed
```

### Record Repayment
```
POST /loans/:id/repayments
```
**Required Role:** admin, treasurer
**Body:**
```json
{
  "loan_id": "uuid",
  "principal_paid": 5000,
  "interest_paid": 500,
  "payment_method": "cash",
  "reference_number": "REP123"
}
```

### Confirm Repayment
```
PUT /loans/:id/repayments/:repayment_id/confirm
```
**Required Role:** admin, treasurer

### Get Loan Repayments
```
GET /loans/:id/repayments?status=confirmed
```

### Get Loan Balance
```
GET /loans/:id/balance
```

---

## 6. WELFARE & BENEFICIARIES

### Report Incident
```
POST /welfare/incidents
```
**Required Role:** admin, secretary
**Body:**
```json
{
  "member_id": "uuid",
  "incident_type": "death",
  "incident_date": "2024-01-15",
  "description": "Member passed away"
}
```
**Incident Types:** death, illness, accident, emergency, other

### Approve Incident
```
PUT /welfare/incidents/:id/approve
```
**Required Role:** admin, treasurer
**Body:**
```json
{
  "amount_approved": 50000
}
```

### Process Payment
```
PUT /welfare/incidents/:id/pay
```
**Required Role:** admin, treasurer
**Body:**
```json
{
  "amount_paid": 50000
}
```

### Get Member Incidents
```
GET /welfare/members/:member_id/incidents?status=approved
```

### Add Beneficiary
```
POST /welfare/beneficiaries
```
**Required Role:** admin, secretary
**Body:**
```json
{
  "member_id": "uuid",
  "beneficiary_name": "Jane Doe",
  "relationship": "spouse",
  "phone_number": "+254712345678",
  "national_id": "87654321",
  "percentage": 50
}
```

### Get Member Beneficiaries
```
GET /welfare/members/:member_id/beneficiaries
```

---

## 7. HOSTING EVENTS

### Create Hosting Event
```
POST /hosting/events
```
**Required Role:** admin, secretary
**Body:**
```json
{
  "member_id": "uuid",
  "event_date": "2024-02-15",
  "event_type": "wedding",
  "event_location": "Nairobi",
  "expected_guests": 200,
  "notes": "Wedding celebration"
}
```
**Event Types:** wedding, funeral, birthday, graduation, other

### Get Hosting Event
```
GET /hosting/events/:id
```

### Complete Hosting Event
```
PUT /hosting/events/:id/complete
```
**Required Role:** admin, secretary

### Record Hosting Contribution
```
POST /hosting/events/:event_id/contributions
```
**Required Role:** admin, treasurer, secretary
**Body:**
```json
{
  "hosting_event_id": "uuid",
  "member_id": "uuid",
  "amount": 5000,
  "payment_method": "cash"
}
```

### Confirm Hosting Contribution
```
PUT /hosting/contributions/:id/confirm
```
**Required Role:** admin, treasurer

### Get Event Contributions
```
GET /hosting/events/:event_id/contributions?status=confirmed
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Required fields missing"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Error message"
}
```

---

## Status Values

**Contribution Status:** pending, confirmed, rejected
**Loan Status:** pending, approved, disbursed, completed, defaulted
**Repayment Status:** pending, confirmed, rejected
**Incident Status:** reported, approved, paid, rejected
**Beneficiary Status:** active, inactive
**Event Status:** scheduled, completed, cancelled

---

## Pagination (To be implemented)
```
GET /endpoint?page=1&limit=10
```

---

## Filtering Examples
```
GET /loans?status=disbursed
GET /contributions?status=confirmed
GET /welfare/incidents?status=approved
```

---

## Rate Limiting (To be implemented)
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Create Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "membership_card_number":"MM001",
    "national_id":"12345678",
    "full_name":"John Doe",
    "sex":"male",
    "date_of_birth":"1990-01-15",
    "phone_number":"+254712345678",
    "residence":"Nairobi",
    "role_in_group":"member"
  }'
```

---

## Postman Collection
Import the provided Postman collection for easy API testing.

---

## Support
For issues or questions, contact the development team.

