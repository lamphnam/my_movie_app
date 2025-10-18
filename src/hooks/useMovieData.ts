import type { MovieListApiResponse, MovieListItem } from '@/types'
import { useEffect, useState } from 'react'

type Fetcher = () => Promise<MovieListApiResponse>

export const useMovieData = (fetcher: Fetcher) => {
  const [movies, setMovies] = useState<MovieListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetcher()
        if (data.status === 'success' && data.items) {
          setMovies(data.items)
        } else {
          setMovies([])
          setError('Không thể tải dữ liệu phim.')
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra một lỗi không xác định.')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetcher])

  return { movies, loading, error }
}
