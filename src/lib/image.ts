/**
 * Tối ưu hóa URL ảnh bằng cách sử dụng proxy images.weserv.nl.
 * Dịch vụ này sẽ cache, thay đổi kích thước và nén ảnh.
 * @param originalUrl URL ảnh gốc từ API (có thể là string, null, hoặc undefined).
 * @param width Chiều rộng mong muốn của ảnh.
 * @param height Chiều cao mong muốn của ảnh.
 * @returns URL ảnh đã được tối ưu.
 */
export function optimizeImage(
  originalUrl: string | null | undefined, // Be honest about what you might receive
  width: number,
  height?: number
): string {
  // --- CORRECTED CHECK ---
  // This guard clause now checks two things:
  // 1. Is the type NOT a string? (Catches null, undefined, numbers, arrays, objects, etc.)
  // 2. Is the value an empty string?
  // If either is true, return the placeholder.
  if (typeof originalUrl !== 'string' || !originalUrl) {
    return '/placeholder.svg'
  }

  // If the code reaches this point, you are GUARANTEED that originalUrl is a non-empty string.
  // The rest of your logic is now completely safe.

  const urlWithoutProtocol = originalUrl.replace(/^https?:\/\//, '')

  const params = new URLSearchParams({
    url: urlWithoutProtocol,
    w: width.toString(),
    fit: 'cover',
    q: '75',
  })

  if (height) {
    params.set('h', height.toString())
  }

  return `https://images.weserv.nl/?${params.toString()}`
}
