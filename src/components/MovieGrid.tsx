// src/components/MovieGrid.tsx (Cập nhật)

import type React from 'react'
import { MotionDiv } from './Motion' // <-- IMPORT

interface MovieGridProps {
  children: React.ReactNode
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Thời gian trễ giữa mỗi card con
    },
  },
}

const MovieGrid: React.FC<MovieGridProps> = ({ children }) => {
  return (
    <MotionDiv // <-- Dùng MotionDiv
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      variants={gridContainerVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </MotionDiv>
  )
}

export default MovieGrid
