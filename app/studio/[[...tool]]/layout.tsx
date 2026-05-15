import type { Metadata } from 'next'
import styles from './StudioApp.module.css'

export const metadata: Metadata = {
  title: 'Studio - The 03 Collective',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.studioShell}>{children}</div>
}
