import type { VehicleStatus } from '@/types'
import { cn } from '@/utils/cn'
import styles from './Badge.module.css'

type BadgeProps = {
  status: VehicleStatus
  className?: string
}

const labels = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  comingSoon: 'Coming Soon',
  hidden: 'Hidden',
} as const

export default function Badge({ status, className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[status], className)}>{labels[status]}</span>
}
