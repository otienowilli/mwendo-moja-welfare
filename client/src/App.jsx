import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Contributions from './pages/Contributions';
import Loans from './pages/Loans';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import MyLoans from './pages/MyLoans';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Layout>
                  <Members />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contributions"
            element={
              <ProtectedRoute>
                <Layout>
                  <Contributions />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/loans"
            element={
              <ProtectedRoute>
                <Layout>
                  <Loans />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-loans"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyLoans />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
