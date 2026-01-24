// src/components/Layout.tsx

import type React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileFloatingNav from './MobileFloatingNav'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex min-h-[100svh] flex-col bg-background selection:bg-primary/30">
      <Header />

      {/* Proper spacing for fixed header and mobile nav with safe areas */}
      <main className="flex-grow pt-24 pb-32 md:pb-8 safe-area-bottom">
        <div className="container px-3 sm:px-4 md:px-6">{children || <Outlet />}</div>
      </main>

      <Footer />

      {/* Mobile floating navigation */}
      <MobileFloatingNav />
    </div>
  )
}

export default Layout