// src/components/ContinueWatchingCard.tsx

import { optimizeImage } from '@/lib/image'
import type { WatchHistoryEntry } from '@/hooks/useWatchHistory'
import { Link } from 'react-router-dom'
import { Play, Clock } from 'lucide-react'
import { memo } from 'react'
import GracefulImage from './GracefulImage'

interface ContinueWatchingCardProps {
    entry: WatchHistoryEntry
}

const ContinueWatchingCard = memo(({ entry }: ContinueWatchingCardProps) => {
    // Format last watched time
    const getTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000)
        if (seconds < 60) return 'Vừa xem'
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes} phút trước`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours} giờ trước`
        const days = Math.floor(hours / 24)
        return `${days} ngày trước`
    }

    return (
        <Link
            to={`/phim/${entry.slug}`}
            className="group block outline-none rounded-xl interactive-focus focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Tiếp tục xem ${entry.name}`}
        >
            <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm">
                <GracefulImage
                    src={optimizeImage(entry.thumbUrl, 200)}
                    alt={entry.name}
                    width={200}
                    height={300}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" aria-hidden="true" />
                    </div>
                </div>

                {/* Episode badge */}
                {entry.currentEpisodeName && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <span className="badge-overlay mb-1">
                            <Play className="w-3 h-3" aria-hidden="true" />
                            Xem tiếp
                        </span>
                        <p className="text-xs text-white truncate">
                            {entry.currentEpisodeName}
                        </p>
                    </div>
                )}

                {/* Progress bar */}
                {entry.episodeProgress !== undefined && entry.episodeProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${entry.episodeProgress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-2 space-y-1">
                <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {entry.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{getTimeAgo(entry.lastWatchedAt)}</span>
                </div>
                {!entry.currentEpisodeName && (
                    <p className="text-xs text-muted-foreground">Mở lại phim đã xem gần đây</p>
                )}
            </div>
        </Link>
    )
})

ContinueWatchingCard.displayName = 'ContinueWatchingCard'

export default ContinueWatchingCard
