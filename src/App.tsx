// src/App.tsx (Cập nhật)

import { AnimatePresence } from 'framer-motion' // <-- IMPORT
import { lazy, Suspense, useEffect, useState } from 'react'
import type { ComponentType } from 'react'
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
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/lich-su" element={<HistoryPage />} />
        <Route path="/yeu-thich" element={<FavoritesPage />} />
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
  const [AnalyticsComponent, setAnalyticsComponent] = useState<ComponentType | null>(null)
  const [SpeedInsightsComponent, setSpeedInsightsComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let idleId: any = null

    const loadAnalytics = async () => {
      const [{ Analytics }, { SpeedInsights }] = await Promise.all([
        import('@vercel/analytics/react'),
        import('@vercel/speed-insights/react'),
      ])

      setAnalyticsComponent(() => Analytics)
      setSpeedInsightsComponent(() => SpeedInsights)
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => {
        void loadAnalytics()
      })
    } else {
      timeoutId = setTimeout(() => {
        void loadAnalytics()
      }, 1500)
    }

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [])

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>
        {SpeedInsightsComponent ? <SpeedInsightsComponent /> : null}
        {AnalyticsComponent ? <AnalyticsComponent /> : null}
      </Layout>
    </Router>
  )
}

export default App
