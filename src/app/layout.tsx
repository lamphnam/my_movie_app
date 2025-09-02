import type React from 'react'
import '../src/globals.css' // Đảm bảo dùng file css mới

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <head>
        <title>HNAM PHIM - Xem phim online miễn phí</title>
        <meta name="description" content="Xem phim online chất lượng cao miễn phí tại HNAM PHIM" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
