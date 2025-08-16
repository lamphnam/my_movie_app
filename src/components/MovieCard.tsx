// src/components/MovieCard.tsx
import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { MovieListItem } from '../type'

interface MovieCardProps {
  movie: MovieListItem
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  console.log(`Rendering MovieCard: ${movie.name}`) // Debug render (có thể xóa nếu không cần)

  return (
    <Link to={`/phim/${movie.slug}`} className="movie-card">
      <div className="movie-card-image-wrapper">
        <img src={movie.thumb_url} alt={movie.name} className="movie-card-thumb" loading="lazy" />
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
