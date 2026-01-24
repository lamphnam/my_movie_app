import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface MobileSearchDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function MobileSearchDrawer({
    open,
    onOpenChange,
}: MobileSearchDrawerProps) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            onOpenChange(false);
            setQuery('');
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="top" className="liquid-glass-elevated h-auto border-b border-white/10">
                <SheetHeader>
                    <SheetTitle className="text-sm font-medium">Tìm kiếm phim</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSearch} className="mt-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1 glass-solid-fill rounded-xl">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Nhập tên phim..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-10 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                autoFocus
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 tap-target"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            )}
                        </div>
                        <Button type="submit" size="lg" className="tap-target rounded-xl px-6">
                            Tìm
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
