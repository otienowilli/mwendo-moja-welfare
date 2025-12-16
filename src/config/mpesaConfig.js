/**
 * M-Pesa Configuration
 * Safaricom Daraja API configuration
 */

module.exports = {
  // Safaricom Daraja API Configuration
  daraja: {
    consumerKey: process.env.MPESA_CONSUMER_KEY || '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
    businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE || '174379',
    passkey: process.env.MPESA_PASSKEY || '',
    baseUrl: process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke',
    callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://yourdomain.com/api/mpesa/callback',
  },

  // M-Pesa Settings
  settings: {
    enabled: process.env.MPESA_ENABLED === 'true' || false,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox', // sandbox or production
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 30000,
  },

  // STK Push Settings
  stkPush: {
    accountReference: 'MWENDOMOJA',
    transactionDesc: 'Loan Repayment',
    amount: 0, // Will be set dynamically
  },

  // Transaction Types
  transactionTypes: {
    LOAN_REPAYMENT: 'LOAN_REPAYMENT',
    CONTRIBUTION: 'CONTRIBUTION',
    WELFARE_PAYMENT: 'WELFARE_PAYMENT',
    LOAN_DISBURSEMENT: 'LOAN_DISBURSEMENT',
  },

  // Validation Rules
  validation: {
    phoneNumberFormat: /^254[0-9]{9}$/, // Kenya format
    minAmount: 1,
    maxAmount: 150000,
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    maxPerMinute: 10,
    maxPerHour: 100,
  },

  // Logging
  logging: {
    enabled: process.env.MPESA_LOG_ENABLED === 'true' || true,
    logLevel: process.env.MPESA_LOG_LEVEL || 'info',
  },

  // API Endpoints
  endpoints: {
    oauth: '/oauth/v1/generate?grant_type=client_credentials',
    stkPush: '/mpesa/stkpush/v1/processrequest',
    stkPushQuery: '/mpesa/stkpushquery/v1/query',
    transactionStatus: '/mpesa/transactionstatus/v1/query',
    accountBalance: '/mpesa/accountbalance/v1/query',
    reversal: '/mpesa/reversal/v1/request',
    b2c: '/mpesa/b2c/v1/paymentrequest',
  },
};

