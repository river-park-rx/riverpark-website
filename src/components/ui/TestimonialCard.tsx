'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

// Pastel accent colors for the bottom bar (using hex values for inline styles)
const accentColors = [
  '#fecdd3', // rose-200
  '#bae6fd', // sky-200
  '#fde68a', // amber-200
  '#a7f3d0', // emerald-200
  '#ddd6fe', // violet-200
  '#99f6e4', // teal-200
  '#fbcfe8', // pink-200
  '#c7d2fe', // indigo-200
]

interface TestimonialCardProps {
  name: string
  role: string
  rating: number
  text: string
  image: string
  index?: number
}

export default function TestimonialCard({
  name,
  role,
  rating,
  text,
  image,
  index = 0,
}: TestimonialCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('')
  const accentColor = accentColors[index % accentColors.length]

  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Card Content */}
      <div className="pt-16 pb-8 px-6 text-center flex flex-col flex-grow">
        {/* Profile Image - Centered at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-initials')
                if (fallback) fallback.classList.remove('hidden')
              }}
            />
            <div className="fallback-initials hidden absolute inset-0 bg-gradient-to-br from-medical-blue to-medical-blue-dark flex items-center justify-center">
              <span className="text-white font-montserrat font-bold text-xl">
                {initials}
              </span>
            </div>
          </div>
        </div>

        {/* Spacer for image */}
        <div className="h-12" />

        {/* Name */}
        <h3 className="font-montserrat font-semibold text-lg text-gray-900 mb-1">
          {name}
        </h3>

        {/* Role/Position */}
        <p className="text-sm text-gray-500 font-medium mb-3">
          {role}
        </p>

        {/* Star Rating */}
        <div className="flex justify-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-600 text-sm leading-relaxed flex-grow font-open-sans">
          "{text}"
        </p>
      </div>

      {/* Accent Bar at Bottom */}
      <div
        className="h-3 flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  )
}
