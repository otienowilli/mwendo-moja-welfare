/**
 * M-Pesa Service
 * Safaricom Daraja API integration
 */

const mpesaConfig = require('../config/mpesaConfig');

class MpesaService {
  constructor() {
    this.config = mpesaConfig;
    this.accessToken = null;
    this.tokenExpiry = null;
    this.rateLimitMap = new Map();
    this.initialized = false;
    this.init();
  }

  init() {
    try {
      if (this.config.daraja.consumerKey && this.config.daraja.consumerSecret) {
        this.initialized = true;
        console.log('M-Pesa Service initialized successfully');
      } else {
        console.warn('M-Pesa credentials not configured');
      }
    } catch (error) {
      console.error('Failed to initialize M-Pesa Service:', error.message);
    }
  }

  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) return false;
    // Convert to 254 format if needed
    let phone = phoneNumber.toString();
    if (phone.startsWith('0')) {
      phone = '254' + phone.substring(1);
    }
    if (!phone.startsWith('254')) {
      phone = '254' + phone;
    }
    return this.config.validation.phoneNumberFormat.test(phone);
  }

  validateAmount(amount) {
    const num = parseFloat(amount);
    return (
      num >= this.config.validation.minAmount &&
      num <= this.config.validation.maxAmount
    );
  }

  checkRateLimit(phoneNumber) {
    if (!this.config.rateLimit.enabled) return true;

    const now = Date.now();
    const key = `${phoneNumber}:${Math.floor(now / 60000)}`;

    if (!this.rateLimitMap.has(key)) {
      this.rateLimitMap.set(key, 0);
    }

    const count = this.rateLimitMap.get(key);
    if (count >= this.config.rateLimit.maxPerMinute) {
      return false;
    }

    this.rateLimitMap.set(key, count + 1);
    return true;
  }

  async getAccessToken() {
    try {
      // In production, would call Safaricom OAuth endpoint
      // For now, return mock token
      this.accessToken = `mock_token_${Date.now()}`;
      this.tokenExpiry = Date.now() + 3600000; // 1 hour
      return this.accessToken;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  async initiateStkPush(phoneNumber, amount, accountRef, description) {
    try {
      if (!this.validatePhoneNumber(phoneNumber)) {
        return { success: false, error: 'Invalid phone number' };
      }

      if (!this.validateAmount(amount)) {
        return { success: false, error: 'Invalid amount' };
      }

      if (!this.checkRateLimit(phoneNumber)) {
        return { success: false, error: 'Rate limit exceeded' };
      }

      // Simulate STK Push
      console.log(
        `STK Push initiated for ${phoneNumber}: KES ${amount}`
      );

      return {
        success: true,
        checkoutRequestID: `req_${Date.now()}`,
        responseCode: '0',
        responseDescription: 'Success. Request accepted for processing',
        customerMessage: 'Success. Request accepted for processing',
      };
    } catch (error) {
      console.error('STK Push error:', error);
      return { success: false, error: error.message };
    }
  }

  async queryStkPushStatus(checkoutRequestID) {
    try {
      // Simulate query
      return {
        success: true,
        checkoutRequestID,
        resultCode: '0',
        resultDesc: 'The service request has been accepted successfully',
        merchantRequestID: `mrq_${Date.now()}`,
      };
    } catch (error) {
      console.error('STK Query error:', error);
      return { success: false, error: error.message };
    }
  }

  async queryTransactionStatus(transactionID) {
    try {
      // Simulate transaction status query
      return {
        success: true,
        transactionID,
        status: 'COMPLETED',
        amount: 0,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Transaction status error:', error);
      return { success: false, error: error.message };
    }
  }

  async checkAccountBalance() {
    try {
      // Simulate account balance check
      return {
        success: true,
        balance: 50000,
        currency: 'KES',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Account balance error:', error);
      return { success: false, error: error.message };
    }
  }

  async reverseTransaction(transactionID, amount, remarks) {
    try {
      // Simulate transaction reversal
      return {
        success: true,
        reversalID: `rev_${Date.now()}`,
        originalTransactionID: transactionID,
        amount,
        status: 'PENDING',
      };
    } catch (error) {
      console.error('Reversal error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new MpesaService();

