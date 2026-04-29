import type { Vehicle } from '@/types'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site-config'

type VehicleStructuredDataProps = {
  vehicle: Vehicle
}

const availabilityMap: Record<Vehicle['status'], string> = {
  available: 'https://schema.org/InStock',
  reserved: 'https://schema.org/PreOrder',
  sold: 'https://schema.org/SoldOut',
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildDescription(vehicle: Vehicle) {
  if (vehicle.descriptionHtml) {
    return stripHtml(vehicle.descriptionHtml).slice(0, 280)
  }

  if (vehicle.conditionNotes) {
    return vehicle.conditionNotes
  }

  return `${vehicle.year} ${vehicle.make} ${vehicle.model}`
}

export default function VehicleStructuredData({ vehicle }: VehicleStructuredDataProps) {
  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const url = `${SITE_URL}/inventory/${vehicle.slug.current}`
  const imageUrls = vehicle.images?.map((image) => image.asset.url).filter(Boolean) ?? []
  const images =
    imageUrls.length > 0
      ? imageUrls
      : vehicle.mainImage?.asset.url
        ? [vehicle.mainImage.asset.url]
        : [`${SITE_URL}${DEFAULT_OG_IMAGE}`]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: buildDescription(vehicle),
    image: images,
    sku: vehicle._id,
    category: 'Used vehicle',
    url,
    brand: {
      '@type': 'Brand',
      name: vehicle.make,
    },
    color: vehicle.colour,
    model: vehicle.model,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitText: 'km',
    },
    itemCondition: 'https://schema.org/UsedCondition',
    additionalProperty: [
      vehicle.trim
        ? {
            '@type': 'PropertyValue',
            name: 'Trim',
            value: vehicle.trim,
          }
        : null,
      vehicle.transmission
        ? {
            '@type': 'PropertyValue',
            name: 'Transmission',
            value: vehicle.transmission,
          }
        : null,
      vehicle.fuel
        ? {
            '@type': 'PropertyValue',
            name: 'Fuel type',
            value: vehicle.fuel,
          }
        : null,
      vehicle.specs?.power
        ? {
            '@type': 'PropertyValue',
            name: 'Power',
            value: vehicle.specs.power,
          }
        : null,
      vehicle.specs?.drive
        ? {
            '@type': 'PropertyValue',
            name: 'Drive',
            value: vehicle.specs.drive,
          }
        : null,
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ZAR',
      price: vehicle.price,
      availability: availabilityMap[vehicle.status],
      url,
    },
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  )
}
