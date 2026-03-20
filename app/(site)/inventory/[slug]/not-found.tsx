import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vehicle Not Found',
}

export default function VehicleNotFound() {
  return (
    <main style={{ padding: '140px 40px', minHeight: '60vh' }}>
      <p>This vehicle is no longer available.</p>
    </main>
  )
}
