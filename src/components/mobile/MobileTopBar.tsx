import { Link } from 'react-router-dom';
import { Film, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileTopBarProps {
    onMenuClick: () => void;
    onSearchClick: () => void;
}

export default function MobileTopBar({ onMenuClick, onSearchClick }: MobileTopBarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background border-b border-border safe-top md:hidden">
            <div className="flex items-center justify-between h-14 px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-select">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Film className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg">hnamphim</span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onSearchClick}
                        className="tap-target"
                        aria-label="Tìm kiếm"
                    >
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="tap-target"
                        aria-label="Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
