/**
 * SMS Configuration
 * Twilio SMS service configuration
 */

module.exports = {
  // Twilio Configuration
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },

  // SMS Settings
  settings: {
    enabled: process.env.SMS_ENABLED === 'true' || false,
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    timeout: 30000, // milliseconds
  },

  // Message Templates
  templates: {
    loanApproved: {
      subject: 'Loan Approved',
      body: 'Hello {memberName}, your loan application of {amount} has been approved. Loan ID: {loanId}',
    },
    loanRejected: {
      subject: 'Loan Rejected',
      body: 'Hello {memberName}, your loan application has been rejected. Please contact the administrator for more details.',
    },
    contributionRecorded: {
      subject: 'Contribution Recorded',
      body: 'Hello {memberName}, your contribution of {amount} has been recorded. Thank you!',
    },
    loanRepaymentReminder: {
      subject: 'Loan Repayment Reminder',
      body: 'Hello {memberName}, your loan repayment of {amount} is due on {dueDate}. Please make the payment on time.',
    },
    welfareAlert: {
      subject: 'Welfare Alert',
      body: 'Hello {memberName}, {message}',
    },
    meetingNotification: {
      subject: 'Meeting Notification',
      body: 'Hello {memberName}, there is a meeting scheduled on {date} at {time}. Location: {location}',
    },
  },

  // Validation Rules
  validation: {
    phoneNumberFormat: /^\+?[1-9]\d{8,14}$/, // E.164 format (minimum 9 digits)
    minPhoneLength: 10,
    maxPhoneLength: 15,
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    maxPerMinute: 10,
    maxPerHour: 100,
  },

  // Logging
  logging: {
    enabled: true,
    logLevel: process.env.SMS_LOG_LEVEL || 'info',
  },
};

