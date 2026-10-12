import { ChevronRight } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Bar, MockFrame } from './MockFrame'

const pipeline = ['Question', 'Embedding', 'FAISS search', 'Threshold', 'Answer']
/** Relative similarity of candidate matches. Shapes only; no measured values are implied. */
const candidates = [
  { width: 'w-[88%]', above: true },
  { width: 'w-[64%]', above: true },
  { width: 'w-[41%]', above: false },
  { width: 'w-[27%]', above: false },
]

/** Fictional chat exchange alongside the retrieval steps behind it. */
export function ChatbotVisual() {
  return (
    <MockFrame label="chatbot / retrieval">
      <div className="space-y-3 p-4">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
          {pipeline.map((step, index) => (
            <li key={step} className="flex items-center gap-1">
              <span
                className={cn(
                  'rounded-md px-2 py-1.5 font-mono text-[0.6875rem] leading-none',
                  index === pipeline.length - 1 ? 'bg-mint/10 text-mint' : 'border border-line text-ink-2',
                )}
              >
                {step}
              </span>
              {index < pipeline.length - 1 ? <ChevronRight className="size-3 text-ink-3" /> : null}
            </li>
          ))}
        </ol>

        <div className="grid gap-3 min-[480px]:grid-cols-2">
          <div className="space-y-2.5 rounded-lg border border-line bg-card p-3">
            <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-accent/15 px-3 py-2 text-xs text-ink">
              Where can I find the library opening hours?
            </p>
            <div className="w-[85%] space-y-2 rounded-xl rounded-bl-sm bg-raised px-3 py-3">
              <Bar className="w-full bg-line-strong" />
              <Bar className="w-4/5 bg-line-strong" />
              <Bar className="w-3/5 bg-line-strong" />
            </div>
            <p className="font-mono text-[0.6875rem] text-mint">Matched from knowledge base</p>
          </div>

          <div className="rounded-lg border border-line bg-card p-3">
            <p className="font-mono text-[0.6875rem] text-ink-3">Similarity to question</p>
            <div className="relative mt-3 space-y-2.5">
              {candidates.map((candidate, index) => (
                <span
                  key={index}
                  className={cn('block h-2.5 rounded-full', candidate.width, candidate.above ? 'bg-mint/80' : 'bg-line-strong')}
                />
              ))}
              <span className="absolute -bottom-1 -top-1 left-[52%] border-l border-dashed border-ink-3" />
            </div>
            <p className="mt-3 font-mono text-[0.6875rem] text-ink-3">Dashed line: threshold</p>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
