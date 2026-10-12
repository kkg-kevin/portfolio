import { ArrowDown, FileCode2, Map as MapIcon } from 'lucide-react'
import { Bar, MockFrame } from './MockFrame'

const steps = ['LMS REST API', 'React pages', 'Puppeteer pre-render']

/** Diagram of the pre-rendering pipeline: dynamic content in, static pages and a sitemap out. */
export function WebsiteVisual() {
  return (
    <MockFrame label="build / pre-render">
      <div className="p-4">
        <ol className="space-y-1.5">
          {steps.map((step, index) => (
            <li key={step}>
              <div className="flex items-center gap-3 rounded-lg border border-line bg-card px-3 py-2.5">
                <span className="font-mono text-[0.6875rem] text-accent">0{index + 1}</span>
                <span className="font-mono text-xs text-ink">{step}</span>
                <Bar className="ml-auto hidden w-16 min-[420px]:block" />
              </div>
              <ArrowDown className="mx-auto mt-1.5 size-3.5 text-ink-3" />
            </li>
          ))}
        </ol>

        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2.5">
            <FileCode2 className="size-4 shrink-0 text-accent" />
            <span className="truncate font-mono text-xs text-ink">static HTML</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2.5">
            <MapIcon className="size-4 shrink-0 text-accent" />
            <span className="truncate font-mono text-xs text-ink">sitemap.xml</span>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
