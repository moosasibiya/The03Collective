import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import styles from '@/app/state.module.css'

export const metadata: Metadata = {
  title: 'Vehicle Not Found',
}

export default function VehicleNotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.label}>Inventory</span>
        <h1 className={styles.title}>Vehicle Not Found</h1>
        <p className={styles.body}>
          This listing is no longer available. Browse the inventory for current vehicles or contact
          us to source something similar.
        </p>
        <div className={styles.actions}>
          <Button href="/inventory">Back to Inventory</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  )
}
