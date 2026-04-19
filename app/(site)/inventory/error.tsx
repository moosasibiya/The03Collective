'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import styles from '@/app/state.module.css'

export default function InventoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.label}>Inventory</span>
        <h1 className={styles.title}>Unable to Load Inventory</h1>
        <p className={styles.body}>
          We couldn&apos;t load the latest inventory right now. Please retry in a moment.
        </p>
        <div className={styles.actions}>
          <button
            onClick={() => {
              router.refresh()
              reset()
            }}
            style={{ marginTop: 0 }}
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    </main>
  )
}
