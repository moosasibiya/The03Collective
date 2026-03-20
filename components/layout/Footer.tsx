import Link from 'next/link'
import Button from '@/components/ui/Button'
import { SITE_CONTACT } from '@/lib/site-content'
import { buildWhatsApp } from '@/utils/format'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.logo}>
            <span className={styles.logoNumeral}>03</span>
            <div className={styles.logoDivider} />
            <div className={styles.logoStack}>
              <span className={styles.logoThe}>The</span>
              <span className={styles.logoWord}>Collective</span>
            </div>
          </div>
          <p className={styles.tagline}>
            A curated automotive collective for buyers who care about quality, and sellers who
            care about results.
          </p>
          <div className={styles.social}>
            <a aria-label="Instagram" href={SITE_CONTACT.instagramUrl} rel="noreferrer" target="_blank">
              IG
            </a>
            <a aria-label="Facebook" href={SITE_CONTACT.facebookUrl} rel="noreferrer" target="_blank">
              FB
            </a>
            <a aria-label="TikTok" href={SITE_CONTACT.tiktokUrl} rel="noreferrer" target="_blank">
              TT
            </a>
          </div>
        </div>

        <div>
          <span className={styles.columnTitle}>Navigate</span>
          <ul className={styles.links}>
            <li>
              <Link href="/inventory">Inventory</Link>
            </li>
            <li>
              <Link href="/sell">Sell Your Car</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <span className={styles.columnTitle}>Inventory</span>
          <ul className={styles.links}>
            <li>
              <Link href="/inventory">All Vehicles</Link>
            </li>
            <li>
              <Link href="/inventory?status=available">Available Now</Link>
            </li>
            <li>
              <Link href="/inventory?status=sold">Sold Archive</Link>
            </li>
          </ul>
        </div>

        <div>
          <span className={styles.columnTitle}>Contact</span>
          <div className={styles.contactItem}>
            <span>{SITE_CONTACT.phoneDisplay}</span>
          </div>
          <div className={styles.contactItem}>
            <span>{SITE_CONTACT.location[0]}</span>
          </div>
          <Button
            external
            href={buildWhatsApp(SITE_CONTACT.whatsappNumber, 'Hi The 03 Collective.')}
            size="sm"
            variant="wa"
          >
            WhatsApp
          </Button>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>Copyright {new Date().getFullYear()} The 03 Collective</span>
        <span>Johannesburg, South Africa</span>
      </div>
    </footer>
  )
}
