import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the upper-middle of the
 * viewport, or null when none is. Pass an empty list to disable tracking.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActiveId(ids.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      setActiveId(null)
    }
  }, [ids])

  return activeId
}
