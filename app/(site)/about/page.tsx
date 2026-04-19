import AboutScreen from '@/components/screens/AboutScreen'
import { buildMetadata } from '@/utils/metadata'

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Learn about The 03 Collective, our standards, and the team behind our curated automotive offering.',
  alternates: {
    canonical: '/about',
  },
})

export default function AboutPage() {
  return <AboutScreen />
}
