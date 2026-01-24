import { useMoviePagination } from '@/hooks/useMoviePagination'
import { movieApi } from '@/services/api'
import { useSearchParams } from 'react-router-dom'

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardCompact from '@/components/MovieCardCompact'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieFilters from '@/components/MovieFilters'
import MovieGrid from '@/components/MovieGrid'
import PageWrapper from '@/components/PageWrapper'
import Pagination from '@/components/Pagination'

const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const genre = searchParams.get('genre') || ''
  const country = searchParams.get('country') || ''
  const year = searchParams.get('year') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  // Xác định hàm fetcher dựa trên tham số URL
  const getFetcher = () => {
    if (genre) return () => movieApi.getMoviesByGenre(genre, currentPage)
    if (country) return () => movieApi.getMoviesByCountry(country, currentPage)
    if (year) return () => movieApi.getMoviesByYear(year, currentPage)
    return () => movieApi.getNewMovies(currentPage) // Mặc định là phim mới
  }

  // SỬA LỖI: Làm phẳng queryKey, không chứa object
  const queryKey = ['movies', 'filter', genre, country, year, currentPage]

  const { movies, pagination, isLoading, isError, error } = useMoviePagination(
    queryKey,
    getFetcher(),
  )

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
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
      return (
        <div className="py-10 text-center text-muted-foreground">
          Không tìm thấy phim nào phù hợp.
        </div>
      )

    return (
      <>
        <MovieGrid>
          {movies.map((movie) => (
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

  return (
    <PageWrapper>
      <div className="space-y-10 lg:space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CategoryHeader type="default" />
          <MovieFilters />
        </div>
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default FilterPage
