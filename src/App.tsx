// src/App.tsx (Cập nhật)

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { AnimatePresence } from 'framer-motion' // <-- IMPORT
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'

// ... (phần import các trang giữ nguyên)
const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const GenrePage = lazy(() => import('./pages/GenrePage'))
const CountryPage = lazy(() => import('./pages/CountryPage'))
const YearPage = lazy(() => import('./pages/YearPage'))
const FilterPage = lazy(() => import('./pages/FilterPage'))

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/phim/:slug" element={<DetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/genre/:slug" element={<GenrePage />} />
        <Route path="/country/:slug" element={<CountryPage />} />
        <Route path="/year/:slug" element={<YearPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </Layout>
    </Router>
  )
}

export default App
