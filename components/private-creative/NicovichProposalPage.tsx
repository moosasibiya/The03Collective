'use client'

import Image from 'next/image'
import type { CSSProperties, TouchEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import RevealWrapper from '@/components/ui/RevealWrapper'
import styles from './PrivateCreative.module.css'

type GalleryImage = {
  src: string
  alt: string
}

type VehicleGallery = {
  name: string
  folder: string
  cover: GalleryImage
  images: GalleryImage[]
}

const moreImage = (folder: string, index: number) =>
  `/images/nicovich/more/${folder}/${folder}-${String(index).padStart(2, '0')}.jpg`

const createMoreGallery = ({
  name,
  folder,
  count,
  coverIndex,
  coverAlt,
  altBase,
}: {
  name: string
  folder: string
  count: number
  coverIndex: number
  coverAlt: string
  altBase: string
}): VehicleGallery => {
  const images = Array.from({ length: count }, (_, itemIndex) => ({
    src: moreImage(folder, itemIndex + 1),
    alt: `${altBase} frame ${itemIndex + 1}`,
  }))

  return {
    name,
    folder,
    cover: {
      src: moreImage(folder, coverIndex),
      alt: coverAlt,
    },
    images,
  }
}

const heroImage = {
  src: '/images/nicovich/audi-r8/dsc04800-enhanced-nr-01.jpg',
    alt: 'Audi R8 front view in a dark cinematic luxury setting',
}

const baseVehicleGalleries: VehicleGallery[] = [
  {
    name: 'Audi R8',
    folder: 'Audi R8',
    cover: {
      src: '/images/nicovich/audi-r8/dsc04818-enhanced-nr-04.jpg',
      alt: 'Audi R8 rear profile framed in a cinematic exterior setting',
    },
    images: [
      {
        src: '/images/nicovich/audi-r8/dsc04800-enhanced-nr-01.jpg',
        alt: 'Audi R8 front profile in a premium automotive courtyard',
      },
      {
        src: '/images/nicovich/audi-r8/dsc04811-enhanced-nr-02.jpg',
        alt: 'Audi R8 rear wing and body detail in dramatic light',
      },
      {
        src: '/images/nicovich/audi-r8/dsc04815-enhanced-nr-03.jpg',
        alt: 'Audi R8 front three-quarter profile with dark showroom contrast',
      },
      {
        src: '/images/nicovich/audi-r8/dsc04818-enhanced-nr-04.jpg',
        alt: 'Audi R8 rear profile framed in a cinematic exterior setting',
      },
      {
        src: '/images/nicovich/audi-r8/dsc04868-enhanced-nr-05.jpg',
        alt: 'Audi R8 headlight and front grille detail',
      },
    ],
  },
  {
    name: 'Porsche GT3 RS',
    folder: 'GT3RS',
    cover: {
      src: '/images/nicovich/gt3rs/7ab8d76f-1df1-4f8e-93e3-e16ec2745144-01.jpg',
      alt: 'Red Porsche GT3 RS front profile in a luxury exterior setting',
    },
    images: [
      {
        src: '/images/nicovich/gt3rs/7ab8d76f-1df1-4f8e-93e3-e16ec2745144-01.jpg',
        alt: 'Red Porsche GT3 RS front profile in a luxury exterior setting',
      },
      {
        src: '/images/nicovich/gt3rs/7efef257-47a2-4d1b-ae06-34c03b8966a9-02.jpg',
        alt: 'Red Porsche GT3 RS front-facing portrait',
      },
      {
        src: '/images/nicovich/gt3rs/dsc04875-enhanced-nr-03.jpg',
        alt: 'Porsche GT3 RS wheel and rear quarter detail',
      },
      {
        src: '/images/nicovich/gt3rs/dsc04902-enhanced-nr-04.jpg',
        alt: 'Porsche GT3 RS rear wing and taillight profile',
      },
      {
        src: '/images/nicovich/gt3rs/dsc04918-enhanced-nr-05.jpg',
        alt: 'Porsche GT3 RS side graphic and wheel detail',
      },
      {
        src: '/images/nicovich/gt3rs/dsc04923-enhanced-nr-06.jpg',
        alt: 'Porsche GT3 RS rear profile in a premium driveway',
      },
      {
        src: '/images/nicovich/gt3rs/dsc04949-enhanced-nr-07.jpg',
        alt: 'Porsche GT3 RS front three-quarter angle',
      },
    ],
  },
  {
    name: 'Ferrari 488',
    folder: '488',
    cover: {
      src: '/images/nicovich/488/dsc04121-enhanced-nr-02.jpg',
      alt: 'Blue Ferrari 488 front profile under studio lighting',
    },
    images: [
      {
        src: '/images/nicovich/488/dsc04097-enhanced-nr-01.jpg',
        alt: 'Blue Ferrari 488 side profile in a premium showroom',
      },
      {
        src: '/images/nicovich/488/dsc04121-enhanced-nr-02.jpg',
        alt: 'Blue Ferrari 488 front profile under studio lighting',
      },
      {
        src: '/images/nicovich/488/dsc04126-enhanced-nr-03.jpg',
        alt: 'Blue Ferrari 488 rear light and exhaust detail',
      },
      {
        src: '/images/nicovich/488/dsc04136-enhanced-nr-04.jpg',
        alt: 'Blue Ferrari 488 wheel and brake detail',
      },
      {
        src: '/images/nicovich/488/dsc04142-enhanced-nr-05.jpg',
        alt: 'Blue Ferrari 488 rear three-quarter showroom view',
      },
    ],
  },
  {
    name: 'Mercedes-Benz S-Class',
    folder: 'SClass',
    cover: {
      src: '/images/nicovich/sclass/untitled-design-4-14.jpg',
    alt: 'Black Mercedes-Benz S-Class front profile',
    },
    images: [
      {
        src: '/images/nicovich/sclass/dsc05641-enhanced-nr-01.jpg',
        alt: 'Mercedes-Benz S-Class headlight and grille detail',
      },
      {
        src: '/images/nicovich/sclass/dsc05686-enhanced-nr-02.jpg',
        alt: 'Mercedes-Benz S-Class Burmester speaker and leather interior detail',
      },
      {
        src: '/images/nicovich/sclass/dsc05695-enhanced-nr-03.jpg',
        alt: 'Mercedes-Benz S-Class wheel detail',
      },
      {
        src: '/images/nicovich/sclass/dsc05716-enhanced-nr-04.jpg',
        alt: 'Mercedes-Benz S-Class door controls and tan leather trim',
      },
      {
        src: '/images/nicovich/sclass/dsc05725-enhanced-nr-05.jpg',
        alt: 'Mercedes-Benz S-Class dashboard trim and air vent detail',
      },
      {
        src: '/images/nicovich/sclass/dsc05740-enhanced-nr-06.jpg',
        alt: 'Mercedes-Benz S-Class digital cockpit and steering wheel',
      },
      {
        src: '/images/nicovich/sclass/dsc05749-enhanced-nr-07.jpg',
        alt: 'Mercedes-Benz S-Class center display and dashboard',
      },
      {
        src: '/images/nicovich/sclass/dsc05755-enhanced-nr-08.jpg',
        alt: 'Mercedes-Benz S-Class steering wheel and premium interior',
      },
      {
        src: '/images/nicovich/sclass/dsc05761-enhanced-nr-09.jpg',
        alt: 'Mercedes-Benz S-Class steering wheel close detail',
      },
      {
        src: '/images/nicovich/sclass/dsc05767-enhanced-nr-10.jpg',
        alt: 'Mercedes-Benz S-Class steering wheel controls and cockpit detail',
      },
      {
        src: '/images/nicovich/sclass/untitled-design-1-11.jpg',
        alt: 'Black Mercedes-Benz S-Class rear three-quarter exterior',
      },
      {
        src: '/images/nicovich/sclass/untitled-design-2-12.jpg',
        alt: 'Black Mercedes-Benz S-Class side profile in a luxury exterior setting',
      },
      {
        src: '/images/nicovich/sclass/untitled-design-3-13.jpg',
        alt: 'Black Mercedes-Benz S-Class rear profile',
      },
      {
        src: '/images/nicovich/sclass/untitled-design-4-14.jpg',
      alt: 'Black Mercedes-Benz S-Class front profile',
      },
      {
        src: '/images/nicovich/sclass/untitled-design-15.jpg',
        alt: 'Black Mercedes-Benz S-Class front three-quarter exterior profile',
      },
    ],
  },
  {
    name: 'Lamborghini Urus',
    folder: 'Urus',
    cover: {
      src: '/images/nicovich/urus/dsc05086-enhanced-nr-03.jpg',
      alt: 'White Lamborghini Urus front profile under trees',
    },
    images: [
      {
        src: '/images/nicovich/urus/dsc05065-enhanced-nr-01.jpg',
        alt: 'White Lamborghini Urus side profile in a luxury outdoor setting',
      },
      {
        src: '/images/nicovich/urus/dsc05068-enhanced-nr-02.jpg',
        alt: 'Lamborghini Urus wheel and red brake caliper detail',
      },
      {
        src: '/images/nicovich/urus/dsc05086-enhanced-nr-03.jpg',
        alt: 'White Lamborghini Urus front profile under trees',
      },
      {
        src: '/images/nicovich/urus/dsc05089-enhanced-nr-04.jpg',
        alt: 'Lamborghini Urus interior door and dashboard detail',
      },
      {
        src: '/images/nicovich/urus/dsc05098-enhanced-nr-05.jpg',
        alt: 'Lamborghini Urus steering wheel and cockpit detail',
      },
    ],
  },
  {
    name: 'Mercedes-AMG CLS',
    folder: 'CLS',
    cover: {
      src: '/images/nicovich/cls/dsc07857-enhanced-nr-07.jpg',
      alt: 'White Mercedes-AMG CLS front profile in a shadowed parking garage',
    },
    images: [
      {
        src: '/images/nicovich/cls/dsc07824-enhanced-nr-01.jpg',
        alt: 'Mercedes-AMG CLS steering wheel and red leather interior',
      },
      {
        src: '/images/nicovich/cls/dsc07836-enhanced-nr-02.jpg',
        alt: 'Mercedes-AMG CLS steering wheel close detail',
      },
      {
        src: '/images/nicovich/cls/dsc07839-enhanced-nr-03.jpg',
        alt: 'White Mercedes-AMG CLS front profile in a parking garage',
      },
      {
        src: '/images/nicovich/cls/dsc07845-enhanced-nr-04.jpg',
        alt: 'Mercedes-AMG CLS side detail and front wheel',
      },
      {
        src: '/images/nicovich/cls/dsc07848-enhanced-nr-05.jpg',
        alt: 'Mercedes-AMG CLS dashboard and interior detail',
      },
      {
        src: '/images/nicovich/cls/dsc07854-enhanced-nr-06.jpg',
        alt: 'Mercedes-AMG CLS red leather sport seats',
      },
      {
        src: '/images/nicovich/cls/dsc07857-enhanced-nr-07.jpg',
        alt: 'White Mercedes-AMG CLS front profile in a shadowed parking garage',
      },
      {
        src: '/images/nicovich/cls/dsc07860-enhanced-nr-08.jpg',
        alt: 'Mercedes-AMG CLS headlight and front wheel detail',
      },
    ],
  },
  {
    name: 'Colab G80',
    folder: 'Colab G80',
    cover: {
      src: '/images/nicovich/colab-g80/dsc04396-enhanced-nr-03.jpg',
      alt: 'White BMW G80 rear view during a collaborative automotive shoot',
    },
    images: [
      {
        src: '/images/nicovich/colab-g80/dsc04387-enhanced-nr-01.jpg',
        alt: 'White BMW G80 front profile in soft evening light',
      },
      {
        src: '/images/nicovich/colab-g80/dsc04391-enhanced-nr-02.jpg',
        alt: 'White BMW G80 side detail with collaboration graphic',
      },
      {
        src: '/images/nicovich/colab-g80/dsc04396-enhanced-nr-03.jpg',
        alt: 'White BMW G80 rear view during a collaborative automotive shoot',
      },
      {
        src: '/images/nicovich/colab-g80/dsc04403-enhanced-nr-04.jpg',
        alt: 'White BMW G80 rear diffuser and taillight detail',
      },
      {
        src: '/images/nicovich/colab-g80/dsc04433-enhanced-nr-3-05.jpg',
        alt: 'White BMW G80 front three-quarter exterior at sunset',
      },
    ],
  },
  {
    name: 'BMW M4',
    folder: 'My M4',
    cover: {
      src: '/images/nicovich/my-m4/dsc04742-01.jpg',
      alt: 'Green BMW M4 front profile in a moody outdoor setting',
    },
    images: [
      {
        src: '/images/nicovich/my-m4/dsc04742-01.jpg',
        alt: 'Green BMW M4 front profile in a moody outdoor setting',
      },
      {
        src: '/images/nicovich/my-m4/dsc04770-02.jpg',
        alt: 'Green BMW M4 wheel and front quarter detail',
      },
      {
        src: '/images/nicovich/my-m4/dsc04776-03.jpg',
        alt: 'BMW M4 sport seat detail',
      },
      {
        src: '/images/nicovich/my-m4/dsc04779-04.jpg',
        alt: 'Green BMW M4 rear three-quarter profile',
      },
      {
        src: '/images/nicovich/my-m4/dsc04782-05.jpg',
        alt: 'Green BMW M4 rear profile framed by trees',
      },
    ],
  },
]

const newVehicleGalleries: VehicleGallery[] = [
  createMoreGallery({
    name: 'Audi RS3',
    folder: 'audi-rs3',
    count: 7,
    coverIndex: 7,
    coverAlt: 'Blue Audi RS3 rear profile with illuminated taillights at night',
    altBase: 'Blue Audi RS3 luxury automotive portfolio',
  }),
  createMoreGallery({
    name: 'BMW G87 M2',
    folder: 'bmw-g87-m2',
    count: 5,
    coverIndex: 1,
    coverAlt: 'Black BMW G87 M2 front three-quarter profile at golden hour',
    altBase: 'Black BMW G87 M2 performance automotive portfolio',
  }),
  createMoreGallery({
    name: 'BMW M3 Touring',
    folder: 'bmw-m3-station-wagon',
    count: 6,
    coverIndex: 1,
    coverAlt: 'Grey BMW M3 Touring front three-quarter profile outside a studio',
    altBase: 'Grey BMW M3 Touring luxury performance portfolio',
  }),
  createMoreGallery({
    name: 'Ferrari 296 GTB',
    folder: 'ferrari-296-gtb',
    count: 8,
    coverIndex: 4,
    coverAlt: 'Red Ferrari 296 GTB side profile on a sweeping road',
    altBase: 'Red Ferrari 296 GTB luxury automotive portfolio',
  }),
  createMoreGallery({
    name: 'Mercedes-Benz CLK63 Black Series',
    folder: 'mercedes-benz-clk63-black-series',
    count: 6,
    coverIndex: 5,
    coverAlt: 'Black Mercedes-Benz CLK63 Black Series front rolling profile',
    altBase: 'Mercedes-Benz CLK63 Black Series performance portfolio',
  }),
  createMoreGallery({
    name: 'Porsche 911 Carrera',
    folder: 'porsche-911-carrera',
    count: 8,
    coverIndex: 5,
    coverAlt: 'Blue Porsche 911 Carrera rear profile in a city setting',
    altBase: 'Blue Porsche 911 Carrera luxury automotive portfolio',
  }),
  createMoreGallery({
    name: 'Porsche 911 GT3',
    folder: 'porsche-911-gt3',
    count: 6,
    coverIndex: 2,
    coverAlt: 'Black Porsche 911 GT3 side profile at golden hour',
    altBase: 'Black Porsche 911 GT3 luxury performance portfolio',
  }),
]

const exoticVehicleOrder = new Map(
  [
    'Ferrari 296 GTB',
    'Audi R8',
    'Porsche 911 Carrera',
    'Porsche GT3 RS',
    'Porsche 911 GT3',
    'Ferrari 488',
    'Lamborghini Urus',
    'Mercedes-Benz CLK63 Black Series',
  ].map((name, index) => [name, index])
)

const vehicleGalleries: VehicleGallery[] = [...baseVehicleGalleries, ...newVehicleGalleries].sort(
  (firstVehicle, secondVehicle) =>
    (exoticVehicleOrder.get(firstVehicle.name) ?? 100) -
    (exoticVehicleOrder.get(secondVehicle.name) ?? 100)
)

const coverPositions: Record<string, { desktop: string; mobile?: string }> = {
  'Audi R8': { desktop: '50% 48%', mobile: '50% 48%' },
  'Porsche GT3 RS': { desktop: '48% 48%', mobile: '50% 46%' },
  'Ferrari 488': { desktop: '50% 48%', mobile: '50% 48%' },
  'Mercedes-Benz S-Class': { desktop: '54% 52%', mobile: '50% 50%' },
  'Lamborghini Urus': { desktop: '50% 48%', mobile: '50% 46%' },
  'Mercedes-AMG CLS': { desktop: '50% 50%', mobile: '50% 48%' },
  'Colab G80': { desktop: '50% 50%', mobile: '50% 48%' },
  'BMW M4': { desktop: '50% 48%', mobile: '50% 46%' },
  'Audi RS3': { desktop: '50% 50%', mobile: '50% 48%' },
  'BMW G87 M2': { desktop: '50% 48%', mobile: '50% 46%' },
  'BMW M3 Touring': { desktop: '50% 48%', mobile: '50% 46%' },
  'Ferrari 296 GTB': { desktop: '50% 52%', mobile: '50% 50%' },
  'Mercedes-Benz CLK63 Black Series': { desktop: '50% 50%', mobile: '50% 48%' },
  'Porsche 911 Carrera': { desktop: '50% 52%', mobile: '50% 50%' },
  'Porsche 911 GT3': { desktop: '50% 50%', mobile: '50% 48%' },
}

const getVehicleCardStyle = (vehicleName: string) => {
  const position = coverPositions[vehicleName] ?? { desktop: '50% 50%' }

  return {
    '--vehicle-cover-position': position.desktop,
    '--vehicle-cover-position-mobile': position.mobile ?? position.desktop,
  } as CSSProperties
}

const workCards = [
  {
    title: 'Convoy Energy',
    image: '/images/nicovich/reels/DVvTTahDXZb.jpg',
    alt: 'Instagram Reel thumbnail showing blue BMW performance cars in a collaborative shoot',
    instagramUrl:
      'https://www.instagram.com/reel/DVvTTahDXZb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'GT3 Presence',
    image: '/images/nicovich/reels/DVBmvUbjabq.jpg',
    alt: 'Instagram Reel thumbnail showing a black Porsche GT3 in golden-hour light',
    instagramUrl:
      'https://www.instagram.com/reel/DVBmvUbjabq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'RS3 Attitude',
    image: '/images/nicovich/reels/DaYYENbNq0q.jpg',
    alt: 'Instagram Reel thumbnail showing an Audi RS3 with Moosa in frame',
    instagramUrl:
      'https://www.instagram.com/reel/DaYYENbNq0q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'M5 Competition',
    image: '/images/nicovich/reels/DKPQ0VcNY8z.jpg',
    alt: 'Instagram Reel thumbnail showing a black BMW M5 Competition parked roadside',
    instagramUrl:
      'https://www.instagram.com/reel/DKPQ0VcNY8z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'M4 Precision',
    image: '/images/nicovich/reels/DIJKzsUtTuM.jpg',
    alt: 'Instagram Reel thumbnail showing a grey BMW M4 front view at a detailing studio',
    instagramUrl:
      'https://www.instagram.com/reel/DIJKzsUtTuM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'G63 Authority',
    image: '/images/nicovich/reels/DJ1qi2bNN44.jpg',
    alt: 'Instagram Reel thumbnail showing a white Mercedes-Benz G63 AMG outside AutoSport Motor City',
    instagramUrl:
      'https://www.instagram.com/reel/DJ1qi2bNN44/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    title: 'Raptor Presence',
    image: '/images/nicovich/reels/DHJElyrN5a8.jpg',
    alt: 'Instagram Reel thumbnail showing a grey Ford Raptor in a tree-lined road setting',
    instagramUrl:
      'https://www.instagram.com/reel/DHJElyrN5a8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
]

const aboutImage = {
  src: '/images/nicovich/range-rover-octa-showroom.jpg',
  alt: 'Range Rover in a dark luxury showroom used as cinematic positioning imagery',
}

export default function NicovichProposalPage() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)
  const activeGallery =
    activeGalleryIndex === null ? null : (vehicleGalleries[activeGalleryIndex] ?? null)

  const closeGallery = () => {
    setActiveGalleryIndex(null)
    setSelectedImageIndex(0)
  }

  const openGallery = (index: number) => {
    const gallery = vehicleGalleries[index]
    const coverIndex = gallery
      ? gallery.images.findIndex((image) => image.src === gallery.cover.src)
      : 0

    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActiveGalleryIndex(index)
    setSelectedImageIndex(Math.max(coverIndex, 0))
  }

  const showPreviousImage = () => {
    if (!activeGallery) return
    setSelectedImageIndex((current) =>
      current === 0 ? activeGallery.images.length - 1 : current - 1
    )
  }

  const showNextImage = () => {
    if (!activeGallery) return
    setSelectedImageIndex((current) => (current + 1) % activeGallery.images.length)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return

    const endX = event.changedTouches[0]?.clientX
    if (typeof endX !== 'number') return

    const distance = touchStartX.current - endX
    touchStartX.current = null

    if (Math.abs(distance) < 48) return

    if (distance > 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }
  }

  useEffect(() => {
    if (!activeGallery) return

    const previousOverflow = document.body.style.overflow
    const previousDocumentOverflow = document.documentElement.style.overflow
    const imageCount = activeGallery.images.length
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveGalleryIndex(null)
        setSelectedImageIndex(0)
        return
      }

      if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((current) => (current === 0 ? imageCount - 1 : current - 1))
        return
      }

      if (event.key === 'ArrowRight') {
        setSelectedImageIndex((current) => (current + 1) % imageCount)
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousDocumentOverflow
      window.removeEventListener('keydown', handleKeyDown)
      lastFocusedElementRef.current?.focus()
    }
  }, [activeGallery])

  return (
    <div className={styles.page}>
      <header className={styles.topBar} aria-label="Portfolio page header">
        <a className={styles.mark} href="#top" aria-label="Moosa Sibiya">
          MS
        </a>
        <div className={styles.brandLockup}>
          <span>Moosa Sibiya</span>
          <small>Automotive Content & Creative Direction</small>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroMedia}>
            <Image
              alt={heroImage.alt}
              className={styles.heroImage}
              fill
              priority
              sizes="100vw"
              src={heroImage.src}
            />
            <div className={styles.heroScrim} />
          </div>

          <div className={styles.heroRail} aria-hidden="true">
            <span>01</span>
            <i />
            <i />
            <i />
            <i />
            <i />
            <span>06</span>
          </div>

          <div className={styles.heroInner}>
            <RevealWrapper className={styles.heroCopy}>
              <p className={styles.microLabel}>Automotive portfolio</p>
              <h1 className={styles.heroTitle} id="hero-title">
                MOOSA SIBIYA.
                <br />
                Unmissable.
              </h1>
              <p className={styles.heroLead}>
                Content that turns premium inventory into instant attention, stronger desire, and
                faster decisions.
              </p>
              <a className={styles.scrollCta} href="#visual-impact">
                <span>Explore the vision</span>
                <i aria-hidden="true">&darr;</i>
              </a>
            </RevealWrapper>
          </div>
        </section>

        <section className={styles.visualSection} id="visual-impact">
          <div className={styles.container}>
            <RevealWrapper className={styles.centerHeader}>
              <p className={styles.microLabel}>Visual proof</p>
              <h2>A Fleet This Strong Should Feel Impossible To Ignore.</h2>
            </RevealWrapper>

            <div className={styles.vehicleGalleryGrid}>
              {vehicleGalleries.map((vehicle, index) => (
                <RevealWrapper
                  as="article"
                  className={styles.vehicleCard}
                  delay={index * 45}
                  key={vehicle.folder}
                >
                  <button
                    aria-label={`Open ${vehicle.name} gallery with ${vehicle.images.length} images`}
                    className={styles.vehicleCardButton}
                    onClick={() => openGallery(index)}
                    style={getVehicleCardStyle(vehicle.name)}
                    type="button"
                  >
                    <Image
                      alt={vehicle.cover.alt}
                      className={styles.vehicleCardImage}
                      fill
                      sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1180px) calc((100vw - 96px) / 2), (max-width: 1600px) calc((100vw - 120px) / 3), 460px"
                      src={vehicle.cover.src}
                    />
                    <span className={styles.vehicleCardShade} />
                    <span className={styles.vehicleCardIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.vehicleCardMeta}>
                      <strong>{vehicle.name}</strong>
                      <small>
                        View Gallery / {vehicle.images.length}{' '}
                        {vehicle.images.length === 1 ? 'Image' : 'Images'}
                      </small>
                    </span>
                  </button>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {activeGallery ? (
          <div
            aria-labelledby="gallery-modal-title"
            aria-modal="true"
            className={styles.galleryModal}
            ref={modalRef}
            role="dialog"
          >
            <button
              aria-label="Close gallery"
              className={styles.modalBackdrop}
              onClick={closeGallery}
              type="button"
            />
            <div className={styles.modalShell}>
              <header className={styles.modalHeader}>
                <div>
                  <p className={styles.microLabel}>{activeGallery.folder}</p>
                  <h2 id="gallery-modal-title">{activeGallery.name}</h2>
                </div>
                <div className={styles.modalHeaderActions}>
                  <span>
                    {selectedImageIndex + 1} / {activeGallery.images.length}
                  </span>
                  <button
                    aria-label="Close gallery"
                    onClick={closeGallery}
                    ref={closeButtonRef}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              </header>

              <div className={styles.modalStage}>
                <button
                  aria-label="Previous image"
                  className={styles.modalArrow}
                  onClick={showPreviousImage}
                  type="button"
                >
                  &#8592;
                </button>

                <div
                  className={styles.modalImageWrap}
                  onTouchEnd={handleTouchEnd}
                  onTouchStart={handleTouchStart}
                >
                  <Image
                    alt={activeGallery.images[selectedImageIndex].alt}
                    className={styles.modalImage}
                    fill
                    sizes="(max-width: 860px) 100vw, 78vw"
                    src={activeGallery.images[selectedImageIndex].src}
                  />
                </div>

                <button
                  aria-label="Next image"
                  className={styles.modalArrow}
                  onClick={showNextImage}
                  type="button"
                >
                  &#8594;
                </button>
              </div>

              <div className={styles.modalThumbs} aria-label={`${activeGallery.name} thumbnails`}>
                {activeGallery.images.map((image, index) => (
                  <button
                    aria-label={`Show image ${index + 1} of ${activeGallery.images.length}`}
                    aria-pressed={index === selectedImageIndex}
                    className={index === selectedImageIndex ? styles.activeThumb : undefined}
                    key={image.src}
                    onClick={() => setSelectedImageIndex(index)}
                    type="button"
                  >
                    <Image alt={image.alt} fill sizes="96px" src={image.src} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <section className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.container}>
            <RevealWrapper className={styles.centerHeader}>
              <p className={styles.microLabel}>Scroll-stopping reels</p>
              <h2 id="work-title">Content Built To Make The Customer Pause.</h2>
            </RevealWrapper>

            <div className={styles.workGrid}>
              {workCards.map((work, index) => (
                <RevealWrapper
                  as="article"
                  className={styles.workCard}
                  delay={index * 70}
                  key={work.title}
                >
                  <a href={work.instagramUrl} rel="noopener noreferrer" target="_blank">
                    <Image
                      alt={work.alt}
                      fill
                      sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1180px) calc((100vw - 96px) / 2), (max-width: 1600px) calc((100vw - 120px) / 4), 330px"
                      src={work.image}
                    />
                    <span className={styles.playIcon} aria-hidden="true" />
                    <span className={styles.cardShade} />
                    <span className={styles.workText}>
                      <strong>{work.title}</strong>
                      <em>View Reel</em>
                    </span>
                  </a>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.aboutSection} id="about">
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <RevealWrapper className={styles.aboutImage}>
                <Image
                  alt={aboutImage.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 48vw"
                  src={aboutImage.src}
                />
              </RevealWrapper>

              <RevealWrapper className={styles.aboutCopy} delay={120}>
                <p className={styles.microLabel}>Creative direction</p>
                <h2>
                  Premium Cars Need
                  <br />
                  Premium Attention.
                </h2>
                <p>
                  I create automotive content that makes inventory feel aspirational before a buyer
                  ever visits the showroom. Cinematic reels, detail led photography, and story
                  driven assets built for attention, trust, and sales.
                </p>
              </RevealWrapper>
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="contact" aria-labelledby="contact-title">
          <div className={styles.container}>
            <RevealWrapper className={styles.finalInner}>
              <h2 id="contact-title">
                Great cars have the presence. The right content makes the market feel it.
              </h2>
            </RevealWrapper>
          </div>
        </section>
      </main>
    </div>
  )
}
