import { Link, NavLink } from 'react-router-dom'
import { filterData } from '@/data/filters'
import SearchForm from '@/components/SearchForm'
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
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* === Mobile Menu (Sheet) === */}
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

        {/* === Desktop Menu === */}
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

        {/* === Search Form === */}
        <div className="flex flex-1 items-center justify-end">
          <SearchForm />
        </div>
      </div>
    </header>
  )
}

const ListItem = ({
  className,
  title,
  to,
  ...props
}: {
  title: string
  to: string
  className?: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Header
