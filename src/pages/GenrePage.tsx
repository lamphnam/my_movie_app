// src/pages/GenrePage.tsx

import { useMoviePagination } from '@/hooks/useMoviePagination'
import { movieApi } from '@/services/api'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import PageWrapper from '@/components/PageWrapper'
import Pagination from '@/components/Pagination'

const GenrePage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
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
    // SỬA LỖI: Kiểm tra isError trước khi truy cập error.message
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

  return (
    <PageWrapper>
      <div className="space-y-8">
        <CategoryHeader type="genre" value={slug} />
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default GenrePage
