import type { Vehicle } from '@/types'
import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
import VehicleCard from '@/components/inventory/VehicleCard'
import styles from './FeaturedVehicles.module.css'

type FeaturedVehiclesProps = {
  vehicles: Vehicle[]
}

export default function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  return (
    <section className="pageSection">
      <div className="container">
        <RevealWrapper className={styles.header}>
          <div>
            <span className={`label ${styles.kicker}`}>Current Inventory</span>
            <h2 className={`sectionTitle ${styles.title}`}>
              Selected for
              <br />a <em>Reason.</em>
            </h2>
          </div>
          <Button href="/inventory" variant="ghost">
            View All {'->'}
          </Button>
        </RevealWrapper>

        <div className={styles.grid}>
          {vehicles.map((vehicle, index) => (
            <VehicleCard index={index} key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>

        <RevealWrapper className={styles.action} delay={120}>
          <Button href="/inventory" size="lg" variant="outline">
            View Full Inventory {'->'}
          </Button>
        </RevealWrapper>
      </div>
    </section>
  )
}
