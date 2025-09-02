// src/types.ts

// Dùng cho API trả về danh sách phim
export interface MovieListItem {
  id?: string
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  created: string
  modified: string
  description?: string
  total_episodes: number
  current_episode: string
  time: string | null
  quality: string
  language: string
  director: string | null
  casts: string | null
}

// Dùng cho API trả về chi tiết phim
export interface MovieDetail extends MovieListItem {
  category?: {
    [key: string]: {
      group: { id: string; name: string }
      list: Array<{ id: string; name: string }>
    }
  }
  episodes: Array<{
    server_name: string
    items: Array<{
      name: string
      slug: string
      embed: string
      m3u8: string
    }>
  }>
}

// Dùng cho các response API dạng danh sách
export interface MovieListApiResponse {
  status: string
  paginate: {
    current_page: number
    total_page: number
    total_items: number
    items_per_page: number
  }
  cat?: {
    name: string
    title: string
    slug: string
  }
  items: MovieListItem[]
}

// Dùng cho response API dạng chi tiết
export interface MovieDetailApiResponse {
  status: string
  movie: MovieDetail
}
