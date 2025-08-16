// src/App.tsx
import { lazy, Suspense } from 'react' // Import lazy và Suspense
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'

// Sử dụng React.lazy để import động các component trang
const HomePage = lazy(() => import('./pages/HomePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Bọc các route trong Suspense */}
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="phim/:slug"
          element={
            <Suspense fallback={<Loader />}>
              <DetailPage />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<Loader />}>
              <SearchPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
