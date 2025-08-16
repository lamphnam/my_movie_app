// src/pages/HomePage.tsx
import { useState, useEffect } from 'react'
import type { MovieListItem, PaginationInfo, MovieListApiResponse } from '../type'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const HomePage = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${currentPage}`,
          { signal },
        )
        if (!response.ok) throw new Error('Không thể tải dữ liệu')
        const data: MovieListApiResponse = await response.json()
        setMovies(data.items)
        setPagination(data.paginate)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [currentPage])

  if (loading) return <Loader />
  if (error) return <div className="error-message">Lỗi: {error}</div>

  return (
    <div className="homepage-container">
      <h1>Phim Mới Cập Nhật</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_page}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default HomePage
