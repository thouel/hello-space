import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/main/Navbar'
import { NAVBAR_HEIGHT } from '@/constants'
import ToastProvider from '@/providers/ToastProvider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Providers from '@/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'S-n-A Picture Of The Day',
  description: 'Crafted with love by justobit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' data-theme='lofi'>
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden`}
      >
        <Providers>
          <div className='container'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
