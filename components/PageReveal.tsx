'use client'

import { useEffect, useState } from 'react'
import styles from './PageReveal.module.css'

const HOLD_MS = 520
const REVEAL_MS = 1900
const REDUCED_MOTION_MS = 300

export default function PageReveal() {
  const [state, setState] = useState({
    visible: false,
    reducedMotion: false,
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? REDUCED_MOTION_MS : HOLD_MS + REVEAL_MS
    const showTimer = window.setTimeout(() => setState({ visible: true, reducedMotion }), 0)
    const hideTimer = window.setTimeout(
      () => setState((current) => ({ ...current, visible: false })),
      duration
    )

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!state.visible) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`${styles.reveal} ${state.reducedMotion ? styles.reducedMotion : ''}`}
    >
      <span className={styles.seam} />
      <span className={`${styles.panel} ${styles.left}`} />
      <span className={`${styles.panel} ${styles.right}`} />
    </div>
  )
}
