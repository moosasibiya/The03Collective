import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'

for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue

  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!match || process.env[match[1]]) continue

    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-18',
  useCdn: false,
  token,
})

const countsBefore = await client.fetch(`{
  "vehicles": count(*[_type == "vehicle"]),
  "testimonials": count(*[_type == "testimonial"])
}`)

console.log(`Dataset: ${dataset}`)
console.log(`Before: ${countsBefore.vehicles} vehicles, ${countsBefore.testimonials} testimonials`)

try {
  await client.delete({ query: '*[_type in ["vehicle", "testimonial"]]' })
} catch (error) {
  if (error.statusCode === 403) {
    console.error(
      'Sanity rejected the delete. Add a write-capable token as SANITY_API_WRITE_TOKEN and run this script again.'
    )
    process.exit(1)
  }

  throw error
}

const countsAfter = await client.fetch(`{
  "vehicles": count(*[_type == "vehicle"]),
  "testimonials": count(*[_type == "testimonial"])
}`)

console.log(`After: ${countsAfter.vehicles} vehicles, ${countsAfter.testimonials} testimonials`)
