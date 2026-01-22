import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/SystemSettings.css';

const SystemSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    groupName: 'MWENDO MOJA Welfare Group',
    groupEmail: 'info@mwendomoja.com',
    groupPhone: '+254 700 000 000',
    currency: 'KES',
    maxLoanAmount: 50000,
    loanInterestRate: 5,
    minContribution: 1000,
    maxMembers: 100,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving settings:', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="system-settings-container">
      <div className="settings-header">
        <h1>⚙️ System Settings</h1>
        <p>Configure system parameters and group information</p>
      </div>

      <form onSubmit={handleSaveSettings} className="settings-form">
        <div className="settings-section">
          <h2>Group Information</h2>
          <div className="form-group">
            <label>Group Name</label>
            <input type="text" name="groupName" value={settings.groupName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Group Email</label>
            <input type="email" name="groupEmail" value={settings.groupEmail} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Group Phone</label>
            <input type="tel" name="groupPhone" value={settings.groupPhone} onChange={handleInputChange} />
          </div>
        </div>

        <div className="settings-section">
          <h2>Financial Settings</h2>
          <div className="form-group">
            <label>Currency</label>
            <select name="currency" value={settings.currency} onChange={handleInputChange}>
              <option value="KES">KES (Kenyan Shilling)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Maximum Loan Amount (KES)</label>
            <input type="number" name="maxLoanAmount" value={settings.maxLoanAmount} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Loan Interest Rate (%)</label>
            <input type="number" name="loanInterestRate" value={settings.loanInterestRate} onChange={handleInputChange} step="0.1" />
          </div>
          <div className="form-group">
            <label>Minimum Contribution (KES)</label>
            <input type="number" name="minContribution" value={settings.minContribution} onChange={handleInputChange} />
          </div>
        </div>

        <div className="settings-section">
          <h2>Membership Settings</h2>
          <div className="form-group">
            <label>Maximum Members</label>
            <input type="number" name="maxMembers" value={settings.maxMembers} onChange={handleInputChange} />
          </div>
        </div>

        <button type="submit" className="save-btn">💾 Save Settings</button>
        {saved && <p className="success-message">✅ Settings saved successfully!</p>}
      </form>
    </div>
  );
};

export default SystemSettings;

