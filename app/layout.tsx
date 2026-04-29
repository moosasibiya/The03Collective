import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Exo_2, Michroma, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PageReveal from '@/components/PageReveal'
import { SITE_THEME_COLOR } from '@/lib/site-config'
import { buildMetadata } from '@/utils/metadata'
import './globals.css'

export const metadata: Metadata = buildMetadata()
export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
}

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const logoNum = Exo_2({
  subsets: ['latin'],
  variable: '--logo-num',
  weight: ['100', '200', '300'],
  display: 'swap',
})

const logoWord = Michroma({
  subsets: ['latin'],
  variable: '--logo-word',
  weight: '400',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${sans.variable} ${serif.variable} ${logoNum.variable} ${logoWord.variable}`}
    >
      <body>
        {children}
        <PageReveal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
