import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | River Park Pharmacy',
  description: 'Explore River Park Pharmacy services including prescription refills, immunizations, medication counseling, free delivery, pill packaging, and more.',
  openGraph: {
    title: 'Our Services | River Park Pharmacy',
    description: 'Comprehensive pharmacy services including prescription refills, immunizations, medication counseling, and free local delivery.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
