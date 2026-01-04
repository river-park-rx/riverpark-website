import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { priority, ...rest } = props
    return React.createElement('img', rest)
  },
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children: React.ReactNode
  }) => React.createElement('a', { href, ...rest }, children),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('framer-motion', () => {
  const MotionDiv = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...rest }, ref) =>
      React.createElement('div', { ref, ...rest }, children)
  )
  MotionDiv.displayName = 'MotionDiv'

  return {
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  }
})
