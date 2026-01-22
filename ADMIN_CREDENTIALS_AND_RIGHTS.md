# Admin Credentials and Rights

## Admin Users in System

### 1. Admin User
- **Username**: `admin`
- **Email**: `admin@mwendo.com`
- **Password**: `Admin@123` (or reset if needed)
- **Full Name**: Admin User
- **Role**: admin
- **Status**: Active

### 2. Test Admin User
- **Username**: `testadmin`
- **Email**: `testadmin@mwendomoja.com`
- **Password**: `TestAdmin@123`
- **Full Name**: Test Admin User
- **Role**: admin
- **Status**: Active

## Admin Rights and Permissions

### ✅ Full System Access
Admins have complete control over all system features:

**Members Management**
- ✅ Create new members
- ✅ View all members
- ✅ Update member information
- ✅ Deactivate members

**Vote Heads (Contribution Categories)**
- ✅ Create vote heads
- ✅ View all vote heads
- ✅ Update vote heads
- ✅ Deactivate vote heads

**Contributions**
- ✅ Record contributions
- ✅ Confirm contributions
- ✅ View contribution summaries

**Loans**
- ✅ Apply for loans
- ✅ Approve loans
- ✅ Disburse loans
- ✅ Record loan repayments
- ✅ Confirm repayments
- ✅ View loan details and balances

**Welfare Module**
- ✅ Report welfare incidents
- ✅ Approve welfare incidents
- ✅ Process welfare payments
- ✅ Add member beneficiaries
- ✅ View welfare incidents

**Hosting Contributions**
- ✅ Create hosting events
- ✅ Record hosting contributions
- ✅ Confirm hosting contributions
- ✅ Complete hosting events

**Reports**
- ✅ View member financial reports
- ✅ View group financial reports
- ✅ View contribution reports
- ✅ View loan reports
- ✅ View welfare reports
- ✅ View member list reports

**Dividends**
- ✅ Calculate dividends for all members
- ✅ View member dividends

**System Administration**
- ✅ Manage user accounts
- ✅ View system analytics
- ✅ Access audit logs
- ✅ System configuration

## Other Roles

### Treasurer Rights
- View all members
- Record contributions
- Confirm contributions
- Approve loans
- Disburse loans
- Record loan repayments
- Confirm repayments
- Approve welfare incidents
- Process welfare payments
- View all reports
- Calculate dividends

### Secretary Rights
- Create members
- Update members
- View all members
- Record contributions
- Apply for loans
- View loan details
- Report welfare incidents
- Add beneficiaries
- Create hosting events
- Record hosting contributions
- View member reports

## Login Instructions

### For Admin Users
1. Go to http://localhost:8000
2. Click "Login"
3. Enter credentials:
   - **Username or Email**: `admin` or `admin@mwendo.com`
   - **Password**: `Admin@123`
4. Click "Login"

### Password Requirements
All passwords must have:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?

## Reset Admin Password

If you forget the admin password:
1. Click "Forgot Password?" on login page
2. Enter admin email: `admin@mwendo.com`
3. Click "Send Reset Link"
4. Use the reset link to create new password
5. Password must meet all requirements

## Create New Admin User

To create a new admin user:
1. Login as existing admin
2. Go to User Management (if available)
3. Create new user with role: `admin`
4. Set strong password meeting requirements
5. User can login immediately

## API Access

### Admin Authentication
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

Response includes JWT token for API access.

### Using Token
```bash
curl -X GET http://localhost:8000/api/members \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Notes

1. **Never share admin credentials** with unauthorized users
2. **Change default password** immediately after setup
3. **Use strong passwords** with all required characters
4. **Logout** when leaving the system
5. **Monitor audit logs** for suspicious activity
6. **Rotate passwords** regularly (every 3 months)

## Support

For issues with admin access or credentials:
1. Check if account is active (is_active = true)
2. Verify password meets requirements
3. Try password reset if forgotten
4. Check system logs for errors
5. Contact system administrator

