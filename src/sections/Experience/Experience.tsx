import { Code2, GraduationCap } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { TagList } from '../../components/ui/Tag'
import { experience } from '../../data/experience'
import type { ExperienceEntry } from '../../data/types'
import { cn } from '../../lib/cn'

const kinds: Record<ExperienceEntry['kind'], { label: string; icon: typeof Code2; className: string }> = {
  engineering: { label: 'Engineering', icon: Code2, className: 'border-accent/40 text-accent' },
  mentoring: { label: 'Teaching and mentoring', icon: GraduationCap, className: 'border-mint/40 text-mint' },
}

function ExperienceItem({ entry, isLast }: { entry: ExperienceEntry; isLast: boolean }) {
  const kind = kinds[entry.kind]

  return (
    <li className="relative pb-12 pl-12 last:pb-0">
      {/* Timeline rail and node */}
      {!isLast ? <span aria-hidden="true" className="absolute bottom-0 left-[0.9375rem] top-9 w-px bg-line" /> : null}
      <span
        aria-hidden="true"
        className={cn('absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border bg-bg', kind.className)}
      >
        <kind.icon className="size-4" strokeWidth={1.75} />
      </span>

      <Reveal className="grid gap-x-10 gap-y-3 md:grid-cols-[13rem_1fr]">
      <div className="md:pt-1">
        <p className="font-mono text-xs text-ink-2">{entry.period}</p>
        <p className={cn('mt-1.5 font-mono text-xs', entry.kind === 'engineering' ? 'text-accent' : 'text-mint')}>{kind.label}</p>
      </div>

      <div className="min-w-0">
        <h3 className="text-xl font-semibold tracking-tight text-ink">{entry.role}</h3>
        <p className="mt-1 text-ink-2">{entry.organisation}</p>
        <ul className="mt-4 space-y-2.5">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-2">
              <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink-3" />
              {highlight}
            </li>
          ))}
        </ul>
        {entry.stack ? <TagList items={entry.stack} label={`Technologies used as ${entry.role}`} className="mt-5" /> : null}
      </div>
      </Reveal>
    </li>
  )
}

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading" tinted>
      <Reveal>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="From teaching code to shipping it"
          description="I started at Digifunzi teaching coding and robotics, then moved into building the software the organisation runs on."
        />
      </Reveal>

      <ol className="mt-14">
        {experience.map((entry, index) => (
          <ExperienceItem key={entry.id} entry={entry} isLast={index === experience.length - 1} />
        ))}
      </ol>
    </Section>
  )
}
