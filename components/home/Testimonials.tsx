'use client'

import { useEffect, useState } from 'react'
import type { Testimonial } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { cn } from '@/utils/cn'
import styles from './Testimonials.module.css'

type TestimonialsProps = {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const current = testimonials[index]

  if (!current) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <RevealWrapper className={styles.wrap}>
          <span className={styles.quote}>&quot;</span>
          <p className={styles.text}>{current.quote}</p>
          <div className={styles.author}>
            <div className={styles.line} />
            <span>
              {current.author}
              {current.location ? ` - ${current.location}` : ''}
            </span>
            <div className={styles.line} />
          </div>
          <div className={styles.dots}>
            {testimonials.map((testimonial, dotIndex) => (
              <button
                aria-label={`Show testimonial ${dotIndex + 1}`}
                className={cn(styles.dot, dotIndex === index && styles.active)}
                key={testimonial._id}
                onClick={() => setIndex(dotIndex)}
                type="button"
              />
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
