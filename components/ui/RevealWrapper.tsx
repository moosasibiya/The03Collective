'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/utils/cn'
import styles from './RevealWrapper.module.css'

type RevealWrapperProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

export default function RevealWrapper({
  as: Component = 'div',
  children,
  className,
  delay = 0,
  style,
}: RevealWrapperProps) {
  const { ref, revealed } = useReveal<HTMLElement>()

  return (
    <Component
      className={cn(styles.reveal, revealed && styles.visible, className)}
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
