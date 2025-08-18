// src/pages/CategoryPage.tsx

'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import Pagination from '../components/Pagination'
import { filterData } from '../data/filters'
import type { Movie } from '../types'

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const category = filterData.categories.find((c) => c.slug === slug)

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return

      setLoading(true)
      try {
        // ---- BẮT ĐẦU SỬA LỖI ----
        // Tạo URL API một cách linh hoạt dựa trên slug
        let apiUrl = ''
        const baseApiUrl = 'https://phim.nguonc.com/api/films'

        // Kiểm tra nếu slug là trường hợp đặc biệt "phim-moi-cap-nhat"
        if (category.slug === 'phim-moi-cap-nhat') {
          // Dùng URL đúng, không có "/danh-sach/"
          apiUrl = `${baseApiUrl}/${category.slug}?page=${currentPage}`
        } else {
          // Đối với các danh mục khác, giữ nguyên cấu trúc cũ
          apiUrl = `${baseApiUrl}/danh-sach/${category.slug}?page=${currentPage}`
        }
        // ---- KẾT THÚC SỬA LỖI ----

        console.log('Fetching API from:', apiUrl) // Thêm log để kiểm tra URL

        const response = await fetch(apiUrl) // Sử dụng URL đã được tạo đúng
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
  }, [category, currentPage, slug])

  if (!category) {
    return (
      <div className="container">
        <div className="no-results">
          <h3>Không tìm thấy danh mục</h3>
          <p>Danh mục bạn tìm kiếm không tồn tại.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page-container">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-400">
          Khám phá những bộ phim hay nhất trong danh mục {category.name}
        </p>
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

export default CategoryPage
