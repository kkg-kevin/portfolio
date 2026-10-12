import type { ReactNode } from 'react'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Container } from '../../components/layout/Container'
import { ButtonLink } from '../../components/ui/Button'
import { SocialIcon } from '../../components/ui/icons'
import { profile, socials } from '../../data/profile'
import { cn } from '../../lib/cn'
import { HeroDiagram } from './HeroDiagram'

interface RiseProps {
  children: ReactNode
  /** Seconds to wait before animating. */
  delay?: number
  className?: string
}

/**
 * Entrance animation for the hero, done in CSS (see `.rise` in index.css)
 * so the first screen never waits for the animation library to load.
 */
function Rise({ children, delay = 0, className }: RiseProps) {
  return (
    <div className={cn('rise', className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

const heroSocials = socials.filter((social) => social.featured)

const quietLink =
  'inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline'

export function Hero() {
  const { hero } = profile

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-40">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(79,140,255,0.16),transparent)]"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <Rise>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
            </Rise>
            <Rise delay={0.06}>
              <h1
                id="hero-heading"
                className="mt-6 text-[clamp(2.5rem,7.2vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-ink"
              >
                {hero.headingLead}{' '}
                <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
                  {hero.headingAccent}
                </span>
              </h1>
            </Rise>
            <Rise delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">{hero.intro}</p>
            </Rise>
            <Rise delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/#work">
                  Explore my work
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <ButtonLink to="/#contact" variant="secondary">
                  Get in touch
                </ButtonLink>
              </div>
            </Rise>
            <Rise delay={0.24}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line/70 pt-5">
                <li>
                  <a href={profile.cv.href} download={profile.cv.fileName} className={quietLink}>
                    <Download aria-hidden="true" className="size-4" />
                    Download CV
                  </a>
                </li>
                {heroSocials.map((social) => (
                  <li key={social.id}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className={quietLink}>
                      <SocialIcon id={social.id} className="size-4" />
                      {social.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${profile.email}`} className={quietLink}>
                    <Mail aria-hidden="true" className="size-4" />
                    Email
                  </a>
                </li>
              </ul>
            </Rise>
          </div>

          <Rise delay={0.15} className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroDiagram />
          </Rise>
        </div>
      </Container>
    </section>
  )
}
