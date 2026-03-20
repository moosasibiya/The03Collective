import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { HERO_STATS } from '@/lib/site-content'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.scene}>
        <div className={styles.glow} />
      </div>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <RevealWrapper className={styles.copy}>
          <span className={`label ${styles.label}`}>The 03 Collective - Johannesburg, South Africa</span>
          <h1 className={styles.title}>
            Every Car
            <br />
            Here <em>Earned</em>
            <br />
            Its Place.
          </h1>
          <p className={styles.subtitle}>
            Premium vehicles. Curated selection.
            <br />
            Personal service - not a number in a queue.
          </p>
          <div className={styles.actions}>
            <Button href="/inventory" size="lg">
              Browse Inventory {'->'}
            </Button>
            <Button href="/sell" size="lg" variant="ghost">
              Sell Your Car
            </Button>
          </div>
        </RevealWrapper>

        <div className={styles.scroll}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>

        <RevealWrapper className={styles.stats} delay={160}>
          {HERO_STATS.map((item) => (
            <div className={styles.stat} key={item.label}>
              <span className={styles.statValue}>{item.value}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </RevealWrapper>
      </div>
    </section>
  )
}
