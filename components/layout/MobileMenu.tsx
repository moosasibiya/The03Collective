'use client'

import { useEffect, useRef } from 'react'
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
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousActiveElement?.focus()
    }
  }, [open, onClose])

  return (
    <div aria-hidden={!open} className={cn(styles.menu, open && styles.open)} onClick={onClose}>
      <div
        aria-label="Site navigation"
        aria-modal="true"
        className={styles.panel}
        id="mobile-menu"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className="srOnly">Site navigation</h2>
        <button
          aria-label="Close menu"
          className={styles.close}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          x
        </button>
        <div className={styles.brand}>
          <span className={styles.brandThe}>The</span>
          <span className={styles.brandNumeral}>03</span>
          <span className={styles.brandWord}>Collective</span>
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
    </div>
  )
}
