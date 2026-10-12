import { GraduationCap } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { leadership, profile } from '../../data/profile'

const labelClass = 'font-mono text-xs uppercase tracking-[0.18em] text-ink-3'

export function About() {
  const { education, photo } = profile

  return (
    <Section id="about" labelledBy="about-heading" tinted>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="about-heading" eyebrow="About" title="A software engineer with a background in teaching code" />
          <div className="mt-8 grid gap-7 sm:grid-cols-[14rem_1fr] sm:gap-8 lg:grid-cols-[12rem_1fr] xl:grid-cols-[14rem_1fr]">
            <figure className="w-full max-w-64 self-start sm:max-w-none">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-accent/40"
                />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="relative h-auto w-full rounded-2xl border border-line object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-ink">{profile.shortName}</p>
                <p className="mt-1 font-mono text-xs text-ink-3">
                  {profile.title} · {profile.location}
                </p>
              </figcaption>
            </figure>
            <div className="space-y-4 text-base leading-relaxed text-ink-2">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-10">
          <div>
            <h3 className={labelClass}>Education</h3>
            <div className="mt-4 flex gap-4 rounded-2xl border border-line bg-card p-5 sm:p-6">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 text-accent"
              >
                <GraduationCap className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold leading-snug text-ink">{education.degree}</p>
                <p className="mt-1 text-sm text-ink-2">{education.major}</p>
                <p className="mt-3 text-sm text-ink-2">{education.institution}</p>
                <p className="mt-1 font-mono text-xs text-ink-3">{education.period}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={labelClass}>Leadership and community</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {leadership.map((entry) => (
                <li key={entry.title} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-semibold text-ink">{entry.title}</p>
                    <p className="font-mono text-xs text-ink-3">{entry.period}</p>
                  </div>
                  {entry.organisation ? <p className="mt-0.5 text-sm text-ink-2">{entry.organisation}</p> : null}
                  <ul className="mt-3 space-y-2">
                    {entry.points.map((point) => (
                      <li key={point} className="text-sm leading-relaxed text-ink-2">
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
