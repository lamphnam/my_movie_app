// src/components/MovieGrid.tsx

import type React from 'react'
import { memo } from 'react'

interface MovieGridProps {
  children: React.ReactNode
}

const MovieGrid = memo(({ children }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  )
})

MovieGrid.displayName = 'MovieGrid'

export default MovieGrid
