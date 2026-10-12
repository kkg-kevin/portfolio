import { Section } from '../../components/layout/Section'
import { ProjectCard } from '../../components/projects/ProjectCard'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'
import { cn } from '../../lib/cn'

export function FeaturedProjects() {
  // Alternate which side the visual sits on for each full-width card.
  let featuredCount = 0

  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Projects I've designed and built"
          description="Professional work at Digifunzi alongside academic and independent projects, covering full-stack web applications and applied AI."
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => {
          const mirrored = project.featured && featuredCount++ % 2 === 1
          return (
            <li key={project.slug} className={cn(project.featured && 'lg:col-span-2')}>
              <Reveal className="h-full">
                <ProjectCard project={project} index={index} mirrored={mirrored} />
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
