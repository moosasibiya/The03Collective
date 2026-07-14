import type { Vehicle } from '@/types'
import Button from '@/components/ui/Button'
import VehicleCard from '@/components/inventory/VehicleCard'
import styles from './RelatedVehicles.module.css'

type RelatedVehiclesProps = {
  vehicles: Vehicle[]
}

export default function RelatedVehicles({ vehicles }: RelatedVehiclesProps) {
  if (!vehicles.length) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={`label ${styles.eyebrow}`}>You Might Also Like</span>
          <h3 className={`sectionTitle ${styles.title}`}>
            Related <em>Vehicles</em>
          </h3>
        </div>
        <Button href="/inventory" size="sm" variant="darkOutline">
          View All
        </Button>
      </div>

      <div className={styles.grid}>
        {vehicles.map((vehicle, index) => (
          <VehicleCard index={index} key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  )
}
