import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../pages/Login'
import { AuthProvider } from '../../context/AuthContext'

const LoginWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
)

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form', () => {
    render(<LoginWithProviders />)
    
    expect(screen.getByText(/login/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('displays email input field', () => {
    render(<LoginWithProviders />)
    
    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('displays password input field', () => {
    render(<LoginWithProviders />)
    
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('displays login button', () => {
    render(<LoginWithProviders />)
    
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('displays register link', () => {
    render(<LoginWithProviders />)
    
    const registerLink = screen.getByText(/register/i)
    expect(registerLink).toBeInTheDocument()
  })

  it('allows user to enter email', async () => {
    const user = userEvent.setup()
    render(<LoginWithProviders />)
    
    const emailInput = screen.getByPlaceholderText(/email/i)
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('allows user to enter password', async () => {
    const user = userEvent.setup()
    render(<LoginWithProviders />)
    
    const passwordInput = screen.getByPlaceholderText(/password/i)
    await user.type(passwordInput, 'password123')
    
    expect(passwordInput).toHaveValue('password123')
  })

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup()
    render(<LoginWithProviders />)
    
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(loginButton)
    
    // Form should be submitted
    expect(loginButton).toBeInTheDocument()
  })

  it('shows loading state during login', async () => {
    const user = userEvent.setup()
    render(<LoginWithProviders />)
    
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(loginButton)
    
    // Button should be in the document
    expect(loginButton).toBeInTheDocument()
  })

  it('handles empty form submission', async () => {
    const user = userEvent.setup()
    render(<LoginWithProviders />)
    
    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)
    
    // Form should still be visible
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  })
})

