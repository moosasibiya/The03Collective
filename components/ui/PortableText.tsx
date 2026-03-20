import { PortableText as PortableTextRenderer } from '@portabletext/react'
import { cn } from '@/utils/cn'

type PortableTextProps = {
  value?: unknown[]
  html?: string
  className?: string
}

export default function PortableText({ value, html, className }: PortableTextProps) {
  if (html) {
    return <div className={cn('richText', className)} dangerouslySetInnerHTML={{ __html: html }} />
  }

  if (!value?.length) {
    return null
  }

  return (
    <div className={cn('richText', className)}>
      <PortableTextRenderer
        value={value as never}
        components={{
          block: {
            normal: ({ children }) => <p>{children}</p>,
          },
        }}
      />
    </div>
  )
}
