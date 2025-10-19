// src/hooks/useMoviePagination.ts

import type { MovieListApiResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'

// Định nghĩa kiểu cho hàm fetcher
// Nó là một hàm bất đồng bộ trả về một Promise chứa MovieListApiResponse
type MovieFetcher = () => Promise<MovieListApiResponse>

/**
 * Custom hook để fetch danh sách phim có phân trang bằng TanStack Query.
 *
 * @param queryKey - Một mảng định danh duy nhất cho query này, ví dụ: ['movies', 'genre', 'hanh-dong', 1].
 * @param fetcher - Hàm bất đồng bộ thực hiện việc gọi API.
 * @returns Trạng thái và dữ liệu từ useQuery, cộng thêm movies và pagination đã được trích xuất.
 */
export const useMoviePagination = (queryKey: (string | number)[], fetcher: MovieFetcher) => {
  const { data, isLoading, isError, error } = useQuery<MovieListApiResponse, Error>({
    queryKey: queryKey,
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // Dữ liệu được coi là "tươi" trong 5 phút
    gcTime: 10 * 60 * 1000, // Dọn dẹp khỏi cache sau 10 phút không hoạt động
    retry: 1, // Thử lại 1 lần nếu thất bại
  })

  return {
    isLoading,
    isError,
    error,
    movies: data?.items || [],
    pagination: data?.paginate || null,
  }
}
