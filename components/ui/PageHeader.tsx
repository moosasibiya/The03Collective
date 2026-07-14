import type { ReactNode } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import styles from './PageHeader.module.css'

type Crumb = {
  label: string
  href?: string
}

type PageHeaderProps = {
  label: string
  title: ReactNode
  description?: string
  breadcrumbs: Crumb[]
}

export default function PageHeader({ label, title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          {breadcrumbs.map((crumb, index) => {
            const isCurrent = index === breadcrumbs.length - 1

            return (
              <span key={`${crumb.label}-${index}`} className={styles.crumbWrap}>
                {crumb.href && !isCurrent ? (
                  <Link className={styles.crumb} href={crumb.href as Route}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isCurrent ? styles.current : styles.crumb}>{crumb.label}</span>
                )}
                {!isCurrent ? <span className={styles.separator}>/</span> : null}
              </span>
            )
          })}
        </nav>
        <span className="label">{label}</span>
        <h1 className={`sectionTitle ${styles.title}`}>{title}</h1>
        {description ? <p className="sectionSub">{description}</p> : null}
      </div>
    </header>
  )
}
