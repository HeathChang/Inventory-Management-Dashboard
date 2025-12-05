import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/QueryProvider'

export const metadata: Metadata = {
  title: 'Toonation 2025',
  description: 'Toonation Assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

