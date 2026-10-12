import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { profile } from './data/profile'
import { projects } from './data/projects'

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it('renders the home page with every section and a case study link per project', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Building software that solves real problems.')
    for (const id of ['work', 'experience', 'skills', 'about', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    for (const project of projects) {
      expect(screen.getByRole('link', { name: `Read the ${project.name} case study` })).toHaveAttribute(
        'href',
        `/work/${project.slug}`,
      )
    }
  })

  it('points contact links at the verified email, phone and GitHub profile', () => {
    renderAt('/')

    expect(screen.getAllByRole('link', { name: profile.email })[0]).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByRole('link', { name: profile.phone.display })).toHaveAttribute('href', 'tel:+254727496461')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/kkg-kevin')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/kevin-kihara-b45817248',
    )
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/254727496461')
  })

  it('renders a case study when its URL is opened directly', async () => {
    renderAt('/work/mentorlink')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('MentorLink')
    expect(screen.getByText('No public demo or repository is linked for this project.')).toBeInTheDocument()
    // The title is set in an effect, which can run just after the heading appears.
    await waitFor(() => expect(document.title).toContain('MentorLink'))
  })

  it('shows a not-found page for an unknown project', async () => {
    renderAt('/work/does-not-exist')
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })

  it('shows a not-found page for an unknown route', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })
})
