// src/components/HeroSlider.tsx

import { optimizeImage } from '@/lib/image'
import { cn } from '@/lib/utils'
import type { MovieListItem } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Info, PlayCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GracefulImage from './GracefulImage'
import { Button } from './ui/button'

interface HeroSliderProps {
  movies: MovieListItem[]
  loading: boolean
}

const HeroSlider = ({ movies, loading }: HeroSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (loading) {
    return (
      <div className="animate-pulse aspect-video w-full rounded-2xl bg-gradient-to-br from-card/50 to-accent/10 md:aspect-[2.4/1] border border-white/5 shadow-2xl"></div>
    )
  }
  if (!movies || movies.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-card/30 backdrop-blur-sm" ref={emblaRef}>
      <div className="flex">
        {movies.map((movie) => (
          <div className="relative min-w-0 flex-[0_0_100%]" key={movie.slug}>
            <div className="relative h-[55vh] w-full sm:h-[60vh] md:h-[70vh] lg:h-[75vh]">
              <GracefulImage
                src={optimizeImage(movie.poster_url, 1280)}
                alt={movie.name}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
              {/* Enhanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95"></div>
            </div>

            <div className="absolute inset-0 z-10 flex items-end pb-16 sm:items-center sm:pb-0">
              <div className="container flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left">
                {/* Poster with Glass Effect */}
                <div className="hidden sm:block relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <GracefulImage
                    src={optimizeImage(movie.thumb_url, 500)}
                    alt={`Poster of ${movie.name}`}
                    className="relative h-auto w-48 rounded-xl object-cover shadow-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 md:w-64 lg:w-72"
                  />
                </div>

                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  {/* Premium Badge */}
                  <div className="flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 px-4 py-1.5 text-xs font-bold text-yellow-200 shadow-lg">
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      PHIM NỔI BẬT
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-2xl leading-tight">
                    <span className="text-gradient-gold">{movie.name}</span>
                  </h1>

                  <p className="line-clamp-2 sm:line-clamp-3 text-sm leading-relaxed text-muted-foreground/90 sm:text-base md:text-lg backdrop-blur-sm">
                    {movie.description?.replace(/<[^>]+>/g, '') ||
                      'Nội dung phim đang được cập nhật.'}
                  </p>

                  <div className="flex justify-center gap-2 sm:justify-start sm:gap-3 md:gap-4">
                    <Button asChild size="lg" className="h-11 sm:h-12 px-4 sm:px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 border border-white/10 hover-lift text-sm sm:text-base">
                      <Link to={`/phim/${movie.slug}`} aria-label={`Xem phim ${movie.name}`}>
                        <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        Xem Phim
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="h-11 sm:h-12 px-4 sm:px-6 glass-card hover-lift text-sm sm:text-base">
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

      {/* Premium Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-500 hover:bg-primary',
              selectedIndex === index
                ? 'w-8 bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50'
                : 'w-2 bg-white/30 hover:bg-white/50',
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
