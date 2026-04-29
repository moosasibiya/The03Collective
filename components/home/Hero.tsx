import { existsSync } from 'node:fs'
import path from 'node:path'
import Button from '@/components/ui/Button'
import RevealWrapper from '@/components/ui/RevealWrapper'
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

const HERO_IMAGE = {
  src: '/media/hero-porsche-br.jpg',
  file: path.join(process.cwd(), 'public', 'media', 'hero-porsche-br.jpg'),
}

export default function Hero() {
  const videoSources = HERO_VIDEO_SOURCES.filter((source) => existsSync(source.file))
  const hasHeroImage = existsSync(HERO_IMAGE.file)
  const hasHeroVideo = !hasHeroImage && videoSources.length > 0

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.scene}>
        {hasHeroImage ? (
          <div
            aria-hidden="true"
            className={styles.image}
            style={{ backgroundImage: `url('${HERO_IMAGE.src}')` }}
          />
        ) : null}
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
          <span className={`label ${styles.label}`}>
            The 03 Collective - Johannesburg, South Africa
          </span>
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
      </div>
    </section>
  )
}
