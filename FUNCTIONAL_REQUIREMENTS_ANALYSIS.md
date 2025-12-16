# MWENDO MOJA WELFARE SYSTEM - FUNCTIONAL REQUIREMENTS ANALYSIS

## Overview
A comprehensive welfare management system for group savings and loans with member management, contributions tracking, loans servicing, and dividend computation.

## FUNCTIONAL REQUIREMENTS CHECKLIST

### A. User & Access Management ✓
- [ ] Admin login (Chairperson/Treasurer/Secretary)
- [ ] Role-based access control (Admin, Treasurer, Secretary)
- [ ] Secure authentication (username + password)
- [ ] Session management
- [ ] Password encryption

### B. Member Management Module ✓
- [ ] Register new members with: Name, Sex, Age/DOB, Phone, Membership Card #, National ID, Role, Residence
- [ ] Edit/update member profiles
- [ ] Deactivate/archive members
- [ ] View member list & individual profiles
- [ ] Prevent duplicate membership cards & National IDs
- [ ] Member status tracking

### C. Contributions & Vote Heads Management ✓
- [ ] Define Vote Heads: Registration, Membership Card, Formation Fees, Shares, Savings, Admin Cost, Seed Fund, Fines, Group Uniform, Merry-go, Anniversary, Sindikiza, Meals, Pamba Jikoni
- [ ] Set expected amount & duration per vote head
- [ ] Record payments per member
- [ ] Support partial payments
- [ ] Auto-compute: Amount paid, Balance due
- [ ] Payment tracking per member per vote head

### D. Hosting Members Contributions Module ✓
- [ ] Record hosting schedules
- [ ] Track contributions per event: Merry-go, Anniversary, Sindikiza, Meals, Pamba Jikoni
- [ ] Record collection method: Cash, Bank, M-Pesa
- [ ] Auto-compute: Total expected, Amount collected, Deficit, Actual available

### E. Loans & Servicing Module ✓
- [ ] Support loan types: Table banking, Normal, Emergency
- [ ] Capture: Loan amount, Interest rate, Repayment period
- [ ] Track: Repayments, Outstanding balances
- [ ] Optional: Block loan approval if member not compliant

### F. Benevolent & Welfare Module ✓
- [ ] Register beneficiaries: Spouse, Children, Parents, In-laws
- [ ] Define coverage scope
- [ ] Record incidents: Bereavement, Accidents
- [ ] Auto-calculate benefits payable
- [ ] Track disbursement status

### G. Reports Module ✓
- [ ] Individual member statements of affairs
- [ ] Group contribution reports by vote head
- [ ] Income & Expenditure Statement
- [ ] Loan reports
- [ ] Benevolent reports
- [ ] Hosting disbursement reports
- [ ] Export as PDF & Excel

### H. Dividends Computation Module ✓
- [ ] Store: Total group shares, Total group savings, Loan interest, Other incomes
- [ ] Apply dividend formula: (Individual Shares + Individual Savings) × (Interest + Other Income) / (Total Group Shares + Total Group Savings)
- [ ] Generate dividend statements per member

## Implementation Recommendations

### Technology Stack
- **Frontend**: React + Vite (modern, responsive)
- **Backend**: Node.js/Express or Python/Django
- **Database**: PostgreSQL (robust, supports complex queries)
- **Reports**: PDF generation library (pdfkit/reportlab)
- **Hosting**: Cloud VPS (AWS/DigitalOcean)

### Priority Implementation Order
1. User & Access Management (foundation)
2. Member Management (core data)
3. Contributions & Vote Heads (primary feature)
4. Reports Module (visibility)
5. Loans & Servicing
6. Benevolent & Welfare
7. Dividends Computation
8. Hosting Members Contributions

### Key Considerations
- Data integrity & validation
- Audit trail for all transactions
- Backup & recovery procedures
- Mobile-responsive design
- Performance optimization for 200-500 members

