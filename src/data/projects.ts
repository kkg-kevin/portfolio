// The .ts extension lets vite.config.ts import this file directly for the sitemap.
import type { Project } from './types.ts'

/**
 * Projects shown on the home page and as case studies at /work/<slug>.
 * To add a project, append an object here. Order is display order.
 *
 * Content rules: every statement should be something you can back up.
 * Leave `links` empty unless the URL is public and approved for sharing,
 * and leave `challenges` / `lessons` out unless they really happened.
 */
export const projects: Project[] = [
  {
    slug: 'digifunzi-lms',
    name: 'Digifunzi Learning Management System',
    category: 'Full-Stack Web Application',
    context: 'Professional work · Digifunzi',
    visual: 'lms',
    screens: {
      label: 'lms / curriculum / new',
      cover: { src: '/projects/digifunzi-lms/curriculum-create.webp', alt: 'Create Curriculum screen: a four-step form with a live preview panel beside it.', caption: 'Curriculum builder', width: 1440, height: 900 },
      gallery: [
        { src: '/projects/digifunzi-lms/learner-enrol.webp', alt: 'Enroll Learner form with personal and guardian details and a live preview card.', caption: 'Learner enrolment form', width: 1440, height: 900 },
        { src: '/projects/digifunzi-lms/events.webp', alt: 'Events screen with sections for competitions, bootcamps and games.', caption: 'Events: competitions, bootcamps and games', width: 1440, height: 900 },
        { src: '/projects/digifunzi-lms/billing.webp', alt: 'Billing workspace with tabs for customers, invoices, payments, packages and educator claims.', caption: 'Billing workspace', width: 1440, height: 900 },
        { src: '/projects/digifunzi-lms/settings.webp', alt: 'Settings screen with tabs for competencies, pathways, system levels, emails and certificates.', caption: 'Shared catalogues in Settings', width: 1440, height: 900 },
        { src: '/projects/digifunzi-lms/dashboard-mobile.webp', alt: 'Admin dashboard at phone width, with summary cards for curricula, schools, classes and learners.', caption: 'Dashboard on a phone', width: 780, height: 1560 },
        { src: '/projects/digifunzi-lms/learning-hubs-mobile.webp', alt: 'Learning Hubs screen at phone width, with status counts and filters.', caption: 'Learning hubs on a phone', width: 780, height: 1560 },
        { src: '/projects/digifunzi-lms/login-mobile.webp', alt: 'Sign-in screen with email or username and password fields.', caption: 'Sign-in', width: 780, height: 1560 },
      ],
    },
    featured: true,
    summary:
      'A full-stack learning management system supporting curriculum delivery, assessment workflows, learner management, billing, and educator payment processes.',
    purpose:
      'One platform for the day-to-day running of a coding and robotics education provider: delivering curriculum, assessing learners, managing enrolments, billing, and paying educators.',
    role: 'Full-Stack Developer Intern. I designed and developed the application across the React front end, the Node.js and Express API, and the MySQL database, and worked on its deployment environments.',
    highlights: [
      'JWT authentication and role-based access control across multiple user types',
      'Configurable permissions, password recovery and session management',
      'Database schemas, migrations and assessment workflows',
      'Transactional email, audit logging and automated PDF reports',
    ],
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'MySQL', 'JWT', 'cPanel'],
    links: [],
    confidentiality:
      'This is company software, so source code and workflow specifics are not shown. The screenshots are of empty screens: no learner, educator or billing records appear in them.',
    caseStudy: {
      overview: [
        'The LMS is the system I have spent the most time on as a Full-Stack Developer Intern at Digifunzi. It supports curriculum, assessment, learner management, billing and educator payment workflows in a single application.',
        'I worked across the whole stack: React on the client, a Node.js and Express REST API, and MySQL for storage, along with the environments the application runs in.',
      ],
      goals: [
        'Support curriculum, assessment, learner management, billing and educator payments in one application.',
        'Give each type of user access only to what their role allows.',
        'Keep database changes repeatable across development, production and white-label environments.',
        'Leave a record of important actions and produce reports without manual work.',
      ],
      architecture: [
        { layer: 'Client', detail: 'React single-page application that talks to the API over REST.' },
        { layer: 'API', detail: 'Node.js and Express REST API handling authentication, authorisation and business workflows.' },
        { layer: 'Data', detail: 'MySQL, with the schema managed through migrations.' },
        { layer: 'Services', detail: 'Transactional email, audit logging and PDF report generation.' },
        { layer: 'Hosting', detail: 'Development, production and white-label environments on cPanel.' },
      ],
      decisions: [
        {
          title: 'Token-based authentication',
          detail: 'Sign-in uses JWT, with password recovery and session management built around it.',
        },
        {
          title: 'Permissions that can be configured',
          detail: 'Role-based access control covers multiple user types, and permissions are configurable rather than fixed in code.',
        },
        {
          title: 'Schema changes as migrations',
          detail: 'Database changes are written as migrations so each environment can be brought to the same state.',
        },
        {
          title: 'Audit logging',
          detail: 'Key actions are logged so there is a trail to refer back to.',
        },
      ],
      functionality: [
        'Curriculum delivery',
        'Assessment workflows',
        'Learner management',
        'Billing',
        'Educator payment workflows',
        'Transactional email',
        'Automated PDF reports',
        'Audit logging',
      ],
    },
  },
  {
    slug: 'digifunzi-website',
    name: 'Digifunzi Public Website',
    category: 'Front-End / Full-Stack Web',
    context: 'Professional work · Digifunzi',
    visual: 'website',
    screens: {
      label: 'africa.digifunzi.com',
      cover: { src: '/projects/digifunzi-website/cover.webp', alt: 'Three pages of the Digifunzi website at phone width: home, home schooling and about.', caption: 'Home, home schooling and about pages', width: 1440, height: 900 },
      gallery: [
        { src: '/projects/digifunzi-website/home.webp', alt: 'Home page: "Where Kenya’s young makers learn to build", with Enroll a learner and Browse pathways buttons.', caption: 'Home', width: 780, height: 1560 },
        { src: '/projects/digifunzi-website/home-schooling.webp', alt: 'Home schooling page: "Learning that comes home", with a link to packages and prices.', caption: 'Home schooling', width: 780, height: 1560 },
        { src: '/projects/digifunzi-website/about.webp', alt: 'About page describing Digifunzi and its mission.', caption: 'About', width: 780, height: 1560 },
        { src: '/projects/digifunzi-website/contact.webp', alt: 'Contact page with an enquiry form and other ways to reach the team.', caption: 'Contact and enquiry form', width: 780, height: 1560 },
      ],
    },
    featured: false,
    summary:
      'A React-based public website integrated with the LMS through REST APIs, with pre-rendered pages for search engines and an online diagnostic assessment.',
    purpose:
      'A public site whose programmes, bootcamps, projects and store content come from the LMS, and that search engines can read as static pages.',
    role: 'Front-End / Full-Stack Developer Intern. I developed the React site, its API integration, the pre-rendering pipeline, the diagnostic assessment and the enquiry and registration workflows.',
    highlights: [
      'Dynamic programmes, bootcamps, projects and store content over REST APIs',
      'Puppeteer-based pre-rendering pipeline with automated sitemap generation',
      'Online diagnostic assessment that generates reports and feeds lead management',
      'Enquiry, enrolment and home-learning registration, tested with Vitest',
    ],
    stack: ['React', 'JavaScript', 'REST APIs', 'Puppeteer', 'Vitest'],
    links: [{ label: 'Visit africa.digifunzi.com', href: 'https://www.africa.digifunzi.com', kind: 'live' }],
    confidentiality:
      'The site is public, but its source code belongs to Digifunzi and is not shared. The screenshots are of its public pages at phone width.',
    caseStudy: {
      overview: [
        'Alongside the LMS, I developed the React-based public website for Digifunzi. It is integrated with the LMS through REST APIs, so programmes, bootcamps, projects and store content are delivered dynamically.',
        'Because the content is dynamic, I built a pre-rendering pipeline with Puppeteer that produces static, SEO-friendly pages and generates the sitemap automatically.',
      ],
      goals: [
        'Show programmes, bootcamps, projects and store content from the LMS without duplicating it.',
        'Make dynamic pages readable by search engines.',
        'Let prospective learners assess their level online and receive a report.',
        'Route enquiries and registrations into existing workflows.',
      ],
      architecture: [
        { layer: 'Client', detail: 'React application with page-level SEO metadata.' },
        { layer: 'Content', detail: 'REST API integration with the LMS for programmes, bootcamps, projects and store content.' },
        { layer: 'Pre-rendering', detail: 'Puppeteer renders dynamic pages to static HTML and generates the sitemap.' },
        { layer: 'Assessment', detail: "Diagnostic assessment that evaluates proficiency, generates a report and submits results to the platform's lead-management workflow." },
        { layer: 'Testing', detail: 'Automated tests with Vitest.' },
      ],
      decisions: [
        {
          title: 'Pre-render instead of relying on client rendering',
          detail: 'Static pages are produced from the dynamic application content so they are SEO-friendly.',
        },
        {
          title: 'Sitemap generated by the pipeline',
          detail: 'The sitemap is generated automatically as part of pre-rendering rather than maintained by hand.',
        },
        {
          title: 'Assessment results go straight to lead management',
          detail: "Diagnostic results are submitted directly to the platform's lead-management workflow.",
        },
      ],
      functionality: [
        'Programmes, bootcamps, projects and store pages',
        'Online diagnostic assessment with generated reports',
        'Enquiry workflow',
        'Enrolment workflow',
        'Home-learning registration',
        'Page-level SEO metadata',
      ],
    },
  },
  {
    slug: 'mentorlink',
    name: 'MentorLink',
    category: 'Full-Stack Web Application',
    context: 'Academic and independent project',
    visual: 'mentorlink',
    screens: {
      label: 'mentorlink / home',
      cover: { src: '/projects/mentorlink/home.webp', srcDark: '/projects/mentorlink/home-dark.webp', alt: 'MentorLink home page: "Connect. Learn. Grow.", with Get Started and Join as a Mentor buttons.', caption: 'Home page', width: 1440, height: 900 },
      gallery: [
        { src: '/projects/mentorlink/signup-role.webp', alt: 'Sign-up screen, step one: choosing between mentee, mentor and organization.', caption: 'Sign-up starts with choosing a role', width: 1440, height: 900 },
        { src: '/projects/mentorlink/login.webp', alt: 'Sign-in screen with email and password fields and a forgot-password link.', caption: 'Sign-in', width: 1440, height: 900 },
        { src: '/projects/mentorlink/roles.webp', alt: 'Section describing what the platform offers mentees, mentors and organizations.', caption: 'One section per role', width: 1392, height: 716 },
        { src: '/projects/mentorlink/features.webp', alt: 'Platform features section: mentor discovery, profile management, feedback and rating, and organizational support.', caption: 'Platform features', width: 1392, height: 613 },
        { src: '/projects/mentorlink/home-mobile.webp', alt: 'MentorLink home page at phone width.', caption: 'Home on a phone', width: 780, height: 1560 },
        { src: '/projects/mentorlink/signup-mobile.webp', alt: 'Sign-up screen at phone width.', caption: 'Sign-up on a phone', width: 780, height: 1560 },
        { src: '/projects/mentorlink/login-mobile.webp', alt: 'Sign-in screen at phone width.', caption: 'Sign-in on a phone', width: 780, height: 1560 },
      ],
    },
    featured: false,
    summary:
      'A mentorship management platform designed to support mentors, mentees, and administrators through structured program workflows.',
    purpose:
      'A structured way to run a mentorship programme: who is taking part, when sessions happen, how they went, and how engaged the programme is overall.',
    role: 'I architected and implemented the platform end to end, from the Express application and Handlebars views to the MongoDB data model.',
    highlights: [
      'Secure authentication and role-based authorisation for three user types',
      'Profile management and session scheduling',
      'Search and feedback features',
      'Administrative dashboard with engagement analytics',
    ],
    stack: ['Node.js', 'Express', 'Handlebars', 'MongoDB'],
    links: [],
    caseStudy: {
      overview: [
        'MentorLink is a full-stack mentorship management platform that supports mentors, mentees and administrators.',
        'It was a chance to design a complete application myself: the data model, the workflows for each role, and the administrative view over the whole programme.',
      ],
      goals: [
        'Support mentors, mentees and administrators with workflows suited to each role.',
        'Make scheduling sessions and managing profiles straightforward.',
        'Capture feedback on sessions.',
        'Give administrators a view of programme engagement and performance.',
      ],
      architecture: [
        { layer: 'Views', detail: 'Server-rendered pages using Handlebars templates.' },
        { layer: 'Application', detail: 'Node.js and Express handling routing, authentication and role-based authorisation.' },
        { layer: 'Data', detail: 'MongoDB for users, profiles, sessions and feedback.' },
      ],
      decisions: [
        {
          title: 'Role-based authorisation',
          detail: 'Mentors, mentees and administrators each see and do only what their role allows.',
        },
        {
          title: 'An administrative dashboard',
          detail: 'Analytics are brought together in a dashboard so engagement and performance can be tracked in one place.',
        },
      ],
      functionality: [
        'Authentication and role-based authorisation',
        'Profile management',
        'Session scheduling',
        'Search',
        'Feedback',
        'Administrative dashboard and analytics',
      ],
    },
  },
  {
    slug: 'campus-information-chatbot',
    name: 'Campus Information Chatbot',
    category: 'Applied AI / Semantic Retrieval',
    context: 'Academic and independent project',
    visual: 'chatbot',
    featured: true,
    summary:
      'A campus information chatbot using semantic retrieval to match user questions with relevant information from a structured knowledge base.',
    purpose:
      'Answering campus questions by meaning rather than by exact keywords, using a structured knowledge base of questions and answers.',
    role: 'I designed and implemented the retrieval pipeline, carried out the data preparation and analysis, and built the chatbot interface.',
    highlights: [
      'Semantic retrieval with transformer-based sentence embeddings and FAISS',
      'Data preprocessing and exploratory data analysis',
      'Similarity score distribution, clustering and threshold sensitivity evaluation',
      'Interactive chatbot interface built with Gradio',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'FAISS', 'scikit-learn', 'Matplotlib', 'Seaborn', 'Sentence embeddings', 'Gradio'],
    links: [],
    caseStudy: {
      overview: [
        'This project explores applied AI through a semantic retrieval pipeline. User questions are matched to relevant answers in a structured knowledge base using transformer-based sentence embeddings and FAISS.',
        'A large part of the work was analysis: preparing the data, then studying how similarity scores behave so the system could be tuned on evidence.',
      ],
      goals: [
        'Match user questions to relevant answers in a structured knowledge base.',
        'Understand how similarity scores are distributed and how sensitive results are to the threshold.',
        'Make the system usable through an interactive chat interface.',
      ],
      architecture: [
        { layer: 'Knowledge base', detail: 'Structured data, cleaned and prepared with Pandas and NumPy.' },
        { layer: 'Embeddings', detail: 'Transformer-based sentence embeddings represent each entry and each question.' },
        { layer: 'Retrieval', detail: 'FAISS finds the entries most similar to the question.' },
        { layer: 'Analysis', detail: 'Similarity score distribution, clustering and threshold sensitivity, using scikit-learn, Matplotlib and Seaborn.' },
        { layer: 'Interface', detail: 'Interactive chatbot interface built with Gradio.' },
      ],
      decisions: [
        {
          title: 'Semantic retrieval over a structured knowledge base',
          detail: 'Questions are matched by embedding similarity, so wording does not have to match the knowledge base exactly.',
        },
        {
          title: 'FAISS for similarity search',
          detail: 'FAISS is used to match queries to relevant answers efficiently.',
        },
        {
          title: 'Evaluate the threshold rather than guess it',
          detail: 'Threshold sensitivity evaluation and score distribution analysis were used to improve accuracy and identify performance patterns.',
        },
      ],
      functionality: [
        'Data preprocessing workflows',
        'Sentence embedding generation',
        'Semantic similarity search',
        'Exploratory data analysis and visualisations',
        'Interactive chat interface',
      ],
    },
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** The project after the given one, wrapping to the first. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
