import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
}

export default nextConfig
