import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { company, contactInfo, hours, navigation } from '@/content'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/mainLogo/logo.png"
                alt={company.name}
                width={56}
                height={56}
                className="w-14 h-14 bg-white rounded-full p-1"
              />
              <div className="ml-3">
                <span className="text-lg font-montserrat font-bold text-white">
                  River Park
                </span>
                <span className="text-lg font-montserrat font-bold text-medical-blue ml-1">
                  Pharmacy
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {company.description}
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Licensed Pharmacy
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {navigation.footer.services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-pharmacy-red mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.suite}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-pharmacy-red mr-3 flex-shrink-0" />
                <a
                  href={contactInfo.phoneLink}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-pharmacy-red mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-pharmacy-red mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {hours.formatted.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < hours.formatted.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {company.name}, LLC. All
              rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {navigation.footer.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
