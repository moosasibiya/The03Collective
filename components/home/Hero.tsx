import { existsSync } from 'node:fs'
import path from 'node:path'
import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { HERO_STATS } from '@/lib/site-content'
import styles from './Hero.module.css'

const HERO_VIDEO_SOURCES = [
  {
    src: '/media/hero-background.webm',
    type: 'video/webm',
    file: path.join(process.cwd(), 'public', 'media', 'hero-background.webm'),
  },
  {
    src: '/media/hero-background.mp4',
    type: 'video/mp4',
    file: path.join(process.cwd(), 'public', 'media', 'hero-background.mp4'),
  },
]

export default function Hero() {
  const videoSources = HERO_VIDEO_SOURCES.filter((source) => existsSync(source.file))
  const hasHeroVideo = videoSources.length > 0

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.scene}>
        {hasHeroVideo ? (
          <video
            aria-hidden="true"
            autoPlay
            className={styles.video}
            loop
            muted
            playsInline
            preload="metadata"
          >
            {videoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : null}
        <div className={styles.sceneTint} />
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
