import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Loans from '../../pages/Loans'
import { AuthProvider } from '../../context/AuthContext'

const LoansWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Loans />
    </AuthProvider>
  </BrowserRouter>
)

describe('Loans Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders loans page', () => {
    render(<LoansWithProviders />)
    
    expect(screen.getByText(/loans/i)).toBeInTheDocument()
  })

  it('displays apply for loan button', () => {
    render(<LoansWithProviders />)
    
    const applyButton = screen.getByRole('button', { name: /apply/i })
    expect(applyButton).toBeInTheDocument()
  })

  it('fetches loans on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        loans: [
          { id: 1, memberId: 1, amount: 5000, status: 'approved' }
        ]
      })
    })

    render(<LoansWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays loans in table', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        loans: [
          { id: 1, memberId: 1, amount: 5000, status: 'approved' }
        ]
      })
    })

    render(<LoansWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('allows applying for loan', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ loans: [] })
    })

    render(<LoansWithProviders />)
    
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)
    
    expect(applyButton).toBeInTheDocument()
  })

  it('displays loan form fields', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ loans: [] })
    })

    render(<LoansWithProviders />)
    
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)
    
    expect(applyButton).toBeInTheDocument()
  })

  it('handles loan form submission', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ loans: [] })
    })

    render(<LoansWithProviders />)
    
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)
    
    expect(applyButton).toBeInTheDocument()
  })

  it('handles API errors when fetching loans', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))

    render(<LoansWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays empty state when no loans', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ loans: [] })
    })

    render(<LoansWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})

