import type { Route } from 'next'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import styles from './MobileMenu.module.css'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  pathname: string
}

const links = [
  { href: '/' as Route, label: 'Home' },
  { href: '/inventory' as Route, label: 'Inventory' },
  { href: '/sell' as Route, label: 'Sell Your Car' },
  { href: '/about' as Route, label: 'About' },
  { href: '/contact' as Route, label: 'Contact' },
]

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <div className={cn(styles.menu, open && styles.open)}>
      <button aria-label="Close menu" className={styles.close} onClick={onClose} type="button">
        x
      </button>
      <div className={styles.brand}>
        <span className={styles.brandNumeral}>03</span>
        <div className={styles.brandDivider} />
        <div className={styles.brandStack}>
          <span className={styles.brandThe}>The</span>
          <span className={styles.brandWord}>Collective</span>
        </div>
      </div>
      <nav className={styles.nav}>
        {links.map((link) => {
          const active =
            link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(`${link.href}/`)

          return (
            <Link
              key={link.href}
              className={cn(styles.link, active && styles.active)}
              href={link.href}
              onClick={onClose}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
