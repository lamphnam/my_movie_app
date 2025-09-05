import { lazy, Suspense } from 'react' // Import lazy và Suspense
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader' // Import component Loader
import { Analytics } from '@vercel/analytics/react'

// Sử dụng React.lazy để import động các component trang
const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const GenrePage = lazy(() => import('./pages/GenrePage'))
const CountryPage = lazy(() => import('./pages/CountryPage'))
const YearPage = lazy(() => import('./pages/YearPage'))
const FilterPage = lazy(() => import('./pages/FilterPage'))

function App() {
  return (
    <Router>
      <Layout>
        {/* Bọc Routes bằng Suspense để hiển thị fallback UI (Loader) */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/phim/:slug" element={<DetailPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/genre/:slug" element={<GenrePage />} />
            <Route path="/country/:slug" element={<CountryPage />} />
            <Route path="/year/:slug" element={<YearPage />} />
          </Routes>
        </Suspense>
        <Analytics />
      </Layout>
    </Router>
  )
}

export default App
