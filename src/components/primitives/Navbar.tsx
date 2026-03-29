// Navbar skeleton — Filmhaus design direction.
// Phase B will replace Header.tsx with this component, adding scroll detection,
// dropdown menus (genre/country/year), and mobile drawer wiring.
//
// Not yet wired to the router. Safe to import for visual testing.

import { cn } from '@/lib/utils'
import { Bookmark, Clock, Film, Menu, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from './Container'

interface NavbarProps {
  /**
   * Drives the scroll-state style swap.
   * false → transparent (over hero)
   * true  → frosted surface (below hero)
   * Phase B will inject this from a useScrolled() hook.
   */
  scrolled?: boolean
}

export const Navbar = ({ scrolled = false }: NavbarProps) => {
  const { pathname } = useLocation()

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-[background-color,backdrop-filter,border-color]',
        'duration-[var(--motion-duration)] ease-out',
        scrolled
          ? 'border-b border-border/50 bg-background/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Trang chủ HNam Phim"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Film className="h-4 w-4 text-[hsl(var(--primary-foreground))]" aria-hidden />
          </div>
          <span className="text-sm font-extrabold tracking-tight">
            <span className="text-primary">HNAM</span>
            <span className="text-foreground">Phim</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden items-center gap-0.5 lg:flex">
          <NavLink to="/" current={pathname}>Trang chủ</NavLink>
          {/*
            Phase B: NavigationMenu dropdowns for Thể loại / Quốc gia / Năm
            will be inserted here, reusing the shadcn NavigationMenu primitive.
          */}
          <NavLink to="/filter" current={pathname}>Lọc phim</NavLink>
        </div>

        {/* ── Search pill ── */}
        <div className="mx-4 hidden flex-1 max-w-sm lg:flex">
          <Link
            to="/search"
            className={cn(
              'flex h-9 w-full items-center gap-2 rounded-md',
              'border border-border/50 bg-secondary px-3',
              'text-sm text-muted-foreground',
              'transition-colors duration-[var(--motion-duration-fast)]',
              'hover:border-border hover:bg-accent hover:text-accent-foreground',
            )}
            aria-label="Tìm kiếm phim"
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <span>Tìm kiếm phim...</span>
          </Link>
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1">
          <Link
            to="/lich-su"
            className={cn(
              'hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-sm lg:inline-flex',
              'transition-colors duration-[var(--motion-duration-fast)]',
              pathname === '/lich-su'
                ? 'text-primary underline decoration-primary decoration-2 underline-offset-4'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
            aria-label="Xem lịch sử xem phim"
          >
            <Clock className="h-4 w-4" aria-hidden />
            <span>Lịch sử</span>
          </Link>

          <Link
            to="/yeu-thich"
            className={cn(
              'hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-sm lg:inline-flex',
              'transition-colors duration-[var(--motion-duration-fast)]',
              pathname === '/yeu-thich'
                ? 'text-primary underline decoration-primary decoration-2 underline-offset-4'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
            aria-label="Phim đã lưu"
          >
            <Bookmark className="h-4 w-4" aria-hidden />
            <span>Đã lưu</span>
          </Link>

          {/* Mobile: search + menu triggers (Phase B wires these to drawers) */}
          <button
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-md lg:hidden',
              'text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
            )}
            aria-label="Tìm kiếm"
            type="button"
          >
            <Search className="h-5 w-5" aria-hidden />
          </button>

          <button
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-md lg:hidden',
              'text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
            )}
            aria-label="Menu"
            type="button"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>

      </Container>
    </header>
  )
}

/* ── Internal nav-link with amber underline active state ── */
const NavLink = ({
  to,
  current,
  children,
}: {
  to: string
  current: string
  children: React.ReactNode
}) => {
  const isActive = current === to
  return (
    <Link
      to={to}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium',
        'transition-colors duration-[var(--motion-duration-fast)]',
        isActive
          ? 'text-primary underline decoration-primary decoration-2 underline-offset-4'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {children}
    </Link>
  )
}
