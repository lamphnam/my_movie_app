import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import GracefulImage from './GracefulImage';
import { optimizeImage } from '@/lib/image';
import { Badge } from './ui/badge';

interface MovieCardCompactProps {
    movie: {
        _id?: string;
        slug?: string;
        name?: string;
        origin_name?: string;
        poster_url?: string;
        thumb_url?: string;
        year?: number;
        quality?: string;
        lang?: string;
        tmdb?: {
            vote_average?: number;
        };
    };
}

export default function MovieCardCompact({ movie }: MovieCardCompactProps) {
    const slug = movie.slug || movie._id || '';
    const posterUrl = movie.poster_url || movie.thumb_url || '';
    const title = movie.name || movie.origin_name || 'Untitled';
    const rating = movie.tmdb?.vote_average;

    return (
        <Link
            to={`/movie/${slug}`}
            className="group block tap-target"
        >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                <GracefulImage
                    src={optimizeImage(posterUrl, 280)}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                />

                {/* Play overlay on tap */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-active:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground fill-current" />
                    </div>
                </div>

                {/* Quality badge */}
                {movie.quality && (
                    <Badge
                        variant="secondary"
                        className="absolute top-2 left-2 text-xs font-semibold bg-black/70 border-0"
                    >
                        {movie.quality}
                    </Badge>
                )}

                {/* Rating */}
                {rating && rating > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-xs font-semibold">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="mt-2 text-sm font-medium line-clamp-2 leading-tight">
                {title}
            </h3>

            {/* Meta info */}
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                {movie.year && <span>{movie.year}</span>}
                {movie.lang && (
                    <>
                        <span>•</span>
                        <span>{movie.lang}</span>
                    </>
                )}
            </div>
        </Link>
    );
}
