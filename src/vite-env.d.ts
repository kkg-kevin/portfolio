/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_FORM_ID?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Canonical site origin, injected by vite.config.ts. */
declare const __SITE_URL__: string
