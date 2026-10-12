import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Scrolls to the element named in the URL hash after navigation, and to the
 * top of the page when there is no hash. Focus follows so keyboard and
 * screen-reader users land in the same place.
 */
export function useScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      // 'instant' rather than 'auto', which would inherit the page's smooth scrolling.
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    target.focus({ preventScroll: true })
  }, [pathname, hash, key])
}
