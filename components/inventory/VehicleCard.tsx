import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { Vehicle } from '@/types'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { SITE_CONTACT } from '@/lib/site-content'
import { getVehicleThemeStyle } from '@/lib/site-data'
import { cn } from '@/utils/cn'
import { buildWhatsApp, formatMileage, formatPrice } from '@/utils/format'
import styles from './VehicleCard.module.css'

type VehicleCardProps = {
  vehicle: Vehicle
  index: number
  tone?: 'dark' | 'light'
}

export default function VehicleCard({ vehicle, index, tone = 'dark' }: VehicleCardProps) {
  const href = `/inventory/${vehicle.slug.current}` as Route
  const theme = getVehicleThemeStyle(vehicle.slug.current || index)
  const isSold = vehicle.status === 'sold'
  const isReserved = vehicle.status === 'reserved'
  const whatsappMessage =
    vehicle.whatsappMessage ??
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`

  return (
    <article className={cn(styles.card, tone === 'light' && styles.lightCard)}>
      <div className={styles.topLine} />
      <div className={styles.imageWrap}>
        {vehicle.mainImage?.asset.url ? (
          <Image
            alt={vehicle.mainImage.alt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={vehicle.mainImage.asset.url}
          />
        ) : (
          <div className={styles.visual} style={{ background: theme }} />
        )}

        {isSold ? (
          <div className={styles.soldOverlay}>
            <div className={styles.soldStamp}>Sold</div>
          </div>
        ) : null}

        <Badge className={styles.badge} status={vehicle.status} />

        <div className={styles.overlay}>
          <Button href={href} size="sm" variant={isReserved ? 'outline' : 'primary'}>
            View Details {'->'}
          </Button>
          <Button
            external
            href={buildWhatsApp(
              SITE_CONTACT.whatsappNumber,
              isSold
                ? `Hi, I'm looking for something similar to the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
                : whatsappMessage
            )}
            size="sm"
            variant={isSold ? 'wa' : isReserved ? 'ghost' : 'wa'}
          >
            {isSold ? 'Similar' : isReserved ? 'Waiting List' : 'Enquire'}
          </Button>
        </div>
      </div>

      <Link className={styles.body} href={href}>
        <div className={styles.meta}>
          <span>{vehicle.year}</span>
          <span className={styles.separator}>.</span>
          <span>{formatMileage(vehicle.mileage)}</span>
          <span className={styles.separator}>.</span>
          <span>{vehicle.transmission || 'Automatic'}</span>
        </div>
        <h3 className={styles.title}>
          {vehicle.make} {vehicle.model}
        </h3>
        <p className={styles.subtitle}>
          {vehicle.colour}
          {vehicle.trim ? ` | ${vehicle.trim}` : ''}
        </p>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.currency}>R</span>
            <span className={styles.amount}>{formatPrice(vehicle.price)}</span>
          </div>
          <span className={styles.arrow}>{'->'}</span>
        </div>
      </Link>
    </article>
  )
}
