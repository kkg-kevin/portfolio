import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import type { Project } from '../../data/types'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { TagList } from '../ui/Tag'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  /** Position in the list, shown as a two-digit index. */
  index: number
  /** For featured cards: place the visual on the left at large widths. */
  mirrored?: boolean
}

export function ProjectCard({ project, index, mirrored = false }: ProjectCardProps) {
  const headingId = `project-${project.slug}`
  const wide = project.featured

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'group h-full rounded-2xl border border-line bg-card p-5 transition-colors duration-300 hover:border-line-strong sm:p-8',
        wide && 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12',
        !wide && 'flex flex-col gap-7',
      )}
    >
      <div className={cn('min-w-0', wide && mirrored && 'lg:order-2', !wide && 'order-2 flex flex-1 flex-col')}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.category}</span>
        </p>
        <h3 id={headingId} className={cn('mt-3 font-semibold tracking-tight text-ink', wide ? 'text-2xl sm:text-3xl' : 'text-2xl')}>
          {project.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink-3">{project.context}</p>
        <p className="mt-4 leading-relaxed text-ink-2">{project.summary}</p>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
              <Check aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-accent" />
              {highlight}
            </li>
          ))}
        </ul>

        <TagList items={project.stack} label={`Technologies used in ${project.name}`} className="mt-6" />

        <div className={cn('mt-7 flex flex-wrap gap-3', !wide && 'mt-auto pt-7')}>
          <ButtonLink to={`/work/${project.slug}`} variant="secondary" size="sm" aria-label={`Read the ${project.name} case study`}>
            Case study
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
          {project.links.map((link) => (
            <ButtonLink key={link.href} href={link.href} external variant="ghost" size="sm">
              {link.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          ))}
        </div>
      </div>

      <ProjectVisual project={project} className={cn(wide && mirrored && 'lg:order-1', !wide && 'order-1')} />
    </article>
  )
}
