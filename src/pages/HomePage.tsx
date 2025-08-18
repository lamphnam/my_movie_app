'use client'

// src/pages/HomePage.tsx
import { useState, useEffect, useCallback } from 'react'
import type { Movie, ApiResponse } from '../types'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import MovieFilters from '../components/MovieFilters'
import CategoryHeader from '../components/CategoryHeader'
import { movieApi } from '../services/api'

interface ActiveFilters {
  category: string
  country: string
  year: string
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [pagination, setPagination] = useState<ApiResponse['paginate'] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State chứa các bộ lọc đang được áp dụng
  const [appliedFilters, setAppliedFilters] = useState<ActiveFilters>({
    category: '',
    country: '',
    year: '',
  })

  // Hàm này được gọi khi người dùng nhấn nút "Áp dụng lọc"
  const handleFilterApply = useCallback((newFilters: ActiveFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1) // Reset về trang 1 khi áp dụng bộ lọc mới
  }, [])

  const getHeaderType = (): {
    type: 'category' | 'country' | 'year' | 'default'
    value?: string
  } => {
    if (appliedFilters.category) {
      return { type: 'category', value: appliedFilters.category }
    } else if (appliedFilters.country) {
      return { type: 'country', value: appliedFilters.country }
    } else if (appliedFilters.year) {
      return { type: 'year', value: appliedFilters.year }
    }
    return { type: 'default' }
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      console.log('Bộ lọc hiện tại:', appliedFilters)
      try {
        let data: ApiResponse

        if (appliedFilters.category) {
          data = await movieApi.getMoviesByCategory(appliedFilters.category, currentPage)
        } else if (appliedFilters.country) {
          data = await movieApi.getMoviesByCountry(appliedFilters.country, currentPage)
        } else if (appliedFilters.year) {
          data = await movieApi.getMoviesByYear(appliedFilters.year, currentPage)
        } else {
          data = await movieApi.getNewMovies(currentPage)
        }

        if (data.status === 'success') {
          setMovies(data.items)
          setPagination(data.paginate)
        } else {
          setMovies([])
          setPagination(null)
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [currentPage, appliedFilters]) // Effect chạy lại khi trang hoặc bộ lọc thay đổi

  const headerInfo = getHeaderType()

  return (
    <div className="homepage-container">
      <CategoryHeader type={headerInfo.type} value={headerInfo.value} />

      <div className="homepage-controls">
        <MovieFilters onFilterApply={handleFilterApply} currentFilters={appliedFilters} />
      </div>

      {loading && (
        <div className="movie-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && <div className="error-message">Lỗi: {error}</div>}

      {!loading &&
        !error &&
        (movies.length > 0 ? (
          <>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.slug} movie={movie} />
              ))}
            </div>
            {pagination && pagination.total_page > 1 && (
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_page}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🎬</div>
            <h3>Không tìm thấy phim nào</h3>
            <p>
              Không có phim nào phù hợp với bộ lọc của bạn. Hãy thử thay đổi bộ lọc hoặc tìm kiếm
              khác.
            </p>
          </div>
        ))}
    </div>
  )
}

export default HomePage
