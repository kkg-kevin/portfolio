export type Theme = 'dark' | 'light'

/** localStorage key. The inline script in index.html reads the same key before first paint. */
const STORAGE_KEY = 'theme'

/** Browser chrome colour for each theme; matches --color-bg. */
const themeColors: Record<Theme, string> = { dark: '#0B1020', light: '#F7F9FC' }

/** The theme currently applied to the document. Dark is the default. */
export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Applies a theme to the document and remembers it for the next visit. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The theme still applies for this visit.
  }
}
