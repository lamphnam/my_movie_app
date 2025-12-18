import type { MovieListItem } from '@/types'
import { Calendar, Clapperboard, Clock } from 'lucide-react'
import { memo } from 'react'

interface MovieCardTooltipContentProps {
  movie: MovieListItem
}

const MovieCardTooltipContent = memo(({ movie }: MovieCardTooltipContentProps) => {
  const year = new Date(movie.modified).getFullYear()

  return (
    <div className="z-50 space-y-3 p-2">
      <h3 className="font-bold text-lg text-foreground">{movie.name}</h3>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          <span>{movie.time || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clapperboard className="h-3 w-3" />
          <span>{movie.quality}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-4">
        {movie.description?.replace(/<[^>]+>/g, '') || 'Không có mô tả.'}
      </p>
    </div>
  )
})

MovieCardTooltipContent.displayName = 'MovieCardTooltipContent'

export default MovieCardTooltipContent
