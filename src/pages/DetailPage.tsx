// src/pages/DetailPage.tsx

import DetailPageSkeleton from '@/components/DetailPageSkeleton'
import PageWrapper from '@/components/PageWrapper'
import RelatedMovies from '@/components/RelatedMovies'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useLocalStorage from '@/hooks/useLocalStorage'
import { optimizeImage } from '@/lib/image'
import { cn } from '@/lib/utils'
import { movieApi } from '@/services/api'
import type { EpisodeItem, EpisodeServer, MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clapperboard, Globe, Heart, Play, Tv } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
  })

  const movie = movieData?.movie

  useEffect(() => {
    if (movie?.episodes?.[0]?.items?.[0]) {
      setSelectedEpisodeUrl(movie.episodes[0].items[0].embed)
    }
  }, [movie])

  if (isLoading) return <DetailPageSkeleton />
  if (isError || !movie) {
    return <div className="py-20 text-center text-destructive">Không thể tải thông tin phim.</div>
  }

  const isFavorited = favorites.some((fav) => fav.slug === slug)

  const handleToggleFavorite = () => {
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.slug !== slug))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  const handleWatchClick = () => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSelectEpisode = (url: string) => {
    setSelectedEpisodeUrl(url)
    handleWatchClick()
  }

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

  return (
    <PageWrapper>
      {movie && (
        <Helmet>
          <title>{`${movie.name} - Xem Phim Online Full HD | HNAM PHIM`}</title>
          <meta
            name="description"
            content={`Xem phim ${movie.name} (${movie.original_name}) ${movie.quality} Vietsub Thuyết Minh. ${movie.description?.substring(0, 120)}...`}
          />
          {/* Open Graph cho Facebook/Zalo */}
          <meta property="og:title" content={`${movie.name} - HNAM PHIM`} />
          <meta property="og:description" content={movie.description?.substring(0, 150)} />
          <meta property="og:image" content={movie.thumb_url} />
          <meta property="og:type" content="video.movie" />
        </Helmet>
      )}
      <div className="container space-y-12 lg:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
          {/* === CỘT TRÁI (Desktop) === */}
          <aside className="hidden lg:col-span-2 lg:block xl:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <img src={posterUrl} alt={movie.name} className="w-full rounded-lg shadow-2xl" />
              {/* Nút bấm chỉ hiển thị trên Desktop */}
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" onClick={handleWatchClick}>
                  <Play /> Xem
                </Button>
                <Button size="lg" variant="secondary" onClick={handleToggleFavorite}>
                  <Heart
                    className={`transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : ''
                      }`}
                  />
                  Lưu
                </Button>
              </div>
              <div className="space-y-3 rounded-lg border bg-card p-4 text-sm">
                <h3 className="mb-2 font-semibold text-foreground">Thông tin</h3>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clapperboard /> Thể loại
                  </span>
                  <span className="font-medium text-right">{primaryGenre?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar /> Năm
                  </span>
                  <span className="font-medium">{yearCategory?.list[0]?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Globe /> Quốc gia
                  </span>
                  <span className="font-medium text-right">
                    {countryCategory?.list[0]?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Tv /> Tập phim
                  </span>
                  <span className="font-medium">{movie.current_episode}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* === CỘT PHẢI / NỘI DUNG CHÍNH (All screens) === */}
          <main className="lg:col-span-3 xl:col-span-4">
            <div className="flex flex-col gap-6 sm:flex-row lg:block">
              <img
                src={posterUrl}
                alt={movie.name}
                className="w-1/2 max-w-[200px] self-start rounded-lg shadow-xl sm:w-1/3 lg:hidden"
              />
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                  {movie.name}
                </h1>
                <p className="text-md text-muted-foreground sm:text-lg lg:text-xl">
                  {movie.original_name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {genreCategory?.list.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">Nội dung phim</h2>
              <div
                className="prose prose-sm prose-invert mt-4 max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: movie.description || 'Chưa có mô tả.' }}
              />
            </div>

            <div className="mt-8 lg:mt-10" ref={playerRef}>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Xem Phim</h2>
              <div
                className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_60px_-15px_rgba(var(--primary),0.4)] ring-1 ring-white/5"
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
                  <div className="flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
                    <p className="text-foreground font-medium">Chọn một tập để bắt đầu xem</p>
                  </div>
                )}
              </div>
            </div>

            {isSeries && (
              <div className="mt-8 lg:mt-10">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">Danh sách tập</h2>
                <div className="space-y-6">
                  {movie.episodes.map((server: EpisodeServer, index: number) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-medium text-muted-foreground ml-2">{server.server_name}</h3>

                      {/* THAY ĐỔI: Bọc các nút trong glass-panel */}
                      <div className="glass-panel rounded-3xl p-4 md:p-6 bg-secondary/20">
                        <div className="flex flex-wrap gap-3">
                          {server.items.map((episode: EpisodeItem) => (
                            <Button
                              key={episode.slug}
                              variant={selectedEpisodeUrl === episode.embed ? 'default' : 'ghost'}
                              onClick={() => handleSelectEpisode(episode.embed)}
                              className={cn(
                                "min-w-[3rem] rounded-xl transition-all",
                                selectedEpisodeUrl !== episode.embed && "bg-background/50 hover:bg-white/20"
                              )}
                            >
                              {episode.name}
                            </Button>
                          ))}
                        </div>
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

      {/* === THANH HÀNH ĐỘNG DÍNH CHO MOBILE === */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/80 border-t border-border/40 p-3 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-2 gap-3">
          <Button size="lg" onClick={handleWatchClick} className="w-full">
            <Play /> Xem Phim
          </Button>
          <Button size="lg" variant="secondary" onClick={handleToggleFavorite} className="w-full">
            <Heart
              className={`transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
            />
            Lưu
          </Button>
        </div>
      </div>
      {/* Thêm một khoảng đệm ở cuối để nội dung không bị thanh sticky che mất */}
      <div className="h-20 md:hidden"></div>
    </PageWrapper>
  )
}

export default DetailPage
