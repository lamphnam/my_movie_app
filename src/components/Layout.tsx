// src/components/Layout.tsx

import type React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileFloatingNav from './MobileFloatingNav'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Header />

      {/* THAY ĐỔI: pt-24 để tránh Header nổi, pb-24 để tránh Mobile Nav nổi */}
      <main className="flex-grow pt-24 pb-24 md:pb-8">
        <div className="container px-4 md:px-6">{children || <Outlet />}</div>
      </main>

      <Footer />

      {/* Thêm menu nổi cho mobile */}
      <MobileFloatingNav />
    </div>
  )
}

export default Layout