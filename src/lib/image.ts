/**
 * Tối ưu hóa URL ảnh bằng cách sử dụng proxy images.weserv.nl.
 * Dịch vụ này sẽ cache, thay đổi kích thước và nén ảnh.
 * @param originalUrl URL ảnh gốc từ API (có thể là string, null, hoặc undefined).
 * @param width Chiều rộng mong muốn của ảnh.
 * @param height Chiều cao mong muốn của ảnh.
 * @returns URL ảnh đã được tối ưu.
 */
export function optimizeImage(
  originalUrl: string | null | undefined,
  width: number,
  height?: number
): string {
  if (typeof originalUrl !== "string" || !originalUrl) {
    return "/placeholder.svg";
  }

  const urlWithoutProtocol = originalUrl.replace(/^https?:\/\//, "");

  const params = new URLSearchParams({
    url: urlWithoutProtocol,
    w: width.toString(),
    fit: "cover",
    q: "80", // Increased quality slightly
    output: "webp", // Force WebP format for better compression
    af: "", // Auto-format fallback
  });

  if (height) {
    params.set("h", height.toString());
  }

  return `https://images.weserv.nl/?${params.toString()}`;
}
