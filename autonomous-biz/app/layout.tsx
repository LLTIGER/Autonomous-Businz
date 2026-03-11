import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { LocaleProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'Autonomous Business Launcher',
  description: 'Discover, create, and deploy autonomous businesses with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-surface text-gray-900">
        <LocaleProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </LocaleProvider>
      </body>
    </html>
  )
}
