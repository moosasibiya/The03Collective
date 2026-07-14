import type { Vehicle } from '@/types'
import { formatMileage } from '@/utils/format'
import styles from './SpecsGrid.module.css'

type SpecsGridProps = {
  vehicle: Vehicle
}

const iconMap = {
  power: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  torque: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </>
  ),
  drive: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  acceleration: <path d="M5 12h14M12 5l7 7-7 7" />,
  mileage: <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 4v4l3 2" />,
  fuel: (
    <path d="M3 22V6a2 2 0 012-2h10a2 2 0 012 2v1h1a2 2 0 012 2v3a2 2 0 01-2 2h-1v6a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  ),
} as const

const labels = {
  power: 'Power',
  torque: 'Torque',
  drive: 'Drive',
  acceleration: '0 - 100 km/h',
  mileage: 'Mileage',
  fuel: 'Fuel Type',
} as const

export default function SpecsGrid({ vehicle }: SpecsGridProps) {
  const entries = [
    ['power', vehicle.specs?.power],
    ['torque', vehicle.specs?.torque],
    ['drive', vehicle.specs?.drive],
    ['acceleration', vehicle.specs?.acceleration],
    ['mileage', formatMileage(vehicle.mileage)],
    ['fuel', vehicle.fuel || 'Petrol'],
  ].filter((entry): entry is [keyof typeof labels, string] => Boolean(entry[1]))

  return (
    <div className={styles.grid}>
      {entries.map(([key, value]) => (
        <div className={styles.item} key={key}>
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            {iconMap[key]}
          </svg>
          <span className={styles.label}>{labels[key]}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  )
}
