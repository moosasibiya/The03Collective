import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost' | 'outline' | 'wa' | 'dark' | 'darkOutline'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
  block?: boolean
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    href: string
    external?: boolean
  }

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

function getClassName(variant: Variant, size: Size, block: boolean, className?: string) {
  return cn(styles.button, styles[variant], styles[size], block && styles.block, className)
}

export default function Button(props: LinkProps | NativeButtonProps) {
  if ('href' in props) {
    const {
      href,
      external,
      variant = 'primary',
      size = 'md',
      block = false,
      className,
      children,
      ...rest
    } = props
    const classes = getClassName(variant, size, block, className)

    if (
      external ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return (
        <a
          className={classes}
          href={href}
          rel={rest.target === '_blank' ? 'noopener noreferrer' : rest.rel}
          {...rest}
        >
          {children}
        </a>
      )
    }

    return (
      <Link className={classes} href={href as Route} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant = 'primary', size = 'md', block = false, className, children, ...rest } = props
  const classes = getClassName(variant, size, block, className)

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
