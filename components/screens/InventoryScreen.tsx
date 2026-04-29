import type { Vehicle } from '@/types'
import FilterBar from '@/components/inventory/FilterBar'
import PageHeader from '@/components/ui/PageHeader'

type InventoryScreenProps = {
  vehicles: Vehicle[]
  initialFilters?: {
    make?: string
    status?: string
    price?: string
    trans?: string
  }
}

export default function InventoryScreen({ vehicles, initialFilters }: InventoryScreenProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Inventory' }]}
        description="Every vehicle here is hand-picked, professionally presented, and verified."
        label="Premium Selection"
        title={
          <>
            Our <em>Inventory.</em>
          </>
        }
      />
      <FilterBar initialFilters={initialFilters} vehicles={vehicles} />
    </>
  )
}
