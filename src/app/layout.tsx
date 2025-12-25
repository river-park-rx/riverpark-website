import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://riverparkpharmacy.com'),
  title: 'River Park Pharmacy | Trusted Local Pharmacy Care',
  description: 'River Park Pharmacy provides personalized prescription services, immunizations, and medication counseling to our local community. Your trusted neighborhood pharmacy.',
  keywords: 'pharmacy, prescription refill, transfer prescription, immunizations, medication counseling, community pharmacy, local pharmacy',
  icons: {
    icon: [
      { url: '/images/mainLogo/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/mainLogo/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'River Park Pharmacy | Trusted Local Pharmacy Care',
    description: 'Your trusted neighborhood pharmacy providing personalized care and prescription services.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/mainLogo/logo.png',
        width: 512,
        height: 512,
        alt: 'River Park Pharmacy Logo',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#E5392D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
