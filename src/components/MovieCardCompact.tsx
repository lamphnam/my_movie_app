import { Link } from 'react-router-dom'
import { Clapperboard, Play, Star } from 'lucide-react'
import GracefulImage from './GracefulImage'
import { optimizeImage, generatePosterSrcSet, POSTER_SIZES_MOBILE_GRID } from '@/lib/image'
import { Badge } from './ui/badge'

interface MovieCardCompactProps {
  movie: {
    _id?: string
    slug?: string
    name?: string
    origin_name?: string
    original_name?: string
    poster_url?: string
    thumb_url?: string
    year?: number
    quality?: string
    lang?: string
    current_episode?: string
    tmdb?: {
      vote_average?: number
    }
  }
}

export default function MovieCardCompact({ movie }: MovieCardCompactProps) {
  const slug = movie.slug || movie._id || ''
  const posterUrl = movie.poster_url || movie.thumb_url || ''
  const title = movie.name || movie.origin_name || 'Untitled'
  const subtitle = movie.original_name || movie.origin_name
  const rating = movie.tmdb?.vote_average

  return (
    <Link
      to={`/phim/${slug}`}
      className="group block tap-target rounded-xl interactive-focus focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Xem chi tiết phim ${title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted border border-border/60 shadow-sm">
        <GracefulImage
          src={optimizeImage(posterUrl, 360, 540)}
          srcSet={generatePosterSrcSet(posterUrl)}
          sizes={POSTER_SIZES_MOBILE_GRID}
          alt={title}
          width={360}
          height={540}
          className="w-full h-full object-cover object-center poster-image"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-active:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" aria-hidden="true" />
          </div>
        </div>

        {movie.quality && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 text-xs font-semibold bg-black/70 border-0"
          >
            {movie.quality}
          </Badge>
        )}

        {rating && rating > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-xs font-semibold">
            <Star className="w-3 h-3 text-yellow-400 fill-current" aria-hidden="true" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}

        {movie.current_episode && (
          <div className="absolute bottom-2 left-2 max-w-[80%]">
            <span className="badge-overlay truncate">
              <Clapperboard className="w-3 h-3" aria-hidden="true" />
              {movie.current_episode}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2.5 space-y-1">
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        {subtitle && subtitle !== title && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {movie.year && <span>{movie.year}</span>}
          {movie.lang && <span>{movie.lang}</span>}
          {!movie.year && !movie.lang && <span>Chạm để xem chi tiết</span>}
        </div>
      </div>
    </Link>
  )
}
