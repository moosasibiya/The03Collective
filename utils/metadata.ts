import type { Metadata } from 'next'
import type { Vehicle } from '@/types'
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site-config'

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    manifest: '/manifest.webmanifest',
    title: {
      default: `${SITE_NAME} - Premium Automotive`,
      template: `%s - ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'premium cars for sale South Africa',
      'luxury cars Johannesburg',
      'performance vehicles South Africa',
      'car consignment Johannesburg',
      'used premium cars SA',
    ],
    openGraph: {
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: 'website',
      url: SITE_URL,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Premium Automotive`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} - Premium Automotive`,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...overrides,
  }
}

export function buildVehicleMetadata(
  vehicle: Pick<
    Vehicle,
    'make' | 'model' | 'year' | 'colour' | 'trim' | 'mileage' | 'price' | 'mainImage' | 'slug'
  >
): Metadata {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const description = [
    vehicle.colour,
    vehicle.trim,
    `${vehicle.mileage.toLocaleString('en-ZA')} km`,
    `R ${vehicle.price.toLocaleString('en-ZA')}`,
  ]
    .filter(Boolean)
    .join(' | ')

  return buildMetadata({
    title,
    description,
    alternates: {
      canonical: `/inventory/${vehicle.slug.current}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/inventory/${vehicle.slug.current}`,
      images: vehicle.mainImage
        ? [{ url: vehicle.mainImage.asset.url, width: 1200, height: 630, alt: title }]
        : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: vehicle.mainImage ? [vehicle.mainImage.asset.url] : [DEFAULT_OG_IMAGE],
    },
  })
}
