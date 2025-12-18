import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

global.fetch = jest.fn()

describe('App Component - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles correct API response structure', async () => {
    const mockResponse = { message: 'Hello, world' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<App />)

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Hello, world')
    })

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-5xl', 'font-bold')
  })

  it('displays loading state and then message', async () => {
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    ;(global.fetch as jest.Mock).mockReturnValueOnce(promise)

    render(<App />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    resolvePromise!({
      ok: true,
      json: async () => ({ message: 'Hello, world' }),
    })

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      expect(screen.getByText('Hello, world')).toBeInTheDocument()
    })
  })

  it('renders with proper Tailwind classes', async () => {
    const mockResponse = { message: 'Hello, world' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Hello, world')).toBeInTheDocument()
    })

    const container = screen.getByText('Hello, world').closest('div')
    expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-8', 'py-16', 'text-center')
  })
})

