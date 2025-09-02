import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MovieListItem, MovieListApiResponse } from '@/types'
import { movieApi } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import Pagination from '@/components/Pagination'
import CategoryHeader from '@/components/CategoryHeader'
import MovieGrid from '@/components/MovieGrid'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<MovieListApiResponse['paginate'] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!keyword) {
      setMovies([])
      setPagination(null)
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const data: MovieListApiResponse = await movieApi.searchMovies(keyword, currentPage)

        if (data.status === 'success') {
          setMovies(data.items || [])
          setPagination(data.paginate || null)
        } else {
          setMovies([])
          setPagination(null)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    fetchSearchResults()
  }, [keyword, currentPage])

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: keyword, page: newPage.toString() })
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

    if (error) {
      return <div className="text-center text-destructive">{error}</div>
    }

    if (movies.length > 0) {
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
      <div className="py-10 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
        <p className="text-muted-foreground">Không có phim nào phù hợp với từ khóa "{keyword}".</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <CategoryHeader type="search" searchKeyword={keyword} />
      {renderContent()}
    </div>
  )
}

export default SearchPage
