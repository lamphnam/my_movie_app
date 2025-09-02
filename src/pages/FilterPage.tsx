import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MovieListItem, MovieListApiResponse } from '@/types'
import { movieApi } from '@/services/api' // Chúng ta sẽ cần thêm hàm mới ở đây
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import Pagination from '@/components/Pagination'
import CategoryHeader from '@/components/CategoryHeader'
import MovieGrid from '@/components/MovieGrid'
import MovieFilters from '@/components/MovieFilters'

const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<MovieListApiResponse['paginate'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Lấy các tham số filter từ URL
  const genre = searchParams.get('genre') || ''
  const country = searchParams.get('country') || ''
  const year = searchParams.get('year') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        let data: MovieListApiResponse
        // Ưu tiên gọi API theo từng loại filter
        if (genre) {
          data = await movieApi.getMoviesByGenre(genre, currentPage)
        } else if (country) {
          data = await movieApi.getMoviesByCountry(country, currentPage)
        } else if (year) {
          data = await movieApi.getMoviesByYear(year, currentPage)
        } else {
          // Nếu không có filter nào, hiển thị phim mới
          data = await movieApi.getNewMovies(currentPage)
        }

        if (data.status === 'success') {
          setMovies(data.items)
          setPagination(data.paginate)
        } else {
          setError('Không thể tải danh sách phim.')
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi.')
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    fetchFilteredMovies()
  }, [genre, country, year, currentPage])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    setSearchParams(params)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <MovieGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </MovieGrid>
      )
    }
    if (error) return <div className="text-center text-destructive">{error}</div>
    if (movies.length === 0)
      return (
        <div className="text-center text-muted-foreground py-10">
          Không tìm thấy phim nào phù hợp.
        </div>
      )

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <CategoryHeader type="default" />
        <MovieFilters />
      </div>
      {renderContent()}
    </div>
  )
}

export default FilterPage
