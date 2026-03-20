import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VehicleDetailScreen from '@/components/screens/VehicleDetailScreen'
import { getRelatedVehicles, getVehicleBySlug } from '@/lib/site-data'
import { buildVehicleMetadata } from '@/utils/metadata'

type VehicleDetailPageProps = {
  params: Promise<{ slug: string }>
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

  return <VehicleDetailScreen relatedVehicles={relatedVehicles} vehicle={vehicle} />
}
