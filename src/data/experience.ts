import type { ExperienceEntry } from './types'

/**
 * Professional experience, newest first.
 *
 * CONFIRM BEFORE PUBLISHING: the two developer roles are listed on the CV as
 * "May 2026 – Present". Update `period` here if either role has ended.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'full-stack-intern',
    role: 'Full-Stack Developer Intern',
    organisation: 'Digifunzi',
    period: 'May 2026 – Present',
    kind: 'engineering',
    stack: ['React', 'Node.js', 'Express', 'MySQL'],
    highlights: [
      'Designed and developed a full-stack LMS supporting curriculum, assessment, learner management, billing and educator payment workflows.',
      'Implemented JWT authentication and role-based access control across multiple user types.',
      'Built core backend systems: database schemas, migrations, transactional email, audit logging and automated PDF reports.',
      'Deployed and maintained development, production and white-label environments on cPanel.',
    ],
  },
  {
    id: 'front-end-intern',
    role: 'Front-End / Full-Stack Developer Intern',
    organisation: 'Digifunzi',
    period: 'May 2026 – Present',
    kind: 'engineering',
    stack: ['React', 'JavaScript', 'REST APIs', 'Puppeteer'],
    highlights: [
      'Developed the React-based public website, integrated with the LMS through REST APIs.',
      'Built a Puppeteer pre-rendering pipeline with automated sitemap generation for SEO-friendly static pages.',
      'Engineered an online diagnostic assessment that evaluates proficiency, generates reports and feeds lead management.',
      'Developed enquiry, enrolment and registration workflows with page-level SEO metadata and Vitest tests.',
    ],
  },
  {
    id: 'technical-mentor',
    role: 'Technical Mentor',
    organisation: 'Digifunzi',
    period: 'April 2025 – December 2025',
    kind: 'mentoring',
    highlights: [
      'Delivered structured coding and robotics instruction across multiple partner schools, adapting content to different ages and levels.',
      'Led holiday STEM bootcamps at Digifunzi centres built around hands-on, project-based learning.',
      'Mentored learners in programming, robotics and problem-solving.',
    ],
  },
  {
    id: 'attachment',
    role: 'Attachment',
    organisation: 'Digifunzi',
    period: 'January 2025 – March 2025',
    kind: 'mentoring',
    highlights: [
      'Designed and implemented a coding and robotics curriculum built on interactive projects and real-world applications.',
      'Facilitated hands-on training at Rosslyn Academy and Woodcreek School, covering block-based and text-based programming, sensor integration and autonomous systems.',
    ],
  },
]
