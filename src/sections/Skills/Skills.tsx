import { Section } from '../../components/layout/Section'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { TagList } from '../../components/ui/Tag'
import { skillGroups } from '../../data/skills'

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <Reveal>
        <SectionHeading
          id="skills-heading"
          eyebrow="Technical skills"
          title="What I work with"
          description="Grouped by where each tool sits in the stack. These are technologies I have used in professional work, projects or coursework."
        />
      </Reveal>

      <Reveal>
        {/* One panel divided by hairlines: the gap shows the line colour behind the cells. */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <li key={group.title} className="bg-bg p-6 sm:p-7">
              <p aria-hidden="true" className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{group.title}</h3>
              <p className="mt-1 text-sm text-ink-3">{group.description}</p>
              <TagList items={group.skills} label={`${group.title} skills`} className="mt-5" />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
