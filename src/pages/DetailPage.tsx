'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import type { MovieDetail, Movie } from '../types'
import { movieApi } from '../services/api'
import Loader from '../components/Loader'

const DetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [movie, setMovie] = useState<MovieDetail['movie'] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(null)
  const [selectedEpisodeName, setSelectedEpisodeName] = useState<string>('')
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const [favorites, setFavorites] = useLocalStorage<Movie[]>('favorites', [])
  const isFavorited = favorites.some((fav) => fav.slug === slug)

  const handleToggleFavorite = () => {
    if (!movie || !slug) return

    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.slug !== slug))
    } else {
      const movieInfo: Movie = {
        id: movie.id,
        name: movie.name,
        slug: movie.slug,
        original_name: movie.original_name,
        thumb_url: movie.thumb_url,
        poster_url: movie.poster_url,
        created: movie.created,
        modified: movie.modified,
        description: movie.description,
        total_episodes: movie.total_episodes,
        current_episode: movie.current_episode,
        time: movie.time,
        quality: movie.quality,
        language: movie.language,
        director: movie.director,
        casts: movie.casts,
      }
      setFavorites([...favorites, movieInfo])
    }
  }

  const handleEpisodeSelect = (embedUrl: string, episodeName: string) => {
    setSelectedEpisodeUrl(embedUrl)
    setSelectedEpisodeName(episodeName)
  }

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  useEffect(() => {
    if (!slug) return

    const fetchMovieDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const data: MovieDetail = await movieApi.getMovieDetail(slug)
        setMovie(data.movie)

        const firstEpisode = data.movie.episodes?.[0]?.items?.[0]
        if (firstEpisode) {
          setSelectedEpisodeUrl(firstEpisode.embed)
          setSelectedEpisodeName(firstEpisode.name)
        }
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
      {/* Compact Header */}
      <div className="detail-header-compact">
        <div className="header-main">
          <h1 className="movie-title">{movie.name}</h1>
          <button onClick={handleToggleFavorite} className="favorite-button-compact">
            {isFavorited ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="movie-original-title">({movie.original_name})</p>

        {/* Quick Info Bar */}
        <div className="quick-info-bar">
          <span className="info-item">{movie.time || 'N/A'}</span>
          <span className="info-separator">•</span>
          <span className="info-item">{movie.quality}</span>
          <span className="info-separator">•</span>
          <span className="info-item">{movie.language}</span>
          {selectedEpisodeName && (
            <>
              <span className="info-separator">•</span>
              <span className="info-item current-episode">{selectedEpisodeName}</span>
            </>
          )}
        </div>
      </div>

      {/* Hero Video Player */}
      {selectedEpisodeUrl && (
        <div className="video-player-hero">
          <div className="video-player-container">
            <iframe
              className="video-player"
              src={selectedEpisodeUrl}
              title="Video Player"
              allow="fullscreen"
            />
          </div>
        </div>
      )}

      {/* Sticky Episodes Navigation */}
      <div className="episodes-navigation">
        <div className="episodes-header">
          <h3>Tập phim</h3>
          <div className="episodes-counter">
            {movie.current_episode || 1}/{movie.total_episodes || 'N/A'}
          </div>
        </div>

        <div className="episodes-scroll-container">
          {movie.episodes &&
            movie.episodes.map((server, serverIndex) => (
              <div key={serverIndex} className="server-episodes">
                {server.server_name && server.items.length > 1 && (
                  <div className="server-label">{server.server_name}</div>
                )}
                <div className="episode-pills">
                  {server.items.map((episode) => (
                    <button
                      key={episode.slug}
                      className={`episode-pill ${
                        episode.embed === selectedEpisodeUrl ? 'active' : ''
                      }`}
                      onClick={() => handleEpisodeSelect(episode.embed, episode.name)}
                    >
                      {episode.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Smart Description & Details */}
      <div className="movie-details-section">
        <div className="description-card">
          <p className="description-text">
            {showFullDescription ? movie.description : truncateDescription(movie.description)}
            {movie.description.length > 200 && (
              <button
                className="read-more-btn"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? ' Thu gọn' : ' Xem thêm'}
              </button>
            )}
          </p>
        </div>

        {/* Expandable Details */}
        <div className="expandable-details">
          <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>
            <span>Chi tiết phim</span>
            <svg
              className={`toggle-icon ${showDetails ? 'rotated' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {showDetails && (
            <div className="details-content">
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Diễn viên:</strong>
                  <span>{movie.casts || 'Đang cập nhật'}</span>
                </div>

                <div className="detail-item">
                  <strong>Đạo diễn:</strong>
                  <span>{movie.director || 'Đang cập nhật'}</span>
                </div>

                {movie.category &&
                  Object.values(movie.category).map((catGroup) => (
                    <div key={catGroup.group.id} className="detail-item">
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
          )}
        </div>
      </div>

      {/* Movie Poster - Now Secondary */}
      <div className="movie-poster-section">
        <img
          src={movie.thumb_url || '/placeholder.svg'}
          alt={movie.name}
          className="movie-poster"
        />
      </div>
    </div>
  )
}

export default DetailPage
