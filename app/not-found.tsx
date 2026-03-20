import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main style={{ padding: '140px 40px', minHeight: '60vh' }}>
      <p>404 - Page not found</p>
    </main>
  )
}
