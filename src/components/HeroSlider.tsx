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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2000 })])
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
      <div className="animate-pulse aspect-video w-full rounded-lg bg-card md:aspect-[2.4/1]"></div>
    )
  }
  if (!movies || movies.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-lg" ref={emblaRef}>
      <div className="flex">
        {movies.map((movie) => (
          <div className="relative min-w-0 flex-[0_0_100%]" key={movie.slug}>
            {/* THAY ĐỔI: Chiều cao được điều chỉnh cho mobile */}
            <div className="relative h-[70vh] w-full sm:h-[65vh] md:h-[65vh]">
              <GracefulImage
                src={optimizeImage(movie.poster_url, 1280)}
                alt={movie.name}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
            </div>

            {/* THAY ĐỔI: Tăng padding bottom trên mobile */}
            <div className="absolute inset-0 z-10 flex items-end pb-12 sm:items-center sm:pb-0">
              <div className="container flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-8 sm:text-left">
                <GracefulImage
                  src={optimizeImage(movie.thumb_url, 500)}
                  alt={`Poster of ${movie.name}`}
                  className="hidden h-auto w-40 rounded-lg object-cover shadow-2xl sm:block md:w-52"
                />
                <div className="max-w-md space-y-3">
                  {/* THAY ĐỔI: Tinh chỉnh kích thước chữ */}
                  <h1 className="text-2xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    {movie.name}
                  </h1>
                  <p className="line-clamp-3 text-sm text-muted-foreground sm:text-base">
                    {movie.description?.replace(/<[^>]+>/g, '') ||
                      'Nội dung phim đang được cập nhật.'}
                  </p>
                  <div className="flex justify-center gap-2 sm:justify-start sm:gap-4">
                    <Button asChild size="lg">
                      <Link to={`/phim/${movie.slug}`}>
                        <PlayCircle />
                        Xem Phim
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link to={`/phim/${movie.slug}`}>
                        <Info />
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
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-300',
              selectedIndex === index ? 'w-4 bg-primary' : 'bg-primary/50',
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
