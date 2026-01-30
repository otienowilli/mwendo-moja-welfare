import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/PendingPayments.css';

const PendingPayments = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);
  const [confirmData, setConfirmData] = useState({
    mpesa_receipt: '',
    mpesa_transaction_id: '',
  });

  useEffect(() => {
    fetchPendingPayments();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingPayments, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      const response = await api.getPendingPayments(token);
      setPayments(response.data || []);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
      setError('Failed to load pending payments');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (paymentId) => {
    if (!confirmData.mpesa_receipt || !confirmData.mpesa_transaction_id) {
      setError('Please enter both M-Pesa receipt and transaction ID');
      return;
    }

    try {
      setError('');
      const response = await api.confirmPayment(paymentId, confirmData, token);
      if (response.payment_request) {
        setSuccess('Payment confirmed successfully!');
        setConfirmingId(null);
        setConfirmData({ mpesa_receipt: '', mpesa_transaction_id: '' });
        fetchPendingPayments();
      } else {
        setError(response.error || 'Failed to confirm payment');
      }
    } catch (error) {
      setError('Error confirming payment: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: '#FFA500',
      prompted: '#2196F3',
      completed: '#4CAF50',
      failed: '#f44336',
      cancelled: '#9E9E9E',
    };
    return <span style={{ backgroundColor: colors[status], color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="pending-payments-container">
      <div className="payments-header">
        <h1>💳 Pending M-Pesa Payments</h1>
        <button onClick={fetchPendingPayments} className="refresh-btn">🔄 Refresh</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="payments-info">
        <p>You have <strong>{payments.filter(p => p.status === 'prompted').length}</strong> active payment prompts waiting for your response.</p>
      </div>

      <div className="payments-list">
        {loading ? (
          <p>Loading pending payments...</p>
        ) : payments.length === 0 ? (
          <p>No pending payments at this time.</p>
        ) : (
          payments.map(payment => (
            <div key={payment.id} className="payment-card">
              <div className="payment-header">
                <h3>{payment.PaymentCampaign?.title || 'Payment Request'}</h3>
                <span>{getStatusBadge(payment.status)}</span>
              </div>

              <div className="payment-details">
                <p><strong>Amount:</strong> KES {payment.amount}</p>
                <p><strong>Type:</strong> {payment.PaymentCampaign?.campaign_type || 'N/A'}</p>
                <p><strong>Description:</strong> {payment.PaymentCampaign?.description || 'No description'}</p>
                <p><strong>Phone:</strong> {payment.phone_number}</p>
              </div>

              {payment.status === 'prompted' && (
                <div className="payment-confirm">
                  {confirmingId === payment.id ? (
                    <div className="confirm-form">
                      <input
                        type="text"
                        placeholder="M-Pesa Receipt Number (e.g., LHD1234567890)"
                        value={confirmData.mpesa_receipt}
                        onChange={(e) => setConfirmData({ ...confirmData, mpesa_receipt: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="M-Pesa Transaction ID"
                        value={confirmData.mpesa_transaction_id}
                        onChange={(e) => setConfirmData({ ...confirmData, mpesa_transaction_id: e.target.value })}
                      />
                      <div className="confirm-buttons">
                        <button onClick={() => handleConfirmPayment(payment.id)} className="confirm-btn">✓ Confirm</button>
                        <button onClick={() => setConfirmingId(null)} className="cancel-btn">✕ Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmingId(payment.id)} className="action-btn">
                      ✓ Confirm Payment
                    </button>
                  )}
                </div>
              )}

              {payment.status === 'completed' && (
                <div className="payment-completed">
                  <p>✓ Payment completed on {new Date(payment.payment_date).toLocaleDateString()}</p>
                  <p>Receipt: {payment.mpesa_receipt}</p>
                </div>
              )}

              {payment.status === 'failed' && (
                <div className="payment-failed">
                  <p>✗ Payment failed: {payment.error_message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingPayments;

