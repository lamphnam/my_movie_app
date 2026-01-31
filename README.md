# HNAM PHIM - Movie Streaming Website

A modern, SEO-optimized movie streaming website built with React, TypeScript, Vite, and deployed on Vercel.

## 🚀 Features

- ⚡ Fast performance with Vite + React 19
- 🎨 Modern UI with Tailwind CSS + shadcn/ui
- 📱 Fully responsive (mobile-first design)
- 🔍 **SEO-optimized** with dynamic sitemap generation
- 🌐 Multi-domain support with canonical URL management
- 🎬 Browse movies by category, genre, country, year
- 🔎 Advanced search and filtering
- ❤️ Favorite movies feature
- 🎯 Smooth animations with Framer Motion

## 🌐 SEO Configuration

This project includes comprehensive SEO features for optimal Google indexing:

### Key SEO Features

- ✅ Dynamic `sitemap.xml` generation (includes 100+ URLs with movie pages)
- ✅ Dynamic `robots.txt` generation
- ✅ Configurable canonical domain via environment variable
- ✅ Per-page unique titles, descriptions, and canonical tags
- ✅ Open Graph and Twitter Card meta tags
- ✅ Structured data (JSON-LD) for movie pages
- ✅ 301 redirects from secondary domain
- ✅ Client-side fallback for secondary domain handling

### Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Set your canonical domain (default is already configured):

   ```env
   VITE_SITE_ORIGIN=https://hnamphim.vercel.app
   ```

3. For Vercel deployment, add the environment variable in:
   - Vercel Dashboard → Settings → Environment Variables
   - Key: `VITE_SITE_ORIGIN`
   - Value: `https://hnamphim.vercel.app`

### SEO Files Generation

The build process automatically generates SEO files:

```bash
npm run build
# This runs: tsc -b && vite build && npm run postbuild
# Postbuild script generates dist/robots.txt and dist/sitemap.xml
```

**See [SEO_FIX_SUMMARY.md](./SEO_FIX_SUMMARY.md) for complete SEO documentation and verification checklist.**

## 📦 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **SEO**: react-helmet-async
- **Analytics**: Vercel Analytics + Speed Insights
- **Deployment**: Vercel

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd my_movie_app

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will run at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes SEO files generation)
- `npm run postbuild` - Generate SEO files (robots.txt, sitemap.xml)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
my_movie_app/
├── public/               # Static assets (will be copied to dist)
├── scripts/
│   └── generate-seo-files.mjs  # SEO files generator
├── src/
│   ├── components/       # React components
│   │   ├── mobile/       # Mobile-specific components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── lib/              # Utility functions
│   ├── constants.ts      # App constants (includes SITE_ORIGIN)
│   ├── types.ts          # TypeScript types
│   └── main.tsx          # App entry point
├── .env.example          # Environment variables template
├── vercel.json           # Vercel configuration (redirects, headers)
├── SEO_FIX_SUMMARY.md    # Complete SEO documentation
└── README.md             # This file
```

## 🔍 SEO Verification

After deployment, verify:

1. **Static files are accessible:**
   - https://hnamphim.vercel.app/robots.txt
   - https://hnamphim.vercel.app/sitemap.xml

2. **Check canonical tags:**
   - View page source of any page
   - Verify `<link rel="canonical">` uses vercel.app domain

3. **Submit sitemap to Google Search Console:**
   - Add property for https://hnamphim.vercel.app
   - Submit sitemap URL
   - Monitor indexing status

4. **Test Google site search** (after 1-2 weeks):
   - `site:hnamphim.vercel.app` should show many results

**Full verification checklist in [SEO_FIX_SUMMARY.md](./SEO_FIX_SUMMARY.md)**

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Add environment variable:
   - `VITE_SITE_ORIGIN` = `https://hnamphim.vercel.app`
4. Deploy

The `vercel.json` configuration handles:

- 301 redirects from secondary domain
- Static file serving (robots.txt, sitemap.xml)
- SPA routing for all other routes

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
