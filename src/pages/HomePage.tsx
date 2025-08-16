// src/pages/HomePage.tsx
import { useState, useEffect, useCallback } from 'react'
import type { MovieListItem, PaginationInfo, MovieListApiResponse } from '../type'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import MovieFilters from '../components/MovieFilters'

interface ActiveFilters {
  category: string
  country: string
  year: string
}

const HomePage = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State chứa các bộ lọc đang được áp dụng
  const [appliedFilters, setAppliedFilters] = useState<ActiveFilters>({
    category: '',
    country: '',
    year: '',
  })

  // Hàm này được gọi khi người dùng nhấn nút "Lọc kết quả"
  const handleFilterApply = useCallback((newFilters: ActiveFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1) // Reset về trang 1 khi áp dụng bộ lọc mới
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      let apiUrl = 'https://phim.nguonc.com/api/films/phim-moi-cap-nhat'

      // Ưu tiên Thể loại > Quốc gia > Năm
      if (appliedFilters.category) {
        apiUrl = `https://phim.nguonc.com/api/films/the-loai/${appliedFilters.category}`
      } else if (appliedFilters.country) {
        apiUrl = `https://phim.nguonc.com/api/films/quoc-gia/${appliedFilters.country}`
      } else if (appliedFilters.year) {
        apiUrl = `https://phim.nguonc.com/api/films/nam-phat-hanh/${appliedFilters.year}`
      }

      try {
        const response = await fetch(`${apiUrl}?page=${currentPage}`, { signal })
        if (!response.ok) throw new Error('Không thể tải dữ liệu phim')
        const data: MovieListApiResponse = await response.json()

        if (data.status === 'success') {
          setMovies(data.items)
          setPagination(data.paginate)
        } else {
          // Xử lý trường hợp API trả về success nhưng không có item (kết quả lọc rỗng)
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

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        {/* <h1>HNAM PHIM</h1> */}
        <MovieFilters onFilterApply={handleFilterApply} />
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
          <p className="no-results">Không tìm thấy phim nào phù hợp với bộ lọc của bạn.</p>
        ))}
    </div>
  )
}

export default HomePage
