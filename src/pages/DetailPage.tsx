// src/pages/DetailPage.tsx

import DetailPageSkeleton from '@/components/DetailPageSkeleton'
import PageWrapper from '@/components/PageWrapper'
import RelatedMovies from '@/components/RelatedMovies'
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

      <div className="container-desktop space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          {/* === LEFT COLUMN - Poster & Info (Desktop) === */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="lg:sticky lg:top-20 space-y-4">
              {/* Poster */}
              <div className="relative">
                <img
                  src={posterUrl}
                  alt={movie.name}
                  className="w-full rounded-lg shadow-lg"
                />
                {/* Quality Badge */}
                <span className="badge-primary absolute top-2 right-2">
                  {movie.quality}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleWatchClick} className="h-10">
                  <Play className="w-4 h-4 fill-current" /> Xem
                </Button>
                <Button variant="outline" onClick={handleToggleFavorite} className="h-10">
                  <Heart
                    className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  Lưu
                </Button>
              </div>

              {/* Info Card */}
              <div className="surface-card p-4 space-y-3">
                <h3 className="text-h3 mb-3">Thông tin</h3>
                <div className="space-y-2 text-body-sm">
                  <div className="flex justify-between py-1.5 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clapperboard className="w-3.5 h-3.5" /> Thể loại
                    </span>
                    <span className="font-medium">{primaryGenre?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Năm
                    </span>
                    <span className="font-medium">{yearCategory?.list[0]?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Quốc gia
                    </span>
                    <span className="font-medium">{countryCategory?.list[0]?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5" /> Tập
                    </span>
                    <span className="font-medium">{movie.current_episode}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* === MAIN CONTENT === */}
          <main className="lg:col-span-9">
            <div className="flex flex-col gap-4 sm:flex-row lg:block">
              {/* Mobile Poster */}
              <div className="relative lg:hidden w-1/2 max-w-[160px] self-start sm:w-1/3">
                <img
                  src={posterUrl}
                  alt={movie.name}
                  className="rounded-lg shadow-lg"
                />
                <span className="badge-primary absolute top-2 right-2 text-[10px]">
                  {movie.quality}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <h1 className="text-h1">{movie.name}</h1>
                <p className="text-body text-muted-foreground">{movie.original_name}</p>
                <div className="flex flex-wrap gap-1.5">
                  {genreCategory?.list.map((genre) => (
                    <span key={genre.id} className="badge-outline">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 lg:mt-8">
              <h2 className="text-h2 mb-3">Nội dung phim</h2>
              <div className="surface-card p-4">
                <div
                  className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: movie.description || 'Chưa có mô tả.' }}
                />
              </div>
            </div>

            {/* Player Section */}
            <div className="mt-6 lg:mt-8" ref={playerRef}>
              <h2 className="text-h2 mb-3">Xem Phim</h2>
              <div
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-cover bg-center shadow-lg border border-border"
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
                  <div className="flex h-full w-full items-center justify-center bg-black/80">
                    <div className="text-center space-y-2">
                      <Play className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-body-sm">Chọn một tập để bắt đầu xem</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Episodes List */}
            {isSeries && (
              <div className="mt-6 lg:mt-8">
                <h2 className="text-h2 mb-3">Danh sách tập</h2>
                <div className="space-y-4">
                  {movie.episodes.map((server: EpisodeServer, index: number) => (
                    <div key={index} className="surface-card p-4">
                      <h3 className="text-body font-medium mb-3">{server.server_name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {server.items.map((episode: EpisodeItem) => (
                          <Button
                            key={episode.slug}
                            variant={selectedEpisodeUrl === episode.embed ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleSelectEpisode(episode.embed)}
                            className="h-8 px-3"
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

        {/* Related Movies */}
        <RelatedMovies genreSlug={primaryGenre?.slug} currentMovieSlug={movie.slug} />
      </div>

      {/* Mobile Fixed Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-3 pb-safe safe-area-bottom">
        <div className="container-desktop grid grid-cols-2 gap-2">
          <Button onClick={handleWatchClick} className="h-11">
            <Play className="w-4 h-4 fill-current" /> Xem Phim
          </Button>
          <Button variant="outline" onClick={handleToggleFavorite} className="h-11">
            <Heart
              className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
            />
            Lưu
          </Button>
        </div>
      </div>
      <div className="h-20 lg:hidden"></div>
    </PageWrapper>
  )
}

export default DetailPage