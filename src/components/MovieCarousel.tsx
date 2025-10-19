// src/components/MovieCarousel.tsx

import { cn } from '@/lib/utils'
import type { MovieListItem } from '@/types'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MotionSection } from './Motion' // Import component motion
import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'
import { Button } from './ui/button'

interface MovieCarouselProps {
  title: string
  movies: MovieListItem[]
  loading: boolean
  viewAllLink?: string
  className?: string
}

const MovieCarousel = ({ title, movies, loading, viewAllLink, className }: MovieCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    const currentIndex = emblaApi.selectedScrollSnap()
    const targetIndex = Math.max(currentIndex - 2, 0)
    emblaApi.scrollTo(targetIndex)
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    const currentIndex = emblaApi.selectedScrollSnap()
    const maxIndex = emblaApi.scrollSnapList().length - 1
    const targetIndex = Math.min(currentIndex + 2, maxIndex)
    emblaApi.scrollTo(targetIndex)
  }, [emblaApi])

  return (
    <MotionSection // Thay thế <section> bằng <MotionSection>
      className={cn('space-y-4', className)}
      // Định nghĩa animation
      initial={{ opacity: 0, y: 20 }} // Trạng thái ban đầu: vô hình, dịch xuống 20px
      whileInView={{ opacity: 1, y: 0 }} // Animate khi component xuất hiện trong viewport
      viewport={{ once: true, amount: 0.2 }} // Animation chỉ chạy 1 lần, khi 20% component hiện ra
      transition={{ duration: 0.6, ease: 'easeInOut' }} // Thời gian và kiểu animation
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Button asChild variant="link" className="hidden text-muted-foreground sm:inline-flex">
              <Link to={viewAllLink}>
                Xem tất cả
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          <div className="hidden sm:flex">
            <Button variant="ghost" size="icon" onClick={scrollPrev}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={scrollNext}>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4 pb-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-0 flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
                >
                  <MovieCardSkeleton />
                </div>
              ))
            : movies.map((movie) => (
                <div
                  key={movie.slug}
                  className="min-w-0 flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
        </div>
      </div>
    </MotionSection>
  )
}

export default MovieCarousel
