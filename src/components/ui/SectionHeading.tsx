import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  /** Id for the heading, referenced by the section's aria-labelledby. */
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">{description}</p> : null}
    </div>
  )
}
