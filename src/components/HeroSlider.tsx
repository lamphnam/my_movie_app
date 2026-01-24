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
    <div className="relative w-full overflow-hidden rounded-lg md:rounded-2xl border border-white/10 shadow-lg md:shadow-xl bg-card/20">
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
            <div className="relative h-[50svh] w-full sm:h-[55svh] md:h-[65vh]">
              <GracefulImage
                src={optimizeImage(movie.poster_url, 1280)}
                alt={movie.name}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
              {/* Simplified gradients for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent md:via-background/50"></div>
            </div>

            <div className="absolute inset-0 z-10 flex items-end pb-20 sm:pb-16 md:items-center md:pb-0">
              <div className="container flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-8 sm:text-left px-4 sm:px-6">
                {/* Poster - desktop only */}
                <div className="hidden md:block relative group flex-shrink-0">
                  <GracefulImage
                    src={optimizeImage(movie.thumb_url, 400)}
                    alt={`Poster of ${movie.name}`}
                    className="h-auto w-48 rounded-lg object-cover shadow-lg border border-white/10 lg:w-56"
                  />
                </div>

                <div className="max-w-2xl space-y-2 sm:space-y-3">
                  {/* Badge - simplified on mobile */}
                  <div className="flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-bold text-yellow-200">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      PHIM NỔI BẬT
                    </span>
                  </div>

                  {/* Title - no gradient on mobile */}
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground md:text-3xl lg:text-4xl leading-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
                    <span className="md:text-gradient-gold">{movie.name}</span>
                  </h1>

                  {/* Description - mobile optimized */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-foreground/85 md:text-base" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                    {movie.description?.replace(/<[^>]+>/g, '') ||
                      'Nội dung phim đang được cập nhật.'}
                  </p>

                  {/* Action buttons - mobile optimized */}
                  <div className="flex justify-center gap-2 sm:justify-start sm:gap-3">
                    <Button asChild size="default" className="tap-target bg-primary hover:bg-primary/90 shadow-md">
                      <Link to={`/phim/${movie.slug}`} aria-label={`Xem phim ${movie.name}`}>
                        <PlayCircle className="w-4 h-4" />
                        Xem Phim
                      </Link>
                    </Button>
                    <Button asChild size="default" variant="secondary" className="tap-target bg-card/80 hover:bg-card">
                      <Link to={`/phim/${movie.slug}`} aria-label={`Xem chi tiết ${movie.name}`}>
                        <Info className="w-4 h-4" />
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

      {/* Pagination Dots - simplified */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              'h-1.5 rounded-full transition-all tap-target',
              selectedIndex === index
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-white/40 hover:bg-white/60',
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
