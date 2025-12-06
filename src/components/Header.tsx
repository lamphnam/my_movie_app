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
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="glass-panel pointer-events-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full px-4 md:px-6 transition-all duration-300 hover:bg-background/90">

        {/* === Logo === */}
        {/* THAY ĐỔI: Bỏ 'hidden sm:inline-block' để luôn hiện tên web, và thêm flex-1 để căn chỉnh trên mobile */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-bold group">
            <span className="text-lg md:text-xl text-gradient">HNAM Phim</span>
          </Link>
        </div>

        {/* === Desktop Menu (Giữ nguyên, chỉ hiện ở md trở lên) === */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-9 data-[state=open]:bg-white/10">Thể loại</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {filterData.genres.map((genre) => (
                      <ListItem key={genre.id} to={`/genre/${genre.slug}`} title={genre.name} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-9 data-[state=open]:bg-white/10">Quốc gia</NavigationMenuTrigger>
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
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 rounded-full h-9 data-[state=open]:bg-white/10">Năm</NavigationMenuTrigger>
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

        {/* === Search (Desktop Only) === */}
        <div className="hidden md:block w-[300px]">
          <SearchForm />
        </div>

        {/* Div rỗng để cân bằng layout flex trên mobile (nếu cần logo ở giữa) */}
        {/* <div className="md:hidden w-8"></div> */}
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