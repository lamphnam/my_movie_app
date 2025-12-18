// src/components/RelatedMovies.tsx

import { movieApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import MovieCarousel from './MovieCarousel'

interface RelatedMoviesProps {
  genreSlug?: string
  currentMovieSlug?: string
}

const RelatedMovies = memo(({ genreSlug, currentMovieSlug }: RelatedMoviesProps) => {
  const { data: relatedMoviesData, isLoading } = useQuery({
    queryKey: ['movies', 'related', genreSlug],
    queryFn: () => movieApi.getMoviesByGenre(genreSlug!, 1),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    enabled: !!genreSlug,
  })

  const filteredMovies =
    relatedMoviesData?.items.filter(
      (movie: { slug: string | undefined }) => movie.slug !== currentMovieSlug,
    ) || []

  if (!genreSlug || filteredMovies.length === 0) {
    return null
  }

  return (
    <MovieCarousel
      title="Có thể bạn cũng thích"
      movies={filteredMovies}
      loading={isLoading}
      className="mt-12"
    />
  )
})

RelatedMovies.displayName = 'RelatedMovies'

export default RelatedMovies
