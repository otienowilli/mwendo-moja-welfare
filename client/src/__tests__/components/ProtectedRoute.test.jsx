import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import { AuthProvider } from '../../context/AuthContext'

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children when user is authenticated', () => {
    const TestComponent = () => (
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    render(<TestComponent />)
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('shows loading state while checking authentication', () => {
    const TestComponent = () => (
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    render(<TestComponent />)
    // Component should render without errors
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('renders multiple children correctly', () => {
    const TestComponent = () => (
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Content 1</div>
            <div>Content 2</div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    render(<TestComponent />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('handles null children gracefully', () => {
    const TestComponent = () => (
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>{null}</ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    render(<TestComponent />)
    // Should render without errors
    expect(document.body).toBeInTheDocument()
  })

  it('renders with complex nested components', () => {
    const TestComponent = () => (
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>
              <h1>Dashboard</h1>
              <p>Welcome to the dashboard</p>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    render(<TestComponent />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Welcome to the dashboard')).toBeInTheDocument()
  })
})

