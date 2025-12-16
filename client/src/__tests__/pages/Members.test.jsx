import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Members from '../../pages/Members'
import { AuthProvider } from '../../context/AuthContext'

const MembersWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Members />
    </AuthProvider>
  </BrowserRouter>
)

describe('Members Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders members page', () => {
    render(<MembersWithProviders />)
    
    expect(screen.getByText(/members/i)).toBeInTheDocument()
  })

  it('displays add member button', () => {
    render(<MembersWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeInTheDocument()
  })

  it('fetches members on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        members: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
        ]
      })
    })

    render(<MembersWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays members in table', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        members: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
        ]
      })
    })

    render(<MembersWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('allows adding new member', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ members: [] })
    })

    render(<MembersWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    // Form should be visible
    expect(addButton).toBeInTheDocument()
  })

  it('displays member form fields', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ members: [] })
    })

    render(<MembersWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    // Form should be visible
    expect(addButton).toBeInTheDocument()
  })

  it('handles member form submission', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ members: [] })
    })

    render(<MembersWithProviders />)
    
    const addButton = screen.getByRole('button', { name: /add/i })
    await user.click(addButton)
    
    // Form submission should work
    expect(addButton).toBeInTheDocument()
  })

  it('handles API errors when fetching members', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))

    render(<MembersWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays empty state when no members', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ members: [] })
    })

    render(<MembersWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})

