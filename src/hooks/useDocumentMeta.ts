import { useEffect } from 'react'
import { siteUrl } from '../data/site'

interface DocumentMeta {
  title: string
  description: string
  /** Route path starting with "/", used for the canonical and Open Graph URLs. */
  path: string
}

function setContent(selector: string, value: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value)
}

/** Keeps the title, description, canonical link and Open Graph tags in step with the current route. */
export function useDocumentMeta({ title, description, path }: DocumentMeta) {
  useEffect(() => {
    const url = `${siteUrl}${path}`
    document.title = title
    setContent('meta[name="description"]', description)
    setContent('meta[property="og:title"]', title)
    setContent('meta[property="og:description"]', description)
    setContent('meta[property="og:url"]', url)
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url)
  }, [title, description, path])
}
