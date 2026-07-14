export type VehicleStatus = 'available' | 'reserved' | 'sold' | 'comingSoon' | 'hidden'

export interface SanityImage {
  asset: {
    url: string
    metadata?: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
  alt?: string
}

export interface VehicleSpecs {
  power?: string
  torque?: string
  drive?: string
  acceleration?: string
}

export interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  mileage: number
  price: number
  colour?: string
  bodyType?: string
  trim?: string
  transmission?: string
  fuel?: string
  status: VehicleStatus
  featured?: boolean
  slug: { current: string }
  mainImage?: SanityImage
  images?: SanityImage[]
  description?: unknown[]
  shortDescription?: string
  descriptionHtml?: string
  features?: string[]
  specs?: VehicleSpecs
  conditionNotes?: string
  whatsappMessage?: string
  tags?: string[]
}

export interface Testimonial {
  _id: string
  quote: string
  author: string
  location?: string
}
