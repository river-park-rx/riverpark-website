import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prescription Refills & Transfers | River Park Pharmacy',
  description: 'Easily refill or transfer your prescriptions to River Park Pharmacy. Online refill requests, free transfers, and quick pickup available.',
  openGraph: {
    title: 'Prescription Refills & Transfers | River Park Pharmacy',
    description: 'Refill or transfer your prescriptions online. Quick, easy, and convenient pharmacy services.',
  },
}

export default function PrescriptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
