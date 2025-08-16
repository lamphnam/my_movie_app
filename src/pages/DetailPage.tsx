import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import type { MovieDetail, MovieDetailApiResponse, MovieListItem } from '../type'
import Loader from '../components/Loader'

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(null)

  // Yêu thích
  const [favorites, setFavorites] = useLocalStorage<MovieListItem[]>('favorites', [])
  const isFavorited = favorites.some((fav) => fav.slug === slug)

  const handleToggleFavorite = () => {
    if (!movie || !slug) return

    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.slug !== slug))
    } else {
      const movieInfo: MovieListItem = {
        name: movie.name,
        slug: movie.slug,
        original_name: movie.original_name,
        thumb_url: movie.thumb_url,
        poster_url: '', // bỏ trống
        created: '',
        modified: '',
        current_episode: '',
        quality: '',
        language: '',
      }
      setFavorites([...favorites, movieInfo])
    }
  }

  useEffect(() => {
    if (!slug) return

    const fetchMovieDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://phim.nguonc.com/api/film/${slug}`)
        if (!response.ok) throw new Error('Không tìm thấy thông tin phim')

        const data: MovieDetailApiResponse = await response.json()
        setMovie(data.movie)

        // Chọn tập đầu tiên để phát
        const firstEpisode = data.movie.episodes?.[0]?.items?.[0]
        if (firstEpisode) setSelectedEpisodeUrl(firstEpisode.embed)
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetail()
  }, [slug])

  if (loading) return <Loader />
  if (error) return <div className="error-message">Lỗi: {error}</div>
  if (!movie) return <div>Không có dữ liệu phim.</div>

  return (
    <div className="movie-detail-page">
      {selectedEpisodeUrl && (
        <div className="video-player-section">
          <div className="video-player-container">
            <iframe
              className="video-player"
              src={selectedEpisodeUrl}
              title="Video Player"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
      )}

      <div className="detail-header">
        <h1 className="movie-title">{movie.name}</h1>
        <p className="movie-original-title">({movie.original_name})</p>
        <button onClick={handleToggleFavorite} className="favorite-button">
          {isFavorited ? '❤️ Bỏ thích' : '🤍 Thêm vào yêu thích'}
        </button>
      </div>

      <div className="movie-content">
        <img src={movie.thumb_url} alt={movie.name} className="movie-thumb" />
        <div className="movie-info">
          <p>
            <strong>Mô tả:</strong> {movie.description}
          </p>
          <p>
            <strong>Diễn viên:</strong> {movie.casts}
          </p>
          <div className="categories">
            {Object.values(movie.category).map((catGroup) => (
              <div key={catGroup.group.id} className="category-group">
                <strong>{catGroup.group.name}:</strong>
                <div className="category-tags">
                  {catGroup.list.map((item) => (
                    <span key={item.id} className="category-tag">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="episodes-section">
        <h2>Danh sách tập phim</h2>
        {movie.episodes.map((server, index) => (
          <div key={index} className="server-list">
            <h3>{server.server_name}</h3>
            <ul className="episode-list">
              {server.items.map((episode) => (
                <li key={episode.slug}>
                  <button
                    className={`episode-button ${
                      episode.embed === selectedEpisodeUrl ? 'active' : ''
                    }`}
                    onClick={() => setSelectedEpisodeUrl(episode.embed)}
                  >
                    {episode.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailPage
