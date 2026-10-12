import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'
import { navItems } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

const sectionIds = navItems.map((item) => item.id)
const noSections: readonly string[] = []

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeId = useActiveSection(isHome ? sectionIds : noSections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || menuOpen ? 'border-line/80 bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-h-10 items-center gap-2.5 text-[0.9375rem] font-semibold tracking-tight text-ink"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {profile.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isHome && activeId === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-2 hover:text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out-soft',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={profile.cv.href}
            download={profile.cv.fileName}
            variant="secondary"
            size="sm"
            // Below 380px the row is too tight; the resume link is still in the menu.
            className="max-[379px]:hidden"
          >
            <Download aria-hidden="true" className="size-4" />
            Resume
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-card/70 text-ink transition-colors hover:bg-raised md:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line/80 bg-bg md:hidden"
          >
            <Container className="pb-6 pt-2">
              <ul>
                {navItems.map((item) => (
                  <li key={item.id} className="border-b border-line/60">
                    <Link
                      to={`/#${item.id}`}
                      onClick={closeMenu}
                      aria-current={isHome && activeId === item.id ? 'location' : undefined}
                      className="flex min-h-12 items-center text-base text-ink-2 hover:text-ink aria-[current]:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={profile.cv.href}
                download={profile.cv.fileName}
                variant="secondary"
                className="mt-5 w-full"
              >
                <Download aria-hidden="true" className="size-4" />
                Download resume
              </ButtonLink>
            </Container>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
