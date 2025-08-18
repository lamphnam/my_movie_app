// src/type.ts - Type definitions for the movie app
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
  total_items: number
  items_per_page: number
}

export interface MovieListApiResponse {
  status: string
  items: MovieListItem[]
  paginate: PaginationInfo
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
}

export interface CategoryGroup {
  id: string
  name: string
}

export interface Category {
  group: CategoryGroup
  list: CategoryItem[]
}

export interface EpisodeItem {
  name: string
  slug: string
  embed: string
  m3u8: string
}

export interface Episode {
  server_name: string
  items: EpisodeItem[]
}

export interface MovieDetail {
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  description: string
  casts: string
  category: Record<string, Category>
  episodes: Episode[]
}

export interface MovieDetailApiResponse {
  status: string
  movie: MovieDetail
}
