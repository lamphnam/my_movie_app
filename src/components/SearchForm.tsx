// src/components/SearchForm.tsx

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { optimizeImage } from '@/lib/image'
import { movieApi } from '@/services/api'
import type { MovieListItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Search, X } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const SearchForm = memo(() => {
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
    gcTime: 30 * 60 * 1000,
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // Reduced from 500ms for faster response
    return () => clearTimeout(timerId)
  }, [query])

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setIsFocused(false)
    }
  }, [query, navigate])

  const handleClearQuery = useCallback(() => {
    setQuery('')
  }, [])

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

  const results = useMemo(() => searchData?.items || [], [searchData])
  const showResults = isFocused && query.length > 2

  return (
    <div className="relative w-full transition-all duration-300" ref={searchContainerRef}>
      <form onSubmit={handleSearchSubmit} className="relative group" role="search" aria-label="Tìm kiếm phim">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" aria-hidden="true" />

        <Input
          type="search"
          placeholder="Tìm kiếm phim..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="h-10 sm:h-9 w-full rounded-full border-transparent bg-secondary/50 pl-10 pr-10 text-base sm:text-sm focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/50 transition-all shadow-inner"
          aria-label="Nhập tên phim"
          autoComplete="off"
          spellCheck="false"
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-background/80"
            onClick={handleClearQuery}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </form>

      {showResults && (
        <div
          className={cn(
            "custom-scrollbar absolute top-full mt-1 left-0 right-0 z-50 w-full overflow-y-auto rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl p-2",
            "max-h-96",
            "max-[900px]:max-h-[70vh]",
            "max-[600px]:max-h-[60vh]"
          )}
        >
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
            <ul className='space-y-1'>
              {results.slice(0, 7).map((movie: MovieListItem) => (
                <li key={movie.slug}>
                  <Link
                    to={`/phim/${movie.slug}`}
                    className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/10"
                    onClick={() => {
                      setQuery('')
                      setIsFocused(false)
                    }}
                  >
                    <img
                      src={optimizeImage(movie.thumb_url, 100)}
                      alt={movie.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{movie.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{movie.original_name}</p>
                    </div>
                  </Link>
                </li>
              ))}
              {results.length > 7 && (
                <li className="pt-2">
                  <Button variant="ghost" asChild className="w-full justify-center rounded-xl">
                    <Link
                      to={`/search?q=${encodeURIComponent(query.trim())}`}
                      onClick={() => setIsFocused(false)}
                    >
                      Xem tất cả
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          )}
        </div>
      )
      }
    </div >
  )
})

SearchForm.displayName = 'SearchForm'

export default SearchForm