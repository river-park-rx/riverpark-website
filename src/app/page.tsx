'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pill,
  RefreshCw,
  Syringe,
  Truck,
  Heart,
  Clock,
  ShieldCheck,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import ServiceCard from '@/components/ui/ServiceCard'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import TestimonialCard from '@/components/ui/TestimonialCard'
import Button from '@/components/ui/Button'
import { company, contactInfo, hours, homepage } from '@/content'

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
  'Prescription Refills': <Pill className="w-7 h-7" />,
  'Transfer Prescriptions': <RefreshCw className="w-7 h-7" />,
  'Immunizations & Vaccines': <Syringe className="w-7 h-7" />,
  'Free Delivery': <Truck className="w-7 h-7" />,
}

// Icon mapping for why choose us
const whyChooseUsIcons: Record<string, React.ReactNode> = {
  'Personalized Care': <Heart className="w-6 h-6" />,
  'Medication Savings': <DollarSign className="w-6 h-6" />,
  'Fast & Convenient': <Clock className="w-6 h-6" />,
  'Expert Guidance': <ShieldCheck className="w-6 h-6" />,
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const totalSlides = Math.ceil(homepage.testimonials.length / 3)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Auto-play functionality
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (isAutoPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, totalSlides])

  // Get current 3 testimonials for the slide
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 3
    return homepage.testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-red-50/20 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="heading-1 text-gray-900 mb-6">
                Your Health, Our Priority:{' '}
                <span className="text-pharmacy-red">{company.tagline}</span>
              </h1>
              <p className="body-text mb-8 max-w-xl">
                At {company.name}, we deliver personalized care with a
                personal touch. From free delivery to medication savings
                programs, our dedicated pharmacists go the extra mile to support
                your health journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/prescriptions" size="lg">
                  {homepage.hero.primaryCta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button href={contactInfo.phoneLink} variant="secondary" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call the Pharmacy
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-pharmacy-red/10 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-medical-blue/10 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-pharmacy-red rounded-xl flex items-center justify-center">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-montserrat font-semibold text-gray-900">
                        Quick Refills
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ready in minutes
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      'Submit prescription online',
                      'Get notified when ready',
                      'Pick up at your convenience',
                    ].map((step, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-500 mb-2">
                      Need help? Call us:
                    </p>
                    <a
                      href={contactInfo.phoneLink}
                      className="text-lg font-montserrat font-semibold text-medical-blue hover:text-medical-blue-dark transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            title="Our Pharmacy Services"
            subtitle="We offer a comprehensive range of pharmacy services to meet all your healthcare needs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepage.services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={serviceIcons[service.title] || <Pill className="w-7 h-7" />}
                title={service.title}
                description={service.description}
                href={service.href}
                delay={index * 0.1}
              />
            ))}
          </div>
          <AnimatedSection delay={0.4} className="text-center mt-10">
            <Button href="/services" variant="outline">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title={`Why Choose ${company.name}`}
            subtitle="We're more than just a pharmacy — we're your trusted healthcare partner in the community."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {homepage.whyChooseUs.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 0.1}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pharmacy-red to-pharmacy-red-dark rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {whyChooseUsIcons[item.title] || <Heart className="w-6 h-6" />}
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Don't just take our word for it — hear from the families and individuals we serve every day."
          />

          {/* Slider Container */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pharmacy-red hover:shadow-xl transition-all active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pharmacy-red hover:shadow-xl transition-all active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Testimonial Cards Slider */}
            <div className="overflow-hidden mx-6 md:mx-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex flex-wrap justify-center gap-8"
                >
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <div
                      key={`${currentSlide}-${testimonial.name}`}
                      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                    >
                      <TestimonialCard
                        name={testimonial.name}
                        role={testimonial.role}
                        rating={testimonial.rating}
                        text={testimonial.text}
                        image={testimonial.image}
                        index={currentSlide * 3 + index}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center items-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-pharmacy-red w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                  aria-label={`Go to testimonials page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-12 bg-gradient-to-r from-medical-blue to-medical-blue-dark">
        <div className="container-custom">
          <AnimatedSection direction="fade">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {homepage.trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-center"
                >
                  <CheckCircle className="w-5 h-5 text-white/80 mr-2 flex-shrink-0" />
                  <span className="text-white font-montserrat font-medium text-sm md:text-base">
                    {signal}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <AnimatedSection>
                  <h2 className="heading-2 text-gray-900 mb-4">
                    Visit Us Today
                  </h2>
                  <p className="body-text mb-8">
                    Stop by our pharmacy and experience the personalized care
                    that sets us apart. Our friendly team is ready to assist you
                    with all your healthcare needs.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-pharmacy-red mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-gray-900">
                          Our Location
                        </p>
                        <p className="text-gray-600">
                          {contactInfo.address.street}, {contactInfo.address.suite}
                          <br />
                          {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-pharmacy-red mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-gray-900">
                          Phone Number
                        </p>
                        <a
                          href={contactInfo.phoneLink}
                          className="text-medical-blue hover:text-medical-blue-dark transition-colors"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-pharmacy-red mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-gray-900">
                          Business Hours
                        </p>
                        <p className="text-gray-600">
                          {hours.weekday.days}: {hours.weekday.open} - {hours.weekday.close}
                          <br />
                          {hours.saturday.days}: {hours.saturday.open} - {hours.saturday.close} | {hours.sunday.days}: {hours.sunday.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button href="/contact">
                    Get Directions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </AnimatedSection>
              </div>
              <div className="min-h-[300px] lg:min-h-0">
                <iframe
                  src={contactInfo.address.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="River Park Pharmacy Location"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-pharmacy-red">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="heading-2 text-white mb-4">
              {homepage.ctaSection.title}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {homepage.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/prescriptions"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pharmacy-red font-montserrat font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {homepage.ctaSection.primaryCta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href={contactInfo.phoneLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white font-montserrat font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
