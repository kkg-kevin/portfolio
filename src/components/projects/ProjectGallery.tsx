import type { Screenshot } from '../../data/types'
import { cn } from '../../lib/cn'
import { ScreenshotImage } from './ScreenshotImage'

function Shot({ shot }: { shot: Screenshot }) {
  return (
    <li>
      <figure>
        <a
          href={shot.src}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-xl border border-line bg-bg-alt transition-colors hover:border-line-strong"
        >
          <ScreenshotImage shot={shot} />
          <span className="sr-only">(opens the full-size image in a new tab)</span>
        </a>
        <figcaption className="mt-2.5 text-sm text-ink-3">{shot.caption}</figcaption>
      </figure>
    </li>
  )
}

interface ProjectGalleryProps {
  shots: Screenshot[]
  className?: string
}

/** Screenshot grid for a case study: desktop captures two across, phone captures four across. */
export function ProjectGallery({ shots, className }: ProjectGalleryProps) {
  const desktop = shots.filter((shot) => shot.width >= shot.height)
  const phone = shots.filter((shot) => shot.width < shot.height)

  return (
    <div className={cn('space-y-6', className)}>
      {desktop.length > 0 ? (
        <ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
          {desktop.map((shot) => (
            <Shot key={shot.src} shot={shot} />
          ))}
        </ul>
      ) : null}
      {phone.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
          {phone.map((shot) => (
            <Shot key={shot.src} shot={shot} />
          ))}
        </ul>
      ) : null}
    </div>
  )
}
