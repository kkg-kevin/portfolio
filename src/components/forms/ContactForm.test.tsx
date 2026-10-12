import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/render'
import { openEmailDraft } from '../../lib/contact'
import { ContactForm } from './ContactForm'

// jsdom cannot navigate to mailto: links, so the hand-off to the email app is replaced.
vi.mock('../../lib/contact', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../lib/contact')>()),
  openEmailDraft: vi.fn(),
}))

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Name'), 'Amina Otieno')
  await user.type(screen.getByLabelText('Email address'), 'amina@example.com')
  await user.type(screen.getByLabelText('Message'), 'I would like to talk about a role.')
}

function mockFetch(response: Partial<Response> | Error) {
  const fetchMock = vi.fn(() => (response instanceof Error ? Promise.reject(response) : Promise.resolve(response as Response)))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('ContactForm', () => {
  it('shows inline errors and does not submit when required fields are empty', async () => {
    const fetchMock = mockFetch({ ok: true })
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="testform" />)

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByText('Enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(screen.getByText('Write a message of at least 10 characters.')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a malformed email address', async () => {
    const fetchMock = mockFetch({ ok: true })
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="testform" />)

    await user.type(screen.getByLabelText('Name'), 'Amina Otieno')
    await user.type(screen.getByLabelText('Email address'), 'not-an-email')
    await user.type(screen.getByLabelText('Message'), 'I would like to talk about a role.')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByText(/Enter a valid email address/)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows success only after the service confirms the submission', async () => {
    let resolveFetch: (value: Response) => void = () => {}
    const fetchMock = vi.fn(() => new Promise<Response>((resolve) => (resolveFetch = resolve)))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="testform" />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    // While the request is pending: no success message, and the button is locked.
    const pendingButton = await screen.findByRole('button', { name: /Sending/ })
    expect(pendingButton).toBeDisabled()
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument()
    await user.click(pendingButton)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    resolveFetch({ ok: true } as Response)

    expect(await screen.findByText('Message sent')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith('https://formspree.io/f/testform', expect.objectContaining({ method: 'POST' }))
  })

  it('shows a recoverable error and keeps the message when the service rejects it', async () => {
    mockFetch({ ok: false, json: () => Promise.resolve({ errors: [{ message: 'Form not found.' }] }) })
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="testform" />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent("Your message wasn't sent.")
    expect(alert).toHaveTextContent('Form not found.')
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toHaveValue('I would like to talk about a role.')
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })

  it('shows an error when the network request fails', async () => {
    mockFetch(new TypeError('Failed to fetch'))
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="testform" />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't reach the form service.")
  })

  it('falls back to an email draft and never claims delivery when no form ID is configured', async () => {
    const fetchMock = mockFetch({ ok: true })
    const user = userEvent.setup()
    renderWithProviders(<ContactForm formId="" />)

    expect(screen.getByText(/Sending opens a pre-filled draft in your email app/)).toBeInTheDocument()
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Open email draft' }))

    await waitFor(() => expect(screen.getByText(/only sent once you send it from there/)).toBeInTheDocument())
    expect(openEmailDraft).toHaveBeenCalledWith(expect.stringMatching(/^mailto:kiharakevin505@gmail\.com\?subject=/))
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
