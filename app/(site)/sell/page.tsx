import SellScreen from '@/components/screens/SellScreen'
import { buildMetadata } from '@/utils/metadata'

export const metadata = buildMetadata({
  title: 'Sell Your Car',
  description:
    'Consign your car with The 03 Collective for premium presentation, qualified buyers, and personal service.',
  alternates: {
    canonical: '/sell',
  },
})

export default function SellPage() {
  return <SellScreen />
}
