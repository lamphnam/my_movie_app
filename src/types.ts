export interface Movie {
  id?: string
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  created: string
  modified: string
  description: string
  total_episodes: number
  current_episode: string
  time: string
  quality: string
  language: string
  director: string | null
  casts: string | null
  category?: {
    [key: string]: {
      group: {
        id: string
        name: string
      }
      list: Array<{
        id: string
        name: string
      }>
    }
  }
}

export interface ApiResponse {
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
  items: Movie[]
}

export interface MovieListItem {
  id?: string
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  created: string
  modified: string
  description: string
  total_episodes: number
  current_episode: string
  time: string
  quality: string
  language: string
  director: string | null
  casts: string | null
  category?: {
    [key: string]: {
      group: {
        id: string
        name: string
      }
      list: Array<{
        id: string
        name: string
      }>
    }
  }
}

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

export interface MovieDetail {
  status: string
  movie: Movie & {
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
}

export interface FilterOption {
  id: string
  name: string
  slug: string
}

export interface FilterGroup {
  id: string
  name: string
  options: FilterOption[]
}
