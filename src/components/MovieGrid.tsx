import type React from 'react'

interface MovieGridProps {
  children: React.ReactNode
}

const MovieGrid: React.FC<MovieGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  )
}

export default MovieGrid
