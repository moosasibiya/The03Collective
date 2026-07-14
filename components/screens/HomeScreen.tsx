import type { Testimonial, Vehicle } from '@/types'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import FeaturedVehicles from '@/components/home/FeaturedVehicles'
import TrustStrip from '@/components/home/TrustStrip'
import ConsignSection from '@/components/home/ConsignSection'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import CtaBanner from '@/components/home/CtaBanner'

type HomeScreenProps = {
  featuredVehicles: Vehicle[]
  testimonials: Testimonial[]
}

export default function HomeScreen({ featuredVehicles, testimonials }: HomeScreenProps) {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedVehicles vehicles={featuredVehicles} />
      <TrustStrip />
      <ConsignSection />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <CtaBanner />
    </>
  )
}
