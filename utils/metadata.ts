import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.the03collective.co.za'

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'The 03 Collective - Premium Automotive',
      template: '%s - The 03 Collective',
    },
    description:
      'Premium vehicles. Curated selection. Personal service. ' +
      'Based in Johannesburg, South Africa.',
    keywords: [
      'premium cars for sale South Africa',
      'luxury cars Johannesburg',
      'performance vehicles South Africa',
      'car consignment Johannesburg',
      'used premium cars SA',
    ],
    openGraph: {
      siteName: 'The 03 Collective',
      locale: 'en_ZA',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'The 03 Collective - Premium Automotive',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...overrides,
  }
}

export function buildVehicleMetadata(vehicle: {
  make: string
  model: string
  year: number
  colour?: string
  trim?: string
  mileage: number
  price: number
  mainImage?: { asset: { url: string } }
}): Metadata {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const description = [
    vehicle.colour,
    vehicle.trim,
    `${vehicle.mileage.toLocaleString('en-ZA')} km`,
    `R ${vehicle.price.toLocaleString('en-ZA')}`,
  ]
    .filter(Boolean)
    .join(' · ')

  return buildMetadata({
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: vehicle.mainImage
        ? [{ url: vehicle.mainImage.asset.url, width: 1200, height: 630, alt: title }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  })
}
