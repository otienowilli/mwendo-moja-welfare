import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
        // Show reset link in development
        if (data.resetLink) {
          setMessage(`${data.message}\n\nReset Link: ${data.resetLink}`);
        }
      } else {
        setError(data.error || 'Failed to process request');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>MWENDO MOJA</h1>
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="register-link">
          Remember your password? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

