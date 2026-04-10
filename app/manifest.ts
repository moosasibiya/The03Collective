import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_THEME_COLOR } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'The 03 Collective',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: SITE_THEME_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
