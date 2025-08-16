// src/types.ts

// --- Dành cho API danh sách phim ---

export interface MovieListItem {
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  created: string
  modified: string
  current_episode: string
  quality: string
  language: string
}

export interface PaginationInfo {
  current_page: number
  total_page: number
}

export interface MovieListApiResponse {
  status: string
  paginate: PaginationInfo
  items: MovieListItem[]
}

// --- Dành cho API chi tiết phim ---

export interface EpisodeItem {
  name: string
  slug: string
  embed: string
  m3u8: string
}

export interface EpisodeServer {
  server_name: string
  items: EpisodeItem[]
}

export interface Category {
  id: string
  name: string
}

export interface CategoryGroup {
  group: { id: string; name: string }
  list: Category[]
}

export interface MovieDetail {
  name: string
  slug: string
  original_name: string
  thumb_url: string
  description: string
  casts: string
  category: { [key: string]: CategoryGroup }
  episodes: EpisodeServer[]
}

export interface MovieDetailApiResponse {
  status: string
  movie: MovieDetail
}
