import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Home, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileSearch from './MobileSearch'
import { filterData } from '@/data/filters'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const MobileFloatingNav = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-3 md:hidden pointer-events-none safe-area-bottom">
            <div className="glass-panel pointer-events-auto grid grid-cols-3 items-center w-[90%] max-w-[420px] h-[72px] rounded-full px-3 shadow-2xl border border-white/10 bg-background/80 backdrop-blur-xl">

                {/* Nút Home */}
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full h-14 w-14 transition-all duration-300",
                            isActive('/')
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "hover:bg-white/10 text-muted-foreground active:bg-white/20"
                        )}
                        asChild
                    >
                        <Link to="/" aria-label="Trang chủ">
                            <Home className="h-6 w-6" />
                        </Link>
                    </Button>
                </div>

                {/* Nút Tìm kiếm */}
                <div className="flex justify-center">
                    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-14 w-14 hover:bg-white/10 text-muted-foreground active:bg-white/20" aria-label="Tìm kiếm phim">
                                <Search className="h-6 w-6" />
                            </Button>
                        </DialogTrigger>

                        {/* 
               SỬA LỖI Ở ĐÂY:
               1. top-[15%] thay vì 20%
               2. translate-y-0 !important: Để đè lên style mặc định của Dialog (tránh bị kéo lên giữa màn hình)
               3. data-[state=open]:slide-in-from-top-10: Animation trượt từ trên xuống nhẹ nhàng
            */}
                        <DialogContent className="fixed left-[50%] top-[5%] z-50 w-[95%] max-w-lg translate-x-[-50%] !translate-y-0 gap-3 border border-white/10 bg-background/95 p-4 shadow-2xl duration-200 backdrop-blur-2xl rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[3%] max-h-[90vh] landscape:max-h-[85vh] flex flex-col">

                            <DialogHeader className="mb-1 flex-shrink-0">
                                <DialogTitle className="text-left text-lg font-bold">Tìm kiếm</DialogTitle>
                                <DialogDescription className="sr-only">Nhập tên phim</DialogDescription>
                            </DialogHeader>
                            {/* Container cho search với overflow */}
                            <div className="flex-1 overflow-hidden min-h-0">
                                <MobileSearch onSearchSubmit={() => setIsSearchOpen(false)} />
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>

                {/* Nút Menu */}
                <div className="flex justify-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-14 w-14 hover:bg-white/10 text-muted-foreground active:bg-white/20"
                                aria-label="Menu danh mục"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[80vh] rounded-t-[2rem] border-t-white/10 bg-background/90 backdrop-blur-xl">
                            <SheetHeader>
                                <SheetTitle className="text-center">Danh mục</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 h-full overflow-y-auto pb-20">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="the-loai" className="border-b-white/10">
                                        <AccordionTrigger>Thể loại</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                {filterData.genres.map(item => (
                                                    <Link key={item.id} to={`/genre/${item.slug}`} className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 text-center text-sm transition-colors border border-white/5">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="quoc-gia" className="border-b-white/10">
                                        <AccordionTrigger>Quốc gia</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                {filterData.countries.map(item => (
                                                    <Link key={item.id} to={`/country/${item.slug}`} className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 text-center text-sm transition-colors border border-white/5">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="nam" className="border-b-white/10">
                                        <AccordionTrigger>Năm Phát Hành</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-3 gap-2">
                                                {filterData.years.map(item => (
                                                    <Link key={item.id} to={`/year/${item.slug}`} className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 text-center text-sm transition-colors border border-white/5">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </div>
    )
}

export default MobileFloatingNav