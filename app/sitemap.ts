import type { MetadataRoute } from 'next'
import { sanityClient } from '@/sanity/lib/client'
import { ALL_VEHICLE_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE = 'https://www.the03collective.co.za'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let vehicleSlugs: { slug: string }[] = []

  try {
    if (sanityClient) {
      vehicleSlugs = await sanityClient.fetch<{ slug: string }[]>(ALL_VEHICLE_SLUGS_QUERY)
    }
  } catch {
    vehicleSlugs = []
  }

  const vehicleUrls: MetadataRoute.Sitemap = vehicleSlugs
    .filter(({ slug }) => Boolean(slug))
    .map(({ slug }) => ({
      url: `${BASE}/inventory/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  return [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' },
    { url: `${BASE}/inventory`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/sell`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: 'monthly' },
    ...vehicleUrls,
  ]
}
