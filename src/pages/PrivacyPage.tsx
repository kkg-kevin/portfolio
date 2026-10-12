import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const linkClass = 'text-ink underline underline-offset-4 hover:text-accent'

export function PrivacyPage() {
  useDocumentMeta({
    title: `Privacy notice | ${profile.name}`,
    description: 'How this portfolio handles the details you submit through the contact form.',
    path: '/privacy',
  })

  return (
    <Container className="max-w-3xl pb-24 pt-28 sm:pt-32">
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to the portfolio
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Privacy notice</h1>

      <div className="mt-8 space-y-8 leading-relaxed text-ink-2">
        <section>
          <h2 className="text-xl font-semibold text-ink">Contact form</h2>
          <p className="mt-3">
            When you send a message through the contact form, I receive the name, email address, enquiry type and
            message you enter. I use them only to read and reply to your enquiry.
          </p>
          <p className="mt-3">
            Messages are delivered by{' '}
            <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Formspree
            </a>
            , a form-handling service, which processes the submission in order to forward it to my inbox. If the form
            opens a draft in your own email app instead, the message is sent by your email provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink">What this site does not do</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>It does not use analytics, advertising or tracking scripts.</li>
            <li>It does not set cookies.</li>
            <li>It does not keep your message in your browser's storage.</li>
            <li>
              The only thing it saves in your browser is your light or dark theme choice, so it is remembered on your
              next visit. That stays on your device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink">Your message</h2>
          <p className="mt-3">
            If you would like me to delete a message you sent, write to{' '}
            <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
              {profile.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  )
}
