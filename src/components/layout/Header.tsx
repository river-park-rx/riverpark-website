'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { company, contactInfo, navigation as navContent } from '@/content'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/mainLogo/logo.png"
              alt={company.name}
              width={60}
              height={60}
              className="w-12 h-12 md:w-14 md:h-14"
              priority
            />
            <div className="ml-2 hidden sm:block">
              <span className="text-lg md:text-xl font-montserrat font-bold text-pharmacy-red">
                River Park
              </span>
              <span className="text-lg md:text-xl font-montserrat font-bold text-medical-blue ml-1">
                Pharmacy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navContent.main.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-montserrat font-medium text-sm transition-colors duration-200 ${pathname === item.href
                  ? 'text-pharmacy-red'
                  : 'text-gray-700 hover:text-pharmacy-red'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={contactInfo.phoneLink}
              className="flex items-center text-medical-blue font-montserrat font-medium text-sm hover:text-medical-blue-dark transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              {contactInfo.phone}
            </a>
            <Link href="/prescriptions" className="btn-primary text-sm">
              Refill Prescription
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 hover:text-pharmacy-red active:scale-95 transition-all"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <nav className="container-custom py-4 space-y-2">
              {navContent.main.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg font-montserrat font-medium transition-colors ${pathname === item.href
                    ? 'text-pharmacy-red bg-red-50'
                    : 'text-gray-700 hover:text-pharmacy-red hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t space-y-3">
                <a
                  href={contactInfo.phoneLink}
                  className="flex items-center py-3 px-4 text-medical-blue font-montserrat font-medium"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  {contactInfo.phone}
                </a>
                <Link
                  href="/prescriptions"
                  className="btn-primary w-full text-center"
                >
                  Refill Prescription
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
