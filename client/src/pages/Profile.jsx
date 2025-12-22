import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.getMembers(token);
      if (response.data && response.data.length > 0) {
        setProfile(response.data[0]);
        setFormData(response.data[0]);
      }
    } catch (err) {
      setError('Failed to fetch profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateMember(profile.id, formData, token);
      if (response.success) {
        setProfile(formData);
        setEditMode(false);
        setError('');
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and manage your profile information</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {profile && (
        <div style={{ maxWidth: '600px', margin: '30px auto' }}>
          {!editMode ? (
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Personal Information</h3>
                <p><strong>Name:</strong> {profile.name || profile.full_name || 'N/A'}</p>
                <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                <p><strong>ID Number:</strong> {profile.id_number || 'N/A'}</p>
                <p><strong>Status:</strong> <span className={`status-${profile.status}`}>{profile.status || 'Active'}</span></p>
                <p><strong>Join Date:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              <button className="add-member-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          ) : (
            <form className="member-form" onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name || formData.full_name || ''}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone || ''}
                onChange={handleChange}
              />
              <input
                type="text"
                name="id_number"
                placeholder="ID Number"
                value={formData.id_number || ''}
                onChange={handleChange}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="submit-btn">Save Changes</button>
                <button type="button" className="add-member-btn" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

