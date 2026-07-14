import InventoryScreen from '@/components/screens/InventoryScreen'
import { getAllVehicles } from '@/lib/site-data'
import { buildMetadata } from '@/utils/metadata'

export const metadata = buildMetadata({
  title: 'Inventory',
  description:
    'Browse curated premium, performance, and luxury vehicles available through The 03 Collective.',
  alternates: {
    canonical: '/inventory',
  },
})

type InventoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const params = await searchParams
  const vehicles = await getAllVehicles()

  return (
    <InventoryScreen
      initialFilters={{
        make: typeof params.make === 'string' ? params.make : '',
        status: typeof params.status === 'string' ? params.status : '',
        price: typeof params.price === 'string' ? params.price : '',
        trans: typeof params.trans === 'string' ? params.trans : '',
      }}
      vehicles={vehicles}
    />
  )
}
