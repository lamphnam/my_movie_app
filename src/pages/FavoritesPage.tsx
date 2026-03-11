import MovieCard from '@/components/MovieCard'
import PageWrapper from '@/components/PageWrapper'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useFavorites } from '@/hooks/useFavorites'
import { Heart, Trash2 } from 'lucide-react'
import { memo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const FavoritesPage = memo(() => {
    const { favorites, removeFavorite, clearFavorites } = useFavorites()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleClearAll = () => {
        clearFavorites()
        setConfirmOpen(false)
        toast.success('Đã xóa toàn bộ danh sách yêu thích')
    }

    return (
        <PageWrapper>
            <Helmet>
                <title>Phim yêu thích | HNAM Phim</title>
                <meta name="description" content="Danh sách phim yêu thích bạn đã lưu trên HNAM Phim." />
            </Helmet>

            <div className="container-desktop space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-h1">Phim yêu thích</h1>
                        <p className="text-body-sm text-muted-foreground mt-1">
                            {favorites.length > 0
                                ? `${favorites.length} phim đã lưu`
                                : 'Chưa có phim yêu thích'}
                        </p>
                    </div>

                    {favorites.length > 0 && (
                        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-1.5" aria-label="Xóa toàn bộ danh sách yêu thích">
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                    Xóa tất cả
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Xóa danh sách yêu thích?</DialogTitle>
                                    <DialogDescription>
                                        Toàn bộ phim đã lưu sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                                        Hủy
                                    </Button>
                                    <Button variant="destructive" onClick={handleClearAll}>
                                        Xóa tất cả
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Content */}
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Heart className="w-16 h-16 text-muted-foreground/40 mb-4" aria-hidden="true" />
                        <h2 className="text-h2 mb-2">Chưa có phim yêu thích</h2>
                        <p className="text-body-sm text-muted-foreground mb-6 max-w-sm">
                            Nhấn nút &quot;Lưu&quot; trên trang chi tiết phim để thêm phim vào danh sách yêu thích.
                        </p>
                        <Button asChild>
                            <Link to="/">Khám phá phim ngay</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {favorites.map((movie) => (
                            <div key={movie.slug} className="relative group/card">
                                <MovieCard movie={movie} />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        removeFavorite(movie.slug)
                                        toast.success(`Đã xóa "${movie.name}" khỏi yêu thích`)
                                    }}
                                    className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-destructive"
                                    aria-label={`Xóa ${movie.name} khỏi yêu thích`}
                                >
                                    <span className="text-xs font-bold">✕</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageWrapper>
    )
})

FavoritesPage.displayName = 'FavoritesPage'

export default FavoritesPage
