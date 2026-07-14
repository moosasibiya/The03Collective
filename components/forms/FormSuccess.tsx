import Button from '@/components/ui/Button'
import styles from './FormSuccess.module.css'

type FormSuccessProps = {
  title: string
  description: string
  actionLabel?: string
  onReset?: () => void
  compact?: boolean
}

export default function FormSuccess({
  title,
  description,
  actionLabel,
  onReset,
  compact = false,
}: FormSuccessProps) {
  return (
    <div
      aria-live="polite"
      className={`${styles.success} ${compact ? styles.compact : ''}`.trim()}
      role="status"
    >
      <div className={styles.check}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onReset ? (
        <Button
          className={styles.button}
          onClick={onReset}
          size="sm"
          type="button"
          variant="outline"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
