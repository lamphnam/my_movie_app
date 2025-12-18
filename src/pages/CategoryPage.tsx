// src/pages/CategoryPage.tsx

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import PageWrapper from '@/components/PageWrapper'
import Pagination from '@/components/Pagination'
import { DOMAIN_URL } from '@/constants'
import { useMoviePagination } from '@/hooks/useMoviePagination'
import { movieApi } from '@/services/api'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'

const CategoryPage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)

  const { movies, pagination, isLoading, isError, error } = useMoviePagination(
    ['movies', 'category', slug, currentPage],
    () => movieApi.getMoviesByCategory(slug, currentPage),
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <MovieGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </MovieGrid>
      )
    }
    if (isError) return <div className="text-center text-destructive">{error?.message}</div>
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
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </>
    )
  }

  // Canonical chỉ lấy phần pathname, bỏ qua query params
  const canonicalUrl = `${DOMAIN_URL}${location.pathname}`

  return (
    <PageWrapper>
      <Helmet>
        <title>{`Danh sách phim ${slug} - Xem Phim ${slug} Mới Nhất | HNAM PHIM`}</title>
        <meta
          name="description"
          content={`Danh sách phim thuộc danh mục ${slug} mới nhất. Xem phim ${slug} chất lượng cao, full HD, vietsub miễn phí tại HNAM PHIM.`}
        />
        <meta name="keywords" content={`phim ${slug}, xem phim ${slug}, ${slug} mới nhất`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={`Phim ${slug} - HNAM PHIM`} />
        <meta property="og:description" content={`Danh sách phim ${slug} mới nhất`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <div className="space-y-10 lg:space-y-12">
        <CategoryHeader type="category" value={slug} />
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default CategoryPage