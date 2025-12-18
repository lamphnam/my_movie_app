// src/pages/HomePage.tsx

import HeroSlider from '@/components/HeroSlider'
import HeroSliderSkeleton from '@/components/HeroSliderSkeleton'
import MovieCarousel from '@/components/MovieCarousel'
import PageWrapper from '@/components/PageWrapper'
import { featuredMovies } from '@/config/featuredContent'
import { DOMAIN_URL } from '@/constants'
import { movieApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

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

  const isHeroLoading = koreanMoviesLoading

  return (
    <PageWrapper>
      <Helmet>
        <title>HNAM PHIM - Xem phim online miễn phí chất lượng cao</title>
        <meta
          name="description"
          content="HNAM PHIM - Web xem phim online miễn phí, cập nhật phim Hàn Quốc, Trung Quốc, Âu Mỹ, Phim chiếu rạp mới nhất với chất lượng Full HD, Vietsub, Thuyết minh."
        />
        <link rel="canonical" href={DOMAIN_URL} />
        <meta property="og:title" content="HNAM PHIM - Xem phim online miễn phí" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN_URL} />
      </Helmet>

      <div className="space-y-8 lg:space-y-12">
        {isHeroLoading ? (
          <HeroSliderSkeleton />
        ) : (
          <HeroSlider movies={featuredMovies} loading={isHeroLoading} />
        )}

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
    </PageWrapper>
  )
}

export default HomePage