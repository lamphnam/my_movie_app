// src/components/Header.tsx

'use client'

import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { filterData } from '../data/filters'
import SearchForm from './SearchForm'

const Header: React.FC = () => {
  // State cho menu hamburger (nếu bạn muốn dùng lại)
  // State để quản lý dropdown nào đang mở ('genres', 'countries', 'years', hoặc null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Hàm để bật/tắt dropdown khi click vào nút
  const handleDropdownToggle = (dropdownName: string) => {
    // Nếu dropdown đang click đã mở thì đóng lại, ngược lại thì mở nó ra
    if (openDropdown === dropdownName) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdownName)
    }
  }

  // Hàm để đóng tất cả dropdown khi click vào một link bên trong
  const handleLinkClick = () => {
    setOpenDropdown(null)
  }

  return (
    <header className="app-header">
      <div className="container">
        {/* Main Header - Đã tối ưu cho responsive */}
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span>🎬</span> HNAM Phim
          </Link>

          {/* Navigation (cho cả mobile và desktop) */}
          <nav className="desktop-nav">
            {/* Dropdown Thể loại */}
            <div className={`nav-dropdown ${openDropdown === 'genres' ? 'is-open' : ''}`}>
              <button className="nav-link" onClick={() => handleDropdownToggle('genres')}>
                Thể loại
                <svg
                  className="dropdown-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="nav-dropdown-content">
                <div className="nav-dropdown-grid">
                  {filterData.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.slug}`}
                      className="nav-dropdown-item"
                      onClick={handleLinkClick}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown Quốc gia */}
            <div className={`nav-dropdown ${openDropdown === 'countries' ? 'is-open' : ''}`}>
              <button className="nav-link" onClick={() => handleDropdownToggle('countries')}>
                Quốc gia
                <svg
                  className="dropdown-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="nav-dropdown-content">
                <div className="nav-dropdown-grid">
                  {filterData.countries.map((country) => (
                    <Link
                      key={country.id}
                      to={`/country/${country.slug}`}
                      className="nav-dropdown-item"
                      onClick={handleLinkClick}
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown Năm Sản Xuất */}
            <div className={`nav-dropdown ${openDropdown === 'years' ? 'is-open' : ''}`}>
              <button className="nav-link" onClick={() => handleDropdownToggle('years')}>
                Năm
                <svg
                  className="dropdown-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="nav-dropdown-content">
                <div className="nav-dropdown-grid">
                  {filterData.years.map((year) => (
                    <Link
                      key={year.id}
                      to={`/year/${year.slug}`}
                      className="nav-dropdown-item"
                      onClick={handleLinkClick}
                    >
                      {year.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* SearchForm được đặt riêng để dễ dàng responsive */}
          <SearchForm />

          {/* Nút Hamburger (tạm ẩn đi vì nav đã hiển thị) */}
          {/* <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
        </div>

        {/* Category Pills (giữ nguyên) */}
        <div className="category-pills">
          {filterData.categories.slice(0, 7).map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`} className="category-pill">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
