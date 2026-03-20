import { MARQUEE_ITEMS } from '@/lib/site-content'
import styles from './Marquee.module.css'

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {items.map((item, index) => (
          <span className={styles.item} key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
