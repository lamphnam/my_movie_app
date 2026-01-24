// FILE: src/components/Header.tsx
import SearchForm from '@/components/SearchForm'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { filterData } from '@/data/filters'
import { cn } from '@/lib/utils'
import { Film, Clock, Bookmark, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useState } from 'react'

const Header = () => {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop: Floating Liquid Glass bar */}
      <div className="hidden lg:block py-3 px-4">
        <div className="liquid-glass container-desktop flex h-14 items-center justify-between gap-4 px-4">

          {/* === Logo === */}
          <Link to="/" className="flex items-center gap-2.5 font-bold shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Film className="text-primary-foreground w-4 h-4" />
            </div>
            <span className="text-base font-extrabold tracking-tight">
              <span className="text-primary">HNAM</span>
              <span className="text-foreground">Phim</span>
            </span>
          </Link>

          {/* === Desktop Navigation === */}
          <nav className="flex items-center gap-0.5">
            <Link to="/" className="px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
              Trang chủ
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-8 px-3 text-sm font-medium bg-transparent hover:bg-white/5 data-[state=open]:bg-white/10 rounded-lg">
                    Thể loại
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[480px] gap-1 p-3 grid-cols-3 liquid-glass-elevated">
                      {filterData.genres.slice(0, 12).map((genre) => (
                        <ListItem key={genre.id} to={`/genre/${genre.slug}`} title={genre.name} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-8 px-3 text-sm font-medium bg-transparent hover:bg-white/5 data-[state=open]:bg-white/10 rounded-lg">
                    Quốc gia
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-3 grid-cols-2 liquid-glass-elevated">
                      {filterData.countries.slice(0, 10).map((country) => (
                        <ListItem key={country.id} to={`/country/${country.slug}`} title={country.name} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-8 px-3 text-sm font-medium bg-transparent hover:bg-white/5 data-[state=open]:bg-white/10 rounded-lg">
                    Năm
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 p-3 grid-cols-3 liquid-glass-elevated">
                      {filterData.years.slice(0, 9).map((year) => (
                        <ListItem key={year.id} to={`/year/${year.slug}`} title={year.name} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/filter" className="px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
              Lọc phim
            </Link>
          </nav>

          {/* === Center Search (Semi-opaque pill inside glass bar) === */}
          <div className="flex-1 max-w-md mx-4">
            <div className="glass-solid-fill rounded-full">
              <SearchForm />
            </div>
          </div>

          {/* === Right Actions === */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Lịch sử</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg">
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Đã lưu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: Simple top bar (Liquid Glass applied in Layout) */}
      <div className="lg:hidden flex h-14 items-center justify-between px-4 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Film className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="text-base font-extrabold">
            <span className="text-primary">HNAM</span>
            <span className="text-foreground">Phim</span>
          </span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white/10"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Search Dropdown */}
      {showSearch && (
        <div className="lg:hidden border-b border-border/30 bg-background/95 backdrop-blur-sm p-3">
          <SearchForm />
        </div>
      )}
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
            'block select-none rounded-lg px-3 py-2 text-sm leading-none no-underline outline-none transition-colors',
            'text-foreground/80 hover:bg-white/10 hover:text-foreground focus:bg-white/10',
            className,
          )}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Header