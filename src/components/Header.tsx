// src/components/Header.tsx

import SearchForm from '@/components/SearchForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription, // <-- IMPORT THÊM DialogDescription
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { filterData } from '@/data/filters'
import { cn } from '@/lib/utils'
import { Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import MobileSearch from './MobileSearch'

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between">
        {/* === Cụm bên trái: Menu === */}
        <div className="flex items-center">
          {/* Menu Mobile (Hamburger Icon) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/" className="text-xl font-bold text-gradient">
                      <span>🎬</span> HNAM Phim
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <Accordion type="multiple" className="w-full">
                    {/* Accordion Items for Genres, Countries, Years */}
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Thể loại</AccordionTrigger>
                      <AccordionContent>
                        <nav className="flex flex-col gap-2 pl-2">
                          {filterData.genres.map((item) => (
                            <SheetClose asChild key={item.id}>
                              <NavLink
                                to={`/genre/${item.slug}`}
                                className={({ isActive }) =>
                                  cn(
                                    'p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground',
                                    isActive && 'bg-accent text-foreground',
                                  )
                                }
                              >
                                {item.name}
                              </NavLink>
                            </SheetClose>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Quốc gia</AccordionTrigger>
                      <AccordionContent>
                        <nav className="flex flex-col gap-2 pl-2">
                          {filterData.countries.map((item) => (
                            <SheetClose asChild key={item.id}>
                              <NavLink
                                to={`/country/${item.slug}`}
                                className={({ isActive }) =>
                                  cn(
                                    'p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground',
                                    isActive && 'bg-accent text-foreground',
                                  )
                                }
                              >
                                {item.name}
                              </NavLink>
                            </SheetClose>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Năm</AccordionTrigger>
                      <AccordionContent>
                        <nav className="flex flex-col gap-2 pl-2">
                          {filterData.years.map((item) => (
                            <SheetClose asChild key={item.id}>
                              <NavLink
                                to={`/year/${item.slug}`}
                                className={({ isActive }) =>
                                  cn(
                                    'p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground',
                                    isActive && 'bg-accent text-foreground',
                                  )
                                }
                              >
                                {item.name}
                              </NavLink>
                            </SheetClose>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Logo và Menu Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-xl font-bold text-gradient">
              <span>🎬</span> HNAM Phim
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {filterData.genres.map((genre) => (
                        <ListItem key={genre.id} to={`/genre/${genre.slug}`} title={genre.name} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {filterData.countries.map((country) => (
                        <ListItem
                          key={country.id}
                          to={`/country/${country.slug}`}
                          title={country.name}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Năm</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {filterData.years.map((year) => (
                        <ListItem key={year.id} to={`/year/${year.slug}`} title={year.name} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* === Logo Mobile (đặt ở giữa) === */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
          <Link to="/" className="text-xl font-bold text-gradient">
            <span>🎬</span> HNAM Phim
          </Link>
        </div>

        {/* === Cụm bên phải: Tìm kiếm === */}
        <div className="flex items-center justify-end">
          {/* Search for Desktop */}
          <div className="hidden w-[400px] md:block">
            <SearchForm />
          </div>

          {/* Search Trigger for Mobile */}
          <div className="md:hidden">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="top-0 flex h-screen max-h-screen w-screen max-w-full flex-col gap-4 rounded-none p-4 sm:top-[50%] sm:h-auto sm:max-h-[80vh] sm:w-full sm:max-w-lg sm:translate-y-[-50%] sm:rounded-lg">
                <DialogHeader className="flex-shrink-0">
                  <DialogTitle>Tìm kiếm phim</DialogTitle>
                  {/* SỬA LỖI: Thêm DialogDescription để khắc phục cảnh báo */}
                  <DialogDescription className="sr-only">
                    Nhập từ khóa để tìm kiếm phim và xem kết quả trực tiếp bên dưới.
                  </DialogDescription>
                </DialogHeader>
                <div className="min-h-0 flex-1">
                  <MobileSearch onSearchSubmit={() => setIsSearchOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ className, title, to }: { title: string; to: string; className?: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Header
