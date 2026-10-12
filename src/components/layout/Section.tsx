import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  /** Id of the heading that names this section. */
  labelledBy: string
  children: ReactNode
  /** Alternate band with a slightly lighter background and hairline borders. */
  tinted?: boolean
  className?: string
}

/** A page section that anchor links can scroll to and move focus into. */
export function Section({ id, labelledBy, children, tinted = false, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={-1}
      className={cn('py-20 sm:py-28', tinted && 'border-y border-line/70 bg-bg-alt', className)}
    >
      <Container>{children}</Container>
    </section>
  )
}
