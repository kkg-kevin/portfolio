import type { ComponentType } from 'react'
import type { Project, ProjectVisualId } from '../../data/types'
import { cn } from '../../lib/cn'
import { ScreenshotImage } from './ScreenshotImage'
import { ChatbotVisual } from './visuals/ChatbotVisual'
import { LmsVisual } from './visuals/LmsVisual'
import { MentorLinkVisual } from './visuals/MentorLinkVisual'
import { MockFrame } from './visuals/MockFrame'
import { WebsiteVisual } from './visuals/WebsiteVisual'

const visuals: Record<ProjectVisualId, { Component: ComponentType; kind: string }> = {
  lms: { Component: LmsVisual, kind: 'Illustrative mockup' },
  website: { Component: WebsiteVisual, kind: 'Illustrative diagram' },
  mentorlink: { Component: MentorLinkVisual, kind: 'Illustrative mockup' },
  chatbot: { Component: ChatbotVisual, kind: 'Illustrative mockup' },
}

const captionClass = 'mt-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3'

interface ProjectVisualProps {
  project: Pick<Project, 'name' | 'visual' | 'screens'>
  /** Load the screenshot immediately; for visuals near the top of a page. */
  eager?: boolean
  className?: string
}

/**
 * Renders the visual for a project: its cover screenshot when it has one,
 * otherwise a visual drawn in code and labelled as illustrative.
 */
export function ProjectVisual({ project, eager, className }: ProjectVisualProps) {
  if (project.screens) {
    const { cover, label } = project.screens
    return (
      <figure className={cn('min-w-0', className)}>
        <MockFrame label={label}>
          <ScreenshotImage shot={cover} eager={eager} />
        </MockFrame>
        <figcaption className={captionClass}>Screenshot · {cover.caption}</figcaption>
      </figure>
    )
  }

  const { Component, kind } = visuals[project.visual]

  return (
    <figure className={cn('min-w-0', className)}>
      <div role="img" aria-label={`${kind} for ${project.name}. Not a screenshot of the real system.`}>
        <div aria-hidden="true">
          <Component />
        </div>
      </div>
      <figcaption className={captionClass}>{kind} · not a real screenshot</figcaption>
    </figure>
  )
}
