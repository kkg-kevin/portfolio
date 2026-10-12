import { z } from 'zod'
import { profile } from '../data/profile'

export const enquiryTypes = ['Job opportunity', 'Project or freelance work', 'Collaboration', 'Something else'] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(100, 'Keep your name under 100 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .max(254, 'That email address is too long.')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Enter a valid email address, like name@example.com.'),
  enquiry: z.enum(enquiryTypes),
  message: z
    .string()
    .trim()
    .min(10, 'Write a message of at least 10 characters.')
    .max(5000, 'Keep your message under 5,000 characters.'),
  /** Honeypot. Real visitors never see or fill this field. */
  _gotcha: z.string().optional(),
})

export type ContactValues = z.infer<typeof contactSchema>

export type SubmitResult = { ok: true } | { ok: false; message: string }

const REQUEST_TIMEOUT_MS = 15_000

interface FormspreeErrorBody {
  errors?: Array<{ message?: string }>
}

/**
 * Sends an enquiry to Formspree. Resolves `ok: true` only when Formspree
 * confirms it accepted the submission.
 */
export async function submitContact(formId: string, values: ContactValues): Promise<SubmitResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        enquiry: values.enquiry,
        message: values.message,
        _subject: `Portfolio enquiry: ${values.enquiry}`,
        _gotcha: values._gotcha ?? '',
      }),
      signal: controller.signal,
    })

    if (response.ok) return { ok: true }

    const body = (await response.json().catch(() => null)) as FormspreeErrorBody | null
    const detail = body?.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join(' ')
    return {
      ok: false,
      message: detail || "The form service couldn't accept your message. Try again, or email me directly.",
    }
  } catch {
    return {
      ok: false,
      message: "Couldn't reach the form service. Check your connection and try again, or email me directly.",
    }
  } finally {
    clearTimeout(timeout)
  }
}

/** Hands a mailto: URL to the browser, which opens the visitor's email app. */
export function openEmailDraft(mailto: string): void {
  window.location.assign(mailto)
}

/** Builds a pre-filled email draft, used when no form service is configured. */
export function buildMailto(values: ContactValues): string {
  const subject = `Portfolio enquiry: ${values.enquiry}`
  const body = `${values.message}\n\n${values.name}\n${values.email}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
