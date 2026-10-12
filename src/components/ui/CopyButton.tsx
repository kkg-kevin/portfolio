import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  value: string
  /** What is being copied, e.g. "email address". Used in the accessible name. */
  label: string
}

type CopyState = 'idle' | 'copied' | 'failed'

/** Copies a value to the clipboard and confirms the result visibly and to screen readers. */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const timer = setTimeout(() => setState('idle'), 2500)
    return () => clearTimeout(timer)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
      >
        {state === 'copied' ? (
          <Check aria-hidden="true" className="size-4 text-success" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
      </button>
      <span role="status" className="font-mono text-xs text-ink-2">
        {state === 'copied' ? 'Copied' : state === 'failed' ? "Couldn't copy" : ''}
      </span>
    </span>
  )
}
