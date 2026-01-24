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
        <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 safe-area-bottom lg:hidden pointer-events-none">
            <div className="liquid-glass-pill pointer-events-auto flex items-center justify-around h-14 px-2 max-w-[420px] mx-auto">
                {/* Home */}
                <Link
                    to="/"
                    className={cn(
                        'flex flex-col items-center justify-center gap-0.5 flex-1 h-full tap-target transition-colors rounded-full',
                        isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Trang chủ</span>
                </Link>

                {/* Search */}
                <button
                    onClick={onSearchClick}
                    className={cn(
                        'flex flex-col items-center justify-center gap-0.5 flex-1 h-full tap-target transition-colors rounded-full',
                        isActive('/search') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Search className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Tìm kiếm</span>
                </button>

                {/* Filter */}
                <button
                    onClick={onFilterClick}
                    className={cn(
                        'flex flex-col items-center justify-center gap-0.5 flex-1 h-full tap-target transition-colors rounded-full',
                        isActive('/filter') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Filter className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Bộ lọc</span>
                </button>

                {/* Menu */}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full tap-target text-muted-foreground hover:text-foreground transition-colors rounded-full"
                >
                    <Menu className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </div>
        </nav>
    );
}
