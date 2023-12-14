import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/providers/Providers'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '@/components/main/Navbar'
import Footer from '@/components/main/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello Space',
  description: 'Crafted with love by justobit',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'overflow-y-scroll overflow-x-hidden bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
          inter.className,
        )}
      >
        <Providers>
          <nav className='fixed top-0 z-50 w-full'>
            <Navbar />
          </nav>
          <main className='w-full h-full min-h-screen px-2 py-16'>
            {children}
          </main>
          <footer className='fixed bottom-0 z-50 w-full text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-900'>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  )
}
