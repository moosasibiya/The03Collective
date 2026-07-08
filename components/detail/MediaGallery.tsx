'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const active = gallery[activeIndex]
  const hasMultiple = gallery.length > 1
  const activeWidth = active?.asset.metadata?.dimensions.width ?? 1600
  const activeHeight = active?.asset.metadata?.dimensions.height ?? 1000

  function goToNext() {
    setActiveIndex((current) => (current + 1) % gallery.length)
  }

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length)
  }

  useEffect(() => {
    if (!isLightboxOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false)
      }

      if (!hasMultiple) {
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current + 1) % gallery.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [gallery.length, hasMultiple, isLightboxOpen])

  return (
    <section className={styles.media}>
      <div className={`container ${styles.shell}`}>
        <div className={styles.frame}>
          <div className={styles.main}>
            <div className={styles.mainInner}>
              <button
                aria-label="Open larger photo gallery"
                className={styles.mainTrigger}
                onClick={() => setIsLightboxOpen(true)}
                type="button"
              >
                {active?.asset.url ? (
                  <span className={styles.mediaCanvas}>
                    <Image
                      alt={active.alt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className={styles.image}
                      height={activeHeight}
                      priority
                      sizes="(max-width: 1320px) 100vw, 1280px"
                      src={active.asset.url}
                      width={activeWidth}
                    />
                  </span>
                ) : (
                  <div
                    className={styles.visual}
                    style={{
                      background: getVehicleThemeStyle(`${vehicle.slug.current}-${activeIndex}`),
                    }}
                  />
                )}
                <span className={styles.expandHint}>View larger</span>
              </button>
            </div>

            {hasMultiple ? (
              <>
                <button
                  aria-label="View previous photo"
                  className={cn(styles.navButton, styles.prev)}
                  onClick={goToPrevious}
                  type="button"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  aria-label="View next photo"
                  className={cn(styles.navButton, styles.next)}
                  onClick={goToNext}
                  type="button"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className={styles.counter}>
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(gallery.length).padStart(2, '0')}</span>
                </div>
              </>
            ) : null}
          </div>
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
                  sizes="(max-width: 720px) 50vw, 240px"
                  src={item.asset.url}
                />
              ) : (
                <div
                  className={styles.thumbVisual}
                  style={{
                    background: getVehicleThemeStyle(`${vehicle.slug.current}-thumb-${index}`),
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              aria-modal="true"
              className={styles.lightbox}
              onClick={() => setIsLightboxOpen(false)}
              role="dialog"
            >
              <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
                <div className={styles.lightboxHeader}>
                  <div className={styles.lightboxMeta}>
                    <span className={styles.lightboxEyebrow}>Photo Gallery</span>
                    <span className={styles.lightboxTitle}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                  </div>

                  <div className={styles.lightboxHeaderActions}>
                    <div className={styles.lightboxCount}>
                      <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                      <span>/</span>
                      <span>{String(gallery.length).padStart(2, '0')}</span>
                    </div>

                    <button
                      aria-label="Close photo gallery"
                      className={styles.lightboxClose}
                      onClick={() => setIsLightboxOpen(false)}
                      type="button"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={styles.lightboxStage}>
                  {active?.asset.url ? (
                    <div className={styles.lightboxViewport}>
                      <Image
                        alt={active.alt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className={styles.lightboxImage}
                        height={activeHeight}
                        priority
                        sizes="100vw"
                        src={active.asset.url}
                        width={activeWidth}
                      />
                    </div>
                  ) : (
                    <div
                      className={styles.visual}
                      style={{
                        background: getVehicleThemeStyle(
                          `${vehicle.slug.current}-lightbox-${activeIndex}`
                        ),
                      }}
                    />
                  )}

                  {hasMultiple ? (
                    <>
                      <button
                        aria-label="View previous photo"
                        className={cn(styles.navButton, styles.lightboxNav, styles.prev)}
                        onClick={goToPrevious}
                        type="button"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        aria-label="View next photo"
                        className={cn(styles.navButton, styles.lightboxNav, styles.next)}
                        onClick={goToNext}
                        type="button"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  )
}
