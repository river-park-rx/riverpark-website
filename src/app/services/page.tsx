'use client'

import { motion } from 'framer-motion'
import {
  Pill,
  RefreshCw,
  Syringe,
  Stethoscope,
  FlaskConical,
  HeartPulse,
  ClipboardList,
  Users,
  Truck,
  Package,
  PawPrint,
  ShoppingBag,
  ArrowRight,
  Phone,
  CheckCircle,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { services, contactInfo, hours } from '@/content'

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
  'prescription-refills': <Pill className="w-8 h-8" />,
  'transfer-prescriptions': <RefreshCw className="w-8 h-8" />,
  'immunizations': <Syringe className="w-8 h-8" />,
  'medication-counseling': <Stethoscope className="w-8 h-8" />,
  'mtm': <ClipboardList className="w-8 h-8" />,
  'health-consultations': <HeartPulse className="w-8 h-8" />,
  'senior-care': <Users className="w-8 h-8" />,
  'free-delivery': <Truck className="w-8 h-8" />,
  'pill-packaging': <Package className="w-8 h-8" />,
  'pet-medications': <PawPrint className="w-8 h-8" />,
  'otc-wellness': <ShoppingBag className="w-8 h-8" />,
}

export default function ServicesPage() {
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
              {services.hero.title.replace(services.hero.titleHighlight, '')}<span className="text-pharmacy-red">{services.hero.titleHighlight}</span>
            </h1>
            <p className="body-text mb-8">
              {services.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/prescriptions" size="lg">
                Refill Prescription
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href={contactInfo.phoneLink} variant="secondary" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                {contactInfo.phone}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-16 md:space-y-24">
            {services.list.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <AnimatedSection>
                  <div
                    className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                      }`}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 bg-pharmacy-red rounded-xl flex items-center justify-center text-white mr-4">
                          {serviceIcons[service.id] || <Pill className="w-8 h-8" />}
                        </div>
                        <h2 className="heading-3 text-gray-900">
                          {service.title}
                        </h2>
                      </div>
                      <p className="body-text mb-6">{service.description}</p>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button href="/contact" variant="outline" size="sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div
                      className={`${index % 2 === 1 ? 'lg:order-1' : ''
                        }`}
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 flex items-center justify-center min-h-[280px]">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4">
                            <div className="text-pharmacy-red">
                              {serviceIcons[service.id] || <Pill className="w-8 h-8" />}
                            </div>
                          </div>
                          <p className="text-gray-500 font-montserrat text-sm">
                            {service.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
                {index < services.list.length - 1 && (
                  <div className="border-b border-gray-100 mt-16 md:mt-24"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-2 text-gray-900 mb-4">
                  {services.ctaSection.title}
                </h2>
                <p className="body-text mb-6">
                  {services.ctaSection.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/contact">
                    {services.ctaSection.primaryCta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button href={contactInfo.phoneLink} variant="secondary">
                    <Phone className="w-4 h-4 mr-2" />
                    {services.ctaSection.secondaryCta}
                  </Button>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-block bg-pharmacy-red/5 rounded-2xl p-6">
                  <p className="text-gray-600 mb-2">Pharmacy Hours</p>
                  <p className="font-montserrat font-semibold text-gray-900">
                    {hours.weekday.days}: {hours.weekday.open} - {hours.weekday.close}
                  </p>
                  <p className="font-montserrat font-semibold text-gray-900">
                    {hours.saturday.days}: {hours.saturday.open} - {hours.saturday.close}
                  </p>
                  <p className="text-gray-500 mt-2">{hours.sunday.days}: {hours.sunday.status}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
