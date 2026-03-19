import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { getSanityClient } from './client'

export const urlFor = (source: SanityImageSource) => {
  const client = getSanityClient()

  if (!client) {
    throw new Error('Sanity is not configured. Missing NEXT_PUBLIC_SANITY_PROJECT_ID.')
  }

  return createImageUrlBuilder(client).image(source)
}

export const getCardImage = (img: SanityImageSource) =>
  urlFor(img).width(800).height(500).fit('crop').format('webp').quality(85).url()

export const getHeroImage = (img: SanityImageSource) =>
  urlFor(img).width(1600).height(900).fit('crop').format('webp').quality(90).url()

export const getThumbImage = (img: SanityImageSource) =>
  urlFor(img).width(220).height(148).fit('crop').format('webp').quality(80).url()

export const getOgImage = (img: SanityImageSource) =>
  urlFor(img).width(1200).height(630).fit('crop').format('jpg').quality(85).url()