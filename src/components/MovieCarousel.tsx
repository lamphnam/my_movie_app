// src/components/MovieCarousel.tsx

import { cn } from '@/lib/utils'
import type { MovieListItem } from '@/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
    const scrollAmount = container.offsetWidth * 0.8
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
    <div className={cn('space-y-4 md:space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2 md:gap-3">
          {viewAllLink && (
            <Button asChild variant="link" className="hidden text-muted-foreground hover:text-primary sm:inline-flex font-semibold group text-sm">
              <Link to={viewAllLink}>
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
          <div className="hidden sm:flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors tap-target"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors tap-target"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 px-1 pb-3 md:pb-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[40vw] sm:w-[280px] md:w-[240px] lg:w-[220px] flex-shrink-0 snap-start"
            >
              <MovieCardSkeleton />
            </div>
          ))
          : movies.map((movie) => (
            <div
              key={movie.slug}
              className="w-[40vw] sm:w-[280px] md:w-[240px] lg:w-[220px] flex-shrink-0 snap-start"
            >
              {/* Use compact card on mobile, regular on desktop */}
              <div className="md:hidden">
                <MovieCardCompact movie={movie} />
              </div>
              <div className="hidden md:block">
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
      <div className="md:hidden">
        {content}
      </div>
      <div className="hidden md:block">
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {content}
        </MotionSection>
      </div>
    </>
  )
})

MovieCarousel.displayName = 'MovieCarousel'

export default MovieCarousel
