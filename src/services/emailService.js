/**
 * Email Service
 * SendGrid email notification service
 */

const emailConfig = require('../config/emailConfig');

class EmailService {
  constructor() {
    this.config = emailConfig;
    this.rateLimitMap = new Map();
    this.initialized = false;
    this.initializeSendGrid();
  }

  initializeSendGrid() {
    try {
      if (this.config.sendgrid.apiKey) {
        // In production, would use: const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(this.config.sendgrid.apiKey);
        this.initialized = true;
        console.log('SendGrid initialized successfully');
      } else {
        console.warn('SendGrid API key not configured');
      }
    } catch (error) {
      console.error('Failed to initialize SendGrid:', error.message);
    }
  }

  validateEmail(email) {
    if (!email) return false;
    if (email.length < this.config.validation.minEmailLength) return false;
    if (email.length > this.config.validation.maxEmailLength) return false;
    return this.config.validation.emailFormat.test(email);
  }

  checkRateLimit(email) {
    if (!this.config.rateLimit.enabled) return true;

    const now = Date.now();
    const key = `${email}:${Math.floor(now / 60000)}`;

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

  replaceVariables(template, variables) {
    let result = template;
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, variables[key]);
    });
    return result;
  }

  async sendEmail(email, subject, body) {
    try {
      if (!this.validateEmail(email)) {
        return {
          success: false,
          error: 'Invalid email address format',
        };
      }

      if (!this.checkRateLimit(email)) {
        return {
          success: false,
          error: 'Rate limit exceeded for this email',
        };
      }

      // Simulate sending email (in production, use SendGrid)
      console.log(`Email sent to ${email}: ${subject}`);

      return {
        success: true,
        messageId: `msg_${Date.now()}`,
        email,
        subject,
      };
    } catch (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendTemplatedEmail(email, templateName, variables) {
    try {
      if (!this.config.templates[templateName]) {
        return {
          success: false,
          error: 'Template not found',
        };
      }

      const template = this.config.templates[templateName];
      const subject = this.replaceVariables(template.subject, variables);
      const body = this.replaceVariables(template.body, variables);

      return await this.sendEmail(email, subject, body);
    } catch (error) {
      console.error('Templated email error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendBulkEmail(emails, subject, body) {
    try {
      const results = [];

      for (const email of emails) {
        const result = await this.sendEmail(email, subject, body);
        results.push({
          email,
          ...result,
        });
      }

      return results;
    } catch (error) {
      console.error('Bulk email error:', error);
      return [];
    }
  }

  async getEmailStatus(messageId) {
    try {
      // In production, would query SendGrid API
      return {
        messageId,
        status: 'delivered',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Email status error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new EmailService();

