const BASE_URL = 'https://phim.nguonc.com/api'

export const movieApi = {
  // Lấy danh sách phim mới cập nhật
  getNewMovies: async (page = 1) => {
    const response = await fetch(`${BASE_URL}/films/phim-moi-cap-nhat?page=${page}`)
    return response.json()
  },

  // Lấy phim theo danh mục
  getMoviesByCategory: async (slug: string, page = 1) => {
    const response = await fetch(`${BASE_URL}/films/danh-sach/${slug}?page=${page}`)
    return response.json()
  },

  // Lấy phim theo thể loại
  getMoviesByGenre: async (slug: string, page = 1) => {
    const response = await fetch(`${BASE_URL}/films/the-loai/${slug}?page=${page}`)
    return response.json()
  },

  // Lấy phim theo quốc gia
  getMoviesByCountry: async (slug: string, page = 1) => {
    const response = await fetch(`${BASE_URL}/films/quoc-gia/${slug}?page=${page}`)
    return response.json()
  },

  // Lấy phim theo năm
  getMoviesByYear: async (year: string, page = 1) => {
    const response = await fetch(`${BASE_URL}/films/nam-phat-hanh/${year}?page=${page}`)
    return response.json()
  },

  // Tìm kiếm phim
  searchMovies: async (keyword: string) => {
    const response = await fetch(`${BASE_URL}/films/search?keyword=${encodeURIComponent(keyword)}`)
    return response.json()
  },

  // Lấy chi tiết phim
  getMovieDetail: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/film/${slug}`)
    return response.json()
  },
}
