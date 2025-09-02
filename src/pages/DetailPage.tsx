import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import type { MovieDetail, MovieListItem } from '@/types'
import { movieApi } from '@/services/api'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(null)

  const [favorites, setFavorites] = useLocalStorage<MovieListItem[]>('favorites', [])
  const isFavorited = favorites.some((fav) => fav.slug === slug)

  useEffect(() => {
    if (!slug) return

    const fetchMovieDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await movieApi.getMovieDetail(slug)
        if (data.status === 'success' && data.movie) {
          setMovie(data.movie)
          const firstEpisode = data.movie.episodes?.[0]?.items?.[0]
          if (firstEpisode) {
            setSelectedEpisodeUrl(firstEpisode.embed)
          }
        } else {
          setError('Không tìm thấy thông tin phim.')
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovieDetail()
  }, [slug])

  const handleToggleFavorite = () => {
    if (!movie || !slug) return
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.slug !== slug))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  if (loading) return <Loader />
  if (error) return <div className="text-center text-destructive py-10">{error}</div>
  if (!movie)
    return <div className="text-center text-muted-foreground py-10">Không có dữ liệu phim.</div>

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gradient md:text-4xl">{movie.name}</h1>
          <p className="text-lg text-muted-foreground">({movie.original_name})</p>
        </div>
        <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
          <i className={`fa-solid fa-heart ${isFavorited ? 'text-red-500' : ''}`}></i>
        </Button>
      </div>

      {/* Video Player */}
      {selectedEpisodeUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg border">
          <iframe
            className="h-full w-full"
            src={selectedEpisodeUrl}
            title="Video Player"
            allowFullScreen
          />
        </div>
      )}

      {/* Episodes */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tập</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {movie.episodes.map((server, serverIndex) => (
            <div key={serverIndex}>
              <h3 className="mb-2 font-semibold">{server.server_name}</h3>
              <div className="flex flex-wrap gap-2">
                {server.items.map((episode) => (
                  <Button
                    key={episode.slug}
                    variant={episode.embed === selectedEpisodeUrl ? 'default' : 'secondary'}
                    onClick={() => setSelectedEpisodeUrl(episode.embed)}
                  >
                    {episode.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Description & Details */}
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Nội dung phim</AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-sm prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: movie.description || '' }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Chi tiết</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>
              <strong>Diễn viên:</strong> {movie.casts || 'Đang cập nhật'}
            </p>
            <p>
              <strong>Đạo diễn:</strong> {movie.director || 'Đang cập nhật'}
            </p>
            {movie.category &&
              Object.values(movie.category).map((catGroup) => (
                <div key={catGroup.group.id}>
                  <strong>{catGroup.group.name}:</strong>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {catGroup.list.map((item) => (
                      <div key={item.id} className="rounded-full bg-secondary px-3 py-1 text-sm">
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default DetailPage
