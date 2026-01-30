/**
 * SMS Routes Tests
 */

const request = require('supertest');
const express = require('express');

// Mock auth middleware before importing routes
jest.mock('../../middleware/auth', () => (req, res, next) => {
  req.user = { id: 1, email: 'test@example.com' };
  next();
});

// Mock SMS service
jest.mock('../../services/smsService', () => ({
  sendSMS: jest.fn(),
  sendTemplatedSMS: jest.fn(),
  sendBulkSMS: jest.fn(),
  getSMSStatus: jest.fn(),
  validatePhoneNumber: jest.fn(),
  checkRateLimit: jest.fn(),
}));

const smsRoutes = require('../../routes/smsRoutes');
const smsService = require('../../services/smsService');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/sms', smsRoutes);

describe('SMS Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/sms/send', () => {
    test('should send SMS successfully', async () => {
      smsService.sendSMS.mockResolvedValue({
        success: true,
        sid: 'SM123456789',
      });

      const response = await request(app)
        .post('/api/sms/send')
        .send({
          phoneNumber: '+254712345678',
          message: 'Test message',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(smsService.sendSMS).toHaveBeenCalledWith(
        '+254712345678',
        'Test message'
      );
    });

    test('should return 400 for missing phone number', async () => {
      const response = await request(app)
        .post('/api/sms/send')
        .send({
          message: 'Test message',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should return 400 for missing message', async () => {
      const response = await request(app)
        .post('/api/sms/send')
        .send({
          phoneNumber: '+254712345678',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should handle SMS send failure', async () => {
      smsService.sendSMS.mockResolvedValue({
        success: false,
        error: 'Invalid phone number',
      });

      const response = await request(app)
        .post('/api/sms/send')
        .send({
          phoneNumber: 'invalid',
          message: 'Test message',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sms/send-templated', () => {
    test('should send templated SMS successfully', async () => {
      smsService.sendTemplatedSMS.mockResolvedValue({
        success: true,
        sid: 'SM123456789',
      });

      const response = await request(app)
        .post('/api/sms/send-templated')
        .send({
          phoneNumber: '+254712345678',
          templateName: 'loanApproved',
          variables: {
            memberName: 'John Doe',
            amount: '10000',
            loanId: 'LOAN001',
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(smsService.sendTemplatedSMS).toHaveBeenCalled();
    });

    test('should return 400 for missing template name', async () => {
      const response = await request(app)
        .post('/api/sms/send-templated')
        .send({
          phoneNumber: '+254712345678',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should handle template not found error', async () => {
      smsService.sendTemplatedSMS.mockResolvedValue({
        success: false,
        error: 'Template not found',
      });

      const response = await request(app)
        .post('/api/sms/send-templated')
        .send({
          phoneNumber: '+254712345678',
          templateName: 'invalidTemplate',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sms/send-bulk', () => {
    test('should send bulk SMS successfully', async () => {
      smsService.sendBulkSMS.mockResolvedValue([
        { phoneNumber: '+254712345678', success: true, sid: 'SM1' },
        { phoneNumber: '+254712345679', success: true, sid: 'SM2' },
      ]);

      const response = await request(app)
        .post('/api/sms/send-bulk')
        .send({
          phoneNumbers: ['+254712345678', '+254712345679'],
          message: 'Bulk test message',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.total).toBe(2);
      expect(response.body.data.successful).toBe(2);
    });

    test('should return 400 for missing phone numbers', async () => {
      const response = await request(app)
        .post('/api/sms/send-bulk')
        .send({
          message: 'Test message',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should handle partial failures in bulk send', async () => {
      smsService.sendBulkSMS.mockResolvedValue([
        { phoneNumber: '+254712345678', success: true, sid: 'SM1' },
        { phoneNumber: '+254712345679', success: false, error: 'Invalid' },
      ]);

      const response = await request(app)
        .post('/api/sms/send-bulk')
        .send({
          phoneNumbers: ['+254712345678', '+254712345679'],
          message: 'Test message',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.successful).toBe(1);
      expect(response.body.data.failed).toBe(1);
    });
  });

  describe('GET /api/sms/status/:messageSid', () => {
    test('should get SMS status successfully', async () => {
      smsService.getSMSStatus.mockResolvedValue({
        sid: 'SM123456789',
        status: 'delivered',
        to: '+254712345678',
        from: '+1234567890',
        body: 'Test message',
      });

      const response = await request(app)
        .get('/api/sms/status/SM123456789');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('delivered');
    });

    test('should return 400 for missing message SID', async () => {
      const response = await request(app)
        .get('/api/sms/status/');

      expect(response.status).toBe(404);
    });

    test('should handle status retrieval error', async () => {
      smsService.getSMSStatus.mockResolvedValue({
        success: false,
        error: 'Message not found',
      });

      const response = await request(app)
        .get('/api/sms/status/invalid-sid');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sms/templates', () => {
    test('should get SMS templates successfully', async () => {
      const response = await request(app)
        .get('/api/sms/templates');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should return template structure', async () => {
      const response = await request(app)
        .get('/api/sms/templates');

      expect(response.status).toBe(200);
      if (response.body.data.length > 0) {
        expect(response.body.data[0]).toHaveProperty('name');
        expect(response.body.data[0]).toHaveProperty('subject');
        expect(response.body.data[0]).toHaveProperty('body');
      }
    });
  });
});

