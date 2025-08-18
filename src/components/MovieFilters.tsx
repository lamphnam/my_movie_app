'use client'

// src/components/MovieFilters.tsx
import { useState, memo } from 'react'
import { filterData, popularCategories, popularCountries } from '../data/filters'

interface ActiveFilters {
  category: string
  country: string
  year: string
}

interface FilterProps {
  onFilterApply: (filters: ActiveFilters) => void
  currentFilters?: ActiveFilters
}

const MovieFilters = memo(({ onFilterApply, currentFilters }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    currentFilters || {
      category: '',
      country: '',
      year: '',
    },
  )

  const handleSelect = (type: keyof ActiveFilters, value: string) => {
    // Nếu click lại item đã active thì bỏ chọn
    const newValue = activeFilters[type] === value ? '' : value
    setActiveFilters((prev) => ({ ...prev, [type]: newValue }))
  }

  const handleApply = () => {
    onFilterApply(activeFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const resetFilters = { category: '', country: '', year: '' }
    setActiveFilters(resetFilters)
    onFilterApply(resetFilters)
    setIsOpen(false)
  }

  const hasActiveFilters = activeFilters.category || activeFilters.country || activeFilters.year

  return (
    <div className="movie-filters">
      <button
        className={`filter-toggle ${hasActiveFilters ? 'has-filters' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-filter"></i>
        <span>Bộ lọc</span>
        {hasActiveFilters && <span className="filter-count">●</span>}
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <h3>Lọc phim theo</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div className="filter-content">
            {/* Popular Categories */}
            <div className="filter-section">
              <div className="filter-label">
                <i className="fa-solid fa-star"></i>
                Thể loại phổ biến
              </div>
              <div className="filter-grid">
                {popularCategories.map((slug) => {
                  const category = filterData.categories.find((cat) => cat.slug === slug)
                  if (!category) return null
                  return (
                    <div
                      key={category.slug}
                      className={`filter-chip ${
                        activeFilters.category === category.slug ? 'active' : ''
                      }`}
                      onClick={() => handleSelect('category', category.slug)}
                    >
                      {category.name}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* All Categories */}
            <div className="filter-section">
              <div className="filter-label">
                <i className="fa-solid fa-film"></i>
                Tất cả thể loại
              </div>
              <div className="filter-grid">
                <div
                  className={`filter-chip ${activeFilters.category === '' ? 'active' : ''}`}
                  onClick={() => handleSelect('category', '')}
                >
                  Tất cả
                </div>
                {filterData.categories.map((cat) => (
                  <div
                    key={cat.slug}
                    className={`filter-chip ${activeFilters.category === cat.slug ? 'active' : ''}`}
                    onClick={() => handleSelect('category', cat.slug)}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Countries */}
            <div className="filter-section">
              <div className="filter-label">
                <i className="fa-solid fa-globe"></i>
                Quốc gia phổ biến
              </div>
              <div className="filter-grid">
                {popularCountries.map((slug) => {
                  const country = filterData.countries.find((c) => c.slug === slug)
                  if (!country) return null
                  return (
                    <div
                      key={country.slug}
                      className={`filter-chip ${
                        activeFilters.country === country.slug ? 'active' : ''
                      }`}
                      onClick={() => handleSelect('country', country.slug)}
                    >
                      {country.name}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* All Countries */}
            <div className="filter-section">
              <div className="filter-label">
                <i className="fa-solid fa-flag"></i>
                Tất cả quốc gia
              </div>
              <div className="filter-grid">
                <div
                  className={`filter-chip ${activeFilters.country === '' ? 'active' : ''}`}
                  onClick={() => handleSelect('country', '')}
                >
                  Tất cả
                </div>
                {filterData.countries.map((country) => (
                  <div
                    key={country.slug}
                    className={`filter-chip ${
                      activeFilters.country === country.slug ? 'active' : ''
                    }`}
                    onClick={() => handleSelect('country', country.slug)}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Years */}
            <div className="filter-section">
              <div className="filter-label">
                <i className="fa-solid fa-calendar"></i>
                Năm phát hành
              </div>
              <div className="filter-grid">
                <div
                  className={`filter-chip ${activeFilters.year === '' ? 'active' : ''}`}
                  onClick={() => handleSelect('year', '')}
                >
                  Tất cả
                </div>
                {filterData.years.map((year) => (
                  <div
                    key={year}
                    className={`filter-chip ${activeFilters.year === year ? 'active' : ''}`}
                    onClick={() => handleSelect('year', year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="filter-actions">
            <button onClick={handleReset} className="btn-reset">
              <i className="fa-solid fa-refresh"></i>
              Xóa bộ lọc
            </button>
            <button onClick={handleApply} className="btn-apply">
              <i className="fa-solid fa-check"></i>
              Áp dụng lọc
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default MovieFilters
