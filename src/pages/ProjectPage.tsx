import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ProjectGallery } from '../components/projects/ProjectGallery'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { TagList } from '../components/ui/Tag'
import { profile } from '../data/profile'
import { getNextProject, getProject } from '../data/projects'
import type { Project } from '../data/types'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { NotFoundPage } from './NotFoundPage'

const labelClass = 'font-mono text-xs uppercase tracking-[0.18em] text-ink-3'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-line pt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink-2">{children}</div>
      </section>
    </Reveal>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function CaseStudy({ project }: { project: Project }) {
  const { caseStudy } = project
  const next = getNextProject(project.slug)

  useDocumentMeta({
    title: `${project.name} case study | ${profile.name}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  })

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <Container>
        <Link
          to="/#work"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All work
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{project.category}</p>
          <h1 className="mt-4 text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            {project.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{project.summary}</p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="min-w-0 space-y-10">
            <ProjectVisual project={project} eager className={project.screens ? undefined : 'max-w-2xl'} />

            <Block title="Overview">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Block>

            {project.screens?.gallery.length ? (
              <Block title="Screens">
                <ProjectGallery shots={project.screens.gallery} className="pt-2" />
              </Block>
            ) : null}

            <Block title="The need">
              <p>{project.purpose}</p>
            </Block>

            <Block title="Goals">
              <BulletList items={caseStudy.goals} />
            </Block>

            <Block title="My role">
              <p>{project.role}</p>
            </Block>

            <Block title="Architecture">
              <ol className="relative space-y-3">
                {caseStudy.architecture.map((item, index) => (
                  <li key={item.layer} className="grid gap-x-5 gap-y-1 rounded-xl border border-line bg-card px-4 py-3.5 sm:grid-cols-[2rem_8rem_1fr] sm:items-baseline">
                    <span aria-hidden="true" className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-ink">{item.layer}</span>
                    <span className="text-[0.9375rem]">{item.detail}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Key implementation decisions">
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {caseStudy.decisions.map((decision) => (
                  <div key={decision.title}>
                    <dt className="font-medium text-ink">{decision.title}</dt>
                    <dd className="mt-1.5 text-[0.9375rem]">{decision.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title="Main functionality">
              <TagList items={caseStudy.functionality} label="Main functionality" className="gap-2" />
            </Block>

            {caseStudy.challenges?.length ? (
              <Block title="Challenges and trade-offs">
                <BulletList items={caseStudy.challenges} />
              </Block>
            ) : null}

            {caseStudy.lessons?.length ? (
              <Block title="Results and lessons">
                <BulletList items={caseStudy.lessons} />
              </Block>
            ) : null}
          </div>

          <aside aria-label="Project details" className="lg:sticky lg:top-24 lg:self-start">
            <dl className="space-y-6 rounded-2xl border border-line bg-card p-6">
              <div>
                <dt className={labelClass}>Context</dt>
                <dd className="mt-2 text-ink">{project.context}</dd>
              </div>
              <div>
                <dt className={labelClass}>Technologies</dt>
                <dd className="mt-3">
                  <TagList items={project.stack} label="Technologies" />
                </dd>
              </div>
              <div>
                <dt className={labelClass}>Links</dt>
                <dd className="mt-3">
                  {project.links.length > 0 ? (
                    <ul className="space-y-2">
                      {project.links.map((link) => (
                        <li key={link.href}>
                          <ButtonLink href={link.href} external variant="secondary" size="sm" className="w-full">
                            {link.label}
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                            <span className="sr-only">(opens in a new tab)</span>
                          </ButtonLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-ink-2">No public demo or repository is linked for this project.</p>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-2xl border border-line p-6 text-sm leading-relaxed text-ink-2">
              <p className="flex items-center gap-2 font-medium text-ink">
                <Lock aria-hidden="true" className="size-4 text-ink-3" />
                About this case study
              </p>
              <p className="mt-3">
                The facts here come from my CV. The architecture summary is a simplified description of how the parts fit
                together.
              </p>
              {project.confidentiality ? <p className="mt-3">{project.confidentiality}</p> : null}
            </div>
          </aside>
        </div>

        <nav aria-label="More work" className="mt-20 border-t border-line pt-10">
          <p className={labelClass}>Next project</p>
          <Link
            to={`/work/${next.slug}`}
            className="group mt-4 flex items-center justify-between gap-6 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong sm:p-8"
          >
            <span className="min-w-0">
              <span className="block font-mono text-xs text-ink-3">{next.category}</span>
              <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{next.name}</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-6 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </nav>
      </Container>
    </article>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFoundPage />
  // Keyed so scroll-in animations replay when moving between case studies.
  return <CaseStudy key={project.slug} project={project} />
}
