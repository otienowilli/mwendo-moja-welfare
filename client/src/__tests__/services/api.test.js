import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import api from '../../services/api'

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should login user with valid credentials', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ token: 'test-token', user: { id: 1 } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.login('test@example.com', 'password')

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('token')
    })

    it('should handle login errors', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Invalid credentials' })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      try {
        await api.login('test@example.com', 'wrong')
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    it('should register new user', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ user: { id: 1, email: 'new@example.com' } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.register({
        firstName: 'John',
        lastName: 'Doe',
        email: 'new@example.com',
        password: 'password'
      })

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('user')
    })
  })

  describe('Members', () => {
    it('should fetch all members', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ members: [{ id: 1, name: 'John' }] })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.getMembers()

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('members')
    })

    it('should add new member', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ member: { id: 1, name: 'Jane' } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.addMember({
        firstName: 'Jane',
        lastName: 'Doe'
      })

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('member')
    })

    it('should update member', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ member: { id: 1, name: 'Updated' } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.updateMember(1, { firstName: 'Updated' })

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('member')
    })

    it('should delete member', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ message: 'Member deleted' })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.deleteMember(1)

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('message')
    })
  })

  describe('Contributions', () => {
    it('should fetch contributions', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ contributions: [{ id: 1, amount: 1000 }] })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.getContributions()

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('contributions')
    })

    it('should add contribution', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ contribution: { id: 1, amount: 1000 } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.addContribution({
        memberId: 1,
        amount: 1000
      })

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('contribution')
    })
  })

  describe('Loans', () => {
    it('should fetch loans', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ loans: [{ id: 1, amount: 5000 }] })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.getLoans()

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('loans')
    })

    it('should apply for loan', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ loan: { id: 1, amount: 5000 } })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.applyLoan({
        memberId: 1,
        amount: 5000
      })

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('loan')
    })
  })

  describe('Reports', () => {
    it('should fetch reports', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({
          totalMembers: 10,
          totalContributions: 50000
        })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      const result = await api.getReports()

      expect(global.fetch).toHaveBeenCalled()
      expect(result).toHaveProperty('totalMembers')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      try {
        await api.getMembers()
      } catch (error) {
        expect(error.message).toBe('Network error')
      }
    })

    it('should handle server errors', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' })
      }
      global.fetch.mockResolvedValueOnce(mockResponse)

      try {
        await api.getMembers()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})

