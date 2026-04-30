'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error]) 

  return (
    <main style={{ padding: '140px 40px', minHeight: '60vh' }}>
      <p>Something went wrong.</p>
      <button onClick={reset} style={{ marginTop: 16 }}>
        Try again
      </button>
    </main>
  )
}
