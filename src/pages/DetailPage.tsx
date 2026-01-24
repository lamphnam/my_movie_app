// src/pages/DetailPage.tsx

import DetailPageSkeleton from '@/components/DetailPageSkeleton'
import PageWrapper from '@/components/PageWrapper'
import RelatedMovies from '@/components/RelatedMovies'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DOMAIN_URL } from '@/constants'
import useLocalStorage from '@/hooks/useLocalStorage'
import { optimizeImage } from '@/lib/image'
import { movieApi } from '@/services/api'
import type { EpisodeItem, EpisodeServer, MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clapperboard, Globe, Heart, Play, Tv } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

type CategoryItem = { id: string; name: string; slug?: string }
type CategoryGroup = {
  group: { id: string; name: string }
  list: CategoryItem[]
}

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const playerRef = useRef<HTMLDivElement>(null)
  const [favorites, setFavorites] = useLocalStorage<MovieListItem[]>('favorites', [])
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(null)

  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', slug],
    queryFn: () => movieApi.getMovieDetail(slug!),
    enabled: !!slug,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })

  const movie = movieData?.movie

  useEffect(() => {
    if (movie?.episodes?.[0]?.items?.[0]) {
      setSelectedEpisodeUrl(movie.episodes[0].items[0].embed)
    }
  }, [movie])

  const isFavorited = useMemo(() =>
    favorites.some((fav) => fav.slug === slug),
    [favorites, slug]
  )

  const handleToggleFavorite = useCallback(() => {
    if (!movie) return
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.slug !== slug))
    } else {
      setFavorites([...favorites, movie])
    }
  }, [isFavorited, favorites, setFavorites, movie, slug])

  const handleWatchClick = useCallback(() => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const handleSelectEpisode = useCallback((url: string) => {
    setSelectedEpisodeUrl(url)
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const { genreCategory, yearCategory, countryCategory, primaryGenre, isSeries, posterUrl, backgroundPlayerUrl } = useMemo(() => {
    if (!movie) return {}

    const categories: CategoryGroup[] = movie.category
      ? (Object.values(movie.category) as CategoryGroup[])
      : []
    const genreCategory = categories.find((cat) => cat.group.name === 'Thể loại')
    const yearCategory = categories.find((cat) => cat.group.name === 'Năm')
    const countryCategory = categories.find((cat) => cat.group.name === 'Quốc gia')
    const primaryGenre = genreCategory?.list[0]
    const posterUrl = optimizeImage(movie.thumb_url, 500)
    const backgroundPlayerUrl = optimizeImage(movie.poster_url, 1280)
    const isSeries = movie.episodes.some((server: EpisodeServer) => server.items.length > 1)

    return { genreCategory, yearCategory, countryCategory, primaryGenre, isSeries, posterUrl, backgroundPlayerUrl }
  }, [movie])

  if (isLoading) return <DetailPageSkeleton />
  if (isError || !movie) {
    return <div className="py-20 text-center text-destructive">Không thể tải thông tin phim.</div>
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.name,
    "alternateName": movie.original_name,
    "image": movie.thumb_url,
    "description": movie.description?.replace(/<[^>]+>/g, '').substring(0, 200),
    "genre": genreCategory?.list.map(g => g.name) || [],
    "countryOfOrigin": countryCategory?.list[0]?.name || '',
    "datePublished": yearCategory?.list[0]?.name || '',
    "thumbnailUrl": movie.poster_url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <PageWrapper>
      {/* SEO META TAGS & CANONICAL */}
      <Helmet>
        <title>{`${movie.name} - Xem Phim Online Full HD | HNAM PHIM`}</title>
        <meta
          name="description"
          content={`Xem phim ${movie.name} (${movie.original_name}) ${movie.quality} Vietsub Thuyết Minh mới nhất. ${movie.description?.substring(0, 120).replace(/<[^>]+>/g, '')}...`}
        />
        <meta name="keywords" content={`${movie.name}, ${movie.original_name}, phim ${genreCategory?.list[0]?.name || ''}, phim ${countryCategory?.list[0]?.name || ''}, xem phim online`} />
        <link rel="canonical" href={`${DOMAIN_URL}/phim/${movie.slug}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={`${movie.name} - HNAM PHIM`} />
        <meta property="og:description" content={movie.description?.substring(0, 150).replace(/<[^>]+>/g, '')} />
        <meta property="og:image" content={movie.thumb_url} />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="750" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={`${DOMAIN_URL}/phim/${movie.slug}`} />
        <meta property="og:site_name" content="HNAM PHIM" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${movie.name} - HNAM PHIM`} />
        <meta name="twitter:description" content={movie.description?.substring(0, 150).replace(/<[^>]+>/g, '')} />
        <meta name="twitter:image" content={movie.thumb_url} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container space-y-12 lg:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
          {/* === CỘT TRÁI (Desktop) === */}
          <aside className="hidden lg:col-span-2 lg:block xl:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Poster */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <img src={posterUrl} alt={movie.name} className="relative w-full rounded-2xl shadow-xl border-2 border-white/10 group-hover:border-white/20 transition-all duration-500" />

                {/* Quality Badge on Poster */}
                <div className="absolute top-4 right-4 rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm border border-white/20">
                  {movie.quality}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" onClick={handleWatchClick} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg border border-white/10 hover-lift touch-target">
                  <Play className="w-5 h-5" /> Xem
                </Button>
                <Button size="lg" variant="secondary" onClick={handleToggleFavorite} className="glass-card hover-lift touch-target">
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${isFavorited ? 'fill-red-500 text-red-500 scale-110' : ''}`}
                  />
                  Lưu
                </Button>
              </div>

              {/* Info Card */}
              <div className="space-y-4 rounded-2xl glass-card p-6 text-sm border border-white/10">
                <h3 className="text-lg font-bold text-gradient mb-4">Thông tin phim</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/5">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clapperboard className="w-4 h-4 text-primary" /> Thể loại
                    </span>
                    <span className="font-semibold text-right text-foreground">{primaryGenre?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/5">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" /> Năm
                    </span>
                    <span className="font-semibold text-foreground">{yearCategory?.list[0]?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/5">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="w-4 h-4 text-primary" /> Quốc gia
                    </span>
                    <span className="font-semibold text-right text-foreground">
                      {countryCategory?.list[0]?.name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Tv className="w-4 h-4 text-primary" /> Tập phim
                    </span>
                    <span className="font-semibold text-foreground">{movie.current_episode}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* === CỘT PHẢI === */}
          <main className="lg:col-span-3 xl:col-span-4">
            <div className="flex flex-col gap-6 sm:flex-row lg:block">
              {/* Mobile Poster */}
              <div className="relative group lg:hidden w-1/2 max-w-[200px] self-start sm:w-1/3">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <img
                  src={posterUrl}
                  alt={movie.name}
                  className="relative rounded-2xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-black tracking-tighter text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="text-gradient-gold">{movie.name}</span>
                </h1>
                <p className="text-base text-muted-foreground/90 font-medium sm:text-lg lg:text-xl">
                  {movie.original_name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {genreCategory?.list.map((genre) => (
                    <Badge key={genre.id} variant="secondary" className="glass-card px-3 py-1 font-semibold hover-glow">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="mt-10 lg:mt-12">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                <span className="text-gradient">Nội dung phim</span>
              </h2>
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <div
                  className="prose prose-sm prose-invert mt-2 max-w-none text-muted-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: movie.description || 'Chưa có mô tả.' }}
                />
              </div>
            </div>

            {/* Player Section */}
            <div className="mt-10 lg:mt-12" ref={playerRef}>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                <span className="text-gradient">Xem Phim</span>
              </h2>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-2xl bg-cover bg-center shadow-2xl border-2 border-white/10"
                  style={{ backgroundImage: `url(${backgroundPlayerUrl})` }}
                >
                  {selectedEpisodeUrl ? (
                    <iframe
                      className="h-full w-full"
                      src={selectedEpisodeUrl}
                      title="Video Player"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black/70 backdrop-blur-sm">
                      <div className="text-center space-y-3">
                        <Play className="w-16 h-16 mx-auto text-primary/50" />
                        <p className="text-foreground font-semibold">Chọn một tập để bắt đầu xem</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isSeries && (
              <div className="mt-10 lg:mt-12">
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  <span className="text-gradient">Danh sách tập</span>
                </h2>
                <div className="space-y-6">
                  {movie.episodes.map((server: EpisodeServer, index: number) => (
                    <div key={index} className="glass-card rounded-2xl p-6 border border-white/10">
                      <h3 className="font-bold text-lg text-foreground mb-4">{server.server_name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {server.items.map((episode: EpisodeItem) => (
                          <Button
                            key={episode.slug}
                            variant={selectedEpisodeUrl === episode.embed ? 'default' : 'secondary'}
                            onClick={() => handleSelectEpisode(episode.embed)}
                            className={selectedEpisodeUrl === episode.embed
                              ? "px-4 py-2 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg border border-white/10 font-semibold touch-target"
                              : "px-4 py-2 h-auto glass-card hover-lift font-semibold touch-target"}
                          >
                            {episode.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
        <RelatedMovies genreSlug={primaryGenre?.slug} currentMovieSlug={movie.slug} />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 p-4 pb-safe shadow-xl safe-area-bottom">
        <div className="container mx-auto grid grid-cols-2 gap-3">
          <Button size="lg" onClick={handleWatchClick} className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg border border-white/10 touch-target">
            <Play className="w-5 h-5" /> Xem Phim
          </Button>
          <Button size="lg" variant="secondary" onClick={handleToggleFavorite} className="w-full glass-card hover-lift touch-target">
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${isFavorited ? 'fill-red-500 text-red-500 scale-110' : ''}`}
            />
            Lưu
          </Button>
        </div>
      </div>
      <div className="h-24 md:hidden"></div>
    </PageWrapper>
  )
}

export default DetailPage