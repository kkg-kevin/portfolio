import { lazy, Suspense, type ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Section } from '../../components/layout/Section'
import { CopyButton } from '../../components/ui/CopyButton'
import { SocialIcon } from '../../components/ui/icons'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { profile, socials } from '../../data/profile'

// The form brings its validation libraries with it, so it loads as its own chunk.
const ContactForm = lazy(() =>
  import('../../components/forms/ContactForm').then((module) => ({ default: module.ContactForm })),
)

const linkClass = 'inline-block break-all py-1 text-ink underline-offset-4 transition-colors hover:text-accent hover:underline'

interface ContactRowProps {
  icon: ReactNode
  label: string
  children: ReactNode
}

function ContactRow({ icon, label, children }: ContactRowProps) {
  return (
    <li className="flex items-center gap-4 py-4">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line text-ink-2">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">{label}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">{children}</div>
      </div>
    </li>
  )
}

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact"
            title="Have a project in mind or an opportunity to discuss?"
            description="I'm open to discussing software engineering opportunities, interesting projects, and collaborations. Send me a message and I'll get back to you."
          />

          <ul aria-label="Direct contact details" className="mt-8 divide-y divide-line border-y border-line">
            <ContactRow icon={<Mail className="size-4" />} label="Email">
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
              <CopyButton value={profile.email} label="email address" />
            </ContactRow>
            <ContactRow icon={<Phone className="size-4" />} label="Phone">
              <a href={profile.phone.href} className={linkClass}>
                {profile.phone.display}
              </a>
            </ContactRow>
            {socials.map((social) => (
              <ContactRow key={social.id} icon={<SocialIcon id={social.id} className="size-4" />} label={social.name}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </ContactRow>
            ))}
            <ContactRow icon={<MapPin className="size-4" />} label="Location">
              <span className="text-ink">{profile.location}</span>
            </ContactRow>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          {/* min-height reserves the form's space so nothing shifts when it loads. */}
          <div className="relative h-full min-h-[34rem] rounded-2xl border border-line bg-card p-5 sm:p-8">
            <Suspense fallback={<p className="text-sm text-ink-3">Loading contact form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
