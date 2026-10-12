import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { domAnimation, LazyMotion } from 'framer-motion'
import { MemoryRouter } from 'react-router'

/** Renders a component with the router and motion providers the app supplies. */
export function renderWithProviders(ui: ReactElement, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LazyMotion features={domAnimation}>{ui}</LazyMotion>
    </MemoryRouter>,
  )
}
