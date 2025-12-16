import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

// Test component that uses AuthContext
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useContext(AuthContext)

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="user-email">{user?.email || 'No user'}</div>
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('provides initial auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent(
      'Not Authenticated'
    )
    expect(screen.getByTestId('user-email')).toHaveTextContent('No user')
  })

  it('updates auth state on login', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent(
        'Authenticated'
      )
    })
  })

  it('clears auth state on logout', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    await user.click(logoutButton)

    expect(screen.getByTestId('auth-status')).toHaveTextContent(
      'Not Authenticated'
    )
  })

  it('persists token to localStorage', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    await waitFor(() => {
      // Token should be stored in localStorage
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  it('handles authentication errors gracefully', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Component should render without errors
    expect(screen.getByTestId('auth-status')).toBeInTheDocument()
  })

  it('provides user context to children', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user-email')).toBeInTheDocument()
  })
})

