// src/components/HeroDesktop.tsx
// Desktop hero with sidebar layout - curated, dense, app-like

import { Link } from 'react-router-dom'
import { Play, Plus, Globe } from 'lucide-react'
import { Button } from './ui/button'
import GracefulImage from './GracefulImage'
import { optimizeImage } from '@/lib/image'
import type { MovieListItem } from '@/types'

interface HeroDesktopProps {
    featuredMovie: MovieListItem
    trendingMovies: MovieListItem[]
    loading?: boolean
}

export default function HeroDesktop({ featuredMovie, trendingMovies, loading }: HeroDesktopProps) {
    if (loading) {
        return (
            <div className="hero-desktop">
                <div className="animate-shimmer rounded-lg aspect-[16/9] bg-card" />
                <div className="sidebar-section space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-3 animate-shimmer">
                            <div className="w-12 h-16 rounded bg-muted" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-3/4" />
                                <div className="h-3 bg-muted rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const movie = featuredMovie

    return (
        <div className="hero-desktop">
            {/* Main Hero Content */}
            <div className="relative rounded-lg overflow-hidden bg-card">
                {/* Background Image */}
                <div className="relative aspect-[16/9] lg:aspect-[2/1]">
                    <GracefulImage
                        src={optimizeImage(movie.poster_url || movie.thumb_url, 1280)}
                        alt={movie.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-6 lg:p-8">
                    <div className="hero-content max-w-xl">
                        {/* Meta badges */}
                        <div className="hero-meta">
                            {movie.quality && (
                                <span className="badge-primary">{movie.quality}</span>
                            )}
                            {movie.current_episode && (
                                <span className="badge-secondary">{movie.current_episode}</span>
                            )}
                            {movie.language && (
                                <span className="badge-outline flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    {movie.language}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-display text-foreground leading-tight">
                            {movie.name}
                        </h1>

                        {/* Subtitle */}
                        {movie.original_name && movie.original_name !== movie.name && (
                            <p className="text-body-sm">{movie.original_name}</p>
                        )}

                        {/* Synopsis */}
                        <p className="text-body line-clamp-2 lg:line-clamp-3">
                            {movie.description?.replace(/<[^>]+>/g, '') || 'Nội dung phim đang được cập nhật.'}
                        </p>

                        {/* Actions */}
                        <div className="hero-actions pt-2">
                            <Button asChild size="lg" className="gap-2">
                                <Link to={`/phim/${movie.slug}`}>
                                    <Play className="w-5 h-5 fill-current" />
                                    Xem ngay
                                </Link>
                            </Button>
                            <Button variant="secondary" size="lg" className="gap-2">
                                <Plus className="w-5 h-5" />
                                Thêm vào danh sách
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar - Trending */}
            <aside className="hidden lg:block">
                <div className="sidebar-section h-full">
                    <h3 className="sidebar-title flex items-center gap-2">
                        <span className="w-1 h-4 bg-primary rounded-full" />
                        Xu hướng hôm nay
                    </h3>
                    <div className="space-y-1">
                        {trendingMovies.slice(0, 4).map((item, index) => (
                            <Link
                                key={item.slug}
                                to={`/phim/${item.slug}`}
                                className="sidebar-item group"
                            >
                                <span className="sidebar-rank">{index + 1}</span>
                                <div className="w-11 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                                    <GracefulImage
                                        src={optimizeImage(item.thumb_url || item.poster_url, 100)}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        {item.current_episode && (
                                            <span className="text-xs text-muted-foreground">{item.current_episode}</span>
                                        )}
                                        {item.quality && (
                                            <span className="text-xs text-primary font-medium">{item.quality}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    )
}
