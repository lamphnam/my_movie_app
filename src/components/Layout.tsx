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
    <div className="flex min-h-[100svh] flex-col bg-background selection:bg-primary/30">
      {/* Desktop Header (md+) */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Top Bar (<md) */}
      <MobileTopBar
        onMenuClick={() => setMenuOpen(true)}
        onSearchClick={handleSearchClick}
      />

      {/* Main Content with proper spacing */}
      <main className="flex-grow pt-14 pb-20 md:pt-24 md:pb-8">
        <div className="container px-3 sm:px-4 md:px-6">
          {children || <Outlet />}
        </div>
      </main>

      {/* Desktop Footer (md+) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation (<md) */}
      <MobileBottomNav
        onSearchClick={handleSearchClick}
        onFilterClick={handleFilterClick}
        onMenuClick={() => setMenuOpen(true)}
      />

      {/* Mobile Drawers */}
      <MobileDrawerMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <MobileSearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileFilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  )
}

export default Layout