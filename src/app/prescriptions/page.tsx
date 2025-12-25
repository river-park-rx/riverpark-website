'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Pill,
  RefreshCw,
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  MessageCircle,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { prescriptions, contactInfo, hours } from '@/content'

export default function PrescriptionsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    rxNumber: '',
    medicationName: '',
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert(
      'Thank you! Your refill request has been submitted. We will contact you shortly.'
    )
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
              Prescription <span className="text-pharmacy-red">Refills</span> &{' '}
              <span className="text-medical-blue">Transfers</span>
            </h1>
            <p className="body-text mb-8">
              {prescriptions.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#refill-form" className="btn-primary">
                <Pill className="w-5 h-5 mr-2" />
                Refill Online
              </a>
              <a href="#transfer" className="btn-secondary">
                <RefreshCw className="w-5 h-5 mr-2" />
                Transfer Prescription
              </a>
              <a href={contactInfo.phoneLink} className="btn-outline">
                <Phone className="w-5 h-5 mr-2" />
                Call to Refill
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-2 text-gray-900 mb-4">How Refills Work</h2>
            <p className="body-text max-w-2xl mx-auto">
              Our simple four-step process makes refilling your prescriptions
              quick and convenient.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prescriptions.refillSteps.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-pharmacy-red rounded-full flex items-center justify-center text-white font-montserrat font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Refill Form Section */}
      <section id="refill-form" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pharmacy-red rounded-2xl mb-4">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <h2 className="heading-2 text-gray-900 mb-4">
                Online Refill Request
              </h2>
              <p className="body-text max-w-2xl mx-auto">
                Fill out the form below and we'll have your prescription ready
                for pickup. For faster service, please have your prescription
                number ready.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-2xl p-6 md:p-10"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                      placeholder={contactInfo.phone}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rxNumber"
                      className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                    >
                      Prescription Number
                    </label>
                    <input
                      type="text"
                      id="rxNumber"
                      name="rxNumber"
                      value={formData.rxNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                      placeholder="RX123456"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="medicationName"
                    className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                  >
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    id="medicationName"
                    name="medicationName"
                    value={formData.medicationName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors"
                    placeholder="Enter medication name"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-montserrat font-medium text-gray-700 mb-2"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pharmacy-red focus:border-pharmacy-red transition-colors resize-none"
                    placeholder="Any special instructions or requests..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-sm text-gray-500">
                    * Required fields
                  </p>
                  <Button type="submit" size="lg">
                    Submit Refill Request
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Transfer Section */}
      <section id="transfer" className="section-padding bg-gray-50 scroll-mt-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-blue rounded-2xl mb-6">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h2 className="heading-2 text-gray-900 mb-4">
                Transfer Your Prescriptions
              </h2>
              <p className="body-text mb-6">
                Switching to River Park Pharmacy is simple. We handle the entire
                transfer process for you, contacting your previous pharmacy and
                verifying your insurance. You just need to let us know where
                your prescriptions are coming from.
              </p>
              <ul className="space-y-3 mb-8">
                {prescriptions.transferBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">
                  Request Transfer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href={contactInfo.phoneLink} variant="secondary">
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Transfer
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-montserrat font-semibold text-xl text-gray-900 mb-6">
                  What You'll Need
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-pharmacy-red/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="w-5 h-5 text-pharmacy-red" />
                    </div>
                    <div>
                      <p className="font-montserrat font-medium text-gray-900">
                        Prescription Information
                      </p>
                      <p className="text-gray-600 text-sm">
                        Medication name, dosage, and quantity
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-pharmacy-red/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Pill className="w-5 h-5 text-pharmacy-red" />
                    </div>
                    <div>
                      <p className="font-montserrat font-medium text-gray-900">
                        Previous Pharmacy Details
                      </p>
                      <p className="text-gray-600 text-sm">
                        Name, address, and phone number
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-pharmacy-red/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-pharmacy-red" />
                    </div>
                    <div>
                      <p className="font-montserrat font-medium text-gray-900">
                        Your Contact Information
                      </p>
                      <p className="text-gray-600 text-sm">
                        So we can notify you when ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call-In Section */}
      <section className="py-16 md:py-20 bg-pharmacy-red">
        <div className="container-custom">
          <AnimatedSection className="text-center">
            <Phone className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="heading-2 text-white mb-4">Prefer to Call?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Our friendly pharmacists are always happy to help. Call us to
              refill your prescriptions, transfer medications, or ask any
              questions you may have.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href={contactInfo.phoneLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pharmacy-red font-montserrat font-semibold text-xl rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-6 h-6 mr-3" />
                {contactInfo.phone}
              </a>
              <div className="flex items-center text-white/80 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {hours.weekday.days} {hours.weekday.open}-{hours.weekday.close} | {hours.saturday.days} {hours.saturday.open}-{hours.saturday.close}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Support Message */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
              <MessageCircle className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h2 className="heading-3 text-gray-900 mb-4">
                Our Pharmacists Are Here to Help
              </h2>
              <p className="body-text mb-6">
                Whether you have questions about your medications, need help
                understanding your prescription, or want guidance on over-the-counter
                options, our knowledgeable pharmacists are always available to
                assist you. Your health and well-being are our top priorities.
              </p>
              <Button href="/contact" variant="secondary">
                Contact a Pharmacist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
