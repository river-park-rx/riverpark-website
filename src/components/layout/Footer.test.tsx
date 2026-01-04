import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { company, contactInfo } from '@/content'

describe('Footer', () => {
  it('renders company name and contact details', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', { name: /river park pharmacy/i })
    ).toBeInTheDocument()
    expect(screen.getByText(contactInfo.phone)).toBeInTheDocument()
    expect(screen.getByText(contactInfo.email)).toBeInTheDocument()
  })
})
