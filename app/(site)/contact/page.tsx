import ContactScreen from '@/components/screens/ContactScreen'

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
