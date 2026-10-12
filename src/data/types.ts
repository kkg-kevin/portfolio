export type ProjectVisualId = 'lms' | 'website' | 'mentorlink' | 'chatbot'

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'repo'
}

export interface ArchitectureLayer {
  layer: string
  detail: string
}

export interface Decision {
  title: string
  detail: string
}

export interface CaseStudy {
  overview: string[]
  goals: string[]
  architecture: ArchitectureLayer[]
  decisions: Decision[]
  functionality: string[]
  /** Optional. Only add challenges that actually happened. */
  challenges?: string[]
  /** Optional. Only add outcomes or lessons you can stand behind. */
  lessons?: string[]
}

export interface Screenshot {
  /** Path under public/, starting with a slash. */
  src: string
  /** Optional capture of the same screen in dark theme, shown when the portfolio is dark. */
  srcDark?: string
  alt: string
  caption: string
  /** Pixel size of the file, so the browser can reserve space before it loads. */
  width: number
  height: number
}

export interface ProjectScreens {
  /** Short path-style label shown in the window bar above the cover. */
  label: string
  /** Shown on the project card and at the top of the case study. */
  cover: Screenshot
  /** Shown in the "Screens" block of the case study. */
  gallery: Screenshot[]
}

export interface Project {
  /** Used in the URL: /work/<slug>. Must be unique. */
  slug: string
  name: string
  category: string
  /** Where the work came from, e.g. professional or academic. */
  context: string
  /** Which illustrative visual to render when there are no screenshots. */
  visual: ProjectVisualId
  /** Real screenshots. When set, the cover replaces the illustrative visual. */
  screens?: ProjectScreens
  /** Featured projects get a full-width card on the home page. */
  featured: boolean
  summary: string
  purpose: string
  role: string
  highlights: string[]
  stack: string[]
  /** Only verified, shareable URLs. Leave empty if there are none. */
  links: ProjectLink[]
  /** Shown on the case study when details are intentionally withheld. */
  confidentiality?: string
  caseStudy: CaseStudy
}

export interface ExperienceEntry {
  id: string
  role: string
  organisation: string
  /** Display text, e.g. "May 2026 – Present". */
  period: string
  kind: 'engineering' | 'mentoring'
  stack?: string[]
  highlights: string[]
}

export interface SkillGroup {
  title: string
  description: string
  skills: string[]
}

export type SocialId = 'github' | 'linkedin' | 'whatsapp' | 'instagram' | 'facebook'

export interface SocialLink {
  /** Picks the icon. Add new ids here and in `SocialIcon`. */
  id: SocialId
  /** Platform name, used as the short link text. */
  name: string
  /** Longer link text for the contact list and footer, e.g. the handle. */
  label: string
  href: string
  /** Featured links also appear in the hero. Keep these to three or four. */
  featured?: boolean
}

export interface LeadershipEntry {
  title: string
  organisation?: string
  period: string
  points: string[]
}
