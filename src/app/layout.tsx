import type { Metadata } from 'next'
import 'styles/globals.css'

export const metadata: Metadata = {
  title: 'Event Tools',
  description: 'Real-time event synchronization application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
