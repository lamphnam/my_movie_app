// src/components/Header.tsx

'use client'

import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { filterData } from '../data/filters'
import SearchForm from './SearchForm' // <-- BƯỚC 1: IMPORT SearchForm

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="container">
        {/* Main Header */}
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span>🎬</span> HNAM Phim
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {/* Dropdown Thể loại */}
            <div className="nav-dropdown">
              <button className="nav-link">
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
                  {filterData.genres.slice(0, 10).map((genre) => (
                    <Link key={genre.id} to={`/genre/${genre.slug}`} className="nav-dropdown-item">
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown Quốc gia */}
            <div className="nav-dropdown">
              <button className="nav-link">
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
                  {filterData.countries.slice(0, 10).map((country) => (
                    <Link
                      key={country.id}
                      to={`/country/${country.slug}`}
                      className="nav-dropdown-item"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* BƯỚC 2: THAY THẾ LINK BẰNG SEARCHFORM */}
            <SearchForm />
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {filterData.categories.slice(0, 7).map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`} className="category-pill">
              {category.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Trang chủ
              </Link>
              <div>
                <p className="mobile-menu-heading">Thể loại</p>
                <div className="mobile-menu-grid">
                  {filterData.genres.slice(0, 8).map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.slug}`}
                      className="mobile-nav-link-sub"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Trên mobile vẫn giữ link đến trang search riêng cho gọn */}
              <Link to="/search" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Tìm kiếm
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
