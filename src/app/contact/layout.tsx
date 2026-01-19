import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | River Park Pharmacy',
  description: 'Contact River Park Pharmacy for prescription refills, transfers, and medication questions. Visit us, call, or send a message. We are here to help.',
  openGraph: {
    title: 'Contact Us | River Park Pharmacy',
    description: 'Get in touch with River Park Pharmacy. Call, visit, or send us a message for all your pharmacy needs.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
