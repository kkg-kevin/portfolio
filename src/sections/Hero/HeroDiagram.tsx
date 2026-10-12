import { m } from 'framer-motion'
import { AppWindow, BrainCircuit, Database, Server, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

interface Layer {
  id: string
  name: string
  tech: string
  notes: string[]
  icon: LucideIcon
  tone: 'blue' | 'mint'
}

/** The layers Kevin works across, with details drawn from his CV. */
const layers: Layer[] = [
  { id: '01', name: 'Interface', tech: 'React · JavaScript', notes: ['Web apps', 'Public sites'], icon: AppWindow, tone: 'blue' },
  { id: '02', name: 'API', tech: 'Node.js · Express · REST', notes: ['JWT auth', 'RBAC'], icon: Server, tone: 'blue' },
  { id: '03', name: 'Data', tech: 'MySQL · MongoDB', notes: ['Schemas', 'Migrations'], icon: Database, tone: 'blue' },
  { id: '04', name: 'Retrieval', tech: 'Python · Embeddings · FAISS', notes: ['Semantic search'], icon: BrainCircuit, tone: 'mint' },
]

/**
 * Hero visual: a layered view of the stack, from interface to retrieval.
 * Decorative for assistive tech; the same information is in the Skills section.
 */
export function HeroDiagram() {
  return (
    <div className="relative" role="img" aria-label="Diagram of the layers Kevin works across: interface, API, data and retrieval.">
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 -inset-y-10 -z-10 rounded-full bg-accent/15 blur-3xl"
      />
      <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-line bg-bg-alt/80 shadow-2xl shadow-shadow backdrop-blur">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-[0.6875rem] text-ink-3">stack.overview</span>
        </div>

        <ol className="relative p-4 sm:p-5">
          {/* Rail connecting the layers */}
          <m.span
            className="absolute bottom-12 left-[2.375rem] top-12 w-px origin-top bg-gradient-to-b from-accent/70 via-accent/40 to-mint/70 sm:left-[2.625rem]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          />
          {layers.map((layer, index) => (
            <m.li
              key={layer.id}
              className="relative flex items-start gap-3.5 py-2.5 sm:gap-4"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <span
                className={cn(
                  'relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border bg-card',
                  layer.tone === 'mint' ? 'border-mint/40 text-mint' : 'border-accent/40 text-accent',
                )}
              >
                <layer.icon className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1 rounded-xl border border-line bg-card/80 px-3.5 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-ink">{layer.name}</p>
                  <span className="font-mono text-[0.6875rem] text-ink-3">{layer.id}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-ink-2">{layer.tech}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {layer.notes.map((note) => (
                    <span
                      key={note}
                      className={cn(
                        'rounded-md px-1.5 py-1 font-mono text-[0.6875rem] leading-none',
                        layer.tone === 'mint' ? 'bg-mint/10 text-mint' : 'bg-accent/10 text-accent',
                      )}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </m.li>
          ))}
        </ol>
      </div>
    </div>
  )
}
