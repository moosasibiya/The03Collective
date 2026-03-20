import { cache } from 'react'
import {
  ALL_VEHICLE_SLUGS_QUERY,
  ALL_VEHICLES_QUERY,
  FEATURED_VEHICLES_QUERY,
  RELATED_VEHICLES_QUERY,
  TESTIMONIALS_QUERY,
  VEHICLE_BY_SLUG_QUERY,
} from '@/lib/sanity.queries'
import { getSanityClient } from '@/lib/sanity'
import { FALLBACK_TESTIMONIALS, FALLBACK_VEHICLES } from '@/lib/site-content'
import type { Testimonial, Vehicle } from '@/types'

const VISUAL_THEMES = [
  'radial-gradient(ellipse 70% 50% at 55% 65%, rgba(80, 60, 30, 0.5) 0%, transparent 60%), linear-gradient(160deg, #1a1510 0%, #0f0c08 40%, #1c170e 100%)',
  'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(30, 35, 50, 0.6) 0%, transparent 60%), linear-gradient(150deg, #0d1017 0%, #080a0f 50%, #111520 100%)',
  'radial-gradient(ellipse 70% 50% at 45% 55%, rgba(35, 20, 15, 0.5) 0%, transparent 65%), linear-gradient(140deg, #14100c 0%, #0a0806 50%, #1a140f 100%)',
  'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(40, 40, 45, 0.5) 0%, transparent 60%), linear-gradient(155deg, #111215 0%, #0c0c0f 50%, #171719 100%)',
  'radial-gradient(ellipse 70% 55% at 55% 60%, rgba(60, 50, 10, 0.4) 0%, transparent 55%), linear-gradient(145deg, #1a180a 0%, #0f0e07 50%, #1c1a08 100%)',
  'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(70, 35, 10, 0.5) 0%, transparent 55%), linear-gradient(150deg, #1c1006 0%, #0f0a04 50%, #201408 100%)',
  'radial-gradient(ellipse 75% 55% at 48% 60%, rgba(50, 10, 10, 0.6) 0%, transparent 58%), linear-gradient(145deg, #170808 0%, #0c0505 50%, #1a0a0a 100%)',
  'radial-gradient(ellipse 65% 50% at 52% 58%, rgba(20, 20, 25, 0.5) 0%, transparent 60%), linear-gradient(148deg, #0e0e12 0%, #090910 50%, #131318 100%)',
  'radial-gradient(ellipse 70% 50% at 50% 62%, rgba(15, 25, 45, 0.6) 0%, transparent 58%), linear-gradient(152deg, #090f1a 0%, #060810 50%, #0d1420 100%)',
]

type QueryParams = Record<string, string | number | boolean | undefined>

async function fetchSanity<T>(query: string, params?: QueryParams): Promise<T | null> {
  const client = getSanityClient()

  if (!client) {
    return null
  }

  try {
    return await client.fetch<T>(query, params ?? {})
  } catch (error) {
    console.error('[site-data]', error)
    return null
  }
}

function matchesFallback(target: Vehicle, fallback: Vehicle) {
  return (
    target.slug.current === fallback.slug.current ||
    `${target.year}-${target.make}-${target.model}` === `${fallback.year}-${fallback.make}-${fallback.model}`
  )
}

function buildTags(vehicle: Vehicle) {
  return [
    vehicle.specs?.power,
    vehicle.specs?.drive,
    vehicle.trim,
    vehicle.status === 'sold' ? 'Sold' : null,
  ].filter(Boolean) as string[]
}

function normalizeVehicle(vehicle: Vehicle): Vehicle {
  const fallback = FALLBACK_VEHICLES.find((candidate) => matchesFallback(vehicle, candidate))
  const images = vehicle.images?.length ? vehicle.images : fallback?.images
  const mainImage = vehicle.mainImage ?? images?.[0] ?? fallback?.mainImage

  return {
    ...fallback,
    ...vehicle,
    images,
    mainImage,
    descriptionHtml: vehicle.descriptionHtml ?? fallback?.descriptionHtml,
    features: vehicle.features?.length ? vehicle.features : fallback?.features,
    specs: { ...fallback?.specs, ...vehicle.specs },
    conditionNotes: vehicle.conditionNotes ?? fallback?.conditionNotes,
    whatsappMessage:
      vehicle.whatsappMessage ??
      fallback?.whatsappMessage ??
      `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`,
    tags: vehicle.tags?.length ? vehicle.tags : fallback?.tags ?? buildTags(vehicle),
  }
}

export function getVehicleThemeStyle(seed: string | number) {
  const source = String(seed)
  const score = [...source].reduce((total, char) => total + char.charCodeAt(0), 0)
  return VISUAL_THEMES[score % VISUAL_THEMES.length]
}

export const getAllVehicles = cache(async () => {
  const vehicles = await fetchSanity<Vehicle[]>(ALL_VEHICLES_QUERY)

  if (!vehicles?.length) {
    return FALLBACK_VEHICLES
  }

  return vehicles.map(normalizeVehicle)
})

export const getFeaturedVehicles = cache(async () => {
  const vehicles = await fetchSanity<Vehicle[]>(FEATURED_VEHICLES_QUERY)

  if (!vehicles?.length) {
    return FALLBACK_VEHICLES.filter((vehicle) => vehicle.status !== 'sold').slice(0, 3)
  }

  return vehicles.map(normalizeVehicle)
})

export const getTestimonials = cache(async () => {
  const testimonials = await fetchSanity<Testimonial[]>(TESTIMONIALS_QUERY)
  return testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS
})

export async function getVehicleBySlug(slug: string) {
  const vehicle = await fetchSanity<Vehicle>(VEHICLE_BY_SLUG_QUERY, { slug })

  if (!vehicle) {
    return FALLBACK_VEHICLES.find((entry) => entry.slug.current === slug) ?? null
  }

  return normalizeVehicle(vehicle)
}

export async function getRelatedVehicles(make: string, slug: string) {
  const vehicles = await fetchSanity<Vehicle[]>(RELATED_VEHICLES_QUERY, { make, slug })

  if (!vehicles?.length) {
    return FALLBACK_VEHICLES.filter(
      (vehicle) => vehicle.slug.current !== slug && vehicle.make === make && vehicle.status !== 'sold'
    ).slice(0, 3)
  }

  return vehicles.map(normalizeVehicle)
}

export async function getAllVehicleSlugs() {
  const slugs = await fetchSanity<Array<{ slug: string }>>(ALL_VEHICLE_SLUGS_QUERY)

  if (!slugs?.length) {
    return FALLBACK_VEHICLES.map((vehicle) => ({ slug: vehicle.slug.current }))
  }

  return slugs
}
