import type { ReactNode } from 'react'
import { m } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  /** Seconds to wait before animating, for simple staggering. */
  delay?: number
  className?: string
}

/** Fades content up once as it enters the viewport. Honours reduced-motion via MotionConfig. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay }}
    >
      {children}
    </m.div>
  )
}
