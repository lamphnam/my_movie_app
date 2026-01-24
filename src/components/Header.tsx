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
import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none safe-area-top">
      <div className="glass-panel pointer-events-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full px-6 md:px-8 transition-all duration-300 hover:shadow-xl border-white/10">

        {/* === Logo === */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-3 font-bold group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Film className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-black">
              <span className="text-gradient">HNAM</span>
              <span className="text-foreground ml-1">Phim</span>
            </span>
          </Link>
        </div>

        {/* === Desktop Menu (Giữ nguyên, chỉ hiện ở md trở lên) === */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-10 px-4 font-semibold data-[state=open]:bg-white/10 transition-all">Thể loại</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] glass-card rounded-2xl border border-white/10">
                    {filterData.genres.map((genre) => (
                      <ListItem key={genre.id} to={`/genre/${genre.slug}`} title={genre.name} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-10 px-4 font-semibold data-[state=open]:bg-white/10 transition-all">Quốc gia</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] glass-card rounded-2xl border border-white/10">
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
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-10 px-4 font-semibold data-[state=open]:bg-white/10 transition-all">Năm</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] glass-card rounded-2xl border border-white/10">
                    {filterData.years.map((year) => (
                      <ListItem key={year.id} to={`/year/${year.slug}`} title={year.name} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* === Search (Desktop Only) === */}
        <div className="hidden md:block w-[320px]">
          <SearchForm />
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
            'block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary border border-transparent hover:border-primary/20',
            className,
          )}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Header