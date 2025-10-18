// src/pages/HomePage.tsx

import HeroBanner from '@/components/HeroBanner'
import MovieCarousel from '@/components/MovieCarousel'
import { featuredMovie } from '@/config/featuredContent'
import { movieApi } from '@/services/api' // <-- Quay lại dùng API gốc
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
  // TanStack Query sẽ quản lý tất cả: loading, error, data và caching
  const {
    data: koreanData,
    isLoading: koreanMoviesLoading,
    isError: isKoreanError,
  } = useQuery({
    queryKey: ['movies', 'korean'], // Một key duy nhất cho query này
    queryFn: () => movieApi.getMoviesByCountry('han-quoc', 1),
    staleTime: 5 * 60 * 1000, // Dữ liệu được coi là mới trong 5 phút
  })

  const {
    data: chineseData,
    isLoading: chineseMoviesLoading,
    isError: isChineseError,
  } = useQuery({
    queryKey: ['movies', 'chinese'],
    queryFn: () => movieApi.getMoviesByCountry('trung-quoc', 1),
    staleTime: 5 * 60 * 1000,
  })

  const {
    data: usUkData,
    isLoading: usUkMoviesLoading,
    isError: isUsUkError,
  } = useQuery({
    queryKey: ['movies', 'us-uk'],
    queryFn: () => movieApi.getMoviesByCountry('au-my', 1),
    staleTime: 5 * 60 * 1000,
  })

  if (isKoreanError || isChineseError || isUsUkError) {
    return <div className="py-10 text-center text-destructive">Đã có lỗi xảy ra.</div>
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      <HeroBanner movie={featuredMovie} loading={koreanMoviesLoading} />

      <MovieCarousel
        title="Phim Hàn Quốc"
        movies={koreanData?.items || []}
        loading={koreanMoviesLoading}
        viewAllLink="/country/han-quoc"
      />

      <MovieCarousel
        title="Phim Trung Quốc"
        movies={chineseData?.items || []}
        loading={chineseMoviesLoading}
        viewAllLink="/country/trung-quoc"
      />

      <MovieCarousel
        title="Phim Âu Mỹ"
        movies={usUkData?.items || []}
        loading={usUkMoviesLoading}
        viewAllLink="/country/au-my"
      />
    </div>
  )
}

export default HomePage
