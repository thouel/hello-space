import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { log } from '@logtail/next'
import Providers from '@/providers/Providers'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

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
    <html lang='en' data-theme='lofi'>
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden`}
      >
        <Providers>
          <div>{children}</div>
          {modal}
        </Providers>
      </body>
    </html>
  )
}
