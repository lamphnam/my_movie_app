// src/components/Layout.tsx
import { Outlet, Link } from 'react-router-dom'
import SearchForm from './SearchForm' // Import component mới

const Layout = () => {
  return (
    <>
      <header className="app-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            HNAM PHIM
          </Link>
          <SearchForm /> {/* Thêm form tìm kiếm vào đây */}
        </div>
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
