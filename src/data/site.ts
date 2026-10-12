/** Home page sections, in page order. Drives the header, footer and active-link tracking. */
export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

/** Canonical origin, set at build time (see vite.config.ts and .env.example). */
export const siteUrl: string = __SITE_URL__

export const formspreeFormId: string = (import.meta.env.VITE_FORMSPREE_FORM_ID ?? '').trim()
