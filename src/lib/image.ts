/**
 * Tối ưu hóa URL ảnh bằng cách sử dụng proxy images.weserv.nl.
 * Dịch vụ này sẽ cache, thay đổi kích thước và nén ảnh.
 * @param originalUrl URL ảnh gốc từ API.
 * @param width Chiều rộng mong muốn của ảnh.
 * @param height Chiều cao mong muốn của ảnh.
 * @returns URL ảnh đã được tối ưu.
 */
export function optimizeImage(originalUrl: string, width: number, height?: number): string {
  if (!originalUrl) {
    return '/placeholder.svg' // Trả về ảnh placeholder nếu không có URL
  }

  // Loại bỏ 'https://' khỏi URL gốc để dùng làm tham số
  const urlWithoutProtocol = originalUrl.replace(/^https?:\/\//, '')

  // Xây dựng URL mới với các tham số tối ưu
  // w: width, h: height, fit: cover (cắt ảnh để vừa vặn), q: quality (75)
  const params = new URLSearchParams({
    url: urlWithoutProtocol,
    w: width.toString(),
    fit: 'cover',
    q: '75', // Chất lượng 75% là mức cân bằng tốt
  })

  if (height) {
    params.set('h', height.toString())
  }

  return `https://images.weserv.nl/?${params.toString()}`
}
