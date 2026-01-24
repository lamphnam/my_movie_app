import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
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
            <SheetContent side="top" className="h-auto">
                <SheetHeader>
                    <SheetTitle>Tìm kiếm phim</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSearch} className="mt-6">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Nhập tên phim..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-10 pr-10 h-12"
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
                        <Button type="submit" size="lg" className="tap-target">
                            Tìm
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
