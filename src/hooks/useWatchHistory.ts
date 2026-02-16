// src/hooks/useWatchHistory.ts

import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'
import type { MovieListItem } from '@/types'

export interface WatchHistoryEntry {
  slug: string
  name: string
  originalName: string
  thumbUrl: string
  lastWatchedAt: number
  currentEpisode?: string
  currentEpisodeName?: string
}

const MAX_HISTORY_ITEMS = 20
const HISTORY_EXPIRY_DAYS = 30

export const useWatchHistory = () => {
  const [history, setHistory] = useLocalStorage<WatchHistoryEntry[]>('watchHistory', [])

  const addToHistory = useCallback((movie: MovieListItem, episodeName?: string) => {
    const newEntry: WatchHistoryEntry = {
      slug: movie.slug,
      name: movie.name,
      originalName: movie.original_name,
      thumbUrl: movie.thumb_url,
      lastWatchedAt: Date.now(),
      currentEpisode: movie.current_episode,
      currentEpisodeName: episodeName,
    }

    setHistory((prev) => {
      // Remove old entry if exists
      const filtered = prev.filter((item) => item.slug !== movie.slug)
      
      // Add new entry at the beginning
      const updated = [newEntry, ...filtered]
      
      // Keep only MAX_HISTORY_ITEMS
      const trimmed = updated.slice(0, MAX_HISTORY_ITEMS)
      
      // Remove entries older than HISTORY_EXPIRY_DAYS
      const now = Date.now()
      const expiryTime = HISTORY_EXPIRY_DAYS * 24 * 60 * 60 * 1000
      return trimmed.filter((item) => now - item.lastWatchedAt < expiryTime)
    })
  }, [setHistory])

  const getHistory = useCallback(() => {
    return history
  }, [history])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [setHistory])

  return {
    history,
    addToHistory,
    getHistory,
    clearHistory,
  }
}
