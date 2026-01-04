import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('toggles the mobile menu and locks body scroll', () => {
    render(<Header />)

    const openButton = screen.getByRole('button', { name: /open menu/i })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(openButton)

    const closeButton = screen.getByRole('button', { name: /close menu/i })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    expect(
      screen.getAllByText(/refill prescription/i)[0]
    ).toBeInTheDocument()
  })
})
