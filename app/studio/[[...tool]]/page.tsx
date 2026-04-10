import { notFound } from 'next/navigation'
import StudioApp from './StudioApp'

export default function StudioPage() {
  const studioEnabled =
    process.env.NODE_ENV !== 'production' || process.env.SANITY_STUDIO_ENABLED === 'true'

  if (!studioEnabled) {
    notFound()
  }

  return <StudioApp />
}
