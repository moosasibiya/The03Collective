import { SITE_CONTACT } from '@/lib/site-content'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site-config'

export default function OrganizationStructuredData() {
  const sameAs = [
    SITE_CONTACT.instagramUrl,
    SITE_CONTACT.facebookUrl,
    SITE_CONTACT.tiktokUrl,
  ].filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phoneDisplay,
    areaServed: 'ZA',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: SITE_CONTACT.phoneDisplay,
        email: SITE_CONTACT.email,
        areaServed: 'ZA',
        availableLanguage: ['en'],
      },
    ],
    sameAs,
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  )
}
