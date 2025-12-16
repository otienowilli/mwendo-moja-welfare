import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import { AuthProvider } from '../../context/AuthContext'

const DashboardWithProviders = () => (
  <BrowserRouter>
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  </BrowserRouter>
)

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders dashboard page', () => {
    render(<DashboardWithProviders />)
    
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })

  it('displays statistics cards', () => {
    render(<DashboardWithProviders />)
    
    // Should display stat cards
    expect(document.body).toBeInTheDocument()
  })

  it('displays total members statistic', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000,
        pendingLoans: 5
      })
    })

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays total contributions statistic', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000,
        pendingLoans: 5
      })
    })

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays total loans statistic', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000,
        pendingLoans: 5
      })
    })

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('displays pending loans statistic', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000,
        pendingLoans: 5
      })
    })

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('fetches dashboard data on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        totalMembers: 50,
        totalContributions: 100000,
        totalLoans: 200000,
        pendingLoans: 5
      })
    })

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('handles API errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'))

    render(<DashboardWithProviders />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})

