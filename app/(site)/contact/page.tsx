import ContactScreen from '@/components/screens/ContactScreen'
import { buildMetadata } from '@/utils/metadata'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact The 03 Collective for buying, selling, consignment, or general automotive enquiries.',
  alternates: {
    canonical: '/contact',
  },
})

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const type = typeof params.type === 'string' ? params.type : ''
  const vehicle = typeof params.vehicle === 'string' ? params.vehicle : ''

  return (
    <ContactScreen
      initialMessage={vehicle ? `I'm interested in ${vehicle} and would like to know more.` : ''}
      initialType={type}
    />
  )
}
