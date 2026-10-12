import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { profile } from '../../data/profile'
import { renderWithProviders } from '../../test/render'
import { Header } from './Header'

describe('Header', () => {
  it('links the resume action to the CV file as a download', () => {
    renderWithProviders(<Header />)

    const resume = screen.getByRole('link', { name: 'Resume' })
    expect(resume).toHaveAttribute('href', profile.cv.href)
    expect(resume).toHaveAttribute('download', profile.cv.fileName)
  })

  it('opens the mobile menu, then closes it when a link is chosen', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

    const menu = screen.getByRole('navigation', { name: 'Mobile' })
    await user.click(within(menu).getByRole('link', { name: 'Contact' }))

    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('switches between dark and light themes and remembers the choice', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('closes the mobile menu with Escape', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument())
  })
})
