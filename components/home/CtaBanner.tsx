import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
import styles from './CtaBanner.module.css'

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <RevealWrapper as="h2" className={`sectionTitle ${styles.title}`}>
          Ready to Find Your
          <br />
          <em>Next Car?</em>
        </RevealWrapper>
        <RevealWrapper as="p" className={styles.subtitle} delay={100}>
          Or sell the one you have. Either way, you&apos;re in the right place.
        </RevealWrapper>
        <RevealWrapper className={styles.actions} delay={180}>
          <Button href="/inventory" size="lg" variant="dark">
            Browse Inventory
          </Button>
          <Button href="/sell" size="lg">
            Sell Your Car
          </Button>
        </RevealWrapper>
      </div>
    </section>
  )
}
