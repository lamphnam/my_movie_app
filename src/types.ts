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

export interface MovieDetail extends MovieListItem {
  category?: {
    [key: string]: {
      group: { id: string; name: string }
      list: Array<{ id: string; name: string }>
    }
  }
  episodes: EpisodeServer[]
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

export interface MovieDetailApiResponse {
  status: string
  movie: MovieDetail
}
