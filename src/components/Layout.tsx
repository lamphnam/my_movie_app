// src/components/Layout.tsx

import { useState } from 'react'
import type React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileTopBar from './mobile/MobileTopBar'
import MobileBottomNav from './mobile/MobileBottomNav'
import MobileDrawerMenu from './mobile/MobileDrawerMenu'
import MobileSearchDrawer from './mobile/MobileSearchDrawer'
import MobileFilterDrawer from './mobile/MobileFilterDrawer'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleSearchClick = () => {
    setSearchOpen(true)
  }

  const handleFilterClick = () => {
    setFilterOpen(true)
  }

  return (
    <div className="flex min-h-[100svh] flex-col bg-background">
      {/* Desktop Header (lg+) */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Top Bar (<lg) */}
      <div className="lg:hidden">
        <MobileTopBar
          onMenuClick={() => setMenuOpen(true)}
          onSearchClick={handleSearchClick}
        />
      </div>

      {/* Main Content - desktop uses container-desktop for proper max-width */}
      <main className="flex-grow pt-14 pb-20 lg:pt-20 lg:pb-12">
        <div className="container-desktop">
          {children || <Outlet />}
        </div>
      </main>

      {/* Desktop Footer (lg+) */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation (<lg) */}
      <div className="lg:hidden">
        <MobileBottomNav
          onSearchClick={handleSearchClick}
          onFilterClick={handleFilterClick}
          onMenuClick={() => setMenuOpen(true)}
        />
      </div>

      {/* Mobile Drawers */}
      <MobileDrawerMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <MobileSearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileFilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  )
}

export default Layout