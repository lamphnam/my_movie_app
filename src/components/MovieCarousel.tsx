// src/components/MovieCarousel.tsx

import { cn } from '@/lib/utils'
import type { MovieListItem } from '@/types'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { memo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MotionSection } from './Motion'
import MovieCard from './MovieCard'
import MovieCardCompact from './MovieCardCompact'
import MovieCardSkeleton from './MovieCardSkeleton'
import { Button } from './ui/button'

interface MovieCarouselProps {
  title: string
  movies: MovieListItem[]
  loading: boolean
  viewAllLink?: string
  className?: string
}

const MovieCarousel = memo(({ title, movies, loading, viewAllLink, className }: MovieCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const scrollAmount = container.offsetWidth * 0.75
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    container.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }, [])

  const scrollPrev = useCallback(() => scroll('left'), [scroll])
  const scrollNext = useCallback(() => scroll('right'), [scroll])

  const content = (
    <div className={cn('space-y-3 lg:space-y-4', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h2">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden lg:inline-flex items-center gap-1 text-body-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Xem tất cả
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          {/* Desktop scroll buttons */}
          <div className="hidden lg:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="h-8 w-8 rounded-md hover:bg-muted"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="h-8 w-8 rounded-md hover:bg-muted"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide overscroll-x-contain touch-pan-x"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[42vw] sm:w-[180px] lg:w-[200px] flex-shrink-0 snap-start"
            >
              <MovieCardSkeleton />
            </div>
          ))
          : movies.map((movie) => (
            <div
              key={movie.slug}
              className="w-[42vw] sm:w-[180px] lg:w-[200px] flex-shrink-0 snap-start"
            >
              {/* Use compact card on mobile, regular on desktop */}
              <div className="lg:hidden">
                <MovieCardCompact movie={movie} />
              </div>
              <div className="hidden lg:block">
                <MovieCard movie={movie} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  // No motion on mobile for performance
  return (
    <>
      <div className="lg:hidden">{content}</div>
      <div className="hidden lg:block">
        <MotionSection
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {content}
        </MotionSection>
      </div>
    </>
  )
})

MovieCarousel.displayName = 'MovieCarousel'

export default MovieCarousel
