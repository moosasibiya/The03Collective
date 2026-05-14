import Image from 'next/image'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { ABOUT_PILLARS, ABOUT_STORY } from '@/lib/site-content'
import styles from './AboutScreen.module.css'

export default function AboutScreen() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}
        label="Our Story"
        title={
          <>
            Built Around
            <br />
            Three <em>Standards.</em>
          </>
        }
      />

      <div className={styles.page}>
        <div className="container">
          <RevealWrapper className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.introPanel}>
                <span className={`label ${styles.introLabel}`}>Johannesburg - National Reach</span>
                <p className={styles.lead}>
                  The 03 Collective exists for people who care about how exceptional cars are
                  bought, sold, and represented.
                </p>
                <p className={styles.body}>
                  Our name points to the three standards behind every listing:{' '}
                  <strong>Selection</strong> - we only take on cars that meet the mark.{' '}
                  <strong>Presentation</strong> - every vehicle is shown with the care it deserves.{' '}
                  <strong>Trust</strong> - every buyer and seller gets a clear, direct process.
                </p>
                <p className={styles.body}>
                  We are based in Johannesburg with a national reach. Our buyers are considered,
                  our sellers are selective, and our standard stays consistent from the first
                  conversation to the final handover.
                </p>
                <dl className={styles.metrics} aria-label="About The 03 Collective">
                  <div>
                    <dt>Selective</dt>
                    <dd>Inventory</dd>
                  </div>
                  <div>
                    <dt>Proper</dt>
                    <dd>Presentation</dd>
                  </div>
                  <div>
                    <dt>Direct</dt>
                    <dd>Process</dd>
                  </div>
                </dl>
                <div className={styles.heroActions}>
                  <Button href="/inventory">Browse Inventory</Button>
                  <Button href="/contact" variant="outline">
                    Get in Touch
                  </Button>
                </div>
              </div>

              <div className={styles.visual}>
                <Image
                  alt="Red Porsche 911 GT3 photographed at The 03 Collective"
                  className={styles.visualImage}
                  fill
                  sizes="(max-width: 980px) 100vw, 52vw"
                  src="/media/about-porsche.jpg"
                />
                <div className={styles.visualBg} />
                <span className={styles.cornerTl} />
                <span className={styles.cornerTr} />
                <span className={styles.cornerBl} />
                <span className={styles.cornerBr} />
              </div>
            </div>
          </RevealWrapper>

          <div className={styles.pillarsBand}>
            <div className={styles.pillars}>
              {ABOUT_PILLARS.map((pillar, index) => (
                <RevealWrapper className={styles.pillar} delay={index * 80} key={pillar.number}>
                  <span className={styles.pillarNum}>{pillar.number}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </RevealWrapper>
              ))}
            </div>
          </div>

          <RevealWrapper className={styles.story}>
            <div className={styles.storyInner}>
              <div>
                <span className="label">Our Background</span>
                <h2 className={`sectionTitle ${styles.sectionTitle}`}>
                  Built from
                  <br />
                  Real <em>Experience.</em>
                </h2>
              </div>
              <div className={styles.storyContent}>
                {ABOUT_STORY.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper className={styles.cta}>
            <span className="label">Come See What We Mean</span>
            <h2 className={`sectionTitle ${styles.ctaTitle}`}>
              Find the Right Car
              <br />
              or <em>Sell Yours Properly.</em>
            </h2>
            <div className={styles.heroActions}>
              <Button href="/inventory" size="lg">
                Browse Inventory
              </Button>
              <Button href="/sell" size="lg" variant="outline">
                Sell Your Car
              </Button>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </>
  )
}
