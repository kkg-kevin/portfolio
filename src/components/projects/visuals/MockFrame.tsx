import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn'

interface MockFrameProps {
  /** Short path-style label shown in the window bar. */
  label: string
  children: ReactNode
  className?: string
}

/** Window chrome shared by the illustrative project mockups. */
export function MockFrame({ label, children, className }: MockFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-bg-alt', className)}>
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </div>
        <span className="truncate font-mono text-[0.6875rem] text-ink-3">{label}</span>
      </div>
      {children}
    </div>
  )
}

interface BarProps {
  className?: string
}

/** Placeholder line standing in for text that is deliberately not shown. */
export function Bar({ className }: BarProps) {
  return <span className={cn('block h-2 rounded-full bg-line', className)} />
}
