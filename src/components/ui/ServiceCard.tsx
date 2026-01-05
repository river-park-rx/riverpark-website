'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  href?: string
  delay?: number
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
  delay = 0,
}: ServiceCardProps) {
  const CardContent = () => (
    <>
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center text-pharmacy-red mb-3 md:mb-4 group-hover:bg-pharmacy-red group-hover:text-white transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7">
        {icon}
      </div>
      <h3 className="font-montserrat font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
    </>
  )

  const cardClasses =
    'group card bg-white p-4 sm:p-5 md:p-6 h-full flex flex-col items-start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {href ? (
        <Link href={href} className={cardClasses}>
          <CardContent />
        </Link>
      ) : (
        <div className={cardClasses}>
          <CardContent />
        </div>
      )}
    </motion.div>
  )
}
