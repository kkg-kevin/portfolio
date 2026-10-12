import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TagProps {
  children: ReactNode
  className?: string
}

/** Small monospace label for technologies and metadata. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-bg-alt px-2 py-1 font-mono text-xs leading-none text-ink-2',
        className,
      )}
    >
      {children}
    </span>
  )
}

interface TagListProps {
  items: readonly string[]
  label: string
  className?: string
}

export function TagList({ items, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}
