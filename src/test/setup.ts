import '@testing-library/jest-dom/vitest'
import { cleanup, configure } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Lazy-loaded pages can take longer than the 1s default to import on a busy machine.
configure({ asyncUtilTimeout: 10_000 })

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

// jsdom does not implement these browser APIs.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}))

window.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}
