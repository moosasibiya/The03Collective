'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error(error)

  return (
    <html lang="en">
      <body style={{ padding: 40 }}>
        <h2>Something went wrong.</h2>
        <button
          type="button"
          onClick={() => reset()}
          style={{ marginTop: 16, padding: '10px 16px', cursor: 'pointer' }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}