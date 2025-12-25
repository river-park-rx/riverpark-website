'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement

      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const targetElement = document.querySelector(href)
      if (!targetElement) return

      e.preventDefault()

      // Get header height for offset
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 80

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

      // Use smooth scroll with fallback for older browsers
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      } else {
        // Fallback for browsers that don't support smooth scroll
        smoothScrollTo(targetPosition, 500)
      }

      // Update URL without jumping
      history.pushState(null, '', href)
    }

    // Fallback smooth scroll animation
    const smoothScrollTo = (targetPosition: number, duration: number) => {
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function for smooth animation
        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash
      if (hash) {
        const targetElement = document.querySelector(hash)
        if (targetElement) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            const header = document.querySelector('header')
            const headerHeight = header ? header.offsetHeight : 80
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            })
          }, 100)
        }
      }
    }

    document.addEventListener('click', handleClick)
    handleInitialHash()

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}
