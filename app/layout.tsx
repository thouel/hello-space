import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/providers/Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '@/components/main/Navbar'
import Footer from '@/components/main/Footer'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello Space',
  description: 'Crafted with love by justobit',
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang='en'>
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <nav className='fixed top-0 z-50 w-full px-4 py-2'>
            <Navbar session={session} />
          </nav>
          {modal}
          <main className='w-full px-2 pt-16'>{children}</main>
          <footer className='fixed bottom-0 z-50 w-full text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-900'>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  )
}
