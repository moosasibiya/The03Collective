import Link from 'next/link'
import type { Vehicle } from '@/types'
import FeaturesList from '@/components/detail/FeaturesList'
import EnquiryPanel from '@/components/detail/EnquiryPanel'
import MediaGallery from '@/components/detail/MediaGallery'
import RelatedVehicles from '@/components/detail/RelatedVehicles'
import SpecsGrid from '@/components/detail/SpecsGrid'
import PortableText from '@/components/ui/PortableText'
import styles from './VehicleDetailScreen.module.css'

type VehicleDetailScreenProps = {
  relatedVehicles: Vehicle[]
  vehicle: Vehicle
}

export default function VehicleDetailScreen({
  relatedVehicles,
  vehicle,
}: VehicleDetailScreenProps) {
  return (
    <>
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/inventory">Inventory</Link>
            <span>/</span>
            <span className={styles.current}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
        </div>
      </div>

      <MediaGallery vehicle={vehicle} />

      <div className={`container ${styles.body}`}>
        <div className={styles.content}>
          <span className={`label ${styles.label}`}>
            {vehicle.year} | {vehicle.make}
          </span>
          <h1 className={styles.title}>{vehicle.model}</h1>
          <p className={styles.subtitle}>
            {vehicle.colour}
            {vehicle.trim ? ` | ${vehicle.trim}` : ''}
          </p>

          <SpecsGrid vehicle={vehicle} />

          <section className={styles.section}>
            <h2>About This Vehicle</h2>
            <PortableText html={vehicle.descriptionHtml} value={vehicle.description} />
          </section>

          {vehicle.features?.length ? (
            <section className={styles.section}>
              <h2>Features and Equipment</h2>
              <FeaturesList features={vehicle.features} />
            </section>
          ) : null}

          {vehicle.conditionNotes ? (
            <section className={styles.section}>
              <h2>Condition Notes</h2>
              <div className="richText">
                <p>{vehicle.conditionNotes}</p>
              </div>
            </section>
          ) : null}
        </div>

        <EnquiryPanel vehicle={vehicle} />
      </div>

      <section className={styles.relatedBand}>
        <div className="container">
          <RelatedVehicles vehicles={relatedVehicles} />
        </div>
      </section>
    </>
  )
}
