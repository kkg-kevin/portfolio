import type { LeadershipEntry, SocialLink } from './types'

/**
 * Central profile content. Edit values here and they update everywhere:
 * navigation, hero, about, contact, footer and page metadata.
 */
export const profile = {
  name: 'Kevin Kihara Githinji',
  shortName: 'Kevin Githinji',
  title: 'Software Engineer',
  location: 'Nairobi, Kenya',
  email: 'kiharakevin505@gmail.com',
  phone: {
    display: '+254 727 496 461',
    href: 'tel:+254727496461',
  },
  github: {
    label: 'github.com/kkg-kevin',
    href: 'https://github.com/kkg-kevin',
  },
  cv: {
    href: '/Kevin_Kihara_Githinji_CV.pdf',
    fileName: 'Kevin_Kihara_Githinji_CV.pdf',
  },
  // Portrait shown in the About section. The file lives in public/profile/.
  photo: {
    src: '/profile/kevin.webp',
    alt: 'Kevin Kihara Githinji, seated with arms folded, wearing a light blue polo shirt.',
    width: 640,
    height: 800,
  },
  hero: {
    eyebrow: 'Software Engineer · Nairobi, Kenya',
    headingLead: 'Building software that solves',
    headingAccent: 'real problems.',
    intro:
      "I'm Kevin Kihara Githinji, a software engineer focused on building reliable web applications, practical backend systems, and intelligent solutions. I enjoy turning complex requirements into software that is useful, maintainable, and intuitive to use.",
  },
  footerBlurb:
    'Software engineer in Nairobi, Kenya, building full-stack web applications, backend systems and applied AI projects.',
  about: [
    "I'm a software engineer based in Nairobi, Kenya, with a background in applied computer technology and practical experience developing full-stack applications.",
    'My work spans web application development, backend workflows, database integration, and applied AI projects. Most recently that has meant building a learning management system and a public website at Digifunzi, from the React interface through to the MySQL schema and deployment.',
    'Alongside engineering, my experience in technical mentoring and community initiatives has strengthened my communication, collaboration, and leadership skills.',
  ],
  education: {
    degree: 'Bachelor of Science in Applied Computer Technology',
    major: 'Software Engineering major',
    institution: 'United States International University–Africa',
    period: 'September 2022 – September 2026',
  },
} as const

/**
 * Social and messaging links, shown in the hero, contact section and footer
 * in this order. Add a profile here only once its URL is confirmed.
 */
export const socials: SocialLink[] = [
  { id: 'github', name: 'GitHub', label: profile.github.label, href: profile.github.href, featured: true },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'linkedin.com/in/kevin-kihara-b45817248',
    href: 'https://www.linkedin.com/in/kevin-kihara-b45817248',
    featured: true,
  },
  { id: 'whatsapp', name: 'WhatsApp', label: 'Chat on WhatsApp', href: 'https://wa.me/254727496461', featured: true },
  { id: 'instagram', name: 'Instagram', label: 'instagram.com/kkg_kevin', href: 'https://www.instagram.com/kkg_kevin' },
  { id: 'facebook', name: 'Facebook', label: 'Facebook profile', href: 'https://www.facebook.com/share/1Bz6kctwqs/' },
]

export const leadership: LeadershipEntry[] = [
  {
    title: 'Mastercard Foundation Scholars Program',
    period: 'January 2023 – December 2024',
    points: [
      'Led a team of 42 students in implementing a sustainable community project at Manguo Primary School, Githurai.',
      'Took part in fundraising and resource mobilisation that enabled the purchase and installation of a modern cooker at Total Rehabilitation Centre, Kasarani.',
    ],
  },
  {
    title: 'Leadership Trainee',
    organisation: 'VS Management and Consulting',
    period: 'August 2023 – December 2023',
    points: [
      'Completed an intensive leadership development programme covering project proposals, project management methods, leadership styles and team dynamics.',
    ],
  },
]
