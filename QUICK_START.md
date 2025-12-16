# MWENDO MOJA - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js v20.10.0 or higher
- npm v10.2.3 or higher
- Backend server running on port 5000

---

## Step 1: Start the Backend

```bash
# Navigate to project root
cd "/Users/blessedwilliams/MWENDO MOJA WELFARE"

# Install dependencies (if not done)
npm install

# Start the backend server
npm start
```

**Expected Output:**
```
Server running on port 5000
Database connected
```

---

## Step 2: Start the Frontend

```bash
# In a new terminal, navigate to client directory
cd "/Users/blessedwilliams/MWENDO MOJA WELFARE/client"

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v7.3.0  ready in 123 ms

➜  Local:   http://localhost:5173/
```

---

## Step 3: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You'll be redirected to the login page.

---

## 📝 Test Credentials

Use these credentials to test the application:

**Email:** test@example.com
**Password:** password123

(These are created during backend setup)

---

## 🎯 What You Can Do

### Dashboard
- View system statistics
- See total members, contributions, loans
- Quick navigation to all features

### Members
- Add new members
- View all members
- Manage member information

### Contributions
- Record member contributions
- Track by vote head
- View contribution history

### Loans
- Apply for loans
- View loan status
- Track repayments

### Reports
- View financial summaries
- See total contributions
- Monitor loan disbursements

---

## 🔧 Troubleshooting

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API connection error
- Ensure backend is running on port 5000
- Check VITE_API_URL in client/.env
- Verify network connectivity

### Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## 📚 Documentation

- **Backend:** See `src/` directory
- **Frontend:** See `client/FRONTEND_SETUP.md`
- **API:** See `API_DOCUMENTATION.md`
- **Phase 1:** See `PHASE_1_COMPLETION.md`

---

## 🎉 You're All Set!

The MWENDO MOJA system is now running. Start exploring the features!

**Questions?** Check the documentation files or review the code comments.

**Happy coding! 🚀**

