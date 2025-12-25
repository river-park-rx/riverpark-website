'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Phone, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-red-50/20 flex items-center justify-center px-4 py-20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/images/mainLogo/logo.png"
                alt="River Park Pharmacy"
                width={100}
                height={100}
                className="w-24 h-24 mx-auto"
              />
            </Link>

            {/* 404 Text */}
            <h1 className="text-8xl md:text-9xl font-montserrat font-bold text-pharmacy-red mb-4">
              404
            </h1>
            <h2 className="heading-2 text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="body-text mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or may have been moved.
              Let's get you back on track to better health.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="/" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Browse Services
              </Button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-4">
                Looking for something specific?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/prescriptions"
                  className="p-4 rounded-xl bg-gray-50 hover:bg-pharmacy-red/10 transition-colors group"
                >
                  <p className="font-montserrat font-medium text-gray-900 group-hover:text-pharmacy-red transition-colors">
                    Refill Rx
                  </p>
                </Link>
                <Link
                  href="/services"
                  className="p-4 rounded-xl bg-gray-50 hover:bg-pharmacy-red/10 transition-colors group"
                >
                  <p className="font-montserrat font-medium text-gray-900 group-hover:text-pharmacy-red transition-colors">
                    Services
                  </p>
                </Link>
                <Link
                  href="/about"
                  className="p-4 rounded-xl bg-gray-50 hover:bg-pharmacy-red/10 transition-colors group"
                >
                  <p className="font-montserrat font-medium text-gray-900 group-hover:text-pharmacy-red transition-colors">
                    About Us
                  </p>
                </Link>
                <Link
                  href="/contact"
                  className="p-4 rounded-xl bg-gray-50 hover:bg-pharmacy-red/10 transition-colors group"
                >
                  <p className="font-montserrat font-medium text-gray-900 group-hover:text-pharmacy-red transition-colors">
                    Contact
                  </p>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm mb-3">
                  Need immediate assistance?
                </p>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center text-medical-blue hover:text-medical-blue-dark font-montserrat font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (555) 123-4567
                </a>
              </div>
            </div>

            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-gray-500 hover:text-pharmacy-red transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go back to previous page
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
