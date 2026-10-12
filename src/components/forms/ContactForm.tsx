import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { m } from 'framer-motion'
import { CircleAlert, CircleCheck, Info, LoaderCircle, Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { formspreeFormId } from '../../data/site'
import {
  buildMailto,
  contactSchema,
  enquiryTypes,
  openEmailDraft,
  submitContact,
  type ContactValues,
} from '../../lib/contact'
import { Button } from '../ui/Button'
import { controlClass, Field } from './Field'

type Status =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'draft' }
  | { kind: 'error'; message: string }

interface ContactFormProps {
  /** Formspree form ID. Empty means no service is configured and the form opens an email draft instead. */
  formId?: string
}

const defaultValues: ContactValues = { name: '', email: '', enquiry: enquiryTypes[0], message: '', _gotcha: '' }

export function ContactForm({ formId = formspreeFormId }: ContactFormProps) {
  const configured = formId.length > 0
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const statusRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues })

  // Move focus to the result so keyboard and screen-reader users notice it.
  useEffect(() => {
    if (status.kind !== 'idle') statusRef.current?.focus()
  }, [status])

  // react-hook-form keeps isSubmitting true until this resolves, which
  // disables the button and blocks duplicate submissions.
  const onSubmit = async (values: ContactValues) => {
    setStatus({ kind: 'idle' })

    if (!configured) {
      openEmailDraft(buildMailto(values))
      setStatus({ kind: 'draft' })
      return
    }

    const result = await submitContact(formId, values)
    if (result.ok) {
      reset()
      setStatus({ kind: 'success' })
    } else {
      setStatus({ kind: 'error', message: result.message })
    }
  }

  if (status.kind === 'success') {
    return (
      <m.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-full flex-col items-start justify-center outline-none"
      >
        <CircleCheck aria-hidden="true" className="size-10 text-success" strokeWidth={1.5} />
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Message sent</h3>
        <p className="mt-2 max-w-sm leading-relaxed text-ink-2">
          Thanks for getting in touch. I'll reply to the email address you provided.
        </p>
        <Button variant="secondary" size="sm" className="mt-6" onClick={() => setStatus({ kind: 'idle' })}>
          Send another message
        </Button>
      </m.div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={controlClass}
            {...register('name')}
          />
        </Field>
        <Field id="contact-email" label="Email address" error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={controlClass}
            {...register('email')}
          />
        </Field>
      </div>

      <Field id="contact-enquiry" label="What is this about?">
        <select id="contact-enquiry" className={controlClass} {...register('enquiry')}>
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${controlClass} resize-y`}
          {...register('message')}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
      </div>

      {!configured ? (
        <p className="flex items-start gap-2.5 rounded-lg border border-line bg-bg px-3.5 py-3 text-sm leading-relaxed text-ink-2">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>
            Sending opens a pre-filled draft in your email app.
            {import.meta.env.DEV
              ? ' Development note: set VITE_FORMSPREE_FORM_ID to deliver messages through Formspree (see the README).'
              : null}
          </span>
        </p>
      ) : null}

      <div ref={statusRef} tabIndex={-1} className="outline-none">
        {status.kind === 'error' ? (
          <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-danger/50 bg-danger/10 px-3.5 py-3 text-sm leading-relaxed text-ink">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
            <p>
              <strong className="font-semibold">Your message wasn't sent.</strong> {status.message} What you wrote is still in
              the form. You can also write to{' '}
              <a href={`mailto:${profile.email}`} className="break-all underline underline-offset-4">
                {profile.email}
              </a>
              .
            </p>
          </div>
        ) : null}
        {status.kind === 'draft' ? (
          <div role="status" className="flex items-start gap-2.5 rounded-lg border border-line bg-bg px-3.5 py-3 text-sm leading-relaxed text-ink">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              A draft should have opened in your email app. Your message is only sent once you send it from there. If
              nothing opened, write to{' '}
              <a href={`mailto:${profile.email}`} className="break-all underline underline-offset-4">
                {profile.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting} className="sm:min-w-44">
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" />
              {configured ? 'Send message' : 'Open email draft'}
            </>
          )}
        </Button>
        <p className="text-sm leading-relaxed text-ink-3 sm:max-w-[13rem] sm:text-right">
          Your details are only used to reply to you.{' '}
          <Link to="/privacy" className="inline-block py-1 text-ink-2 underline underline-offset-4 hover:text-ink">
            Privacy notice
          </Link>
        </p>
      </div>
    </form>
  )
}
