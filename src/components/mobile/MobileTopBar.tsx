import { Link } from 'react-router-dom';
import { Film, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileTopBarProps {
    onMenuClick: () => void;
    onSearchClick: () => void;
}

export default function MobileTopBar({ onMenuClick, onSearchClick }: MobileTopBarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 safe-top lg:hidden">
            <div className="h-14 px-3 pt-2">
                <div className="liquid-glass h-12 flex items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-select">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <Film className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-sm">
                            <span className="text-primary">HNAM</span>
                            <span className="text-foreground">Phim</span>
                        </span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onSearchClick}
                            className="h-9 w-9 rounded-full hover:bg-white/10 tap-target"
                            aria-label="Tìm kiếm"
                        >
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMenuClick}
                            className="h-9 w-9 rounded-full hover:bg-white/10 tap-target"
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
