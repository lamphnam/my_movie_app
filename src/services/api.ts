const BASE_URL = "https://phim.nguonc.com/api";

// In-memory cache with TTL
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Request deduplication map
const pendingRequests = new Map<string, Promise<any>>();

// Helper function để xử lý fetch và parse JSON với caching và deduplication
const fetchApi = async (url: string) => {
  // Check cache first
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Check if request is already pending (deduplication)
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  // Create new request
  const requestPromise = fetch(url, {
    headers: {
      Accept: "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Cache the result
      cache.set(url, { data, timestamp: Date.now() });

      // Clean up pending request
      pendingRequests.delete(url);

      return data;
    })
    .catch((error) => {
      // Clean up pending request on error
      pendingRequests.delete(url);
      throw error;
    });

  // Store pending request
  pendingRequests.set(url, requestPromise);

  return requestPromise;
};

export const movieApi = {
  getNewMovies: (page = 1) => {
    return fetchApi(`${BASE_URL}/films/phim-moi-cap-nhat?page=${page}`);
  },

  getMoviesByCategory: (slug: string, page = 1) => {
    // Xử lý trường hợp đặc biệt cho 'phim-moi-cap-nhat'
    if (slug === "phim-moi-cap-nhat") {
      return movieApi.getNewMovies(page);
    }
    return fetchApi(`${BASE_URL}/films/danh-sach/${slug}?page=${page}`);
  },

  getMoviesByGenre: (slug: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/the-loai/${slug}?page=${page}`);
  },

  getMoviesByCountry: (slug: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/quoc-gia/${slug}?page=${page}`);
  },

  getMoviesByYear: (year: string, page = 1) => {
    return fetchApi(`${BASE_URL}/films/nam-phat-hanh/${year}?page=${page}`);
  },

  searchMovies: (keyword: string, page = 1) => {
    return fetchApi(
      `${BASE_URL}/films/search?keyword=${encodeURIComponent(
        keyword
      )}&page=${page}`
    );
  },

  getMovieDetail: (slug: string) => {
    return fetchApi(`${BASE_URL}/film/${slug}`);
  },
};
