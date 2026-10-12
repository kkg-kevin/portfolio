import type { Screenshot } from '../../data/types'
import { cn } from '../../lib/cn'

interface ScreenshotImageProps {
  shot: Screenshot
  /** Load immediately instead of lazily; for images near the top of a page. */
  eager?: boolean
  className?: string
}

/**
 * A screenshot that follows the portfolio theme: when a dark capture exists
 * it is shown in dark theme and the light one in light theme.
 */
export function ScreenshotImage({ shot, eager = false, className }: ScreenshotImageProps) {
  const shared = {
    alt: shot.alt,
    width: shot.width,
    height: shot.height,
    loading: eager ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
  }

  if (!shot.srcDark) return <img src={shot.src} {...shared} className={cn('block h-auto w-full', className)} />

  return (
    <>
      <img src={shot.srcDark} {...shared} className={cn('block h-auto w-full [[data-theme=light]_&]:hidden', className)} />
      <img src={shot.src} {...shared} className={cn('hidden h-auto w-full [[data-theme=light]_&]:block', className)} />
    </>
  )
}
