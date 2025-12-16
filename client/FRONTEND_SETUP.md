# MWENDO MOJA Frontend Setup Guide

## Project Overview
This is the React + Vite frontend for the MWENDO MOJA Welfare Management System.

## Technology Stack
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **CSS** - Styling

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx      # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication context
│   ├── hooks/
│   │   └── useAuth.js              # Auth hook
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Register.jsx            # Registration page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   ├── Members.jsx             # Member management
│   │   ├── Contributions.jsx       # Contribution tracking
│   │   ├── Loans.jsx               # Loan management
│   │   └── Reports.jsx             # Financial reports
│   ├── services/
│   │   └── api.js                  # API service
│   ├── styles/
│   │   ├── Login.css               # Login page styles
│   │   ├── Dashboard.css           # Dashboard styles
│   │   └── Members.css             # Members page styles
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # Global styles
│   └── main.jsx                    # Entry point
├── package.json
└── vite.config.js
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Environment Configuration
Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Implemented

### Phase 1: Frontend Development (Weeks 1-4)
✅ React + Vite initialization
✅ Authentication pages (Login, Register)
✅ Dashboard with statistics
✅ Member management UI
✅ Contribution tracking UI
✅ Loan management UI
✅ Reports UI
✅ Protected routes
✅ Context-based state management

## API Integration
All API calls are made through the `api.js` service which handles:
- Base URL configuration
- Authentication headers (Bearer token)
- Error handling
- Request/response formatting

## Authentication Flow
1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all API requests
5. Protected routes check authentication status
6. Logout clears token and redirects to login

## Next Steps
- Phase 2: Testing & QA (Unit tests, Integration tests)
- Phase 3: Advanced Features (SMS, M-Pesa, Email notifications)
- Phase 4: Deployment (Docker, CI/CD, Production setup)

