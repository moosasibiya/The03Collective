import type { Vehicle } from '@/types'
import VehicleCard from './VehicleCard'
import styles from './InventoryGrid.module.css'

type InventoryGridProps = {
  vehicles: Vehicle[]
}

export default function InventoryGrid({ vehicles }: InventoryGridProps) {
  if (!vehicles.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>0</div>
        <p>No vehicles match your filters.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {vehicles.map((vehicle, index) => (
        <VehicleCard index={index} key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  )
}
