// src/pages/HomePage.tsx

import HeroSlider from '@/components/HeroSlider'
import HeroDesktop from '@/components/HeroDesktop'
import MovieCarousel from '@/components/MovieCarousel'
import PageWrapper from '@/components/PageWrapper'
import ContinueWatchingCard from '@/components/ContinueWatchingCard'
import { featuredMovies } from '@/config/featuredContent'
import { DOMAIN_URL } from '@/constants'
import { movieApi } from '@/services/api'
import { useWatchHistory } from '@/hooks/useWatchHistory'
import type { MovieListApiResponse, MovieListItem } from '@/types'
import { useQueries } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// --------------- Section Config ---------------

type HomeSectionType = 'country' | 'category' | 'genre'

interface HomeSection {
  id: string
  title: string
  type: HomeSectionType
  slug: string
  viewAllLink: string
}

const HOME_SECTIONS: HomeSection[] = [
  // ── initial (fetched on load) ─────────────────────────────────────────────
  { id: 'korea', title: 'Phim Hàn Quốc', type: 'country', slug: 'han-quoc', viewAllLink: '/country/han-quoc' },
  { id: 'vietnam', title: 'Phim Việt Nam', type: 'country', slug: 'viet-nam', viewAllLink: '/country/viet-nam' },
  { id: 'china', title: 'Phim Trung Quốc', type: 'country', slug: 'trung-quoc', viewAllLink: '/country/trung-quoc' },
  // ── lazy – countries ─────────────────────────────────────────────────────
  { id: 'us-uk', title: 'Phim Âu Mỹ', type: 'country', slug: 'au-my', viewAllLink: '/country/au-my' },
  { id: 'japan', title: 'Phim Nhật Bản', type: 'country', slug: 'nhat-ban', viewAllLink: '/country/nhat-ban' },
  { id: 'thai', title: 'Phim Thái Lan', type: 'country', slug: 'thai-lan', viewAllLink: '/country/thai-lan' },
  { id: 'hong-kong', title: 'Phim Hồng Kông', type: 'country', slug: 'hong-kong', viewAllLink: '/country/hong-kong' },
  { id: 'taiwan', title: 'Phim Đài Loan', type: 'country', slug: 'dai-loan', viewAllLink: '/country/dai-loan' },
  { id: 'india', title: 'Phim Ấn Độ', type: 'country', slug: 'an-do', viewAllLink: '/country/an-do' },
  // ── lazy – categories ────────────────────────────────────────────────────
  { id: 'feature-film', title: 'Phim Lẻ', type: 'category', slug: 'phim-le', viewAllLink: '/category/phim-le' },
  { id: 'series', title: 'Phim Bộ', type: 'category', slug: 'phim-bo', viewAllLink: '/category/phim-bo' },
  { id: 'animation', title: 'Hoạt Hình', type: 'category', slug: 'hoat-hinh', viewAllLink: '/category/hoat-hinh' },
  { id: 'tv-shows', title: 'TV Shows', type: 'category', slug: 'tv-shows', viewAllLink: '/category/tv-shows' },
  // ── lazy – genres ────────────────────────────────────────────────────────
  { id: 'action', title: 'Phim Hành Động', type: 'genre', slug: 'hanh-dong', viewAllLink: '/genre/hanh-dong' },
  { id: 'romance', title: 'Phim Tình Cảm', type: 'genre', slug: 'tinh-cam', viewAllLink: '/genre/tinh-cam' },
  { id: 'horror', title: 'Phim Kinh Dị', type: 'genre', slug: 'kinh-di', viewAllLink: '/genre/kinh-di' },
]

const INITIAL_COUNT = 3
const LOAD_BATCH = 2

// --------------- Query factory ---------------

function buildQueryFn(section: HomeSection): () => Promise<MovieListApiResponse> {
  switch (section.type) {
    case 'country':
      return () => movieApi.getMoviesByCountry(section.slug, 1)
    case 'category':
      return () => movieApi.getMoviesByCategory(section.slug, 1)
    case 'genre':
      return () => movieApi.getMoviesByGenre(section.slug, 1)
    default:
      return () => movieApi.getMoviesByCountry(section.slug, 1)
  }
}

// --------------- Component ---------------

const HomePage = () => {
  const { history } = useWatchHistory()

  // ── Infinite-scroll state ──────────────────────────────────────────────────
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isTriggering = useRef(false)

  const visibleSections = HOME_SECTIONS.slice(0, visibleCount)

  // ── Fetch all currently-visible sections with a single useQueries call ─────
  const sectionQueries = useQueries({
    queries: visibleSections.map((section) => ({
      queryKey: ['home-section', section.type, section.slug] as const,
      queryFn: buildQueryFn(section),
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  })

  // ── IntersectionObserver sentinel ─────────────────────────────────────────
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || visibleCount >= HOME_SECTIONS.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggering.current) {
          isTriggering.current = true
          setVisibleCount((prev) => Math.min(prev + LOAD_BATCH, HOME_SECTIONS.length))
        }
      },
      { rootMargin: '800px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visibleCount])

  // Reset debounce flag after each batch is appended
  useEffect(() => {
    isTriggering.current = false
  }, [visibleCount])

  // ── Hero / trending derived from the first INITIAL_COUNT queries ───────────
  const initialQueries = sectionQueries.slice(0, INITIAL_COUNT)
  const isInitialError = initialQueries.some((q) => q.isError)
  const isLoading = initialQueries.some((q) => q.isLoading || q.isPending)

  if (isInitialError) {
    return <div className="py-10 text-center text-destructive">Đã có lỗi xảy ra.</div>
  }

  const trendingMovies: MovieListItem[] = initialQueries
    .flatMap((q) => q.data?.items ?? [])
    .slice(0, 10)

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
          {/* Mobile: Slider — featuredMovies is static config, render immediately (no CLS) */}
          <div className="lg:hidden">
            <HeroSlider movies={featuredMovies} loading={false} />
          </div>
        </section>

        {/* Continue Watching Section - Data from video embed */}
        {history.length > 0 && (
          <section className="section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h2">Xem Tiếp</h2>
            </div>
            <div className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide overscroll-x-contain touch-pan-x pb-2">
              {history.slice(0, 10).map((entry) => (
                <div
                  key={entry.slug}
                  className="w-[42vw] sm:w-[180px] lg:w-[200px] flex-shrink-0 snap-start"
                >
                  <ContinueWatchingCard entry={entry} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Content Sections – infinite scroll by section */}
        <section className="section space-y-8 lg:space-y-10">
          {visibleSections.map((section, idx) => {
            const q = sectionQueries[idx]
            const items: MovieListItem[] = q?.data?.items ?? []
            return (
              <div className="render-auto" key={section.id}>
                <MovieCarousel
                  title={section.title}
                  movies={items}
                  loading={q?.isLoading ?? false}
                  viewAllLink={section.viewAllLink}
                />
                {q?.isError && (
                  <p className="mt-2 text-sm text-destructive">
                    Mục này gặp lỗi khi tải. Vui lòng thử lại sau.
                  </p>
                )}
              </div>
            )
          })}

          {/* Sentinel – triggers next batch when scrolled into viewport */}
          {visibleCount < HOME_SECTIONS.length && (
            <div ref={sentinelRef} aria-hidden="true" className="h-px" />
          )}
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