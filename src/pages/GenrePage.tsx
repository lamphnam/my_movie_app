// src/pages/GenrePage.tsx

'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import Pagination from '../components/Pagination'
import { filterData } from '../data/filters'
import type { Movie } from '../types'

const GenrePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const genre = filterData.genres.find((g) => g.slug === slug)

  useEffect(() => {
    const fetchMovies = async () => {
      if (!genre) return

      setLoading(true)
      try {
        const response = await fetch(
          `https://phim.nguonc.com/api/films/the-loai/${genre.slug}?page=${currentPage}`,
        )
        const data = await response.json()

        if (data.status === 'success') {
          setMovies(data.items || [])
          setTotalPages(data.paginate?.total_page || 1)
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    fetchMovies()
  }, [genre, currentPage, slug])

  if (!genre) {
    return (
      <div className="container">
        <div className="no-results">
          <h3>Không tìm thấy thể loại</h3>
          <p>Thể loại bạn tìm kiếm không tồn tại.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="genre-page-container">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{genre.name}</h1>
        <p className="text-gray-400">Khám phá những bộ phim hay nhất thuộc thể loại {genre.name}</p>
      </div>

      {loading ? (
        <div className="movie-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="movie-grid mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie.slug} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  )
}

export default GenrePage
