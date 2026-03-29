// Replaces the ad-hoc `.container-desktop` class with a typed component.
// Max-width matches --container-max (1280px); padding is responsive via Tailwind.

import { cn } from '@/lib/utils'
import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  /** Render as any block element. Defaults to 'div'. */
  as?: ElementType
}

export const Container = ({ children, className, as: Tag = 'div' }: ContainerProps) => (
  <Tag
    className={cn(
      'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8',
      className,
    )}
  >
    {children}
  </Tag>
)
