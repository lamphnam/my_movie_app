// src/pages/SearchPage.tsx

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardCompact from '@/components/MovieCardCompact'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import PageWrapper from '@/components/PageWrapper'
import Pagination from '@/components/Pagination'
import { movieApi } from '@/services/api'
import type { MovieListApiResponse, MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const { data, isLoading, isError, error } = useQuery<MovieListApiResponse, Error>({
    queryKey: ['movies', 'search', keyword, currentPage],
    queryFn: () => movieApi.searchMovies(keyword, currentPage),
    enabled: !!keyword,
  })

  const movies = data?.items || []
  const pagination = data?.paginate || null

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: keyword, page: newPage.toString() })
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

    if (isError) {
      return <div className="text-center text-destructive">{error.message}</div>
    }

    if (movies.length > 0) {
      return (
        <>
          <MovieGrid>
            {movies.map((movie: MovieListItem) => (
              <div key={movie.slug}>
                <div className="md:hidden">
                  <MovieCardCompact movie={movie} />
                </div>
                <div className="hidden md:block">
                  <MovieCard movie={movie} />
                </div>
              </div>
            ))}
          </MovieGrid>
          {pagination && pagination.total_page > 1 && (
            <div className="mt-12 flex justify-center">
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

    if (keyword) {
      return (
        <div className="py-10 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
          <p className="text-muted-foreground">
            Không có phim nào phù hợp với từ khóa "{keyword}".
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <PageWrapper>
      {/* Search Page nên để NoIndex để tránh spam index */}
      <Helmet>
        <title>{`Tìm kiếm: ${keyword} - HNAM PHIM`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="space-y-10 lg:space-y-12">
        <CategoryHeader type="search" searchKeyword={keyword} />
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default SearchPage