// src/components/SearchForm.tsx

import { optimizeImage } from '@/lib/image'
import { movieApi } from '@/services/api'
import type { MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search, X } from 'lucide-react'

// Thêm prop onSearchSubmit để đóng Dialog trên mobile
interface SearchFormProps {
  onSearchSubmit?: () => void
}

const SearchForm = ({ onSearchSubmit }: SearchFormProps) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const searchContainerRef = useRef<HTMLDivElement>(null)

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
    }, 500)
    return () => clearTimeout(timerId)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setIsFocused(false)
      onSearchSubmit?.() // Gọi callback để đóng Dialog
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const results = searchData?.items || []
  const showResults = isFocused && query.length > 2

  return (
    <div className="relative w-full max-w-sm" ref={searchContainerRef}>
      <form onSubmit={handleSearchSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm kiếm phim, diễn viên..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {showResults && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-background shadow-lg z-50 max-h-96 overflow-y-auto custom-scrollbar">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2">Đang tìm kiếm...</span>
            </div>
          )}
          {isError && <p className="p-4 text-center text-destructive">Có lỗi xảy ra.</p>}
          {!isLoading && results.length === 0 && debouncedQuery.length > 2 && (
            <p className="p-4 text-center text-muted-foreground">Không tìm thấy kết quả nào.</p>
          )}
          {results.length > 0 && (
            <ul>
              {results.slice(0, 7).map((movie: MovieListItem) => (
                <li key={movie.slug}>
                  <Link
                    to={`/phim/${movie.slug}`}
                    className="flex items-center gap-4 p-3 hover:bg-accent transition-colors"
                    onClick={() => {
                      setQuery('')
                      setIsFocused(false)
                      onSearchSubmit?.() // Đóng Dialog khi chọn phim
                    }}
                  >
                    <img
                      src={optimizeImage(movie.thumb_url, 100)}
                      alt={movie.name}
                      className="h-16 w-12 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground truncate">{movie.name}</p>
                      <p className="text-sm text-muted-foreground">{movie.original_name}</p>
                    </div>
                  </Link>
                </li>
              ))}
              {results.length > 7 && (
                <li className="border-t">
                  <Button variant="link" asChild className="w-full justify-center">
                    <Link
                      to={`/search?q=${encodeURIComponent(query.trim())}`}
                      onClick={() => {
                        setIsFocused(false)
                        onSearchSubmit?.() // Đóng Dialog khi xem tất cả
                      }}
                    >
                      Xem tất cả {results.length} kết quả
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchForm
