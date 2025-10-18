// src/components/HeroBanner.tsx

import { optimizeImage } from '@/lib/image'
import type { MovieListItem } from '@/types'
import { Info, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import GracefulImage from './GracefulImage' // Sử dụng GracefulImage cho mượt mà
import { Button } from './ui/button'

interface HeroBannerProps {
  movie?: MovieListItem
  loading: boolean
}

const HeroBanner = ({ movie, loading }: HeroBannerProps) => {
  if (loading) {
    return (
      <div className="animate-pulse aspect-video w-full rounded-lg bg-card md:aspect-[2.4/1]"></div>
    )
  }
  if (!movie) return null

  const backgroundUrl = optimizeImage(movie.poster_url, 1280)
  const posterUrl = optimizeImage(movie.thumb_url, 500)

  return (
    <section className="relative h-[80vh] w-full overflow-hidden rounded-lg sm:h-[70vh] md:h-[65vh]">
      <div className="absolute inset-0">
        <GracefulImage
          src={backgroundUrl}
          alt={movie.name}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 flex h-full items-end pb-8 sm:items-center sm:pb-0">
        <div className="container flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-8 sm:text-left">
          <GracefulImage
            src={posterUrl}
            alt={`Poster of ${movie.name}`}
            className="hidden h-auto w-40 rounded-lg object-cover shadow-2xl sm:block md:w-52"
          />
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {movie.name}
            </h1>
            <p className="line-clamp-3 text-sm text-muted-foreground sm:text-base">
              {movie.description?.replace(/<[^>]+>/g, '') || 'Nội dung phim đang được cập nhật.'}
            </p>
            <div className="flex justify-center gap-2 sm:justify-start sm:gap-4">
              <Button asChild size="lg">
                <Link to={`/phim/${movie.slug}`}>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Xem Phim
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to={`/phim/${movie.slug}`}>
                  <Info className="mr-2 h-5 w-5" />
                  Chi Tiết
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
