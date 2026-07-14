import type { NextConfig } from 'next'
import path from 'node:path'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    const sharedSecurityHeaders = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
    ]
    const publicContentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.sentry.io va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: blob: cdn.sanity.io",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' *.sanity.io *.sentry.io vitals.vercel-insights.com va.vercel-scripts.com",
      "media-src 'self'",
      "frame-src 'self' *.sanity.io",
      "frame-ancestors 'none'",
    ].join('; ')
    const studioContentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://core.sanity-cdn.com *.sanity.io *.sanity-cdn.com *.vercel-insights.com *.sentry.io va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: blob: cdn.sanity.io *.sanity.io *.sanity-cdn.com",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' *.sanity.io *.sanity-cdn.com *.sentry.io vitals.vercel-insights.com va.vercel-scripts.com",
      "media-src 'self' blob: cdn.sanity.io *.sanity.io *.sanity-cdn.com",
      "frame-src 'self' *.sanity.io",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
    ].join('; ')

    return [
      {
        source: '/',
        headers: [
          ...sharedSecurityHeaders,
          { key: 'Content-Security-Policy', value: publicContentSecurityPolicy },
        ],
      },
      {
        source: '/studio/:path*',
        headers: [
          ...sharedSecurityHeaders,
          { key: 'Content-Security-Policy', value: studioContentSecurityPolicy },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/:path((?!studio(?:/.*)?$).*)',
        headers: [
          ...sharedSecurityHeaders,
          { key: 'Content-Security-Policy', value: publicContentSecurityPolicy },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'the03collective.co.za' }],
        destination: 'https://www.the03collective.co.za/:path*',
        permanent: true,
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: true,
  },
})
