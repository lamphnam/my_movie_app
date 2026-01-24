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
  height?: number,
): string {
  if (typeof originalUrl !== "string" || !originalUrl) {
    return "/placeholder.svg";
  }

  const urlWithoutProtocol = originalUrl.replace(/^https?:\/\//, "");

  const params = new URLSearchParams({
    url: urlWithoutProtocol,
    w: width.toString(),
    fit: "cover",
    q: "80",
    output: "webp",
    af: "",
  });

  if (height) {
    params.set("h", height.toString());
  }

  return `https://images.weserv.nl/?${params.toString()}`;
}

/**
 * Poster widths for responsive srcset (aspect ratio 2:3)
 * Covers: 240w (small phone), 360w (phone), 480w (phone DPR2), 640w (phone DPR3), 800w (large)
 */
const POSTER_WIDTHS = [240, 360, 480, 640, 800];

/**
 * Generate srcSet string for poster images (2:3 aspect ratio)
 * Each entry requests the proper dimensions from the proxy.
 * @param originalUrl Original image URL
 * @returns srcSet string for use in <img> element
 */
export function generatePosterSrcSet(
  originalUrl: string | null | undefined,
): string {
  if (typeof originalUrl !== "string" || !originalUrl) {
    return "";
  }

  return POSTER_WIDTHS.map((w) => {
    const h = Math.round(w * 1.5); // 2:3 aspect ratio
    const url = optimizeImage(originalUrl, w, h);
    return `${url} ${w}w`;
  }).join(", ");
}

/**
 * Default sizes attribute for mobile poster grid
 * - On mobile (<=768px): 2-column grid, so ~50vw minus gap/padding (~12px each side)
 * - On tablet/desktop: use fixed width fallback
 */
export const POSTER_SIZES_MOBILE_GRID =
  "(max-width: 639px) calc(50vw - 10px), (max-width: 1023px) calc(33vw - 12px), 240px";

/**
 * Desktop poster sizes (5-column grid)
 */
export const POSTER_SIZES_DESKTOP_GRID =
  "(max-width: 639px) calc(50vw - 10px), (max-width: 1023px) calc(33vw - 12px), calc(20vw - 16px)";
