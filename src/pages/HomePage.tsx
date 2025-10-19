// src/pages/HomePage.tsx

import HeroSlider from '@/components/HeroSlider' // <-- UPDATED IMPORT
import MovieCarousel from '@/components/MovieCarousel'
import { featuredMovies } from '@/config/featuredContent' // <-- UPDATED IMPORT
import { movieApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
  const {
    data: koreanData,
    isLoading: koreanMoviesLoading,
    isError: isKoreanError,
  } = useQuery({
    queryKey: ['movies', 'korean'],
    queryFn: () => movieApi.getMoviesByCountry('han-quoc', 1),
    staleTime: 5 * 60 * 1000,
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

  // Use the loading state of the first carousel as the loading indicator for the hero
  const isHeroLoading = koreanMoviesLoading

  return (
    <div className="space-y-8 lg:space-y-12">
      <HeroSlider movies={featuredMovies} loading={isHeroLoading} />

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
