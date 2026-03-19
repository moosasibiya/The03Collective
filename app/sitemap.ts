import type { MetadataRoute } from 'next'
import { getSanityClient } from '@/sanity/lib/client'
import { ALL_VEHICLE_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE_URL = 'https://www.the03collective.co.za'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sell`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const sanityClient = getSanityClient()

  if (!sanityClient) {
    return baseRoutes
  }

  const slugs = await sanityClient.fetch<{ slug: string }[]>(ALL_VEHICLE_SLUGS_QUERY)

  const vehicleUrls: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/inventory/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...baseRoutes, ...vehicleUrls]
}