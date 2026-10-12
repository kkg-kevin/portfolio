# Kevin Kihara Githinji: Portfolio

Personal portfolio site for Kevin Kihara Githinji, software engineer in Nairobi, Kenya.

Built with React, TypeScript, Vite, Tailwind CSS v4, React Router, Framer Motion, React Hook Form and Zod. It is a static single-page app with no backend, and deploys to Vercel and Netlify from the same repository.

## Before you publish

These need a decision from you. Nothing else blocks a launch.

1. **The CV contains your referee's contact details.** `public/Kevin_Kihara_Githinji_CV.pdf` is the CV exactly as supplied, and its References section lists a name, phone number and email. Once the site is live, anyone can download it. Either get your referee's agreement or replace the file with a version that says "References available on request". Keep the same filename.
2. **Confirm the dates of the two developer roles.** Both are shown as "May 2026 – Present", as on the CV. Edit `period` in `src/data/experience.ts` if either has ended.
3. **Set up the contact form.** Until `VITE_FORMSPREE_FORM_ID` is set, the form opens a pre-filled draft in the visitor's email app instead of sending. See [Contact form](#contact-form).
4. **Set your domain.** Set `VITE_SITE_URL` once you know the final address. See [Environment variables](#environment-variables).
5. **Check the Digifunzi link.** The public website project links to `https://www.africa.digifunzi.com`, taken from your CV. Remove it from `src/data/projects.ts` if Digifunzi would rather it was not linked.

Optional: add more social links such as LinkedIn (see `socials` in `src/data/profile.ts`), and add repository links to projects once the repositories are public.

## Requirements

- Node.js 20.19 or newer (developed on Node 22)
- npm

## Commands

```bash
npm install          # install dependencies
npm run dev          # start the dev server at http://localhost:5173
npm run build        # type-check, then build to dist/
npm run preview      # serve the production build at http://localhost:4173
npm run typecheck    # TypeScript only
npm run lint         # ESLint
npm test             # run the test suite once
npm run test:watch   # run tests in watch mode
```

## Environment variables

Copy `.env.example` to `.env.local` for local work. `.env.local` is ignored by git.

| Variable | Purpose | If unset |
| --- | --- | --- |
| `VITE_FORMSPREE_FORM_ID` | Formspree form ID that receives contact messages. A public identifier, not a secret. | The form opens an email draft instead of sending. |
| `VITE_SITE_URL` | Canonical origin without a trailing slash, e.g. `https://example.com`. Used in canonical and Open Graph tags, `robots.txt` and `sitemap.xml`. | The build uses the host's production URL (Vercel or Netlify), or `http://localhost:5173` locally. |

Both are read at build time, so redeploy after changing them. Set them separately on each hosting platform.

## Contact form

The form posts to [Formspree](https://formspree.io), which forwards messages to your inbox. No server code is needed.

1. Create a Formspree account using the address that should receive messages.
2. Create a form. Its endpoint looks like `https://formspree.io/f/abcdwxyz`. The ID is the last part, `abcdwxyz`.
3. Put `VITE_FORMSPREE_FORM_ID=abcdwxyz` in `.env.local`, and add the same variable in Vercel and Netlify.
4. In the Formspree dashboard, restrict the form to your domain and turn on its spam filtering.
5. Send a test message from the deployed site and confirm it arrives.

How the form behaves:

- Fields are validated in the browser (`src/lib/contact.ts`) with inline error messages.
- The submit button is disabled while a message is sending, which prevents duplicates.
- "Message sent" appears only after Formspree responds with success. On a rejection, timeout or network failure the visitor sees an error, their text stays in the form, and a direct email link is offered.
- A hidden honeypot field (`_gotcha`) catches simple bots.
- Nothing is written to browser storage.

## Editing content

All content lives in `src/data/`. You should not need to touch components to change wording.

| File | Contains |
| --- | --- |
| `profile.ts` | Name, title, contact details, hero copy, bio, education, leadership |
| `projects.ts` | Project cards and case studies |
| `experience.ts` | Work history timeline |
| `skills.ts` | Skill groups |
| `site.ts` | Navigation items |

### Adding a project

Append an object to the `projects` array in `src/data/projects.ts`. The home page card, the case study page at `/work/<slug>`, the next-project links and the sitemap all pick it up.

- `slug` must be unique, lowercase and hyphenated.
- `featured: true` gives the card the full width.
- `links` should hold only public, approved URLs. Leave it as `[]` otherwise and the page says no public link is available.
- `challenges` and `lessons` are optional and are hidden when absent. None of the current projects has them, because the CV does not describe any. Add them in your own words when you want to.
- `visual` picks one of the coded illustrations in `src/components/projects/visuals/`. For a new look, add a component there and register it in `ProjectVisual.tsx`.

The project visuals are drawn in code and captioned "not a real screenshot". If you later have screenshots you are allowed to publish, replace the visual component with an `<img>` that has `width`, `height`, `loading="lazy"` and a descriptive `alt`.

### Replacing the CV

Overwrite `public/Kevin_Kihara_Githinji_CV.pdf`. If you rename it, update `cv` in `src/data/profile.ts`; a test fails if the file is missing.

## Project structure

```
public/
  Kevin_Kihara_Githinji_CV.pdf   the downloadable CV
  favicon.svg
  og-image.png                   social sharing image (1200x630)
src/
  components/
    forms/        ContactForm, Field
    layout/       Layout, Container, Section, Footer
    navigation/   Header with the mobile menu
    projects/     ProjectCard, ProjectVisual, visuals/
    ui/           Button, Tag, Reveal, SectionHeading, CopyButton, icons
  data/           all site content (see above)
  hooks/          useActiveSection, useDocumentMeta, useScrollToHash
  lib/            contact form schema and submission, class-name helper
  pages/          HomePage, ProjectPage, PrivacyPage, NotFoundPage
  sections/       Hero, FeaturedProjects, Experience, Skills, About, Contact
  styles/         index.css with the design tokens
  test/           test setup and render helper
vite.config.ts    build config; also generates robots.txt and sitemap.xml
vercel.json       Vercel build settings, SPA rewrite, cache headers
netlify.toml      Netlify build settings, SPA redirect, cache headers
```

Design tokens (colours, fonts) are in the `@theme` block of `src/styles/index.css`. Tailwind v4 is configured in CSS, so there is no `tailwind.config.js`.

### Themes

The site has a dark theme (the default) and a light theme, switched with the sun/moon button in the header. The choice is saved in the visitor's browser under the `theme` key and applied before first paint by a small script in `index.html`.

Both themes use the same token names. The dark values are in `@theme` and the light values are in the `:root[data-theme='light']` block just below it, so to adjust a colour you change it in one or both of those places and every component follows. Avoid hard-coded colours in components, since they will not switch.

To follow the visitor's system setting on a first visit instead of always starting dark, extend the script in `index.html` to check `matchMedia('(prefers-color-scheme: light)')` when nothing is saved.

Routes: `/`, `/work/:slug`, `/privacy`, and a not-found page for anything else.

## Deployment

Push the repository to GitHub first. Both platforms then build from it. The site has not been deployed yet; these are the steps.

### Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. The settings are read from `vercel.json`: framework Vite, build command `npm run build`, output directory `dist`. Leave the root directory as the repository root.
3. Under **Environment Variables**, add `VITE_FORMSPREE_FORM_ID` and, once you have a domain, `VITE_SITE_URL`.
4. Deploy.

`vercel.json` rewrites unknown paths to `index.html`, so opening `/work/mentorlink` directly works. Real files such as the CV are served first.

### Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick the repository.
2. The settings are read from `netlify.toml`: build command `npm run build`, publish directory `dist`, Node 22.
3. Under **Site configuration → Environment variables**, add the same two variables.
4. Deploy.

`netlify.toml` contains the equivalent single-page-app redirect.

### Preview deployments

Both platforms build every pull request and every push to a non-production branch at its own temporary URL, and rebuild production on each push to the main branch. Use the preview URL to check a change before merging. On previews, `VITE_SITE_URL` still points at your production domain, which is what you want for canonical links.

### Custom domain

- **Vercel:** Project → Settings → Domains → add the domain, then create the DNS records it shows you.
- **Netlify:** Site configuration → Domain management → add the domain, then create the DNS records it shows you.

Both issue HTTPS certificates automatically once DNS resolves.

### Using both hosts with one canonical domain

A domain can point at only one host. Pick one as primary, attach your domain there, and set `VITE_SITE_URL` to that domain on **both** platforms. The secondary deployment's pages then declare the primary as canonical, so search engines index one copy.

To go further and redirect the secondary's visitors to the primary:

- If Netlify is secondary, add this above the existing redirect in `netlify.toml`, using its real `netlify.app` address:

  ```toml
  [[redirects]]
    from = "https://your-site.netlify.app/*"
    to = "https://yourdomain.com/:splat"
    status = 301
    force = true
  ```

- If Vercel is secondary, add a `redirects` entry to `vercel.json` with a `has` condition matching the `vercel.app` host.

## Quality checks

Results from the last run during development, against the production build:

- `npm run typecheck`, `npm run lint`, `npm test` and `npm run build` all pass.
- Unit and component tests cover contact form validation, success only after confirmation, failure and network-error handling, the email-draft fallback, the mobile menu, routing, direct case-study URLs, the not-found page and content integrity.
- Browser checks in Microsoft Edge at 375, 768, 1024 and 1440 px wide: no horizontal overflow or console errors on any page; navigation and anchor scrolling; the mobile menu; the CV download; case-study navigation; inline form errors; skip link; reduced motion.
- Light theme checks at 320, 375 and 1440 px: the toggle switches themes, the choice survives a reload and route changes, and there is no overflow.
- Colour contrast for every text token on every surface is 4.5:1 or better in both themes.
- Lighthouse, run locally against a gzip-served production build:

  | Page | Performance | Accessibility | Best practices | SEO |
  | --- | --- | --- | --- | --- |
  | Home, desktop | 98–100 | 100 | 100 | 100 |
  | Home, mobile | 84–86 | 100 | 100 | 100 |
  | Case study, mobile | 88–94 | 100 | 100 | 100 |

  These were measured in the dark theme, before the light theme was added. Mobile performance on the home page is below the 90 target. The mobile test simulates a slow phone on slow 4G, where nothing paints until the JavaScript (about 115 kB gzipped) has loaded and run. Scores varied between runs on the development machine, so re-measure on the deployed site. The next step, if you want it higher, is pre-rendering the home page to static HTML at build time.

Not verified, because they need accounts or real devices: a live Formspree submission, the deployed sites on Vercel and Netlify, and physical phones or screen readers.

## Accessibility notes

- Text colours in both themes are 4.5:1 or better against every surface they sit on. To get there, the light theme uses darker accents than the dark theme, and dark-theme primary buttons use dark text on blue (white on `#4F8CFF` falls short).
- Animations respect the "reduce motion" system setting.
- Errors and statuses always pair colour with an icon and text.
