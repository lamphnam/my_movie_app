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
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 lg:hidden pointer-events-none safe-area-bottom">
            {/* Liquid Glass Pill Nav Bar */}
            <nav className="liquid-glass-pill pointer-events-auto grid grid-cols-3 items-center w-full max-w-[380px] h-16 px-2">

                {/* Home Button */}
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full h-12 w-12 transition-colors touch-target",
                            isActive('/')
                                ? "bg-primary/20 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/10 active:bg-white/15"
                        )}
                        asChild
                    >
                        <Link to="/" aria-label="Trang chủ">
                            <Home className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-12 w-12 text-muted-foreground hover:text-foreground hover:bg-white/10 active:bg-white/15 touch-target"
                                aria-label="Tìm kiếm phim"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="fixed left-[50%] top-[5%] z-50 w-[95%] max-w-lg translate-x-[-50%] !translate-y-0 gap-3 liquid-glass-elevated p-4 duration-200 rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-h-[90vh] landscape:max-h-[85vh] flex flex-col">
                            <DialogHeader className="mb-1 flex-shrink-0">
                                <DialogTitle className="text-left text-lg font-bold">Tìm kiếm</DialogTitle>
                                <DialogDescription className="sr-only">Nhập tên phim</DialogDescription>
                            </DialogHeader>
                            <div className="flex-1 overflow-hidden min-h-0">
                                <MobileSearch onSearchSubmit={() => setIsSearchOpen(false)} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Menu Button */}
                <div className="flex justify-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-12 w-12 text-muted-foreground hover:text-foreground hover:bg-white/10 active:bg-white/15 touch-target"
                                aria-label="Menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="bottom" className="liquid-glass-elevated rounded-t-[28px] max-h-[85vh] landscape:max-h-[90vh] overflow-y-auto scrollbar-thin">
                            <SheetHeader className="mb-4">
                                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
                            </SheetHeader>

                            <nav className="space-y-2">
                                {/* Quick Links */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <Link
                                        to="/category/phim-le"
                                        className="glass-solid-fill flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        Phim Lẻ
                                    </Link>
                                    <Link
                                        to="/category/phim-bo"
                                        className="glass-solid-fill flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        Phim Bộ
                                    </Link>
                                    <Link
                                        to="/category/hoat-hinh"
                                        className="glass-solid-fill flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        Hoạt Hình
                                    </Link>
                                    <Link
                                        to="/filter"
                                        className="glass-solid-fill flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        Bộ Lọc
                                    </Link>
                                </div>

                                {/* Genres Accordion */}
                                <Accordion type="single" collapsible className="space-y-2">
                                    <AccordionItem value="genres" className="border-0">
                                        <AccordionTrigger className="glass-solid-fill rounded-xl px-4 py-3 text-sm font-medium hover:no-underline hover:bg-white/10">
                                            Thể Loại
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-0">
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {filterData.genres.slice(0, 12).map((genre) => (
                                                    <Link
                                                        key={genre.slug}
                                                        to={`/genre/${genre.slug}`}
                                                        className="p-2 text-sm rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {genre.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="countries" className="border-0">
                                        <AccordionTrigger className="glass-solid-fill rounded-xl px-4 py-3 text-sm font-medium hover:no-underline hover:bg-white/10">
                                            Quốc Gia
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-0">
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {filterData.countries.slice(0, 10).map((country) => (
                                                    <Link
                                                        key={country.slug}
                                                        to={`/country/${country.slug}`}
                                                        className="p-2 text-sm rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {country.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </div>
    )
}

export default MobileFloatingNav
