import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Centred content column with responsive side padding. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}
