import type React from 'react'
// app/layout.tsx
import '../src/App.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <title>HNAM PHIM - Xem phim online miễn phí</title>
        <meta name="description" content="Xem phim online chất lượng cao miễn phí tại HNAM PHIM" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
