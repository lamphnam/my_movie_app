const BASE_URL = 'https://phim.nguonc.com/api'

// Helper function để xử lý fetch và parse JSON
const fetchApi = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const movieApi = {
  getNewMovies: (page = 1) => {
    return fetchApi(`${BASE_URL}/films/phim-moi-cap-nhat?page=${page}`)
  },

  getMoviesByCategory: (slug: string, page = 1) => {
    // Xử lý trường hợp đặc biệt cho 'phim-moi-cap-nhat'
    if (slug === 'phim-moi-cap-nhat') {
      return movieApi.getNewMovies(page)
    }
    return fetchApi(`${BASE_URL}/films/danh-sach/${slug}?page=${page}`)
  },

  getMoviesByGenre: (slug: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/the-loai/${slug}?page=${page}`)
  },

  getMoviesByCountry: (slug: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/quoc-gia/${slug}?page=${page}`)
  },

  getMoviesByYear: (year: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/nam-phat-hanh/${year}?page=${page}`)
  },

  searchMovies: (keyword: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/search?keyword=${encodeURIComponent(keyword)}&page=${page}`)
  },

  getMovieDetail: (slug: string) => {
    return fetchApi(`${BASE_URL}/film/${slug}`)
  },
}
