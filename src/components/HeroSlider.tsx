// src/components/HeroSlider.tsx

import { optimizeImage } from '@/lib/image'
import { cn } from '@/lib/utils'
import type { MovieListItem } from '@/types'
import { Info, PlayCircle, Star } from 'lucide-react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GracefulImage from './GracefulImage'
import { Button } from './ui/button'

interface HeroSliderProps {
  movies: MovieListItem[]
  loading: boolean
}

const HeroSlider = memo(({ movies, loading }: HeroSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isUserInteractingRef = useRef(false)

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const targetScroll = container.offsetWidth * index

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }, [])

  // Debounced scroll handler - only update when scroll ends
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return

    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set new timeout to update after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return
      const container = scrollRef.current
      const newIndex = Math.round(container.scrollLeft / container.offsetWidth)

      // Only update if index actually changed
      setSelectedIndex(prev => {
        if (prev !== newIndex) {
          return newIndex
        }
        return prev
      })
    }, 100) // Debounce for 100ms after scroll ends
  }, [])

  // Pause/resume autoplay on user interaction
  const handleInteractionStart = useCallback(() => {
    isUserInteractingRef.current = true
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }, [])

  const handleInteractionEnd = useCallback(() => {
    isUserInteractingRef.current = false
    // Resume autoplay after interaction ends
    if (movies && movies.length > 0) {
      autoplayRef.current = setInterval(() => {
        if (!isUserInteractingRef.current) {
          setSelectedIndex((current) => {
            const next = (current + 1) % movies.length
            scrollToIndex(next)
            return next
          })
        }
      }, 4000)
    }
  }, [movies, scrollToIndex])

  // Autoplay functionality
  useEffect(() => {
    if (!movies || movies.length === 0) return

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        if (!isUserInteractingRef.current) {
          setSelectedIndex((current) => {
            const next = (current + 1) % movies.length
            scrollToIndex(next)
            return next
          })
        }
      }, 4000)
    }

    startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [movies, scrollToIndex])

  if (loading) {
    return (
      <div className="animate-pulse aspect-video w-full rounded-2xl bg-gradient-to-br from-card/50 to-accent/10 md:aspect-[2.4/1] border border-white/5 shadow-xl"></div>
    )
  }
  if (!movies || movies.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-card/30 backdrop-blur-sm">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]"
        onScroll={handleScroll}
        onPointerDown={handleInteractionStart}
        onPointerUp={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        {movies.map((movie) => (
          <div className="relative w-full flex-shrink-0 snap-start" key={movie.slug}>
            <div className="relative h-[55svh] w-full sm:h-[60svh] md:h-[70vh] lg:h-[75vh]">
              <GracefulImage
                src={optimizeImage(movie.poster_url, 1280)}
                alt={movie.name}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
              {/* Gradient Overlays - optimized for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent"></div>
            </div>

            <div className="absolute inset-0 z-10 flex items-end pb-16 sm:items-center sm:pb-0">
              <div className="container flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left px-4 sm:px-6">
                {/* Poster */}
                <div className="hidden sm:block relative group flex-shrink-0">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <GracefulImage
                    src={optimizeImage(movie.thumb_url, 500)}
                    alt={`Poster of ${movie.name}`}
                    className="relative h-auto w-48 rounded-xl object-cover shadow-xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 md:w-64 lg:w-72"
                  />
                </div>

                <div className="max-w-2xl space-y-3 sm:space-y-4 md:space-y-5">
                  {/* Badge */}
                  <div className="flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 px-4 py-1.5 text-xs font-bold text-yellow-200 shadow-lg">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      PHIM NỔI BẬT
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl xl:text-6xl leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
                    <span className="text-gradient-gold">{movie.name}</span>
                  </h1>

                  <p className="line-clamp-2 sm:line-clamp-3 text-sm leading-relaxed text-foreground/90 sm:text-base md:text-lg" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>
                    {movie.description?.replace(/<[^>]+>/g, '') ||
                      'Nội dung phim đang được cập nhật.'}
                  </p>

                  <div className="flex justify-center gap-2 sm:justify-start sm:gap-3 md:gap-4">
                    <Button asChild size="lg" className="h-11 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg border border-white/10 hover-lift text-sm sm:text-base touch-target">
                      <Link to={`/phim/${movie.slug}`} aria-label={`Xem phim ${movie.name}`}>
                        <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Xem Phim
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="h-11 sm:h-12 px-4 sm:px-6 bg-card/60 hover:bg-card/80 text-sm sm:text-base touch-target">
                      <Link to={`/phim/${movie.slug}`} aria-label={`Xem chi tiết ${movie.name}`}>
                        <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                        Chi Tiết
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-500 hover:bg-primary touch-target',
              selectedIndex === index
                ? 'w-8 bg-gradient-to-r from-primary to-accent shadow-lg'
                : 'w-2 bg-white/30 hover:bg-white/50',
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
})

HeroSlider.displayName = 'HeroSlider'

export default HeroSlider
