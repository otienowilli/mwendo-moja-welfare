import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists and validate it
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.login(email, password);
      // Check if response has an error field (API returns error on failure)
      if (response.error) {
        setError(response.error);
        return { success: false, message: response.error };
      }
      // Check if response has a token (successful login)
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true, message: 'Login successful', token: response.token, user: response.user };
      } else {
        setError('Login failed');
        return { success: false, message: 'Login failed' };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.register(userData);
      // Check if response has an error field (API returns error on failure)
      if (response.error) {
        setError(response.error);
        return { success: false, message: response.error };
      }
      // Check if response has a token (successful registration)
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true, message: 'Registration successful', token: response.token, user: response.user };
      } else {
        setError('Registration failed');
        return { success: false, message: 'Registration failed' };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

