import { Link } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Home,
    Film,
    Tv,
    Globe,
    Calendar,
    Sparkles,
} from 'lucide-react';

interface MobileDrawerMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const menuItems = [
    { to: '/', label: 'Trang chủ', icon: Home },
    { to: '/category/phim-le', label: 'Phim lẻ', icon: Film },
    { to: '/category/phim-bo', label: 'Phim bộ', icon: Tv },
    { to: '/category/hoat-hinh', label: 'Hoạt hình', icon: Sparkles },
    { to: '/country/trung-quoc', label: 'Phim Trung Quốc', icon: Globe },
    { to: '/country/han-quoc', label: 'Phim Hàn Quốc', icon: Globe },
    { to: '/year/2024', label: 'Phim 2024', icon: Calendar },
    { to: '/year/2023', label: 'Phim 2023', icon: Calendar },
];

export default function MobileDrawerMenu({
    open,
    onOpenChange,
}: MobileDrawerMenuProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    onClick={() => onOpenChange(false)}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors tap-target hover:bg-accent hover:text-accent-foreground"
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
