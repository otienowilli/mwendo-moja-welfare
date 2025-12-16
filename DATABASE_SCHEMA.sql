-- MWENDO MOJA WELFARE SYSTEM - DATABASE SCHEMA
-- PostgreSQL Database Schema

-- 1. USERS TABLE (Admin/Access Management)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'treasurer', 'secretary')),
  full_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. MEMBERS TABLE (Member Management)
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  membership_card_number VARCHAR(50) UNIQUE NOT NULL,
  national_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  sex VARCHAR(10) CHECK (sex IN ('Male', 'Female')),
  date_of_birth DATE,
  phone_number VARCHAR(20),
  residence VARCHAR(100),
  role_in_group VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. VOTE_HEADS TABLE (Contribution Types)
CREATE TABLE vote_heads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  expected_amount DECIMAL(10, 2),
  duration_months INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. MEMBER_CONTRIBUTIONS TABLE
CREATE TABLE member_contributions (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id),
  vote_head_id INTEGER NOT NULL REFERENCES vote_heads(id),
  amount_expected DECIMAL(10, 2),
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  balance_due DECIMAL(10, 2),
  payment_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, vote_head_id)
);

-- 5. HOSTING_EVENTS TABLE
CREATE TABLE hosting_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  host_member_id INTEGER NOT NULL REFERENCES members(id),
  event_date DATE,
  total_expected DECIMAL(10, 2),
  amount_collected DECIMAL(10, 2) DEFAULT 0,
  deficit DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. HOSTING_CONTRIBUTIONS TABLE
CREATE TABLE hosting_contributions (
  id SERIAL PRIMARY KEY,
  hosting_event_id INTEGER NOT NULL REFERENCES hosting_events(id),
  member_id INTEGER NOT NULL REFERENCES members(id),
  amount DECIMAL(10, 2),
  payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'bank', 'mpesa')),
  payment_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. LOANS TABLE
CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id),
  loan_type VARCHAR(50) NOT NULL CHECK (loan_type IN ('table_banking', 'normal', 'emergency')),
  loan_amount DECIMAL(10, 2) NOT NULL,
  interest_rate DECIMAL(5, 2),
  repayment_period_months INTEGER,
  disbursement_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'repaid', 'defaulted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. LOAN_REPAYMENTS TABLE
CREATE TABLE loan_repayments (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER NOT NULL REFERENCES loans(id),
  repayment_amount DECIMAL(10, 2),
  repayment_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. BENEFICIARIES TABLE
CREATE TABLE beneficiaries (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id),
  relationship VARCHAR(50),
  name VARCHAR(100),
  sex VARCHAR(10),
  age INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. WELFARE_INCIDENTS TABLE
CREATE TABLE welfare_incidents (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id),
  incident_type VARCHAR(50) CHECK (incident_type IN ('bereavement', 'accident', 'other')),
  incident_date DATE,
  benefit_amount DECIMAL(10, 2),
  disbursement_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. GROUP_FINANCIALS TABLE
CREATE TABLE group_financials (
  id SERIAL PRIMARY KEY,
  total_shares DECIMAL(15, 2),
  total_savings DECIMAL(15, 2),
  loan_interest_earned DECIMAL(15, 2),
  other_income DECIMAL(15, 2),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. MEMBER_SHARES_SAVINGS TABLE
CREATE TABLE member_shares_savings (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id),
  shares DECIMAL(10, 2) DEFAULT 0,
  savings DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_members_card ON members(membership_card_number);
CREATE INDEX idx_members_national_id ON members(national_id);
CREATE INDEX idx_contributions_member ON member_contributions(member_id);
CREATE INDEX idx_contributions_vote_head ON member_contributions(vote_head_id);
CREATE INDEX idx_loans_member ON loans(member_id);
CREATE INDEX idx_beneficiaries_member ON beneficiaries(member_id);
CREATE INDEX idx_incidents_member ON welfare_incidents(member_id);

