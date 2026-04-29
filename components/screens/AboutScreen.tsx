import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { ABOUT_PILLARS, ABOUT_STORY, TEAM_MEMBERS } from '@/lib/site-content'
import styles from './AboutScreen.module.css'

export default function AboutScreen() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}
        label="Our Story"
        title={
          <>
            We Started with
            <br />
            Three <em>Principles.</em>
          </>
        }
      />

      <div className={styles.page}>
        <div className="container">
          <RevealWrapper className={styles.hero}>
            <div className={styles.heroInner}>
              <div>
                <p className={styles.lead}>
                  The 03 Collective was built on a simple belief: that automotive transactions
                  should not feel transactional.
                </p>
                <p className={styles.body}>
                  The name says it. Three principles, held to without compromise:{' '}
                  <strong>Selection</strong> - we do not list everything, we list what is worth
                  listing. <strong>Presentation</strong> - every vehicle deserves to be seen
                  properly. <strong>Trust</strong> - no games, no pressure, no small print
                  surprises.
                </p>
                <p className={styles.body}>
                  We are based in Johannesburg, but our reach is national. Our buyers are
                  discerning. Our sellers care about how their car is represented. And our standard
                  does not move.
                </p>
                <div className={styles.heroActions}>
                  <Button href="/inventory">Browse Inventory</Button>
                  <Button href="/contact" variant="outline">
                    Get in Touch
                  </Button>
                </div>
              </div>

              <div className={styles.visual}>
                <div className={styles.visualBg} />
                <span className={styles.cornerTl} />
                <span className={styles.cornerTr} />
                <span className={styles.cornerBl} />
                <span className={styles.cornerBr} />
                <div className={styles.visualCenter}>
                  <span className={styles.visualThe}>The</span>
                  <span className={styles.visualNum}>03</span>
                  <span className={styles.visualWord}>Collective</span>
                  <div className={styles.visualRule}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
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
                  From Passion
                  <br />
                  to <em>Practice.</em>
                </h2>
              </div>
              <div className={styles.storyContent}>
                {ABOUT_STORY.map((paragraph, index) => (
                  <p className={index === 0 ? styles.storyLead : undefined} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper className={styles.team}>
            <span className="label">The People</span>
            <h2 className={`sectionTitle ${styles.sectionTitle}`}>
              The Team
              <br />
              Behind the <em>Standard.</em>
            </h2>

            <div className={styles.teamGrid}>
              {TEAM_MEMBERS.map((member, index) => (
                <article className={styles.teamCard} key={member.name}>
                  <div className={styles.teamImage} data-theme={index + 1} />
                  <div className={styles.teamInfo}>
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                    <p>{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper className={styles.cta}>
            <span className="label">Come See What We Mean</span>
            <h2 className={`sectionTitle ${styles.ctaTitle}`}>
              Find Your Next Car
              <br />
              or <em>Sell the One You Have.</em>
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
