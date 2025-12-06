// FILE: src/components/MobileFloatingNav.tsx
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
        // THAY ĐỔI: bottom-6 -> bottom-8 để cao hơn chút
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 md:hidden pointer-events-none">
            {/* THAY ĐỔI: 
          - w-[85%] sm:w-[400px]: Rộng 85% màn hình
          - grid grid-cols-3: Chia làm 3 cột đều nhau
          - h-16: Tăng chiều cao lên chút cho đẹp
      */}
            <div className="glass-panel pointer-events-auto grid grid-cols-3 items-center w-[85%] sm:w-[400px] h-16 rounded-full px-2 shadow-2xl border border-white/10 bg-background/80 backdrop-blur-xl">

                {/* Nút Home (Căn giữa cột 1) */}
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full h-12 w-12 transition-all duration-300",
                            isActive('/')
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "hover:bg-white/10 text-muted-foreground"
                        )}
                        asChild
                    >
                        <Link to="/">
                            <Home className="h-6 w-6" />
                        </Link>
                    </Button>
                </div>

                {/* Nút Tìm kiếm (Căn giữa cột 2) */}
                <div className="flex justify-center">
                    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-white/10 text-muted-foreground">
                                <Search className="h-6 w-6" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="top-[20%] rounded-3xl border-white/10 bg-background/90 backdrop-blur-xl sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Tìm kiếm</DialogTitle>
                                <DialogDescription className="sr-only">Nhập tên phim</DialogDescription>
                            </DialogHeader>
                            <div className="h-[60vh]">
                                <MobileSearch onSearchSubmit={() => setIsSearchOpen(false)} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Nút Menu (Căn giữa cột 3) */}
                <div className="flex justify-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-12 w-12 hover:bg-white/10 text-muted-foreground"
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