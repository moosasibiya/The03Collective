import type { Metadata } from 'next'
import NicovichProposalPage from '@/components/private-creative/NicovichProposalPage'

export const metadata: Metadata = {
  applicationName: 'Moosa Sibiya',
  title: {
    absolute: 'Automotive Portfolio | Moosa Sibiya',
  },
  description:
    'Automotive content and creative direction portfolio by Moosa Sibiya.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: 'Automotive Portfolio | Moosa Sibiya',
    description:
      'Automotive content and creative direction portfolio by Moosa Sibiya.',
    siteName: 'Moosa Sibiya',
    type: 'website',
    images: [
      {
        url: '/images/nicovich/audi-r8/dsc04818-enhanced-nr-04.jpg',
        width: 1200,
        height: 630,
        alt: 'Audi R8 cinematic hero image from Moosa Sibiya\'s automotive portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automotive Portfolio | Moosa Sibiya',
    description:
      'Automotive content and creative direction portfolio by Moosa Sibiya.',
    images: ['/images/nicovich/audi-r8/dsc04818-enhanced-nr-04.jpg'],
  },
}

export default function Page() {
  return <NicovichProposalPage />
}
