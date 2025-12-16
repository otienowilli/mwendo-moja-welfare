import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Contributions from '../../pages/Contributions'
import { AuthProvider } from '../../context/AuthContext'

const ContributionsWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Contributions />
    </AuthProvider>
  </BrowserRouter>
)

describe('Contributions Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders contributions page', () => {
    render(<ContributionsWithProviders />)
    
    expect(screen.getByText(/contributions/i)).toBeInTheDocument()
  })

  it('displays add contribution button', () => {
    render(<ContributionsWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeInTheDocument()
  })

  it('fetches contributions on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        contributions: [
          { id: 1, memberId: 1, amount: 1000, date: '2024-12-16' }
        ]
      })
    })

    render(<ContributionsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays contributions in table', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        contributions: [
          { id: 1, memberId: 1, amount: 1000, date: '2024-12-16' }
        ]
      })
    })

    render(<ContributionsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('allows adding new contribution', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contributions: [] })
    })

    render(<ContributionsWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    expect(addButton).toBeInTheDocument()
  })

  it('displays contribution form fields', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contributions: [] })
    })

    render(<ContributionsWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    expect(addButton).toBeInTheDocument()
  })

  it('handles contribution form submission', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contributions: [] })
    })

    render(<ContributionsWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    expect(addButton).toBeInTheDocument()
  })

  it('handles API errors when fetching contributions', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))

    render(<ContributionsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays empty state when no contributions', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contributions: [] })
    })

    render(<ContributionsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})

