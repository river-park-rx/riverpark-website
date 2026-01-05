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
  ClipboardList,
  Bell,
  Package,
  ShoppingBag,
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
  const [itemsPerSlide, setItemsPerSlide] = useState(3)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1) // mobile: 1 testimonial
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2) // tablet: 2 testimonials
      } else {
        setItemsPerSlide(3) // desktop: 3 testimonials
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(homepage.testimonials.length / itemsPerSlide)

  // Reset to first slide when items per slide changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [itemsPerSlide])

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

  // Get current testimonials for the slide based on screen size
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * itemsPerSlide
    return homepage.testimonials.slice(startIndex, startIndex + itemsPerSlide)
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
      <section className="py-10 md:py-14 lg:py-16 bg-gray-100">
        <div className="container-custom">
          <SectionHeading
            title="Our Pharmacy Services"
            subtitle="We offer a comprehensive range of pharmacy services to meet all your healthcare needs."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
          <AnimatedSection delay={0.4} className="text-center mt-6 md:mt-10">
            <Button href="/services" variant="outline">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-medical-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-pharmacy-red/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 md:mb-12 text-center lg:text-left">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-gray-900 mb-2">
                How <span className="text-pharmacy-red">River Park Pharmacy</span> Works
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
                Getting your prescriptions has never been easier. We handle everything so you can focus on your health.
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button href="/prescriptions" variant="outline">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Step 1 */}
            <AnimatedSection delay={0} className="h-full">
              <div className="relative h-full">
                {/* Connector line - hidden on mobile */}
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-pharmacy-red/30 to-medical-blue/30"></div>

                <div className="relative bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {/* Step number */}
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 bg-pharmacy-red text-white rounded-full flex items-center justify-center font-montserrat font-bold text-xs md:text-sm">
                    1
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 relative flex-shrink-0">
                    <div className="w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center">
                      <ClipboardList className="w-8 h-8 md:w-10 md:h-10 text-pharmacy-red" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-pharmacy-red/20 rounded-2xl"></div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">
                    Submit Your Prescription
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow">
                    Transfer your prescription online, call us, or have your doctor send it directly. We make it simple.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Step 2 */}
            <AnimatedSection delay={0.15} className="h-full">
              <div className="relative h-full">
                {/* Connector line - hidden on mobile */}
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-medical-blue/30 to-pharmacy-red/30"></div>

                <div className="relative bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {/* Step number */}
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 bg-medical-blue text-white rounded-full flex items-center justify-center font-montserrat font-bold text-xs md:text-sm">
                    2
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 relative flex-shrink-0">
                    <div className="w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center">
                      <Bell className="w-8 h-8 md:w-10 md:h-10 text-medical-blue" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-medical-blue/20 rounded-2xl"></div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">
                    Get Notified When Ready
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow">
                    We'll prepare your medication and notify you when it's ready. No waiting, no hassle.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Step 3 */}
            <AnimatedSection delay={0.3} className="h-full">
              <div className="relative h-full">
                <div className="relative bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {/* Step number */}
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 bg-pharmacy-red text-white rounded-full flex items-center justify-center font-montserrat font-bold text-xs md:text-sm">
                    3
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 relative flex-shrink-0">
                    <div className="w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center">
                      <Package className="w-8 h-8 md:w-10 md:h-10 text-pharmacy-red" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-pharmacy-red/20 rounded-2xl"></div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">
                    Pick Up or Get Delivery
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow">
                    Visit us at your convenience or enjoy our free local delivery service right to your door.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* OTC Card Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-medical-blue/15 via-blue-50 to-medical-blue/10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 rounded-full bg-medical-blue/10 blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 rounded-full bg-pharmacy-red/5 blur-2xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              <div className="lg:max-w-2xl text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-medical-blue-dark mb-3 md:mb-4">
                  WE ACCEPT OTC CARD
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  We provide you with the support, products, pharmacy services and the wellness with plenty savings opportunity you need to keep your whole family healthy.
                </p>
              </div>
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full lg:w-auto">
                {/* OTC Medicare Card */}
                <div className="bg-white rounded-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 shadow-xl border border-medical-blue/20 flex-1 lg:flex-none max-w-[160px] sm:max-w-none">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-medical-blue">OTC</span>
                    <p className="text-medical-blue text-sm sm:text-base md:text-lg font-semibold italic mt-1">medicare</p>
                  </div>
                </div>
                {/* OTC Network Card */}
                <div className="bg-white rounded-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 shadow-xl border border-medical-blue/20 flex-1 lg:flex-none max-w-[160px] sm:max-w-none">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-medical-blue-dark">OTC</span>
                    <p className="text-medical-blue-dark text-sm sm:text-base md:text-lg font-semibold mt-1">network</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            title={`Why Choose ${company.name}`}
            subtitle="We're more than just a pharmacy — we're your trusted healthcare partner in the community."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {homepage.whyChooseUs.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 0.1}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pharmacy-red to-pharmacy-red-dark rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-3 md:mb-4">
                  {whyChooseUsIcons[item.title] || <Heart className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <h3 className="font-montserrat font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 md:-translate-x-6 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pharmacy-red hover:shadow-xl transition-all active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 md:translate-x-6 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-pharmacy-red hover:shadow-xl transition-all active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Testimonial Cards Slider */}
            <div className="overflow-hidden mx-10 sm:mx-12 md:mx-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
                >
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <div
                      key={`${currentSlide}-${testimonial.name}`}
                      className="w-full max-w-[300px] sm:max-w-none sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.5rem)]"
                    >
                      <TestimonialCard
                        name={testimonial.name}
                        rating={testimonial.rating}
                        text={testimonial.text}
                        image={testimonial.image}
                        index={currentSlide * itemsPerSlide + index}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar Indicator */}
            <div className="flex justify-center items-center mt-6 md:mt-8">
              <div className="w-24 sm:w-32 md:w-40 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pharmacy-red rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-r from-medical-blue to-medical-blue-dark">
        <div className="container-custom">
          <AnimatedSection direction="fade">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {homepage.trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-center"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="text-white font-montserrat font-medium text-xs sm:text-sm md:text-base">
                    {signal}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-5 sm:p-6 md:p-10 lg:p-12">
                <AnimatedSection>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-montserrat font-bold text-gray-900 mb-3 md:mb-4">
                    Visit Us Today
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-5 md:mb-8">
                    Stop by our pharmacy and experience the personalized care
                    that sets us apart. Our friendly team is ready to assist you
                    with all your healthcare needs.
                  </p>
                  <div className="space-y-3 sm:space-y-4 mb-5 md:mb-8">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pharmacy-red mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-sm sm:text-base text-gray-900">
                          Our Location
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {contactInfo.address.street}, {contactInfo.address.suite}
                          <br />
                          {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pharmacy-red mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-sm sm:text-base text-gray-900">
                          Phone Number
                        </p>
                        <a
                          href={contactInfo.phoneLink}
                          className="text-medical-blue hover:text-medical-blue-dark transition-colors text-xs sm:text-sm"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-pharmacy-red mr-3 sm:mr-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-montserrat font-semibold text-sm sm:text-base text-gray-900">
                          Business Hours
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
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
              <div className="min-h-[250px] sm:min-h-[300px] lg:min-h-0">
                <iframe
                  src={contactInfo.address.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
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
      <section className="py-10 md:py-14 lg:py-16 bg-pharmacy-red">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-3 md:mb-4">
              {homepage.ctaSection.title}
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-5 md:mb-8 max-w-2xl mx-auto">
              {homepage.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/prescriptions"
                className="inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-3 md:py-4 bg-white text-pharmacy-red font-montserrat font-semibold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-colors"
              >
                {homepage.ctaSection.primaryCta}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <a
                href={contactInfo.phoneLink}
                className="inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-3 md:py-4 bg-transparent text-white border-2 border-white font-montserrat font-semibold text-sm sm:text-base rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
