import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'treasurer',
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Placeholder - would need actual API endpoint
      setUsers([
        { id: 1, username: 'admin', email: 'admin@mwendo.com', full_name: 'Admin User', role: 'admin', is_active: true },
        { id: 2, username: 'treasurer1', email: 'treasurer@mwendo.com', full_name: 'Treasurer', role: 'treasurer', is_active: true },
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      // Would call API to create user
      console.log('Creating user:', formData);
      setFormData({ username: '', email: '', password: '', full_name: '', role: 'treasurer' });
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeactivateUser = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        // Would call API to deactivate user
        console.log('Deactivating user:', userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    }
  };

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>👥 User Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="create-btn">
          {showForm ? '✕ Cancel' : '+ Create User'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateUser} className="user-form">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleInputChange} required />
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="admin">Admin</option>
            <option value="treasurer">Treasurer</option>
            <option value="secretary">Secretary</option>
          </select>
          <button type="submit" className="submit-btn">Create User</button>
        </form>
      )}

      <div className="users-table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.full_name}</td>
                  <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                  <td><span className={`status-badge ${u.is_active ? 'active' : 'inactive'}`}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button onClick={() => handleDeactivateUser(u.id)} className="action-btn deactivate">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

