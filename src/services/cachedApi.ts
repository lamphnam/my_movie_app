// src/services/cachedApi.ts

import { movieApi } from './api' // Import API gốc

// Một kho cache đơn giản trong bộ nhớ
const cache = new Map<string, { data: any; timestamp: number }>()

const CACHE_TTL = 5 * 60 * 1000 // 5 phút

const createCachedApiService = (api: typeof movieApi) => {
  const serviceWithCache: any = {}

  for (const key in api) {
    const originalMethod = (api as any)[key]

    serviceWithCache[key] = async (...args: any[]) => {
      const cacheKey = `${key}:${JSON.stringify(args)}`

      const cachedItem = cache.get(cacheKey)
      if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_TTL) {
        return cachedItem.data
      }

      const data = await originalMethod(...args)

      cache.set(cacheKey, { data, timestamp: Date.now() })

      return data
    }
  }

  return serviceWithCache as typeof movieApi
}

export const cachedMovieApi = createCachedApiService(movieApi)
