// src/components/RelatedMovies.tsx

import { movieApi } from '@/services/api'
import type { MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import MovieCarousel from './MovieCarousel'

interface RelatedMoviesProps {
  genreSlug?: string
  currentMovieSlug?: string
  enabled?: boolean
}

const RelatedMovies = memo(({ genreSlug, currentMovieSlug, enabled = true }: RelatedMoviesProps) => {
  const { data: relatedMoviesData, isLoading } = useQuery({
    queryKey: ['movies', 'related', genreSlug],
    queryFn: () => movieApi.getMoviesByGenre(genreSlug!, 1),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    enabled: enabled && !!genreSlug,
  })

  const filteredMovies: MovieListItem[] = useMemo(() => (
    relatedMoviesData?.items.filter(
      (movie: MovieListItem) => movie.slug !== currentMovieSlug,
    ) || []
  ), [currentMovieSlug, relatedMoviesData?.items])

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
