import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-03-18',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_READ_TOKEN,
      stega: false,
    })
  : null

export function getSanityClient() {
  return client
}

export const sanityClient = client
export { client }
