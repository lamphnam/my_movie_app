#!/usr/bin/env node
/**
 * SEO Files Generator
 * Generates robots.txt and sitemap.xml dynamically at build time
 * Uses VITE_SITE_ORIGIN environment variable or defaults to https://hnamphim.vercel.app
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get site origin from environment or use default
const SITE_ORIGIN =
  process.env.VITE_SITE_ORIGIN || "https://hnamphim.vercel.app";
const today = new Date().toISOString().split("T")[0];

console.log(`🌐 Generating SEO files for: ${SITE_ORIGIN}`);

// Output directory (dist folder after build)
const distDir = join(__dirname, "..", "dist");

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// ========================================
// Generate robots.txt
// ========================================
const robotsTxt = `# === Cấu hình SEO cho Google & các công cụ tìm kiếm chính ===
User-agent: *
Allow: /

# Chặn Google index các trang tìm kiếm và lọc để tránh trùng lặp nội dung
Disallow: /search
Disallow: /search?*
Disallow: /filter
Disallow: /filter?*

# === Chặn các AI Bot thu thập dữ liệu ===
User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

# === Đường dẫn Sitemap bắt buộc ===
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

writeFileSync(join(distDir, "robots.txt"), robotsTxt, "utf-8");
console.log("✅ robots.txt generated");

// ========================================
// Generate sitemap.xml
// ========================================

// Static routes - key listing pages
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/filter", priority: "0.7", changefreq: "weekly" },

  // Category pages (from filters.ts)
  { path: "/category/phim-moi-cap-nhat", priority: "0.9", changefreq: "daily" },
  { path: "/category/phim-dang-chieu", priority: "0.9", changefreq: "daily" },
  { path: "/category/phim-bo", priority: "0.9", changefreq: "daily" },
  { path: "/category/phim-le", priority: "0.9", changefreq: "daily" },
  { path: "/category/tv-shows", priority: "0.9", changefreq: "daily" },
  { path: "/category/hoat-hinh", priority: "0.9", changefreq: "daily" },

  // Genre pages
  { path: "/genre/hanh-dong", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/phieu-luu", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/hoat-hinh", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/phim-hai", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/hinh-su", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/tai-lieu", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/chinh-kich", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/gia-dinh", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/gia-tuong", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/lich-su", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/kinh-di", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/phim-nhac", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/bi-an", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/lang-man", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/khoa-hoc-vien-tuong", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/phim-truyen-hinh", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/gay-can", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/chien-tranh", priority: "0.8", changefreq: "weekly" },
  { path: "/genre/phim-mien-tay", priority: "0.8", changefreq: "weekly" },

  // Country pages
  { path: "/country/trung-quoc", priority: "0.8", changefreq: "weekly" },
  { path: "/country/han-quoc", priority: "0.8", changefreq: "weekly" },
  { path: "/country/nhat-ban", priority: "0.8", changefreq: "weekly" },
  { path: "/country/thai-lan", priority: "0.8", changefreq: "weekly" },
  { path: "/country/au-my", priority: "0.8", changefreq: "weekly" },
  { path: "/country/dai-loan", priority: "0.8", changefreq: "weekly" },
  { path: "/country/hong-kong", priority: "0.8", changefreq: "weekly" },
  { path: "/country/an-do", priority: "0.8", changefreq: "weekly" },
  { path: "/country/anh", priority: "0.8", changefreq: "weekly" },
  { path: "/country/phap", priority: "0.8", changefreq: "weekly" },
  { path: "/country/canada", priority: "0.8", changefreq: "weekly" },
  { path: "/country/duc", priority: "0.8", changefreq: "weekly" },
  { path: "/country/tay-ban-nha", priority: "0.8", changefreq: "weekly" },
  { path: "/country/philippines", priority: "0.8", changefreq: "weekly" },
  { path: "/country/viet-nam", priority: "0.8", changefreq: "weekly" },

  // Year pages (recent years)
  { path: "/year/2026", priority: "0.8", changefreq: "daily" },
  { path: "/year/2025", priority: "0.8", changefreq: "daily" },
  { path: "/year/2024", priority: "0.8", changefreq: "weekly" },
  { path: "/year/2023", priority: "0.7", changefreq: "monthly" },
  { path: "/year/2022", priority: "0.7", changefreq: "monthly" },
];

// Function to fetch movies from API for sitemap
async function fetchMoviesForSitemap() {
  const movieSlugs = [];

  try {
    // Fetch from multiple popular categories to get diverse movie list
    const categories = ["phim-moi-cap-nhat", "phim-bo", "phim-le"];

    for (const category of categories) {
      try {
        const response = await fetch(
          `https://phim.nguonc.com/api/films/danh-sach/${category}?page=1`,
        );

        if (response.ok) {
          const data = await response.json();
          const items = data?.items || [];

          // Extract slugs from this category
          items.forEach((item) => {
            if (item.slug && !movieSlugs.includes(item.slug)) {
              movieSlugs.push(item.slug);
            }
          });
        }
      } catch (err) {
        console.warn(`⚠️  Failed to fetch ${category}:`, err.message);
      }
    }

    // Also try to get from Korean movies (popular)
    try {
      const response = await fetch(
        "https://phim.nguonc.com/api/films/quoc-gia/han-quoc?page=1",
      );

      if (response.ok) {
        const data = await response.json();
        const items = data?.items || [];

        items.forEach((item) => {
          if (item.slug && !movieSlugs.includes(item.slug)) {
            movieSlugs.push(item.slug);
          }
        });
      }
    } catch (err) {
      console.warn("⚠️  Failed to fetch Korean movies:", err.message);
    }
  } catch (error) {
    console.error("⚠️  Error fetching movies:", error.message);
  }

  console.log(`📦 Fetched ${movieSlugs.length} movie slugs from API`);
  return movieSlugs;
}

// Generate sitemap
async function generateSitemap() {
  // Fetch movie data
  const movieSlugs = await fetchMoviesForSitemap();

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  // Add static routes
  staticRoutes.forEach((route) => {
    xml += `    <url>
        <loc>${SITE_ORIGIN}${route.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>

`;
  });

  // Add movie detail pages
  movieSlugs.forEach((slug) => {
    xml += `    <url>
        <loc>${SITE_ORIGIN}/phim/${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

`;
  });

  xml += `</urlset>`;

  writeFileSync(join(distDir, "sitemap.xml"), xml, "utf-8");
  console.log(
    `✅ sitemap.xml generated with ${staticRoutes.length + movieSlugs.length} URLs`,
  );
}

// Run the generator
generateSitemap()
  .then(() => {
    console.log("🎉 SEO files generation complete!");
  })
  .catch((err) => {
    console.error("❌ Error generating SEO files:", err);
    process.exit(1);
  });
