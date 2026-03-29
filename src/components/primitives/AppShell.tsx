// Structural shell: navbar · scrollable main · optional footer.
// Stateless — accepts rendered slots. Phase B will wire it into the router.

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AppShellProps {
  /** Fixed/sticky navigation rendered above <main>. */
  navbar: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export const AppShell = ({ navbar, children, footer, className }: AppShellProps) => (
  <div className={cn('flex min-h-[100svh] flex-col bg-background text-foreground', className)}>
    {navbar}
    <main className="flex-grow">{children}</main>
    {footer}
  </div>
)
