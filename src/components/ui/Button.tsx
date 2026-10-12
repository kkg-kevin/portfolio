import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface StyleProps {
  variant?: Variant
  size?: Size
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition duration-200 ease-out-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100'

const variants: Record<Variant, string> = {
  // Dark text on blue: white on #4F8CFF does not reach 4.5:1.
  primary: 'bg-accent text-bg hover:bg-accent-hover',
  secondary: 'border border-line bg-card/70 text-ink hover:border-line-strong hover:bg-raised',
  ghost: 'text-ink-2 hover:bg-card hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-3.5 text-sm',
  md: 'h-12 px-5 text-[0.9375rem]',
}

function buttonStyles({ variant = 'primary', size = 'md', className }: StyleProps): string {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />
}

type ButtonLinkProps = StyleProps & {
  children: ReactNode
  /** Opens in a new tab with safe rel attributes. Only applies to `href`. */
  external?: boolean
  /** Suggested filename; makes the browser download instead of navigate. */
  download?: string
  'aria-label'?: string
} & ({ to: string; href?: never } | { href: string; to?: never })

/** A link styled as a button. Use `to` for in-app routes and `href` for files, mailto and external URLs. */
export function ButtonLink({ variant, size, className, children, external, download, to, href, ...rest }: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className })

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
