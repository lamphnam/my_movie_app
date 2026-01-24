import { useNavigate } from 'react-router-dom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Film, Globe, Calendar } from 'lucide-react';

interface MobileFilterDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const filterGroups = [
    {
        title: 'Loại phim',
        icon: Film,
        items: [
            { label: 'Phim lẻ', path: '/category/phim-le' },
            { label: 'Phim bộ', path: '/category/phim-bo' },
            { label: 'Hoạt hình', path: '/category/hoat-hinh' },
            { label: 'TV Shows', path: '/category/tv-shows' },
        ],
    },
    {
        title: 'Quốc gia',
        icon: Globe,
        items: [
            { label: 'Trung Quốc', path: '/country/trung-quoc' },
            { label: 'Hàn Quốc', path: '/country/han-quoc' },
            { label: 'Nhật Bản', path: '/country/nhat-ban' },
            { label: 'Âu Mỹ', path: '/country/au-my' },
        ],
    },
    {
        title: 'Năm',
        icon: Calendar,
        items: [
            { label: '2024', path: '/year/2024' },
            { label: '2023', path: '/year/2023' },
            { label: '2022', path: '/year/2022' },
            { label: '2021', path: '/year/2021' },
        ],
    },
];

export default function MobileFilterDrawer({
    open,
    onOpenChange,
}: MobileFilterDrawerProps) {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Bộ lọc phim</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                    {filterGroups.map((group) => (
                        <div key={group.title}>
                            <div className="flex items-center gap-2 mb-3">
                                <group.icon className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-sm">{group.title}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {group.items.map((item) => (
                                    <Button
                                        key={item.path}
                                        variant="outline"
                                        onClick={() => handleNavigate(item.path)}
                                        className="justify-start tap-target"
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="pt-4">
                        <Button
                            variant="default"
                            onClick={() => handleNavigate('/filter')}
                            className="w-full tap-target"
                        >
                            Bộ lọc nâng cao
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
