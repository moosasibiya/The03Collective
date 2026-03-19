import { createClient } from 'next-sanity'

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  if (!projectId) {
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-03-18',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_READ_TOKEN,
    stega: false,
  })
}