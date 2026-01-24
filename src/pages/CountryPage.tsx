// src/pages/CountryPage.tsx

import CategoryHeader from '@/components/CategoryHeader'
import MovieCard from '@/components/MovieCard'
import MovieCardCompact from '@/components/MovieCardCompact'
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

const CountryPage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)

  const { movies, pagination, isLoading, isError, error } = useMoviePagination(
    ['movies', 'country', slug, currentPage],
    () => movieApi.getMoviesByCountry(slug, currentPage),
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
            <div key={movie.slug}>
              <div className="md:hidden">
                <MovieCardCompact movie={movie} />
              </div>
              <div className="hidden md:block">
                <MovieCard movie={movie} />
              </div>
            </div>
          ))}
        </MovieGrid>
        {pagination && pagination.total_page > 1 && (
          <div className="mt-12 flex justify-center">
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

  const canonicalUrl = `${DOMAIN_URL}${location.pathname}`

  return (
    <PageWrapper>
      <Helmet>
        <title>{`Phim ${slug} - Xem Phim Quốc Gia ${slug} Mới Nhất | HNAM PHIM`}</title>
        <meta
          name="description"
          content={`Danh sách phim ${slug} chọn lọc, chất lượng cao. Xem phim ${slug} mới nhất, full HD, vietsub miễn phí tại HNAM PHIM.`}
        />
        <meta name="keywords" content={`phim ${slug}, xem phim ${slug}, phim ${slug} mới nhất, phim ${slug} hay nhất`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={`Phim ${slug} - HNAM PHIM`} />
        <meta property="og:description" content={`Danh sách phim ${slug} chọn lọc, chất lượng cao`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <div className="space-y-10 lg:space-y-12">
        <CategoryHeader type="country" value={slug} />
        {renderContent()}
      </div>
    </PageWrapper>
  )
}

export default CountryPage