// src/components/MovieCard.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { optimizeImage } from '@/lib/image'
import type { MovieListItem } from '@/types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import GracefulImage from './GracefulImage'
import { MotionDiv } from './Motion' // Import component motion
import MovieCardTooltipContent from './MovieCardTooltipContent'

interface MovieCardProps {
  movie: MovieListItem
}
const cardVariants = {
  hidden: { y: 20, opacity: 0 }, // Trạng thái ban đầu
  show: { y: 0, opacity: 1 }, // Trạng thái khi hiện ra
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const optimizedThumbUrl = optimizeImage(movie.thumb_url, 300)

  return (
    <MotionDiv variants={cardVariants}>
      <Popover>
        <PopoverTrigger asChild>
          <Link to={`/phim/${movie.slug}`} className="group block outline-none" tabIndex={0}>
            <Card className="overflow-hidden border-white/5 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:-translate-y-3 group-hover:scale-[1.02]">
              <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <GracefulImage
                  src={optimizedThumbUrl}
                  alt={movie.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  width="300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-all duration-500 group-hover:opacity-100 backdrop-blur-sm">
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur-md border border-white/30 animate-pulse-glow">
                    <i className="fa-solid fa-play text-5xl text-white drop-shadow-2xl"></i>
                  </div>
                </div>

                {/* Quality Badge - Premium Style */}
                <div className="absolute top-3 left-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20">
                  <span className="drop-shadow-md">{movie.quality}</span>
                </div>

                {/* Episode Badge - Glass Style */}
                <div className="absolute top-3 right-3 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg border border-white/10">
                  {movie.current_episode}
                </div>

                {/* Bottom Fade for Text */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent"></div>
              </div>

              <CardContent className="relative p-4 space-y-1">
                <h3 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-primary" title={movie.name}>
                  {movie.name}
                </h3>
                <p className="truncate text-sm text-muted-foreground/80" title={movie.original_name}>
                  {movie.original_name}
                </p>
              </CardContent>
            </Card>
          </Link>
        </PopoverTrigger>
        {/* The Tooltip Content */}
        <PopoverContent className="w-80 glass-card" side="right" align="start" sideOffset={10}>
          <MovieCardTooltipContent movie={movie} />
        </PopoverContent>
      </Popover>
    </MotionDiv>
  )
})

export default MovieCard
