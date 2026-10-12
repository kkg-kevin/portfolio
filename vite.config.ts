/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects.ts'

/**
 * Resolves the public origin of the site, without a trailing slash.
 * Priority: VITE_SITE_URL, then the URL each host exposes at build time,
 * then localhost so local builds still produce valid output.
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const candidates = [
    env.VITE_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.URL, // Netlify
  ]
  const url = candidates.find((value) => value && value.trim().length > 0) ?? 'http://localhost:5173'
  return url.trim().replace(/\/+$/, '')
}

/** Injects the site URL into index.html and emits robots.txt and sitemap.xml. */
function seoFiles(siteUrl: string): Plugin {
  const routes = ['/', ...projects.map((project) => `/work/${project.slug}`), '/privacy']
  return {
    name: 'portfolio-seo-files',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    generateBundle() {
      const urls = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(loadEnv(mode, process.cwd(), 'VITE_'))
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: false,
      // Form tests type character by character, which is slow in jsdom on a busy machine.
      testTimeout: 20_000,
    },
  }
})
