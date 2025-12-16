import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import { AuthProvider, AuthContext } from '../../context/AuthContext'

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('returns auth context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toBeDefined()
  })

  it('provides user object', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('user')
  })

  it('provides isAuthenticated boolean', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('isAuthenticated')
    expect(typeof result.current.isAuthenticated).toBe('boolean')
  })

  it('provides login function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('login')
    expect(typeof result.current.login).toBe('function')
  })

  it('provides logout function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('logout')
    expect(typeof result.current.logout).toBe('function')
  })

  it('provides register function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('register')
    expect(typeof result.current.register).toBe('function')
  })

  it('provides token property', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('token')
  })

  it('provides loading state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('loading')
    expect(typeof result.current.loading).toBe('boolean')
  })

  it('provides error property', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toHaveProperty('error')
  })

  it('throws error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow()
  })

  it('returns all required properties', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    const requiredProperties = [
      'user',
      'token',
      'isAuthenticated',
      'loading',
      'error',
      'login',
      'logout',
      'register'
    ]
    
    requiredProperties.forEach(prop => {
      expect(result.current).toHaveProperty(prop)
    })
  })
})

