import HomeScreen from '@/components/screens/HomeScreen'
import { getFeaturedVehicles, getTestimonials } from '@/lib/site-data'

export const revalidate = 3600

export default async function HomePage() {
  const [featuredVehicles, testimonials] = await Promise.all([
    getFeaturedVehicles(),
    getTestimonials(),
  ])

  return <HomeScreen featuredVehicles={featuredVehicles} testimonials={testimonials} />
}
