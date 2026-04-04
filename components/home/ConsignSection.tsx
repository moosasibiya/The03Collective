import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { HOME_CONSIGN_BENEFITS, SITE_CONTACT } from '@/lib/site-content'
import { buildWhatsApp } from '@/utils/format'
import styles from './ConsignSection.module.css'

export default function ConsignSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <RevealWrapper className={styles.visual}>
            <div className={styles.visualBg} />
            <span className={styles.cornerTl} />
            <span className={styles.cornerBr} />
          </RevealWrapper>

          <RevealWrapper delay={120}>
            <span className={`label ${styles.eyebrow}`}>Sell Your Car</span>
            <h2 className={`sectionTitle ${styles.title}`}>
              Your Car Deserves Better
              <br />
              Than a <em>Classifieds Listing.</em>
            </h2>
            <p className="sectionSub">Most vehicles are undersold because they are poorly presented. We fix that.</p>

            <ul className="benefits" style={{ marginTop: 28, marginBottom: 36 }}>
              {HOME_CONSIGN_BENEFITS.map((benefit) => (
                <li className="benefit" key={benefit}>
                  <span className="benefitIcon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="benefitText">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Button href="/sell" size="lg">
                Start the Process {'->'}
              </Button>
              <Button
                external
                href={buildWhatsApp(
                  SITE_CONTACT.whatsappNumber,
                  "Hi, I'd like to consign my car with The 03 Collective."
                )}
                size="lg"
                variant="ghost"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
