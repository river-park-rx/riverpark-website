import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders as a button by default', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="/services">View Services</Button>)

    const link = screen.getByRole('link', { name: 'View Services' })
    expect(link).toHaveAttribute('href', '/services')
  })

  it('applies disabled styling and attribute', () => {
    render(<Button disabled>Submit</Button>)

    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })
})
