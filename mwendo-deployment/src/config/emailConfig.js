/**
 * Email Configuration
 * SendGrid email service configuration
 */

module.exports = {
  // SendGrid Configuration
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@mwendomoja.com',
    fromName: 'MWENDO MOJA Welfare',
  },

  // Email Settings
  settings: {
    enabled: process.env.EMAIL_ENABLED === 'true' || false,
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    timeout: 30000, // milliseconds
  },

  // Email Templates
  templates: {
    loanApproved: {
      subject: 'Loan Application Approved',
      body: `Dear {memberName},

Your loan application has been approved!

Loan Details:
- Loan ID: {loanId}
- Amount: KES {amount}
- Interest Rate: {interestRate}%
- Repayment Period: {repaymentPeriod} months
- Monthly Payment: KES {monthlyPayment}

The funds will be disbursed to your account within 2-3 business days.

Best regards,
MWENDO MOJA Welfare Management System`,
    },

    loanRejected: {
      subject: 'Loan Application Status Update',
      body: `Dear {memberName},

Thank you for your loan application. Unfortunately, your application has been rejected.

Reason: {reason}

Please contact our office for more information or to discuss alternative options.

Best regards,
MWENDO MOJA Welfare Management System`,
    },

    contributionRecorded: {
      subject: 'Contribution Recorded',
      body: `Dear {memberName},

Your contribution has been successfully recorded.

Contribution Details:
- Amount: KES {amount}
- Date: {date}
- Reference: {reference}
- Total Contributions: KES {totalContributions}

Thank you for your continued support.

Best regards,
MWENDO MOJA Welfare Management System`,
    },

    loanRepaymentReminder: {
      subject: 'Loan Repayment Reminder',
      body: `Dear {memberName},

This is a reminder that your loan repayment is due.

Repayment Details:
- Loan ID: {loanId}
- Amount Due: KES {amountDue}
- Due Date: {dueDate}
- Outstanding Balance: KES {outstandingBalance}

Please ensure timely payment to avoid penalties.

Best regards,
MWENDO MOJA Welfare Management System`,
    },

    meetingNotification: {
      subject: 'Upcoming Meeting Notification',
      body: `Dear {memberName},

You are invited to an important meeting.

Meeting Details:
- Date: {date}
- Time: {time}
- Location: {location}
- Agenda: {agenda}

Please confirm your attendance.

Best regards,
MWENDO MOJA Welfare Management System`,
    },

    welfareAlert: {
      subject: 'Welfare Alert',
      body: `Dear {memberName},

{message}

Please take necessary action or contact our office for more information.

Best regards,
MWENDO MOJA Welfare Management System`,
    },
  },

  // Validation Rules
  validation: {
    emailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    minEmailLength: 5,
    maxEmailLength: 254,
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    maxPerMinute: 10,
    maxPerHour: 100,
  },

  // Logging
  logging: {
    enabled: process.env.EMAIL_LOG_ENABLED === 'true' || true,
    logLevel: process.env.EMAIL_LOG_LEVEL || 'info',
  },
};

