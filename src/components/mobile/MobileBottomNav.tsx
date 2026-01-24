import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Filter, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
    onSearchClick: () => void;
    onFilterClick: () => void;
    onMenuClick: () => void;
}

export default function MobileBottomNav({
    onSearchClick,
    onFilterClick,
    onMenuClick,
}: MobileBottomNavProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border safe-bottom md:hidden">
            <div className="flex items-center justify-around h-16 px-2">
                {/* Home */}
                <Link
                    to="/"
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 flex-1 h-full tap-target transition-colors',
                        isActive('/') ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-xs font-medium">Trang chủ</span>
                </Link>

                {/* Search */}
                <button
                    onClick={onSearchClick}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 flex-1 h-full tap-target transition-colors',
                        isActive('/search') ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <Search className="w-5 h-5" />
                    <span className="text-xs font-medium">Tìm kiếm</span>
                </button>

                {/* Filter */}
                <button
                    onClick={onFilterClick}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 flex-1 h-full tap-target transition-colors',
                        isActive('/filter') ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <Filter className="w-5 h-5" />
                    <span className="text-xs font-medium">Bộ lọc</span>
                </button>

                {/* Menu */}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center justify-center gap-1 flex-1 h-full tap-target text-muted-foreground transition-colors"
                >
                    <Menu className="w-5 h-5" />
                    <span className="text-xs font-medium">Menu</span>
                </button>
            </div>
        </nav>
    );
}
