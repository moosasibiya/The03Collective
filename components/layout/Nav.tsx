'use client'

import { useState } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import MobileMenu from './MobileMenu'
import styles from './Nav.module.css'

const links = [
  { href: '/inventory' as Route, label: 'Inventory' },
  { href: '/sell' as Route, label: 'Sell Your Car' },
  { href: '/about' as Route, label: 'About' },
  { href: '/contact' as Route, label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const onHome = pathname === '/'

  return (
    <>
      <header
        className={cn(
          styles.nav,
          onHome && !scrolled && styles.inverse,
          scrolled && styles.scrolled
        )}
      >
        <div className={`container ${styles.inner}`}>
          <Link className={styles.logo} href="/">
            <span className={styles.logoThe}>The</span>
            <span className={styles.logoNumeral}>03</span>
            <span className={styles.logoCollective}>Collective</span>
          </Link>

          <nav className={styles.links}>
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <Link
                  key={link.href}
                  className={cn(styles.link, active && styles.active)}
                  href={link.href}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className={styles.cta}>
            <Button className={styles.navGhost} href="/sell" size="sm" variant="ghost">
              Sell Your Car
            </Button>
            <Button className={styles.navOutline} href="/inventory" size="sm" variant="outline">
              Browse Inventory
            </Button>
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Open menu"
            className={styles.hamburger}
            onClick={() => setOpen(true)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  )
}
