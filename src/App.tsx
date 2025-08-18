// src/App.tsx - Main App component with routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'
import CategoryPage from './pages/CategoryPage'
import GenrePage from './pages/GenrePage'
import CountryPage from './pages/CountryPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/phim/:slug" element={<DetailPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/genre/:slug" element={<GenrePage />} />
          <Route path="/country/:slug" element={<CountryPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
