'use client'

// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MovieListItem, PaginationInfo } from '../type' // Sửa đổi: Thêm PaginationInfo
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import CategoryHeader from '../components/CategoryHeader'
import Pagination from '../components/Pagination' // Dòng mới: Import component Pagination

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1', 10) // Dòng mới: Lấy page từ URL

  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null) // Dòng mới: State cho thông tin phân trang
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!keyword) {
      setMovies([])
      setPaginationInfo(null)
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        // Sửa đổi: Thêm `&page=${page}` vào URL
        const response = await fetch(
          `https://phim.nguonc.com/api/films/search?keyword=${keyword}&page=${page}`,
        )
        if (!response.ok) throw new Error('Lỗi khi tìm kiếm phim')

        // Sửa đổi: API trả về có `paginate`, nên không cần dùng Omit
        const data = await response.json()

        if (data.status === 'success') {
          setMovies(data.items || [])
          setPaginationInfo(data.paginate || null) // Dòng mới: Lưu thông tin phân trang
        } else {
          setMovies([])
          setPaginationInfo(null)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' }) // Cuộn lên đầu khi chuyển trang
      }
    }

    fetchSearchResults()
  }, [keyword, page]) // Sửa đổi: Chạy lại effect khi `page` thay đổi

  // Dòng mới: Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: keyword, page: newPage.toString() })
  }

  if (loading) return <Loader />
  if (error) return <div className="error-message">Lỗi: {error}</div>

  return (
    <div className="search-page-container">
      <CategoryHeader type="search" searchKeyword={keyword} />

      {movies.length > 0 ? (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>
          {/* Dòng mới: Hiển thị Pagination nếu có nhiều hơn 1 trang */}
          {paginationInfo && paginationInfo.total_page > 1 && (
            <Pagination
              currentPage={paginationInfo.current_page}
              totalPages={paginationInfo.total_page}
              onPageChange={handlePageChange}
            />
          )}
        </>
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
