// src/components/MovieFilters.tsx
import { useState, memo } from 'react'
import { filterData } from '../data/filters'

interface ActiveFilters {
  category: string
  country: string
  year: string
}

interface FilterProps {
  onFilterApply: (filters: ActiveFilters) => void
}

const MovieFilters = memo(({ onFilterApply }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    category: '',
    country: '',
    year: '',
  })

  // ==========================================================
  // HÀM NÀY LÀ THAY ĐỔI QUAN TRỌNG NHẤT
  // ==========================================================
  const handleSelect = (type: keyof ActiveFilters, value: string) => {
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

  // Logic để xác định nút "Tất cả" có active hay không
  const isAllActive = !activeFilters.category && !activeFilters.country && !activeFilters.year

  return (
    <div className="v-filter">
      <button className="filter-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-filter"></i>
        <span>Bộ lọc</span>
      </button>

      {isOpen && (
        <div className="filter-elements">
          {/* Filter Thể loại */}
          <div className="fe-row">
            <div className="fe-name">Thể loại:</div>
            <div className="fe-results">
              <div
                className={`item ${isAllActive ? 'active' : ''}`}
                // Khi click "Tất cả", chúng ta reset state bằng cách gọi handleReset
                onClick={handleReset}
              >
                Tất cả
              </div>
              {filterData.categories.map((cat) => (
                <div
                  key={cat.slug}
                  className={`item ${activeFilters.category === cat.slug ? 'active' : ''}`}
                  onClick={() => handleSelect('category', cat.slug)}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>

          {/* Filter Quốc gia */}
          <div className="fe-row">
            <div className="fe-name">Quốc gia:</div>
            <div className="fe-results">
              {/* Nút "Tất cả" của các bộ lọc con không cần nữa vì đã có nút reset chung */}
              {filterData.countries.map((country) => (
                <div
                  key={country.slug}
                  className={`item ${activeFilters.country === country.slug ? 'active' : ''}`}
                  onClick={() => handleSelect('country', country.slug)}
                >
                  {country.name}
                </div>
              ))}
            </div>
          </div>

          {/* Filter Năm */}
          <div className="fe-row">
            <div className="fe-name">Năm:</div>
            <div className="fe-results">
              {filterData.years.map((year) => (
                <div
                  key={year}
                  className={`item ${activeFilters.year === year ? 'active' : ''}`}
                  onClick={() => handleSelect('year', year)}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>

          {/* Nút bấm */}
          <div className="fe-row fe-row-end">
            <div className="fe-buttons">
              <button onClick={handleApply} className="btn-primary">
                Lọc kết quả <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button onClick={handleReset} className="btn-outline">
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default MovieFilters
