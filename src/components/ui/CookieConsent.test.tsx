import { act, fireEvent, render, screen } from '@testing-library/react'
import CookieConsent from './CookieConsent'

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows after a delay and stores acceptance', () => {
    render(<CookieConsent />)

    expect(
      screen.queryByText(/we value your privacy/i)
    ).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText(/we value your privacy/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /accept all/i }))

    expect(localStorage.getItem('cookieConsent')).toBe('accepted')
    expect(
      screen.queryByText(/we value your privacy/i)
    ).not.toBeInTheDocument()
  })
})
