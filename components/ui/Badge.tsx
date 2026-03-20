import { cn } from '@/utils/cn'
import styles from './Badge.module.css'

type BadgeProps = {
  status: 'available' | 'reserved' | 'sold'
  className?: string
}

const labels = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
} as const

export default function Badge({ status, className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[status], className)}>{labels[status]}</span>
}
