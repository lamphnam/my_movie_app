// src/pages/DetailPage.tsx

import useLocalStorage from '@/hooks/useLocalStorage'
import { optimizeImage } from '@/lib/image'
import { movieApi } from '@/services/api'
import type { EpisodeItem, EpisodeServer, MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import DetailPageSkeleton from '@/components/DetailPageSkeleton'
import RelatedMovies from '@/components/RelatedMovies'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clapperboard, Globe, Heart, Play, Tv } from 'lucide-react'

// Kiểu dữ liệu không đổi
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
    // POLISH FOR MOBILE: Giảm khoảng cách tổng thể trên mobile
    <div className="container space-y-12 lg:space-y-16">
      {/* POLISH FOR MOBILE: Thay đổi cấu trúc grid, gap cho mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
        {/* === LEFT COLUMN (Desktop only) === */}
        {/* POLISH FOR MOBILE: Cột này sẽ ẩn trên mobile và chỉ hiển thị trên màn hình lớn */}
        <aside className="hidden lg:col-span-2 lg:block xl:col-span-1">
          {/* POLISH FOR MOBILE: Chỉ sticky trên màn hình lớn */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <img src={posterUrl} alt={movie.name} className="w-full rounded-lg shadow-2xl" />
            <div className="grid grid-cols-2 gap-2">
              <Button size="lg" onClick={handleWatchClick}>
                <Play className="mr-2 h-5 w-5" /> Xem
              </Button>
              <Button size="lg" variant="secondary" onClick={handleToggleFavorite}>
                <Heart
                  className={`mr-2 h-5 w-5 transition-colors ${
                    isFavorited ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
                Lưu
              </Button>
            </div>
            <div className="space-y-3 rounded-lg border bg-card p-4 text-sm">
              <h3 className="mb-2 font-semibold text-foreground">Thông tin</h3>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clapperboard className="h-4 w-4" /> Thể loại
                </span>
                <span className="font-medium text-right">{primaryGenre?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" /> Năm
                </span>
                <span className="font-medium">{yearCategory?.list[0]?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" /> Quốc gia
                </span>
                <span className="font-medium text-right">
                  {countryCategory?.list[0]?.name || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Tv className="h-4 w-4" /> Tập phim
                </span>
                <span className="font-medium">{movie.current_episode}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* === RIGHT COLUMN / MAIN CONTENT (All screens) === */}
        <main className="lg:col-span-3 xl:col-span-4">
          {/* POLISH FOR MOBILE: Tái cấu trúc khu vực hero cho mobile */}
          <div className="flex flex-col gap-6 sm:flex-row lg:block">
            {/* Poster phim hiển thị trên mobile */}
            <img
              src={posterUrl}
              alt={movie.name}
              className="w-1/2 self-start rounded-lg shadow-xl sm:w-1/3 lg:hidden"
            />
            <div className="flex-1 space-y-4">
              {/* POLISH FOR MOBILE: Giảm kích thước chữ cho mobile */}
              <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
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
            <h2 className="text-2xl font-semibold tracking-tight">Xem Phim</h2>
            <div
              className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-cover bg-center shadow-lg"
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
                <div className="flex h-full w-full items-center justify-center bg-black/50">
                  <p className="text-foreground">Chọn một tập để bắt đầu xem</p>
                </div>
              )}
            </div>
          </div>

          {isSeries && (
            <div className="mt-8 lg:mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">Danh sách tập</h2>
              <div className="mt-4 space-y-4">
                {movie.episodes.map((server: EpisodeServer, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold text-muted-foreground">{server.server_name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {server.items.map((episode: EpisodeItem) => (
                        // POLISH FOR MOBILE: Tăng padding cho nút để dễ chạm hơn
                        <Button
                          key={episode.slug}
                          variant={selectedEpisodeUrl === episode.embed ? 'default' : 'secondary'}
                          onClick={() => handleSelectEpisode(episode.embed)}
                          className="px-4 py-2 h-auto"
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
  )
}

export default DetailPage
