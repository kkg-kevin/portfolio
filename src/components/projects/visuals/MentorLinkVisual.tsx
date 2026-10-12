import { CalendarCheck, MessageSquareText } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Bar, MockFrame } from './MockFrame'

const roles = ['Mentor', 'Mentee', 'Admin']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
/** Which day columns show a booked session, and where in the column it sits. */
const sessions: Record<string, string> = { Mon: 'top-2', Wed: 'top-8', Thu: 'top-3' }
const engagement = ['h-4', 'h-7', 'h-5', 'h-9', 'h-6', 'h-10', 'h-8']

/** Fictional scheduling screen showing roles, a week of sessions and an admin summary. */
export function MentorLinkVisual() {
  return (
    <MockFrame label="mentorlink / sessions">
      <div className="p-4">
        <ul className="flex gap-1.5">
          {roles.map((role) => (
            <li
              key={role}
              className={cn(
                'rounded-md px-2.5 py-1.5 font-mono text-[0.6875rem] leading-none',
                role === 'Mentor' ? 'bg-accent/10 text-accent' : 'border border-line text-ink-3',
              )}
            >
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {days.map((day) => (
            <div key={day}>
              <p className="text-center font-mono text-[0.6875rem] text-ink-3">{day}</p>
              <div className="relative mt-1.5 h-16 rounded-md border border-line bg-card">
                {sessions[day] ? (
                  <span className={cn('absolute inset-x-1 h-5 rounded bg-accent/70', sessions[day])} />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-2 min-[420px]:grid-cols-[1fr_auto]">
          <div className="space-y-2 rounded-lg border border-line bg-card px-3 py-2.5">
            <p className="flex items-center gap-2 font-mono text-[0.6875rem] text-ink-2">
              <CalendarCheck className="size-3.5 text-accent" />
              Session scheduled
            </p>
            <p className="flex items-center gap-2 font-mono text-[0.6875rem] text-ink-2">
              <MessageSquareText className="size-3.5 text-accent" />
              Feedback
              <Bar className="w-12" />
            </p>
          </div>
          <div className="rounded-lg border border-line bg-card px-3 py-2.5">
            <p className="font-mono text-[0.6875rem] text-ink-3">Engagement</p>
            <div className="mt-1.5 flex h-10 items-end gap-1">
              {engagement.map((height, index) => (
                <span key={index} className={cn('w-2 rounded-sm bg-line-strong', height)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}
