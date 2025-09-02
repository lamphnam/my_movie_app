import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import type { MovieListItem } from '@/types'
import { optimizeImage } from '@/lib/image' // Import hàm mới

interface MovieCardProps {
  movie: MovieListItem
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  // Tối ưu ảnh với chiều rộng 300px, phù hợp cho thẻ card
  const optimizedThumbUrl = optimizeImage(movie.thumb_url, 300)

  return (
    <Link to={`/phim/${movie.slug}`} className="group block outline-none" tabIndex={0}>
      <Card className="overflow-hidden border-border bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={optimizedThumbUrl} // Sử dụng URL đã được tối ưu
            alt={movie.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width="300" // Cung cấp kích thước cho trình duyệt
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <i className="fa-solid fa-play text-4xl text-white"></i>
          </div>
          <div className="absolute top-2 left-2 rounded-sm bg-gradient-to-r from-purple-500 to-indigo-600 px-2 py-1 text-xs font-bold text-white shadow-md">
            {movie.quality}
          </div>
          <div className="absolute top-2 right-2 rounded-sm bg-black/70 px-2 py-1 text-xs text-white shadow-md">
            {movie.current_episode}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="truncate text-base font-semibold text-foreground" title={movie.name}>
            {movie.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground" title={movie.original_name}>
            {movie.original_name}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
})

export default MovieCard
