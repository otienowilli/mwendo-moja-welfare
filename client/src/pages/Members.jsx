import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Members = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    membership_card_number: '',
    national_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    designation: '',
    phone_number: '',
    sex: '',
    date_of_birth: '',
    residence: '',
    role_in_group: '',
  });

  useEffect(() => {
    fetchMembers();
  }, [token]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.getMembers(token);
      setMembers(response.members || response.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await api.updateMember(editingId, formData, token);
        if (response.member || response.message) {
          setEditingId(null);
          setFormData({
            membership_card_number: '',
            national_id: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            designation: '',
            phone_number: '',
            sex: '',
            date_of_birth: '',
            residence: '',
            role_in_group: '',
          });
          setShowForm(false);
          fetchMembers();
          alert('Member updated successfully!');
        } else if (response.error) {
          alert('Error: ' + response.error);
        }
      } else {
        const response = await api.createMember(formData, token);
        if (response.member || response.message) {
          setFormData({
            membership_card_number: '',
            national_id: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            designation: '',
            phone_number: '',
            sex: '',
            date_of_birth: '',
            residence: '',
            role_in_group: '',
          });
          setShowForm(false);
          fetchMembers();
          alert('Member created successfully!');
        } else if (response.error) {
          alert('Error: ' + response.error);
        }
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member: ' + error.message);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      membership_card_number: member.membership_card_number,
      national_id: member.national_id,
      first_name: member.first_name,
      middle_name: member.middle_name || '',
      last_name: member.last_name,
      email: member.email || '',
      phone_number: member.phone_number || '',
      sex: member.sex || '',
      date_of_birth: member.date_of_birth || '',
      residence: member.residence || '',
      role_in_group: member.role_in_group || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to deactivate this member?')) {
      try {
        await api.deactivateMember(memberId, token);
        fetchMembers();
        alert('Member deactivated successfully!');
      } catch (error) {
        console.error('Error deactivating member:', error);
        alert('Error deactivating member: ' + error.message);
      }
    }
  };

  const filteredMembers = members.filter(member => {
    const fullName = member.middle_name
      ? `${member.first_name} ${member.middle_name} ${member.last_name}`
      : `${member.first_name} ${member.last_name}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.phone_number && member.phone_number.includes(searchTerm)) ||
      member.national_id.includes(searchTerm)
    );
  });

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>Member Management</h1>
        <p>Manage and track all welfare group members</p>
      </div>

      <div className="members-controls">
        <input
          type="text"
          placeholder="Search by name, email, phone, or national ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => {
          setEditingId(null);
          setFormData({
            membership_card_number: '',
            national_id: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            designation: '',
            phone_number: '',
            sex: '',
            date_of_birth: '',
            residence: '',
            role_in_group: '',
          });
          setShowForm(!showForm);
        }} className="add-member-btn">
          {showForm ? '✕ Cancel' : '+ Add New Member'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="member-form">
          <input
            type="text"
            name="membership_card_number"
            placeholder="Membership Card Number *"
            value={formData.membership_card_number}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="national_id"
            placeholder="National ID *"
            value={formData.national_id}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name *"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="middle_name"
            placeholder="Middle Name (Optional)"
            value={formData.middle_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name *"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation (e.g., Chairman, Treasurer, Secretary)"
            value={formData.designation}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="date_of_birth"
            placeholder="Date of Birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="residence"
            placeholder="Residence"
            value={formData.residence}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role_in_group"
            placeholder="Role in Group"
            value={formData.role_in_group}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-btn">{editingId ? 'Update Member' : 'Create Member'}</button>
        </form>
      )}

      {loading ? (
        <p>Loading members...</p>
      ) : filteredMembers.length === 0 ? (
        <div className="empty-state">
          <p>No members found</p>
        </div>
      ) : (
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Membership Card</th>
                <th>National ID</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => {
                const fullName = member.middle_name
                  ? `${member.first_name} ${member.middle_name} ${member.last_name}`
                  : `${member.first_name} ${member.last_name}`;
                return (
                  <tr key={member.id}>
                    <td>{fullName}</td>
                    <td>{member.membership_card_number || '-'}</td>
                    <td>{member.national_id}</td>
                    <td>{member.email || '-'}</td>
                    <td>{member.designation || '-'}</td>
                    <td>{member.role_in_group || '-'}</td>
                    <td>{member.phone_number || '-'}</td>
                    <td>{member.sex || '-'}</td>
                    <td><span className={`status-${member.status || 'active'}`}>{member.status || 'Active'}</span></td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(member)} className="action-edit">Edit</button>
                      <button onClick={() => handleDelete(member.id)} className="action-delete">Deactivate</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Members;

