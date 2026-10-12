import type { SkillGroup } from './types'

/**
 * Skills grouped by area. Everything listed is backed by the CV, either in
 * its skills list or in the experience and project descriptions.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Interfaces and public-facing sites.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    description: 'APIs, server-rendered apps and workflows.',
    skills: ['Node.js', 'Express', 'REST APIs', 'Handlebars'],
  },
  {
    title: 'Databases',
    description: 'Relational and document storage.',
    skills: ['MySQL', 'MongoDB', 'SQLite', 'Firebase'],
  },
  {
    title: 'Languages',
    description: 'Used across coursework and projects.',
    skills: ['JavaScript', 'Python', 'Java', 'SQL', 'C++', 'PHP'],
  },
  {
    title: 'Applied AI and data',
    description: 'Semantic retrieval and analysis.',
    skills: ['Sentence embeddings', 'FAISS', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Gradio'],
  },
  {
    title: 'Tools and practices',
    description: 'How the work gets shipped.',
    skills: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'cPanel',
      'Figma',
      'Brevo API',
      'Puppeteer',
      'Vitest',
      'JWT authentication',
      'Role-based access control',
      'Database migrations',
      'Automated testing',
    ],
  },
]
