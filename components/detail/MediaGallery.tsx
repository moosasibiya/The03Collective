'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Vehicle } from '@/types'
import { getVehicleThemeStyle } from '@/lib/site-data'
import { cn } from '@/utils/cn'
import styles from './MediaGallery.module.css'

type MediaGalleryProps = {
  vehicle: Vehicle
}

export default function MediaGallery({ vehicle }: MediaGalleryProps) {
  const gallery = vehicle.images?.length
    ? vehicle.images
    : new Array(4).fill(null).map((_, index) => ({
        asset: { url: '', metadata: { dimensions: { width: 1600, height: 1000 } } },
        alt: `${vehicle.make} ${vehicle.model} view ${index + 1}`,
      }))

  const [activeIndex, setActiveIndex] = useState(0)
  const active = gallery[activeIndex]

  return (
    <section className={styles.media}>
      <div className={styles.main}>
        {active?.asset.url ? (
          <Image
            alt={active.alt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className={styles.image}
            fill
            priority
            sizes="100vw"
            src={active.asset.url}
          />
        ) : (
          <div
            className={styles.visual}
            style={{ background: getVehicleThemeStyle(`${vehicle.slug.current}-${activeIndex}`) }}
          />
        )}
      </div>

      <div className={styles.thumbs}>
        {gallery.map((item, index) => (
          <button
            className={cn(styles.thumb, index === activeIndex && styles.active)}
            key={`${vehicle._id}-${index}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            {item.asset.url ? (
              <Image
                alt={item.alt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className={styles.thumbImage}
                fill
                sizes="160px"
                src={item.asset.url}
              />
            ) : (
              <div
                className={styles.thumbVisual}
                style={{ background: getVehicleThemeStyle(`${vehicle.slug.current}-thumb-${index}`) }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
