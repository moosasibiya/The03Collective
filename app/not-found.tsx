import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import styles from './state.module.css'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.label}>404</span>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.body}>The page you requested does not exist or has been moved.</p>
        <div className={styles.actions}>
          <Button href="/">Back Home</Button>
          <Button href="/inventory" variant="outline">
            Browse Inventory
          </Button>
        </div>
      </div>
    </main>
  )
}
