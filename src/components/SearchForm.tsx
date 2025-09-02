import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <form className="relative w-full max-w-sm" onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-16"
      />
      <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
        Tìm
      </Button>
    </form>
  )
}

export default SearchForm
