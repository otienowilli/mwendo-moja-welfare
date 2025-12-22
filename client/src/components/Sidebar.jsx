import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/members', label: 'Members', icon: '👥' },
    { path: '/contributions', label: 'Contributions', icon: '💰' },
    { path: '/loans', label: 'Loans', icon: '📋' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/profile', label: 'My Profile', icon: '👤' },
    { path: '/my-loans', label: 'My Loans', icon: '🏦' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">MWENDO MOJA</h2>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          {isOpen && (
            <>
              <p className="user-name">{user?.full_name || user?.name || 'User'}</p>
              <p className="user-role">{user?.role || 'Member'}</p>
            </>
          )}
        </div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          {isOpen ? '🚪 Logout' : '🚪'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

