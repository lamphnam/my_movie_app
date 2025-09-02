import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { MovieListItem, MovieListApiResponse } from '@/types'
import { getCategoryBySlug } from '@/data/filters'
import { movieApi } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import Pagination from '@/components/Pagination'
import CategoryHeader from '@/components/CategoryHeader'
import MovieGrid from '@/components/MovieGrid'

const CategoryPage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [pagination, setPagination] = useState<MovieListApiResponse['paginate'] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const category = getCategoryBySlug(slug)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const data: MovieListApiResponse = await movieApi.getMoviesByCategory(slug, currentPage)
        if (data.status === 'success') {
          setMovies(data.items)
          setPagination(data.paginate)
        } else {
          setError('Không thể tải danh sách phim cho danh mục này.')
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi.')
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    if (slug) {
      fetchMovies()
    }
  }, [slug, currentPage])

  if (!category) {
    return <div className="text-center py-10">Không tìm thấy danh mục.</div>
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
      <CategoryHeader type="category" value={slug} />
      {renderContent()}
    </div>
  )
}

export default CategoryPage
