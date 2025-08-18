// src/components/MovieCard.tsx

import { memo } from 'react'
import { Link } from 'react-router-dom'
// No longer need to import the full 'Movie' type.

// Define a type that includes only the properties the MovieCard component actually uses.
// Both the 'Movie' and 'MovieListItem' types satisfy this interface.
interface MovieCardData {
  slug: string
  thumb_url: string
  name: string
  quality: string
  current_episode: string
  original_name: string
}

interface MovieCardProps {
  movie: MovieCardData // Use the more specific and flexible type here
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  return (
    <Link to={`/phim/${movie.slug}`} className="movie-card">
      <div className="movie-card-image-wrapper">
        <img
          src={movie.thumb_url || '/placeholder.svg'}
          alt={movie.name}
          className="movie-card-thumb"
          loading="lazy"
        />
        <div className="movie-card-overlay">
          <span className="play-icon">▶</span>
        </div>
        <div className="movie-card-badge quality">{movie.quality}</div>
        <div className="movie-card-badge episode">{movie.current_episode}</div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.name}</h3>
        <p className="movie-card-original-title">{movie.original_name}</p>
      </div>
    </Link>
  )
})

export default MovieCard
