import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { company, contactInfo, hours, navigation, social } from '@/content'

// Social media icons as SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
)

const XTwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
)

const IndeedIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11.5 1C8.5 1 6 3 5 6c3-2 7-2 9 1 0 0 1 1 1 3v1c0 0-1-1-3-1-1.5 0-3 1-3 3s1.5 3 3 3c2 0 3-1 3-1v1c0 2-1 3-1 3v4c0 1 .5 2 2 2s2-1 2-2v-9c0-4-2-7-4-9-1-1-2-2-3.5-4z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
)

const socialLinks = [
  { name: 'Facebook', href: social.facebook, icon: FacebookIcon },
  { name: 'Instagram', href: social.instagram, icon: InstagramIcon },
  { name: 'X (Twitter)', href: social.twitter, icon: XTwitterIcon },
  { name: 'LinkedIn', href: social.linkedin, icon: LinkedInIcon },
  { name: 'Indeed', href: social.indeed, icon: IndeedIcon },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {/* Brand & Description */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-2 sm:mb-3">
              <Image
                src="/images/mainLogo/logo.png"
                alt={company.name}
                width={56}
                height={56}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full p-0.5 sm:p-1"
              />
              <div className="ml-2 sm:ml-3">
                <span className="text-sm sm:text-base md:text-lg font-montserrat font-bold text-white">
                  River Park
                </span>
                <span className="text-sm sm:text-base md:text-lg font-montserrat font-bold text-medical-blue ml-1">
                  Pharmacy
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
              {company.description}
            </p>
            <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
              Licensed Pharmacy
            </div>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-pharmacy-red rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 md:mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
              {navigation.footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 md:mb-3">
              Our Services
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
              {navigation.footer.services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-montserrat font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 md:mb-3">
              Contact Us
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-pharmacy-red mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm leading-tight">
                  {contactInfo.address.street}
                  {contactInfo.address.suite && <><br />{contactInfo.address.suite}</>}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-pharmacy-red mr-2 sm:mr-3 flex-shrink-0" />
                <a
                  href={contactInfo.phoneLink}
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-pharmacy-red mr-2 sm:mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-pharmacy-red mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs sm:text-sm">
                  {hours.formatted.map((line, index) => (
                    <span key={index} className="whitespace-nowrap">
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
        <div className="border-t border-gray-800 mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {company.name}, LLC. All
              rights reserved.
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              {navigation.footer.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm"
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
