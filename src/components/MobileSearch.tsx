// src/components/MobileSearch.tsx

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { optimizeImage } from '@/lib/image'
import { movieApi } from '@/services/api'
import type { MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface MobileSearchProps {
  onSearchSubmit: () => void
}

const MobileSearch = ({ onSearchSubmit }: MobileSearchProps) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const navigate = useNavigate()

  const {
    data: searchData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => movieApi.searchMovies(debouncedQuery, 1),
    enabled: debouncedQuery.length > 2,
    staleTime: 10 * 60 * 1000,
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // Debounce nhanh hơn để có cảm giác phản hồi tốt hơn trên mobile
    return () => clearTimeout(timerId)
  }, [query])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      onSearchSubmit()
    }
  }

  const handleLinkClick = () => {
    onSearchSubmit()
  }

  const results = searchData?.items || []

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={handleFormSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          autoFocus // Tự động focus vào ô input khi mở
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Vùng hiển thị kết quả, có thể cuộn */}
      <div className="custom-scrollbar mt-4 flex-1 overflow-y-auto">
        {isLoading && debouncedQuery.length > 2 && (
          <div className="flex items-center justify-center p-4 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="ml-2">Đang tìm kiếm...</span>
          </div>
        )}
        {isError && <p className="p-4 text-center text-destructive">Có lỗi xảy ra khi tìm kiếm.</p>}
        {!isLoading && results.length === 0 && debouncedQuery.length > 2 && (
          <p className="p-4 text-center text-muted-foreground">
            Không tìm thấy kết quả nào cho "{debouncedQuery}".
          </p>
        )}

        {/* Thông báo trạng thái ban đầu */}
        {debouncedQuery.length <= 2 && (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center text-muted-foreground">
            <Search className="mb-4 h-10 w-10 opacity-50" />
            <p>Nhập tên phim, diễn viên bạn muốn tìm.</p>
          </div>
        )}

        {results.length > 0 && (
          <ul className="space-y-1">
            {results.map((movie: MovieListItem) => (
              <li key={movie.slug}>
                <Link
                  to={`/phim/${movie.slug}`}
                  className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
                  onClick={handleLinkClick}
                >
                  <img
                    src={optimizeImage(movie.thumb_url, 100)}
                    alt={movie.name}
                    className="h-20 w-14 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-semibold text-foreground">{movie.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{movie.original_name}</p>
                  </div>
                </Link>
              </li>
            ))}
            {/* Nút xem tất cả */}
            <li className="pt-2">
              <Button type="submit" variant="link" className="w-full" onClick={handleFormSubmit}>
                Xem tất cả {searchData?.paginate?.total_items || results.length} kết quả
              </Button>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default MobileSearch
