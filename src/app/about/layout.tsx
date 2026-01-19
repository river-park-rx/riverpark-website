import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | River Park Pharmacy',
  description: 'Learn about River Park Pharmacy - your trusted community pharmacy providing personalized care, expert medication counseling, and compassionate service.',
  openGraph: {
    title: 'About Us | River Park Pharmacy',
    description: 'Your trusted community pharmacy providing personalized care and expert medication counseling.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
