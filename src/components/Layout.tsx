import type React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children || <Outlet />}</div>
      </main>
    </>
  )
}

export default Layout
