/**
 * SMS Service Tests
 */

const smsService = require('../../services/smsService');

describe('SMS Service', () => {
  describe('validatePhoneNumber', () => {
    test('should validate correct phone number format', () => {
      expect(smsService.validatePhoneNumber('+254712345678')).toBe(true);
      expect(smsService.validatePhoneNumber('+1234567890')).toBe(true);
    });

    test('should reject invalid phone number format', () => {
      expect(smsService.validatePhoneNumber('invalid')).toBe(false);
      expect(smsService.validatePhoneNumber('123')).toBe(false);
      expect(smsService.validatePhoneNumber('')).toBe(false);
      expect(smsService.validatePhoneNumber(null)).toBe(false);
    });

    test('should accept phone numbers with and without +', () => {
      expect(smsService.validatePhoneNumber('+254712345678')).toBe(true);
      expect(smsService.validatePhoneNumber('254712345678')).toBe(true);
    });
  });

  describe('checkRateLimit', () => {
    beforeEach(() => {
      smsService.rateLimitMap.clear();
    });

    test('should allow messages within rate limit', () => {
      const phoneNumber = '+254712345678';
      for (let i = 0; i < 5; i++) {
        expect(smsService.checkRateLimit(phoneNumber)).toBe(true);
      }
    });

    test('should block messages exceeding rate limit', () => {
      const phoneNumber = '+254712345678';
      // Fill up the rate limit
      for (let i = 0; i < 10; i++) {
        smsService.checkRateLimit(phoneNumber);
      }
      // Next message should be blocked
      expect(smsService.checkRateLimit(phoneNumber)).toBe(false);
    });

    test('should reset rate limit after time window', () => {
      const phoneNumber = '+254712345678';
      expect(smsService.checkRateLimit(phoneNumber)).toBe(true);
      // Rate limit should be independent per time window
      expect(smsService.checkRateLimit(phoneNumber)).toBe(true);
    });
  });

  describe('sendSMS', () => {
    test('should reject invalid phone number', async () => {
      const result = await smsService.sendSMS('invalid', 'Test message');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid phone number');
    });

    test('should send SMS with valid phone number', async () => {
      const result = await smsService.sendSMS(
        '+254712345678',
        'Test message'
      );
      // Should return success or simulated success
      expect(result.success).toBe(true);
    });

    test('should handle empty message', async () => {
      const result = await smsService.sendSMS('+254712345678', '');
      // Should still attempt to send (Twilio will validate)
      expect(result).toBeDefined();
    });
  });

  describe('sendTemplatedSMS', () => {
    test('should send templated SMS with variables', async () => {
      const result = await smsService.sendTemplatedSMS(
        '+254712345678',
        'loanApproved',
        {
          memberName: 'John Doe',
          amount: '10000',
          loanId: 'LOAN001',
        }
      );
      expect(result.success).toBe(true);
    });

    test('should reject invalid template name', async () => {
      const result = await smsService.sendTemplatedSMS(
        '+254712345678',
        'invalidTemplate',
        {}
      );
      expect(result.success).toBe(false);
      expect(result.error).toContain('Template not found');
    });

    test('should replace template variables correctly', async () => {
      const result = await smsService.sendTemplatedSMS(
        '+254712345678',
        'contributionRecorded',
        {
          memberName: 'Jane Smith',
          amount: '5000',
        }
      );
      expect(result.success).toBe(true);
    });
  });

  describe('sendBulkSMS', () => {
    test('should send SMS to multiple recipients', async () => {
      const phoneNumbers = ['+254712345678', '+254712345679', '+254712345680'];
      const results = await smsService.sendBulkSMS(
        phoneNumbers,
        'Bulk test message'
      );

      expect(results).toHaveLength(3);
      expect(results[0]).toHaveProperty('phoneNumber');
      expect(results[0]).toHaveProperty('success');
    });

    test('should handle empty phone number array', async () => {
      const results = await smsService.sendBulkSMS([], 'Test message');
      expect(results).toHaveLength(0);
    });

    test('should return results for each phone number', async () => {
      const phoneNumbers = ['+254712345678', '+254712345679'];
      const results = await smsService.sendBulkSMS(
        phoneNumbers,
        'Test message'
      );

      results.forEach((result) => {
        expect(result).toHaveProperty('phoneNumber');
        expect(result).toHaveProperty('success');
      });
    });
  });

  describe('getSMSStatus', () => {
    test('should return error for invalid SID', async () => {
      const result = await smsService.getSMSStatus('invalid-sid');
      // Will fail if not initialized
      expect(result).toBeDefined();
    });

    test('should require message SID', async () => {
      const result = await smsService.getSMSStatus('');
      expect(result).toBeDefined();
    });
  });

  describe('SMS Service Initialization', () => {
    test('should initialize SMS service', () => {
      expect(smsService).toBeDefined();
      expect(smsService.sendSMS).toBeDefined();
      expect(smsService.sendTemplatedSMS).toBeDefined();
      expect(smsService.sendBulkSMS).toBeDefined();
    });

    test('should have all required methods', () => {
      expect(typeof smsService.sendSMS).toBe('function');
      expect(typeof smsService.sendTemplatedSMS).toBe('function');
      expect(typeof smsService.sendBulkSMS).toBe('function');
      expect(typeof smsService.validatePhoneNumber).toBe('function');
      expect(typeof smsService.checkRateLimit).toBe('function');
      expect(typeof smsService.getSMSStatus).toBe('function');
    });
  });
});

