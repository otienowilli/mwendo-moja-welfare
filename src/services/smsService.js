/**
 * SMS Service
 * Handles SMS notifications using Twilio
 */

const twilio = require('twilio');
const smsConfig = require('../config/smsConfig');

class SMSService {
  constructor() {
    this.client = null;
    this.initialized = false;
    this.messageQueue = [];
    this.rateLimitMap = new Map();
    this.init();
  }

  /**
   * Initialize Twilio client
   */
  init() {
    try {
      if (!smsConfig.twilio.accountSid || !smsConfig.twilio.authToken) {
        console.warn('SMS Service: Twilio credentials not configured');
        return;
      }

      this.client = twilio(
        smsConfig.twilio.accountSid,
        smsConfig.twilio.authToken
      );
      this.initialized = true;
      console.log('SMS Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SMS Service:', error.message);
    }
  }

  /**
   * Send SMS message
   * @param {string} phoneNumber - Recipient phone number
   * @param {string} message - Message content
   * @returns {Promise<Object>} - Twilio response
   */
  async sendSMS(phoneNumber, message) {
    try {
      // Validate phone number
      if (!this.validatePhoneNumber(phoneNumber)) {
        throw new Error(`Invalid phone number format: ${phoneNumber}`);
      }

      // Check rate limiting
      if (!this.checkRateLimit(phoneNumber)) {
        throw new Error(`Rate limit exceeded for ${phoneNumber}`);
      }

      // If SMS not enabled or not initialized, log and return
      if (!smsConfig.settings.enabled || !this.initialized) {
        console.log(`[SMS] Would send to ${phoneNumber}: ${message}`);
        return { success: true, simulated: true };
      }

      // Send SMS via Twilio
      const response = await this.client.messages.create({
        body: message,
        from: smsConfig.twilio.phoneNumber,
        to: phoneNumber,
      });

      console.log(`SMS sent successfully to ${phoneNumber}. SID: ${response.sid}`);
      return { success: true, sid: response.sid, timestamp: new Date() };
    } catch (error) {
      console.error(`Failed to send SMS to ${phoneNumber}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send templated SMS
   * @param {string} phoneNumber - Recipient phone number
   * @param {string} templateName - Template name
   * @param {Object} variables - Template variables
   * @returns {Promise<Object>} - Send result
   */
  async sendTemplatedSMS(phoneNumber, templateName, variables = {}) {
    try {
      const template = smsConfig.templates[templateName];
      if (!template) {
        throw new Error(`Template not found: ${templateName}`);
      }

      let message = template.body;
      Object.keys(variables).forEach((key) => {
        message = message.replace(`{${key}}`, variables[key]);
      });

      return await this.sendSMS(phoneNumber, message);
    } catch (error) {
      console.error(`Failed to send templated SMS:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Validate phone number format
   * @param {string} phoneNumber - Phone number to validate
   * @returns {boolean} - Is valid
   */
  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) return false;
    const regex = smsConfig.validation.phoneNumberFormat;
    return regex.test(phoneNumber);
  }

  /**
   * Check rate limiting
   * @param {string} phoneNumber - Phone number
   * @returns {boolean} - Is within rate limit
   */
  checkRateLimit(phoneNumber) {
    if (!smsConfig.rateLimit.enabled) return true;

    const now = Date.now();
    const key = `${phoneNumber}:${Math.floor(now / 60000)}`; // Per minute

    if (!this.rateLimitMap.has(key)) {
      this.rateLimitMap.set(key, 0);
    }

    const count = this.rateLimitMap.get(key);
    if (count >= smsConfig.rateLimit.maxPerMinute) {
      return false;
    }

    this.rateLimitMap.set(key, count + 1);
    return true;
  }

  /**
   * Send bulk SMS
   * @param {Array<string>} phoneNumbers - Array of phone numbers
   * @param {string} message - Message content
   * @returns {Promise<Array>} - Array of results
   */
  async sendBulkSMS(phoneNumbers, message) {
    const results = [];
    for (const phoneNumber of phoneNumbers) {
      const result = await this.sendSMS(phoneNumber, message);
      results.push({ phoneNumber, ...result });
    }
    return results;
  }

  /**
   * Get SMS status
   * @param {string} messageSid - Twilio message SID
   * @returns {Promise<Object>} - Message status
   */
  async getSMSStatus(messageSid) {
    try {
      if (!this.initialized) {
        throw new Error('SMS Service not initialized');
      }

      const message = await this.client.messages(messageSid).fetch();
      return {
        sid: message.sid,
        status: message.status,
        to: message.to,
        from: message.from,
        body: message.body,
        dateSent: message.dateSent,
      };
    } catch (error) {
      console.error(`Failed to get SMS status:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new SMSService();

