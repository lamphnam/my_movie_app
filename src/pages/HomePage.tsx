// src/pages/HomePage.tsx

import HeroSlider from '@/components/HeroSlider'
import HeroSliderSkeleton from '@/components/HeroSliderSkeleton'
import HeroDesktop from '@/components/HeroDesktop'
import MovieCarousel from '@/components/MovieCarousel'
import PageWrapper from '@/components/PageWrapper'
import { featuredMovies } from '@/config/featuredContent'
import { DOMAIN_URL } from '@/constants'
import { movieApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const {
    data: koreanData,
    isLoading: koreanMoviesLoading,
    isError: isKoreanError,
  } = useQuery({
    queryKey: ['movies', 'korean'],
    queryFn: () => movieApi.getMoviesByCountry('han-quoc', 1),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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

  const {
    data: japanData,
    isLoading: japanLoading,
  } = useQuery({
    queryKey: ['movies', 'japan'],
    queryFn: () => movieApi.getMoviesByCountry('nhat-ban', 1),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })

  if (isKoreanError || isChineseError || isUsUkError) {
    return <div className="py-10 text-center text-destructive">Đã có lỗi xảy ra.</div>
  }

  const isLoading = koreanMoviesLoading || chineseMoviesLoading
  const trendingMovies = [...(koreanData?.items || []), ...(chineseData?.items || [])].slice(0, 10)

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

      <div className="space-y-8 lg:space-y-12">
        {/* Hero Section - Desktop vs Mobile */}
        <section>
          {/* Desktop: Grid hero with sidebar */}
          <div className="hidden lg:block">
            <HeroDesktop
              featuredMovie={featuredMovies[0]}
              trendingMovies={trendingMovies}
              loading={isLoading}
            />
          </div>
          {/* Mobile: Slider */}
          <div className="lg:hidden">
            {isLoading ? (
              <HeroSliderSkeleton />
            ) : (
              <HeroSlider movies={featuredMovies} loading={isLoading} />
            )}
          </div>
        </section>

        {/* Content Sections */}
        <section className="section space-y-8 lg:space-y-10">
          {/* Korean Movies */}
          <div className="render-auto">
            <MovieCarousel
              title="Phim Hàn Quốc"
              movies={koreanData?.items || []}
              loading={koreanMoviesLoading}
              viewAllLink="/country/han-quoc"
            />
          </div>

          {/* Chinese Movies */}
          <div className="render-auto">
            <MovieCarousel
              title="Phim Trung Quốc"
              movies={chineseData?.items || []}
              loading={chineseMoviesLoading}
              viewAllLink="/country/trung-quoc"
            />
          </div>

          {/* US/UK Movies */}
          <div className="render-auto">
            <MovieCarousel
              title="Phim Âu Mỹ"
              movies={usUkData?.items || []}
              loading={usUkMoviesLoading}
              viewAllLink="/country/au-my"
            />
          </div>

          {/* Japan Movies */}
          <div className="render-auto">
            <MovieCarousel
              title="Phim Nhật Bản"
              movies={japanData?.items || []}
              loading={japanLoading}
              viewAllLink="/country/nhat-ban"
            />
          </div>
        </section>

        {/* Quick Links Section - Desktop */}
        <section className="hidden lg:block section border-t border-border pt-8">
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: 'Phim Lẻ', desc: 'Phim chiếu rạp mới nhất', link: '/category/phim-le' },
              { title: 'Phim Bộ', desc: 'Series phim hấp dẫn', link: '/category/phim-bo' },
              { title: 'Hoạt Hình', desc: 'Anime và hoạt hình', link: '/category/hoat-hinh' },
              { title: 'TV Shows', desc: 'Chương trình truyền hình', link: '/category/tv-shows' },
            ].map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="surface-interactive p-4 group"
              >
                <h3 className="text-h3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-body-sm mt-1">{item.desc}</p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}

export default HomePage