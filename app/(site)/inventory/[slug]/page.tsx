import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VehicleStructuredData from '@/components/seo/VehicleStructuredData'
import VehicleDetailScreen from '@/components/screens/VehicleDetailScreen'
import { getAllVehicleSlugs, getRelatedVehicles, getVehicleBySlug } from '@/lib/site-data'
import { buildVehicleMetadata } from '@/utils/metadata'

type VehicleDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllVehicleSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: VehicleDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)

  if (!vehicle) {
    return { title: 'Vehicle Not Found' }
  }

  return buildVehicleMetadata(vehicle)
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)

  if (!vehicle) {
    notFound()
  }

  const relatedVehicles = await getRelatedVehicles(vehicle.make, vehicle.slug.current)

  return (
    <>
      <VehicleStructuredData vehicle={vehicle} />
      <VehicleDetailScreen relatedVehicles={relatedVehicles} vehicle={vehicle} />
    </>
  )
}
