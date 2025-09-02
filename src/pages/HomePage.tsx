import { useState, useEffect } from 'react'
import type { MovieListItem, MovieListApiResponse } from '@/types'
import MovieCard from '@/components/MovieCard'
import Pagination from '@/components/Pagination'
import CategoryHeader from '@/components/CategoryHeader'
import { movieApi } from '@/services/api'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import MovieFilters from '@/components/MovieFilters'

const HomePage = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<MovieListApiResponse['paginate'] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const data: MovieListApiResponse = await movieApi.getNewMovies(currentPage)
        if (data.status === 'success') {
          setMovies(data.items)
          setPagination(data.paginate)
        } else {
          setMovies([])
          setPagination(null)
          setError('Không thể tải danh sách phim.')
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi.')
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    fetchMovies()
  }, [currentPage])

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
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <CategoryHeader type="default" />
        <MovieFilters />
      </div>
      {renderContent()}
    </div>
  )
}

export default HomePage
