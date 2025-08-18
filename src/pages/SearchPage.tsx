'use client'

// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MovieListItem, MovieListApiResponse } from '../type'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import CategoryHeader from '../components/CategoryHeader'

const SearchPage = () => {
  // useSearchParams để lấy query param từ URL, ví dụ: /search?q=keyword
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('q') // Lấy giá trị của 'q'

  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!keyword) {
      setMovies([])
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://phim.nguonc.com/api/films/search?keyword=${keyword}`)
        if (!response.ok) throw new Error('Lỗi khi tìm kiếm phim')
        // API search không có phân trang, nên response khác một chút
        const data: Omit<MovieListApiResponse, 'paginate'> = await response.json()

        if (data.status === 'success') {
          setMovies(data.items)
        } else {
          setMovies([])
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [keyword]) // Chạy lại mỗi khi từ khóa `keyword` thay đổi

  if (loading) return <Loader />
  if (error) return <div className="error-message">Lỗi: {error}</div>

  return (
    <div className="search-page-container">
      <CategoryHeader type="search" searchKeyword={keyword || ''} />

      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>Không tìm thấy kết quả</h3>
          <p>
            Không có phim nào phù hợp với từ khóa "{keyword}". Hãy thử tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
