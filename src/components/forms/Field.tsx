import type { ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'

interface FieldProps {
  /** Id of the control this field wraps. The error uses `${id}-error`. */
  id: string
  label: string
  error?: string
  children: ReactNode
}

/** Shared input styling. The red border is paired with an icon and message, never used alone. */
export const controlClass =
  'block w-full rounded-lg border border-line bg-bg px-3.5 py-3 text-base text-ink placeholder:text-ink-3 transition-colors hover:border-line-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-danger'

/** Label, control and inline error for one form field. */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  )
}
