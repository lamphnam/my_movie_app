import ContinueWatchingCard from '@/components/ContinueWatchingCard'
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
import { useWatchHistory } from '@/hooks/useWatchHistory'
import { Clock, Trash2 } from 'lucide-react'
import { memo, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const HistoryPage = memo(() => {
    const { history, removeFromHistory, clearHistory } = useWatchHistory()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const sortedHistory = useMemo(
        () => [...history].sort((a, b) => b.lastWatchedAt - a.lastWatchedAt),
        [history],
    )

    const handleClearAll = () => {
        clearHistory()
        setConfirmOpen(false)
        toast.success('Đã xóa toàn bộ lịch sử xem phim')
    }

    return (
        <PageWrapper>
            <Helmet>
                <title>Lịch sử xem phim | HNAM Phim</title>
                <meta name="description" content="Xem lại các bộ phim bạn đã xem gần đây trên HNAM Phim." />
            </Helmet>

            <div className="container-desktop space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-h1">Lịch sử xem phim</h1>
                        <p className="text-body-sm text-muted-foreground mt-1">
                            {sortedHistory.length > 0
                                ? `${sortedHistory.length} phim đã xem gần đây`
                                : 'Chưa có lịch sử xem phim'}
                        </p>
                    </div>

                    {sortedHistory.length > 0 && (
                        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-1.5" aria-label="Xóa toàn bộ lịch sử">
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                    Xóa lịch sử
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Xóa lịch sử xem phim?</DialogTitle>
                                    <DialogDescription>
                                        Toàn bộ lịch sử xem phim sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
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
                {sortedHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Clock className="w-16 h-16 text-muted-foreground/40 mb-4" aria-hidden="true" />
                        <h2 className="text-h2 mb-2">Bạn chưa xem phim nào</h2>
                        <p className="text-body-sm text-muted-foreground mb-6 max-w-sm">
                            Các bộ phim bạn xem sẽ xuất hiện ở đây để bạn có thể dễ dàng quay lại xem tiếp.
                        </p>
                        <Button asChild>
                            <Link to="/">Khám phá phim ngay</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {sortedHistory.map((entry) => (
                            <div key={entry.slug} className="relative group/card">
                                <ContinueWatchingCard entry={entry} />
                                <button
                                    onClick={() => removeFromHistory(entry.slug)}
                                    className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-destructive"
                                    aria-label={`Xóa ${entry.name} khỏi lịch sử`}
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

HistoryPage.displayName = 'HistoryPage'

export default HistoryPage
