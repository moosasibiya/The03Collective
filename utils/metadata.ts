import type { Metadata } from 'next'

const BASE_URL = 'https://www.the03collective.co.za'

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'The 03 Collective — Premium Automotive',
      template: '%s — The 03 Collective',
    },
    description:
      'Premium vehicles. Curated selection. Personal service. Johannesburg, South Africa.',
    openGraph: {
      siteName: 'The 03 Collective',
      locale: 'en_ZA',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    ...overrides,
  }
}