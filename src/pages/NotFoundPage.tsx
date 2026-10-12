import { ArrowLeft } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta({
    title: `Page not found | ${profile.name}`,
    description: 'The page you were looking for does not exist.',
    path: '/',
  })

  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center pb-24 pt-32">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-2">
        That address doesn't match a page on this site. It may have been moved or mistyped.
      </p>
      <ButtonLink to="/" variant="secondary" className="mt-8">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to the portfolio
      </ButtonLink>
    </Container>
  )
}
