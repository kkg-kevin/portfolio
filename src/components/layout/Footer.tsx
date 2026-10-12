import { Link } from 'react-router'
import { profile, socials } from '../../data/profile'
import { navItems } from '../../data/site'
import { Container } from './Container'

// py-1 keeps each link's tap target above the 24px minimum.
const linkClass = 'inline-block py-1 text-sm text-ink-2 transition-colors hover:text-ink'

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-bg-alt">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-semibold tracking-tight text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {profile.shortName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-2">{profile.footerBlurb}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">Sections</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={`/#${item.id}`} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">Elsewhere</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                  {profile.email}
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cv.href} download={profile.cv.fileName} className={linkClass}>
                  Download CV (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/70 pt-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <Link to="/privacy" className="inline-block w-fit py-1 transition-colors hover:text-ink">
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  )
}
