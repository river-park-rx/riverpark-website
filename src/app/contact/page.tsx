'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { contactInfo, hours, contactPage, social } from '@/content'

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

// Build contact info cards from content
const contactInfoCards = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Visit Us',
    details: [contactInfo.address.street, contactInfo.address.suite, `${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.zip}`],
    action: {
      label: 'Get Directions',
      href: contactInfo.address.mapUrl,
    },
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Call Us',
    details: [contactInfo.phone, `Fax: ${contactInfo.fax}`],
    action: {
      label: 'Call Now',
      href: contactInfo.phoneLink,
    },
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email Us',
    details: [contactInfo.email, contactInfo.refillEmail],
    action: {
      label: 'Send Email',
      href: `mailto:${contactInfo.email}`,
    },
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Business Hours',
    details: hours.formatted,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    subject: '',
    message: '',
  })
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Auto-dismiss status message after 10 seconds
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus.type])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear email error when user types
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Your message has been submitted successfully! We will get back to you as soon as possible.',
      })
      setFormData({ name: '', email: '', phone: '', dateOfBirth: '', subject: '', message: '' })
      setEmailError('')
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-red-50/20 pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 text-gray-900 mb-6">
              {contactPage.hero.title.replace(contactPage.hero.titleHighlight, '')}<span className="text-pharmacy-red">{contactPage.hero.titleHighlight}</span>
            </h1>
            <p className="body-text mb-8">
              {contactPage.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={contactInfo.phoneLink} className="btn-primary">
                <Phone className="w-5 h-5 mr-2" />
                {contactInfo.phone}
              </a>
              <a href="#contact-form" className="btn-secondary">
                <MessageSquare className="w-5 h-5 mr-2" />
                Send a Message
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfoCards.map((info, index) => (
              <AnimatedSection key={info.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-pharmacy-red/10 rounded-xl flex items-center justify-center text-pharmacy-red mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action.href}
                      className="inline-flex items-center text-medical-blue hover:text-medical-blue-dark font-medium text-sm transition-colors"
                    >
                      {info.action.label}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Social Media Section */}
          <AnimatedSection delay={0.4} className="mt-10">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-4">
                Follow Us on Social Media
              </h3>
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-gray-100 hover:bg-pharmacy-red rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    <item.icon />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact-form" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="heading-3 text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 p-5 rounded-xl mb-6 ${submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border-2 border-green-300'
                        : 'bg-red-50 text-red-800 border-2 border-red-300'
                        }`}
                    >
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-lg">
                          {submitStatus.type === 'success' ? 'Success!' : 'Error'}
                        </p>
                        <p className="mt-1">{submitStatus.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${emailError ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="john@example.com"
                      />
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">{emailError}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder={contactInfo.phone}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a subject</option>
                      {contactPage.formSubjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                    <p className="text-sm text-gray-500">* Required fields</p>
                    <Button type="submit" size="lg" disabled={isSubmitting || !!emailError}>
                      {isSubmitting ? (
                        <>
                          Submitting...
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Embedded Map */}
            <AnimatedSection delay={0.2}>
              <div className="h-full min-h-[400px] lg:min-h-0 flex flex-col">
                <div className="bg-gray-100 rounded-2xl overflow-hidden flex-grow flex flex-col">
                  <iframe
                    src={contactInfo.address.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '350px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="River Park Pharmacy Location"
                    className="flex-grow"
                  />
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-3">
                      {contactInfo.address.street}, {contactInfo.address.suite}<br />
                      {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                    </p>
                    <a
                      href={contactInfo.address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-medical-blue hover:text-medical-blue-dark font-medium text-sm transition-colors"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-3 text-gray-900 mb-4">
                  Need Immediate Assistance?
                </h2>
                <p className="body-text">
                  For urgent prescription needs or time-sensitive questions,
                  please call us directly. Our pharmacists are ready to help
                  during business hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <a
                  href={contactInfo.phoneLink}
                  className="btn-primary flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding bg-pharmacy-red">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="heading-2 text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Looking for quick answers? Here are some common questions our
              patients ask.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
              {contactPage.faq.map((question, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-4 text-white text-sm"
                >
                  {question}
                </div>
              ))}
            </div>
            <p className="text-white/80 text-sm mt-8">
              Call us at{' '}
              <a href={contactInfo.phoneLink} className="underline hover:text-white">
                {contactInfo.phone}
              </a>{' '}
              for answers to these and any other questions.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
