import HomeScreen from '@/components/screens/HomeScreen'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { getFeaturedVehicles, getTestimonials } from '@/lib/site-data'

export default async function HomePage() {
  const [featuredVehicles, testimonials] = await Promise.all([
    getFeaturedVehicles(),
    getTestimonials(),
  ])

  return (
    <>
      <Nav />
      <main>
        <HomeScreen featuredVehicles={featuredVehicles} testimonials={testimonials} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
