import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const buildTime = process.env.BUILD_TIME || null
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || process.env.BUILD_ID || null
  const environment = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development'

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment,
    build: {
      time: buildTime,
      id: buildId,
      version: process.env.npm_package_version || '1.0.0',
    },
    uptime: process.uptime(),
    site: {
      name: 'River Park Pharmacy',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.riverparkrx.com',
    },
  }

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
