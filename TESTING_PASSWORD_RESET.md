# Testing Password Reset & Strong Password Features

## System Status
✅ Backend running on http://localhost:8000
✅ Frontend served from backend
✅ All endpoints functional
✅ Database updated with password reset columns

## Test Scenarios

### Test 1: Forgot Password Flow
**Steps:**
1. Go to http://localhost:8000/login
2. Click "Forgot Password?" link
3. Enter email: `williamodwori2021@gmail.com`
4. Click "Send Reset Link"
5. Copy the reset link from the response
6. Navigate to the reset link
7. Enter new password: `NewPassword@123`
8. Confirm password
9. Click "Reset Password"
10. You should be redirected to login

**Expected Result:** ✅ Password reset successfully

### Test 2: Password Validation - Weak Password
**Steps:**
1. Go to http://localhost:8000/register
2. Fill in form with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `weak`
   - Full Name: `Test User`
3. Click Register

**Expected Result:** ❌ Error message showing requirements not met

### Test 3: Password Validation - Strong Password
**Steps:**
1. Go to http://localhost:8000/register
2. Fill in form with:
   - Username: `testuser3`
   - Email: `test3@example.com`
   - Password: `StrongPass@123`
   - Full Name: `Test User 3`
3. Click Register

**Expected Result:** ✅ User registered successfully with JWT token

### Test 4: Change Password (Authenticated)
**Steps:**
1. Login with valid credentials
2. Navigate to http://localhost:8000/change-password
3. Enter current password
4. Enter new password: `UpdatedPass@456`
5. Confirm new password
6. Click "Change Password"

**Expected Result:** ✅ Password changed successfully, redirected to dashboard

### Test 5: Login with New Password
**Steps:**
1. After password change, you should be on dashboard
2. Logout
3. Login with new password

**Expected Result:** ✅ Login successful with new password

## API Testing with cURL

### Test Forgot Password
```bash
curl -X POST http://localhost:8000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"williamodwori2021@gmail.com"}'
```

### Test Reset Password
```bash
curl -X POST http://localhost:8000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token":"<reset-token-from-forgot-password>",
    "newPassword":"NewPassword@123"
  }'
```

### Test Change Password
```bash
curl -X POST http://localhost:8000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "currentPassword":"OldPassword@123",
    "newPassword":"NewPassword@456"
  }'
```

### Test Register with Strong Password
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username":"newuser",
    "email":"newuser@example.com",
    "password":"StrongPass@123",
    "full_name":"New User",
    "role":"secretary"
  }'
```

## Password Requirements Checklist

When testing, ensure passwords have:
- [ ] At least 8 characters
- [ ] At least one uppercase letter (A-Z)
- [ ] At least one lowercase letter (a-z)
- [ ] At least one number (0-9)
- [ ] At least one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?

## Valid Test Passwords
- `SecurePass@123` ✅
- `MyPassword#456` ✅
- `Welcome2024!` ✅
- `Admin@2024` ✅
- `Test$Pass123` ✅

## Invalid Test Passwords
- `password` ❌ (no uppercase, number, symbol)
- `Pass123` ❌ (no special character)
- `PASS@123` ❌ (no lowercase)
- `Pass@1` ❌ (less than 8 characters)
- `12345678` ❌ (no letters or symbols)

## Browser Testing Checklist

### Login Page
- [ ] "Forgot Password?" link visible
- [ ] Link navigates to forgot password page
- [ ] Login still works with correct credentials

### Forgot Password Page
- [ ] Email input field present
- [ ] "Send Reset Link" button works
- [ ] Success message displays
- [ ] Reset link shown (development mode)

### Reset Password Page
- [ ] Accessible via reset link
- [ ] New password input field
- [ ] Confirm password input field
- [ ] Password validation feedback
- [ ] Redirects to login on success

### Change Password Page
- [ ] Only accessible when logged in
- [ ] Current password field required
- [ ] New password validation enforced
- [ ] Success message displays
- [ ] Redirects to dashboard

## Error Handling Tests

### Test Invalid Token
1. Go to `/reset-password/invalid-token`
2. Try to reset password
3. Should show "Invalid or expired reset token"

### Test Expired Token
1. Request password reset
2. Wait 1+ hour
3. Try to use reset link
4. Should show "Invalid or expired reset token"

### Test Wrong Current Password
1. Go to change password page
2. Enter wrong current password
3. Should show "Current password is incorrect"

## Performance Tests

- [ ] Forgot password endpoint responds < 1 second
- [ ] Reset password endpoint responds < 1 second
- [ ] Change password endpoint responds < 1 second
- [ ] Frontend pages load < 2 seconds
- [ ] Password validation happens instantly

## Security Tests

- [ ] Reset tokens are hashed (not plain text)
- [ ] Tokens expire after 1 hour
- [ ] Non-existent emails don't reveal account status
- [ ] Passwords are hashed with bcrypt
- [ ] Old passwords can't be reused immediately

## Deployment Testing

Before deploying to production:
1. Test all scenarios above on production domain
2. Configure email service for reset links
3. Test email delivery
4. Verify SSL certificates
5. Test with real user accounts
6. Monitor error logs

