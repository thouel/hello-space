import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { log } from '@logtail/next'
import Providers from '@/providers/Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '@/components/main/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello Space',
  description: 'Crafted with love by justobit',
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden bg-white dark:bg-black dark:text-white/90`}
      >
        <Providers>
          <Navbar />
          {modal}
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
