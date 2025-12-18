// src/pages/GenrePage.tsx

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import PageWrapper from '@/components/PageWrapper'
import Pagination from '@/components/Pagination'
import { DOMAIN_URL } from '@/constants'
import { useMoviePagination } from '@/hooks/useMoviePagination'
import { movieApi } from '@/services/api'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'

const GenrePage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)

  const { movies, pagination, isLoading, isError, error } = useMoviePagination(
    ['movies', 'genre', slug, currentPage],
    () => movieApi.getMoviesByGenre(slug, currentPage),
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <MovieGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </MovieGrid>
      )
    }
    if (isError) return <div className="text-center text-destructive">{error?.message}</div>
    if (movies.length === 0)
      return <div className="text-center text-muted-foreground">Không tìm thấy phim nào.</div>

    return (
      <>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </MovieGrid>
        {pagination && pagination.total_page > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </>
    )
  }

  const canonicalUrl = `${DOMAIN_URL}${location.pathname}`

  return (
    <PageWrapper>
      <Helmet>
        <title>{`Phim Thể loại ${slug} - HNAM PHIM`}</title>
        <meta
          name="description"
          content={`Tổng hợp phim thể loại ${slug} hay và mới nhất.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="space-y-8">
        <CategoryHeader type="genre" value={slug} />
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default GenrePage