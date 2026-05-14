'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'
import styles from './StudioApp.module.css'

export default function StudioApp() {
  return (
    <div className={styles.studioShell}>
      <NextStudio config={config} />
    </div>
  )
}
