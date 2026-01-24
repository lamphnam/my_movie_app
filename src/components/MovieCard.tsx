// src/components/MovieCard.tsx

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { optimizeImage } from '@/lib/image'
import type { MovieListItem } from '@/types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import GracefulImage from './GracefulImage'
import MovieCardTooltipContent from './MovieCardTooltipContent'

interface MovieCardProps {
  movie: MovieListItem
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const optimizedThumbUrl = optimizeImage(movie.thumb_url, 300)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link to={`/phim/${movie.slug}`} className="movie-card-desktop group block outline-none" tabIndex={0}>
          {/* Poster Container */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
            <GracefulImage
              src={optimizedThumbUrl}
              alt={movie.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="300"
            />

            {/* Quality Badge - Top Left */}
            <div className="absolute top-2 left-2">
              <span className="badge-primary text-[10px] px-1.5 py-0.5">
                {movie.quality}
              </span>
            </div>

            {/* Episode Badge - Top Right */}
            <div className="absolute top-2 right-2">
              <span className="badge-secondary text-[10px] px-1.5 py-0.5">
                {movie.current_episode}
              </span>
            </div>

            {/* Hover Overlay - Simple centered play button */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Card Content - Below poster */}
          <div className="pt-2 space-y-0.5">
            <h3 className="text-body font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors" title={movie.name}>
              {movie.name}
            </h3>
            <p className="text-body-sm line-clamp-1" title={movie.original_name}>
              {movie.original_name}
            </p>
          </div>
        </Link>
      </PopoverTrigger>

      {/* Popover for desktop - on hover/focus */}
      <PopoverContent className="hidden lg:block w-72 surface-card p-3" side="right" align="start" sideOffset={8}>
        <MovieCardTooltipContent movie={movie} />
      </PopoverContent>
    </Popover>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
