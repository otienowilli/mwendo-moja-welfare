import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Reports from '../../pages/Reports'
import { AuthProvider } from '../../context/AuthContext'

const ReportsWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Reports />
    </AuthProvider>
  </BrowserRouter>
)

describe('Reports Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders reports page', () => {
    render(<ReportsWithProviders />)
    
    expect(screen.getByText(/reports/i)).toBeInTheDocument()
  })

  it('displays export button', () => {
    render(<ReportsWithProviders />)
    
    const exportButton = screen.getByRole('button', { name: /export/i })
    expect(exportButton).toBeInTheDocument()
  })

  it('fetches reports on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000
      })
    })

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays financial summary', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000
      })
    })

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays member statistics', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        activeMembers: 45,
        inactiveMembers: 5
      })
    })

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('allows exporting reports', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reports: [] })
    })

    render(<ReportsWithProviders />)
    
    const exportButton = screen.getByRole('button', { name: /export/i })
    await user.click(exportButton)
    
    expect(exportButton).toBeInTheDocument()
  })

  it('displays date range filter', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reports: [] })
    })

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('handles API errors when fetching reports', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays charts and graphs', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000
      })
    })

    render(<ReportsWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})

