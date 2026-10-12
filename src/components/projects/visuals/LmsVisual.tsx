import { FileText, ShieldCheck } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Bar, MockFrame } from './MockFrame'

const areas = ['Curriculum', 'Assessments', 'Learners', 'Billing', 'Payments', 'Audit log']

const rows = [
  { width: 'w-24', status: 'Graded', tone: 'mint' },
  { width: 'w-32', status: 'Submitted', tone: 'blue' },
  { width: 'w-20', status: 'Submitted', tone: 'blue' },
  { width: 'w-28', status: 'Draft', tone: 'muted' },
] as const

const tones = {
  mint: 'bg-mint/10 text-mint',
  blue: 'bg-accent/10 text-accent',
  muted: 'bg-raised text-ink-3',
}

/** Fictional admin screen. It mirrors the kinds of areas the LMS covers, not its real interface. */
export function LmsVisual() {
  return (
    <MockFrame label="lms / assessments">
      <div className="grid grid-cols-[auto_1fr]">
        <ul className="hidden w-32 space-y-1 border-r border-line p-3 min-[420px]:block">
          {areas.map((area) => (
            <li
              key={area}
              className={cn(
                'rounded-md px-2 py-1.5 font-mono text-[0.6875rem]',
                area === 'Assessments' ? 'bg-accent/10 text-accent' : 'text-ink-3',
              )}
            >
              {area}
            </li>
          ))}
        </ul>

        <div className="col-span-2 min-w-0 p-4 min-[420px]:col-span-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink">Assessments</p>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-ink-2">
              <ShieldCheck className="size-3 text-accent" />
              Role: Educator
            </span>
          </div>

          <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
            {rows.map((row, index) => (
              <li key={index} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="size-5 shrink-0 rounded-full bg-raised" />
                  <Bar className={row.width} />
                </div>
                <span className={cn('rounded-md px-1.5 py-1 font-mono text-[0.6875rem] leading-none', tones[row.tone])}>
                  {row.status}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2.5">
            <FileText className="size-4 shrink-0 text-ink-3" />
            <span className="truncate font-mono text-[0.6875rem] text-ink-2">report.pdf generated</span>
            <span className="ml-auto shrink-0 font-mono text-[0.6875rem] text-ink-3">logged</span>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
