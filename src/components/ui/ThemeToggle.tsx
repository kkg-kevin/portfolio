import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, getTheme, type Theme } from '../../lib/theme'

/** Switches between the dark and light themes. The label names the theme it will switch to. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Sun : Moon

  const toggle = () => {
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-card/70 text-ink-2 transition-colors hover:bg-raised hover:text-ink"
    >
      <Icon aria-hidden="true" className="size-[1.125rem]" />
    </button>
  )
}
