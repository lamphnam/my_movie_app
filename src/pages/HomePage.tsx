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
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  const {
    data: chineseData,
    isLoading: chineseMoviesLoading,
    isError: isChineseError,
  } = useQuery({
    queryKey: ['movies', 'chinese'],
    queryFn: () => movieApi.getMoviesByCountry('trung-quoc', 1),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })

  const {
    data: usUkData,
    isLoading: usUkMoviesLoading,
    isError: isUsUkError,
  } = useQuery({
    queryKey: ['movies', 'us-uk'],
    queryFn: () => movieApi.getMoviesByCountry('au-my', 1),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })

  if (isKoreanError || isChineseError || isUsUkError) {
    return <div className="py-10 text-center text-destructive">Đã có lỗi xảy ra.</div>
  }

  const isHeroLoading = koreanMoviesLoading

  return (
    <PageWrapper>
      <Helmet>
        <title>HNAM PHIM - Xem Phim Online Miễn Phí Chất Lượng Cao Full HD</title>
        <meta
          name="description"
          content="HNAM PHIM - Web xem phim online miễn phí, cập nhật phim Hàn Quốc, Trung Quốc, Âu Mỹ, Phim chiếu rạp mới nhất với chất lượng Full HD, Vietsub, Thuyết minh. Xem phim mượt mà không quảng cáo."
        />
        <meta name="keywords" content="xem phim online, phim hd, phim vietsub, phim thuyết minh, phim hàn quốc, phim trung quốc, phim âu mỹ, phim mới" />
        <link rel="canonical" href={DOMAIN_URL} />

        {/* Open Graph */}
        <meta property="og:title" content="HNAM PHIM - Xem Phim Online Miễn Phí Chất Lượng Cao" />
        <meta property="og:description" content="Web xem phim online miễn phí với chất lượng Full HD, Vietsub, Thuyết minh. Cập nhật phim mới nhất hàng ngày." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN_URL} />
        <meta property="og:site_name" content="HNAM PHIM" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HNAM PHIM - Xem Phim Online Miễn Phí" />
        <meta name="twitter:description" content="Web xem phim online với chất lượng Full HD, cập nhật phim mới nhất." />
      </Helmet>

      <div className="space-y-12 lg:space-y-16">
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