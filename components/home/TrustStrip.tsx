import RevealWrapper from '@/components/ui/RevealWrapper'
import { TRUST_ITEMS } from '@/lib/site-content'
import styles from './TrustStrip.module.css'

function Icon({ type }: { type: string }) {
  if (type === 'eye') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }

  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  if (type === 'person') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

export default function TrustStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {TRUST_ITEMS.map((item, index) => (
            <RevealWrapper className={styles.item} delay={index * 80} key={item.title}>
              <div className={styles.icon}>
                <Icon type={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
