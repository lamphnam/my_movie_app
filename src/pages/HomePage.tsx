// src/pages/HomePage.tsx
import { useState, useEffect, useCallback } from 'react'
// SỬA LỖI: Import đầy đủ các type cần thiết
import type {
  MovieListItem,
  MovieListApiResponse,
  MovieDetail,
  MovieDetailApiResponse,
  PaginationInfo, // Import PaginationInfo
  CategoryGroup,
} from '../type'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import MovieFilters from '../components/MovieFilters'
import { filterData } from '../data/filters' // SỬA LỖI: Import filterData

interface ActiveFilters {
  category: string
  country: string
  year: string
}

// SỬA LỖI: Định nghĩa kiểu rõ ràng hơn
// MovieListItemWithDetails sẽ có TẤT CẢ các thuộc tính của MovieListItem
// và CÓ THỂ CÓ thuộc tính 'details'
type MovieListItemWithDetails = MovieListItem & {
  details?: MovieDetail
}

const HomePage = () => {
  // Sử dụng kiểu MovieListItemWithDetails cho state
  const [filteredMovies, setFilteredMovies] = useState<MovieListItemWithDetails[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [appliedFilters, setAppliedFilters] = useState<ActiveFilters>({
    category: '',
    country: '',
    year: '',
  })

  const handleFilterApply = useCallback((newFilters: ActiveFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchAndFilterMovies = async () => {
      setLoading(true)
      setError(null)

      let baseApiUrl = 'https://phim.nguonc.com/api/films/phim-moi-cap-nhat'
      if (appliedFilters.category) {
        baseApiUrl = `https://phim.nguonc.com/api/films/the-loai/${appliedFilters.category}`
      } else if (appliedFilters.year) {
        baseApiUrl = `https://phim.nguonc.com/api/films/nam-phat-hanh/${appliedFilters.year}`
      } else if (appliedFilters.country) {
        baseApiUrl = `https://phim.nguonc.com/api/films/quoc-gia/${appliedFilters.country}`
      }

      try {
        const listResponse = await fetch(`${baseApiUrl}?page=${currentPage}`, { signal })
        if (!listResponse.ok) throw new Error('Lỗi khi tải danh sách phim')
        const listData: MovieListApiResponse = await listResponse.json()

        if (listData.status !== 'success' || !listData.items || listData.items.length === 0) {
          setFilteredMovies([])
          setPagination(listData.paginate || null)
          setLoading(false) // Quan trọng: dừng loading ở đây
          return
        }

        const moviesFromList = listData.items
        setPagination(listData.paginate)

        const detailPromises = moviesFromList.map(
          (movie) =>
            fetch(`https://phim.nguonc.com/api/film/${movie.slug}`, { signal })
              .then((res) => res.json() as Promise<MovieDetailApiResponse>)
              .then((data) => ({ ...movie, details: data.movie }))
              .catch(() => ({ ...movie, details: undefined })), // Gán details là undefined nếu lỗi
        )

        const moviesWithDetails: MovieListItemWithDetails[] = await Promise.all(detailPromises)

        const finalFilteredMovies = moviesWithDetails.filter((movie) => {
          // Nếu không có details, không thể lọc, coi như không khớp
          if (!movie.details) return false

          // SỬA LỖI: Thêm kiểu dữ liệu cho 'g'
          const categoryList = Object.values(movie.details.category).flatMap(
            (g: CategoryGroup) => g.list,
          )

          // SỬA LỖI: Thêm kiểu dữ liệu cho 'f'
          const countryMatch =
            !appliedFilters.country ||
            categoryList.some(
              (c) =>
                c.name ===
                filterData.countries.find(
                  (f: { name: string; slug: string }) => f.slug === appliedFilters.country,
                )?.name,
            )
          const yearMatch =
            !appliedFilters.year || categoryList.some((c) => c.name === appliedFilters.year)
          const categoryMatch =
            !appliedFilters.category ||
            categoryList.some(
              (c) =>
                c.name ===
                filterData.categories.find(
                  (f: { name: string; slug: string }) => f.slug === appliedFilters.category,
                )?.name,
            )

          return countryMatch && yearMatch && categoryMatch
        })

        setFilteredMovies(finalFilteredMovies)
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAndFilterMovies()

    return () => {
      controller.abort()
    }
  }, [currentPage, appliedFilters])

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Khám Phá Phim</h1>
        <MovieFilters onFilterApply={handleFilterApply} />
      </div>

      {/* SỬA LỖI: Hiển thị Skeleton UI khi loading */}
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
        (filteredMovies.length > 0 ? (
          <>
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
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
          <p className="no-results">Không tìm thấy phim nào phù hợp.</p>
        ))}
    </div>
  )
}

export default HomePage
