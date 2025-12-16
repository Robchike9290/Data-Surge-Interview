import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

// Mock fetch globally
global.fetch = jest.fn()

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading state
    )

    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders message from API successfully', async () => {
    const mockResponse = { message: 'Hello, world' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<App />)

    // Wait for loading to finish and message to appear
    await waitFor(() => {
      expect(screen.getByText('Hello, world')).toBeInTheDocument()
    })

    expect(screen.getByText(/Full-stack app with React\/TypeScript and Node\.js\/Express/)).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith('/api/hello')
  })

  it('renders error message when API call fails', async () => {
    const errorMessage = 'Network error'
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
    })
  })

  it('renders error message when API returns non-ok status', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Error: HTTP error! status: 500/)).toBeInTheDocument()
    })
  })

  it('calls the correct API endpoint', async () => {
    const mockResponse = { message: 'Hello, world' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<App />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/hello')
    })
  })
})

