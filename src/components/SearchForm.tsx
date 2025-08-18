'use client'

import type React from 'react'

// src/components/SearchForm.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Điều hướng đến trang search với query param
      navigate(`/search?q=${query.trim()}`)
      setQuery('') // Reset ô input
    }
  }

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Tìm
      </button>
    </form>
  )
}

export default SearchForm
